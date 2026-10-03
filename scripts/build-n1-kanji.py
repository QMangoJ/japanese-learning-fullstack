#!/usr/bin/env python3
"""Build public/data/n1kanji.<hash>.json (日本語総まとめ N1 漢字) + its Chinese companions.

Sources: scripts/n1-kanji-src/wNdD.txt, typed by hand from the scanned book (see FORMAT.md).
Output follows the n2kanji shape: days with `kanji` rows ({char, readings, words}) and
`exercises.sections`; day 7 carries mondai1..mondai4 and the week's コラム.
Readings: every word carries the book reading. Exercise sentences reuse the book readings
of the week's words where the kanji run matches, the rest comes from UniDic.
Run with the venv that has fugashi + unidic-lite: /workspace/venv-n1/bin/python.
"""
import glob, hashlib, json, os, re, sys
import fugashi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "scripts", "n1-kanji-src")
OUT = os.path.join(ROOT, "public", "data")
KJ = "㐀-鿿豈-﫿々〆ヶ\U00020000-\U0002FFFF"
KANJI = re.compile(f"[{KJ}]")
RUN = re.compile(f"[{KJ}]+")
MARK = re.compile(f"([{KJ}]+)\\[([^\\]]+)\\]")
tagger = fugashi.Tagger()
WARN = []
CIRC = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕"


def esc(s):
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def hira(s):
    return "".join(chr(ord(c) - 0x60) if "ァ" <= c <= "ヶ" and c not in "ヵヶ" else c for c in s or "")


def strip_tags(h):
    h = re.sub(r"<rt>.*?</rt>", "", h)
    return re.sub(r"<[^>]+>", "", h).replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")


def align(surface, reading):
    """Ruby for a word: kanji runs get the matching slice of the reading, kana stays bare."""
    parts = re.findall(f"[{KJ}]+|[^{KJ}]+", surface)

    def lit(p):
        return "".join(re.escape(hira(c)) for c in p)

    pat = "".join("(.+?)" if KANJI.match(p) else "(" + lit(p) + ")" for p in parts)
    m = re.fullmatch(pat, hira(reading))
    if not m:
        return None
    return "".join(f"<ruby>{esc(p)}<rt>{esc(g)}</rt></ruby>" if KANJI.match(p) else esc(p) for p, g in zip(parts, m.groups()))


def word_ruby(jp, reading):
    """Book word + book reading → ruby. Falls back to one ruby over the kanji part."""
    if not KANJI.search(jp) or not reading:
        return esc(jp)
    core = re.sub(r"〈[^〉]*〉|（[^）]*）|\([^)]*\)", "", jp)
    for cand in (jp, core):
        r = align(cand, reading)
        if r:
            return r if cand == jp else r + esc(jp[len(core):]) if jp.startswith(core) else r
    # reading covers only the kanji word; trailing な/の/する etc. are left outside
    m = re.match(f"^(.*[{KJ}])([^{KJ}]*)$", core)
    if m:
        r = align(m.group(1), reading)
        if r:
            return r + esc(jp[len(m.group(1)):])
        return f"<ruby>{esc(jp)}<rt>{esc(reading)}</rt></ruby>"


LEX = {"日本": "にほん", "日本人": "にほんじん", "日本語": "にほんご", "一人": "ひとり", "二人": "ふたり", "今日": "きょう", "明日": "あした", "昨日": "きのう", "大人": "おとな", "何": "なに"}  # UniDic quirks first, then the book's word readings


