<template>
  <div class="wrapper">
    <router-view/>
    <GAlert />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ipcRenderer } from 'electron'
import {
  GRPC_SERVER_OFF,
  GRPC_SERVER_ON,
  INCOMING_REQUEST,
  REMOVE_PROTO,
  TURN_OFF_ALL_GRPC_SERVERS
} from '@/shared/constants/ipcEvents'
import GAlert from '@/renderer/components/GAlert.vue'

const store = useStore()

const currentWorkspace = computed(() => store.getters['workspace/current'])

const restoreStores = () => {
  const mutations = Object.keys(store._mutations)

  for (const mutation of mutations) {
    if (!mutation.endsWith('/restore')) continue

    store.commit(mutation)
  }
}

const backupStores = () => {
  const mutations = Object.keys(store._mutations).filter(item => item.endsWith('/backup'))

  setInterval(() => {
    mutations.forEach((mutation) => {
      store.commit(mutation)
    })
  }, 5000)
}

const turnOffAllServers = () => {
  setTimeout(() => {
    ipcRenderer.invoke(TURN_OFF_ALL_GRPC_SERVERS, null)

    store.commit('grpcServer/turnAllOff')
  }, 1000)
}

onMounted(() => {
  ipcRenderer.on(INCOMING_REQUEST, (_, args) => {
    store.commit('requestLog/log', { ...args })
  })

  ipcRenderer.on(REMOVE_PROTO, (_, { protoName }) => {
    store.commit('protoParser/removeProto', {
      workspaceId: currentWorkspace.value.id,
      protoName
    })
  })

  ipcRenderer.on(GRPC_SERVER_ON, (_, { workspaceId }) => {
    store.commit('grpcServer/turnOn', workspaceId)
  })

  ipcRenderer.on(GRPC_SERVER_OFF, (_, { workspaceId }) => {
    store.commit('grpcServer/turnOff', workspaceId)
  })

  restoreStores()
  backupStores()
  turnOffAllServers()
})
</script>

<style lang="scss">
@import './assets/styles/variables.scss';

* {
  font-size: 13px;
  letter-spacing: 0.025em;
  outline: none;
  margin: 0;
  padding: 0;
}

html,
body,
#app,
.wrapper {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  background: $primary;
  color: $font-primary;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
