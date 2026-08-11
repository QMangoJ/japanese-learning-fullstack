import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/landing.tsx"),
	route("study", "routes/home.tsx"),
	route("reading/n3", "routes/reading-n3.tsx"),
	route("api/favorites", "routes/api.favorites.ts"),
	route("api/mistakes", "routes/api.mistakes.ts"),
] satisfies RouteConfig;
