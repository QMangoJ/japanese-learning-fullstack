import { useEffect, useState, type ReactNode } from "react";

import { ConnBlock, Fmt, Rr, RubyHtml, SayButton } from "../routes/study-common";
import {
	FAVMETA,
	G,
	K,
	LANG,
	MODULE,
	TYPE,
	V,
	addMistake,
	ctMode,
	ctWeek,
	cur,
	dayNeighbors,
	findDay,
	isFav,
	isGram,
	lx,
	navTo,
	registerFavMeta,
	setCtMode,
	setCtWeek,
	toggleDisplay,
	toggleFav,
} from "./store";

const CIRCLED_NUMS = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟";
const N3_KANJI_EXAM_KEYS: Record<number, number[]> = {
	1: [2, 1, 2, 4, 3, 4, 1, 2, 2, 4, 3, 1, 4, 2, 3, 4, 2, 3, 4, 1],
	2: [2, 2, 2, 3, 1, 1, 4, 4, 3, 1, 2, 1, 4, 3, 1, 3, 4, 1, 3, 4],
	3: [1, 3, 1, 4, 4, 2, 3, 1, 2, 1, 4, 1, 4, 2, 4, 2, 1, 3, 2, 3],
	4: [3, 3, 4, 1, 3, 2, 4, 4, 3, 1, 4, 2, 3, 3, 1, 1, 3, 1, 2, 3],
};

function romanN(i: number) {
	return ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"][i] || String(i + 1);
}
function noteClass(t: string) {
	return t === "ダメ" ? "note dame" : "note";
}
function noteLabel(t: string) {
	return ({ れい: "れい", ダメ: "ダメ✗", OK: "OK", もっと: "もっと!", tag: "💬", "!": "注意", "◆": "◆" } as Record<string, string>)[t] || t;
}

function Rich({ html }: { html?: string }) {
	if (!html) return null;
	if (html.includes("<ruby") || html.includes("<u>")) return <RubyHtml html={html} />;
	return <>{html}</>;
}

function parseCircledAnswers(str?: string) {
	const map: Record<number, number> = {};
	if (!str) return map;
	let i = 0;
	while (i < str.length) {
		const ci = CIRCLED_NUMS.indexOf(str[i]);
		if (ci >= 0) {
			let j = i + 1;
			let num = "";
			while (j < str.length && /[0-9]/.test(str[j])) {
				num += str[j];
				j++;
			}
			if (num) map[ci + 1] = +num;
			i = j;
		} else i++;
	}
	return map;
}
function parseExamAnswerDetails(str?: string) {
	const map: Record<number, { ans?: number; order?: string; text?: string }> = {};
	if (!str) return map;
	const re = new RegExp("([" + CIRCLED_NUMS + "])([^" + CIRCLED_NUMS + "]*)", "g");
	for (const match of str.matchAll(re)) {
		const n = CIRCLED_NUMS.indexOf(match[1]) + 1;
		const raw = match[2].trim();
		const star = raw.match(/★\s*([1-4])/);
		const direct = raw.match(/^\s*([1-4])(?:\s|$|→)/);
		const ans = star ? +star[1] : direct ? +direct[1] : null;
		if (ans != null) map[n] = { ans, order: star ? raw : "" };
		else if (raw) map[n] = { text: raw };
	}
	return map;
}
function numericExamAnswers(details: Record<number, { ans?: number }>) {
	const map: Record<number, number> = {};
	for (const [n, a] of Object.entries(details || {})) if (a.ans != null) map[+n] = a.ans;
	return map;
}
function answerMapFromKeys(keys?: number[]) {
	const map: Record<number, number> = {};
	(keys || []).forEach((answer, i) => {
		map[i + 1] = answer;
	});
	return map;
}
function rangedList(n: string | number) {
	const nums = String(n).match(/\d+/g) || [];
	return nums.length === 2 && nums[0] !== nums[1]
		? Array.from({ length: +nums[1] - +nums[0] + 1 }, (_, i) => +nums[0] + i)
		: nums.map(Number);
}

function AnsBlock({ id, children }: { id: string; children: ReactNode }) {
	const [show, setShow] = useState(false);
	return (
		<>
			<button className="ansbtn" data-ans={id} onClick={() => setShow((v) => !v)}>
				{show ? lx("隐藏答案", "Hide answer") : lx("显示答案", "Show answer")}
			</button>
			<div className={`answer${show ? " show" : ""}`} id={id}>
				{children}
			</div>
		</>
	);
}

function QuizOpts({
	item,
	correct,
	onWrong,
	children,
}: {
	item: any;
	correct?: number | null;
	onWrong?: (picked: number, item: any) => void;
	children?: ReactNode;
}) {
	const [picked, setPicked] = useState<number | null>(null);
	const opts: string[] = item.opts_r || item.opts || [];
	if (!item.opts) return null;
	if (correct == null) {
		return (
			<div className="opts">
				{opts.map((o, i) => (
					<span className="jp" key={i}>
						{i + 1} <Rich html={String(o)} />
					</span>
				))}
			</div>
		);
	}
	const answered = picked != null;
	return (
		<>
			<div className={`opts qz${answered ? " answered" : ""}`} data-qcorrect={correct}>
				{opts.map((o, i) => {
					const idx = i + 1;
					let cls = "opt-btn jp";
					if (answered) {
						if (idx === correct) cls += " correct";
						else if (idx === picked) cls += " wrong";
					}
					return (
						<button
							type="button"
							className={cls}
							data-optidx={idx}
							key={idx}
							onClick={() => {
								if (answered) return;
								setPicked(idx);
								if (idx !== correct) onWrong?.(idx, item);
							}}
						>
							{idx} <Rich html={String(o)} />
						</button>
					);
				})}
			</div>
			{answered ? (
				<div className={`qz-result ${picked === correct ? "ok" : "ng"}`}>
					{picked === correct ? lx("✓ 答对了", "✓ Correct") : lx("✗ 答错了", "✗ Incorrect")}
				</div>
			) : null}
			{answered && children ? <div className="qz-note show">{children}</div> : null}
		</>
	);
}

function OptsRow({ item }: { item: any }) {
	const opts: string[] = item.options_r || item.opts_r || item.options || item.opts || [];
	if (!(item.options || item.opts)) return null;
	const numbered = !!item.opts;
	return (
		<div className="opts">
			{opts.map((o, i) => (
				<span className="jp" key={i}>
					{numbered ? `${i + 1} ` : ""}
					<Rich html={String(o)} />
				</span>
			))}
		</div>
	);
}

function StarBtn({ id, snap, exam }: { id: string; snap: any; exam?: boolean }) {
	registerFavMeta(id, snap);
	const active = isFav(id);
	if (exam) {
		return (
			<button
				type="button"
				className={`exam-fav-btn${active ? " on" : ""}`}
				data-fav={id}
				data-fav-style="exam"
				aria-label={active ? lx("取消收藏错题", "Remove from favorites") : lx("收藏错题", "Save question")}
				aria-pressed={active ? "true" : "false"}
				onClick={() => toggleFav(id)}
			>
				{active ? lx("★ 已收藏", "★ Saved") : lx("☆ 收藏错题", "☆ Save question")}
			</button>
		);
	}
	return (
		<button
			className="starb"
			data-fav={id}
			aria-label={active ? lx("取消收藏", "Remove from favorites") : lx("收藏", "Save to favorites")}
			onClick={() => toggleFav(id)}
		>
			{active ? "★" : "☆"}
		</button>
	);
}

