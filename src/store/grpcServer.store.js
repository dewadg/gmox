import { TURN_OFF_GRPC_SERVER, TURN_ON_GRPC_SERVER } from '../constants/ipcEvents'

export const GRPC_SERVER_STATE = {
  ON: 'ON',
  OFF: 'OFF'
}

const state = {
  currentState: GRPC_SERVER_STATE.OFF
}

const getters = {
  currentState: state => state.currentState
}

const mutations = {
  turnOn(state) {
    state.currentState = GRPC_SERVER_STATE.ON
  },

  turnOff(state) {
    state.currentState = GRPC_SERVER_STATE.OFF
  }
}

const actions = ({ ipcRenderer }) => ({
  async turnOn({ commit }, { protos, mocks }) {
    ipcRenderer.invoke(TURN_ON_GRPC_SERVER, {
      protos,
      mocks
    })

    commit('turnOn')
  },

  async turnOff({ commit }) {
    ipcRenderer.invoke(TURN_OFF_GRPC_SERVER)

    commit('turnOff')
  }
})

export default ({ ipcRenderer }) => ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions: actions({ ipcRenderer })
})
