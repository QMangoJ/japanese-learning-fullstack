#!/usr/bin/env python3
"""Build public/data/n1vocab.<hash>.json (日本語総まとめ N1 語彙) + its Chinese companions.

Sources: scripts/n1-vocab-src/wNdD.txt, typed by hand from the scanned book.
  T title|title_cn|title_en          S type|heading|heading_cn|heading_en   P pattern
  N section note                      W jp|en|cn  or  W jp|example|en|cn
  X1/X2 instruction (練習Ⅰ/Ⅱ)        Q question[|opt1|opt2|opt3|opt4] >> 中文翻译
  A answers (from the book)           M1..M4 instruction (実戦問題)
  wNex.txt: n|ans|book note|中文翻译|opt1／opt2／opt3／opt4|要点
Readings: 漢字[かんじ] marks the book's furigana and is always used as given; words in the
lists carry the book reading for every kanji. Sentences without marks get UniDic readings.
{…} marks the underlined part of an exam question.
"""
import glob, hashlib, json, os, re, sys
import fugashi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "scripts", "n1-vocab-src")
OUT = os.path.join(ROOT, "public", "data")
KANJI = re.compile(r"[㐀-鿿豈-﫿々〆ヶ]")
MARK = re.compile(r"([㐀-鿿豈-﫿々〆ヶ]+)\[([^\]]+)\]")
tagger = fugashi.Tagger()
WARN = []

def esc(s):
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def hira(s):
    return "".join(chr(ord(c) - 0x60) if "ァ" <= c <= "ヶ" else c for c in s or "")

def plain(s):
    return MARK.sub(r"\1", s or "").replace("{", "").replace("}", "")

def align(surface, reading):
    """Split a token into ruby pieces: kanji runs get the matching part of the reading."""
    parts = re.findall(r"[㐀-鿿豈-﫿々〆ヶ]+|[^㐀-鿿豈-﫿々〆ヶ]+", surface)
    pat = "".join("(.+?)" if KANJI.match(p) else "(" + re.escape(hira(p)) + ")" for p in parts)
    m = re.fullmatch(pat, reading)
    if not m:
        return f"<ruby>{esc(surface)}<rt>{esc(reading)}</rt></ruby>"
    return "".join(f"<ruby>{esc(p)}<rt>{esc(g)}</rt></ruby>" if KANJI.match(p) else esc(p) for p, g in zip(parts, m.groups()))

def auto(text):
    out = []
    for w in tagger(text):
        s = w.surface
        if not KANJI.search(s):
            out.append(esc(s)); continue
        kana = getattr(w.feature, "kana", None)
        if not kana or kana == "*":
            WARN.append(f"no reading: {s} in {text}"); out.append(esc(s)); continue
        out.append(align(s, hira(kana)))
    # keep spacing exactly: fugashi drops whitespace
    res = "".join(out)
    return res if strip_tags(res) == text else rebuild_spaces(text, out)

def strip_tags(h):
    h = re.sub(r"<rt>.*?</rt>", "", h)
    return re.sub(r"<[^>]+>", "", h).replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")

def rebuild_spaces(text, pieces):
    res, i = [], 0
    for p in pieces:
        t = strip_tags(p)
        while i < len(text) and not text.startswith(t, i):
            res.append(esc(text[i])); i += 1
        res.append(p); i += len(t)
    res.append(esc(text[i:]))
    return "".join(res)

def ruby(text, explicit_only=False):
    """Explicit 漢字[よみ] marks win; the rest is annotated by UniDic (unless explicit_only)."""
    text = (text or "").replace("{", "").replace("}", "")
    out, pos = [], 0
    for m in MARK.finditer(text):
        seg = text[pos:m.start()]
        out.append(seg_r(seg, explicit_only))
        out.append(f"<ruby>{esc(m.group(1))}<rt>{esc(m.group(2))}</rt></ruby>")
        pos = m.end()
    out.append(seg_r(text[pos:], explicit_only))
    return "".join(out)

LEX = {}  # (kanji run, next char) -> book reading, collected from every word list

