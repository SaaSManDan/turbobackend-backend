export default defineEventHandler((event) => {
    const origin = getHeader(event, 'origin')
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001']
    const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : 'http://localhost:3000'

    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'Access-Control-Allow-Headers': 'authorization,content-type'
    })

    if (event.method === 'OPTIONS') {
      event.node.res.statusCode = 200
      return 'OK'
    }
})  