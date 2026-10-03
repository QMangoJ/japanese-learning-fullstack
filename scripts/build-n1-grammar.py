#!/usr/bin/env python3
"""Build public/data/n1grammar.<hash>.json from scripts/n1-grammar-src (日本語総まとめ N1 文法).

Same conversion as the legacy N3/N2 build.py: furigana via pykakasi (<ruby>), the grammar
expression underlined (<u>) inside each example. Run fix-reviewed-furigana.py afterwards.
Source files: wN.json (week meta), wNdD.json (day 1-6 grammar, day 7 実戦問題), typed by hand
from the scanned book; ans.py holds the 別冊 answer key.
"""
import hashlib, json, os, re, sys, glob
import pykakasi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "scripts", "n1-grammar-src")
OUT = os.path.join(ROOT, "public", "data")
kks = pykakasi.kakasi()
KANJI = re.compile(r"[㐀-鿿豈-﫿々〆]")

def esc(s):
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

SPLIT = re.compile(r"(\n|＝|=|（|）|：|／)")

def ruby(text):
    """pykakasi drops or rewrites some symbols (＝, newlines), so annotate between them."""
    if text and SPLIT.search(text):
        return "".join(esc(part) if SPLIT.fullmatch(part) else ruby_seg(part) for part in SPLIT.split(text) if part)
    return ruby_seg(text)

def ruby_seg(text):
    if not text or not KANJI.search(text):
        return esc(text or "")
    out = []
    for item in kks.convert(text):
        orig, hira = item["orig"], item["hira"]
        if not KANJI.search(orig) or not hira:
            out.append(esc(orig)); continue
        o, h, suf, pre = orig, hira, "", ""
        while o and h and o[-1] == h[-1]:
            suf = o[-1] + suf; o, h = o[:-1], h[:-1]
        while o and h and o[0] == h[0]:
            pre += o[0]; o, h = o[1:], h[1:]
        if not o or not h or not KANJI.search(o):
            out.append(esc(orig)); continue
        out.append(esc(pre) + f"<ruby>{esc(o)}<rt>{esc(h)}</rt></ruby>" + esc(suf))
    return "".join(out)

def rlist(xs):
    return [ruby(x) for x in xs]

def ruby_word(jp, reading):
    """Ruby a whole expression from its explicit (book) reading, trimming shared kana."""
    if not reading or not KANJI.search(jp):
        return esc(jp)
    o, h, suf, pre = jp, reading, "", ""
    while o and h and o[-1] == h[-1]:
        suf = o[-1] + suf; o, h = o[:-1], h[:-1]
    while o and h and o[0] == h[0]:
        pre += o[0]; o, h = o[1:], h[1:]
    if not o or not h or not KANJI.search(o):
        return ruby(jp)
    # mixed kanji/kana in the middle: fall back to kakasi to avoid one giant ruby
    if re.search(r"[ぁ-んァ-ン]", o):
        return ruby(jp)
    return esc(pre) + f"<ruby>{esc(o)}<rt>{esc(h)}</rt></ruby>" + esc(suf)

def find_ul(text, pattern):
    """The book underlines the grammar expression in each example. Use the exact pattern
    when present, else the longest tail of the pattern (>=3 chars) found in the sentence."""
    if not pattern:
        return None
    if pattern in text:
        return pattern
    for k in range(1, len(pattern) - 2):
        tail = pattern[k:]
        if len(tail) >= 3 and tail in text:
            return tail
    return None

def ruby_ul(text, pattern):
    m = find_ul(text, pattern)
    if m:
        i = text.find(m)
        return ruby(text[:i]) + "<u>" + ruby(m) + "</u>" + ruby(text[i + len(m):])
    return ruby(text)

def annotate(day):
    day["title_r"] = ruby(day["title"])
    if day.get("dialog"):
        day["dialog"]["lines_r"] = rlist(day["dialog"].get("lines", []))
    for p in day.get("points") or []:
        p["pattern_r"] = ruby_word(p["pattern"], p.get("reading"))
        for ex in p.get("examples", []):
            ex["jp_r"] = ruby_ul(ex["jp"], p.get("pattern"))
            if ex.get("eq"):
                ex["eq_r"] = ruby(ex["eq"])
        for nt in p.get("notes", []):
            nt["text_r"] = ruby(nt["text"])
    exs = day.get("exercises")
    if exs:
        for sec in exs.get("sections", []):
            sec["instruction_r"] = ruby(sec["instruction"])
            for it in sec.get("items", []):
                it["q_r"] = ruby(it["q"])
                if it.get("options"):
                    it["options_r"] = rlist(it["options"])
    for k in ("mondai1", "mondai2", "mondai3"):
        m = day.get(k)
        if not m:
            continue
        m["instruction_r"] = ruby(m["instruction"])
        if m.get("passage"):
            m["passage_r"] = ruby(m["passage"])
        for it in m["items"]:
            if it.get("q"):
                it["q_r"] = ruby(it["q"])
            if it.get("opts"):
                it["opts_r"] = rlist(it["opts"])
    kg = day.get("keigo")
    if kg:
        kg["title_r"] = ruby(kg["title"])
        kg["content_r"] = rlist(kg.get("content", []))
        qz = kg.get("quiz")
        if qz:
            qz["instruction_r"] = ruby(qz["instruction"])
            qz["items_r"] = rlist(qz.get("items", []))
            if qz.get("answers"):
                qz["answers_r"] = ruby(qz["answers"])
    return day

def main():
    weeks_arg = int(sys.argv[1]) if len(sys.argv) > 1 else 8
    weeks = []
    for w in range(1, weeks_arg + 1):
        meta = json.load(open(os.path.join(SRC, f"w{w}.json"), encoding="utf-8"))
        days = [annotate(json.load(open(os.path.join(SRC, f"w{w}d{d}.json"), encoding="utf-8"))) for d in range(1, 8)]
        weeks.append({"n": w, "title": meta["title"], "title_cn": meta["title_cn"], "title_en": meta["title_en"], "days": days})
    body = json.dumps({"weeks": weeks}, ensure_ascii=False, separators=(",", ":"))
    h = hashlib.sha256(body.encode()).hexdigest()[:10]
    for old in glob.glob(os.path.join(OUT, "n1grammar.*.json")):
        os.remove(old)
    path = os.path.join(OUT, f"n1grammar.{h}.json")
    open(path, "w", encoding="utf-8").write(body)
    # keep every reference to the hashed file name in sync
    for ref in ("app/study/store.ts", "scripts/fix-reviewed-furigana.py", "scripts/check-semantic-content.mjs", "scripts/check-n1-grammar.mjs"):
        rp = os.path.join(ROOT, ref)
        if os.path.exists(rp):
            txt = open(rp, encoding="utf-8").read()
            new = re.sub(r"n1grammar\.[0-9a-f]{10}\.json", f"n1grammar.{h}.json", txt)
            if new != txt:
                open(rp, "w", encoding="utf-8").write(new)
    print(os.path.relpath(path, ROOT))

if __name__ == "__main__":
    main()
