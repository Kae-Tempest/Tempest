<template>
    <div id="sensor-card">
        <div>
          <DataCard :name="props.name" :id="props.id" :key="props.id"/>
          <div v-if="connect" class="isConnect">
                <button @click="ShowModal()">
                  <Icon icon="mdi:dots-horizontal"/>
                </button>
            </div>
          <!-- Modal -->
          <div id="modal" v-if="Modal">
            <div>
              <!--content-->
              <div>
                <!--header-->
                <div>
                  <h3>Update Sensor</h3>
                  <button v-on:click="ShowModal()">
                    <button type="button">
                    X
                  </button>
                  </button>
                </div>

                <!--body-->
                <form method="PUT">
                  <div v-if="error_msg" :class="{'isError': error_msg}" >
                    {{ error_msg }}
                  </div>
                  <div>
                    <div>
                      <label for="emplacement" >Emplacement</label>
                      <select v-model="NewEmplacement" id="emplacement">
                        <option value="Salon">Salon</option>
                        <option value="Cuisine">Cuisine</option>
                        <option value="Chambre 1">Chambre 1</option>
                        <option value="Chambre 2">Chambre 2</option>
                        <option value="Chambre 3">Chambre 3</option>
                        <option value="Garage">Garage</option>
                        <option value="Exterieur">Exterieur</option>
                      </select>
                    </div>
                  </div>
                  <!--footer-->
                  <div>
                    <button v-on:click="handleSubmit()">
                      Update Sensor
                    </button>
                    <button v-on:click="handleDelete()">
                      Delete Sensor
                    </button>
                  </div>
              </form>
              </div>
            </div>
          </div>
          <div id="bg" v-if="Modal"></div>
      </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { Icon } from '@iconify/vue'
import { ref, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { LoginStore } from '../store/store'

const DataCard = defineAsyncComponent(() => import('../components/DataCard.vue'))

  let Modal = ref(false)
  let error_msg = ref('')
  const NewEmplacement = ref('')
  const Store = LoginStore()
  const connect = Store.connect
  const router = useRouter()
  const props = defineProps({
      id: String,
      name: String
  })

  const handleSubmit = async () => {
      if (NewEmplacement.value === '') {
          error_msg.value = "Please choose a correct placement"
      } else {
          axios.put(`http://localhost:5000/updateSensor/${props.id}`, {
              name: NewEmplacement.value,
          }).then(() => {
              Modal.value = !Modal.value
          }).catch((error) => {
              error_msg = error.response
          })
      }
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
