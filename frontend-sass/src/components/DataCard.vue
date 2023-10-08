<template>
    <div id="data-card">
        <div>{{ props.name }}</div>
        <div v-if="!HaveData">
            <div>
                <div>Any Data..</div>
            </div>
        </div>
        <div v-else>
            <div>
                <div id="temp" :class="{ 'isHot': hot, 'isGood': normal, 'isCold': cold }">
                    {{ LastReports.temperature }}°C</div>
                <div id="hum" :class="{ 'isDry': dry, 'isSoft': soft, 'isHum': hum }">
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
let dry = ref(false)
let soft = ref(true)

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

        if (LastReports.value.humidity >= 40 && LastReports.value.humidity <= 70) { soft.value = true; dry.value = false; hum.value = false }
        if (LastReports.value.humidity < 40) { soft.value = false; dry.value = true; hum.value = false }
        if (LastReports.value.humidity > 70) { soft.value = false; dry.value = false; hum.value = true }
    }
})
</script>