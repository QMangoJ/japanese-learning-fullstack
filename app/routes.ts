import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("api/favorites", "routes/api.favorites.ts"),
	route("api/mistakes", "routes/api.mistakes.ts"),
] satisfies RouteConfig;
