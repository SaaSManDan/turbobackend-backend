import { defineNitroConfig } from 'nitropack/config'
import dotenv from 'dotenv'

// Load .env.local file
dotenv.config({ path: '.env.local' })

// nitro.config.js
export default defineNitroConfig({
    compatibilityDate: '2025-10-18',
    srcDir: 'server', // optional — ensures your routes are loaded from /server
    devServer: {
        port: 3001,
    },
})
