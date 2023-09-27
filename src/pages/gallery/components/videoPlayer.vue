<template>
    <video :id="videoID" ref="videoRef" class="video-js rounded-xl flex-grow-0" :width="width" :height="height" controls
        :data-setup="dataSetup">
        <source :src="videoSource">
    </video>
</template>
  
<script setup lang="ts">
import { GALLERY } from "@/route/names";
import { getMP4Src } from "@/utils"
import { useLocalStorage } from "@vueuse/core";
import videojs from "video.js"
import type Player from "video.js/dist/types/player";
import { onBeforeUnmount, watch, unref, computed, ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";

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
    }
})

const showVideo = ref(false)

const videoRef = ref<HTMLElement>()

const videoID = computed(() => `video-player-${props.video.replace(/\//g, "-")}`)

const videoSource = computed(() => getMP4Src(props.video))

const player: Ref<Player | undefined> = ref()

const volume = useLocalStorage("volume", 0.5)

const dataSetup = `{"controls": true, "autoplay": ${props.autoPlay}, "preload": "auto"}`

const setupPlayer = () => {
    player.value = videojs(videoID.value)

    setTimeout(() => {
        if (!player.value) return

        player.value.on('ended', function () {
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
                        }, 50)
                    })
                }, 50)
            }
        });


        player.value.on('volumechange', function () {
            volume.value = player.value!.volume()
        });
        player.value.focus()
        player.value.volume(volume.value)

        if(!props.autoPlay) return
        player.value.play()
        
        setTimeout(() => {
            showVideo.value = true
        }, 100);
    }, 50)
}

watch(() => props.video, (newVal) => {
    showVideo.value = false
    if (player.value && !player.value.isDisposed_) {
        player.value.dispose()
    }
    videoRef.value?.remove()
    setTimeout(() => {
        setupPlayer()
    }, 200)
}, {immediate: true})

onBeforeUnmount(() => {
    if (player.value && !player.value.isDisposed_) {
        player.value.dispose()
    }
    videoRef.value?.remove()
})
</script>