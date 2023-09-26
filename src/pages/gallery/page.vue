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
                    <v-btn :to="{ name: GALLERY.LAKE }" color="#FFFFF" :height="btnHeight" class="video-card" variant="outlined">
                        <div class="d-flex flex-column">
                            <p>Lake</p>
                            <v-img :src="getThumbnailPngSrc('lake_1')" :width="imgWidth" aspect-ratio="16/9" class="rounded" />
                        </div>
                    </v-btn>
                    <v-btn :to="{ name: GALLERY.GOLF_CART_TOUR }" color="#FFFFF" :height="btnHeight" class="video-card" variant="outlined">
                        <div class="d-flex flex-column">
                            <p>Golf Cart Tour</p>
                            <v-img :src="getThumbnailPngSrc('golf_cart_1')" :width="imgWidth" aspect-ratio="16/9" class="rounded" />
                        </div>
                    </v-btn>
                    <v-btn :to="{ name: GALLERY.GOLF_COURSE }" color="#FFFFF" :height="btnHeight" class="video-card" variant="outlined">
                        <div class="d-flex flex-column">
                            <p>Golf Course</p>
                            <v-img :src="getThumbnailPngSrc('golf_course_1')" :width="imgWidth" aspect-ratio="16/9" class="rounded" />
                        </div>
                    </v-btn>
                    <v-btn :to="{ name: GALLERY.PROVING_GROUNDS }" color="#FFFFF" :height="btnHeight" class="video-card"  variant="outlined">
                        <div class="d-flex flex-column">
                            <p>Proving Grounds</p>
                            <v-img :src="getThumbnailPngSrc('proving_grounds_1')" :width="imgWidth" aspect-ratio="16/9" class="rounded" />
                        </div>
                    </v-btn>
                    <v-btn :to="{ name: GALLERY.STATE_PARK }" color="#FFFFF" :height="btnHeight" class="video-card"  variant="outlined">
                        <div class="d-flex flex-column">
                            <p>State Park</p>
                            <v-img :src="getThumbnailPngSrc('state_park_1')" :width="imgWidth" aspect-ratio="16/9" class="rounded" />
                        </div>
                    </v-btn>
                </v-col>
                <v-col v-else cols="8" class="ms-auto d-flex" :style="{height: `${contentWindowHeight}px !important`}">
                    <router-view   />
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
import type { Ref } from 'vue';
import type { ComputedRef } from 'vue';
import { inject } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const imgWidth = ref(240);

const btnHeight = ref(200);

const contentWindowHeight = inject(contentWindowHeightInjectKey) as ComputedRef<number>

const onGalleryHomeRoute = computed(() => {
    return route.name === GALLERY.MAIN;
})
</script>
