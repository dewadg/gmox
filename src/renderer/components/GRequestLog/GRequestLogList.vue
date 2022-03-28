<template>
  <div class="g-request-log-list">
    <ul>
      <slot />
    </ul>
  </div>
</template>

<style lang="scss">
.g-request-log-list {
  height: 100%;
  overflow-y: scroll;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
