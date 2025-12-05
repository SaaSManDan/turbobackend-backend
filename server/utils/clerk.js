// server/utils/clerk.js
import { verifyToken } from '@clerk/backend'

export async function requireUser(event) {
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'No token provided' })
  }

  try {
    const verifiedToken = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      authorizedParties: ['http://localhost:3000'],
    })

    event.context.auth = { userId: verifiedToken.sub, sessionId: verifiedToken.sid }
    console.log("Token verification successful.")
  } catch (error) {
    console.error('Token verification error:', error)
    throw createError({ statusCode: 401, statusMessage: `Invalid token: ${error.message}` })
  }
}
