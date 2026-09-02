import sourceExamples from "../data/n3-kanji-word-source-examples.json";

export type KanjiWord = {
	jp: string;
	reading?: string;
	cn?: string;
	en?: string;
};

export type KanjiWordUsage = {
	posCn: string;
	posEn: string;
	before: string;
	after: string;
	focus?: string;
	focusReading?: string;
	exampleCn: string;
	exampleEn: string;
	source?: string;
};

type Frame = readonly [before: string, after: string];
type Translation = readonly [cn: string, en: string];

const SOURCE_EXAMPLES = sourceExamples as Record<string, { jp: string; cn: string; en: string; source: string }>;

const VERB_FRAMES: Record<string, Frame> = {
	向かう: ["これからえきに", "。"],
	関する: ["これはしごとに", "しりょうです。"],
	断る: ["いそがしいので、さそいを", "。"],
	押す: ["このボタンを", "。"],
	押さえる: ["かみをてで", "。"],
	信じる: ["ともだちのことばを", "。"],
	確かめる: ["もういちどじかんを", "。"],
	認める: ["じぶんのまちがいを", "。"],
	飛ぶ: ["とりがそらを", "。"],
	捨てる: ["いらないものは", "。"],
	過ぎる: ["でんしゃがえきのまえを", "。"],
	現れる: ["くもからつきが", "。"],
	取り替える: ["ふるいでんちをあたらしいものに", "。"],
	着替える: ["うんどうのまえにふくを", "。"],
	座る: ["いすに", "。"],
	降りる: ["つぎのえきででんしゃを", "。"],
	降る: ["ごごからあめが", "。"],
	備える: ["じしんに", "。"],
	閉まる: ["このみせはくじに", "。"],
	閉める: ["へやをでるまえにまどを", "。"],
	当たる: ["よそうが", "。"],
	願う: ["かぞくのしあわせを", "。"],
	遊ぶ: ["こうえんでともだちと", "。"],
	役に立つ: ["このじしょはべんきょうに", "。"],
	差し出す: ["まどぐちでしょるいを", "。"],
	受ける: ["あしたしけんを", "。"],
	付ける: ["にもつになまえを", "。"],
	片付ける: ["つかったものを", "。"],
	付く: ["シャツにしみが", "。"],
	折る: ["かみをはんぶんに", "。"],
	折れる: ["つよいかぜでえだが", "。"],
	困る: ["さいふをなくして", "。"],
	消す: ["へやをでるとき、でんきを", "。"],
	消える: ["とつぜんでんきが", "。"],
	防ぐ: ["マスクでかんせんを", "。"],
	救う: ["きゅうきゅうたいがひとを", "。"],
	伝える: ["せんせいにけっかを", "。"],
	手伝う: ["りょうりを", "。"],
	要る: ["もうすこしじかんが", "。"],
	冷やす: ["のみものをれいぞうこで", "。"],
	冷える: ["よるになるとくうきが", "。"],
	冷める: ["スープが", "まえにのみます。"],
	冷ます: ["あついおちゃをすこし", "。"],
	凍る: ["さむいよるはみずが", "。"],
	召し上がる: ["どうぞあたたかいうちに", "。"],
	保存する: ["データをクラウドに", "。"],
	"ご存じです": ["このニュースを", "か。"],
	限る: ["さんかしゃをにじゅうにんに", "。"],
	造る: ["こうじょうでくるまを", "。"],
	増える: ["さいきんがいこくじんのきゃくが", "。"],
	増やす: ["まいにちれんしゅうのじかんを", "。"],
	減る: ["うんどうしてたいじゅうが", "。"],
	減らす: ["ごみを", "くふうをします。"],
	返す: ["かりたほんをとしょかんに", "。"],
	混ぜる: ["たまごとさとうをよく", "。"],
	焼く: ["フライパンでさかなを", "。"],
	焼ける: ["パンがおいしそうに", "。"],
	表す: ["このきごうはちゅういを", "。"],
	裏返す: ["かみを", "。"],
	守る: ["こうつうルールを", "。"],
	数える: ["にんずうを", "。"],
	続く: ["あめがさんにち", "。"],
	続ける: ["まいにちべんきょうを", "。"],
	示す: ["グラフがけっかを", "。"],
	戻る: ["ごじまでにうちへ", "。"],
	戻す: ["つかったものをもとのばしょに", "。"],
	登る: ["しゅうまつにやまへ", "。"],
	割る: ["たまごをボウルに", "。"],
	割れる: ["コップがおちて", "。"],
	払う: ["レジでだいきんを", "。"],
	残る: ["さらのうえにケーキがひとつ", "。"],
	残す: ["たいせつなきろくを", "。"],
	込む: ["あさのでんしゃは", "。"],
	振り込む: ["ぎんこうでだいきんを", "。"],
	申し込む: ["インターネットでこうざに", "。"],
	申す: ["わたくしはたなかと", "。"],
	申し上げる: ["こころからおれいを", "。"],
	連れて行く: ["こどもをびょういんへ", "。"],
	連れて来る: ["ともだちをパーティーへ", "。"],
	届ける: ["にもつをじたくまで", "。"],
	届く: ["あしたにもつが", "。"],
	配る: ["みんなにしりょうを", "。"],
	望む: ["かいぜんを", "。"],
	取る: ["たなからほんを", "。"],
	受け取る: ["まどぐちでにもつを", "。"],
	預ける: ["えきのロッカーににもつを", "。"],
	参る: ["わたしがそちらへ", "。"],
	勤める: ["ぎんこうに", "。"],
	伺う: ["あしたごじたくへ", "。"],
	遅れる: ["でんしゃがじゅっぷん", "。"],
	失礼する: ["おさきに", "。"],
	汗をかく: ["うんどうして", "。"],
	涙を流す: ["かんどうして", "。"],
	笑う: ["みんなでおおきなこえで", "。"],
	調べる: ["わからないことばをじしょで", "。"],
	移る: ["らいげつあたらしいぶしょへ", "。"],
	移す: ["にもつをとなりのへやへ", "。"],
	感じる: ["はるのあたたかさを", "。"],
	選ぶ: ["すきないろを", "。"],
	違う: ["このこたえはわたしのこたえと", "。"],
	間違う: ["でんわばんごうを", "。"],
	間違える: ["でんしゃのじかんを", "。"],
	直る: ["こわれたとけいが", "。"],
	直す: ["まちがいを", "。"],
	辞める: ["らいげつかいしゃを", "。"],
	結ぶ: ["くつのひもを", "。"],
	祝う: ["みんなでたんじょうびを", "。"],
	曲がる: ["つぎのかどをみぎに", "。"],
	曲げる: ["ひざをゆっくり", "。"],
	寝る: ["まいばんじゅういちじに", "。"],
	治る: ["かぜがすっかり", "。"],
	治す: ["くすりでびょうきを", "。"],
	汚れる: ["あめでくつが", "。"],
	並ぶ: ["レジのまえに", "。"],
	並べる: ["つくえのうえにほんを", "。"],
	吸う: ["そとでしんせんなくうきを", "。"],
	眠る: ["こどもがぐっすり", "。"],
	疲れる: ["たくさんあるいて", "。"],
	呼ぶ: ["いそいできゅうきゅうしゃを", "。"],
	晴れる: ["あしたは", "でしょう。"],
	吹く: ["つよいかぜが", "。"],
	求める: ["かいしゃはけいけんのあるひとを", "。"],
	決める: ["りょこうのひにちを", "。"],
	決まる: ["かいぎのひにちが", "。"],
	勝つ: ["つぎのしあいに", "。"],
	流れる: ["かわのみずがゆっくり", "。"],
	流す: ["あせをシャワーで", "。"],
	負ける: ["しあいに", "。"],
	投げる: ["ボールを", "。"],
	戦う: ["さいごまで", "。"],
	済む: ["しごとがはやく", "。"],
	比べる: ["ふたつのしょうひんを", "。"],
	変わる: ["きせつが", "。"],
	変える: ["よていを", "。"],
	改める: ["わるいしゅうかんを", "。"],
	欠ける: ["カップのふちがすこし", "。"],
};

