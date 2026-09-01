import { Fragment, useEffect, useReducer, useRef, useState, type ReactNode } from "react";

import { JITA_TEARU_EXAMPLES } from "../data/common-jita-tearu";
import {
	afterPaint,
	addMistakeNote,
	cardsKind,
	cardsState,
	cardsWeeks,
	clearFavs,
	clearSearchHistory,
	closeFavStudyCards,
	cycleMistakeLevel,
	deleteMistake,
	flipCard,
	flipFavCard,
	getSearchHistory,
	homeScale,
	isListening,
	jumpWeek,
	lx,
	navTo,
	nextCard,
	nextFavCard,
	openFav,
	openSearchHit,
	openWeekSet,
	prevCard,
	prevFavCard,
	saveSearchHistory,
	say,
	searchEntryCount,
	searchHits,
	setCardsWeek,
	setFavFilter,
	setFavSelectionFilter,
	setFavStudy,
	setMistakeDraft,
	setMistakeFilter,
	setMistakeLevelFilter,
	setMistakeStudy,
	setMistakeType,
	shuffleCards,
	startFavStudyCards,
	toggleFav,
	toggleStudyHide,
	toggleWeek,
	type SearchCategory,
} from "../study/store";

/* 学習シェル共通ページ：接续表 / 活用 / 变形 / 口语 / 自他动词 / 穿衣穿戴 / 数字 / 検索 / 記憶カード /
 * 週カタログ / 錯題本 / 收藏。ルーティングと日課本文は app/study が持つ。
 * クラス名と DOM 構造は移行前の文字列組み立てと同じものを再現している。 */

/* legacy の markStar(): ★ だけを .num-x で包む */
export function Star({ text }: { text: unknown }) {
	const raw = text == null ? "" : String(text);
	return (
		<>
			{raw.split("★").map((part, index) => (
				<Fragment key={index}>
					{index > 0 ? <span className="num-x">★</span> : null}
					{part}
				</Fragment>
			))}
		</>
	);
}

/* 自前データの `_r` フィールドに入る HTML は <ruby>base<rt>reading</rt></ruby> と
   （文型を示す下線の）<u>…</u> の2つだけ。public/data/*.json の _r 全 14,814 件を
   検査して確認した：他のタグなし・<u> の入れ子なし・対応漏れなし・ruby の中にタグなし。
   dangerouslySetInnerHTML だと包む要素が1つ増えて移行前の DOM と変わるので、
   要素に組み立て直す。 */
type RichNode = string | { ruby: [string, string] } | { u: RichNode[] };
const RUBY_HTML = /<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>|<u>|<\/u>/g;
function parseRich(html: string): RichNode[] {
	const root: RichNode[] = [];
	// 入れ子がないので「今 <u> の中か」の1段だけ持てば足りる。
	let underline: RichNode[] | null = null;
	const push = (node: RichNode) => (underline ?? root).push(node);
	let cursor = 0;
	for (const m of html.matchAll(RUBY_HTML)) {
		if (m.index! > cursor) push(html.slice(cursor, m.index));
		cursor = m.index! + m[0].length;
		if (m[0] === "<u>") {
			const children: RichNode[] = [];
			root.push({ u: children });
			underline = children;
		} else if (m[0] === "</u>") {
			underline = null;
		} else {
			push({ ruby: [m[1], m[2]] });
		}
	}
	if (cursor < html.length) push(html.slice(cursor));
	return root;
}
// key は配列位置で統一する。ruby を文字オフセットで振ると、
// 素のテキスト側の連番と衝突することがある。
function renderRich(nodes: RichNode[]): ReactNode {
	return nodes.map((part, i) =>
		typeof part === "string" ? (
			<Fragment key={i}>{part}</Fragment>
		) : "ruby" in part ? (
			<ruby key={i}>
				{part.ruby[0]}
				<rt>{part.ruby[1]}</rt>
			</ruby>
		) : (
			<u key={i}>{renderRich(part.u)}</u>
		),
	);
}
export function RubyHtml({ html }: { html: string }) {
	return <>{renderRich(parseRich(html))}</>;
}

/* legacy の R(o,f) = o[f+'_r'] があればその HTML、なければ素の o[f] */
export function Rr({ o, f }: { o: any; f: string }) {
	const rich = o && o[f + "_r"];
	if (rich) return <RubyHtml html={String(rich)} />;
	return <>{o?.[f] ?? ""}</>;
}

/* legacy の sayBtn()。#app 上の委任クリックは届かないので直接呼ぶ。 */
export function SayButton({ text }: { text?: string }) {
	if (!text) return null;
	// data-say は読み上げ対象そのものを表すデータ属性なので移行前と同じく残す。
	// 実際の発火は #app の委任ではなく onClick。
	return (
		<button
			className="sayb"
			data-say={text}
			aria-label="朗读"
			onClick={(event) => {
				// legacy の委任ハンドラは朗読を処理した時点で return していた。
				// 闪卡の中では親の「翻面」まで発火させないことで同じ挙動を保つ。
				event.stopPropagation();
				say(text);
			}}
		>
			🔊
		</button>
	);
}

/* legacy の fmt(): '~text~' を <del> にする。エスケープは React 側が行う。 */
export function Fmt({ text }: { text: unknown }) {
	const raw = text == null ? "" : String(text);
	const parts = raw.split(/~([^~]+)~/g);
	return (
		<>
			{parts.map((part, index) => (index % 2 === 1 ? <del key={index}>{part}</del> : <Fragment key={index}>{part}</Fragment>))}
		</>
	);
}

/* ---------------- 接続表示（旧 connBlockHTML / connHTML / connRowHTML） ---------------- */

function splitTop(str: string, sep: string) {
	const out: string[] = [];
	let depth = 0;
	let cur = "";
	for (const ch of str) {
		if ("（(「〈〔".indexOf(ch) >= 0) depth++;
		else if ("）)」〉〕".indexOf(ch) >= 0) depth--;
		if (ch === sep && depth === 0) {
			out.push(cur);
			cur = "";
		} else cur += ch;
	}
	out.push(cur);
	return out;
}

const trimmed = (parts: string[]) => parts.map((s) => s.trim()).filter(Boolean);

function ConnRow({ row }: { row: string }) {
	const slots = trimmed(splitTop(row, "＋"));
	// 「槽」が1つだけ＝固定部分がない行。書籍では括弧を描かず、候補を1行ずつ並べる。
	if (slots.length === 1) {
		return (
			<>
				{trimmed(splitTop(slots[0], "／")).map((alt, i) => (
					<div className="conn-row" key={i}>
						<span className="conn-fix jp">
							<Fmt text={alt} />
						</span>
					</div>
				))}
			</>
		);
	}
	const altsOf = (seg: string) => trimmed(splitTop(seg, "／"));
	return (
		<div className="conn-row">
			{slots.map((seg, i) => {
				const alts = altsOf(seg);
				if (alts.length < 2)
					return (
						<span className="conn-fix jp" key={i}>
							<Fmt text={seg} />
						</span>
					);
				// 行頭には左括弧を描かない。右隣もまた縦列なら、その列が自分で左括弧を
				// 描くので、こちら側は閉じない（二重線は書籍にない）。
				const cls = "conn-br" + (i > 0 ? " brl" : "") + (i < slots.length - 1 && altsOf(slots[i + 1]).length < 2 ? " brr" : "");
				return (
					<span className={cls} key={i}>
						{alts.map((alt, j) => (
							<span className="conn-alt jp" key={j}>
								<Fmt text={alt} />
							</span>
						))}
					</span>
				);
			})}
		</div>
	);
}

const CONN_NOTE = /^([\s\S]*?)(（注意：[^）]*）)\s*$/;

