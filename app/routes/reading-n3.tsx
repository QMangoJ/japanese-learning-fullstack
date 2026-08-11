import { useState } from "react";
import { Link, redirect } from "react-router";

import type { Route } from "./+types/reading-n3";
import "./reading-n3.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "N3 读解 · 第 1 周第 1 日 · 日本語上手" },
		{ name: "description", content: "N3 读解训练：阅读、题目、翻译与逐句语法拆解。" },
	];
}

// Keep old direct links working, while the lesson itself lives in the study shell.
export function loader() {
	return redirect("/study?module=reading");
}

const outline = [
	{ week: "第1週", title: "お知らせや案内を読もう", days: ["案内①", "案内②", "案内③", "試験要項", "日程募集①", "日程募集②", "実戦問題"] },
	{ week: "第2週", title: "身のまわりの文章を読もう", days: ["カタログ①", "カタログ②", "お知らせ", "説明書①", "説明書②", "保証書", "実戦問題"] },
	{ week: "第3週", title: "通信文を読もう", days: ["メール①", "メール②", "手紙・はがき①", "手紙・はがき②", "手紙・はがき③", "FAX（ビジネスレター）", "実戦問題"] },
	{ week: "第4週", title: "新聞を読もう", days: ["見出し", "グラフ①", "グラフ②", "広告①", "広告②", "まんが", "実戦問題"] },
	{ week: "第5週", title: "日記や小説を読もう", days: ["日記①", "日記②", "家族①", "家族②", "小説①", "小説②", "実戦問題"] },
	{ week: "第6週", title: "意見文や説明文を読もう", days: ["意見文①", "意見文②", "意見文③", "計算に関する文章", "医学に関する文章", "社会に関する文章", "実戦問題"] },
];

const dialogue = [
	{ jp: "女子学生：これからどうするの？", cn: "女学生：接下来怎么办？" },
	{ jp: "男子学生：レポート書かないといけないから、中央図書館へ行くつもりなんだ。", cn: "男学生：因为得写报告，我打算去中央图书馆。", grammar: ["〜ないといけない", "〜つもりだ"] },
	{ jp: "女子学生：え？ 今日は第３月曜日だから休みなんじゃないの？", cn: "女学生：咦？今天是第三个星期一，不是休馆吗？", grammar: ["〜んじゃないの？"] },
	{ jp: "男子学生：ううん、開いてるよ。第３月曜日が祝日の場合は次の日が休みになるんだ。", cn: "男学生：不是，开着呢。第三个星期一如果是节假日，第二天才休馆。", grammar: ["〜場合", "〜ことになる"] },
	{ jp: "女子学生：あ、そう。知らなかった。じゃ、明日が休みということね。私も調べたいことがあるから、一緒に行こう。", cn: "女学生：啊，原来如此。我不知道。也就是说，明天休馆。我也有想查的东西，一起去吧。", grammar: ["〜ということ", "〜たい", "〜から"] },
];

const furigana = new Map([
	["中央図書館", "ちゅうおうとしょかん"], ["利用案内", "りようあんない"], ["開館時間", "かいかんじかん"], ["休館日", "きゅうかんび"], ["第３月曜日", "だいさんげつようび"], ["第3月曜日", "だいさんげつようび"], ["次の日", "つぎのひ"], ["祝日", "しゅくじつ"], ["場合", "ばあい"], ["平日", "へいじつ"], ["土曜日", "どようび"], ["日曜日", "にちようび"], ["午前", "ごぜん"], ["午後", "ごご"], ["年末年始", "ねんまつねんし"], ["電気工事", "でんきこうじ"], ["臨時", "りんじ"], ["女子学生", "じょしがくせい"], ["男子学生", "だんしがくせい"], ["図書館", "としょかん"], ["月曜日", "げつようび"], ["明日", "あした"], ["一緒", "いっしょ"], ["説明会", "せつめいかい"], ["会場", "かいじょう"], ["地下鉄", "ちかてつ"], ["出口", "でぐち"], ["信号", "しんごう"], ["新聞", "しんぶん"], ["見出し", "みだし"], ["意見文", "いけんぶん"], ["説明文", "せつめいぶん"], ["学生", "がくせい"], ["理由", "りゆう"], ["具体例", "ぐたいれい"], ["公園", "こうえん"], ["開園", "かいえん"], ["徒歩", "とほ"], ["週末", "しゅうまつ"], ["催し", "もよおし"], ["利用者数", "りようしゃすう"], ["去年", "きょねん"], ["夏休み", "なつやすみ"], ["商品", "しょうひん"], ["売り上げ", "うりあげ"], ["水準", "すいじゅん"], ["契約", "けいやく"], ["無料", "むりょう"], ["配達", "はいたつ"], ["申込書", "もうしこみしょ"], ["会員限定", "かいいんげんてい"], ["金曜日", "きんようび"], ["会員証", "かいいんしょう"], ["登場人物", "とうじょうじんぶつ"], ["表情", "ひょうじょう"], ["気持ち", "きもち"], ["数字", "すうじ"], ["本文", "ほんぶん"], ["高校", "こうこう"], ["友達", "ともだち"], ["時間", "じかん"], ["予定", "よてい"], ["散歩", "さんぽ"], ["午後", "ごご"], ["父", "ちち"], ["家族", "かぞく"], ["朝ご飯", "あさごはん"], ["妹", "いもうと"], ["来年", "らいねん"], ["大学", "だいがく"], ["卒業", "そつぎょう"], ["海外", "かいがい"], ["窓", "まど"], ["外", "そと"], ["子ども", "こども"], ["住んでいた町", "すんでいたまち"], ["約束", "やくそく"], ["近く", "ちかく"], ["便利", "べんり"], ["必要", "ひつよう"], ["地域", "ちいき"], ["若い人", "わかいひと"], ["基本料金", "きほんりょうきん"], ["使用", "しよう"], ["電気", "でんき"], ["金額", "きんがく"], ["薬", "くすり"], ["食後", "しょくご"], ["症状", "しょうじょう"], ["医師", "いし"], ["買い物", "かいもの"], ["結論", "けつろん"], ["筆者", "ひっしゃ"],
]);
const furiganaPattern = new RegExp(`(${[...furigana.keys()].sort((a, b) => b.length - a.length).join("|")})`, "g");

