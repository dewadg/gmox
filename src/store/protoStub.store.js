const state = {
  data: new Map(),

  currentKey: ''
}

const getters = {
  getStubMap: state => Object.fromEntries(state.data),

  getCurrentKey: state => state.currentKey,

  findByKey: state => key => state.data.get(key)
}

const mutations = {
  setCurrentKey(state, key) {
    state.currentKey = key
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
