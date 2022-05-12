<template>
  <div class="card">
    <img :src="img" alt="Immagine di copertina" />
    <div class="dettagli">
      <h6 class="p-1">Titolo: {{ title }}</h6>
      <h6 class="p-1">Titolo originale: {{ original_title }}</h6>
      <h6 class="p-1">
        Lingua:
        <country-flag :country="getFlag(original_language)" size="normal" />
      </h6>
      <div class="p-1" :class="getCast(id)" v-for="(actor, index) in getCast(id)" :key="index">
        <h6 class="p-1">Cast:name{{actor.name}}</h6>
      </div>
      <h6 class="p-1">
        Voto:
        <font-awesome-icon
          icon="fa-solid fa-star"
          v-for="(star, index) in getstars(vote_average)"
          :key="index"
        />
      </h6>
    </div>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag"; // - Importo per l'inserimento delle bandiere
import axios from "axios"; // - Importo axios per la chiamata get

export default {
  name: "ComposedCardMovie",
  components: {
    CountryFlag,
  },
  data() {
    return {
      ArrayNomiAttori: [], // - proprietà per accedere all'array che comprende le array con i nomi degli attori
      ArrayAttori: [], // - Array di attori
    };
  },
  props: {
    img: String,
    title: String,
    original_title: String,
    original_language: String,
    vote_average: Number,
    id: Number,
  },
  methods: {
    // - funzione che mi sostituisce le bandiere quando non le trova.
    getFlag(flag) {
      if (flag == "en") return "gb-eng";
      return flag;
    },
    // - funzione che arrotonda il voto per eccesso una volta diviso.
    getstars(voto) {
      return Math.round(voto / 2);
    },
    // - funzione che mi restituisce il cast. Passo il valore di cast che è l'id del film che ho generato nel ciclo v-for con la funzione LinkMovie.
    getCast(cast) {
      const LinkCast = `https://api.themoviedb.org/3/movie/${cast}/credits?api_key=40a522c8e1eb2b9eb0188889f1def2c9&language=en-US`;
      axios.get(LinkCast).then((response) => {
        //console.log(response); // - Array generica
        this.ArrayNomiAttori = response.data.cast
        console.log(this.ArrayNomiAttori); // - Array contentente per ogni film tutti gli attori
        // if(this.ArrayNomiAttori.length < 3){
        //   this.ArrayAttori.push(this.ArrayNomiAttori)
        //   console.log(this.ArrayAttori);
        //}
        // for (let i = 0; this.ArrayNomiAttori.length < 3; i++) {
        //   this.ArrayAttori += this.ArrayNomiAttori[i];
        //   console.log(this.ArrayNomiAttori[i]);
        //   console.log(this.ArrayAttori);
        // }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>