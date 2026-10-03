import json,re
D=json.load(open('dict.json')); Q=json.load(open('qtrans.json'))
from pykakasi import kakasi
kk=kakasi()
def hira(s): return "".join(x['hira'] for x in kk.convert(s))
KANA_END=re.compile(r"[うくぐすつぬぶむるいだ]$")
pats=[]
for w,e in D.items():
    has_k=re.search(r"[\u4e00-\u9fff]",w)
    if not has_k and not re.fullmatch(r"[ァ-ヴー]{3,}",w): continue  # skip pure hiragana words (too ambiguous)
    key=w
    if has_k and KANA_END.search(w) and re.search(r"[\u4e00-\u9fff々]",w[:-1]): key=w[:-1]
    if w.endswith("する") and len(w)>3: key=w[:-2]
    if len(key)<2 and not re.search(r"[\u4e00-\u9fff]{1}[ぁ-ん]",key): continue
    pats.append((key,w,e))
pats.sort(key=lambda x:-len(x[0]))
RANK={"N1":0,"N2":1,"N3":2}
out={}
total=0
for k,arr in Q.items():
    res=[]
    for t in arr:
        if not t: res.append([]); continue
        # strip speaker labels like "男：" / headings
        body=re.sub(r"^.*番.*$","",t,flags=re.M)
        used=[False]*len(body); found=[]
        for key,w,e in pats:
            start=0
            while True:
                i=body.find(key,start)
                if i<0: break
                j=i+len(key); start=i+1
                if any(used[i:j]): continue
                # avoid matching inside a longer kanji compound
                if re.match(r"[\u4e00-\u9fff]",body[j:j+1] or "") and re.match(r"[\u4e00-\u9fff]",key[-1]) : continue
                if i>0 and re.match(r"[\u4e00-\u9fff]",body[i-1]) and re.match(r"[\u4e00-\u9fff]",key[0]): continue
                if re.fullmatch(r"[ァ-ヴー]+",key) and (re.match(r"[ァ-ヴー]",body[j:j+1] or "") or (i>0 and re.match(r"[ァ-ヴー]",body[i-1]))): continue
                for x in range(i,j): used[x]=True
                found.append((i,w,e)); break
        found.sort()
        seen=set(); g=[]
        for i,w,e in found:
            if w in seen or (w.endswith("する") and w[:-2] in seen) or (w+"する") in seen: continue
            seen.add(w)
            r=e["r"] or (w if re.fullmatch(r"[ァ-ヴー]+",w) else hira(w))
            g.append({"w":w,"r":r,"cn":e["cn"],"lv":e["lv"]})
        # keep harder words first if too many
        if len(g)>14:
            keep=sorted(g,key=lambda x:RANK[x["lv"]])[:14]; ks={id(x) for x in keep}; g=[x for x in g if id(x) in ks]
        total+=len(g); res.append(g)
    out[k]=res
json.dump(out,open('glosses.json','w'),ensure_ascii=False,indent=1)
print(total)
for g in out["3-2"][0]: print(g)
