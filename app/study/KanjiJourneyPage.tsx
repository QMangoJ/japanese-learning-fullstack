import { useEffect, useState } from "react";

import { isKanjiJourneyArticle, type KanjiJourneyArticle, type KjSentence } from "./kanji-journey";
import type { ItListeningRubySegment } from "./it-listening";
import { lx } from "./store";
import "../routes/it-listening.css";
import "../routes/kanji-journey.css";

/**
 * 《漢字的旅程》阅读页：v6 日语版视频的暂停讲解备忘录，形态沿用 IT 听力文章页。
 * 正文八段（开场、六处暂停、结尾），每句「注音原句 + 中文译文」，连续编号；
 * 第 1–6 段在句子上方用小注标暂停时码和旁白最后一句。
 * 正文后是「来宾问答」，文末一条救命句。本页不带朗读按钮
 * （样式收口在 kanji-journey.css 的 .kj-page 作用域内，不影响 IT 听力页）。
 * 不接 IT 听力的「学完」同步，也不做本地已读标记。
 */

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

/** ruby 分段渲染（与 ItListeningPage 同一套）：带 r 的片段以 <ruby> 呈现，其余原样文本。 */
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

function SentenceLine({ s, no, chip }: { s: KjSentence; no?: number; chip?: string }) {
	return (
		<li className="itl-sentence">
			{chip || no ? (
				<div className="itl-s-top">
					{chip ? <span className="kj-chip">{chip}</span> : null}
					{no ? <span className="itl-s-no">{no}</span> : null}
				</div>
			) : null}
			<p className="itl-jp">{s.ruby && s.ruby.length ? <RubySegments segs={s.ruby} /> : s.jp}</p>
			<p className="itl-zh">{s.zh}</p>
		</li>
	);
}

export function KanjiJourneyPage() {
	const [article, setArticle] = useState<KanjiJourneyArticle | null>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		let alive = true;
		loadJson("/data/reading/kanji-journey.json")
			.then((v) => {
				if (!alive) return;
				if (isKanjiJourneyArticle(v)) setArticle(v);
				else setError(true);
			})
			.catch(() => alive && setError(true));
		return () => {
			alive = false;
		};
	}, []);

	if (error) {
		return (
			<div className="itl-page">
				<div className="itl-empty">{lx("文章加载失败，请稍后重试。", "Failed to load this article.")}</div>
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

	const bodyCount = article.sections.reduce((n, s) => n + s.sentences.length, 0);
	let running = 0;

	return (
		<div className="itl-page kj-page">
			<header className="itl-head">
				<span className="itl-eyebrow">V6 PAUSE MEMO</span>
				<h1>{lx(article.title_zh, article.title_en || article.title_zh)}</h1>
				<p className="itl-head-ja">{article.title_ja}</p>
				<p className="itl-head-meta">
					{lx(`v6 暂停讲解 · 正文 ${bodyCount} 句 · 来宾问答 ${article.qa.length} 组`, `v6 pause-and-explain · ${bodyCount} sentences · ${article.qa.length} Q&A pairs`)}
				</p>
			</header>

			{article.description_zh ? <p className="itl-note">{lx(article.description_zh, article.description_en || article.description_zh)}</p> : null}

			{article.sections.map((sec) => (
				<section key={sec.zh} className="kj-section">
					<h2 className="kj-section-h">
						{lx(sec.zh, sec.en || sec.zh)}
						{sec.ja ? <span className="kj-section-ja jp">{sec.ja}</span> : null}
					</h2>
					{sec.pause_zh || sec.cue_ja ? (
						<p className="kj-pause">
							{sec.pause_zh ? <span className="kj-pause-when">{sec.pause_zh}</span> : null}
							{sec.cue_ja ? (
								<span className="kj-pause-cue jp">
									<span className="kj-pause-label">{lx("旁白最后一句", "Last narration line")}</span>
									{sec.cue_ja}
								</span>
							) : null}
						</p>
					) : null}
					<ol className="itl-sentences">
						{sec.sentences.map((s) => {
							running += 1;
							const no = running;
							return <SentenceLine key={s.id} s={s} no={no} />;
						})}
					</ol>
				</section>
			))}

			<section className="kj-section">
				<h2 className="kj-section-h">
					{lx("来宾问答", "Guest Q&A")}
					<span className="kj-section-ja jp">質問と答え</span>
				</h2>
				<div className="kj-qa-list">
					{article.qa.map((pair, i) => (
						<div className="kj-qa" key={pair.id}>
							<ol className="itl-sentences">
								<SentenceLine s={pair.question} chip={`Q${i + 1}`} />
							</ol>
							<ol className="itl-sentences kj-qa-a">
								<SentenceLine s={pair.answer} chip="A" />
							</ol>
							{pair.note_zh ? <p className="kj-note-line">💡 {pair.note_zh}</p> : null}
						</div>
					))}
				</div>
			</section>

			<section className="kj-rescue">
				<div className="kj-rescue-h">
					🆘 {lx("救命句", "Rescue phrase")}
					{article.rescue.label_zh ? <span className="kj-rescue-scene">{article.rescue.label_zh}</span> : null}
				</div>
				<ol className="itl-sentences">
					<SentenceLine s={article.rescue} />
				</ol>
			</section>
		</div>
	);
}
