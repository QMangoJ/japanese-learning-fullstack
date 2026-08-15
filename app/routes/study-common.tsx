import { Fragment, useEffect, useState } from "react";

/* 通用知识のうち「接续表 / 活用 / 变形」の3ページ。
 *
 * ルーティング・ヘッダー・ナビの点灯は従来どおり study-legacy が持つ。ここが
 * 引き受けるのは本文の描画だけで、legacy 側の viewRef / viewKatsuyou /
 * viewHenkei は setNav・setHeader を済ませたあと showCommonPage() を呼ぶ。
 * クラス名と DOM 構造は移行前の文字列組み立てと同じものを再現している。 */

export type CommonPage = "ref" | "katsuyou" | "henkei";

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

/* ---------------- ホスト ---------------- */

declare global {
	interface Window {
		__studyNav?: (key: string) => void;
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

	if (!payload) return null;
	const { page, data } = payload;
	return (
		<main id="common-page">
			{page === "ref" ? <RefPage data={data} /> : null}
			{page === "katsuyou" ? <KatsuyouPage data={data} /> : null}
			{page === "henkei" ? <HenkeiPage data={data} /> : null}
		</main>
	);
}
