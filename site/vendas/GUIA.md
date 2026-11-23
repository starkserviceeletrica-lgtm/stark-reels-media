# Loja de apostilas: Kiwify, links do direct e como pôr o site no ar

## 1. Como o funil funciona

```
Reel com dica → "Comenta ELÉTRICA" → resposta no comentário + DM com o link
  → loja abre na apostila certa → checkout da Kiwify → acesso liberado no e-mail
  → lembrete de Pix/boleto não pago → oferta do curso presencial
```

Uma palavra-chave por apostila, e cada palavra leva para a aba certa da loja:

| Palavra no comentário/direct | Link que o direct manda |
|---|---|
| ELÉTRICA | `https://SEU-SITE/apostilas.html?apostila=eletrica` |
| GELADEIRA, REFRIGERAÇÃO, AR | `https://SEU-SITE/apostilas.html?apostila=refrigeracao` |
| NR10 | `https://SEU-SITE/apostilas.html?apostila=nr-10` |
| NR35 | `https://SEU-SITE/apostilas.html?apostila=nr-35` |
| APOSTILA, COMBO | `https://SEU-SITE/apostilas.html` (abre na primeira e mostra o combo) |

Para saber qual Reel vendeu, acrescente ao link: `&utm_source=instagram&utm_campaign=reel-quadro`.
A loja repassa esses dados para o checkout da Kiwify.

## 2. Kiwify, passo a passo

1. **Conta:** complete o cadastro e a conta bancária. Sem isso a Kiwify não libera saque.
2. **Um produto por apostila** (Elétrica Predial e Refrigeração agora; NR-10 e NR-35 quando ficarem prontas):
   - Crie o produto e suba o **PDF da apostila**.
   - Na **área de membros** do produto, crie um módulo com as aulas do bônus ("parte do curso").
   - Defina o preço e a **garantia de 7 dias**.
   - Formas de pagamento: Pix, cartão (com parcelas) e boleto.
   - Personalize o checkout com a logo da Stark.
3. **O combo de 3 apostilas:** crie **mais um produto** chamado "Combo 3 apostilas", coloque nele os 3 PDFs e as aulas, e dê o preço do combo. Ele terá o próprio link de checkout.
   - Opcional: use o **order bump** da Kiwify no checkout de uma apostila para oferecer outra com desconto.
4. **Recuperação:** se a Kiwify mostrar a opção de lembrete para Pix/boleto não pago, deixe ligada.
5. **Me mande, para cada produto:** o link de checkout (começa com `https://pay.kiwify.com.br/`) e o preço.
   Eu coloco em `site/vendas/gerar.py` e rodo `python3 site/vendas/gerar.py`.
   Enquanto o link estiver vazio, o botão abre o WhatsApp.

A liberação é automática: pagamento aprovado → a Kiwify manda o e-mail com o acesso ao PDF e às aulas.

## 3. Pôr o site no ar (Netlify, grátis)

O site é a pasta `site` deste repositório. O Netlify publica essa pasta e atualiza sozinho a cada mudança no GitHub.

1. Entre em netlify.com e crie a conta usando **"Sign up with GitHub"**.
2. Clique em **Add new site → Import an existing project → GitHub**.
3. Autorize o Netlify a ver o repositório `stark-reels-media` e selecione ele.
4. Configure:
   - **Branch to deploy:** `main` (depois que o site for juntado ao main; até lá, `claude/dreamy-bohr-whn59k`).
   - **Base directory:** deixe vazio.
   - **Build command:** deixe vazio.
   - **Publish directory:** `site`
5. Clique em **Deploy**. Em um minuto sai um endereço como `https://nome-aleatorio.netlify.app`.
6. Em **Site configuration → Change site name**, troque para algo como `starkservice` → `https://starkservice.netlify.app`.
7. **Domínio próprio (opcional):** registre `starkservice.com.br` (ou parecido) no registro.br e, no Netlify, vá em **Domain management → Add a domain**. O Netlify mostra o que configurar.

Depois que o endereço existir, me passe para eu trocar `SEU-SITE` nos links e nas instruções do direct.

Alternativa: o Cloudflare Pages funciona igual (Connect to Git → pasta de saída `site`).

## 4. O direct (MyChatBot)

O assistente já responde comentário e manda DM, mas a conta está **sem respostas de IA**. Com o plano reativado e o site no ar, eu atualizo as instruções com a tabela da seção 1. A mudança aparece num cartão para você aprovar.
