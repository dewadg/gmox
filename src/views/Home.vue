<template>
  <div class="home">
    <GNavbar />
    <GSidebar />
    <GMockEditor />
  </div>
</template>

<script>
import GNavbar from '@/components/GNavbar'
import GSidebar from '@/components/GSidebar'
import GMockEditor from '@/components/GMockEditor'

export default {
  name: 'Home',

  components: {
    GNavbar,
    GSidebar,
    GMockEditor
  }
}
</script>
