# 英语听力 · English listening

学习区「英语听力」（`/study/#/en-listening`）读这里的文件。一篇一个 JSON，`index.json` 是目录、官方样题链接和 11/11–11/30 的安排。

```
public/data/en-listening/
  index.json
  <id>.json
```

音频只嵌公开 YouTube 片段（`startSec` / `endSec`），不放音频文件，也不使用合成语音。托业样题只链到 IIBC 和 ETS 的官方页面。

## 目录条目

和 IT 听力同一思路：`title_zh` / `title_en` / `videoTitle` 用来源视频的原标题（oEmbed，不翻译）。`textbookTitle_zh` 是这段在练什么。

```jsonc
{
  "id": "en-phone-manner",
  "videoId": "…",
  "youtube": "https://www.youtube.com/watch?v=…",
  "startSec": 0,
  "endSec": 311,
  "durationSec": 311,          // endSec - startSec，嵌入播放器用这两端
  "sentenceCount": 30
}
```

## `<id>.json`

目录字段之外：

```jsonc
{
  "note_zh": "节选范围、说话人、字幕怎么整理的。",
  "sentences": [
    {
      "speaker": "Anna",
      "en": "Hello? Tip Top Trading. This is Anna speaking.",
      "zh": "你好，Tip Top Trading，我是 Anna。",
      "vocab": [{ "w": "speaking", "zh": "（电话里）我是" }],
      "note": "This is Anna speaking. 接起电话时报自己的名字。"
    }
  ]
}
```

`note` 只在有一句值得带走的说法时才写。不写日语语法点。
