<template>
  <div class="tracker">
    <h2 class="title">{{ tracker.title }}</h2>
    <div class="point-list">
    <div
        class="point"
        v-for="index in tracker.countPoint"
        :key="index"
        @selectPoint="$emit('selectPoint', tracker.name, index)"
    >
      <div class="custom-radio" :class="{'selected': index === selectedIndex}" @click="selectPoint(index)">{{index}}</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tracker",
  props: ['tracker'],
  data() {
    return {
      selectedIndex: null,
      val: []
    }
  },
  methods: {
    selectPoint(index) {
      this.selectedIndex = index;
    },
  }
}
</script>

<style scoped>
.title {
  margin: 5px 10px;
  text-align: left;
}

.hidden {
  display: none;
}

.tracker {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.point-list {
  display: flex;
}
.custom-radio {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 20px;
  border-radius: 30px;
  border: 1px solid gray;
  margin: 0;
  padding-top: 2px;
  cursor: pointer;
}
.custom-radio:hover {
  background-color: rgba(120, 140, 241, 0.98);
  color: #eeeeee;
}
.custom-radio.selected {
  background-color: rgba(241, 120, 148, 0.98);
  color: #eeeeee;
}
.point {
  margin: 0 5px;
}
label {
  cursor: pointer;
}
</style>