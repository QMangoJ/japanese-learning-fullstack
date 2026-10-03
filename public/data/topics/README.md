# 专题词汇数据 · Topic vocabulary data

学习区「专题词汇」(`/study/topics`) 读这里的文件。每个专题一个 JSON，`index.json` 是目录。

```
public/data/topics/
  index.json            { "version": 1, "topics": [ { slug, title_zh, title_ja, title_en?, count, subtopics } ] }
  <slug>.json           一个专题（下面的结构）
```

## `<slug>.json`

```jsonc
{
  "version": 1,
  "slug": "japan-investing",           // kebab-case，和文件名一致，网址是 /study/topics/<slug>
  "title_zh": "日本投资理财日语",
  "title_ja": "投資・資産運用の日本語",
  "title_en": "…",                     // 可选
  "description_zh": "…",               // 可选；description_en 同理
  "subtopics": [                        // 筛选按钮的顺序；card.subtopic 必须是其中某个 zh
    { "zh": "股票", "ja": "株式", "en": "Stocks" }
  ],
  "cards": [
    {
      "id": "inv-001",                 // 专题内唯一且稳定。复习进度按 topic:<slug>:<id> 记，改内容不要改 id
      "jp": "証券口座",                 // 必填
      "kana": "しょうけんこうざ",        // 必填，只能是假名
      "zh": "证券账户",                 // 必填
      "subtopic": "开户・本人确认",       // 必填
      "example_jp": "…",               // 必填
      "example_zh": "…",               // 必填
      "en": "…", "example_en": "…",    // 可选
      "example_kana": "…",             // 可选：例句整句假名
      "example_ruby": "<ruby>口座<rt>こうざ</rt></ruby>を…", // 可选：只允许 ruby/rt，去掉注音后必须等于 example_jp
      "level": "…", "note": "…"        // 可选
    }
  ]
}
```

所有字符串不能有首尾空格；同一专题里 `id` 不能重复，`jp`+`kana` 也不能重复。
完整规则在 `app/study/topic-vocab.ts`（`validateTopicFile` / `validateTopicIndex`）。

## 校验

```bash
npm run test:topics        # 校验所有专题文件，并检查 index.json 的 count / 标题 / 子主题是否和文件一致
```

`tests/unit/topic-vocab.test.ts` 也会在 `npm test` 里跑同样的检查。

## 导入词表 / 新增专题

```bash
npm run import:topic -- --topic <slug> [--title-zh … --title-ja … --title-en …] [--id-prefix xx] <文件…>
```

- 输入可以是 Google Docs 下载的 `.docx`、`.md`（Markdown），或 `.tsv` / `.csv`。
  文档里每个标题下的表格是一组，标题自动当作 `subtopic`；每张表的表头行自动跳过。
- 表头认中文或英文：`日语 | 假名读音 | 中文意思 | 例句（日语） | 例句（中文）`，或 `jp, kana, zh, example_jp, example_zh, subtopic, note, …`。
- 例句可以写成 `株式[かぶしき]を買[か]う`，会转成 `example_ruby`。
- 默认 `--mode replace`：结果只含这次导入的词；`--mode merge` 保留已有但没出现在这次导入里的词。
  同一个词（同 `jp`+`kana`）沿用原来的 `id`，复习进度不会丢。新增的子主题只有 `zh`，可以手动补 `ja`/`en`，之后重导会保留。
- `--expect 121`、`--expect-group "股票=14"` 可以核对数量，`--dry-run` 只看结果不写文件。
- 新专题：给 `--title-zh`、`--title-ja`，脚本会创建 `<slug>.json` 并在 `index.json` 里加一条，前端无需改代码。

### 日本投资理财日语（japan-investing）

来源：Google Doc「日本投资理财日语词汇与表达」(id `1qgg9BRz6NS5_6p2IQLfT8hNynTZH7tyIH6MCb_LGNpQ`，117 词，9 组)，
另加 `scripts/topic-sources/japan-investing-extra.tsv` 里 4 个文档没有的基础词。重新导入：

```bash
# 先把文档下载为 .docx（Google Docs：文件 → 下载 → Microsoft Word），覆盖 scripts/topic-sources/japan-investing.docx
npm run import:topic -- --topic japan-investing --expect 121 \
  scripts/topic-sources/japan-investing.docx scripts/topic-sources/japan-investing-extra.tsv
```
