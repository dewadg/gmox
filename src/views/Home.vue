<template>
  <div class="home">
    <GNavbar />
    <GSidebar />
    <GMockEditor />
    <GRequestLog />
  </div>
</template>

<script>
import GNavbar from '@/components/GNavbar'
import GSidebar from '@/components/GSidebar'
import GMockEditor from '@/components/GMockEditor'
import GRequestLog from '@/components/GRequestLog'

export default {
  name: 'Home',

  components: {
    GNavbar,
    GSidebar,
    GMockEditor,
    GRequestLog
  }
}
</script>
