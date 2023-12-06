import type { RouteConfig } from "../types"

// const timeclock_routes: Array<RouteConfig> = (await import("./pages/profile/routes")).default
import about_routes from "../pages/about/routes"
// const about_routes: Array<RouteConfig> = (await import("../pages/about/routes"))
// 	.default

import gallery_routes from "../pages/gallery/routes"
// const gallery_routes: Array<RouteConfig> = (await import("../pages/gallery/routes"))
// .default
import home_routes from "../pages/home/routes"
// const home_routes: Array<RouteConfig> = (await import("../pages/home/routes"))
// .default

var routes = ([] as Array<RouteConfig>).concat(about_routes, gallery_routes, home_routes) //, timeclock_routes, quality_routes, item_routes)

export default routes
