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
      "grammar": "…",                  // 可选：该句的语法/敬语要点（简洁，N2 水准）。纯应答句可省略，不要注水
      "vocab": [                       // 可选：该句值得记的生词，不要注水
        { "w": "売上データ", "r": "うりあげデータ", "pos": "名词", "zh": "销售数据" }
      ]
    }
  ]
}
```

## 原文来源

视频为「静态图 + 朗读音频」形式：画面整幅印着教材页全文。转录以视频画面（高清帧）逐字读取，
ASR/字幕不可用时不要用语音识别硬转冒充原文。疑难字词放大帧面复核。
