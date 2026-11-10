import { useEffect, useMemo, useRef, useState } from "react";

import { SayButton } from "../routes/study-common";
import {
	isItListeningArticle,
	isItListeningIndex,
	isMistakeWordsFile,
	parseRubyMarkup,
	type ItListeningArticle,
	type ItListeningIndex,
	type ItListeningIndexEntry,
	type ItListeningPatternExample,
	type ItListeningRubySegment,
	type MistakeWordsFile,
} from "./it-listening";
import { Theme } from "@astryxdesign/core/theme";
import { Tab, TabList } from "@astryxdesign/core/TabList";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

import { toggleItlDone, useItlDone } from "./itl-done";
import { lx, navTo, THEME } from "./store";
import "./astryx.css";
import "../routes/it-listening.css";

const cache = new Map<string, Promise<unknown>>();

function loadJson(url: string): Promise<unknown> {
	let p = cache.get(url);
	if (!p) {
		p = fetch(url).then((r) => {
			if (!r.ok) throw new Error(`${url} ${r.status}`);
			return r.json();
		});
		p.catch(() => cache.delete(url));
		cache.set(url, p);
	}
	return p;
}

/** ruby 分段渲染：带 r 的片段以 <ruby> 呈现，其余原样文本。 */
function RubySegments({ segs }: { segs: ItListeningRubySegment[] }) {
	return (
		<>
			{segs.map((seg, k) =>
				seg.r ? (
					<ruby key={k}>
						{seg.t}
						<rt>{seg.r}</rt>
					</ruby>
				) : (
					<span key={k}>{seg.t}</span>
				),
			)}
		</>
	);
}

/** 解说文本渲染：先把 {漢字|よみ} 轻量标记解析成 ruby 分段再渲染。 */
function RubyMarkup({ text }: { text: string }) {
	return <RubySegments segs={parseRubyMarkup(text)} />;
}

/** 文末小结的例句卡：日语（带注音）+ 中译 + 出处标注（本篇原句 / 通用例句明确区分）。 */
function PatternExample({ ex }: { ex: ItListeningPatternExample }) {
	return (
		<div className="itl-pat-ex">
			<p className="itl-pat-ex-jp">{ex.ruby && ex.ruby.length ? <RubySegments segs={ex.ruby} /> : ex.jp}</p>
			<p className="itl-pat-ex-zh">{ex.zh}</p>
			<span className={`itl-pat-src${ex.origin === "general" ? " gen" : ""}`}>{ex.ref}</span>
		</div>
	);
}

function fmtDuration(sec?: number): string {
	if (!sec) return "";
	const m = Math.floor(sec / 60);
	const s = sec % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}

export function ItListeningPage({ articleId }: { articleId?: string }) {
	if (articleId === "mistakes") return <MistakeWords />;
	return articleId ? <ItListeningDetail id={articleId} /> : <ItListeningList />;
}

