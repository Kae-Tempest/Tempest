<template>
    <button class="bg-ctp-surface0 hover:bg-ctp-surface1 text-ctp-blue py-2 px-4 my-5 rounded border border-white mx-10" @click="ShowData()">Last 24h report</button>
    <!-- Extra Large Modal -->
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex bg-ctp-crust/75">
    <div class="relative w-full h-screen max-w-7xl">
        <!-- Modal content -->
        <div class="relative rounded-lg shadow-lg bg-ctp-base border border-ctp-peach">
            <!-- Modal header -->
            <div class="flex items-center p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl text-ctp-text ml-[40%]"> Last 24h Reports</h3>
                <button @click="ShowData()" type="button" class="text-red-400 bg-transparent ml-auto text-sm p-1.5 inline-flex items-center">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div id="screen" class="relative overflow-y-auto shadow-md">
                <table class="w-full text-sm text-center text-gray-400">
                    <thead class="uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" class="text-ctp-text px-6 py-3">Temperature</th>
                            <th scope="col" class="text-ctp-text px-6 py-3">Humidity</th>
                            <th scope="col" class="text-ctp-text px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in LastReports" :key="item.ID" class="border-b border-gray-700">
                            <td class="text-ctp-text px-6 py-4">{{ item.Temperature }}°C</td>
                            <td class="text-ctp-text px-6 py-4">{{ item.Humidity }}%</td>
                            <td class="text-ctp-text px-6 py-4">{{ item.MesuredAt }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps({
    id: String
})

let showModal = ref(false)
let LastReports = ref(Object)

const ShowData = async function () {
    const {data : LastDayReports} = await axios.get(`http://localhost:5000/dayreport/${props.id}`)
    console.log(LastDayReports)
    LastReports = LastDayReports
    showModal.value = !showModal.value
}
</script>

<style>
#screen {
  --screenSize: calc(100vh - var(--navHeight) );
  height: var(--screenSize);
  scrollbar-width: none;
}
#screen::-webkit-scrollbar {
  width: 0;
}
</style>