-- Create cloud_credentials table
CREATE TABLE "TurboBackend".cloud_credentials (
    credential_id VARCHAR PRIMARY KEY,
    project_id VARCHAR,
    cloud_provider VARCHAR,
    credential_name VARCHAR,
    parameter_store_path VARCHAR,
    default_region VARCHAR,
    is_active BOOLEAN,
    created_at BIGINT,
    updated_at BIGINT
);

-- Create resource_preferences table
CREATE TABLE "TurboBackend".resource_preferences (
    preference_id VARCHAR PRIMARY KEY,
    project_id VARCHAR,
    resource_type VARCHAR,
    preferred_cloud_provider VARCHAR,
    preferred_credential_id VARCHAR,
    preferred_region VARCHAR,
    resource_settings JSONB,
    created_at BIGINT,
    updated_at BIGINT
);
