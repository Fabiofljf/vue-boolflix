<template>
<!-- 
  1. imposto degli input dove far scrivere la tipologia di ricerca(serie tv o film) e il titolo e li collego alla mia API (.get()).
  2. Creo un bottone che al click genera una chiamata API.
  3. Effettuo il ciclo al listItem sfruttando il condizionale perché le serie e i film hanno campi nel JSON di risposta diversi.
  4. Sfrutto una libreria vue-country-flag (installata nella npm) per le bandiere.
  5. Creo una funzione che sostituisce alpha-2 con alpha-3 quando non trova la corrispondenza.
  6. Stampo a schermo la ricerca
  7. aggiungo le img di copertina interpolando la variabile dinamica che mi richiama le img con la parte statica riferita alla dimensione.
  8. Trasformo il voto, siccome va da 1 a 10 basta dividerlo per due per avere numeri interi da 1 a 5 e poi con una funzione li porto in difetto.
 -->
  <div id="app">
    <input type="text" placeholder="movie or tv" v-model="type" />
    <input type="text" placeholder="search" v-model="search" />
    <button type="submit" @click="callApi" @keyup.enter="callApi">Search</button>

    <div id="movie" v-if="(this.type == 'movie')">
      <ul>
        <li v-for="(movie, index) in movies" :key="index">
          <img :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="copertina film">
          <h2>Titolo: {{movie.title}}</h2>
          <h3>Titolo originale: {{movie.original_title}}</h3>
          <h4>Lingua: <country-flag :country='getFlag(movie.original_language)' size='normal'/> </h4>
          <h5>Voto: {{movie.vote_average}}</h5>
        </li>
      </ul>
    </div>

    <div id="serie" v-else>
      <ul>
        <li v-for="(movie, index) in movies" :key="index">
          <img :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="copertina serie">
          <h2>Titolo: {{movie.name}}</h2>
          <h3>Titolo originale: {{movie.original_name}}</h3>
          <h4>Lingua: <country-flag :country='getFlag(movie.original_language)' size='normal'/> </h4>
          <h5 >Voto: {{movie.vote_average}}</h5>
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
      .get(`https://api.themoviedb.org/3/search/${this.type}?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=en-EN&page=1&include_adult=false&query=${this.search}`)
      .then((response) => {
        //console.log(response);
        //console.log(response.data.results);
        this.movies = response.data.results; // - Arrays dei films
        //console.log(this.movies);
        console.log(this.movies.vote_average);
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