function FuriganaText({ text }: { text: string }) {
	return <>{text.split(furiganaPattern).map((part, index) => {
		const reading = furigana.get(part);
		return reading ? <ruby key={`${part}-${index}`}>{part}<rt>{reading}</rt></ruby> : part;
	})}</>;
}

const grammarNotes: Record<string, string> = {
	"〜ないといけない": "动词ない形 + といけない，表示“必须……”。书面和口语里也常见 〜なければならない。",
	"〜つもりだ": "动词基本形 + つもりだ，表示已经有的打算或意图。这里的 行くつもり 表示“打算去”。",
	"〜んじゃないの？": "〜のではないか 的口语形式。这里不是否定，而是在确认“不是应该休馆吗？”。",
	"〜場合": "名词 + の場合 / 普通形 + 場合，表示“在……情况下”。",
	"〜ことになる": "表示由规定、规则或外部安排导致的结果。这里是“会变成第二天休馆”。",
	"〜ということ": "用于归纳、转述已经得知的信息，相当于“也就是说……”。",
	"〜たい": "动词ます形去掉ます + たい，表达说话人自己的愿望。",
	"〜から": "连接原因与结果，表示“因为……所以……”。",
};

const questions = [
	{ id: "dialogue-1", prompt: "次の会話文を読んで、後の文から正しいものを選ぼう。", cnPrompt: "根据对话，哪一项正确？", options: [{ jp: "今日は祝日である。", cn: "今天是节假日。" }, { jp: "今日、図書館は休みである。", cn: "今天图书馆休馆。" }, { jp: "男子学生は今日が第3月曜日だということを知らなかった。", cn: "男学生不知道今天是第三个星期一。" }, { jp: "女子学生は最初、今日は図書館が休みだと思っていた。", cn: "女学生一开始以为今天图书馆休馆。" }, { jp: "明日は火曜日で図書館は開いている。", cn: "明天是星期二，图书馆开放。" }], answer: 3, explanation: "女学生看到“第三个星期一”便以为休馆；男学生说明，第三个星期一恰逢节假日时，休馆日改到次日。" },
	{ id: "guide-1", prompt: "この図書館で、使用できないのはどの場合か。", cnPrompt: "在这所图书馆，哪种情况不能使用？", options: [{ jp: "児童室を午前中に使用する場合", cn: "上午使用儿童室" }, { jp: "10月の第3金曜日に20時まで使用する場合", cn: "10 月第三个星期五使用到 20 点" }, { jp: "第3月曜日が祝日の場合", cn: "第三个星期一是节假日" }, { jp: "10月10日の正午から午後2時", cn: "10 月 10 日中午到下午 2 点" }], answer: 3, explanation: "通知写明 10 月 1 日至 10 日因电气工程临时休馆，因此 10 月 10 日无法使用。" },
	{ id: "guide-2", prompt: "この案内の内容と合っているものはどれか。", cnPrompt: "下列哪项符合利用指南？", options: [{ jp: "この図書館は、第3月曜日とその翌日は閉まっている。", cn: "第三个星期一及次日都闭馆" }, { jp: "この図書館は、第3月曜日と年末年始以外は開いている。", cn: "除第三个星期一和年末年初外都开馆" }, { jp: "この図書館では、児童室を毎日図書館の閉館まで使用できる。", cn: "儿童室每天可使用至闭馆" }, { jp: "この図書館は、休館日以外にも臨時で休む日がある。", cn: "除休馆日外有临时休馆日" }], answer: 3, explanation: "儿童室只开放到 18 点；第三个星期一遇节假日时次日休馆；并且有 10 月临时休馆日。因此第 4 项正确。" },
];

type LessonSeed = {
	passage: string;
	translation: string;
	grammar: [string, string][];
	question: string;
	options: string[];
	answer: number;
	explanation: string;
};

