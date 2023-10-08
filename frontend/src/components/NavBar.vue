<template>
    <nav class="w-auto bg-ctp-crust flex justify-between items-center pl-4 pr-12">
        <router-link to="/"><div class="flex gap-4">
            <img src="../assets/Logo.png" alt="logo" class="h-28">
            <h1 class="text-ctp-text text-4xl self-center">TEMPEST</h1>
        </div></router-link>
        <div>
            <div class="text-ctp-subtext0 ab">
                <div v-if="route.name === 'Login'">
                    <router-link to="/signup">Sign Up</router-link>
                </div>
                <div v-else-if="connect" >
                    <button @click="disconnect">
                        Log Out
                    </button>
                </div>
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


const store = LoginStore()

const route = useRoute()
const connect = store.connect

const disconnect = () => {
    store.setConnect(false)
    location.reload()
}

</script>

<style>
:root {
  --navHeight: 100px;
}
nav {
  height: var(--navHeight);
}
</style>