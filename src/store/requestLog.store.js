import { backup, restore } from '../services/storage/localStorage'

const BACKUP_KEY = '__state_requestLog'

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
