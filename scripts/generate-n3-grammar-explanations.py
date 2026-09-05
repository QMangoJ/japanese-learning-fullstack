import json
import os
import re
import subprocess
from pathlib import Path

from sudachipy import dictionary, tokenizer as sudachi_tokenizer
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/data/grammar.d15be04258.json"
VOCAB_SOURCE = ROOT / "public/data/vocab.856eb48e32.json"
OUTPUT = ROOT / "public/data/n3-grammar-explanations.json"
MODEL_ROOT = ROOT / "tmp/nllb-ja-zh"

SOURCE_OVERRIDES = {
    1: ["1-1-p2", "1-6-p2", "1-2-p1", "1-5-p0", "1-4-p1", "1-3-p0", "1-2-p1", "1-2-p0", "1-1-p0", "1-6-p1", "1-5-p0", "1-4-p0", "1-3-p2", "1-2-p2", "1-1-p1", "1-1-p0", "1-4-p2", "1-2-p2", "1-3-p0", "1-1-p1", "1-6-p1", "1-6-p2", "1-1-p2", "1-6-p1", "1-4-p0"],
    2: ["2-1-p1", "2-1-p0", "2-2-p0", "2-3-p2", "2-1-p2", "2-3-p3", "2-6-p1", "2-6-p0", "2-3-p0", "2-6-p1", "2-5-p2", "2-2-p2", "2-2-p3", "2-1-p3", "2-2-p3", "2-1-p1", "2-4-p2", "2-6-p1", "2-6-p3", "2-2-p3", "2-5-p1", "2-1-p1", "2-5-p2", "2-5-p0", "2-4-p0"],
    3: ["3-4-p1", "3-6-p1", "3-2-p1", "3-2-p3", "3-4-p2", "3-3-p2", "3-1-p1", "3-3-p3", "3-1-p2", "3-4-p0", "3-2-p0", "3-5-p1", "3-5-p2", "3-2-p2", "3-3-p1", "3-6-p2", "3-3-p0", "3-4-p3", "3-5-p0", "3-5-p3", "3-6-p0", "3-3-p2", "3-4-p1", "3-4-p2", "3-6-p1"],
    4: ["4-2-p2", "4-2-p0", "4-4-p2", "4-1-p1", "4-3-p0", "4-3-p1", "4-5-p1", "4-5-p0", "4-4-p1", "4-4-p3", "4-3-p3", "4-1-p2", "4-3-p2", "4-4-p0", "4-1-p3", "4-1-p0", "4-4-p3", "4-5-p2", "4-2-p1", "4-5-p3", "4-6-p3", "4-6-p0", "4-6-p1", "4-6-p1", "4-6-p2"],
    5: ["5-1-p2", "5-5-p0", "5-2-p1", "5-5-p2", "5-1-p1", "5-3-p1", "5-4-p3", "5-4-p0", "5-5-p3", "5-2-p3", "5-3-p0", "5-5-p0", "5-1-p3", "5-3-p0", "5-1-p0", "5-4-p2", "5-4-p1", "5-2-p2", "5-2-p0", "5-5-p1", "5-6-p1", "5-6-p2", "5-6-p0", "5-5-p3", "5-6-p3"],
}

