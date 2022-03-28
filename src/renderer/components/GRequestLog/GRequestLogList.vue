<template>
  <div class="g-request-log-list">
    <ul>
      <li
        class="g-request-log-list-item"
        v-for="log in items"
        :key="log"
      >
        <div
          class="g-request-log-list-item-container"
          @click="collapseDetails(log)"
        >
          <div class="left-slot">
            <GAlphabetIcon>R</GAlphabetIcon>
            {{ log.type }}
          </div>
          <div class="right-slot">
            {{ log.timestamp }}
          </div>
        </div>
        <div
          v-if="collapseTracker[log.id]"
          class="g-request-log-list-item-details"
        >
          <div class="payload">
            Payload
            <pre>{{ log.payload }}</pre>
          </div>

          <div class="metadata">
            Metadata
            <pre>{{ log.metadata }}</pre>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import GAlphabetIcon from '../GAlphabetIcon.vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})

const collapseTracker = reactive({})

function collapseDetails (log) {
  collapseTracker[log.id] = !collapseTracker[log.id]
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.g-request-log-list {
  height: 100%;
  overflow-y: scroll;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

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
  }
}
</style>
