import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/landing.tsx"),
	// /study と /study/favs、/study/day/3-1 … を「1つの」ルートで受ける。
	// 2つに分けると両者の行き来のたびに react-router がシェルごと再マウントし、
	// legacy がスクリプト読み込み時に張った onclick も #app の中身も消える。
	route("study/*", "routes/home.tsx"),
	route("listening/n3", "routes/listening-n3.tsx"),
	route("reading/n3", "routes/reading-n3.tsx"),
	route("api/favorites", "routes/api.favorites.ts"),
	route("api/mistakes", "routes/api.mistakes.ts"),
] satisfies RouteConfig;
