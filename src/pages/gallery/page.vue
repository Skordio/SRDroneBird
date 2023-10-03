<template>
    <v-container fluid class="mx-8" :style="{ height: `${contentWindowHeight}px !important` }">
        <v-row class="d-flex h-100 align-start">
            <v-col class="d-flex flex-column" cols="auto">
                <p class="text-h3">Gallery</p>
                <v-fade-transition>
                    <div v-if="selectedVideo" class="d-flex flex-column gap-3">
                        <v-btn :to="{ name: GALLERY.MAIN }" exact>
                            Back
                        </v-btn>
                        <v-btn @click="goToNext">
                            Next
                        </v-btn>
                        <v-fade-transition>
                            <v-btn v-if="selectedVideo && selectedShort" :to="{ name: selectedVideo.folder }" exact>
                                {{ `Back to ${selectedVideo.label}` }}
                            </v-btn>
                        </v-fade-transition>
                        <v-select label="Quality" :items="['480p', '720p', '1080p']" v-model="quality">

                        </v-select>
                        <v-checkbox v-model="autoPlay" label="Auto Play" />
                        <short-collection v-if="selectedVideo.shorts" :title-text="shortsTitle" :btn-height="btnHeight" :img-width="imgWidth"
                            :shorts="selectedVideo.shorts"></short-collection>
                    </div>
                </v-fade-transition>
            </v-col>
            <v-fade-transition mode="out-in">
                <v-col v-if="onGalleryHomeRoute" class="ms-auto mt-auto gallery-select gap-3">
                    <v-btn v-for="video in videos" :to="{ name: video.folder }" color="#FFFFF" :height="btnHeight"
                        class="video-card" variant="outlined">
                        <div class="d-flex flex-column">
                            <p>{{ video.label }}</p>
                            <v-img :src="getThumbnailPngSrc(video.folder)" :width="imgWidth" aspect-ratio="16/9"
                                class="rounded" />
                        </div>
                    </v-btn>
                </v-col>
                <v-col v-else-if="selectedVideo && !selectedShort" cols="8" class="d-flex overflow-hidden ms-auto"
                    :style="{ height: `${contentWindowHeight}px !important` }">
                    <video-player :video="selectedVideo.folder" :width="videoWidth" :height="videoHeight"
                        :auto-play="autoPlay" :next-route-name="selectedVideo.next" :quality="quality" />
                </v-col>
                <v-col v-else-if="selectedShort" cols="8" class="d-flex overflow-hidden ms-auto"
                    :style="{ height: `${contentWindowHeight}px !important` }">
                    <video-player short :video="selectedShort.folder" :width="videoWidth" :height="videoHeight"
                        :auto-play="autoPlay" :next-route-name="selectedShort.next" :quality="quality"  />
                </v-col>
            </v-fade-transition>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
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

.v-btn--active {
    background-color: #2196f3 !important;
    color: white !important;
}
</style>

<script setup lang="ts">
import { contentWindowHeightInjectKey } from '@/keys';
import { GALLERY } from '@/route/names';
import { getThumbnailPngSrc } from '@/utils';
import type { ComputedRef } from 'vue';
import { inject } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';
import type { Quality } from "@/utils/getSrc"
import { routerKey, useRoute, useRouter } from 'vue-router';
import videos from '@/pages/gallery/videos';
import { VideoPlayer, ShortCollection } from './components';
import { watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const route = useRoute();

const router = useRouter();

const imgWidth = ref(240);

const btnHeight = ref(200);

const autoPlay = ref(true)

const quality = useLocalStorage<Quality>('quality', '1080p')

const contentWindowHeight = inject(contentWindowHeightInjectKey) as ComputedRef<number>

const videoHeight = computed(() => contentWindowHeight.value - 60)

const videoWidth = computed(() => getWidthForHeight(videoHeight.value))

const getWidthForHeight = (height: number) => {
    return height * (16 / 9)
}

const onGalleryHomeRoute = computed(() => {
    return route.name === GALLERY.MAIN;
})

const goToNext = () => {
    let next = selectedVideo.value?.next
    router.push({name:GALLERY.MAIN}).then(() => {
        setTimeout(() => {
            router.push({ name: next })
        }, 100);
    })
}

const shortsTitle = ref("Shorts")

const selectedVideo = ref<typeof videos[0] | null>(null)

const selectedShort = ref<{ folder: string, label: string, next?: string } | undefined>(undefined)

watch(() => route.name, (newVal) => {
    let longVideo = videos.find((video) => video.folder === newVal);
    let shortVideo;
    videos.forEach(((video) => {
        let foundVid = video.shorts?.find((short) => newVal === short.folder)
        if (foundVid) {
            shortVideo = foundVid
        }
    }));
    if (longVideo && !shortVideo) {
        selectedVideo.value = longVideo
        selectedShort.value = undefined
    } else if (shortVideo) {
        selectedShort.value = shortVideo
        selectedVideo.value = videos.find((video) => video.shorts?.find((short) => newVal === short.folder)) ?? null
    } else {
        selectedVideo.value = null
        selectedShort.value = undefined
    }
    if(newVal === 'high_flying_bird'){
        shortsTitle.value = "Alternate Music"
    } else {
        shortsTitle.value = "Shorts"
    }
}, { immediate: true })
</script>
