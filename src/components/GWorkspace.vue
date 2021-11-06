<template>
  <div class="g-workspace">
    <GTabs />
    <GNavbar />
    <GSidebar />
    <GStubEditor />
    <GRequestLog />
  </div>
</template>

<script>
import GTabs from '@/components/GTabs'
import GNavbar from '@/components/GNavbar'
import GSidebar from '@/components/GSidebar'
import GStubEditor from '@/components/GStubEditor'
import GRequestLog from '@/components/GRequestLog'

export default {
  components: {
    GTabs,
    GNavbar,
    GSidebar,
    GStubEditor,
    GRequestLog
  }
}
</script>

<style lang="scss">
.g-workspace {
  width: 100%;
}
</style>
