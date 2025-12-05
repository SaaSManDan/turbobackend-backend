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
    
    // Fetch database schemas
    const result = await client.query(
      `SELECT database_id, project_id, user_id, db_name, db_schema, 
              environment, is_active, created_at, updated_at
       FROM ${process.env.PG_DB_SCHEMA}.project_databases 
       WHERE project_id = $1 AND environment = $2
       ORDER BY created_at DESC`,
      [projectId, environment]
    );
    
    return {
      success: true,
      databases: result.rows
    };
    
  } catch (error) {
    console.error('Error fetching project databases:', error);
    
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    
    return {
      success: false,
      error: error.message || 'Failed to fetch project databases'
    };
  } finally {
    client.release();
  }
});
