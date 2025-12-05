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
    
    // Fetch API blueprints
    const result = await client.query(
      `SELECT blueprint_id, project_id, request_id, blueprint_content, created_at
       FROM ${process.env.PG_DB_SCHEMA}.api_blueprints 
       WHERE project_id = $1
       ORDER BY created_at DESC`,
      [projectId]
    );
    
    return {
      success: true,
      blueprints: result.rows
    };
    
  } catch (error) {
    console.error('Error fetching API blueprints:', error);
    
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    
    return {
      success: false,
      error: error.message || 'Failed to fetch API blueprints'
    };
  } finally {
    client.release();
  }
});
