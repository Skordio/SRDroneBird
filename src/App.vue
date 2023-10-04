<template>
	<v-app>
		<v-layout>
			<v-app-bar :height="appBarHeight" class="app-bar">
				<v-app-bar-title>
					<v-img :src="getLogoSrc('dronebird_bird_filled_corrected.png')" :height="logoHeight" class="mb-n9" :style="{marginLeft:`-${logoMarginLeft}% !important`, marginRight:'-26% !important'}">
					</v-img>
				</v-app-bar-title>
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
			</v-app-bar>
			<v-main :style="vMainStyle">
				<v-card color="#243860" class="h-screen d-flex justify-center">
					<template #image>
						<v-img id="bgd-img" :style="{ filter: `brightness(${brightness}%)` }" aspect-ratio="16/9" cover
							:src="getPngSrc('docks4.png')">
						</v-img>
					</template>
					<v-fade-transition mode="out-in">
						<router-view :style="{ marginTop: '140px !important', zIndex: '100 !important' }" />
					</v-fade-transition>
				</v-card>
			</v-main>
		</v-layout>
	</v-app>
</template>

<style lang="scss">
.app-bar {
	background: rgba(221, 44, 0, 0.2) !important;
}
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

const router = useRouter()

const display = useDisplay()

const route = useRoute()

// watch(() => display, (newVal) => {
// 	let message = ''
// 	for (const key in newVal as {[key:string]: any}) {
// 		message += `${key}: ${unref(newVal[key])}\n`
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
	if(display.xlAndUp.value) {
		return logoHeightForBP.xl
	} else if(display.lgAndUp.value) {
		return logoHeightForBP.lg
	} else if(display.mdAndUp.value) {
		return logoHeightForBP.md
	} else if(display.smAndUp.value) {
		return logoHeightForBP.sm
	} else {
		return logoHeightForBP.xs
	}
})

const appBarHeight = computed(() => {
	return display.lgAndUp.value ? 140 : 80
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
	if(display.lgAndUp.value) {
		return parseInt(mapToRange(display.width.value, 600, 1920, 18, 31).toString()) 
	} else {
		return 26
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

const brightness = ref(20)

const changeBrightnessTo = (value: number) => {
	if (value < brightness.value) {
		const { pause } = useIntervalFn(() => {
			brightness.value--
		}, 10)

		until(computed(() => brightness.value <= value)).toBe(true).then(() => {
			pause()
		})
	} else if (brightness.value < value) {
		const { pause } = useIntervalFn(() => {
			brightness.value++
		}, 10)

		until(computed(() => brightness.value >= value)).toBe(true).then(() => {
			pause()
		})
	}
}

watchDebounced(route, (newVal) => {
	if (newVal.path === '/') {
		changeBrightnessTo(60)
	} else {
		changeBrightnessTo(20)
	}
}, {debounce: 50,immediate:true})

</script>

<style>
@import "https://use.fontawesome.com/releases/v6.4.0/css/all.css";
</style>

<style lang="sass">
@import "./native.sass"
</style>