const I_ADJECTIVE_FRAMES: Record<string, Frame> = {
	無い: ["いま、てもとにおかねが", "。"],
	危ない: ["このみちは", "。"],
	速い: ["このでんしゃは", "。"],
	優しい: ["あのせんせいは", "。"],
	冷たい: ["このみずは", "。"],
	温かい: ["このスープは", "。"],
	濃い: ["このコーヒーは", "。"],
	薄い: ["このスープはあじが", "。"],
	遅い: ["きょうはでんしゃが", "。"],
	難しい: ["このもんだいは", "。"],
	易しい: ["このせつめいは", "。"],
	痛い: ["あさからあたまが", "。"],
	熱い: ["このおちゃはまだ", "。"],
	汚い: ["このへやは", "。"],
	欲しい: ["あたらしいじしょが", "。"],
	眠い: ["きのうあまりねていないので", "。"],
	暖かい: ["きょうはとても", "。"],
	美しい: ["このけしきは", "。"],
};

const NA_ADJECTIVE_FRAMES: Record<string, Frame> = {
	無理: ["", "なおねがいはしないでください。"],
	不満: ["", "なてんがあればおしえてください。"],
	正確: ["", "なじかんをかくにんしてください。"],
	確か: ["", "なじょうほうかどうかかくにんします。"],
	正常: ["", "なじょうたいにもどりました。"],
	危険: ["", "なばしょにははいらないでください。"],
	自由: ["", "なじかんにほんをよみます。"],
	安全: ["", "なみちをえらびましょう。"],
	神経質: ["", "なひとはちいさなおともきになります。"],
	必要: ["", "なしょるいをじゅんびしてください。"],
	重要: ["", "なてんをメモしました。"],
	完全: ["", "なかたちでほぞんされています。"],
	便利: ["", "なアプリをつかっています。"],
	失礼: ["", "なことをいってしまいました。"],
	残念: ["", "なけっかになりました。"],
	困難: ["", "なもんだいにもちょうせんします。"],
	簡単: ["", "なほうほうでせつめいします。"],
	適当: ["", "なおおきさにきってください。"],
	快適: ["", "なへやですごしました。"],
	結構: ["", "なしなをいただきました。"],
	熱心: ["", "ながくせいです。"],
	大変: ["", "なしごとがおわりました。"],
	否定的: ["", "ないけんもありました。"],
	国際的: ["", "なたいかいにさんかします。"],
	個人的: ["", "ないけんをはなします。"],
};

const ADVERB_FRAMES: Record<string, Frame> = {
	非常に: ["このもんだいは", "むずかしいです。"],
	必ず: ["やくそくは", "まもります。"],
	"必死(に)": ["ゴールまで", "はしりました。"],
	例えば: ["", "、こんなつかいかたがあります。"],
	最近: ["", "、うんどうをはじめました。"],
	最も: ["このほうほうが", "かんたんです。"],
	直接: ["せんせいに", "ききます。"],
	結局: ["", "、でんしゃでいきました。"],
	決して: ["やくそくは", "わすれません。"],
	一般に: ["これは", "よくしられています。"],
	実際に: ["", "つかってみます。"],
	実は: ["", "、まだおわっていません。"],
};

