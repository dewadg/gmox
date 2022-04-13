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

<script setup>
import GTabs from './GTabs'
import GNavbar from './GNavbar'
import GSidebar from './GSidebar'
import GStubEditor from './GStubEditor'
import GRequestLog from './GRequestLog'
</script>

<style lang="scss">
.g-workspace {
  width: 100%;
  height: 100%;

  .wrapper {
    display: flex;
    width: 100%;
    height: calc(100% - 120px);
  }
}
</style>
