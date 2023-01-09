<template>
    <div>
      <button class="absolute bottom-5 right-5 bg-ctp-lavender text-white font-bold uppercase text-sm px-3 py-3 rounded-full border border-ctp-overlay2 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" v-on:click="toggleModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      <!-- Modal -->
      <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-1/2 my-6 max-w-5xl">
          <!--content-->
          <div class="border rounded-lg shadow-lg relative flex flex-col w-full bg-ctp-base outline-none focus:outline-none border-ctp-peach">
            <!--header-->
            <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 class="text-xl font-semibold text-ctp-text pt-3">Add New Sensor</h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal">
                <button class="text-ctp-sky bg-transparent font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                X
              </button>
              </button>
            </div>
            <!--body-->
            <form method="POST" @submit.prevent="handleSubmit()">
              <div v-if="error_msg" class="text-ctp-red pl-3 pt-5 flex justify-center">
                {{ error_msg }}
              </div>
            <div class="relative pt-3 pb-6 px-6 flex-auto">
              <div class="grid gap-6 mb-6 grid-cols-2">
                <div>
                  <label for="emplacement" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emplacement</label>
                  <select v-model="emplacement" id="emplacement" class=" border text-sm rounded-lg block w-full p-2.5 bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white">
                    <option value="Salon">Salon</option>
                    <option value="Cuisine">Cuisine</option>
                    <option value="Chambre 1">Chambre 1</option>
                    <option value="Chambre 2">Chambre 2</option>
                    <option value="Chambre 3">Chambre 3</option>
                    <option value="Garage">Garage</option>
                    <option value="Exterieur">Exterieur</option>
                  </select>
                </div>
                <div>
                  <label for="id" class="block mb-2 dark:text-white">ID</label>
                  <input v-model="id" type="text" class="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white">
                </div>
              </div>
                <hr class="border-ctp-overlay2 my-4">
                <div class="grid gap-6 mb-6 grid-cols-2">
                  <div>
                    <label for="Longitude" class="block mb-2 dark:text-white">Longitude</label>
                    <input v-model="Longitude" type="text" class="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white">
                </div>
                <div>
                    <label for="Latitude" class="block mb-2 dark:text-white">Latitude</label>
                    <input v-model="Latitude" type="text" class="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white">
                </div>
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
      <div v-if="showModal" class="fixed inset-0 z-40 bg-ctp-crust/50"></div>
    </div>
  </template>
  
  <script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

  let showModal = ref(false);
  const emplacement = ref('')
  const id = ref('')
  const Longitude = ref('')
  const Latitude = ref('')
  const error_msg = ref('')
  const router = useRouter()

  const toggleModal = () => {
    showModal.value = !showModal.value;
  }
  const handleSubmit = () => {
    if(emplacement.value == '' || id.value == '' || Longitude.value == '' || Latitude.value == '') {
      error_msg.value = 'Please fill all the fields'
      return
    }
    if(id.value != Number || emplacement.value != Number || Longitude.value != Number || Latitude.value != Number) {
      error_msg.value = 'Please put number in the fields'
      return
    }
    axios.post('http://127.0.0.1:5000/createSensor',{
          name: emplacement.value,
          id: id.value,
          longitude: Longitude.value,
          latitude: Latitude.value
        }).then(() => {
          // a tester
          router.push('/')
        })
        .catch(res => {
          error_msg.value = res.response.data.msg
        })
  }
  </script>