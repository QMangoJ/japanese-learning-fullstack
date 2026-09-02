import henkeiFallback from "../data/common-henkei.json";
import jitaFallback from "../data/common-jita.json";
import kougoFallback from "../data/common-kougo.json";
import wearingFallback from "../data/common-wearing.json";
import { listeningBundle, listeningN2Bundle, readingBundle, readingN2Bundle } from "./catalogs";

export type ModuleKey =
	| "grammar"
	| "vocab"
	| "kanji"
	| "reading"
	| "listening"
	| "n2grammar"
	| "n2vocab"
	| "n2kanji"
	| "n2reading"
	| "n2listening"
	| "n4grammar"
	| "n4vocab"
	| "n4kanji";

export type LevelKey = "n2" | "n3" | "n4";
export type TypeKey = "grammar" | "vocab" | "kanji" | "reading" | "listening";
export type Lang = "cn" | "en";
export type Theme = "light" | "dark";

export type FavSnap = {
	module: string;
	hash: string;
	w: string | number;
	d: string | number;
	jp: string;
	cn: string;
	kind?: string;
	selectionType?: string;
	ts?: number;
};

export type Mistake = {
	id: string;
	type: string;
	text: string;
	ts: number;
	level: string;
	deleted?: boolean;
};

export const STUDY_BASE = "/study";
export const LEVEL_LIST: [LevelKey, string, string][] = [
	["n4", "N4", "基础"],
	["n3", "N3", "进阶"],
	["n2", "N2", "高阶"],
];
export const MODLABELS: Record<ModuleKey, [string, string]> = {
	grammar: ["N3 语法", "N3 Grammar"],
	n2grammar: ["N2 语法", "N2 Grammar"],
	vocab: ["N3 词汇", "N3 Vocabulary"],
	kanji: ["N3 汉字", "N3 Kanji"],
	reading: ["N3 读解", "N3 Reading"],
	listening: ["N3 听解", "N3 Listening"],
	n2vocab: ["N2 词汇", "N2 Vocabulary"],
	n2kanji: ["N2 汉字", "N2 Kanji"],
	n2reading: ["N2 读解", "N2 Reading"],
	n2listening: ["N2 听解", "N2 Listening"],
	n4grammar: ["N4 语法", "N4 Grammar"],
	n4vocab: ["N4 词汇", "N4 Vocabulary"],
	n4kanji: ["N4 汉字", "N4 Kanji"],
};
export const BOOK_TITLE: Record<ModuleKey, [string, string]> = {
	grammar: ["N3语法训练", "JLPT Prep N3 Grammar"],
	n2grammar: ["N2语法训练", "JLPT Prep N2 Grammar"],
	vocab: ["N3词汇训练", "JLPT Prep N3 Vocabulary"],
	kanji: ["N3汉字训练", "JLPT Prep N3 Kanji"],
	reading: ["N3读解训练", "JLPT Prep N3 Reading"],
	listening: ["N3听解训练", "JLPT Prep N3 Listening"],
	n2vocab: ["N2词汇训练", "JLPT Prep N2 Vocabulary"],
	n2kanji: ["N2汉字训练", "JLPT Prep N2 Kanji"],
	n2reading: ["N2读解训练", "JLPT Prep N2 Reading"],
	n2listening: ["N2听解训练", "JLPT Prep N2 Listening"],
	n4grammar: ["N4语法训练", "JLPT Prep N4 Grammar"],
	n4vocab: ["N4词汇训练", "JLPT Prep N4 Vocabulary"],
	n4kanji: ["N4汉字训练", "JLPT Prep N4 Kanji"],
};
export const MODULES: ModuleKey[] = [
	"grammar",
	"vocab",
	"kanji",
	"reading",
	"listening",
	"n2grammar",
	"n2vocab",
	"n2kanji",
	"n2reading",
	"n2listening",
	"n4grammar",
	"n4vocab",
	"n4kanji",
];
export const MISTAKE_TYPES: Record<string, string> = { q: "错题", word: "单词", grammar: "语法" };
export const MISTAKE_LEVELS: Record<string, string> = { new: "不熟", mid: "一般", done: "已掌握" };
export const MISTAKE_LEVEL_ORDER = ["new", "mid", "done"];
export const SELECTION_FAV_TYPES: Record<string, [string, string]> = {
	newword: ["生词", "New word"],
	word: ["单词", "Word"],
	sentence: ["句子", "Sentence"],
	q: ["错题", "Mistake"],
	grammar: ["语法", "Grammar"],
};
export const FAV_MOD_ORDER = [
	"grammar",
	"n2grammar",
	"n4grammar",
	"vocab",
	"n2vocab",
	"n4vocab",
	"kanji",
	"n2kanji",
	"n4kanji",
	"reading",
	"n2reading",
	"listening",
	"n2listening",
	"selection",
];
export const FAV_MOD_LABEL: Record<string, string> = {
	grammar: "N3语法",
	n2grammar: "N2语法",
	n4grammar: "N4语法",
	vocab: "N3词汇",
	n2vocab: "N2词汇",
	n4vocab: "N4词汇",
	kanji: "N3汉字",
	n2kanji: "N2汉字",
	n4kanji: "N4汉字",
	reading: "N3读解",
	n2reading: "N2读解",
	listening: "N3听解",
	n2listening: "N2听解",
	selection: "划词收藏",
};

const DATA_FILES: Record<string, string> = {
	grammar: "grammar.d15be04258.json",
	kanji: "kanji.e43232869e.json",
	vocab: "vocab.856eb48e32.json",
	n2grammar: "n2grammar.4e6157570a.json",
	n2vocab: "n2vocab.4e440284d9.json",
	n2kanji: "n2kanji.d9739ca8d4.json",
	n4grammar: "n4grammar.40e138ccdb.json",
	n4vocab: "n4vocab.026f711eb7.json",
	n4kanji: "n4kanji.655356d8e2.json",
	common: "common.aa13cae172.json",
};

const MOD2LT: Record<ModuleKey, [LevelKey, TypeKey]> = {
	grammar: ["n3", "grammar"],
	vocab: ["n3", "vocab"],
	kanji: ["n3", "kanji"],
	reading: ["n3", "reading"],
	listening: ["n3", "listening"],
	n2grammar: ["n2", "grammar"],
	n2vocab: ["n2", "vocab"],
	n2kanji: ["n2", "kanji"],
	n2reading: ["n2", "reading"],
	n2listening: ["n2", "listening"],
	n4grammar: ["n4", "grammar"],
	n4vocab: ["n4", "vocab"],
	n4kanji: ["n4", "kanji"],
};
const LT2MOD: Record<string, ModuleKey> = {
	"n3:grammar": "grammar",
	"n3:vocab": "vocab",
	"n3:kanji": "kanji",
	"n3:reading": "reading",
	"n3:listening": "listening",
	"n2:grammar": "n2grammar",
	"n2:vocab": "n2vocab",
	"n2:kanji": "n2kanji",
	"n2:reading": "n2reading",
	"n2:listening": "n2listening",
	"n4:grammar": "n4grammar",
	"n4:vocab": "n4vocab",
	"n4:kanji": "n4kanji",
};

const listeners = new Set<() => void>();
const displayListeners = new Set<() => void>();
let version = 0;
let displayVersion = 0;
export function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
export function getVersion() {
	return version;
}
export function subscribeDisplay(listener: () => void) {
	displayListeners.add(listener);
	return () => displayListeners.delete(listener);
}
export function getDisplayVersion() {
	return displayVersion;
}
function emitDisplay() {
	displayVersion += 1;
	displayListeners.forEach((fn) => fn());
}
export function emit() {
	version += 1;
	listeners.forEach((fn) => fn());
	emitDisplay();
}