function MemBar() {
	const hideRuby = typeof document !== "undefined" && document.body.classList.contains("no-ruby");
	const hideJp = typeof document !== "undefined" && document.body.classList.contains("hide-jp");
	const hideCn = typeof document !== "undefined" && document.body.classList.contains("hide-cn");
	return (
		<div className="mem-bar">
			<button data-memtoggle="ruby" className={hideRuby ? "" : "on"} onClick={() => toggleDisplay("ruby")}>
				{lx("读音", "Readings")}
			</button>
			<button data-memtoggle="jp" className={hideJp ? "" : "on"} onClick={() => toggleDisplay("jp")}>
				{lx("汉字", "Japanese")}
			</button>
			<button data-memtoggle="cn" className={hideCn ? "" : "on"} onClick={() => toggleDisplay("cn")}>
				{lx("翻译", "Translation")}
			</button>
		</div>
	);
}

function FoldToggle({
	id,
	kind,
	show,
	hide,
	open,
	onToggle,
}: {
	id: string;
	kind: string;
	show: string;
	hide: string;
	open: boolean;
	onToggle: () => void;
}) {
	return (
		<button
			type="button"
			className={`daily-toggle daily-${kind}`}
			data-daily-panel={id}
			aria-controls={id}
			aria-expanded={open ? "true" : "false"}
			onClick={onToggle}
		>
			<span className="fold-show">{show}</span>
			<span className="fold-hide">{hide}</span>
		</button>
	);
}

function FoldBody({
	id,
	kind,
	open,
	children,
}: {
	id: string;
	kind: string;
	open: boolean;
	children: ReactNode;
}) {
	return (
		<div id={id} className={`daily-toggle-body daily-${kind}-body${kind === "translation" ? " cn" : ""}`} hidden={!open}>
			{children}
		</div>
	);
}

function dailyChoiceCodes(answer: string, count: number) {
	const clean = String(answer || "").replace(/\s/g, "");
	if (clean.includes("、")) return clean.split("、");
	if (count > 1 && /^[ab]+$/.test(clean) && clean.length === count) return clean.split("");
	return [clean];
}

function DailyChoiceReason({ info, day }: { info: any; day: any }) {
	const pairs = info.choices || [];
	const codes = dailyChoiceCodes(info.answer, pairs.length);
	if (!pairs.length) return null;
	return (
		<ol className="daily-choice-reasons">
			{pairs.map((pair: any, index: number) => {
				const code = codes[index] || codes[codes.length - 1] || "";
				const both = code === "ab" || code === "ba";
				const selected = both
					? lx(`a「${pair.a}」和 b「${pair.b}」在这里都成立`, `Both a「${pair.a}」 and b「${pair.b}」 work here`)
					: `${code}「${pair[code] || ""}」`;
				const pointIndex = (info.pointIndexes || [])[index] ?? (info.pointIndexes || [])[0];
				const point = day?.points?.[pointIndex];
				const usage = point && lx(point.usage_cn, point.usage_en);
				const connection = point && point.connection;
				return (
					<li key={index}>
						<b>
							{pairs.length > 1 ? lx(`第${index + 1}空：`, `Blank ${index + 1}: `) : ""}
							{selected}
						</b>
						{usage || connection ? (
							<span>
								{usage || ""}
								{connection ? (
									<small>
										{lx("接续：", "Connection: ")}
										<span className="jp">
											<Fmt text={connection} />
										</span>
									</small>
								) : null}
							</span>
						) : null}
					</li>
				);
			})}
		</ol>
	);
}

function DailyOrderReason({ info, item }: { info: any; item: any }) {
	const options = Object.fromEntries(
		(item.options || []).map((value: string, index: number) => [index + 1, String(value).replace(/^\s*[1-4]\s*/, "").trim()]),
	);
	const ordered = String(info.answer || "")
		.split("→")
		.map(Number)
		.filter(Boolean)
		.map((n) => options[n])
		.filter(Boolean);
	return (
		<div className="daily-order-reason">
			<b>{lx("排列过程：", "Order:")}</b>
			{ordered.map((part: string, index: number) => (
				<span className="jp" key={index}>
					<i>{index + 1}</i>
					{part}
					{index < ordered.length - 1 ? <em>→</em> : null}
				</span>
			))}
		</div>
	);
}

function DailyPointRefs({ info, day, w, d }: { info: any; day: any; w: number; d: number }) {
	const indexes = Array.from(new Set<number>(info.pointIndexes || [])).filter((index) => day.points && day.points[index]);
	if (!indexes.length) return null;
	return (
		<div className="daily-point-refs">
			<div className="daily-analysis-label">{lx("本题对应语法点", "Grammar point tested")}</div>
			{indexes.map((index: number) => {
				const p = day.points[index];
				return (
					<button type="button" className="daily-point-ref" key={index} onClick={() => navTo(`#/day/${w}-${d}/p${index}`)}>
						<span className="jp">
							<Rr o={p} f="pattern" />
						</span>
						<span>{lx(p.usage_cn, p.usage_en)}</span>
						<i>{lx("跳转", "Open")} ›</i>
					</button>
				);
			})}
		</div>
	);
}

function DailyExercisePanels({ info, item, day, w, d }: { info: any; item: any; day: any; w: number; d: number }) {
	const [showTrans, setShowTrans] = useState(false);
	const [showAnalysis, setShowAnalysis] = useState(false);
	if (!info) return null;
	const reason = info.type === "order" ? <DailyOrderReason info={info} item={item} /> : <DailyChoiceReason info={info} day={day} />;
	const base = `daily-${w}-${d}-${item.n}`;
	return (
		<div className="daily-explain">
			<div className="daily-toggle-controls">
				<FoldToggle
					id={`${base}-translation`}
					kind="translation"
					show={lx("显示原句翻译", "Show sentence translation")}
					hide={lx("隐藏原句翻译", "Hide sentence translation")}
					open={showTrans}
					onToggle={() => setShowTrans((v) => !v)}
				/>
				<FoldToggle
					id={`${base}-analysis`}
					kind="analysis"
					show={lx("显示解析", "Show explanation")}
					hide={lx("隐藏解析", "Hide explanation")}
					open={showAnalysis}
					onToggle={() => setShowAnalysis((v) => !v)}
				/>
			</div>
			<FoldBody id={`${base}-translation`} kind="translation" open={showTrans}>
				<b>{lx("原句翻译：", "Sentence translation: ")}</b>
				{lx(info.translation, info.translation_en)}
			</FoldBody>
			<FoldBody id={`${base}-analysis`} kind="analysis" open={showAnalysis}>
				<div className="an-answer-key">
					{lx("正确答案：", "Correct answer: ")}
					<span className="jp">{info.answer}</span>
				</div>
				<div className="an-complete">
					<b>{lx("完整句：", "Complete sentence: ")}</b>
					<span className="jp">{info.completed}</span>
				</div>
				{reason}
				<DailyPointRefs info={info} day={day} w={w} d={d} />
			</FoldBody>
		</div>
	);
}

