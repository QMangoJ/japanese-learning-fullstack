import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { parseDayRoute } from "../../app/study/days";
import {
	G,
	LANG,
	LEVEL,
	MODULE,
	TYPE,
	V,
	ACCOUNT,
	accountReady,
	authConfigured,
	LOGIN_PROMPT,
	addMistake,
	addMistakeNote,
	bootAccount,
	closeLoginPrompt,
	goAccountPage,
	googleLoginHref,
	needsAccount,
	requestAccount,
	setAccountStateForTests,
	afterPaint,
	applyDisplayClasses,
	cardsKind,
	cardsState,
	cardsWeeks,
	clearFavs,
	clearSearchHistory,
	closeFavStudyCards,
	cycleMistakeLevel,
	deleteMistake,
	entryHash,
	favsPayload,
	flipCard,
	getDisplayVersion,
	getVersion,
	flipFavCard,
	activeMistakeCount,
	getSearchHistory,
	getSearchIndex,
	searchCategoryForModule,
	searchEntryCount,
	searchHits,
	homeIntro,
	homeScale,
	installStudyBridges,
	closeFavFc,
	dayNeighbors,
	isGram,
	isKanji,
	isListening,
	isN2,
	isN4,
	isReading,
	isVocab,
	say,
	setCtMode,
	setCtWeek,
	keyToPath,
	lx,
	mistakesPayload,
	moduleFrom,
	navTo,
	nextCard,
	nextFavCard,
	openSearchHit,
	openWeekSet,
	pathToKey,
	prevCard,
	registerFavMeta,
	resetStudyStateForTests,
	saveLastVisit,
	saveSearchHistory,
	saveSelectionFav,
	setAfterPaint,
	setCardsWeek,
	setFavFilter,
	setLang,
	setTheme,
	toggleTheme,
	THEME,
	setMistakeFilter,
	setMistakeLevelFilter,
	setMistakeStudy,
	setMistakeType,
	setModule,
	setNavImpl,
	shuffleCards,
	startFavStudyCards,
	toggleDisplay,
	toggleFav,
	toggleStudyHide,
	toggleWeek,
	typeForLevel,
} from "../../app/study/store";

function seedGrammar() {
	G.weeks = [
		{
			n: 1,
			title: "導入",
			title_cn: "导入",
			days: [
				{
					day: 1,
					title: "一日目",
					points: [
						{
							pattern: "ばかり",
							reading: "ばかり",
							usage_cn: "表示刚做完",
							usage_en: "have just done",
							examples: [{ jp: "食べたばかりです。", cn: "刚吃完。", en: "I just ate." }],
						},
					],
				},
				{ day: 2, title: "二日目", points: [] },
			],
		},
	];
}

function seedVocab() {
	V.weeks = [
		{
			n: 1,
			days: [
				{
					day: 1,
					title: "語彙",
					sections: [
						{
							items: [{ jp: "冷蔵庫", cn: "冰箱", en: "fridge" }],
						},
					],
				},
			],
		},
	];
}

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
});

afterEach(() => {
	resetStudyStateForTests();
	vi.restoreAllMocks();
});

describe("routing helpers", () => {
	it("converts hash keys and paths both ways", () => {
		expect(keyToPath("#/")).toBe("/study");
		expect(keyToPath("#/day/1-2")).toBe("/study/day/1-2");
		expect(keyToPath("#/kougo")).toBe("/study/kougo");
		expect(pathToKey("/study/kougo")).toBe("#/kougo");
		expect(keyToPath("#/jita")).toBe("/study/jita");
		expect(pathToKey("/study/jita")).toBe("#/jita");
		expect(pathToKey("/study")).toBe("#/");
		expect(pathToKey("/study/day/1-2")).toBe("#/day/1-2");
		expect(pathToKey("/other")).toBe("#/");
	});

	it("parses day routes including deep links", () => {
		expect(parseDayRoute("#/day/3-5")).toEqual({ w: 3, d: 5, token: null });
		expect(parseDayRoute("#/day/1-2/p0")).toEqual({ w: 1, d: 2, token: "p0" });
		expect(parseDayRoute("#/day/1-2/v0-1")).toEqual({ w: 1, d: 2, token: "v0-1" });
		expect(parseDayRoute("#/search")).toBeNull();
	});

	it("navigates through the injected impl", () => {
		const seen: string[] = [];
		setNavImpl((key) => seen.push(key));
		navTo("#/mistakes");
		expect(seen).toEqual(["#/mistakes"]);
	});
});

