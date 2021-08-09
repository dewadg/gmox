<template>
  <div class="g-sidebar">
    <div class="g-sidebar-control">
      <GButton @click="handleChooseProtoFile">
        <FontAwesomeIcon icon="plus" size="xs" />
        Import Proto
      </GButton>
    </div>
    <GNavbarList>
      <GNavbarListItem
        v-for="proto in protos"
        :key="proto.proto"
        prefix-icon="P"
        @right-click="handleRightClick(proto.proto)"
      >
        <template #after>
          <GNavbarList class="second">
            <GNavbarListItem
              v-for="service in proto.services"
              :key="service.service"
              prefix-icon="S"
            >
              <template #after>
                <GNavbarList class="third">
                  <GNavbarListItem
                    v-for="method in service.methods"
                    :key="method.method"
                    prefix-icon="M"
                    @click="handleEdit({ protoName: proto.proto, serviceName: service.service, method })"
                  >
                    {{ method.method }}
                  </GNavbarListItem>
                </GNavbarList>
              </template>

              {{ service.service }}
            </GNavbarListItem>
          </GNavbarList>
        </template>

        {{ proto.proto }}
      </GNavbarListItem>
    </GNavbarList>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ipcRenderer } from 'electron'
import { CHOOSE_SINGLE_FILE, NAVBAR_LIST_ITEM_CLICK } from '../../constants/ipcEvents'
import GNavbarList from './GNavbarList.vue'
import GNavbarListItem from './GNavbarListItem.vue'
import GButton from '../GButton.vue'

export default {
  name: 'GSidebar',

  components: {
    GNavbarList,
    GNavbarListItem,
    GButton
  },

  setup() {
    const store = useStore()

    const protos = computed(() => store.getters['protoParser/protos'])

    const handleChooseProtoFile = async () => {
      const path = await ipcRenderer.invoke(CHOOSE_SINGLE_FILE)

      await store.dispatch('protoParser/parseProtoFile', { path })
    }

    const handleEdit = ({ protoName, serviceName, method }) => {
      store.commit('protoStub/setCurrentMethod', {
        path: `/${protoName}.${serviceName}/${method.method}`,
        returnType: method.returnType
      })
    }

    const handleRightClick = (protoName) => {
      ipcRenderer.send(NAVBAR_LIST_ITEM_CLICK, { protoName })
    }

    return {
      protos,
      handleChooseProtoFile,
      handleEdit,
      handleRightClick
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.g-sidebar {
  position: fixed;
  top: 75px;
  left: 0;
  width: 250px;
  height: 100%;
  border-right: 1px solid $accent;

  .g-sidebar-control {
    padding: 10px;
  }
}
</style>
