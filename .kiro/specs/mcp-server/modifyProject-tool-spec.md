# modifyProject MCP Tool - Technical Implementation Spec

## Overview
Add a new MCP tool called `modifyProject` that allows AI assistants to request modifications to existing backend projects. This tool will queue modification requests to be processed by the separate Worker project.

## Queue Data Format
The Worker is expecting jobs with this structure:
```javascript
{
  user_id: "user_abc123",
  project_id: "proj_xyz789",
  mcp_key_id: "mcp_key_456",
  tool_name: "modifyProject",
  streamId: "stream_123abc",
  request_params: {
    modificationRequest: "Add a new GET /users/:id endpoint"
  }
}
```

## Implementation Requirements

### 1. Add Tool Definition to mcpTools.js
**File**: `server/utils/mcpTools.js`

Add new tool definition to the `getToolDefinitions()` array:

```javascript
{
  name: "modifyProject",
  description: "Request modifications to an existing backend project. Accepts natural language modification requests that will be processed by an AI agent. This is a long-running operation that streams progress updates.",
  inputSchema: {
    type: "object",
    properties: {
      modificationRequest: {
        type: "string",
        description: "Natural language description of the modification to make (e.g., 'Add a new GET /users/:id endpoint', 'Create a middleware for rate limiting', 'Add a new database table for storing user preferences')"
      }
    },
    required: ["modificationRequest"]
  }
}
```

### 2. Update mcpHandler.js Job Queueing Logic
**File**: `server/utils/mcpHandler.js`

**Current behavior**: All tools use the same job name `"initialProjectCreationJob"`

**Required changes**:
- Add conditional logic to determine the correct job name based on `toolName`
- For `modifyProject` tool, use job name: `"projectModificationJob"`
- Keep existing job name for other tools

**Implementation approach**:
```javascript
// Determine job name based on tool
let jobName;
if (toolName === "modifyProject") {
  jobName = "projectModificationJob";
} else {
  jobName = "initialProjectCreationJob";
}

// Add job to queue with dynamic job name
const job = await queue.add(jobName, {
  mcp_key_id: toolArguments._apiKey,
  project_id,
  user_id,
  request_id,
  tool_name: toolName,
  streamId,
  request_params: toolArguments
}, {
  attempts: 3
});
```

### 3. Database Tracking
**No changes required** - The existing `mcp_requests` table already tracks all tool calls:
- `request_id`: Unique identifier for this request
- `mcp_key_id`: Which MCP key was used
- `tool_name`: Will be "modifyProject"
- `request_params`: Will contain `{ modificationRequest: "..." }`
- `response_status`: Tracks 'pending', 'success', or 'error'
- `created_at`: Unix timestamp

### 4. Response Handling
**No changes required** - The existing SSE stream and Redis pub/sub mechanism will handle responses:
- Worker publishes progress updates to Redis channel (streamId)
- Backend subscribes to the channel and streams updates to client
- Final result is sent when Worker publishes `{ complete: true }`

## Files to Modify

1. **server/utils/mcpTools.js**
   - Add `modifyProject` tool definition to array

2. **server/utils/mcpHandler.js**
   - Add conditional logic to determine job name based on tool_name
   - Use `"projectModificationJob"` for modifyProject tool
   - Keep `"initialProjectCreationJob"` for other tools

## Worker Project Responsibilities (Out of Scope)
The separate Worker project must:
- Listen for `"projectModificationJob"` jobs
- Process the `modificationRequest` using AI agent
- Publish progress updates to Redis channel (streamId)
- Publish final result with `{ complete: true, content: "...", isError: false }`
- Handle errors and publish `{ complete: true, content: "error message", isError: true }`

## Testing Approach
1. Call MCP endpoint with `modifyProject` tool
2. Verify job is added to queue with correct job name
3. Verify `mcp_requests` record is created with correct data
4. Verify SSE stream is established
5. Mock Worker response via Redis pub/sub
6. Verify client receives streamed updates and final result

## Example MCP Request
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "modifyProject",
    "arguments": {
      "modificationRequest": "Add a new GET /users/:id endpoint that returns user details from the database"
    }
  }
}
```

## Example Queue Job Data
```javascript
{
  user_id: "user_clk123abc",
  project_id: "proj_xyz789",
  mcp_key_id: "mcp_key_456def",
  tool_name: "modifyProject",
  streamId: "V1StGXR8_Z5jdHi6B-myT",
  request_params: {
    modificationRequest: "Add a new GET /users/:id endpoint that returns user details from the database"
  }
}
```

## Success Criteria
- ✅ New tool appears in `tools/list` response
- ✅ Tool accepts `modificationRequest` parameter
- ✅ Job is queued with name `"projectModificationJob"`
- ✅ Job data matches expected Worker format
- ✅ Request is tracked in `mcp_requests` table
- ✅ SSE stream is established for progress updates
- ✅ Worker can process job and send responses back
