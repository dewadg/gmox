import { backup, restore } from '../services/storage/localStorage'

const BACKUP_KEY = '__state_protoStub'

const state = {
  data: new Map(),

  currentMethod: {
    path: '',
    returnType: ''
  }
}

const getters = {
  getStubMap: state => Object.fromEntries(state.data),

  getCurrentMethod: state => state.currentMethod,

  findByPath: state => path => state.data.get(path)
}

const mutations = {
  setCurrentMethod(state, { path, returnType }) {
    state.currentMethod.path = path
    state.currentMethod.returnType = returnType
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
