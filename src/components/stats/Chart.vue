<template>
  <Bar :chart-data="chartData"
        :responsive="true"
        :chart-options="chartOptions"
        :width="1000"
        :height="300"
        class="chart"
  />
</template>

<script>
  import { Bar } from 'vue-chartjs'
  import { TRACKERS_INFO } from "@/assets/constants";


  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js'

  ChartJS.register(
      Title,
      Tooltip,
      Legend,
      BarElement,
      LinearScale,
      PointElement,
      CategoryScale
  )

  export default {
    name: 'Chart',
    components: { Bar },
    props: {
      trackers: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: []
        },
        chartOptions: {
          tooltips: {
            mode: 'dataset',
          },
          legend: {
            display: true,
            onHover: function (e) {
              e.target.style.cursor = 'pointer'
            },
            onLeave: function (e) {
              e.target.style.cursor = 'default'
            }
          },
          hover: {
            mode: 'dataset',
            onHover: function(e) {
              var point = this.getElementAtEvent(e);
              if (point.length) e.target.style.cursor = 'pointer';
              else e.target.style.cursor = 'default';
            }
          },
          responsive: true,
          elements: {
            point: {
              hitRadius: 10
            }
          },
        }
      }
    },
    mounted() {
      if (this.trackers) {
        for (let j = 0; j < this.trackers.length; j++) { //оценки
          this.chartData.labels.push(new Date( Number( this.trackers[j].dateSend) ).toLocaleString("ru", {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          }));
        }

        for (let i = 0; i < TRACKERS_INFO.length; i++) { //трекеры
          let data = [];
          for (let j = 0; j < this.trackers.length; j++) { //оценки
            data.push(this.trackers[j].dataTrackers[i].value)
          }

          let item = {
            label: this.trackers[0].dataTrackers[i].chartTitle,
            data: data
          };
          switch (i) {
            case 0:
              item.backgroundColor = '#ff9191';
              item.borderColor = '#ff9191';
              item.hoverColor = '#ff3c3c';
              item.hoverBorderColor= '#ff3c3c';
              break;
            case 1:
              item.backgroundColor = '#ffc89c';
              item.borderColor = '#ffc89c';
              item.hoverColor = '#ff973c';
              item.hoverBorderColor= '#ff973c';
              break;
            case 2:
              item.backgroundColor = '#c9ff9c';
              item.borderColor = '#c9ff9c';
              item.hoverColor = '#97ff3c';
              item.hoverBorderColor= '#97ff3c';
              break;
            case 3:
              item.backgroundColor = '#9fd3ff';
              item.borderColor = '#9fd3ff';
              item.hoverColor = '#3caaff';
              item.hoverBorderColor= '#3caaff';
              break;

          }
          item.lineTension = 0;

          this.chartData.datasets.push(item);
        }
      }
    }
  }
</script>

<style scoped>
.chart {
  width: 1000px;
  height: 300px;
}
</style>
