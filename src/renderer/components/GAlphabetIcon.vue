<template>
  <div class="g-alphabet-icon">
    <span>
      <slot />
    </span>
  </div>
</template>

<style lang="scss">
@import '../assets/styles/variables.scss';

.g-alphabet-icon {
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  background: $accent;
  border-radius: 3px;

  span {
    font-size: 0.8em;
  }
}
</style>
