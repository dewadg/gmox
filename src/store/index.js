import { createStore } from 'vuex'
import grpcServerStoreFactory from './grpcServer.store'
import { ipcRenderer } from 'electron'

export const grpcServerStore = grpcServerStoreFactory({
  ipcRenderer
})

export default createStore({
  modules: {
    grpcServer: grpcServerStore
  }
})
