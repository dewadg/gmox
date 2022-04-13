import { computed } from 'vue'
import { v4 as uuid } from 'uuid'

export default ({ store }) => {
  const isWorkspaceSet = computed(() => store.getters['workspace/getCount'] > 0)

  const lastAvailablePort = computed(() => store.getters['workspace/lastAvailablePort'])

  const workspaces = computed(() => store.getters['workspace/getList'])

  const currentWorkspace = computed(() => store.getters['workspace/current'])

  const createWorkspace = () => {
    const id = uuid()

    store.commit('workspace/createWorkspace', {
      id,
      name: 'New Workspace',
      address: '127.0.0.1',
      port: lastAvailablePort.value
    })

    store.commit('workspace/incrementLastAvailablePort')

    store.commit('grpcServer/register', id)

    return id
  }

  const closeWorkspace = (id) => {
    if (currentWorkspace.value.id !== id || workspaces.value.length === 1) {
      store.commit('workspace/closeWorkspace', id)
      store.commit('grpcServer/turnOff', id)
      return
    }

    workspaces.value.forEach((workspace, index) => {
      if (workspace.id !== id) return

      store.commit('workspace/setWorkspace', workspaces.value[index - 1].id)
      store.commit('workspace/closeWorkspace', id)
      store.commit('grpcServer/turnOff', id)
    })
  }

  const setWorkspace = (id) => {
    store.commit('workspace/setWorkspace', id)
  }

  const renameWorkspace = ({ id, name }) => {
    store.commit('workspace/rename', { id, name })
  }

  const changeWorkspaceAddress = ({ id, address, port }) => {
    store.commit('workspace/changeAddress', { id, address, port })
  }

  return {
    isWorkspaceSet,
    workspaces,
    currentWorkspace,

    createWorkspace,
    closeWorkspace,
    setWorkspace,
    renameWorkspace,
    changeWorkspaceAddress
  }
}
