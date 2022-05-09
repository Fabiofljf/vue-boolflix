<template>
  <section id="navBarMenu">
    <SearchBox v-model="search" @getSearch="ricerca"/>
  </section>
</template>

<script>
import SearchBox from "@/components/SearchBox.vue" // -figlio
import state from "@/state.js" // -cassetto generico

export default {
  name: 'SiteHeader',
  components:{
    SearchBox, // - componente figlio
  },
  data(){
    return{
      search: null
    }
  },
  methods:{
    ricerca(){
      console.log(this.search);
      console.log(state.search);
      //state.search = this.search
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#navBarMenu{
  height: 100px;
  background-color: antiquewhite;
}
</style>
