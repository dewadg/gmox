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
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
