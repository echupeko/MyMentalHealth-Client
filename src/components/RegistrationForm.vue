<template>
<div class="forms">
  <h3>Форма для регистрации пользователя</h3>
  <div>
    <div>
      <label>Usename</label>
      <input type="text" v-model="user.name">
    </div>
    <div v-if="isJoin">
      <label>Email</label>
      <input type="email" v-model="user.email">
    </div>
    <div>
      <label>Password</label>
      <input type="password" v-model="user.password">
    </div>
    <button @click="authorizeUser">{{isJoin ? 'Зарегистрироваться' : 'Вход'}}</button>
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RegistrationForm",
  props: {
    isJoin: Boolean
  },
  computed: {
    ...mapState([
      'userIsLogin',
      'showModal',
      'user'
    ])
  },
  methods: {
    authorizeUser() {
      let url = 'http://localhost:8000/user/' + (this.isJoin ? 'join' : 'login');
      const options = {
        method: 'post',
        mode: 'cors',
        body:JSON.stringify({ user: this.user }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => {
          if(this.isJoin) {
            this.$emit('show-modal', json.message, json.type);
            if(json.result) {
              this.$store.commit('set', { userIsLogin: true });
            }
          } else {
            if(json.result) {
              this.$store.commit('set', { userIsLogin: true });
            } else {
              this.$emit('show-modal', json.message, json.type);
            }
          }
        });
    }
  }
}
</script>

<style scoped>
.forms {
  width: 200px;
  display: flex;
  flex-direction: column;
}
</style>