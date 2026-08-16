import { chapter5AnswerText } from "./listening-n3-answers-ch45";
import { chapter1Lessons } from "./listening-n3-lessons-ch1";
import { chapter2Lessons } from "./listening-n3-lessons-ch2";
import { chapter3Lessons } from "./listening-n3-lessons-ch3";
import { chapter4Lessons } from "./listening-n3-lessons-ch4";
import type { ListeningLesson, ListeningLessonBlock } from "./listening-n3-lesson-types";
import { chapter5Sections } from "./listening-n3-structured-ch45";
import type { ListeningAnswerText, ListeningStructuredSection, ListeningTextBlock } from "./listening-n3-structured-types";
import { findListeningSection } from "./listening-n3-book";

const slogans: Record<string, { jp: string; en?: string; cn?: string }> = {
	"3-1": { jp: "何度も聞くフレーズをきちんと理解しましょう！", en: "Make an effort to understand phrases you often hear in public places!", cn: "应正确理解多次听到的句子！" },
	"3-2": { jp: "数字や固有名詞を聞き取る練習をしましょう！", en: "Practice catching numbers and proper names!", cn: "练习听清数字和专有名词！" },
	"3-3": { jp: "指示や禁止の表現に注意しましょう！", en: "Pay attention to instructions and prohibitions!", cn: "注意指示和禁止的表达！" },
	"3-4": { jp: "職場の敬語を聞き取れるようにしましょう！", en: "Learn to catch workplace keigo!", cn: "应能听懂职场敬语！" },
	"3-5": { jp: "決まった表現を覚えておきましょう！", en: "Remember the set phrases used in shops and hospitals!", cn: "记住医院和各种店里的固定表达！" },
	"3-6": { jp: "今まで習った場所別の聞き取りを復習しましょう。", cn: "复习到目前为止学过的场所听力。" },
	"5-1": { jp: "質問をよく聞いてから答えましょう。", en: "Listen to the question carefully, then answer.", cn: "先听清提问再作答。题目是日语，和考试一样；听完打开「答案」和「译文」。" },
	"5-2": { jp: "選択肢を先に読んでおきましょう。", en: "Read the choices first.", cn: "先读一遍选项。题目是日语，听完对照译文。" },
	"5-3": { jp: "話の内容を最後まで聞きましょう。", en: "Listen to the whole talk.", cn: "把整段内容听到最后，再打开译文确认。" },
	"5-4": { jp: "場面に合う発話を選びましょう。", en: "Choose the line that fits the scene.", cn: "选择符合场面的发话。听完可看译文。" },
	"5-5": { jp: "即時応答に慣れましょう。", en: "Get used to instant replies.", cn: "熟悉即时应答。听完对照译文。" },
};

