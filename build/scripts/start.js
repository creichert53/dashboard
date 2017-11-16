const logger = require('../lib/logger')
const https = require('https')
const fs = require('fs')

const app = require('../../server/main')

var options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/reicherthome.duckdns.org/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/reicherthome.duckdns.org/privkey.pem')
}
const server = https.createServer(options, app)

// ------------------------------------
// WebSockets
// ------------------------------------
var brewery = {
  recipe: {},
  settings: {}
}
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log('Web page socket connection established!')
  io.emit('recipe', brewery.recipe)
  io.emit('settings', brewery.settings)
})

const brewerySocket = require('socket.io-client')('http://10.10.1.11')
brewerySocket.on('connect', () => {
  // Connected
})
brewerySocket.on('recipe', (recipe) => {
  brewery.recipe = recipe
  io.emit('recipe', recipe)
})
brewerySocket.on('settings', (settings) => {
  brewery.settings = settings
  io.emit('settings', settings)
})
brewerySocket.on('brewSession', (brewSession) => {
  io.emit('brewSession', brewSession)
})

// ------------------------------------
// Start Server
// ------------------------------------
logger.info('Starting server...')
server.listen(443, () => {
  logger.success('Server is running at https://localhost')
})
