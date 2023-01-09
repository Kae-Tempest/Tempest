<template>
  <div id="container" class="ml-24 absolute z-0">
    <div id="mapContainer"></div>
  </div>
 </template>

<script setup>
import L from "leaflet"
import axios from 'axios'
import { onMounted } from 'vue'
import "leaflet/dist/leaflet.css"
import { useRoute } from 'vue-router'

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
    L.marker(center, L.icon({
      iconUrl: '../assets/marker-icon.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: '../assets/marker-shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]})).addTo(mapDiv);
  }
  onMounted( async () => {
    const res = await axios.get(`http://192.168.1.28:5000/sensorPosition/${route.params.id}`)
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