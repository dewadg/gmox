<template>
  <div class="g-sidebar">
    <div class="g-sidebar-control">
      <GButton @click="handleChooseProtoFile">
        <FontAwesomeIcon icon="plus" size="xs" />
        Import Proto
      </GButton>
      <input
        type="text"
        class="input-keyword"
        v-model="keyword"
        placeholder="Search method"
      />
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
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ipcRenderer } from 'electron'
import { CHOOSE_FILES, NAVBAR_LIST_ITEM_CLICK } from '../../constants/ipcEvents'
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

    const keyword = ref('')

    const protos = computed(() => {
      if (keyword.value === '') return store.getters['protoParser/protos']

      const filteredProtos = []

      for (const proto of store.getters['protoParser/protos']) {
        const services = []

        for (const service of proto.services) {
          const methods = []

          for (const method of service.methods) {
            if (method.method.toLowerCase().includes(keyword.value.toLowerCase())) {
              methods.push(method)
            }
          }

          services.push({
            ...service,
            methods
          })
        }

        if (services.length > 0) {
          filteredProtos.push({
            ...proto,
            services
          })
        }
      }

      return filteredProtos
    })

    const handleChooseProtoFile = async () => {
      const path = await ipcRenderer.invoke(CHOOSE_FILES)

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
      keyword,
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
  width: 250px;
  height: calc(100% - 120px);
  border-right: 1px solid $accent;

  .g-sidebar-control {
    padding: 10px;

    button {
      margin-bottom: 15px;
    }

    .input-keyword {
      background: $secondary;
      box-sizing: border-box;
      width: 100%;
      height: 35px;
      border: none;
      border-radius: 5px;
      padding: 0 10px;
      text-align: center;
      font-size: 1em;
      color: $font-secondary;
    }
  }
}
</style>
