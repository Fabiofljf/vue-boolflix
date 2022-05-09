<template>
  <form action="">
    <label for="Search">Search Movies</label>
    <input
      type="search"
      placeholder="search"
      :value="search"
      @input="$emit('input', $event.target.value)"
      @keyup="$emit('getSearch', search)"
    />
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
</template>

<script>

export default {
  name: "SearchBox",
  components: {},
  data() {
    return {
      search: null,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>