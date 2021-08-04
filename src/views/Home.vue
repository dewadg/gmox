<template>
  <div class="home">
    <GNavbar />
    <GSidebar />
    <GStubEditor />
    <GRequestLog />
  </div>
</template>

<script>
import GNavbar from '@/components/GNavbar'
import GSidebar from '@/components/GSidebar'
import GStubEditor from '@/components/GStubEditor'
import GRequestLog from '@/components/GRequestLog'

export default {
  name: 'Home',

  components: {
    GNavbar,
    GSidebar,
    GStubEditor,
    GRequestLog
  }
}
</script>
