<template>
  <div class="full-frame" v-if="!userIsLoged">
    <div class="welcome-modal" v-if="actionType == null">
      <h2 class="welcome-modal__title row">Здравствуйте</h2>
      <p class="welcome-modal__description row">Для продолжения необходимо войти в систему
        <strong>Моя МенталОчка</strong>
      </p>
      <button class="btn" @click="showAction(this.ACTION_TYPES.LOGIN_TYPE)" v-if="!userIsLoged">Войти</button>
      <p class="welcome-modal__description-link row small-text">У вас нет аккаунта?
        <button class="welcome-modal__btn-link not-btn small-text" @click="showAction(this.ACTION_TYPES.JOIN_TYPE)" v-if="!userIsLoged">Зарегистрироваться</button>
      </p>
    </div>

    <LoginJoinForm
        v-if="actionType != null"
        :actionType="actionType"
        @show-modal="openModal"
    />
  </div>
</template>

<script>
import LoginJoinForm from "./LoginJoinForm";
import { ACTION_TYPES } from "../../assets/constants";

export default {
  name: "WelcomeModal",
  components: {
    LoginJoinForm
  },

  data() {
    return {
      actionType: null
    }
  },

  computed: {
    ACTION_TYPES() {
      return ACTION_TYPES
    }
  },

  methods: {
    showAction(currentAction) {
      this.actionType = currentAction;
    },


  }
}
</script>

<style scoped>

</style>
