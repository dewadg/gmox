const { app } = require('electron')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

let serverInstance

export function start() {
  const definition = protoLoader.loadSync(
    `${app.getPath('home')}/project/me/exp-node-grpc/proto/greeter.proto`,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
  )

  const greeterProto = grpc.loadPackageDefinition(definition).Greeter

  serverInstance = new grpc.Server

  serverInstance.addService(greeterProto.service, {
    sayHello: (call, callback) => {
      callback(null, {
        message: 'World'
      })
    }
  })

  serverInstance.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    serverInstance.start()
  })
}

export function stop() {
  serverInstance.forceShutdown()
}
