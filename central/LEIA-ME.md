# Central Stark Service (código da página)

Código-fonte da central da equipe: resultados do Instagram, demandas do dia, chamados, vídeos com aprovação e agenda da semana.

## Importante

- **Este repositório é público.** Aqui está só o código. Não há dados, usuários, senhas nem hashes de senha.
- **A página não roda a partir do GitHub.** Ela usa o banco de dados e a identificação de usuário do Claude (`claude.use("db")` e `claude.use("user")`), que só existem dentro da página publicada como Artifact. Aberta pelo GitHub Pages, ela não carrega dados.
- A versão em uso fica publicada como Artifact do Claude. Este arquivo serve de cópia e histórico.

## Para publicar de novo

1. Abra `central/index.html` e preencha `USUARIOS` com `{u, h, nome, papel}` de cada pessoa, onde `h` é o SHA-256 de `stark-central-v1:<usuario>:<senha>`. Faça isso só na cópia publicada, nunca neste repositório.
2. Publique o arquivo como Artifact com o banco de dados (`db`) e o usuário (`user`, escopo `profile`) declarados.
3. As regras de acesso do banco devem deixar cada pessoa gravar só no próprio documento: `chamados/{self}`, `respostas/{self}`, `acoes/{self}`, `videos/{self}`, `vacoes/{self}`, `agenda/{self}` e `pessoas/{self}`. As coleções `dados`, `demandas`, `papeis` e `equipe` ficam só para o dono.

## Limites do login

O login por usuário e senha só controla a tela, no navegador. Quem protege os dados de verdade é o compartilhamento restrito da página publicada.
