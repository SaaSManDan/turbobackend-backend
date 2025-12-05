import pool from '../../services/dbConnectors/postgresConnector.js';
import { verifyProjectAccess } from '../../utils/rlsCheck.js';

export default defineEventHandler(async function(event) {
  const client = await pool.connect();
  
  try {
    const userId = event.context.auth.userId;
    const query = getQuery(event);
    const { projectId, environment } = query;
    
    // Validate input
    if (!projectId || !environment) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'projectId and environment are required'
      };
    }
    
    // RLS check
    await verifyProjectAccess(userId, projectId);
    
    // Fetch deployments
    const result = await client.query(
      `SELECT deployment_id, project_id, platform, app_name, url, 
              status, deployed_at, last_updated
       FROM ${process.env.PG_DB_SCHEMA}.project_deployments 
       WHERE project_id = $1
       ORDER BY deployed_at DESC`,
      [projectId]
    );
    
    return {
      success: true,
      deployments: result.rows
    };
    
  } catch (error) {
    console.error('Error fetching project deployments:', error);
    
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    
    return {
      success: false,
      error: error.message || 'Failed to fetch project deployments'
    };
  } finally {
    client.release();
  }
});
