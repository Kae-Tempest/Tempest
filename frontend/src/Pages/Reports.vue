<template>
    <div>
        <NavBar />
        <div class="flex flex-wrap">
            <div v-for="sensor in sensors" class="pl-20 pt-24">
                <router-link :to="{ path: '/SensorDetails/' + sensor.id }"><SensorCard :id ="sensor.id" :name=sensor.sensor_name :key="renderComponent"/></router-link>
            </div>
        </div>
        <div v-show="connect">
            <AddSensor/>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { LoginStore } from '../store/store'
import { ref, onMounted, defineAsyncComponent } from 'vue'

const NavBar = defineAsyncComponent(() => import('../components/NavBar.vue'))
const SensorCard = defineAsyncComponent(() => import('../components/Report.vue'))
const AddSensor = defineAsyncComponent(() => import('../components/AddSensor.vue'))

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