const EXPRESSIONS: Record<string, Frame> = {
	向こう: ["えきはみちの", "です。"],
	"〇〇向き": ["このほんはしょしんしゃ", "です。"],
	"〜号車": ["していせきはさん", "です。"],
	"〜階": ["レストランはご", "です。"],
	"〇〇方面": ["このでんしゃはとうきょう", "です。"],
	"〜番線": ["でんしゃはに", "からでます。"],
	"〜番": ["つぎはさん", "です。"],
	"〜両": ["このでんしゃははち", "です。"],
	"約〜": ["えきまで", "じゅっぷんです。"],
	"当〇〇": ["しょうさいは", "のサイトでかくにんできます。"],
	"〇〇様": ["たなか", "からおでんわです。"],
	"〇〇港": ["ふねはよこはま", "につきます。"],
	"〇〇寺": ["きょうとでゆうめいな", "をたずねます。"],
	"〜点": ["テストはきゅうじゅう", "でした。"],
	"故〇〇": ["これは", "のさくひんです。"],
	"〇〇製": ["これはにほん", "のカメラです。"],
	"〜冊": ["ほんをさん", "かりました。"],
	"〜個": ["りんごをに", "かいました。"],
	"〜枚": ["きってをご", "ください。"],
	"〜倍": ["ことしのうりあげはきょねんのに", "です。"],
	税込: ["このねだんは", "です。"],
	"〇〇君": ["たなか", "、こちらへきてください。"],
	"〜歳": ["いもうとはじゅうはち", "です。"],
	"1対2": ["しあいは", "でまけました。"],
	"〇〇化": ["サービスのデジタル", "がすすんでいます。"],
	"第1課": ["きょうは", "をべんきょうします。"],
	"「いいえ、結構です」": ["すすめをことわるとき、", "といいます。"],
	存じません: ["そのけんについては", "。"],
	他の: ["", "ひとにきいてください。"],
};

const EXPRESSION_FOCUS: Record<string, readonly [focus: string, reading?: string]> = {
	"〇〇向き": ["向き", "むき"],
	"〜号車": ["号車", "ごうしゃ"],
	"〜階": ["階", "かい"],
	"〇〇方面": ["方面", "ほうめん"],
	"〜番線": ["番線", "ばんせん"],
	"〜番": ["番", "ばん"],
	"〜両": ["両", "りょう"],
	"約〜": ["約", "やく"],
	"当〇〇": ["当社", "とうしゃ"],
	"〇〇様": ["様", "さま"],
	"〇〇港": ["港", "こう"],
	"〇〇寺": ["寺", "じ"],
	"〜点": ["点", "てん"],
	"故〇〇": ["故田中さん", "こたなかさん"],
	"〇〇製": ["製", "せい"],
	"〜冊": ["冊", "さつ"],
	"〜個": ["個", "こ"],
	"〜枚": ["枚", "まい"],
	"〜倍": ["倍", "ばい"],
	"〇〇君": ["君", "くん"],
	"〜歳": ["歳", "さい"],
	"〇〇化": ["化", "か"],
};

const NOUN_FRAMES: Record<string, Frame> = {
	駐車: ["ここは", "きんしです。"],
	停車: ["このでんしゃはつぎのえきに", "します。"],
	駐車場: ["これから", "へいきます。"],
	無休: ["このみせはねんじゅう", "です。"],
	無料: ["このサービスは", "です。"],
	満車: ["ちゅうしゃじょうは", "です。"],
	満員: ["でんしゃは", "です。"],
	方向: ["えきの", "をききます。"],
	禁止: ["ここはちゅうしゃ", "です。"],
	関心: ["にほんぶんかに", "があります。"],
	関係: ["このもんだいはしごとに", "があります。"],
	係: ["わからないときは", "にきいてください。"],
	無断: ["", "でしゃしんをとらないでください。"],
	断水: ["あしたは", "のよていです。"],
	横断: ["どうろを", "します。"],
	横断歩道: ["", "をわたります。"],
	押し入れ: ["", "にふとんをしまいます。"],
	押しボタン式: ["これは", "のドアです。"],
	数式: ["この", "をつかってけいさんします。"],
	入学式: ["", "はしがつです。"],
	自信: ["もっと", "をもってください。"],
	信用: ["", "をうしなわないようにします。"],
	信号: ["", "があおになりました。"],
	確認: ["よやくの", "をおねがいします。"],
	非常口: ["", "はあちらです。"],
	日常: ["", "のせいかつでつかいます。"],
	階段: ["", "をのぼります。"],
	ごみ箱: ["ごみを", "にすてます。"],
	危険: ["ここは", "です。"],
	線: ["まっすぐな", "をひきます。"],
	画面: ["", "をみてください。"],
	目次: ["まず", "をみます。"],
	速度: ["くるまの", "をおとします。"],
	通過: ["でんしゃはこのえきを", "します。"],
	地下鉄: ["", "でかいしゃへいきます。"],
	鉄道: ["このまちは", "がべんりです。"],
	指定席: ["", "をよやくしました。"],
	指輪: ["ゆびに", "をはめます。"],
	出席: ["かいぎに", "します。"],
	欠席: ["かぜでじゅぎょうを", "します。"],
	自由席: ["", "にすわりました。"],
	窓口: ["", "でしつもんします。"],
	バス停: ["", "でバスをまちます。"],
	整理券: ["まず", "をとってください。"],
	現金: ["", "ではらいます。"],
	両親: ["", "といっしょにすんでいます。"],
	優先席: ["", "をひつようなひとにゆずります。"],
	座席: ["", "をかくにんしてください。"],
	正座: ["たたみのうえで", "をします。"],
	降車口: ["", "はうしろです。"],
	非常: ["", "のばあいはこのボタンをおしてください。"],
	普通: ["これは", "のでんしゃです。"],
	国際: ["", "かいぎにさんかします。"],
	携帯: ["いつも", "をもっています。"],
	緑: ["このかばんは", "です。"],
	安定: ["せいかつが", "しました。"],
	美術: ["がっこうで", "をべんきょうしています。"],
	郵便: ["しょるいを", "でおくりました。"],
	晴れ: ["あしたは", "でしょう。"],
	化粧: ["でかけるまえに", "をします。"],
};

