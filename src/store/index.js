import { createStore } from 'vuex'
import { ipcRenderer } from 'electron'
import grpcServerStoreFactory from './grpcServer.store'
import protoParserStoreFactory from './protoParser.store'

export const grpcServerStore = grpcServerStoreFactory({
  ipcRenderer
})
export const protoParserStore = protoParserStoreFactory({
  ipcRenderer
})

export default createStore({
  modules: {
    grpcServer: grpcServerStore,
    protoParser: protoParserStore
  }
})
