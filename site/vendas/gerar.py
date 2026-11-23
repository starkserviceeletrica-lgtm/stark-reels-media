#!/usr/bin/env python3
"""Gera as páginas de venda das apostilas (site/apostila-<slug>.html).

Para ativar a venda de uma apostila, preencha em APOSTILAS:
  checkout  -> link de pagamento da plataforma (Hotmart, Kiwify, Cakto...)
  preco     -> ex.: "R$ 47,00"   (vazio = o botão mostra "Ver preço e comprar")
  de        -> preço antigo riscado (opcional)
Depois rode:  python3 site/vendas/gerar.py
"""
import html, json, pathlib

AQUI = pathlib.Path(__file__).resolve().parent
SITE = AQUI.parent
WHATS = "5581983747177"

APOSTILAS = {
    "eletrica": {
        "titulo": "Apostila Completa de Elétrica Predial",
        "curto": "Elétrica Predial",
        "sub": "60 páginas ilustradas, do jeito que a gente ensina no curso presencial da Stark Service.",
        "capa": "eletrica-capa.jpg",
        "previa": [("eletrica-sumario.jpg", "Sumário: as 10 partes da apostila"),
                   ("eletrica-p22.jpg", "Página 22: disjuntores"),
                   ("eletrica-p28.jpg", "Página 28: ligando uma tomada, passo a passo")],
        "partes": [("Segurança em primeiro lugar", "Choque, EPI, desligar e testar"),
                   ("Fundamentos da eletricidade", "Tensão, corrente, potência, fase, neutro e terra"),
                   ("Ferramentas do eletricista", "Alicates, chaves, furadeira, multímetro"),
                   ("Materiais e componentes", "Fios, eletrodutos, tomadas, disjuntor, DR, DPS"),
                   ("Emendas e ligações", "Emendar, isolar, ler diagrama, ligar tomada"),
                   ("Circuitos de iluminação", "Simples, duas teclas, paralelo, intermediário, sensor"),
                   ("Quadro e circuitos", "Montar o quadro, dividir circuitos, aterramento"),
                   ("Serviços do dia a dia", "Chuveiro, ventilador de teto, ar-condicionado"),
                   ("Testes e entrega", "Testar sem e com energia, entregar o serviço"),
                   ("Problemas comuns e consertos", "Fluxograma e 8 fichas de defeito"),
                   ("Para fixar e consultar", "Glossário, checklist, exercícios, consulta rápida, gabarito")],
        "para": ["Quem nunca mexeu com elétrica e quer começar do jeito certo",
                 "Quem quer trabalhar como eletricista residencial",
                 "Quem já faz serviço e quer uma consulta rápida com fichas de defeito"],
        "fotos": ["aula-eletrica.jpg", "historia-2025-bancada-dupla.jpg", "turma-sala.jpg"],
        "checkout": "", "preco": "", "de": "",
    },
    "refrigeracao": {
        "titulo": "Apostila Completa de Refrigeração",
        "curto": "Refrigeração",
        "sub": "Geladeira e ar-condicionado split em 60 páginas ilustradas, com fichas de defeito e exercícios.",
        "capa": "refrigeracao-capa.jpg",
        "previa": [("refrigeracao-sumario.jpg", "Sumário: as 7 partes da apostila"),
                   ("refrigeracao-p09.jpg", "Página 9: ferramentas e segurança"),
                   ("refrigeracao-p43.jpg", "Página 43: ficha de defeito, geladeira não liga")],
        "partes": [("Fundamentos", "Ciclo básico, calor e pressão, ferramentas, eletricidade básica"),
                   ("Componentes", "Compressor, condensador, evaporador, expansão, termostato, partida"),
                   ("Testes", "Termostato, compressor, ventilador e sensor"),
                   ("Gás e procedimentos", "Fluidos, solda, teste de vazamento, vácuo, carga de gás"),
                   ("Geladeira", "Tipos, frost free, degelo, esquema elétrico, manutenção"),
                   ("Ar-condicionado split", "Evaporadora, condensadora, instalação, limpeza, inverter"),
                   ("Defeitos e consertos", "Onde está o defeito, fichas da geladeira e do split"),
                   ("Para consultar e praticar", "Glossário, checklist, exercícios, freezer e bebedouro")],
        "para": ["Quem está começando em refrigeração",
                 "Quem quer trabalhar com geladeira e ar-condicionado split",
                 "Quem já faz o serviço e quer fichas de defeito para consultar"],
        "fotos": ["historia-2025-instrutor-aluno.jpg", "historia-2018-bancada.jpg", "historia-formatura-certificados.jpg"],
        "checkout": "", "preco": "", "de": "",
    },
}

E = html.escape

def pagina(slug, a):
    wa_msg = f"Olá! Tenho uma dúvida sobre a {a['titulo']}."
    wa = f"https://wa.me/{WHATS}?text=" + html.escape(__import__('urllib.parse').parse.quote(wa_msg))
    previa = "\n".join(
        f'<figure class="sheet" data-i="{i}"><button class="zoom" aria-label="Ampliar {E(c)}"><img src="img/previa/{f}" alt="{E(c)}" loading="{"eager" if i==0 else "lazy"}" width="1000" height="1414"></button><figcaption>{E(c)}</figcaption></figure>'
        for i, (f, c) in enumerate(a["previa"]))
    partes = "\n".join(f"<li><b>{E(t)}</b><span>{E(d)}</span></li>" for t, d in a["partes"])
    para = "\n".join(f"<li>{E(p)}</li>" for p in a["para"])
    fotos = "\n".join(f'<img src="img/{f}" alt="Aula prática na Stark Service" loading="lazy">' for f in a["fotos"])
    cfg = json.dumps({"checkout": a["checkout"], "preco": a["preco"], "de": a["de"], "wa": f"https://wa.me/{WHATS}?text=" + __import__('urllib.parse').parse.quote(f"Olá! Quero comprar a {a['titulo']}.")})
    vals = dict(slug=slug, titulo=E(a["titulo"]), curto=E(a["curto"]), sub=E(a["sub"]), capa=a["capa"],
                previa=previa, partes=partes, para=para, fotos=fotos, cfg=cfg, wa=wa,
                nprev=str(len(a["previa"])), npartes=str(len(a["partes"])))
    out = TEMPLATE
    for k, v in vals.items():
        out = out.replace("[[" + k + "]]", v)
    assert "[[" not in out, "placeholder sem valor"
    return out

TEMPLATE = open(AQUI / "modelo.html", encoding="utf-8").read()

if __name__ == "__main__":
    for slug, a in APOSTILAS.items():
        out = SITE / f"apostila-{slug}.html"
        out.write_text(pagina(slug, a), encoding="utf-8")
        print("gerado:", out.relative_to(SITE.parent))