const PLACE_WORDS = new Set([
	"駐車場", "飛行場", "非常口", "空港", "港", "遊園地", "美術館", "神社", "お寺", "市役所", "郵便局", "薬局", "交番", "公園",
	"受付", "内科", "外科", "耳鼻科", "整形外科", "警察署", "車庫", "自宅", "お宅", "職場", "美容院", "事務所", "税務署", "改札口", "部屋", "宿", "下宿",
]);
const PERSON_WORDS = new Set([
	"係", "客", "お客様", "観客", "役員", "差出人", "婦人", "主婦", "警官", "消費者", "代表", "部長", "女性", "男性", "受取人", "友達",
	"息子", "奥さん", "選手", "投手", "相手", "首相", "議員", "政治家", "専門家", "職員", "技術者", "公務員", "課長", "女優", "両親", "神様",
]);
const EVENT_OR_TIME_WORDS = new Set([
	"入学式", "予定", "定休日", "次回", "期間", "長期", "短期", "期限", "賞味期限", "消費期限", "再来週", "連休", "祝日", "昨日", "昨夜", "昨年", "時間帯",
]);
const THING_WORDS = new Set([
	"押し入れ", "ごみ箱", "箱", "整理券", "駐車券", "回数券", "乗車券", "指輪", "窓", "冷蔵庫", "冷凍庫", "車庫", "金庫", "材料", "教材",
	"卵", "牛乳", "粉", "小麦粉", "袋", "ごみ袋", "紙袋", "手袋", "足袋", "機械", "氷", "お湯", "表", "裏", "辞書", "教科書", "参考書", "荷物", "手荷物",
]);
const NATURE_OR_RISK_WORDS = new Set(["地震", "津波", "事故", "故障", "危険", "断水", "煙", "熱", "虫"]);