const lessonSeeds: LessonSeed[] = [
	{ passage: "説明会の会場は、地下鉄さくら園駅の5番出口からタワービル方面へ歩き、4つ目の信号で左に曲がった先にあります。", translation: "说明会会场从地铁樱园站 5 号出口朝塔楼方向走，在第四个红绿灯左转后即可到达。", grammar: [["〜方面へ", "表示移动的方向，意为“朝着……方向”。"], ["〜た先に", "表示完成某动作之后，前方或后续的位置。"]], question: "会場へ行くには、どこで左に曲がりますか。", options: ["5番出口", "4つ目の信号", "タワービルの前"], answer: 1, explanation: "案内明确写着“4つ目の信号で左折”。" },
	{ passage: "美術館では、特別展の期間中は入口が東側に変わります。チケット売り場は通常どおり1階です。", translation: "美术馆在特别展览期间入口改到东侧，售票处仍在一楼。", grammar: [["〜期間中", "表示“在……期间”。"], ["通常どおり", "表示“和往常一样、照常”。"]], question: "特別展の期間中、変わるものは何ですか。", options: ["入口", "チケット売り場", "1階"], answer: 0, explanation: "发生变化的是入口的位置，售票处不变。" },
	{ passage: "受験票は試験日の一週間前までに郵送します。届かない場合は、試験日の三日前までに事務局へ連絡してください。", translation: "准考证会在考试日前一周前邮寄。如未收到，请在考试日前三天联系事务局。", grammar: [["〜までに", "表示动作完成的截止时间。"], ["届かない場合", "表示“如果没有收到”的条件。"]], question: "受験票が届かないとき、いつまでに連絡しますか。", options: ["試験日の一週間前", "試験日の三日前", "試験日の後"], answer: 1, explanation: "试验要项规定最晚在考试日前三天联系。" },
	{ passage: "日本語講座の申込期間は5月10日から20日までです。定員を超えた場合は、抽選で受講者を決めます。", translation: "日语课程申请期为 5 月 10 日至 20 日。超过名额时将抽签决定学员。", grammar: [["定員を超えた場合", "表示“超过名额时”的条件。"], ["抽選で", "表示以抽签这种方式进行。"]], question: "申込者が多い場合、どうなりますか。", options: ["講座が中止になる", "抽選になる", "期間が延びる"], answer: 1, explanation: "超过定员时通过抽签决定。" },
	{ passage: "地域イベントのスタッフを募集しています。参加できるのは、土曜日の午前9時から午後3時までです。", translation: "正在招募地区活动工作人员。活动时间为周六上午 9 点至下午 3 点。", grammar: [["〜している", "表示正在进行的状态，这里是“正在招募”。"], ["〜できる", "表示能力或可能性，这里是“可以参加”。"]], question: "スタッフはいつ参加しますか。", options: ["土曜日の午前から午後", "日曜日の午後", "平日の夜"], answer: 0, explanation: "募集说明指定了周六 9 点到 15 点。" },
	{ passage: "次の案内を読んで、日時・場所・例外条件を一つずつ確認しましょう。", translation: "阅读以下指南，分别确认日期、地点和例外条件。", grammar: [["〜ずつ", "表示逐一、每一个都要做。"], ["確認する", "表示核对或确认信息。"]], question: "案内を読むとき、特に何を確認しますか。", options: ["日時・場所・例外", "作者の名前", "文章の長さ"], answer: 0, explanation: "实战题的重点是定位日期、地点及例外条件。" },
	{ passage: "このカタログの商品は、注文から三日以内に発送します。ただし、在庫がない場合はメールでお知らせします。", translation: "本目录商品会在下单后三日内发货。但若无库存，会通过邮件通知。", grammar: [["〜以内に", "表示在某个时间范围以内。"], ["在庫がない場合", "表示“没有库存时”的条件。"]], question: "在庫がない場合、店はどうしますか。", options: ["メールで知らせる", "すぐ発送する", "電話をしない"], answer: 0, explanation: "目录中写明缺货时会用邮件通知。" },
	{ passage: "新しいカメラは防水機能付きで、旅行やスポーツのときにも使えます。充電には専用のケーブルが必要です。", translation: "新相机带防水功能，旅行和运动时也能使用。充电需要专用线缆。", grammar: [["〜付き", "表示附带某种功能或物品。"], ["〜にも", "表示在某种情况下也同样适用。"]], question: "カメラの充電に必要なものは何ですか。", options: ["専用のケーブル", "防水ケース", "新しい電池"], answer: 0, explanation: "说明中明确要求使用专用线缆充电。" },
	{ passage: "館内では携帯電話をマナーモードにしてください。通話はロビーでお願いします。", translation: "馆内请将手机调成静音模式。通话请到大厅进行。", grammar: [["〜にしてください", "礼貌地要求对方做某事。"], ["〜でお願いします", "表示请求在某个地点或方式下进行。"]], question: "電話で話すとき、どこへ行きますか。", options: ["ロビー", "館内の席", "入口の外だけ"], answer: 0, explanation: "通知要求通话在大厅进行。" },
	{ passage: "この機械を使う前に、電源コードがぬれていないことを確認してください。異常があるときは使用を中止します。", translation: "使用本机器前请确认电源线没有受潮。发现异常时停止使用。", grammar: [["〜前に", "表示动作之前的时间点。"], ["〜ことを確認する", "表示确认某一事实。"]], question: "異常がある場合、どうしますか。", options: ["使用を中止する", "水で洗う", "そのまま使う"], answer: 0, explanation: "说明书要求遇到异常立即停止使用。" },
	{ passage: "フィルターは一か月に一度、取り外して水洗いしてください。洗った後は、完全に乾いてから取り付けます。", translation: "滤网请每月取下清洗一次。洗后完全干燥再装回。", grammar: [["〜てから", "表示一个动作完成后再进行下一个动作。"], ["完全に", "表示“完全地、充分地”。"]], question: "フィルターはいつ取り付けますか。", options: ["完全に乾いてから", "洗う前", "毎日"], answer: 0, explanation: "顺序是清洗、完全干燥、再安装。" },
	{ passage: "保証期間は購入日から一年間です。修理を依頼するときは、保証書とレシートを一緒に持ってきてください。", translation: "保修期自购买日起一年。申请维修时，请同时带上保修卡和收据。", grammar: [["〜から一年間", "表示从某一日期起持续一年的期间。"], ["〜ときは", "表示“在……的时候”的条件。"]], question: "修理を頼むとき、何が必要ですか。", options: ["保証書とレシート", "カタログだけ", "写真だけ"], answer: 0, explanation: "保修卡和收据是维修时需要携带的材料。" },
	{ passage: "身のまわりの文章では、使える時間・注意事項・問い合わせ先を探す練習をします。", translation: "日常生活中的文章练习，要找出可使用的时间、注意事项和咨询方式。", grammar: [["〜では", "表示在某个范围或场合中。"], ["〜を探す", "表示主动寻找目标信息。"]], question: "この週で探す情報はどれですか。", options: ["時間・注意・連絡先", "作者の趣味", "漢字の数"], answer: 0, explanation: "这些是日常说明文的核心信息。" },
	{ passage: "会議の日程を変更したい場合は、今日の午後5時までに返信してください。都合が悪い人は別の日を提案できます。", translation: "如想修改会议日程，请在今天下午 5 点前回复。不方便的人可以提出其他日期。", grammar: [["〜たい場合", "表示“想要……时”的条件。"], ["〜までに返信する", "表示在截止时间前回复。"]], question: "日程を変えたい人は、いつまでに返信しますか。", options: ["今日の午後5時", "明日の朝", "来週"], answer: 0, explanation: "邮件明确指定今天下午 5 点为截止。" },
	{ passage: "資料を添付しましたので、ご確認ください。分からない点があれば、遠慮なく質問してください。", translation: "已附上资料，请确认。如有不明之处，请不要客气地提问。", grammar: [["〜ので", "较礼貌地连接原因与后续请求。"], ["〜があれば", "表示“如果有……的话”。"]], question: "分からない点がある場合、どうしますか。", options: ["質問する", "資料を捨てる", "返信しない"], answer: 0, explanation: "邮件鼓励对不明白的部分提出问题。" },
	{ passage: "先日はお世話になりました。来週の説明会に参加したいと思っていますので、よろしくお願いいたします。", translation: "前些日子承蒙关照。我想参加下周说明会，敬请关照。", grammar: [["お世話になりました", "用于感谢过去得到的关照。"], ["〜たいと思っています", "较柔和地表达持续的意愿。"]], question: "書き手は何をしたいですか。", options: ["説明会に参加したい", "引っ越したい", "商品を返したい"], answer: 0, explanation: "信中说明想参加下周的说明会。" },
	{ passage: "荷物は不在の場合、管理人室でお預かりします。受け取る際は身分証明書をお持ちください。", translation: "若收件人不在，包裹由管理室代为保管。领取时请携带身份证明。", grammar: [["不在の場合", "表示“人不在时”的条件。"], ["〜際は", "书面语，表示“在……之际”。"]], question: "荷物を受け取るとき、何を持っていきますか。", options: ["身分証明書", "招待状", "保証書"], answer: 0, explanation: "领取包裹需要出示身份证明。" },
	{ passage: "同窓会は11月3日に駅前ホテルで行います。出席できない場合も、10月15日までにご返事ください。", translation: "同学会于 11 月 3 日在车站前酒店举行。即使不能出席，也请在 10 月 15 日前回复。", grammar: [["〜場合も", "表示即使在某种情况下也同样成立。"], ["ご返事ください", "礼貌地要求回复。"]], question: "出席できない人も何をしますか。", options: ["10月15日までに返事する", "ホテルへ行く", "何もしない"], answer: 0, explanation: "不能出席也必须在截止日前回复。" },
	{ passage: "資料の送付先を変更しました。今後は新しい住所へFAXを送ってください。", translation: "资料寄送地址已变更。今后请将传真发往新地址。", grammar: [["今後は", "表示从现在开始、以后。"], ["〜へ送る", "表示寄送或发送的对象、目的地。"]], question: "今後、資料はどこへ送りますか。", options: ["新しい住所", "前の住所", "駅前ホテル"], answer: 0, explanation: "传真通知要求今后发送到新地址。" },
	{ passage: "通信文では、差出人・宛先・日時・依頼内容を結び付けて読むことが大切です。", translation: "阅读通信文时，把发件人、收件人、日期和请求内容联系起来理解很重要。", grammar: [["〜ことが大切", "表示做某事很重要。"], ["結び付けて", "表示把多个信息关联起来。"]], question: "通信文を読むとき、何を結び付けますか。", options: ["差出人・宛先・日時・依頼", "写真・色・値段", "漢字・音楽・地図"], answer: 0, explanation: "实战题考查把通信文关键信息关联起来的能力。" },
];

