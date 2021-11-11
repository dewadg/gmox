import { TURN_OFF_GRPC_SERVER, TURN_ON_GRPC_SERVER } from '../constants/ipcEvents'

export const GRPC_SERVER_STATE = {
  ON: 'ON',
  OFF: 'OFF'
}

const state = {
  isLoading: false,
  currentState: {}
}

const getters = {
  currentState: state => workspaceId => state.currentState[workspaceId]
}

const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },

  register (state, workspaceId) {
    state.currentState = {
      ...state.currentState,
      [workspaceId]: GRPC_SERVER_STATE.OFF
    }
  },

  turnOn(state, workspaceId) {
    state.currentState = {
      ...state.currentState,
      [workspaceId]: GRPC_SERVER_STATE.ON
    }
    state.isLoading = false
  },

  turnOff(state, workspaceId) {
    state.currentState = {
      ...state.currentState,
      [workspaceId]: GRPC_SERVER_STATE.OFF
    }
    state.isLoading = false
  }
}

const actions = ({ ipcRenderer }) => ({
  async turnOn({ commit }, { workspaceId, address, protos, stubs }) {
    commit('setLoading', true)

    await ipcRenderer.invoke(TURN_ON_GRPC_SERVER, {
      workspaceId,
      address,
      protos,
      stubs
    })
  },

  async turnOff({ commit }, { workspaceId }) {
    commit('setLoading', true)

    await ipcRenderer.invoke(TURN_OFF_GRPC_SERVER, { workspaceId })
  }
})

export default ({ ipcRenderer }) => ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions: actions({ ipcRenderer })
})
