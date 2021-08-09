<template>
  <li class="g-navbar-list-item">
    <div
      class="g-navbar-list-item-container"
      @click="toggle"
      :oncontextmenu="handleRightClick"
    >
      <div class="g-navbar-list-item-title">
        <GAlphabetIcon>
          {{ prefixIcon }}
        </GAlphabetIcon>
        <slot />
      </div>
      <FontAwesomeIcon
        v-if="hasAfter && !isToggled"
        icon="chevron-down"
        size="xs"
      />
      <FontAwesomeIcon
        v-if="hasAfter && isToggled"
        icon="chevron-up"
        size="xs"
      />
    </div>
    <slot
      v-if="isToggled"
      name="after"
    />
  </li>
</template>

<script>
import { ref, computed } from 'vue'
import GAlphabetIcon from '../GAlphabetIcon.vue'

export default {
  components: {
    GAlphabetIcon
  },

  props: {
    prefixIcon: {
      type: String,
      required: true
    }
  },

  emits: [
    'right-click'
  ],

  setup(props, { slots, emit }) {
    const isToggled = ref(false)

    const hasAfter = computed(() => Boolean(slots.after))

    const toggle = () => {
      isToggled.value = !isToggled.value
    }

    const handleRightClick = (event) => {
      event.preventDefault()

      emit('right-click')
    }

    return {
      isToggled,
      hasAfter,
      toggle,
      handleRightClick
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.g-navbar-list-item {
  font-size: 0.9em;

  .g-navbar-list-item-title {
    display: flex;
    align-items: center;

    .g-alphabet-icon {
      margin-right: 10px;
    }
  }
}

.g-navbar-list-item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  color: $font-secondary;

  &:hover{
    background: $secondary;
    color: $font-primary;
    cursor: pointer;
  }
}

.g-navbar-list.second .g-navbar-list-item > .g-navbar-list-item-container {
  padding-left: 25px;
}

.g-navbar-list.third .g-navbar-list-item > .g-navbar-list-item-container {
  padding-left: 40px;
}
</style>
