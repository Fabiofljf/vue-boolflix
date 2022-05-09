<template>
  <div id="app">
    <input type="text" placeholder="search" v-model="search" />
    <button type="submit" @click="getLink">Search</button>
    <div id="movie">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      search: null,
      link: "https://api.themoviedb.org/3/search/movie?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=it-IT&page=1&include_adult=false&query=",
      movie: null
    }
  },
  methods: {
    getLink() {
      //console.log(this.search);
      this.link_Api = this.link += this.search; // - Ottengo il link Api per effettuare la chiamata
      //console.log(this.link_Api);
    },
  },
  link() {
    axios.get(this.link_Api)
    .then((response)=>{
      console.log(response);
      this.movie = response.data.response; // -
      console.log(response.data.response);
    })
  },
  mounted() {
    this.link();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
