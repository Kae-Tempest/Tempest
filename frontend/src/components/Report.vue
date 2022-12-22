<template>
    <div class="bg-ctp-surface1 h-64 w-504 rounded-3xl border border-white mr-10 mb-10">
        <div class="pt-3 text-center">
            <div class="col-span-2 text-5xl pb-10">{{ this.name }}</div>
            <div class="flex justify-between pl-16 pr-10">
                <div id="temp" class="text-5xl">{{last_report.temperature}}°C</div>
                <hr class="border-l border-l-white h-28">
                <div id="hum" class="text-5xl">{{Math.trunc(last_report.humidity * 10000) / 10000}}%</div>
            </div>
            <div class="flex justify-between pl-24 pr-28">
                <div class="text-xl">Temp.</div>
                <div class="text-xl">Hum.</div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import axios from 'axios'

export default {
    props: {
        id: Number,
        name: String
    },
    data () {
        return {
            last_report: Object,
        }
    }, 
    async created () {
        const res = await axios.get(`http://192.168.1.1:5000/report/${this.id}`)
        const { data: reports } = await res
        const TempColor = document.getElementById('temp')
        const HumColor = document.getElementById('hum')
        const Last_Report = reports[[reports.length - 1]]
        if(Last_Report.temperature >= 15 && Last_Report.temperature <= 26) TempColor.classList.add('text-ctp-green');
        if(Last_Report.temperature < 15) TempColor.classList.add('text-ctp-sky');
        if(Last_Report.temperature > 26) TempColor.classList.add('text-ctp-red');

        if(Last_Report.humidity >= 40 && Last_Report.humidity <= 70) HumColor.classList.add('text-ctp-green');
        if(Last_Report.humidity < 40) HumColor.classList.add('text-ctp-peacj');
        if(Last_Report.humidity > 70) HumColor.classList.add('text-ctp-red');

        this.last_report = Last_Report
    },
}
</script>
<style lang="postcss"> 
    .isGreen {@apply text-ctp-green}
</style>