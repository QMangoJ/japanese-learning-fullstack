import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { useLocation, useNavigate } from "react-router";

import { ListeningN3Content } from "../routes/listening-n3";
import { ReadingN3Content } from "../routes/reading-n3";
import {
	CardsPage,
	FavFcPage,
	FavsPage,
	HenkeiPage,
	HomePage,
	KatsuyouPage,
	MistakesPage,
	NumbersPage,
	RefPage,
	SearchPage,
} from "../routes/study-common";
import { ContrastPage, DayPage, parseDayRoute } from "./days";
import {
	DATA,
	FAV,
	LANG,
	LEVEL,
	LEVEL_LIST,
	MISTAKES,
	MODULE,
	TYPE,
	attachResync,
	bootStudyData,
	closeFavFc,
	contrastModule,
	cur,
	dataLoaded,
	dayNeighbors,
	ensureCardsDeck,
	entryHash,
	favFcPayload,
	favsPayload,
	hasContrast,
	homeIntro,
	homeScale,
	hydrateFromStorage,
	isGram,
	isListening,
	isN2,
	isN4,
	isReading,
	keyToPath,
	loadError,
	lx,
	mistakesPayload,
	modLabel,
	moduleFrom,
	n2Loaded,
	n4Loaded,
	navTo,
	noRuby,
	pathToKey,
	saveLastVisit,
	say,
	setLang,
	setModule,
	setNavImpl,
	showingFavFc,
	subscribe,
	getVersion,
	toggleDisplay,
	type LevelKey,
	type TypeKey,
} from "./store";

function useStudyTick() {
	return useSyncExternalStore(subscribe, getVersion, () => 0);
}

function updateStickyVars() {
	const tb = document.getElementById("topbar");
	if (tb) document.documentElement.style.setProperty("--topbarh", tb.offsetHeight + "px");
	const ht = document.querySelector(".home-top");
	document.documentElement.style.setProperty("--hometoph", (ht ? (ht as HTMLElement).offsetHeight : 0) + "px");
	const nn = document.querySelector(".num-nav");
	if (nn) document.documentElement.style.setProperty("--numnavh", (nn as HTMLElement).offsetHeight + "px");
}

function updateNumNavActive() {
	const nav = document.querySelector(".num-nav");
	if (!nav) return;
	const heads = document.querySelectorAll(".num-sec-h");
	if (!heads.length) return;
	const line = nav.getBoundingClientRect().bottom + 4;
	let activeId = heads[0].id;
	heads.forEach((h) => {
		if (h.getBoundingClientRect().top <= line) activeId = h.id;
	});
	let onEl: Element | null = null;
	nav.querySelectorAll("a").forEach((a) => {
		const on = (a as HTMLElement).dataset.scroll === activeId;
		a.classList.toggle("on", on);
		if (on) onEl = a;
	});
	if (onEl) {
		const nr = nav.getBoundingClientRect();
		const ar = (onEl as HTMLElement).getBoundingClientRect();
		if (ar.left < nr.left || ar.right > nr.right) nav.scrollLeft += ar.left - nr.left - 12;
	}
}

