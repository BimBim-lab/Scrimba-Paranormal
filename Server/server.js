import http from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet, handlePost, handleNews } from './handlers/routeHandlers.js'

const PORT = 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PUBLIC_DIR = join(__dirname, '..')
// Using import.meta.dirname is not standard, so we use dirname from path module
console.log(PUBLIC_DIR)

const server = http.createServer(async (req, res) => {

    if (req.url === '/api') {

        if (req.method === 'GET') {
            return await handleGet(res)
        }

        else if (req.method === 'POST') {
            handlePost(req, res)
        }

    } else if (req.url === "/api/news") {

      return await handleNews(req, res)

    } else if (!req.url.startsWith('/api')) {

        return await serveStatic(req, res, PUBLIC_DIR)

    }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
