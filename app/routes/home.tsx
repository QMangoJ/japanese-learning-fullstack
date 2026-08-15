import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BrowserRouter } from "react-router";

import type { Route } from "./+types/home";
import { ListeningN3Content } from "./listening-n3";
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

function StudySideEntries() {
	useEffect(() => {
		const insertEntry = () => {
			const side = document.querySelector("#side");
			const footer = side?.querySelector(".side-foot");
			if (!side || !footer) return;
			const contentSection = Array.from(side.querySelectorAll<HTMLElement>(".side-sec"))
				.find((section) => section.querySelector(".side-h")?.textContent?.includes("内容"));
			if (!contentSection) return;
			const entries = [
				{ className: "side-reader-link", activeClass: "reader-mode-active", icon: "📕", label: "读解", note: "6周" },
				{ className: "side-listening-link", activeClass: "listening-mode-active", icon: "🎧", label: "听解", note: "5章" },
			];
			entries.forEach((entry) => {
				if (contentSection.querySelector(`.${entry.className}`)) return;
				const link = document.createElement("a");
				link.href = "/study";
				link.className = entry.className;
				if (document.body.classList.contains(entry.activeClass)) link.classList.add("on");
				link.innerHTML = `<span>${entry.icon}</span><span>${entry.label}</span><small>${entry.note}</small>`;
				contentSection.append(link);
			});
		};

		const observer = new MutationObserver(insertEntry);
		observer.observe(document.body, { childList: true, subtree: true });
		insertEntry();
		return () => observer.disconnect();
	}, []);

	return null;
}

function StudyModeBridge() {
	useEffect(() => {
		let moduleRoot: Root | null = null;
		type StudyMode = "reading" | "listening";
		let activeMode: StudyMode | null = null;

		const keepModeTitle = () => {
			const title = document.querySelector("#title");
			if (!activeMode || !title) return;
			const expected = activeMode === "reading" ? "N3 读解" : "N3 听解";
			if (title.textContent !== expected) title.textContent = expected;
		};

		const title = document.querySelector("#title");
		const titleObserver = title ? new MutationObserver(keepModeTitle) : null;
		titleObserver?.observe(title, { childList: true, characterData: true, subtree: true });

		const syncActiveState = (mode: StudyMode | null) => {
			activeMode = mode;
			const active = mode !== null;
			document.body.classList.toggle("reader-mode-active", mode === "reading");
			document.body.classList.toggle("listening-mode-active", mode === "listening");
			keepModeTitle();
			document.querySelectorAll("#typebar button").forEach((button) => button.classList.toggle("on", false));
			if (active) document.querySelectorAll("#side .side-item.on").forEach((entry) => entry.classList.remove("on"));
			document.querySelectorAll(".reader-mode-link, .side-reader-link").forEach((entry) => entry.classList.toggle("on", mode === "reading"));
			document.querySelectorAll(".listening-mode-link, .side-listening-link").forEach((entry) => entry.classList.toggle("on", mode === "listening"));
		};

		const legacyApp = () => document.querySelector<HTMLElement>("#app");
		const readingApp = () => document.querySelector<HTMLElement>("#reading-app");

		const leaveModule = () => {
			if (!moduleRoot) return;
			moduleRoot.unmount();
			moduleRoot = null;
			const reader = readingApp();
			if (reader) {
				reader.replaceChildren();
				reader.hidden = true;
				reader.classList.remove("study-reading-app");
			}
			const legacy = legacyApp();
			if (legacy) legacy.hidden = false;
			syncActiveState(null);
		};

		const enterModule = (mode: StudyMode) => {
			const app = readingApp();
			if (!app) return;
			if (moduleRoot) {
				moduleRoot.unmount();
				app.replaceChildren();
			}
			moduleRoot = createRoot(app);
			const legacy = legacyApp();
			if (legacy) legacy.hidden = true;
			app.hidden = false;
			app.classList.add("study-reading-app");
			moduleRoot.render(<BrowserRouter>{mode === "reading" ? <ReadingN3Content embedded /> : <ListeningN3Content embedded />}</BrowserRouter>);
			syncActiveState(mode);
		};

		const onDocumentClick = (event: MouseEvent) => {
			const target = event.target instanceof Element ? event.target.closest<HTMLElement>("a, button") : null;
			if (!target) return;
			if (target.matches(".reader-mode-link, .side-reader-link")) {
				event.preventDefault();
				// 已经在这个模块里就别重挂：remount 会丢掉答题状态和滚动位置。
				if (activeMode !== "reading") enterModule("reading");
				return;
			}
			if (target.matches(".listening-mode-link, .side-listening-link")) {
				event.preventDefault();
				if (activeMode !== "listening") enterModule("listening");
				return;
			}
			if (moduleRoot && target.matches("#typebar button, #side button, nav.bottom button")) leaveModule();
		};

		const activateLegacyLink = () => {
			const mode = new URLSearchParams(window.location.search).get("module");
			if (mode !== "reading" && mode !== "listening") return;
			// ?module= だけを落とす。/study/day/3-1 のような実パスは保つ。
			window.history.replaceState({}, "", window.location.pathname);
			enterModule(mode);
		};

		// 进入模块不压历史栈，所以浏览器返回（含 iOS 右滑）落回的是上一个 legacy
		// hash。以前没人监听，模块就一直挂着不走：legacy 在隐藏的 #app 里重画，
		// tab 却被重新点亮，于是出现「返回后模块还在、两个 tab 同时选中」。
		const onHistoryNav = () => {
			if (!moduleRoot) return;
			leaveModule();
			// leaveModule 之后 body 上的 mode class 才消失，legacy 需要再画一次
			// 才能把正确的 tab 点回来。此时 moduleRoot 已为空，不会递归。
			window.dispatchEvent(new Event("popstate"));
		};

		document.addEventListener("click", onDocumentClick, true);
		document.addEventListener("study-runtime-ready", activateLegacyLink);
		window.addEventListener("popstate", onHistoryNav);
		if (window.document.querySelector("script[data-study-runtime]")) queueMicrotask(activateLegacyLink);
		return () => {
			document.removeEventListener("click", onDocumentClick, true);
			document.removeEventListener("study-runtime-ready", activateLegacyLink);
			window.removeEventListener("popstate", onHistoryNav);
			titleObserver?.disconnect();
			leaveModule();
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
						<a className="listening-mode-link" href="/study">🎧 <span>听解</span></a>
					</div>
				</div>
			</div>
			<aside className="side" id="side" />
			<main id="app" />
			<section id="reading-app" hidden aria-label="N3 学习模块" />
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
			<StudySideEntries />
			<StudyModeBridge />
		</>
	);
}

export default function Home() {
	return <LegacyStudy />;
}
