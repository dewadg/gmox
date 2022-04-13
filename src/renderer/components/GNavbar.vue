<template>
  <div class="g-navbar">
    <div class="g-navbar-left">
      <span>{{ currentWorkspace.type }}</span>
      <input
        type="text"
        class="workspace-name"
        :value="currentWorkspace.name"
        @blur="handleWorkspaceNameChange"
      />
    </div>
    <input
      type="text"
      class="input-port"
      :class="{
        error: !isAddressValid
      }"
      :value="address"
      @input="handleAddressChange"
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

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { GRPC_SERVER_STATE } from '../store/grpcServer.store'
import GButton from './GButton.vue'
import useWorkspace from '@/renderer/composables/workspace'

const store = useStore()

const isAddressValid = ref(true)

const {
  currentWorkspace,
  renameWorkspace,
  changeWorkspaceAddress
} = useWorkspace({ store })

const address = computed(() => `${currentWorkspace.value.address}:${currentWorkspace.value.port}`)

const currentServerState = computed(() => store.getters['grpcServer/currentState'](currentWorkspace.value.id))

const handleTurnOnServer = () => {
  const stubs = new Map(Object.entries({ ...store.getters['protoStub/getStubMap'](currentWorkspace.value.id) }))

  const protos = store.getters['protoParser/protos'](currentWorkspace.value.id)

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

const handleWorkspaceNameChange = (event) => {
  renameWorkspace({
    id: currentWorkspace.value.id,
    name: event.target.value
  })
}

const handleAddressChange = (event) => {
  const [address = '', port = ''] = event.target.value.split(':')
  if (!address || !port) {
    isAddressValid.value = false
    return
  }

  changeWorkspaceAddress({
    id: currentWorkspace.value.id,
    address,
    port
  })

  isAddressValid.value = true
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

    &.error {
      border: 2px solid #dc2626;
    }
  }

  .g-navbar-left {
    padding: 0 15px;

    span {
      font-size: 0.8rem;
      font-weight: bold;
    }

    .workspace-name {
      display: block;
      outline: none;
      background: transparent;
      border: none;
      font-size: 1.2rem;
      font-weight: normal;
      margin: 0.2rem 0 0 0;
      color: inherit;
    }
  }

  .g-navbar-right {
    display: flex;
    padding: 0 15px;
  }
}
</style>
