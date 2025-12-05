/**
 * MCP Authentication Middleware
 * Validates API key and applies rate limiting
 */

import pool from '../services/dbConnectors/postgresConnector.js';
import { decryptKey } from '../utils/encryption.js';

export default defineEventHandler(async function(event) {
  // Only apply to /mcp endpoint
  if (!event.path.startsWith('/mcp')) {
    return;
  }
  
  try {
    // Extract Authorization header (Bearer token)
    const authHeader = getHeader(event, 'Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Missing or invalid Authorization header'
      });
    }
    
    const providedKey = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Query all active mcp_keys
    const keysResult = await pool.query(
      `SELECT mcp_key_id, mcp_key, project_id, user_id, is_active, expires_at 
       FROM ${process.env.PG_DB_SCHEMA}.mcp_keys 
       WHERE is_active = true`
    );
    
    // Find matching key by decrypting and comparing
    let keyData = null;
    for (const row of keysResult.rows) {
      try {
        const decryptedKey = decryptKey(row.mcp_key);
        if (decryptedKey === providedKey) {
          keyData = row;
          break;
        }
      } catch (decryptError) {
        // Skip invalid encrypted keys
        continue;
      }
    }
    
    if (!keyData) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Invalid API key'
      });
    }
    
    // Verify is_active = true
    if (!keyData.is_active) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: API key is inactive'
      });
    }
    
    // Verify expires_at is null or > current timestamp
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (keyData.expires_at !== null && keyData.expires_at < currentTimestamp) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: API key has expired'
      });
    }
    
    // Check rate limit
    const rateLimit = parseInt(process.env.MCP_RATE_LIMIT || '100');
    const oneHourAgo = currentTimestamp - 3600;
    
    const rateLimitResult = await pool.query(
      `SELECT COUNT(*) as request_count 
       FROM ${process.env.PG_DB_SCHEMA}.mcp_requests 
       WHERE mcp_key_id = $1 AND created_at > $2`,
      [keyData.mcp_key_id, oneHourAgo]
    );
    
    const requestCount = parseInt(rateLimitResult.rows[0].request_count);
    
    if (requestCount >= rateLimit) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too Many Requests: Rate limit exceeded'
      });
    }
    
    // Update last_used_at timestamp
    await pool.query(
      `UPDATE ${process.env.PG_DB_SCHEMA}.mcp_keys 
       SET last_used_at = $1 
       WHERE mcp_key_id = $2`,
      [currentTimestamp, keyData.mcp_key_id]
    );
    
    // Attach project_id, user_id, mcp_key_id to event.context
    event.context.project_id = keyData.project_id;
    event.context.user_id = keyData.user_id;
    event.context.mcp_key_id = keyData.mcp_key_id;
    
  } catch (error) {
    // Re-throw HTTP errors
    if (error.statusCode) {
      throw error;
    }
    
    // Log and throw internal errors
    console.error('MCP Auth error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});
