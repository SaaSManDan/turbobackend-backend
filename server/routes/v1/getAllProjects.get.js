import pool from '../../services/dbConnectors/postgresConnector.js';

export default defineEventHandler(async function(event) {
  const client = await pool.connect();
  
  try {
    // Get user_id from auth context
    const userId = event.context.auth.userId;
    
    // Fetch all projects for the user
    const result = await client.query(
      `SELECT project_id, project_name, created_at, updated_at 
       FROM ${process.env.PG_DB_SCHEMA}.projects 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );
    
    return {
      success: true,
      projects: result.rows
    };
    
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    setResponseStatus(event, 500);
    return {
      success: false,
      error: 'Failed to fetch projects'
    };
  } finally {
    client.release();
  }
});
