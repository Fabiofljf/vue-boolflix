<template>
  <div id="app">
    <input type="text" placeholder="movie or tv" v-model="type" />
    <input type="text" placeholder="search" v-model="search" />
    <button type="submit" @click="callApi" @keyup.enter="callApi">Search</button>

    <div id="movie" v-if="(this.type == 'movie')">
      <ul>
        <li v-for="(movie, index) in movies" :key="index">
          <h2>Titolo: {{movie.title}}</h2>
          <h3>Titolo originale: {{movie.original_title}}</h3>
          <h4>Lingua: <country-flag :country='getFlag(movie.original_language)' size='normal'/> </h4>
          <h5>Voto: {{movie.vote_average}}</h5>
        </li>
      </ul>
    </div>

    <div id="serie" else>
      <ul>
        <li v-for="(movie, index) in movies" :key="index">
          <h2>Titolo: {{movie.name}}</h2>
          <h3>Titolo originale: {{movie.original_name}}</h3>
          <h4>Lingua: <country-flag :country='getFlag(movie.original_language)' size='normal'/> </h4>
          <h5>Voto: {{movie.vote_average}}</h5>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import CountryFlag from 'vue-country-flag'

export default {
  name: "App",
  components:{
    CountryFlag
  },
  data() {
    return {
      type: null,
      search: null,
      movies: null,
      serietv: null
    };
  },
  methods: {
    callApi() {
      axios
      .get(`https://api.themoviedb.org/3/search/${this.type}?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=it-IT&page=1&include_adult=false&query=${this.search}`)
      .then((response) => {
        //console.log(response);
        //console.log(response.data.results);
        this.movies = response.data.results; // - Arrays dei films
        //console.log(this.movies);
      });
    },
    getFlag(flag) {
      if(flag == 'en') return 'gb-eng';
      return flag;
    }
  },
  computed: {},
  mounted() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
