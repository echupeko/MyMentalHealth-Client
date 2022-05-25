<template>
  <div>

    <header v-if="userIsLoged">
      <div class="time-info">
        <h2>
          Сегодня {{
            new Date(Date.now()).toLocaleString('ru',{
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })
          }}
        </h2>
        <h3>У вас осталось {{ 1 }} оценок</h3>
      </div>

      <TopLogoutBox
        class="top-box inverse"
        @logout="logout"
      />
    </header>

    <div id="startPage">
      <form class="tracker-save" @submit.prevent="subForm" v-if="userIsLoged">
        <Tracker
            v-for="tracker in TRACKERS_INFO"
            :tracker="tracker"
            :key="tracker.id"
            @selectPoint="selectPoint"
        />
        <button class="btn" type="submit">Сохранить</button>
      </form>
    </div>

    <div v-if="true">
      <WelcomeModal
          v-if="!userIsLoged"
      />
      <Chart :trackers="trackers" v-if="moreTrack" />
      <div v-if="true">
        <Modal
            v-if="showModal"
            :message="modalMessage"
            :modalType="modalType"
        />

        <div class="history-tracker" v-if="userIsLoged">
         <DateInterval
           :startDate="startDateQuery"
           :endDate="endDateQuery"
           @update="selectPeriodTrackers"
         />
          <button @click="getTrackersData">Получить данные трекеров</button>
          <div
              v-for="tracker in trackers"
              :key="tracker.id"
              class="tracker-list"
          >
            <div class="timeSend">
              {{
                new Date( Number(tracker.dateSend) ).toLocaleString("ru", {
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


<!--            <router-view />-->
      </div>
    </div>
  </div>
</template>

<script>
import TopLogoutBox from "@/components/profile/TopLogoutBox";
import DateInterval from "@/components/utils/DateInterval";
import Chart from "./components/stats/Chart";
import WelcomeModal from "./components/modals/WelcomeModal";
import Tracker from "./components/Tracker";
import Modal from "./components/notifications/Modal";

import { TRACKERS_INFO, TRACKERS_LIMIT_ON_DAY } from "./assets/constants";
import { TrackerClass, DataTrackerClass } from "./assets/classes";
import { apiCall } from "./utils/methods";
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    TopLogoutBox,
    DateInterval,
    Chart,
    WelcomeModal,
    Tracker,
    Modal
  },

  data() {
    return {
      modalMessage: "",
      modalType: null,
      trackers: null,
      moreTrack: false,
      TRACKERS_INFO,
      startDateQuery: this.toDateInputValue(),
      endDateQuery: this.toDateInputValue(),
    }
  },

  computed: {
    ...mapState([
      'dataTrackers',
      'actionType',
      'userIsLoged',
      'showModal',
      'user'
    ]),
  },

  mounted() {
    this.$store.dispatch('getAuthorizedUser');
  },

  methods: {
    selectPeriodTrackers(startDate, endDate) {
      this.startDateQuery = startDate;
      this.endDateQuery = endDate;
    },

    toDateInputValue() {
      const local = new Date();
      local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
      return local.toJSON().slice(0,10);
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

    subForm() {
      //сделать обязательными все трекеры
      //обрабатывать пустые значения
      const trackerAnswerArray = [];
      this.dataTrackers.forEach(item => {
        let infoTracker = TRACKERS_INFO[item.id];
        trackerAnswerArray.push(new DataTrackerClass(item.id, item.value, infoTracker.name, infoTracker.title, infoTracker.chartTitle, infoTracker.countPoint));
      })

      const tracker = new TrackerClass(Date.now(),  this.user._id, trackerAnswerArray);
      const submitData = {
        tracker,
        trackersLimit: TRACKERS_LIMIT_ON_DAY
      }

      apiCall('http://localhost:8000/trackers/update', { method: 'post', body: { submitData: submitData } })
        .then(res => res.json())
        .then(json => {
          this.openModal(json?.message, json?.type);
        });

      this.$store.commit('set', { dataTrackers: [] });
      return false;
    },

    openModal(message, type) {
      if(message !== undefined && type !== undefined) {
        this.modalMessage = message;
        this.modalType = type;

        const store = this.$store;
        store.dispatch('openModal');
        setTimeout(function () {
          store.dispatch('closeModal');
        }, 2000);
      }
    },

    getTrackersData() {
      //сортировка по дате

      if (!this.moreTrack) {
        const _this = this;
        const submitData = {
          userId: _this.user._id,
          startDateSend: new Date(_this.startDateQuery).getTime(),
          endDateSend: new Date(_this.endDateQuery).getTime(),
        };

        apiCall(
            'http://localhost:8000/trackers/get',
            {method: 'post', body: {submitData: submitData}},
        )
          .then(res => res.json())
          .then(response => {
            if (response.result) {
              // console.log(response)

              _this.trackers = response.trackers;
              _this.trackers.forEach(item => {
                if (item.dataTrackers.length > 0) {
                  item.dataTrackers.forEach(track => {
                    let trackInfo = TRACKERS_INFO.find(findTrack => findTrack.id === track.id);
                    if (trackInfo) Object.assign(track, trackInfo)
                  })
                }
              });
              _this.moreTrack = true;
              console.log(_this.trackers)

              // if (submitData.startDateSend !== submitData.endDateSend) {
              //
              //
              //   const data = [];
              //   let prevDate;
              //   TRACKERS_INFO.forEach(item => {
              //     let value = 0;
              //     _this.trackers.forEach(track => {
              //       let a = track.dataTrackers[0];
              //       let dataTracker = new DataTrackerClass(a.id, a.value, a.name, a.title, a.chartTitle, a.countPoint);
              //       let tracker = new TrackerClass(track.dateSend, track.userId, dataTracker);
              //
              //       console.log(tracker)
              //       let nowDate = getDateRange(track.dateSend, track.dateSend);
              //       if(!prevDate || nowDate.startDay - prevDate.startDay > 86400000 && nowDate.endDay - prevDate.endDay > 86400000) {
              //         prevDate = nowDate;
              //       }
              //
              //       if (nowDate.startDay - prevDate.startDay < 86400000 && nowDate.endDay - prevDate.endDay < 86400000) {
              //         console.log(item.chartTitle, track.dataTrackers[item.id].value)
              //         value += track.dataTrackers[item.id].value;
              //       }
              //     });
              //     data.push(Math.round(value/_this.trackers.length))
              //   });
              //   _this.trackers = [
              //     _this.trackers[0]
              //   ];
              //   _this.trackers[0].dataTrackers.forEach(item => {
              //     item.value = data[item.id];
              //   })
              //   console.log(_this.trackers)
              // }

            }

            this.openModal(response?.message, response?.type);

        });
      } else {
        this.moreTrack = false;
      }
    }
  }
}
</script>

<style lang="less">
@import "styles/mixins";

* {
  margin: 0;
  padding: 0;
}

body {
  .dark;
  .light;

  display: flex;
  justify-content: center;
}

#app {
  font-family: "Montserrat", Segoe UI, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 70%;

  a {
    text-decoration: none;
    outline: none;
    color: #58744f;
  }

  .small-text {
    font-size: 12px;
  }

  .logo {
    width: 200px;
    height: 130px;
    background-image: url("assets/logo.png");
    background-size: contain;
    background-repeat: no-repeat;
  }

  button:not(.not-btn), input[type=submit], input[type=submit], .btn {
    .custom-button;
  }

  input {
    .custom-input;
  }

  header {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;

    .top-box {
      .dark;
      .light;

      position: absolute;
      right: 0;
      display: flex;
      flex-direction: row;
      height: max-content;
    }

    #startPage {
      position: relative;
      padding: 10px 20px;

      &:before {
        content: '';
        position: absolute;
        display: block;
        left: 0;
        top: 30px;
        bottom: 30px;
        width: 2px;
        background-color: @lighten-gray;
        border-radius: 50%;
      }
    }
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
    background-color: @white;
  }

  .history-tracker {
    display: flex;
    flex-direction: column;

    .tracker-list {
      border: 1px solid black;
      margin: 10px auto;
    }
  }

  .tracker {
    display: flex;
    flex-direction: column;
    width: max-content;

    .title {
      margin: 5px 10px;
      text-align: left;
    }

    .point-list {
      display: flex;

      .point {
        margin: 0 5px;

        .custom-radio {
          .custom-input;

          width: 20px;
          border-radius: 30px;
          cursor: pointer;

          &:hover {
            background-color: lighten(@gray, 20%);
            color: @white;
          }

          &.selected {
            background-color: @green;
            color: @white;
          }
        }
      }
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
