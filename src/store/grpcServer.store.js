import { TURN_OFF_GRPC_SERVER, TURN_ON_GRPC_SERVER } from '../constants/ipcEvents'

export const GRPC_SERVER_STATE = {
  ON: 'ON',
  OFF: 'OFF'
}

const state = {
  isLoading: false,
  currentState: GRPC_SERVER_STATE.OFF
}

const getters = {
  currentState: state => state.currentState
}

const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },

  turnOn(state) {
    state.currentState = GRPC_SERVER_STATE.ON
    state.isLoading = false
  },

  turnOff(state) {
    state.currentState = GRPC_SERVER_STATE.OFF
    state.isLoading = false
  }
}

const actions = ({ ipcRenderer }) => ({
  async turnOn({ commit }, { address, protos, stubs }) {
    commit('setLoading', true)

    await ipcRenderer.invoke(TURN_ON_GRPC_SERVER, {
      address,
      protos,
      stubs
    })
  },

  async turnOff({ commit }) {
    commit('setLoading', true)

    await ipcRenderer.invoke(TURN_OFF_GRPC_SERVER)
  }
})

export default ({ ipcRenderer }) => ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions: actions({ ipcRenderer })
})
