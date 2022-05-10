<template>
  <ul class="d-flex align-items-center">
    <li v-for="(listItem, index) in menu" :key="index">
        <a href="#">{{ listItem }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MenuApp",
  data() {
    return {
      menu: [
        "Home",
        "SerieTv",
        "Film",
        "Originali",
        "Aggiunti di recente",
        "La mia lista",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  margin-left: 10px;
  a{
      text-decoration: none;
      color: white;
  }
}
</style>