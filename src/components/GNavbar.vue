<template>
  <div class="g-navbar">
    <input
      type="text"
      class="input-port"
      :value="'localhost:50051'"
    />
  </div>
</template>

<style lang="scss">
@import '../assets/styles/variables.scss';

.g-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  border-bottom: 1px solid $accent;

  .input-port {
    background: $tertiary;
    height: 35px;
    border: none;
    border-radius: 5px;
    padding: 0 15px;
    text-align: center;
    font-size: 1.1em;
  }
}
</style>