const CUSTOM_TRANSLATIONS: Record<string, Translation> = {
	満車: ["停车场已满。", "The parking lot is full."],
	満員: ["电车里挤满了人。", "The train is full."],
	関心: ["对日本文化感兴趣。", "I am interested in Japanese culture."],
	断る: ["因为忙，所以拒绝了邀请。", "I declined the invitation because I was busy."],
	断水: ["明天计划停水。", "The water supply is scheduled to be cut off tomorrow."],
	信用: ["注意不要失去信用。", "Be careful not to lose people’s trust."],
	確認: ["请确认预约内容。", "Please confirm the reservation."],
	飛ぶ: ["鸟在天空中飞。", "A bird is flying in the sky."],
	速い: ["这趟电车很快。", "This train is fast."],
	速度: ["降低汽车的速度。", "Slow the car down."],
	通過: ["电车经过这一站。", "The train passes through this station."],
	過ぎる: ["电车驶过车站前。", "The train goes past the station."],
	鉄道: ["这个城市的铁路很方便。", "The railway system in this city is convenient."],
	窓口: ["在窗口咨询。", "Ask at the counter."],
	現れる: ["月亮从云层中露了出来。", "The moon appeared from behind the clouds."],
	座席: ["请确认座位。", "Please check your seat."],
	座る: ["坐在椅子上。", "Sit on the chair."],
	当たる: ["预测说中了。", "The prediction was correct."],
	美しい: ["这景色很美。", "This scenery is beautiful."],
	付ける: ["在行李上写上名字。", "Put your name on the luggage."],
	付く: ["衬衫上沾了污渍。", "There is a stain on the shirt."],
	困る: ["钱包丢了，很为难。", "I am in trouble because I lost my wallet."],
	防ぐ: ["戴口罩预防感染。", "Wear a mask to prevent infection."],
	増やす: ["每天增加练习时间。", "Increase your daily practice time."],
	続く: ["雨连续下了三天。", "It rained for three days in a row."],
	残る: ["盘子上还剩一块蛋糕。", "One piece of cake remains on the plate."],
	例えば: ["例如，有这种用法。", "For example, it can be used this way."],
	取る: ["从书架上拿书。", "Take a book from the shelf."],
	間違う: ["弄错了电话号码。", "I got the phone number wrong."],
	間違える: ["弄错了电车时间。", "I got the train time wrong."],
	直接: ["直接问老师。", "Ask the teacher directly."],
	直す: ["改正错误。", "Correct the mistake."],
	辞める: ["下个月离职。", "I am leaving the company next month."],
	治る: ["感冒完全好了。", "I have completely recovered from my cold."],
	他の: ["请问其他人。", "Please ask someone else."],
	吸う: ["在外面呼吸新鲜空气。", "Breathe in the fresh air outside."],
	呼ぶ: ["赶紧叫救护车。", "Call an ambulance quickly."],
	勝つ: ["赢得下一场比赛。", "Win the next match."],
	流れる: ["河水缓缓流淌。", "The river water flows slowly."],
	負ける: ["输掉比赛。", "Lose the match."],
	実際に: ["实际试用一下。", "Try using it in practice."],
	申し込む: ["在网上报名课程。", "Apply for the course online."],
	危ない: ["这条路很危险。", "This road is dangerous."],
	必ず: ["一定会遵守约定。", "I will always keep my promise."],
	駐車: ["这里禁止停车。", "Parking is prohibited here."],
	停車: ["这趟电车会在下一站停车。", "This train stops at the next station."],
	込む: ["早上的电车很拥挤。", "The morning train is crowded."],
	安定: ["生活稳定下来了。", "Life has become stable."],
	美術: ["在学校学习美术。", "I study art at school."],
	郵便: ["用邮寄方式寄出了文件。", "I sent the documents by mail."],
	晴れ: ["明天会是晴天吧。", "It will probably be sunny tomorrow."],
	化粧: ["出门前化妆。", "I put on makeup before going out."],
	向かう: ["现在去车站。", "I’m heading to the station now."],
	押さえる: ["用手按住纸。", "Hold the paper down with your hand."],
	信じる: ["我相信朋友说的话。", "I believe what my friend said."],
	認める: ["承认自己的错误。", "Admit your own mistake."],
	取り替える: ["把旧电池换成新的。", "Replace the old battery with a new one."],
	着替える: ["运动前换衣服。", "Change clothes before exercising."],
	降りる: ["在下一站下车。", "Get off the train at the next station."],
	備える: ["为地震做好准备。", "Prepare for an earthquake."],
	閉まる: ["这家店九点关门。", "This shop closes at nine."],
	閉める: ["离开房间前关窗。", "Close the window before leaving the room."],
	願う: ["祝愿家人幸福。", "Wish for your family’s happiness."],
	役に立つ: ["这本词典对学习很有帮助。", "This dictionary is useful for studying."],
	差し出す: ["在窗口递交材料。", "Hand in the documents at the counter."],
	片付ける: ["把用过的东西收拾好。", "Put away the things you used."],
	折る: ["把纸对折。", "Fold the paper in half."],
	折れる: ["树枝被强风吹断了。", "The branch broke in the strong wind."],
	消える: ["灯突然灭了。", "The light suddenly went out."],
	救う: ["急救队救了那个人。", "The rescue team saved the person."],
	手伝う: ["帮忙做饭。", "Help with the cooking."],
	要る: ["还需要一点时间。", "I need a little more time."],
	冷やす: ["把饮料放进冰箱冷藏。", "Chill the drink in the refrigerator."],
	冷える: ["到了晚上，空气会变凉。", "The air gets colder at night."],
	冷める: ["趁汤还没凉喝掉。", "Drink the soup before it gets cold."],
	冷ます: ["把热茶稍微晾凉。", "Let the hot tea cool a little."],
	凍る: ["寒冷的夜晚水会结冰。", "Water freezes on cold nights."],
	召し上がる: ["请趁热享用。", "Please enjoy it while it is warm."],
	保存する: ["把数据保存在云端。", "Save the data in the cloud."],
	"ご存じです": ["您知道这条新闻吗？", "Do you know about this news?"],
	限る: ["参加人数限定为二十人。", "Limit the number of participants to twenty."],
	造る: ["在工厂制造汽车。", "Cars are manufactured at the factory."],
	減る: ["运动后体重减轻了。", "My weight went down after exercising."],
	減らす: ["想办法减少垃圾。", "Find ways to reduce waste."],
	返す: ["把借来的书还给图书馆。", "Return the borrowed book to the library."],
	混ぜる: ["把鸡蛋和糖充分搅拌。", "Mix the eggs and sugar well."],
	焼く: ["用平底锅煎鱼。", "Cook the fish in a frying pan."],
	焼ける: ["面包烤得看起来很好吃。", "The bread is baking to a delicious-looking finish."],
	裏返す: ["把纸翻到背面。", "Turn the paper over."],
	示す: ["图表显示了结果。", "The graph shows the results."],
	戻る: ["五点前回家。", "Return home by five."],
	戻す: ["把用过的东西放回原处。", "Put the used item back where it belongs."],
	登る: ["周末去爬山。", "Climb a mountain this weekend."],
	割る: ["把鸡蛋打进碗里。", "Crack the egg into the bowl."],
	割れる: ["杯子掉下来摔碎了。", "The glass fell and broke."],
	残す: ["把重要的记录保存下来。", "Keep an important record."],
	申す: ["我叫田中。", "My name is Tanaka."],
	申し上げる: ["衷心表示感谢。", "I would like to express my sincere thanks."],
	連れて行く: ["带孩子去医院。", "Take the child to the hospital."],
	連れて来る: ["带朋友来参加聚会。", "Bring a friend to the party."],
	届ける: ["把包裹送到家。", "Deliver the package to the house."],
	配る: ["把资料发给大家。", "Hand out the materials to everyone."],
	望む: ["希望情况得到改善。", "Hope for an improvement."],
	受け取る: ["在窗口领取包裹。", "Pick up the package at the counter."],
	預ける: ["把行李寄存在车站的储物柜里。", "Leave the luggage in a station locker."],
	参る: ["我来您那里。", "I will come to you."],
	勤める: ["在银行工作。", "Work at a bank."],
	伺う: ["明天登门拜访。", "I will visit your home tomorrow."],
	失礼する: ["我先告辞了。", "Please excuse me for leaving first."],
	汗をかく: ["运动后出了汗。", "I worked up a sweat exercising."],
	涙を流す: ["感动得流下了眼泪。", "I was moved to tears."],
	笑う: ["大家一起放声大笑。", "Everyone laughed out loud together."],
	調べる: ["用词典查不懂的词。", "Look up an unfamiliar word in a dictionary."],
	移る: ["下个月调到新的部门。", "Move to a new department next month."],
	移す: ["把行李搬到隔壁房间。", "Move the luggage to the next room."],
	選ぶ: ["选择喜欢的颜色。", "Choose a color you like."],
	直る: ["坏掉的手表修好了。", "The broken watch has been fixed."],
	結ぶ: ["系鞋带。", "Tie your shoelaces."],
	祝う: ["大家一起庆祝生日。", "Celebrate the birthday together."],
	曲げる: ["慢慢弯曲膝盖。", "Bend your knees slowly."],
	汚れる: ["鞋子被雨弄脏了。", "My shoes got dirty in the rain."],
	並ぶ: ["在收银台前排队。", "Line up in front of the register."],
	並べる: ["把书摆在桌上。", "Arrange the books on the desk."],
	疲れる: ["走了很多路，累了。", "I got tired after walking a lot."],
	吹く: ["刮起了强风。", "A strong wind is blowing."],
	決まる: ["会议日期定下来了。", "The meeting date has been decided."],
	流す: ["用淋浴冲掉汗水。", "Wash off the sweat in the shower."],
	投げる: ["投球。", "Throw the ball."],
	戦う: ["战斗到最后。", "Fight to the end."],
	済む: ["工作很快就做完了。", "The work was finished quickly."],
	変える: ["更改计划。", "Change the plan."],
	改める: ["改掉坏习惯。", "Change a bad habit."],
	欠ける: ["杯口缺了一小块。", "The rim of the cup is slightly chipped."],

	無い: ["现在手头没钱。", "I don’t have any money on hand right now."],
	冷たい: ["这水很凉。", "This water is cold."],
	温かい: ["这汤很温暖。", "This soup is warm."],
	濃い: ["这杯咖啡很浓。", "This coffee is strong."],
	薄い: ["这汤味道很淡。", "This soup tastes weak."],
	易しい: ["这个说明很简单易懂。", "This explanation is easy to understand."],
	熱い: ["这茶还很烫。", "This tea is still hot."],
	汚い: ["这个房间很脏。", "This room is dirty."],
	欲しい: ["我想要一本新词典。", "I want a new dictionary."],
	眠い: ["昨天没怎么睡，所以很困。", "I’m sleepy because I did not sleep much yesterday."],
	"無理(な)": ["请不要提出难以做到的要求。", "Please do not make an unreasonable request."],
	"不満(な)": ["如有不满意的地方，请告诉我。", "Please tell me if there is anything you are dissatisfied with."],
	"正確(な)": ["请确认准确的时间。", "Please check the exact time."],
	"確か(な)": ["确认一下是不是可靠的信息。", "Check whether the information is reliable."],
	"正常(な)": ["恢复到了正常状态。", "It returned to its normal state."],
	"危険(な)": ["请不要进入危险的地方。", "Do not enter dangerous places."],
	"自由(な)": ["空闲时看书。", "I read books in my free time."],
	"安全(な)": ["请选择安全的道路。", "Let’s choose a safe route."],
	"神経質(な)": ["神经敏感的人连细小的声音也会在意。", "Sensitive people may be bothered even by small sounds."],
	"必要(な)": ["请准备好所需文件。", "Please prepare the necessary documents."],
	"重要(な)": ["记下了重点。", "I wrote down the important points."],
	"完全(な)": ["以完整的形式保存着。", "It is saved in its complete form."],
	"便利(な)": ["正在使用一款方便的应用。", "I use a convenient app."],
	"失礼(な)": ["不小心说了失礼的话。", "I accidentally said something rude."],
	"残念(な)": ["结果很遗憾。", "It was a disappointing result."],
	"困難(な)": ["也要挑战困难的问题。", "I also take on difficult problems."],
	"簡単(な)": ["用简单的方法说明。", "I’ll explain it in a simple way."],
	"適当(な)": ["请切成合适的大小。", "Please cut it into suitable-sized pieces."],
	"快適(な)": ["在舒适的房间里度过了一段时间。", "I spent time in a comfortable room."],
	"結構(な)": ["收到了一件很不错的礼物。", "I received a lovely gift."],
	"熱心(な)": ["他是一名热心的学生。", "He is a dedicated student."],
	"大変(な)": ["一项艰巨的工作结束了。", "The demanding job is finished."],
	"否定的(な)": ["也有否定意见。", "There were also negative opinions."],
	"国際的(な)": ["参加国际比赛。", "I’m taking part in an international competition."],
	"個人的(な)": ["说出个人意见。", "I’ll share my personal opinion."],

	無休: ["这家店全年无休。", "This shop is open all year round."],
	係: ["不明白时请询问负责人。", "Ask the person in charge if you are unsure."],
	横断: ["横穿马路。", "Cross the road."],
	横断歩道: ["走人行横道过马路。", "Cross at the pedestrian crossing."],
	押し入れ: ["把被褥收进壁橱。", "Put the bedding in the closet."],
	押しボタン式: ["这是按钮式的门。", "This is a push-button door."],
	数式: ["用这个公式计算。", "Calculate using this formula."],
	非常口: ["紧急出口在那边。", "The emergency exit is over there."],
	日常: ["在日常生活中使用。", "Use it in everyday life."],
	ごみ箱: ["把垃圾扔进垃圾桶。", "Throw the rubbish in the bin."],
	危険: ["这里很危险。", "It is dangerous here."],
	線: ["画一条直线。", "Draw a straight line."],
	目次: ["先看目录。", "Check the table of contents first."],
	指定席: ["预订了指定座位。", "I reserved a seat."],
	指輪: ["把戒指戴在手指上。", "Put a ring on your finger."],
	欠席: ["因为感冒缺席了课程。", "I missed class because of a cold."],
	自由席: ["坐在了自由席。", "I sat in a non-reserved seat."],
	バス停: ["在公交车站等公交车。", "Wait for the bus at the bus stop."],
	整理券: ["请先领取号码券。", "Please take a numbered ticket first."],
	現金: ["用现金付款。", "Pay in cash."],
	優先席: ["把优先座位让给有需要的人。", "Give the priority seat to someone who needs it."],
	正座: ["跪坐在榻榻米上。", "Sit in seiza on the tatami."],
	降車口: ["下车门在后面。", "The exit is at the back."],
	非常: ["紧急情况下请按这个按钮。", "Press this button in an emergency."],
	普通: ["这是普通列车。", "This is a local train."],
	国際: ["参加国际会议。", "Attend an international conference."],
	携帯: ["我总是带着手机。", "I always carry my mobile phone."],
	緑: ["这个包是绿色的。", "This bag is green."],

	"必死(に)": ["拼命跑到了终点。", "I ran desperately to the finish line."],
	一般に: ["这件事广为人知。", "This is generally well known."],
	"〇〇向き": ["这本书适合初学者。", "This book is suitable for beginners."],
	"〜号車": ["指定席在三号车厢。", "The reserved seat is in car 3."],
	"〜階": ["餐厅在五楼。", "The restaurant is on the fifth floor."],
	"〜番線": ["列车从二号站台发车。", "The train leaves from platform 2."],
	"〜番": ["下一个是三号。", "Number three is next."],
	"〜両": ["这列车有八节车厢。", "This train has eight cars."],
	"約〜": ["到车站大约十分钟。", "It takes about ten minutes to the station."],
	"当〇〇": ["详情可在本公司网站确认。", "Details are available on our company website."],
	"〇〇様": ["田中先生来电话了。", "There is a call for Mr. Tanaka."],
	"〇〇港": ["船抵达横滨港。", "The ship arrives at Yokohama Port."],
	"〇〇寺": ["参观京都一座著名的寺院。", "Visit a famous temple in Kyoto."],
	"〜点": ["考试得了九十分。", "I scored ninety points on the test."],
	"故〇〇": ["这是已故田中先生的作品。", "This is a work by the late Mr. Tanaka."],
	"〇〇製": ["这是日本制造的相机。", "This is a camera made in Japan."],
	"〜冊": ["借了三本书。", "I borrowed three books."],
	"〜個": ["买了两个苹果。", "I bought two apples."],
	"〜枚": ["请给我五张邮票。", "Please give me five stamps."],
	"〜倍": ["今年的销售额是去年的两倍。", "This year’s sales are twice last year’s."],
	税込: ["这个价格含税。", "This price includes tax."],
	"〇〇君": ["田中同学，请到这里来。", "Tanaka, please come here."],
	"〜歳": ["妹妹十八岁。", "My younger sister is eighteen years old."],
	"1対2": ["比赛以一比二落败。", "We lost the match 1–2."],
	"〇〇化": ["服务正在推进数字化。", "The service is becoming digitalized."],
	"第1課": ["今天学习第一课。", "We are studying Lesson 1 today."],
	"「いいえ、結構です」": ["拒绝别人提议时，可以说“不，谢谢”。", "Say “No, thank you” when declining an offer."],
	存じません: ["关于那件事，我不知道。", "I do not know about that matter."],
};

