<template>
  <div>
    <Modal
      v-if="showModal"
      :message="modalMessage"
      :modalType="modalType"
    />

    <RegistrationForm
      v-if="!userIsLogin"
      :isJoin="false"
      @show-modal="openModal"
    />

    <form @submit="subForm" v-if="userIsLogin">
      <Tracker
          v-for="tracker in trackers"
          :tracker="tracker"
          :key="tracker.id"
          @selectPoint="selectPoint"
      />
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
import RegistrationForm from "./components/RegistrationForm";
import Tracker from "./components/Tracker";
import Modal from "./components/modal-frame/Modal";
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    RegistrationForm,
    Tracker,
    Modal
  },
  data() {
    return {
      modalMessage: "",
      modalType: null
    }
  },
  computed: {
    ...mapState([
      'userIsLogin',
      'showModal',
      'trackers',
      'user'
    ])
  },
  mounted() {
    this.$store.dispatch('getTrackers');
    // this.$store.dispatch('getAuthorizedUser');
  },
  methods: {
    selectPoint(name, index) {
      sessionStorage[name] = JSON.stringify({
        name,
        index
      })
    },

    openModal(message, type) {
      this.modalMessage = message;
      this.modalType = type;

      const store = this.$store;
      store.dispatch('openModal');
      setTimeout(function (){
        store.dispatch('closeModal');
      }, 2000);
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;

  @media (prefers-color-scheme: dark) {
    background:  #333; color: white;
  }

  @media (prefers-color-scheme: light) {
     background: white; color:  #555;
  }

  .modal-frame {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    background-color: #eeeeee;
  }
}
</style>
