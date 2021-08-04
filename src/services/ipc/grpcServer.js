const { start, stop } = require('../grpc/server')

function handleTurnOnGrpcServer() {
  return async (_, {
    address,
    protos,
    stubs
  }) => {
    await start({
      address,
      protos,
      stubs
    })
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
