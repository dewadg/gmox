<template>
  <router-view/>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { ipcRenderer } from 'electron'
import { INCOMING_REQUEST } from './constants/ipcEvents'

export default {
  setup() {
    const store = useStore()

    onMounted(() => {
      ipcRenderer.on(INCOMING_REQUEST, (_, args) => {
        store.commit('requestLog/log', args)
      })
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
}

body {
  margin: 0;
  padding: 0;
  background: $primary;
  color: $font-primary;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
