import pool from '../server/services/dbConnectors/postgresConnector.js';

async function createTables() {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        console.log('Creating cloud_credentials table...');
        await client.query(`
            CREATE TABLE ${process.env.PG_DB_SCHEMA}.cloud_credentials (
                credential_id VARCHAR PRIMARY KEY,
                project_id VARCHAR NOT NULL,
                cloud_provider VARCHAR NOT NULL,
                credential_name VARCHAR NOT NULL,
                parameter_store_path VARCHAR NOT NULL,
                default_region VARCHAR,
                is_active BOOLEAN DEFAULT true,
                created_at BIGINT NOT NULL,
                updated_at BIGINT NOT NULL
            );
        `);
        console.log('✓ cloud_credentials table created');
        
        console.log('Creating resource_preferences table...');
        await client.query(`
            CREATE TABLE ${process.env.PG_DB_SCHEMA}.resource_preferences (
                preference_id VARCHAR PRIMARY KEY,
                project_id VARCHAR NOT NULL,
                resource_type VARCHAR NOT NULL,
                preferred_cloud_provider VARCHAR NOT NULL,
                preferred_credential_id VARCHAR,
                preferred_region VARCHAR,
                resource_settings JSONB,
                created_at BIGINT NOT NULL,
                updated_at BIGINT NOT NULL
            );
        `);
        console.log('✓ resource_preferences table created');
        
        console.log('Creating indexes...');
        await client.query(`
            CREATE INDEX idx_cloud_credentials_project_id ON ${process.env.PG_DB_SCHEMA}.cloud_credentials(project_id);
        `);
        await client.query(`
            CREATE INDEX idx_cloud_credentials_is_active ON ${process.env.PG_DB_SCHEMA}.cloud_credentials(is_active);
        `);
        await client.query(`
            CREATE INDEX idx_resource_preferences_project_id ON ${process.env.PG_DB_SCHEMA}.resource_preferences(project_id);
        `);
        await client.query(`
            CREATE INDEX idx_resource_preferences_resource_type ON ${process.env.PG_DB_SCHEMA}.resource_preferences(resource_type);
        `);
        console.log('✓ Indexes created');
        
        await client.query('COMMIT');
        console.log('\n✅ All tables and indexes created successfully!');
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error creating tables:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

createTables();
