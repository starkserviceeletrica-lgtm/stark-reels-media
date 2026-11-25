#!/usr/bin/env python3
"""Renderiza um spec do motor de edição (canvas infinito + legenda de 1 palavra).
Uso: python3 edicao/motor/render.py edicao/specs/x.json saida.mp4 [--audio a.wav] [--fps 30] [--max SEG]"""
import sys,json,subprocess,os,argparse,tempfile,shutil
from playwright.sync_api import sync_playwright
ap=argparse.ArgumentParser();ap.add_argument('spec');ap.add_argument('out');ap.add_argument('--audio');ap.add_argument('--fps',type=int,default=30);ap.add_argument('--max',type=float)
a=ap.parse_args();spec=json.load(open(a.spec));spec['fps']=a.fps
here=os.path.dirname(os.path.abspath(__file__));dur=min(spec['duration'],a.max or 1e9)
tmp=tempfile.mkdtemp();n=int(dur*a.fps)
ff=subprocess.Popen(['ffmpeg','-v','error','-y','-f','image2pipe','-framerate',str(a.fps),'-i','-','-i',a.audio] if a.audio else ['ffmpeg','-v','error','-y','-f','image2pipe','-framerate',str(a.fps),'-i','-']+
 (['-t',str(dur)] if a.audio else [])[:0]+['-c:v','libx264','-crf','24','-preset','medium','-pix_fmt','yuv420p','-r',str(a.fps)]+(['-c:a','aac','-b:a','128k','-shortest'] if a.audio else [])+['-movflags','+faststart',a.out],stdin=subprocess.PIPE)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':1080,'height':1920});pg.goto('file://'+os.path.join(here,'engine.html'))
    pg.evaluate('s=>init(s)',spec);pg.wait_for_timeout(400)
    for i in range(n):
        pg.evaluate('t=>setT(t)',i/a.fps);ff.stdin.write(pg.screenshot(type='jpeg',quality=92))
    b.close()
ff.stdin.close();ff.wait();shutil.rmtree(tmp);print('ok',a.out,n,'frames')
