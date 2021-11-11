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
    delete state.data[id]

    state.data = { ...state.data }
  },

  setWorkspace (state, id) {
    state.current = id
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
