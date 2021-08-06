const grpc = require('@grpc/grpc-js')
const { ipcMain } = require('electron')
const { INCOMING_REQUEST } = require('../../constants/ipcEvents')
const { loadProtoFile } = require('./protoLoader')

let serverInstance

function start({
  win,
  address = '127.0.0.1:50051',
  protos = [],
  stubs = new Map()
}) {
  return new Promise((resolve, reject) => {
    Promise.all(protos.map(proto => loadProtoFile(proto.filePath)))
      .then((loadedProtos) => {
        serverInstance = new grpc.Server()

        mountStubsToServer({
          win,
          server: serverInstance,
          protos: loadedProtos,
          stubs
        })

        serverInstance.bindAsync(
          address,
          grpc.ServerCredentials.createInsecure(),
          () => {
            serverInstance.start()

            resolve()
          }
        )
      })
      .catch(reject)
    })
}

function stop() {
  serverInstance.forceShutdown()
}

function mountStubsToServer({
  win,
  server,
  protos,
  stubs
}) {
  for (const proto of protos) {
    for (const packageName of Object.keys(proto)) {
      let serviceName = ''
      let service = null

      // find which property is the service implementation
      for (serviceName of Object.keys(proto[packageName])) {
        if (typeof proto[packageName][serviceName] !== 'function') continue

        service = proto[packageName][serviceName]
        break
      }

      // generate mocked implementation
      const implementation = Object.values(Object.values(service).pop())
        .filter(method => stubs.has(method.path))
        .reduce((carry, method) => {
          carry[method.originalName] = (call, callback) => {
            const stub = JSON.parse(stubs.get(method.path).split('\n').join(''))

            callback(null, stub)

            const request = {
              path: call.call.handler.path,
              type: call.call.handler.type,
              payload: call.request,
              metadata: {
                headers: Object.fromEntries(call.metadata.internalRepr),
                options: call.metadata.options
              },
              timestamp: new Date()
            }

            win.webContents.send(INCOMING_REQUEST, request)
          }

          return carry
        }, {})

      // mount it, what else?
      server.addService(service.service, implementation)
    }
  }
}

module.exports = {
  start,
  stop
}
