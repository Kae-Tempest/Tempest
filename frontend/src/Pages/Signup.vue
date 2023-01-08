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
  
        <div class="flex flex-wrap items-stretch w-full relative h-15 bg-white rounded mb-4">
          <div class="flex -mr-px justify-center w-15 p-4">
                <span class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
          </div>
          <input v-model="name" type="text" min="3" class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative text-xl outline-none text-ctp-maroon" placeholder="Username" />
        </div>

        <div class="flex flex-wrap items-stretch w-full relative h-15 bg-white rounded mb-4">
          <div class="flex -mr-px justify-center w-15 p-4">
                <span class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>
                </span>
          </div>
          <input v-model="email" type="email" class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative text-xl outline-none text-ctp-maroon" placeholder="Email" />
        </div>


        <div class="flex flex-wrap items-stretch w-full relative h-15 bg-white rounded mb-4">
          <div class="flex -mr-px justify-center w-15 p-4">
            <span class="flex items-center leading-normal bg-white rounded rounded-r-none text-xl px-3 whitespace-no-wrap text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
          </div>
          <input v-model="password" type="password" class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-10 px-3 relative self-center text-xl outline-none text-ctp-green" min="4" placeholder="Password" />
        </div>

        <div class="flex flex-wrap items-stretch w-full relative h-15 bg-white rounded mb-4">
          <div class="flex -mr-px justify-center w-15 p-4">
            <span class="flex items-center leading-normal bg-white rounded rounded-r-none text-xl px-3 whitespace-no-wrap text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
          </div>
          <input v-model="confirm_password" type="password" class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-10 px-3 relative self-center text-xl outline-none text-ctp-green" placeholder="Confirm Password" />
        </div>

              <button class="bg-ctp-overlay2 py-2 text-center md:py-2 text-white leading-tight text-xl md:text-base mx-auto mt-20 mb-4 w-1/2 border rounded-xl">Sign Up</button>
      </form>
    </div>
    </div>
  </template>
  
  <script setup>
  import NavBar from '../components/NavBar.vue';
  import axios from 'axios'
  import { ref } from 'vue'
  import { LoginStore } from '../store/store'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirm_password = ref('')
  let error_msg = ref('')
  const store = LoginStore()
  
  
  const handleSubmit = () => {
      axios.post('http://1127.0.0.1:5000/signup',{
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