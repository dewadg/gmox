<template>
  <div
    id="editor"
    class="g-mock-editor"
  />
</template>

<script>
import { onMounted } from 'vue'
import * as monaco from 'monaco-editor'

export default {
  setup() {
    onMounted(() => {
      monaco.editor.create(document.getElementById('editor'), {
        value: [
          '{',
          '\t"hello": "world",',
          '\t"damn": "it",',
          '\t"it": "works"',
          '}'
        ].join('\n'),
        language: 'json',
        theme: 'vs-dark',
        minimap: {
          enabled: false
        },
        scrollbar: {
          vertical: 'hidden',
          horizontal: 'hidden'
        },
        scrollBeyondLastLine: false,
        fontFamily: 'monospace',
        fontSize: '15px'
      })
    })
  }
}
</script>

<style lang="scss">
.g-mock-editor {
  position: fixed;
  top: 76px;
  left: 251px;
  width: calc((100% - 1px - 250px) * 0.6);
  height: calc(100% - 76px);
}
</style>
