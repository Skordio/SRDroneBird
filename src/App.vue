<template>
	<v-app>
		<v-layout>
			<v-app-bar :height="appBarHeight" class="app-bar">
				<v-container fluid class="pa-0 d-flex flex-column">
				<template v-if="xs">
					<v-row class="mt-n12">
						<v-col class="mx-auto">
							<v-img :src="getLogoSrc('dronebird_bird_filled_corrected.png')" height="131">
							</v-img>
						</v-col>
					</v-row>
					<v-row class="mt-3">
						<v-col class="mx-auto mt-n15">
							<div class="d-flex justify-center gap-2">
								<v-btn color="#FFFFF" :to="{ name: HOME.MAIN }" size="large">
									Home
								</v-btn>
								<v-btn color="#FFFFF" :to="{ name: ABOUT.MAIN }" size="large">
									About
								</v-btn>
								<v-btn color="#FFFFF" :to="{ name: GALLERY.MAIN }" size="large">
									Gallery
								</v-btn>
							</div>
						</v-col>
					</v-row>
				</template>
				<template v-else>
					<v-row class="d-flex align-center">
						<v-col class="me-auto d-flex justify-start">
							<v-app-bar-title>
								<v-img :src="getLogoSrc('dronebird_bird_filled_corrected.png')" :height="logoHeight" class="mb-n9"  :style="{marginLeft:`${logoMarginLeft}px !important`}"> 
								</v-img>
							</v-app-bar-title>
						</v-col>
						<v-col class="ms-auto">
							<div class="d-flex gap-2" :style="{ marginRight: `${routingButtonsMarginRight}%` }">
								<v-btn color="#FFFFF" :to="{ name: HOME.MAIN }" size="large">
									Home
								</v-btn>
								<v-btn color="#FFFFF" :to="{ name: ABOUT.MAIN }" size="large">
									About
								</v-btn>
								<v-btn color="#FFFFF" :to="{ name: GALLERY.MAIN }" size="large">
									Gallery
								</v-btn>
							</div>
						</v-col>
					</v-row>
				</template>
				</v-container>
			</v-app-bar>
			<v-main :style="vMainStyle">
				<v-card color="#243860" class="h-screen d-flex justify-center">
					<template #image>
						<v-img id="bgd-img" :style="{ filter: `brightness(${brightness}%)` }" aspect-ratio="16/9" cover
							:src="getPngSrc('docks4.png')">
						</v-img>
					</template>
					<router-view v-slot="{ Component }" :style="{ marginTop: `${appBarHeight}px !important`, zIndex: '100 !important' }" >
						<v-fade-transition mode="out-in">
							<component :is="Component"/>
						</v-fade-transition>
					</router-view>
				</v-card>
			</v-main>
		</v-layout>
	</v-app>
</template>

<style lang="scss">
.app-bar {
	background: rgba(221, 44, 0, 0.2) !important;
}
// .v-toolbar__content {
// 	display:flex;
// 	flex-flow: column;
// }
</style>

<script setup lang="ts">
import { ref, watch } from "vue"
import { defineComponent } from "vue"
import { getLogoSrc, getPngSrc } from "@/utils"
import { useRoute, useRouter } from "vue-router"
import { HOME, GALLERY, ABOUT } from "@/route/names"
import { until, useIntervalFn, watchDebounced } from "@vueuse/core"
import { computed } from "vue"
import { appBarHeightInjectKey, contentWindowHeightInjectKey } from "./keys"
import { useDisplay } from "vuetify/lib/framework.mjs"
import { provide } from "vue"
import { unref } from "vue"
import { toRefs } from "vue"

const router = useRouter()
const display = useDisplay()
const { xs } = toRefs(display)

const route = useRoute()

// watch(() => display, (newVal) => {
// 	let message = ''
// 	for (const key in newVal) {
// 		message += `${key}: ${unref((newVal as any)[key])}\n`
// 	}
// 	console.log(message)
// }, {immediate:true, deep: true})

const logoHeightForBP = {
	xs: 120,
	sm: 120,
	md: 120,
	lg: 220,
	xl: 220
}


const logoHeight = computed(() => {
	if (display.xlAndUp.value) {
		return logoHeightForBP.xl
	} else if (display.lgAndUp.value) {
		return logoHeightForBP.lg
	} else if (display.mdAndUp.value) {
		return logoHeightForBP.md
	} else if (display.smAndUp.value) {
		return logoHeightForBP.sm
	} else {
		return logoHeightForBP.xs
	}
})

const appBarHeight = computed(() => {
	if (display.lgAndUp.value) {
		return 140
	} else if (display.smAndUp.value) {
		return 80
	} else {
		return 140
	}
})

const contentHeight = computed(() => {
	return display.height.value - appBarHeight.value
})

const vMainStyle = computed(() => {
	return {
		marginTop: `-${appBarHeight.value}px !important`
	}
})

provide(contentWindowHeightInjectKey, contentHeight)

const logoMarginLeft = computed(() => {
	if (display.lgAndUp.value) {
		return -100
	} else {
		return -30
	}
})
  
const routingButtonsMarginRight = computed(() => {
	if(display.lgAndUp.value) {
		return parseInt(mapToRange(display.width.value, 600, 1920, 5, 18).toString())
	} else {
		return 10
	}
})

const mapToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
	return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

const brightness = ref(60)

const desiredBrightness = ref(60)

let pauseBrightnessChange: Function = () => { return; }

const changeBrightnessTo = (value: number) => {
	desiredBrightness.value = value
	if (value < brightness.value) {
		const { pause } = useIntervalFn(() => {
			brightness.value -= 2
		}, 20)

		pauseBrightnessChange = pause

		until(computed(() => brightness.value <= value)).toBe(true).then(() => {
			pause()
		})
	} else if (brightness.value < value) {
		const { pause } = useIntervalFn(() => {
			brightness.value += 2
		}, 20)

		pauseBrightnessChange = pause

		until(computed(() => brightness.value >= value)).toBe(true).then(() => {
			pause()
		})
	}
}

watchDebounced(route, (newVal) => {
	if (newVal.path === '/') {
		pauseBrightnessChange()
		changeBrightnessTo(60)
	} else {
		pauseBrightnessChange()
		changeBrightnessTo(20)
	}
}, { immediate: true, debounce: 50 })


</script>

<style>
@import "https://use.fontawesome.com/releases/v6.4.0/css/all.css";
</style>

<style lang="sass">
@import "./native.sass"
</style>