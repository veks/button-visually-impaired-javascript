import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const port = Number(process.env.PORT || 8080)

const types = {
  '.css' : 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js'  : 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map' : 'application/json; charset=utf-8',
  '.svg' : 'image/svg+xml',
}

const send = (response, status, body, headers = {}) => {
  response.writeHead(status, headers)
  response.end(body)
}

const getFilePath = url => {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname)
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  const filePath = path.join(root, safePath)

  if (!filePath.startsWith(root)) {
    return null
  }

  return filePath
}

const server = http.createServer((request, response) => {
  if (request.url === '/__shutdown') {
    send(response, 200, 'Server stopped')
    server.close(() => process.exit(0))
    return
  }

  let filePath = getFilePath(request.url)

  if (!filePath) {
    send(response, 403, 'Forbidden')
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html')
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(response, error.code === 'ENOENT' ? 404 : 500, error.code === 'ENOENT' ? 'Not found' : 'Server error')
      return
    }

    send(response, 200, content, {
      'Content-Type': types[path.extname(filePath)] || 'application/octet-stream',
    })
  })
})

server.listen(port, () => {
  console.log(`Server started: http://localhost:${port}/test/`)
})
