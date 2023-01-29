<template>
    <div class="bg-ctp-surface1 h-64 w-[504px] rounded-3xl border border-white">
        <div class="pt-3 text-center">
            <div class="col-span-2 text-5xl pb-10">{{ props.name }}</div>
            <DataCard :name="props.name" :id="props.id" :key="props.id"/>
            <div v-if="route === `SensorDetails` && connect" class="flex justify-end" @click="ShowModal()">
                <button class="w-10 h-10 mt-12">
                  <Icon icon="mdi:dots-vertical" class="text-[40px]"/>
                </button>
            </div>
      <!-- Modal -->
      <div v-if="Modal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-1/2 my-6 max-w-5xl">
          <!--content-->
          <div class="border rounded-lg shadow-lg relative flex flex-col w-full bg-ctp-base outline-none focus:outline-none border-ctp-peach">
            <!--header-->
            <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 class="text-xl font-semibold text-ctp-text pt-3">Update Sensor</h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="ShowModal()">
                <button class="text-ctp-sky bg-transparent font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                X
              </button>
              </button>
            </div>
            <!--body-->
            <form method="PUT" @submit.prevent="handleSubmit()">
              <div v-if="error_msg" class="text-ctp-red pl-3 pt-5 flex justify-center">
                {{ error_msg }}
              </div>
            <div class="relative pt-3 pb-6 px-6 flex-auto">
                <div>
                  <label for="emplacement" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emplacement</label>
                  <select v-model="NewEmplacement" id="emplacement" class=" border text-sm rounded-lg block w-full p-2.5 bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white">
                    <option value="Salon">Salon</option>
                    <option value="Cuisine">Cuisine</option>
                    <option value="Chambre 1">Chambre 1</option>
                    <option value="Chambre 2">Chambre 2</option>
                    <option value="Chambre 3">Chambre 3</option>
                    <option value="Garage">Garage</option>
                    <option value="Exterieur">Exterieur</option>
                  </select>
                </div>

                <hr class="border-ctp-overlay2 my-4">
                <div class="grid gap-6 mb-6 grid-cols-2">
                  <div>
                    <label for="Longitude" class="block mb-2 dark:text-white">Longitude</label>
                    <input v-model="NewLongitude" type="text" class="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white">
                </div>
                <div>
                    <label for="Latitude" class="block mb-2 dark:text-white">Latitude</label>
                    <input v-model="NewLatitude" type="text" class="block w-full p-2 border rounded-lg sm:text-xs bg-ctp-surface0 dark:border-ctp-surface2 placeholder-ctp-surface2 text-white">
                </div>
                </div>
            </div>
            <!--footer-->
            <div class="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button class="text-ctp-sapphire border border-ctp-sapphire rounded-md hover:bg-ctp-sapphire hover:text-ctp-maroon background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">
                Update Sensor
              </button>
              <button class="text-ctp-maroon border border-ctp-maroon rounded-md hover:bg-ctp-maroon hover:text-ctp-sky background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" v-on:click="handleDelete()">
                Delete Sensor
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
      <div v-if="Modal" class="fixed inset-0 z-40 bg-ctp-crust/50"></div>
        </div>

    </div>
</template>

<script setup>
import axios from 'axios'
import { Icon } from '@iconify/vue'
import { ref, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LoginStore } from '../store/store'

const DataCard = defineAsyncComponent(() => import('../components/DataCard.vue'))

  let Modal = ref(false)
  let error_msg = ref('')
  const route = useRoute().name
  const NewEmplacement = ref('')
  const NewLatitude = ref('')
  const NewLongitude = ref('')
  const Store = LoginStore()
  const connect = Store.connect
  const router = useRouter()
  const props = defineProps({
      id: Number,
      name: String
  })

  const handleSubmit = async () => {
      if(NewEmplacement === '') {
          error_msg.value = "Please choose a correct placement"
          return
      } else if (isNaN(NewLongitude) || isNaN(NewLatitude) || NewLongitude === '' || NewLatitude === '') {
          error_msg = "Please put number in the fields"
          return
      }

      axios.put(`http://localhost:5000/updateSensor/${props.id}`,{
              name: NewEmplacement,
              longitude: NewLongitude,
              latitude: NewLatitude
      }).then(() => {
          Modal.value = !Modal.value
      })
      .catch((error) => {
          error_msg = error.response.data.msg
      })
  }
  const handleDelete = async () => {
      axios.delete(`http://localhost:5000/deleteSensor/${props.id}`)
      .then(() => {
        router.push({
          name: 'Reports'
        })
      })
      .catch((error) => {
          error_msg = error.response.data.msg
      })
  }

  const ShowModal = () => {
      Modal.value = !Modal.value
  }
</script>


<style lang="postcss">
    .isGreen {@apply text-ctp-green}
</style>