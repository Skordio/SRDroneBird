<template>
    <div v-if="showVideo" class="rounded-xl flex-shrink-1 w-100 overflow-hidden"
        :style="{ width: width, height: height, maxHeight: `${contentWindowHeight}px !important` }">
        <video id="video" :poster="getThumbnailPngSrc(video)" ref="videoRef" class="video-js rounded-xl flex-grow-0 w-100" :width="width" :height="height"
            :style="{ maxHeight: `${contentWindowHeight}px !important` }" controls :data-setup="dataSetup">
            <source :src="getMP4Src(video, quality)" />
        </video>
    </div>
</template>
  
<script setup lang="ts">
import { GALLERY } from "@/route/names";
import { getMP4Src, getThumbnailPngSrc, type Quality } from "@/utils"
import { unrefElement, useLocalStorage } from "@vueuse/core";
import videojs from "video.js"
import type Player from "video.js/dist/types/player";
import { inject, toRefs } from "vue";
import { onBeforeUnmount, watch, unref, computed, ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import type { PropType } from "vue";
import { nextTick } from "vue";
import { onMounted } from "vue";
import { contentWindowHeightInjectKey } from "@/keys";
import type { ComputedRef } from "vue";

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
    autoPlay: {
        type: Boolean,
        default: true
    },
    nextRouteName: {
        type: String,
        default: ""
    },
    short: {
        type: Boolean,
        default: false
    },
    quality: {
        type: Object as PropType<Quality>,
        default: "1080p"
    }
})

const showVideo = ref(true)

const videoRef = ref<HTMLElement>()




const contentWindowHeight = inject(contentWindowHeightInjectKey) as ComputedRef<number>

const videoID = computed(() => `video-player-${props.video.replace(/\//g, "-")}`)

const player: Ref<Player | undefined> = ref()

const volume = useLocalStorage("volume", 0.5)

const dataSetup = `{"controls": true, "autoplay": ${props.autoPlay}, "preload": "auto"}`

const setupPlayer = () => {
    player.value = videojs(videoRef.value as Element, {
        controls: true,
        controlBar: {
            skipButtons: {
                forward: 10,
                backward: 10
            }
        },
        autoplay: props.autoPlay,
        preload: "auto",
    })

    player.value.volume(volume.value)

    setTimeout(() => {
        if (!player.value) return
        

        player.value.on('ended', function () {
            if (props.nextRouteName && props.autoPlay) {
                let nextRouteName = unref(props.nextRouteName)
                setTimeout(() => {
                    if (player.value && !player.value.isDisposed_) {
                        player.value.dispose()
                    }
                    videoRef.value?.remove()
                    router.push({ name: GALLERY.MAIN }).then(() => {
                        setTimeout(() => {
                            router.push({ name: nextRouteName })
                        }, 50)
                    })
                }, 50)
            }
        });

        player.value.on('volumechange', function () {
            volume.value = player.value!.volume()
        });

        player.value.responsive(true)
        player.value.focus()

        if (!props.autoPlay) return
        player.value.play()
    }, 50)
}

watch([() => props.video, () => props.quality], (newVal) => {
    if (player.value && !player.value.isDisposed_) {
        player.value.dispose()
    }
    showVideo.value = false
    nextTick(() => {
        showVideo.value = true
        setTimeout(() => {
            setupPlayer()
        }, 100)
    })
})

onMounted(() => {
    setupPlayer()
})

onBeforeUnmount(() => {
    if (player.value && !player.value.isDisposed_) {
        player.value.dispose()
    }
})
</script>