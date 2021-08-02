<template>
  <div class="g-sidebar">
    <ul class="g-navbar-list">
      <li class="g-navbar-list-item">
        <div class="g-navbar-list-item-container">
          <div class="g-navbar-list-item-title">
            <GAlphabetIcon>P</GAlphabetIcon>
            greeter.proto
          </div>
          <span>Test</span>
        </div>

        <ul class="g-navbar-list second">
          <li class="g-navbar-list-item">
            <div class="g-navbar-list-item-container">
              <div class="g-navbar-list-item-title">
                <GAlphabetIcon>S</GAlphabetIcon>
                Greeter
              </div>
              <span>Test</span>
            </div>
          </li>
          <li class="g-navbar-list-item">
            <div class="g-navbar-list-item-container">
              <div class="g-navbar-list-item-title">
                <GAlphabetIcon>S</GAlphabetIcon>
                Responder
              </div>
              <span>Test</span>
            </div>
          </li>
        </ul>
      </li>
      <li class="g-navbar-list-item">
        <div class="g-navbar-list-item-container">
          <div class="g-navbar-list-item-title">
            <GAlphabetIcon>P</GAlphabetIcon>
            user.proto
          </div>
          <span>Test</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import GAlphabetIcon from './GAlphabetIcon.vue'

export default {
  components: {
    GAlphabetIcon
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.g-navbar-list-item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $font-secondary;

  &:hover{
    background: $secondary;
    color: $font-primary;
  }
}

.g-sidebar {
  position: fixed;
  top: 75px;
  left: 0;
  width: 250px;
  height: 100%;
  border-right: 1px solid $accent;

  .g-navbar-list {
    list-style: none;
    padding: 0;

    &.second .g-navbar-list-item > .g-navbar-list-item-container {
      padding: 10px 15px 10px 30px;
    }

    .g-navbar-list-item {
      font-size: 0.9em;

      .g-navbar-list-item-container {
        padding: 15px;
      }

      .g-navbar-list-item-title {
        display: flex;
        align-items: center;

        .g-alphabet-icon {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
