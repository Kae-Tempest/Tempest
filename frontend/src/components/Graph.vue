<script setup>
import Chart from 'chart.js/auto';
import axios from 'axios'
import {watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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
          const res = await axios.get(`http://192.168.1.1:5000/report/${route.params.id}`)
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
        const res = await axios.get(`http://192.168.1.1:5000/report/${route.params.id}`)
        const { data: reports } = await res
        reports.forEach(report => {
        let date = new Date(Number(report.mesured_at))
        const dateFormatted = `${date.getFullYear()} - ${(date.getMonth() + 1).toString().padStart(2, '0')} - ${date.getDate().toString().padStart(2, '0')} | ${date.getHours()}h${date.getMinutes() <= 9 ? '0' + date.getMinutes() : + date.getMinutes()}`;
        Temp.push(report.temperature)
        Hum.push(report.humidity)
        labels.push(dateFormatted)
      });


      Temp = Temp.slice(-15)
      Hum = Hum.slice(-15)
      labels = labels.slice(-15)
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