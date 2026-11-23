#!/usr/bin/env python3
"""Trilha de suspense + efeitos sonoros sintetizados (sem música de terceiros) mixados com a narração.
uso: python3 kit/mix_audio.py <spec.json> <build>   -> <build>/mix.m4a
No spec: "sfx": [{"at": "<evento ou N3>", "type": "boom|clack|click|creak|whoosh|coins|poof|pop|water", "off": 0.0, "dur": 1.0, "to": "<evento>"}],
         "music": {"style": "suspense", "tense_from": "<evento>", "dark_ranges": [["N3","N5"]]}"""
import json,sys,numpy as np,soundfile as sf,librosa,subprocess
spec=json.load(open(sys.argv[1]));b=sys.argv[2];SR=44100;rng=np.random.default_rng(7)
TL=json.loads(open(b+'/timeline.js').read()[len('window.TL='):-1]);E=TL['EV'];N=TL['N'];tEnd=N[TL['END']];total=N[-1]
def T(x):
    if isinstance(x,(int,float)): return float(x)
    if x.startswith('N'): return N[int(x[1:])]
    return E[x]
v,_=librosa.load(b+'/raw.wav',sr=SR,mono=True);L=int(total*SR)+SR;voice=np.zeros(L,np.float32);voice[:len(v)]=v[:L]
t=np.arange(L)/SR
def lp(x,a): # passa-baixa simples de 1 polo
    y=np.empty_like(x);acc=0.0
    for i in range(len(x)): acc+=a*(x[i]-acc);y[i]=acc
    return y
def env(n,att,rel):
    e=np.ones(n,np.float32);a=int(att*SR);r=int(rel*SR)
    if a: e[:a]=np.linspace(0,1,a)
    if r: e[-r:]*=np.linspace(1,0,r)
    return e
def noise(n): return rng.standard_normal(n).astype(np.float32)
# ---------------- efeitos ----------------
def boom(d=0.9):
    n=int(d*SR);tt=np.arange(n)/SR;f=70*np.exp(-tt*3)+38
    return (np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*4.5)+0.35*noise(n)*np.exp(-tt*25)).astype(np.float32)*0.9
def clack(d=0.18):
    n=int(d*SR);tt=np.arange(n)/SR;x=noise(n)*np.exp(-tt*60)
    return (x-lp(x,0.15)+0.6*np.sin(2*np.pi*1800*tt)*np.exp(-tt*80)).astype(np.float32)*0.9
def click(d=0.08):
    n=int(d*SR);tt=np.arange(n)/SR;return (np.sin(2*np.pi*2500*tt)*np.exp(-tt*120)+0.3*noise(n)*np.exp(-tt*200)).astype(np.float32)*0.6
def creak(d=1.1):
    n=int(d*SR);tt=np.arange(n)/SR;f=180+60*np.sin(2*np.pi*1.3*tt)+40*np.sin(2*np.pi*7*tt)
    ph=np.cumsum(f)/SR;saw=2*(ph%1)-1;x=lp(saw.astype(np.float32),0.25)*env(n,0.08,0.3)
    return x*(0.5+0.5*np.abs(np.sin(2*np.pi*11*tt)))*0.55
def whoosh(d=0.7):
    n=int(d*SR);x=noise(n);a=np.linspace(0.02,0.35,n)**1.5;y=np.empty_like(x);acc=0.0
    for i in range(n): acc+=a[i]*(x[i]-acc);y[i]=acc
    return y*np.sin(np.linspace(0,np.pi,n))**2*1.1
def coins(d=1.0):
    n=int(d*SR);y=np.zeros(n,np.float32)
    for k in range(6):
        s=int(k*0.12*SR);m=n-s;tt=np.arange(m)/SR;f=2600+rng.random()*1800
        y[s:]+=(np.sin(2*np.pi*f*tt)+0.5*np.sin(2*np.pi*f*2.7*tt))*np.exp(-tt*14)*0.25
    return y
def poof(d=0.8):
    n=int(d*SR);x=noise(n);a=np.linspace(0.5,0.02,n);y=np.empty_like(x);acc=0.0
    for i in range(n): acc+=a[i]*(x[i]-acc);y[i]=acc
    return y*env(n,0.01,0.6)*1.3
def pop(d=0.15):
    n=int(d*SR);tt=np.arange(n)/SR;f=900*np.exp(-tt*25)+300;return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*30)*0.7
