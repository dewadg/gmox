<template>
  <div class="g-request-logs">
    <div class="g-request-logs-title">
      <span>{{ title }}</span>
    </div>
    <div class="g-request-logs-list-container">
      <GRequestLogList :items="logs" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import day from 'dayjs'
import GRequestLogList from './GRequestLogList.vue'

export default {
  name: 'GRequestLog',

  components: {
    GRequestLogList
  },

  setup() {
    const store = useStore()

    const currentWorkspace = computed(() => store.getters['workspace/current'])

    const currentStubMethod = computed(() => store.getters['protoStub/getCurrentMethod'](currentWorkspace.value.id))

    const logs = computed(() => {
      return store.getters['requestLog/getByPath'](currentWorkspace.value.id, currentStubMethod.value.path).map(log => ({
        id: log.id,
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
  position: relative;
  width: calc((100% - 1px - 250px) * 0.4);

  .g-request-logs-title {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    padding: 15px;
    color: $font-secondary;
    border-bottom: 1px solid $accent;

    .g-alphabet-icon {
      margin-right: 15px;
    }
  }

  .g-request-logs-list-container {
    position: absolute;
    z-index: 1;
    height: 100%;
    top: 0;
    width: 100%;
    padding-top: 47px;
    box-sizing: border-box;
  }
}
</style>
