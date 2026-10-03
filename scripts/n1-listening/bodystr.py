import json,glob,re
seen={};order=[]
def add(s,k):
    if not s or not isinstance(s,str): return
    s2=s
    if not re.search(r"[\u3040-\u30ff\u4e00-\u9fff]",s2): return
    if re.fullmatch(r"[\d\s.、。・番１-９①-⑨()（）A-Za-z]+",s2): return
    if s2 not in seen: seen[s2]=k; order.append(s2)
for c,n in [(1,5),(2,7),(3,5),(4,5),(5,5)]:
  for s in range(1,n+1):
    k=f"{c}-{s}"
    for b in json.load(open(f"lessons/{k}.json"))["blocks"]:
        t=b["type"]
        if t in("h","p") and not b.get("cn"): add(b.get("jp"),k)
        elif t=="table":
            add(b.get("title"),k)
            for row in [b.get("head") or []]+(b.get("rows") or []):
                for cell in row: add(cell,k)
        elif t=="box":
            for it in b.get("items",[]):
                add(it.get("title"),k); [add(l,k) for l in it.get("lines",[])]; add(it.get("note"),k)
        elif t=="example":
            add(b.get("title"),k); [add(l,k) for l in b.get("lines",[])]
        elif t in("aside","note"): add(b.get("text"),k)
        elif t=="q":
            add(b.get("prompt"),k); add(b.get("example"),k); [add(o,k) for o in b.get("options",[]) or []]; add(b.get("note"),k)
json.dump([[s,seen[s]] for s in order],open("bodystr.json","w"),ensure_ascii=False,indent=0)
print(len(order), sum(len(s) for s in order))
import collections; print(collections.Counter(seen.values()))
