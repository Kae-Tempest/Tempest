<template>
    <div>
        <NavBar />
            <div class="flex flex-row justify-between">
            <div class="pl-40 mr-1/2 pt-12 basis-1/4 mr-[10%]">
                <SensorCard :id="Number(this.$route.params.id)" :key="reload_component" class="mb-10"/>
                <div class="flex justify-center">
                    <DataButton :id="Number(this.$route.params.id)"/>
                </div>
            </div>
            <hr class="border-l border-l-white h-64 mt-12">
            <div class="basis-1/2 h-96 pt-12 pl-40">
                <Graph :key="reload_component"/>
            </div>
            </div>
            <hr class="border-l-white w-3/4 ml-64 mt-12 mb-5">
            <Map/>
        </div>
</template>

<script lang="js">
import NavBar from '../components/NavBar.vue';
import Graph from '../components/Graph.vue';
import SensorCard from '../components/Report.vue';
import Map from '../components/Map.vue'
import DataButton from '../components/DataButton.vue'

export default {
    components: {
        NavBar,
        Graph,
        SensorCard,
        Map,
        DataButton,
    },
    data() {
        return {
            reload_component: 0,
        }
    },
    mounted: function() {
        this.reload()
    },
    methods: {
        reload() {
            setInterval(() => {
                this.reload_component ++;
            }, 300000)
        },
    },
}
</script>

<style>
    
</style>