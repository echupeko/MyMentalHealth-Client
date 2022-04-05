import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
// import router from './utils/routes'
import store from './utils/store'

const app =createApp(App);
app.use(Vuex)
  .use(store)
  .mount('#app');
