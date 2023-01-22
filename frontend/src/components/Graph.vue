<script setup>
import axios from 'axios'
import Chart from 'chart.js/auto'
import { useRoute } from 'vue-router'
import {watchEffect, onMounted } from 'vue'

      let Temp = []
      let Hum = []
      let labels = []
      const route = useRoute()

      const config = {
          type: 'line',
          data: {
            labels: Array,
            datasets: [{
              label: 'temperature',
              backgroundColors: '#B4BEFE',
              borderColor: '#B4BEFE',
              borderWidth: 2,
              data: Array,
              tension: 0.3
            },
            {
              label: 'Humidity',
              backgroundColors: '#89B4FA',
              borderColor: '#89B4FA',
              borderWidth: 2,
              data: Array,
              tension: 0.3
            }]
          },
        
        }

      watchEffect(() => {
        setInterval(async () => {
          const res = await axios.get(`http://localhost:5000/graphreport/${route.params.id}`)
          const { data: reports } = await res
          reports.forEach(report => {
          let date = new Date(Number(report.mesured_at))
          const dateFormatted = `${date.getFullYear()} - ${(date.getMonth() + 1).toString().padStart(2, '0')} - ${date.getDate().toString().padStart(2, '0')} | ${date.getHours()}h${date.getMinutes() <= 9 ? '!' + date.getMinutes() : '0' + date.getMinutes()}`;
          Temp.push(report.temperature)
          Hum.push(report.humidity)
          labels.push(dateFormatted)
          })
			}, 300000);
      }),

      onMounted(async () => {
        const res = await axios.get(`http://176.186.101.196:5000/graphreport/${route.params.id}`)
        const { data: reports } = await res
        reports.forEach(report => {
        let date = new Date(Number(report.mesured_at))
        const dateFormatted = `${date.getFullYear()} - ${(date.getMonth() + 1).toString().padStart(2, '0')} - ${date.getDate().toString().padStart(2, '0')} | ${date.getHours()}h${date.getMinutes() <= 9 ? '0' + date.getMinutes() : + date.getMinutes()}`;
        Temp.push(report.temperature)
        Hum.push(report.humidity)
        labels.push(dateFormatted)
      });


      Temp = Temp.slice(-50)
      Hum = Hum.slice(-50)
      labels = labels.slice(-50)
      config.data.datasets[0].data = Temp
      config.data.datasets[1].data = Hum
      config.data.labels = labels

      const myChart = new Chart(
      document.getElementById('myChart'),
      config
      )})
</script>


<template>
    <canvas id="myChart"></canvas>
</template>