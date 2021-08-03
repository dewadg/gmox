<template>
  <li class="g-request-log-list-item">
    <GAlphabetIcon>R</GAlphabetIcon>
    <div class="g-request-log-list-item-container">
      <div class="left-slot">
        <slot />
      </div>
      <div class="right-slot">
        <slot name="right" />
        <slot name="actions" />
      </div>
    </div>
  </li>
</template>

<script>
import GAlphabetIcon from '../GAlphabetIcon.vue'

export default {
  components: {
    GAlphabetIcon
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.g-request-log-list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid $accent;
  color: $font-secondary;

  &:hover {
    background: $secondary;
    cursor: pointer;
  }

  .g-alphabet-icon {
    margin-right: 15px;
  }

  .g-request-log-list-item-container {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
  }

  .left-slot,
  .right-slot {
    display: flex;
    align-items: center;
  }

  .g-button {
    margin-left: 10px;
  }
}
</style>
