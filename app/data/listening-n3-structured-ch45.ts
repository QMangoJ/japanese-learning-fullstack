import type { ListeningStructuredSection } from "./listening-n3-structured-types";

/**
 * 第4章・第5章の本文を、練習書のページ構成に沿ってテキスト化したデータです。
 * 図だけで示されている設問は、図の役割が分かる最小限の説明に置き換えています。
 */
export const chapter4Sections: readonly ListeningStructuredSection[] = [
	{
		number: 1,
		title: "人や物のようす",
		subtitle: "人物・物の描写",
		firstTrack: 2,
		answerPages: [123],
		pages: [
			{
				page: 55,
				blocks: [
					{ kind: "heading", text: "1　人や物のようす" },
					{ kind: "tip", text: "音声を聞く前に、イラストの中の違いを見つけておきましょう！" },
					{ kind: "heading", text: "人の外観" },
					{ kind: "list", items: ["ひげ", "白髪", "背が伸びる", "体重が増える ↔ 減る", "太っている", "スマート", "かっこいい ↔ かっこ悪い", "（洋服などが）似合う", "若く見える ↔ 老けて見える", "年を取る", "ダイエットをする", "やせている"] },
					{ kind: "note", text: "「スマート」は「やせていて、かっこいい」という意味で、英語の smart とは意味が違います。" },
					{ kind: "heading", text: "衣服・身につける物" },
					{ kind: "list", items: ["長そで ↔ 半そで", "柄 ↔ 無地", "派手な服 ↔ 地味な服"] },
					{ kind: "heading", text: "物の形状・大きさ" },
					{ kind: "list", items: ["丸・三角・四角", "丸い", "細長い", "厚い本 ↔ 薄い本", "大・中・小", "SS・S・M・L・LL", "7号・9号・11号", "フリーサイズ", "新品 ↔ 中古"] },
					{ kind: "note", text: "7号・9号・11号は、特に女性の服のサイズ（S・M・Lなど）を言うときに使います。" },
				],
			},
			{
				page: 56,
				blocks: [
					{ kind: "heading", text: "れんしゅう　（答えは p.120）" },
					{ kind: "paragraph", text: "MP3を聞いて、質問の答えとして最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番　イラストの1〜4から、人の外見に合うものを選びましょう。", options: ["①", "②", "③", "④"], tracks: [2] },
					{ kind: "note", text: "語彙：眼鏡（メガネ）／白髪／洋服／花柄／イメージが違う／（髪を）染める" },
					{ kind: "question", title: "2番", options: ["① 黒っぽい無地のソファー", "② 白っぽい無地のソファー", "③ 濃いブルーの柄のソファー", "④ 薄いブルーの柄のソファー"], tracks: [3] },
					{ kind: "note", text: "語彙：白っぽい／黒っぽい／（色が）濃い ↔ 薄い" },
					{ kind: "question", title: "3番", options: ["①", "②", "③", "④"], tracks: [4] },
					{ kind: "note", text: "ワンサイズしかない ＝ サイズは一つしかない。" },
				],
			},
		],
	},
	{
		number: 2,
		title: "場所・方向・位置",
		subtitle: "位置関係",
		firstTrack: 5,
		answerPages: [125],
		pages: [
			{
				page: 57,
				blocks: [
					{ kind: "heading", text: "2　場所・方向・位置" },
					{ kind: "tip", text: "どこから数えるか、どの方向から見るかに注意しましょう！" },
					{ kind: "example", text: "ぼくの好きな子の家は、角から3軒目だよ。／自分の家を入れて数えるんだよ。" },
					{ kind: "heading", text: "地点・方向・位置" },
					{ kind: "list", items: ["上／中／下", "外・外側／内・内側", "真ん中・中心・中央", "横", "隅・隅っこ", "周り", "左端／左側 ↔ 右側／右端", "北・南・東・西"] },
					{ kind: "note", text: "数える用の言い方：〜番目、〜軒目、〜冊目など。" },
					{ kind: "example", text: "左から3つ目。／Aのひとつおいてとなり。" },
					{ kind: "heading", text: "地図・案内図" },
					{ kind: "list", items: ["角", "四つ角・交差点", "向こう", "ななめ向かい", "手前", "向かい・前", "後ろ・裏"] },
				],
			},
			{
				page: 58,
				blocks: [
					{ kind: "heading", text: "れんしゅう　（答えは p.122）" },
					{ kind: "paragraph", text: "MP3を聞いて、質問の答えとして最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番　地図の1〜4から、場所を選びましょう。", options: ["①", "②", "③", "④"], tracks: [5] },
					{ kind: "question", title: "2番", options: ["① 上から2段目の右のほう", "② 上から2段目の左のほう", "③ 上から3段目の左のほう", "④ 一番上の段の右のほう"], tracks: [6] },
					{ kind: "question", title: "3番", options: ["①", "②", "③", "④"], tracks: [7] },
					{ kind: "note", text: "前はイタリアレストランだったところ。" },
				],
			},
		],
	},
	{
		number: 3,
		title: "数・数字・計算",
		subtitle: "数値情報",
		firstTrack: 8,
		answerPages: [127],
		pages: [
			{
				page: 59,
				blocks: [
					{ kind: "heading", text: "3　数・数字・計算" },
					{ kind: "tip", text: "計算がある問題でも、簡単な計算なので落ち着いて聞きましょう！" },
					{ kind: "example", text: "100g 500円の肉を20％引きで1キロ買うといくら？　…ああ、難しい…。" },
					{ kind: "heading", text: "日付に関することば" },
					{ kind: "list", items: ["1日・2日・3日・4日・5日・6日・7日・8日・9日・10日", "14日・19日・20日・24日", "週末", "月末", "年末"] },
					{ kind: "note", text: "14日・19日・20日・24日は読み方に注意しましょう。" },
					{ kind: "heading", text: "日常生活で使う単位" },
					{ kind: "list", items: ["重さ・体重：〜g、〜kg", "長さ・身長：〜mm、〜cm、〜km", "距離：〜km", "割合：〜割、〜率、〜％"] },
					{ kind: "note", text: "〜kg／〜kmは、どちらも「キロ」と言うことが多いです。セールでは、2割引・20％引・20％オフなどをよく使います。" },
					{ kind: "heading", text: "計算に関することば" },
					{ kind: "list", items: ["足す・加える・プラスする", "計・合計", "掛ける", "引く・取る・マイナスする", "割る", "倍・2倍", "差", "2分の1"] },
				],
			},
			{
				page: 60,
				blocks: [
					{ kind: "heading", text: "れんしゅう　（答えは p.124）" },
					{ kind: "paragraph", text: "MP3を聞いて、質問の答えとして最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番　カレンダーの1〜4の印から選びましょう。", options: ["① 4日", "② 8日", "③ 11日", "④ 15日"], tracks: [8] },
					{ kind: "note", text: "1週間先・1週間後。" },
					{ kind: "question", title: "2番", options: ["① 約47キロ", "② 約49キロ", "③ 約51キロ", "④ 約54キロ"], tracks: [9] },
					{ kind: "note", text: "3キロ太る前は何キロ？" },
					{ kind: "question", title: "3番", options: ["①", "②", "③", "④"], tracks: [10] },
					{ kind: "note", text: "15人の中に林さんは入っている？" },
				],
			},
		],
	},
	{
		number: 4,
		title: "順序・比較",
		subtitle: "手順と比較",
		firstTrack: 11,
		answerPages: [129],
		pages: [
			{
				page: 61,
				blocks: [
					{ kind: "heading", text: "4　順序・比較" },
					{ kind: "tip", text: "順序を表すことばや比較を表すパターンに注意しましょう！" },
					{ kind: "example", text: "ぼくの家は君の家ほど大きくないよ。／どっちの家が大きい？" },
					{ kind: "heading", text: "順序を表すことば" },
					{ kind: "list", items: ["初めに・最初に　〜", "次に・2番目に　〜", "最後に・終わりに　〜。", "前は・この前（は）・この間（は）　〜だった。", "次は・この次は　〜だろう。"] },
					{ kind: "note", text: "「今度」の用法に注意：今度の試験は難しかった。（近い過去）／今度、遊びに行きましょう。（近い未来）／今度のテストはがんばろう。（次のテスト）" },
					{ kind: "heading", text: "先後の順序" },
					{ kind: "list", items: ["AしてからBする：食事してから映画を見よう。", "AしたあとBする：食事をしたあと歯を磨こう。", "Aする前にBする：寝る前に歯を磨く。", "AするまでにBする：彼が来るまでに掃除しておく。", "AしようとしたときにBが起こる：家を出ようとしたときに電話が鳴った。"] },
					{ kind: "note", text: "「AしてからBする」の「から」は、順序を表します。" },
					{ kind: "heading", text: "比較を表すパターン" },
					{ kind: "list", items: ["AはBより〜だ。田中さんの家は私の家より大きい。", "AよりBのほうが〜だ。私、コーヒーより紅茶のほうが好きだ。", "Aが最も〜・一番〜だ。私にとってはカナダが最も難しい。", "AはBほど〜ではない。日本では、豚肉は牛肉ほど高くない。", "Aも〜だがBほどじゃない。ニューヨークも車が多いが東京ほどじゃない。", "AはBに比べて〜だ。今日は昨日に比べて暑い。"] },
				],
			},
			{
				page: 62,
				blocks: [
					{ kind: "heading", text: "れんしゅう　（答えは p.126）" },
					{ kind: "paragraph", text: "MP3を聞いて、質問の答えとして最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番　漢字・文法・聴解の点数表から選びましょう。", options: ["① 漢字75点・文法55点・聴解65点", "② 漢字65点・文法45点・聴解70点", "③ 漢字70点・文法60点・聴解55点", "④ 漢字70点・文法40点・聴解70点"], tracks: [11] },
					{ kind: "question", title: "2番", options: ["① 駅", "② コンビニ", "③ 郵便局", "④ 銀行"], tracks: [12] },
					{ kind: "note", text: "お金を下ろす。" },
					{ kind: "question", title: "3番", options: ["①", "②", "③", "④"], tracks: [13] },
				],
			},
		],
	},
	{
		number: 5,
		title: "まとめ問題",
		subtitle: "総合練習",
		firstTrack: 14,
		answerPages: [131, 133, 135],
		pages: [
			{
				page: 63,
				blocks: [
					{ kind: "heading", text: "5　まとめ問題" },
					{ kind: "note", text: "時間：12分　／100　（答えは p.128〜132）" },
					{ kind: "heading", text: "問題I　10点×3問" },
					{ kind: "paragraph", text: "まず質問を聞いてください。それから話を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番　イラストの1〜4から選びましょう。", options: ["①", "②", "③", "④"], tracks: [14] },
					{ kind: "question", title: "2番", options: ["① 900円", "② 1000円", "③ 1080円", "④ 1200円"], tracks: [15] },
					{ kind: "question", title: "3番", options: ["① 買い物する", "② コーヒーを飲む", "③ 会社に行く", "④ タクシーに乗る"], tracks: [16] },
				],
			},
			{
				page: 64,
				blocks: [
					{ kind: "heading", text: "問題II　10点×3問" },
					{ kind: "paragraph", text: "まず質問を聞いてください。そのあと、選択肢を読んでください。読む時間があります。それから話を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", options: ["① 駅と同じ通り", "② マンションの3階", "③ コンビニのとなり", "④ レストランの向かい"], tracks: [17] },
					{ kind: "question", title: "2番", options: ["① デザインが気に入らないから", "② 高級すぎて、今の自分にはもったいないから", "③ 薄すぎて、かっこ悪いから", "④ 父親が気を悪くするから"], tracks: [18] },
					{ kind: "question", title: "3番", options: ["① 間違いを直す", "② みなみ商事に送る", "③ みなみ商事に届ける", "④ 田中さんに取りに来てもらう"], tracks: [19] },
				],
			},
			{
				page: 65,
				blocks: [
					{ kind: "heading", text: "問題III　20点×2問" },
					{ kind: "paragraph", text: "この問題は、全体としてどんな内容かを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから質問と選択肢を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", options: ["①", "②", "③", "④"], tracks: [20] },
					{ kind: "question", title: "2番", options: ["①", "②", "③", "④"], tracks: [21] },
				],
			},
		],
	},
] as const;

