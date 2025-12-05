import pool from '../services/dbConnectors/postgresConnector.js';

/**
 * Verify that the authenticated user owns the specified project
 * @param {string} userId - The authenticated user's ID
 * @param {string} projectId - The project ID to check
 * @returns {Promise<boolean>} - Returns true if user owns the project
 * @throws {Error} - Throws error if access is denied or query fails
 */
export async function verifyProjectAccess(userId, projectId) {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `SELECT user_id FROM ${process.env.PG_DB_SCHEMA}.projects WHERE project_id = $1`,
      [projectId]
    );
    
    if (result.rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Project not found'
      });
    }
    
    if (result.rows[0].user_id !== userId) {
      throw createError({
        statusCode: 403,
        message: 'Access denied'
      });
    }
    
    return true;
  } finally {
    client.release();
  }
}
