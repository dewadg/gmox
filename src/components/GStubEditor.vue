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

    const currentStubPath = computed(() => store.getters['protoStub/getCurrentPath'])

    const title = computed(() => currentStubPath.value
      ? currentStubPath.value
      : 'No service method currently opened. You can import proto in left sidebar'
    )

    const methodChosen = computed(() => Boolean(currentStubPath.value))

    const handleEditorContentChange = () => {
      store.commit('protoStub/setStub', {
        key: currentStubPath.value,
        value: editor.getModel().getValue()
      })
    }

    // reload current key's stub during key switch
    watch(currentStubPath, (nextPath) => {
      if (!nextPath) return

      if (editor) {
        editor.getModel().setValue(store.getters['protoStub/findByPath'](nextPath) || '')
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