export const chapter5Sections: readonly ListeningStructuredSection[] = [
	{
		number: 1,
		title: "問題 I",
		subtitle: "質問を聞いて答える",
		firstTrack: 22,
		answerPages: [137, 139],
		pages: [
			{
				page: 67,
				blocks: [
					{ kind: "heading", text: "第5章　総まとめ問題" },
					{ kind: "note", text: "時間：22分　／100　（答えは p.134〜146）" },
					{ kind: "heading", text: "問題 I　5点×6問" },
					{ kind: "paragraph", text: "まず質問を聞いてください。それから話を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番　イラストの1〜4から選びましょう。", options: ["①", "②", "③", "④"], tracks: [22] },
					{ kind: "note", text: "イラスト：①かさを持って立つ人　②走る人　③かばんを持って走る人　④ベンチで本を読む人。" },
				],
			},
			{
				page: 68,
				blocks: [
					{ kind: "question", title: "2番", options: ["① 午後1時ごろ", "② 午後1時半ごろ", "③ 午後2時ごろ", "④ 午後2時半ごろ"], tracks: [23] },
					{ kind: "question", title: "3番", options: ["① お湯を沸かしておく", "② 炊飯器のスイッチを入れる", "③ お米を洗って、ご飯を炊く", "④ 女の人を駅へ迎えに行く"], tracks: [24] },
					{ kind: "question", title: "4番", options: ["① 1500円", "② 2500円", "③ 2500円", "④ 3000円"], tracks: [25] },
				],
			},
			{
				page: 69,
				blocks: [
					{ kind: "question", title: "5番", options: ["① りんごを取りに行く", "② 病院に行く", "③ おばあちゃんに電話する", "④ 友達の家に行く"], tracks: [26] },
					{ kind: "question", title: "6番", options: ["① レシートを探す", "② 買ったところに電話する", "③ メーカーに電話する", "④ 自分で修理する"], tracks: [27] },
				],
			},
		],
	},
	{
		number: 2,
		title: "問題 II",
		subtitle: "選択肢を読んで答える",
		firstTrack: 28,
		answerPages: [141, 143],
		pages: [
			{
				page: 70,
				blocks: [
					{ kind: "heading", text: "問題II　5点×5問" },
					{ kind: "paragraph", text: "まず質問を聞いてください。そのあと、選択肢を読んでください。読む時間があります。それから話を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", options: ["① 時間を間違えたから", "② 日にちを間違えたから", "③ 前の番組が時間通りに終わらなかったから", "④ 野球の試合が中止になったから"], tracks: [28] },
					{ kind: "question", title: "2番", options: ["① 男の人の釣りに対する考え方に賛成できないから", "② 魚を食べるのはかわいそうだから", "③ 昨日の晩ご飯に誘ってもらえなかったから", "④ 釣りはすべきではないと思っているから"], tracks: [29] },
					{ kind: "question", title: "3番", options: ["① ボーナスで全額返す", "② ボーナスで半分返して、来月の給料日に残りの半分を返す", "③ 来月の給料日に全額返す", "④ 来月までにだれかに借りて全額返す"], tracks: [30] },
				],
			},
			{
				page: 71,
				blocks: [
					{ kind: "question", title: "4番", options: ["① すぐに席を代わってあげる", "② 気がつかないふりをする", "③ 考えているうちに、席を代わってあげる機会をなくす", "④ 次の駅で降りるふりをして、席からはなれる"], tracks: [31] },
					{ kind: "question", title: "5番", options: ["① 海側の和室", "② 山側の洋室", "③ 海側の洋室", "④ 山側の和室"], tracks: [32] },
				],
			},
		],
	},
	{
		number: 3,
		title: "問題 III",
		subtitle: "内容を聞き取る",
		firstTrack: 33,
		answerPages: [145, 147],
		pages: [
			{
				page: 72,
				blocks: [
					{ kind: "heading", text: "問題III　5点×3問" },
					{ kind: "paragraph", text: "この問題は、全体としてどんな内容かを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから質問と選択肢を聞いて、1〜4の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", options: ["①", "②", "③", "④"], tracks: [33] },
					{ kind: "question", title: "2番", options: ["①", "②", "③", "④"], tracks: [34] },
					{ kind: "question", title: "3番", options: ["①", "②", "③", "④"], tracks: [35] },
				],
			},
		],
	},
	{
		number: 4,
		title: "問題 IV",
		subtitle: "場面に合う発話",
		firstTrack: 36,
		answerPages: [147],
		pages: [
			{
				page: 73,
				blocks: [
					{ kind: "heading", text: "問題IV　3点×3問" },
					{ kind: "paragraph", text: "絵を見ながら質問を聞いてください。矢印（➡）の人は何と言いますか。1〜3の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番　レジ係（矢印）と男性の場面。", options: ["①", "②", "③"], tracks: [36] },
					{ kind: "question", title: "2番　運転中の男性と、後部座席の女性（矢印）の場面。", options: ["①", "②", "③"], tracks: [37] },
					{ kind: "question", title: "3番　食事中の4人の場面。矢印の女性が話します。", options: ["①", "②", "③"], tracks: [38] },
				],
			},
		],
	},
	{
		number: 5,
		title: "問題 V",
		subtitle: "即時応答",
		firstTrack: 39,
		answerPages: [149],
		pages: [
			{
				page: 74,
				blocks: [
					{ kind: "heading", text: "問題V　3点×7問" },
					{ kind: "paragraph", text: "まず文を聞いてください。それからその返事を聞いて、1〜3の中から、最もよいものを一つ選んでください。" },
					{ kind: "question", title: "1番", options: ["①", "②", "③"], tracks: [39] },
					{ kind: "question", title: "2番", options: ["①", "②", "③"], tracks: [40] },
					{ kind: "question", title: "3番", options: ["①", "②", "③"], tracks: [41] },
					{ kind: "question", title: "4番", options: ["①", "②", "③"], tracks: [42] },
					{ kind: "question", title: "5番", options: ["①", "②", "③"], tracks: [43] },
					{ kind: "question", title: "6番", options: ["①", "②", "③"], tracks: [44] },
					{ kind: "question", title: "7番", options: ["①", "②", "③"], tracks: [45] },
				],
			},
		],
	},
] as const;
