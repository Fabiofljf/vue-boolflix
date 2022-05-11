import Vue from 'vue'
import App from './App.vue'
// Coutry-flag
import CountryFlag from 'vue-country-flag'
Vue.component('country-flag', CountryFlag)
Vue.config.productionTip = false

// Boostrap
const bootstrap = require('bootstrap')
Vue.use(bootstrap)

/* Font Awesome icons*/
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons 👇 QUI AGGIUNGI LE ICONE che vuoi usare in camelCase */
import { faUserSecret, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library 👇 QUI AGGIUNGI IL NOME DELL'ICONA in camelCase*/
library.add(faUserSecret, faMagnifyingGlass)
library.add(faStar)
library.add(faBell)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
    render: h => h(App),
}).$mount('#app')