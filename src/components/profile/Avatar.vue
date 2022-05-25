<template>
  <div class="avatar">
    <div class="img"/>
  </div>
</template>

<script>
export default {
  name: "Avatar",
}
</script>

<style scoped>
.img {
  background-image: url("../../assets/avatar.jpg");
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
