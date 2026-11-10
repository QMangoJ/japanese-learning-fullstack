# 阅读文章数据 · Reading articles

不是专题词汇闪卡、而是「一篇文章读下来」形态的内容放这里，目前只有一篇：

```
public/data/reading/
  kanji-journey.json    《漢字的旅程》v8 暂停讲解备忘录
```

## `kanji-journey.json`

日语版视频 `full_ja_v8`（6:01）的暂停讲解：正文 7 段（开场、第 1–5 段、结尾），
每句带注音分段和中文译文。第 1–5 段有 `pause_zh`（大约时码；「继续播放」折在这里）
和 `cue_ja`（旁白最后一句）。专题目录里仍保留入口：`public/data/topics/index.json` 中
`kanji-journey` 条目标了 `"kind": "reading"`（`count` = 正文句数 20），
路由沿用 `#/topics/kanji-journey`，由 `app/study/KanjiJourneyPage.tsx` 渲染。

```jsonc
{
  "version": 1,
  "slug": "kanji-journey",
  "title_zh": "《漢字的旅程》v8 暂停讲解（6:01）",
  "title_ja": "『漢字の旅程』v8 一時停止の解説",
  "title_en": "The Journey of Kanji — v8 pause-and-explain (6:01)",
  "description_zh": "…", "description_en": "…",
  "sections": [                        // 开场、第 1–5 段、结尾
    {
      "zh": "第 1 段　甲骨文是怎样来的", "ja": "…", "en": "…",
      "pause_zh": "约 1:31 · 讲完后继续播放",   // 可选；舞台提示不进 sentences
      "cue_ja": "そこで甲骨文字の「日」は、四角く、まっすぐな線で刻まれました。",
      "sentences": [
        {
          "id": "kj-001",
          "jp": "みなさん、こんにちは。中国から 来た ダニエルです。",
          "ruby": [                    // t 拼接必须 == jp；带 r 的片段必须含汉字，含汉字的片段必须带 r
            { "t": "みなさん、こんにちは。" },
            { "t": "中国", "r": "ちゅうごく" },
            { "t": "から " },
            { "t": "来", "r": "き" },
            { "t": "た ダニエルです。" }
          ],
          "zh": "…", "en": "…"
        }
      ]
    }
  ],
  "qa": [                              // 来宾问答 6 组（kj-024..kj-029），备忘录不覆盖，问/答都是同结构的句
    { "id": "kj-024", "question": { "jp": "…", "ruby": [], "zh": "…" },
      "answer": { "jp": "…", "ruby": [], "zh": "…" }, "note_zh": "…" /* 可选 */ }
  ],
  "rescue": { "id": "kj-030", "label_zh": "没听懂问题时", "jp": "…", "ruby": [], "zh": "…" }
}
```

注意：

- 正文日文以 v8 暂停讲解备忘录为准。读音括号改成 ruby，只给汉字注音，词间空格保留。
- v8 去掉了造字方法那一段。留下的句子仍用原来的 id，所以正文是 kj-001..kj-006 和 kj-010..kj-023（kj-007..kj-009 空着，不回收）。
- Q6 回答的「〇週間」是留给 Daniel 按实际填的占位，**不要替他编数字**。
- 校验：`tests/unit/kanji-journey-reading.test.ts`（结构/注音/占位）随 `npm run test:unit` 跑；
  校验函数本体在 `app/study/kanji-journey.ts`（`validateKanjiJourneyArticle`）。