function DailyTranslationOnly({ info, module, w, d, item }: { info: any; module: string; w: number; d: number; item: any }) {
	const [open, setOpen] = useState(false);
	const translation = info && lx(info.translation, info.translation_en);
	if (!translation) return null;
	const panelId = `daily-${module}-${w}-${d}-${item.n}-translation`;
	return (
		<div className="daily-explain daily-explain-translation-only">
			<div className="daily-toggle-controls">
				<FoldToggle
					id={panelId}
					kind="translation"
					show={lx("显示原句翻译", "Show sentence translation")}
					hide={lx("隐藏原句翻译", "Hide sentence translation")}
					open={open}
					onToggle={() => setOpen((v) => !v)}
				/>
			</div>
			<FoldBody id={panelId} kind="translation" open={open}>
				<b>{lx("原句翻译：", "Sentence translation: ")}</b>
				{translation}
			</FoldBody>
		</div>
	);
}

function SrcLabel({ link }: { link: string }) {
	const m = String(link || "").match(/^#\/day\/(\d+)-(\d+)\/(.+)$/);
	if (!m) return <>{lx("看出处", "View source")}</>;
	const w = +m[1];
	const d = +m[2];
	const tok = m[3];
	const dy = findDay(w, d);
	let name: ReactNode = null;
	if (dy) {
		let mm = tok.match(/^p(\d+)$/);
		if (mm) {
			const p = (dy.points || [])[+mm[1]];
			if (p) name = <Rr o={p} f="pattern" />;
		} else if ((mm = tok.match(/^v(\d+)-(\d+)$/))) {
			const sec = (dy.sections || [])[+mm[1]];
			const it = sec && (sec.items || [])[+mm[2]];
			if (it) name = (it.jp || "").length > 14 ? `${it.jp.slice(0, 14)}…` : it.jp_r ? <RubyHtml html={it.jp_r} /> : it.jp;
		} else if ((mm = tok.match(/^k(\d+)$/))) {
			const k = (dy.kanji || [])[+mm[1]];
			if (k) name = k.char;
		}
	}
	return (
		<>
			{lx(`第${w}週${d}日目`, `Week ${w} Day ${d}`)}
			{name ? (
				<>
					{" · "}
					<span className="jp">{name}</span>
				</>
			) : null}
		</>
	);
}

function linkedGrammarUsage(link?: string) {
	const m = String(link || "").match(/^#\/day\/(\d+)-(\d+)\/p(\d+)$/);
	if (!m) return "";
	const day = findDay(+m[1], +m[2]);
	const point = day && (day.points || [])[+m[3]];
	return point ? lx(point.usage_cn, point.usage_en) : "";
}

function ExamNote({ a, item }: { a: any; item: any }) {
	const opts: string[] = item.opts_r || item.opts || [];
	const optionTranslations = LANG === "en" ? a.option_translations_en || [] : a.option_translations || [];
	const why = LANG === "en"
		? a.why_en || []
		: (a.why || []).map((text: string) =>
				/放入本句后，接续、活用形式或语义不符合题意|接续和句意都成立/.test(text) ? "" : text,
			);
	const point = LANG === "en" ? linkedGrammarUsage(a.link) : a.point;
	const words = LANG === "en" ? (a.words || []).filter((v: any) => v.en) : a.words || [];
	const hasOptionDetails = opts.some((_: any, i: number) => why[i] || optionTranslations[i]);
	return (
		<>
			{a.note ? (
				<div className="jp">
					<Rr o={a} f="note" />
				</div>
			) : null}
			{lx(a.trans, a.trans_en) ? <div className="an-trans">{lx(a.trans, a.trans_en)}</div> : null}
			{a.link ? (
				<div className="an-link" onClick={() => navTo(a.link)}>
					📘 <SrcLabel link={a.link} /> ›
				</div>
			) : null}
			{hasOptionDetails || point || words.length ? (
				<details className="an-more">
					<summary>{lx("详细解析", "Detailed explanation")}</summary>
					{hasOptionDetails ? (
						<ol className="an-why">
							{opts.map((opt, i) => (
								<li className={(i + 1) === a.ans ? "ok" : ""} key={i}>
									<span className="o jp">
										<Rich html={String(opt || "")} />
									</span>
									{optionTranslations[i] ? <span className="an-opt-trans">{optionTranslations[i]}</span> : null}
									{why[i] ? <span className="w">{why[i]}</span> : null}
								</li>
							))}
						</ol>
					) : null}
					{point ? (
						<div className="an-point">
							{lx("要点：", "Key point: ")}
							{point}
						</div>
					) : null}
					{LANG !== "en" && (a.parse || []).length ? (
						<>
							<div className="an-h">逐节拆解</div>
							<div className="an-words an-parse">
								{a.parse.map((v: any, i: number) => (
									<div className="an-word" key={i}>
										<span className="j jp">{v.t}</span>
										{v.k && v.k !== "—" ? <span className="k jp">{v.k}</span> : null}
										<span className="m">{v.r}</span>
									</div>
								))}
							</div>
						</>
					) : null}
					{LANG !== "en" && (a.build || []).length ? (
						<>
							<div className="an-h">怎么一层层搭起来的</div>
							<ol className="an-build">
								{a.build.map((s: any, i: number) => (
									<li key={i}>
										<span className="a jp">
											{i ? "＋" : ""}
											{s.add}
										</span>
										<span className="m">{s.mean}</span>
										{s.res === s.add ? null : <div className="r jp">{s.res}</div>}
									</li>
								))}
							</ol>
						</>
					) : null}
					{words.length ? (
						<div className="an-words">
							<div className="h">{lx("生词", "Vocabulary")}</div>
							{words.map((v: any, i: number) => (
								<div className="an-word" key={i}>
									<span className="j jp">{v.jp}</span>
									<span className="k jp">{v.kana}</span>
									<span className="m">{lx(v.cn, v.en)}</span>
								</div>
							))}
						</div>
					) : null}
				</details>
			) : null}
		</>
	);
}

function restoreFirstBlank(raw: string, answer: string) {
	const marker = "__ANSWER__";
	const completed = raw.replace(/（[ 　_]*）|＿{2,}|_{2,}/, marker);
	if (completed === raw) return null;
	const i = completed.indexOf(marker);
	return (
		<>
			{completed.slice(0, i)}
			<strong>{answer}</strong>
			{completed.slice(i + marker.length)}
		</>
	);
}

function restoreStars(raw: string, order: number[], opts: string[]) {
	const parts: ReactNode[] = [];
	const re = /＿{2,}|★/g;
	let last = 0;
	let oi = 0;
	let match: RegExpExecArray | null;
	let changed = false;
	while ((match = re.exec(raw))) {
		if (match.index > last) parts.push(raw.slice(last, match.index));
		parts.push(<strong key={oi}>{opts[order[oi++] - 1] || ""}</strong>);
		last = match.index + match[0].length;
		changed = true;
	}
	if (last < raw.length) parts.push(raw.slice(last));
	return changed ? parts : null;
}

function FallbackExamNote({ item, a, module, section }: { item: any; a: any; module: string; section: string }) {
	const opts: string[] = item.opts_r || item.opts || [];
	const answer = opts[(a.ans || 1) - 1] || "";
	const answerPlain = (item.opts || [])[(a.ans || 1) - 1] || "";
	const target = item.ul ? `「${item.ul}」` : "题干中的空格";
	const rawQuestion = item.q || "";
	if (LANG === "en") {
		const restored = a.order
			? restoreStars(rawQuestion, [...String(a.order).matchAll(/[1-4]/g)].map((m) => +m[0]), item.opts || [])
			: restoreFirstBlank(rawQuestion, answerPlain);
		return (
			<>
				<div className="an-answer-key jp">
					Correct answer: {a.ans}. <Rich html={String(answer)} />
				</div>
				{restored ? (
					<div className="an-complete">
						<b>{a.order ? "Completed question:" : "Completed sentence:"}</b>
						<span className="jp">{restored}</span>
					</div>
				) : null}
				{a.order ? <div className="an-fallback jp">Order: {a.order}</div> : null}
			</>
		);
	}
	let hint = "结合题干语境，选择最符合题意的表达。";
	if (module === "kanji") {
		if (section === "mondai1") hint = `${target} 的正确读法为上面的选项。`;
		else if (section === "mondai2") hint = `平假名 ${target} 应写作上面的汉字。`;
		else hint = "将正确的汉字放入句中，构成自然、正确的词语。";
	} else if (module === "vocab") {
		if (section === "mondai1") hint = "根据句意和搭配，选择最自然的词语。";
		else if (section === "mondai2") hint = "根据题干表达的含义，选择对应的词语。";
		else if (section === "mondai3") hint = "选择与题干意思最接近的表达。";
		else if (section === "mondai4") hint = "根据上下文，选择最自然的用法。";
	} else if (module === "grammar") {
		hint = a.order ? `正确顺序为 ${a.order}，请选择放在 ★ 位置的选项。` : "根据句型含义和接续，选择最符合语境的表达。";
	}
	const restored = a.order
		? restoreStars(rawQuestion, [...String(a.order).matchAll(/[1-4]/g)].map((m) => +m[0]), item.opts || [])
		: restoreFirstBlank(rawQuestion, answerPlain);
	const concrete = (module === "kanji" && (section === "mondai1" || section === "mondai2")) || (module === "grammar" && a.order);
	return (
		<>
			<div className="an-answer-key jp">
				正确答案：{a.ans}. <Rich html={String(answer)} />
			</div>
			{concrete ? <div className="an-fallback">{hint}</div> : null}
			{restored ? (
				<div className="an-complete">
					<b>题干还原：</b>
					<span className="jp">{restored}</span>
				</div>
			) : null}
			{a.order ? <div className="an-fallback jp">顺序：{a.order}</div> : null}
		</>
	);
}

function ExamExplanation({ a, item, module, section }: { a: any; item: any; module: string; section: string }) {
	const hasExpanded = !!((a.why || []).length || a.point || (a.words || []).length || (a.parse || []).length || (a.build || []).length);
	const hasNote = !!(a.note || a.trans || a.trans_en || a.link || hasExpanded);
	return (
		<>
			<div className="an-explain-title">{lx("答案解析", "Answer explanation")}</div>
			{hasNote ? <ExamNote a={a} item={item} /> : <FallbackExamNote item={item} a={a} module={module} section={section} />}
			{hasNote && !hasExpanded ? <FallbackExamNote item={item} a={a} module={module} section={section} /> : null}
		</>
	);
}

function logWrong(item: any, picked: number) {
	const qText = item.q || "";
	const pickedText = (item.opts || [])[picked - 1] || "";
	const correct = item._correct;
	const correctText = correct != null ? (item.opts || [])[correct - 1] || "" : "";
	addMistake(
		"q",
		`${String(qText).trim()}\n${lx("你的答案", "Your answer")}：${String(pickedText).trim()}\n${lx("正确答案", "Correct answer")}：${String(correctText).trim()}`,
	);
}

function ExamFav({ item, module, w, answer, translation }: { item: any; module: string; w: number; answer: string; translation?: string }) {
	const id = `${module}#exam#${w}#${String(item.n)}`;
	const options = (item.opts || item.options || []).map((option: string, index: number) => `${index + 1}. ${option}`);
	const jp = [`${item.n}. ${item.q || ""}`, options.join("　")].filter(Boolean).join("\n");
	const cn = [translation || "", answer ? `${lx("正确答案", "Correct answer")}：${answer}` : ""].filter(Boolean).join("\n");
	return <StarBtn id={id} exam snap={{ module, hash: `#/day/${w}-7`, w, d: 7, jp, cn, kind: "exam-question" }} />;
}

function useScrollHighlight(id?: string | null) {
	useEffect(() => {
		if (!id) return;
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ block: "center" });
		el.style.background = "var(--amber-soft)";
		const t = setTimeout(() => {
			el.style.background = "";
		}, 1600);
		return () => clearTimeout(t);
	}, [id]);
}

