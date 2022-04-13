<template>
  <div
    class="home"
    :class="{ centered: !isWorkspaceSet }"
  >
    <GNoWorkspace v-if="!isWorkspaceSet" />
    <GWorkspace v-else />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import GNoWorkspace from '../components/GNoWorkspace'
import GWorkspace from '../components/GWorkspace'
import useWorkspace from '../composables/workspace'

const store = useStore()

const { isWorkspaceSet } = useWorkspace({ store })
</script>

<style lang="scss">
.home {
  display: flex;
  width: 100%;
  height: 100%;

  &.centered {
    align-items: center;
    justify-content: space-around;
  }
}
</style>
