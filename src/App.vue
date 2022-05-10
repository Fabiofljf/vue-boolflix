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
    
    <section id="site_header">
      <div class="container-fluid m-0">
        <div class="row row-cols-2">
          <div class="col">
            <img src="./assets/img/netflix-logo.jpeg" alt="" />
          </div>
          <!-- /.col img -->
          <div class="col d-flex justify-content-end">
            <input type="text" placeholder="movie or tv" v-model="type" />
            <input type="text" placeholder="search" v-model="search" />
            <button type="submit" @click="callApi" @keyup.enter="callApi">
              Search
            </button>
          </div>
          <!-- /.col search -->
        </div>
      </div>
    </section>
    <!-- /#site_header -->

    <section id="cards">
      <div id="movie" v-if="this.type == 'movie'">
          <div class="card" v-for="(movie, index) in movies" :key="index">
            <img :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="Immagine di copertina">
            <div class="dettagli">
              <h5 class="p-1">Titolo: {{movie.title}}</h5>
              <h5 class="p-1">Titolo originale: {{ movie.original_title }}</h5>
              <h5 class="p-1">Lingua: <country-flag :country="getFlag(movie.original_language)" size="normal"/></h5>
              <h5 class="p-1">
                Voto: 
                <font-awesome-icon icon="fa-solid fa-star" v-for="(star, index) in getstars(movie.vote_average)" :key="index"/>
              </h5>
            </div>
          </div>
      </div>
      <!-- /#movie -->

      <div id="serie" v-else>
        <div class="card" v-for="(movie, index) in movies" :key="index">
          <img :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="Immagine di copertina">
          <h5>Titolo: {{movie.name}}</h5>
          <h5>Titolo originale: {{movie.name}}</h5>
          <h5>Lingua:<country-flag :country="getFlag(movie.original_language)" size="normal"/></h5>
          <h5>
            Voto: 
            <font-awesome-icon icon="fa-solid fa-star" v-for="(star, index) in getstars(movie.vote_average)" :key="index"/>
          </h5>
        </div>
      </div>
      <!-- /#serie -->

    </section>
    <!-- /#cards -->
  </div>
</template>

<script>
import "@/assets/scss/style.scss"; // - Importo lo style
import axios from "axios"; // - Importo axios per la chiamata get
import CountryFlag from "vue-country-flag"; // - Importo per l'inserimento delle bandiere

export default {
  name: "App",
  components: {
    CountryFlag,
  },
  data() {
    return {
      type: null,
      search: null,
      movies: null,
      serietv: null,
    };
  },
  methods: {
    callApi() {
      axios
        .get(
          `https://api.themoviedb.org/3/search/${this.type}?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=en-EN&page=1&include_adult=false&query=${this.search}`
        )
        .then((response) => {
          this.movies = response.data.results; // - Arrays dei films
        });
    },
    getFlag(flag) {
      if (flag == "en") return "gb-eng";
      return flag;
    },
    getstars(voto) {
      return Math.round(voto / 2);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  #site_header {
    background-color: black;
  }
  .row {
    height: 100px;
    align-items: center;
      .col {
        img {
          height: 100px;
        }
      }
  }
  #movie, #serie{
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background-color: black;
    .card{
      width: calc((100% / 6) - 20px);
      padding: 5px;
      margin: 10px;
      border-radius: 10px;
      box-shadow: 0px 0px 5px 0px grey;
      background-color: transparent;
      color: white;
      position: relative;
    }
  }
  .dettagli{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000d4;
    width: 100%;
    height: 100%;
  }
  .card:hover .dettagli{
    display: block;
  }
  
}
</style>
