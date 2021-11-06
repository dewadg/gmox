<template>
  <div
    class="home"
    :class="{ centered: !workspaceSet }"
  >
    <GNoWorkspace v-if="!workspaceSet" />
    <GWorkspace v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GNoWorkspace from '@/components/GNoWorkspace'
import GWorkspace from '@/components/GWorkspace'

export default {
  name: 'Home',

  components: {
    GNoWorkspace,
    GWorkspace
  },

  computed: {
    ...mapGetters({
      workspaceCount: 'workspace/getCount'
    }),

    workspaceSet () {
      return this.workspaceCount > 0
    }
  }
}
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
