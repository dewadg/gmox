<template>
  <button
    :class="{
      'g-button': true,
      inline: inline,
      small: small
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.g-button {
  display: block;
  width: 100%;
  cursor: pointer;
  border: none;
  padding: 7.5px 10px;
  background: $primary;
  color: $font-secondary;
  border-radius: 5px;
  font-size: 1em;
  margin: 0;

  &:hover {
    background: $secondary;
    color: $font-primary;
  }

  &.inline {
    display: inline !important;
  }

  &.small {
    width: auto !important;
    padding: 5px 10px !important;
  }
}
</style>
