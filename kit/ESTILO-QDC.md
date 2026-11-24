# Estilo QDC (o que fez o vídeo viralizar) – receita obrigatória

Referência: `kit/scenes3d/qdc3d.js` (26 mil visualizações, 591 salvamentos, 168 compartilhamentos). Comparação com os vídeos que NÃO funcionaram (energia, tomada 3D, segurança, automação: 190 a 350 visualizações): eram "quadradões" (low poly) e mostravam o que existe em vez de ensinar.

## Renderização (não use flatShading nem caixas retas)
- `renderer.shadowMap.enabled = true`, `PCFSoftShadowMap`; luz principal direcional com sombra (mapa 2048, bias -0.0004) + luz de preenchimento azulada + hemisférica fraca.
- Materiais `MeshStandardMaterial` SEM `flatShading`, roughness 0.3 a 0.6; metal só em parafusos e trilho.
- Peças com cantos arredondados e chanfro: use a função `rbox` (Shape + ExtrudeGeometry com bevelEnabled) do qdc3d.js, nunca `BoxGeometry` puro nas peças principais.
- Textos impressos nas peças com `CanvasTexture` (valores, normas, setas, "TEST"), em resolução alta (256 px por módulo ou mais).
- Parafusos com fenda em cruz, janelas de terminal, trava laranja do disjuntor, ranhuras: detalhe real em toda peça.
- Proporção real: 1 unidade = 10 cm (módulo de disjuntor 18 mm x 90 mm; trilho DIN 35 mm; cabo de 16 mm² com ~9 mm de espessura, levemente exagerado para ler).
- Cenário: parede perfurada escura (textura), bancada de madeira com veios (textura), prateleira, ferramentas reais sobre a bancada (chave de fenda, alicate, detector de tensão, rolos de cabo), neblina leve de fundo.
- Câmera afastada na maior parte do vídeo; closes só para ler rótulos; movimentos suaves (easing) entre chaves de câmera ligadas às palavras ditas.
- Peças entram "caindo" no lugar com um pequeno quique; cabos desenhados aos poucos; parafusos giram ao apertar.
- Título fixo no topo; rótulo (balão) na tela na hora exata da fala; legenda de UMA palavra por vez; marca d'água da Stark.
- Sem marcas de fabricantes. Duração boa para ensinar: 45 a 70 s.

## Conteúdo (o vídeo ENSINA, não só mostra)
- Cada vídeo ensina UMA tarefa do começo ao fim: "Como <fazer X>" com os passos na ordem em que o profissional executa, com valores e cores (bitola, corrente, posição dos fios), o erro mais comum e o teste final.
- Proibido vídeo só de "o que é" ou "tem como automatizar". Se o tema for conceito, mostre a aplicação passo a passo.
- Gancho de 2 s: erro, perigo ou promessa ("Todo eletricista precisa saber ...").
- Roteiro técnico sempre revisado pelo dono antes de postar (marcar o que for incerto).
- Legenda no padrão QDC: 1ª linha de gancho, lista curta dos passos, "o segredo", UM pedido só, 5 hashtags do nicho, assinatura do @rhaylook.
