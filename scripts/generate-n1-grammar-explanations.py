#!/usr/bin/env python3
"""Build public/data/n1-grammar-explanations.json (N1 実戦問題 answer key + explanations).

Answers and the Japanese 「＝…」 notes come from the book's 別冊 解答・解説 (n1-grammar-src/ans.py);
Chinese translations / key points are hand-written in n1-grammar-src/expl.py. Same shape as
n2-grammar-explanations.json, keyed w1..w8 → mondai1/2/3.
"""
import importlib.util, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "scripts", "n1-grammar-src")
sys.path.insert(0, SRC)
from ans import parse  # noqa: E402
from expl import parse_expl  # noqa: E402

spec = importlib.util.spec_from_file_location("b", os.path.join(ROOT, "scripts", "build-n1-grammar.py"))
b = importlib.util.module_from_spec(spec); spec.loader.exec_module(b)

out = {}
for w in range(1, 9):
    week = {"mondai1": [], "mondai2": [], "mondai3": []}
    for (n, ans, kaisetsu), (link, trans, point) in zip(parse(w), parse_expl(w)):
        if link:
            lw, rest = (link.split(":") if ":" in link else (str(w), link))
            d, i = rest.split("-")
            link = f"#/day/{lw}-{d}/p{i}"
        item = {"n": n, "ans": ans, "trans": trans, "trans_en": "", "option_translations": [], "option_translations_en": [],
                "why": [], "why_en": [], "point": point, "point_en": "", "link": link}
        sec = "mondai1" if n <= 15 else "mondai2" if n <= 20 else "mondai3"
        if sec == "mondai2":
            item["order"] = kaisetsu
        elif kaisetsu:
            item["note"] = "別冊：" + kaisetsu
            item["note_r"] = b.ruby(item["note"])
        week[sec].append(item)
    out[f"w{w}"] = week
path = os.path.join(ROOT, "public", "data", "n1-grammar-explanations.json")
open(path, "w", encoding="utf-8").write(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
print(os.path.relpath(path, ROOT), sum(len(v[k]) for v in out.values() for k in v))