const chapter5TranscriptCn: Record<number, string> = {
	1: `【1番】电车月台上，男女在说话。洋子的弟弟是哪个孩子？
女：那些孩子在闹，好危险。啊，那个孩子是洋子的弟弟。
男：诶？哪个？
女：就是那个穿黄色短袖的。
男：啊，打伞的那个？好危险。
女：不是不是，在抢包的那个！
洋子的弟弟是哪个孩子？

【2番】男女在说话。男士明天大概几点出门？
女：明天飞机几点？
男：嗯，16点半起飞。
女：国际线得提前两小时到。从这儿到机场要两小时的话……
男：没那么久。现在有快车，一个半小时足够。
男士明天大概几点出门？

【3番】男女在说话。男士接下来做什么？
女：喂，我发邮件了，看了吗？没回……
男：诶？不知道。刚才在洗澡。……啊，来了。电车晚点了啊。你现在在哪？
女：刚到车站。公交车眼睁睁开走了……坐下一班。
男：要不要去接你？
女：不用。对了，帮我煮饭、烧上热水好吗？
男：热水刚才烧过了。煮饭是要洗米吗？
女：不用，按一下电饭煲开关就行。不好意思，八点半左右到。
男士接下来做什么？

【4番】动物园窗口，男士在和工作人员说话。男士要付多少钱？
男：大人 2 个、小孩 2 个，一共多少？
工作人员：大人一位 1000 日元。孩子多大？
男：10 岁和 1 岁。
工作人员：小孩 12 岁以下 500 日元，3 岁以下免费。
男士要付多少钱？

【5番】妈妈在电话答录机里留言。妈妈接下来做什么？
妈：喂，由美？妈妈。今天下班能不能去奶奶家一趟？奶奶刚打电话来说拿到很多苹果，让去取。妈妈身体不舒服，正准备去医院。奶奶说明天要去朋友家，今天必须取。去之前先打个电话说一声。
妈妈接下来做什么？

【6番】夫妻在说话。两人接下来必须做什么？
妻：这个得拿去修。
夫：是啊。自己修不了。可是买的时候是在旅行地……得问买的店或者厂家。
妻：也是……收据没要，店名也记不得。
两人接下来必须做什么？`,
	2: `【1番】为什么想看的节目没录上？
女：这是什么。
男：诶？
女：这不是那个节目。
男：我明明预约了录像啊。
女：是不是设错了？
男：今天凌晨 1 点到 1 点半，7 频道对吧？
女：诶？是昨天吧！昨天晚上！
男：你说什么。半夜 1 点就是今天。
女：啊，也对。那为什么？
男：啊，这是前面的节目。啊！因为棒球延长了。
女：唉。
为什么想看的节目没录上？

【2番】女士为什么生气？
女：最近迷上钓鱼了？
男：嗯，昨天也钓了不少，很开心。
女：那昨晚吃生鱼片了？
男：不，我只钓不吃。怪可怜的。
女：诶！你说什么！到底谁可怜！好好说谢谢然后吃掉不就行了。放回去也只是被玩过的玩具，很快就会死。放生就行这种想法很奇怪。对你是玩，对鱼是生死之战，太过分了！
女士为什么生气？

【3番】男士用什么方式还钱？
女：前些天的钱什么时候还？
男：抱歉。想下个月起一点点还……
女：诶？不是发奖金了吗？
男：啊，奖金分期买了别的东西……一半的话还能想办法。
女：那怎么行！一起还给我！
男：对不起。剩下的下个月发工资还。
女：真拿你没办法。下个月必须还。跟谁借也得还。
男士用什么方式还钱？

【4番】电车上有老人站在自己座位前时，男士通常怎么做？
男：以前经常装睡。也装成下一站要下、去别的车厢。其实很想马上让座。可是一紧张，该说什么、让完怎么办、被拒绝多尴尬，想着想着就什么也没做成……
男士通常怎么做？

【5番】酒店前台，女士会住哪个房间？
男：房间是 8 楼 819，这是钥匙。
女：这是海景房吧。
男：不是。啊，您希望海景吗。
女：是的，预约时说了……
男：非常抱歉。请稍等，我查一下。……同层有一间海景空房，但是西式房间……
女：我想要和室，没有别的了吗。
男：抱歉。6 楼有和室，可惜是山景。
女：这样……那没办法。就要这间吧。
女士会住哪个房间？`,
	3: `【1番】店员和客人在说话。男士想做什么？
男：如果决定好了，我来点单。
女：不好意思，后面还要来一个人，能再等一下吗。
男：好的。
……
男：要不要再加点水？
女：谢谢。
男：同行的人还没来呢。要不要先上点饮料？
男士想做什么？
① 想让女士点些东西　② 想让女士离开　③ 想让女士再等一会　④ 想让女士喝水

【2番】夫妻在说话。女士想让男士做什么？
女：这周六去高尔夫？
男：打算去……
女：天气不好吧？
男：下一点没关系。
女：淋雨对身体不好吧？会感冒吧？
男：诶？怎么了？不能去吗？
女：也不是……这周六有特卖。高尔夫服装什么的……
男：什么啊……原来是这样。你的衣服鞋子对吧。好好好，那个必须去。
女：太好了！
女士想让男士做什么？

【3番】男士在说话。对他来说游戏是什么？
男：最近网上玩游戏的人里，有人好像活在游戏世界里。在那里认识的人真的结婚了……分不清游戏和现实，有点可怕。我也闲的时候玩电视游戏，只是享受。工作关系，偶尔也会想这个游戏是怎么做的……不过通常就是什么都不想，打发时间，因为有趣才玩。游戏不就是这样吗。是玩啊。
对他来说游戏是什么？
① 用来认识人　② 对工作有用　③ 和现实分不清　④ 当作玩来享受`,
	4: `【1番】客人要走了。该怎么说？
① 欢迎光临。　② 请别客气。　③ 请再来。

【2番】出租车快到目的地了。该怎么说？
① 请让我在前面那个拐角停。　② 请在前面那个拐角让我下车。　③ 能不能请您在前面那个拐角下车？

【3番】吃不完了。该怎么说？
① 剩下可以吗？（说法不对）　② 剩下也没关系吗？　③ 剩下不好吗？（说法不对）`,
	5: `【1番】不快点要迟到了。
① 真的，得赶紧。　② 晚了就麻烦了。　③ 急了也不会变好。

【2番】方便问一下您的联系方式吗？
① 好的，请打电话。　② 啊，我把名片给您。　③ 地址和电话都没人告诉我。

【3番】妈妈，身体好吗？
① 嗯，还行。　② 嗯，彼此彼此。　③ 嗯，托您的福。

【4番】下雨了，打车去吧。
① 对啊，打伞吧。　② 就那点路，走着去吧。　③ 可是公交晚点了。

【5番】饭好了——
① 这就来。　② 还没，我开动了。　③ 我吃好了。

【6番】这份文件明天之前必须做完吗？
① 今天下午做吧。　② 啊，没赶上呢。　③ 因为明天会议上要用。

【7番】对不起来晚了。路上遇到事故……
① 太好了，赶上了。　② 您做了件不得了的事。　③ 没什么大不了的。`,
};

