/**
 * MCP Endpoint Route
 * Main HTTP endpoint for MCP requests
 */

import { handleMCPRequest } from '../../utils/mcpHandler.js';
import { formatError } from '../../utils/mcpFormatter.js';

export default defineEventHandler(async function(event) {
  try {
    // Parse request body
    const body = await readBody(event);
    
    console.log('MCP request received:', JSON.stringify(body, null, 2));
    
    // Validate MCP-Protocol-Version header (optional but recommended)
    const protocolVersion = getHeader(event, 'MCP-Protocol-Version');
    if (protocolVersion && protocolVersion !== '2025-11-25') {
      console.warn(`Unsupported MCP protocol version: ${protocolVersion}`);
    }
    
    // Call handleMCPRequest
    const response = await handleMCPRequest(body, event);
    
    // If response is undefined, SSE stream is handling the response
    if (response === undefined) {
      return;
    }
    
    // Return formatted response
    return response;
    
  } catch (error) {
    console.error('MCP endpoint error:', error);
    
    // Handle parse errors
    if (error instanceof SyntaxError) {
      return formatError(null, -32700, "Parse error: Invalid JSON");
    }
    
    // Handle other errors
    return formatError(null, -32603, "Internal error");
  }
});