function Header({
	title,
	showBack,
	onBack,
	onOpenLevel,
}: {
	title: string;
	showBack: boolean;
	onBack: () => void;
	onOpenLevel: () => void;
}) {
	return (
		<div className="topbar" id="topbar">
			<header className="top">
				<button className="back" id="backBtn" style={{ display: showBack ? "" : "none" }} onClick={onBack}>
					‹ <span className="lbl">{lx("返回", "Back")}</span>
				</button>
				<button className="lvchip" id="lvChip" aria-haspopup="dialog" onClick={onOpenLevel}>
					{LEVEL.toUpperCase()} <span className="cv">▾</span>
				</button>
				<h1 id="title">{title}</h1>
				<div className="langbar" id="langbar">
					<button className={LANG === "cn" ? "on" : ""} data-lang="cn" aria-label="中文" aria-pressed={LANG === "cn"} onClick={() => setLang("cn")}>
						中
					</button>
					<button className={LANG === "en" ? "on" : ""} data-lang="en" aria-label="English" aria-pressed={LANG === "en"} onClick={() => setLang("en")}>
						English
					</button>
				</div>
				<button
					className={`toggle-all${noRuby ? "" : " on"}`}
					id="topAction"
					title={noRuby ? lx("注音：关", "Readings: off") : lx("注音：开", "Readings: on")}
					aria-label={noRuby ? lx("注音：关", "Readings: off") : lx("注音：开", "Readings: on")}
					onClick={() => toggleDisplay("ruby")}
				>
					ふ
				</button>
			</header>
			<div className="modewrap">
				<div className="typebar" id="typebar">
					<button data-ty="grammar" className={TYPE === "grammar" ? "on" : ""} onClick={() => goType("grammar")}>
						📘 <span className="lbl">{lx("语法", "Grammar")}</span>
					</button>
					<button data-ty="vocab" className={TYPE === "vocab" ? "on" : ""} onClick={() => goType("vocab")}>
						📗 <span className="lbl">{lx("词汇", "Vocabulary")}</span>
					</button>
					<button data-ty="kanji" className={TYPE === "kanji" ? "on" : ""} onClick={() => goType("kanji")}>
						📙 <span className="lbl">{lx("汉字", "Kanji")}</span>
					</button>
					<button data-ty="reading" className={TYPE === "reading" ? "on" : ""} onClick={() => goType("reading")}>
						📕 <span className="lbl">{lx("读解", "Reading")}</span>
					</button>
					<button data-ty="listening" className={TYPE === "listening" ? "on" : ""} onClick={() => goType("listening")}>
						🎧 <span className="lbl">{lx("听解", "Listening")}</span>
					</button>
				</div>
			</div>
		</div>
	);
}

function goType(ty: TypeKey) {
	if (ty === "reading" || ty === "listening") setModule(ty);
	else setModule(moduleFrom(LEVEL, ty));
	navTo("#/");
}

function weeksOf(ty: TypeKey) {
	const mod = ty === "reading" || ty === "listening" ? ty : moduleFrom(LEVEL, ty);
	const w = (DATA[mod] || cur(mod)).weeks?.length || 0;
	if (!w) return "";
	if (ty === "listening") return lx(w + "章", w + " ch.");
	return lx(w + "周", w + " weeks");
}

function Sidebar({ routeKey, onLevel }: { routeKey: string; onLevel: (lv: LevelKey) => void }) {
	const h = routeKey;
	const LV = LEVEL.toUpperCase();
	const inModule = h === "#/" || h.startsWith("#/day/");
	const types: [TypeKey, string, string][] = [
		["grammar", "📘", lx("语法", "Grammar")],
		["vocab", "📗", lx("词汇", "Vocabulary")],
		["kanji", "📙", lx("汉字", "Kanji")],
		["reading", "📕", lx("读解", "Reading")],
		["listening", "🎧", lx("听解", "Listening")],
	];
	const favCount = Object.keys(FAV).length;
	const row = (go: string, ic: string, label: string, count: string | number | null, on: boolean) => (
		<button className={`side-item ${on ? "on" : ""}`} onClick={() => navTo(go)}>
			<span className="ic">{ic}</span>
			{label}
			{count != null && count !== "" ? <span className="ct">{count}</span> : null}
		</button>
	);
	return (
		<aside className="side" id="side">
			<div className="side-brand">日本語上手</div>
			<div className="side-sec">
				<div className="side-h">{lx("级别", "Level")}</div>
				<div className="side-seg">
					{LEVEL_LIST.map(([lv, name]) => (
						<button key={lv} className={lv === LEVEL ? "on" : ""} onClick={() => onLevel(lv)}>
							{name}
						</button>
					))}
				</div>
			</div>
			<div className="side-sec">
				<div className="side-h">
					{LV} {lx("内容", "Content")}
				</div>
				{types.map(([ty, ic, label]) => (
					<button
						key={ty}
						className={`side-item ${inModule && ty === TYPE ? "on" : ""}`}
						data-gotype={ty}
						onClick={() => goType(ty)}
					>
						<span className="ic">{ic}</span>
						{label}
						<span className="ct">{weeksOf(ty)}</span>
					</button>
				))}
			</div>
			<div className="side-sec">
				<div className="side-h">
					{lx("通用知识", "General reference")} <span className="n">· {lx("不分级别", "All levels")}</span>
				</div>
				{row("#/ref", "📖", lx("接续表", "Connections"), null, h === "#/ref")}
				{row("#/katsuyou", "🔄", lx("活用", "Conjugation"), null, h === "#/katsuyou")}
				{row("#/henkei", "✍️", lx("变形", "Verb forms"), null, h === "#/henkei")}
				{row("#/numbers", "🔢", lx("数字", "Numbers"), null, h === "#/numbers")}
			</div>
			<div className="side-sec">
				<div className="side-h">{lx("本模块", "This module")}</div>
				{row("#/cards", "🗂️", lx("记忆卡", "Flashcards"), null, h === "#/cards")}
				{isGram() && hasContrast(MODULE)
					? row("#/contrast", "🔀", `${LV} ${lx("辨析", "Contrast")}`, null, h === "#/contrast")
					: null}
			</div>
			<div className="side-foot">
				{row("#/search", "🔍", lx("搜索", "Search"), null, h === "#/search")}
				{row("#/mistakes", "📝", lx("错题本", "Mistakes"), MISTAKES.length || "", h === "#/mistakes")}
				{row("#/favs", "⭐", lx("收藏", "Favorites"), favCount || "", h === "#/favs")}
			</div>
		</aside>
	);
}

