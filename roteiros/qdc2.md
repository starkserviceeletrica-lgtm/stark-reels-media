# Elétrica Predial: QDC MONOFÁSICO · PARTE 2 (como ligar o DR e o DPS)

Status: EM REVISÃO. Falta a aprovação do dono / revisão de professor.
Para liberar a voz e o render, crie `roteiros/qdc2-APROVADO.txt` (com o texto final, se mudar algo).
Continuação de https://www.instagram.com/reel/DgDNWzqjmrK/ (parte 1).
Cena: `kit/scenes3d/qdc2_3d.js` · Spec: `kit/specs/qdc2_3d.json` · Voz: gemini-3.1-flash-tts-preview (Puck)
Palavra: ELÉTRICA

## Falas (uma por linha do spec)
1. Você instalou o DR do jeito certo? Esse erro deixa a casa sem proteção contra choque.
2. O DR protege contra choque: ele compara a corrente que vai com a que volta pelo neutro.
3. Se parte da corrente foge, por exemplo por uma pessoa, ele desarma na hora.
4. Por isso o neutro dos circuitos protegidos tem que passar pelo DR, sem ligar o neutro de depois do DR ao neutro de antes nem ao terra.
5. O DPS liga entre fase e terra e entre neutro e terra, e desvia o surto para o terra.
6. Alerta: o DPS depende de um bom aterramento.
7. E o segredo? Aperte os bornes e aperte o botão de teste do DR todo mês.
8. Manda ELÉTRICA no direct e aprenda a montar na prática!

## Ligação mostrada na cena (conferir!)
- Entrada 16 mm² (fase e neutro) no disjuntor geral C63 2P; terra direto no barramento de terra.
- Saída do geral -> entrada do DR 2P 30 mA (fase e neutro).
- DPS ligado na entrada do DR (logo depois do geral): um polo na fase, outro no neutro, saída comum (verde) no barramento de terra.
- Saída do DR: fase -> barra pente dos disjuntores; neutro -> barramento de neutro (isolado, só circuitos protegidos).
- Fios proibidos piscando em vermelho: neutro depois do DR ligado ao terra; neutro depois do DR ligado ao neutro de antes do DR.

## Pontos para o professor revisar
1. A fala 4 (neutro de depois do DR separado do neutro de antes e do terra).
2. Posição do DPS: a cena mostra o DPS antes do DR (depois do geral). Se a escola ensina outra posição (ex.: DPS no barramento de entrada, ou depois do DR com DR resistente a surto), muda a cena.
3. DPS "entre neutro e terra": a cena mostra um DPS 2 polos (fase-terra e neutro-terra) com valores de exemplo (275 V, 20 kA, classe II). Os valores na peça são só ilustrativos.
4. Fala 7: "teste do DR todo mês" (recomendação usual do fabricante; confirmar).

## Cenas
1. Quadro da parte 1 já montado; push-in no DR, flash vermelho "DR LIGADO ERRADO?".
2. Câmera afastada: bolinhas amarelas (VAI) pela fase até o aparelho, azuis (VOLTA) pelo neutro de volta ao DR; "VAI = VOLTA ✓".
3. Mão encosta no aparelho; corrente vermelha (FUGA) desvia pela pessoa; "VAI ≠ VOLTA"; DR desarma ("DESARMOU!"), corrente para.
4. DR religado; neutro brilhando "NEUTRO PASSA PELO DR"; fios proibidos piscando "✕ NEUTRO DE ANTES", "✕ NEUTRO NO TERRA".
5. Close no DPS: "FASE → TERRA", "NEUTRO → TERRA"; raio cai na entrada, surto corre pelo DPS e sai pelo terra ("SURTO → TERRA").
6. Terra brilhando: "⚠ BOM ATERRAMENTO".
7. Close no DR: bornes apertando ("APERTE OS BORNES"); botão de teste afunda, DR desarma e é religado ("TESTE · TODO MÊS").
8. Cartão final com logo e "Mande ELÉTRICA no direct".
