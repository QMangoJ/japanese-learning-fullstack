import json, re, glob
D="/workspace/wt-n1-listening/public/data/"
SRC=[("n1vocab.41d7ac89a7.json","N1"),("n1kanji.fd4839449f.json","N1"),("n2vocab.90123e4b43.json","N2"),("n2kanji.d9739ca8d4.json","N2"),("vocab.856eb48e32.json","N3"),("kanji.e43232869e.json","N3")]
def ruby_reading(r):
    return re.sub(r"<ruby>(.*?)<rt>(.*?)</rt></ruby>",lambda m:m.group(2),r)
ents={}
cands={}
def walk(o,lv):
    if isinstance(o,dict):
        if "jp" in o and "cn" in o and isinstance(o["jp"],str) and isinstance(o["cn"],str):
            add(o,lv)
        for v in o.values(): walk(v,lv)
    elif isinstance(o,list):
        for v in o: walk(v,lv)
def clean(s): return re.sub(r"[※（(][^）)]*[）)]|※|〜|～|…|\s","",s)
def add(o,lv):
    jps=o["jp"].split("／"); 
    rr=(ruby_reading(o["jp_r"]) if o.get("jp_r") else "") or o.get("reading") or ""
    rs=rr.split("／") if rr else []
    for i,jp in enumerate(jps):
        w=clean(jp)
        if not w or len(w)<2 or len(w)>10 or "。" in w or not re.search(r"[\u4e00-\u9fff\u30a0-\u30ff]",w): continue
        r=clean(rs[i]) if i<len(rs) else ""
        if r and re.search(r"[\u4e00-\u9fff]",r): r=""
        cn=o["cn"].strip()
        if not cn or len(cn)>16 or re.search(r"[：:“”「」。！？!?\"]",cn): continue
        w=re.sub(r"[^\u3040-\u30ff\u4e00-\u9fffー々A-Za-z0-9]","",w)
        if len(w)<2: continue
        rank={"N1":0,"N2":1,"N3":2}[lv]
        cands.setdefault(w,[]).append((w,r,cn,rank,lv))
for f,lv in SRC: walk(json.load(open(D+f)),lv)
for w,cs in cands.items():
    lv=max(cs,key=lambda c:c[3])[4]
    best=min(cs,key=lambda c:(len(c[2]) if len(c[2])>=2 else 99, -c[3]))
    r=next((c[1] for c in cs if c[1]),"")
    if len(best[2])>8: continue
    ents[w]=(w,r,best[2],0,lv)
json.dump({k:{"w":v[0],"r":v[1],"cn":v[2],"lv":v[4]} for k,v in ents.items()},open("dict.json","w"),ensure_ascii=False)
print(len(ents)); import itertools; print(list(itertools.islice(ents.values(),0,2000,200)))
