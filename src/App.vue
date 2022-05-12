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
  11. Refactoring
 -->
  <div id="app">
    <!-- 
      1. Uso la direttiva v-model per tenere traccia di quanto scritto nell'input.
      2. importo il componente personalizzato che avrà come evento la mia funzione callApi.
    -->
    <SiteHeader v-model="search" @evento="callApi" />

    <div class="loading">
      <div v-if="this.search.length == 0">
        <div class="menuNavBar">
          <h1 class="intro">Effettua la tua ricerca...</h1>
          <h1>o</h1>
          <h1>Ricerca per genere</h1>
          <div class="d-flex justify-content-center">
            <select class="form-select" aria-label="Default select example">
              <option selected>Seleziona il genere</option>
              <option
                v-for="({ name }, index) in this.genereMovie"
                :key="index"
              >
                {{ name }}
              </option>
            </select>
          </div>
        </div>
        <!-- <div class="aSchermo" v-if="id == ids">
          <div class="card">
            <img :src="img" alt="Immagine di copertina" />
          </div>
        </div> -->
        <!-- /.aSchermo -->
      </div>

      <div v-else>
        <section id="cards">
          <h1 class="text_style text-light m-0 p-4">Film</h1>
          <div id="movie">
            <ComposedCardMovie
              :img="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              :title="movie.title"
              :original_title="movie.original_title"
              :original_language="movie.original_language"
              :vote_average="movie.vote_average"
              :id="movie.id"
              v-for="(movie, index) in this.films"
              :key="index"
            />
          </div>
          <!-- /#movie -->

          <h1 class="text_style text-light m-0 p-4">Serie tv</h1>
          <div id="serie">
            <ComposedCardSerie
              :img="`http://image.tmdb.org/t/p/w500/${serie.poster_path}`"
              :name="serie.name"
              :original_name="serie.original_name"
              :original_language="serie.original_language"
              :vote_average="serie.vote_average"
              v-for="(serie, index) in this.films"
              :key="index"
            />
          </div>
          <!-- /#serie -->
        </section>
        <!-- /#cards -->
      </div>
    </div>
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHearde.vue"; // - Importo il componente figlio
import ComposedCardMovie from "@/components/ComposedCardMovie.vue"; // - Importo il componente figlio
import ComposedCardSerie from "@/components/ComposedCardSerie.vue"; // - Importo il componente figlio
// import LogoApp from "@/components/LogoApp.vue" // - (SPOSTATO IN SITEHEADER)
// import MenuApp from "@/components/MenuApp.vue" // - (SPOSTATO IN SITEHEADER)
import "@/assets/scss/style.scss"; // - Importo lo style
import axios from "axios"; // - Importo axios per la chiamata get
//import CountryFlag from "vue-country-flag"; // - Importo per l'inserimento delle bandiere (SPOSTATO IN COMPOSED CARD)

export default {
  name: "App",
  components: {
    //CountryFlag,
    //LogoApp, // - (SPOSTATO IN SITEHEADER)
    //MenuApp, // - (SPOSTATO IN SITEHEADER)
    SiteHeader,
    ComposedCardMovie,
    ComposedCardSerie,
  },
  data() {
    return {
      //type: null, // - tipo di ricerca (serie tv o film) (ANNULLATA DA PROMISE.ALL)
      search: [], // - barra di ricerca, query string (al momento vuota, aspetto in maniera dinamica il v-model che sovrascriverà i dati)
      movies: null, // - proprietà per accedere alla array film generata da Promise.all
      films: null, // - proprietà per accedere all'array e ciclarla.
      serie: null, // - proprietà per accedere alla array serie generata da Promise.all
      serietv: null, // - proprietà per accedere all'array e ciclarla.
      genereMovie: null, // - proprietà per accedere all'array e ciclarla.
    };
  },
  methods: {
    callApi() {
      // - Chiedo al server 2 risultati contemporaneamente.
      Promise.all([this.getLinkApi_movie(), this.getLinkApi_serie()]).then(
        (response) => {
          //console.log(response); // - Ottengo un array con dentro 2 array. La prima per i film la seconda pe rle serie
          //console.log(response[0]);
          this.movies = response[0]; // - Arrays dei films
          //console.log(this.movies.data.results); // - oggetto dell'array con all'array interna dove ci sono i film
          this.films = this.movies.data.results;
          this.serie = response[1]; // - Array delle serie
          this.serietv = this.serie.data.results;
        }
      );
    },
    callApiGenere() {
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=en-US"
        )
        .then((response) => {
          this.genereMovie = response.data.genres;
        });
    },
    // - funzioni che mi restituiscono i link Api.
    getLinkApi_movie() {
      const LinkMovie = `https://api.themoviedb.org/3/search/movie?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=en-EN&page=1&include_adult=false&query=${this.search}`; // - Chimata film
      return axios.get(LinkMovie);
    },
    getLinkApi_serie() {
      const LinkSerie = `https://api.themoviedb.org/3/search/tv?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=en-EN&page=1&include_adult=false&query=${this.search}`; // - Chimata film
      return axios.get(LinkSerie);
    },
  },
  mounted() {
    this.callApiGenere();
  },
};
</script>

<style lang="scss">
</style>