def build_lex():
    for f in sorted(glob.glob(os.path.join(SRC, "w*d*.txt"))):
        for raw in open(f, encoding="utf-8"):
            if raw.startswith("W "):
                jp = raw[2:].split("|")[0]
                for m in MARK.finditer(jp):
                    nxt = jp[m.end():m.end() + 1]
                    LEX.setdefault((m.group(1), nxt), m.group(2))

def apply_lex(seg):
    out, pos = [], 0
    for m in re.finditer(r"[㐀-鿿豈-﫿々〆ヶ]+", seg):
        nxt = seg[m.end():m.end() + 1]
        r = LEX.get((m.group(0), nxt))
        if r and nxt and not KANJI.match(nxt):
            out.append(seg[pos:m.end()] + "[" + r + "]")
            pos = m.end()
    out.append(seg[pos:])
    return "".join(out)

def seg_r(seg, explicit_only):
    if not seg:
        return ""
    if not explicit_only and LEX:
        marked = apply_lex(seg)
        if marked != seg:
            return ruby(marked)
    if explicit_only:
        if KANJI.search(seg):
            WARN.append(f"kanji without book reading: {seg}")
        return esc(seg)
    return auto(seg) if KANJI.search(seg) else esc(seg)

def ul_of(q):
    m = re.search(r"\{([^}]*)\}", q)
    return plain(m.group(1)) if m else None

def ruby_ul(q):
    """Ruby with the {…} part wrapped in <u>."""
    m = re.search(r"\{([^}]*)\}", q)
    if not m:
        return ruby(q)
    return ruby(q[:m.start()]) + "<u>" + ruby(m.group(1)) + "</u>" + ruby(q[m.end():])

CIRC = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕"

def parse_day(path, w, d):
    day = {"week": w, "day": d}
    secs, ex_secs, trans, sec, xs, qn = [], [], [], None, None, 0
    mondai = {}
    for raw in open(path, encoding="utf-8"):
        line = raw.rstrip("\n")
        if not line.strip() or line.startswith("#"):
            continue
        tag, _, body = line.partition(" ")
        if tag == "T":
            t = body.split("|")
            day["title"], day["title_cn"], day["title_en"] = plain(t[0]), t[1], t[2]
            day["title_r"] = ruby(t[0])
        elif tag == "S":
            t = body.split("|") + ["", "", ""]
            sec = {"type": t[0], "heading": plain(t[1]), "heading_r": ruby(t[1]), "heading_cn": t[2], "heading_en": t[3], "items": []}
            secs.append(sec)
        elif tag == "P":
            sec["pattern"], sec["pattern_r"] = plain(body), ruby(body)
        elif tag == "N":
            sec["note"] = (sec["note"] + "　" + body) if sec.get("note") else body
        elif tag == "W":
            t = body.split("|")
            if len(t) == 3:
                jp, ex, en, cn = t[0], "", t[1], t[2]
            elif len(t) == 4:
                jp, ex, en, cn = t
            else:
                raise SystemExit(f"{path}: bad W line {line}")
            it = {"jp": plain(jp), "en": en, "cn": cn, "jp_r": ruby(jp, explicit_only=True)}
            rd = MARK.findall(jp)
            if rd:
                it["reading"] = "".join(r for _, r in rd)
            if ex:
                it["ex"], it["ex_r"] = plain(ex), ruby(ex)
            sec["items"].append(it)
        elif tag in ("X1", "X2", "X3"):
            xs = {"type": "choice" if tag == "X1" else "select", "instruction": plain(body), "instruction_r": ruby(body), "items": []}
            ex_secs.append(xs)
        elif tag in ("M1", "M2", "M3", "M4"):
            xs = {"instruction": plain(body), "instruction_r": ruby(body), "items": []}
            mondai["mondai" + tag[1]] = xs
        elif tag == "Q":
            q, _, tr = body.partition(">>")
            t = [x.strip() for x in q.split("|")]
            qn += 1
            it = {"n": qn, "q": plain(t[0]), "q_r": ruby_ul(t[0])}
            u = ul_of(t[0])
            if u:
                it["ul"] = u
            if len(t) > 1:
                it["opts"] = [plain(o) for o in t[1:]]
                it["opts_r"] = [ruby(o) for o in t[1:]]
            xs["items"].append(it)
            if tr.strip():
                trans.append({"n": qn, "translation": tr.strip()})
        elif tag == "A":
            day["answers_text"] = body
        elif tag == "H":
            day["hitokoto"] = body
        else:
            raise SystemExit(f"{path}: unknown tag {tag}")
    if d == 7:
        day.update({"time_limit": "15分", "scoring": "1問4点×25問／100", "answers_note": "答えは別冊p." + str(BESSATSU_PAGE.get(w, ""))})
        day.update(mondai)
    else:
        day["sections"] = secs
        p = 13 + (w - 1) * 16 + 2 * d + (1 if d == 6 else 0)  # printed on the next day (day 6: on the exam)
        day["exercises"] = {"answers_note": f"答えはp.{p}", "sections": ex_secs}
        if day.get("answers_text"):
            day["exercises"]["answers"] = day.pop("answers_text")
    return day, trans