function GrammarPoint({ p, w, d, i }: { p: any; w: number; d: number; i: number }) {
	const pid = `${MODULE}#${w}-${d}#${i}`;
	return (
		<div className="point" id={`pt-${w}-${d}-${i}`}>
			<h3 className="jp">
				<Rr o={p} f="pattern" />
			</h3>
			<StarBtn id={pid} snap={{ module: MODULE, hash: `#/day/${w}-${d}/p${i}`, w, d, jp: p.pattern, cn: p.usage_cn || "" }} />
			<SayButton text={p.pattern} />
			{p.reading ? <div className="reading jp">{p.reading}</div> : null}
			<ConnBlock connection={p.connection} lang={LANG} />
			{p.usage_jp ? <div className="usage jp">{p.usage_jp}</div> : null}
			{LANG !== "en" && p.usage_cn ? (
				<div className="usage">
					<span className="cn">{p.usage_cn}</span>
				</div>
			) : null}
			{p.usage_en ? (
				<div className="usage">
					<span className="en">{p.usage_en}</span>
				</div>
			) : null}
			{(p.examples || []).map((ex: any, ei: number) => {
				return (
					<div className="ex" key={ei}>
						<div className="jp">
							<Rr o={ex} f="jp" />
							<SayButton text={ex.jp} />
						</div>
						{ex.eq ? (
							<div className="eq jp">
								（<Rr o={ex} f="eq" />）
							</div>
						) : null}
						{LANG !== "en" && ex.cn ? <div className="cn">{ex.cn}</div> : null}
						{ex.en ? <div className="en">{ex.en}</div> : null}
					</div>
				);
			})}
			{(p.notes || []).map((nt: any, ni: number) => (
				<div className={noteClass(nt.type)} key={ni}>
					<b className="nt">{noteLabel(nt.type)}</b>
					<span className="jp">
						<Rr o={nt} f="text" />
					</span>
				</div>
			))}
		</div>
	);
}