describe("language and modules", () => {
	it("toggles and persists the eye-care theme", () => {
		setTheme("light");
		expect(THEME).toBe("light");
		expect(document.documentElement.classList.contains("theme-light")).toBe(true);
		toggleTheme();
		expect(THEME).toBe("dark");
		expect(document.documentElement.classList.contains("theme-dark")).toBe(true);
		expect(localStorage.getItem("theme")).toBe("dark");
		setTheme("light");
		expect(document.documentElement.classList.contains("theme-dark")).toBe(false);
		expect(document.documentElement.classList.contains("theme-switching")).toBe(true);
	});

	it("picks Chinese or English copy", () => {
		setLang("cn");
		expect(lx("语法", "Grammar")).toBe("语法");
		setLang("en");
		expect(lx("语法", "Grammar")).toBe("Grammar");
		expect(LANG).toBe("en");
	});

	it("maps levels and types, including N2 listening and N3-only reading", () => {
		expect(moduleFrom("n3", "grammar")).toBe("grammar");
		expect(moduleFrom("n2", "vocab")).toBe("n2vocab");
		expect(moduleFrom("n4", "reading")).toBe("n4grammar");
		expect(moduleFrom("n3", "listening")).toBe("listening");
		expect(moduleFrom("n2", "listening")).toBe("n2listening");
		expect(typeForLevel("n2", "reading")).toBe("grammar");
		expect(typeForLevel("n2", "listening")).toBe("listening");
		expect(typeForLevel("n3", "listening")).toBe("listening");
		expect(typeForLevel("n4", "listening")).toBe("grammar");
		expect(isGram("n4grammar")).toBe(true);
		expect(isVocab("n2vocab")).toBe(true);
		expect(isKanji("kanji")).toBe(true);
		expect(isReading("reading")).toBe(true);
		expect(isListening("listening")).toBe(true);
		expect(isListening("n2listening")).toBe(true);
		expect(isN2("n2grammar")).toBe(true);
		expect(isN4("n4kanji")).toBe(true);
		expect(isN2("grammar")).toBe(false);
	});

	it("toggles display flags and contrast week mode", () => {
		const storeVersion = getVersion();
		const displayVersion = getDisplayVersion();
		toggleDisplay("ruby");
		toggleDisplay("jp");
		toggleDisplay("cn");
		expect(getVersion()).toBe(storeVersion);
		expect(getDisplayVersion()).toBe(displayVersion + 3);
		applyDisplayClasses();
		setCtMode("week");
		setCtWeek(3);
		closeFavFc();
		say("こんにちは");
		seedGrammar();
		expect(dayNeighbors(1, 1)).toHaveProperty("next");
		expect(isGram()).toBe(true);
	});

	it("updates TYPE/LEVEL when the module changes", () => {
		setModule("n2kanji");
		expect(MODULE).toBe("n2kanji");
		expect(LEVEL).toBe("n2");
		expect(TYPE).toBe("kanji");
	});
});

describe("mistakes", () => {
	it("adds, filters, cycles, studies, and soft-deletes notes", () => {
		setMistakeType("word");
		addMistakeNote("冷蔵庫");
		expect(mistakesPayload().list).toHaveLength(1);
		expect(mistakesPayload().addType).toBe("word");
		expect(mistakesPayload().list[0].text).toBe("冷蔵庫");

		addMistake("q", "問題1\n正确答案：B");
		setMistakeFilter("word");
		expect(mistakesPayload().list).toHaveLength(1);
		setMistakeFilter("all");
		expect(mistakesPayload().list).toHaveLength(2);

		const id = mistakesPayload().list[0].id;
		cycleMistakeLevel(id);
		expect(mistakesPayload().list.find((m) => m.id === id)?.level).toBe("mid");

		setMistakeLevelFilter("new");
		expect(mistakesPayload().list.every((m) => (m.level || "new") === "new")).toBe(true);
		setMistakeLevelFilter("all");

		setMistakeStudy(true);
		toggleStudyHide("jp");
		expect(mistakesPayload().studyMode).toBe(true);
		expect(mistakesPayload().hideJp).toBe(true);

		deleteMistake(id);
		expect(mistakesPayload().list.some((m) => m.id === id)).toBe(false);
		expect(activeMistakeCount()).toBe(mistakesPayload().list.length);
	});

	it("ignores blank notes", () => {
		addMistake("q", "   ");
		expect(mistakesPayload().list).toHaveLength(0);
	});

	it("asks guests to sign in before writing a notebook when accounts are on", () => {
		setAccountStateForTests(null, true);
		addMistake("q", "不能写");
		expect(mistakesPayload().list).toHaveLength(0);
		expect(LOGIN_PROMPT?.reason).toBe("mistakes");
		expect(googleLoginHref()).toContain("/auth/google?next=");
		expect(googleLoginHref()).toContain(encodeURIComponent("/study/mistakes"));
		closeLoginPrompt();
		expect(LOGIN_PROMPT).toBeNull();
	});
});

