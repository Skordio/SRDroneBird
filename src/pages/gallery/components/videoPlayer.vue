<template>
    <v-responsive class="rounded-xl overflow-hidden elevation-15" v-if="showVideo" :aspect-ratio="16/9">
        <video id="video" :poster="getThumbnailPngSrc(video)" ref="videoRef" class="video-js rounded-xl h-100 w-100" 
             controls :data-setup="dataSetup">
            <source :src="getMP4Src(video, quality)" />
        </video>
    </v-responsive>
</template>
  
<script setup lang="ts">
import { GALLERY } from "@/route/names";
import { getMP4Src, getThumbnailPngSrc, type Quality } from "@/utils"
import { unrefElement, useIntervalFn, useLocalStorage, useVModels } from "@vueuse/core";
import videojs from "video.js"
import type Player from "video.js/dist/types/player";
import { inject, toRefs, nextTick, onMounted, onBeforeUnmount, watch, unref, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { contentWindowHeightInjectKey } from "@/keys";
import type { ComputedRef, Ref, PropType } from "vue";

const router = useRouter()

const props = defineProps({
    video: {
        type: String,
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
    },
    fullscreen: {
        type: Boolean,
        default: false
    },
    currentTime: {
        type: Number,
        default: 0
    }
})

const { fullscreen, currentTime } = useVModels(props)

const showVideo = ref(true)

const videoRef = ref<HTMLElement>()




const contentWindowHeight = inject(contentWindowHeightInjectKey) as ComputedRef<number>

const videoID = computed(() => `video-player-${props.video.replace(/\//g, "-")}`)

const player: Ref<Player | undefined> = ref()

const volume = useLocalStorage("volume", 0.5)

const dataSetup = `{"controls": true, "autoplay": ${props.autoPlay}, "preload": "auto"}`

const currentTimeFunc = useIntervalFn(() => {
    currentTime.value = player.value?.currentTime() ?? 0
}, 1000)

currentTimeFunc.pause()

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
        
        if(fullscreen.value) {
            player.value!.requestFullscreen()
        }

        player.value.on('fullscreenchange', function () {
            fullscreen.value = player.value!.isFullscreen() ?? false
        });

        player.value.on('ended', function () {
            currentTimeFunc.pause()
            if (props.nextRouteName && props.autoPlay) {
                let nextRouteName = unref(props.nextRouteName)
                setTimeout(() => {
                    if (player.value && !player.value.isDisposed_) {
                        player.value.dispose()
                    }
                    videoRef.value?.remove()
                    router.replace({ name: GALLERY.MAIN }).then(() => {
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

        player.value?.currentTime(currentTime.value)

        currentTimeFunc.resume()
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