function ExamGrammar({ day, w }: { day: any; w: number }) {
	const useBesatsu = MODULE === "grammar";
	const bes = useBesatsu ? G.besatsu?.["w" + w] || {} : {};
	const ansMap: Record<number, any> = {};
	if (useBesatsu) for (const k of ["mondai1", "mondai2", "mondai3"]) for (const a of bes[k] || []) ansMap[a.n] = a;
	const directAnswers = useBesatsu ? {} : parseExamAnswerDetails(day.answers);
	const renderQ = (it: any, section: string) => {
		const a = ansMap[it.n] || directAnswers[it.n];
		const interactive = it.opts && a && a.ans && !(useBesatsu && a.order);
		return (
			<div className="q" key={it.n}>
				<span className="n">{it.n}</span>
				<span className="jp">
					<Rr o={it} f="q" />
				</span>
				{interactive ? (
					<QuizOpts
						item={{ ...it, _correct: a.ans }}
						correct={a.ans}
						onWrong={(picked) => logWrong({ ...it, _correct: a.ans }, picked)}
					>
						{a ? <ExamExplanation a={a} item={it} module="grammar" section={section} /> : null}
					</QuizOpts>
				) : it.opts ? (
					<>
						<div className="opts">
							{(it.opts_r || it.opts || []).map((o: string, i: number) => (
								<span className="jp" key={i}>
									{i + 1} <Rich html={String(o)} />
								</span>
							))}
						</div>
						{a ? (
							<AnsBlock id={`exam-${w}-${it.n}`}>
								<b>
									{lx("答案", "Answer")}：{a.ans}
								</b>
								{a.order ? (
									<>
										{"　"}
										<span className="jp">
											{lx("顺序", "Order")}：{a.order}
										</span>
									</>
								) : null}
								<div style={{ marginTop: 4 }}>
									<ExamExplanation a={a} item={it} module="grammar" section={section} />
								</div>
							</AnsBlock>
						) : null}
					</>
				) : null}
			</div>
		);
	};
	return (
		<>
			<h2 className="page jp">
				実戦問題{" "}
				<span className="meta">
					{lx("实战问题", "Weekly test")} · {day.time_limit || ""} · {day.scoring || ""}
				</span>
			</h2>
			{(
				[
					["mondai1", "問題1"],
					["mondai2", "問題2"],
					["mondai3", "問題3"],
				] as const
			).map(([key, label]) => {
				const m = day[key];
				if (!m) return null;
				return (
					<div key={key}>
						<div className="sec-title">{label}</div>
						<div className="card">
							<div className="meta jp">
								<Rr o={m} f="instruction" />
							</div>
							{m.passage ? (
								<div className="passage jp">
									<Rr o={m} f="passage" />
								</div>
							) : null}
							{m.items.map((it: any) => renderQ(it, key))}
						</div>
					</div>
				);
			})}
			{day.keigo ? (
				<div className="keigo">
					<h4>
						<Rr o={day.keigo} f="title" />
					</h4>
					<ul>
						{(day.keigo.content_r || day.keigo.content || []).map((c: string, i: number) => (
							<li className="jp" key={i}>
								<Rich html={String(c)} />
							</li>
						))}
					</ul>
					{day.keigo.quiz ? (
						<>
							<div className="meta jp" style={{ marginTop: 6 }}>
								<Rr o={day.keigo.quiz} f="instruction" />
							</div>
							{(day.keigo.quiz.items_r || day.keigo.quiz.items || []).map((q: string, i: number) => (
								<div className="q jp" key={i}>
									<Rich html={String(q)} />
								</div>
							))}
							{day.keigo.quiz.answers ? (
								<AnsBlock id={`keigo-${w}`}>
									<b>{lx("答案", "Answer")}：</b>
									<span className="jp">
										<Rr o={day.keigo.quiz} f="answers" />
									</span>
								</AnsBlock>
							) : null}
						</>
					) : null}
				</div>
			) : null}
			{!useBesatsu && day.answers ? (
				<div className="card">
					<AnsBlock id={`examn2-${w}`}>
						<b>{lx("答案", "Answer")}：</b>
						<span className="jp">{day.answers}</span>
					</AnsBlock>
				</div>
			) : null}
			{day.answers_note ? (
				<div className="meta" style={{ marginTop: 8 }}>
					{LANG === "en"
						? "Answers are built in. Answer each question to view its explanation."
						: `${day.answers_note}${useBesatsu ? "（答案已内置，点击各题「显示答案」）" : ""}`}
				</div>
			) : null}
		</>
	);
}

function DayGrammar({ day, w, d, scrollP }: { day: any; w: number; d: number; scrollP: number | null }) {
	const wk = cur().weeks.find((x: any) => x.n === w);
	const wt = wk?.title ? (
		<>
			{" "}
			<span className="jp">{wk.title}</span>（{lx(wk.title_cn, wk.title_en)}）
		</>
	) : (
		` · ${MODULE === "n2grammar" ? lx("N2 语法", "N2 Grammar") : MODULE === "n4grammar" ? lx("N4 语法", "N4 Grammar") : lx("语法", "Grammar")}`
	);
	useScrollHighlight(scrollP != null ? `pt-${w}-${d}-${scrollP}` : null);
	if (d === 7) {
		return (
			<>
				<div className="crumb">
					{lx(`第${w}週`, `Week ${w}`)}
					{wt}
				</div>
				<ExamGrammar day={day} w={w} />
			</>
		);
	}
	const dailyItems = MODULE === "grammar" && G.daily_explanations && G.daily_explanations[`w${w}d${d}`];
	const explanationByNumber = new Map(((dailyItems && dailyItems.items) || []).map((item: any) => [item.n, item]));
	return (
		<>
			<div className="crumb">
				{lx(`第${w}週`, `Week ${w}`)}
				{wt}
			</div>
			<h2 className="page jp">
				<Rr o={day} f="title" /> <span className="meta">{lx(day.title_cn, day.title_en)}</span>
			</h2>
			{day.dialog ? (
				<div className="dialog jp">
					{(day.dialog.lines_r || day.dialog.lines || []).map((line: string, i: number) => (
						<span key={i}>
							{i > 0 ? <br /> : null}
							<Rich html={String(line)} />
						</span>
					))}{" "}
					<SayButton text={(day.dialog.lines || []).join("　")} />
					{LANG !== "en" && day.dialog.cn ? <div className="cn">{day.dialog.cn}</div> : null}
					{day.dialog.en ? <div className="en">{day.dialog.en}</div> : null}
				</div>
			) : null}
			<div className="card">
				{(day.points || []).map((p: any, i: number) => (
					<span key={i}>
						{i > 0 ? <hr style={{ border: "none", borderTop: "1px solid var(--line)", margin: "16px 0" }} /> : null}
						<GrammarPoint p={p} w={w} d={d} i={i} />
					</span>
				))}
			</div>
			{day.exercises ? (
				<>
					<div className="sec-title">れんしゅう（{lx("练习", "Practice")}）</div>
					<div className="card">
						{(day.exercises.sections || []).map((sec: any, si: number) => (
							<div key={si}>
								<div className="meta jp" style={{ margin: "4px 0 8px" }}>
									{sec.type === "choice" ? "Ⅰ" : "Ⅱ"}　{lx(sec.instruction, sec.instruction_en)}
								</div>
								{(sec.items || []).map((it: any) => (
									<div className="q daily-q" key={it.n}>
										<div className="daily-qline">
											<span className="n">{it.n}</span>
											<span className="jp">
												<Rr o={it} f="q" />
											</span>
										</div>
										<OptsRow item={it} />
										<DailyExercisePanels info={explanationByNumber.get(it.n)} item={it} day={day} w={w} d={d} />
									</div>
								))}
							</div>
						))}
						{day.exercises.answers ? (
							<AnsBlock id={`ans-${w}-${d}`}>
								<b>{lx("答案", "Answer")}：</b>
								<span className="jp">{day.exercises.answers}</span>
								<br />
								<span className="cn">{lx(day.exercises.answers_note, day.exercises.answers_note_en)}</span>
							</AnsBlock>
						) : day.exercises.answers_note ? (
							<div className="meta">{lx(day.exercises.answers_note, day.exercises.answers_note_en)}</div>
						) : null}
					</div>
				</>
			) : null}
		</>
	);
}