function convertBlock(block: ListeningTextBlock): ListeningLessonBlock[] {
	switch (block.kind) {
		case "heading":
			return [{ type: "h", jp: block.text }];
		case "tip":
			return [{ type: "tip", jp: block.text }];
		case "paragraph":
		case "note":
			return [{ type: "p", jp: block.text }];
		case "example":
			return [{ type: "example", lines: block.text.split("\n") }];
		case "list":
		case "options":
			return [{ type: "example", lines: block.items.slice() }];
		case "question":
			return [
				{
					type: "q",
					label: block.title,
					tracks: block.tracks,
					options: block.options,
				},
			];
	}
}

function fromStructured(section: ListeningStructuredSection, answers?: ListeningAnswerText, key?: string): ListeningLesson {
	const meta = key ? slogans[key] : undefined;
	const blocks: ListeningLessonBlock[] = [
		{ type: "hero", no: section.number, title: section.title, cn: section.subtitle },
	];
	if (meta) blocks.push({ type: "slogan", jp: meta.jp, en: meta.en, cn: meta.cn });
	for (const page of section.pages) {
		for (const block of page.blocks) blocks.push(...convertBlock(block));
	}
	return {
		blocks,
		answer: answers?.answer ?? "",
		transcript: answers?.transcript ?? "",
	};
}

const chapter5Lessons = chapter5Sections.map((section, index) => {
	const lesson = fromStructured(section, chapter5AnswerText[index], `5-${section.number}`);
	const cn = chapter5TranscriptCn[section.number];
	return cn ? { ...lesson, transcript_cn: cn } : lesson;
});

const byChapter: Record<number, readonly ListeningLesson[]> = {
	1: chapter1Lessons,
	2: chapter2Lessons,
	3: chapter3Lessons,
	4: chapter4Lessons,
	5: chapter5Lessons,
};

export function getListeningLesson(chapter: number, section: number): ListeningLesson | undefined {
	const found = findListeningSection(chapter, section);
	const lesson = byChapter[chapter]?.[section - 1];
	if (!lesson || !found) return lesson;
	if (lesson.blocks[0]?.type === "hero") return lesson;
	return lesson;
}
