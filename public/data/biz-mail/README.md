# 商务邮件背诵数据（#/biz-mail）

- `index.json`：目录 `{ version: 1, mails: [...] }`，每条含 `id`、`title_zh`、`sentenceCount` 等。
- `<id>.json`：一封邮件，类型见 `app/study/biz-mail.ts` 的 `BizMail`。
  - `sentences[].para`：原文段落号，同段句子在「全文」里接在一起。
  - `sentences[].ruby`：注音标记 `{漢字|よみ}`，去掉标记后必须与 `jp` 完全一致（单测会查）。
  - `sentences[].notes`：逐句拆解，行内 `【尊】【谦】【丁】` 渲染成标签；`notesAdded: true` 表示补充内容。
  - `vocab[].added: true`：补充词汇（页面标「补」）。

加新邮件：放一个 `<id>.json`，在 `index.json` 加一条即可，不用改代码。
