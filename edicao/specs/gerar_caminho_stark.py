"""Spec do vídeo 'Como chegar na Stark' (Vídeo local.MP4). Gera caminho_stark.json ao lado."""
import json, os, sys
here = os.path.dirname(os.path.abspath(__file__))
tr = json.load(open(sys.argv[1]))  # transcrição faster-whisper (medium) com tempo por palavra
DESTINO = "Stark Service"
RUA_DESTINO = "R. Queiroz Pedroso – Bela Vista"  # endereço informado pelo dono em 26/11/2026
CIDADE = "Vitória de Santo Antão – PE"
KEYS = {"stark", "service", "caminho", "praça", "fórum", "vitória", "emoção", "chegar"}
keep = [(0.0, 14.40), (15.9, 21.6), (22.5, 22.85), (23.8, 27.0), (60.0, 63.1)]
ws = [w for s in tr for w in s["words"] if any(a <= w["s"] < b for a, b in keep)]
words = []
for i, w in enumerate(ws):
    txt = w["w"].strip().strip(",.?!")
    if not txt: continue
    nxt = ws[i + 1]["s"] if i + 1 < len(ws) else w["e"] + .4
    e = min(max(w["e"] + .12, w["s"] + .22), nxt if nxt - w["s"] > .1 else w["s"] + .2)
    words.append({"w": txt, "s": round(w["s"], 2), "e": round(e, 2), "key": txt.lower() in KEYS})

pin = lambda c: f'<div class="ico {c}">⌖</div>'
els = [
 {"a": .3, "b": 6.6, "y": 250, "cls": "card", "html":
  '<div class="num"><b>⌖</b>muita gente pergunta</div>'
  '<div class="ttl" style="font-size:76px">Onde fica a<br><span>Stark Service</span>?</div>'},
 {"a": 10.3, "b": 16.4, "y": 250, "cls": "card", "html":
  '<div class="num"><b>01</b>ponto de partida</div>'
  f'<div class="row" data-t="10.5">{pin("acc")}<div>Rua Joaquim Nabuco</div></div>'
  '<div class="row" data-t="11.0"><div class="ico">▦</div><div>em frente à Praça do Fórum</div></div>'
  f'<div class="row" data-t="13.6"><div class="ico">◎</div><div>{CIDADE}</div></div>'},
 {"a": 27.2, "b": 48.6, "y": 250, "cls": "card", "html":
  '<div class="num"><b>02</b>o trajeto</div>'
  '<svg width="812" height="330" viewBox="0 0 812 330">'
  '<path class="ghost" d="M50 240 C 190 240, 210 90, 380 140 S 600 270, 750 90"/>'
  '<path id="r1" class="route" data-a="27.6" data-b="47.4" d="M50 240 C 190 240, 210 90, 380 140 S 600 270, 750 90"/>'
  '<circle cx="50" cy="240" r="16" fill="#fff"/>'
  '<g data-follow="r1"><circle r="24" fill="#FFC21A" opacity=".35"/><circle r="14" fill="#FFC21A"/></g>'
  '<g data-t="47.2"><circle cx="750" cy="90" r="20" fill="#FFC21A"/><circle cx="750" cy="90" r="8" fill="#000"/></g>'
  '<text x="30" y="300" fill="#fff" font-size="30" font-weight="700" text-anchor="start">Praça do Fórum</text>'
  f'<text data-t="47.2" x="790" y="42" fill="#FFC21A" font-size="34" font-weight="800" text-anchor="end">{DESTINO}</text>'
  '</svg>'
  f'<div class="sub" data-t="47.2" style="margin-top:4px">até a <span class="acc">{RUA_DESTINO}</span></div>'},
 {"a": 49.6, "b": 56.4, "y": 900, "cls": "card", "html":
  '<div class="num"><b>03</b>chegada</div>'
  f'<div class="ttl"><span>{DESTINO}</span></div>'
  f'<div class="row" data-t="50.3"><div class="ico acc">⌖</div><div>{RUA_DESTINO}</div></div>'
  f'<div class="sub" data-t="50.8">{CIDADE}</div>'
  '<div class="row" data-t="51.2"><div class="ico acc">✓</div><div>chegamos!</div></div>'},
]
spec = {"words": words, "els": els,
        "end": {"t": 66.7, "extra": 3.0, "cta": "Fala com a gente<br>no <span>direct</span>",
                "sub": f"Stark Service · {CIDADE}"}}
json.dump(spec, open(os.path.join(here, "caminho_stark.json"), "w"), ensure_ascii=False, indent=1)
print(len(words), "palavras")