def water(d):
    n=int(d*SR);x=noise(n);y=x-lp(x,0.08);y=lp(y,0.5)
    return y*env(n,0.3,0.5)*(0.8+0.2*np.sin(2*np.pi*3*np.arange(n)/SR))*0.35
FX={'boom':boom,'clack':clack,'click':click,'creak':creak,'whoosh':whoosh,'coins':coins,'poof':poof,'pop':pop}
fx=np.zeros(L,np.float32)
for c in spec.get('sfx',[]):
    s=T(c['at'])+c.get('off',0)
    if c['type']=='water': x=water(T(c['to'])-s)
    else: x=FX[c['type']]()
    x=x*c.get('gain',1.0);j=int(max(0,s)*SR);m=min(len(x),L-j);fx[j:j+m]+=x[:m]
# ---------------- trilha de suspense ----------------
mu=spec.get('music',{});tense=T(mu.get('tense_from','N0'))
drone=np.zeros(L,np.float32)
for f,a in [(55,0.5),(55.4,0.35),(82.4,0.28),(110.3,0.16),(65.4,0.12)]:
    drone+=(a*np.sin(2*np.pi*f*t+rng.random()*6)).astype(np.float32)
drone*=(0.75+0.25*np.sin(2*np.pi*0.13*t)).astype(np.float32)
pad=np.zeros(L,np.float32)   # agudo sinistro (cluster)
for f in [659.3,698.5,987.8]: pad+=(0.05*np.sin(2*np.pi*f*t)*(0.6+0.4*np.sin(2*np.pi*0.21*t+f))).astype(np.float32)
# batida de coração (fica mais rápida e forte depois de 'tense_from')
heart=np.zeros(L,np.float32);x=0.6
while x<tEnd-0.3:
    k=1.0 if x>=tense else 0.45;bpm=70+40*min(1,max(0,(x-tense)/max(1,tEnd-tense)))
    for o,a in [(0,1.0),(0.22,0.6)]:
        j=int((x+o)*SR);n=int(0.25*SR);tt=np.arange(n)/SR;s=np.sin(2*np.pi*(52+30*np.exp(-tt*30))*tt)*np.exp(-tt*16)*a*k
        m=min(n,L-j);heart[j:j+m]+=s[:m]
    x+=60/bpm
dark=np.zeros(L,np.float32)  # flashback: caixinha de música desafinada
for r in mu.get('dark_ranges',[]):
    a,bq=T(r[0]),T(r[1]);notes=[523.3,622.3,587.3,466.2,523.3,392.0];x=a+0.2;i=0
    while x<bq-0.2:
        j=int(x*SR);n=int(0.9*SR);tt=np.arange(n)/SR;s=(np.sin(2*np.pi*notes[i%6]*1.003*tt)+0.3*np.sin(2*np.pi*notes[i%6]*2.01*tt))*np.exp(-tt*4)*0.16
        m=min(n,L-j);dark[j:j+m]+=s[:m];x+=0.42;i+=1
music=0.55*drone+pad+0.9*heart+dark
# sobe no dilema e corta seco no fim (antes da tela final)
grow=np.clip((t-T(mu.get('rise_from','N0')))/max(0.5,tEnd-T(mu.get('rise_from','N0'))),0,1)
music*=(0.8+0.6*grow).astype(np.float32)
cut=int(tEnd*SR);music[cut:]*=np.exp(-(t[cut:]-tEnd)*9).astype(np.float32)
# acorde final leve na tela final
outro=np.zeros(L,np.float32)
for f in [261.6,329.6,392.0,523.3]:
    n=L-cut;tt=np.arange(n)/SR;outro[cut:]+=(0.08*np.sin(2*np.pi*f*tt)*np.exp(-tt*0.9)).astype(np.float32)
# ducking pela voz
ve=np.abs(voice);w=int(0.12*SR);ve=np.convolve(ve,np.ones(w)/w,mode='same');ve=ve/ (ve.max()+1e-9)
duck=1-0.55*np.clip(ve*4,0,1)
mix=voice*1.0+music*0.22*duck+outro+fx*0.55
mix=mix/np.abs(mix).max()*0.95
sf.write(b+'/mix.wav',mix,SR)
subprocess.run(['ffmpeg','-loglevel','error','-y','-i',b+'/mix.wav','-af','loudnorm=I=-15:TP=-1.5:LRA=11','-ar','44100','-ac','2','-c:a','aac','-b:a','160k',b+'/mix.m4a'],check=True)
print('mix ok',round(total,1),'s')
