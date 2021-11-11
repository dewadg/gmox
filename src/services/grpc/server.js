const grpc = require('@grpc/grpc-js')
const net = require('net')
const { INCOMING_REQUEST } = require('../../constants/ipcEvents')
const { loadProtoFile, flattenProto, normalizePackage } = require('./protoLoader')

const servers = new Map()

function start({
  win,
  workspaceId,
  address = '127.0.0.1:50051',
  protos = [],
  stubs = new Map()
}) {
  return new Promise((resolve, reject) => {
    const port = address.split(':')[1]

    isPortOccupied(port)
      .then((isOccupied) => {
        if (isOccupied) {
          const error = new Error('Port is occupied')

          error.port = port

          reject(error)
          return
        }

        return Promise.all(protos.map(async (proto) => {
          const loadedProto = await loadProtoFile(proto.filePath)

          return normalizePackage(flattenProto(loadedProto))
        }))
      })
      .then((loadedProtos) => {
        if (servers.has(workspaceId)) {
          servers.get(workspaceId).forceShutdown()
        }

        const server = new grpc.Server()

        mountStubsToServer({
          win,
          workspaceId,
          server,
          protos: loadedProtos,
          stubs
        })

        server.bindAsync(
          address,
          grpc.ServerCredentials.createInsecure(),
          () => {
            try {
              server.start()

              servers.set(workspaceId, server)

              resolve()
            } catch (error) {
              reject(error)
            }
          }
        )
      })
      .catch(reject)
    })
}

function stop({ workspaceId }) {
  if (!servers.has(workspaceId)) return

  servers.get(workspaceId).forceShutdown()
  servers.delete(workspaceId)
}

function mountStubsToServer({
  win,
  workspaceId,
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

      if (!service) {
        console.warn(`No service found for package ${packageName}`)
        continue
      }

      // generate mocked implementation
      const implementation = Object.values(Object.values(service).pop())
        .filter(method => stubs.has(method.path))
        .reduce((carry, method) => {
          carry[method.originalName] = (call, callback) => {
            const stub = JSON.parse(stubs.get(method.path).split('\n').join(''))

            callback(null, stub)

            const request = {
              workspaceId,
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

function isPortOccupied(port) {
  return new Promise((resolve, reject) => {
    const { Socket } = net

    const socket = new Socket()

    socket.setTimeout(200)

    socket.on('timeout', () => {
      resolve(false)

      socket.destroy()
    })

    socket.on('error', (error) => {
      if (error.code !== 'ECONNREFUSED') {
        reject(error)
      } else {
        resolve(false)
      }

      socket.destroy()
    })

    socket.on('connect', () => {
      resolve(true)

      socket.destroy()
    })

    socket.connect(port, '0.0.0.0')
  })
}

module.exports = {
  start,
  stop,
  isPortOccupied
}
