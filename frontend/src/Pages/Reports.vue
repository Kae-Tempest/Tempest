<template>
    <div>
        <NavBar />
        <div class="flex flex-wrap">
            <div v-for="sensor in sensors" class="pl-10 pt-10">
                <SensorCard :id="sensor.ID" :name=sensor.Sensor_name :key="renderComponent"/>
                <DataButton :id="sensor.ID"/>
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

const DataButton = defineAsyncComponent(() => import('../components/DataButton.vue'))
const NavBar = defineAsyncComponent(() => import('../components/NavBar.vue'))
const SensorCard = defineAsyncComponent(() => import('../components/SensorCard.vue'))
const AddSensor = defineAsyncComponent(() => import('../components/AddSensor.vue'))

const renderComponent = ref(0)
const sensors = ref({})
const connect = LoginStore().connect

const forceRerender = () => {
   setInterval(() => {
      renderComponent.value ++
    }, 300000)
};

onMounted(async () => {
    const {data: sensor} = await axios.get(`http://localhost:5000/sensor`)
    sensors.value = sensor
    forceRerender()
})
</script>