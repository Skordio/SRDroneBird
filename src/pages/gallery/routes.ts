import GalleryPage from "@/pages/gallery"
import type { RouteConfig } from "@/types"
import { GALLERY } from "@/route/names"

const videos = [
	'golf_cart_1',
	'golf_course_1',
	'lake_1',
	'proving_grounds_1',
	'state_park_1'
]

const gallery_routes: Array<RouteConfig> = [
	{
		path: "/gallery",
		component: GalleryPage,
		name: GALLERY.MAIN,
		children: [
			{
				path: 'lake',
				name: GALLERY.LAKE,
				component: () => import('@/pages/gallery/locations/lake')
			},
			{
				path: 'golf_course',
				name: GALLERY.GOLF_COURSE,
				component: () => import('@/pages/gallery/locations/golf_course')
			},
			{
				path: 'golf_cart_tour',
				name: GALLERY.GOLF_CART_TOUR,
				component: () => import('@/pages/gallery/locations/golf_cart_tour')
			},
			{
				path: 'proving_grounds',
				name: GALLERY.PROVING_GROUNDS,
				component: () => import('@/pages/gallery/locations/proving_grounds')
			},
			{
				path: 'park',
				name: GALLERY.PARK,
				component: () => import('@/pages/gallery/locations/park')
			},
			{
				path: 'state_park',
				name: GALLERY.STATE_PARK,
				component: () => import('@/pages/gallery/locations/state_park')
			},
		]
	},
]

export default gallery_routes 
