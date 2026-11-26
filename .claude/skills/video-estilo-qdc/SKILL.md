---
name: video-estilo-qdc
description: Método oficial dos vídeos 3D da Stark Service (o que fez o "QDC monofásico" ter 26 mil visualizações): tutorial passo a passo em bancada realista, peças reais sem marca, rótulos na hora da fala, legenda de uma palavra por vez e legenda de post no padrão que converteu. Use SEMPRE que for criar, refazer ou revisar um vídeo 3D da Stark (qualquer curso), antes de escrever o roteiro ou a cena.
---

# Vídeo no estilo QDC (modelo oficial)

Modelo de referência: `kit/scenes3d/qdc3d.js` + `kit/specs/qdc3d.json` (vídeo do Reel https://www.instagram.com/reel/DgDNWzqjmrK/). Receita visual completa em `kit/ESTILO-QDC.md`. Esta skill é o PASSO A PASSO.

## 1. Escolher o tema (assunto de referência)
- Uma TAREFA que o profissional executa ("Como montar...", "Como ligar...", "Como instalar..."), não um conceito solto. Pergunta-guia: a pessoa salvaria isso para consultar no trabalho?
- Gancho de 2 s com erro/perigo/promessa: "Todo eletricista precisa saber ...".

## 2. Roteiro (tutorial)
- 7 a 9 falas, uma ideia por fala: gancho, passos 1 a N na ordem real de execução, alerta (erro comum), o segredo, UMA chamada final "Manda <PALAVRA> no direct".
- Com valores concretos (bitola, corrente, cores dos fios, posição dos bornes). O que for incerto fica marcado "revisar" e o dono aprova ANTES de produzir.
- Voz masculina grave e firme (público masculino): veja a seção Voz.

## 3. Spec e cena
- Copie `kit/specs/qdc3d.json` e `kit/scenes3d/qdc3d.js` e troque o conteúdo (peças, passos, eventos). Os eventos vêm de palavras do roteiro (`events: {nome: "palavra"}`) e viram `E.nome` na cena: peça cai, rótulo aparece, câmera vai até ela exatamente na palavra.
- Mantenha: bancada, parede perfurada, sombras, `rbox` (peças arredondadas), texturas impressas, parafusos, título fixo no topo, marca d'água da Stark. Sem marcas de fabricantes.

## 4. Produção
1. `python3 kit/gen_audio.py <spec> <build>` (cota grátis ~10 falas por dia por modelo; um modelo de voz por vídeo).
2. Folha de contato de 8 a 10 quadros (`node kit/render3d.js <build> f1,f2,...`) e confira enquadramento, rótulos cortados e peças fora do lugar.
3. Render completo em background (`node kit/render3d.js <build>`), ffmpeg com crf 25 (menos de 15 MB), 30 fps, 1080x1920.
4. Suba em `videos/`, legenda em `legendas/`, atualize `calendario.json`. Poste só com aprovação do dono.

## 5. Legenda do post (padrão que converteu)
1ª linha de gancho forte (começa com "Todo ... precisa saber") + lista curta dos passos + "O segredo: ..." + UM pedido só ("Manda <PALAVRA> no direct pra saber do curso de <Curso> da Stark Service.") + "Vídeo criado por @rhaylook, da Stark Service." + 5 hashtags do nicho (sem genéricas).

## Voz (DECIDIDO pelo dono em 24/11/2026)
- **Voz fixa da Stark: Orus** (masculina, grave e firme), modelo `gemini-3.1-flash-tts-preview`, estilo de direção em português ("Diga com voz grave, firme e confiante, como um instrutor experiente:"). Use SEMPRE essa voz e esse modelo em todos os vídeos novos.
- Cota grátis: ~10 falas por dia por modelo; um vídeo usa 7 a 9. Sem plano pago de voz, sai 1 vídeo por dia com a voz fixa. Não troque de modelo/voz para "caber" mais vídeos sem avisar o dono.
- Os vídeos antigos (Puck, Kore etc.) ficam como estão; não reaproveite a voz deles em vídeo novo.

## O que NÃO fazer (reprovado pelos números)
Desenho low poly "quadradão", paisagem/sala de brinquedo, vídeo que só mostra "o que é", três posts seguidos em poucos minutos, repostar o mesmo vídeo.


## Gancho (decisão do dono, 26/11/2026)
O gancho dos 3 primeiros segundos é uma dor/curiosidade do espectador em pergunta objetiva ("Seu ar-condicionado está pingando?") ou "Todo <profissional> precisa saber <tarefa>". Pergunta sem dor não basta. Priorizar NR-10, NR-35 e Elétrica Predial. Detalhes e números em kit/FORMULA-VIRAL-QDC.md.
