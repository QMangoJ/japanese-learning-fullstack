import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/home";
import { ReadingN3Content } from "./reading-n3";
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

function LegacyRuntime() {
	useEffect(() => {
		const isTrial = new URLSearchParams(window.location.search).get("trial") === "1";
		const loadTrialGate = () => {
			if (!isTrial || window.document.querySelector("script[data-trial-gate]")) return;
			const trialGate = window.document.createElement("script");
			trialGate.src = "/trial-gate.js";
			trialGate.dataset.trialGate = "true";
			window.document.body.appendChild(trialGate);
		};

		if (window.document.querySelector("script[data-study-runtime]")) {
			loadTrialGate();
			return;
		}

		// 试用从 N3 第一周开始；未来接入账户后，这一行会由服务端权限替代。
		if (isTrial) window.localStorage.setItem("module", "grammar");

		const script = window.document.createElement("script");
		script.src = "/study-legacy.js";
		script.dataset.studyRuntime = "true";
		script.async = false;
		script.addEventListener("load", loadTrialGate, { once: true });
		window.document.body.appendChild(script);
	}, []);

	return null;
}

function ReadingSideEntry() {
	useEffect(() => {
		const insertEntry = () => {
			const side = document.querySelector("#side");
			const footer = side?.querySelector(".side-foot");
			if (!side || !footer || side.querySelector(".side-reader-link")) return;
			const link = document.createElement("a");
			const contentSection = Array.from(side.querySelectorAll<HTMLElement>(".side-sec"))
				.find((section) => section.querySelector(".side-h")?.textContent?.includes("内容"));
			if (!contentSection) return;
			link.href = "/study?module=reading";
			link.className = "side-reader-link";
			link.innerHTML = "<span>📕</span><span>读解</span><small>N3</small>";
			contentSection.append(link);
		};

		const observer = new MutationObserver(insertEntry);
		observer.observe(document.body, { childList: true, subtree: true });
		insertEntry();
		return () => observer.disconnect();
	}, []);

	return null;
}

function LegacyStudy() {
	return (
		<>
			<div className="trial-context" hidden>
				<span>免费试学</span><b>N3 第一周已开放</b><a href="/">了解完整课程</a>
			</div>
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
						<a className="reader-mode-link" href="/study?module=reading">📕 <span>读解</span></a>
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
			<ReadingSideEntry />
		</>
	);
}

function StudyReading() {
	return (
		<>
			<div className="topbar study-reader-topbar">
				<header className="top">
					<Link className="back study-reader-back" to="/study">‹ 返回</Link>
					<span className="lvchip">N3</span>
					<h1>日本語上手</h1>
					<div className="langbar"><span className="study-reader-lang">中</span></div>
				</header>
				<div className="modewrap">
					<div className="typebar">
						<Link className="study-module-link" to="/study">📘 <span>语法</span></Link>
						<Link className="study-module-link" to="/study">📗 <span>词汇</span></Link>
						<Link className="study-module-link" to="/study">📙 <span>汉字</span></Link>
						<span className="reader-mode-link on">📕 <span>读解</span></span>
					</div>
				</div>
			</div>
			<aside className="side study-reading-side" aria-label="N3 内容">
				<div className="side-brand">日本語上手</div>
				<div className="side-sec"><div className="side-h">级别</div><div className="side-seg"><span>N4</span><span className="on">N3</span><span>N2</span></div></div>
				<div className="side-sec"><div className="side-h">N3 内容</div><Link className="side-item" to="/study"><span className="ic">📘</span>语法<span className="ct">6周</span></Link><Link className="side-item" to="/study"><span className="ic">📗</span>词汇<span className="ct">6周</span></Link><Link className="side-item" to="/study"><span className="ic">📙</span>汉字<span className="ct">6周</span></Link><span className="side-item on"><span className="ic">📕</span>读解<span className="ct">N3</span></span></div>
				<div className="side-sec"><div className="side-h">读解进度</div><span className="study-reading-day"><b>第 1 周第 1 日</b><small>案内 ① · 学習中</small></span></div>
				<div className="side-foot"><Link className="side-item" to="/study"><span className="ic">‹</span>返回学习区</Link></div>
			</aside>
			<main id="app" className="study-reading-app"><ReadingN3Content embedded /></main>
			<nav className="bottom reader-study-bottom"><Link to="/study"><span className="ic">📚</span><span>学习</span></Link><span className="on"><span className="ic">📕</span><span>读解</span></span><Link to="/study"><span className="ic">⭐</span><span>收藏</span></Link></nav>
		</>
	);
}

export default function Home() {
	const [searchParams] = useSearchParams();
	return searchParams.get("module") === "reading" ? <StudyReading /> : <LegacyStudy />;
}
