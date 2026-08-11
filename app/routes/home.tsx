import { useEffect } from "react";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "日本語上手" },
		{ name: "description", content: "日语学习助手：N4/N3/N2 语法、词汇与汉字" },
	];
}

export const links: Route.LinksFunction = () => [
	{ rel: "stylesheet", href: "/study-legacy.css" },
];

function LegacyRuntime() {
	useEffect(() => {
		if (window.document.querySelector("script[data-study-runtime]")) return;

		const script = window.document.createElement("script");
		script.src = "/study-legacy.js";
		script.dataset.studyRuntime = "true";
		script.async = false;
		window.document.body.appendChild(script);
	}, []);

	return null;
}

export default function Home() {
	return (
		<>
			<div className="topbar" id="topbar">
				<header className="top">
					<button className="back" id="backBtn" style={{ display: "none" }}>
						‹ 返回
					</button>
					<button className="lvchip" id="lvChip" aria-haspopup="dialog">
						N3 <span className="cv">▾</span>
					</button>
					<h1 id="title">日本語上手</h1>
					<div className="langbar" id="langbar">
						<button data-lang="cn">中</button>
						<button data-lang="en">EN</button>
					</div>
					<button className="toggle-all" id="topAction" style={{ display: "none" }} />
				</header>
				<div className="modewrap">
					<div className="typebar" id="typebar">
						<button data-ty="grammar">
							📘 <span className="lbl" data-cn="语法" data-en="Grammar">语法</span>
						</button>
						<button data-ty="vocab">
							📗 <span className="lbl" data-cn="词汇" data-en="Vocabulary">词汇</span>
						</button>
						<button data-ty="kanji">
							📙 <span className="lbl" data-cn="汉字" data-en="Kanji">汉字</span>
						</button>
					</div>
				</div>
			</div>
			<aside className="side" id="side" />
			<main id="app" />
			<nav className="bottom">
				<button data-nav="home"><span className="ic">📚</span><span className="lbl" data-cn="知识库" data-en="Library">知识库</span></button>
				<button data-nav="search"><span className="ic">🔍</span><span className="lbl" data-cn="搜索" data-en="Search">搜索</span></button>
				<button data-nav="mistakes"><span className="ic">📝</span><span className="lbl" data-cn="错题本" data-en="Notes">错题本</span></button>
				<button data-nav="common"><span className="ic">📐</span><span className="lbl" data-cn="通用" data-en="General">通用</span></button>
				<button data-nav="favs"><span className="ic">⭐</span><span className="lbl" data-cn="收藏" data-en="Favorites">收藏</span></button>
			</nav>
			<div className="sheet-mask" id="sheetMask" hidden />
			<div className="sheet" id="sheet" role="dialog" aria-modal="true" hidden />
			<LegacyRuntime />
		</>
	);
}
