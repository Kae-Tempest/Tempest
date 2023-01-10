<template>
    <div>
        <NavBar />
        <div v-for="sensor in sensors" class="pl-20 pt-24 flex flex-wrap">
            <router-link :to="{ path: '/SensorDetails/' + sensor.id }"><SensorCard :id ="sensor.id" :name=sensor.sensor_name :key="renderComponent"/></router-link>
        </div>
        <div v-show="connect">
            <AddSensor/>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { LoginStore } from '../store/store'
import NavBar from '../components/NavBar.vue';
import SensorCard from '../components/Report.vue'
import AddSensor from '../components/AddSensor.vue'

const renderComponent = ref(0)
const sensors = ref(Object)
const connect = LoginStore().connect

const forceRerender = () => {
   setInterval(() => {
      renderComponent.value ++
    }, 300000)
};

onMounted(async () => {
    const { data: sensor } = await axios.get(`http://192.168.1.28:5000/sensor/`)
    sensors.value = sensor
    forceRerender()
})
</script>