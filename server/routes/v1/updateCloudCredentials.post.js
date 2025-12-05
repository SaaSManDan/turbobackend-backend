import pool from '../../services/dbConnectors/postgresConnector.js';
import { verifyProjectAccess } from '../../utils/rlsCheck.js';
import { encryptKey, decryptKey } from '../../utils/encryption.js';
import { nanoid } from 'nanoid';

export default defineEventHandler(async function(event) {
  const client = await pool.connect();
  
  try {
    const body = await readBody(event);
    const { projectId, credentialId, cloudProvider, credentialName, credentials, defaultRegion } = body;
    const userId = event.context.auth.userId;
    
    // Validate input
    if (!projectId) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'projectId is required'
      };
    }
    
    if (!credentials || typeof credentials !== 'object') {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'credentials object is required'
      };
    }
    
    // RLS check
    await verifyProjectAccess(userId, projectId);
    
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Start transaction
    await client.query('BEGIN');
    
    // If credentialId is provided, update existing credential
    if (credentialId) {
      // Verify credential belongs to project
      const verifyResult = await client.query(
        `SELECT credential_id, credential FROM ${process.env.PG_DB_SCHEMA}.cloud_credentials 
         WHERE credential_id = $1 AND project_id = $2`,
        [credentialId, projectId]
      );
      
      if (verifyResult.rows.length === 0) {
        await client.query('ROLLBACK');
        setResponseStatus(event, 404);
        return {
          success: false,
          error: 'Credential not found'
        };
      }
      
      // Merge existing credentials with new ones
      let existingCredentials = {};
      try {
        existingCredentials = verifyResult.rows[0].credential 
          ? JSON.parse(decryptKey(verifyResult.rows[0].credential))
          : {};
      } catch (error) {
        console.error('Error decrypting existing credential:', error);
      }
      
      const mergedCredentials = { ...existingCredentials, ...credentials };
      const encryptedCredential = encryptKey(JSON.stringify(mergedCredentials));
      
      // Update credential
      await client.query(
        `UPDATE ${process.env.PG_DB_SCHEMA}.cloud_credentials 
         SET credential = $1, updated_at = $2
         ${defaultRegion ? ', default_region = $3' : ''}
         WHERE credential_id = ${defaultRegion ? '$4' : '$3'}`,
        defaultRegion 
          ? [encryptedCredential, currentTime, defaultRegion, credentialId]
          : [encryptedCredential, currentTime, credentialId]
      );
      
      await client.query('COMMIT');
      
      return {
        success: true,
        credentialId: credentialId,
        message: 'Credentials updated successfully'
      };
      
    } else {
      // Create new credential
      if (!cloudProvider) {
        await client.query('ROLLBACK');
        setResponseStatus(event, 400);
        return {
          success: false,
          error: 'cloudProvider is required when creating new credentials'
        };
      }
      
      const newCredentialId = nanoid();
      const encryptedCredential = encryptKey(JSON.stringify(credentials));
      
      await client.query(
        `INSERT INTO ${process.env.PG_DB_SCHEMA}.cloud_credentials 
         (credential_id, project_id, cloud_provider, credential_name, 
          credential, default_region, is_active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          newCredentialId,
          projectId,
          cloudProvider,
          credentialName || `${cloudProvider} Credentials`,
          encryptedCredential,
          defaultRegion || null,
          true,
          currentTime,
          currentTime
        ]
      );
      
      await client.query('COMMIT');
      
      return {
        success: true,
        credentialId: newCredentialId,
        message: 'Credentials created successfully'
      };
    }
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating cloud credentials:', error);
    
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    
    return {
      success: false,
      error: error.message || 'Failed to update cloud credentials'
    };
  } finally {
    client.release();
  }
});
