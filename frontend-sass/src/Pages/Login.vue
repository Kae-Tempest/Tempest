<template>
  <NavBar />
  <div id="login-screen">
    <div>
      <form method="POST" @submit.prevent="handleSubmit">
        <div v-if="error_msg">{{ error_msg }}</div>
        <div><div><img src="../assets/Logo.png" alt="logo"></div></div>
        <InputComponent placeholder="Username" iconName="ph:user-circle-bold" v-model="name" model="name" type="text" />
        <InputComponent placeholder="Password" iconName="bxs:lock-alt" v-model="password" model="password" type="password"/>
        <button>Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { LoginStore } from '../store/store'
import { ref, defineAsyncComponent } from 'vue'

const NavBar = defineAsyncComponent(() => import('../components/NavBar.vue'))
const InputComponent = defineAsyncComponent(() => import('../components/under-components/InputComponent.vue'))

const name = ref('')
const password = ref('')
const router = useRouter()
const store = LoginStore()
let error_msg = ref('')

const handleSubmit = () => {
    axios.post('http://localhost:5000/login',{
    Name: name.value,
    Password: password.value
  }).then(() => {
    store.setConnect(true)
    router.push({
      name: 'Reports'
    })
  })
  .catch(res => {
    error_msg.value = res.response.data.msg
  })
}
</script>

<style>
#screen {
  height: calc(100vh - var(--navHeight));
}

</style>