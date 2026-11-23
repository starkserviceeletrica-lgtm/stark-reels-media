---
name: gerar-video-3d
description: Use quando o dono pedir para GERAR/PRODUZIR um vídeo 3D da Stark Service (nova cena 3D, roteiro novo, semana de vídeos). Em vez de fazer o trabalho pesado na sessão atual (mais barata), delega para uma sessão filha rodando no modelo mais forte (Opus), que lê o CLAUDE.md e o kit e produz o vídeo. Não use para postar vídeo já aprovado, agendar, legendas ou conferir métricas: isso continua na sessão atual.
---

# Gerar vídeo 3D com o modelo mais forte (delegação)

Uma skill não troca o modelo da conversa em andamento. O que dá para fazer é **abrir uma sessão filha no Opus** só para a produção, e voltar o resultado para o dono.

## Quando delegar
- "Gera o vídeo de <tema>", "faz a semana toda", "cria a cena 3D de <assunto>", "refaz esse vídeo com <mudança de visual>".
## Quando NÃO delegar (ficar na sessão atual, modelo mais barato)
- Postar/agendar vídeo aprovado, conferir se saiu, atualizar `calendario.json`, escrever legenda/hashtags, mandar métricas, responder dúvidas.

## Como delegar
1. Confirme o tema e que o roteiro está em `cronograma/CRONOGRAMA-DE-CONTEUDO.md` e **aprovado pelo dono**. Se não estiver, escreva o roteiro, mostre e espere a aprovação antes de delegar.
2. Chame `mcp__claude-code-remote__create_session` com:
   - `model`: `claude-opus-5-5`
   - `source_url`: `https://github.com/starkserviceeletrica-lgtm/stark-reels-media`
   - `title`: `Vídeo 3D: <tema>`
   - `prompt`: o texto abaixo, preenchido.
3. Diga ao dono, em uma frase, que a produção foi para uma sessão Opus e que o vídeo chega quando terminar. Não fique consultando a sessão a cada minuto; confira com `get_session` quando o dono perguntar ou quando passar o tempo estimado (20 a 40 min por vídeo).
4. Quando a sessão filha terminar, confira o arquivo no repositório (`videos/`) e envie o vídeo ao dono. Postagem continua sendo com a regra do `CLAUDE.md` (só itens aprovados).

## Texto do prompt para a sessão filha
```
Leia o CLAUDE.md deste repositório e siga a seção "Rotina diária". Produza SOMENTE o vídeo 3D do tema: <TEMA e dia da semana>. Roteiro aprovado: <cole o roteiro>. Chamada final: "Manda <PALAVRA> no direct". Marca d'água da Stark (logo completa). Estilo: peças realistas e sem marca, câmera afastada com closes só para ler rótulos, legenda de uma palavra por vez. Voz: python3 kit/gen_audio.py; se a cota grátis esgotar, pare e avise (não troque de modelo no meio do vídeo). Confira uma folha de contato antes de renderizar. NÃO poste no Instagram: suba o vídeo em videos/, a legenda em legendas/, atualize calendario.json e cronograma.json, faça o commit e avise o dono com o caminho do arquivo.
```

## Limites a avisar ao dono
- A sessão filha também gasta crédito (do modelo Opus).
- A cota grátis da voz (cerca de 10 falas por dia por modelo) vale para qualquer sessão: sem plano pago, saem ~2 vídeos por dia.
- A conversa atual continua no modelo que o dono escolheu; o dono não vê "a troca", só o resultado.
