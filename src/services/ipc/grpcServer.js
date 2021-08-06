const { start, stop } = require('../grpc/server')

function handleTurnOnGrpcServer({ win }) {
  return async (_, {
    address,
    protos,
    stubs
  }) => {
    await start({
      win,
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
