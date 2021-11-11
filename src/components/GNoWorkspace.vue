<template>
  <div
    v-if="!workspaceSet"
    class="g-no-workspace"
  >
    <span>No workspace yet. Creata a new one?</span>
    <GButton @click="handleCreateWorkspace">Create workspace</GButton>
  </div>
</template>

<script>
import GButton from '@/components/GButton'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'

export default {
  components: {
    GButton
  },

  setup () {
    const store = useStore()

    const workspaceSet = computed(() => {
      store.getters['workspace/getCount'] > 0
    })

    const handleCreateWorkspace = () => {
      store.commit('workspace/createWorkspace', {
        id: String(Math.random()),
        name: 'New Workspace'
      })
    }

    return {
      workspaceSet,

      handleCreateWorkspace
    }
  }
}
</script>

<style lang="scss">
.g-no-workspace {
  text-align: center;

  span {
    display: block;
    margin-bottom: 1rem;
  }
}
</style>
