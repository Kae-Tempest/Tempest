<template>
    <div>
        <div class="col-span-2 text-3xl pb-5">{{ props.name }}</div>
        <div v-if="!HaveData">
            <div class="flex items-center px-10 mb-5 h-full">
                <div class="text-3xl w-full h-full text-ctp-crust/50 ">Any Data..</div>
            </div>
        </div>
        <div v-else>
            <div class="flex justify-between px-10 py-3 h-full">
                <div id="temp" class="text-3xl"
                    :class="{ 'text-ctp-red': hot, 'text-ctp-green': normal, 'text-ctp-sky': cold }">
                    {{ LastReports.temperature }}°C</div>
                <div id="hum" class="text-3xl"
                    :class="{ 'text-ctp-red': sec, 'text-ctp-green': warm, 'text-ctp-peach': hum }">
                    {{ Math.trunc(LastReports.humidity * 10000) / 10000 }}%</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const HaveData = ref(true)
const LastReports = ref(Object)
let hot = ref(false)
let normal = ref(true)
let cold = ref(false)
let hum = ref(false)
let sec = ref(false)
let warm = ref(true)

const props = defineProps({
    id: String,
    name: String
})

onMounted(async () => {
    const { data: reports } = await axios.get(`http://192.168.1.28:5000/lastreport/${props.id}`)
    if (reports.rows.length <= 0) HaveData.value = false
    else {
        LastReports.value = reports.rows[0]
        if (LastReports.value.temperature >= 15 && LastReports.value.temperature <= 26) { normal.value = true; hot.value = false; cold.value = false }
        if (LastReports.value.temperature < 15) { normal.value = false; hot.value = false; cold.value = true }
        if (LastReports.value.temperature > 26) { normal.value = false; hot.value = true; cold.value = false }

        if (LastReports.value.humidity >= 40 && LastReports.value.humidity <= 70) { warm.value = true; sec.value = false; hum.value = false }
        if (LastReports.value.humidity < 40) { warm.value = false; sec.value = true; hum.value = false }
        if (LastReports.value.humidity > 70) { warm.value = false; sec.value = false; hum.value = true }
    }
})
</script>