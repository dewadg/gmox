const { start, stop } = require('../grpc/server')

function handleTurnOnGrpcServer({ win }) {
  return async (_, {
    address,
    protos,
    stubs
  }) => {
    try {
      await start({
        win,
        address,
        protos,
        stubs
      })
    } catch (error) {
      console.error('Error while starting gRPC server', error)
    }
  }
}

function handleTurnOffGrpcServer() {
  return () => {
    stop()
  }
}

module.exports = {
  handleTurnOnGrpcServer,
  handleTurnOffGrpcServer
}