function cleanSurface(jp: string) {
	return jp.replace(/[（(][^）)]*[）)]/g, "").trim();
}

type UsageBase = Omit<KanjiWordUsage, "exampleCn" | "exampleEn" | "source">;

function wordHash(value: string) {
	return [...value].reduce((total, char) => total + (char.codePointAt(0) || 0), 0);
}

function translatedMeaning(word: KanjiWord) {
	return {
		cn: (word.cn || word.jp).replace(/[。.]$/, ""),
		en: (word.en || word.jp).replace(/[。.]$/, ""),
	};
}

function sourceUsage(word: KanjiWord, surface: string, base: UsageBase): KanjiWordUsage | null {
	const example = SOURCE_EXAMPLES[word.jp];
	if (!example) return null;
	const preferredFocus = base.focus || surface;
	const focus = example.jp.includes(preferredFocus)
		? preferredFocus
		: example.jp.includes(surface) ? surface : "";
	if (!focus) return null;
	const index = example.jp.indexOf(focus);
	return {
		...base,
		before: example.jp.slice(0, index),
		after: example.jp.slice(index + focus.length),
		focus,
		focusReading: base.focusReading || word.reading,
		exampleCn: example.cn,
		exampleEn: example.en,
		source: example.source,
	};
}

function finishUsage(word: KanjiWord, surface: string, base: UsageBase, translation?: Translation, preferReviewedFrame = false): KanjiWordUsage {
	const reviewedTranslation = CUSTOM_TRANSLATIONS[word.jp] || CUSTOM_TRANSLATIONS[surface];
	if (preferReviewedFrame && reviewedTranslation) {
		return { ...base, exampleCn: reviewedTranslation[0], exampleEn: reviewedTranslation[1] };
	}
	const sourced = sourceUsage(word, surface, base);
	if (sourced) return sourced;
	const [exampleCn, exampleEn] = translation || reviewedTranslation || [
		`例句中使用了“${word.cn || surface}”。`,
		`The example uses “${word.en || surface}”.`,
	];
	return { ...base, exampleCn, exampleEn };
}

