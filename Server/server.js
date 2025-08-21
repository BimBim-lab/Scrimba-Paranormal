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
  const ALLOWLIST = [
    'https://scrimba-paranormal.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ];

  const allowed = ALLOWLIST.includes(origin);
  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    // kalau butuh kirim cookie/credentials dari frontend:
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // opsional: caching preflight biar hemat
  res.setHeader('Access-Control-Max-Age', '600');

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
