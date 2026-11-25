# Estilo de edição "canvas infinito" (modelo aprovado pelo dono, 25/11/2026)

Baseado em 4 vídeos de referência (criadores de terceiros, só para estudar o estilo; NÃO republicar).
O modelo principal é o vídeo 1 (tutorial "passo a passo completo").

## Métricas medidas
| Vídeo | Duração | Palavras/min | Cortes secos | Observação |
|---|---|---|---|---|
| 1 (modelo) | 64 s | 210 | 0 | câmera contínua sobre um canvas de cartões; rosto só no começo e no fim |
| 2 | 58 s | 154 | 0 | só texto animado, sem rosto, 3,4 s de abertura sem fala |
| 3 | 63 s | 251 | 9 | pessoa falando + ícones na hora da fala |
| 4 | 39 s | 245 | 8 | gravação de tela + legenda grande |
Todos: vertical (576x1024 na referência; nós usamos 1080x1920, 30 fps), fala sem pausas (quase nenhuma pausa > 0,5 s).

## Receita do vídeo 1
1. Gancho falado nos primeiros 4 s: "Todo mundo faz X, mas ninguém ensina. Tá aqui o passo a passo."
2. Fundo preto com grade bem fraca; cartões escuros com borda fina branca e cantos bem arredondados.
3. UMA cor de destaque (Claude = laranja; Stark = amarelo #FFC21A) só no número do passo, na palavra-chave e no item principal.
4. Passos numerados ("01 pasta", "02 ferramentas"...), 8 a 10 s cada, um cartão por passo.
5. Câmera NUNCA corta: desliza (ease in-out) de um cartão ao outro seguindo linhas brancas que se desenham; abre (zoom out) no começo e no fim.
6. Cada item do cartão (ícone + texto, pílula) entra com fade + subida de 30 px EXATAMENTE na palavra falada.
7. Legenda de uma palavra por vez, centro-baixo, branca simples; palavra-chave em amarelo.
8. Rosto do instrutor em um retângulo arredondado só no gancho e na chamada final.
9. Fecho: "Comente <PALAVRA> que eu te mando" / "Manda ELÉTRICA no direct".

## Motor (neste repositório)
- `edicao/motor/engine.html`: canvas, câmera, cartões, linhas, legenda, rosto, cartão final.
- `edicao/motor/render.py spec.json saida.mp4 [--audio voz.wav]`: renderiza em 1080x1920, 30 fps.
- `edicao/specs/demo_visual.json` (gerado por `motor/gerar_spec_demo.py`): exemplo; os tempos vêm das palavras da transcrição (faster-whisper, tempo por palavra).
- Rosto: extrair quadros com `ffmpeg -vf fps=30 dir/f%05d.jpg` e apontar `head:[{a,b,dir}]` no spec.
- Zona segura: nada importante acima de y=230 nem abaixo de y=1440.

## Regras
- Conteúdo da Stark é sempre revisado e aprovado pelo dono antes de renderizar e antes de postar.
- Sem dado inventado da escola (preço, vagas, turmas, datas). "Mais de 12 anos" só como o dono informou.
