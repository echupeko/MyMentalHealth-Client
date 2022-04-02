<template>
<div class="modal-frame">
  <div class="modal-content" :class="{ [modalType.className]: true }">
    <h1>{{ message }}</h1>
  </div>
</div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    message: String,
    modalType: Object
  }
}
</script>

<style scoped>
.information {
  background-color: #eeeeee;
}

.error {
  background-color: #ff4e4e;
  color: white;
}

.warning {
  background-color: #fffaa1;
}
</style>