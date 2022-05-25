<template>
  <div class="date-interval">
    <p class="text">Дата от: </p>
    <input type="date" v-model="resStartDate" @change="this.$emit('update', this.resStartDate, this.resEndDate)">
    <p class="text">до: </p>
    <input type="date" v-model="resEndDate" @change="this.$emit('update', this.resStartDate, this.resEndDate)">
  </div>
</template>

<script>
export default {
  name: "DateInterval",
  props: ['startDate', 'endDate'],
  data() {
    return {
      resStartDate: null,
      resEndDate: null,
    }
  },
  mounted() {
    this.resStartDate = this.startDate;
    this.resEndDate = this.endDate;
  }
}
</script>

<style lang="less" scoped>
.date-interval {
  display: flex;
  flex-direction: row;

  .text {
    padding: 10px;
    line-height: 25px;
  }
}
</style>
