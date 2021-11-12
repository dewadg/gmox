<template>
  <div class="g-navbar">
    <div class="g-navbar-left">
      <span>{{ currentWorkspace.type }}</span>
      <h2>{{ currentWorkspace.name }}</h2>
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
        <FontAwesomeIcon
          icon="play-circle"
          size="lg"
        />
      </GButton>
      <GButton
        v-if="currentServerState === GRPC_SERVER_STATE.ON"
        @click="handleTurnOffServer"
      >
        <FontAwesomeIcon
          icon="stop-circle"
          size="lg"
        />
      </GButton>
      <GButton
        :disabled="currentServerState === GRPC_SERVER_STATE.OFF"
        @click="handleRestartServer"
      >
        <FontAwesomeIcon
          icon="redo"
          size="lg"
        />
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

    const currentWorkspace = computed(() => store.getters['workspace/current'])

    const currentServerState = computed(() => store.getters['grpcServer/currentState'](currentWorkspace.value.id))

    const handleTurnOnServer = () => {
      const stubs = new Map(Object.entries({ ...store.getters['protoStub/getStubMap'](currentWorkspace.value.id) }))

      const protos = store.getters['protoParser/protos'](currentWorkspace.value.id).map(proto => ({
        filePath: [...proto.filePath],
        proto: proto.proto,
        services: proto.services.map(service => ({
          ...service,
          methods: service.methods.map(method => ({
            ...method
          }))
        }))
      }))

      return store.dispatch('grpcServer/turnOn', {
        workspaceId: currentWorkspace.value.id,
        address: address.value,
        protos,
        stubs
      })
    }

    const handleTurnOffServer = () => store.dispatch('grpcServer/turnOff', { workspaceId: currentWorkspace.value.id })

    const handleRestartServer = async () => {
      await handleTurnOffServer()
      await handleTurnOnServer()
    }

    return {
      GRPC_SERVER_STATE,
      address,
      currentWorkspace,
      currentServerState,
      handleTurnOnServer,
      handleTurnOffServer,
      handleRestartServer
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.g-navbar {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  border-bottom: 1px solid $accent;

  .input-port {
    position: absolute;
    left: calc(50% - 100px);
    background: $secondary;
    width: 200px;
    height: 35px;
    border: none;
    border-radius: 5px;
    padding: 0 15px;
    text-align: center;
    font-size: 1.1em;
    color: $font-secondary;
  }

  .g-navbar-left {
    padding: 0 15px;

    span {
      font-size: 0.8rem;
      font-weight: bold;
    }

    h2 {
      font-size: 1.2rem;
      font-weight: normal;
      margin: 0.2rem 0 0 0;
    }
  }

  .g-navbar-right {
    display: flex;
    padding: 0 15px;
  }
}
</style>