function Sheet({
	kind,
	onClose,
	onLevel,
}: {
	kind: "level" | "common" | null;
	onClose: () => void;
	onLevel: (lv: LevelKey) => void;
}) {
	if (!kind) return null;
	const levelSubs: Record<string, [string, string]> = { 基础: ["基础", "Foundation"], 进阶: ["进阶", "Intermediate"], 高阶: ["高阶", "Advanced"] };
	return (
		<>
			<div className="sheet-mask" id="sheetMask" onClick={onClose} />
			<div className="sheet" id="sheet" role="dialog" aria-modal="true">
				<div className="sheet-grip" />
				{kind === "level" ? (
					<>
						<div className="sheet-h">
							{lx("选择级别", "Choose a level")}
							<span className="sub">
								{lx("当前", "Current")} · {modLabel()}
							</span>
						</div>
						<div className="sheet-row">
							{LEVEL_LIST.map(([lv, name, sub]) => (
								<button key={lv} className={`sheet-item ${lv === LEVEL ? "on" : ""}`} onClick={() => onLevel(lv)}>
									<span className="ic">{name}</span>
									<span className="sub">{lx(...levelSubs[sub])}</span>
								</button>
							))}
						</div>
					</>
				) : (
					<>
						<div className="sheet-h">
							{lx("通用知识", "General reference")}
							<span className="sub">{lx("不分级别", "All levels")}</span>
						</div>
						<div className="sheet-row">
							<button className="sheet-item" onClick={() => { onClose(); navTo("#/ref"); }}>
								<span className="ic">📖</span>
								{lx("接续表", "Connections")}
							</button>
							<button className="sheet-item" onClick={() => { onClose(); navTo("#/katsuyou"); }}>
								<span className="ic">🔄</span>
								{lx("活用", "Conjugation")}
							</button>
							<button className="sheet-item" onClick={() => { onClose(); navTo("#/henkei"); }}>
								<span className="ic">✍️</span>
								{lx("变形", "Verb forms")}
							</button>
							<button className="sheet-item" onClick={() => { onClose(); navTo("#/numbers"); }}>
								<span className="ic">🔢</span>
								{lx("数字", "Numbers")}
							</button>
						</div>
						<div className="sheet-h">
							{lx("本模块", "This module")}
							<span className="sub">{modLabel()}</span>
						</div>
						<div className="sheet-row">
							<button className="sheet-item scoped" onClick={() => { onClose(); navTo("#/cards"); }}>
								<span className="ic">🗂️</span>
								{lx("记忆卡", "Flashcards")}
							</button>
							{isGram() && hasContrast(MODULE) ? (
								<button className="sheet-item scoped" onClick={() => { onClose(); navTo("#/contrast"); }}>
									<span className="ic">🔀</span>
									{LEVEL.toUpperCase()} {lx("辨析", "Contrast")}
								</button>
							) : (
								<span className="sheet-item" style={{ visibility: "hidden" }} />
							)}
							<span className="sheet-item" style={{ visibility: "hidden" }} />
						</div>
					</>
				)}
			</div>
		</>
	);
}

