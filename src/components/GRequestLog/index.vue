<template>
  <div class="g-request-logs">
    <div class="g-request-logs-title">
      <GAlphabetIcon>L</GAlphabetIcon>
      <span>{{ title }}</span>
    </div>
    <GRequestLogList>
      <GRequestLogListItem
        v-for="log in logs"
        :key="log"
      >
        <template #right>
          {{ log.timestamp }}
        </template>

        {{ log.type.toUpperCase() }}
      </GRequestLogListItem>
    </GRequestLogList>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import GAlphabetIcon from '../GAlphabetIcon.vue'
import GRequestLogList from './GRequestLogList.vue'
import GRequestLogListItem from './GRequestLogListItem.vue'

export default {
  name: 'GRequestLog',

  components: {
    GAlphabetIcon,
    GRequestLogList,
    GRequestLogListItem
  },

  setup() {
    const store = useStore()

    const currentPath = computed(() => store.getters['protoStub/getCurrentPath'])

    const logs = computed(() => store.getters['requestLog/getByPath'](currentPath.value))

    return {
      title: 'Incoming request logs will be displayed below',
      logs
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.g-request-logs {
  position: fixed;
  top: 76px;
  right: 0;
  width: calc((100% - 1px - 250px) * 0.4);
  height: calc(100% - 76px);

  .g-request-logs-title {
    display: flex;
    align-items: center;
    padding: 15px;
    color: $font-secondary;
    border-bottom: 1px solid $accent;

    .g-alphabet-icon {
      margin-right: 15px;
    }
  }
}
</style>
