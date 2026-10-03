import json, sys, os, re, concurrent.futures as cf
from gem import call, img
EX=json.load(open("n2-examples.json"))
SECS={s["key"]:s for s in json.load(open("sections.json"))}
TYPES=open("/workspace/wt-n1-listening/app/data/listening-n3-lesson-types.ts").read()
def ocr(n): return open(f"ocr/{n:03d}.txt").read()
PROMPT="""你在把一本 JLPT N1 听力教材（《新日语能力考试考前对策 N1 聴解》，日本 Ask 出版「日本語総まとめ」系列中文版）的一节转成网页数据。
同系列 N2 教材已经做好了，下面给你 N2 的成品 JSON 作为格式范例（ListeningLesson 类型）。请严格按同样的结构，为 N1 的第 {key} 节（第{ch}章 第{sec}节）输出一个 ListeningLesson JSON 对象。

TypeScript 类型定义：
```ts
{types}
```

N2 成品范例（只学格式和写法，内容完全不要照搬）：
```json
{examples}
```

== 本节素材 ==
附带的图片是本节课文/题目页的扫描（页码 {pages}）。下面是整本书相关页面的 OCR 文字（已较准确，但仍可能有个别错字，请对照图片和上下文纠正）：
{ocr}

== 输出要求 ==
1. 只输出一个 JSON 对象：{{"blocks": [...], "answer": "...", "transcript": "...", "transcript_cn": "..."}}。
2. blocks：按书页从上到下的顺序还原课文（讲解、标语、表格、例题、注意事项、れんしゅう/問題的题目）。
   - 第一个 block 必须是 {{"type":"hero","no":{sec},"title":本节日文标题,"kana":标题中关键汉字词的读音,"en":英文标题,"cn":中文标题}}。
   - 书上已有的中文说明放进对应 block 的 cn 字段；整段只有中文的说明用 {{"type":"tip","jp":中文原文,"cn":中文原文}}。
   - 课文里的日语讲解/例句如果书上没有中文，cn 可以省略（之后会统一翻译），不要硬编。
   - 词语注释（例如「しょっちゅう：all the time 经常 자주」）保留英文和中文，**删除韩文**。
   - 插图只是装饰（猫的漫画等）就忽略，但漫画对白如果是教学内容可以用 note。
   - 每道题用一个 "q" block：label 用书上的编号，单独的题写「1番」「2番」；在「問題Ⅰ/Ⅱ…」下面的题写「問題Ⅱ 1番」这样的完整标签；如果一个「問題Ⅰ」下面没有分「番」而是整组一起作答（如①〜⑤小题），label 写「問題Ⅰ」。例题写「例」（不计分）。
   - q.tracks 写该题 MP3 图标上的曲目号（只写曲目号整数，不写光盘号），例如 [TRACK 1-25] → 25。
   - q.prompt 写题目说明；q.options 写选项（保留①②或 1 2 3 4 编号）；只有「① ② ③」这种空选项也照写。
   - 题目带有插图/图表/图片选项时，加 "figure": "/listening/n1/pages/{{三位页码}}.jpg" 和 "figureAlt"（简短日文描述，如「1番　グラフの選択肢」）。
   - 「れんしゅう（答えは p.XX）」这类小标题用 {{"type":"h","jp":"れんしゅう","cn":"答案在 p.XX"}}。
3. answer：每道计分题的正确答案，一行一题，如「1番：3」「問題Ⅱ 1番：2」；整组小题写「問题Ⅰ　①4　②1　③1」这种格式（参照范例）。顺序与 blocks 里的计分 q 完全一致。
4. transcript：「スクリプト」的日语原文。每道计分题一段，段与段之间空一行；每段第一行以该题 label 开头（如「1番」或「問題Ⅱ 1番」，与 q.label 一致；整组题写「問題Ⅰ」），后面接题目说明行、对话（「男：」「女：」等保留）、提问句；即时应答题的 1 2 3 选项也要写上。不要包含答案、MP3 标记、页码、表格竖线、下划线标记 __ 和 (※1) 这类注释编号（注释另放）。题数必须与计分 q 数相同。
5. transcript_cn：书上「訳文」页的中文译文，结构与 transcript 完全对应（每段同样以日文 label 如「1番」「問題Ⅱ 1番」开头，空行分隔）。以书上的译文为准，纠正 OCR 错字；书上没有译文的部分请你自己翻成自然准确的简体中文。
6. 脚本页里的词语注释（※1 等）放进对应题 q.note，格式如「欠かさず：without fail 不缺少／ピンとくる：rings a bell 立刻领会」（删除韩文）。
7. 文字必须忠实于原书，不要编造、不要省略对话内容。只输出 JSON。"""
EXTRA={"1-5":"\n\n【特别注意】本节 p.80〜85 的脚本和译文必须完整转写：問題Ⅰ、問題Ⅱ 1〜4番每一题的①〜⑤每个小题都要有日语原文和中文译文，不得留空或省略；問題Ⅲ 的三道题 label 请写成「問題Ⅲ 1番」「問題Ⅲ 2番」「問題Ⅲ 3番」（书上印作①②③），answer/transcript/transcript_cn 也用这个 label，并完整写出每题的对话。"}
def build(key):
    s=SECS[key]; ch,sec=key.split("-")
    exkeys=["1-1","2-2","5-1"] if ch in "12" else ["1-5","3-3","5-1"]
    examples=json.dumps({k:EX[k] for k in exkeys},ensure_ascii=False)
    parts=[]
    for n in s["pages"]: parts.append(f"--- 课文/题目页 p.{n} ---\n{ocr(n)}")
    for n in s["ans"]: parts.append(f"--- 答案・スクリプト页 p.{n} ---\n{ocr(n)}")
    for n in s["tr"]: parts.append(f"--- 中文译文页 p.{n} ---\n{ocr(n)}")
    text=PROMPT.format(key=key,ch=ch,sec=sec,types=TYPES,examples=examples,pages=",".join(map(str,s["pages"])),ocr="\n\n".join(parts))+EXTRA.get(key,"")
    return [{"text":text}]+[img(f"hi/p-{n:03d}.jpg") for n in s["pages"]]
def do(key):
    out=f"lessons/{key}.json"
    if os.path.exists(out): return key,"skip"
    for k in range(3):
        t=call(build(key),json_mode=True,temperature=0.2)
        try:
            d=json.loads(t)
            if isinstance(d,list): d=d[0]
            assert d["blocks"][0]["type"]=="hero" and d["transcript"]
            break
        except Exception as e: print("bad",key,e,file=sys.stderr); d=None
    if d is None: return key,"FAILED"
    json.dump(d,open(out,"w"),ensure_ascii=False,indent=1)
    return key,len(t)
keys=sys.argv[1:] or list(SECS)
with cf.ThreadPoolExecutor(10) as ex:
    for fut in cf.as_completed([ex.submit(do,k) for k in keys]): print(*fut.result(),flush=True)
