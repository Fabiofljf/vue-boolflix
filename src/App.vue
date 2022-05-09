<template>
  <div id="app">
    <input type="text" placeholder="search" v-model="search" />
    <button type="submit" @click="callApi" @keyup.enter="callApi">Search</button>
    <div id="movie">
      <ul v-for="(movie, index) in movies" :key="index">
        <li>
          <h2>{{movie.original_title}}</h2>
        </li>
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
      movies: null,
    };
  },
  methods: {
    callApi() {
      axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=it-IT&page=1&include_adult=false&query=${this.search}`)
      .then((response) => {
        //console.log(response);
        //console.log(response.data.results);
        this.movies = response.data.results; // - Arrays dei films
        //console.log(this.movies);
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