OPTION_TRANSLATION_OVERRIDES = {
    "ために": "为了……／因为……", "ように": "为了能够……／像……一样", "らしく": "很像……地／符合……特点地", "みたい": "好像……",
    "みたいな": "像……一样的", "みたいに": "像……一样地", "っぽく": "带有……感觉地", "のように": "像……一样地",
    "しちゃうと": "做了……的话（てしまう口语）", "しないと": "不做不行／必须做", "しとくと": "预先做好……的话", "使うように": "尽量使用／要求使用",
    "ばかり": "总是……／净是……", "だけしか": "只有……（后接否定）", "さえ": "连……都／只要……", "こそ": "正是……（强调）",
    "について": "关于……", "関する": "与……相关", "によれば": "根据……", "による": "由……引起／根据……", "により": "由于……／通过……",
    "といっても": "虽说……但……", "というより": "与其说……不如说……", "というと": "说到……", "という": "所谓……／叫作……",
    "たびに": "每当……", "ついでに": "顺便……", "にしては": "就……而言却……", "行くとしたら": "如果要去的话",
    "とたん": "刚一……就……", "であるべきだ": "应该是……", "したものだ": "过去常常……", "ささずに": "不撑（伞）而……",
    "として": "作为……", "置いた": "放置了", "つけっぱなしだ": "一直开着不关", "それにしても": "即便如此／话虽如此",
    "のかわりに": "代替……", "おかげで": "多亏……", "言わないことだ": "最好不要说……", "のわりに": "与……相比却……",
    "くらい": "达到……程度／大约", "ほど": "达到……程度／越……越……", "しかない": "只能……", "っけ": "来着？（回忆确认）",
    "ということだ": "也就是说……／据说……", "ことか": "多么……啊", "ことはない": "没必要……／没有比……更……", "くせに": "明明……却……",
    "なんか": "……之类（轻视或举例）", "に対して": "对于……／与……相对", "比べて": "与……相比", "ばかりか": "不仅……而且……",
    "切れない": "无法全部……完", "必ずしも": "未必／不一定", "たとえ": "即使／哪怕", "もしかすると": "也许／说不定",
    "において": "在……（场所／领域）", "まで": "直到……／甚至……", "たて": "刚刚做完", "なればいい": "要是变成……就好了",
    "いいのに": "明明……就好了／其实可以……", "ですから": "所以", "ところが": "然而／可是", "だけど": "但是（口语）", "ところで": "话说回来／转换话题",
    "ことにしている": "自己规定并坚持做……", "ことになっている": "按规定是……／已经决定为……", "わけがない": "不可能……", "わけにはいかない": "出于情理不能……",
    "ところ": "正要……／刚刚……／尝试后……", "あげないことはない": "也不是不能帮……", "勉強することにしよう": "决定学习吧",
    "まったく": "完全（常与否定呼应）", "めったに": "很少（常与否定呼应）", "決して": "绝不（与否定呼应）", "はじめて": "第一次／直到……才……",
    "許すわけにはいかない": "不能原谅", "見えるわけがない": "不可能看得见", "わけではない": "并不是……", "わけだ": "难怪……／也就是说……",
    "あと": "还剩……／再过……", "それとも": "还是……（二选一）", "その上": "而且／再加上", "少しも": "一点也不……",
}

WORD_TRANSLATION_OVERRIDES = {
    "薄い": "薄的、淡的", "うすく": "薄薄地、淡淡地", "方": "方向、一方", "ほう": "方向、一方",
    "なさい": "请……（命令、要求）", "次ぐ": "接着、紧随其后", "つぐ": "接着、紧随其后",
}

QUESTION_OVERRIDES = {
    (1, "mondai1", 14): {
        "trans": "如果不看电视，就先把它关掉。",
        "option_translations": [
            "开着／处于开启状态（「ついておいて」的口语缩略，本句用法不自然）",
            "先关掉／关着（「消しておいて」的口语缩略）",
            "先打开／让它保持开启（「つけておいて」的口语缩略）",
            "先熄灭／处于关闭状态（「消えておいて」的口语缩略，本句用法不自然）",
        ],
        "why": [
            "「ついといて」是「ついておいて」的口语缩略。「つく」是不及物动词，表示电视处于开启状态，不能表达让对方主动把电视关掉。",
            "「消しといて」是「消しておいて」的口语缩略。「消す」在电视语境中表示“关掉”，既符合接续，也符合“不看就关掉”的语境。",
            "「つけといて」是「つけておいて」的口语缩略，表示“先打开／保持开启”，意思与“不看电视”后的要求相反。",
            "「消えといて」是「消えておいて」的口语缩略。「消える」是不及物动词，表示电视自行关闭或处于关闭状态；这里需要请对方主动关电视，应使用他动词「消す」。",
        ],
        "point": "对应「〜ておく／〜とく」：表示预先做某事或让某状态保持下去。「消しといて」＝「消しておいて」。",
        "words": [
            {"jp": "テレビ", "kana": "テレビ", "cn": "电视"},
            {"jp": "見る", "kana": "みる", "cn": "看"},
            {"jp": "消す", "kana": "けす", "cn": "关掉（电视、电灯等）"},
            {"jp": "つける", "kana": "つける", "cn": "打开（电视、电灯等）"},
        ],
    },
}


