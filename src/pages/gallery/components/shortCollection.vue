<template>
    <p class="text-h5">Shorts</p>
    <div class="d-flex flex-column">
        <v-btn v-for="short in shorts" :to="{name:short.folder}" color="#FFFFF" :height="btnHeight" class="video-card" variant="outlined">
            <div class="d-flex flex-column">
                <p>{{short.label}}</p>
                <v-img :src="getThumbnailPngSrc(short.folder)" :width="imgWidth" aspect-ratio="16/9" class="rounded" />
            </div>
        </v-btn>
    </div>
</template>

<style lang="scss">
.video-card {
	background: rgba(0, 33, 61, 0.8) !important;
}
</style>

<script setup lang="ts">
import { getThumbnailPngSrc } from '@/utils';
import type { PropType } from 'vue';


interface Short {
    folder: string,
    label: string
}

const props = defineProps({
    shorts: {
        type: Array as PropType<Short[]>,
        required: true
    },
    imgWidth: {
        type: Number,
        required: true
    },
    btnHeight: {
        type: Number,
        required: true
    }
})
</script>