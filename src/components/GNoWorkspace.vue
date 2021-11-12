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

import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import { v4 as uuid } from 'uuid'
import GButton from '@/components/GButton'

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
      const id = uuid()

      store.commit('workspace/createWorkspace', {
        id,
        name: 'New Workspace'
      })

      store.commit('workspace/setWorkspace', id)
      store.commit('grpcServer/register', id)
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
