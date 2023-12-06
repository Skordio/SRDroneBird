import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"
import { createWebHashHistory, createRouter, createWebHistory } from "vue-router"
import type { RouterOptions } from "vue-router"

//videojs
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import routes from './route'
// Router
const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes: routes as RouterOptions["routes"],
})

// Vuetify
import "vuetify/styles"
import { aliases, fa } from "vuetify/iconsets/fa"
import { mdi } from "vuetify/iconsets/mdi"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const droneBirdTheme = {
	dark: true,
	colors: {
		background: "#243860",
		surface: "#838892",
		// primary: '#6200EE',
		// 'primary-darken-1': '#3700B3',
		// secondary: '#03DAC6',
		// 'secondary-darken-1': '#018786',
		// error: '#B00020',
		// info: '#2196F3',
		// success: '#4CAF50',
		// warning: '#FB8C00',
	},
}

const vuetify = createVuetify({
	icons: {
		defaultSet: "fa",
		aliases,
		sets: {
			fa,
			mdi,
		},
	},
	theme: {
		defaultTheme: "droneBirdTheme",
		themes: {
			droneBirdTheme,
		},
	},
	defaults: {
		VCard: {
			color: '#7a5925'
		},
		VBtn: {
			color: "#49361a"
		}
	},
	components,
	directives,
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

// app.use(
// 	createAuth0({
// 		domain: "dev-0rhw0i4lr3uasosb.us.auth0.com",
// 		clientId: "NhHd68XyPUcvORzEGsAWCVXwDEjOtkRf",
// 		authorizationParams: {
// 			redirect_uri: window.location.origin,
// 		},
// 	})
// )

app.mount("#app")
