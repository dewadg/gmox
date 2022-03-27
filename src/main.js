import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './renderer/App.vue'
import store from './renderer/store'
import router from './renderer/router'
import './renderer/assets/fa'

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount('#app')
