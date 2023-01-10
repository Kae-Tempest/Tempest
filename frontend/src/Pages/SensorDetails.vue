<template>
    <div>
        <NavBar />
            <div class="flex flex-row justify-between">
            <div class="pl-40 mr-1/2 pt-12 basis-1/4 mr-[10%]">
                <SensorCard :id="route.params.id" :key="reload_component" class="mb-10"/>
                <div class="flex justify-center">
                    <DataButton :id="route.params.id"/>
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

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Map from '../components/Map.vue'
import Graph from '../components/Graph.vue';
import NavBar from '../components/NavBar.vue';
import SensorCard from '../components/Report.vue';
import DataButton from '../components/DataButton.vue'

const reload_component = ref(0)
const route = useRoute()

onMounted(() => {
    reload()
})

const reload = () => {
    setInterval(() => {
        reload_component.value ++;
    }, 300000)
}
</script>