<template>
  <div id="profile">
<!--    <PopUpMenu/>-->
    <Avatar/>
    <div id="screenName">
      Здарвствуйте, {{ user.name }}
    </div>
    <div>
      <a href="#">Посмотреть данные трекеров</a>
    </div>
    <button class="btn logout" @click="this.$emit('logout')">Выйти</button>
  </div>
</template>

<script>
// import PopUpMenu from "@/components/modals/PopUpMenu";
import Avatar from "@/components/profile/Avatar";
import {mapState} from "vuex";
export default {
  name: "ProfilePage",
  components: {Avatar},
  computed: {
    ...mapState([
      'dataTrackers',
      'actionType',
      'userIsLoged',
      'showModal',
      'user'
    ]),
  },
}
</script>

<style scoped>

</style>
