import pool from '../../services/dbConnectors/postgresConnector.js';
import { nanoid } from 'nanoid';
import { encryptKey } from '../../utils/encryption.js';

export default defineEventHandler(async function(event) {
  const client = await pool.connect();
  
  try {
    const body = await readBody(event);
    const { projectName } = body;
    
    // Validate input
    if (!projectName) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'Invalid input. projectName is required.'
      };
    }
    
    // Get user_id from auth context
    const userId = event.context.auth.userId;
    
    // Start transaction
    await client.query('BEGIN');
    
    // Generate project_id
    const unsanitizedNanoid = nanoid();
    const projectId = unsanitizedNanoid.replace(/_/g, function() {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      return chars[Math.floor(Math.random() * chars.length)];
    }).toLowerCase();
    
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Insert into projects table
    await client.query(
      `INSERT INTO ${process.env.PG_DB_SCHEMA}.projects 
       (project_id, user_id, project_name, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5)`,
      [projectId, userId, projectName, currentTime, currentTime]
    );
    
    // Generate MCP key for the project
    const mcpKeyId = nanoid();
    const randomString = nanoid(32);
    const mcpKeyPlaintext = `tb_live_${randomString}`;
    const mcpKeyEncrypted = encryptKey(mcpKeyPlaintext);
    
    // Insert MCP key
    await client.query(
      `INSERT INTO ${process.env.PG_DB_SCHEMA}.mcp_keys 
       (mcp_key_id, mcp_key, project_id, user_id, key_name, is_active, created_at, last_used_at, expires_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [mcpKeyId, mcpKeyEncrypted, projectId, userId, 'Default Key', true, currentTime, null, null]
    );

    // // Insert resource preferences
    // const cloudProviders = new Set();
    
    // for (const pref of resourcePreferences) {
    //   const { resourceType, preferredCloudProvider, region, resourceSettings } = pref;
      
    //   if (!resourceType || !preferredCloudProvider) {
    //     await client.query('ROLLBACK');
    //     return {
    //       success: false,
    //       error: 'Each resource preference must have resourceType and preferredCloudProvider'
    //     };
    //   }
      
    //   cloudProviders.add(preferredCloudProvider);
      
    //   const preferenceId = nanoid();
      
    //   await client.query(
    //     `INSERT INTO ${process.env.PG_DB_SCHEMA}.resource_preferences 
    //      (preference_id, project_id, resource_type, preferred_cloud_provider, 
    //       preferred_region, resource_settings, created_at, updated_at) 
    //      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    //     [
    //       preferenceId,
    //       projectId,
    //       resourceType,
    //       preferredCloudProvider,
    //       region || null,
    //       resourceSettings ? JSON.stringify(resourceSettings) : null,
    //       currentTime,
    //       currentTime
    //     ]
    //   );
    // }
    
    // // Check which cloud providers don't have credentials yet
    // const providersArray = Array.from(cloudProviders);
    // const missingProviders = [];
    
    // for (const provider of providersArray) {
    //   const result = await client.query(
    //     `SELECT credential_id FROM ${process.env.PG_DB_SCHEMA}.cloud_credentials 
    //      WHERE project_id = $1 AND cloud_provider = $2 AND is_active = true`,
    //     [projectId, provider]
    //   );
      
    //   if (result.rows.length === 0) {
    //     missingProviders.push(provider);
    //   }
    // }
    
    // Commit transaction
    await client.query('COMMIT');
    
    return {
      success: true,
      projectId,
      mcpKey: mcpKeyPlaintext
    };
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating project:', error);
    
    setResponseStatus(event, 500);
    return {
      success: false,
      error: 'Failed to create project'
    };
  } finally {
    client.release();
  }
});