def add_lex(jp, reading):
    reading = hira(reading)
    for chunk, rd in zip(re.split("・", jp), re.split("・", reading)):
        chunk = re.sub(r"〈[^〉]*〉|（[^）]*）|\([^)]*\)|^[～〜]|◆", "", chunk)
        m = re.fullmatch(f"([{KJ}]+)([ぁ-んァ-ン]*)", chunk)
        if m:
            k, suf = m.groups()
            if suf and rd.endswith(hira(suf)) and len(rd) > len(suf):
                rd2 = rd[: -len(suf)]
            else:
                rd2 = rd
            if suf and rd2 != rd:
                LEX.setdefault((k, hira(suf[0])), rd2)
            else:
                LEX.setdefault(k, rd2)
            continue
        r = align(chunk, rd)
        if r:
            for k, g in re.findall(r"<ruby>([^<]+)<rt>([^<]+)</rt></ruby>", r):
                if len(k) >= 2:
                    LEX.setdefault(k, g)


def auto(text):
    out = []
    for w in tagger(text):
        s = w.surface
        if not KANJI.search(s):
            out.append(esc(s))
            continue
        if s in LEX:
            out.append(f"<ruby>{esc(s)}<rt>{esc(LEX[s])}</rt></ruby>")
            continue
        kana = getattr(w.feature, "kana", None)
        if not kana or kana == "*":
            WARN.append(f"no reading: {s} in {text}")
            out.append(esc(s))
            continue
        out.append(align(s, hira(kana)) or f"<ruby>{esc(s)}<rt>{esc(hira(kana))}</rt></ruby>")
    res = "".join(out)
    return res if strip_tags(res) == text else rebuild_spaces(text, out)


def rebuild_spaces(text, pieces):
    res, i = [], 0
    for p in pieces:
        t = strip_tags(p)
        while i < len(text) and not text.startswith(t, i):
            res.append(esc(text[i]))
            i += 1
        res.append(p)
        i += len(t)
    res.append(esc(text[i:]))
    return "".join(res)


def seg_r(seg):
    """Book readings for exact kanji runs of the week's words, UniDic for the rest."""
    if not KANJI.search(seg):
        return esc(seg)
    out, pos = [], 0
    for m in RUN.finditer(seg):
        nxt = hira(seg[m.end():m.end() + 1])
        r = LEX.get((m.group(0), nxt)) if nxt and not KANJI.match(nxt) else None
        r = r or LEX.get(m.group(0))
        if r:
            out.append(auto(seg[pos:m.start()]) if seg[pos:m.start()] else "")
            out.append(f"<ruby>{esc(m.group(0))}<rt>{esc(r)}</rt></ruby>")
            pos = m.end()
    rest = seg[pos:]
    out.append(auto(rest) if rest else "")
    return "".join(out)


def ruby(text):
    text = (text or "").replace("{", "").replace("}", "")
    out, pos = [], 0
    for m in MARK.finditer(text):
        out.append(seg_r(text[pos:m.start()]))
        out.append(f"<ruby>{esc(m.group(1))}<rt>{esc(m.group(2))}</rt></ruby>")
        pos = m.end()
    out.append(seg_r(text[pos:]))
    return "".join(out)


def plain(s):
    return MARK.sub(r"\1", s or "").replace("{", "").replace("}", "")


def ruby_ul(q, tested=False):
    """{…} is the underlined part; when it is the tested word it stays without furigana."""
    m = re.search(r"\{([^}]*)\}", q)
    if not m:
        return ruby(q)
    inner = esc(plain(m.group(1))) if tested else ruby(m.group(1))
    return ruby(q[: m.start()]) + "<u>" + inner + "</u>" + ruby(q[m.end():])


CHOICE = re.compile(r"（a\.\s*([^　）]+)\s*　b\.\s*([^）]+?)\s*）")


def ruby_choice(q):
    """練習Ⅰ asks for the readings of a/b, so the choice stays plain; the rest gets furigana."""
    m = CHOICE.search(q)
    if not m:
        WARN.append(f"no (a. b.) choice: {q}")
        return ruby(q)
    return ruby(q[: m.start()]) + esc(m.group(0)) + ruby(q[m.end():])


def choices_of(q):
    m = CHOICE.search(q)
    if not m:
        return []
    out = []
    for w in m.groups():
        rd = re.sub(r"<[^>]+>", "", re.sub(r"<ruby>[^<]*<rt>([^<]*)</rt></ruby>", r"\1", seg_r(w)))
        out.append({"jp": w, "jp_r": seg_r(w), "reading": rd})
    return out


