import { backup, restore } from '../services/storage/localStorage'

const BACKUP_KEY = '__state_workspace'

const state = {
  data: {},
  current: null
}

const getters = {
  getCount: state => Object.values(state.data).length || 0,

  getList: state => Object.values(state.data),

  current: state => state.current ? state.data[state.current] : null
}

const mutations = {
  createWorkspace (state, workspace) {
    state.data = {
      ...state.data,
      [workspace.id]: workspace
    }
  },

  closeWorkspace (state, id) {
    const copy = { ...state.data }
    delete copy[id]

    state.data = copy
  },

  setWorkspace (state, id) {
    state.current = id
  },

  backup(state) {
    backup(BACKUP_KEY, {
      data: state.data,
      current: state.current
    })
  },

  restore(state) {
    const data = restore(BACKUP_KEY)
    if (!data) return

    state.data = data.data
    state.current = data.current
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
