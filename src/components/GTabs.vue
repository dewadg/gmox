<template>
  <ul class="g-tabs">
    <li
      v-for="workspace in workspaces"
      :key="workspace.id"
      @click="handleSetWorkspace(workspace.id)"
    >
      <span>{{ workspace.name }}</span>
      <div
        class="control"
        @click="handleCloseWorkspace(workspace.id)"
      >
        <FontAwesomeIcon
          icon="times"
          size="sm"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    const workspaces = computed(() => {
      return store.getters['workspace/getList']
    })

    const handleCloseWorkspace = (id) => {
      store.commit('workspace/closeWorkspace', id)
    }

    const handleSetWorkspace = (id) => {
      store.commit('workspace/setWorkspace', id)
    }

    return {
      workspaces,

      handleCloseWorkspace,
      handleSetWorkspace
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.g-tabs {
  display: flex;
  list-style: none;
  width: 100%;
  border-bottom: 1px solid $accent;

  li {
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem 1rem 1rem;
    border-right: 1px solid $accent;
    cursor: pointer;
    color: $font-secondary;

    &:hover {
      background: $secondary;

      .control {
        svg {
          display: inline;
        }
      }
    }

    span {
      margin-right: 2rem;
    }

    .control {
      width: 0.875em;

      svg {
        display: none;
      }
    }
  }
}
</style>
