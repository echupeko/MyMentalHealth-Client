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
      <div
          class="custom-radio"
          :class="{ 'selected': index === selectedIndex }"
          @click="!readOnly && selectPoint(index)"
      >
        {{ index }}
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Tracker",
  props: ['tracker','readOnly'],
  data() {
    return {
      selectedIndex: this.tracker.value || null,
    }
  },

  computed: {
    ...mapState([
      'dataTrackers'
    ])
  },

  methods: {
    selectPoint(index) {
      this.selectedIndex = index;
      const findedTracker = this.dataTrackers.find(item => item.id === this.tracker.id);
      if(findedTracker) {
        const id = this.dataTrackers.indexOf(findedTracker[0]);
        this.dataTrackers[id] = {
          id: this.tracker.id,
          value: index
        }
      } else {
        this.dataTrackers.push({
          id: this.tracker.id,
          value: index
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
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
        display: flex;
        justify-content: center;
        align-content: center;
        width: 20px;
        border-radius: 30px;
        border: 1px solid gray;
        margin: 0;
        padding-top: 2px;
        cursor: pointer;

        &:hover {
          background-color: rgba(120, 140, 241, 0.98);
          color: #eeeeee;
        }

        &.selected {
          background-color: rgba(241, 120, 148, 0.98);
          color: #eeeeee;
        }
      }
    }
  }
}
</style>