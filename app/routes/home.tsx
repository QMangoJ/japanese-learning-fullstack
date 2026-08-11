import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BrowserRouter } from "react-router";

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
		const notifyReady = () => document.dispatchEvent(new Event("study-runtime-ready"));
		const loadTrialGate = () => {
			if (!isTrial || window.document.querySelector("script[data-trial-gate]")) return;
			const trialGate = window.document.createElement("script");
			trialGate.src = "/trial-gate.js";
			trialGate.dataset.trialGate = "true";
			window.document.body.appendChild(trialGate);
		};

		if (window.document.querySelector("script[data-study-runtime]")) {
			loadTrialGate();
			notifyReady();
			return;
		}

		// 试用从 N3 第一周开始；未来接入账户后，这一行会由服务端权限替代。
		if (isTrial) window.localStorage.setItem("module", "grammar");

		const script = window.document.createElement("script");
		script.src = "/study-legacy.js";
		script.dataset.studyRuntime = "true";
		script.async = false;
		script.addEventListener("load", () => {
			loadTrialGate();
			notifyReady();
		}, { once: true });
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
			link.href = "/study";
			link.className = "side-reader-link";
			if (document.body.classList.contains("reader-mode-active")) link.classList.add("on");
			link.innerHTML = "<span>📕</span><span>读解</span><small>3周</small>";
			contentSection.append(link);
		};

		const observer = new MutationObserver(insertEntry);
		observer.observe(document.body, { childList: true, subtree: true });
		insertEntry();
		return () => observer.disconnect();
	}, []);

	return null;
}

function ReadingModeBridge() {
	useEffect(() => {
		let readerRoot: Root | null = null;

		const syncActiveState = (active: boolean) => {
			document.body.classList.toggle("reader-mode-active", active);
			const title = document.querySelector("#title");
			if (active && title) title.textContent = "N3 读解";
			document.querySelectorAll("#typebar button").forEach((button) => button.classList.toggle("on", false));
			if (active) document.querySelectorAll("#side .side-item.on").forEach((entry) => entry.classList.remove("on"));
			document.querySelectorAll(".reader-mode-link, .side-reader-link").forEach((entry) => entry.classList.toggle("on", active));
		};

		const leaveReading = () => {
			if (!readerRoot) return;
			readerRoot.unmount();
			readerRoot = null;
			document.querySelector("#app")?.classList.remove("study-reading-app");
			syncActiveState(false);
		};

		const enterReading = () => {
			const app = document.querySelector<HTMLElement>("#app");
			if (!app) return;
			if (!readerRoot) {
				app.replaceChildren();
				readerRoot = createRoot(app);
			}
			app.classList.add("study-reading-app");
			readerRoot.render(<BrowserRouter><ReadingN3Content embedded /></BrowserRouter>);
			syncActiveState(true);
		};

		const onDocumentClick = (event: MouseEvent) => {
			const target = event.target instanceof Element ? event.target.closest<HTMLElement>("a, button") : null;
			if (!target) return;
			if (target.matches(".reader-mode-link, .side-reader-link")) {
				event.preventDefault();
				enterReading();
				return;
			}
			if (readerRoot && target.matches("#typebar button, #side button, nav.bottom button")) leaveReading();
		};

		const activateLegacyLink = () => {
			if (new URLSearchParams(window.location.search).get("module") !== "reading") return;
			window.history.replaceState({}, "", "/study");
			enterReading();
		};

		document.addEventListener("click", onDocumentClick, true);
		document.addEventListener("study-runtime-ready", activateLegacyLink);
		if (window.document.querySelector("script[data-study-runtime]")) queueMicrotask(activateLegacyLink);
		return () => {
			document.removeEventListener("click", onDocumentClick, true);
			document.removeEventListener("study-runtime-ready", activateLegacyLink);
			leaveReading();
		};
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
						<a className="reader-mode-link" href="/study">📕 <span>读解</span></a>
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
			<ReadingModeBridge />
		</>
	);
}

export default function Home() {
	return <LegacyStudy />;
}