/** 错词本：精听错词（带错法备注）+ 来源篇目生词的合并清单，数据在 mistake-words.json。 */
function MistakeWords() {
	const [file, setFile] = useState<MistakeWordsFile | null>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		let alive = true;
		loadJson("/data/it-listening/mistake-words.json")
			.then((v) => {
				if (!alive) return;
				if (isMistakeWordsFile(v)) setFile(v);
				else setError(true);
			})
			.catch(() => alive && setError(true));
		return () => {
			alive = false;
		};
	}, []);

	return (
		<div className="itl-page">
			<section className="itl-hero">
				<div>
					<span className="itl-eyebrow">MISTAKE WORDS</span>
					<h1>{lx("错词本", "Mistake Words")}</h1>
					<p>
						{file?.note_zh ??
							lx("精听时没听出、听错的词，加上来源篇目的生词，合并去重后的一本清单。", "Words missed in dictation plus the source article's vocabulary, merged and deduped.")}
					</p>
				</div>
			</section>

			{error ? (
				<div className="itl-empty">{lx("错词本加载失败，请稍后重试。", "Failed to load the mistake-word list.")}</div>
			) : !file ? (
				<div className="itl-empty">{lx("加载中…", "Loading…")}</div>
			) : (
				<>
					<p className="itl-mw-count">
						{lx(
							`共 ${file.entries.length} 词 · 其中精听错词 ${file.entries.filter((e) => e.missed).length} 词`,
							`${file.entries.length} words · ${file.entries.filter((e) => e.missed).length} missed in dictation`,
						)}
					</p>
					<ul className="itl-mw-list">
						{file.entries.map((e) => (
							<li key={e.w} className="itl-mw-row">
								<div className="itl-mw-top">
									<b className="itl-mw-w">{e.w}</b>
									<span className="itl-mw-r">{e.r}</span>
									{e.pos ? <span className="itl-v-pos">{e.pos}</span> : null}
									{e.missed ? <span className="itl-mw-badge">{lx("错", "missed")}</span> : null}
									<SayButton text={e.w} />
								</div>
								<div className="itl-mw-zh">
									{e.zh}
									{e.origin ? <span className="itl-v-from">← {e.origin}</span> : null}
								</div>
								{e.note ? <p className="itl-mw-note">{e.note}</p> : null}
								<div className="itl-mw-meta">
									{lx("来源", "Source")}：{e.source} · {lx("添加", "Added")}：{e.added}
								</div>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}

type ChannelSection = {
	key: string;
	name: string;
	note: string;
	channelUrl?: string;
	articles: ItListeningIndexEntry[];
};

/** 按来源频道分组：归属以数据 channelUrl 为准（source 文本兜底），区内保留 index 原序（系列/单元排序不变）。 */
function channelSections(articles: ItListeningIndexEntry[]): ChannelSection[] {
	const defs: (ChannelSection & { test: (a: ItListeningIndexEntry) => boolean })[] = [
		{
			key: "workplace",
			name: lx("真实职场·面试", "Real workplace & interviews"),
			note: lx(
				"真人职场：前端工程师对谈、海外团队的故障联络、漏洞应对、中途面试官看材料、工程师模拟面试。逐句对照翻译和语法。",
				"Real people at work: a frontend panel, an outage across time zones, patching vulnerabilities, and engineer interviews.",
			),
			articles: [],
			test: (a) => a.series_zh === "真实职场·面试",
		},
		{
			key: "mainichi",
			name: "まいにち日本語勉強（IT業務編）",
			note: lx("视频来源频道：まいにち日本語勉強 · 教材《IT業務編》——「場面で覚える」「ウォームアップ」モデル会話", "Source channel: まいにち日本語勉強 — IT業務編 textbook model conversations"),
			channelUrl: "https://www.youtube.com/@mainichi.nihongo.benkyo",
			articles: [],
			test: (a) => (a.channelUrl ?? "").includes("mainichi.nihongo.benkyo") || a.source.includes("まいにち"),
		},
		{
			key: "huong",
			name: "HuongTLU",
			note: lx("视频来源频道：HuongTLU · IT 沟通会话系列 + 教材「聞き取り」脚本", "Source channel: HuongTLU — IT communication conversations + textbook listening scripts"),
			channelUrl: "https://www.youtube.com/@HuongTLU",
			articles: [],
			test: (a) => (a.channelUrl ?? "").includes("HuongTLU") || a.source.includes("Huong"),
		},
	];
	const other: ItListeningIndexEntry[] = [];
	for (const a of articles) {
		const sec = defs.find((d) => d.test(a));
		if (sec) sec.articles.push(a);
		else other.push(a);
	}
	const out: ChannelSection[] = defs.filter((d) => d.articles.length).map(({ test: _t, ...rest }) => rest);
	if (other.length) out.push({ key: "other", name: lx("其他来源", "Other sources"), note: lx("未标注频道的文章", "Articles without a channel tag"), articles: other });
	return out;
}

const ITL_TAB_KEY = "itl-channel-tab";

function ItListeningList() {
	const { doneIds } = useItlDone();
	const [index, setIndex] = useState<ItListeningIndex | null>(null);
	const [error, setError] = useState(false);
	// 记住上次选中的频道 Tab（设备本地）；默认主频道 まいにち日本語勉強。
	const [tab, setTab] = useState<string>(() => {
		try {
			return localStorage.getItem(ITL_TAB_KEY) || "mainichi";
		} catch {
			return "mainichi";
		}
	});

	useEffect(() => {
		let alive = true;
		loadJson("/data/it-listening/index.json")
			.then((v) => {
				if (!alive) return;
				if (isItListeningIndex(v)) setIndex(v);
				else setError(true);
			})
			.catch(() => alive && setError(true));
		return () => {
			alive = false;
		};
	}, []);

	const sections = useMemo(() => (index ? channelSections(index.articles) : []), [index]);
	const active = sections.find((s) => s.key === tab) ?? sections[0];

	const pickTab = (key: string) => {
		setTab(key);
		try {
			localStorage.setItem(ITL_TAB_KEY, key);
		} catch {
			/* 记忆失败不影响切换 */
		}
	};

	return (
		<div className="itl-page">
			<section className="itl-hero">
				<div>
					<span className="itl-eyebrow">IT BUSINESS LISTENING</span>
					<h1>{lx("IT 听力", "IT Listening")}</h1>
					<p>{lx("日语 IT 职场听力原文逐句精学：原文 + 翻译 + 语法 + 生词，点开文章可边听视频边对照。", "Sentence-by-sentence study of Japanese IT workplace listening: text, translation, grammar and vocabulary.")}</p>
				</div>
			</section>

			<button className="itl-mw-banner" onClick={() => navTo("#/it-listening/mistakes")}>
				<span className="itl-mw-banner-t">📕 {lx("错词本", "Mistake Words")}</span>
				<span className="itl-mw-banner-sub">{lx("精听错词 + 篇目生词的合并清单", "Dictation misses merged with article vocabulary")}</span>
			</button>

			{error ? (
				<div className="itl-empty">{lx("文章列表加载失败，请稍后重试。", "Failed to load the article list.")}</div>
			) : !index || !active ? (
				<div className="itl-empty">{lx("加载中…", "Loading…")}</div>
			) : (
				<>
					<Theme theme={neutralTheme} mode={THEME === "dark" ? "dark" : "light"}>
						<div className="astryx-scope itl-tabs-scope">
							<TabList value={active.key} onChange={pickTab} role="tablist" aria-label={lx("来源频道", "Source channel")} size="lg">
								{sections.map((sec) => (
									<Tab
										key={sec.key}
										value={sec.key}
										label={sec.name}
										endContent={<span className="itl-tab-n">{sec.articles.length}</span>}
									/>
								))}
							</TabList>
						</div>
					</Theme>
					<p className="itl-ch-note">
						{active.note}
						{active.channelUrl ? (
							<>
								{" · "}
								<a className="itl-ch-link" href={active.channelUrl} target="_blank" rel="noreferrer">
									▶ {lx("频道主页", "Channel")} ↗
								</a>
							</>
						) : null}
					</p>
					<div className="itl-list">
						{active.articles.map((a) => (
							<article className="itl-card" key={a.id}>
								<button className="itl-card-main" onClick={() => navTo(`#/it-listening/${a.id}`)}>
									<span className="itl-card-series">
										{a.series_zh ?? ""}
										{a.unit ? ` · Unit ${a.unit}` : ""}
										{a.track ? ` · ${a.track}` : ""}
									</span>
									<strong>
										{a.title_zh}
										{doneIds.has(a.id) ? <span className="itl-done-badge">✓ {lx("学完", "Done")}</span> : null}
									</strong>
									{a.textbookTitle_zh ? <span className="itl-card-sub">{a.textbookTitle_zh}</span> : null}
									<span className="itl-card-ja">{a.textbookTitle_ja ?? a.title_ja}</span>
									<span className="itl-card-meta">
										{a.source} · {lx(`${a.sentenceCount} 句`, `${a.sentenceCount} sentences`)}
										{a.durationSec ? ` · ${fmtDuration(a.durationSec)}` : ""}
									</span>
								</button>
								<a className="itl-card-yt" href={a.youtube} target="_blank" rel="noreferrer">
									▶ YouTube
								</a>
							</article>
						))}
					</div>
				</>
			)}
		</div>
	);
}

function ItListeningDetail({ id }: { id: string }) {
	const { doneIds } = useItlDone();
	const done = doneIds.has(id);
	const [article, setArticle] = useState<ItListeningArticle | null>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		let alive = true;
		setArticle(null);
		setError(false);
		loadJson(`/data/it-listening/${id}.json`)
			.then((v) => {
				if (!alive) return;
				if (isItListeningArticle(v)) setArticle(v);
				else setError(true);
			})
			.catch(() => alive && setError(true));
		return () => {
			alive = false;
		};
	}, [id]);

	const speakerClass = useMemo(() => {
		const map = new Map<string, number>();
		if (article) {
			for (const s of article.sentences) {
				const sp = s.speaker ?? "";
				if (!map.has(sp)) map.set(sp, map.size % 2);
			}
		}
		return map;
	}, [article]);

	// 视频悬浮：播放器滚出可视区后，同一个 iframe 实例缩成角落小窗（不重挂载、不断播），
	// 带播放/暂停（YouTube IFrame API 命令）与关闭钮；关掉后本次滚动内不再悬浮，
	// 滚回顶部让播放器重新入镜时重置。
	const playerSlotRef = useRef<HTMLDivElement | null>(null);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const [playerOut, setPlayerOut] = useState(false);
	const [floatDismissed, setFloatDismissed] = useState(false);
	const [ytPlaying, setYtPlaying] = useState<boolean | null>(null);
	const floating = playerOut && !floatDismissed;

	useEffect(() => {
		setFloatDismissed(false);
		setYtPlaying(null);
	}, [id]);

	useEffect(() => {
		const el = playerSlotRef.current;
		if (!el || typeof IntersectionObserver === "undefined") return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					setPlayerOut(!e.isIntersecting);
					if (e.isIntersecting) setFloatDismissed(false);
				}
			},
			{ threshold: 0.05 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [article?.videoId]);

	useEffect(() => {
		const onMsg = (ev: MessageEvent) => {
			if (typeof ev.data !== "string" || (!ev.data.includes("onStateChange") && !ev.data.includes("infoDelivery"))) return;
			try {
				const d = JSON.parse(ev.data) as { event?: string; info?: number | { playerState?: number } };
				// 两种回传形状：onStateChange 的 info 是数字状态；listening 握手后状态走 infoDelivery 的 info.playerState。
				// 状态码：1 播放中 / 2 已暂停 / 0 结束 / 5 已定位未播。
				let st: number | undefined;
				if (typeof d.info === "number") st = d.info;
				else if (d.info && typeof d.info.playerState === "number") st = d.info.playerState;
				if (st === 1) setYtPlaying(true);
				else if (st === 2 || st === 0 || st === 5) setYtPlaying(false);
			} catch {
				/* 非播放器消息，忽略 */
			}
		};
		window.addEventListener("message", onMsg);
		return () => window.removeEventListener("message", onMsg);
	}, []);

	const ytCommand = (func: string) => {
		iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
	};
	const subscribeYtState = () => {
		const win = iframeRef.current?.contentWindow;
		if (!win) return;
		// listening 握手：不加载 API 脚本时靠它订阅状态回传（infoDelivery）。
		win.postMessage(JSON.stringify({ event: "listening", id: "itl-player", channel: "widget" }), "*");
		win.postMessage(JSON.stringify({ event: "command", func: "addEventListener", args: ["onStateChange"] }), "*");
	};

	// 悬浮窗出现时再补一次订阅（防 load 时机太早握手没赶上）。
	useEffect(() => {
		if (floating) subscribeYtState();
	}, [floating]);
	const toggleYtPlay = () => {
		if (ytPlaying) {
			ytCommand("pauseVideo");
			setYtPlaying(false);
		} else {
			ytCommand("playVideo");
			setYtPlaying(true);
		}
	};

	if (error) {
		return (
			<div className="itl-page">
				<div className="itl-empty">{lx("文章加载失败。", "Failed to load this article.")}</div>
			</div>
		);
	}
	if (!article) {
		return (
			<div className="itl-page">
				<div className="itl-empty">{lx("加载中…", "Loading…")}</div>
			</div>
		);
	}

	return (
		<div className="itl-page">
			<header className="itl-head">
				<span className="itl-card-series">
					{article.series_zh ?? ""}
					{article.unit ? ` · Unit ${article.unit}` : ""}
					{article.track ? ` · ${article.track}` : ""}
				</span>
				<h1>{article.title_zh}</h1>
				<p className="itl-head-ja">{article.textbookTitle_zh ? `${article.textbookTitle_zh} · ${article.textbookTitle_ja ?? ""}` : article.title_ja}</p>
				<p className="itl-head-meta">
					{lx("来源", "Source")}：{article.source}
					{article.durationSec ? ` · ${fmtDuration(article.durationSec)}` : ""} · {lx(`${article.sentences.length} 句`, `${article.sentences.length} sentences`)}
				</p>
				<button type="button" className={`itl-done-btn${done ? " on" : ""}`} aria-pressed={done} onClick={() => toggleItlDone(id)}>
					{done ? lx("✓ 已学完（点此取消）", "✓ Finished (tap to undo)") : lx("学完这篇 ✓", "Mark this article as finished ✓")}
				</button>
			</header>

			<section className="itl-player">
				<div className="itl-player-slot" ref={playerSlotRef}>
					<div className={`itl-embed${floating ? " itl-embed--float" : ""}`}>
						<iframe
							ref={iframeRef}
							src={`https://www.youtube.com/embed/${article.videoId}?enablejsapi=1&playsinline=1`}
							title={article.title_ja}
							loading="lazy"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							onLoad={subscribeYtState}
						/>
						{floating ? (
							<>
								<button
									type="button"
									className="itl-float-btn itl-float-toggle"
									onClick={toggleYtPlay}
									aria-label={ytPlaying ? lx("暂停", "Pause") : lx("播放", "Play")}
								>
									{ytPlaying ? "⏸" : "▶"}
								</button>
								<button
									type="button"
									className="itl-float-btn itl-float-close"
									onClick={() => setFloatDismissed(true)}
									aria-label={lx("关闭悬浮窗", "Close floating player")}
								>
									✕
								</button>
							</>
						) : null}
					</div>
				</div>
				<a className="itl-yt-open" href={article.youtube} target="_blank" rel="noreferrer">
					▶ {lx("在 YouTube 打开原视频", "Open the original video on YouTube")} ↗
				</a>
			</section>

			{article.note_zh ? <p className="itl-note">{article.note_zh}</p> : null}

			<ol className="itl-sentences">
				{article.sentences.map((s, i) => (
					<li className="itl-sentence" key={i}>
						<div className="itl-s-top">
							<span className="itl-s-no">{i + 1}</span>
							{s.speaker ? (
								<span className={`itl-speaker sp${speakerClass.get(s.speaker) ?? 0}`}>
									{s.speakerRuby && s.speakerRuby.length ? <RubySegments segs={s.speakerRuby} /> : s.speaker}
								</span>
							) : null}
						</div>
						<p className="itl-jp">{s.ruby && s.ruby.length ? <RubySegments segs={s.ruby} /> : s.jp}</p>
						<p className="itl-zh">{s.zh}</p>
						{s.structure ? (
							<p className="itl-structure">
								<b>{lx("结构", "Structure")}</b>
								<RubyMarkup text={s.structure} />
							</p>
						) : null}
						{s.grammarPoints && s.grammarPoints.length ? (
							<div className="itl-gps">
								{s.grammarPoints.map((g, j) => (
									<div className="itl-gp" key={j}>
										<div className="itl-gp-head">
											{g.level ? <span className="itl-gp-level">{g.level}</span> : null}
											<span className="itl-gp-name">
												<RubyMarkup text={g.name} />
											</span>
										</div>
										<p className="itl-gp-text">
											<RubyMarkup text={g.explanationZh} />
										</p>
									</div>
								))}
							</div>
						) : null}
						{s.grammar ? (
							<p className="itl-grammar">
								<b>{lx("语法", "Grammar")}</b>
								{s.grammar}
							</p>
						) : null}
						{s.vocab && s.vocab.length ? (
							<ul className="itl-vocab">
								{s.vocab.map((v, j) => (
									<li key={j}>
										<b>{v.w}</b>
										<span className="itl-v-r">{v.r}</span>
										{v.pos ? <span className="itl-v-pos">{v.pos}</span> : null}
										<span className="itl-v-zh">{v.zh}</span>
										{v.origin ? <span className="itl-v-from">← {v.origin}</span> : null}
									</li>
								))}
							</ul>
						) : null}
						{s.modelAnswer ? (
							<div className="itl-model">
								<span className="itl-model-label">{lx("回答例（Daniel 版）", "Sample answer (Daniel's version)")}</span>
								<p className="itl-model-jp">
									{s.modelAnswer.ruby && s.modelAnswer.ruby.length ? <RubySegments segs={s.modelAnswer.ruby} /> : s.modelAnswer.jp}
								</p>
								<p className="itl-model-zh">{s.modelAnswer.zh}</p>
								{s.modelAnswer.points ? (
									<div className="itl-points">
										<span className="itl-points-label">{lx("答题要点", "How to answer")}</span>
										<p>
											<b>{lx("面试官在看什么", "What they assess")}</b>
											{s.modelAnswer.points.intent}
										</p>
										<p>
											<b>{lx("推荐结构", "Structure")}</b>
											{s.modelAnswer.points.structure}
										</p>
										<p>
											<b>{lx("雷区", "Pitfalls")}</b>
											{s.modelAnswer.points.pitfalls}
										</p>
									</div>
								) : null}
							</div>
						) : null}
					</li>
				))}
			</ol>

			{article.patterns ? (
				<section className="itl-patterns">
					<h2 className="itl-patterns-title">{article.patterns.title}</h2>
					{article.patterns.intro ? <p className="itl-patterns-intro">{article.patterns.intro}</p> : null}
					{article.patterns.groups.map((g, gi) => (
						<div className="itl-pat-group" key={gi}>
							<h3 className="itl-pat-heading">{g.heading}</h3>
							{g.body.map((p, pi) => (
								<p className="itl-pat-body" key={pi}>
									{p}
								</p>
							))}
							{g.examples && g.examples.length ? (
								<div className="itl-pat-examples">
									{g.examples.map((ex, ei) => (
										<PatternExample ex={ex} key={ei} />
									))}
								</div>
							) : null}
							{g.entries && g.entries.length
								? g.entries.map((e, ei) => (
										<div className="itl-pat-entry" key={ei}>
											<p className="itl-pat-form">{e.form}</p>
											<p className="itl-pat-usage">{e.usage}</p>
											<div className="itl-pat-examples">
												{e.examples.map((ex, xi) => (
													<PatternExample ex={ex} key={xi} />
												))}
											</div>
										</div>
									))
								: null}
							{g.tip ? (
								<p className="itl-pat-tip">
									<b>{lx("借用提示", "Borrow this move")}</b>
									{g.tip}
								</p>
							) : null}
						</div>
					))}
				</section>
			) : null}
		</div>
	);
}
