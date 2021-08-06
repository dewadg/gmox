import { backup, restore } from '../services/storage/localStorage'

const BACKUP_KEY = '__state_protoStub'

const state = {
  data: new Map(),

  currentPath: ''
}

const getters = {
  getStubMap: state => Object.fromEntries(state.data),

  getCurrentPath: state => state.currentPath,

  findByPath: state => path => state.data.get(path)
}

const mutations = {
  setCurrentPath(state, path) {
    state.currentPath = path
  },

  setStub(state, { key, value }) {
    state.data.set(key, value)
  },

  backup(state) {
    backup(BACKUP_KEY, {
      data: Object.fromEntries(state.data)
    })
  },

  restore(state) {
    const data = restore(BACKUP_KEY)
    if (!data) return

    state.data = new Map(Object.entries(data.data))
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
