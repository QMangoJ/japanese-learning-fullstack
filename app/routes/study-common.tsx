import { Fragment, useEffect, useReducer, useRef, useState, type ReactNode } from "react";

/* 通用知识のうち「接续表 / 活用 / 变形」の3ページ。
 *
 * ルーティング・ヘッダー・ナビの点灯は従来どおり study-legacy が持つ。ここが
 * 引き受けるのは本文の描画だけで、legacy 側の viewRef / viewKatsuyou /
 * viewHenkei は setNav・setHeader を済ませたあと showCommonPage() を呼ぶ。
 * クラス名と DOM 構造は移行前の文字列組み立てと同じものを再現している。 */

export type CommonPage = "ref" | "katsuyou" | "henkei" | "numbers" | "search" | "cards";

/* legacy の markStar(): ★ だけを .num-x で包む */
function Star({ text }: { text: unknown }) {
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
function RubyHtml({ html }: { html: string }) {
	return <>{renderRich(parseRich(html))}</>;
}

/* legacy の R(o,f) = o[f+'_r'] があればその HTML、なければ素の o[f] */
function Rr({ o, f }: { o: any; f: string }) {
	const rich = o && o[f + "_r"];
	if (rich) return <RubyHtml html={String(rich)} />;
	return <>{o?.[f] ?? ""}</>;
}

/* legacy の sayBtn()。#app 上の委任クリックは届かないので直接呼ぶ。 */
function SayButton({ text }: { text?: string }) {
	if (!text) return null;
	// data-say は読み上げ対象そのものを表すデータ属性なので移行前と同じく残す。
	// 実際の発火は #app の委任ではなく onClick。
	return (
		<button className="sayb" data-say={text} aria-label="朗读" onClick={() => window.__studySay?.(text)}>
			🔊
		</button>
	);
}

/* legacy の fmt(): '~text~' を <del> にする。エスケープは React 側が行う。 */
function Fmt({ text }: { text: unknown }) {
	const raw = text == null ? "" : String(text);
	const parts = raw.split(/~([^~]+)~/g);
	return (
		<>
			{parts.map((part, index) => (index % 2 === 1 ? <del key={index}>{part}</del> : <Fragment key={index}>{part}</Fragment>))}
		</>
	);
}

/* ---------------- 接続表示（legacy の connBlockHTML / connHTML / connRowHTML） ----------------
   毎日語法の pointHTML でも使うため、legacy 側の3関数はその移行までは残る。
   二重管理になる間は、データ中の connection 全件を両実装に通して出力一致を
   確認してある（毎日語法を移すときに legacy 側を消し、この注記も外す）。 */

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

function ConnBlock({ connection }: { connection?: string }) {
	if (!connection) return null;
	return (
		<div className="conn jp">
			<span className="conn-label">
				接続{/~[^~]+~/.test(connection) ? <span className="conn-hint">（划线部分去掉）</span> : null}
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
	return (
		<div className="table-scroll">
			<table className="ref">
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
function KTable({ cols, rows }: { cols: string[]; rows: { label: string; vals: string[] }[] }) {
	return (
		<div className="table-scroll">
			<table className="ref">
				<tbody>
					<tr>
						<th />
						{cols.map((c, i) => (
							<th key={i}>{c}</th>
						))}
					</tr>
					{rows.map((r, i) => (
						<tr key={i}>
							<th>{r.label}</th>
							{r.vals.map((v, j) => (
								<td
									className="jp"
									key={j}
									style={j === cols.length - 1 ? { color: "var(--accent)", fontWeight: 600 } : undefined}
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
function PTable({ cols, rows }: { cols: string[]; rows: { label: string; vals: string[] }[] }) {
	return (
		<div className="table-scroll">
			<table className="ref">
				<tbody>
					<tr>
						<th />
						{cols.map((c, i) => (
							<th key={i}>{c}</th>
						))}
					</tr>
					{rows.map((r, i) => (
						<tr key={i}>
							<th className="jp">{r.label}</th>
							{r.vals.map((v, j) => (
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

function RefPage({ data }: { data: any }) {
	const RF = data.reference;
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

function KatsuyouPage({ data }: { data: any }) {
	const KY = data.katsuyou;
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

function HenkeiPage({ data }: { data: any }) {
	const HK = data.henkei;
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
						onClick={() => window.__studyNav?.("#/ref")}
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

function NumbersPage({ data }: { data: any }) {
	const N = data.numbers;
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
};

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

function SearchPage() {
	const [keyword, setKeyword] = useState("");
	const [history, setHistory] = useState<string[]>(() => window.__studySearch?.history() ?? []);
	const inputRef = useRef<HTMLInputElement>(null);

	// legacy は viewSearch の最後で q.focus() していた
	useEffect(() => inputRef.current?.focus(), []);

	// 毎回ブリッジを呼ぶ。N2/N4 が後から入ったときに結果へ反映させるため。
	const total = window.__studySearch?.index().length ?? 0;
	const kw = keyword.trim();
	const hits: Hit[] = kw
		? (window.__studySearch?.index() ?? []).filter((e: Hit) => {
				const lk = kw.toLowerCase();
				return e.key.toLowerCase().includes(lk) || e.reading.includes(kw) || e.extra.toLowerCase().includes(lk);
			}).slice(0, 60)
		: [];

	const openHit = (hit: Hit) => window.__studySearch?.open(hit, kw);

	return (
		<>
			<div className="search-box">
				<input
					id="q"
					ref={inputRef}
					type="search"
					placeholder="日文 / 假名 / 中文 / 英文，如：ばかり · 冰箱 · fridge"
					autoComplete="off"
					value={keyword}
					onChange={(event) => setKeyword(event.currentTarget.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter" && keyword.trim()) {
							window.__studySearch?.saveHistory(keyword.trim());
							setHistory(window.__studySearch?.history() ?? []);
						}
					}}
				/>
			</div>
			<div id="results">
				{!kw ? (
					<>
						{history.length ? (
							<div className="search-hist">
								<div className="search-hist-h">
									<span>最近搜索</span>
									<a
										onClick={() => {
											window.__studySearch?.clearHistory();
											setHistory([]);
										}}
									>
										清空
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
							共收录 {total} 条（语法点 + 词汇）
							<br />
							结果标注所属模块，点击直达
						</div>
					</>
				) : !hits.length ? (
					<div className="empty">没有找到，换个关键词试试</div>
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
									第{e.w}週 {e.d}日目 · <span className="jp">{e.dayTitle}</span>
								</div>
							</div>
						);
					})
				)}
			</div>
		</>
	);
}

/* ---------------- 记忆卡 ---------------- */

/* デッキの中身（どの週のどの語彙を出すか・シャッフル）は DATA と MODULE を持つ
   legacy 側に残し、ここは表示と操作だけを担う。fc をこちらへ複製しないのは、
   カードを離れて戻ったときに同じ山・同じ位置・同じ表裏へ戻る挙動を保つため
   （legacy の fc はモジュール変数なので view を跨いで生き残る）。 */
function CardsPage() {
	const [, bump] = useReducer((n: number) => n + 1, 0);
	const cards = window.__studyCards;
	if (!cards) return null;

	const fc = cards.state();
	const act = (fn: () => void) => () => {
		fn();
		bump();
	};
	const flip = act(cards.flip);
	const cur = fc.deck[fc.idx];

	let card: ReactNode;
	if (!cur) {
		card = (
			<div className="fcard">
				<div className="empty">
					本组已完成 🎉
					<br />点「重新洗牌」再来一轮
				</div>
			</div>
		);
	} else if (cards.kind() === "gram") {
		const p = cur.p;
		const eg = p.examples && p.examples[0];
		card = !fc.flipped ? (
			<div className="fcard" data-fcflip="1" onClick={flip}>
				<div className="big jp">{p.pattern}</div>
				<div className="hint">回想接续与意思，点击翻面</div>
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
						出处：第{cur.w}週 {cur.d}日目{"　"}
						<span
							className="plink"
							data-go={`#/day/${cur.w}-${cur.d}/p${cur.i}`}
							style={{ cursor: "pointer" }}
							onClick={(event) => {
								// legacy の委任は [data-go] を [data-fcflip] より先に見て return していた。
								// ここは入れ子なので、止めないと詳細へ飛びつつ裏返ってしまう。
								event.stopPropagation();
								window.__studyNav?.(`#/day/${cur.w}-${cur.d}/p${cur.i}`);
							}}
						>
							详情 ›
						</span>
					</div>
				</div>
			</div>
		);
	} else if (cards.kind() === "kanji") {
		const k = cur.k;
		card = !fc.flipped ? (
			<div className="fcard" data-fcflip="1" onClick={flip}>
				<div className="big jp" style={{ fontSize: "64px" }}>
					{k.char}
				</div>
				<div className="hint">回想读音与词语，点击翻面</div>
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
				<div className="hint">回想中/英文，点击翻面</div>
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
				{[0, ...Array.from({ length: cards.weeks() }, (_, i) => i + 1)].map((n) => (
					<button key={n} className={fc.week === n ? "on" : ""} data-fcweek={n} onClick={act(() => cards.setWeek(n))}>
						{n === 0 ? "全部" : "第" + n + "週"}
					</button>
				))}
			</div>
			<div className="fc-prog">{fc.deck.length ? `${Math.min(fc.idx + 1, fc.deck.length)} / ${fc.deck.length}` : ""}</div>
			{/* legacy は innerHTML を書き直すので、カードが変わるたび DOM は必ず作り直しだった。
			    React に任せると表裏で節点を使い回し、裏面の style を落とした残骸（style=""）が
			    表面に残る。key を変えて作り直させ、移行前と同じ DOM に揃える。 */}
			<Fragment key={cur ? `${cards.kind()}-${fc.idx}-${fc.flipped}` : "done"}>{card}</Fragment>
			<div className="fc-btns">
				<button data-fc="prev" onClick={act(cards.prev)}>
					‹ 上一张
				</button>
				<button className="primary" data-fc="next" onClick={act(cards.next)}>
					下一张 ›
				</button>
				<button data-fc="shuffle" onClick={act(cards.shuffle)}>
					重新洗牌
				</button>
			</div>
		</div>
	);
}

/* ---------------- ホスト ---------------- */

declare global {
	interface Window {
		__studyNav?: (key: string) => void;
		__studySay?: (text: string) => void;
		/* 数字页の吸顶目录は高さを実測してから位置を決める。legacy は innerHTML の
		   直後に同期で呼んでいたが、React では commit 後でないと測れない。 */
		__studyAfterPaint?: () => void;
		__studySearch?: {
			index: () => any[];
			history: () => string[];
			saveHistory: (kw: string) => void;
			clearHistory: () => void;
			open: (hit: any, keyword: string) => void;
		};
		/* 记忆卡：山の中身と操作は legacy の fc / buildDeck が持ち続ける */
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
	}
}

type Payload = { page: CommonPage; data: any } | null;

export function CommonPageHost() {
	const [payload, setPayload] = useState<Payload>(null);

	useEffect(() => {
		const onShow = (event: Event) => setPayload((event as CustomEvent<Payload>).detail);
		window.addEventListener("study:common-page", onShow);
		return () => window.removeEventListener("study:common-page", onShow);
	}, []);

	useEffect(() => {
		if (payload) window.__studyAfterPaint?.();
	}, [payload]);

	if (!payload) return null;
	const { page, data } = payload;
	return (
		<main id="common-page">
			{page === "ref" ? <RefPage data={data} /> : null}
			{page === "katsuyou" ? <KatsuyouPage data={data} /> : null}
			{page === "henkei" ? <HenkeiPage data={data} /> : null}
			{page === "numbers" ? <NumbersPage data={data} /> : null}
			{page === "search" ? <SearchPage /> : null}
			{page === "cards" ? <CardsPage /> : null}
		</main>
	);
}
