import type { RouteConfig } from "../types"

// const timeclock_routes: Array<RouteConfig> = (await import("./pages/profile/routes")).default
const about_routes: Array<RouteConfig> = (await import("../pages/about/routes"))
	.default

	
const gallery_routes: Array<RouteConfig> = (await import("../pages/gallery/routes"))
.default

const home_routes: Array<RouteConfig> = (await import("../pages/home/routes"))
.default

var routes = ([] as Array<RouteConfig>).concat(about_routes, gallery_routes, home_routes) //, timeclock_routes, quality_routes, item_routes)

export default routes