function BottomNav({ active, onCommon }: { active: string; onCommon: () => void }) {
	const item = (nav: string, ic: string, cn: string, en: string) => (
		<button
			data-nav={nav}
			className={active === nav ? "on" : ""}
			onClick={() => {
				if (nav === "common") onCommon();
				else navTo({ home: "#/", search: "#/search", favs: "#/favs", mistakes: "#/mistakes" }[nav] || "#/");
			}}
		>
			<span className="ic">{ic}</span>
			<span className="lbl">{lx(cn, en)}</span>
		</button>
	);
	return (
		<nav className="bottom">
			{item("home", "📚", "知识库", "Library")}
			{item("search", "🔍", "搜索", "Search")}
			{item("mistakes", "📝", "错题本", "Notes")}
			{item("common", "📐", "通用", "General")}
			{item("favs", "⭐", "收藏", "Favorites")}
		</nav>
	);
}

function SelectionPopover({ routeKey }: { routeKey: string }) {
	const [state, setState] = useState<{ text: string; type: string; left: number; top: number; saved: boolean } | null>(null);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | null = null;
		const hide = () => setState(null);
		const normalize = (t: string) => String(t || "").replace(/\s+/g, " ").trim();
		const inApp = (sel: Selection | null) => {
			if (!sel || !sel.rangeCount || sel.isCollapsed) return false;
			const range = sel.getRangeAt(0);
			const node = range.commonAncestorContainer;
			const el = node && (node.nodeType === 1 ? (node as Element) : node.parentElement);
			const roots = [document.querySelector("#app"), document.querySelector("#common-page")];
			return roots.some((root) => !!(el && root?.contains(el)) || !!(root && range.intersectsNode && range.intersectsNode(root)));
		};
		const maybeShow = () => {
			requestAnimationFrame(() => {
				const sel = document.getSelection();
				const text = normalize(sel ? sel.toString() : "");
				if (!text || !inApp(sel)) {
					setState((cur) => (cur?.saved ? cur : null));
					return;
				}
				const rect = sel!.getRangeAt(0).getBoundingClientRect();
				if (!(rect.width || rect.height)) return;
				const width = 260;
				const height = 160;
				const pad = 12;
				const left = Math.max(pad, Math.min(window.innerWidth - width - pad, rect.left + (rect.width - width) / 2));
				const above = rect.top - height - 10;
				const top = above >= pad ? above : Math.min(window.innerHeight - height - pad, rect.bottom + 10);
				setState({ text, type: "word", left: Math.round(left), top: Math.max(pad, Math.round(top)), saved: false });
			});
		};
		const queue = () => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(maybeShow, 48);
		};
		const onPointerDown = (e: PointerEvent) => {
			if (!(e.target as Element).closest?.("#selectionPopover")) hide();
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") hide();
			else if (e.shiftKey || e.key === "ArrowLeft" || e.key === "ArrowRight") queue();
		};
		document.addEventListener("selectionchange", queue);
		document.addEventListener("pointerup", queue, true);
		document.addEventListener("mouseup", queue, true);
		document.addEventListener("touchend", queue, true);
		document.addEventListener("keyup", onKey);
		document.addEventListener("pointerdown", onPointerDown, true);
		window.addEventListener("scroll", hide, { passive: true });
		return () => {
			if (timer) clearTimeout(timer);
			document.removeEventListener("selectionchange", queue);
			document.removeEventListener("pointerup", queue, true);
			document.removeEventListener("mouseup", queue, true);
			document.removeEventListener("touchend", queue, true);
			document.removeEventListener("keyup", onKey);
			document.removeEventListener("pointerdown", onPointerDown, true);
			window.removeEventListener("scroll", hide);
		};
	}, [routeKey]);

	if (!state) return null;
	const types = Object.entries(
		{
			newword: lx("生词", "New word"),
			word: lx("单词", "Word"),
			sentence: lx("句子", "Sentence"),
			q: lx("错题", "Mistake"),
			grammar: lx("语法", "Grammar"),
		} as Record<string, string>,
	);
	return (
		<div
			id="selectionPopover"
			className="selection-popover"
			role="dialog"
			aria-label={lx("收藏划词", "Save selected text")}
			style={{ left: state.left, top: state.top, position: "fixed" }}
		>
			<div className="selection-popover__title">{lx("收藏到生词本", "Save to word book")}</div>
			<div className="selection-popover__text">{state.text}</div>
			<div className="selection-popover__types">
				{types.map(([k, label]) => (
					<button key={k} type="button" className={k === state.type ? "on" : ""} onClick={() => setState({ ...state, type: k })}>
						{label}
					</button>
				))}
			</div>
			<div className="selection-popover__actions">
				<button type="button" onClick={() => setState(null)}>
					{lx("取消", "Cancel")}
				</button>
				<button
					type="button"
					className="primary"
					disabled={state.saved}
					onClick={async () => {
						const { saveSelectionFav } = await import("./store");
						saveSelectionFav(state.type, state.text, routeKey);
						setState({ ...state, saved: true });
						try {
							document.getSelection()?.removeAllRanges();
						} catch {
							/* ignore */
						}
						setTimeout(() => setState(null), 700);
					}}
				>
					{state.saved ? lx("已收藏", "Saved") : lx("收藏", "Save")}
				</button>
			</div>
		</div>
	);
}

