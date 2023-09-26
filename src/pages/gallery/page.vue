<template>
    <v-container fluid class="mx-8" :style="{height:`${contentWindowHeight}px !important`}">
        <v-row class="d-flex h-100 align-start">
            <v-col cols="auto" class="d-flex flex-column">
                <p class="text-h3">Gallery</p>
                <v-fade-transition>
                    <v-btn v-if="!onGalleryHomeRoute" :to="{name: GALLERY.MAIN}">
                        Back
                    </v-btn>
                </v-fade-transition>
            </v-col>
            <v-fade-transition mode="out-in">
                <v-col v-if="onGalleryHomeRoute" class="ms-auto mt-auto gallery-select gap-3">
                    <v-btn v-for="video in videos" :to="{name:video.folder}" color="#FFFFF" :height="btnHeight" class="video-card" variant="outlined">
                        <div class="d-flex flex-column">
                            <p>{{video.label}}</p>
                            <v-img :src="getThumbnailPngSrc(video.folder)" :width="imgWidth" aspect-ratio="16/9" class="rounded" />
                        </div>
                    </v-btn>
                </v-col>
                <v-col v-else-if="selectedVideo" cols="8" class="ms-auto d-flex" :style="{height: `${contentWindowHeight}px !important`}">
                    <video-player :video="selectedVideo.folder" :width="videoWidth" :height="videoHeight" :next-route-name="selectedVideo.next" />
                </v-col>
            </v-fade-transition>
        </v-row>
    </v-container>
</template>

<style lang="scss">
.video-card {
	background: rgba(0, 33, 61, 0.8) !important;
}

.gallery-select {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    align-items: center;
    justify-content: flex-end;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
}
</style>

<script setup lang="ts">
import { appBarHeightInjectKey, contentWindowHeightInjectKey } from '@/keys';
import { GALLERY } from '@/route/names';
import { getThumbnailPngSrc } from '@/utils';
import type { ComputedRef } from 'vue';
import { inject } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import videos from '@/pages/gallery/videos';
import { VideoPlayer } from './components';
import { watch } from 'vue';

const route = useRoute();

const imgWidth = ref(240);

const btnHeight = ref(200);

const contentWindowHeight = inject(contentWindowHeightInjectKey) as ComputedRef<number>

const videoHeight = computed(() => contentWindowHeight.value - 60)

const videoWidth = computed(() => getWidthForHeight(videoHeight.value))

const getWidthForHeight = (height: number) => {
    return height * (16 / 9)
}

const onGalleryHomeRoute = computed(() => {
    return route.name === GALLERY.MAIN;
})

const selectedVideo = ref<typeof videos[0] | null>(null)

watch(() => route.name, (newVal) => {
    let longVideo = videos.find((video) => video.folder === newVal)
    if (longVideo) {
        selectedVideo.value = longVideo
    } else {
        selectedVideo.value = null
    }
}, {immediate: true})
</script>
