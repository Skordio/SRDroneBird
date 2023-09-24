<template>
    <video :id="videoID" ref="videoRef" class="video-js rounded-xl flex-grow-0" :width="videoWidth" :height="videoHeight" controls
        data-setup='{"controls": true, "autoplay": false, "preload": "auto"}'>
        <source :src="getMP4Src(fileName)">
    </video>
</template>
  
<script setup lang="ts">
import { appBarHeightInjectKey, contentWindowHeightInjectKey } from "@/keys";
import { GALLERY } from "@/route/names";
import { getMP4Src } from "@/utils"
import videojs from "video.js"
import type Player from "video.js/dist/types/player";
import type { Ref } from "vue";
import type { ComputedRef } from "vue";
import { onBeforeUnmount } from "vue";
import { nextTick } from "vue";
import { inject } from "vue";
import { computed, defineProps, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";

const router = useRouter()

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
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

const videoRef = ref(null)

const contentWindowHeight = inject(contentWindowHeightInjectKey) as ComputedRef<number>

const display = useDisplay()

const videoID = computed(() => `video-player-${props.name}`)

const videoHeight = computed(() => contentWindowHeight.value - 60)

const videoWidth = computed(() => getWidthForHeight(videoHeight.value))

const getWidthForHeight = (height: number) => {
    return height * (16 / 9)
}

const player: Ref<Player | undefined> = ref()

onMounted(() => {
    setTimeout(() => {
        player.value = videojs(videoID.value)

        player.value.on('ended', function () {
            if (props.nextRouteName) {
                setTimeout(() => {
                    router.push({name: GALLERY.MAIN}).then(() => {
                        setTimeout(() => {
                            router.push({name: props.nextRouteName})
                        }, 400)
                    })
                }, 400)
            }
        });

        setTimeout(() => {
            if (!player.value) return
            player.value.focus()

            if(!props.autoStart) return
            player.value.play()
        }, 200)
    }, 200);
})

onBeforeUnmount(() => {
    if (player.value && !player.value.isDisposed_) {
        player.value.dispose()
    }
    ;(videoRef.value as any)?.remove()
})
</script>