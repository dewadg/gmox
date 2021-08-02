<template>
  <div class="g-sidebar">
    <ul class="proto-list">
      <li class="proto-list-item">
        <div>greeter.proto</div>
        <span>Test</span>
      </li>
      <li class="proto-list-item">
        <div>user.proto</div>
        <span>Test</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import '../assets/styles/variables.scss';

.g-sidebar {
  position: fixed;
  top: 75px;
  left: 0;
  width: 250px;
  height: 100%;
  border-right: 1px solid $accent;

  .proto-list {
    list-style: none;
    margin: 15px 0 0 0;
    padding: 0;
    color: $font-secondary;

    .proto-list-item {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      font-size: 0.9em;
    }
  }
}
</style>
