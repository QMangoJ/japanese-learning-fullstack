import type { KanjiExamBatch, KanjiExamQuestion } from "./kanji-exam";

const batchEnglish: Record<string, { title: string; subtitle: string }> = {
	"school-kanji-2026-08-21": { title: "School Kanji · Chapter 2", subtitle: "Checkout · Inside the store · 24 hours" },
	"school-kanji-chapter-3-2026-08-22": { title: "School Kanji · Chapter 3", subtitle: "Luggage · Address · Prefectures" },
	"school-kanji-chapter-4-2026-08-22": { title: "School Kanji · Chapter 4", subtitle: "Dating · Wedding anniversary · Work" },
};

const lessonEnglish: Record<string, string> = {
	"ch2-1-register": "Chapter 2-1 · Checkout",
	"ch2-2-store-floor": "Chapter 2-2 · Inside the store",
	"ch2-3-all-day": "Chapter 2-3 · 24 hours",
	"ch3-1-luggage": "Chapter 3-1 · Luggage",
	"ch3-2-address": "Chapter 3-2 · Address",
	"ch3-3-prefectures": "Chapter 3-3 · Prefectures",
	"ch4-1-date": "Chapter 4-1 · Dating",
	"ch4-2-anniversary": "Chapter 4-2 · Wedding anniversary",
	"ch4-3-work": "Chapter 4-3 · Work",
};

const kanjiMeaning: Record<string, string> = {
	便利: "convenient", 白黒: "black and white", 朝晩: "morning and evening", 前後: "before and after; front and back",
	店: "shop; store", 客: "guest; customer", 親: "parent; close", 切: "cut", 売: "sell", 当: "hit; apply; correct", 品: "item; goods",
	便: "convenience; mail; transport service", 利: "advantage; benefit", 使: "use", 銀: "silver", 白: "white", 黒: "black", 紙: "paper",
	朝: "morning", 晩: "evening", 昼: "daytime; noon", 夜: "night", 前: "front; before", 後: "behind; after", 午: "noon", 早: "early; fast",
	荷: "load; baggage", 送: "send", 宅: "home; residence", 急: "hurry; urgent", 速: "fast", 遅: "late; slow", 重: "heavy; important", 軽: "light",
	住: "live; reside", 所: "place", 様: "honorific; manner; appearance", 主: "main; owner", 番: "number; turn; duty", 地: "ground; place", 号: "number; issue", 京: "capital",
	国: "country", 都: "metropolis; capital", 道: "road; way", 府: "prefecture (Osaka or Kyoto)", 県: "prefecture", 市: "city; market", 区: "ward; district", 村: "village",
	毎: "every", 週: "week", 映: "reflect; project", 画: "picture; stroke", 館: "large or public building; hall", 公: "public", 園: "garden; park",
	夫: "husband", 妻: "wife", 特: "special", 思: "think", 料: "fee; material", 理: "reason; logic", 有: "have; exist",
	会: "meet; association", 社: "company; shrine", 働: "work", 作: "make", 工: "craft; construction", 場: "place", 始: "begin", 終: "end",
};