function lsGet(key: string, fallback: string) {
	try {
		return localStorage.getItem(key) ?? fallback;
	} catch {
		return fallback;
	}
}
function lsSet(key: string, value: string) {
	try {
		localStorage.setItem(key, value);
	} catch {
		/* ignore quota / private mode */
	}
}
function lsJson<T>(key: string, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		if (raw == null) return fallback;
		return (JSON.parse(raw) as T) ?? fallback;
	} catch {
		return fallback;
	}
}

export let MODULE: ModuleKey = "grammar";
export let LANG: Lang = "cn";
export let THEME: Theme = "light";
export let LEVEL: LevelKey = "n3";
export let TYPE: TypeKey = "grammar";
export let DATA: Record<string, any> = {};
export let dataLoaded = false;
export let n2Loaded = false;
export let n4Loaded = false;
export let loadError = "";
export let lastVisit: Record<string, string> = {};
export let lastDay: Record<string, string> = {};
export type PublicUser = {
	id: string;
	email: string;
	name: string;
	picture: string;
};

export let FAV: Record<string, FavSnap> = {};
export const FAVMETA: Record<string, FavSnap> = {};
export let MISTAKES: Mistake[] = [];
export let ACCOUNT: PublicUser | null = null;
export let accountReady = false;
export let authConfigured = false;
export type AccountFeature = "favs" | "mistakes";
export type LoginPrompt = { reason: AccountFeature; next: string } | null;
export let LOGIN_PROMPT: LoginPrompt = null;
export let loginSuggestDismissed = false;
export let noRuby = false;
export let hideJp = false;
export let hideCn = false;
export let studyHideJapanese = false;
export let studyHideTranslation = false;
export let mistakeAddType = "q";
export let mistakeFilter = "all";
export let mistakeLevelFilter = "all";
export let mistakeDraft = "";
export let mistakeStudyMode = false;
export let favStudyMode = false;
export let favFilter = "all";
export let favSelectionFilter = "all";
export let favDeck: { jp: string; cn: string }[] = [];
export let favIdx = 0;
export let favFlip = false;
export let showingFavFc = false;
export let ctMode: "family" | "week" = "family";
export let ctWeek = 1;
export const openWeeks: Record<string, Set<number>> = {};

const emptyBundle = { weeks: [] as any[] };
export let G: any = emptyBundle;
export let V: any = emptyBundle;
export let K: any = emptyBundle;
export let G2: any = emptyBundle;
export let V2: any = emptyBundle;
export let K2: any = emptyBundle;
export let G4: any = emptyBundle;
export let V4: any = emptyBundle;
export let K4: any = emptyBundle;
export let R: any = readingBundle();
export let R2: any = readingN2Bundle();
export let L: any = listeningBundle();
export let L2: any = listeningN2Bundle();
DATA.reading = R;
DATA.n2reading = R2;
DATA.listening = L;
DATA.n2listening = L2;

export let fc: { week: number; deck: any[]; idx: number; flipped: boolean } = {
	week: 0,
	deck: [],
	idx: 0,
	flipped: false,
};

let searchIndex: any[] | null = null;
let jaVoice: SpeechSynthesisVoice | null = null;
let _favSyncing = false;
let _favPushTimer: ReturnType<typeof setTimeout> | null = null;
let _favReady = false;
let _favPendingPush = false;
let _mistakeSyncing = false;
let _mistakePushTimer: ReturnType<typeof setTimeout> | null = null;
let _mistakesReady = false;
let _mistakesPendingPush = false;
let _resyncingM = false;
let _resyncingF = false;
let navImpl: (key: string) => void = () => {};

export function setNavImpl(fn: (key: string) => void) {
	navImpl = fn;
	if (typeof window !== "undefined") window.__studyNav = (key) => fn(key);
}
export function navTo(key: string) {
	navImpl(key);
}

