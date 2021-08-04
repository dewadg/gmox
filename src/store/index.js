import { createStore } from 'vuex'
import { ipcRenderer } from 'electron'
import grpcServerStoreFactory from './grpcServer.store'
import protoParserStoreFactory from './protoParser.store'
import protoStubStoreFactory from './protoStub.store'

export const grpcServerStore = grpcServerStoreFactory({
  ipcRenderer
})
export const protoParserStore = protoParserStoreFactory({
  ipcRenderer
})
export const protoStubStore = protoStubStoreFactory()

export default createStore({
  modules: {
    grpcServer: grpcServerStore,
    protoParser: protoParserStore,
    protoStub: protoStubStore
  }
})
