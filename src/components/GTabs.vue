<template>
  <ul class="g-tabs">
    <li
      v-for="workspace in workspaces"
      :key="workspace.id"
      @click="handleSetWorkspace(workspace.id)"
      :class="{
        active: currentWorkspace && workspace.id === currentWorkspace.id
      }"
    >
      <span>{{ workspace.name }}</span>
      <div
        class="control"
        @click.stop="handleCloseWorkspace(workspace.id)"
      >
        <FontAwesomeIcon
          icon="times"
          size="sm"
        />
      </div>
    </li>
    <li
      class="new-workspace"
      @click="handleCreateNewWorkspace"
    >
      <div class="control">
        <FontAwesomeIcon
          icon="plus"
          size="sm"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    const workspaces = computed(() => store.getters['workspace/getList'])

    const currentWorkspace = computed(() => store.getters['workspace/current'])

    const handleCloseWorkspace = (id) => {
      if (currentWorkspace.value.id !== id || workspaces.value.length === 1) return store.commit('workspace/closeWorkspace', id)

      workspaces.value.forEach((workspace, index) => {
        if (workspace.id !== id) return

        console.log(workspaces.value[index - 1].id, id)

        store.commit('workspace/setWorkspace', workspaces.value[index - 1].id)
        store.commit('workspace/closeWorkspace', id)
      })
    }

    const handleSetWorkspace = (id) => {
      store.commit('workspace/setWorkspace', id)
    }

    const handleCreateNewWorkspace = () => {
      const id = uuid()

      store.commit('grpcServer/register', id)

      store.commit('workspace/createWorkspace', {
        id,
        name: 'New Workspace'
      })
    }

    return {
      workspaces,
      currentWorkspace,

      handleCloseWorkspace,
      handleSetWorkspace,
      handleCreateNewWorkspace
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
    box-sizing: border-box;

    &.new-workspace {
      padding: 1rem;

      .control {
        svg {
          display: inline;
        }
      }
    }

    &.active {
      padding-bottom: calc(1rem - 4px);
      border-bottom: 4px solid $accent;
    }

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
