import pool from '../../services/dbConnectors/postgresConnector.js';
import { verifyProjectAccess } from '../../utils/rlsCheck.js';

export default defineEventHandler(async function(event) {
  const client = await pool.connect();
  
  try {
    const body = await readBody(event);
    const { projectId, projectName } = body;
    const userId = event.context.auth.userId;
    
    // Validate input
    if (!projectId) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'projectId is required'
      };
    }
    
    if (!projectName) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'projectName is required'
      };
    }
    
    // RLS check
    await verifyProjectAccess(userId, projectId);
    
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Update project name
    const result = await client.query(
      `UPDATE ${process.env.PG_DB_SCHEMA}.projects 
       SET project_name = $1, updated_at = $2
       WHERE project_id = $3
       RETURNING project_id, project_name, updated_at`,
      [projectName, currentTime, projectId]
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
      project: result.rows[0],
      message: 'Project name updated successfully'
    };
    
  } catch (error) {
    console.error('Error updating project name:', error);
    
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    
    return {
      success: false,
      error: error.message || 'Failed to update project name'
    };
  } finally {
    client.release();
  }
});
