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
import { MONACO_EDITOR_OPTIONS } from '../constants/monaco'
import GAlphabetIcon from './GAlphabetIcon.vue'

export default {
  components: {
    GAlphabetIcon
  },

  setup() {
    let editor = null

    const store = useStore()

    const currentStubMethod = computed(() => store.getters['protoStub/getCurrentMethod'])

    const title = computed(() => currentStubMethod.value.path
      ? currentStubMethod.value.path
      : 'No service method currently opened. You can import proto in left sidebar'
    )

    const methodChosen = computed(() => Boolean(currentStubMethod.value.path))

    const handleEditorContentChange = () => {
      store.commit('protoStub/setStub', {
        key: currentStubMethod.value.path,
        value: editor.getModel().getValue()
      })
    }

    // reload current key's stub during key switch
    watch(currentStubMethod.value, (nextStubMethod) => {
      if (!nextStubMethod.path) return

      if (editor) {
        let stub = store.getters['protoStub/findByPath'](nextStubMethod.path)

        if (!stub) {
          stub = store.getters['protoParser/findTemplate'](nextStubMethod.returnType)
        }

        editor.getModel().setValue(stub || '')
      }
    })

    onMounted(() => {
      editor = monaco.editor.create(document.getElementById('editor'), MONACO_EDITOR_OPTIONS)

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
