# MCP Server Design

## File Structure

```
server/
├── routes/
│   └── mcp/
│       └── index.post.js          # Main MCP endpoint
├── middleware/
│   └── mcpAuth.js                 # Authentication & rate limiting
├── utils/
│   ├── mcpHandler.js              # Request routing logic
│   ├── mcpTools.js                # Tool definitions registry
│   ├── mcpFormatter.js            # Response formatting
│   └── sseStream.js               # SSE streaming utilities
└── services/
    └── jobQueue.js                # BullMQ job queue service
```

---

## File Details

### server/routes/mcp/index.post.js
**Purpose**: Main HTTP endpoint for MCP requests

**Request**:
```javascript
POST /mcp
Headers:
  Content-Type: application/json
  Accept: application/json, text/event-stream
  Authorization: Bearer <MCP_API_KEY>
  MCP-Protocol-Version: 2025-11-25

Body:
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list" | "tools/call",
  "params": {
    "name": "tool_name",        // for tools/call only
    "arguments": { ... }         // for tools/call only
  }
}
```

**Response (JSON)**:
```javascript
Content-Type: application/json
Status: 200

{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { ... }
}
```

**Response (SSE Stream for tools/call)**:
```javascript
Content-Type: text/event-stream
Status: 200

id: 1
data: 

id: 2
data: {"jsonrpc":"2.0","method":"notifications/progress","params":{"progress":0.1,"message":"Starting..."}}

id: 3
data: {"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"Complete"}]}}
```

**Functions**:
```javascript
export default defineEventHandler(async function(event) {
  // 1. Parse request body
  // 2. Validate authentication via mcpAuth middleware
  // 3. Call handleMCPRequest()
  // 4. Return response (JSON or SSE stream)
  // 5. Handle errors with formatError()
})
```

---

### server/middleware/mcpAuth.js
**Purpose**: Validate API key and apply rate limiting

**Functions**:
```javascript
export default defineEventHandler(async function(event) {
  // 1. Extract Authorization header (Bearer token)
  // 2. Hash the mcp_key from header
  // 3. Query TurboBackend.mcp_keys table to find matching key
  // 4. Verify key exists and is_active = true
  // 5. Verify expires_at is null or > current timestamp
  // 6. Get associated project_id and user_id from mcp_keys table
  // 7. Check rate limit by counting recent requests in mcp_requests table or Redis
  // 8. Update last_used_at timestamp in mcp_keys table
  // 9. Attach project_id and user_id to event.context for downstream use
  // 10. Throw 401 if unauthorized
  // 11. Throw 429 if rate limit exceeded
})
```

---

### server/utils/mcpHandler.js
**Purpose**: Route MCP requests to appropriate handlers

**Functions**:
```javascript
export async function handleMCPRequest(requestBody, event) {
  // INPUT: { jsonrpc, id, method, params }
  // OUTPUT: MCP response object OR SSE stream
  
  // 1. Validate JSON-RPC format
  // 2. Extract project_id, user_id, mcp_key_id from event.context (set by mcpAuth)
  // 3. Switch on method:
  //    - "tools/list" → call getToolDefinitions() and return JSON
  //    - "tools/call" → create SSE stream, queue job, stream results
  // 4. For tools/call:
  //    - Generate unique streamId and request_id (nanoid)
  //    - Insert record into TurboBackend.mcp_requests table with status "pending"
  //    - Create SSE stream
  //    - Add job to queue with streamId, project_id, user_id
  //    - Subscribe to Redis pub/sub for streamId
  //    - Forward Redis messages to SSE stream
  //    - When complete, update mcp_requests table with response_status ("success" or "error")
  //    - Close stream when complete
}
```

---

### server/utils/mcpTools.js
**Purpose**: Define available tools and their schemas

**Functions**:
```javascript
export function getToolDefinitions() {
  // OUTPUT: Array of tool definitions
  
  return [
    {
      name: "spin_up_new_backend_project",
      description: "Creates a new Nitro.js backend project with optional features. This is a long-running operation that streams progress updates.",
      inputSchema: {
        type: "object",
        properties: {
          projectName: {
            type: "string",
            description: "Name of the new backend project"
          },
          includeAuth: {
            type: "boolean",
            description: "Include Clerk authentication setup"
          },
          includeDatabase: {
            type: "boolean",
            description: "Include Postgres database setup"
          },
          includeRedis: {
            type: "boolean",
            description: "Include Redis setup"
          },
          includeEmail: {
            type: "boolean",
            description: "Include email service setup"
          }
        },
        required: ["projectName"]
      }
    },
    {
      name: "modify_backend_code",
      description: "Modifies or adds code to an existing backend project. Streams progress updates.",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: {
            type: "string",
            description: "Path to the backend project"
          },
          modificationType: {
            type: "string",
            enum: ["add_route", "add_middleware", "add_service", "add_database_table", "modify_existing_file"],
            description: "Type of modification to perform"
          },
          fileContent: {
            type: "string",
            description: "The code content to add or modify"
          },
          filePath: {
            type: "string",
            description: "Relative path where file should be created/modified"
          },
          additionalContext: {
            type: "object",
            description: "Extra parameters based on modification type"
          }
        },
        required: ["projectPath", "modificationType", "fileContent", "filePath"]
      }
    }
  ]
}
```