export function keyToPath(key: string) {
	const k = String(key || "#/").replace(/^#/, "");
	return k === "/" ? STUDY_BASE : STUDY_BASE + k;
}
export function pathToKey(pathname: string) {
	if (!pathname.startsWith(STUDY_BASE)) return "#/";
	const rest = pathname.slice(STUDY_BASE.length).replace(/\/+$/, "");
	return rest ? "#" + rest : "#/";
}

export function lx(cn?: string, en?: string) {
	return LANG === "en" && en ? en : cn || "";
}
export function isGram(mod: string = MODULE) {
	return mod === "grammar" || mod === "n2grammar" || mod === "n4grammar";
}
export function isKanji(mod: string = MODULE) {
	return mod === "kanji" || mod === "n2kanji" || mod === "n4kanji";
}
export function isVocab(mod: string = MODULE) {
	return mod === "vocab" || mod === "n2vocab" || mod === "n4vocab";
}
export function isN2(mod: string = MODULE) {
	return mod.startsWith("n2");
}
export function isN4(mod: string = MODULE) {
	return mod.startsWith("n4");
}
export function isReading(mod: string = MODULE) {
	return mod === "reading" || mod === "n2reading";
}
export function isListening(mod: string = MODULE) {
	return mod === "listening" || mod === "n2listening";
}
export function moduleFrom(lv: string, ty: string): ModuleKey {
	if (ty === "reading") return LT2MOD[`${lv}:reading`] || LT2MOD[`${lv}:grammar`] || "grammar";
	if (ty === "listening") return LT2MOD[`${lv}:listening`] || "listening";
	return LT2MOD[`${lv}:${ty}`] || "grammar";
}
export function deriveLT() {
	const pair = MOD2LT[MODULE] || ["n3", "grammar"];
	LEVEL = pair[0];
	TYPE = pair[1];
}
export function cur(mod: string = MODULE) {
	return (
		{
			vocab: V,
			n2grammar: G2,
			kanji: K,
			n2vocab: V2,
			n2kanji: K2,
			n2reading: R2,
			n2listening: L2,
			n4grammar: G4,
			n4vocab: V4,
			n4kanji: K4,
			reading: R,
			listening: L,
		}[mod] || G
	);
}
export function modLabel(mod: ModuleKey = MODULE) {
	return lx(...MODLABELS[mod]);
}
export function findDay(w: number, d: number, mod: string = MODULE) {
	const wk = cur(mod).weeks?.find((x: any) => x.n === w);
	return wk ? wk.days.find((x: any) => x.day === d) : null;
}
export function hasContrast(mod: string = MODULE) {
	return !!cur(mod).contrast;
}
export function contrastModule() {
	if (isGram() && hasContrast(MODULE)) return MODULE;
	const same = moduleFrom(LEVEL, "grammar");
	return hasContrast(same) ? same : "grammar";
}
export function entryHash(mod: string) {
	return lastVisit[mod] || "#/";
}
export function saveLastVisit(hash: string) {
	lastVisit[MODULE] = hash;
	if (hash.startsWith("#/day/")) {
		lastDay[MODULE] = hash;
		lsSet("lastDay", JSON.stringify(lastDay));
	}
	lsSet("lastVisit", JSON.stringify(lastVisit));
}
export function setModule(m: ModuleKey) {
	MODULE = m;
	lsSet("module", m);
	fc = { week: 0, deck: [], idx: 0, flipped: false };
	showingFavFc = false;
	deriveLT();
	emit();
}
export function setLang(lang: Lang) {
	LANG = lang;
	lsSet("lang", lang);
	if (typeof document !== "undefined") document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
	emit();
}
export function typeForLevel(lv: LevelKey, ty: TypeKey): TypeKey {
	if (ty === "reading" && lv !== "n3" && lv !== "n2") return "grammar";
	if (ty === "listening" && lv !== "n3" && lv !== "n2") return "grammar";
	return ty;
}
export function applyDisplayClasses() {
	if (typeof document === "undefined") return;
	document.body.classList.toggle("no-ruby", noRuby);
	document.body.classList.toggle("hide-jp", hideJp);
	document.body.classList.toggle("hide-cn", hideCn);
}

function systemTheme(): Theme {
	if (typeof window === "undefined") return "light";
	try {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	} catch {
		return "light";
	}
}

export function applyTheme() {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	root.classList.toggle("theme-dark", THEME === "dark");
	root.classList.toggle("theme-light", THEME === "light");
	root.style.colorScheme = THEME;
	const meta = document.querySelector('meta[name="theme-color"]');
	if (meta) meta.setAttribute("content", THEME === "dark" ? "#1c1a16" : "#f6f7f9");
}

const THEME_FADE_MS = 180;
let themeFadeTimer: ReturnType<typeof setTimeout> | null = null;

function prefersReducedMotion() {
	if (typeof window === "undefined") return true;
	try {
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	} catch {
		return false;
	}
}

function beginThemeTransition() {
	if (typeof document === "undefined" || prefersReducedMotion()) return;
	const root = document.documentElement;
	root.classList.add("theme-switching");
	if (themeFadeTimer) clearTimeout(themeFadeTimer);
	themeFadeTimer = setTimeout(() => {
		root.classList.remove("theme-switching");
		themeFadeTimer = null;
	}, THEME_FADE_MS + 40);
}

export function setTheme(theme: Theme) {
	const changed = THEME !== theme;
	THEME = theme;
	lsSet("theme", theme);
	if (changed) beginThemeTransition();
	applyTheme();
	emit();
}

export function toggleTheme() {
	setTheme(THEME === "dark" ? "light" : "dark");
}
export function toggleDisplay(kind: "ruby" | "jp" | "cn") {
	const y = typeof window !== "undefined" ? window.scrollY : 0;
	if (kind === "ruby") {
		noRuby = !noRuby;
		lsSet("noruby", noRuby ? "1" : "0");
	} else if (kind === "jp") {
		hideJp = !hideJp;
		lsSet("hidejp", hideJp ? "1" : "0");
	} else {
		hideCn = !hideCn;
		lsSet("hidecn", hideCn ? "1" : "0");
	}
	applyDisplayClasses();
	// Display flags are CSS-only. Re-rendering the whole study tree (emit)
	// remounts the day page and jumps scroll, so only the toggle buttons listen.
	emitDisplay();
	if (typeof window !== "undefined") {
		window.scrollTo(0, y);
		requestAnimationFrame(() => window.scrollTo(0, y));
	}
}

export function openWeekSet() {
	if (!openWeeks[MODULE]) {
		const match = (lastDay[MODULE] || "").match(/^#\/day\/(\d+)-/);
		const first = cur().weeks?.[0]?.n || 1;
		openWeeks[MODULE] = new Set([match ? +match[1] : first]);
	}
	return openWeeks[MODULE];
}
export function toggleWeek(n: number) {
	const set = openWeekSet();
	if (set.has(n)) set.delete(n);
	else set.add(n);
}
export function jumpWeek(n: number) {
	openWeekSet().add(n);
}

export function dayChain(mod: string = MODULE) {
	const out: [number, number, any][] = [];
	for (const wk of cur(mod).weeks || []) for (const dy of wk.days) out.push([wk.n, dy.day, dy]);
	return out;
}
export function dayNeighbors(w: number, d: number, mod: string = MODULE) {
	const chain = dayChain(mod);
	const i = chain.findIndex((x) => x[0] === w && x[1] === d);
	if (i < 0) return {};
	return { prev: i > 0 ? chain[i - 1] : null, next: i < chain.length - 1 ? chain[i + 1] : null };
}

function cleanMistakes(arr: any): Mistake[] {
	return Array.isArray(arr)
		? arr
				.filter((m) => m && typeof m.id === "string" && m.id)
				.map((m) => (MISTAKE_LEVELS[m.level] ? m : { ...m, level: "new" }))
		: [];
}
function activeMistakes() {
	return MISTAKES.filter((m) => !m.deleted);
}
function pushMistakesNow() {
	if (!ACCOUNT) return;
	fetch("/api/mistakes", {
		method: "PUT",
		headers: { "content-type": "application/json" },
		credentials: "same-origin",
		body: JSON.stringify(MISTAKES),
	}).catch(() => {});
}
export function saveMistakes() {
	lsSet("mistakes", JSON.stringify(MISTAKES));
	if (_mistakeSyncing) return;
	if (!_mistakesReady) {
		_mistakesPendingPush = true;
		return;
	}
	if (_mistakePushTimer) clearTimeout(_mistakePushTimer);
	_mistakePushTimer = setTimeout(() => {
		_mistakePushTimer = null;
		pushMistakesNow();
	}, 400);
}
export function needsAccount() {
	return accountReady && authConfigured && !ACCOUNT;
}

export function shouldSuggestLogin() {
	return needsAccount() && !loginSuggestDismissed && !LOGIN_PROMPT;
}

export function dismissLoginSuggest() {
	if (loginSuggestDismissed) return;
	loginSuggestDismissed = true;
	lsSet("loginSuggestDismissed", "1");
	emit();
}

export function closeLoginPrompt() {
	if (!LOGIN_PROMPT) return;
	LOGIN_PROMPT = null;
	emit();
}

export function googleLoginHref(next?: string) {
	const path = next || LOGIN_PROMPT?.next || "/study";
	return `/auth/google?next=${encodeURIComponent(path)}`;
}

export function requestAccount(reason: AccountFeature, next?: string) {
	if (!needsAccount()) return true;
	if (!loginSuggestDismissed) {
		loginSuggestDismissed = true;
		lsSet("loginSuggestDismissed", "1");
	}
	LOGIN_PROMPT = {
		reason,
		next: next || (reason === "favs" ? "/study/favs" : "/study/mistakes"),
	};
	emit();
	return false;
}

export function goAccountPage(key: "#/favs" | "#/mistakes") {
	const reason: AccountFeature = key === "#/favs" ? "favs" : "mistakes";
	if (!requestAccount(reason, keyToPath(key))) return;
	navTo(key);
}

export function addMistake(type: string, text: string) {
	const value = (text || "").trim();
	if (!value) return;
	if (!requestAccount("mistakes", "/study/mistakes")) return;
	MISTAKES.unshift({
		id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
		type,
		text: value,
		ts: Date.now(),
		level: "new",
	});
	saveMistakes();
	emit();
}
export function deleteMistake(id: string) {
	const entry = MISTAKES.find((m) => m.id === id);
	if (entry) {
		entry.deleted = true;
		entry.ts = entry.ts || Date.now();
	} else {
		MISTAKES.push({ id, deleted: true, ts: Date.now(), type: "q", text: "", level: "new" });
	}
	saveMistakes();
	emit();
}
export function cycleMistakeLevel(id: string) {
	const item = MISTAKES.find((x) => x.id === id);
	if (!item) return;
	const i = MISTAKE_LEVEL_ORDER.indexOf(item.level);
	item.level = MISTAKE_LEVEL_ORDER[(i + 1) % MISTAKE_LEVEL_ORDER.length];
	saveMistakes();
	emit();
}

function pushFavsNow() {
	if (!ACCOUNT) return;
	fetch("/api/favorites", {
		method: "PUT",
		headers: { "content-type": "application/json" },
		credentials: "same-origin",
		body: JSON.stringify(FAV),
	}).catch(() => {});
}
export function saveFav() {
	lsSet("favs", JSON.stringify(FAV));
	if (_favSyncing) return;
	if (!_favReady) {
		_favPendingPush = true;
		return;
	}
	if (_favPushTimer) clearTimeout(_favPushTimer);
	_favPushTimer = setTimeout(() => {
		_favPushTimer = null;
		pushFavsNow();
	}, 400);
}
export function isFav(id: string) {
	return !!FAV[id];
}
export function registerFavMeta(id: string, snap: FavSnap) {
	FAVMETA[id] = snap;
}
export function toggleFav(id: string) {
	if (!requestAccount("favs", "/study/favs")) return;
	if (FAV[id]) delete FAV[id];
	else if (FAVMETA[id]) FAV[id] = { ...FAVMETA[id], ts: Date.now() };
	saveFav();
	emit();
}
export function saveSelectionFav(type: string, text: string, hash: string) {
	if (!requestAccount("favs", "/study/favs")) return "";
	const id = selectionFavId(type, text);
	FAV[id] = {
		module: "selection",
		selectionType: type,
		hash,
		w: "",
		d: "",
		jp: text,
		cn: `划词收藏 · ${SELECTION_FAV_TYPES[type][0]}`,
		ts: Date.now(),
	};
	saveFav();
	emit();
	return id;
}
export function selectionFavId(type: string, text: string) {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return `selection#${type}#${(h >>> 0).toString(36)}#${text.length}`;
}

export function mistakesPayload() {
	const src = activeMistakes();
	const byType = mistakeFilter === "all" ? src : src.filter((m) => m.type === mistakeFilter);
	const list = mistakeLevelFilter === "all" ? byType : byType.filter((m) => (m.level || "new") === mistakeLevelFilter);
	const typeCounts: Record<string, number> = { all: src.length };
	Object.keys(MISTAKE_TYPES).forEach((k) => {
		typeCounts[k] = src.filter((m) => m.type === k).length;
	});
	const levelCounts: Record<string, number> = { all: byType.length };
	MISTAKE_LEVEL_ORDER.forEach((k) => {
		levelCounts[k] = byType.filter((m) => (m.level || "new") === k).length;
	});
	return {
		list,
		addType: mistakeAddType,
		filter: mistakeFilter,
		levelFilter: mistakeLevelFilter,
		types: MISTAKE_TYPES,
		levels: MISTAKE_LEVELS,
		levelOrder: MISTAKE_LEVEL_ORDER,
		typeCounts,
		levelCounts,
		studyMode: mistakeStudyMode,
		hideJp: studyHideJapanese,
		hideCn: studyHideTranslation,
		draft: mistakeDraft,
	};
}

export function favsPayload() {
	const ids = Object.keys(FAV);
	const groups: Record<string, string[]> = {};
	for (const id of ids) {
		const m = (FAV[id] || {}).module || "other";
		(groups[m] = groups[m] || []).push(id);
	}
	if (favFilter !== "all" && !(groups[favFilter] && groups[favFilter].length)) favFilter = "all";
	const selectionIds = ids.filter((id) => SELECTION_FAV_TYPES[(FAV[id] || {}).selectionType || ""]);
	const presentSelectionTypes = Object.keys(SELECTION_FAV_TYPES).filter((k) =>
		selectionIds.some((id) => (FAV[id] || {}).selectionType === k),
	);
	if (favSelectionFilter !== "all" && !presentSelectionTypes.includes(favSelectionFilter)) favSelectionFilter = "all";
	const source = favFilter === "all" ? ids : groups[favFilter] || [];
	const shown = favSelectionFilter === "all" ? source : source.filter((id) => (FAV[id] || {}).selectionType === favSelectionFilter);
	return {
		total: ids.length,
		items: shown.map((id) => ({ id, ...(FAV[id] || {}) })),
		filter: favFilter,
		selectionFilter: favSelectionFilter,
		mods: FAV_MOD_ORDER.filter((m) => groups[m]?.length).map((m) => ({
			key: m,
			label: FAV_MOD_LABEL[m],
			count: groups[m].length,
		})),
		selTypes: presentSelectionTypes.map((k) => ({
			key: k,
			label: lx(...SELECTION_FAV_TYPES[k]),
			count: selectionIds.filter((id) => (FAV[id] || {}).selectionType === k).length,
		})),
		selLabels: Object.fromEntries(Object.entries(SELECTION_FAV_TYPES).map(([k, v]) => [k, lx(...v)])),
		studyMode: favStudyMode,
		hideJp: studyHideJapanese,
		hideCn: studyHideTranslation,
	};
}

function shownFavIds() {
	const groups: Record<string, string[]> = {};
	for (const id of Object.keys(FAV)) {
		const m = (FAV[id] || {}).module || "other";
		(groups[m] = groups[m] || []).push(id);
	}
	const source = favFilter === "all" ? Object.keys(FAV) : groups[favFilter] || [];
	return favSelectionFilter === "all" ? source : source.filter((id) => (FAV[id] || {}).selectionType === favSelectionFilter);
}

function startFavFc() {
	const ids = shownFavIds();
	favDeck = ids.map((id) => ({ jp: FAV[id]?.jp || "", cn: FAV[id]?.cn || "" }));
	for (let i = favDeck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[favDeck[i], favDeck[j]] = [favDeck[j], favDeck[i]];
	}
	favIdx = 0;
	favFlip = false;
	showingFavFc = !!favDeck.length;
	emit();
}

function buildDeck(week: number) {
	const deck: any[] = [];
	if (isGram()) {
		for (const w of cur().weeks || []) {
			if (week && w.n !== week) continue;
			for (const d of w.days) (d.points || []).forEach((p: any, i: number) => deck.push({ w: w.n, d: d.day, i, p }));
		}
	} else if (isKanji()) {
		for (const w of cur().weeks || []) {
			if (week && w.n !== week) continue;
			for (const d of w.days) (d.kanji || []).forEach((k: any) => {
				if (k.words?.length) deck.push({ k });
			});
		}
	} else if (isReading() || isListening()) {
		for (const w of cur().weeks || []) {
			if (week && w.n !== week) continue;
			for (const d of w.days)
				(d.vocab || []).forEach((it: any) => {
					if (it.jp && (it.cn || it.en)) deck.push({ v: it });
				});
		}
	} else {
		for (const w of cur().weeks || []) {
			if (week && w.n !== week) continue;
			for (const d of w.days)
				(d.sections || []).forEach((sec: any) =>
					(sec.items || []).forEach((it: any) => {
						if (it.jp && (it.cn || it.en)) deck.push({ v: it });
					}),
				);
		}
	}
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

function buildIndex() {
	if (searchIndex) return searchIndex;
	searchIndex = [];
	const pushG = (mod: string, weeks: any[]) => {
		for (const w of weeks || [])
			for (const d of w.days)
				(d.points || []).forEach((p: any, i: number) => {
					searchIndex!.push({
						module: mod,
						w: w.n,
						d: d.day,
						i,
						key: p.pattern || "",
						reading: p.reading || "",
						extra:
							((p.connection || "").replace(/~/g, "")) +
							" " +
							(p.usage_jp || "") +
							" " +
							(p.usage_cn || "") +
							" " +
							(p.examples || []).map((e: any) => e.jp + " " + (e.cn || "")).join(" "),
						sub: p.usage_cn || "",
						dayTitle: d.title,
					});
				});
	};
	const pushV = (mod: string, weeks: any[]) => {
		for (const w of weeks || [])
			for (const d of w.days)
				(d.sections || []).forEach((sec: any, si: number) =>
					(sec.items || []).forEach((it: any, ii: number) => {
						searchIndex!.push({
							module: mod,
							w: w.n,
							d: d.day,
							si,
							ii,
							key: it.jp || "",
							reading: "",
							extra: (it.en || "") + " " + (it.cn || "") + " " + (it.rel || ""),
							sub: [it.cn, it.en].filter(Boolean).join(" · "),
							dayTitle: d.title,
						});
					}),
				);
	};
	const pushK = (mod: string, weeks: any[]) => {
		for (const w of weeks || [])
			for (const d of w.days)
				(d.kanji || []).forEach((k: any, ki: number) =>
					(k.words || []).forEach((wd: any) => {
						searchIndex!.push({
							module: mod,
							w: w.n,
							d: d.day,
							ki,
							key: wd.jp || "",
							reading: wd.reading || "",
							extra: (wd.en || "") + " " + (wd.cn || "") + " " + (k.char || ""),
							sub: [wd.cn, wd.en].filter(Boolean).join(" · "),
							dayTitle: d.title,
						});
					}),
				);
	};
	pushG("grammar", G.weeks);
	pushG("n2grammar", G2.weeks);
	pushG("n4grammar", G4.weeks);
	pushV("vocab", V.weeks);
	pushV("n2vocab", V2.weeks);
	pushV("n4vocab", V4.weeks);
	pushK("kanji", K.weeks);
	pushK("n2kanji", K2.weeks);
	pushK("n4kanji", K4.weeks);
	const pushReading = (mod: string, weeks: any[]) => {
		for (const w of weeks || [])
			for (const d of w.days) {
				(d.vocab || []).forEach((it: any, ii: number) => {
					searchIndex!.push({
						module: mod,
						w: w.n,
						d: d.day,
						si: 0,
						ii,
						key: it.jp || "",
						reading: it.kana || "",
						extra: (it.cn || "") + " " + (it.pos || ""),
						sub: it.cn || "",
						dayTitle: d.title,
					});
				});
				(d.grammar || []).forEach((p: any, i: number) => {
					searchIndex!.push({
						module: mod,
						w: w.n,
						d: d.day,
						i,
						key: p.pattern || "",
						reading: "",
						extra: (p.formation || "") + " " + (p.meaning || ""),
						sub: p.meaning || "",
						dayTitle: d.title,
					});
				});
			}
	};
	pushReading("reading", R.weeks);
	pushReading("n2reading", R2.weeks);
	for (const w of L.weeks || [])
		for (const d of w.days) {
			searchIndex!.push({
				module: "listening",
				w: w.n,
				d: d.day,
				i: 0,
				key: d.title || "",
				reading: "",
				extra: (d.title_cn || "") + " " + (d.title_en || "") + " " + (w.title || ""),
				sub: d.title_cn || "",
				dayTitle: w.title,
			});
		}
	for (const w of L2.weeks || [])
		for (const d of w.days) {
			searchIndex!.push({
				module: "n2listening",
				w: w.n,
				d: d.day,
				i: 0,
				key: d.title || "",
				reading: "",
				extra: (d.title_cn || "") + " " + (d.title_en || "") + " " + (w.title || ""),
				sub: d.title_cn || "",
				dayTitle: w.title,
			});
		}
	return searchIndex;
}

const SEARCH_HIST_KEY = "searchHistory";
const SEARCH_HIST_MAX = 15;
export function getSearchHistory(): string[] {
	return lsJson(SEARCH_HIST_KEY, []);
}
export function saveSearchHistory(kw: string) {
	if (!kw) return;
	const hist = getSearchHistory().filter((x) => x !== kw);
	hist.unshift(kw);
	lsSet(SEARCH_HIST_KEY, JSON.stringify(hist.slice(0, SEARCH_HIST_MAX)));
}
export function clearSearchHistory() {
	try {
		localStorage.removeItem(SEARCH_HIST_KEY);
	} catch {
		/* ignore */
	}
}
export function getSearchIndex() {
	return buildIndex();
}
export type SearchCategory = "all" | "grammar" | "kanji" | "vocab" | "mistakes";

export function searchCategoryForModule(module: string): Exclude<SearchCategory, "all"> | "other" {
	if (module === "grammar" || module === "n2grammar" || module === "n4grammar") return "grammar";
	if (module === "kanji" || module === "n2kanji" || module === "n4kanji") return "kanji";
	if (module === "vocab" || module === "n2vocab" || module === "n4vocab") return "vocab";
	if (module === "mistakes") return "mistakes";
	return "other";
}

function searchableMistakes() {
	return activeMistakes().map((mistake) => ({
		module: "mistakes",
		w: 0,
		d: 0,
		key: mistake.text.split("\n").find((line) => line.trim())?.trim() || mistake.text,
		reading: "",
		extra: mistake.text,
		sub: "",
		dayTitle: "",
		mistakeId: mistake.id,
		mistakeType: mistake.type,
		mistakeLevel: mistake.level || "new",
		ts: mistake.ts,
	}));
}

export function searchEntryCount(category: SearchCategory = "all") {
	const indexed = getSearchIndex().filter((hit) => category === "all" || searchCategoryForModule(hit.module) === category).length;
	return indexed + (category === "all" || category === "mistakes" ? searchableMistakes().length : 0);
}

export function searchHits(keyword: string, limit = 60, category: SearchCategory = "all") {
	const kw = keyword.trim();
	if (!kw) return [];
	const lk = kw.toLowerCase();
	const scored: { hit: any; score: number; len: number }[] = [];
	const source = category === "all" || category === "mistakes" ? [...getSearchIndex(), ...searchableMistakes()] : getSearchIndex();
	for (const hit of source) {
		if (category !== "all" && searchCategoryForModule(hit.module) !== category) continue;
		const key = String(hit.key || "").toLowerCase();
		const reading = String(hit.reading || "");
		const extra = String(hit.extra || "").toLowerCase();
		let score = 0;
		if (key === lk) score = 100;
		else if (key.startsWith(lk) || key.endsWith(lk)) score = 80;
		else if (key.includes(lk)) score = 50;
		else if (reading.includes(kw)) score = 40;
		else if (extra.includes(lk)) score = 10;
		else continue;
		scored.push({ hit, score, len: key.length });
	}
	scored.sort((a, b) => b.score - a.score || a.len - b.len);
	return scored.slice(0, limit).map((row) => row.hit);
}
export function activeMistakeCount() {
	return activeMistakes().length;
}
export function openSearchHit(hit: any, keyword?: string) {
	if (!hit) return;
	if (keyword) saveSearchHistory(keyword);
	if (hit.module === "mistakes") {
		setMistakeFilter(hit.mistakeType || "all");
		setMistakeLevelFilter("all");
		navTo("#/mistakes");
		return;
	}
	setModule(hit.module as ModuleKey);
	let key = `#/day/${hit.w}-${hit.d}`;
	if (isKanji(hit.module)) key += "/k" + hit.ki;
	else if (isVocab(hit.module)) key += "/v" + hit.si + "-" + hit.ii;
	else if (isReading(hit.module) || isListening(hit.module)) key = `#/day/${hit.w}-${hit.d}`;
	else if (hit.i != null) key += "/p" + hit.i;
	navTo(key);
}

let afterPaintImpl: () => void = () => {};
export function setAfterPaint(fn: () => void) {
	afterPaintImpl = fn;
}
export function afterPaint() {
	afterPaintImpl();
}

export function cardsState() {
	return fc;
}
export function cardsKind() {
	return isGram() ? "gram" : isKanji() ? "kanji" : "vocab";
}
export function cardsWeeks() {
	return cur().weeks?.length || 0;
}
export function setCardsWeek(week: number) {
	fc.week = week;
	fc.deck = buildDeck(week);
	fc.idx = 0;
	fc.flipped = false;
}
export function flipCard() {
	fc.flipped = !fc.flipped;
}
export function nextCard() {
	if (fc.idx < fc.deck.length) {
		fc.idx++;
		fc.flipped = false;
	}
}
export function prevCard() {
	if (fc.idx > 0) {
		fc.idx--;
		fc.flipped = false;
	}
}
export function shuffleCards() {
	fc.deck = buildDeck(fc.week);
	fc.idx = 0;
	fc.flipped = false;
}

export function setMistakeType(type: string) {
	mistakeAddType = type;
	emit();
}
export function setMistakeDraft(value: string) {
	mistakeDraft = value;
}
export function addMistakeNote(text: string) {
	addMistake(mistakeAddType, text);
	mistakeDraft = "";
}
export function setMistakeFilter(filter: string) {
	mistakeFilter = filter;
	emit();
}
export function setMistakeLevelFilter(filter: string) {
	mistakeLevelFilter = filter;
	emit();
}
export function setMistakeStudy(on: boolean) {
	mistakeStudyMode = !!on;
	emit();
}
export function toggleStudyHide(kind: "jp" | "cn") {
	if (kind === "jp") studyHideJapanese = !studyHideJapanese;
	else studyHideTranslation = !studyHideTranslation;
	emit();
}

export function setFavFilter(filter: string) {
	favFilter = filter;
	showingFavFc = false;
	emit();
}
export function setFavSelectionFilter(type: string) {
	favSelectionFilter = type;
	showingFavFc = false;
	emit();
}
export function clearFavs() {
	FAV = {};
	saveFav();
	showingFavFc = false;
	emit();
}
export function setFavStudy(on: boolean) {
	favStudyMode = !!on;
	showingFavFc = false;
	emit();
}
export function openFav(hash: string, mod: string) {
	if (mod) setModule(mod as ModuleKey);
	navTo(hash);
}
export function startFavStudyCards() {
	startFavFc();
}
export function flipFavCard() {
	favFlip = !favFlip;
	emit();
}
export function nextFavCard() {
	favIdx = (favIdx + 1) % favDeck.length;
	favFlip = false;
	emit();
}
export function prevFavCard() {
	if (favIdx > 0) {
		favIdx--;
		favFlip = false;
		emit();
	}
}
export function closeFavStudyCards() {
	showingFavFc = false;
	emit();
}

function pickVoice() {
	try {
		const vs = speechSynthesis.getVoices() || [];
		jaVoice = vs.find((v) => /^ja/i.test(v.lang)) || vs.find((v) => /japan/i.test(v.name)) || null;
	} catch {
		/* ignore */
	}
}
export function say(text?: string) {
	try {
		if (typeof window === "undefined" || !("speechSynthesis" in window) || !text) return;
		speechSynthesis.cancel();
		const u = new SpeechSynthesisUtterance(text);
		u.lang = "ja-JP";
		u.rate = 0.9;
		if (jaVoice) u.voice = jaVoice;
		speechSynthesis.speak(u);
	} catch {
		/* ignore */
	}
}

function normalizeN3GrammarOcr(node: any): any {
	if (typeof node === "string")
		return node
			.replaceAll("<ruby>今日<rt>こんにち</rt></ruby>", "<ruby>今日<rt>きょう</rt></ruby>")
			.replaceAll("<ruby>小<rt>ちー</rt></ruby>", "<ruby>小<rt>ちい</rt></ruby>")
			.replaceAll("<ruby>大<rt>おー</rt></ruby>", "<ruby>大<rt>おお</rt></ruby>")
			.replaceAll("<ruby>一日<rt>ついたち</rt></ruby><ruby>雨", "<ruby>一日<rt>いちにち</rt></ruby><ruby>雨")
			.replaceAll("吸っていはいけない", "吸ってはいけない")
			.replaceAll("っていはいけない", "ってはいけない");
	if (Array.isArray(node)) {
		for (let i = 0; i < node.length; i++) node[i] = normalizeN3GrammarOcr(node[i]);
		return node;
	}
	if (node && typeof node === "object") {
		for (const key of Object.keys(node)) node[key] = normalizeN3GrammarOcr(node[key]);
	}
	return node;
}
function fixN3GrammarExerciseLayout(g: any) {
	normalizeN3GrammarOcr(g);
	const day = g.weeks?.find((w: any) => w.n === 2)?.days?.find((d: any) => d.day === 4);
	const item = day?.exercises?.sections.flatMap((section: any) => section.items || []).find((q: any) => q.n === 5);
	if (item) {
		item.q = String(item.q || "").replace(" ＿＿ は冗談", " ＿＿ 冗談");
		item.q_r = String(item.q_r || "").replace(" ＿＿ は<ruby>冗談", " ＿＿ <ruby>冗談");
	}
}

function sameAccountDevice(accountId: string) {
	const last = lsGet("accountId", "");
	return last === "" || last === accountId;
}

async function pullMistakesFromServer() {
	if (!ACCOUNT) {
		_mistakesReady = true;
		return;
	}
	try {
		const res = await fetch("/api/mistakes", { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const data = await res.json();
			if (Array.isArray(data)) {
				_mistakeSyncing = true;
				const server = cleanMistakes(data);
				const mergeLocal = sameAccountDevice(ACCOUNT.id);
				const merged = mergeLocal ? server.slice() : server;
				if (mergeLocal) {
					for (const m of MISTAKES) if (!server.some((d) => d.id === m.id)) merged.push(m);
				}
				merged.sort((a, b) => b.ts - a.ts);
				MISTAKES = merged;
				lsSet("mistakes", JSON.stringify(MISTAKES));
				_mistakeSyncing = false;
				emit();
			}
		}
	} catch {
		/* offline */
	}
	_mistakesReady = true;
	if (_mistakesPendingPush) {
		_mistakesPendingPush = false;
		saveMistakes();
	}
}
async function pullFavsFromServer() {
	if (!ACCOUNT) {
		_favReady = true;
		return;
	}
	try {
		const res = await fetch("/api/favorites", { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const data = await res.json();
			if (data && typeof data === "object" && !Array.isArray(data)) {
				_favSyncing = true;
				const server = data as Record<string, FavSnap>;
				FAV = sameAccountDevice(ACCOUNT.id) ? Object.assign({}, server, FAV) : server;
				lsSet("favs", JSON.stringify(FAV));
				_favSyncing = false;
				emit();
			}
		}
	} catch {
		/* offline */
	}
	_favReady = true;
	if (_favPendingPush) {
		_favPendingPush = false;
		saveFav();
	}
}

function mistakesSig(arr: Mistake[]) {
	return JSON.stringify(arr.map((m) => [m.id, m.type, m.text, m.level, m.ts]).sort((a, b) => (a[0] < b[0] ? -1 : 1)));
}
function favsSig(o: Record<string, FavSnap>) {
	return JSON.stringify(Object.keys(o).sort().map((k) => [k, o[k]]));
}
async function resyncMistakes() {
	if (!ACCOUNT || !_mistakesReady || _mistakePushTimer || _resyncingM) return;
	_resyncingM = true;
	try {
		const res = await fetch("/api/mistakes", { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const data = await res.json();
			if (Array.isArray(data)) {
				const before = mistakesSig(MISTAKES);
				_mistakeSyncing = true;
				const merged = cleanMistakes(data);
				for (const m of MISTAKES) if (!data.some((d: any) => d.id === m.id)) merged.push(m);
				merged.sort((a, b) => b.ts - a.ts);
				MISTAKES = merged;
				lsSet("mistakes", JSON.stringify(MISTAKES));
				_mistakeSyncing = false;
				if (mistakesSig(MISTAKES) !== before) emit();
			}
		}
	} catch {
		/* ignore */
	}
	_resyncingM = false;
}
async function resyncFavs() {
	if (!ACCOUNT || !_favReady || _favPushTimer || _resyncingF) return;
	_resyncingF = true;
	try {
		const res = await fetch("/api/favorites", { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const data = await res.json();
			if (data && typeof data === "object" && !Array.isArray(data)) {
				const before = favsSig(FAV);
				_favSyncing = true;
				FAV = Object.assign({}, data, FAV);
				lsSet("favs", JSON.stringify(FAV));
				_favSyncing = false;
				if (favsSig(FAV) !== before) emit();
			}
		}
	} catch {
		/* ignore */
	}
	_resyncingF = false;
}

/** Compatibility shim for any leftover window callers. Pages should import store APIs instead. */
export function installStudyBridges() {
	if (typeof window === "undefined") return;
	window.__studySay = say;
	window.__studyHome = {
		open: () => openWeekSet(),
		toggle: (n) => toggleWeek(n),
		jump: (n) => jumpWeek(n),
	};
	window.__studySearch = {
		index: getSearchIndex,
		history: getSearchHistory,
		saveHistory: saveSearchHistory,
		clearHistory: clearSearchHistory,
		open: openSearchHit,
	};
	window.__studyCards = {
		state: cardsState,
		kind: cardsKind,
		weeks: cardsWeeks,
		setWeek: setCardsWeek,
		flip: flipCard,
		next: nextCard,
		prev: prevCard,
		shuffle: shuffleCards,
	};
	window.__studyMistakes = {
		setType: setMistakeType,
		setDraft: setMistakeDraft,
		add: addMistakeNote,
		remove: deleteMistake,
		cycleLevel: cycleMistakeLevel,
		setFilter: setMistakeFilter,
		setLevelFilter: setMistakeLevelFilter,
		study: setMistakeStudy,
		hide: toggleStudyHide,
	};
	window.__studyFavs = {
		setFilter: setFavFilter,
		setSelectionFilter: setFavSelectionFilter,
		toggle: toggleFav,
		clear: clearFavs,
		study: setFavStudy,
		hide: toggleStudyHide,
		open: openFav,
		startFc: startFavStudyCards,
		fcFlip: flipFavCard,
		fcNext: nextFavCard,
		fcPrev: prevFavCard,
		fcBack: closeFavStudyCards,
	};
}

export function resetStudyStateForTests() {
	MODULE = "grammar";
	LANG = "cn";
	LEVEL = "n3";
	TYPE = "grammar";
	FAV = {};
	MISTAKES = [];
	ACCOUNT = null;
	accountReady = false;
	authConfigured = false;
	LOGIN_PROMPT = null;
	loginSuggestDismissed = false;
	_favSyncing = false;
	_favPendingPush = false;
	_favReady = false;
	if (_favPushTimer) clearTimeout(_favPushTimer);
	_favPushTimer = null;
	_mistakeSyncing = false;
	_mistakesPendingPush = false;
	_mistakesReady = false;
	if (_mistakePushTimer) clearTimeout(_mistakePushTimer);
	_mistakePushTimer = null;
	_resyncingM = false;
	_resyncingF = false;
	mistakeAddType = "q";
	mistakeFilter = "all";
	mistakeLevelFilter = "all";
	mistakeDraft = "";
	mistakeStudyMode = false;
	favStudyMode = false;
	favFilter = "all";
	favSelectionFilter = "all";
	favDeck = [];
	favIdx = 0;
	favFlip = false;
	showingFavFc = false;
	searchIndex = null;
	lastVisit = {};
	lastDay = {};
	noRuby = false;
	hideJp = false;
	hideCn = false;
	THEME = "light";
	if (themeFadeTimer) {
		clearTimeout(themeFadeTimer);
		themeFadeTimer = null;
	}
	if (typeof document !== "undefined") document.documentElement.classList.remove("theme-switching");
	studyHideJapanese = false;
	studyHideTranslation = false;
	fc = { week: 0, deck: [], idx: 0, flipped: false };
	G = { weeks: [] };
	V = { weeks: [] };
	K = { weeks: [] };
	G2 = { weeks: [] };
	V2 = { weeks: [] };
	K2 = { weeks: [] };
	G4 = { weeks: [] };
	V4 = { weeks: [] };
	K4 = { weeks: [] };
	R = readingBundle();
	R2 = readingN2Bundle();
	L = listeningBundle();
	L2 = listeningN2Bundle();
	DATA = {
		grammar: G,
		vocab: V,
		kanji: K,
		n2grammar: G2,
		n2vocab: V2,
		n2kanji: K2,
		n2reading: R2,
		n2listening: L2,
		n4grammar: G4,
		n4vocab: V4,
		n4kanji: K4,
		reading: R,
		listening: L,
	};
	dataLoaded = false;
	n2Loaded = false;
	n4Loaded = false;
	loadError = "";
	for (const key of Object.keys(openWeeks)) delete openWeeks[key];
	navImpl = () => {};
	afterPaintImpl = () => {};
	if (typeof document !== "undefined") applyTheme();
}

export function setAccountStateForTests(user: PublicUser | null, configured: boolean, ready = true) {
	ACCOUNT = user;
	authConfigured = configured;
	accountReady = ready;
	LOGIN_PROMPT = null;
}

export function hydrateFromStorage() {
	const m = lsGet("module", "grammar");
	if ((MODULES as string[]).includes(m)) MODULE = m as ModuleKey;
	const l = lsGet("lang", "cn");
	if (l === "en" || l === "cn") LANG = l;
	lastVisit = lsJson("lastVisit", {});
	lastDay = lsJson("lastDay", {});
	loginSuggestDismissed = lsGet("loginSuggestDismissed", "0") === "1";
	FAV = lsJson("favs", {});
	MISTAKES = cleanMistakes(lsJson("mistakes", []));
	noRuby = lsGet("noruby", "0") === "1";
	hideJp = lsGet("hidejp", "0") === "1";
	hideCn = lsGet("hidecn", "0") === "1";
	const savedTheme = lsGet("theme", "");
	THEME = savedTheme === "dark" || savedTheme === "light" ? savedTheme : systemTheme();
	deriveLT();
	applyDisplayClasses();
	applyTheme();
	if (typeof document !== "undefined") document.documentElement.lang = LANG === "en" ? "en" : "zh-CN";
	if (typeof window !== "undefined" && "speechSynthesis" in window) {
		pickVoice();
		try {
			speechSynthesis.onvoiceschanged = pickVoice;
		} catch {
			/* ignore */
		}
	}
	installStudyBridges();
	emit();
}

async function bootN2() {
	try {
		const names = ["n2grammar", "n2vocab", "n2kanji"] as const;
		const [g2, v2, k2, n2ExamExplanations, n2DailyExplanations, n2VocabKanjiTranslations, contrastModule]: any[] = await Promise.all([
			...names.map((n) => fetch("/data/" + DATA_FILES[n]).then((r) => r.json())),
			fetch("/data/n2-grammar-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
			fetch("/data/n2-grammar-daily-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
			fetch("/data/n2-vocab-kanji-daily-translations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
			import("../data/n2-grammar-contrast"),
		]);
		g2.besatsu = n2ExamExplanations || {};
		g2.daily_explanations = n2DailyExplanations || {};
		v2.daily_translations = n2VocabKanjiTranslations.vocab || {};
		k2.daily_translations = n2VocabKanjiTranslations.kanji || {};
		const [n2VocabExam, n2KanjiExam] = await Promise.all([
			fetch("/data/n2-vocab-exam-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
			fetch("/data/n2-kanji-exam-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
		]);
		attachWeekendKaisetsu(v2, n2VocabExam);
		attachWeekendKaisetsu(k2, n2KanjiExam);
		g2.contrast = contrastModule.buildN2GrammarContrast(g2);
		G2 = g2;
		V2 = v2;
		K2 = k2;
		DATA.n2grammar = G2;
		DATA.n2vocab = V2;
		DATA.n2kanji = K2;
		n2Loaded = true;
		searchIndex = null;
		emit();
	} catch {
		/* N3 stays usable */
	}
	bootN4();
}
async function bootN4() {
	try {
		const names = ["n4grammar", "n4vocab", "n4kanji"] as const;
		const [g4, v4, k4, n4ExamExplanations]: any[] = await Promise.all([
			...names.map((n) => fetch("/data/" + DATA_FILES[n]).then((r) => r.json())),
			fetch("/data/n4-grammar-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
		]);
		g4.besatsu = n4ExamExplanations || {};
		const [n4DailyExplanations, n4VocabKanjiTranslations]: any[] = await Promise.all([
			fetch("/data/n4-grammar-daily-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
			fetch("/data/n4-vocab-kanji-daily-translations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
		]);
		g4.daily_explanations = n4DailyExplanations || {};
		v4.daily_translations = n4VocabKanjiTranslations.vocab || {};
		k4.daily_translations = n4VocabKanjiTranslations.kanji || {};
		const [n4VocabExam, n4KanjiExam] = await Promise.all([
			fetch("/data/n4-vocab-exam-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
			fetch("/data/n4-kanji-exam-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
		]);
		attachWeekendKaisetsu(v4, n4VocabExam);
		attachWeekendKaisetsu(k4, n4KanjiExam);
		G4 = g4;
		V4 = v4;
		K4 = k4;
		DATA.n4grammar = G4;
		DATA.n4vocab = V4;
		DATA.n4kanji = K4;
		n4Loaded = true;
		searchIndex = null;
		emit();
	} catch {
		/* ignore */
	}
}

function attachWeekendKaisetsu(book: any, pack: Record<string, any[]>) {
	if (!book?.weeks || !pack) return;
	for (const week of book.weeks) {
		const day = (week.days || []).find((entry: any) => entry.day === 7);
		const items = pack[`w${week.n}`];
		if (day && Array.isArray(items) && items.length && !(Array.isArray(day.kaisetsu) && day.kaisetsu.length)) {
			day.kaisetsu = items;
		}
	}
}

export async function bootStudyData() {
	try {
		const names = ["grammar", "vocab", "kanji", "common"] as const;
		const [g, v, k, com, grammarExplanations, dailyGrammarExplanations, dailyVocabKanjiTranslations]: any[] = await Promise.all([
			...names.map((n) => fetch("/data/" + DATA_FILES[n]).then((r) => r.json())),
			fetch("/data/n3-grammar-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
			fetch("/data/n3-grammar-daily-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
			fetch("/data/n3-vocab-kanji-daily-translations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
		]);
		fixN3GrammarExerciseLayout(g);
		for (const [weekKey, sections] of Object.entries(grammarExplanations || {}) as [string, any][]) {
			const targetWeek = g.besatsu && g.besatsu[weekKey];
			if (!targetWeek) continue;
			for (const section of ["mondai1", "mondai2", "mondai3"]) {
				const enriched = sections && sections[section];
				if (!Array.isArray(enriched) || !Array.isArray(targetWeek[section])) continue;
				const byNumber = new Map(enriched.map((item: any) => [item.n, item]));
				targetWeek[section] = targetWeek[section].map((item: any) => Object.assign({}, item, byNumber.get(item.n) || {}));
			}
		}
		g.daily_explanations = dailyGrammarExplanations || {};
		v.daily_translations = dailyVocabKanjiTranslations.vocab || {};
		k.daily_translations = dailyVocabKanjiTranslations.kanji || {};
		const [n3VocabExam, n3KanjiExam] = await Promise.all([
			fetch("/data/n3-vocab-exam-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
			fetch("/data/n3-kanji-exam-explanations.json")
				.then((r) => (r.ok ? r.json() : {}))
				.catch(() => ({})),
		]);
		attachWeekendKaisetsu(v, n3VocabExam);
		attachWeekendKaisetsu(k, n3KanjiExam);
		G = g;
		V = v;
		K = k;
		DATA.grammar = G;
		DATA.vocab = V;
		DATA.kanji = K;
		DATA.common = {
			...(com || {}),
			henkei: henkeiFallback,
			kougo: (com && com.kougo) || kougoFallback,
			jita: (com && com.jita) || jitaFallback,
			wearing: (com && com.wearing) || wearingFallback,
		};
		dataLoaded = true;
		loadError = "";
		emit();
	} catch {
		loadError = "数据加载失败，请检查网络后刷新重试。";
		emit();
		return;
	}
	bootN2();
	void bootAccount();
}

export async function bootAccount() {
	try {
		const res = await fetch("/api/me", { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const data = (await res.json()) as { user?: PublicUser | null; configured?: boolean };
			authConfigured = data.configured !== false;
			ACCOUNT = data.user && typeof data.user.id === "string" ? data.user : null;
		} else {
			authConfigured = false;
			ACCOUNT = null;
		}
	} catch {
		authConfigured = false;
		ACCOUNT = null;
	}
	accountReady = true;
	emit();
	if (!ACCOUNT) {
		_favReady = true;
		_mistakesReady = true;
		if (_favPendingPush) {
			_favPendingPush = false;
			saveFav();
		}
		if (_mistakesPendingPush) {
			_mistakesPendingPush = false;
			saveMistakes();
		}
		return;
	}
	await pullFavsFromServer();
	await pullMistakesFromServer();
	lsSet("accountId", ACCOUNT.id);
	pushFavsNow();
	pushMistakesNow();
}

export function attachResync() {
	const resyncAll = () => {
		resyncFavs();
		resyncMistakes();
	};
	const onVis = () => {
		if (document.visibilityState === "visible") resyncAll();
	};
	document.addEventListener("visibilitychange", onVis);
	window.addEventListener("focus", resyncAll);
	return () => {
		document.removeEventListener("visibilitychange", onVis);
		window.removeEventListener("focus", resyncAll);
	};
}

export function homeScale() {
	return cur().scale === "chapter" ? "chapter" : "week";
}

export function homeIntro() {
	const weeks = cur().weeks || [];
	const totalDays = weeks.reduce((n: number, w: any) => n + w.days.length, 0);
	const kind = lx(
		isVocab() ? "词汇" : isKanji() ? "汉字" : isReading() ? "读解" : isListening() ? "听解" : "语法",
		isVocab() ? "vocabulary" : isKanji() ? "kanji" : isReading() ? "reading" : isListening() ? "listening" : "grammar",
	);
	const book = lx(...BOOK_TITLE[MODULE]);
	if (isListening()) {
		return lx(
			`《${book}》 · ${weeks.length} 章 · 共 ${totalDays} 节 · 点击进入各节听解`,
			`${book} · ${weeks.length} chapters · ${totalDays} sections · Tap to open each listening section`,
		);
	}
	return lx(
		`《${book}》 · ${weeks.length} 周 · 共 ${totalDays} 天 · 点击进入每日${kind}`,
		`${book} · ${weeks.length} weeks · ${totalDays} days · Tap to open each day's ${kind}`,
	);
}

export function ensureCardsDeck() {
	if (!fc.deck.length) {
		fc.deck = buildDeck(fc.week);
		fc.idx = 0;
		fc.flipped = false;
	}
}

export function setCtMode(mode: "family" | "week") {
	ctMode = mode;
	emit();
}
export function setCtWeek(week: number) {
	ctWeek = week;
	emit();
}

export function favFcPayload() {
	const card = favDeck[favIdx] || { jp: "", cn: "" };
	return { jp: card.jp || "", cn: card.cn || "", idx: favIdx, total: favDeck.length, flipped: favFlip };
}

export function closeFavFc() {
	showingFavFc = false;
}

declare global {
	interface Window {
		__studyNav?: (key: string) => void;
		__studySay?: (text?: string) => void;
		__studyAfterPaint?: () => void;
		__studySearch?: {
			index: () => any[];
			history: () => string[];
			saveHistory: (kw: string) => void;
			clearHistory: () => void;
			open: (hit: any, keyword?: string) => void;
		};
		__studyCards?: {
			state: () => { week: number; deck: any[]; idx: number; flipped: boolean };
			kind: () => "gram" | "kanji" | "vocab";
			weeks: () => number;
			setWeek: (week: number) => void;
			flip: () => void;
			next: () => void;
			prev: () => void;
			shuffle: () => void;
		};
		__studyMistakes?: {
			setType: (type: string) => void;
			setDraft: (value: string) => void;
			add: (text: string) => void;
			remove: (id: string) => void;
			cycleLevel: (id: string) => void;
			setFilter: (filter: string) => void;
			setLevelFilter: (filter: string) => void;
			study: (on: boolean) => void;
			hide: (kind: "jp" | "cn") => void;
		};
		__studyFavs?: {
			setFilter: (filter: string) => void;
			setSelectionFilter: (type: string) => void;
			toggle: (id: string) => void;
			clear: () => void;
			study: (on: boolean) => void;
			hide: (kind: "jp" | "cn") => void;
			open: (hash: string, module: string) => void;
			startFc: () => void;
			fcFlip: () => void;
			fcNext: () => void;
			fcPrev: () => void;
			fcBack: () => void;
		};
		__studyHome?: {
			open: () => Set<number>;
			toggle: (week: number) => void;
			jump: (week: number) => void;
		};
	}
}
