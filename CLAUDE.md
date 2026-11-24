# Postagem automática – Stark Service (leia antes de agir)

Você publica Reels/posts no Instagram `starkservice_cursos` (conector Windsor `instagram`, account_id 17841458418841811). O dono já autorizou postar os itens **aprovados** de `calendario.json`, sem pedir confirmação a cada um.

## Como postar
1. Abra `calendario.json`. Poste só itens com `aprovado: true` e que ainda não estejam publicados.
2. ANTES de postar, consulte os posts recentes (`get_data`, connector `instagram`, campos `media_id, media_permalink, media_caption`, `date_preset: last_2dT`) para não duplicar.
3. Confirme que o vídeo responde 200: `curl -sSI -L <url>`. Use o link com o SHA do commit.
4. `execute_action` → `create_video_post` com `video_url`, `caption` (texto exato de `legendas/<nome>.txt`) e `share_to_feed: false`.
5. Se der timeout, NÃO repita de imediato: o Instagram pode ter publicado mesmo assim. Espere alguns minutos, consulte `get_data` de novo e peça ao dono que confira o perfil. Só repita uma vez se tiver certeza de que não saiu.
6. Avise o dono com o link do Reel. Lembre: se aparecer na grade principal, ⋯ > "Remover da grade" (só no app).

## Regras
- Vídeos criados pelo dono levam "Vídeo criado por @rhaylook, da Stark Service." na legenda; artes de datas comemorativas saem sem menção.
- Artes (imagem): `create_image_post`. Reels: `create_video_post` com `share_to_feed false`.
- Não invente dados da escola (preço, vagas, datas). Cursos: Elétrica Predial, Comandos Elétricos, Automação Residencial, Segurança Eletrônica, Refrigeração, NR-10 (+SEP), NR-35. Cidade: Vitória de Santo Antão, PE.
- O assistente do MyChatBot responde "elétrica" no direct (plano em teste até 26/11/2026; precisa de plano pago).
- Este repositório é PÚBLICO: não coloque senhas, chaves nem dados pessoais aqui.

## Rotina diária (1 vídeo 3D por dia)
Fonte de verdade: `cronograma/cronograma.json` (um curso por dia da semana) e `cronograma/CRONOGRAMA-DE-CONTEUDO.md` (ordem dos temas e roteiros). O kit de produção está em `kit/` (`engine3d.html`, `render3d.js`, `gen_audio.py`, cenas em `kit/scenes3d/`, specs de exemplo em `kit/specs/`).

Passo a passo de cada dia:
1. Descubra o dia da semana (America/Recife) e o curso do dia no `cronograma.json`; pegue o próximo tema com `status: pendente`.
2. Use o roteiro desse tema no `CRONOGRAMA-DE-CONTEUDO.md` (ou em `roteiros/`). **Só produza e poste se o roteiro estiver marcado como aprovado pelo dono.** Sem aprovação, escreva o roteiro, avise o dono e pare.
3. Crie `spec` no formato de `kit/specs/*.json` (gancho nos 2 primeiros segundos, 3 a 6 passos, alerta, segredo, chamada final "Manda <PALAVRA> no direct"). Voz: `python3 kit/gen_audio.py <spec> <build>` (cota grátis ~10 falas/dia por modelo; se esgotar, avise o dono, não troque de modelo no meio do vídeo).
4. Faça a cena 3D copiando a mais parecida de `kit/scenes3d/` (qdc3d = bancada com peças modulares; tomada3d = parede e tomada; refri3d = unidade de ar-condicionado). Estilo: peças realistas e sem marca, câmera afastada com closes só para ler rótulos, legenda de uma palavra por vez, marca d'água da Stark (logo completa).
5. Confira uma folha de contato de 8 a 10 quadros antes de renderizar tudo. Renderize com `node kit/render3d.js <build>` (4 workers, 10 a 20 min; rode em background) e junte o áudio com ffmpeg (crf 25, <15 MB).
6. Suba o vídeo em `videos/`, a legenda em `legendas/` (1 linha forte, 2 blocos curtos, uma chamada, 3 a 5 hashtags, "Vídeo criado por @rhaylook, da Stark Service."), atualize `calendario.json` e `cronograma.json` e faça o commit (git config user.name Claude, user.email noreply@anthropic.com).
7. Poste conforme a seção "Como postar" acima (checar duplicata, timeout não é falha) e avise o dono com o link.
Nunca invente dado da escola, preço ou norma. Conteúdo técnico incerto: peça revisão ao dono.

## Regra de estilo e conteúdo (24/11/2026, decisão do dono)
Leia `kit/ESTILO-QDC.md` ANTES de criar qualquer cena ou roteiro. Os vídeos em desenho simples (low poly) e os que só "mostram" (sem ensinar) foram reprovados pelo dono e pelos números. Todo vídeo novo: realismo do QDC (sombras, peças arredondadas e texturas, bancada) e conteúdo de TUTORIAL passo a passo. Nada é postado sem o dono ver o vídeo e aprovar o roteiro.

## Voz fixa
Todo vídeo novo usa a voz Orus (modelo gemini-3.1-flash-tts-preview), escolhida pelo dono em 24/11/2026. Detalhes em `.claude/skills/video-estilo-qdc/SKILL.md`.
