<template>

</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    videos: {
        type: Array<{
            src: string,
            thumbnail: string,
        }>,
        required: true
    }
})
</script>