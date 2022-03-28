import { v4 as uuid } from 'uuid'
import { backup, restore } from '@/renderer/services/storage/localStorage'

const BACKUP_KEY = '__state_requestLog'

const state = {
  data: {}
}

const getters = {
  getByPath: state => (workspaceId, path) => (state.data[workspaceId] || {})[path] || []
}

const mutations = {
  log(state, request) {
    const logs = [
      {
        id: uuid(),
        ...request,
        collapsed: false
      },
      ...((state.data[request.workspaceId] || {})[request.path] || [])
    ]

    state.data = {
      ...state.data,
      [request.workspaceId]: {
        ...((state.data[request.workspaceId] || {})[request.path] || {}),
        [request.path]: logs
      }
    }
  },

  backup(state) {
    backup(BACKUP_KEY, {
      data: state.data
    })
  },

  restore(state) {
    const data = restore(BACKUP_KEY)
    if (!data) return

    state.data = data.data
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
