<template>
  <div class="g-navbar">
    <div class="g-navbar-left">
    </div>
    <input
      type="text"
      class="input-port"
      v-model="address"
    />
    <div class="g-navbar-right">
      <GButton
        v-if="currentServerState === GRPC_SERVER_STATE.OFF"
        @click="handleTurnOnServer"
      >
        Start
      </GButton>
      <GButton
        v-if="currentServerState === GRPC_SERVER_STATE.ON"
        @click="handleTurnOffServer"
      >
        Stop
      </GButton>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { GRPC_SERVER_STATE } from '../store/grpcServer.store'
import GButton from './GButton.vue'

export default {
  components: {
    GButton
  },

  setup() {
    const store = useStore()

    const address = ref('127.0.0.1:50051')

    const currentServerState = computed(() => store.getters['grpcServer/currentState'])

    const handleTurnOnServer = () => {
      const mocks = new Map(Object.entries({ ...store.getters['protoStub/getStubMap'] }))

      const protos = store.getters['protoParser/protos'].map(proto => ({
        ...proto,
        services: proto.services.map(service => ({
          ...service,
          methods: service.methods.map(method => ({
            ...method
          }))
        }))
      }))

      return store.dispatch('grpcServer/turnOn', {
        address: address.value,
        protos,
        mocks
      })
    }

    const handleTurnOffServer = () => store.dispatch('grpcServer/turnOff')

    return {
      GRPC_SERVER_STATE,
      address,
      currentServerState,
      handleTurnOnServer,
      handleTurnOffServer
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.g-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  border-bottom: 1px solid $accent;

  .input-port {
    background: $secondary;
    height: 35px;
    border: none;
    border-radius: 5px;
    padding: 0 15px;
    text-align: center;
    font-size: 1.1em;
    color: $font-secondary;
  }

  .g-navbar-right {
    display: flex;
    padding: 0 15px;
  }
}
</style>
