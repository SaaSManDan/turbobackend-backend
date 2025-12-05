import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import pool from '../server/services/dbConnectors/postgresConnector.js';

async function renameColumn() {
  const client = await pool.connect();
  
  try {
    await client.query(`
      ALTER TABLE ${process.env.PG_DB_SCHEMA}.cloud_credentials 
      RENAME COLUMN parameter_store_path TO credential;
    `);
    
    console.log('Successfully renamed parameter_store_path to credential');
    
  } catch (error) {
    console.error('Error renaming column:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

renameColumn();