def tag_of(xs, mondai):
    return next((k for k, v in mondai.items() if v is xs), "")


def ul_of(q):
    m = re.search(r"\{([^}]*)\}", q)
    return plain(m.group(1)) if m else None


def new_kanji(char, group):
    return {"char": char, "readings": [group[1]] if group and group[1] else [], "group": group[0] if group else "", "words": []}


def parse_day(path, w, d):
    day = {"week": w, "day": d}
    kanji, sections, ex_secs, trans, mondai = [], [], [], [], {}
    group, cur, xs, column = None, None, None, None
    qn = 0
    for ln, raw in enumerate(open(path, encoding="utf-8"), 1):
        line = raw.rstrip("\n")
        if not line.strip() or line.startswith("#"):
            continue
        tag, _, body = line.partition(" ")
        where = f"{os.path.basename(path)}:{ln}"
        if tag == "T":
            t = (body.split("|") + ["", "", "", ""])[:4]
            day.update({"title": plain(t[0]), "title_r": ruby(t[0]) if not t[1] else title_ruby(t[0], t[1]), "title_reading": t[1], "title_cn": t[2], "title_en": t[3]})
        elif tag == "I":
            day["intro"], day["intro_r"] = plain(body), ruby(body)
        elif tag == "N":
            day.setdefault("notes", []).append({"text": plain(body), "text_r": ruby(body)})
        elif tag == "S":
            t = (body.split("|") + ["", ""])[:3]
            sec = {"heading": plain(t[0]), "heading_r": ruby(t[0]), "heading_cn": t[1], "heading_en": t[2], "start": len(kanji)}
            if d == 7:
                column = {"title": sec["heading"], "title_r": sec["heading_r"], "title_cn": t[1], "title_en": t[2], "kanji": []}
                kanji = column["kanji"]
            else:
                sections.append(sec)
            group = None
        elif tag == "G":
            t = (body.split("|") + [""])[:2]
            group = (t[0], t[1])
        elif tag == "K":
            t = body.split("|")
            cur = new_kanji(t[0], group)
            if len(t) > 1 and t[1]:
                cur["readings"] = [x for x in t[1].split("・") if x]
            kanji.append(cur)
        elif tag == "R":
            cur["review"], cur["review_r"] = plain(body), ruby(body)
        elif tag == "W":
            t = body.split("|")
            if len(t) < 4:
                raise SystemExit(f"{where}: W needs jp|reading|en|cn: {line}")
            jp, rd, en, cn = t[:4]
            note = t[4] if len(t) > 4 else ""
            it = {"jp": jp.lstrip("◆"), "reading": rd.lstrip("•"), "en": en, "cn": cn}
            if jp.startswith("◆"):
                it["related"] = True
            if rd.startswith("•"):
                it["changed"] = True
            it["jp_r"] = word_ruby(it["jp"], it["reading"]) if it["reading"] else ruby(jp.lstrip("◆"))
            it["jp"] = plain(it["jp"])
            if not it["reading"]:
                it["reading"] = "".join(re.findall(r"<rt>([^<]*)</rt>", it["jp_r"]))
                it["phrase"] = True
            if note:
                it["note"], it["note_r"] = plain(note), ruby(note)
            if cur is None:
                raise SystemExit(f"{where}: W before K")
            cur["words"].append(it)
        elif tag in ("X1", "X2"):
            xs = {"type": "choice" if tag == "X1" else "select", "instruction": plain(body), "instruction_r": ruby(body), "items": []}
            ex_secs.append(xs)
        elif tag == "B":
            if d == 7:
                mondai["mondai4"]["wordbank"] = body.split("|")
            else:
                xs["box"] = [x.strip() for x in body.split("|")]
        elif tag in ("M1", "M2", "M3", "M4"):
            xs = {"instruction": plain(body), "instruction_r": ruby(body), "items": []}
            mondai["mondai" + tag[1]] = xs
        elif tag == "Q":
            q, _, tr = body.partition(">>")
            t = [x.strip() for x in q.split("|")]
            if d == 7:
                if t[0] == "21-25":
                    it = {"n": "21-25", "q": plain(t[1]), "q_r": ruby(t[1])}
                    key = "21-25"
                else:
                    qn += 1
                    it = {"n": qn, "q": plain(t[0]), "q_r": ruby_ul(t[0], tested=(tag_of(xs, mondai) == "mondai1"))}
                    if ul_of(t[0]):
                        it["ul"] = ul_of(t[0])
                    if len(t) != 5:
                        raise SystemExit(f"{where}: exam Q needs 4 options: {line}")
                    it["opts"] = [plain(o) for o in t[1:]]
                    it["opts_r"] = [esc(plain(o)) for o in t[1:]]
                    key = qn
            elif xs["type"] == "select":
                if len(t) != 3 or not re.fullmatch(r"\d+(-\d)?", t[0]):
                    raise SystemExit(f"{where}: 練習Ⅱ Q needs n-m|sentence|slot: {line}")
                key = t[0] if "-" in t[0] else int(t[0])
                it = {"n": key, "q": plain(t[1]), "q_r": ruby_ul(t[1], tested=True), "slot": t[2]}
                if ul_of(t[1]):
                    it["ul"] = ul_of(t[1])
            else:
                qn += 1
                key = qn
                it = {"n": qn, "q": plain(t[0]), "q_r": ruby_choice(t[0])}
                it["choices"] = choices_of(t[0])
            xs["items"].append(it)
            if tr.strip():
                trans.append({"n": key, "translation": tr.strip()})
            elif d != 7:
                WARN.append(f"{where}: no translation")
        elif tag == "A":
            day["answers_text"] = body
        else:
            raise SystemExit(f"{where}: unknown tag {tag}")
    if d == 7:
        day.update({"title": "実戦問題", "title_r": "<ruby>実戦<rt>じっせん</rt></ruby><ruby>問題<rt>もんだい</rt></ruby>", "title_cn": "实战问题", "title_en": "Practice test", "time_limit": "15分", "scoring": "1問4点×25問／100"})
        day.update(mondai)
        if column:
            for i, k in enumerate(column["kanji"], 1):
                k["n"] = i
            day["column"] = column
    else:
        for i, k in enumerate(kanji, 1):
            k["n"] = i
        day["kanji"] = kanji
        day["sections"] = [{k: v for k, v in s.items()} for s in sections]
        day["exercises"] = {"sections": ex_secs, "answers_note": f"答えは別冊p.{BESSATSU.get((w, d), '')}"}
        if day.get("answers_text"):
            day["exercises"]["answers"] = day.pop("answers_text")
            reads = []
            for sec in ex_secs:
                for it in sec["items"]:
                    if it.get("choices"):
                        reads.append(CIRC[it["n"] - 1] + "　" + "／".join(f"{'ab'[i]}. {c['jp']}（{c['reading']}）" for i, c in enumerate(it["choices"])))
            if reads:
                day["exercises"]["answers_note"] = "读音：" + "　".join(reads)
    return day, trans


