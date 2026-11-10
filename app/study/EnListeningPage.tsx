import { useEffect, useMemo, useState } from "react";

import { jstToday } from "./lesson-review";
import {
	isEnListeningArticle,
	isEnListeningIndex,
	youtubeEmbedSrc,
	type EnListeningArticle,
	type EnListeningIndex,
	type EnListeningIndexEntry,
} from "./en-listening";
import { lx, navTo } from "./store";
import "../routes/it-listening.css";

const DONE_KEY = "enl-done";
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

function readDone(): Set<string> {
	try {
		const raw = JSON.parse(localStorage.getItem(DONE_KEY) || "[]") as unknown;
		if (!Array.isArray(raw)) return new Set();
		return new Set(raw.filter((id) => typeof id === "string"));
	} catch {
		return new Set();
	}
}

function fmtDuration(sec?: number): string {
	if (!sec) return "";
	const m = Math.floor(sec / 60);
	const s = sec % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}

function fmtRange(start: number, end: number): string {
	return `${fmtDuration(start)}–${fmtDuration(end)}`;
}

export function EnListeningPage({ articleId }: { articleId?: string }) {
	return articleId ? <EnListeningDetail id={articleId} /> : <EnListeningList />;
}

function EnListeningList() {
	const [index, setIndex] = useState<EnListeningIndex | null>(null);
	const [error, setError] = useState(false);
	const [done, setDone] = useState<Set<string>>(() => new Set());

	useEffect(() => {
		setDone(readDone());
		let alive = true;
		loadJson("/data/en-listening/index.json")
			.then((v) => {
				if (!alive) return;
				if (isEnListeningIndex(v)) setIndex(v);
				else setError(true);
			})
			.catch(() => alive && setError(true));
		return () => {
			alive = false;
		};
	}, []);

	const today = jstToday();
	const byId = useMemo(() => new Map((index?.articles ?? []).map((a) => [a.id, a])), [index]);

	return (
		<div className="itl-page">
			<section className="itl-hero">
				<div>
					<span className="itl-eyebrow">ENGLISH LISTENING</span>
					<h1>{lx("英语听力", "English listening")}</h1>
					<p>
						{lx(
							"真人英语，嵌原视频片段。技术面试和职场短对话，逐句对照。没有合成语音。",
							"Real people, embedded from the original videos. Interview English and short workplace clips, sentence by sentence. No synthesized speech.",
						)}
					</p>
				</div>
			</section>

			{error ? (
				<div className="itl-empty">{lx("列表加载失败，请稍后重试。", "Failed to load the list.")}</div>
			) : !index ? (
				<div className="itl-empty">{lx("加载中…", "Loading…")}</div>
			) : (
				<>
					<section>
						<h2 className="itl-card-series">{lx("托业官方样题", "Official TOEIC samples")}</h2>
						<p className="itl-ch-note">
							{lx(
								"听力音频在 IIBC 官方样题页播放。ETS 的 PDF 是试卷，不把音频拷进本站。",
								"Listening audio plays on the official IIBC sample page. The ETS PDF is the test book; its audio is not copied here.",
							)}
						</p>
						<div className="enl-links">
							{index.official.map((link) => (
								<a key={link.url} href={link.url} target="_blank" rel="noreferrer">
									<b>{link.label_zh}</b>
									<span>{link.note_zh}</span>
								</a>
							))}
						</div>
					</section>

					<section>
						<h2 className="itl-card-series">{lx("11/11–11/30 · 每天约 20 分钟", "Nov 11–30 · about 20 minutes a day")}</h2>
						<ul className="enl-plan">
							{index.plan.map((day) => {
								const article = byId.get(day.id);
								return (
									<li key={day.date} className={day.date === today ? "on" : undefined}>
										<span>{day.date.slice(5)}</span>
										<span className="tag">{day.pass === "new" ? lx("新", "new") : lx("复习", "again")}</span>
										<button type="button" onClick={() => article && navTo(`#/en-listening/${article.id}`)}>
											{article?.textbookTitle_zh ?? day.id}
											{done.has(day.id) ? " ✓" : ""}
										</button>
									</li>
								);
							})}
						</ul>
					</section>

					<SegmentList title={lx("技术与面试", "Tech and interviews")} articles={index.articles.filter((a) => a.series_zh === "技术与面试")} done={done} />
					<SegmentList title={lx("商务日常", "Everyday business")} articles={index.articles.filter((a) => a.series_zh === "商务日常")} done={done} />
				</>
			)}
		</div>
	);
}

