<template>
        <div id="input-component">
          <div>
            <span><Icon :icon="iconName"/></span>
          </div>
          <input :type="props.type" :placeholder="props.placeholder" @input="$emit('update:modelValue', $event.target.value)" min="3"/>
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
