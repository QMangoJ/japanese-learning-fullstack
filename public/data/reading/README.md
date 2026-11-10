# 阅读文章数据 · Reading articles

不是专题词汇闪卡、而是「一篇文章读下来」形态的内容放这里，目前只有一篇：

```
public/data/reading/
  kanji-journey.json    《漢字的旅程》会話発表②发表稿
```

## `kanji-journey.json`

2026-11-10 按 Daniel 的要求，从专题词汇（`public/data/topics/` 的 30 张闪卡）改成
IT 听力式的阅读文章。专题目录里仍保留入口：`public/data/topics/index.json` 中
`kanji-journey` 条目标了 `"kind": "reading"`（`count` = 正文句数 23），
路由沿用 `#/topics/kanji-journey`，由 `app/study/KanjiJourneyPage.tsx` 渲染。

```jsonc
{
  "version": 1,
  "slug": "kanji-journey",
  "title_zh": "《漢字的旅程》",
  "title_ja": "『漢字の旅程』",
  "title_en": "The Journey of Kanji",
  "description_zh": "…", "description_en": "…",
  "sections": [                        // 正文五节，顺序即原稿顺序
    {
      "zh": "开场", "ja": "はじめに", "en": "Opening",
      "sentences": [
        {
          "id": "kj-001",              // 沿用旧卡片 id，稳定不改
          "jp": "みなさん、こんにちは。",
          "ruby": [{ "t": "みなさん、こんにちは。" }],  // 注音分段：t 拼接必须 == jp；
                                         // 带 r 的片段必须是汉字串，含汉字的片段必须带 r
          "zh": "大家好。", "en": "Hello, everyone."
        }
      ]
    }
  ],
  "qa": [                              // 来宾问答 6 组（kj-024..kj-029），问/答都是同结构的句
    { "id": "kj-024", "question": { "jp": "…", "ruby": [], "zh": "…" },
      "answer": { "jp": "…", "ruby": [], "zh": "…" }, "note_zh": "…" /* 可选 */ }
  ],
  "rescue": { "id": "kj-030", "label_zh": "没听懂问题时", "jp": "…", "ruby": [], "zh": "…" }
}
```

注意：

- 日文原句以原稿为准（`~/workspace/user/kanji-journey-script.md`），改稿先改原稿再同步这里。
- Q6 回答的「〇週間」是留给 Daniel 按实际填的占位，**不要替他编数字**。
- 校验：`tests/unit/kanji-journey-reading.test.ts`（结构/注音/占位）随 `npm run test:unit` 跑；
  校验函数本体在 `app/study/kanji-journey.ts`（`validateKanjiJourneyArticle`）。
