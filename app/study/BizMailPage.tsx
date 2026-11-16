import { useEffect, useState } from "react";

import { isBizMail, isBizMailIndex, splitNote, type BizMail, type BizMailIndex } from "./biz-mail";
import { parseRubyMarkup } from "./it-listening";
import { lx, navTo } from "./store";
import "../routes/it-listening.css";
import "../routes/biz-mail.css";

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

function useJson<T>(url: string, guard: (v: unknown) => v is T): { data: T | null; error: boolean } {
	const [state, setState] = useState<{ url: string; data: T | null; error: boolean }>({ url, data: null, error: false });
	useEffect(() => {
		let alive = true;
		setState({ url, data: null, error: false });
		loadJson(url)
			.then((v) => alive && setState({ url, data: guard(v) ? v : null, error: !guard(v) }))
			.catch(() => alive && setState({ url, data: null, error: true }));
		return () => {
			alive = false;
		};
	}, [url, guard]);
	return state.url === url ? state : { data: null, error: false };
}

/** {漢字|よみ} 标记 → ruby；furigana 关掉时只显示汉字。 */
function Ruby({ markup, text, furigana }: { markup?: string; text: string; furigana: boolean }) {
	if (!markup || !furigana) return <>{text}</>;
	return (
		<>
			{parseRubyMarkup(markup).map((seg, k) =>
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

const TAG_LABEL = { 尊: "尊敬语", 谦: "谦让语", 丁: "丁宁语" } as const;

/** 一行笔记：【尊】【谦】【丁】变成彩色标签，**x** 变粗体，其余原样。 */
function NoteLine({ line }: { line: string }) {
	return (
		<>
			{splitNote(line).map((part, k) =>
				"tag" in part ? (
					<span key={k} className={`bm-tag bm-tag--${part.tag === "尊" ? "son" : part.tag === "谦" ? "ken" : "tei"}`} title={TAG_LABEL[part.tag]}>
						{part.tag}
					</span>
				) : "bold" in part ? (
					<b key={k}>{part.bold}</b>
				) : (
					<span key={k}>{part.text}</span>
				),
			)}
		</>
	);
}

export function BizMailPage({ mailId }: { mailId?: string }) {
	return mailId ? <BizMailDetail id={mailId} /> : <BizMailList />;
}

function BizMailList() {
	const { data, error } = useJson<BizMailIndex>("/data/biz-mail/index.json", isBizMailIndex);
	return (
		<div className="itl-page bm-page">
			<section className="itl-hero bm-hero">
				<div>
					<span className="itl-eyebrow">BUSINESS EMAIL</span>
					<h1>{lx("商务邮件背诵", "Business email recitation")}</h1>
					<p>
						{lx(
							"真实的日本公司商务邮件：全文注音、逐句翻译、敬语拆解，可以遮住原文自己默背。",
							"Real Japanese business emails with furigana, translations and keigo breakdowns. Hide the Japanese to recite.",
						)}
					</p>
				</div>
			</section>
			{error ? (
				<div className="itl-empty">{lx("邮件列表加载失败，请稍后重试。", "Failed to load the email list.")}</div>
			) : !data ? (
				<div className="itl-empty">{lx("加载中…", "Loading…")}</div>
			) : (
				<div className="itl-list">
					{data.mails.map((mail) => (
						<article className="itl-card" key={mail.id}>
							<button className="itl-card-main" onClick={() => navTo(`#/biz-mail/${mail.id}`)}>
								<span className="itl-card-series">
									{mail.kind_zh ?? lx("商务邮件", "Business email")}
									{mail.date ? ` · ${mail.date}` : ""}
								</span>
								<strong>{mail.title_zh}</strong>
								{mail.title_ja ? <span className="itl-card-ja">{mail.title_ja}</span> : null}
								{mail.scene_zh ? <span className="itl-card-sub bm-card-scene">{mail.scene_zh}</span> : null}
								<span className="itl-card-meta">
									{mail.from ? `${mail.from} · ` : ""}
									{lx(`${mail.sentenceCount} 句`, `${mail.sentenceCount} sentences`)}
								</span>
							</button>
						</article>
					))}
				</div>
			)}
		</div>
	);
}

function BizMailDetail({ id }: { id: string }) {
	const { data: mail, error } = useJson<BizMail>(`/data/biz-mail/${id}.json`, isBizMail);
	const [recite, setRecite] = useState(false);
	const [furigana, setFurigana] = useState(true);
	const [shown, setShown] = useState<Set<number>>(() => new Set());

	useEffect(() => {
		setRecite(false);
		setShown(new Set());
	}, [id]);

	if (error) return <div className="itl-page"><div className="itl-empty">{lx("邮件加载失败。", "Failed to load this email.")}</div></div>;
	if (!mail) return <div className="itl-page"><div className="itl-empty">{lx("加载中…", "Loading…")}</div></div>;

	const paras: number[] = [];
	for (const s of mail.sentences) if (!paras.includes(s.para)) paras.push(s.para);
	const toggleShown = (i: number) =>
		setShown((cur) => {
			const next = new Set(cur);
			if (next.has(i)) next.delete(i);
			else next.add(i);
			return next;
		});
	const startRecite = () => {
		setShown(new Set());
		setRecite(true);
	};

	return (
		<div className={`itl-page bm-page${recite ? " bm-recite" : ""}`}>
			<header className="itl-head">
				<span className="itl-card-series">
					{lx("商务邮件背诵", "Business email")}
					{mail.kind_zh ? ` · ${mail.kind_zh}` : ""}
				</span>
				<h1>{mail.title_zh}</h1>
				{mail.title_ja ? <p className="itl-head-ja">{mail.title_ja}</p> : null}
				{mail.from ? <p className="itl-head-meta">{mail.from}</p> : null}
			</header>

			{mail.scene_zh || mail.intro_zh ? (
				<p className="itl-note">
					{mail.scene_zh}
					{mail.scene_zh && mail.intro_zh ? <br /> : null}
					{mail.intro_zh}
				</p>
			) : null}

			<div className="bm-toolbar" role="toolbar" aria-label={lx("背诵工具", "Recitation tools")}>
				<button type="button" className={`itl-follow-btn${recite ? " on" : ""}`} aria-pressed={recite} onClick={() => (recite ? setRecite(false) : startRecite())}>
					{recite ? lx("🙈 背诵中 · 点此退出", "🙈 Reciting · exit") : lx("🙈 背诵模式（遮住原文）", "🙈 Recite (hide Japanese)")}
				</button>
				<button type="button" className={`itl-follow-btn${furigana ? " on" : ""}`} aria-pressed={furigana} onClick={() => setFurigana((v) => !v)}>
					{lx("注音", "Furigana")} {furigana ? lx("开", "on") : lx("关", "off")}
				</button>
				{recite ? (
					<>
						<button type="button" className="itl-follow-btn" onClick={() => setShown(new Set(mail.sentences.map((_, i) => i)))}>
							{lx("全部显示", "Show all")}
						</button>
						<button type="button" className="itl-follow-btn" onClick={() => setShown(new Set())}>
							{lx("全部遮住", "Hide all")}
						</button>
						<span className="bm-progress">
							{lx(`已看 ${shown.size} / ${mail.sentences.length} 句`, `${shown.size} / ${mail.sentences.length} revealed`)}
						</span>
					</>
				) : null}
			</div>
			{recite ? (
				<p className="bm-recite-hint">
					{lx("看中文，先自己说出日语原文，再点句子核对。", "Read the Chinese, say the Japanese, then tap to check.")}
				</p>
			) : null}

			{recite ? null : (
				<section className="bm-card bm-full" aria-label={lx("全文", "Full text")}>
					<h2 className="bm-h2">{lx("全文", "Full text")}</h2>
					<div className="bm-letter jp">
						{paras.map((p) => (
							<p key={p}>
								{mail.sentences.map((s, i) =>
									s.para === p ? <Ruby key={i} markup={s.ruby} text={s.jp} furigana={furigana} /> : null,
								)}
							</p>
						))}
					</div>
				</section>
			)}

			<h2 className="bm-h2 bm-h2--out">{recite ? lx("逐句默背", "Recite sentence by sentence") : lx("逐句拆解", "Sentence by sentence")}</h2>
			{!recite && mail.legend_zh ? (
				<p className="bm-legend">
					<NoteLine line={mail.legend_zh} />
				</p>
			) : null}
			<ol className="itl-sentences">
				{mail.sentences.map((s, i) => {
					const hidden = recite && !shown.has(i);
					return (
						<li className="itl-sentence bm-sentence" key={i} data-testid="bm-sentence">
							<div className="itl-s-top">
								<span className="itl-s-no">{i + 1}</span>
							</div>
							{recite ? <p className="itl-zh bm-zh-cue">{s.zh}</p> : null}
							{recite ? (
								<button
									type="button"
									className={`bm-mask${hidden ? "" : " bm-mask--open"}`}
									aria-expanded={!hidden}
									onClick={() => toggleShown(i)}
								>
									{hidden ? (
										<span className="bm-mask-label">{lx("点击显示原文", "Tap to reveal")}</span>
									) : (
										<span className="itl-jp jp">
											<Ruby markup={s.ruby} text={s.jp} furigana={furigana} />
										</span>
									)}
								</button>
							) : (
								<>
									<p className="itl-jp jp">
										<Ruby markup={s.ruby} text={s.jp} furigana={furigana} />
									</p>
									<p className="itl-zh">{s.zh}</p>
								</>
							)}
							{!recite && s.notes && s.notes.length ? (
								<ul className="bm-notes">
									{s.notes.map((line, j) => (
										<li key={j}>
											<NoteLine line={line} />
										</li>
									))}
									{s.notesAdded ? <li className="bm-added-note">{lx("（本句拆解为补充内容）", "(supplementary notes)")}</li> : null}
								</ul>
							) : null}
						</li>
					);
				})}
			</ol>

			{!recite && mail.why ? (
				<section className="bm-card bm-why">
					<h2 className="bm-h2">{mail.why.q_zh}</h2>
					{mail.why.paragraphs.map((p, i) => (
						<p key={i}>
							<NoteLine line={p} />
						</p>
					))}
				</section>
			) : null}

			{!recite && mail.vocab && mail.vocab.length ? (
				<section className="bm-card">
					<h2 className="bm-h2">{lx("重点词汇", "Key vocabulary")}</h2>
					<ul className="bm-vocab">
						{mail.vocab.map((v) => (
							<li key={v.w}>
								<b className="jp">{v.w}</b>
								<span className="itl-v-r">{v.r}</span>
								<span className="itl-v-zh">{v.zh}</span>
								{v.added ? (
									<span className="bm-added" title={lx("补充词汇", "Added")}>
										{lx("补", "+")}
									</span>
								) : null}
							</li>
						))}
					</ul>
				</section>
			) : null}

			{!recite && (mail.patterns?.length || mail.examples?.length) ? (
				<section className="itl-patterns">
					{mail.patterns?.length ? (
						<>
							<h2 className="itl-patterns-title">{lx("商务邮件常用句型", "Common business-email patterns")}</h2>
							<ul className="bm-patterns">
								{mail.patterns.map((p) => (
									<li key={p.p}>
										<b className="jp">{p.p}</b>
										<span>{p.zh}</span>
									</li>
								))}
							</ul>
						</>
					) : null}
					{mail.examples?.length ? (
						<>
							<h2 className="itl-patterns-title bm-ex-title">{lx("自己写邮件能用的例句", "Sentences for your own emails")}</h2>
							<ul className="bm-patterns">
								{mail.examples.map((e) => (
									<li key={e.jp}>
										<span className="bm-scene">{e.scene}</span>
										<span className="jp">{e.jp}</span>
									</li>
								))}
							</ul>
						</>
					) : null}
				</section>
			) : null}

			{!recite && mail.credit_zh ? <p className="bm-credit">{mail.credit_zh}</p> : null}
		</div>
	);
}
