// server/middleware/auth.js
import { requireUser } from '../utils/clerk'

export default defineEventHandler(async (event) => {
  if (event.method === 'OPTIONS') return
  if (event.path?.startsWith('/webhooks')) return
  if (event.path?.startsWith('/v1/vscode-extension-key/validate')) return
  if (event.path?.startsWith('/v1/handleFileSync')) return
  if (event.path?.startsWith('/mcp')) return
  await requireUser(event)
})
