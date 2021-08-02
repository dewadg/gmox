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
    console.log('Whee')
    state.currentState = GRPC_SERVER_STATE.ON
  },

  turnOff(state) {
    state.currentState = GRPC_SERVER_STATE.OFF
  }
}

const actions = ({ ipcRenderer }) => ({
  async turnOn({ commit }) {
    ipcRenderer.invoke('GRPC_SERVER_CHANNEL', 'turnOn')

    commit('turnOn')
  },

  async turnOff({ commit }) {
    ipcRenderer.invoke('GRPC_SERVER_CHANNEL', 'turnOff')

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
