const { GRPC_SERVER_ON, GRPC_SERVER_OFF, IPC_MAIN_ERROR } = require('../../shared/constants/ipcEvents')
const { start, stop, stopAll } = require('../grpc/server')

function handleTurnOnGrpcServer({ win }) {
  return async (_, {
    workspaceId,
    address,
    protos,
    stubs
  }) => {
    try {
      await start({
        workspaceId,
        win,
        address,
        protos,
        stubs
      })

      win.webContents.send(GRPC_SERVER_ON, { workspaceId })
    } catch (error) {
      console.error('Error while starting gRPC server', error)

      win.webContents.send(IPC_MAIN_ERROR, error)
    }
  }
}

function handleTurnOffGrpcServer({ win }) {
  return (_, { workspaceId }) => {
    stop({ workspaceId })

    win.webContents.send(GRPC_SERVER_OFF, { workspaceId })
  }
}

function handleTurnOffAllGrpcServers() {
  return () => {
    stopAll()
  }
}

module.exports = {
  handleTurnOnGrpcServer,
  handleTurnOffGrpcServer,
  handleTurnOffAllGrpcServers
}