describe("favorites", () => {
	it("toggles catalog items and selection notes", () => {
		registerFavMeta("grammar#1-1#0", {
			module: "grammar",
			hash: "#/day/1-1",
			w: 1,
			d: 1,
			jp: "ばかり",
			cn: "刚做完",
		});
		toggleFav("grammar#1-1#0");
		expect(favsPayload().total).toBe(1);
		toggleFav("grammar#1-1#0");
		expect(favsPayload().total).toBe(0);

		saveSelectionFav("word", "冷蔵庫", "#/day/1-1");
		expect(favsPayload().total).toBe(1);
		expect(favsPayload().items[0].selectionType).toBe("word");

		setFavFilter("selection");
		expect(favsPayload().filter).toBe("selection");
		clearFavs();
		expect(favsPayload().total).toBe(0);
	});

	it("blocks guest favorite writes and notebook navigation when accounts are on", () => {
		setAccountStateForTests(null, true);
		const seen: string[] = [];
		setNavImpl((key) => seen.push(key));
		registerFavMeta("grammar#1-1#0", {
			module: "grammar",
			hash: "#/day/1-1",
			w: 1,
			d: 1,
			jp: "ばかり",
			cn: "刚做完",
		});
		toggleFav("grammar#1-1#0");
		expect(favsPayload().total).toBe(0);
		expect(LOGIN_PROMPT?.reason).toBe("favs");
		expect(needsAccount()).toBe(true);

		closeLoginPrompt();
		goAccountPage("#/mistakes");
		expect(seen).toEqual([]);
		expect(LOGIN_PROMPT?.reason).toBe("mistakes");
		expect(LOGIN_PROMPT?.next).toBe("/study/mistakes");

		setAccountStateForTests({ id: "g_1", email: "a@b.c", name: "Ada", picture: "" }, true);
		expect(requestAccount("favs")).toBe(true);
		goAccountPage("#/favs");
		expect(seen).toEqual(["#/favs"]);
	});

	it("keeps guest favorites local and does not push", async () => {
		const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
			const url = String(input);
			if (url.includes("/api/me")) return Response.json({ user: null, configured: true });
			return new Response("no", { status: 500 });
		});
		vi.stubGlobal("fetch", fetchMock);
		saveSelectionFav("word", "冷蔵庫", "#/");
		await bootAccount();
		expect(ACCOUNT).toBeNull();
		expect(accountReady).toBe(true);
		expect(authConfigured).toBe(true);
		expect(favsPayload().total).toBe(1);
		expect(fetchMock.mock.calls.some((call) => String(call[0]).includes("/api/favorites"))).toBe(false);
	});

	it("merges local favorites into an empty account on first login", async () => {
		saveSelectionFav("word", "冷蔵庫", "#/");
		const puts: string[] = [];
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
				const url = String(input);
				if (url.includes("/api/me")) {
					return Response.json({
						user: { id: "g_1", email: "a@b.c", name: "Ada", picture: "" },
						configured: true,
					});
				}
				if (url.includes("/api/favorites") && init?.method === "PUT") {
					puts.push(String(init.body));
					return Response.json({ ok: true });
				}
				if (url.includes("/api/favorites")) return Response.json({});
				if (url.includes("/api/mistakes")) return Response.json([]);
				return new Response("no", { status: 404 });
			}),
		);
		await bootAccount();
		expect(ACCOUNT?.id).toBe("g_1");
		expect(favsPayload().total).toBe(1);
		expect(puts.some((body) => body.includes("冷蔵庫"))).toBe(true);
		expect(localStorage.getItem("accountId")).toBe("g_1");
	});

	it("does not leak the previous account's local favorites into a different user", async () => {
		localStorage.setItem("accountId", "g_old");
		saveSelectionFav("word", "旧账号的词", "#/");
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: RequestInfo | URL) => {
				const url = String(input);
				if (url.includes("/api/me")) {
					return Response.json({
						user: { id: "g_new", email: "n@b.c", name: "New", picture: "" },
						configured: true,
					});
				}
				if (url.includes("/api/favorites")) {
					return Response.json({
						cloud: { module: "selection", hash: "#/", w: "", d: "", jp: "サーバ", cn: "云端", ts: 1 },
					});
				}
				if (url.includes("/api/mistakes")) return Response.json([]);
				return new Response("no", { status: 404 });
			}),
		);
		await bootAccount();
		expect(ACCOUNT?.id).toBe("g_new");
		expect(Object.keys(favsPayload().items.reduce((acc: Record<string, true>, item) => {
			acc[item.jp] = true;
			return acc;
		}, {}))).toContain("サーバ");
		expect(favsPayload().items.some((item) => item.jp === "旧账号的词")).toBe(false);
	});

	it("builds a favorites flashcard deck", () => {
		saveSelectionFav("word", "冷蔵庫", "#/");
		saveSelectionFav("grammar", "ばかり", "#/");
		startFavStudyCards();
		const first = favsPayload();
		void first;
		flipFavCard();
		nextFavCard();
		closeFavStudyCards();
		expect(favsPayload().studyMode).toBe(false);
	});
});