function nounUsage(word: KanjiWord, surface: string): KanjiWordUsage {
	const meaning = translatedMeaning(word);
	const pick = wordHash(word.jp);
	if (PLACE_WORDS.has(surface)) {
		const variants: readonly (readonly [UsageBase, Translation])[] = [
			[{ posCn: "名词", posEn: "Noun", before: "これから", after: "へいきます。" }, [`现在去${meaning.cn}。`, `I’m going to ${meaning.en} now.`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "へのみちをききました。" }, [`我问了去${meaning.cn}的路。`, `I asked how to get to ${meaning.en}.`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "のまえであいましょう。" }, [`在${meaning.cn}前面见吧。`, `Let’s meet in front of ${meaning.en}.`]],
		];
		const [base, translation] = variants[pick % variants.length];
		return finishUsage(word, surface, base, translation);
	}
	if (PERSON_WORDS.has(surface)) {
		const variants: readonly (readonly [UsageBase, Translation])[] = [
			[{ posCn: "名词", posEn: "Noun", before: "くわしいことは", after: "にききます。" }, [`详细情况向${meaning.cn}询问。`, `Ask ${meaning.en} for the details.`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "とはなしました。" }, [`我和${meaning.cn}谈过了。`, `I spoke with ${meaning.en}.`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "をしょうかいします。" }, [`我来介绍${meaning.cn}。`, `Let me introduce ${meaning.en}.`]],
		];
		const [base, translation] = variants[pick % variants.length];
		return finishUsage(word, surface, base, translation);
	}
	if (EVENT_OR_TIME_WORDS.has(surface)) {
		const variants: readonly (readonly [UsageBase, Translation])[] = [
			[{ posCn: "名词", posEn: "Noun", before: "つぎの", after: "はいつですか。" }, [`下一次${meaning.cn}是什么时候？`, `When is the next ${meaning.en}?`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "をかくにんしました。" }, [`确认了${meaning.cn}。`, `I confirmed ${meaning.en}.`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "についてせんせいにききました。" }, [`关于${meaning.cn}询问了老师。`, `I asked the teacher about ${meaning.en}.`]],
		];
		const [base, translation] = variants[pick % variants.length];
		return finishUsage(word, surface, base, translation);
	}
	if (NATURE_OR_RISK_WORDS.has(surface)) {
		const variants: readonly (readonly [UsageBase, Translation])[] = [
			[{ posCn: "名词", posEn: "Noun", before: "", after: "にちゅういしてください。" }, [`请注意${meaning.cn}。`, `Please be careful of ${meaning.en}.`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "にそなえています。" }, [`正在为${meaning.cn}做准备。`, `We are preparing for ${meaning.en}.`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "についてしらべました。" }, [`调查了${meaning.cn}。`, `I looked into ${meaning.en}.`]],
		];
		const [base, translation] = variants[pick % variants.length];
		return finishUsage(word, surface, base, translation);
	}
	if (THING_WORDS.has(surface)) {
		const variants: readonly (readonly [UsageBase, Translation])[] = [
			[{ posCn: "名词", posEn: "Noun", before: "この", after: "をつかいます。" }, [`使用这个${meaning.cn}。`, `Use this ${meaning.en}.`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "をさがしています。" }, [`正在找${meaning.cn}。`, `I’m looking for ${meaning.en}.`]],
			[{ posCn: "名词", posEn: "Noun", before: "", after: "をもってきてください。" }, [`请把${meaning.cn}带来。`, `Please bring ${meaning.en}.`]],
		];
		const [base, translation] = variants[pick % variants.length];
		return finishUsage(word, surface, base, translation);
	}
	const variants: readonly (readonly [UsageBase, Translation])[] = [
		[{ posCn: "名词", posEn: "Noun", before: "", after: "についてくわしくしらべました。" }, [`详细调查了${meaning.cn}。`, `I looked into ${meaning.en} in detail.`]],
		[{ posCn: "名词", posEn: "Noun", before: "", after: "についてせつめいしてください。" }, [`请说明一下${meaning.cn}。`, `Please explain ${meaning.en}.`]],
		[{ posCn: "名词", posEn: "Noun", before: "", after: "についてしつもんがあります。" }, [`关于${meaning.cn}，我有一个问题。`, `I have a question about ${meaning.en}.`]],
		[{ posCn: "名词", posEn: "Noun", before: "", after: "についてはなしました。" }, [`谈到了${meaning.cn}。`, `We talked about ${meaning.en}.`]],
		[{ posCn: "名词", posEn: "Noun", before: "", after: "についてかんがえています。" }, [`正在思考${meaning.cn}。`, `I’m thinking about ${meaning.en}.`]],
		[{ posCn: "名词", posEn: "Noun", before: "", after: "についてのしりょうをよみました。" }, [`阅读了关于${meaning.cn}的资料。`, `I read some material about ${meaning.en}.`]],
	];
	const [base, translation] = variants[pick % variants.length];
	return finishUsage(word, surface, base, translation);
}

