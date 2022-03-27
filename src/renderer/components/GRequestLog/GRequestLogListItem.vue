<template>
  <li class="g-request-log-list-item">
    <div
      class="g-request-log-list-item-container"
      @click="toggleDetails"
    >
      <div class="left-slot">
        <GAlphabetIcon>R</GAlphabetIcon>
        <slot />
      </div>
      <div class="right-slot">
        <slot name="right" />
        <slot name="actions" />
      </div>
    </div>
    <div
      v-if="detailsShown"
      class="g-request-log-list-item-details"
    >
      <div class="payload">
        Payload
        <slot name="payload" />
      </div>

      <div class="metadata">
        Metadata
        <slot name="metadata" />
      </div>
    </div>
  </li>
</template>

<script>
import { ref } from 'vue'
import GAlphabetIcon from '../GAlphabetIcon.vue'

export default {
  components: {
    GAlphabetIcon
  },

  setup() {
    const detailsShown = ref(false)

    const toggleDetails = () => {
      detailsShown.value = !detailsShown.value
    }

    return {
      detailsShown,
      toggleDetails
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.g-request-log-list-item {
  border-bottom: 1px solid $accent;
  color: $font-secondary;

  &:hover {
    background: $secondary;
  }

  .g-alphabet-icon {
    margin-right: 15px;
  }

  .g-request-log-list-item-container {
    padding: 10px 15px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;

    &:hover {
      cursor: pointer;
    }
  }

  .left-slot,
  .right-slot {
    display: flex;
    align-items: center;
  }

  .g-button {
    margin-left: 10px;
  }

  .g-request-log-list-item-details {
    padding: 10px 15px;
    margin-top: 20px;

    .payload {
      margin-bottom: 20px;
    }

    pre {
      overflow: auto;
      word-wrap: normal;
      white-space: pre;
    }
  }
}
</style>
