import { backup, restore } from '../services/storage/localStorage'
import { PARSE_PROTO_FILE } from '../constants/ipcEvents'

const BACKUP_KEY = '__state_protoParser'

const state = {
  isLoading: false,
  protos: [],
  templates: new Map()
}

const getters = {
  protos: state => state.protos,

  findTemplate: state => typeName => state.templates.get(typeName) || ''
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
  },

  backup(state) {
    backup(BACKUP_KEY, {
      protos: state.protos.map(proto => ({ ...proto }))
    })
  },

  restore(state) {
    const data = restore(BACKUP_KEY)
    if (!data) return

    state.protos = data.protos
  },

  mergeTemplates(state, { templates }) {
    state.templates = new Map([...state.templates, ...templates])
  }
}

const actions = ({ ipcRenderer }) => ({
  async parseProtoFile({ commit }, { path }) {
    commit('parseProtoStart')

    const protos = await ipcRenderer.invoke(PARSE_PROTO_FILE, { path })

    protos.forEach((proto) => {
      const { templates } = proto

      commit('mergeTemplates', { templates })
    })

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
