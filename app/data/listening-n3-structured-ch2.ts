import type { ListeningStructuredSection } from "./listening-n3-structured-types";

/**
 * 第2章（練習頁 24–36）の本文を、原書の節・頁構成に合わせて起こしたデータです。
 * 外国語の対訳・挿絵そのものは本文から外し、日文の見出し、説明、選択肢、会話を保持します。
 */
export const chapter2Sections: readonly ListeningStructuredSection[] = [
	{
		number: 1,
		title: "何と言いますか ―発話表現―",
		subtitle: "発話表現",
		firstTrack: 19,
		answerPages: [89],
		pages: [
			{
				page: 27,
				blocks: [
					{ kind: "heading", text: "1　何と言いますか ―発話表現―" },
					{ kind: "tip", text: "イラストから場面を想像し、質問の中の説明部分に注意することが重要です。質問の最後の部分はたいてい「何と言いますか。」です。" },
					{ kind: "heading", text: "練習" },
					{ kind: "note", text: "イラスト：学校で、先生と学生が話している場面。" },
					{
						kind: "question",
						title: "レポートの書き方がよくわかりません。何と言いますか。",
						tracks: [19],
						options: [
							"あのう、レポートを書いていただいてもよろしいでしょうか。",
							"あのう、レポートをどうやって書けばいいか教えていただけませんか。",
							"あのう、レポートの出し方をおっしゃってください。",
						],
					},
					{ kind: "note", text: "希望の伝え方には「〜てくれない？」「〜てくださいませんか。」「〜いただけませんか。」などがあります。" },
				],
			},
			{
				page: 28,
				blocks: [
					{ kind: "heading", text: "注意" },
					{
						kind: "example",
						text: "A「どうぞお上がりください。／どうぞお入りください。」\nB「おじゃまします。」\nA「どうぞおかけください。」\n社員「お先に失礼します。」\n部長「ご苦労さま。／お疲れさま。」\n部長「お先に。」\n社員「お疲れさまでした。」",
					},
					{ kind: "heading", text: "れんしゅう（答えは p.86）" },
					{ kind: "paragraph", text: "絵を見ながら質問を聞いてください。矢印（→）の人は何と言いますか。1〜3の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", tracks: [20], options: ["①", "②", "③"] },
					{ kind: "note", text: "イラスト：テレビを見ている人が、読書をしている人に話しかける場面。" },
					{ kind: "question", title: "2番", tracks: [21], options: ["①", "②", "③"] },
					{ kind: "note", text: "イラスト：来客を室内へ案内する場面。" },
				],
			},
		],
	},
	{
		number: 2,
		title: "どんな返事をしますか ―即時応答―",
		subtitle: "即時応答",
		firstTrack: 22,
		answerPages: [89],
		pages: [
			{
				page: 29,
				blocks: [
					{ kind: "heading", text: "2　どんな返事をしますか ―即時応答―" },
					{ kind: "tip", text: "間接的な返事に注意しましょう！" },
					{ kind: "example", text: "今度の日曜日、映画に行かない？\n行きたくない！\nそういう断り方は、失礼です！" },
					{ kind: "paragraph", text: "問題用紙に何も印刷されていません。1対1の対話です。" },
					{ kind: "tip", text: "始めの文に注意して聞くことが重要です。返事は、直接的な返事ではない場合も多いです。特に誘われて断るときは、間接的な断り方をする場合がよくあります。" },
					{ kind: "heading", text: "練習" },
					{
						kind: "question",
						title: "いつまで日本にいらっしゃいますか。",
						tracks: [22],
						options: [
							"明日で、日本に来てから1年になるんです。",
							"来年くらいに、日本に帰りたいと思っているんですが…。",
							"来年の3月ごろ、帰ろうかなと思っています。",
						],
					},
				],
			},
			{
				page: 30,
				blocks: [
					{ kind: "heading", text: "注意" },
					{ kind: "example", text: "A「どうぞお召し上がりください。」\nB「どうぞおかまいなく。／では、遠慮なくいただきます。」\nA「もっといかがですか。」\nB「もうけっこうです。」" },
					{ kind: "heading", text: "誘いを断る返事" },
					{ kind: "tip", text: "間接的に誘いを断る返事と、文末の言い方に注意しましょう。" },
					{ kind: "example", text: "A「来週の日曜日に映画に行きませんか。」\nB「あー、日曜日は、予定が入っているんです…。」／「あー、その日は、ちょっと…。」" },
					{ kind: "heading", text: "れんしゅう（答えは p.86）" },
					{ kind: "paragraph", text: "まず文を聞いてください。それからその返事を聞いて、1〜3の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", tracks: [23], options: ["①", "②", "③"] },
					{ kind: "question", title: "2番", tracks: [24], options: ["①", "②", "③"] },
					{ kind: "question", title: "3番", tracks: [25], options: ["①", "②", "③"] },
					{ kind: "question", title: "4番", tracks: [26], options: ["①", "②", "③"] },
				],
			},
		],
	},
	{
		number: 3,
		title: "何をしますか ―課題理解―",
		subtitle: "課題理解",
		firstTrack: 27,
		answerPages: [91],
		pages: [
			{
				page: 31,
				blocks: [
					{ kind: "heading", text: "3　何をしますか ―課題理解―" },
					{ kind: "tip", text: "印刷されたイラストや文字をすばやく見ておきましょう！" },
					{ kind: "paragraph", text: "問題用紙に選択肢がイラストか文字で印刷されています。" },
					{ kind: "note", text: "黒板は短いので、すぐに読めるよ。" },
					{ kind: "heading", text: "練習" },
					{
						kind: "question",
						title: "男の人は、これからどうしますか。",
						tracks: [27],
						options: ["病院に行く", "病院に電話する", "病院の電話番号を調べる", "病院の場所を調べる"],
					},
					{ kind: "example", text: "女：どうしたの？\n男：昨日から肩が痛くて…。テニスでがんばりすぎたせいかなあ。冷やしてみようかな。\n女：その前に、お医者さんに行ったほうがいいよ。ほら、去年行ったところに。でも、今日やっているかどうかわからないから、行く前に電話してみたら？\n男：うん。でも診察券もどこにあるかわからないし、電話番号がわからないよ。\n女：パソコンで検索すればいいじゃない。\n男：そうだね。" },
				],
			},
			{
				page: 32,
				blocks: [
					{ kind: "heading", text: "注意：よくある質問のしかた" },
					{ kind: "list", items: ["「だれが／だれに…？」「何を…？」「いつ／何時に…？」「どこで…？」「どの〜を…？」等"] },
					{ kind: "heading", text: "何を先にするかの聞きかた" },
					{ kind: "list", items: ["「まず何をしますか。」「これからどうしますか。」「このあとまず、何をしなければなりませんか。」等", "〜する前、〜した後等、行動の順序を表す文に注意（p.58 第4章）"] },
					{ kind: "heading", text: "れんしゅう（答えは p.88）" },
					{ kind: "paragraph", text: "まず質問を聞いてください。それから話を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番（車のイラストから選ぶ）", tracks: [28], options: ["①", "②", "③", "④"] },
					{ kind: "question", title: "2番", tracks: [29], options: ["プリントを分ける", "教室の窓を開ける", "田中先生のところに行く", "プリントを教室に持って行く"] },
				],
			},
		],
	},
	{
		number: 4,
		title: "どうしてですか ―ポイント理解―",
		subtitle: "ポイント理解",
		firstTrack: 30,
		answerPages: [93],
		pages: [
			{
				page: 33,
				blocks: [
					{ kind: "heading", text: "4　どうしてですか ―ポイント理解―" },
					{ kind: "tip", text: "落ち着いて選択肢を読みましょう！" },
					{ kind: "paragraph", text: "問題用紙に選択肢が印刷されています。" },
					{ kind: "tip", text: "問われていることにポイントを絞って聞きましょう。そして、選択肢を読む時間を有効に使いましょう。" },
					{ kind: "heading", text: "練習" },
					{
						kind: "question",
						title: "男の人は、どうして謝っていますか。",
						tracks: [30],
						options: ["出かけることができなかったから", "電話をかけなかったから", "荷物を受け取らなかったから", "待ち合わせに遅れたから"],
					},
					{ kind: "example", text: "女：どーしたの。\n男：ごめん、ごめん。待たせちゃって。ちょうど出かけようとしたとき、電話がかかってくるし、荷物が届くしで…。" },
				],
			},
			{
				page: 34,
				blocks: [
					{ kind: "heading", text: "注意" },
					{ kind: "tip", text: "必要な情報だけを聞き取りましょう。" },
					{ kind: "tip", text: "言い換えのことばに注意しましょう。選択肢と話の中で使っていることばは、同じ意味でも表現が違う場合があります。" },
					{ kind: "heading", text: "れんしゅう（答えは p.90）" },
					{ kind: "paragraph", text: "まず質問を聞いてください。そのあと、選択肢を読んでください。読む時間があります。それから話を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{
						kind: "question",
						title: "1番",
						tracks: [32],
						options: ["京都のガイドブックと雑誌", "京都のガイドブックと地図", "英語の辞書と京都のガイドブック", "週刊誌と京都のガイドブックと地図"],
					},
					{
						kind: "question",
						title: "2番",
						tracks: [33],
						options: ["会社がある駅の近くに、引っ越したから", "電車で来るのと時間が変わらないから", "健康に気をつけるようになったから", "会社の帰りに、買い物ができるから"],
					},
					{ kind: "note", text: "週刊誌" },
				],
			},
		],
	},
	{
		number: 5,
		title: "どんな内容ですか ―概要理解―",
		subtitle: "概要理解",
		firstTrack: 34,
		answerPages: [95],
		pages: [
			{
				page: 35,
				blocks: [
					{ kind: "heading", text: "5　どんな内容ですか ―概要理解―" },
					{ kind: "tip", text: "最初の説明から話の内容を予測しましょう！" },
					{ kind: "paragraph", text: "問題用紙に何も印刷されていません。" },
					{ kind: "tip", text: "全体の内容を聞いて判断する問題です。質問は話のあと一回だけなので注意しましょう。" },
					{ kind: "heading", text: "練習" },
					{ kind: "paragraph", text: "男の人が、携帯電話について話しています。" },
					{
						kind: "example",
						text: "男：あれば、便利だと思うんですが、今、みんな持っていて、どこでも携帯いじってるでしょ。だめだと言っているのに、自転車に乗っているときでもメールなんかしていて、本当に危ないですよね。ああいうマナーの悪い人たちを見たりしていると、買う気になれなくて…。でも、家族から、携帯を持ってくれないと不便でしかたない、と文句を言われるんですよ。娘が「お父さんのように年を取っている人でも、簡単に使える携帯があるよ。」と言うのですが、メールは、パソコンで十分ですし…。",
					},
					{
						kind: "question",
						title: "男の人は、携帯電話のことをどう思っていますか。",
						tracks: [34],
						options: ["便利だが、買いたくない", "使い方が難しそうだ", "携帯電話のメールは、不便だ", "年寄りには向いていない"],
					},
					{ kind: "note", text: "買う気になれない＝買いたくない" },
				],
			},
			{
				page: 36,
				blocks: [
					{ kind: "heading", text: "注意" },
					{ kind: "example", text: "会社員／部長／書類／会議 など　→　会社\n先生／学生／テスト／レポート など　→　学校、教室など" },
					{ kind: "example", text: "1人で話している　→　何かの説明をしている／何かについて意見を言っている\n電話をしている　→　何かの予約や約束をしている\nテレビやラジオを聞いている　→　何かの情報を聞いている" },
					{ kind: "heading", text: "れんしゅう（答えは p.92）" },
					{ kind: "paragraph", text: "この問題は、全体としてどんな内容かを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから質問と選択肢を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", tracks: [35], options: ["①", "②", "③", "④"] },
					{ kind: "question", title: "2番", tracks: [36], options: ["①", "②", "③", "④"] },
					{ kind: "note", text: "緊張のしっぱなし／コース" },
				],
			},
		],
	},
	{
		number: 6,
		title: "まとめ問題",
		subtitle: "総合練習",
		firstTrack: 37,
		answerPages: [97, 99, 101, 103],
		pages: [
			{
				page: 37,
				blocks: [
					{ kind: "heading", text: "6　まとめ問題（答えは p.94〜100）" },
					{ kind: "heading", text: "問題I　4点×2問" },
					{ kind: "paragraph", text: "絵を見ながら質問を聞いてください。矢印（→）の人は何と言いますか。1〜3の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", tracks: [37], options: ["①", "②", "③"] },
					{ kind: "note", text: "イラスト：高齢の男性と、矢印で示された女性が向かい合っている場面。" },
					{ kind: "question", title: "2番", tracks: [38], options: ["①", "②", "③"] },
					{ kind: "note", text: "イラスト：机を挟んで会話している二人。矢印は女性。" },
					{ kind: "heading", text: "問題II　4点×3問" },
					{ kind: "paragraph", text: "まず文を聞いてください。それからその返事を聞いて、1〜3の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", tracks: [39], options: ["①", "②", "③"] },
					{ kind: "question", title: "2番", tracks: [40], options: ["①", "②", "③"] },
					{ kind: "question", title: "3番", tracks: [41], options: ["①", "②", "③"] },
				],
			},
			{
				page: 38,
				blocks: [
					{ kind: "heading", text: "問題III　10点×3問" },
					{ kind: "paragraph", text: "まず質問を聞いてください。それから話を聞いて、1〜4の中から最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", tracks: [42], options: ["今すぐ", "今日の6時ごろ", "明日の6時半", "10日後"] },
					{ kind: "question", title: "2番", tracks: [43], options: ["パートIを見る", "パートIIを見る", "パートIを借りに行く", "パートIIを借りに行く"] },
					{ kind: "question", title: "3番", tracks: [44], options: ["車", "車とJR", "JRと地下鉄", "車と地下鉄"] },
				],
			},
			{
				page: 39,
				blocks: [
					{ kind: "heading", text: "問題IV　10点×2問" },
					{ kind: "paragraph", text: "まず質問を聞いてください。そのあと、選択肢を読んでください。読む時間があります。それから話を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", tracks: [45], options: ["佐藤先生にきらわれたから", "今度の試験が難しいと聞いたから", "学校をサボれなくなったから", "卒業ができないかもしれないから"] },
					{ kind: "question", title: "2番", tracks: [46], options: ["田中さんに子どもが2人もいること", "田中さんの子どもが2人とも小さいこと", "田中さんが見た感じよりずっと年を取っていること", "田中さんが見た感じよりずっと若いこと"] },
					{ kind: "heading", text: "問題V　15点×2問" },
					{ kind: "paragraph", text: "この問題は、全体としてどんな内容かを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから質問と選択肢を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", tracks: [47], options: ["①", "②", "③", "④"] },
					{ kind: "question", title: "2番", tracks: [48], options: ["①", "②", "③", "④"] },
				],
			},
		],
	},
];
