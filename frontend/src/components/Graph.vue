<template>
        <Line :data="data" :options="options" :style="MyStyle"/>
</template>
<script lang="js">

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import * as chartConfig from '../assets/chartConfig.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export default {
  components: {
    Line
  },
  data() {
    return chartConfig
  },
  computed: {
    MyStyle() {
        return {
            height: '500px',
            position: 'relative'
        }
    }
  }
}
</script>
<style>
    
</style>