---

### server/utils/mcpFormatter.js
**Purpose**: Format responses according to MCP JSON-RPC spec

**Functions**:
```javascript
export function formatSuccess(id, result) {
  // INPUT: id (number), result (object)
  // OUTPUT: MCP-compliant success response
  
  return {
    jsonrpc: "2.0",
    id: id,
    result: result
  }
}

export function formatError(id, code, message) {
  // INPUT: id (number|null), code (number), message (string)
  // OUTPUT: MCP-compliant error response
  
  return {
    jsonrpc: "2.0",
    id: id,
    error: {
      code: code,
      message: message
    }
  }
}

export function formatToolResult(content, isError = false) {
  // INPUT: content (string or array), isError (boolean)
  // OUTPUT: Tool result object
  
  return {
    content: Array.isArray(content) ? content : [
      {
        type: "text",
        text: content
      }
    ],
    isError: isError
  }
}
```

---

### server/utils/sseStream.js
**Purpose**: Utilities for creating and managing SSE streams

**Functions**:
```javascript
export function createSSEStream(event) {
  // INPUT: Nitro event object
  // OUTPUT: SSE stream writer object
  
  // 1. Set headers for SSE
  // 2. Return object with methods:
  //    - sendEvent(id, data)
  //    - sendProgress(message, progress)
  //    - sendComplete(result)
  //    - close()
}

export function sendSSEEvent(stream, eventId, data) {
  // INPUT: stream, eventId (number), data (object)
  // OUTPUT: void
  
  // 1. Format as SSE event
  // 2. Write to stream
}
```

---

### server/services/jobQueue.js
**Purpose**: Manage BullMQ job queues for long-running operations

**Functions**:
```javascript
export function initializeQueues() {
  // Initialize BullMQ queues using existing Redis connection
  // Create "spin-up-project" queue
  // Create "modify-code" queue
  // Return queue instances
}

export async function addJob(queueName, jobData, sseStreamId) {
  // INPUT: queueName (string), jobData (object with project_id, user_id, params), sseStreamId (string)
  // OUTPUT: Job object with jobId
  
  // 1. Get queue by name
  // 2. Add job to queue with data (including project_id, user_id) and sseStreamId
  // 3. Return job object
}

export function getQueue(queueName) {
  // INPUT: queueName (string)
  // OUTPUT: Queue instance
}
```



---

## Data Flow

### tools/list Request
```
Client → POST /mcp (method: "tools/list")
  ↓
mcpAuth middleware validates
  ↓
handleMCPRequest() routes to getToolDefinitions()
  ↓
formatSuccess() wraps result
  ↓
Return JSON response with tool list
```

### tools/call Request (with SSE)
```
Client → POST /mcp (method: "tools/call", Accept: text/event-stream)
  ↓
mcpAuth middleware validates mcp_key
  ↓
mcpAuth queries TurboBackend.mcp_keys table
  ↓
mcpAuth attaches project_id, user_id, mcp_key_id to event.context
  ↓
mcpAuth updates last_used_at in mcp_keys table
  ↓
handleMCPRequest() creates SSE stream with unique streamId
  ↓
Insert record into TurboBackend.mcp_requests table (status: "pending")
  ↓
Add job to queue with streamId, project_id, user_id
  ↓
Subscribe to Redis pub/sub channel for streamId
  ↓
Send initial SSE event (empty data)
  ↓
[External Worker picks up job from queue]
  ↓
[Worker publishes progress updates to Redis channel]
  ↓
SSE stream receives updates from Redis and sends to client
  ↓
[Worker publishes final result with complete: true]
  ↓
Update mcp_requests table with response_status ("success" or "error")
  ↓
SSE stream sends final result and closes
```

**Note**: The Worker is an external process (not part of this MCP server) that listens to the job queues and publishes progress to Redis pub/sub channels.

---

## Environment Variables

```bash
MCP_RATE_LIMIT=100                    # Requests per hour per key (default if not set)
```

---

## Error Handling

### MCP Error Codes
- `-32700`: Parse error (invalid JSON)
- `-32600`: Invalid request (malformed JSON-RPC)
- `-32601`: Method not found
- `-32602`: Invalid params (schema validation failed)
- `-32603`: Internal error

### HTTP Status Codes
- `200`: Success
- `401`: Unauthorized (invalid API key)
- `429`: Too Many Requests (rate limit exceeded)
- `400`: Bad Request (invalid MCP request)
- `500`: Internal Server Error