class LocalTranslator:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained(
            MODEL_ROOT, src_lang="jpn_Jpan", tgt_lang="zho_Hans", local_files_only=True
        )
        self.model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_ROOT, local_files_only=True)
        self.target_language = self.tokenizer.convert_tokens_to_ids("zho_Hans")

    def translate_many(self, values):
        unique = list(dict.fromkeys(value.strip() for value in values if value and value.strip()))
        chinese = []
        for start in range(0, len(unique), 24):
            batch = unique[start:start + 24]
            encoded = self.tokenizer(batch, return_tensors="pt", padding=True, truncation=True, max_length=256)
            generated = self.model.generate(
                **encoded,
                forced_bos_token_id=self.target_language,
                num_beams=4,
                max_new_tokens=160,
            )
            chinese.extend(self.tokenizer.batch_decode(generated, skip_special_tokens=True))
        return dict(zip(unique, chinese))


def plain(value):
    return re.sub(r"<[^>]+>", "", str(value or ""))


def restored_question(item, answer):
    question = item.get("q", "")
    if answer.get("order"):
        order = [int(value) for value in re.findall(r"[1-4]", answer["order"])]
        options = item.get("opts", [])
        index = 0

        def replace(_match):
            nonlocal index
            value = options[order[index] - 1] if index < len(order) else ""
            index += 1
            return value

        return re.sub(r"＿{2,}|★", replace, question)
    selected = item.get("opts", [""])[answer.get("ans", 1) - 1]
    return re.sub(r"（[ 　_]*）|＿{2,}|_{2,}", selected, question, count=1)


def restored_passage_sentence(section_data, items, answers, number):
    passage = section_data.get("passage", "")
    marker = f"【{number}】"
    marker_index = passage.find(marker)
    if marker_index < 0:
        return ""
    start = max(passage.rfind("。", 0, marker_index), passage.rfind("！", 0, marker_index), passage.rfind("？", 0, marker_index)) + 1
    endings = [index for symbol in "。！？" if (index := passage.find(symbol, marker_index)) >= 0]
    end = min(endings) + 1 if endings else len(passage)
    sentence = passage[start:end].strip()
    for answer in answers:
        answer_item = items[answer["n"]]
        selected = answer_item.get("opts", [""])[answer.get("ans", 1) - 1]
        sentence = sentence.replace(f"【{answer['n']}】", selected)
    return sentence


def similarity(left, right):
    left = re.sub(r"[\s、。・（）〈〉［］「」A-Za-z0-9＋～〜VNAN]", "", left)
    right = re.sub(r"[\s、。・（）〈〉［］「」A-Za-z0-9＋～〜VNAN]", "", right)
    common = {left[index:index + size] for size in range(2, 8) for index in range(max(0, len(left) - size + 1))}
    return sum(len(piece) ** 2 for piece in common if piece in right)


def infer_source(data, week_number, item, answer):
    week = data["weeks"][week_number - 1]
    override = SOURCE_OVERRIDES.get(week_number, [])
    if 0 < answer.get("n", 0) <= len(override):
        _, day_text, point_text = override[answer["n"] - 1].split("-")
        day = int(day_text)
        index = int(point_text.removeprefix("p"))
        point = next(row for row in week["days"] if row.get("day") == day)["points"][index]
        return {
            "link": f"#/day/{week_number}-{day}/p{index}",
            "label": point.get("pattern", ""),
            "point": point.get("usage_cn") or point.get("usage_jp") or "结合接续形式与语境判断句型含义。",
            "score": 999,
        }
    material = " ".join([
        restored_question(item, answer),
        item.get("opts", [""])[answer.get("ans", 1) - 1],
        answer.get("note", ""),
    ])
    candidates = []
    for day in week["days"]:
        if day.get("day") == 7:
            continue
        for index, point in enumerate(day.get("points", [])):
            point_text = " ".join([
                point.get("pattern", ""), point.get("usage_jp", ""),
                point.get("usage_cn", ""), point.get("connection", ""),
                " ".join(example.get("jp", "") for example in point.get("examples", [])),
            ])
            candidates.append((similarity(material, point_text), day["day"], index, point))
    score, day, index, point = max(candidates, key=lambda row: row[0])
    return {
        "link": f"#/day/{week_number}-{day}/p{index}",
        "label": point.get("pattern", ""),
        "point": point.get("usage_cn") or point.get("usage_jp") or "结合接续形式与语境判断句型含义。",
        "score": score,
    }


