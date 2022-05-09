<template>
  <form action="" @submit.prevent="$emit('getSearch')">
    <label for="Search">Search Movies</label>
    <input
      type="search"
      placeholder="search"
      :value="search"
      @input="$emit('input', $event.target.value)" 
    />
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
</template>

<script>

export default {
  name: "SearchBox",
  props:{
    search: String // - Mi serve per usare il v-model
  }
};
</script>

<style lang="scss" scoped>
</style>
