# N1 听解 data pipeline

Source: 『新日语能力考试考前对策 N1 聴解』（日本語総まとめ N1 聴解 中文版）. One-off scripts, kept for reference; paths inside point at the original scratch workspace.

- `convert.py` — OCR text + page images → `lessons/{ch}-{sec}.json` (ListeningLesson) via an LLM (helper `gem.py` not committed; needs an API key). `fixes.py` applies manual corrections.
- `validate.mts` — checks every lesson's scored questions resolve answer / transcript / translation.
- `gen.py` — `lessons/*.json` + `sections.json` → `app/data/listening-n1-book.ts`, `listening-n1-lessons-ch*.ts` (drops audio tracks missing from the source CD rip and adds a note).
- `dumpq.mts` + `dict.py` + `gloss.py` — per-question transcript glosses from the repo's N1–N3 vocab data → `app/data/listening-n1-transcript-glosses.ts` (dictionary-derived, not hand-checked).
- `bodystr.py` + `body_cn.py` + `mkbody.py` — Chinese for body strings the book prints without translation → `app/data/listening-n1-body-support.ts`.
