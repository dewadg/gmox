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

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GRPC_SERVER_STATE } from '../store/grpcServer.store'

const store = useStore()

const grpcServerState = computed(() => store.getters['grpcServer/currentState'])

const turnGrpcServerOn = () => store.dispatch('grpcServer/turnOn')

const turnGrpcServerOff = () => store.dispatch('grpcServer/turnOff')
</script>
