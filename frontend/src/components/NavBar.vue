<template>
    <nav class="w-auto bg-ctp-crust flex justify-between items-center pl-4 pr-32">
        <router-link to="/"><div class="flex gap-4">
            <img src="../assets/Logo.png" alt="logo" class="h-[71px]">
            <h1 class="text-ctp-text text-xxl">Métépaslà</h1>
        </div></router-link>
        <div>
            <div class="text-ctp-subtext0 ab">
                <div v-if="route === 'Login'">
                    <router-link to="/signup">Sign Up</router-link>
                </div>
                <div v-else-if="connect"></div>
                <div v-else>
                    <router-link to="/login">Login</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { LoginStore } from '../store/store' 

const LoginValue = LoginStore()

const route = useRoute().name
const connect = LoginValue.connect

</script>

<style>
:root {
  --navHeight: 100px;
}
nav {
  height: var(--navHeight);
}
</style>