const laterLessonSeeds: LessonSeed[] = [
	{ passage: "市は来月、新しい公園を開園します。駅から徒歩五分で、週末には子ども向けの催しも開かれます。", translation: "市政府将于下月开放一座新公园。它距车站步行五分钟，周末还将举办面向儿童的活动。", grammar: [["〜を開園する", "表示设施正式开放。"], ["〜向け", "表示面向某个对象。"]], question: "公園について、正しいものはどれですか。", options: ["駅から歩いて行ける", "毎日休館する", "大人だけが入れる"], answer: 0, explanation: "标题和正文都要先抓地点、时间及对象等事实信息。" },
	{ passage: "次のグラフは、三年間の図書館利用者数の変化を表しています。去年は夏休みの利用が最も多くなりました。", translation: "下图显示三年来图书馆使用人数的变化。去年暑假期间的使用人数最多。", grammar: [["〜を表す", "表示图表所呈现的内容。"], ["最も〜", "表示在比较中程度最高。"]], question: "去年、利用者が最も多かったのはいつですか。", options: ["夏休み", "春", "年末"], answer: 0, explanation: "先读图表标题，再比对表示最高值的项目。" },
	{ passage: "商品の売り上げは四月から六月にかけて増え、その後はほぼ同じ水準で推移しています。", translation: "商品销售额从四月到六月持续增加，之后基本维持在相同水平。", grammar: [["〜にかけて", "表示从一个时间范围延续到另一个时间。"], ["推移する", "表示数值或情况逐渐变化。"]], question: "六月の後、売り上げはどうなりましたか。", options: ["ほぼ変わらなかった", "急に下がった", "毎月増えた"], answer: 0, explanation: "“ほぼ同じ水準”就是数值基本没有变化。" },
	{ passage: "今月末までにご契約いただいた方には、無料で配達します。申込書は店頭またはウェブサイトからご利用ください。", translation: "在本月末前签约的顾客可享受免费配送。申请表可在店内或网站获取。", grammar: [["〜までに", "表示完成动作的截止时间。"], ["〜いただいた方", "礼貌地指完成该动作的人。"]], question: "無料配達を利用できるのは誰ですか。", options: ["今月末までに契約した人", "全ての来店者", "来月に申し込む人"], answer: 0, explanation: "广告中的优惠总要确认期限和适用对象。" },
	{ passage: "会員限定セールは金曜日から日曜日までです。レジで会員証を見せると、表示価格から二割引きになります。", translation: "会员限定促销从周五至周日。结账时出示会员卡可在标价基础上享受八折。", grammar: [["限定", "表示仅限于某个范围。"], ["〜と", "表示满足前项时会自然产生后项结果。"]], question: "割引を受けるために必要なものは何ですか。", options: ["会員証", "新聞", "予約票"], answer: 0, explanation: "广告条件写在“レジで会員証を見せると”之后。" },
	{ passage: "このまんがでは、登場人物の表情や短いせりふから、相手の本当の気持ちを考えます。", translation: "这则漫画通过人物表情和简短台词，要求推测对方真正的心情。", grammar: [["〜から", "表示判断的依据。"], ["本当の気持ち", "指没有直接说出的真实想法。"]], question: "まんがを読むとき、何を手がかりにしますか。", options: ["表情とせりふ", "長い説明文", "地図"], answer: 0, explanation: "漫画题的依据常在表情、动作和话语之间。" },
	{ passage: "新聞を読むときは、見出しだけで判断せず、数字・グラフ・本文の関係を確かめましょう。", translation: "阅读报纸时，不要只凭标题判断，要核对数字、图表和正文之间的关系。", grammar: [["〜ず", "表示不做前项动作而进行后项。"], ["確かめる", "表示核实信息。"]], question: "新聞の内容を正しく理解するには何が必要ですか。", options: ["見出しと本文を合わせて読む", "見出しだけを見る", "写真だけを見る"], answer: 0, explanation: "实战题检验是否能将标题、数据和正文相互验证。" },
	{ passage: "昨日は久しぶりに高校の友達と会った。話しているうちに、時間がたつのを忘れてしまった。", translation: "昨天久违地见了高中朋友。聊着聊着就忘记了时间。", grammar: [["〜うちに", "表示在某段时间内不知不觉发生变化。"], ["〜てしまう", "表示动作完成，也可含意外或遗憾。"]], question: "書き手は昨日どうしましたか。", options: ["高校の友達と会った", "引っ越した", "試験を受けた"], answer: 0, explanation: "日记题先确认是谁、何时、做了什么。" },
	{ passage: "朝から雨だったので、予定していた散歩をやめて、家で本を読んだ。午後には空が明るくなった。", translation: "因为从早上开始下雨，取消了原定的散步，在家读书。下午天空放晴了。", grammar: [["〜ので", "表示原因。"], ["予定していた", "表示事先已经安排好的事情。"]], question: "書き手はなぜ散歩をやめましたか。", options: ["雨だったから", "本がなかったから", "午後だったから"], answer: 0, explanation: "日记里的原因通常紧跟在结果之前。" },
	{ passage: "父は忙しいけれど、毎週日曜日には家族のために朝ご飯を作ってくれる。", translation: "父亲虽然很忙，但每周日都会为家人做早餐。", grammar: [["〜けれど", "表示转折。"], ["〜てくれる", "表示别人为说话人一方做某事。"]], question: "父は日曜日に何をしますか。", options: ["朝ご飯を作る", "会社へ行く", "旅行する"], answer: 0, explanation: "“けれど”之后是需要重点确认的事实。" },
	{ passage: "妹は来年大学を卒業したら、海外で働きたいと言っている。家族は応援することにした。", translation: "妹妹说明年大学毕业后想去海外工作。家人决定支持她。", grammar: [["〜たら", "表示假定或某动作完成后的条件。"], ["〜ことにした", "表示作出了决定。"]], question: "家族はどうすることにしましたか。", options: ["妹を応援する", "妹を止める", "一緒に留学する"], answer: 0, explanation: "人物关系题要区分谁的愿望和谁的决定。" },
	{ passage: "彼は窓の外を見ながら、子どものころに住んでいた町のことを思い出していた。", translation: "他望着窗外，想起了小时候住过的城镇。", grammar: [["〜ながら", "表示两个动作同时进行。"], ["〜ていた", "表示过去持续的状态。"]], question: "彼は何を思い出していましたか。", options: ["子どものころの町", "昨日の試験", "新しい仕事"], answer: 0, explanation: "小说题的答案通常来自人物的回忆、心情或行动。" },
	{ passage: "駅に着いたとき、彼女は約束の時間より十分早いことに気づいた。そこで近くの店でコーヒーを買った。", translation: "到车站时，她发现比约定时间早了十分钟，于是在附近店里买了咖啡。", grammar: [["〜ことに気づく", "表示注意到某个事实。"], ["そこで", "表示基于前项情况采取的后续行动。"]], question: "彼女はなぜコーヒーを買いましたか。", options: ["時間が早かったから", "駅を間違えたから", "約束を忘れたから"], answer: 0, explanation: "“そこで”连接的是原因和由此采取的行动。" },
	{ passage: "日記や小説では、書かれていない気持ちも、行動や場面の変化から読み取ることが大切です。", translation: "阅读日记和小说时，也要从行为和场景变化中读出没有明说的情绪。", grammar: [["書かれていない", "表示没有直接写出的内容。"], ["読み取る", "表示从线索中理解隐含信息。"]], question: "日記や小説で大切なことは何ですか。", options: ["行動から気持ちを考える", "数字だけを探す", "住所を覚える"], answer: 0, explanation: "实战题会要求根据行为推断人物心情。" },
	{ passage: "私は学校の図書館をもっと長く開けるべきだと思う。放課後に勉強したい学生が多いからだ。", translation: "我认为学校图书馆应该开放得更久，因为有很多学生想在放学后学习。", grammar: [["〜べきだ", "表示说话人的主张或应该做的事。"], ["〜からだ", "用于说明理由。"]], question: "書き手の意見は何ですか。", options: ["図書館を長く開けるべきだ", "図書館を閉めるべきだ", "学生は勉強しないべきだ"], answer: 0, explanation: "意见文先找结论性的“〜べきだ”“と思う”。" },
	{ passage: "便利なサービスでも、使いすぎると時間を無駄にすることがある。自分に必要かどうか考えて利用したい。", translation: "即使是方便的服务，使用过度有时也会浪费时间。我想先考虑是否真正需要再使用。", grammar: [["〜ても", "表示即便具备前项条件，后项仍成立。"], ["〜かどうか", "表示是否如此的不确定判断。"]], question: "書き手はサービスをどう使いたいですか。", options: ["必要か考えて使いたい", "できるだけ長く使いたい", "全く使いたくない"], answer: 0, explanation: "作者的主张常出现在段末的“〜たい”。" },
	{ passage: "地域の祭りを続けるには、若い人にも準備に参加してもらう必要がある。", translation: "要延续地区的节日活动，需要让年轻人也参与筹备。", grammar: [["〜には", "表示为了实现某目标所需的条件。"], ["〜必要がある", "表示有必要做某事。"]], question: "祭りを続けるために必要なことは何ですか。", options: ["若い人の参加", "祭りを減らすこと", "会場を閉めること"], answer: 0, explanation: "说明文会明确提出达成目标所需的条件。" },
	{ passage: "この料金は、基本料金に使用した電気の量に応じた金額を足して計算します。", translation: "该费用由基本费用加上根据实际用电量计算的金额构成。", grammar: [["〜に応じた", "表示按照某个标准而变化。"], ["足して", "表示把数值相加。"]], question: "料金は何によって変わりますか。", options: ["使った電気の量", "家の色", "曜日だけ"], answer: 0, explanation: "计算类文章的关键是公式、单位和变化条件。" },
	{ passage: "薬は食後に水と一緒に飲んでください。症状がよくならない場合は、医師に相談しましょう。", translation: "请在饭后用水服药。如果症状没有好转，请咨询医生。", grammar: [["食後", "表示吃饭之后。"], ["〜場合は", "表示条件下的处理方式。"]], question: "症状がよくならないとき、どうしますか。", options: ["医師に相談する", "薬を倍にする", "すぐ運動する"], answer: 0, explanation: "医疗说明题必须按条件对应正确处理方法。" },
	{ passage: "ごみを減らすためには、買い物のときに必要な物だけを選び、使える物はできるだけ長く使うことが大切です。", translation: "为了减少垃圾，购物时只选择必需品，并尽量长期使用还能用的东西很重要。", grammar: [["〜ためには", "表示目的。"], ["できるだけ", "表示尽可能地。"]], question: "ごみを減らすために、書き手は何を勧めていますか。", options: ["必要な物だけを買う", "毎日新しい物を買う", "使える物を捨てる"], answer: 0, explanation: "社会类文章重在目的、措施和结论之间的因果关系。" },
	{ passage: "意見文や説明文では、筆者の結論と、それを支える理由・具体例を分けて読む練習をします。", translation: "阅读意见文和说明文时，练习区分作者结论，以及支撑结论的理由和具体例。", grammar: [["〜を支える", "表示为某个观点提供依据。"], ["分けて読む", "表示分类后理解文章结构。"]], question: "意見文を読むとき、何を分けますか。", options: ["結論と理由・例", "名前と住所", "文字と数字"], answer: 0, explanation: "实战题考查能否辨别主张、理由和具体事例。" },
];

