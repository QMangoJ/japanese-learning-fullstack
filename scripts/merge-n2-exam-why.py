#!/usr/bin/env python3
"""Merge authored week why files into the overlay and N2 exam explanations."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPL = ROOT / "public/data/n2-grammar-explanations.json"
OVERLAY = ROOT / "scripts/n2-exam-why.json"
SOURCE = ROOT / "tmp/n2-exam-why"

overlay: dict[str, dict] = {}
if OVERLAY.exists():
    overlay = json.loads(OVERLAY.read_text(encoding="utf-8"))

for week in range(1, 9):
    path = SOURCE / f"w{week}-authored.json"
    if not path.exists():
        continue
    for item in json.loads(path.read_text(encoding="utf-8")):
        overlay[f"w{week}-{item['n']}"] = {"why": item["why"], "why_en": item["why_en"]}

data = json.loads(EXPL.read_text(encoding="utf-8"))
filled = 0
for week, pack in data.items():
    for items in pack.values():
        for item in items:
            rec = overlay.get(f"{week}-{item['n']}")
            if not rec:
                continue
            item["why"] = rec["why"]
            item["why_en"] = rec["why_en"]
            filled += 1

OVERLAY.write_text(json.dumps(overlay, ensure_ascii=False, indent="\t") + "\n", encoding="utf-8")
EXPL.write_text(json.dumps(data, ensure_ascii=False, indent="\t") + "\n", encoding="utf-8")
print(f"Wrote {OVERLAY.name} ({len(overlay)} keys) and filled {filled} explanation items")
