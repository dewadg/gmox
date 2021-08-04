const { start, stop } = require('../grpc/server')

function handleTurnOnGrpcServer() {
  return async (_, {
    address,
    protos,
    mocks
  }) => {
    await start({
      address,
      protos,
      mocks
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
