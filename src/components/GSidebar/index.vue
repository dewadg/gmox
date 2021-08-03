<template>
  <div class="g-sidebar">
    <GNavbarList>
      <GNavbarListItem prefix-icon="P">
        <template #after>
          <GNavbarList class="second">
            <GNavbarListItem prefix-icon="S">
              <template #after>
                <GNavbarList class="third">
                  <GNavbarListItem prefix-icon="M">
                    SayHello
                  </GNavbarListItem>
                  <GNavbarListItem prefix-icon="M">
                    SayHi
                  </GNavbarListItem>
                  <GNavbarListItem prefix-icon="M">
                    SayGoodbye
                  </GNavbarListItem>
                </GNavbarList>
              </template>

              Greeter
            </GNavbarListItem>
            <GNavbarListItem prefix-icon="S">
              Responder
            </GNavbarListItem>
          </GNavbarList>
        </template>

        greeter.proto
      </GNavbarListItem>
      <GNavbarListItem prefix-icon="P">
        user.proto
      </GNavbarListItem>
    </GNavbarList>
  </div>
</template>

<script>
import GNavbarList from './GNavbarList.vue'
import GNavbarListItem from './GNavbarListItem.vue'

export default {
  name: 'GSidebar',

  components: {
    GNavbarList,
    GNavbarListItem
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
}
</style>
