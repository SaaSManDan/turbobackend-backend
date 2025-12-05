# MCP Server Requirements

## Overview
Create an MCP (Model Context Protocol) server within this Nitro.js backend that exposes two tools for AI assistants to programmatically create and modify backend projects.

## Acceptance Criteria

### AC1: MCP Server Metadata Endpoint
- GIVEN an AI assistant connects to the MCP server
- WHEN it requests available tools via "tools/list" method
- THEN it receives a list of available tools with their schemas
- AND the response includes tool names, descriptions, and input schemas

### AC2: Authentication and Security
- GIVEN an incoming MCP request
- WHEN the request is received at the MCP endpoint
- THEN it must be validated for proper authentication
- AND rate limiting must be applied to prevent abuse
- AND all file system operations must be validated to prevent directory traversal attacks

### AC3: spin_up_new_backend_project Tool
- GIVEN an AI assistant calls the "spin_up_new_backend_project" tool
- WHEN valid parameters are provided (projectName, optional feature flags)
- THEN a new backend project is created asynchronously via job queue
- AND a job ID is returned immediately
- AND the job creates the project structure based on this current backend as a template

### AC4: modify_backend_code Tool
- GIVEN an AI assistant calls the "modify_backend_code" tool
- WHEN valid parameters are provided (projectPath, modificationType, fileContent, filePath)
- THEN the specified modification is queued as a job
- AND a job ID is returned immediately
- AND the job performs the requested code modification

### AC5: Job Queue System
- GIVEN long-running operations need to be executed
- WHEN a tool is called that requires async processing
- THEN the operation is queued in Redis using BullMQ
- AND a background worker processes the job
- AND job status is tracked in Redis

### AC6: MCP Response Formatting
- GIVEN any MCP request is processed
- WHEN a response needs to be sent
- THEN it must follow the JSON-RPC 2.0 format
- AND include proper error handling with MCP-compliant error responses

### AC7: Background Worker Process
- GIVEN jobs are queued in Redis
- WHEN the worker process is running
- THEN it picks up jobs from the queue
- AND executes the tool logic
- AND updates job status appropriately
- AND handles failures with retries

## Constraints
- Must use existing Redis connection from this backend
- Must follow existing project structure conventions
- Must use regular functions (not arrow functions) per project standards
- Must use try/catch for async operations per project standards
- Worker must be a separate process from the Nitro server

## Out of Scope
- Job status polling tools (get_job_status, list_jobs)
- Real-time job progress updates
- Job cancellation functionality
- Web UI for job monitoring
