<template>
    <NavBar />
    <div id="screen" class="w-full grid place-items-center">
    <div class="flex-col flex ml-auto mr-auto items-center w-full lg:w-1/3 md:w-3/5 p-5 bg-ctp-surface1 border rounded-xl border-white bg-">
      <form method="POST"  class="mt-2 flex flex-col w-full" @submit.prevent="handleSubmit">
        <div v-if="error_msg" class="text-ctp-red">
          {{ error_msg }}
        </div>
        <div class="flex justify-end h-10">
          <div class="scale-[0.25] translate-x-32 -translate-y-20">
          <img src="../assets/Logo.png" alt="logo" class=" -translate-y-20 translate-x-20 scale-150 rotate-[28deg]">
          </div>
        </div>
        <InputComponent placeholder="Username" iconName="ph:user-circle-bold" model="name" type="text" color="text-ctp-green"/>
        <InputComponent placeholder="Email" iconName="mdi:at" model="name" type="email" color="text-ctp-green"/>
        <InputComponent placeholder="Password" iconName="bxs:lock-alt" model="password" type="password" color="text-ctp-maroon" />
        <InputComponent placeholder="Confirm Password" iconName="bxs:lock-alt" model="confirm_password" type="password" color="text-ctp-maroon"/>
        <button class="bg-ctp-overlay2 py-2 text-center md:py-2 text-white leading-tight text-xl md:text-base mx-auto mt-20 mb-4 w-1/2 border rounded-xl">Sign Up</button>
      </form>
    </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { LoginStore } from '../store/store'
  import NavBar from '../components/NavBar.vue';
  import InputComponent from '../components/under-components/InputComponent.vue';

  const name = ref('')
  const email = ref('')
  let error_msg = ref('')
  const password = ref('')
  const store = LoginStore()
  const router = useRouter()
  const confirm_password = ref('')

  
  const handleSubmit = () => {
      axios.post('http://192.168.1.28:5000/signup',{
      name: name.value,
      email: email.value,
      password: password.value,
      confirm_password: confirm_password.value
    }).then(() => {
      store.setConnect(true)
      router.push({
        name: Reports
      })
    }).catch(res => {
      error_msg.value = res.response.data.msg
    })
  }
  </script>
  
  <style>
  #screen {
    --screenSize: calc(100vh - var(--navHeight) );
    height: var(--screenSize);
  }
  
  </style>