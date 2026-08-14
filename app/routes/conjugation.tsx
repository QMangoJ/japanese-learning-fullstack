import { Fragment, useMemo, useState } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/conjugation";
import { attachmentExample, conjugationTables, formationRules } from "../data/conjugation";
import "./reading-n3-book.css";
import "./conjugation.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "動詞活用まとめ · 日本語上手" },
		{
			name: "description",
			content: "N3 动词・形容词・名词变形总结：辞书形、ない形、ます形、て形、た形、ば形、意志形、可能形、被动、使役、命令形一览。",
		},
	];
}

const RUBY = /\{([^{}|]+)\|([^{}|]+)\}/g;

function Jp({ text }: { text: string }) {
	const parts = useMemo(() => {
		const out: (string | { base: string; reading: string })[] = [];
		let cursor = 0;
		for (const match of text.matchAll(RUBY)) {
			if (match.index! > cursor) out.push(text.slice(cursor, match.index));
			out.push({ base: match[1], reading: match[2] });
			cursor = match.index! + match[0].length;
		}
		if (cursor < text.length) out.push(text.slice(cursor));
		return out;
	}, [text]);

	return (
		<>
			{parts.map((part, index) =>
				typeof part === "string" ? (
					<Fragment key={index}>{part}</Fragment>
				) : (
					<ruby key={index}>
						{part.base}
						<rt>{part.reading}</rt>
					</ruby>
				),
			)}
		</>
	);
}

/** `な〈だ〉` renders the bracketed part struck through, as the book prints it. */
function Notation({ text }: { text: string }) {
	const parts = text.split(/(〈[^〉]*〉)/);
	return (
		<>
			{parts.map((part, index) =>
				part.startsWith("〈") ? (
					<s key={index}>{part.slice(1, -1)}</s>
				) : (
					<Fragment key={index}>{part}</Fragment>
				),
			)}
		</>
	);
}

