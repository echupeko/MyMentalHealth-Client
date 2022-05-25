<template>
<aside>
  <div class="left-block">
    <div class="avatar"/>
  </div>
  <div class="rigth-block">
    <h3 class="user-name">
      Здарвствуйте, <a href="/profile">{{ user.name }}</a>
    </h3>
    <div class="logout" @click="this.$emit('logout')">Выход</div>
  </div>
</aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TopLogoutBox",
  computed: {
    ...mapState([
      'user'
    ]),
  },
}
</script>

<style lang="less" scoped>
aside {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 50px;
  gap: 10px;

  .left-block {
    .avatar {
      background-image: url("../../assets/avatar.jpg");
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .rigth-block {
    margin-right: 10px;

    .logout {
      cursor: pointer;
    }
  }
}
</style>
