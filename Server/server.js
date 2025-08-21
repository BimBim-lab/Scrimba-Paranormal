import http from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet, handlePost, handleNews } from './handlers/routeHandlers.js'

const PORT = 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PUBLIC_DIR = join(__dirname, '..')

function setCORS(req, res) {
  const origin = req.headers.origin || ''

  // longgar: izinkan domain *.vercel.app
  // (kalau sudah tahu domain final, lebih baik ganti dengan exact match)
  const allow =
    /^https?:\/\/([a-z0-9-]+\.)*vercel\.app$/i.test(origin) ||
    origin === 'https://scrimba-paranormal-production.up.railway.app' // optional

  if (allow) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Tangani preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return true // hentikan handler selanjutnya
  }
  return false
}

const server = http.createServer(async (req, res) => {
    if (setCORS(req, res)) return
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
