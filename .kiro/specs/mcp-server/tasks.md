# MCP Server Implementation Tasks

## Setup and Configuration

- [x] 1. Install dependencies
  - BullMQ package is already installed in package.json
  - _Requirements: AC5_

- [x] 2. Add environment variables to .env.local (optional)
  - Add `MCP_RATE_LIMIT` (requests per hour per key, default: 100 if not set)
  - _Requirements: AC2_

## Core MCP Infrastructure

- [x] 3. Create MCP response formatter utility
  - **File**: `server/utils/mcpFormatter.js`
  - Implement `formatSuccess(id, result)` for JSON-RPC 2.0 success responses
  - Implement `formatError(id, code, message)` for JSON-RPC 2.0 error responses
  - Implement `formatToolResult(content, isError)` for tool execution results
  - _Requirements: AC6_

- [x] 4. Create MCP tools registry
  - **File**: `server/utils/mcpTools.js`
  - Implement `getToolDefinitions()` function that returns array of tool schemas
  - Define `spin_up_new_backend_project` tool with input schema (projectName, includeAuth, includeDatabase, includeRedis, includeEmail)
  - Define `modify_backend_code` tool with input schema (projectPath, modificationType, fileContent, filePath, additionalContext)
  - _Requirements: AC1, AC3, AC4_

- [x] 5. Create SSE streaming utilities
  - **File**: `server/utils/sseStream.js`
  - Implement `createSSEStream(event)` to initialize SSE response with proper headers
  - Implement `sendSSEEvent(stream, eventId, data)` to send formatted SSE events
  - Include methods for sendProgress and sendComplete
  - _Requirements: AC3, AC4_

- [x] 6. Create MCP request handler
  - **File**: `server/utils/mcpHandler.js`
  - Implement `handleMCPRequest(requestBody, event)` function
  - Validate JSON-RPC 2.0 format
  - Extract project_id, user_id, mcp_key_id from event.context
  - Handle "tools/list" method by calling getToolDefinitions()
  - Handle "tools/call" method by creating SSE stream, generating request_id (nanoid), inserting into mcp_requests table, queueing job, subscribing to Redis pub/sub, and streaming results
  - Update mcp_requests table with response_status on completion
  - _Requirements: AC1, AC3, AC4, AC5, AC6_

- [x] 7. Create MCP endpoint route
  - **File**: `server/routes/mcp/index.post.js`
  - Create POST route handler for /mcp endpoint
  - Parse request body and validate MCP-Protocol-Version header
  - Call handleMCPRequest() with request body and event
  - Return formatted response (JSON or SSE stream based on Accept header)
  - Handle errors with formatError()
  - _Requirements: AC1, AC3, AC4, AC6_

## Authentication and Security

- [x] 8. Create MCP authentication middleware
  - **File**: `server/middleware/mcpAuth.js`
  - Extract Authorization Bearer token from request headers
  - Hash the mcp_key using crypto
  - Query TurboBackend.mcp_keys table to find matching key
  - Verify is_active = true and expires_at is null or > current timestamp
  - Get project_id, user_id, mcp_key_id from mcp_keys table
  - Implement rate limiting by counting recent requests in mcp_requests table
  - Update last_used_at timestamp in mcp_keys table
  - Attach project_id, user_id, mcp_key_id to event.context
  - Return 401 for unauthorized, 429 for rate limit exceeded
  - _Requirements: AC2_

- [x] 9. Create file system safety utilities
  - **File**: `server/utils/fileSystemSafety.js`
  - Implement `validatePath(path, baseDir)` to prevent directory traversal
  - Implement `safeWriteFile(filePath, content, baseDir)` with validation
  - Implement `safeCreateDirectory(dirPath, baseDir)` with validation
  - _Requirements: AC2_

## Job Queue System

- [x] 10. Create job queue service
  - **File**: `server/services/jobQueue.js`
  - Initialize BullMQ using existing Redis connection from redisConnector.js
  - Create "spin-up-project" queue
  - Create "modify-code" queue
  - Implement `addJob(queueName, jobData, sseStreamId)` function
  - Implement `getQueue(queueName)` function
  - Export queue instances
  - _Requirements: AC5_

## Background Worker

- [ ] 11. Create worker entry point
  - **File**: `worker.js` (root directory)
  - Connect to Redis using same configuration as server
  - Initialize BullMQ workers for both queues
  - Set up error handling and logging
  - Add graceful shutdown on SIGTERM/SIGINT
  - _Requirements: AC7_

- [ ] 12. Implement spin up project job processor
  - **File**: `worker.js` or `server/services/workers/spinUpProjectWorker.js`
  - Implement `processSpinUpProjectJob(job)` function
  - Publish progress updates to Redis pub/sub channel using job.data.sseStreamId
  - Create project directory structure (location determined by worker logic)
  - Copy template files from current backend (server/, package.json, nitro.config.js, .env.local template)
  - Handle optional features based on includeAuth, includeDatabase, includeRedis, includeEmail flags
  - Run npm install in new project directory
  - Publish final result with complete: true to Redis channel
  - _Requirements: AC3, AC7_

- [x] 13. Implement modify code job processor
  - **File**: `worker.js` or `server/services/workers/modifyCodeWorker.js`
  - Implement `processModifyCodeJob(job)` function
  - Publish progress updates to Redis pub/sub channel using job.data.sseStreamId
  - Handle "add_route" modification type (create route file at specified path)
  - Handle "add_middleware" modification type (create middleware file)
  - Handle "add_service" modification type (create service file)
  - Handle "add_database_table" modification type (create migration file or SQL)
  - Handle "modify_existing_file" modification type (read, modify, write file)
  - Use fileSystemSafety utilities for all file operations
  - Publish final result with complete: true to Redis channel
  - _Requirements: AC4, AC7_

## Testing and Documentation

- [ ] 14. Create manual testing script
  - **File**: `test-mcp.js` or similar
  - Test "tools/list" endpoint with valid API key
  - Test "spin_up_new_backend_project" tool with SSE streaming
  - Test "modify_backend_code" tool with different modification types
  - Test authentication with invalid API key (expect 401)
  - Test rate limiting by making multiple requests (expect 429)
  - _Requirements: AC1, AC2, AC3, AC4_

- [ ] 15. Add documentation
  - **File**: `README.md` or `docs/MCP_SERVER.md`
  - Document how to start the worker process (node worker.js)
  - Document MCP endpoint usage with example requests
  - Document environment variables (MCP_RATE_LIMIT)
  - Add example MCP requests for both tools
  - Document worker process management for production (PM2, systemd)
  - _Requirements: AC1, AC2, AC3, AC4, AC7_
