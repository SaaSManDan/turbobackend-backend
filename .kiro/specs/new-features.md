# New Features Planning

## Feature 1: Project Resource Endpoints ✅ IMPLEMENTED
Create endpoints to retrieve project-specific resources with RLS checks:

- **Get Actions**: Retrieve actions from `project_actions` table
  - Filter by: project_id, environment
  - Include: RLS check
  - Endpoint: `GET /v1/getProjectActions`
  
- **Get Database Schemas**: Retrieve database table schemas from `project_databases` table
  - Filter by: project_id, environment
  - Include: RLS check
  - Endpoint: `GET /v1/getProjectDatabases`
  
- **Get API Endpoints**: Retrieve API endpoints from `api_blueprints` table
  - Filter by: project_id, environment
  - Include: RLS check
  - Endpoint: `GET /v1/getApiBlueprints`
  
- **Get Deployments**: Retrieve backend application deployments from `project_deployments` table
  - Filter by: project_id, environment
  - Include: RLS check
  - Endpoint: `GET /v1/getProjectDeployments`

**Implementation Details**:
- Created reusable RLS check function: `server/utils/rlsCheck.js`
- All endpoints use `verifyProjectAccess()` to ensure user owns the project

## Feature 2: S3 Code File Access ✅ IMPLEMENTED
Implement functionality to access project code files stored in S3:

- Get list of code files from project's S3 bucket
  - Endpoint: `GET /v1/getProjectFiles?projectId=xxx`
  
- Get code file contents from project's S3 bucket
  - Endpoint: `GET /v1/getProjectFileContent?projectId=xxx&filePath=xxx`

**Implementation Details**:
- Created S3 service: `server/services/s3Service.js`
- Uses AWS SDK v3 with `ListObjectsV2Command` and `GetObjectCommand`
- Both endpoints include RLS checks
- Requires AWS credentials in `.env.local`:
  - `AWS_REGION`
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `S3_PROJECTS_BUCKET`

## Feature 3: New MCP Endpoints
Additional MCP endpoints needed (details TBD)

## Feature 4: Cloud Credentials & Secrets Management
Endpoints for managing production cloud credentials:

- Get cloud credentials for production resources
- Store keys from these resources in AWS Parameter Store as SecureString