function SegmentList({ title, articles, done }: { title: string; articles: EnListeningIndexEntry[]; done: Set<string> }) {
	if (!articles.length) return null;
	return (
		<section>
			<h2 className="itl-card-series">{title}</h2>
			<div className="itl-list">
				{articles.map((a) => (
					<article className="itl-card" key={a.id}>
						<button className="itl-card-main" onClick={() => navTo(`#/en-listening/${a.id}`)}>
							<span className="itl-card-series">{a.series_zh}</span>
							<strong>
								{a.videoTitle}
								{done.has(a.id) ? <span className="itl-done-badge">✓ {lx("学完", "Done")}</span> : null}
							</strong>
							<span className="itl-card-sub">{a.textbookTitle_zh}</span>
							<span className="itl-card-meta">
								{a.source} · {fmtRange(a.startSec, a.endSec)} · {lx(`${a.sentenceCount} 句`, `${a.sentenceCount} sentences`)}
							</span>
						</button>
						<a className="itl-card-yt" href={a.youtube} target="_blank" rel="noreferrer">
							▶ YouTube
						</a>
					</article>
				))}
			</div>
		</section>
	);
}

function EnListeningDetail({ id }: { id: string }) {
	const [article, setArticle] = useState<EnListeningArticle | null>(null);
	const [error, setError] = useState(false);
	const [done, setDone] = useState(false);

	useEffect(() => {
		setDone(readDone().has(id));
		let alive = true;
		setArticle(null);
		setError(false);
		loadJson(`/data/en-listening/${id}.json`)
			.then((v) => {
				if (!alive) return;
				if (isEnListeningArticle(v)) setArticle(v);
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

	const toggleDone = () => {
		const next = readDone();
		if (next.has(id)) next.delete(id);
		else next.add(id);
		localStorage.setItem(DONE_KEY, JSON.stringify([...next]));
		setDone(next.has(id));
	};

	if (error) {
		return (
			<div className="itl-page">
				<div className="itl-empty">{lx("这一篇加载失败。", "Failed to load this segment.")}</div>
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
				<span className="itl-card-series">{article.series_zh}</span>
				<h1>{article.videoTitle}</h1>
				<p className="itl-head-ja">{article.textbookTitle_zh}</p>
				<p className="itl-head-meta">
					{lx("来源", "Source")}：{article.source} · {fmtRange(article.startSec, article.endSec)} · {lx(`${article.sentences.length} 句`, `${article.sentences.length} sentences`)}
				</p>
				<button type="button" className={`itl-done-btn${done ? " on" : ""}`} aria-pressed={done} onClick={toggleDone}>
					{done ? lx("✓ 已学完（点此取消）", "✓ Finished (tap to undo)") : lx("学完这篇 ✓", "Mark this segment as finished ✓")}
				</button>
			</header>

			<section className="itl-player">
				<div className="itl-embed">
					<iframe
						src={youtubeEmbedSrc(article.videoId, article.startSec, article.endSec)}
						title={article.videoTitle}
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
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
							{s.speaker ? <span className={`itl-speaker sp${speakerClass.get(s.speaker) ?? 0}`}>{s.speaker}</span> : null}
						</div>
						<p className="itl-jp">{s.en}</p>
						<p className="itl-zh">{s.zh}</p>
						{s.note ? (
							<p className="itl-grammar">
								<b>{lx("说法", "Phrase")}</b>
								{s.note}
							</p>
						) : null}
						{s.vocab && s.vocab.length ? (
							<ul className="itl-vocab">
								{s.vocab.map((v, j) => (
									<li key={j}>
										<b>{v.w}</b>
										<span className="itl-v-zh">{v.zh}</span>
									</li>
								))}
							</ul>
						) : null}
					</li>
				))}
			</ol>
		</div>
	);
}
