const state = {
  data: {
    123456: {
      id: '123456',
      name: 'Default'
    },
    123457: {
      id: '123457',
      name: 'MBS'
    },
    123458: {
      id: '123458',
      name: 'Payment'
    }
  }
}

const getters = {
  getCount: state => Object.values(state.data).length || 0,

  getList: state => Object.values(state.data)
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
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
