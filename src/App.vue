<template>
  <div class="wrapper">
    <router-view/>
    <GAlert />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { ipcRenderer } from 'electron'
import {
  GRPC_SERVER_OFF,
  GRPC_SERVER_ON,
  INCOMING_REQUEST,
  REMOVE_PROTO
} from './constants/ipcEvents'
import GAlert from './components/GAlert.vue'

export default {
  components: {
    GAlert
  },

  setup() {
    const store = useStore()

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

    onMounted(() => {
      ipcRenderer.on(INCOMING_REQUEST, (_, args) => {
        store.commit('requestLog/log', args)
      })

      ipcRenderer.on(REMOVE_PROTO, (_, { protoName }) => {
        store.commit('protoParser/removeProto', { protoName })
      })

      ipcRenderer.on(GRPC_SERVER_ON, () => {
        store.commit('grpcServer/turnOn')
      })

      ipcRenderer.on(GRPC_SERVER_OFF, () => {
        store.commit('grpcServer/turnOff')
      })

      restoreStores()
      backupStores()
    })
  }
}
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
