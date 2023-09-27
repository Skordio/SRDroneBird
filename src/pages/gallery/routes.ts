import GalleryPage from "@/pages/gallery"
import type { RouteConfig } from "@/types"
import { GALLERY } from "@/route/names"
import videos from "./videos"

const getChildren = () => {
	const children = []
	for (const video of videos) {
		children.push({
			path: video.route,
			name: video.folder,
			children: video.shorts?.map(short => ({
				path: short.route,
				name: short.folder,
			})) || []
		})
	}
	return children
}

const gallery_routes: Array<RouteConfig> = [
	{
		path: "/gallery",
		component: GalleryPage,
		name: GALLERY.MAIN,
		children: getChildren()
	},
]

export default gallery_routes 
