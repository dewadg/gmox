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
      protos: state.protos.map(proto => ({ ...proto })),
      templates: Object.fromEntries(state.templates)
    })
  },

  restore(state) {
    const data = restore(BACKUP_KEY)
    if (!data) return

    state.protos = data.protos
    state.templates = new Map(Object.entries(data.templates))
  },

  mergeTemplates(state, { templates }) {
    state.templates = new Map([...state.templates, ...templates])
  },

  removeProto(state, { protoName }) {
    state.protos = state.protos.filter(proto => proto.proto !== protoName)
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