export function ConjugationContent({ embedded = false }: { embedded?: boolean }) {
	const [showCn, setShowCn] = useState(false);
	const [furigana, setFurigana] = useState(true);
	const [active, setActive] = useState<string>("verb");

	const table = conjugationTables.find((item) => item.id === active) ?? conjugationTables[0];

	return (
		<div className={`rb${furigana ? "" : " rb--no-furigana"}`}>
			<div className="rb-wrap rb-wrap--wide">
				<div className="rb-bar">
					<div className="rb-bar__id">
						<span>N3　文法</span>
						<b>動詞活用まとめ</b>
					</div>
					<div className="rb-toggles">
						{!embedded && (
							<Link className="rb-back" to="/study">
								‹ 学習トップ
							</Link>
						)}
						<button type="button" aria-pressed={furigana} onClick={() => setFurigana((value) => !value)}>
							振り仮名
						</button>
						<button type="button" aria-pressed={showCn} onClick={() => setShowCn((value) => !value)}>
							中文说明
						</button>
					</div>
				</div>

				<div className="rb-cover">
					<span>{"活　用　ま　と　め"}</span>
					<h1>动词・形容词・名词　变形总结</h1>
					<p>出典：《N3文法 新日语能力考试考前对策》「接続の表示方法」P.9–P.10</p>
					<p className="rb-cover__meta">
						表格与「表示の例」忠实转录自原书；标注「本站补充」的部分是为方便记忆而追加的变形规则。
					</p>
				</div>

				<nav className="cj-tabs" aria-label="品詞切り替え">
					{conjugationTables.map((item) => (
						<button
							type="button"
							key={item.id}
							className={item.id === active ? "is-active" : ""}
							onClick={() => setActive(item.id)}
						>
							<b>{item.title}</b>
							<small>{showCn ? item.titleCn : item.titleEn}</small>
						</button>
					))}
				</nav>

				<section className="rb-sheet">
					<span className="rb-sheet__tag">{table.title}</span>
					<h2 className="rb-point__title">
						{table.title}
						{table.titleKana ? `（${table.titleKana}）` : ""}
					</h2>
					<p className="rb-point__title-en">{table.titleEn}</p>
					{showCn && <span className="rb-cn rb-cn--block">{table.titleCn}</span>}

					{table.intro?.map((line, index) => (
						<p className="rb-tip" key={index}>
							<span>
								<Jp text={line.jp} />
								{showCn && <span className="rb-cn">{line.cn}</span>}
							</span>
						</p>
					))}

					<div className="rb-scroll">
						<table className="rb-table cj-table">
							<thead>
								<tr>
									<td className="is-header">解説文中の表示</td>
									<td className="is-header">活用形</td>
									{table.columns.map((column, index) => (
										<td className="is-header" key={index} style={{ textAlign: "center" }}>
											{column.label}
											{column.sub && (
												<>
													<br />
													<small>{column.sub}</small>
												</>
											)}
										</td>
									))}
								</tr>
							</thead>
							<tbody>
								{table.rows.map((row, index) => (
									<tr key={index}>
										<td className="cj-notation">
											<Notation text={row.notation} />
										</td>
										<td>
											<b>{row.form}</b>
											<span className="cj-formmeta">
												{row.formJa} ／ {row.formEn}
											</span>
											{showCn && <span className="rb-cn">{row.formCn}</span>}
										</td>
										{row.cells.map((cell, cellIndex) => (
											<td key={cellIndex} style={{ textAlign: "center" }} className="cj-value">
												{cell}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<p className="rb-note-star">
						<b>◎ {table.plainForm.note}</b>
						<br />
						ex. {table.plainForm.example}
						{showCn && <span className="rb-cn">{table.plainForm.cn}</span>}
					</p>

					{table.notes?.map((note, index) => (
						<p className="rb-note-star" key={index}>
							<Jp text={note.jp} />
							{showCn && <span className="rb-cn">{note.cn}</span>}
						</p>
					))}
				</section>

				<section className="rb-sheet">
					<span className="rb-sheet__tag">表示の例</span>
					<p className="rb-instruction">接続の書き方の読み取り方</p>
					{showCn && (
						<span className="rb-cn rb-cn--block">
							书里用「V／A／Na／N ＋ 〜」这种写法表示接续。下面以「〜せいで」为例，说明每种词类该用哪个形。
						</span>
					)}
					<div className="cj-example">
						<p className="cj-example__rule">
							<b>{attachmentExample.rule}</b>
							<br />
							<Notation text={attachmentExample.ruleNote} />
						</p>
						<div className="cj-example__cols">
							<div>
								<p className="cj-ok">○ 正しい形</p>
								<ul>
									{attachmentExample.ok.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							</div>
							<div>
								<p className="cj-ng">× 使えない形</p>
								<ul>
									{attachmentExample.ng.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							</div>
						</div>
						<p className="cj-example__note">{attachmentExample.explanationEn}</p>
						{showCn && <span className="rb-cn rb-cn--block">{attachmentExample.explanation}</span>}
					</div>
				</section>

				{formationRules.map((group) => (
					<section className="rb-sheet" key={group.id}>
						<span className="rb-sheet__tag">
							{group.title}
							<em className="cj-badge">本站补充</em>
						</span>
						{showCn && <span className="rb-cn rb-cn--block">{group.titleCn}</span>}
						{group.note && <p className="rb-tip"><span>{group.note}</span></p>}
						<div className="rb-scroll">
							<table className="rb-table cj-table">
								<tbody>
									{group.rows.map((row, index) => (
										<tr key={index}>
											<td className="is-header" style={{ whiteSpace: "nowrap" }}>
												{row.pattern}
											</td>
											<td className="cj-value">{row.result}</td>
											<td>{row.examples}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</section>
				))}

				<p className="rb-pageref">
					出典：《N3文法 新日语能力考试考前对策》P.9–P.10「接続の表示方法」
				</p>
			</div>
		</div>
	);
}

export default function Conjugation() {
	return <ConjugationContent />;
}