BESSATSU_PAGE = {1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4}

def parse_ex(path):
    items = []
    for raw in open(path, encoding="utf-8"):
        line = raw.rstrip("\n")
        if not line.strip() or line.startswith("#"):
            continue
        t = line.split("|")
        if len(t) != 6:
            raise SystemExit(f"{path}: need 6 fields: {line}")
        n, ans, note, tr, opts, point = t
        e = {"n": int(n), "ans": int(ans), "trans": tr, "option_translations": opts.split("／") if opts else [], "point": point}
        if note:
            e["note"] = plain(note)
            e["note_r"] = ruby(note)
        items.append(e)
    return items

def main():
    build_lex()
    weeks, daily, exam = [], {}, {}
    meta = json.load(open(os.path.join(SRC, "weeks.json"), encoding="utf-8"))
    for w in range(1, 9):
        days = []
        for d in range(1, 8):
            p = os.path.join(SRC, f"w{w}d{d}.txt")
            if not os.path.exists(p):
                continue
            day, tr = parse_day(p, w, d)
            days.append(day)
            if tr:
                daily[f"w{w}d{d}"] = {"items": tr}
        exp = os.path.join(SRC, f"w{w}ex.txt")
        if os.path.exists(exp):
            exam[f"w{w}"] = parse_ex(exp)
            d7 = next((x for x in days if x["day"] == 7), None)
            if d7:
                groups = [("問題1", 1, 10), ("問題2", 11, 15), ("問題3", 16, 20), ("問題4", 21, 25)]
                ans = {e["n"]: e["ans"] for e in exam[f"w{w}"]}
                d7["answers"] = "　".join(k + "：" + " ".join(CIRC[n - 1] + str(ans.get(n, "?")) for n in range(a, b + 1)) for k, a, b in groups)
        if days:
            wk = {"n": w, "days": days}
            wk.update(meta.get(str(w), {}))
            weeks.append(wk)
    data = {"weeks": weeks}
    body = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    h = hashlib.sha256(body.encode()).hexdigest()[:10]
    for old in glob.glob(os.path.join(OUT, "n1vocab.*.json")):
        os.remove(old)
    name = f"n1vocab.{h}.json"
    open(os.path.join(OUT, name), "w", encoding="utf-8").write(body)
    json.dump({"version": 1, "vocab": daily}, open(os.path.join(OUT, "n1-vocab-daily-translations.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump(exam, open(os.path.join(OUT, "n1-vocab-exam-explanations.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    for f in ["app/study/store.ts", "scripts/check-n1-vocab.mjs", "scripts/fix-reviewed-furigana.py", "scripts/check-semantic-content.mjs", "tests/unit/store.test.ts"]:
        fp = os.path.join(ROOT, f)
        if os.path.exists(fp):
            s = open(fp, encoding="utf-8").read()
            s2 = re.sub(r"n1vocab\.[0-9a-f]{10}\.json", name, s)
            if s2 != s:
                open(fp, "w", encoding="utf-8").write(s2)
    nw = sum(len(s["items"]) for wk in weeks for dd in wk["days"] for s in dd.get("sections", []))
    print(name, "weeks", len(weeks), "days", sum(len(wk["days"]) for wk in weeks), "words", nw)
    for x in WARN:
        print("WARN", x, file=sys.stderr)

if __name__ == "__main__":
    main()
