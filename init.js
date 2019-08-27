const serve_handler = require('serve-handler')
const { createServer: create_server } = require('http')
const {
  Server: websocket_server_instance,
  OPEN: websocket_open_state,
} = require('ws')
const chokidar = require('chokidar')
const { resolve, relative } = require('path')

const in_production = process.env.NODE_ENV === 'production'

const http_server = create_server({}, (request, response) => {
  return serve_handler(request, response, {
    public: './',
    etag: true,
    rewrites: [
      {
        source: '/',
        destination: in_production ? '/index.html' : '/index.dev.html',
      },
    ],
  })
})

const websocket_server = new websocket_server_instance({
  server: http_server,
})

http_server.listen(80, () => {
  console.log('Running at http://localhost:80')
})

chokidar.watch(resolve('./')).on('change', (path) => {
  websocket_server.clients.forEach((client) => {
    if (client.readyState === websocket_open_state) {
      client.send(
        JSON.stringify({
          // transform relative fs path to path from root of server path
          path: `/${relative(resolve('./'), path).replace(/\\/g, '/')}`,
          event: 'changed',
        }),
      )
    }
  })
})
