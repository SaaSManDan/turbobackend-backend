import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import pool from '../server/services/dbConnectors/postgresConnector.js';
import { encryptKey } from '../server/utils/encryption.js';
import { nanoid } from 'nanoid';

async function insertSampleCredentials() {
  const client = await pool.connect();
  
  try {
    const projectId = 't9mpmjuljOinbwqkv5Zkq';
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Define credentials to insert
    const credentialsToInsert = [
      {
        credentialName: 'STRIPE_SECRET_KEY',
        cloudProvider: 'stripe',
        fields: { STRIPE_SECRET_KEY: '' }
      },
      {
        credentialName: 'STRIPE_PUBLISHABLE_KEY',
        cloudProvider: 'stripe',
        fields: { STRIPE_PUBLISHABLE_KEY: '' }
      },
      {
        credentialName: 'STRIPE_WEBHOOK_SECRET',
        cloudProvider: 'stripe',
        fields: { STRIPE_WEBHOOK_SECRET: '' }
      },
      {
        credentialName: 'CLERK_SECRET_KEY',
        cloudProvider: 'clerk',
        fields: { CLERK_SECRET_KEY: '' }
      },
      {
        credentialName: 'CLERK_PUBLISHABLE_KEY',
        cloudProvider: 'clerk',
        fields: { CLERK_PUBLISHABLE_KEY: '' }
      },
      {
        credentialName: 'CLERK_WEBHOOK_SECRET',
        cloudProvider: 'clerk',
        fields: { CLERK_WEBHOOK_SECRET: '' }
      }
    ];
    
    await client.query('BEGIN');
    
    for (const cred of credentialsToInsert) {
      const credentialId = nanoid();
      const encryptedCredential = encryptKey(JSON.stringify(cred.fields));
      
      await client.query(
        `INSERT INTO ${process.env.PG_DB_SCHEMA}.cloud_credentials 
         (credential_id, project_id, cloud_provider, credential_name, 
          credential, default_region, is_active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          credentialId,
          projectId,
          cred.cloudProvider,
          cred.credentialName,
          encryptedCredential,
          null,
          true,
          currentTime,
          currentTime
        ]
      );
      
      console.log(`Inserted credential: ${cred.credentialName}`);
    }
    
    await client.query('COMMIT');
    console.log('All sample credentials inserted successfully');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting sample credentials:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

insertSampleCredentials();
