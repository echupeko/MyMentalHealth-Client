<template>
  <div>
    <div class="full-frame" v-if="!userIsLoged">
      <div class="welcome-modal" v-if="logIn && join">
        <h2 class="welcome-modal__title row">Здравствуйте</h2>
        <p class="welcome-modal__description row">Для продолжения необходимо войти в систему
          <strong>Моя МенталОчка</strong>
        </p>
        <button class="btn" @click="showAction(this.actionType.LOGIN_TYPE.id)" v-if="!userIsLoged">Войти</button>
        <p class="welcome-modal__description-link row small-text">У вас нет аккаунта?
          <button class="welcome-modal__btn-link small-text" @click="showAction(this.actionType.JOIN_TYPE.id)" v-if="!userIsLoged">Зарегистрироваться</button>
        </p>
      </div>

      <RegistrationForm
          v-if="!logIn && !userIsLoged"
          :isJoin="false"
          @show-modal="openModal"
      />

      <RegistrationForm
          v-if="!join && !userIsLoged"
          :is-join="true"
          @show-modal="openModal"
      />
    </div>

    <div v-if="userIsLoged">
      <p>Вы, вошли под пользователем: {{ user.name }}</p>
      <button class="btn" @click="logout">Выйти</button>
    </div>

    <Modal
      v-if="showModal"
      :message="modalMessage"
      :modalType="modalType"
    />

    <div class="history-tracker">
      <button @click="getTrackersData">Получить данные трекеров</button>
      <div
          v-for="tracker in trackers"
          :key="tracker.id"
          class="tracker-list"
      >
        <div class="timeSend">
          {{
            new Date(Number(tracker.dateSend)).toLocaleString("ru", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
              timezone: 'UTC',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
            })
          }}
        </div>
        <Tracker
            v-for="track in tracker.dataTrackers"
            :tracker="track"
            :key="track.id"
            :read-only="true"
        />
      </div>

    </div>

    <form class="tracker-save" @submit.prevent="subForm" v-if="userIsLoged">
      <Tracker
          v-for="tracker in TRACKERS_INFO"
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
import { TRACKERS_INFO, TRACKERS_LIMIT_ON_DAY } from "./constants";
import { apiCall } from "./methods";
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
      modalType: null,
      logIn: true,
      logOut: true,
      join: true,
      trackers: null,
      moreTrack: false,
      TRACKERS_INFO
    }
  },

  computed: {
    ...mapState([
      'dataTrackers',
      'actionType',
      'userIsLoged',
      'showModal',
      'user'
    ])
  },

  mounted() {
    this.$store.dispatch('getAuthorizedUser');
  },

  methods: {
    showAction(currentAction) {
      switch (currentAction) {
        case this.actionType.LOGIN_TYPE.id:
          this.logIn = false;
          break;
        case this.actionType.JOIN_TYPE.id:
          this.join = false;
          break;
        case this.actionType.LOGOUT_TYPE.id:
          break;
      }
    },

    logout() {
      this.$store.commit('set', { userIsLoged: false });
      localStorage.removeItem('userLogin');
      localStorage.removeItem('dateLogin');
      this.logIn = true;
      this.join = true;
    },

    selectPoint(name, index) {
      sessionStorage[name] = JSON.stringify({
        name,
        index
      })
    },

    openModal(message, type) {
      if(message != undefined && type != undefined) {
        this.modalMessage = message;
        this.modalType = type;

        const store = this.$store;
        store.dispatch('openModal');
        setTimeout(function () {
          store.dispatch('closeModal');
        }, 2000);
      }
    },

    subForm() {
      //сделать обязательными все трекеры
      //обрабатывать пустые значения
      const _this = this;
      const submitData = {
        userId: _this.user._id,
        dateSend: Date.now(),
        dataTrackers: _this.dataTrackers,
        trackersLimit: TRACKERS_LIMIT_ON_DAY
      };

      apiCall(
          'http://localhost:8000/trackers/update',
          {method: 'post', body: {submitData: submitData}},
          function (response) {
            _this.openModal(response?.message, response?.type);
      });

      this.$store.commit('set', {dataTrackers: []});
      return false;
    },

    getTrackersData() {
      if (!this.moreTrack) {
        const _this = this;
        const submitData = {
          userId: _this.user._id,
          dateSend: Date.now(),
        };

        apiCall(
            'http://localhost:8000/trackers/get',
            { method: 'post', body: { submitData: submitData } },
            function (response) {
              if (response.result) {
                _this.trackers = response.trackers;
                _this.trackers.forEach(item => {
                  if (item.dataTrackers.length > 0) {
                    TRACKERS_INFO.forEach(track => {
                      Object.assign(item.dataTrackers[track.id], track)
                    })
                  }
                });
                _this.moreTrack = true;
              }

              _this.openModal(response?.message, response?.type);
            });
      } else {
        this.moreTrack = false;
      }
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
  background-color: #eeeeee;
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

  .small-text {
    font-size: 12px;
  }

  .btn {
    padding: 10px;
    background-color: #b8ff95;
    border-radius: 10px;
    border: none;
    font-size: 17px;
    font-weight: bold;
    text-transform: uppercase;
    color: #484848;
    cursor: pointer;
  }

  .row {
    margin: 10px 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .modal-frame {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    background-color: #eeeeee;
  }

  .history-tracker {
    display: flex;
    flex-direction: column;

    .tracker-list {
      border: 1px solid black;
      margin: 10px auto;
    }
  }

  .tracker-save {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .full-frame {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;

    .welcome-modal {
      width: 300px;
      height: max-content;
      margin: auto;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 0 15px black;

      &__btn-link {
        background-color: transparent;
        border: none;
        color: #3374FFFF;
        cursor: pointer;
      }
    }
  }
}
</style>
