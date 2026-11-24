#!/usr/bin/env bash
# Publica a pasta site/ no Vercel (projeto "starkservice").
# O token do Vercel fica salvo no ambiente do Claude (Network secrets, host api.vercel.com)
# e é colocado nas requisições pelo proxy; por isso aqui vai só um valor de enfeite.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 vendas/gerar.py
npx --yes vercel@latest deploy . --prod --yes --name starkservice --token proxy-injected
