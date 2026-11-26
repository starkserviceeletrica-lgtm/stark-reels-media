#!/usr/bin/env python3
"""Gera a loja de apostilas (site/apostilas.html).

COMO ATIVAR A VENDA (Kiwify)
  Em cada apostila de APOSTILAS, preencha:
    checkout -> link de checkout da Kiwify (ex.: "https://pay.kiwify.com.br/AbC123")
    preco    -> ex.: "R$ 47,00"  (vazio = não mostra preço)
    de       -> preço antigo riscado, opcional
    soon     -> True enquanto a apostila não estiver pronta
  No COMBO, preencha checkout e preco do produto combo da Kiwify.
  Depois rode:  python3 site/vendas/gerar.py

LINKS PARA O DIRECT
  apostilas.html?apostila=eletrica      apostilas.html?apostila=refrigeracao
  apostilas.html?apostila=pacote-nr     (nr10, nr35 e nr também abrem o pacote)
  (acrescente &utm_source=instagram&utm_campaign=<nome-do-reel> para saber qual Reel vendeu)
"""
import json, pathlib

AQUI = pathlib.Path(__file__).resolve().parent
SITE = AQUI.parent
WHATS = "5581983747177"

APOSTILAS = {
    "eletrica": {
        "titulo": "Apostila Completa de Elétrica Predial", "curto": "Elétrica Predial",
        "sub": "60 páginas ilustradas, do jeito que a gente ensina no curso presencial da Stark Service.",
        "capa": "eletrica-capa.jpg", "plus": True,
        "previa": [["eletrica-sumario.jpg", "Sumário: as 10 partes da apostila"],
                   ["eletrica-p22.jpg", "Página 22: disjuntores"],
                   ["eletrica-p28.jpg", "Página 28: ligando uma tomada, passo a passo"]],
        "partes": [["Segurança em primeiro lugar", "Choque, EPI, desligar e testar"],
                   ["Fundamentos da eletricidade", "Tensão, corrente, potência, fase, neutro e terra"],
                   ["Ferramentas do eletricista", "Alicates, chaves, furadeira, multímetro"],
                   ["Materiais e componentes", "Fios, eletrodutos, tomadas, disjuntor, DR, DPS"],
                   ["Emendas e ligações", "Emendar, isolar, ler diagrama, ligar tomada"],
                   ["Circuitos de iluminação", "Simples, duas teclas, paralelo, intermediário, sensor"],
                   ["Quadro e circuitos", "Montar o quadro, dividir circuitos, aterramento"],
                   ["Serviços do dia a dia", "Chuveiro, ventilador de teto, ar-condicionado"],
                   ["Testes e entrega", "Testar sem e com energia, entregar o serviço"],
                   ["Problemas comuns e consertos", "Fluxograma e 8 fichas de defeito"],
                   ["Para fixar e consultar", "Glossário, checklist, exercícios, consulta rápida, gabarito"]],
        "para": ["Quem nunca mexeu com elétrica e quer começar do jeito certo",
                 "Quem quer trabalhar como eletricista residencial",
                 "Quem já faz serviço e quer uma consulta rápida com fichas de defeito"],
        "checkout": "https://pay.kiwify.com.br/cHyqB5j", "preco": "", "de": "", "soon": False,
    },
    "refrigeracao": {
        "titulo": "Apostila Completa de Refrigeração", "curto": "Refrigeração",
        "sub": "Geladeira e ar-condicionado split em 60 páginas ilustradas, com fichas de defeito e exercícios.",
        "capa": "refrigeracao-capa.jpg", "plus": True,
        "previa": [["refrigeracao-sumario.jpg", "Sumário: as 7 partes da apostila"],
                   ["refrigeracao-p09.jpg", "Página 9: ferramentas e segurança"],
                   ["refrigeracao-p43.jpg", "Página 43: ficha de defeito, geladeira não liga"]],
        "partes": [["Fundamentos", "Ciclo básico, calor e pressão, ferramentas, eletricidade básica"],
                   ["Componentes", "Compressor, condensador, evaporador, expansão, termostato, partida"],
                   ["Testes", "Termostato, compressor, ventilador e sensor"],
                   ["Gás e procedimentos", "Fluidos, solda, teste de vazamento, vácuo, carga de gás"],
                   ["Geladeira", "Tipos, frost free, degelo, esquema elétrico, manutenção"],
                   ["Ar-condicionado split", "Evaporadora, condensadora, instalação, limpeza, inverter"],
                   ["Defeitos e consertos", "Onde está o defeito, fichas da geladeira e do split"],
                   ["Para consultar e praticar", "Glossário, checklist, exercícios, freezer e bebedouro"]],
        "para": ["Quem está começando em refrigeração",
                 "Quem quer trabalhar com geladeira e ar-condicionado split",
                 "Quem já faz o serviço e quer fichas de defeito para consultar"],
        "checkout": "", "preco": "", "de": "", "soon": False,
    },
    "pacote-nr": {
        "titulo": "Pacote NR-10 + NR-35", "curto": "NR-10 + NR-35",
        "sub": "As duas apostilas pelo preço de uma: NR-10 (24 páginas) e NR-35 (16 páginas), ilustradas do jeito Stark.",
        "capa": "pacote-nr-capa.jpg", "plus": False,
        "previa": [["pacote-nr-f1.jpg", "NR-10: sumário"],
                   ["pacote-nr-f3.jpg", "NR-10, página 12: bloqueio e sinalização"],
                   ["pacote-nr-f6.jpg", "NR-35, página 8: cinturão tipo paraquedista"]],
        "partes": [["NR-10: a norma e você", "Para que serve a NR-10 e quem pode trabalhar com eletricidade"],
                   ["NR-10: os perigos da eletricidade", "Tensões, choque elétrico, arco elétrico e acidentes"],
                   ["NR-10: proteção coletiva", "Aterramento, DR, zonas de risco, bloqueio e sinalização"],
                   ["NR-10: desenergizar e reenergizar", "O passo a passo seguro, com teste de ausência de tensão"],
                   ["NR-10: EPI, ferramentas e organização do trabalho", ""],
                   ["NR-10: emergências", "Socorro, RCP e incêndio"],
                   ["NR-35: a norma e você", "O que é trabalho em altura e quem pode subir"],
                   ["NR-35: planejar antes de subir", "Planejamento, análise de risco e proteção coletiva"],
                   ["NR-35: equipamentos contra queda", "Cinturão, talabarte, ancoragem e inspeção"],
                   ["NR-35: na prática", "Escadas, telhado e resgate"],
                   ["Nas duas apostilas", "Exercícios, glossário, checklist e gabarito"]],
        "para": ["Quem vai fazer o curso de NR-10 ou NR-35 e quer chegar sabendo",
                 "Eletricista que trabalha em altura: escada, telhado, poste",
                 "Quem já tem o certificado e quer revisar o conteúdo"],
        "checkout": "", "preco": "", "de": "", "soon": False,
    },
}