def title_ruby(title, reading):
    parts, reads = title.split("・"), reading.split("・")
    if len(parts) != len(reads):
        return ruby(title)
    return "・".join(word_ruby(p, r) for p, r in zip(parts, reads))


BESSATSU = {}


def parse_ex(path, d7):
    items, answers = [], {}
    tr = {t["n"]: t["translation"] for t in d7.get("_trans", [])}
    for raw in open(path, encoding="utf-8"):
        line = raw.rstrip("\n")
        if not line.strip() or line.startswith("#"):
            continue
        t = line.split("|")
        if len(t) != 3:
            raise SystemExit(f"{path}: need n|ans|point: {line}")
        n, ans, point = int(t[0]), t[1], t[2]
        answers[n] = ans
        e = {"n": n, "point": point}
        if ans.isdigit():
            e["ans"] = int(ans)
        if n in tr:
            e["trans"] = tr[n]
        elif n <= 20:
            WARN.append(f"{path}: no translation for {n}")
        items.append(e)
    # passage translation sits on the 21-25 item
    if "21-25" in tr:
        for e in items:
            if e["n"] == 21:
                e["trans"] = tr["21-25"]
    return items, answers


def main():
    for f in sorted(glob.glob(os.path.join(SRC, "w*d*.txt"))):
        for raw in open(f, encoding="utf-8"):
            if raw.startswith("W ") or raw.startswith("K "):
                t = raw[2:].rstrip("\n").split("|")
                if len(t) > 1 and t[1] and KANJI.search(t[0]) and re.fullmatch(r"[ぁ-んー・]+", t[1].lstrip("•")):
                    add_lex(t[0].lstrip("◆"), t[1].lstrip("•"))
    meta = json.load(open(os.path.join(SRC, "weeks.json"), encoding="utf-8"))
    for w in range(1, 9):
        for d in range(1, 7):
            BESSATSU[(w, d)] = ""
    weeks, daily, exam = [], {}, {}
    for w in range(1, 9):
        days = []
        for d in range(1, 8):
            p = os.path.join(SRC, f"w{w}d{d}.txt")
            if not os.path.exists(p):
                continue
            day, tr = parse_day(p, w, d)
            wm = meta.get(str(w), {})
            day.update({"theme": wm.get("title", ""), "theme_cn": wm.get("title_cn", ""), "theme_en": wm.get("title_en", "")})
            if d == 7:
                day["_trans"] = tr
            elif tr:
                daily[f"w{w}d{d}"] = {"items": tr}
            days.append(day)
        d7 = next((x for x in days if x["day"] == 7), None)
        exp = os.path.join(SRC, f"w{w}ex.txt")
        if d7 is not None:
            if os.path.exists(exp):
                items, answers = parse_ex(exp, d7)
                exam[f"w{w}"] = items
                d7["answers"] = " ".join(CIRC[n - 1] + str(answers[n]) for n in sorted(answers))
            d7.pop("_trans", None)
        if days:
            wk = {"n": w, "title": meta.get(str(w), {}).get("title", ""), "title_cn": meta.get(str(w), {}).get("title_cn", ""), "days": days}
            weeks.append(wk)
    data = {"weeks": weeks}
    body = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    h = hashlib.sha256(body.encode()).hexdigest()[:10]
    for old in glob.glob(os.path.join(OUT, "n1kanji.*.json")):
        os.remove(old)
    name = f"n1kanji.{h}.json"
    open(os.path.join(OUT, name), "w", encoding="utf-8").write(body)
    json.dump({"version": 1, "kanji": daily}, open(os.path.join(OUT, "n1-kanji-daily-translations.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump(exam, open(os.path.join(OUT, "n1-kanji-exam-explanations.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    for f in ["app/study/store.ts", "scripts/check-n1-kanji.mjs", "scripts/check-semantic-content.mjs", "tests/unit/store.test.ts"]:
        fp = os.path.join(ROOT, f)
        if os.path.exists(fp):
            s = open(fp, encoding="utf-8").read()
            s2 = re.sub(r"n1kanji\.[0-9a-f]{10}\.json", name, s)
            if s2 != s:
                open(fp, "w", encoding="utf-8").write(s2)
    nk = sum(len(dd.get("kanji", [])) for wk in weeks for dd in wk["days"])
    nw = sum(len(k["words"]) for wk in weeks for dd in wk["days"] for k in dd.get("kanji", []))
    print(name, "weeks", len(weeks), "days", sum(len(wk["days"]) for wk in weeks), "kanji", nk, "words", nw)
    for x in WARN:
        print("WARN", x, file=sys.stderr)


if __name__ == "__main__":
    main()
