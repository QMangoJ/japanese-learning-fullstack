import type { Route } from "./+types/home";
import { StudyApp } from "../study/StudyApp";
import "./study-shell.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "学习区 · 日本語上手" },
		{ name: "description", content: "日语学习助手：N4/N3/N2 语法、词汇与汉字" },
	];
}

export const links: Route.LinksFunction = () => [
	{ rel: "stylesheet", href: "/study-legacy.css" },
];

export default function Home() {
	return <StudyApp />;
}
