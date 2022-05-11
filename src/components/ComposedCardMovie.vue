<template>
  <div class="card" >
    <img
      :src="img"
      alt="Immagine di copertina"
    />
    <div class="dettagli">
      <h5 class="p-1">Titolo: {{title}}</h5>
      <h5 class="p-1">Titolo originale: {{original_title}}</h5>
      <h5 class="p-1">
        Lingua:
        <country-flag
          :country="getFlag(original_language)"
          size="normal"
        />
      </h5>
      <h5 class="p-1">
        Voto:
        <font-awesome-icon
          icon="fa-solid fa-star"
          v-for="(star, index) in getstars(vote_average)"
          :key="index"
        />
      </h5>
    </div>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag"; // - Importo per l'inserimento delle bandiere

export default {
  name: "ComposedCardMovie",
  components:{
      CountryFlag,
  },
  props:{
      img: String,
      title: String,
      original_title: String,
      original_language: String,
      vote_average: Number,
  },
  methods:{
      // - funzione che mi sostituisce le bandiere quando non le trova.
      getFlag(flag) {
      if (flag == "en") return "gb-eng";
      return flag;
    },
    // - funzione che arrotonda il voto per eccesso una volta diviso.
    getstars(voto) {
      return Math.round(voto / 2);
    },
  }
};
</script>

<style lang="scss" scoped>
</style>