/**
 * MCP Response Formatter Utility
 * Formats responses according to JSON-RPC 2.0 specification
 */

export function formatSuccess(id, result) {
  return {
    jsonrpc: "2.0",
    id: id,
    result: result
  };
}

export function formatError(id, code, message) {
  return {
    jsonrpc: "2.0",
    id: id,
    error: {
      code: code,
      message: message
    }
  };
}

export function formatToolResult(content, isError = false) {
  return {
    content: Array.isArray(content) ? content : [
      {
        type: "text",
        text: content
      }
    ],
    isError: isError
  };
}