const allLessonSeeds = [...lessonSeeds, ...laterLessonSeeds];

const readingLessons = outline.flatMap((week, weekIndex) => week.days.map((title, dayIndex) => {
	const index = weekIndex * 7 + dayIndex;
	const seed = index === 0 ? null : allLessonSeeds[index - 1];
	return { index, week: weekIndex + 1, day: dayIndex + 1, title, subtitle: week.title, seed };
}));

function FuriganaTitle() {
	return <ruby>案内<rt>あんない</rt></ruby>;
}

function LessonNavigator({ index, onSelect }: { index: number; onSelect: (index: number) => void }) {
	const previous = readingLessons[index - 1];
	const next = readingLessons[index + 1];
	return <nav className="reader-day-nav" aria-label="读解日程切换">
		<button disabled={!previous} onClick={() => previous && onSelect(previous.index)}>{previous ? <><small>上一日</small><b>第{previous.week}週 {previous.day}日目 · {previous.title}</b></> : "已经是第一日"}</button>
		<button disabled={!next} onClick={() => next && onSelect(next.index)}>{next ? <><small>下一日</small><b>第{next.week}週 {next.day}日目 · {next.title}</b></> : "已经是最后一日"}</button>
	</nav>;
}

function ReadingCatalog({ embedded, onSelect }: { embedded: boolean; onSelect: (index: number) => void }) {
	const [openWeeks, setOpenWeeks] = useState(() => new Set([1]));
	const descriptions = ["阅读各种启事和指南", "阅读身边常见的说明文字", "阅读邮件、书信等通信文", "阅读新闻与图表", "阅读日记与小说", "阅读意见文与说明文"];
	const toggleWeek = (week: number) => setOpenWeeks((current) => {
		const next = new Set(current);
		next.has(week) ? next.delete(week) : next.add(week);
		return next;
	});
	return <div className={embedded ? "reader-page reader-page--embedded" : "reader-page"}><div className="reader-wrap reader-layout"><main className="reader-main reader-catalog">
		<div className="reader-catalog-intro"><span>N3 読解</span><h1>N3 读解训练</h1><p>6 周 · 共 42 天 · 点击进入每日读解</p></div>
		{outline.map((week, weekIndex) => {
			const isOpen = openWeeks.has(weekIndex + 1);
			return <section className="reader-week-card reader-course-week" key={week.week}><button className="reader-week-card__toggle reader-week-toggle" onClick={() => toggleWeek(weekIndex + 1)} aria-expanded={isOpen}><div><span>{week.week}</span><h2><FuriganaText text={week.title} /></h2><p>{descriptions[weekIndex]}</p></div><b>7 天　{isOpen ? "▾" : "▸"}</b></button>{isOpen && <div className="reader-day-list">{readingLessons.filter((lesson) => lesson.week === weekIndex + 1).map((lesson) => <button className="reader-course-day" key={lesson.index} onClick={() => onSelect(lesson.index)}><span>{lesson.day}日目{lesson.day === 7 ? " · 实战" : ""}</span><b><FuriganaText text={lesson.title} /></b><small>读解练习 · 翻译 · 语法拆解</small></button>)}</div>}</section>;
		})}
	</main></div></div>;
}