export function getKanjiWordUsage(word: KanjiWord): KanjiWordUsage {
	const surface = cleanSurface(word.jp);
	if (VERB_FRAMES[surface]) return finishUsage(word, surface, { posCn: "动词", posEn: "Verb", before: VERB_FRAMES[surface][0], after: VERB_FRAMES[surface][1] }, undefined, true);
	if (I_ADJECTIVE_FRAMES[surface]) return finishUsage(word, surface, { posCn: "い形容词", posEn: "い-adjective", before: I_ADJECTIVE_FRAMES[surface][0], after: I_ADJECTIVE_FRAMES[surface][1] }, undefined, true);
	if (NA_ADJECTIVE_FRAMES[surface]) {
		return finishUsage(word, surface, { posCn: "な形容词", posEn: "な-adjective", before: NA_ADJECTIVE_FRAMES[surface][0], after: NA_ADJECTIVE_FRAMES[surface][1] }, undefined, true);
	}
	if (word.jp.includes("(な)") || word.jp.includes("（な）")) {
		const meaning = translatedMeaning(word);
		return finishUsage(word, surface, { posCn: "な形容词", posEn: "な-adjective", before: "これはとても", after: "です。" }, [`这非常${meaning.cn}。`, `This is very ${meaning.en}.`]);
	}
	if (ADVERB_FRAMES[word.jp]) return {
		...finishUsage(word, surface, {
			posCn: "副词",
			posEn: "Adverb",
			before: ADVERB_FRAMES[word.jp][0],
			after: ADVERB_FRAMES[word.jp][1],
			focus: word.jp === "必死(に)" ? "必死に" : surface,
			focusReading: word.jp === "必死(に)" ? "ひっしに" : word.reading,
		}, undefined, true),
	};
	if (EXPRESSIONS[word.jp]) {
		const focus = EXPRESSION_FOCUS[word.jp];
		return finishUsage(word, surface, {
			posCn: "表达",
			posEn: "Expression",
			before: EXPRESSIONS[word.jp][0],
			after: EXPRESSIONS[word.jp][1],
			focus: focus?.[0],
			focusReading: focus?.[1],
		}, undefined, true);
	}
	if (NOUN_FRAMES[surface]) return finishUsage(word, surface, { posCn: "名词", posEn: "Noun", before: NOUN_FRAMES[surface][0], after: NOUN_FRAMES[surface][1] }, undefined, true);
	return nounUsage(word, surface);
}

export function kanjiWordSurface(word: KanjiWord) {
	return cleanSurface(word.jp);
}
