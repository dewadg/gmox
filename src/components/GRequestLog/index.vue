<template>
  <div class="g-request-logs">
    <div class="g-request-logs-title">
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

        <template #payload>
          <pre>{{ log.payload }}</pre>
        </template>

        <template #metadata>
          <pre>{{ log.metadata }}</pre>
        </template>

        {{ log.type }}
      </GRequestLogListItem>
    </GRequestLogList>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import day from 'dayjs'
import GRequestLogList from './GRequestLogList.vue'
import GRequestLogListItem from './GRequestLogListItem.vue'

export default {
  name: 'GRequestLog',

  components: {
    GRequestLogList,
    GRequestLogListItem
  },

  setup() {
    const store = useStore()

    const currentStubMethod = computed(() => store.getters['protoStub/getCurrentMethod'])

    const logs = computed(() => {
      return store.getters['requestLog/getByPath'](currentStubMethod.value.path).map(log => ({
        type: log.type.toUpperCase(),
        payload: JSON.stringify(log.payload, null, 2),
        metadata: JSON.stringify(log.metadata.headers, null, 2),
        timestamp: day(log.timestamp).format('YYYY-MM-DD HH:mm:ss')
      }))
    })

    return {
      title: 'Request Logs',
      logs
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.g-request-logs {
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
