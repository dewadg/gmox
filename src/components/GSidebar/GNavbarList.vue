<template>
  <ul class="g-navbar-list">
    <slot />
  </ul>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.g-navbar-list {
  list-style: none;
  padding: 0;

  * {
    user-select: none;
  }
}
</style>
