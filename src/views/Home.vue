<template>
  <div class="home">
    <GNavbar />
    <GSidebar />
  </div>
</template>

<script>
import GNavbar from '@/components/GNavbar'
import GSidebar from '@/components/GSidebar'

export default {
  name: 'Home',

  components: {
    GNavbar,
    GSidebar
  }
}
</script>