describe("search and cards", () => {
	it("indexes grammar and vocab, then opens a hit", () => {
		seedGrammar();
		seedVocab();
		const index = getSearchIndex();
		expect(index.some((hit) => hit.key === "ばかり")).toBe(true);
		expect(index.some((hit) => hit.key === "冷蔵庫")).toBe(true);
		expect(searchHits("ばかり")[0].key).toBe("ばかり");
		expect(searchHits("ばかり", 60, "grammar")[0].key).toBe("ばかり");
		expect(searchHits("ばかり", 60, "vocab")).toEqual([]);
		expect(searchHits("冷蔵庫", 60, "vocab")[0].key).toBe("冷蔵庫");
		expect(searchCategoryForModule("n4kanji")).toBe("kanji");

		const seen: string[] = [];
		setNavImpl((key) => seen.push(key));
		openSearchHit(index.find((hit) => hit.key === "ばかり"), "ばかり");
		expect(MODULE).toBe("grammar");
		expect(seen[0]).toContain("#/day/1-1/p0");
		expect(getSearchHistory()).toContain("ばかり");
		clearSearchHistory();
		expect(getSearchHistory()).toEqual([]);
	});

	it("keeps typed search history newest first", () => {
		saveSearchHistory("fridge");
		saveSearchHistory("冰箱");
		saveSearchHistory("fridge");
		expect(getSearchHistory()).toEqual(["fridge", "冰箱"]);
	});

	it("searches active mistake notes and opens the matching mistake type", () => {
		addMistake("q", "商品券の読み方\n正确答案：しょうひんけん");
		const hits = searchHits("商品券", 60, "mistakes");
		expect(hits).toHaveLength(1);
		expect(hits[0]).toMatchObject({ module: "mistakes", mistakeType: "q" });
		expect(searchEntryCount("mistakes")).toBe(1);

		const seen: string[] = [];
		setNavImpl((key) => seen.push(key));
		openSearchHit(hits[0], "商品券");
		expect(seen).toEqual(["#/mistakes"]);
	});

	it("builds and walks a grammar card deck", () => {
		seedGrammar();
		setCardsWeek(0);
		expect(cardsWeeks()).toBe(1);
		expect(cardsKind()).toBe("gram");
		expect(cardsState().deck.length).toBeGreaterThan(0);
		flipCard();
		expect(cardsState().flipped).toBe(true);
		nextCard();
		expect(cardsState().flipped).toBe(false);
		prevCard();
		shuffleCards();
		expect(cardsState().idx).toBe(0);
	});
});

describe("home catalog", () => {
	it("opens the last visited week and describes the current book", () => {
		seedGrammar();
		saveLastVisit("#/day/1-1");
		expect(entryHash("grammar")).toBe("#/day/1-1");
		const open = openWeekSet();
		expect(open.has(1)).toBe(true);
		toggleWeek(1);
		expect(open.has(1)).toBe(false);
		expect(homeScale()).toBe("week");
		expect(homeIntro()).toMatch(/语法|grammar/i);
	});
});

describe("window compatibility shim", () => {
	it("still exposes the same window bridges for leftover callers", () => {
		installStudyBridges();
		expect(typeof window.__studySay).toBe("function");
		expect(typeof window.__studyMistakes?.add).toBe("function");
		window.__studyMistakes?.add("旧桥接仍可用");
		expect(mistakesPayload().list[0].text).toBe("旧桥接仍可用");
	});

	it("runs the after-paint hook", () => {
		const fn = vi.fn();
		setAfterPaint(fn);
		afterPaint();
		expect(fn).toHaveBeenCalled();
	});
});
