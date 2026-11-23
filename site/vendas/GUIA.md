# Venda de apostilas pelo Instagram: o funil e como ligar o pagamento

## 1. O funil (como fazem os perfis que vendem assim)

```
Reel com dica  →  "Comenta ELÉTRICA"  →  resposta automática no comentário + DM com o link
      →  página de venda (celular)  →  checkout da plataforma  →  acesso liberado no e-mail
      →  lembrete de Pix/boleto não pago  →  oferta do curso presencial
```

O que costuma fazer diferença em cada etapa:

| Etapa | O que fazer | Como está na Stark |
|---|---|---|
| Reel | Dica útil + uma única chamada no fim: "Comenta ELÉTRICA que eu te mando a apostila" | Os vídeos 3D já terminam com "Manda ELÉTRICA no direct" |
| Comentário → DM | Uma palavra por apostila (ELÉTRICA, GELADEIRA). A automação responde no comentário ("Te mandei no direct!") e manda o link na DM | O MyChatBot já responde comentário e manda DM, mas **está sem respostas de IA**: precisa do plano pago para voltar |
| Link | Um link por apostila, com a origem marcada: `apostila-eletrica.html?utm_source=instagram&utm_campaign=reel-quadro` | A página já repassa esses dados para o checkout |
| Página de venda | Abre rápido no celular, mostra a capa e o botão na primeira tela, prévia de páginas reais, preço claro, garantia, botão fixo embaixo | Feito: `apostila-eletrica.html` e `apostila-refrigeracao.html` |
| Checkout | Pix em destaque (é o jeito mais rápido de pagar pelo celular), cartão parcelado, boleto | Configurar na plataforma (passo 2) |
| Entrega | Automática pela plataforma: e-mail com acesso ao PDF e às aulas | A plataforma faz sozinha |
| Recuperação | A plataforma manda lembrete para quem gerou Pix/boleto e não pagou | Ativar na plataforma |
| Pós-venda | Quem comprou a apostila é o melhor público para o curso presencial | Mensagem no e-mail/área de alunos com o WhatsApp da escola |

Depois das primeiras vendas, colocar depoimentos reais de alunos na página (com autorização). Não colocar depoimento inventado.

## 2. Ligar a plataforma de pagamento (Hotmart, Kiwify, Cakto ou outra)

O passo a passo é parecido em todas. Os nomes dos menus mudam um pouco de uma para outra.

1. **Crie a conta** e complete o cadastro (documentos e conta bancária para receber). Sem isso a plataforma não libera vendas.
2. **Crie um produto digital** para cada apostila (tipo e-book ou curso online).
   - Nome: "Apostila Completa de Elétrica Predial".
   - Suba o **PDF da apostila** (baixe o PDF do artefato da apostila, ou me peça que eu gero).
   - Na **área de membros/alunos** da plataforma, crie um módulo com as aulas que fazem parte do bônus ("parte do curso").
3. **Defina o preço** e a garantia de **7 dias** (é o padrão das plataformas e o que a página promete).
4. **Formas de pagamento:** ative Pix, cartão (com parcelamento) e boleto.
5. **Personalize o checkout** com a logo e as cores da Stark (azul-marinho e laranja).
6. **Ative a recuperação de vendas** (lembrete automático de Pix/boleto não pago), se a plataforma tiver.
7. **Copie o link do checkout** de cada apostila e me mande junto com o preço. Eu coloco em `site/vendas/gerar.py`:

   ```python
   "checkout": "https://pay.exemplo.com/SEU-LINK",
   "preco": "R$ 00,00",
   "de": "",            # preço antigo riscado, opcional
   ```
   e rodo `python3 site/vendas/gerar.py`. Enquanto o link estiver vazio, o botão de compra abre o WhatsApp.

8. **(Opcional) Pixel do Meta:** se for anunciar depois, crie o pixel no Gerenciador de Eventos do Meta e cole o ID na plataforma. Ela marca as compras sozinha.

A liberação do acesso é automática: quando o pagamento é aprovado, a plataforma manda o e-mail com o PDF e o acesso às aulas. Não precisa fazer nada manual.

## 3. Colocar o site no ar

O site precisa de um endereço público para o direct mandar o link. Opções grátis:

- **Netlify ou Cloudflare Pages ligado ao GitHub:** conecte o repositório e escolha a pasta `site` como pasta de publicação. Cada commit atualiza o site sozinho. Dá para usar domínio próprio depois.
- **GitHub Pages:** só publica a raiz ou a pasta `docs`. Se escolher esse, eu movo os arquivos.

## 4. O direct (MyChatBot)

Com o site no ar e o plano reativado, eu atualizo as instruções do assistente:

- "ELÉTRICA" ou "apostila de elétrica" → link da página de Elétrica Predial.
- "GELADEIRA", "REFRIGERAÇÃO" ou "AR" → link da página de Refrigeração.
- Dúvida sobre curso presencial, preço do presencial ou matrícula → WhatsApp da escola.

A mudança aparece num cartão para você aprovar antes de valer.
