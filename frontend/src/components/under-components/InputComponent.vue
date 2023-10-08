<template>
        <div class="flex flex-wrap items-stretch w-full relative h-15 bg-white rounded mb-4">
          <div class="flex -mr-px justify-center w-15 p-4">
                <span class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600" >
                  <Icon :icon="iconName" class="w-[24px] h-[24px]" />
                </span>
          </div>
          <input :type="props.type" :placeholder="props.placeholder" @input="$emit('update:modelValue', $event.target.value)" :class="props.color"
          min="3" class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative text-xl outline-none"/>
        </div>
</template>


<script setup>
import { Icon } from '@iconify/vue' 
import { ref } from 'vue'


const props = defineProps({
    placeholder: String,
    iconName: String,
    model: String,
    type: String,
    color: String
})

const input = ref('')

</script>
