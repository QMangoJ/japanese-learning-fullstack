import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/landing.tsx"),
	// /study、/study/favs、/study/day/3-1 は StudyApp が同じシェルで切る。
	route("study/*", "routes/home.tsx"),
	route("api/favorites", "routes/api.favorites.ts"),
	route("api/mistakes", "routes/api.mistakes.ts"),
	route("api/kanji-exam/parse", "routes/api.kanji-exam-parse.ts"),
	route("api/me", "routes/api.me.ts"),
	route("auth/google", "routes/auth.google.ts"),
	route("auth/google/callback", "routes/auth.google.callback.ts"),
	route("auth/logout", "routes/auth.logout.ts"),
] satisfies RouteConfig;
