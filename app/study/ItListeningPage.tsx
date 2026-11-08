import { useEffect, useMemo, useState } from "react";

import { SayButton } from "../routes/study-common";
import {
	isItListeningArticle,
	isItListeningIndex,
	parseRubyMarkup,
	type ItListeningArticle,
	type ItListeningIndex,
	type ItListeningRubySegment,
} from "./it-listening";
import { lx, navTo } from "./store";
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

function fmtDuration(sec?: number): string {
	if (!sec) return "";
	const m = Math.floor(sec / 60);
	const s = sec % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}

export function ItListeningPage({ articleId }: { articleId?: string }) {
	return articleId ? <ItListeningDetail id={articleId} /> : <ItListeningList />;
}

function ItListeningList() {
	const [index, setIndex] = useState<ItListeningIndex | null>(null);
	const [error, setError] = useState(false);

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

	return (
		<div className="itl-page">
			<section className="itl-hero">
				<div>
					<span className="itl-eyebrow">IT BUSINESS LISTENING</span>
					<h1>{lx("IT 听力", "IT Listening")}</h1>
					<p>{lx("《しごとの日本語 IT業務編》听力原文逐句精学：原文 + 翻译 + 语法 + 生词，点开文章可边听视频边对照。", "Sentence-by-sentence study of the IT-business listening tracks: text, translation, grammar and vocabulary.")}</p>
				</div>
			</section>

			{error ? (
				<div className="itl-empty">{lx("文章列表加载失败，请稍后重试。", "Failed to load the article list.")}</div>
			) : !index ? (
				<div className="itl-empty">{lx("加载中…", "Loading…")}</div>
			) : (
				<div className="itl-list">
					{index.articles.map((a) => (
						<article className="itl-card" key={a.id}>
							<button className="itl-card-main" onClick={() => navTo(`#/it-listening/${a.id}`)}>
								<span className="itl-card-series">
									{a.series_zh ?? ""}
									{a.unit ? ` · Unit ${a.unit}` : ""}
									{a.track ? ` · ${a.track}` : ""}
								</span>
								<strong>{a.title_zh}</strong>
								<span className="itl-card-ja">{a.title_ja}</span>
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
			)}
		</div>
	);
}

function ItListeningDetail({ id }: { id: string }) {
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
				<p className="itl-head-ja">{article.title_ja}</p>
				<p className="itl-head-meta">
					{lx("来源", "Source")}：{article.source}
					{article.durationSec ? ` · ${fmtDuration(article.durationSec)}` : ""} · {lx(`${article.sentences.length} 句`, `${article.sentences.length} sentences`)}
				</p>
			</header>

			<section className="itl-player">
				<div className="itl-embed">
					<iframe
						src={`https://www.youtube.com/embed/${article.videoId}`}
						title={article.title_ja}
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
							{s.speaker ? (
								<span className={`itl-speaker sp${speakerClass.get(s.speaker) ?? 0}`}>
									{s.speakerRuby && s.speakerRuby.length ? <RubySegments segs={s.speakerRuby} /> : s.speaker}
								</span>
							) : null}
							<SayButton text={s.jp} />
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
					</li>
				))}
			</ol>
		</div>
	);
}
