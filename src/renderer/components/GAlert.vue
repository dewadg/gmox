<template>
  <div class="g-alert">
    <div
      v-if="errorMessage"
      class="g-alert-card"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ipcRenderer } from 'electron'
import { IPC_MAIN_ERROR } from '@/shared/constants/ipcEvents'

const errorMessage = ref('')

onMounted(() => {
  ipcRenderer.on(IPC_MAIN_ERROR, (_, args) => {
    errorMessage.value = args.message

    setTimeout(() => {
      errorMessage.value = ''
    }, 2000)
  })
})
</script>

<style lang="scss">
.g-alert {
  position: fixed;
  right: 15px;
  top: 90px;

  .g-alert-card {
    background: #e74c3c;
    min-width: 200px;
    border-radius: 3px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
    padding: 15px;
  }
}
</style>
