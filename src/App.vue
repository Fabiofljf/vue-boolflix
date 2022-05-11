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
  9. Imposto il layout con le card
  10. Effetto all hover (descrizione)
  11. Modifica componenti
 -->
  <div id="app">
    
    <section id="site_header">
      <div class="container-fluid m-0">
        <div class="row row-cols-2">
          <div class="col d-flex">
            <LogoApp />
            <MenuApp />
          </div>
          <!-- /.col img -->
          <div class="col d-flex justify-content-end">
            <input type="text" placeholder="search" v-model="search" />
            <button class="btn btn-primary" type="submit" @click="callApi" @keyup.enter="callApi">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
          </div>
          <!-- /.col search -->
        </div>
      </div>
    </section>
    <!-- /#site_header -->

    <section id="cards">
      <div id="movie">
          <div class="card" v-for="(movie, index) in films" :key="index">
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

      <div id="serie">
        <div class="card" v-for="(movie, index) in this.serie" :key="index">
          <img :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="Immagine di copertina">
          <div class="dettagli">
            <h5>Titolo: {{movie.name}}</h5>
            <h5>Titolo originale: {{movie.name}}</h5>
            <h5>Lingua:<country-flag :country="getFlag(movie.original_language)" size="normal"/></h5>
            <h5>
              Voto: 
              <font-awesome-icon icon="fa-solid fa-star" v-for="(star, index) in getstars(movie.vote_average)" :key="index"/>
            </h5>
          </div>
        </div>
      </div>
      <!-- /#serie -->

    </section>
    <!-- /#cards -->
  </div>
</template>

<script>
import LogoApp from "@/components/LogoApp.vue"
import MenuApp from "@/components/MenuApp.vue"
import "@/assets/scss/style.scss"; // - Importo lo style
import axios from "axios"; // - Importo axios per la chiamata get
import CountryFlag from "vue-country-flag"; // - Importo per l'inserimento delle bandiere


export default {
  name: "App",
  components: {
    CountryFlag,
    LogoApp,
    MenuApp,
  },
  data() {
    return {
      //type: null, // - tipo di ricerca (serie tv o film) (ANNULLATA DA PROMISE.ALL)
      search: null, // - barra di ricerca, query string
      movies: null, // - proprietà per accedere alla array film
      serie: null, // - proprietà per accedere alla array serie
      films: null
    };
  },
  methods: {
    callApi() {
      // - Chiedo al server 2 risultati contemporaneamente.
      Promise.all([this.getLinkApi_movie(), this.getLinkApi_serie()])
        .then((response) => {
          //console.log(response); // - Ottengo un array con dentro 2 array. La prima per i film la seconda pe rle serie
          //console.log(response[0]); 
          this.movies = response[0]; // - Arrays dei films
          console.log(this.movies.data.results); // - oggetto dell'array con all'array interna dove ci sono i film
          this.films = this.movies.data.results
          this.serie = response[1]; // - Array delle serie
        });
    },
    // - funzioni che mi restituiscono i link Api.
    getLinkApi_movie(){
      const LinkMovie = `https://api.themoviedb.org/3/search/movie?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=en-EN&page=1&include_adult=false&query=${this.search}` // - Chimata film
      return axios.get(LinkMovie)
    },
    getLinkApi_serie(){
      const LinkSerie = `https://api.themoviedb.org/3/search/tv?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=en-EN&page=1&include_adult=false&query=${this.search}` // - Chimata film
      return axios.get(LinkSerie)
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

</style>