function TrialLock() {
	return (
		<section className="trial-lock-card">
			<span className="trial-lock-card__eyebrow">TRIAL COMPLETE</span>
			<h2>这一部分将在完整课程中开放</h2>
			<p>你可以先完整体验 N3 第一周：每天的讲解、例句、练习、答案与收藏都可以使用。</p>
			<a href="/#contents">查看课程内容</a>
		</section>
	);
}

function viewMeta(key: string): { nav: string; title: string; back: boolean } {
	if (key === "#/search") return { nav: "search", title: lx("搜索（语法 + 词汇 + 读解）", "Search (Grammar + Vocabulary + Reading)"), back: false };
	if (key === "#/cards") return { nav: "common", title: `${lx("记忆卡", "Flashcards")} · ${modLabel()}`, back: false };
	if (key === "#/favs")
		return {
			nav: "favs",
			title: showingFavFc ? lx("收藏 · 闪卡", "Favorites · Flashcards") : lx("收藏 · 生词本", "Favorites · Word Book"),
			back: false,
		};
	if (key === "#/mistakes") return { nav: "mistakes", title: lx("错题 / 生词本", "My Mistakes & Notes"), back: false };
	if (key === "#/ref") return { nav: "common", title: lx("接续表示法 · 接続の表示方法", "Connection Notation"), back: true };
	if (key === "#/katsuyou") return { nav: "common", title: lx("活用一覧 · 敬語レベルと活用形", "Conjugation: Politeness Levels & Verb Forms"), back: true };
	if (key === "#/henkei") return { nav: "common", title: lx("動詞の変形ルール · 音便と組み合わせ", "Verb Conjugation Rules"), back: true };
	if (key === "#/numbers") return { nav: "common", title: lx("数字表达", "Number Expressions"), back: true };
	if (key === "#/contrast") return { nav: "common", title: lx("语法辨析 · " + LEVEL.toUpperCase(), "Grammar Contrast · " + LEVEL.toUpperCase()), back: true };
	const day = parseDayRoute(key);
	if (day) {
		if (isListening()) return { nav: "home", title: lx(`第${day.w}章 ${day.d}节`, `Ch. ${day.w} §${day.d}`), back: true };
		return { nav: "home", title: lx(`第${day.w}週 ${day.d}日目`, `Week ${day.w} Day ${day.d}`), back: true };
	}
	return { nav: "home", title: modLabel(), back: false };
}

