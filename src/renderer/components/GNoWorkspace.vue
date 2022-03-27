<template>
  <div
    v-if="!isWorkspaceSet"
    class="g-no-workspace"
  >
    <span>No workspace yet. Creata a new one?</span>
    <GButton @click="handleCreateWorkspace">Create workspace</GButton>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import GButton from './GButton'
import useWorkspace from '@/renderer/composables/workspace'

export default {
  components: {
    GButton
  },

  setup() {
    const store = useStore()

    const {
      isWorkspaceSet,
      createWorkspace,
      setWorkspace
    } = useWorkspace({ store })

    const handleCreateWorkspace = () => {
      const id = createWorkspace()

      setWorkspace(id)

      store.commit('grpcServer/register', id)
    }

    return {
      isWorkspaceSet,

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
