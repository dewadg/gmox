import { createStore } from 'vuex'
import { ipcRenderer } from 'electron'
import grpcServerStoreFactory from './grpcServer.store'
import protoParserStoreFactory from './protoParser.store'
import protoStubStoreFactory from './protoStub.store'
import requestLogStoreFactory from './requestLog.store'
import workspaceStoreFactory from './workspace.store'

export const workspaceStore = workspaceStoreFactory()
export const grpcServerStore = grpcServerStoreFactory({
  ipcRenderer
})
export const protoParserStore = protoParserStoreFactory({
  ipcRenderer
})
export const protoStubStore = protoStubStoreFactory()
export const requestLogStore = requestLogStoreFactory()

export default createStore({
  modules: {
    workspace: workspaceStore,
    grpcServer: grpcServerStore,
    protoParser: protoParserStore,
    protoStub: protoStubStore,
    requestLog: requestLogStore
  }
})
