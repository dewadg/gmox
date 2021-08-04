const state = {
  data: new Map(),

  currentKey: ''
}

const getters = {
  allMocks: state => Object.fromEntries(state.data),

  currentKey: state => state.currentKey,

  mockByKey: state => key => state.data.get(key)
}

const mutations = {
  setCurrentKey(state, key) {
    state.currentKey = key
  },

  setMock(state, { key, value }) {
    state.data.set(key, value)
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