export function ConnBlock({ connection, lang = "cn" }: { connection?: string; lang?: string }) {
	if (!connection) return null;
	return (
		<div className="conn jp">
			<span className="conn-label">
				{lang === "en" ? "Connection" : "接続"}
				{/~[^~]+~/.test(connection) ? (
					<span className="conn-hint">{lang === "en" ? "(omit the underlined part)" : "（划线部分去掉）"}</span>
				) : null}
			</span>
			{trimmed(String(connection).split(/[；　]/)).map((group, i) => {
				// 「（注意：…）」は接続そのものではない補足なので、下の行に分けて出す。
				const m = group.match(CONN_NOTE);
				return (
					<div className="conn-grp" key={i}>
						<ConnRow row={m ? m[1].trim() : group} />
						{m ? (
							<div className="conn-note jp">
								<Fmt text={m[2]} />
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

/* legacy の refTable() */
function RefTable({ cols, rows }: { cols?: unknown[]; rows: unknown[][] }) {
	const isWide = (cols?.length ?? 0) > 4;
	return (
		<div className={`table-scroll${isWide ? " table-scroll--wide-ref" : ""}`}>
			<table className={`ref${isWide ? " ref--wide" : ""}`}>
				<tbody>
					{cols ? (
						<tr>
							{cols.map((c, i) => (
								<th className="jp" key={i}>
									<Fmt text={c} />
								</th>
							))}
						</tr>
					) : null}
					{rows.map((r, i) => (
						<tr key={i}>
							{r.map((c, j) => (
								<td className="jp" key={j}>
									<Fmt text={c} />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/* legacy の ktable(): 最終列だけ尊敬語として強調する */
function KTable({ cols, rows }: { cols?: string[]; rows?: { label?: string; vals?: string[] }[] }) {
	const heads = cols || [];
	return (
		<div className="table-scroll">
			<table className="ref">
				<tbody>
					<tr>
						<th />
						{heads.map((c, i) => (
							<th key={i}>{c}</th>
						))}
					</tr>
					{(rows || []).map((r, i) => (
						<tr key={i}>
							<th>{r.label}</th>
							{(r.vals || []).map((v, j) => (
								<td
									className="jp"
									key={j}
									style={j === heads.length - 1 ? { color: "var(--accent)", fontWeight: 600 } : undefined}
								>
									{v}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/* legacy の ptable(): 活用形一覧用。どの列も対等なので色を付けない */
function PTable({ cols, rows }: { cols?: string[]; rows?: { label?: string; vals?: string[] }[] }) {
	return (
		<div className="table-scroll">
			<table className="ref">
				<tbody>
					<tr>
						<th />
						{(cols || []).map((c, i) => (
							<th key={i}>{c}</th>
						))}
					</tr>
					{(rows || []).map((r, i) => (
						<tr key={i}>
							<th className="jp">{r.label}</th>
							{(r.vals || []).map((v, j) => (
								<td className={j === 0 ? "meta" : "jp"} key={j}>
									{v}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/* ---------------- 接续表 ---------------- */

export function RefPage({ data }: { data: any }) {
	const RF = data?.reference;
	if (!RF) return <div className="empty">{lx("接续表还没加载完，请稍后重试。", "Connection table is still loading.")}</div>;
	const block = (heading: string, cols: string[], rows: unknown[][], futsukei: string, lead?: string) => (
		<div className="card">
			<h3 className="jp" style={{ marginTop: "0" }}>
				{heading}
			</h3>
			{lead ? <div className="meta jp">{lead}</div> : null}
			<RefTable cols={cols} rows={rows} />
			<div className="note">
				<b className="nt">〔普〕</b>
				<span className="jp">{futsukei}</span>
			</div>
		</div>
	);

	return (
		<>
			<div className="meta" style={{ marginBottom: 10 }}>
				{RF.note}
			</div>

			<div className="card">
				<h3 className="jp" style={{ marginTop: "0" }}>
					{RF.verb.heading}
				</h3>
				{RF.verb.groups.map((g: string, i: number) => (
					<div className="meta jp" key={i}>
						{g}
					</div>
				))}
				<RefTable cols={RF.verb.columns} rows={RF.verb.rows} />
				<div className="note">
					<b className="nt">〔普〕</b>
					<span className="jp">{RF.verb.futsukei}</span>
				</div>
				<div className="meta jp">{RF.verb.extra}</div>
				<div className="note" style={{ marginTop: 8 }}>
					<b className="nt">表示の例</b>
					<span className="jp">{RF.verb.example_box}</span>
				</div>
			</div>

			{block(RF.iadj.heading, ["解説文中の表示", "活用形", "い形容詞"], RF.iadj.rows, RF.iadj.futsukei)}
			{block(RF.naadj.heading, ["解説文中の表示", "活用形", "な形容詞"], RF.naadj.rows, RF.naadj.futsukei)}
			{block(RF.noun.heading, ["解説文中の表示", "活用形", "名詞"], RF.noun.rows, RF.noun.futsukei, RF.noun.note)}

			<div className="card">
				<h3 style={{ marginTop: "0" }}>本书使用的标记</h3>
				{RF.marks.map((m: { mark: string; desc: string }, i: number) => (
					<div className="q" key={i}>
						<span className="n" style={{ minWidth: "auto", padding: "0 8px" }}>
							{m.mark}
						</span>
						<span className="jp">{m.desc}</span>
					</div>
				))}
			</div>
		</>
	);
}

/* ---------------- 活用（敬語レベル） ---------------- */

export function KatsuyouPage({ data }: { data: any }) {
	const KY = data?.katsuyou;
	if (!KY) return <div className="empty">{lx("活用数据还没加载完，请稍后重试。", "Conjugation data is still loading.")}</div>;
	const V3 = KY.verb;
	const c = V3?.callout;

	return (
		<>
			{KY.intro ? (
				<div className="meta" style={{ marginBottom: 10 }}>
					{KY.intro}
				</div>
			) : null}

			{(KY.sections || []).map((s: any, i: number) => (
				<div className="card" key={i}>
					<h3 className="jp" style={{ marginTop: "0" }}>
						{s.kind} <span className="meta">{s.kindEn}</span>
					</h3>
					<div className="meta jp" style={{ marginBottom: 6 }}>
						例：{s.word}
					</div>
					<KTable cols={s.cols} rows={s.rows} />
					{s.note ? (
						<div className="note">
							<span className="jp">{s.note}</span>
						</div>
					) : null}
				</div>
			))}

			{V3 ? (
				<div className="card">
					<h3 className="jp" style={{ marginTop: "0" }}>
						{V3.kind} <span className="meta">{V3.kindEn}</span>
					</h3>
					<div className="meta jp" style={{ marginBottom: 6 }}>
						例：{V3.word}
					</div>
					{(V3.tables || []).map((t: any, i: number) => (
						<Fragment key={i}>
							<div className="meta jp" style={{ margin: "10px 0 4px", fontWeight: 700 }}>
								{t.head}
							</div>
							<KTable cols={V3.cols} rows={t.rows} />
						</Fragment>
					))}
					{V3.note ? (
						<div className="note">
							<span className="jp">{V3.note}</span>
						</div>
					) : null}
					{c ? (
						<>
							<div className="ct-tip" style={{ marginTop: 14 }}>
								💡 {c.title}
							</div>
							{(c.chains || []).map((ch: string[], i: number) => (
								<div className="jp" style={{ margin: "4px 0" }} key={i}>
									<span style={{ color: "var(--sub)" }}>{ch[0]}</span> →{" "}
									<span style={{ color: "var(--sub)" }}>{ch[1]}</span> →{" "}
									<span style={{ color: "var(--accent)", fontWeight: 600 }}>{ch[2]}</span>
								</div>
							))}
							{c.suppletiveNote ? (
								<div className="meta" style={{ marginTop: 10 }}>
									{c.suppletiveNote}
								</div>
							) : null}
							<div className="opts">
								{(c.suppletive || []).map((p: string[], i: number) => (
									<span className="jp" key={i}>
										{p[0]} → <b style={{ color: "var(--accent)" }}>{p[1]}</b>
									</span>
								))}
							</div>
							{c.tip ? (
								<div className="note" style={{ marginTop: 8 }}>
									<span className="jp">{c.tip}</span>
								</div>
							) : null}
						</>
					) : null}
				</div>
			) : null}

			{KY.footer ? (
				<div className="meta" style={{ marginTop: 10 }}>
					{KY.footer}
				</div>
			) : null}
		</>
	);
}

/* ---------------- 变形（変形ルール） ---------------- */

export function HenkeiPage({ data }: { data: any }) {
	const HK = data?.henkei;
	if (!HK) return <div className="empty">{lx("变形数据还没加载完，请稍后重试。", "Verb-form data is still loading.")}</div>;
	return (
		<>
			{HK.intro ? (
				<div className="meta" style={{ marginBottom: 6 }}>
					{HK.intro}
				</div>
			) : null}
			{HK.seeAlso ? (
				<div className="note" style={{ marginBottom: 12 }}>
					<span className="jp">{HK.seeAlso}</span>{" "}
					<button
						type="button"
						className="side-item"
						style={{ display: "inline-flex", width: "auto", padding: "4px 10px", marginLeft: 6 }}
						onClick={() => navTo("#/ref")}
					>
						📖 接续表
					</button>
				</div>
			) : null}
			{(HK.rules || []).map((r: any, i: number) => (
				<div className="card" key={i}>
					<h3 className="jp" style={{ marginTop: "0" }}>
						{r.title}
					</h3>
					{r.note ? (
						<div className="meta" style={{ marginBottom: 6 }}>
							{r.note}
						</div>
					) : null}
					<PTable cols={r.cols} rows={r.rows} />
				</div>
			))}
			{HK.footer ? (
				<div className="meta" style={{ marginTop: 10 }}>
					{HK.footer}
				</div>
			) : null}
		</>
	);
}

/* ---------------- 口语缩约（口語の縮約） ---------------- */

export function KougoPage({ data }: { data: any }) {
	const KG = data?.kougo;
	if (!KG) return <div className="empty">{lx("口语缩约数据还没加载完，请稍后重试。", "Spoken-contraction data is still loading.")}</div>;
	const heads = [lx("口语", "Spoken"), lx("完整形", "Full form"), lx("意思", "Meaning"), lx("例子", "Example")];
	return (
		<>
			{KG.intro ? <div className="meta" style={{ marginBottom: 6 }}>{lx(KG.intro, KG.intro_en)}</div> : null}
			{KG.seeAlso ? (
				<div className="note" style={{ marginBottom: 12 }}>
					<span>{lx(KG.seeAlso, KG.seeAlso_en)}</span>{" "}
					<button type="button" className="side-item" style={{ display: "inline-flex", width: "auto", padding: "4px 10px", marginLeft: 6 }} onClick={() => navTo("#/henkei")}>
						✍️ {lx("变形", "Verb forms")}
					</button>
				</div>
			) : null}
			{(KG.groups || []).map((group: any, gi: number) => (
				<div className="card kougo-group" key={gi}>
					<h3 className="jp" style={{ marginTop: 0 }}>
						{lx(group.title, group.title_en)}
					</h3>
					{group.note ? <div className="meta" style={{ marginBottom: 8 }}>{lx(group.note, group.note_en)}</div> : null}
					<div className="table-scroll">
						<table className="ref kougo-table">
							<thead>
								<tr>
									{heads.map((h) => (
										<th key={h}>{h}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{(group.items || []).map((it: any, ii: number) => (
									<tr key={ii}>
										<th className="jp">{it.spoken}</th>
										<td className="jp">{it.full}</td>
										<td>{lx(it.cn, it.en)}</td>
										<td className="jp">
											{it.eg ? (
												<>
													{it.eg}
													<SayButton text={it.eg} />
													{it.eg_cn || it.eg_en ? <span className="cn">（{lx(it.eg_cn, it.eg_en)}）</span> : null}
												</>
											) : (
												"—"
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			))}
			{KG.footer ? <div className="meta" style={{ marginTop: 10 }}>{lx(KG.footer, KG.footer_en)}</div> : null}
		</>
	);
}

/* ---------------- 自動詞 / 他動詞 ---------------- */

function JitaSide({ side, kind }: { side: any; kind: "ta" | "ji" }) {
	if (!side) return null;
	const tearu = kind === "ta" ? JITA_TEARU_EXAMPLES[side.dict] : null;
	const example = tearu ? { eg: tearu.jp, eg_r: tearu.jp_r, eg_cn: tearu.cn, eg_en: tearu.en } : side;
	const label = kind === "ta"
		? lx("他动词 · てあります", "Transitive · てあります")
		: lx("自动词 · ています", "Intransitive · ています");
	return (
		<div className={`jita-col jita-col--${kind}`}>
			<div className={`jita-kind ${kind}`}>{label}</div>
			<div className="jita-word jp">
				<Rr o={side} f="dict" />
				<span className="jita-kana">（{side.kana}）</span>
			</div>
			<div className="jita-masu jp">
				ます形　<Rr o={side} f="masu" />
			</div>
			<div className="jita-eg jp">
				<Rr o={example} f="eg" />
				<SayButton text={example.eg} />
				{example.eg_cn || example.eg_en ? <span className="cn">{lx(example.eg_cn, example.eg_en)}</span> : null}
			</div>
		</div>
	);
}

export function JitaPage({ data }: { data: any }) {
	const JT = data?.jita;
	if (!JT) return <div className="empty">{lx("自动词和他动词数据还没加载完，请稍后重试。", "Transitive/intransitive data is still loading.")}</div>;
	return (
		<>
			{JT.intro ? <div className="meta" style={{ marginBottom: 12 }}>{lx(JT.intro, JT.intro_en)}</div> : null}
			{(JT.groups || []).map((group: any, gi: number) => (
				<div className="card jita-group" key={gi}>
					<h3 className="jp" style={{ marginTop: 0 }}>
						{lx(group.title, group.title_en)}
					</h3>
					{(group.pairs || []).map((pair: any, pi: number) => (
						<div className="jita-pair" key={pi}>
							<div className="jita-meaning">{lx(pair.cn, pair.en)}</div>
							<div className="jita-sides">
								<JitaSide side={pair.ta} kind="ta" />
								<JitaSide side={pair.ji} kind="ji" />
							</div>
						</div>
					))}
				</div>
			))}
			{JT.footer ? <div className="meta" style={{ marginTop: 10 }}>{lx(JT.footer, JT.footer_en)}</div> : null}
		</>
	);
}

/* ---------------- 衣服・身につける物 ---------------- */

function WearingText({ item, field }: { item: any; field: string }) {
	const rich = item?.[`${field}_r`];
	return rich ? <RubyHtml html={rich} /> : item?.[field] || "";
}

export function WearingPage({ data }: { data: any }) {
	const W = data?.wearing;
	if (!W) return <div className="empty">{lx("穿衣与穿戴动词数据还没加载完，请稍后重试。", "Wearing-verb data is still loading.")}</div>;
	return (
		<>
			<div className="wearing-lead">
				<h2 className="jp">{lx(W.title_cn, W.title_en)}</h2>
				<div className="wearing-jp-title jp">{W.title}</div>
				<p>{lx(W.intro, W.intro_en)}</p>
			</div>
			<div className="wearing-state-note">
				<span className="wearing-state-note__label">Vている</span>
				<span>{lx(W.state_note, W.state_note_en)}</span>
			</div>
			<div className="wearing-grid">
				{(W.items || []).map((item: any) => (
					<article className="card wearing-card" key={item.verb}>
						<header className="wearing-card__head">
							<div>
								<div className="wearing-action">{lx(item.action_cn, item.action_en)}</div>
								<div className="wearing-verb jp">
									<WearingText item={item} field="verb" />
									<span>（{item.kana}）</span>
								</div>
							</div>
							<div className="wearing-state">
								<small>{lx("穿戴状态", "Wearing state")}</small>
								<strong className="jp"><WearingText item={item} field="state" /></strong>
							</div>
						</header>
						<div className="wearing-objects">
							<span>{lx("适用对象", "Used with")}</span>
							<strong className="jp"><WearingText item={item} field="objects_jp" /></strong>
							<p>{lx(item.objects_cn, item.objects_en)}</p>
						</div>
						<div className="wearing-example jp">
							<WearingText item={item} field="example" />
							<SayButton text={item.example} />
							<span className="cn">{lx(item.example_cn, item.example_en)}</span>
						</div>
						<div className="wearing-remove">
							<span>{lx("脱下／摘下", "Take off")}</span>
							<strong className="jp"><WearingText item={item} field="remove" /></strong>
						</div>
						{item.note_cn || item.note_en ? <p className="wearing-note">{lx(item.note_cn, item.note_en)}</p> : null}
					</article>
				))}
			</div>
			<section className="card wearing-removal">
				<h3>{lx(W.removal?.title_cn, W.removal?.title_en)}</h3>
				<div className="wearing-removal-grid">
					{(W.removal?.items || []).map((item: any) => (
						<article key={item.verb}>
							<div className="wearing-removal-verb jp">
								<WearingText item={item} field="verb" />
								<span>（{item.kana}）</span>
							</div>
							<p>{lx(item.use_cn, item.use_en)}</p>
							<div className="wearing-removal-example jp">
								<WearingText item={item} field="example" />
								<SayButton text={item.example} />
								<span className="cn">{lx(item.example_cn, item.example_en)}</span>
							</div>
						</article>
					))}
				</div>
			</section>
			{W.footer ? <div className="meta wearing-footer">{lx(W.footer, W.footer_en)}</div> : null}
		</>
	);
}

/* ---------------- 数字 ---------------- */

function NumTable({ t }: { t: any }) {
	return (
		<div className="card">
			{t.caption ? (
				<div className="num-cap jp">
					<Star text={t.caption} />
				</div>
			) : null}
			<div className="table-scroll">
				<table className="ref">
					<tbody>
						{t.cols ? (
							<tr>
								{t.cols.map((c: string, i: number) => (
									<th className="jp" key={i}>
										<Star text={c} />
									</th>
								))}
							</tr>
						) : null}
						{(t.rows || []).map((r: string[], i: number) => (
							<tr key={i}>
								{r.map((c, j) => (
									<td className="jp" key={j}>
										<Star text={c} />
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{t.note ? (
				<div className="num-note">
					<Star text={t.note} />
				</div>
			) : null}
		</div>
	);
}

function NumCounter({ c }: { c: any }) {
	const irr: number[] = c.irr || [];
	return (
		<div className="card">
			<div className="cnt-head">
				<span className="cnt-suffix jp">{c.suffix}</span>
				<span className="cnt-read jp">{c.reading}</span>
				{c.q ? <span className="cnt-q jp">何〜 {c.q}</span> : null}
			</div>
			{c.use ? <div className="cnt-use">{c.use}</div> : null}
			{c.eg ? (
				<div className="cnt-eg jp">
					例：
					{c.eg_r ? <RubyHtml html={c.eg_r} /> : c.eg}
					<SayButton text={c.eg} />
				</div>
			) : null}
			<div className="cnt-grid">
				{(c.forms || []).map((f: string, i: number) => (
					<div className={`cnt-cell${irr.includes(i + 1) ? " irr" : ""}`} key={i}>
						<span className="n">{i + 1}</span>
						<span className="r jp">{f}</span>
					</div>
				))}
			</div>
			{c.note ? (
				<div className="num-note">
					<Star text={c.note} />
				</div>
			) : null}
		</div>
	);
}

export function NumbersPage({ data }: { data: any }) {
	const N = data?.numbers;
	if (!N) return <div className="empty">{lx("数字表还没加载完，请稍后重试。", "Number tables are still loading.")}</div>;
	const secs: any[] = N.sections || [];

	// legacy は data-scroll を #app の委任クリックで拾っていた。挙動（smooth/start）はそのまま。
	const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

	return (
		<>
			<div className="num-nav">
				{secs.map((s) => (
					<a data-scroll={`num-${s.id}`} key={s.id} onClick={() => jump(`num-${s.id}`)}>
						{s.title}
					</a>
				))}
			</div>
			{N.intro ? <div className="num-lead">{N.intro}</div> : null}
			{secs.map((s) => (
				<Fragment key={s.id}>
					<div className="num-sec-h" id={`num-${s.id}`}>
						{s.title}
						{s.title_jp ? <small className="jp">{s.title_jp}</small> : null}
					</div>
					{s.lead ? <div className="num-lead">{s.lead}</div> : null}
					{s.type === "rules"
						? (s.groups || []).map((g: any, i: number) => (
								<div className="card num-rule" key={i}>
									<h4>
										<Star text={g.h} />
									</h4>
									{g.eg ? (
										<div className="eg jp">
											<Star text={g.eg} />
										</div>
									) : null}
									{g.note ? (
										<div className="num-note">
											<Star text={g.note} />
										</div>
									) : null}
								</div>
							))
						: s.type === "counters"
							? (s.counters || []).map((c: any, i: number) => <NumCounter c={c} key={i} />)
							: (s.tables || []).map((t: any, i: number) => <NumTable t={t} key={i} />)}
				</Fragment>
			))}
		</>
	);
}

/* ---------------- 搜索 ---------------- */

type Hit = {
	module: string;
	w: number;
	d: number;
	i?: number;
	si?: number;
	ii?: number;
	ki?: number;
	key: string;
	reading: string;
	extra: string;
	sub: string;
	dayTitle: string;
	mistakeId?: string;
	mistakeType?: string;
	mistakeLevel?: string;
	ts?: number;
};

const MODULE_TAG: Record<string, [string, string]> = {
	grammar: ["g", "N3语法"],
	n2grammar: ["g2", "N2语法"],
	vocab: ["v", "N3词汇"],
	kanji: ["k", "N3汉字"],
	n2vocab: ["v2", "N2词汇"],
	n2kanji: ["k2", "N2汉字"],
	n4grammar: ["g4", "N4语法"],
	n4vocab: ["v4", "N4词汇"],
	n4kanji: ["k4", "N4汉字"],
	reading: ["r", "N3读解"],
	n2reading: ["r2", "N2读解"],
	listening: ["l", "N3听解"],
	n2listening: ["l2", "N2听解"],
	mistakes: ["m", "错题本"],
};

const SEARCH_MISTAKE_TYPE: Record<string, [string, string]> = { q: ["错题", "Mistake"], word: ["单词", "Word"], grammar: ["语法", "Grammar"] };
const SEARCH_MISTAKE_LEVEL: Record<string, [string, string]> = { new: ["不熟", "New"], mid: ["一般", "Learning"], done: ["已掌握", "Known"] };

/* legacy の mark(): ヒット語を .hl で囲む */
function Mark({ text, keyword }: { text: string; keyword: string }) {
	if (!keyword) return <>{text}</>;
	return (
		<>
			{text.split(keyword).map((part, i) => (
				<Fragment key={i}>
					{i > 0 ? <span className="hl">{keyword}</span> : null}
					{part}
				</Fragment>
			))}
		</>
	);
}

export function SearchPage() {
	const [keyword, setKeyword] = useState("");
	const [category, setCategory] = useState<SearchCategory>("all");
	const [history, setHistory] = useState<string[]>(() => getSearchHistory());
	const inputRef = useRef<HTMLInputElement>(null);

	// legacy は viewSearch の最後で q.focus() していた
	useEffect(() => inputRef.current?.focus(), []);

	// 毎回索引を取り直す。N2/N4 が後から入ったときに結果へ反映させるため。
	const total = searchEntryCount(category);
	const kw = keyword.trim();
	const hits: Hit[] = kw ? searchHits(kw, 60, category) : [];
	const categories: { key: SearchCategory; cn: string; en: string; icon: string }[] = [
		{ key: "all", cn: "全部", en: "All", icon: "⌕" },
		{ key: "grammar", cn: "语法", en: "Grammar", icon: "📘" },
		{ key: "kanji", cn: "汉字", en: "Kanji", icon: "📙" },
		{ key: "vocab", cn: "词汇", en: "Vocabulary", icon: "📗" },
		{ key: "mistakes", cn: "错题本", en: "Mistakes", icon: "📝" },
	];

	const openHit = (hit: Hit) => openSearchHit(hit, kw);

	return (
		<>
			<div className="search-box">
				<input
					id="q"
					ref={inputRef}
					type="search"
					placeholder={lx("日文 / 假名 / 中文 / 英文，如：ばかり · 冰箱 · fridge", "Japanese / kana / Chinese / English, e.g. ばかり · fridge")}
					autoComplete="off"
					value={keyword}
					onChange={(event) => setKeyword(event.currentTarget.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter" && keyword.trim()) {
							saveSearchHistory(keyword.trim());
							setHistory(getSearchHistory());
						}
					}}
				/>
			</div>
			<div className="search-category" role="group" aria-label={lx("搜索分类", "Search category")}>
				{categories.map((item) => (
					<button
						type="button"
						key={item.key}
						className={category === item.key ? "on" : ""}
						aria-pressed={category === item.key}
						onClick={() => setCategory(item.key)}
					>
						<span>{item.icon}</span>{lx(item.cn, item.en)}
					</button>
				))}
			</div>
			<div id="results">
				{!kw ? (
					<>
						{history.length ? (
							<div className="search-hist">
								<div className="search-hist-h">
									<span>{lx("最近搜索", "Recent")}</span>
									<a
										onClick={() => {
											clearSearchHistory();
											setHistory([]);
										}}
									>
										{lx("清空", "Clear")}
									</a>
								</div>
								<div className="search-hist-chips">
									{history.map((x) => (
										<span className="hist-chip" key={x} onClick={() => setKeyword(x)}>
											{x}
										</span>
									))}
								</div>
							</div>
						) : null}
						<div className="empty">
							{category === "all"
								? lx(`共收录 ${total} 条（语法、词汇、汉字、读解、听解、错题本）`, `${total} entries (grammar, vocab, kanji, reading, listening, mistakes)`)
								: lx(`当前分类共收录 ${total} 条`, `${total} entries in this category`)}
							<br />
							{lx("结果标注所属模块，点击直达", "Results are tagged by module — tap to open")}
						</div>
					</>
				) : !hits.length ? (
					<div className="empty">{lx("没有找到，换个关键词试试", "No matches. Try another keyword.")}</div>
				) : (
					hits.map((e, ix) => {
						const tag = MODULE_TAG[e.module];
						return (
							<div className="card result" key={ix} onClick={() => openHit(e)}>
								<div className="jp" style={{ fontSize: "16.5px", fontWeight: 700 }}>
									{tag ? <span className={`mtag ${tag[0]}`}>{tag[1]}</span> : null}
									<Mark text={e.key} keyword={kw} />
								</div>
								{e.sub ? (
									<div className="meta">
										<Mark text={e.sub} keyword={kw} />
									</div>
								) : null}
								<div className="where">
									{e.module === "mistakes"
										? <>{lx(...(SEARCH_MISTAKE_TYPE[e.mistakeType || "q"] || ["错题", "Mistake"]))} · {lx(...(SEARCH_MISTAKE_LEVEL[e.mistakeLevel || "new"] || ["不熟", "New"]))}{e.ts ? ` · ${new Date(e.ts).toLocaleDateString()}` : ""}</>
										: isListening(e.module)
										? lx(`第${e.w}章 ${e.d}节`, `Ch. ${e.w} §${e.d}`)
										: lx(`第${e.w}週 ${e.d}日目`, `Week ${e.w} Day ${e.d}`)}{" "}
									{e.module === "mistakes" ? null : <> · <span className="jp">{e.dayTitle}</span></>}
								</div>
							</div>
						);
					})
				)}
			</div>
		</>
	);
}

/* ---------------- 背诵模式（错题本と收藏で共用） ---------------- */

type StudyRow = { ts?: number; jp?: string; cn?: string; tags?: { cls: string; label: string }[] };

function mistakeDate(ts: number) {
	const d = new Date(ts);
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function studyDateGroups(rows: StudyRow[]) {
	const groups: Record<string, StudyRow[]> = {};
	rows.forEach((row) => {
		const day = row.ts ? mistakeDate(row.ts) : "早期记录";
		(groups[day] = groups[day] || []).push(row);
	});
	return Object.keys(groups)
		.sort((a, b) => b.localeCompare(a))
		.map((day) => ({ day, rows: groups[day] }));
}

function StudyToolbar({ count, hideJp, hideCn, onBack, onHide }: {
	count: number; hideJp: boolean; hideCn: boolean; onBack: () => void; onHide: (kind: "jp" | "cn") => void;
}) {
	return (
		<div className="study-toolbar">
			<button className="primary" onClick={onBack}>‹ {lx("返回列表", "Back to list")}</button>
			<span>{lx(`${count} 条`, `${count} items`)}</span>
			<div>
				<button className={hideJp ? "on" : ""} data-study-hide="jp" onClick={() => onHide("jp")}>{lx("日语", "Japanese")}</button>
				<button className={hideCn ? "on" : ""} data-study-hide="cn" onClick={() => onHide("cn")}>{lx("翻译 / 答案", "Translation")}</button>
			</div>
		</div>
	);
}

function StudyRows({ rows, kind, hideJp, hideCn }: { rows: StudyRow[]; kind: "mistake" | "fav"; hideJp: boolean; hideCn: boolean }) {
	return (
		<div className={"study-columns" + (hideJp ? " study-hide-jp" : "") + (hideCn ? " study-hide-cn" : "")}>
			<div className="study-columns__head">
				<b>日本語</b>
				<b>{kind === "mistake" ? lx("答案 / 笔记", "Answer / note") : lx("翻译", "Translation")}</b>
			</div>
			{studyDateGroups(rows).map((group) => (
				<section className="study-date-group" key={group.day}>
					<h3>
						{group.day}
						<small>{lx(`${group.rows.length} 条`, `${group.rows.length} items`)}</small>
					</h3>
					{group.rows.map((row, i) => (
						<article className="study-row" key={i}>
							<div className="study-jp">
								{(row.tags || []).map((t, j) => (
									<span className={`mtag ${t.cls}`} key={j}>{t.label}</span>
								))}
								{row.jp || ""}
							</div>
							<div className="study-cn">{row.cn ? row.cn : "—"}</div>
						</article>
					))}
				</section>
			))}
		</div>
	);
}

/* ---------------- 错题本 ---------------- */

type MistakesData = {
	list: any[]; addType: string; filter: string; levelFilter: string;
	types: Record<string, string>; levels: Record<string, string>; levelOrder: string[];
	typeCounts: Record<string, number>; levelCounts: Record<string, number>;
	studyMode: boolean; hideJp: boolean; hideCn: boolean; draft: string;
};

/* 錯題本の答え合わせ用：「你的答案：」以降を切り、「正确答案：」を訳側に回す */
function mistakeStudyParts(m: any): { jp: string; cn: string } {
	const text = String(m.text || "");
	const correct = text.match(/(?:^|\n)正确答案：\s*([^\n]+)/);
	const question = text.replace(/(?:\n|^)你的答案：[\s\S]*$/, "").trim();
	return { jp: question || text, cn: correct ? correct[1] : "" };
}

/* 改行入りのメモは <br> で折り返していた */
function Lines({ text }: { text: string }) {
	const parts = String(text).split("\n");
	return (
		<>
			{parts.map((line, i) => (
				<Fragment key={i}>
					{i > 0 ? <br /> : null}
					{line}
				</Fragment>
			))}
		</>
	);
}

const TYPE_LX: Record<string, [string, string]> = { q: ["错题", "Mistake"], word: ["单词", "Word"], grammar: ["语法", "Grammar"] };
const LEVEL_LX: Record<string, [string, string]> = { new: ["不熟", "New"], mid: ["一般", "Learning"], done: ["已掌握", "Known"] };
function typeName(key: string, fallback: string) {
	return TYPE_LX[key] ? lx(...TYPE_LX[key]) : fallback;
}
function levelName(key: string, fallback: string) {
	return LEVEL_LX[key] ? lx(...LEVEL_LX[key]) : fallback;
}

export function MistakesPage({ data }: { data: MistakesData }) {
	// 下書きは store の mistakeDraft が持つ。非制御にしておくと再描画が挟まっても
	// 入力中のカーソルまで保たれる（legacy は innerHTML ごと書き直していた）。
	const input = useRef<HTMLTextAreaElement>(null);

	if (data.studyMode) {
		const rows = data.list.map((m) => ({ ts: m.ts, ...mistakeStudyParts(m) }));
		return (
			<>
				<StudyToolbar
					count={rows.length}
					hideJp={data.hideJp}
					hideCn={data.hideCn}
					onBack={() => setMistakeStudy(false)}
					onHide={(kind) => toggleStudyHide(kind)}
				/>
				<StudyRows rows={rows} kind="mistake" hideJp={data.hideJp} hideCn={data.hideCn} />
			</>
		);
	}

	return (
		<>
			<div className="card mistake-widget" style={{ marginBottom: "14px" }}>
				<div className="mistake-types" id="mistakeTypes">
					{Object.entries(data.types).map(([key, label]) => (
						<button className={key === data.addType ? "on" : ""} data-mtype={key} key={key} onClick={() => setMistakeType(key)}>
							{typeName(key, label)}
						</button>
					))}
				</div>
				<textarea
					id="mistakeInput"
					ref={input}
					className="mistake-input"
					rows={2}
					placeholder={lx("记一下考试错题、老是记不住的单词或语法点……", "Jot down a missed question, stubborn word, or grammar point…")}
					defaultValue={data.draft}
					onChange={(event) => setMistakeDraft(event.currentTarget.value)}
				/>
				<button
					className="primary"
					data-mistake-add=""
					onClick={() => {
						const value = input.current?.value ?? "";
						if (!value.trim()) return;
						// 保存後は store が mistakeDraft を空にする。非制御なので
						// DOM の値はこちらで消さないと前の文が残る。
						if (input.current) input.current.value = "";
						addMistakeNote(value);
					}}
				>
					{lx("保存", "Save")}
				</button>
			</div>
			<div className="mistake-filter-panel">
				<div className="mistake-filter-group" role="group" aria-label={lx("内容类型", "Content type")}>
					<div className="mistake-filter-label">{lx("内容类型", "Content type")}</div>
					<div className="fc-filter mistake-filter-grid">
						<button className={data.filter === "all" ? "on" : ""} data-mfilter="all" onClick={() => setMistakeFilter("all")}>
							{lx("全部", "All")}（{data.typeCounts.all}）
						</button>
						{Object.entries(data.types).map(([key, label]) => (
							<button className={data.filter === key ? "on" : ""} data-mfilter={key} key={key} onClick={() => setMistakeFilter(key)}>
								{typeName(key, label)}（{data.typeCounts[key] ?? 0}）
							</button>
						))}
					</div>
				</div>
				<div className="mistake-filter-group" role="group" aria-label={lx("熟练度", "Mastery")}>
					<div className="mistake-filter-label">{lx("熟练度", "Mastery")}</div>
					<div className="fc-filter mistake-filter-grid">
						<button className={data.levelFilter === "all" ? "on" : ""} data-lfilter="all" onClick={() => setMistakeLevelFilter("all")}>
							{lx("全部", "All")}（{data.levelCounts.all}）
						</button>
						{data.levelOrder.map((key) => (
							<button className={data.levelFilter === key ? "on" : ""} data-lfilter={key} key={key} onClick={() => setMistakeLevelFilter(key)}>
								{levelName(key, data.levels[key])}（{data.levelCounts[key] ?? 0}）
							</button>
						))}
					</div>
				</div>
				<div className="study-entry mistake-study-entry">
					<button data-mstudy="1" onClick={() => setMistakeStudy(true)}>{lx("背诵模式", "Study mode")}（{data.list.length}）</button>
				</div>
			</div>
			{data.list.length ? (
				data.list.map((m) => {
					const level = m.level || "new";
					return (
						<div className="mistake-item" key={m.id}>
							<div className="mistake-item-head">
								<span className={`mtag mt-${m.type}`}>{typeName(m.type, data.types[m.type] || m.type)}</span>
								<button className={`mlvl ml-${level}`} data-mlevel-cycle={m.id} aria-label={lx("切换熟练度", "Change level")} onClick={() => cycleMistakeLevel(m.id)}>
									{levelName(level, data.levels[level])}
								</button>
								<span className="mistake-date">{mistakeDate(m.ts)}</span>
								<button className="mistake-del" data-mistake-del={m.id} aria-label="删除" onClick={() => deleteMistake(m.id)}>
									✕
								</button>
							</div>
							<div className="mistake-text">
								<Lines text={m.text} />
							</div>
						</div>
					);
				})
			) : (
				<div className="empty">{lx("还没有记录，在上面写一条保存试试。", "No notes yet. Write one above and save it.")}</div>
			)}
		</>
	);
}

/* ---------------- 收藏 ---------------- */

type FavItem = { id: string; module?: string; selectionType?: string; jp?: string; cn?: string; hash?: string; w?: any; d?: any; ts?: number };
type FavsData = {
	total: number; items: FavItem[]; filter: string; selectionFilter: string;
	mods: { key: string; label: string; count: number }[];
	selTypes: { key: string; label: string; count: number }[];
	selLabels: Record<string, string>;
	studyMode: boolean; hideJp: boolean; hideCn: boolean;
};

const FAV_MOD_TAG: Record<string, string> = {
	grammar: "g", n2grammar: "g2", vocab: "v", kanji: "k", n2vocab: "v2",
	n2kanji: "k2", n4grammar: "g4", n4vocab: "v4", n4kanji: "k4", reading: "r", n2reading: "r2", listening: "l", n2listening: "l2", selection: "mt-selection",
};
const FAV_MOD_TAG_LABEL: Record<string, string> = {
	grammar: "N3语法", n2grammar: "N2语法", vocab: "N3词汇", kanji: "N3汉字", n2vocab: "N2词汇",
	n2kanji: "N2汉字", n4grammar: "N4语法", n4vocab: "N4词汇", n4kanji: "N4汉字",
	reading: "N3读解", n2reading: "N2读解", listening: "N3听解", n2listening: "N2听解", selection: "划词",
};
const favTags = (item: FavItem, selLabels: Record<string, string>) => {
	const tags: { cls: string; label: string }[] = [];
	if (item.module && FAV_MOD_TAG[item.module]) tags.push({ cls: FAV_MOD_TAG[item.module], label: FAV_MOD_TAG_LABEL[item.module] });
	if (item.selectionType) tags.push({ cls: `mt-${item.selectionType}`, label: selLabels[item.selectionType] });
	return tags;
};

export function FavsPage({ data }: { data: FavsData }) {
	// 「清空收藏」は 2 度押し。legacy は data-armed を DOM に置いていたので、
	// 何かの再描画が挟まれば解除された。payload が変わったら戻すことで揃える。
	const [armed, setArmed] = useState(false);
	useEffect(() => setArmed(false), [data]);

	if (!data.total) {
		return (
			<div className="empty">
				{lx("还没有收藏。", "Nothing saved yet.")}
				<br />
				{lx("选中页面里的文字，即可收藏到生词本。", "Select text on a page to save it to your word book.")}
			</div>
		);
	}

	if (data.studyMode) {
		const rows = data.items.map((s) => ({ ts: s.ts, jp: s.jp || "", cn: s.cn || "", tags: favTags(s, data.selLabels) }));
		return (
			<>
				<StudyToolbar
					count={rows.length}
					hideJp={data.hideJp}
					hideCn={data.hideCn}
					onBack={() => setFavStudy(false)}
					onHide={(kind) => toggleStudyHide(kind)}
				/>
				<StudyRows rows={rows} kind="fav" hideJp={data.hideJp} hideCn={data.hideCn} />
			</>
		);
	}

	return (
		<>
			<div className="fav-actions">
				<button className="primary" data-favfc="" onClick={() => startFavStudyCards()}>
					▶ {lx(`用收藏刷闪卡（${data.items.length}）`, `Flashcards from favorites (${data.items.length})`)}
				</button>
				<button data-favstudy="1" onClick={() => setFavStudy(true)}>{lx("背诵模式", "Study mode")}</button>
				<button
					data-favclear=""
					{...(armed ? { "data-armed": "1" } : null)}
					onClick={() => (armed ? clearFavs() : setArmed(true))}
				>
					{armed ? lx("再点一次清空", "Tap again to clear") : lx("清空收藏", "Clear favorites")}
				</button>
			</div>
			{data.mods.length > 1 ? (
				<div className="fc-filter" style={{ marginBottom: "12px" }}>
					<button className={data.filter === "all" ? "on" : ""} data-favfilter="all" onClick={() => setFavFilter("all")}>
						{lx("全部", "All")}（{data.total}）
					</button>
					{data.mods.map((m) => (
						<button className={data.filter === m.key ? "on" : ""} data-favfilter={m.key} key={m.key} onClick={() => setFavFilter(m.key)}>
							{m.label}（{m.count}）
						</button>
					))}
				</div>
			) : null}
			{data.selTypes.length ? (
				<div className="fc-filter fav-type-filter" style={{ marginBottom: "12px" }}>
					<span>{lx("划词类别", "Selection type")}</span>
					<button
						className={data.selectionFilter === "all" ? "on" : ""}
						data-selfavfilter="all"
						onClick={() => setFavSelectionFilter("all")}
					>
						{lx("全部", "All")}
					</button>
					{data.selTypes.map((t) => (
						<button
							className={data.selectionFilter === t.key ? "on" : ""}
							data-selfavfilter={t.key}
							key={t.key}
							onClick={() => setFavSelectionFilter(t.key)}
						>
							{t.label}（{t.count}）
						</button>
					))}
				</div>
			) : null}
			<div className="card">
				{data.items.map((s) => (
					<div className="fav-item" key={s.id}>
						<button className="starb" data-fav={s.id} aria-label="取消收藏" onClick={() => toggleFav(s.id)}>
							★
						</button>
						<div
							className="fj"
							data-go={s.hash || "#/"}
							data-mod={s.module === "selection" ? "" : s.module || ""}
							onClick={() => openFav(s.hash || "#/", s.module === "selection" ? "" : s.module || "")}
						>
							<div className="t jp">
								{favTags(s, data.selLabels).map((t, i) => (
									<span className={`mtag ${t.cls}`} key={i}>{t.label}</span>
								))}
								{s.jp || ""}
							</div>
							{s.cn ? <div className="c">{s.cn}</div> : null}
						</div>
						<span className="fw">{s.selectionType ? "划词" : `第${s.w ?? ""}週${s.d ?? ""}日`}</span>
					</div>
				))}
			</div>
		</>
	);
}

/* 收藏から作る闪卡。山は legacy の favDeck が持つ。 */
export function FavFcPage({ data }: { data: { jp: string; cn: string; idx: number; total: number; flipped: boolean } }) {
	return (
		<div className="fc-wrap">
			<div className="fc-prog">
				{data.idx + 1} / {data.total}
			</div>
			<Fragment key={`${data.idx}-${data.flipped}`}>
				{data.flipped ? (
					<div className="fcard" data-favflip="" onClick={() => flipFavCard()}>
						<div className="backside" style={{ textAlign: "center" }}>
							<div className="jp" style={{ fontWeight: 700, fontSize: "24px" }}>
								{data.jp} <SayButton text={data.jp} />
							</div>
							{data.cn ? <div style={{ fontSize: "18px", marginTop: "12px" }}>{data.cn}</div> : null}
						</div>
					</div>
				) : (
					<div className="fcard" data-favflip="" onClick={() => flipFavCard()}>
						<div className="big jp">{data.jp}</div>
						<div className="hint">{lx("点击翻面看释义", "Tap to see the meaning")}</div>
					</div>
				)}
			</Fragment>
			<div className="fc-btns">
				<button data-favprev="" onClick={() => prevFavCard()}>‹ {lx("上一张", "Prev")}</button>
				<button className="primary" data-favnext="" onClick={() => nextFavCard()}>{lx("下一张", "Next")} ›</button>
				<button data-favback="" onClick={() => closeFavStudyCards()}>{lx("返回收藏", "Back to favorites")}</button>
			</div>
		</div>
	);
}

/* ---------------- 首页（週アコーディオン） ---------------- */

/* 一目でその日の内容が分かるように：語法日は文型、漢字日は漢字、語彙日は先頭の語 */
function dayPreviewItems(day: any): string[] {
	let items: any[] = [];
	if (Array.isArray(day.points)) items = day.points.map((p: any) => p.pattern);
	else if (Array.isArray(day.kanji)) items = day.kanji.map((k: any) => k.char);
	else if (Array.isArray(day.vocab)) items = day.vocab.map((it: any) => it.jp);
	else if (Array.isArray(day.grammar)) items = day.grammar.map((p: any) => p.pattern);
	else if (Array.isArray(day.sections))
		items = day.sections.reduce((all: any[], sec: any) => all.concat((sec.items || []).map((it: any) => it.jp)), []);
	return items.filter(Boolean).slice(0, 6);
}

/* 週の開閉は legacy の openWeeks（モジュールごとの Set）が持つ。ここへ複製しないのは、
   モジュールを切り替えて戻ったときに開いていた週が保たれる挙動を変えないため。 */
export function HomePage({ data }: { data: { weeks: any[]; intro: string; lang: string; scale?: "week" | "chapter" } }) {
	const [, bump] = useReducer((n: number) => n + 1, 0);
	const [jumpTo, setJumpTo] = useState<number | null>(null);

	// legacy は render() の最後で必ず updateStickyVars() していた。--hometoph は
	// .home-top を実測して決まるので、React では commit 後でないと測れない。
	useEffect(() => {
		afterPaint();
		if (jumpTo == null) return;
		document.getElementById("wk-" + jumpTo)?.scrollIntoView({ behavior: "auto", block: "start" });
		setJumpTo(null);
	});

	const open = openWeekSet();
	const lx = (cn?: string, en?: string) => (data.lang === "en" && en ? en : cn || "");
	const isEnglish = data.lang === "en";
	const isChapter = data.scale === "chapter";
	const weekLabel = (n: number) => (isChapter ? (isEnglish ? `Ch. ${n}` : `第${n}章`) : isEnglish ? `Week ${n}` : `第${n}週`);
	const dayLabel = (d: number, exam: boolean) =>
		isChapter
			? isEnglish
				? `Section ${d}`
				: `${d}节`
			: isEnglish
				? `Day ${d}${exam ? " · Test" : ""}`
				: `${d}日目${exam ? " · 实战" : ""}`;

	return (
		<>
			<div className="home-top">
				<div className="meta" style={{ marginBottom: "10px" }}>
					{data.intro}
				</div>
				{data.weeks.length > 3 ? (
					<div className="wk-toc">
						{data.weeks.map((w) => (
							<a
								className="wk-tocitem"
								data-wkjump={w.n}
								key={w.n}
								onClick={() => {
									// 畳んである週は先に開かないと、飛んでも何も起きていないように見える
									jumpWeek(w.n);
									setJumpTo(w.n);
									bump();
								}}
							>
								{weekLabel(w.n)}
							</a>
						))}
					</div>
				) : null}
			</div>
			{data.weeks.map((w) => {
				const isOpen = open.has(w.n);
				const sub = lx(w.title_cn, w.title_en);
				return (
					<div className="card week-card" id={`wk-${w.n}`} key={w.n}>
						<div
							className="wk-head"
							data-wktoggle={w.n}
							role="button"
							aria-expanded={isOpen}
							onClick={() => {
								toggleWeek(w.n);
								bump();
							}}
						>
							<div className="wk-t">
								<h2>
									{weekLabel(w.n)}
									{w.title ? <> <span className="jp">{w.title}</span></> : null}
								</h2>
								{sub ? <div className="sub">{sub}</div> : null}
							</div>
							<span className="cnt">{isEnglish ? `${w.days.length} ${isChapter ? "sections" : "days"}` : `${w.days.length}${isChapter ? "节" : "天"}`}</span>
							<span className="cv">{isOpen ? "▾" : "▸"}</span>
						</div>
						{isOpen ? (
							<div className="wk-body">
								<div className="day-list">
									{w.days.map((d: any) => {
										const preview = dayPreviewItems(d);
										return (
											<div
												className="day-item"
												data-go={`#/day/${w.n}-${d.day}`}
												key={d.day}
												onClick={() => navTo(`#/day/${w.n}-${d.day}`)}
										>
											<div className="d">
												{dayLabel(d.day, !isChapter && d.day === 7)}
												</div>
												<div className="t jp">
													<Rr o={d} f="title" />
												</div>
												<div className="tc">{lx(d.title_cn, d.title_en)}</div>
												{preview.length ? (
													<div className="day-prev">
														{preview.map((text, i) => (
															<span className="dp jp" key={i}>
																{text}
															</span>
														))}
													</div>
												) : null}
											</div>
										);
									})}
								</div>
							</div>
						) : null}
					</div>
				);
			})}
		</>
	);
}

/* ---------------- 记忆卡 ---------------- */

/* デッキの中身（どの週のどの語彙を出すか・シャッフル）は DATA と MODULE を持つ
   legacy 側に残し、ここは表示と操作だけを担う。fc をこちらへ複製しないのは、
   カードを離れて戻ったときに同じ山・同じ位置・同じ表裏へ戻る挙動を保つため
   （legacy の fc はモジュール変数なので view を跨いで生き残る）。 */
export function CardsPage() {
	const [, bump] = useReducer((n: number) => n + 1, 0);

	const fc = cardsState();
	const act = (fn: () => void) => () => {
		fn();
		bump();
	};
	const flip = act(flipCard);
	const kind = cardsKind();
	const cur = fc.deck[fc.idx];

	const chapterScale = homeScale() === "chapter";
	let card: ReactNode;
	if (!fc.deck.length) {
		card = (
			<div className="fcard">
				<div className="empty">
					{lx("这个模块还没有可刷的卡片", "No flashcards in this module yet")}
				</div>
			</div>
		);
	} else if (!cur) {
		card = (
			<div className="fcard">
				<div className="empty">
					{lx("本组已完成 🎉", "Deck complete 🎉")}
					<br />
					{lx("点「重新洗牌」再来一轮", "Shuffle to start another round")}
				</div>
			</div>
		);
	} else if (kind === "gram") {
		const p = cur.p;
		const eg = p.examples && p.examples[0];
		card = !fc.flipped ? (
			<div className="fcard" data-fcflip="1" onClick={flip}>
				<div className="big jp">{p.pattern}</div>
				<div className="hint">{lx("回想接续与意思，点击翻面", "Recall the pattern, then tap to flip")}</div>
			</div>
		) : (
			<div className="fcard" data-fcflip="1" onClick={flip}>
				<div className="backside">
					<div className="jp" style={{ fontWeight: 700, fontSize: "18px" }}>
						<Rr o={p} f="pattern" />
					</div>
					{p.reading ? <div className="reading jp meta">{p.reading}</div> : null}
					<ConnBlock connection={p.connection} />
					{p.usage_jp ? (
						<div className="usage jp">
							<Rr o={p} f="usage_jp" />
						</div>
					) : null}
					{p.usage_cn ? (
						<div className="usage">
							<span className="cn">{p.usage_cn}</span>
						</div>
					) : null}
					{eg ? (
						<div className="ex">
							<div className="jp">
								<Rr o={eg} f="jp" />
							</div>
							{eg.cn ? <div className="cn">{eg.cn}</div> : null}
						</div>
					) : null}
					<div className="meta">
						{lx(`出处：第${cur.w}週 ${cur.d}日目`, `From: Week ${cur.w} Day ${cur.d}`)}
						{"　"}
						<span
							className="plink"
							data-go={`#/day/${cur.w}-${cur.d}/p${cur.i}`}
							style={{ cursor: "pointer" }}
							onClick={(event) => {
								// legacy の委任は [data-go] を [data-fcflip] より先に見て return していた。
								// ここは入れ子なので、止めないと詳細へ飛びつつ裏返ってしまう。
								event.stopPropagation();
								navTo(`#/day/${cur.w}-${cur.d}/p${cur.i}`);
							}}
						>
							{lx("详情 ›", "Details ›")}
						</span>
					</div>
				</div>
			</div>
		);
	} else if (kind === "kanji") {
		const k = cur.k;
		card = !fc.flipped ? (
			<div className="fcard" data-fcflip="1" onClick={flip}>
				<div className="big jp" style={{ fontSize: "64px" }}>
					{k.char}
				</div>
				<div className="hint">{lx("回想读音与词语，点击翻面", "Recall the reading and words, then tap to flip")}</div>
			</div>
		) : (
			<div className="fcard" data-fcflip="1" onClick={flip}>
				<div className="backside" style={{ textAlign: "center" }}>
					<div className="jp" style={{ fontWeight: 700, fontSize: "40px" }}>
						{k.char}
					</div>
					<div className="meta jp" style={{ fontSize: "15px" }}>
						{(k.readings || []).map((r: string, i: number) => (
							<span className="kread" key={i}>
								{r}
							</span>
						))}
						{k.strokes ? <span className="kread">{k.strokes}画</span> : null}
					</div>
					{(k.words || []).map((wd: any, i: number) => (
						<div className="ex" key={i}>
							<div className="jp">
								<Rr o={wd} f="jp" />
							</div>
							{wd.cn ? <div className="cn">{wd.cn}</div> : null}
						</div>
					))}
				</div>
			</div>
		);
	} else {
		const it = cur.v;
		card = !fc.flipped ? (
			<div className="fcard" data-fcflip="1" onClick={flip}>
				<div className="big jp">
					<Rr o={it} f="jp" />
				</div>
				<div className="hint">{lx("回想中/英文，点击翻面", "Recall the meaning, then tap to flip")}</div>
			</div>
		) : (
			<div className="fcard" data-fcflip="1" onClick={flip}>
				<div className="backside" style={{ textAlign: "center" }}>
					<div className="jp" style={{ fontWeight: 700, fontSize: "22px" }}>
						<Rr o={it} f="jp" />
					</div>
					{it.cn ? <div style={{ fontSize: "18px", marginTop: "10px" }}>{it.cn}</div> : null}
					{it.en ? (
						<div className="meta" style={{ fontSize: "14px" }}>
							{it.en}
						</div>
					) : null}
					{it.rel ? (
						<div className="vrel jp" style={{ marginTop: "8px" }}>
							<Rr o={it} f="rel" />
						</div>
					) : null}
				</div>
			</div>
		);
	}

	return (
		<div className="fc-wrap">
			<div className="fc-filter">
				{[0, ...Array.from({ length: cardsWeeks() }, (_, i) => i + 1)].map((n) => (
					<button key={n} className={fc.week === n ? "on" : ""} data-fcweek={n} onClick={act(() => setCardsWeek(n))}>
						{n === 0
							? lx("全部", "All")
							: chapterScale
								? lx(`第${n}章`, `Ch. ${n}`)
								: lx(`第${n}週`, `Week ${n}`)}
					</button>
				))}
			</div>
			<div className="fc-prog">{fc.deck.length ? `${Math.min(fc.idx + 1, fc.deck.length)} / ${fc.deck.length}` : ""}</div>
			{/* legacy は innerHTML を書き直すので、カードが変わるたび DOM は必ず作り直しだった。
			    React に任せると表裏で節点を使い回し、裏面の style を落とした残骸（style=""）が
			    表面に残る。key を変えて作り直させ、移行前と同じ DOM に揃える。 */}
			<Fragment key={cur ? `${kind}-${fc.idx}-${fc.flipped}` : "done"}>{card}</Fragment>
			<div className="fc-btns">
				<button data-fc="prev" onClick={act(prevCard)}>
					‹ {lx("上一张", "Prev")}
				</button>
				<button className="primary" data-fc="next" onClick={act(nextCard)}>
					{lx("下一张", "Next")} ›
				</button>
				<button data-fc="shuffle" onClick={act(shuffleCards)}>
					{lx("重新洗牌", "Shuffle")}
				</button>
			</div>
		</div>
	);
}
