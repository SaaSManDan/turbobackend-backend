/**
 * MCP Request Handler
 * Routes MCP requests to appropriate handlers
 */

import { nanoid } from 'nanoid';
import { getToolDefinitions } from './mcpTools.js';
import { formatSuccess, formatError, formatToolResult } from './mcpFormatter.js';
import { createSSEStream } from './sseStream.js';
import pool from '../services/dbConnectors/postgresConnector.js';
import { redis } from '../services/dbConnectors/redisConnector.js';
import BullMQ from "bullmq";

const { Queue } = BullMQ;

const queue = new Queue('turbobackend-queue', {
    connection: redis.duplicate()
});


export async function handleMCPRequest(requestBody, event) {
  try {
    // Validate JSON-RPC format
    if (!requestBody.jsonrpc || requestBody.jsonrpc !== "2.0") {
      return formatError(requestBody.id || null, -32600, "Invalid JSON-RPC version");
    }
    
    if (!requestBody.method) {
      return formatError(requestBody.id || null, -32600, "Missing method");
    }
    
    // Extract project_id, user_id, mcp_key_id from event.context (set by mcpAuth)
    const { project_id, user_id, mcp_key_id } = event.context;
    
    // Handle different methods
    if (requestBody.method === "tools/list") {
      const tools = getToolDefinitions();
      return formatSuccess(requestBody.id, { tools });
    }
    
    if (requestBody.method === "tools/call") {
      // Validate params
      if (!requestBody.params || !requestBody.params.name) {
        return formatError(requestBody.id, -32602, "Missing tool name");
      }
      
      const toolName = requestBody.params.name;
      const toolArguments = requestBody.params.arguments || {};
      
      // Generate unique streamId and request_id
      const streamId = nanoid();
      const request_id = nanoid();
      const created_at = Math.floor(Date.now() / 1000);
      
      // Insert record into mcp_requests table
      try {
        await pool.query(
          `INSERT INTO ${process.env.PG_DB_SCHEMA}.mcp_requests 
           (request_id, mcp_key_id, tool_name, request_params, response_status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [request_id, mcp_key_id, toolName, JSON.stringify(toolArguments), 'pending', created_at]
        );
      } catch (dbError) {
        console.error('Database error:', dbError);
        return formatError(requestBody.id, -32603, "Internal error: Failed to create request record");
      }
      
      // Create SSE stream
      const stream = createSSEStream(event);
      
      // Send initial empty event
      stream.sendEvent(1, "");
      
      // Add job to queue
      try {
        console.log('Attempting to add job to queue:', {
          request_id,
          tool_name: toolName,
          mcp_key_id: toolArguments._apiKey,
          project_id,
          user_id
        });
        
        // Determine job name based on tool
        let jobName;
        if (toolName === "modifyProject") {
          jobName = "projectModificationJob";
        } else {
          jobName = "initialProjectCreationJob";
        }
        
        const job = await queue.add(jobName, {
          mcp_key_id: toolArguments._apiKey,
          project_id,
          user_id,
          request_id,
          tool_name: toolName,
          streamId,
          request_params: toolArguments
        }, {
          attempts: 3
        });
        
        console.log('Job successfully added to queue:', {
          jobId: job.id,
          jobName,
          request_id,
          tool_name: toolName
        });
      } catch (jobError) {
        console.error('Job queue error:', jobError);
        
        // Update mcp_requests table with error status
        await pool.query(
          `UPDATE ${process.env.PG_DB_SCHEMA}.mcp_requests 
           SET response_status = $1 
           WHERE request_id = $2`,
          ['error', request_id]
        );
        
        const errorResult = formatSuccess(requestBody.id, formatToolResult("Failed to queue job", true));
        stream.sendComplete(errorResult);
        stream.close();
        return;
      }
      
      // Subscribe to Redis pub/sub for streamId
      const subscriber = redis.duplicate();
      await subscriber.subscribe(streamId);
      
      // Store API blueprint separately
      let apiBlueprint = null;
      
      subscriber.on('message', async function(channel, message) {
        console.log('Redis message received on channel:', channel);
        console.log('Raw message:', message);
        
        try {
          const data = JSON.parse(message);
          console.log('Parsed message data:', JSON.stringify(data, null, 2));
          
          // Handle API blueprint message
          if (data.type === 'apiBlueprint') {
            // Ensure apiBlueprint is a plain string, not an object
            if (typeof data.content === 'object' && data.content.blueprint) {
              apiBlueprint = data.content.blueprint;
            } else if (typeof data.content === 'string') {
              apiBlueprint = data.content;
            } else {
              apiBlueprint = JSON.stringify(data.content);
            }
            console.log('✓ Received API blueprint (length:', apiBlueprint?.length || 0, 'chars)');
            return;
          }
          
          if (data.complete) {
            console.log('✓ FINAL MESSAGE RECEIVED - Job complete');
            console.log('  Status:', data.isError ? 'ERROR' : 'SUCCESS');
            console.log('  Content:', data.content);
            
            // Update mcp_requests table with final status
            const finalStatus = data.isError ? 'error' : 'success';
            await pool.query(
              `UPDATE ${process.env.PG_DB_SCHEMA}.mcp_requests 
               SET response_status = $1 
               WHERE request_id = $2`,
              [finalStatus, request_id]
            );
            
            // Prepare tool result with blueprint if available
            let toolResult;
            if (apiBlueprint) {
              // Format with blueprint as a resource
              toolResult = {
                content: [
                  {
                    type: "text",
                    text: data.content
                  },
                  {
                    type: "resource",
                    resource: {
                      uri: "blueprint://api-documentation",
                      mimeType: "text/markdown",
                      text: apiBlueprint
                    }
                  }
                ],
                isError: data.isError
              };
              console.log('  Including API blueprint in response');
            } else {
              // Standard format without blueprint
              toolResult = formatToolResult(data.content, data.isError);
            }
            
            // Send final result
            const result = formatSuccess(requestBody.id, toolResult);
            stream.sendComplete(result);
            console.log('✓ Final result sent to client via SSE');
            
            // Cleanup
            await subscriber.unsubscribe(streamId);
            await subscriber.quit();
            stream.close();
            console.log('✓ Redis subscription closed and SSE stream ended');
          } else {
            // Send progress update
            console.log('→ Progress update:', data.message, `(${data.progress || 0}%)`);
            stream.sendProgress(data.message, data.progress || 0);
          }
        } catch (parseError) {
          console.error('Error parsing Redis message:', parseError);
          console.error('Failed message content:', message);
        }
      });
      
      // Don't return anything - SSE stream is handling the response
      return;
    }
    
    // Method not found
    return formatError(requestBody.id, -32601, `Method not found: ${requestBody.method}`);
    
  } catch (error) {
    console.error('MCP Handler error:', error);
    return formatError(requestBody.id || null, -32603, "Internal error");
  }
}
