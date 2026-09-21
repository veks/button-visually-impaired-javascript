import http from 'node:http'
import process from 'node:process'

const port = Number(process.env.PORT || 8080)

const request = http.request({
  host: '127.0.0.1',
  method: 'GET',
  path: '/__shutdown',
  port,
})

request.on('error', () => {
  console.log(`No local server found on port ${port}`)
})

request.end()
