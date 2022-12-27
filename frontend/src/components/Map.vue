<template>
  <div id="container" class="ml-24">
    <div id="mapContainer"></div>
  </div>
 </template>

<script setup>
import "leaflet/dist/leaflet.css";
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import L from "leaflet";

const route = useRoute()
let center = []

   const setupLeafletMap = () => {
    
    const mapDiv = L.map("mapContainer", {
      center: center,
      zoom: 13
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapDiv);
    L.marker(center).addTo(mapDiv);
  }
  onMounted( async () => {
    const res = await axios.get(`http://192.168.1.1:5000/sensorPosition/${route.params.id}`)
          const { data: sensor } = await res
          center = [sensor[0].latitude, sensor[0].longitude]
   setupLeafletMap();
 });

</script>

<style scoped>
#mapContainer {
 width: 90vw;
 height: 40vh;
}
</style>