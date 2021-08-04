<template>
  <div class="g-stub-editor">
    <div class="g-stub-editor-title">
      <GAlphabetIcon v-if="methodChosen">M</GAlphabetIcon>
      <span>{{ title }}</span>
    </div>
    <div id="editor" />
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import * as monaco from 'monaco-editor'
import GAlphabetIcon from './GAlphabetIcon.vue'

export default {
  components: {
    GAlphabetIcon
  },

  setup() {
    let editor = null

    const store = useStore()

    const currentMockKey = computed(() => store.getters['protoStub/getCurrentKey'])

    const title = computed(() => currentMockKey.value
      ? currentMockKey.value
      : 'No service method currently opened. You can import proto in left sidebar'
    )

    const methodChosen = computed(() => Boolean(currentMockKey.value))

    const handleEditorContentChange = () => {
      store.commit('protoStub/setStub', {
        key: currentMockKey.value,
        value: editor.getModel().getValue()
      })
    }

    // reload current key's mock during key switch
    watch(currentMockKey, (nextKey) => {
      if (!nextKey) return

      if (editor) {
        editor.getModel().setValue(store.getters['protoStub/findByKey'](nextKey) || '')
      }
    })

    onMounted(() => {
      editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',
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
        fontSize: '15px',
        automaticLayout: true
      })

      editor.getModel().onDidChangeContent(handleEditorContentChange)
    })

    return {
      title,
      methodChosen
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

#editor {
  width: 100%;
  height: 100%;
}

.g-stub-editor {
  position: fixed;
  top: 76px;
  left: 251px;
  width: calc((100% - 1px - 250px) * 0.6);
  height: calc(100% - 76px);
  border-right: 1px solid $accent;

  .g-stub-editor-title {
    display: flex;
    align-items: center;
    padding: 15px;
    color: $font-secondary;
    border-bottom: 1px solid $accent;

    .g-alphabet-icon {
      margin-right: 15px;
    }
  }
}
</style>
