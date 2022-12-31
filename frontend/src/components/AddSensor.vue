<template>
    <div>
      <button class="absolute bottom-5 right-5 bg-ctp-lavender text-white font-bold uppercase text-sm px-3 py-3 rounded-full border border-ctp-overlay2 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" v-on:click="toggleModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          <!--content-->
          <div class="border rounded-lg shadow-lg relative flex flex-col w-full bg-ctp-base outline-none focus:outline-none border-white">
            <!--header-->
            <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 class="text-xl font-semibold text-ctp-green pt-3">
                Add New Sensor
              </h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal">
                <button class="text-ctp-sky bg-transparent font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                X
              </button>
              </button>
            </div>
            <!--body-->
            <form method="POST" @submit.prevent="handleSubmit()">
              <div v-if="error_msg" class="text-ctp-red pl-3 pt-5">
                {{ error_msg }}
              </div>
            <div class="relative pt-3 pb-6 px-6 flex-auto">
              <div class="my-4">
                <label for="emplacement">Emplacement : </label>
                <select name="emplacement" v-model="emplacement" id="emplacement" class="text-ctp-overlay2 mr-4">
                  <option value="Salon">Salon</option>
                  <option value="Cuisine">Cuisine</option>
                  <option value="Chambre 1">Chambre 1</option>
                  <option value="Chambre 2">Chambre 2</option>
                  <option value="Chambre 3">Chambre 3</option>
                  <option value="Garage">Garage</option>
                  <option value="Exterieur">Exterieur</option>
                </select>
                <label for="id">ID : </label>
                <input type="number" name="id" v-model="id" class="w-14" placeholder="ID">
              </div>
              <div>
                <label for="coordonnee" >coordonnée : </label>
                <input type="number" v-model="Longitude" placeholder="Longitude" name="" id="" class="mr-4">
                <input type="number" v-model="Latitude" placeholder="Latitude" name="" id="">
              </div>
            </div>
            <!--footer-->
            <div class="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button class="text-ctp-sapphire border border-ctp-sapphire rounded-md hover:bg-ctp-sapphire hover:text-ctp-peach background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">
                add Sensor
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  </template>
  
  <script setup>
import axios from 'axios'
import { ref } from 'vue'

  let showModal = ref(false);
  const emplacement = ref('')
  const id = ref('')
  const Longitude = ref('')
  const Latitude = ref('')
  const error_msg = ref('')

  const toggleModal = () => {
    showModal.value = !showModal.value;
  }
  const handleSubmit = () => {
    axios.post('http://127.0.0.1:5000/createSensor',{
          name: emplacement.value,
          id: id.value,
          longitude: Longitude.value,
          latitude: Latitude.value
        }).then(() => {
          showModal.value = !showModal.value;
        })
        .catch(res => {
          error_msg.value = res.response.data.msg
        })
  }
  </script>