import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

const store = new Vuex.Store({
  state: {
    userIsLogin: false,
    showModal: false,
    trackers: null,
    user: {
      name: null,
      email: null,
      password: null
    }
  },
  actions: {
    getTrackers: function ({commit}) {
      const url = 'http://localhost:8000/notes/get';
      fetch(url)
        .then(res => res.json())
        .then(json => commit('set', { trackers: json }));
    },

    getAuthorizedUser: function ({commit}) {
      //проверка войден ли пользователь
      const url = 'http://localhost:8000/sessions/authorized';
      fetch(url,{ method: 'get' })
        .then(res => res.json())
        .then(json => commit('set', { userIsLogin: json.isAuthorized }));
    },

    openModal: function ({commit}) {
      commit('set', { showModal: true });
    },

    closeModal: function ({commit}) {
      commit('set', { showModal: false });
    }
  },
  mutations: {
    set(state, data) {
      Object.entries(data).forEach(([key, value]) => {
        state[key] = value;
      })
    }
  }
})

createApp(App).use(Vuex);
createApp(App).use(store).mount('#app');
