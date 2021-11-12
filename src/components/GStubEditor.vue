<template>
  <div class="g-stub-editor">
    <div class="g-stub-editor-title">
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

export default {
  setup() {
    let editor = null

    const store = useStore()

    const currentWorkspace = computed(() => store.getters['workspace/current'])

    const currentStubMethod = computed(() => currentWorkspace.value
      ? store.getters['protoStub/getCurrentMethod'](currentWorkspace.value.id)
      : { path: '' }
    )

    const title = computed(() => currentStubMethod.value.path
      ? currentStubMethod.value.path
      : 'No service method currently opened. You can import proto in left sidebar'
    )

    const methodChosen = computed(() => Boolean(currentStubMethod.value.path))

    watch(currentWorkspace, (value, previousValue) => {
      if (!value) return

      if (value.id === previousValue.id) return

      editor.getModel().setValue('')
    })

    const handleEditorContentChange = () => {
      if (!currentWorkspace.value) return

      store.commit('protoStub/setStub', {
        workspaceId: currentWorkspace.value.id,
        key: currentStubMethod.value.path,
        value: editor.getModel().getValue()
      })
    }

    // reload current key's stub during key switch
    watch(currentStubMethod, (nextStub) => {
      if (!nextStub.path) return

      if (editor) {
        let stub = store.getters['protoStub/findByPath'](currentWorkspace.value.id, nextStub.path)
        if (!stub) {
          stub = store.getters['protoParser/findTemplate'](currentWorkspace.value.id, nextStub.returnType)
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
