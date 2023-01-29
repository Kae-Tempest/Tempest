<template>
    <div>
        <div v-if="HaveData === false">
            <div class="flex items-center px-10 pt-4 h-20">
                <div class="text-5xl w-full h-full text-ctp-crust/50 ">Waiting Data..</div>
            </div>
        </div>
        <div v-else-if="router.value === `SensorDetails`">
                <div class="flex justify-between px-10 pt-4  h-20">
                    <div id="temp" class="text-5xl">{{LastReports.temperature}}°C</div>
                    <hr class="border-l border-l-white h-32">
                    <div id="hum" class="text-5xl">{{Math.trunc(LastReports.humidity * 10000) / 10000}}%</div>
                </div>
                <div class="flex justify-between pt-10 pl-[4.7rem] pr-20">
                        <div class="text-xl">Temp.</div>
                        <div class="text-xl">Hum.</div>
                    </div>
            </div>
            <div v-else>
                <div class="flex justify-between px-10 h-20">
                <div id="temp" class="text-5xl">{{LastReports.temperature}}°C</div>
                <hr class="border-l border-l-white h-32">
                <div id="hum" class="text-5xl">{{Math.trunc(LastReports.humidity * 10000) / 10000}}%</div>
                </div>
                <div class="flex justify-between pl-[4.7rem] pr-20">
                    <div class="text-xl">Temp.</div>
                    <div class="text-xl">Hum.</div>
                </div>
            </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const HaveData = ref(true)
const LastReports = ref(Object)
const router = useRoute().name

const props = defineProps({
    id: Number,
    name: String
})

  onMounted(async () => {
            const { data: reports } = await axios.get(`http://localhost:5000/lastreport/${props.id}`)
            if(reports.rows.length <= 0) HaveData.value = false
            else {
                const TempColor = document.getElementById('temp')
                const HumColor = document.getElementById('hum')
                LastReports.value = reports.rows[0]
                if(LastReports.value.temperature >= 15 && LastReports.value.temperature <= 26) TempColor.classList.add('text-ctp-green');
                if(LastReports.value.temperature < 15) TempColor.classList.add('text-ctp-sky');
                if(LastReports.value.temperature > 26) TempColor.classList.add('text-ctp-red');
    
                if(LastReports.value.humidity >= 40 && LastReports.value.humidity <= 70) HumColor.classList.add('text-ctp-green');
                if(LastReports.value.humidity < 40) HumColor.classList.add('text-ctp-peach');
                if(LastReports.value.humidity > 70) HumColor.classList.add('text-ctp-red');
            }
        })
</script>