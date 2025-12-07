import pool from '../../services/dbConnectors/postgresConnector.js';
import { verifyProjectAccess } from '../../utils/rlsCheck.js';
import { decryptKey } from '../../utils/encryption.js';

export default defineEventHandler(async function(event) {
  const client = await pool.connect();
  
  try {
    const userId = event.context.auth.userId;
    const query = getQuery(event);
    const { projectId } = query;
    
    // Validate input
    if (!projectId) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'projectId is required'
      };
    }
    
    // RLS check
    await verifyProjectAccess(userId, projectId);
    
    // Fetch cloud credentials
    const result = await client.query(
      `SELECT credential_id, cloud_provider, credential_name, credential, 
              default_region, is_active, created_at, updated_at
       FROM ${process.env.PG_DB_SCHEMA}.cloud_credentials 
       WHERE project_id = $1
       ORDER BY created_at DESC`,
      [projectId]
    );
    
    // Process credentials and decrypt values
    const credentials = result.rows.map(function(cred) {
      let credentialValue = '';
      let hasMissingFields = true;
      
      try {
        credentialValue = cred.credential ? decryptKey(cred.credential) : '';
      } catch (error) {
        console.error('Error decrypting credential:', error);
      }
      
      if (credentialValue && credentialValue.trim() !== '') {
        hasMissingFields = false;
      }
      
      return {
        credentialId: cred.credential_id,
        cloudProvider: cred.cloud_provider,
        credentialName: cred.credential_name,
        defaultRegion: cred.default_region,
        isActive: cred.is_active,
        hasMissingFields: hasMissingFields,
        credentialValue: credentialValue,
        createdAt: cred.created_at,
        updatedAt: cred.updated_at
      };
    });
    
    return {
      success: true,
      credentials: credentials
    };
    
  } catch (error) {
    console.error('Error fetching cloud credentials:', error);
    
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    
    return {
      success: false,
      error: error.message || 'Failed to fetch cloud credentials'
    };
  } finally {
    client.release();
  }
});