function ExamVocab({ day, w }: { day: any; w: number }) {
	const ansMap = numericExamAnswers(parseExamAnswerDetails(day.answers));
	const kai: Record<number, any> = {};
	for (const e of day.kaisetsu || []) kai[e.n] = e;
	return (
		<>
			<h2 className="page jp">
				実戦問題{" "}
				<span className="meta">
					实战问题 · {day.time_limit || ""} · {day.scoring || ""}
				</span>
			</h2>
			{day.note ? (
				<div className="card">
					<div className="note">{day.note}</div>
				</div>
			) : null}
			{(
				[
					["mondai1", "問題1"],
					["mondai2", "問題2"],
					["mondai3", "問題3"],
					["mondai4", "問題4"],
				] as const
			).map(([key, label]) => {
				const m = day[key];
				if (!m) return null;
				return (
					<div key={key}>
						<div className="sec-title">{label}</div>
						<div className="card">
							<div className="meta jp">
								<Rr o={m} f="instruction" />
							</div>
							{m.items.map((it: any) => {
								const correct = ansMap[it.n];
								const answer = correct != null ? `${correct}. ${(it.opts || [])[correct - 1] || ""}` : "";
								return (
									<div className="q" key={it.n}>
										<div className="exam-qline">
											<span className="n">{it.n}</span>
											<span className="jp exam-qtext">
												<Rr o={it} f="q" />
											</span>
											<ExamFav item={it} module="vocab" w={w} answer={answer} translation={(kai[it.n] || {}).trans} />
										</div>
										{it.opts ? (
											<QuizOpts
												item={{ ...it, _correct: correct }}
												correct={correct ?? null}
												onWrong={(picked) => logWrong({ ...it, _correct: correct }, picked)}
											>
												{correct != null ? (
													<ExamExplanation a={Object.assign({ ans: correct }, kai[it.n] || {})} item={it} module="vocab" section={key} />
												) : null}
											</QuizOpts>
										) : null}
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
			{day.answers ? (
				<div className="card">
					<AnsBlock id={`examv-${w}`}>
						<b>完整答案：</b>
						<span className="jp">{day.answers}</span>
					</AnsBlock>
				</div>
			) : null}
		</>
	);
}

function DayVocab({ day, w, d, scrollTok }: { day: any; w: number; d: number; scrollTok: string | null }) {
	const mod = MODULE;
	const modLbl = mod === "n2vocab" ? "N2 词汇" : mod === "n4vocab" ? "N4 词汇" : "词汇";
	useScrollHighlight(scrollTok ? `v-${w}-${d}-${scrollTok}` : null);
	if (d === 7) {
		return (
			<>
				<div className="crumb">
					第{w}週 · {modLbl}
				</div>
				<ExamVocab day={day} w={w} />
			</>
		);
	}
	const dailyItems = MODULE === "vocab" && V.daily_translations && V.daily_translations[`w${w}d${d}`];
	const translationByNumber = new Map(((dailyItems && dailyItems.items) || []).map((item: any) => [item.n, item]));
	return (
		<>
			<div className="crumb">
				第{w}週 · {modLbl}
			</div>
			<h2 className="page jp">
				<Rr o={day} f="title" /> <span className="meta">{lx(day.title_cn, day.title_en)}</span>
			</h2>
			<MemBar />
			{day.dialog ? (
				<div className="dialog jp">
					{(day.dialog.lines_r || day.dialog.lines || []).map((line: string, i: number) => (
						<span key={i}>
							{i > 0 ? <br /> : null}「<Rich html={String(line)} />」
						</span>
					))}{" "}
					<SayButton text={(day.dialog.lines || []).join("　")} />
					{day.dialog.cn ? <div className="cn">{day.dialog.cn}</div> : null}
				</div>
			) : null}
			{(day.sections || []).map((sec: any, si: number) => {
				const meta = [sec.heading_cn, sec.heading_en].filter(Boolean).join(" / ");
				return (
					<div key={si}>
						<div className="sec-title">
							<span className="jp">{sec.heading || ""}</span>
							{meta ? <small>{meta}</small> : null}
						</div>
						<div className="card">
							{sec.type === "fillin" && sec.pattern ? (
								<div className="fillin-pat jp">{sec.pattern_r ? <RubyHtml html={sec.pattern_r} /> : sec.pattern}</div>
							) : null}
							{(sec.items || []).map((it: any, ii: number) => {
								const vid = `${mod}#${w}-${d}#${si}#${ii}`;
								return (
									<div className="vrow" id={`v-${w}-${d}-${si}-${ii}`} key={ii}>
										<div className="vjp jp">
											<span className="vjp-text">{it.jp_r ? <RubyHtml html={it.jp_r} /> : it.jp}</span>
											<SayButton text={it.jp} />
											<StarBtn id={vid} snap={{ module: mod, hash: `#/day/${w}-${d}`, w, d, jp: it.jp, cn: it.cn || it.en || "" }} />
										</div>
										<div className="vmn">
											{it.cn ? <span className="vcn">{it.cn}</span> : null}
											{it.en ? <span className="ven">{it.en}</span> : null}
											{it.rel ? <span className="vrel jp">{it.rel_r ? <RubyHtml html={it.rel_r} /> : it.rel}</span> : null}
											{it.note ? <div className="vnote">{it.note}</div> : null}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
			{day.exercises ? (
				<>
					<div className="sec-title">れんしゅう（练习）</div>
					<div className="card">
						{(day.exercises.sections || []).map((sec: any, si: number) => (
							<div key={si}>
								<div className="meta jp" style={{ margin: "4px 0 8px" }}>
									{romanN(si)}　{lx(sec.instruction, sec.instruction_en)}
								</div>
								{(sec.items || []).map((it: any) => (
									<div className="q daily-q" key={it.n}>
										<div className="daily-qline">
											<span className="n">{it.n}</span>
											<span className="jp">
												<Rr o={it} f="q" />
											</span>
										</div>
										<OptsRow item={it} />
										<DailyTranslationOnly info={translationByNumber.get(it.n)} module="vocab" w={w} d={d} item={it} />
									</div>
								))}
							</div>
						))}
						{day.exercises.answers ? (
							<AnsBlock id={`ans-v-${w}-${d}`}>
								<b>{lx("答案", "Answer")}：</b>
								<span className="jp">{day.exercises.answers}</span>
								<br />
								<span className="cn">{lx(day.exercises.answers_note, day.exercises.answers_note_en)}</span>
							</AnsBlock>
						) : day.exercises.answers_note ? (
							<div className="meta">{lx(day.exercises.answers_note, day.exercises.answers_note_en)}</div>
						) : null}
					</div>
				</>
			) : null}
			{day.hitokoto ? (
				<div className="card hito">
					<div className="jp">{day.hitokoto}</div>
				</div>
			) : null}
		</>
	);
}

function ExamKanji({ day, w }: { day: any; w: number }) {
	const answerDetails = parseExamAnswerDetails(day.answers);
	const ansMap = day.answers ? numericExamAnswers(answerDetails) : answerMapFromKeys(N3_KANJI_EXAM_KEYS[w]);
	const kai: Record<number, any> = {};
	for (const e of day.kaisetsu || []) kai[e.n] = e;
	return (
		<>
			<h2 className="page jp">
				実戦問題{" "}
				<span className="meta">
					实战问题 · {day.time_limit || ""} · {day.scoring || ""}
				</span>
			</h2>
			{day.note ? (
				<div className="card">
					<div className="note">{day.note}</div>
				</div>
			) : null}
			{(
				[
					["mondai1", "問題1"],
					["mondai2", "問題2"],
					["mondai3", "問題3"],
					["mondai4", "問題4"],
				] as const
			).map(([key, label]) => {
				const m = day[key];
				if (!m) return null;
				return (
					<div key={key}>
						<div className="sec-title">{label}</div>
						<div className="card">
							<div className="meta jp">
								<Rr o={m} f="instruction" />
							</div>
							{m.wordbank ? (
								<div className="opts">
									{m.wordbank.map((x: string, i: number) => (
										<span className="jp" key={i}>
											{x}
										</span>
									))}
								</div>
							) : null}
							{m.items.map((it: any) => {
								const correct = ansMap[it.n];
								const textAnswer =
									correct == null
										? rangedList(it.n)
												.map((i) => (answerDetails[i]?.text ? `${i}. ${answerDetails[i].text}` : ""))
												.filter(Boolean)
												.join("　")
										: "";
								const answer = correct != null ? `${correct}. ${(it.opts || [])[correct - 1] || ""}` : textAnswer;
								const textAnswerHTML = rangedList(it.n)
									.map((i) => (answerDetails[i]?.text ? `${CIRCLED_NUMS[i - 1]} ${answerDetails[i].text}` : ""))
									.filter(Boolean)
									.join("　");
								return (
									<div className="q" key={it.n}>
										<div className="exam-qline">
											<span className="n">{it.n}</span>
											<span className="jp exam-qtext">
												<Rr o={it} f="q" />
											</span>
											<ExamFav item={it} module="kanji" w={w} answer={answer} translation={(kai[it.n] || {}).trans} />
										</div>
										{it.opts ? (
											<QuizOpts
												item={{ ...it, _correct: correct }}
												correct={correct ?? null}
												onWrong={(picked) => logWrong({ ...it, _correct: correct }, picked)}
											>
												{correct != null ? (
													<ExamExplanation a={Object.assign({ ans: correct }, kai[it.n] || {})} item={it} module="kanji" section={key} />
												) : null}
											</QuizOpts>
										) : (
											<OptsRow item={it} />
										)}
										{!it.opts && textAnswerHTML ? (
											<AnsBlock id={`examk-${w}-${String(it.n).replace(/[^0-9]/g, "-")}`}>
												<b>答案：</b>
												<span className="jp">{textAnswerHTML}</span>
											</AnsBlock>
										) : null}
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
			{day.answers ? (
				<div className="card">
					<AnsBlock id={`examk-${w}`}>
						<b>完整答案：</b>
						<span className="jp">{day.answers}</span>
					</AnsBlock>
				</div>
			) : day.answers_note ? (
				<div className="meta" style={{ marginTop: 8 }}>
					答案已内置，逐题作答后可查看解析。
				</div>
			) : null}
		</>
	);
}

function DayKanji({ day, w, d, scrollTok }: { day: any; w: number; d: number; scrollTok: string | null }) {
	useScrollHighlight(scrollTok ? `k-${w}-${d}-${scrollTok}` : null);
	if (d === 7) {
		return (
			<>
				<div className="crumb">
					第{w}週 · 汉字
					{day.theme ? (
						<>
							{" "}
							<span className="jp">{day.theme}</span>（{day.theme_cn || ""}）
						</>
					) : null}
				</div>
				<ExamKanji day={day} w={w} />
			</>
		);
	}
	const dailyItems = MODULE === "kanji" && K.daily_translations && K.daily_translations[`w${w}d${d}`];
	const translationByNumber = new Map(((dailyItems && dailyItems.items) || []).map((item: any) => [item.n, item]));
	return (
		<>
			<div className="crumb">
				第{w}週 · 汉字
				{day.theme ? (
					<>
						{" "}
						<span className="jp">{day.theme}</span>（{day.theme_cn || ""}）
					</>
				) : null}
			</div>
			<h2 className="page jp">
				<Rr o={day} f="title" /> <span className="meta">{lx(day.title_cn, day.title_en)}</span>
			</h2>
			{day.dialog ? (
				<div className="dialog jp">
					{(day.dialog.lines_r || day.dialog.lines || []).map((line: string, i: number) => (
						<span key={i}>
							{i > 0 ? <br /> : null}
							<Rich html={String(line)} />
						</span>
					))}{" "}
					<SayButton text={(day.dialog.lines || []).join("　")} />
					{lx(day.dialog.cn, day.dialog.en) ? <div className="cn">{lx(day.dialog.cn, day.dialog.en)}</div> : null}
				</div>
			) : null}
			<MemBar />
			<div className="card kanji-card">
				{(day.kanji || []).map((k: any, ki: number) => (
					<div className="krow" id={`k-${w}-${d}-${ki}`} key={ki}>
						<div className="kchar-wrap">
							<div className="kchar jp">{k.char}</div>
							<div className="kmeta">{k.strokes ? `${k.strokes}画` : ""}</div>
							<div className="kreads jp">
								{(k.readings || []).map((r: string, i: number) => (
									<span className="kread" key={i}>
										{r}
									</span>
								))}
							</div>
						</div>
						<div className="kwords">
							{(k.words || []).map((wd: any, wi: number) => {
								const kid = `${MODULE}#${w}-${d}#${ki}#${wi}`;
								return (
									<div className="vrow" key={wi}>
										<div className="vjp jp">
											<span className="vjp-text">{wd.jp_r ? <RubyHtml html={wd.jp_r} /> : wd.jp}</span>
											<SayButton text={wd.jp} />
											<StarBtn id={kid} snap={{ module: MODULE, hash: `#/day/${w}-${d}`, w, d, jp: wd.jp, cn: wd.cn || wd.en || "" }} />
										</div>
										<div className="vmn">
											{wd.cn ? <span className="vcn">{wd.cn}</span> : null}
											{wd.en ? <span className="ven">{wd.en}</span> : null}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				))}
			</div>
			{day.exercises ? (
				<>
					<div className="sec-title">れんしゅう（练习）</div>
					<div className="card">
						{(day.exercises.sections || []).map((sec: any, si: number) => (
							<div key={si}>
								<div className="meta jp" style={{ margin: "4px 0 8px" }}>
									{romanN(si)}　{lx(sec.instruction, sec.instruction_en)}
								</div>
								{(sec.items || []).map((it: any) => (
									<div className="q daily-q" key={it.n}>
										<div className="daily-qline">
											<span className="n">{it.n}</span>
											<span className="jp">
												<Rr o={it} f="q" />
											</span>
										</div>
										<OptsRow item={it} />
										<DailyTranslationOnly info={translationByNumber.get(it.n)} module="kanji" w={w} d={d} item={it} />
									</div>
								))}
							</div>
						))}
						{day.exercises.answers ? (
							<AnsBlock id={`ans-k-${w}-${d}`}>
								<b>{lx("答案", "Answer")}：</b>
								<span className="jp">{day.exercises.answers}</span>
								<br />
								<span className="cn">{lx(day.exercises.answers_note, day.exercises.answers_note_en)}</span>
							</AnsBlock>
						) : day.exercises.answers_note ? (
							<div className="meta">{lx(day.exercises.answers_note, day.exercises.answers_note_en)}</div>
						) : null}
					</div>
				</>
			) : null}
		</>
	);
}

function DayNav({ w, d }: { w: number; d: number }) {
	const { prev, next } = dayNeighbors(w, d);
	const fab = (t: [number, number, any] | null | undefined, dir: "prev" | "next") => {
		if (!t) return null;
		const [cw, cd, day] = t;
		const label = lx(`第${cw}週 ${cd}日目`, `Week ${cw} Day ${cd}`);
		const txt = (
			<span className="txt">
				<span className="lb">{label}</span>
				<span className="sub jp">{day.title || ""}</span>
			</span>
		);
		return (
			<a
				className={`daynav-fab ${dir}`}
				title={label}
				aria-label={label}
				onClick={() => navTo(`#/day/${cw}-${cd}`)}
			>
				{dir === "prev" ? (
					<>
						<span className="ar">‹</span>
						{txt}
					</>
				) : (
					<>
						{txt}
						<span className="ar">›</span>
					</>
				)}
			</a>
		);
	};
	return (
		<>
			{fab(prev, "prev")}
			{fab(next, "next")}
		</>
	);
}

export function DayPage({ w, d, token }: { w: number; d: number; token: string | null }) {
	const day = findDay(w, d);
	if (!day) return <div className="empty">未找到</div>;
	const scrollP = token && token[0] === "p" ? +token.slice(1) : null;
	const vocabTok = token && token[0] === "v" ? token.slice(1) : null;
	const kanjiTok = token && token[0] === "k" ? token.slice(1) : null;
	return (
		<>
			{isGram() ? (
				<DayGrammar day={day} w={w} d={d} scrollP={Number.isFinite(scrollP as number) ? scrollP : null} />
			) : TYPE === "kanji" ? (
				<DayKanji day={day} w={w} d={d} scrollTok={kanjiTok} />
			) : (
				<DayVocab day={day} w={w} d={d} scrollTok={vocabTok} />
			)}
			<DayNav w={w} d={d} />
		</>
	);
}

function ContrastQuiz({ group }: { group: any }) {
	const qz = group.quiz;
	if (!qz || !(qz.items || []).length) return null;
	const ansMap = parseCircledAnswers(qz.answers);
	return (
		<details className="ct-quiz">
			<summary>
				✍️ {qz.title || "辨析练习"}（{qz.items.length}题）
			</summary>
			{qz.items.map((it: any) => {
				const correct = ansMap[it.n];
				return (
					<div className="q" key={it.n}>
						<span className="n">{it.n}</span>
						<span className="jp">
							<Rr o={it} f="q" />
						</span>
						<QuizOpts
							item={{ ...it, _correct: correct }}
							correct={correct ?? null}
							onWrong={(picked) => logWrong({ ...it, _correct: correct }, picked)}
						>
							{it.note || null}
						</QuizOpts>
					</div>
				);
			})}
		</details>
	);
}

export function ContrastPage() {
	const C = cur().contrast || { groups: [] };
	const groups = C.groups || [];
	const weeks = cur().weeks || [];
	const week = weeks.find((w: any) => w.n === ctWeek) || weeks[0];

	return (
		<>
			<div className="fc-filter" style={{ marginBottom: 12 }}>
				<button className={ctMode === "family" ? "on" : ""} onClick={() => setCtMode("family")}>
					语法家族
				</button>
				<button className={ctMode === "week" ? "on" : ""} onClick={() => setCtMode("week")}>
					每周总结
				</button>
			</div>
			{ctMode === "week" ? (
				<>
					<div className="fc-filter" style={{ marginBottom: 12 }}>
						{weeks.map((w: any) => (
							<button key={w.n} className={ctWeek === w.n ? "on" : ""} onClick={() => setCtWeek(w.n)}>
								第{w.n}周
							</button>
						))}
					</div>
					{!week ? (
						<div className="empty">暂无内容</div>
					) : (
						<>
							<div className="card" style={{ marginBottom: 12 }}>
								<h3 className="ct-h">
									第{week.n}周{week.title ? <span className="jp"> {week.title}</span> : null}
								</h3>
								{lx(week.title_cn, week.title_en) ? <div className="meta">{lx(week.title_cn, week.title_en)}</div> : null}
							</div>
							{week.days.map((d: any) => {
								if (d.day === 7 || !d.points) return null;
								const dt = lx(d.title_cn, d.title_en);
								return (
									<div className="card ct-daysum" key={d.day}>
										<h4>
											{d.day}日目{" "}
											<span className="jp">
												<Rr o={d} f="title" />
											</span>
											{dt ? <span className="meta">（{dt}）</span> : null}
											<a className="plink" onClick={() => navTo(`#/day/${week.n}-${d.day}`)}>
												详情 ›
											</a>
										</h4>
										<ul>
											{(d.points || []).map((p: any, i: number) => {
												return (
													<li key={i}>
														<span className="jp">{p.pattern_r ? <RubyHtml html={p.pattern_r} /> : p.pattern}</span>
														{LANG !== "en" && p.usage_cn ? <span className="ct-mean"> — {p.usage_cn}</span> : null}
														{p.usage_en ? <span className="ct-mean en"> — {p.usage_en}</span> : null}
													</li>
												);
											})}
										</ul>
									</div>
								);
							})}
						</>
					)}
				</>
			) : (
				<div className="ct-wrap">
					<nav className="ct-toc">
						<div className="ct-toc-h">目录</div>
						{groups.map((g: any, i: number) => (
							<a
								className="ct-tocitem"
								key={i}
								onClick={() => document.getElementById(`ct-g-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
							>
								{g.title}
							</a>
						))}
					</nav>
					<div className="ct-body">
						{C.intro ? <div className="meta" style={{ marginBottom: 10 }}>{C.intro}</div> : null}
						{groups.map((g: any, i: number) => (
							<div className="card ct-card" id={`ct-g-${i}`} key={i}>
								<h3 className="ct-h jp">{g.title}</h3>
								{g.tip ? <div className="ct-tip">💡 {g.tip}</div> : null}
								{(g.rows || []).map((r: any, ri: number) => (
									<div className="ct-row" key={ri}>
										<div className="ct-form jp">
											{r.form_r ? <RubyHtml html={r.form_r} /> : r.form}
											<span className="ct-loc" onClick={() => navTo(`#/day/${r.loc}`)}>
												{r.loc} ›
											</span>
										</div>
										{r.eg ? <div className="ct-eg jp">例：{r.eg_r ? <RubyHtml html={r.eg_r} /> : r.eg}</div> : null}
										{r.eg_cn ? <div className="ct-egcn">译：{r.eg_cn}</div> : null}
										<div className="ct-mean">{r.mean}</div>
									</div>
								))}
								<ContrastQuiz group={g} />
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export function parseDayRoute(key: string) {
	const m = key.match(/^#\/day\/(\d+)-(\d+)(?:\/(p\d+|v\d+-\d+|k\d+))?$/);
	if (!m) return null;
	return { w: +m[1], d: +m[2], token: m[3] || null };
}

// keep FAVMETA referenced so exam stars register before first paint
void FAVMETA;
