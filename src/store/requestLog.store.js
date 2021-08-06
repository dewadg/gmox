const state = {
  data: new Map()
}

const getters = {
  getByPath: state => path => state.data.get(path) || []
}

const mutations = {
  log (state, request) {
    const logs = [
      request,
      ...(state.data.get(request.path) || [])
    ]

    state.data.set(request.path, logs)
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
