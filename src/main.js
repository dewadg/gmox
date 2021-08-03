import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/fa'

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount('#app')
