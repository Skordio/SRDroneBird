<template>
    <video :id="videoID" ref="videoRef" class="video-js rounded-xl flex-grow-0" :width="width" :height="height" controls
        data-setup='{"controls": true, "autoplay": false, "preload": "auto"}'>
        <source :src="getMP4SrcNew(video)">
    </video>
</template>
  
<script setup lang="ts">
import { appBarHeightInjectKey, contentWindowHeightInjectKey } from "@/keys";
import { GALLERY } from "@/route/names";
import { getMP4Src, getMP4SrcNew } from "@/utils"
import videojs from "video.js"
import type Player from "video.js/dist/types/player";
import type { Ref } from "vue";
import type { ComputedRef } from "vue";
import { onBeforeUnmount } from "vue";
import { nextTick } from "vue";
import { unref } from "vue";
import { inject } from "vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";

const router = useRouter()

const props = defineProps({
    video: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    autoStart: {
        type: Boolean,
        default: true
    },
    nextRouteName: {
        type: String,
        default: ""
    }
})

const videoRef = ref<HTMLElement>()

const videoID = computed(() => `video-player-${props.video}`)

const player: Ref<Player | undefined> = ref()

onMounted(() => {
    setTimeout(() => {
        player.value = videojs(videoID.value)

        setTimeout(() => {
            player.value?.on('ended', function () {
                if (props.nextRouteName) {
                    let nextRouteName = unref(props.nextRouteName)
                    setTimeout(() => {
                        if (player.value && !player.value.isDisposed_) {
                            player.value.dispose()
                        }
                        videoRef.value?.remove()
                        router.push({name: GALLERY.MAIN}).then(() => {
                            setTimeout(() => {
                                router.push({name: nextRouteName})
                            }, 100)
                        })
                    }, 100)
                }
            });

            if (!player.value) return
            player.value.focus()

            if(!props.autoStart) return
            player.value.play()
        }, 100)
    }, 100);
})

onBeforeUnmount(() => {
    if (player.value && !player.value.isDisposed_) {
        player.value.dispose()
    }
    videoRef.value?.remove()
})
</script>