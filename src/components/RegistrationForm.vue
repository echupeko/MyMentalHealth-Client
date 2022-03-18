<template>
<div class="forms">
  <h3>Форма для регистрации пользователя</h3>
  <div>
    <label>Usename</label>
    <input type="text" v-model="user.name">
    <label>Email</label>
    <input type="email" v-model="user.email">
    <label>Password</label>
    <input type="password" v-model="user.password">
    <button @click="authorizeUser" >Зарегистрироваться</button>
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
      'showModal',
      'user'
    ])
  },
  methods: {
    authorizeUser() {
      const url = 'http://localhost:8000/user/join';
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
          this.$emit('show-modal', json.message, json.type);
          if(json.result) {
            this.$store.commit('set', { user: {} })
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