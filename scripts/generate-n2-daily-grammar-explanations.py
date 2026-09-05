#!/usr/bin/env python3
"""Build N2 daily-exercise explanations from src-data + hand translations."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = Path("/Users/daniel/Desktop/claude project/日语学习/src-data/n2-grammar")
OUT = ROOT / "public/data/n2-grammar-daily-explanations.json"

CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳"


def parse_answers(text: str) -> dict[int, str]:
    out: dict[int, str] = {}
    if not text:
        return out
    # circled
    for m in re.finditer(r"([①-⑳])\s*([^①-⑳ⅠⅡ\s]+)", text):
        n = CIRCLED.index(m.group(1)) + 1
        out[n] = m.group(2).strip("　。")
    # plain ⑥ ⑦ after Ⅱ if any leftover numbered 6. 7.
    for m in re.finditer(r"(?:^|[^\d])([1-9]|1[0-9])[\.．]\s*([○×0-9a-d・→]+)", text):
        n = int(m.group(1))
        out.setdefault(n, m.group(2))
    return out


PAIR_RE = re.compile(r"（\s*a\.\s*(.+?)\s*b\.\s*(.+?)\s*）")
CHOICE4_RE = re.compile(r"（\s*）|（　）")


def pairs_in(q: str) -> list[dict[str, str]]:
    return [{"a": a.strip(), "b": b.strip()} for a, b in PAIR_RE.findall(q)]


def complete_choice(q: str, answer: str) -> str:
    letters = re.findall(r"[ab]", answer)
    found_count = len(PAIR_RE.findall(q))
    if found_count > 1 and len(letters) == found_count:
        codes = letters
    elif letters == ["a", "b"] or letters == ["b", "a"]:
        codes = ["ab"]
    elif letters:
        codes = [letters[0]]
    else:
        codes = []
    result = q
    found = list(PAIR_RE.finditer(q))
    for i, m in enumerate(found):
        code = codes[i] if i < len(codes) else codes[-1] if codes else "a"
        if code in {"ab", "ba"}:
            repl = m.group(1).strip()
        else:
            repl = m.group(1).strip() if code == "a" else m.group(2).strip()
        result = result.replace(m.group(0), repl, 1)
    return result


def complete_numbered_choice(q: str, answer: str, options: list[str]) -> str:
    """Fill ordinary 1-4 choice blanks so the explanation shows a complete sentence."""
    match = re.search(r"[1-4]", answer)
    if not match:
        return q
    index = int(match.group(0)) - 1
    if index >= len(options):
        return q
    selected = re.sub(r"^\s*[1-4]\s*", "", str(options[index])).strip()
    return CHOICE4_RE.sub(selected, q)


def guess_point_indexes(day: dict, n: int, q: str, answer: str) -> list[int]:
    points = day.get("points") or []
    if not points:
        return []
    text = q + answer
    hits = []
    for i, p in enumerate(points):
        pat = str(p.get("pattern") or "")
        keys = [pat]
        for chunk in re.split(r"[／・、，\s]+", pat):
            if len(chunk) >= 2:
                keys.append(chunk)
        if any(k and k in text for k in keys):
            hits.append(i)
    if hits:
        return hits
    # fall back: cycle through day's points
    return [min(n - 1, len(points) - 1)]


def build_day(path: Path) -> dict | None:
    day = json.loads(path.read_text(encoding="utf-8"))
    if day.get("day") == 7:
        return None
    ex = day.get("exercises") or {}
    answers = parse_answers(ex.get("answers") or "")
    items = []
    for sec in ex.get("sections") or []:
        kind = "order" if sec.get("type") == "order" else "choice"
        for it in sec.get("items") or []:
            n = it["n"]
            ans = answers.get(n, "")
            # special ○× answers written as ①×（…）
            if not ans:
                m = re.search(rf"{CIRCLED[n-1]}\s*([○×〇xX])", ex.get("answers") or "")
                if m:
                    ans = "○" if m.group(1) in "○〇" else "×"
            qtext = it.get("q") or ""
            if kind == "order":
                completed = ""
                if ans:
                    opts = {str(i + 1): re.sub(r"^\s*[1-4]\s*", "", o) for i, o in enumerate(it.get("options") or [])}
                    parts = [opts.get(p, "") for p in ans.split("→") if p]
                    completed = qtext
                    for part in parts:
                        completed = completed.replace("＿＿", part, 1)
                items.append(
                    {
                        "n": n,
                        "type": "order",
                        "answer": ans,
                        "completed": completed or qtext,
                        "translation": TRANSLATIONS.get(f"{path.stem}-{n}", ["", ""])[0],
                        "translation_en": TRANSLATIONS.get(f"{path.stem}-{n}", ["", ""])[1],
                        "pointIndexes": guess_point_indexes(day, n, qtext, ans),
                    }
                )
            else:
                pairs = pairs_in(qtext)
                completed = (
                    complete_choice(qtext, ans)
                    if pairs
                    else complete_numbered_choice(qtext, ans, it.get("options") or [])
                )
                entry = {
                    "n": n,
                    "type": "choice",
                    "answer": ans or "",
                    "completed": completed,
                    "translation": TRANSLATIONS.get(f"{path.stem}-{n}", ["", ""])[0],
                    "translation_en": TRANSLATIONS.get(f"{path.stem}-{n}", ["", ""])[1],
                    "pointIndexes": guess_point_indexes(day, n, qtext, ans),
                }
                if pairs:
                    entry["choices"] = pairs
                items.append(entry)
    return {"items": items}


# key: "w1d1-1" -> [cn, en]
TRANSLATIONS: dict[str, list[str]] = {}


def load_translations():
    # Filled from the companion table so this file stays importable.
    from generate_n2_daily_translations import DAILY  # noqa: E402

    TRANSLATIONS.update(DAILY)


if __name__ == "__main__":
    load_translations()
    out = {}
    missing = []
    for path in sorted(SRC.glob("w*d*.json")):
        pack = build_day(path)
        if not pack:
            continue
        key = path.stem
        out[key] = pack
        for item in pack["items"]:
            if not item["translation"] or not item["translation_en"]:
                missing.append(f"{key}-{item['n']}")
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent="\t") + "\n", encoding="utf-8")
    print(f"Wrote {OUT.name}: {sum(len(v['items']) for v in out.values())} items, missing translations: {len(missing)}")
    if missing[:20]:
        print("e.g.", ", ".join(missing[:20]))
