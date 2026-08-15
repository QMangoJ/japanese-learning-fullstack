import { redirect } from "react-router";

import type { Route } from "./+types/reading-n3";
import { ReadingN3Content } from "./reading-n3-book";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "N3 读解 · 日本語上手" },
		{ name: "description", content: "N3 读解训练：原书 42 课全文、题目解析、翻译、语法讲解与生词读音。" },
	];
}

// Keep old direct links working, while the lesson itself lives in the study shell.
export function loader() {
	return redirect("/study?module=reading");
}

export { ReadingN3Content };

export default function ReadingN3() {
	return null;
}
