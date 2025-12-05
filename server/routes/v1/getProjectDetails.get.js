import pool from '../../services/dbConnectors/postgresConnector.js';
import { verifyProjectAccess } from '../../utils/rlsCheck.js';

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
    
    // Fetch project details
    const result = await client.query(
      `SELECT project_id, project_name, created_at, updated_at
       FROM ${process.env.PG_DB_SCHEMA}.projects 
       WHERE project_id = $1`,
      [projectId]
    );
    
    if (result.rows.length === 0) {
      setResponseStatus(event, 404);
      return {
        success: false,
        error: 'Project not found'
      };
    }
    
    return {
      success: true,
      project: result.rows[0]
    };
    
  } catch (error) {
    console.error('Error fetching project details:', error);
    
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    
    return {
      success: false,
      error: error.message || 'Failed to fetch project details'
    };
  } finally {
    client.release();
  }
});
