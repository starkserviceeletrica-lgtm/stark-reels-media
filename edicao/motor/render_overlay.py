#!/usr/bin/env python3
"""Aplica camadas animadas (overlay.html + spec) sobre um vídeo gravado.
Uso: python3 edicao/motor/render_overlay.py spec.json video_entrada.mp4 saida.mp4 [--max SEG] [--frames 1,5,10]
- Saída 1080x1920 (padrão 30 fps; use --fps 60 --crf 16 --preset slow para qualidade máxima), áudio normalizado (-16 LUFS), cartão final de spec.end.extra segundos."""
import sys, json, os, subprocess, argparse
from playwright.sync_api import sync_playwright
ap = argparse.ArgumentParser()
ap.add_argument('spec'); ap.add_argument('video'); ap.add_argument('out')
ap.add_argument('--max', type=float); ap.add_argument('--frames', help='só gera PNGs desses segundos (prévia)')
ap.add_argument('--fps', type=int, default=30); ap.add_argument('--crf', type=int, default=25)
ap.add_argument('--preset', default='medium'); ap.add_argument('--abr', default='128k')
a = ap.parse_args()
spec = json.load(open(a.spec)); here = os.path.dirname(os.path.abspath(__file__))
vdur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', a.video]))
extra = (spec.get('end') or {}).get('extra', 0)
# vídeo de iPhone em HDR (HLG/PQ, 10 bits): converte para SDR bt709 com tonemap mobius (cores vivas, sem lavar)
trc = subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=color_transfer', '-of', 'csv=p=0', a.video]).decode().strip()
HDR = {'arib-std-b67': 'arib-std-b67', 'smpte2084': 'smpte2084'}.get(trc)
tone = (f'zscale=tin={HDR}:min=bt2020nc:pin=bt2020:t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,'
        f'tonemap=mobius:param=0.3:desat=0,zscale=t=bt709:m=bt709:r=tv,') if HDR else ''
total = min(vdur + extra, a.max or 1e9); n = int(total * a.fps)

def page(p):
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    pg.goto('file://' + os.path.join(here, 'overlay.html'))
    pg.evaluate('s=>init(s)', spec); pg.wait_for_timeout(500)
    return b, pg

if a.frames:  # prévia: quadros compostos em PNG
    os.makedirs(a.out, exist_ok=True)
    with sync_playwright() as p:
        b, pg = page(p)
        for s in [float(x) for x in a.frames.split(',')]:
            pg.evaluate('t=>setT(t)', s); pg.screenshot(path=f'{a.out}/ov.png', omit_background=True)
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(min(s, vdur - .05)), '-i', a.video, '-i', f'{a.out}/ov.png',
                            '-filter_complex', f'[0:v]{tone}scale=1080:1920,setsar=1[v];[v][1:v]overlay', '-frames:v', '1', f'{a.out}/t{s:05.1f}.png'])
        b.close()
    os.remove(f'{a.out}/ov.png'); print('prévia em', a.out); sys.exit()

fc = (f'[0:v]{tone}fps={a.fps},scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p[b];color=c=0x07070a:s=1080x1920:r={a.fps}:d={max(extra,.04)},format=yuv420p[c];[b][c]concat=n=2:v=1:a=0[v];'
      f'[v][1:v]overlay=format=auto,format=yuv420p[o];'
      f'[0:a]loudnorm=I=-16:TP=-1.5:LRA=11,apad[a]')
cmd = ['ffmpeg', '-v', 'error', '-y', '-i', a.video, '-f', 'image2pipe', '-framerate', str(a.fps), '-c:v', 'png', '-i', '-',
       '-filter_complex', fc, '-map', '[o]', '-map', '[a]', '-t', f'{total:.3f}',
       '-c:v', 'libx264', '-preset', a.preset, '-crf', str(a.crf), '-profile:v', 'high', '-r', str(a.fps),
       '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
       '-c:a', 'aac', '-b:a', a.abr, '-ar', '48000', '-movflags', '+faststart', a.out]
ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)
with sync_playwright() as p:
    b, pg = page(p)
    for i in range(n):
        pg.evaluate('t=>setT(t)', i / a.fps)
        ff.stdin.write(pg.screenshot(type='png', omit_background=True))
        if i % 300 == 0: print(f'{i}/{n}', flush=True)
    b.close()
ff.stdin.close(); ff.wait(); print('ok', a.out, n, 'quadros', 'rc', ff.returncode)