function GenericLessonDetail({ lesson, embedded, onBack, onSelect }: { lesson: typeof readingLessons[number]; embedded: boolean; onBack: () => void; onSelect: (index: number) => void }) {
	const [showTranslation, setShowTranslation] = useState(true);
	const [showGrammar, setShowGrammar] = useState(false);
	const [selected, setSelected] = useState<number | null>(null);
	const [revealed, setRevealed] = useState(false);
	const seed = lesson.seed!;
	return <div className={embedded ? "reader-page reader-page--embedded" : "reader-page"}><div className="reader-wrap reader-layout"><main className="reader-main">
		<section className="reader-hero reader-studybar"><div className="reader-breadcrumb"><span>N3 読解</span><span>/</span><b>第{lesson.week}週 {lesson.day}日目</b></div><div className="reader-studybar__body"><div><button className="reader-back" onClick={onBack}>‹ 读解目录</button><span>第{lesson.week}週 ／ {lesson.day}日目</span><h1><FuriganaText text={lesson.title} /></h1><p><FuriganaText text={lesson.subtitle} /></p></div><div className="reader-controls"><button className={showTranslation ? "on" : ""} onClick={() => setShowTranslation((value) => !value)}>翻译 {showTranslation ? "显示中" : "已隐藏"}</button><button className={showGrammar ? "on" : ""} onClick={() => setShowGrammar((value) => !value)}>语法拆解 {showGrammar ? "显示中" : "已隐藏"}</button></div></div></section>
		<section className="reader-section"><div className="reader-section-head"><span>読解ポイント</span><h2><FuriganaText text={`${lesson.title}を読もう`} /></h2>{showTranslation && <p>先定位关键信息，再用选项回到原文验证。</p>}</div><article className="reading-passage"><p className="jp"><FuriganaText text={seed.passage} /></p>{showTranslation && <p className="translation">{seed.translation}</p>}{showGrammar && <div className="grammar-pills grammar-pills--detail">{seed.grammar.map(([pattern, explanation]) => <details key={pattern} open><summary>{pattern}</summary><p>{explanation}</p></details>)}</div>}</article></section>
		<section className="reader-section quiz-section"><div className="reader-section-head"><span>チェック</span><h2>問題</h2>{showTranslation && <p>选择后展开依据与解析。</p>}</div><article className="reading-question"><h3>{seed.question}</h3><div className="question-options">{seed.options.map((option, optionIndex) => <button key={option} className={selected === optionIndex ? "selected" : ""} onClick={() => setSelected(optionIndex)}><span>{optionIndex + 1}</span><span className="question-option-text">{option}</span></button>)}</div><div className="answer-row"><button onClick={() => setRevealed((value) => !value)}>{revealed ? "隐藏解析" : "显示答案与解析"}</button>{revealed && <p><b>正确答案：{seed.answer + 1}</b>{seed.explanation}<br />阅读依据：先找题干对应的时间、对象或条件词，再排除没有被原文支持的选项。</p>}</div></article></section>
		<LessonNavigator index={lesson.index} onSelect={onSelect} />
	</main></div></div>;
}

