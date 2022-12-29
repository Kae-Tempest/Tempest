<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    window.localStorage.setItem('connected', false);
})


</script>

<template>
    <router-view></router-view>
</template>

<style>
</style>
