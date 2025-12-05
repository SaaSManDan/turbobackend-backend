/**
 * Get MCP Key Endpoint
 * Returns the decrypted MCP key for a project
 */

import pool from '../../services/dbConnectors/postgresConnector.js';
import { decryptKey } from '../../utils/encryption.js';

export default defineEventHandler(async function(event) {
  try {
    // Get project_id from query params
    const query = getQuery(event);
    const { project_id } = query;
    
    if (!project_id) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'project_id is required'
      };
    }
    
    // Get user_id from auth context
    const userId = event.context.auth.userId;
    
    // Verify user owns the project
    const projectResult = await pool.query(
      `SELECT project_id FROM ${process.env.PG_DB_SCHEMA}.projects 
       WHERE project_id = $1 AND user_id = $2`,
      [project_id, userId]
    );
    
    if (projectResult.rows.length === 0) {
      setResponseStatus(event, 404);
      return {
        success: false,
        error: 'Project not found or access denied'
      };
    }
    
    // Get the active MCP key for the project
    const keyResult = await pool.query(
      `SELECT mcp_key_id, mcp_key, key_name, created_at, last_used_at, expires_at 
       FROM ${process.env.PG_DB_SCHEMA}.mcp_keys 
       WHERE project_id = $1 AND is_active = true 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [project_id]
    );
    
    if (keyResult.rows.length === 0) {
      setResponseStatus(event, 404);
      return {
        success: false,
        error: 'No active MCP key found for this project'
      };
    }
    
    const keyData = keyResult.rows[0];
    
    // Decrypt the key
    let decryptedKey;
    try {
      decryptedKey = decryptKey(keyData.mcp_key);
    } catch (decryptError) {
      console.error('Decryption error:', decryptError);
      setResponseStatus(event, 500);
      return {
        success: false,
        error: 'Failed to decrypt MCP key'
      };
    }
    
    return {
      success: true,
      mcpKey: decryptedKey,
      keyName: keyData.key_name,
      createdAt: keyData.created_at,
      lastUsedAt: keyData.last_used_at,
      expiresAt: keyData.expires_at
    };
    
  } catch (error) {
    console.error('Error getting MCP key:', error);
    
    setResponseStatus(event, 500);
    return {
      success: false,
      error: 'Failed to get MCP key'
    };
  }
});