COMBO = {
    "titulo": "Elétrica, Refrigeração e Pacote NR",
    "itens": ["eletrica", "refrigeracao", "pacote-nr"],
    "checkout": "", "preco": "", "de": "",
}

if __name__ == "__main__":
    dados = json.dumps({"apostilas": APOSTILAS, "combo": COMBO, "whats": WHATS}, ensure_ascii=False).replace("</", "<\\/")
    html = (AQUI / "loja.html").read_text(encoding="utf-8").replace("[[dados]]", dados)
    (SITE / "apostilas.html").write_text(html, encoding="utf-8")
    print("gerado: site/apostilas.html")
    teste = AQUI / "loja-teste.html"   # versão de teste com animações (não substitui a loja)
    if teste.exists():
        (SITE / "apostilas-teste.html").write_text(teste.read_text(encoding="utf-8").replace("[[dados]]", dados), encoding="utf-8")
        print("gerado: site/apostilas-teste.html")
    # endereços antigos continuam funcionando
    for slug in ("eletrica", "refrigeracao"):
        (SITE / f"apostila-{slug}.html").write_text(
            f'<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=apostilas.html?apostila={slug}">'
            f'<script>location.replace("apostilas.html?apostila={slug}"+location.search.replace("?","&"))</script>'
            f'<a href="apostilas.html?apostila={slug}">Abrir a apostila</a>', encoding="utf-8")