export function StudyApp() {
	const tick = useStudyTick();
	const location = useLocation();
	const navigate = useNavigate();
	const [booted, setBooted] = useState(false);
	const [sheet, setSheet] = useState<"level" | "common" | null>(null);
	const [lastView, setLastView] = useState("");
	const isTrial = typeof window !== "undefined" && new URLSearchParams(location.search).get("trial") === "1";

	useEffect(() => {
		hydrateFromStorage();
		if (isTrial) setModule("grammar");
		setNavImpl((key) => {
			const path = keyToPath(key);
			const next = path + (isTrial ? "?trial=1" : "");
			if (window.location.pathname === path) return;
			navigate(next);
		});
		window.__studyAfterPaint = () => {
			updateStickyVars();
			updateNumNavActive();
		};
		window.__studySay = say;
		setBooted(true);
		bootStudyData();
		return attachResync();
	}, []);

	useEffect(() => {
		if (location.hash.indexOf("#/") === 0) {
			navigate(keyToPath(location.hash) + location.search, { replace: true });
		}
	}, [location.hash, navigate]);

	useEffect(() => {
		const mode = new URLSearchParams(location.search).get("module");
		if (mode === "reading" || mode === "listening") {
			setModule(mode);
			window.history.replaceState({}, "", location.pathname + (isTrial ? "?trial=1" : ""));
			navTo(entryHash(mode));
		}
	}, [location.search]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && sheet) {
				setSheet(null);
				return;
			}
			if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			const t = e.target as HTMLElement | null;
			const tag = t && t.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable) return;
			const day = parseDayRoute(pathToKey(location.pathname));
			if (!day) return;
			const n = dayNeighbors(day.w, day.d)[e.key === "ArrowLeft" ? "prev" : "next"];
			if (n) {
				e.preventDefault();
				navTo(`#/day/${n[0]}-${n[1]}`);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [location.pathname, sheet]);

	const routeKey = pathToKey(location.pathname);
	if (routeKey !== "#/favs") closeFavFc();
	const viewKey = MODULE + "|" + routeKey + "|" + tick;
	useLayoutEffect(() => {
		if (viewKey !== lastView) {
			window.scrollTo(0, 0);
			setLastView(viewKey);
		}
		if (routeKey === "#/") saveLastVisit("#/");
		const day = parseDayRoute(routeKey);
		if (day) saveLastVisit(`#/day/${day.w}-${day.d}`);
		if (routeKey === "#/cards") ensureCardsDeck();
		if (routeKey === "#/contrast" && MODULE !== contrastModule()) setModule(contrastModule());
		updateStickyVars();
		updateNumNavActive();
	});

	useEffect(() => {
		const onScroll = () => {
			window.requestAnimationFrame(updateNumNavActive);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", updateStickyVars);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", updateStickyVars);
		};
	}, []);

	const meta = viewMeta(routeKey);
	const day = parseDayRoute(routeKey);
	const commonPages = ["#/search", "#/cards", "#/favs", "#/mistakes", "#/ref", "#/katsuyou", "#/henkei", "#/numbers"];
	const isCommon = commonPages.includes(routeKey) || routeKey === "#/";
	if (routeKey === "#/cards") ensureCardsDeck();

	const waitingN2 = isN2() && !n2Loaded;
	const waitingN4 = isN4() && !n4Loaded;
	const waitingSearch = routeKey === "#/search" && !n2Loaded;
	const weekLocked = isTrial && day && (LEVEL !== "n3" || day.w !== 1);
	const homeLocked = isTrial && LEVEL !== "n3";

	const pickLevel = (lv: LevelKey) => {
		setSheet(null);
		if (isTrial && lv !== "n3") return;
		const ty = TYPE === "reading" || TYPE === "listening" ? (lv === "n3" ? TYPE : "grammar") : TYPE;
		const mod = moduleFrom(lv, ty);
		setModule(mod);
		navTo(entryHash(mod));
	};

	const homeData = { weeks: cur().weeks || [], intro: homeIntro(), lang: LANG, scale: homeScale() as "week" | "chapter" };

	let body: React.ReactNode = null;
	if (!dataLoaded) body = <div className="empty">{loadError || "加载中…"}</div>;
	else if (waitingN2) body = <div className="empty">N2 数据加载中，请稍候…</div>;
	else if (waitingN4) body = <div className="empty">N4 数据加载中，请稍候…</div>;
	else if (waitingSearch) body = <div className="empty">词典数据加载中，马上就好…</div>;
	else if (weekLocked || homeLocked) body = <TrialLock />;
	else if (day && isReading()) body = <ReadingN3Content week={day.w} day={day.d} embedded />;
	else if (day && isListening()) body = <ListeningN3Content chapter={day.w} section={day.d} embedded />;
	else if (day) body = <DayPage w={day.w} d={day.d} token={day.token} />;
	else if (routeKey === "#/contrast") body = <ContrastPage />;
	else if (routeKey === "#/")
		body = isTrial ? (
			<>
				<HomePage data={{ ...homeData, weeks: homeData.weeks.filter((w: any) => w.n === 1) }} />
				<section className="trial-week-lock">
					<b>第一周体验完成后</b>
					<span>完整课程将按你的学习进度继续开放。</span>
					<a href="/#contents">查看课程内容 →</a>
				</section>
			</>
		) : (
			<HomePage data={homeData} />
		);
	else if (routeKey === "#/search") body = <SearchPage />;
	else if (routeKey === "#/cards") body = <CardsPage />;
	else if (routeKey === "#/favs") body = showingFavFc ? <FavFcPage data={favFcPayload()} /> : <FavsPage data={favsPayload()} />;
	else if (routeKey === "#/mistakes") body = <MistakesPage data={mistakesPayload()} />;
	else if (routeKey === "#/ref") body = DATA.common ? <RefPage data={DATA.common} /> : <div className="empty">通用参考数据加载中，请稍候…</div>;
	else if (routeKey === "#/katsuyou") body = DATA.common ? <KatsuyouPage data={DATA.common} /> : <div className="empty">通用参考数据加载中，请稍候…</div>;
	else if (routeKey === "#/henkei") body = DATA.common ? <HenkeiPage data={DATA.common} /> : <div className="empty">通用参考数据加载中，请稍候…</div>;
	else if (routeKey === "#/numbers") body = DATA.common ? <NumbersPage data={DATA.common} /> : <div className="empty">通用参考数据加载中，请稍候…</div>;
	else body = <HomePage data={homeData} />;

	const showCommon = isCommon && !day && routeKey !== "#/contrast";
	const lessonShell = Boolean(day && (isReading() || isListening()));
	void booted;

	return (
		<>
			{isTrial ? (
				<div className="trial-context">
					<span>免费试学</span>
					<b>N3 第一周已开放</b>
					<a href="/">了解完整课程</a>
				</div>
			) : null}
			<Header title={meta.title} showBack={meta.back} onBack={() => (history.length > 1 ? navigate(-1) : navTo("#/"))} onOpenLevel={() => setSheet("level")} />
			<Sidebar routeKey={routeKey} onLevel={pickLevel} />
			<main id="app" className={lessonShell ? "study-reading-app" : undefined} hidden={showCommon}>
				{showCommon ? null : body}
			</main>
			{showCommon ? <main id="common-page">{body}</main> : null}
			<BottomNav active={meta.nav} onCommon={() => setSheet("common")} />
			<Sheet kind={sheet} onClose={() => setSheet(null)} onLevel={pickLevel} />
			<SelectionPopover routeKey={routeKey} />
		</>
	);
}
