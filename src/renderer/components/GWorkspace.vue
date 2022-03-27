<template>
  <div class="g-workspace">
    <GTabs />
    <GNavbar />
    <div class="wrapper">
      <GSidebar />
      <GStubEditor />
      <GRequestLog />
    </div>
  </div>
</template>

<script>
import GTabs from './GTabs'
import GNavbar from './GNavbar'
import GSidebar from './GSidebar'
import GStubEditor from './GStubEditor'
import GRequestLog from './GRequestLog'

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
  overflow: hidden;

  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>
