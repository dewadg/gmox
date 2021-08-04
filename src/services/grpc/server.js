const grpc = require('@grpc/grpc-js')
const { loadProtoFile } = require('./protoLoader')

let serverInstance

function start({
  address = '127.0.0.1:50051',
  protos = [],
  mocks = new Map()
}) {
  return new Promise((resolve, reject) => {
    Promise.all(protos.map(proto => loadProtoFile(proto.filePath)))
      .then((loadedProtos) => {
        serverInstance = new grpc.Server()

        mountMocksToServer(serverInstance, loadedProtos, mocks)

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

function mountMocksToServer(server, protos, mocks) {
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
        .filter(method => mocks.has(method.path))
        .reduce((carry, method) => {
          carry[method.originalName] = (call, callback) => {
            const mock = JSON.parse(mocks.get(method.path).split('\n').join(''))

            callback(null, mock)
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
