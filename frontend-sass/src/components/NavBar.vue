<template>
    <nav>
        <router-link to="/"><div>
            <img src="../assets/Logo.png" alt="logo">
            <h1>TEMPEST</h1>
        </div></router-link>
        <div>
              <router-link v-if="useRoute().name === 'Login'" to="/signup">Sign Up</router-link>
              <button v-else-if="LoginStore().connect" @click="disconnect">Log Out</button>
              <router-link v-else to="/login">Login</router-link>
        </div>
    </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { LoginStore } from '../store/store'

const disconnect = () => {
    LoginStore().setConnect(false)
    location.reload()
}

</script>