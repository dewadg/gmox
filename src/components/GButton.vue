<template>
  <button class="g-button">
    <slot />
  </button>
</template>

<style lang="scss">
@import '../assets/styles/variables.scss';

.g-button {
  display: block;
  width: 100%;
  cursor: pointer;
  border: none;
  padding: 7.5px 5px;
  background: $primary;
  color: $font-secondary;
  border-radius: 5px;
  font-size: 1em;
  margin: 0;

  &:hover {
    background: $secondary;
    color: $font-primary;
  }
}
</style>
