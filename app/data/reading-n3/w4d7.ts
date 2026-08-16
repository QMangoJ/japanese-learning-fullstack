import type { ReadingDay } from "./types";

// 第4週 7日目 実戦問題 — printed pages 72–74

const years = [
	1925, 1935, 1945, 1955, 1965, 1975, 1985, 1995, 2005, 2015, 2025, 2035, 2045, 2055, 2065, 2075, 2085, 2095, 2105,
];
// 総人口（万人）
const population = [
	6000, 7000, 7500, 9000, 9900, 11200, 12100, 12550, 12780, 12650, 11900, 11000, 10000, 9000, 7900, 6800, 5900, 5100,
	4500,
];
// 65歳以上の構成比（％）
const elderly = [5.1, 4.7, 5.1, 5.3, 6.3, 7.9, 10.3, 14.6, 20.2, 26.7, 30.5, 33.4, 36.5, 38.8, 40.5, 41.3, 41.0, 40.6, 40.4];

function populationChart(): string {
	const left = 56;
	const right = 620;
	const top = 20;
	const bottom = 236;
	const slot = (right - left) / years.length;
	const barWidth = slot * 0.62;
	const yPop = (value: number) => bottom - (value / 15000) * (bottom - top);
	const yPct = (value: number) => bottom - (value / 50) * (bottom - top);

	const bars = years
		.map((_, index) => {
			const x = left + index * slot + (slot - barWidth) / 2;
			const y = yPop(population[index]);
			return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${(bottom - y).toFixed(1)}" fill="color-mix(in srgb, currentColor 30%, transparent)" stroke="currentColor" stroke-width="0.7"/>`;
		})
		.join("\n    ");

	const linePoints = years
		.map((_, index) => `${(left + index * slot + slot / 2).toFixed(1)},${yPct(elderly[index]).toFixed(1)}`)
		.join(" ");

	const leftTicks = [0, 3000, 6000, 9000, 12000, 15000]
		.map(
			(value) =>
				`<text x="${left - 6}" y="${(yPop(value) + 3).toFixed(1)}" text-anchor="end" font-size="8">${value}</text>
    <line x1="${left - 3}" y1="${yPop(value).toFixed(1)}" x2="${left}" y2="${yPop(value).toFixed(1)}" stroke="currentColor" stroke-width="0.7"/>`,
		)
		.join("\n    ");

	const rightTicks = [0, 10, 20, 30, 40, 50]
		.map(
			(value) =>
				`<text x="${right + 6}" y="${(yPct(value) + 3).toFixed(1)}" font-size="8">${value}</text>
    <line x1="${right}" y1="${yPct(value).toFixed(1)}" x2="${right + 3}" y2="${yPct(value).toFixed(1)}" stroke="currentColor" stroke-width="0.7"/>`,
		)
		.join("\n    ");

	const xLabels = years
		.map(
			(year, index) =>
				`<text x="${(left + index * slot + slot / 2).toFixed(1)}" y="${bottom + 13}" text-anchor="middle" font-size="7.5">${year}</text>`,
		)
		.join("\n    ");

	return `<svg viewBox="0 0 680 268" role="img" aria-label="日本の人口の推移と将来の人口">
    <text x="4" y="12" font-size="9">総人口（万人）</text>
    <text x="${right - 8}" y="12" font-size="9">65歳以上 構成比（％）</text>
    ${bars}
    <polyline points="${linePoints}" fill="none" stroke="currentColor" stroke-width="2.1"/>
    <line x1="${left}" y1="${top}" x2="${left}" y2="${bottom}" stroke="currentColor" stroke-width="1"/>
    <line x1="${right}" y1="${top}" x2="${right}" y2="${bottom}" stroke="currentColor" stroke-width="1"/>
    <line x1="${left}" y1="${bottom}" x2="${right}" y2="${bottom}" stroke="currentColor" stroke-width="1"/>
    ${leftTicks}
    ${rightTicks}
    ${xLabels}
    <text x="${right}" y="${bottom + 26}" text-anchor="end" font-size="8">（年）</text>
</svg>`;
}

