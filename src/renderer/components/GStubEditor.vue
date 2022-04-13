<template>
  <div class="g-stub-editor">
    <div class="g-stub-editor-title">
      <span>{{ title }}</span>
    </div>
    <div id="editor" />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import * as monaco from 'monaco-editor'
import { MONACO_EDITOR_OPTIONS } from '@/renderer/constants/monaco'

let editor = null

const store = useStore()

const currentWorkspace = computed(() => store.getters['workspace/current'])

const currentStubMethod = computed(() => currentWorkspace.value
  ? store.getters['protoStub/getCurrentMethod'](currentWorkspace.value.id)
  : { path: '' }
)

const title = computed(() => currentStubMethod.value.path
  ? currentStubMethod.value.path
  : 'No method is chosen'
)

// reload current key's stub during key switch
watch(currentStubMethod, (stub) => {
  if (!editor) return

  if (!stub.path) {
    editor.getModel().setValue('')
    return
  }

  let stubValue = store.getters['protoStub/findByPath'](currentWorkspace.value.id, stub.path)
  if (!stubValue) {
    stubValue = store.getters['protoParser/findTemplate'](currentWorkspace.value.id, stub.returnType)
  }

  if (!stubValue) return
  editor.getModel().setValue(stubValue)
})

onMounted(() => {
  editor = monaco.editor.create(document.getElementById('editor'), MONACO_EDITOR_OPTIONS)

  editor.getModel().onDidChangeContent(handleEditorContentChange)
})

const handleEditorContentChange = () => {
  store.commit('protoStub/setStub', {
    workspaceId: currentWorkspace.value.id,
    key: currentStubMethod.value.path,
    value: editor.getModel().getValue()
  })
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
  height: 100%;
  border-right: 1px solid $accent;
  overflow-y: hidden;

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
