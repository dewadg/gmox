<template>
  <div class="hello">
    {{ grpcServerState }}
    <br/>
    <button
      v-if="grpcServerState === GRPC_SERVER_STATE.OFF"
      @click="turnGrpcServerOn"
    >
      Turn On
    </button>
    <button
      v-if="grpcServerState === GRPC_SERVER_STATE.ON"
      @click="turnGrpcServerOff"
    >
      Turn Off
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GRPC_SERVER_STATE } from '../store/grpcServer.store'

export default {
  setup() {
    const store = useStore()

    return {
      GRPC_SERVER_STATE,

      grpcServerState: computed(() => store.getters['grpcServer/currentState']),
      turnGrpcServerOn: () => store.dispatch('grpcServer/turnOn'),
      turnGrpcServerOff: () => store.dispatch('grpcServer/turnOff')
    }
  }
}
</script>
