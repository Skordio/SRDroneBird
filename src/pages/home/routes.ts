import HomePage from "@/pages/home"
import type { RouteConfig } from "@/types"
import { HOME } from "@/route/names"

const home_routes: Array<RouteConfig> = [
	{ path: "/", component: HomePage, name: HOME.MAIN },
]

export default home_routes 
