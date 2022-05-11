<template>
  <section id="site_header">
    <div class="container-fluid m-0">
      <div class="row row-cols-2">
        <div class="col d-flex">
          <LogoApp />
          <MenuApp />
        </div>
        <!-- /.col img -->
        <div class="col d-flex justify-content-end">
            <!-- 
                1. evento personalizzato da importare nel genitore.
                2. v-bind - resta in ascolto del v-model nel componente padre.
                3. v-on - $event.target.value prende in considerazione l'ultima modifica apportata al value.
                4. creo una direttiva v-bind per inserire un valore boolean false e trasformarlo in vero quando si verifica l'evento.
                5. keyup - ascolta l'evento senza click ma direttamente quando si scrive nel search.
            -->
          <form @submit.prevent="$emit(evento)">
            <input
              type="text"
              placeholder="search"
              :value="search"
              :class="btn"
              @input="$emit('input', $event.target.value)"
              @keyup="$emit('evento', search)"
            />
            <button class="btn btn-primary" type="submit" :value="btn">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
          </form>
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
  data(){
      return{
          btn: false
      }
  }
};
</script>

<style lang="scss" scoped>
</style>