export function ReadingN3Content({ embedded = false }: { embedded?: boolean }) {
	const [activeLesson, setActiveLesson] = useState<number | null>(null);
	const [showTranslation, setShowTranslation] = useState(true);
	const [showGrammar, setShowGrammar] = useState(false);
	const [selected, setSelected] = useState<Record<string, number>>({});
	const [revealed, setRevealed] = useState<Record<string, boolean>>({});

	if (activeLesson === null) return <ReadingCatalog embedded={embedded} onSelect={setActiveLesson} />;
	if (activeLesson !== 0) return <GenericLessonDetail lesson={readingLessons[activeLesson]} embedded={embedded} onBack={() => setActiveLesson(null)} onSelect={setActiveLesson} />;

	return (
		<div className={embedded ? "reader-page reader-page--embedded" : "reader-page"}>
			<header className="reader-header"><div className="reader-wrap"><Link to="/" className="reader-brand">日本語上手</Link><nav><Link to="/study">知识库</Link><Link to="/reading/n3" aria-current="page">N3 读解</Link></nav><Link className="reader-try" to="/study">进入学习区</Link></div></header>
			<div className="reader-wrap reader-layout">
				<aside className="reader-outline" aria-label="N3读解课程目录">
					<div className="outline-top"><span>N3 読解</span><h2>読解練習</h2><p>文章を読んで、根拠を見つけよう。</p></div>
					{outline.map((item, index) => <section key={item.week}><div className="outline-week"><b>{item.week}</b></div><p className="outline-title">{item.title}</p><ol>{item.days.map((day, dayIndex) => <li className={index === 0 && dayIndex === 0 ? "current" : "locked"} key={day}><span>{dayIndex + 1}</span>{day}{index === 0 && dayIndex === 0 ? <em>学習中</em> : <i>準備中</i>}</li>)}</ol></section>)}
				</aside>

				<main className="reader-main">
					<section className="reader-hero reader-studybar"><div className="reader-breadcrumb"><span>N3 読解</span><span>/</span><b>第1週 1日目</b></div><div className="reader-studybar__body"><div><button className="reader-back" onClick={() => setActiveLesson(null)}>‹ 读解目录</button><span>第1週 ／ 1日目</span><h1><FuriganaTitle /> ①</h1><p>お知らせや案内を読もう</p></div><div className="reader-controls"><button className={showTranslation ? "on" : ""} onClick={() => setShowTranslation((value) => !value)}>翻译 {showTranslation ? "显示中" : "已隐藏"}</button><button className={showGrammar ? "on" : ""} onClick={() => setShowGrammar((value) => !value)}>语法拆解 {showGrammar ? "显示中" : "已隐藏"}</button></div></div></section>

					<section className="reader-section reading-dialogue"><div className="reader-section-head"><span>れんしゅう</span><h2>日時を正しく読もう！</h2>{showTranslation && <p>日期和时间要读准确。</p>}</div><div className="dialogue-list">{dialogue.map((line) => <article key={line.jp}><p className="jp"><FuriganaText text={line.jp} /></p>{showTranslation && <p className="translation">{line.cn}</p>}{showGrammar && line.grammar && <div className="grammar-pills">{line.grammar.map((grammar) => <details key={grammar}><summary>{grammar}</summary><p>{grammarNotes[grammar]}</p></details>)}</div>}</article>)}</div></section>

					<section className="reader-section notice-section"><div className="reader-section-head"><span>もんだい</span><h2>次の案内を見て、後の問いに答えなさい。</h2>{showTranslation && <p>阅读下面的使用指南，再回答问题。</p>}</div><div className="notice-card"><h3>たから市　<FuriganaText text="中央図書館" /> <small><FuriganaText text="利用案内" /></small></h3><div className="notice-table"><div><b><FuriganaText text="開館時間" /></b><p><FuriganaText text="平日" /></p><strong><FuriganaText text="午前10時から午後8時" /></strong><p><FuriganaText text="土曜日・日曜日・祝日" /></p><strong><FuriganaText text="午前10時から午後6時" /></strong></div><div><b><FuriganaText text="休館日" /></b><p><FuriganaText text="第3月曜日" /></p><strong><FuriganaText text="ただし祝日と重なった場合は次の日が休館" /></strong><p><FuriganaText text="年末年始" /></p><strong>12月28日から1月4日</strong></div></div><aside>なお、10月1日より10日まで<FuriganaText text="電気工事" />のために<FuriganaText text="臨時" />で休館します。</aside></div>{showTranslation && <div className="reader-translation-card"><b>中央图书馆利用指南</b><div><section><span>开放时间</span><p>工作日：上午 10 点至晚上 8 点。<br />周六、周日及节假日：上午 10 点至傍晚 6 点。</p></section><section><span>休馆日</span><p>每月第三个星期一；但若该日为节假日，则次日休馆。<br />年末年初：12 月 28 日至 1 月 4 日。</p></section></div><p className="reader-translation-card__note">注意：10 月 1 日至 10 日因电气工程临时休馆。</p></div>}{showGrammar && <div className="grammar-callout"><b>句子拆解</b><p><mark>祝日と重なった場合</mark> = “与节假日重合的情况下”；<mark>次の日が休館</mark> = “次日休馆”。先抓条件，再读结论。</p></div>}</section>

					<section className="reader-section quiz-section"><div className="reader-section-head"><span>チェック</span><h2>問題</h2>{showTranslation && <p>选择答案后，再展开中文解析。</p>}</div>{questions.map((question, index) => <article className="reading-question" key={question.id}><h3>問 {index + 1}　{question.prompt}</h3>{showTranslation && <p className="question-translation">{question.cnPrompt}</p>}<div className="question-options">{question.options.map((option, optionIndex) => <button className={selected[question.id] === optionIndex ? "selected" : ""} onClick={() => setSelected((value) => ({ ...value, [question.id]: optionIndex }))} key={option.jp}><span>{optionIndex + 1}</span><span className="question-option-text">{option.jp}{showTranslation && <small>{option.cn}</small>}</span></button>)}</div><div className="answer-row"><button onClick={() => setRevealed((value) => ({ ...value, [question.id]: !value[question.id] }))}>{revealed[question.id] ? "隐藏解析" : "显示答案与解析"}</button>{revealed[question.id] && <p><b>正确答案：{question.answer + 1}</b>{question.explanation}</p>}</div></article>)}</section>

					<LessonNavigator index={0} onSelect={setActiveLesson} />
				</main>
			</div>
		</div>
	);
}

export default function ReadingN3() {
	return <ReadingN3Content />;
}
