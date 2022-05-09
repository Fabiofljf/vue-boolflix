<template>
  <section id="navBarMenu">
    <SearchBox v-model="search" @getSearch="ricerca" />
  </section>
</template>

<script>
import SearchBox from "@/components/SearchBox.vue"; // -figlio
import state from "@/state.js"; // -cassetto generico

export default {
  name: "SiteHeader",
  components: {
    SearchBox, // - componente figlio
  },
  data() {
    return {
      search: 'ciao'
    };
  },
  methods: {
    ricerca() {
      //console.log(state);
      state.search = this.search; // - passo il valore tenuto in ossrvazione
      console.log(state.search); // - parola
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#navBarMenu {
  height: 100px;
  background-color: antiquewhite;
}
</style>
