import { RubyHtml } from "../routes/study-common";
import summary from "../data/common-verb-summary.json";
import { lx } from "./store";
import { conjugateVerb, EXTRA_FORM_FIELDS, VERB_GROUP_RUBY, verbSummaryGroup } from "./verb-forms";

type Group = {
	name_cn: string;
	name_en: string;
	rule_cn: string;
	rule_en: string;
	heads?: string[];
	chart?: string[][];
	drill_heads?: string[];
	rows: string[][];
};

type FormBlock = {
	id: string;
	title_jp: string;
	title_cn: string;
	title_en: string;
	rule_cn: string;
	rule_en: string;
	groups: Group[];
};

const data = summary as {
	intro_cn: string;
	intro_en: string;
	forms: FormBlock[];
	examples: {
		title_cn: string;
		title_en: string;
		note_cn: string;
		note_en: string;
		heads_cn: string[];
		heads_en: string[];
		groups: { name_cn: string; name_en: string; rows: string[][] }[];
	};
};

function jump(id: string) {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const FORM_LABELS: Record<string, { html: string; lesson: number }> = {
	masu: { html: "ます<ruby>形<rt>けい</rt></ruby>", lesson: 4 },
	te: { html: "て<ruby>形<rt>けい</rt></ruby>", lesson: 14 },
	nai: { html: "ない<ruby>形<rt>けい</rt></ruby>", lesson: 17 },
	dict: { html: "<ruby>辞書<rt>じしょ</rt></ruby><ruby>形<rt>けい</rt></ruby>", lesson: 18 },
	ta: { html: "た<ruby>形<rt>けい</rt></ruby>", lesson: 19 },
	potential: { html: "<ruby>可能<rt>かのう</rt></ruby><ruby>形<rt>けい</rt></ruby>", lesson: 27 },
	volitional: { html: "<ruby>意向<rt>いこう</rt></ruby><ruby>形<rt>けい</rt></ruby>", lesson: 31 },
	imperative: { html: "<ruby>命令<rt>めいれい</rt></ruby><ruby>形<rt>けい</rt></ruby>", lesson: 33 },
	ba: { html: "ば<ruby>形<rt>けい</rt></ruby>", lesson: 35 },
	passive: { html: "<ruby>受身<rt>うけみ</rt></ruby><ruby>形<rt>けい</rt></ruby>", lesson: 37 },
	causative: { html: "<ruby>使役<rt>しえき</rt></ruby><ruby>形<rt>けい</rt></ruby>", lesson: 48 },
};

const HEAD_RUBY: Record<string, string> = {
	辞書形: FORM_LABELS.dict.html,
	ます形: FORM_LABELS.masu.html,
	て形: FORM_LABELS.te.html,
	ない形: FORM_LABELS.nai.html,
	た形: FORM_LABELS.ta.html,
	ば形: FORM_LABELS.ba.html,
	可能形: FORM_LABELS.potential.html,
	可能: "<ruby>可能<rt>かのう</rt></ruby>",
	意向形: FORM_LABELS.volitional.html,
	命令形: FORM_LABELS.imperative.html,
	命令: "<ruby>命令<rt>めいれい</rt></ruby>",
	受身形: FORM_LABELS.passive.html,
	受身: "<ruby>受身<rt>うけみ</rt></ruby>",
	使役形: FORM_LABELS.causative.html,
	使役: "<ruby>使役<rt>しえき</rt></ruby>",
	読み: "<ruby>読<rt>よ</rt></ruby>み",
};

function FormName({ id }: { id: string }) {
	const label = FORM_LABELS[id];
	if (!label) return null;
	return (
		<span className="jp verb-sum-form">
			<RubyHtml html={label.html} />
		</span>
	);
}

function HeadLabel({ text }: { text: string }) {
	const html = HEAD_RUBY[text];
	if (!html) return text;
	return (
		<span className="jp verb-sum-form">
			<RubyHtml html={html} />
		</span>
	);
}

function GroupLabel({ name }: { name: string }) {
	const ruby = VERB_GROUP_RUBY[name as keyof typeof VERB_GROUP_RUBY];
	if (!ruby) return <span className="jp">{name}</span>;
	return (
		<span className="jp verb-sum-group">
			<RubyHtml html={ruby} />
		</span>
	);
}

function ExtraCards({ groupName, rows }: { groupName: string; rows: string[][] }) {
	const group = verbSummaryGroup(groupName);
	return (
		<div className="verb-sum-extras">
			{rows.map((row) => {
				const forms = conjugateVerb(row[0], row[1], group);
				return (
					<div className="verb-sum-verb" key={row[0]}>
						<div className="verb-sum-verb-name jp">
							{row[0]}
							{row[0] !== row[1] ? <span className="meta">{row[1]}</span> : null}
						</div>
						<div className="verb-sum-pairs">
							{EXTRA_FORM_FIELDS.map((field) => (
								<div className="verb-sum-pair" key={field.key}>
									<span className="verb-sum-pair-label">
										<HeadLabel text={field.label_cn} />
									</span>
									<span className="jp">{forms[field.key]}</span>
								</div>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

function Grid({ heads, rows }: { heads?: string[]; rows: string[][] }) {
	if (!rows.length) return null;
	return (
		<div className="table-scroll">
			<table className="ref verb-sum-table">
				{heads?.length ? (
					<thead>
						<tr>
							{heads.map((head) => (
								<th key={head}>
									<HeadLabel text={head} />
								</th>
							))}
						</tr>
					</thead>
				) : null}
				<tbody>
					{rows.map((row, index) => (
						<tr key={index}>
							{row.map((cell, cellIndex) => (
								<td key={cellIndex} className="jp">
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function VerbSummaryPage() {
	const examples = data.examples;
	return (
		<div className="verb-sum">
			<p className="meta verb-sum-lead">{lx(data.intro_cn, data.intro_en)}</p>
			<div className="verb-sum-nav">
				{data.forms.map((form) => (
					<button key={form.id} type="button" onClick={() => jump(`verb-${form.id}`)}>
						<FormName id={form.id} />
					</button>
				))}
				<button type="button" onClick={() => jump("verb-examples")}>
					{lx("动词示例", "Examples")}
				</button>
			</div>
			{data.forms.map((form) => (
				<section className="card" id={`verb-${form.id}`} key={form.id}>
					<h2 className="jp">
						<FormName id={form.id} />
						<span className="meta">のつくりかた · {lx(`第${FORM_LABELS[form.id].lesson}課`, `Lesson ${FORM_LABELS[form.id].lesson}`)}</span>
					</h2>
					<p className="meta">{lx(form.rule_cn, form.rule_en)}</p>
					{form.groups.map((group) => (
						<div key={group.name_cn}>
							<h3>
								<GroupLabel name={group.name_cn} />
							</h3>
							<p className="meta">{lx(group.rule_cn, group.rule_en)}</p>
							<Grid heads={group.heads} rows={group.chart || []} />
							<Grid heads={group.drill_heads} rows={group.rows} />
						</div>
					))}
				</section>
			))}
			<section className="card" id="verb-examples">
				<h2 className="verb-sum-examples-title">
					<GroupLabel name="五段動詞" />
					、<GroupLabel name="一段動詞" />
					、<GroupLabel name="不規則動詞" />
					{lx("的例子", " examples")}
				</h2>
				<p className="meta">{lx(examples.note_cn, examples.note_en)}</p>
				{examples.groups.map((group) => (
					<div key={group.name_cn}>
						<h3>
							<GroupLabel name={group.name_cn} />
						</h3>
						<Grid heads={lx(examples.heads_cn.join("\n"), examples.heads_en.join("\n")).split("\n")} rows={group.rows} />
						<p className="meta verb-sum-extra-label">{lx("其余变形", "Other forms")}</p>
						<ExtraCards groupName={group.name_cn} rows={group.rows} />
					</div>
				))}
			</section>
		</div>
	);
}
