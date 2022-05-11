<template>
  <section id="site_header">
    <div class="container-fluid m-0">
      <div class="row row-cols-2">
        <div class="col d-flex">
          <LogoApp />
          <MenuApp />
        </div>
        <!-- /.col img -->
        <div class="col d-flex justify-content-end align-items-center">
          <!-- 
                1. evento personalizzato da importare nel genitore.
                2. v-bind - resta in ascolto del v-model nel componente padre.
                3. v-on - $event.target.value prende in considerazione l'ultima modifica apportata al value.
                4. keyup - ascolta l'evento senza click ma direttamente quando si scrive nel search.
            -->
          <form @submit.prevent="$emit(evento)">
            <input
              class="ricerca"
              type="text"
              placeholder="search"
              :value="search"
              @input="$emit('input', $event.target.value)"
              @keyup="$emit('evento', search)"
            />
            <button class="btn btn-primary" type="submit">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
          </form>
          <div class="bell">
            <font-awesome-icon class="m-3" icon="fa-solid fa-bell" size="2x" />
            <div class="notifica"></div>
          </div>
          <font-awesome-icon class="m-1" icon="fa-solid fa-circle-user" size="2x" />
        </div>
        <!-- /.col search -->
      </div>
    </div>
  </section>
  <!-- /#site_header -->
</template>

<script>
import LogoApp from "@/components/LogoApp.vue";
import MenuApp from "@/components/MenuApp.vue";

export default {
  name: "SiteHeader",
  components: {
    LogoApp,
    MenuApp,
  },
  props: {
    search: String, // - Passo il valore della proprietà da padre in figlio
  },
};
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 20px;
}
.ricerca {
  width: 100px;
  background-color: #000000;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px white;
  padding: 1px;
  margin: 10px;
  transition-property: all;
  transition-duration: 2s;
}

.ricerca:hover {
  width: 200px;
}

svg {
  path {
    fill: white;
  }
}

.bell{
    position: relative;
}

.notifica{
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: red;
    position: absolute;
    top: 15px;
    right: 15px;
}
</style>