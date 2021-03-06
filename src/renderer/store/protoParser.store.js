import { backup, restore } from '@/renderer/services/storage/localStorage'
import { PARSE_PROTO_FILE } from '@/shared/constants/ipcEvents'
import { cloneDeep } from 'lodash/lang'

const BACKUP_KEY = '__state_protoParser'

const state = {
  isLoading: false,
  protos: {},
  templates: {}
}

const getters = {
  protos: state => workspaceId => state.protos[workspaceId] ? cloneDeep(state.protos[workspaceId]) : [],

  findTemplate: state => (workspaceId, typeName) => (state.templates[workspaceId] || {})[typeName] || ''
}

const mutations = {
  parseProtoStart(state) {
    state.isLoading = true
  },

  parseProtoDone(state, { workspaceId, protos }) {
    state.isLoading = false
    state.protos[workspaceId] = [
      ...protos,
      ...(state.protos[workspaceId] || [])
    ]
  },

  backup(state) {
    backup(BACKUP_KEY, {
      protos: state.protos,
      templates: state.templates
    })
  },

  restore(state) {
    const data = restore(BACKUP_KEY)
    if (!data) return

    state.protos = data.protos
    state.templates = data.templates
  },

  mergeTemplates(state, { workspaceId, templates }) {
    state.templates = {
      ...state.templates,
      [workspaceId]: {
        ...templates,
        ...(state.templates[workspaceId])
      }
    }
  },

  removeProto(state, { workspaceId, protoName }) {
    state.protos[workspaceId] = state.protos[workspaceId].filter(proto => proto.proto !== protoName)
  }
}

const actions = ({ ipcRenderer }) => ({
  async parseProtoFile({ commit }, { workspaceId, path }) {
    commit('parseProtoStart')

    const protos = await ipcRenderer.invoke(PARSE_PROTO_FILE, { path })

    protos.forEach((proto) => {
      const { templates } = proto

      commit('mergeTemplates', { workspaceId, templates })
    })

    commit('parseProtoDone', { workspaceId, protos })
  }
})

export default ({ ipcRenderer }) => ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions: actions({ ipcRenderer })
})