const wordMeaning: Record<string, string> = {
	店: "shop; store", 店員: "store clerk", 本店: "main store; head office", "お客さん": "customer; guest", 店内: "inside the store", 旅客機: "passenger plane",
	親: "parent", 親しい: "close; intimate", 親切: "kind; helpful", 両親: "parents", 切って: "cut", 売りました: "sold", 売れました: "sold; were sold", 売店: "kiosk; concession stand",
	当たって: "hit; strike", 当てました: "guessed correctly; won", 品物: "goods; item", 品切れ: "sold out", 食品: "food product", 上品: "elegant; refined", 商品券: "gift certificate",
	便り: "news; letter", 便利: "convenient", 郵便局: "post office", 便: "flight; transport service", 利用: "use; make use of", 使い方: "how to use", 大使: "ambassador", 使用: "use",
	銀行: "bank", 使います: "use", 銀メダル: "silver medal", 白黒: "black and white", 白い: "white", 白衣: "white coat", 真っ黒: "pitch-black", 黒板: "blackboard",
	紙: "paper", 用紙: "form; sheet of paper", 新聞紙: "newspaper", 折り紙: "origami paper; colored folding paper",
	朝: "morning", 朝食: "breakfast", 朝日: "morning sun", 朝晩: "morning and evening", "晩ごはん": "dinner", 昼休み: "lunch break", 昼食: "lunch",
	夜: "night", 夜道: "road at night", 夜食: "late-night meal", 前: "front; before", 名前: "name", 前後: "front and back; before and after", 後ろ: "behind; back", 後: "after; later",
	午前: "a.m.; morning", 午後: "p.m.; afternoon", 正午: "noon", 早くて: "early", 早く: "early", 早朝: "early morning",
	荷物: "luggage; package", 手荷物: "hand luggage", 送って: "send", 送りました: "took; accompanied (someone)", 送別会: "farewell party", "お宅": "someone's home (polite)", 住宅: "housing; residence; houses", 宅配: "home delivery",
	急いで: "in a hurry; quickly", 急に: "suddenly", 速い: "fast", 時速: "speed; kilometers per hour", 遅れて: "was late; arrived late", 遅刻: "being late; tardiness", 重ねて: "in layers; layer one over another", 重い: "heavy", 重要: "important", 軽くて: "lightweight", 軽く: "lighter; less sluggish",
	住んで: "live; reside", 住宅街: "residential area", 所: "place", 住所: "address", "お客様": "customer; guest (polite)", 様: "-sama; honorific suffix", 様子: "state; appearance", 持ち主: "owner", "ご主人": "someone's husband (polite)",
	一番: "first place; number one", 交番: "police box", 掃除当番: "cleaning duty; person or group on duty", 地下: "underground; basement", 地味: "plain; subdued", 電話番号: "telephone number", "301号室": "Room 301", "11月号": "November issue", 東京: "Tokyo", 京浜: "Tokyo–Yokohama area",
	国: "country", 国語: "Japanese (school subject); national language", 国籍: "nationality", 東京都: "Tokyo Metropolis", 首都: "capital city", 都会: "city; urban area", 道: "road; way", 北海道: "Hokkaido", 大阪府: "Osaka Prefecture", 府: "prefecture (Osaka or Kyoto)", 県: "prefecture", 山口県: "Yamaguchi Prefecture",
	市役所: "city hall", 市長: "mayor", 朝市: "morning market", 区: "ward; district", 区内: "within the ward", 村: "village", 市町村: "municipalities",
	毎日: "every day", 毎年: "every year", 毎週: "every week", "1週間": "one week", 週末: "weekend", 映って: "appear on screen; be shown", 映します: "project; display on a screen", 映画: "movie", 画家: "painter", 計画: "plan", 映画館: "movie theater", 大使館: "embassy", 洋館: "Western-style building",
	"公に": "publicly", 公立: "public; state-run", 公私: "public and private life; work and personal affairs", 主人公: "main character", 公園: "park",
	夫: "husband", "ご夫妻": "married couple (polite)", 夫婦: "married couple", 妻: "wife", 愛妻家: "devoted husband", 特に: "especially", 特別: "special", 思って: "intend; plan (to)", 思い出: "memory", 意思: "intention; will",
	料金: "fee; charge", 食料: "food supplies", 給料: "salary", 料理: "cooking; cuisine", 理系: "science and engineering track", 有名: "famous", 有力: "valuable; promising (information or a lead)", 有料: "paid; fee-charging",
	会って: "meet", 入会: "join; enroll", 会話: "conversation", 会社: "company", 社長: "company president", 社会人: "working adult; member of society", 働きながら: "while working", 労働: "labor; work", 作りました: "made", 作家: "author; writer", 作物: "crops",
	工学部: "faculty of engineering", スキー場: "ski resort", 人工: "artificial; man-made", 工場: "factory", 場: "place; occasion", 本場: "home; place of origin", 始まります: "begin", 年始: "beginning of the year", 始業式: "school-term opening ceremony", 終わって: "finish; be finished", 終電: "last train",
};

export function englishBatchLabel(batch: KanjiExamBatch) {
	return batchEnglish[batch.id] || { title: batch.title, subtitle: batch.subtitle };
}

export function englishLessonLabel(lessonId: string, fallback: string) {
	return lessonEnglish[lessonId] || fallback;
}

export function englishSupportForQuestion(question: KanjiExamQuestion) {
	if (question.kind === "reading") {
		return { label: "Word meaning", meaning: wordMeaning[question.target] || "Meaning not yet reviewed" };
	}
	return { label: "Kanji meaning", meaning: kanjiMeaning[question.answer] || "Meaning not yet reviewed" };
}

export function missingEnglishSupport(questions: KanjiExamQuestion[]) {
	return questions.filter((question) => englishSupportForQuestion(question).meaning === "Meaning not yet reviewed");
}
