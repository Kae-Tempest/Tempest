<template>
    <div>
        <NavBar />
        <h1>Reports</h1>
        <div class="pl-10">
            <SensorCard />
        </div>
    </div>
</template>

<script lang="js">
import NavBar from '../components/NavBar.vue';
import SensorCard from '../components/Report.vue'

export default {
    components: {
        NavBar,
        SensorCard
    }
}
</script>

<style>
    
</style>