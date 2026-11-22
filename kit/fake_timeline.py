#!/usr/bin/env python3
"""Cria uma timeline de MENTIRA (sem voz) só para testar a animação: python3 fake_timeline.py specs/x.json build/x_test"""
import json,sys,os
spec=json.load(open(sys.argv[1]));out=sys.argv[2];os.makedirs(out,exist_ok=True);L=spec['lines'];n=len(L)
N=[i*4.6 for i in range(n+1)];ST=[N[i]+0.3 for i in range(n)];DU=[4.1]*n;EV={}
for i,l in enumerate(L):
    for k,name in enumerate(l.get('events',{})): EV[name]=round(ST[i]+0.6+1.0*k,2)
KW=[[round(ST[i]+0.32*j,2) for j,_ in enumerate(l['text'].split())] for i,l in enumerate(L)]
TL={'N':N,'ST':ST,'DU':DU,'SUBS':[l['text'] for l in L],'KW':KW,'EV':EV,'CARDS':spec['cards'],'FX':spec.get('fx',{}),'END':spec['end_line'],'SCENE':spec['scene'],'OPTS':spec.get('scene_opts',{})}
open(out+'/timeline.js','w').write('window.TL='+json.dumps(TL,ensure_ascii=False)+';');json.dump({'total':N[-1]},open(out+'/total.json','w'));print(EV)
