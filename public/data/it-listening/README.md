# IT 听力数据 · IT Listening data

学习区「IT 听力」(`/study/#/it-listening`) 读这里的文件。每篇文章一个 JSON，`index.json` 是目录。

```
public/data/it-listening/
  index.json              { "version": 1, "articles": [ {目录条目} ] }
  <id>.json               一篇文章（下面的结构）
```

## 目录条目（index.json）

```jsonc
{
  "id": "unit15-operation-demo",      // kebab-case，和文件名一致，网址是 /study/#/it-listening/<id>
  "title_zh": "「场景会话」Unit 15：操作演示",
  "title_ja": "「場面で覚える」Unit 15：オペレーションデモ",
  "series_zh": "场景会话",             // 系列分组（列表页按系列排序/标注）
  "series_ja": "場面で覚える",
  "unit": 15,
  "track": "TRACK 37",                // 可选：教材音轨编号
  "source": "まいにち日本語勉強（YouTube）",  // 来源频道名
  "channelUrl": "https://www.youtube.com/@mainichi.nihongo.benkyo",
  "youtube": "https://www.youtube.com/watch?v=…",   // 必填：原视频链接
  "videoId": "…",                      // 必填：YouTube 视频 ID（详情页嵌入播放器用）
  "durationSec": 260,                  // 可选
  "sentenceCount": 30
}
```

## `<id>.json`

目录条目的全部字段，外加：

```jsonc
{
  "note_zh": "…",                      // 可选：转录来源/处理说明，显示在详情页原文区上方
  "sentences": [
    {
      "speaker": "リー",               // 说话人（原文标注，如 リー / ユーザー）
      "jp": "では、次に売上データを追加してみましょうか。",   // 日文原句（逐句）
      "zh": "那么，接下来试着添加一下销售数据吧。",          // 中文翻译，必填
      "grammarPoints": [               // 语法层标准（2026-11-08 起，news-learning 体例）：每句至少 1 条，不得整句空白
        { "level": "N2",                 // JLPT 级别
          "name": "「〜てもらいます」安排分工（非请求）",   // 语法点名（可带类别前缀，如「謙譲語：〜」）
          "explanationZh": "…" }         // 中文解析：接续/构成 + 在本句的含义/作用 + 场景/敬语/注意，2~4 句，news 的 explanationZh 深度
      ],
      "structure": "…",                // 可选：整句结构拆解（news 的 keySentences.structureZh），成分＋中文 gloss 以「＋」连接；只给结构复杂的长句
      "grammar": "…",                  // 旧式单段语法注（升级前的文章在用，新文章不再写）
      "vocab": [                       // 可选：该句值得记的生词，不要注水
        { "w": "売上データ", "r": "うりあげデータ", "pos": "名词", "zh": "销售数据" }
      ]
    }
  ]
}
```

## 语法层标准（news-learning 体例，2026-11-08 Daniel 定）

逐句语法解析按阅读项目 news-learning 的做法（其 enrich 数据的 grammarPoints / keySentences）：

- 每句至少 1 条 `grammarPoints`，逐条列出：`level`（JLPT 级别）+ `name`（语法点名）+ `explanationZh`（接续/构成 → 本句含义 → 场景/敬语/易混点，写满 2~4 句，不要一句话带过）。
- 敬语（尊敬/自谦/丁重）、词汇搭配、语用功能（应答、留半句、确认节奏）都算语法点，单独成条。
- 结构复杂的长句另给 `structure`（句干拆解）；news 的 `keySentences.notesZh`（语用讲解）并入该句最后一条 grammarPoint 的 explanationZh 末尾，不另设字段。
- 纯应答句（「はい。」「そうです。」等）给极简语用注（它在对话里的功能），不留空白。
- news 的 `reading`（整句假名读音）不映射：本模块有朗读按钮，且教材页原文自带 furigana。

## 原文来源

视频为「静态图 + 朗读音频」形式：画面整幅印着教材页全文。转录以视频画面（高清帧）逐字读取，
ASR/字幕不可用时不要用语音识别硬转冒充原文。疑难字词放大帧面复核。