def build_word_candidates(text, sudachi):
    result = []
    seen = set()
    ignored = {"する", "いる", "ある", "なる", "こと", "もの", "これ", "それ", "ため", "よう", "ところ", "さん", "ない"}
    for token in sudachi.tokenize(text, sudachi_tokenizer.Tokenizer.SplitMode.C):
        surface = token.surface().strip("、。！？『』「」（）　 ")
        base = token.dictionary_form()
        pos = token.part_of_speech()[0]
        if len(surface) < 2 or base in ignored or pos not in {"名詞", "動詞", "形容詞", "形状詞", "副詞"}:
            continue
        if not re.search(r"[一-龯々ァ-ヶぁ-ん]", surface) or surface in seen:
            continue
        seen.add(surface)
        result.append({"jp": surface, "base": base, "kana": token.reading_form() or "—"})
        if len(result) == 8:
            break
    return result


def main():
    data = json.loads(SOURCE.read_text())
    vocab_data = json.loads(VOCAB_SOURCE.read_text())
    vocab_map = {
        re.sub(r"[（）()~〜～]", "", item.get("jp", "")): item.get("cn", "")
        for week in vocab_data.get("weeks", []) for day in week.get("days", [])
        for section in day.get("sections", []) for item in section.get("items", []) if item.get("jp") and item.get("cn")
    }
    sudachi = dictionary.Dictionary().create()
    records = []
    translation_inputs = []
    translation_cache = {}
    existing_output = json.loads(OUTPUT.read_text()) if OUTPUT.exists() else {}

    for week_number in range(1, 7):
        day = next(item for item in data["weeks"][week_number - 1]["days"] if item.get("day") == 7)
        answer_group = data["besatsu"][f"w{week_number}"]
        for section in ("mondai1", "mondai2", "mondai3"):
            items = {item["n"]: item for item in day[section]["items"]}
            for answer in answer_group[section]:
                item = items[answer["n"]]
                completed = (
                    restored_passage_sentence(day[section], items, answer_group[section], answer["n"])
                    if section == "mondai3"
                    else restored_question(item, answer)
                )
                option_values = item.get("opts", [])
                source = infer_source(data, week_number, item, answer)
                words = build_word_candidates(completed, sudachi)
                records.append((week_number, section, answer, item, completed, option_values, source, words))
                translation_inputs.extend([completed, *option_values, *(word["base"] for word in words)])
                existing = next(
                    (row for row in existing_output.get(f"w{week_number}", {}).get(section, []) if row.get("n") == answer["n"]),
                    {},
                )
                if existing.get("trans"):
                    translation_cache[completed] = existing["trans"]
                for option, translated in zip(option_values, existing.get("option_translations", [])):
                    if translated:
                        translation_cache[option] = translated
                for word, existing_word in zip(words, existing.get("words", [])):
                    if existing_word.get("cn"):
                        translation_cache[word["base"]] = existing_word["cn"]

    pending = [value for value in translation_inputs if value not in translation_cache]
    translations = {**translation_cache, **LocalTranslator().translate_many(pending)}
    output = {f"w{week}": {"mondai1": [], "mondai2": [], "mondai3": []} for week in range(1, 7)}
    for week, section, source_answer, item, completed, option_values, source, words in records:
        option_translations = [OPTION_TRANSLATION_OVERRIDES.get(value, translations.get(value, "")) for value in option_values]
        # Do not manufacture generic “does not fit the context” explanations.
        # Curated, question-specific reasons are kept when present; otherwise
        # the UI should show no reason rather than an unhelpful stock sentence.
        why = [""] * len(option_translations)
        entry = dict(source_answer)
        entry.update({
            "trans": source_answer.get("trans") or translations.get(completed, ""),
            "option_translations": option_translations,
            "why": source_answer.get("why") or why,
            "point": source_answer.get("point") or f"对应「{source['label']}」：{source['point']}",
            "link": source_answer.get("link") or source["link"],
            "words": source_answer.get("words") or [
                {"jp": word["jp"], "kana": word["kana"], "cn": WORD_TRANSLATION_OVERRIDES.get(word["base"], WORD_TRANSLATION_OVERRIDES.get(word["jp"], vocab_map.get(word["base"], translations.get(word["base"], ""))))}
                for word in words
            ],
        })
        entry.update(QUESTION_OVERRIDES.get((week, section, source_answer["n"]), {}))
        output[f"w{week}"][section].append(entry)

    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n")
    subprocess.run(["node", str(ROOT / "scripts/curate-n3-grammar-explanations.mjs")], check=True)
    print(f"wrote and curated {OUTPUT}")


if __name__ == "__main__":
    main()
