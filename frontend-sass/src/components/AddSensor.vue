<template>
    <div id="add-sensor">
      <button type="button" v-on:click="toggleModal">
        <Icon icon="bi:plus"/>
      </button>

      <!-- Modal -->
      <div v-if="showModal">
        <div>
          <!--content-->
          <div>
            <!--header-->
            <div>
              <h3>Add New Sensor</h3>
              <button v-on:click="toggleModal"><button type="button">X</button></button>
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
      <div v-if="showModal"></div>
    </div>
  </template>
  
  <script setup>
import axios from 'axios'
import { ref } from 'vue'
import { Icon } from '@iconify/vue';

  let showModal = ref(false);
  const emplacement = ref('')
  const id = ref()
  const error_msg = ref('')

  const toggleModal = () => {
    showModal.value = !showModal.value;
  }
  const handleSubmit = async () => {
    if(emplacement.value === '' || id.value === '') {
      error_msg.value = 'Please fill all the fields'
      return
    }
    if(isNaN(id.value)) {
      error_msg.value = 'Please put number in the field'
      return
    }
    axios.post('http://localhost:5000/createSensor',{
          Sensor_name: emplacement.value,
          ID: id.value,
        }).then(() => {
          location.reload()
        })
        .catch(res => {
          error_msg.value = res.message
        })
  }
  </script>