import { backup, restore } from '@/renderer/services/storage/localStorage'

const BACKUP_KEY = '__state_protoStub'

const state = {
  data: {},

  currentMethod: {}
}

const getters = {
  getStubMap: state => workspaceId => state.data[workspaceId] || {},

  getCurrentMethod: state => workspaceId => state.currentMethod[workspaceId] || {
    path: '',
    returnType: ''
  },

  findByPath: state => (workspaceId, path) => (state.data[workspaceId] || {})[path]
}

const mutations = {
  setCurrentMethod(state, { workspaceId, path, returnType }) {
    state.currentMethod = {
      ...state.currentMethod,
      [workspaceId]: {
        path,
        returnType
      }
    }
  },

  setStub(state, { workspaceId, key, value }) {
    state.data = {
      ...state.data,
      [workspaceId]: {
        ...(state.data[workspaceId] || {}),
        [key]: value
      }
    }
  },

  backup(state) {
    backup(BACKUP_KEY, {
      data: state.data
    })
  },

  restore(state) {
    const data = restore(BACKUP_KEY)
    if (!data) return

    state.data = data.data
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
