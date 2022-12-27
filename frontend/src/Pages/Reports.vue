<template>
    <div>
        <NavBar />
        <div v-for="sensor in sensors" class="pl-20 pt-24 flex flex-wrap">
            <router-link :to="{ path: '/SensorDetails/' + sensor.id }"><SensorCard :id ="sensor.id" :name=sensor.sensor_name :key="reload_sensor"/></router-link>
        </div>
    </div>
</template>

<script lang="js">
import NavBar from '../components/NavBar.vue';
import SensorCard from '../components/Report.vue'
import axios from 'axios'

export default {
    components: {
        NavBar,
        SensorCard
    },
    data() {
        return {
            sensors: Object,
            reload_sensor: 0
        }
    },
    async created () {
        const res = await axios.get(`http://192.168.1.1:5000/sensor/`)
        const { data: sensor } = await res
        this.sensors = sensor
    },
    mounted: function() {
        this.reload()
    },
    methods: {
        reload() {
            setInterval(() => {
                this.reload_sensor ++;
            }, 300000)
        },
    },
}
</script>