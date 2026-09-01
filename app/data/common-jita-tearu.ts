export type JitaTearuExample = {
	jp: string;
	jp_r: string;
	cn: string;
	en: string;
};

/* 「他動詞＋てあります」を既存の自他動詞比較カード内に出すための校閲済み例文。
 * てありますは意図的な準備・処置の結果が残っていることを表すため、
 * 元の「を＋ます」例文を機械変換せず、それぞれ自然な場面に書き直している。 */
export const JITA_TEARU_EXAMPLES: Record<string, JitaTearuExample> = {
	"開ける": {
		jp: "ドアが開けてあります。",
		jp_r: "ドアが<ruby>開<rt>あ</rt></ruby>けてあります。",
		cn: "门有人特意开着。",
		en: "The door has been intentionally left open.",
	},
	"閉める": {
		jp: "窓が閉めてあります。",
		jp_r: "<ruby>窓<rt>まど</rt></ruby>が<ruby>閉<rt>し</rt></ruby>めてあります。",
		cn: "窗户有人特意关好了。",
		en: "The window has been intentionally closed.",
	},
	"つける": {
		jp: "電気がつけてあります。",
		jp_r: "<ruby>電気<rt>でんき</rt></ruby>がつけてあります。",
		cn: "灯有人特意开着。",
		en: "The light has been intentionally left on.",
	},
	"消す": {
		jp: "廊下の電気は消してあります。",
		jp_r: "<ruby>廊下<rt>ろうか</rt></ruby>の<ruby>電気<rt>でんき</rt></ruby>は<ruby>消<rt>け</rt></ruby>してあります。",
		cn: "走廊的灯已经关好了。",
		en: "The hallway lights have been turned off.",
	},
	"壊す": {
		jp: "箱は捨てやすいように壊してあります。",
		jp_r: "<ruby>箱<rt>はこ</rt></ruby>は<ruby>捨<rt>す</rt></ruby>てやすいように<ruby>壊<rt>こわ</rt></ruby>してあります。",
		cn: "箱子已经拆开，方便丢弃。",
		en: "The box has been broken down to make it easier to discard.",
	},
	"切る": {
		jp: "紙が必要な大きさに切ってあります。",
		jp_r: "<ruby>紙<rt>かみ</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>大<rt>おお</rt></ruby>きさに<ruby>切<rt>き</rt></ruby>ってあります。",
		cn: "纸已经按需要的尺寸剪好了。",
		en: "The paper has been cut to the required size.",
	},
	"割る": {
		jp: "チョコレートは食べやすい大きさに割ってあります。",
		jp_r: "チョコレートは<ruby>食<rt>た</rt></ruby>べやすい<ruby>大<rt>おお</rt></ruby>きさに<ruby>割<rt>わ</rt></ruby>ってあります。",
		cn: "巧克力已经掰成了方便食用的大小。",
		en: "The chocolate has been broken into easy-to-eat pieces.",
	},
	"折る": {
		jp: "紙は半分に折ってあります。",
		jp_r: "<ruby>紙<rt>かみ</rt></ruby>は<ruby>半分<rt>はんぶん</rt></ruby>に<ruby>折<rt>お</rt></ruby>ってあります。",
		cn: "纸已经对折好了。",
		en: "The paper has been folded in half.",
	},
	"破る": {
		jp: "古い書類は細かく破ってあります。",
		jp_r: "<ruby>古<rt>ふる</rt></ruby>い<ruby>書類<rt>しょるい</rt></ruby>は<ruby>細<rt>こま</rt></ruby>かく<ruby>破<rt>やぶ</rt></ruby>ってあります。",
		cn: "旧文件已经撕碎了。",
		en: "The old documents have been torn into small pieces.",
	},
	"落とす": {
		jp: "シャツの汚れは洗剤で落としてあります。",
		jp_r: "シャツの<ruby>汚<rt>よご</rt></ruby>れは<ruby>洗剤<rt>せんざい</rt></ruby>で<ruby>落<rt>お</rt></ruby>としてあります。",
		cn: "衬衫上的污渍已经用洗涤剂去掉了。",
		en: "The stain on the shirt has been removed with detergent.",
	},
	"入れる": {
		jp: "必要な本がカバンに入れてあります。",
		jp_r: "<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>本<rt>ほん</rt></ruby>がカバンに<ruby>入<rt>い</rt></ruby>れてあります。",
		cn: "需要的书已经放进包里了。",
		en: "The necessary books have been put in the bag.",
	},
	"出す": {
		jp: "荷物は廊下に出してあります。",
		jp_r: "<ruby>荷物<rt>にもつ</rt></ruby>は<ruby>廊下<rt>ろうか</rt></ruby>に<ruby>出<rt>だ</rt></ruby>してあります。",
		cn: "行李已经搬到走廊里了。",
		en: "The luggage has been put out in the hallway.",
	},
	"止める": {
		jp: "車は入口の前に止めてあります。",
		jp_r: "<ruby>車<rt>くるま</rt></ruby>は<ruby>入口<rt>いりぐち</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>に<ruby>止<rt>と</rt></ruby>めてあります。",
		cn: "车已经停在入口前面了。",
		en: "The car has been parked in front of the entrance.",
	},
	"掛ける": {
		jp: "壁に時計が掛けてあります。",
		jp_r: "<ruby>壁<rt>かべ</rt></ruby>に<ruby>時計<rt>とけい</rt></ruby>が<ruby>掛<rt>か</rt></ruby>けてあります。",
		cn: "墙上挂着钟。",
		en: "A clock has been hung on the wall.",
	},
	"乗せる": {
		jp: "荷物は車に乗せてあります。",
		jp_r: "<ruby>荷物<rt>にもつ</rt></ruby>は<ruby>車<rt>くるま</rt></ruby>に<ruby>乗<rt>の</rt></ruby>せてあります。",
		cn: "行李已经装到车上了。",
		en: "The luggage has been loaded into the car.",
	},
	"届ける": {
		jp: "荷物は受付に届けてあります。",
		jp_r: "<ruby>荷物<rt>にもつ</rt></ruby>は<ruby>受付<rt>うけつけ</rt></ruby>に<ruby>届<rt>とど</rt></ruby>けてあります。",
		cn: "行李已经送到前台了。",
		en: "The luggage has been delivered to reception.",
	},
	"始める": {
		jp: "作業はもう始めてあります。",
		jp_r: "<ruby>作業<rt>さぎょう</rt></ruby>はもう<ruby>始<rt>はじ</rt></ruby>めてあります。",
		cn: "工作已经提前开始了。",
		en: "The work has already been started.",
	},
	"続ける": {
		jp: "番号は前のページから続けてあります。",
		jp_r: "<ruby>番号<rt>ばんごう</rt></ruby>は<ruby>前<rt>まえ</rt></ruby>のページから<ruby>続<rt>つづ</rt></ruby>けてあります。",
		cn: "编号接着上一页排下来了。",
		en: "The numbering has been continued from the previous page.",
	},
	"終える": {
		jp: "必要な作業は午前中に終えてあります。",
		jp_r: "<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>作業<rt>さぎょう</rt></ruby>は<ruby>午前中<rt>ごぜんちゅう</rt></ruby>に<ruby>終<rt>お</rt></ruby>えてあります。",
		cn: "必要的工作已经在上午完成了。",
		en: "The necessary work has been completed in the morning.",
	},
	"見つける": {
		jp: "必要な資料は見つけてあります。",
		jp_r: "<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>資料<rt>しりょう</rt></ruby>は<ruby>見<rt>み</rt></ruby>つけてあります。",
		cn: "需要的资料已经找好了。",
		en: "The necessary materials have already been found.",
	},
	"決める": {
		jp: "会議の日は来週の月曜日に決めてあります。",
		jp_r: "<ruby>会議<rt>かいぎ</rt></ruby>の<ruby>日<rt>ひ</rt></ruby>は<ruby>来週<rt>らいしゅう</rt></ruby>の<ruby>月曜日<rt>げつようび</rt></ruby>に<ruby>決<rt>き</rt></ruby>めてあります。",
		cn: "会议日期已经定在下周一了。",
		en: "The meeting has been scheduled for next Monday.",
	},
	"直す": {
		jp: "壊れた時計はもう直してあります。",
		jp_r: "<ruby>壊<rt>こわ</rt></ruby>れた<ruby>時計<rt>とけい</rt></ruby>はもう<ruby>直<rt>なお</rt></ruby>してあります。",
		cn: "坏掉的钟已经修好了。",
		en: "The broken clock has already been repaired.",
	},
	"変える": {
		jp: "予約時間は三時に変えてあります。",
		jp_r: "<ruby>予約時間<rt>よやくじかん</rt></ruby>は<ruby>三時<rt>さんじ</rt></ruby>に<ruby>変<rt>か</rt></ruby>えてあります。",
		cn: "预约时间已经改成三点了。",
		en: "The reservation time has been changed to three o'clock.",
	},
	"起こす": {
		jp: "子どもはもう起こしてあります。",
		jp_r: "<ruby>子<rt>こ</rt></ruby>どもはもう<ruby>起<rt>お</rt></ruby>こしてあります。",
		cn: "孩子已经叫醒了。",
		en: "The child has already been woken up.",
	},
	"残す": {
		jp: "あなたの分は一つ残してあります。",
		jp_r: "あなたの<ruby>分<rt>ぶん</rt></ruby>は<ruby>一<rt>ひと</rt></ruby>つ<ruby>残<rt>のこ</rt></ruby>してあります。",
		cn: "已经给你留了一个。",
		en: "One has been saved for you.",
	},
	"並べる": {
		jp: "本は番号順に並べてあります。",
		jp_r: "<ruby>本<rt>ほん</rt></ruby>は<ruby>番号順<rt>ばんごうじゅん</rt></ruby>に<ruby>並<rt>なら</rt></ruby>べてあります。",
		cn: "书已经按编号顺序摆好了。",
		en: "The books have been arranged in numerical order.",
	},
	"集める": {
		jp: "必要な写真は全部集めてあります。",
		jp_r: "<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>写真<rt>しゃしん</rt></ruby>は<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>集<rt>あつ</rt></ruby>めてあります。",
		cn: "需要的照片已经全部收集好了。",
		en: "All the necessary photographs have been collected.",
	},
	"増やす": {
		jp: "椅子は十脚に増やしてあります。",
		jp_r: "<ruby>椅子<rt>いす</rt></ruby>は<ruby>十脚<rt>じゅっきゃく</rt></ruby>に<ruby>増<rt>ふ</rt></ruby>やしてあります。",
		cn: "椅子已经增加到十把了。",
		en: "The number of chairs has been increased to ten.",
	},
	"減らす": {
		jp: "砂糖はいつもの半分に減らしてあります。",
		jp_r: "<ruby>砂糖<rt>さとう</rt></ruby>はいつもの<ruby>半分<rt>はんぶん</rt></ruby>に<ruby>減<rt>へ</rt></ruby>らしてあります。",
		cn: "糖已经减到平时的一半了。",
		en: "The sugar has been reduced to half the usual amount.",
	},
	"上げる": {
		jp: "暖房の温度は二十二度に上げてあります。",
		jp_r: "<ruby>暖房<rt>だんぼう</rt></ruby>の<ruby>温度<rt>おんど</rt></ruby>は<ruby>二十二度<rt>にじゅうにど</rt></ruby>に<ruby>上<rt>あ</rt></ruby>げてあります。",
		cn: "暖气温度已经调高到二十二度了。",
		en: "The heating has been turned up to twenty-two degrees.",
	},
	"下げる": {
		jp: "テレビの音量は小さく下げてあります。",
		jp_r: "テレビの<ruby>音量<rt>おんりょう</rt></ruby>は<ruby>小<rt>ちい</rt></ruby>さく<ruby>下<rt>さ</rt></ruby>げてあります。",
		cn: "电视音量已经调低了。",
		en: "The television volume has been turned down.",
	},
	"進める": {
		jp: "会議の準備は途中まで進めてあります。",
		jp_r: "<ruby>会議<rt>かいぎ</rt></ruby>の<ruby>準備<rt>じゅんび</rt></ruby>は<ruby>途中<rt>とちゅう</rt></ruby>まで<ruby>進<rt>すす</rt></ruby>めてあります。",
		cn: "会议准备已经提前进行了一部分。",
		en: "The meeting preparations have already been partly completed.",
	},
	"動かす": {
		jp: "机は窓の近くに動かしてあります。",
		jp_r: "<ruby>机<rt>つくえ</rt></ruby>は<ruby>窓<rt>まど</rt></ruby>の<ruby>近<rt>ちか</rt></ruby>くに<ruby>動<rt>うご</rt></ruby>かしてあります。",
		cn: "桌子已经移到窗边了。",
		en: "The desk has been moved near the window.",
	},
	"戻す": {
		jp: "読み終わった本は棚に戻してあります。",
		jp_r: "<ruby>読<rt>よ</rt></ruby>み<ruby>終<rt>お</rt></ruby>わった<ruby>本<rt>ほん</rt></ruby>は<ruby>棚<rt>たな</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>してあります。",
		cn: "读完的书已经放回书架了。",
		en: "The finished books have been returned to the shelf.",
	},
	"降ろす": {
		jp: "荷物は車から降ろしてあります。",
		jp_r: "<ruby>荷物<rt>にもつ</rt></ruby>は<ruby>車<rt>くるま</rt></ruby>から<ruby>降<rt>お</rt></ruby>ろしてあります。",
		cn: "行李已经从车上卸下来了。",
		en: "The luggage has been unloaded from the car.",
	},
	"通す": {
		jp: "ひもは穴に通してあります。",
		jp_r: "ひもは<ruby>穴<rt>あな</rt></ruby>に<ruby>通<rt>とお</rt></ruby>してあります。",
		cn: "绳子已经穿过孔了。",
		en: "The cord has been threaded through the hole.",
	},
	"倒す": {
		jp: "台風に備えて鉢植えは横に倒してあります。",
		jp_r: "<ruby>台風<rt>たいふう</rt></ruby>に<ruby>備<rt>そな</rt></ruby>えて<ruby>鉢植<rt>はちう</rt></ruby>えは<ruby>横<rt>よこ</rt></ruby>に<ruby>倒<rt>たお</rt></ruby>してあります。",
		cn: "为了防台风，盆栽已经横放倒了。",
		en: "The potted plants have been laid on their sides in preparation for the typhoon.",
	},
	"広げる": {
		jp: "地図が机の上に広げてあります。",
		jp_r: "<ruby>地図<rt>ちず</rt></ruby>が<ruby>机<rt>つくえ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>に<ruby>広<rt>ひろ</rt></ruby>げてあります。",
		cn: "地图已经铺在桌子上了。",
		en: "The map has been spread out on the desk.",
	},
	"伸ばす": {
		jp: "ロープはまっすぐ伸ばしてあります。",
		jp_r: "ロープはまっすぐ<ruby>伸<rt>の</rt></ruby>ばしてあります。",
		cn: "绳子已经拉直了。",
		en: "The rope has been stretched out straight.",
	},
	"汚す": {
		jp: "衣装は古く見えるように汚してあります。",
		jp_r: "<ruby>衣装<rt>いしょう</rt></ruby>は<ruby>古<rt>ふる</rt></ruby>く<ruby>見<rt>み</rt></ruby>えるように<ruby>汚<rt>よご</rt></ruby>してあります。",
		cn: "服装已经特意做旧了。",
		en: "The costume has been deliberately dirtied to make it look old.",
	},
	"外す": {
		jp: "名札は外してあります。",
		jp_r: "<ruby>名札<rt>なふだ</rt></ruby>は<ruby>外<rt>はず</rt></ruby>してあります。",
		cn: "名牌已经取下来了。",
		en: "The name tag has been removed.",
	},
	"温める": {
		jp: "スープはもう温めてあります。",
		jp_r: "スープはもう<ruby>温<rt>あたた</rt></ruby>めてあります。",
		cn: "汤已经热好了。",
		en: "The soup has already been warmed up.",
	},
	"冷やす": {
		jp: "ジュースは冷蔵庫で冷やしてあります。",
		jp_r: "ジュースは<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>で<ruby>冷<rt>ひ</rt></ruby>やしてあります。",
		cn: "果汁已经放在冰箱里冰好了。",
		en: "The juice has been chilled in the refrigerator.",
	},
	"沸かす": {
		jp: "お湯はもう沸かしてあります。",
		jp_r: "お<ruby>湯<rt>ゆ</rt></ruby>はもう<ruby>沸<rt>わ</rt></ruby>かしてあります。",
		cn: "热水已经烧好了。",
		en: "The water has already been boiled.",
	},
	"乾かす": {
		jp: "洗った服はよく乾かしてあります。",
		jp_r: "<ruby>洗<rt>あら</rt></ruby>った<ruby>服<rt>ふく</rt></ruby>はよく<ruby>乾<rt>かわ</rt></ruby>かしてあります。",
		cn: "洗过的衣服已经充分晾干了。",
		en: "The washed clothes have been dried thoroughly.",
	},
	"溶かす": {
		jp: "チョコレートは湯せんで溶かしてあります。",
		jp_r: "チョコレートは<ruby>湯<rt>ゆ</rt></ruby>せんで<ruby>溶<rt>と</rt></ruby>かしてあります。",
		cn: "巧克力已经隔水融化好了。",
		en: "The chocolate has been melted in a hot-water bath.",
	},
	"燃やす": {
		jp: "落ち葉は安全な場所で燃やしてあります。",
		jp_r: "<ruby>落<rt>お</rt></ruby>ち<ruby>葉<rt>ば</rt></ruby>は<ruby>安全<rt>あんぜん</rt></ruby>な<ruby>場所<rt>ばしょ</rt></ruby>で<ruby>燃<rt>も</rt></ruby>やしてあります。",
		cn: "落叶已经在安全的地方烧掉了。",
		en: "The fallen leaves have been burned in a safe place.",
	},
	"育てる": {
		jp: "苗は植え替えられる大きさまで育ててあります。",
		jp_r: "<ruby>苗<rt>なえ</rt></ruby>は<ruby>植<rt>う</rt></ruby>え<ruby>替<rt>か</rt></ruby>えられる<ruby>大<rt>おお</rt></ruby>きさまで<ruby>育<rt>そだ</rt></ruby>ててあります。",
		cn: "幼苗已经培育到可以移栽的大小了。",
		en: "The seedlings have been raised until they are large enough to transplant.",
	},
	"伝える": {
		jp: "予定の変更は全員に伝えてあります。",
		jp_r: "<ruby>予定<rt>よてい</rt></ruby>の<ruby>変更<rt>へんこう</rt></ruby>は<ruby>全員<rt>ぜんいん</rt></ruby>に<ruby>伝<rt>つた</rt></ruby>えてあります。",
		cn: "日程变更已经通知所有人了。",
		en: "Everyone has been informed of the schedule change.",
	},
	"なくす": {
		jp: "危険な部分はすべてなくしてあります。",
		jp_r: "<ruby>危険<rt>きけん</rt></ruby>な<ruby>部分<rt>ぶぶん</rt></ruby>はすべてなくしてあります。",
		cn: "危险的部分已经全部消除了。",
		en: "All of the dangerous parts have been eliminated.",
	},
	"治す": {
		jp: "虫歯は全部治してあります。",
		jp_r: "<ruby>虫歯<rt>むしば</rt></ruby>は<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>治<rt>なお</rt></ruby>してあります。",
		cn: "蛀牙已经全部治好了。",
		en: "All of the cavities have been treated.",
	},
};
