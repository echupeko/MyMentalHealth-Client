<template>
<div class="action-modal welcome-modal">
  <h3 class="row">{{ title }}</h3>
  <div>
    <div class="row">
      <label>Usename</label>
      <input type="text" v-model="user.name">
    </div>
    <div class="row" v-if="isJoin">
      <label>Email</label>
      <input type="email" v-model="user.email">
    </div>
    <div class="row">
      <label>Password</label>
      <input type="password" v-model="user.password">
    </div>
    <button class="btn" @click="authorizeUser">{{ isJoin ? 'Зарегистрироваться' : 'Вход' }}</button>
  </div>
</div>
</template>

<script>
//обработка данных в компоненте
import { mapState } from "vuex";
import { apiCall } from "../../utils/methods";
import { ACTION_TYPES } from "../../assets/constants";

export default {
  name: "RegistrationForm",
  props: ['actionType'],

  computed: {
    ...mapState([
      'userIsLoged',
      'user'
    ]),

    title() {
      switch (this.actionType) {
        case ACTION_TYPES.LOGIN_TYPE:
          return "Вход пользователя";

        case ACTION_TYPES.JOIN_TYPE:
          return "Форма регистрации пользователя";

        case ACTION_TYPES.LOGOUT_TYPE:
          return "Выход пользователя";

        default:
          return '';
      }
    },
    isJoin() {
      return this.actionType === ACTION_TYPES.JOIN_TYPE
    }
  },

  methods: {
    authorizeUser() {
      let _this = this;

      apiCall(
          'http://localhost:8000/user/' + (_this.isJoin ? 'join' : 'login'),
          { method: 'post', body: _this.user },
          function (response) {
        // Модальное окно отображается только с ошибками при логине и всегда при сообщения о регистрации
        if (!response.result && !_this.isJoin || _this.isJoin) {
          _this.$emit('show-modal', response.message, response.type);
        }
        // Если все прошло успешно установка флага для скрытия форм login/join
        if (response.result) {
          _this.$store.commit('set', {userIsLoged: true});
          localStorage.userLogin = _this.user.name;
          localStorage.dateLogin = Date.now();
        }
      });
    }
  }
}
</script>

<style scoped>
.action-modal {
  width: 200px;
  display: flex;
  flex-direction: column;
}
</style>