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
