const { GRPC_SERVER_ON, GRPC_SERVER_OFF, IPC_MAIN_ERROR } = require('../../constants/ipcEvents')
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

      win.webContents.send(GRPC_SERVER_ON, null)
    } catch (error) {
      console.error('Error while starting gRPC server', error)

      win.webContents.send(IPC_MAIN_ERROR, error)
    }
  }
}

function handleTurnOffGrpcServer({ win }) {
  return () => {
    stop()

    win.webContents.send(GRPC_SERVER_OFF, null)
  }
}

module.exports = {
  handleTurnOnGrpcServer,
  handleTurnOffGrpcServer
}
