<template>
  <input v-model="val" id="{{'choice' + index}}" type="radio" class="point" @click="$emit('selectPoint')" value="{{index}}">
  <label for="{{'choice' + index}}">{{index}}</label>
</template>

<script>
export default {
  name: "PointTracker",
  props: ['index'],
  data() {
    return {
      val: 0
    }
  },
  mounted() {
    this.val = this.index;
  }
}
</script>

<style scoped>
.point {
  display: inline-block;
  width: 18px;
  margin: 5px;
  padding: 5px;
  border-radius: 50%;
  background-color: #eee;
  color: #333333;
  cursor: pointer;
}
</style>