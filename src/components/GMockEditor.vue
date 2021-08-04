<template>
  <div class="g-mock-editor">
    <div class="g-mock-editor-title">
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

    const currentMockKey = computed(() => store.getters['protoMock/currentKey'])

    const title = computed(() => currentMockKey.value
      ? currentMockKey.value
      : 'No service method currently opened. You can import proto in left sidebar'
    )

    const methodChosen = computed(() => Boolean(currentMockKey.value))

    const handleEditorContentChange = () => {
      store.commit('protoMock/setMock', {
        key: currentMockKey.value,
        value: editor.getModel().getValue()
      })
    }

    // reload current key's mock during key switch
    watch(currentMockKey, (nextKey) => {
      if (!nextKey) return

      if (editor) {
        editor.getModel().setValue(store.getters['protoMock/mockByKey'](nextKey) || '')
      }
    })

    onMounted(() => {
      editor = monaco.editor.create(document.getElementById('editor'), {
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
  height: 100%;
}

.g-mock-editor {
  position: fixed;
  top: 76px;
  left: 251px;
  width: calc((100% - 1px - 250px) * 0.6);
  height: calc(100% - 76px);
  border-right: 1px solid $accent;

  .g-mock-editor-title {
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
