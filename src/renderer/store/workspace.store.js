import { backup, restore } from '@/renderer/services/storage/localStorage'

const BACKUP_KEY = '__state_workspace'

const state = {
  data: {},
  current: null,
  lastAvailablePort: 50051,
  occupiedPorts: {}
}

const getters = {
  getCount: state => Object.values(state.data).length || 0,

  getList: state => Object.values(state.data),

  current: state => state.current ? state.data[state.current] : null,

  lastAvailablePort: state => state.lastAvailablePort
}

const mutations = {
  createWorkspace(state, { id, name, type = 'SERVER', address = '127.0.0.1', port = 50051 }) {
    state.data = {
      ...state.data,
      [id]: {
        id,
        name,
        address,
        port,
        type
      }
    }

    state.occupiedPorts = {
      ...state.occupiedPorts,
      [port]: true
    }
  },

  closeWorkspace(state, id) {
    state.occupiedPorts = {
      ...state.occupiedPorts,
      [state.data[id].port]: false
    }

    const copy = { ...state.data }
    delete copy[id]

    state.data = copy
  },

  setWorkspace(state, id) {
    state.current = id
  },

  backup(state) {
    backup(BACKUP_KEY, {
      data: state.data,
      current: state.current
    })
  },

  restore(state) {
    const data = restore(BACKUP_KEY)
    if (!data) return

    state.data = data.data
    state.current = data.current
  },

  rename(state, { id, name }) {
    state.data = {
      ...state.data,
      [id]: {
        ...state.data[id],
        name
      }
    }
  },

  incrementLastAvailablePort(state) {
    state.lastAvailablePort += 1
  },

  changeAddress(state, { id, address, port }) {
    state.data = {
      ...state.data,
      [id]: {
        ...state.data[id],
        address,
        port
      }
    }
  }
}

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations
})
