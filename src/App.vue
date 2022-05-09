<template>
  <div id="app">
    <SiteHeader />
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue'

export default {
  name: 'App',
  components: {
    SiteHeader
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
