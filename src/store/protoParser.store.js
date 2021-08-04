import { PARSE_PROTO_FILE } from '../constants/ipcEvents'

const state = {
  isLoading: false,
  protos: []
}

const getters = {
  protos: state => state.protos
}

const mutations = {
  parseProtoStart(state) {
    state.isLoading = true
  },

  parseProtoDone(state, { protos }) {
    state.isLoading = false
    state.protos = [
      ...protos,
      ...state.protos
    ]
  }
}

const actions = ({ ipcRenderer }) => ({
  async parseProtoFile({ commit }, { path }) {
    commit('parseProtoStart')

    const protos = await ipcRenderer.invoke(PARSE_PROTO_FILE, { path })

    commit('parseProtoDone', { protos })
  }
})

export default ({ ipcRenderer }) => ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions: actions({ ipcRenderer })
})