export const w4d7: ReadingDay = {
	week: 4,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [72, 73, 74],
	answerSource: "book",

	practice: {
		timeLimitMinutes: 15,
		scoring: "1問25点×4問／100点",
		groups: [
			{
				label: "問題1",
				instruction:
					"つぎのグラフは{日本|にほん}の{人口|じんこう}の{推移|すいい}（※1）と{将来|しょうらい}の{人口|じんこう}を{表|あらわ}したものである。よく{見|み}て、{下|した}の{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つえらびなさい。",
				instructionCn:
					"下面的图表显示的是日本人口的变迁与未来的人口。请仔细看图，回答下面的问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn:
					"The graph below shows the change in Japan’s population and the population in the future. Look at it carefully and answer the questions. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "figure",
						alt: "棒グラフが総人口（万人・左目盛り）、折れ線が65歳以上の構成比（％・右目盛り）を表す複合グラフ。1925年から2105年まで10年刻み",
						cn: "复合图：柱状表示总人口（万人，左侧刻度），折线表示 65 岁以上人口的构成比（％，右侧刻度）。横轴为 1925 年至 2105 年，每 10 年一格。（本站按原书重绘）",
						en: "A combined chart: bars show total population (10,000s of people, left scale); the line shows the share aged 65 and over (%, right scale). The x-axis runs from 1925 to 2105 in 10-year steps. (Redrawn from the book.)",
						svg: populationChart(),
					},
					{
						type: "line",
						jp: "（{資料|しりょう}：{総務省統計局|そうむしょうとうけいきょく}「{人口|じんこう}の{推移|すいい}と{将来人口|しょうらいじんこう}」）",
						cn: "（资料：总务省统计局《人口的变迁与未来人口》）",
						en: "(Source: Statistics Bureau, Ministry of Internal Affairs, “Population Trends and Future Population”)",
						align: "right",
					},
				],
				footnotes: [
					{ marker: "※1", term: "推移", jp: "移り変わり", cn: "变迁、推移", en: "change over time / trend" },
					{ marker: "※2", term: "構成比", jp: "全体に対する割合", cn: "构成比（占整体的比例）", en: "share of the total / composition ratio" },
				],
				questions: [
					{
						label: "1",
						jp: "{日本|にほん}の{総人口|そうじんこう}について、{正|ただ}しいものはどれか。グラフを{見|み}て{答|こた}えなさい。",
						cn: "关于日本的总人口，下列哪一项正确？请看图作答。",
						en: "Which of the following is correct about Japan’s total population? Answer by looking at the graph.",
						choices: [
							{
								jp: "{日本|にほん}の{人口|じんこう}は2005{年|ねん}には1925{年|ねん}の2{倍|ばい}まで{増加|ぞうか}したが、その{後|ご}は{一定|いってい}になると{予想|よそう}される。",
								cn: "日本人口到 2005 年增加到 1925 年的 2 倍，此后预计将保持不变。",
								en: "Japan’s population had doubled from 1925 by 2005, and after that it is expected to stay constant.",
							},
							{
								jp: "{日本|にほん}の{人口|じんこう}は2005{年|ねん}には1925{年|ねん}の2{分|ぶん}の1まで{減少|げんしょう}したが、それを{境|さかい}に{少|すこ}しずつ{増加|ぞうか}していくと{予想|よそう}される。",
								cn: "日本人口到 2005 年减少到 1925 年的二分之一，此后预计将逐渐增加。",
								en: "Japan’s population had fallen to half of 1925 by 2005, and after that turning point it is expected to increase little by little.",
							},
							{
								jp: "{日本|にほん}の{人口|じんこう}は2005{年|ねん}には1925{年|ねん}の2{倍|ばい}まで{増加|ぞうか}したが、それをピークに{減少|げんしょう}すると{予想|よそう}される。",
								cn: "日本人口到 2005 年增加到 1925 年的 2 倍，此后预计将以此为顶点开始减少。",
								en: "Japan’s population had doubled from 1925 by 2005, and after that peak it is expected to decrease.",
							},
							{
								jp: "{日本|にほん}の{人口|じんこう}は2060{年|ねん}ごろまで{増加|ぞうか}する{見込|みこ}みだが、その{後|ご}は{少|すこ}しずつ{減|へ}っていくと{予想|よそう}される。",
								cn: "日本人口预计到 2060 年左右为止持续增加，此后将逐渐减少。",
								en: "Japan’s population is expected to keep increasing until around 2060, and after that to fall little by little.",
							},
						],
						answer: 3,
						explanation:
							"看柱状图（总人口）：1925 年约 6,000 万人，一路上升到 2005 年约 1 亿 2,800 万人——正好约为 2 倍。而 2005 年的柱子最高，之后逐年变矮。也就是「2005 年增加到 2 倍，并以此为顶点转为减少」，3 正确。",
						explanationEn:
							"Look at the bars (total population): about 60 million in 1925, rising all the way to about 128 million in 2005 — roughly double. The 2005 bar is the tallest, and after that the bars get shorter year by year. So “it had doubled by 2005, and after that peak it decreases.” Choice 3 is correct.",
						choiceNotes: [
							"2005 年之后柱子明显变矮，不是「一定（保持不变）」。",
							"人口是增加到 2 倍，不是减少到二分之一，方向完全相反。",
							"正确。约 6,000 万 → 约 12,800 万 ≈ 2 倍，2005 年为顶点后减少。",
							"顶点是 2005 年前后，不是 2060 年；2060 年时人口已经大幅下降了。",
						],
						choiceNotesEn: [
							"After 2005 the bars clearly get shorter — it is not “constant.”",
							"The population doubled, it did not fall to one-half — the direction is the opposite.",
							"Correct. About 60 million → about 128 million ≈ 2×; 2005 is the peak, then it falls.",
							"The peak is around 2005, not 2060; by 2060 the population has already fallen a lot.",
						],
					},
					{
						label: "2",
						jp: "{人口|じんこう}の{構成比|こうせいひ}（※2）について、{正|ただ}しいものはどれか。グラフを{見|み}て{答|こた}えなさい。",
						cn: "关于人口的构成比，下列哪一项正确？请看图作答。",
						en: "Which of the following is correct about the composition of the population? Answer by looking at the graph.",
						choices: [
							{
								jp: "10％にも{満|み}たなかった65{歳以上|さいいじょう}の{人口|じんこう}は1975{年|ねん}ごろから{急激|きゅうげき}に{増加|ぞうか}し{続|つづ}け、40％に{達|たっ}すると{予想|よそう}されている。",
								cn: "曾经不到 10％ 的 65 岁以上人口，从 1975 年前后开始急剧持续增加，预计将达到 40％。",
								en: "The share aged 65 and over, which was under 10%, has risen sharply since around 1975 and is expected to reach 40%.",
							},
							{
								jp: "65{歳以上|さいいじょう}の{人口|じんこう}は1975{年|ねん}ごろから{徐々|じょじょ}に{伸|の}び、{将来|しょうらい}は{総人口|そうじんこう}の{半分|はんぶん}を{占|し}めると{予想|よそう}される。",
								cn: "65 岁以上人口从 1975 年前后开始缓慢增长，预计将来会占总人口的一半。",
								en: "The population aged 65 and over has grown gradually since around 1975 and is expected to account for half of the total in the future.",
							},
							{
								jp: "10％にも{満|み}たなかった65{歳以上|さいいじょう}の{人口|じんこう}は1975{年|ねん}ごろから{急激|きゅうげき}に{増加|ぞうか}し{続|つづ}け、{将来|しょうらい}は{総人口|そうじんこう}の{半分|はんぶん}を{占|し}めると{予想|よそう}される。",
								cn: "曾经不到 10％ 的 65 岁以上人口，从 1975 年前后开始急剧持续增加，预计将来会占总人口的一半。",
								en: "The share aged 65 and over, which was under 10%, has risen sharply since around 1975 and is expected to account for half of the total in the future.",
							},
							{
								jp: "65{歳以上|さいいじょう}の{人口|じんこう}は1975{年|ねん}ごろから{徐々|じょじょ}に{伸|の}びているが、2070{年|ねん}ごろを{境|さかい}に{急激|きゅうげき}に{減少|げんしょう}し{続|つづ}けると{予想|よそう}される。",
								cn: "65 岁以上人口从 1975 年前后开始缓慢增长，但预计以 2070 年前后为界将急剧持续减少。",
								en: "The population aged 65 and over has grown gradually since around 1975, but after around 2070 it is expected to keep falling sharply.",
							},
						],
						answer: 1,
						explanation:
							"看折线（右侧刻度）：1975 年之前一直在 10％ 以下，从 1975 年前后开始陡峭上升，最后停在 40％ 稍多一点的位置。三个要点——①原来不到 10％ ②1975 年起急剧增加 ③最终达到 40％——全部符合的只有 1。",
						explanationEn:
							"Look at the line (right scale): it stays under 10% until 1975, then rises steeply from around 1975, and finally levels off a little above 40%. Three points — ① it used to be under 10%, ② it has risen sharply since 1975, ③ it ends around 40% — only 1 matches all three.",
						choiceNotes: [
							"正确。不到 10％ → 1975 年起急剧上升 → 达到约 40％。",
							"上升是「急激」而非「徐々」，而且终点是 40％ 左右，不是一半（50％）。",
							"前半正确，但「半分を占める」错——折线最高只到 41％ 前后，没有到 50％。",
							"折线在 2070 年后基本走平（略微下降），不是「急激に減少し続ける」。",
						],
						choiceNotesEn: [
							"Correct. Under 10% → sharp rise from 1975 → reaches about 40%.",
							"The rise is “sharp,” not “gradual,” and the end is around 40%, not half (50%).",
							"The first half is right, but “accounts for half” is wrong — the line tops out around 41%, never 50%.",
							"After 2070 the line is basically flat (slightly down), not “keeps falling sharply.”",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"つぎの{新聞記事|しんぶんきじ}を{読|よ}んで、{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つえらびなさい。",
				instructionCn: "阅读下面的新闻报道，回答问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn: "Read the newspaper article below and answer the questions. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{ type: "title", jp: "{事件|じけん}の{影響|えいきょう}で（※1）{心|こころ}の{傷|きず}", cn: "受事件影响　心灵创伤", en: "Emotional wounds from the incident" },
					{ type: "heading", jp: "カウンセリング（※2）{開始|かいし}", cn: "开始心理辅导", en: "Counseling begins" },
					{ type: "line", jp: "{大阪市中央区|おおさかしちゅうおうく}の{小中学校|しょうちゅうがっこう}", cn: "大阪市中央区的中小学", en: "Elementary and junior high schools in Chuo Ward, Osaka", align: "right" },
					{
						type: "paragraph",
						indent: true,
						jp: "「{子|こ}どもが{一人|ひとり}で{寝|ね}られない」「{包丁|ほうちょう}を{見|み}ると{泣|な}き{出|だ}す」。{大阪|おおさか}で{起|お}きた{児童殺傷|じどうさっしょう}（※3）{事件|じけん}の{影響|えいきょう}で、{事件|じけん}の{現場|げんば}（※4）となった{青山小学校|あおやましょうがっこう}の{児童|じどう}たちが{深刻|しんこく}な{心|こころ}の{傷|きず}を{訴|うった}えている。また{事件|じけん}に{直接関係|ちょくせつかんけい}のない{付近|ふきん}の{小学校|しょうがっこう}や{中学校|ちゅうがっこう}でも、{事件後|じけんご}、「{学校|がっこう}へ{行|い}くのをいやがる」「{怖|こわ}い{夢|ゆめ}をみる」という{生徒|せいと}が{増|ふ}えるなどの{現象|げんしょう}が{起|お}きており、{各校|かくこう}では{十一日|じゅういちにち}より{学校関係者|がっこうかんけいしゃ}による{子|こ}どもたちのカウンセリングを{開始|かいし}した。",
						cn: "「孩子不敢一个人睡」「一看到菜刀就哭起来」。受大阪发生的儿童杀伤事件影响，作为事发现场的青山小学的学生们诉说着深重的心理创伤。此外，在与事件没有直接关系的附近中小学，事件之后也出现了「不愿意去学校」「做噩梦」的学生增多等现象，各校已于 11 日起由学校相关人员开始对孩子们进行心理辅导。",
						en: "“My child cannot sleep alone.” “He bursts into tears when he sees a kitchen knife.” Affected by a child stabbing incident in Osaka, pupils at Aoyama Elementary School — the scene of the crime — are reporting serious emotional wounds. Nearby elementary and junior high schools not directly connected to the incident have also seen more pupils who “don’t want to go to school” or “have nightmares” since then, and on the 11th each school began counseling for the children, provided by school staff.",
					},
				],
				footnotes: [
					{ marker: "※1", term: "〜の影響で", jp: "〜が原因で", cn: "受〜的影响、由〜引起", en: "because of / as a result of" },
					{ marker: "※2", term: "カウンセリング", jp: "悩みなどを聞き、相談にのること", cn: "心理辅导、咨询", en: "counseling / listening to worries and giving advice" },
					{ marker: "※3", term: "殺傷", jp: "殺したり傷つけたりすること", cn: "杀伤", en: "killing or injuring" },
					{ marker: "※4", term: "〜の現場", jp: "〜が起こった場所", cn: "〜的现场、发生地点", en: "the place where … happened" },
				],
				questions: [
					{
						label: "3",
						jp: "この{記事|きじ}からわかることはどれか。",
						cn: "从这则报道可以得知的是哪一项？",
						en: "Which of the following can we tell from this article?",
						choices: [
							{ jp: "いつ{事件|じけん}が{起|お}こったか。", cn: "事件是什么时候发生的。", en: "when the incident happened" },
							{ jp: "だれが{児童|じどう}を{傷|きず}つけたか。", cn: "是谁伤害了学生。", en: "who injured the children" },
							{ jp: "どこで{事件|じけん}が{起|お}こったか。", cn: "事件是在哪里发生的。", en: "where the incident happened" },
							{ jp: "{何人|なんにん}の{児童|じどう}が{傷|きず}つけられたか。", cn: "有多少学生受伤。", en: "how many children were injured" },
						],
						answer: 3,
						explanation:
							"报道里写着「大阪で起きた児童殺傷事件」「事件の現場となった青山小学校」——地点写得很明确：大阪市的青山小学。至于时间（只写了辅导从 11 日开始，不是事件日期）、犯人、受害人数，全都没有提到。",
						explanationEn:
							"The article says “a child stabbing incident in Osaka” and “Aoyama Elementary School, the scene of the crime” — the place is clear: Aoyama Elementary in Osaka. The date (only counseling starts on the 11th, not the date of the incident), the attacker, and the number of victims are never mentioned.",
						choiceNotes: [
							"「十一日より」是心理辅导开始的日子，不是事件发生的日子。",
							"报道完全没有提到加害者。",
							"正确。「大阪で起きた」「事件の現場となった青山小学校」。",
							"没有写受伤的人数。",
						],
						choiceNotesEn: [
							"“From the 11th” is when counseling started, not when the incident happened.",
							"The article never mentions the attacker.",
							"Correct. “Happened in Osaka” and “Aoyama Elementary School, the scene of the crime.”",
							"The number of injured children is not given.",
						],
					},
					{
						label: "4",
						jp: "この{文章|ぶんしょう}には{何|なに}が{書|か}いてあるか。",
						cn: "这篇文章写的是什么？",
						en: "What is this article about?",
						choices: [
							{
								jp: "{青山小学校|あおやましょうがっこう}より{付近|ふきん}の{小中学校|しょうちゅうがっこう}のほうが{事件|じけん}の{影響|えいきょう}が{大|おお}きい。",
								cn: "附近的中小学比青山小学受事件的影响更大。",
								en: "Nearby schools were more affected by the incident than Aoyama Elementary.",
							},
							{
								jp: "{事件|じけん}による{子|こ}どもたちの{心|こころ}の{傷|きず}は{深|ふか}く、カウンセリングが{必要|ひつよう}である。",
								cn: "事件给孩子们造成的心灵创伤很深，需要心理辅导。",
								en: "The children’s emotional wounds from the incident are deep, and counseling is needed.",
							},
							{
								jp: "カウンセリングをしても{事件|じけん}による{子|こ}どもたちの{心|こころ}の{傷|きず}は{治|なお}らない。",
								cn: "即使做心理辅导，事件给孩子们造成的心灵创伤也无法治愈。",
								en: "Even with counseling, the children’s emotional wounds from the incident will not heal.",
							},
							{
								jp: "{学校関係者|がっこうかんけいしゃ}は{事件|じけん}について{深刻|しんこく}な{心|こころ}の{傷|きず}を{訴|うった}えている。",
								cn: "学校相关人员诉说着关于事件的深重心理创伤。",
								en: "School staff are reporting serious emotional wounds from the incident.",
							},
						],
						answer: 2,
						explanation:
							"标题「事件の影響で心の傷／カウンセリング開始」已经概括了全文：因为事件造成心灵创伤，所以开始了心理辅导。正文举出「一人で寝られない」「包丁を見ると泣き出す」等具体表现，说明创伤之深，并写明各校开始辅导。所以 2 正确。",
						explanationEn:
							"The headline “Emotional wounds from the incident / Counseling begins” already sums up the article: the incident caused emotional wounds, so counseling has started. The body gives concrete signs (“cannot sleep alone,” “cries at the sight of a kitchen knife”), showing how deep the wounds are, and states that each school has begun counseling. So 2 is correct.",
						choiceNotes: [
							"报道没有比较两者影响的大小；现场的青山小学写的是「深刻な心の傷」，附近学校是「〜生徒が増える」。",
							"正确。标题与正文的核心就是这一点。",
							"报道只说开始了辅导，没有谈到效果如何。",
							"诉说创伤的是孩子（児童たち），学校相关人员是提供辅导的一方——主语弄错了。",
						],
						choiceNotesEn: [
							"The article never compares how badly the two were affected; Aoyama (the scene) has “serious emotional wounds,” nearby schools have “more pupils who ….”",
							"Correct. That is the core of the headline and the body.",
							"The article only says counseling has started; it never discusses how well it works.",
							"The ones reporting wounds are the children; school staff are the ones providing counseling — the subject is wrong.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "推移", kana: "すいい", cn: "变迁、推移", en: "change over time / trend", pos: "名詞" },
		{ jp: "総人口", kana: "そうじんこう", cn: "总人口", en: "total population", pos: "名詞" },
		{ jp: "構成比", kana: "こうせいひ", cn: "构成比", en: "share / composition ratio", pos: "名詞" },
		{ jp: "将来", kana: "しょうらい", cn: "将来", en: "the future", pos: "名詞" },
		{ jp: "満たない", kana: "みたない", cn: "不满、不到", en: "to fall short of / to be under", pos: "動詞" },
		{ jp: "ピーク", cn: "顶点、高峰", en: "peak", pos: "名詞" },
		{ jp: "見込み", kana: "みこみ", cn: "预计、可能性", en: "outlook / prospect", pos: "名詞" },
		{ jp: "境", kana: "さかい", cn: "分界、界限", en: "a turning point / boundary", pos: "名詞" },
		{ jp: "予想する", kana: "よそうする", cn: "预测", en: "to expect / to forecast", pos: "動詞" },
		{ jp: "事件", kana: "じけん", cn: "事件", en: "incident", pos: "名詞" },
		{ jp: "影響", kana: "えいきょう", cn: "影响", en: "effect / influence", pos: "名詞・動詞" },
		{ jp: "傷", kana: "きず", cn: "伤、创伤", en: "a wound", pos: "名詞" },
		{ jp: "カウンセリング", cn: "心理辅导", en: "counseling", pos: "名詞" },
		{ jp: "児童", kana: "じどう", cn: "儿童、小学生", en: "child / elementary-school pupil", pos: "名詞" },
		{ jp: "殺傷", kana: "さっしょう", cn: "杀伤", en: "killing or injuring", pos: "名詞・動詞" },
		{ jp: "現場", kana: "げんば", cn: "现场", en: "the scene (of an incident)", pos: "名詞" },
		{ jp: "深刻", kana: "しんこく", cn: "严重、深刻", en: "serious / severe", pos: "な形" },
		{ jp: "訴える", kana: "うったえる", cn: "诉说、控诉", en: "to report / to complain of", pos: "動詞" },
		{ jp: "現象", kana: "げんしょう", cn: "现象", en: "a phenomenon", pos: "名詞" },
		{ jp: "包丁", kana: "ほうちょう", cn: "菜刀", en: "kitchen knife", pos: "名詞" },
		{ jp: "各校", kana: "かくこう", cn: "各学校", en: "each school", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜をピークに",
			formation: "名詞 ＋ をピークに",
			meaning: "以……为顶点（之后转变方向）。图表说明的常用表达。",
			meaningEn: "With … as the peak (then changing direction). A common graph-description phrase.",
			example: { jp: "それをピークに{減少|げんしょう}すると{予想|よそう}される。", cn: "预计将以此为顶点开始减少。", en: "It is expected to decrease after that peak." },
		},
		{
			pattern: "〜を{境|さかい}に",
			formation: "名詞 ＋ を境に",
			meaning: "以……为界（前后发生变化）。",
			meaningEn: "With … as the turning point (things change after that).",
			example: { jp: "2070{年|ねん}ごろを{境|さかい}に", cn: "以 2070 年前后为界", en: "with around 2070 as the turning point" },
		},
		{
			pattern: "〜にも{満|み}たない",
			formation: "数量詞 ＋ にも満たない",
			meaning: "连……都不到。强调数量之少。",
			meaningEn: "Not even as much as …. Stresses how small the number is.",
			example: { jp: "10％にも{満|み}たなかった65{歳以上|さいいじょう}の{人口|じんこう}", cn: "曾经连 10％ 都不到的 65 岁以上人口", en: "the population aged 65 and over, which was not even 10%" },
		},
		{
			pattern: "〜{見込|みこ}みだ／〜と{予想|よそう}される",
			meaning: "预计……。图表、报道中陈述预测的固定说法。",
			meaningEn: "It is expected that …. A set way to state a forecast in graphs and articles.",
			example: { jp: "その{後|ご}は{少|すこ}しずつ{減|へ}っていくと{予想|よそう}される。", cn: "此后预计将逐渐减少。", en: "After that it is expected to fall little by little." },
		},
		{
			pattern: "〜の{影響|えいきょう}で",
			meaning: "受……的影响、由……引起。",
			meaningEn: "Because of / as a result of ….",
			example: { jp: "{児童殺傷事件|じどうさっしょうじけん}の{影響|えいきょう}で", cn: "受儿童杀伤事件的影响", en: "as a result of the child stabbing incident" },
		},
		{
			pattern: "〜による",
			formation: "名詞 ＋ による",
			meaning: "由……造成的、依据……的。",
			meaningEn: "Caused by … / carried out by ….",
			example: { jp: "{学校関係者|がっこうかんけいしゃ}による{子|こ}どもたちのカウンセリング", cn: "由学校相关人员进行的儿童心理辅导", en: "counseling for the children provided by school staff" },
		},
		{
			pattern: "〜など（の）〜が{起|お}きており",
			meaning: "发生了……等（现象）。「〜ており」是「〜ていて」的书面形式，新闻报道常用。",
			meaningEn: "Phenomena such as … have been occurring. ~te ori is the written form of ~te ite, common in news.",
			example: {
				jp: "{生徒|せいと}が{増|ふ}えるなどの{現象|げんしょう}が{起|お}きており",
				cn: "出现了学生增多等现象",
				en: "phenomena such as an increase in pupils have been occurring",
			},
		},
	],
};
