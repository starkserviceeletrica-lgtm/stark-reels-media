#!/usr/bin/env python3
"""Roteiro (spec.json) -> voz Gemini por frase -> narração montada -> tempos de cada palavra -> timeline.js
uso: python3 gen_audio.py specs/tomada.json build/tomada
Requer: chave do Gemini no ambiente (rede liberada p/ generativelanguage.googleapis.com), faster-whisper, librosa, soundfile, ffmpeg."""
import json,sys,os,re,base64,subprocess,time,wave,unicodedata,difflib
import numpy as np,soundfile as sf,librosa
spec=json.load(open(sys.argv[1]));out=sys.argv[2];os.makedirs(out+'/lines',exist_ok=True)
MODEL=spec.get('model','gemini-3.1-flash-tts-preview');VOICE=spec.get('voice','Puck');SR=24000;L=spec['lines']
def norm(w): return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFD',w.lower()).encode('ascii','ignore').decode())
def tts(text,style,path,voice=None):
    body={"contents":[{"parts":[{"text":f"{style} {text}"}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":voice or VOICE}}}}}
    open(out+'/req.json','w').write(json.dumps(body))
    for k in range(8):
        r=subprocess.run(['curl','-sS','-m','120','-X','POST',f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent','-H','Content-Type: application/json','-d','@'+out+'/req.json'],capture_output=True,text=True)
        try:
            b=base64.b64decode(json.loads(r.stdout)['candidates'][0]['content']['parts'][0]['inlineData']['data'])
            if b[:4]==b'RIFF': open(path,'wb').write(b)
            else:
                w=wave.open(path,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(b);w.close()
            return
        except Exception:
            m=re.search(r'retry in (?:(\d+)h)?(?:(\d+)m)?([0-9.]+)s',r.stdout);wt=(int(m.group(1) or 0)*3600+int(m.group(2) or 0)*60+float(m.group(3))+3) if m else 25
            if 'per day' in r.stdout or wt>300: raise SystemExit(f'COTA DIÁRIA do Gemini esgotada para este modelo. Libera em ~{round(wt/60)} min (ou ative o faturamento). Rode de novo: o script retoma de onde parou.')
            print('  cota do Gemini: espera',round(wt),'s',flush=True);time.sleep(wt)
    raise SystemExit('falhou: '+r.stdout[:300])
_wm=None
def trim_instruction(path,text,style=''):
    """Modelos 3.8 leem a instrução em voz alta: acha a 1a palavra do texto real (via Whisper) e corta tudo antes."""
    global _wm
    os.environ['HF_HUB_DISABLE_XET']='1'
    if _wm is None:
        from faster_whisper import WhisperModel;_wm=WhisperModel('small',device='cpu',compute_type='int8')
    y,sr=sf.read(path);y=y.astype(np.float32)
    if y.ndim>1:y=y.mean(1)
    y16=librosa.resample(y,orig_sr=sr,target_sr=16000);seg,_=_wm.transcribe(y16,language='pt',word_timestamps=True)
    ws=[(norm(w.word),w.start) for s in seg for w in s.words];tw=[norm(x) for x in text.split()][:2]
    for k in range(len(ws)-len(tw)+1):
        if all(difflib.SequenceMatcher(None,ws[k+j][0],tw[j]).ratio()>=0.8 for j in range(len(tw))):
            if k==0: return
            cut=max(0,ws[k][1]-0.10);sf.write(path,y[int(cut*sr):],sr);return
    # plano B: acha o fim da instrução (última palavra do 'style') e corta logo depois
    last=norm(style.split()[-1]) if style.split() else ''
    for k in range(len(ws)-2,-1,-1):
        if last and difflib.SequenceMatcher(None,ws[k][0],last).ratio()>=0.8:
            cut=max(0,ws[k+1][1]-0.10);sf.write(path,y[int(cut*sr):],sr);return
    print('  aviso: não achei o início do texto, mantive o áudio inteiro',flush=True)
PAUSE=spec.get('pause_between_requests',8)
for i,l in enumerate(L):
    p=f'{out}/lines/l{i:02d}.wav'
    if os.path.exists(p):
        if os.environ.get('TRIM_EXISTING'): trim_instruction(p,l.get('spoken',l['text']),l['style'])
        continue
    print('voz',i+1,'/',len(L),l['text'][:40],flush=True);tts(l.get('spoken',l['text']),l['style'],p,l.get('voice'))
    if spec.get('trim_instruction'): trim_instruction(p,l.get('spoken',l['text']),l['style'])
    time.sleep(PAUSE)
def load(i):
    y,sr=sf.read(f'{out}/lines/l{i:02d}.wav');y=y.astype(np.float32)
    if y.ndim>1:y=y.mean(1)
    if sr!=SR:y=librosa.resample(y,orig_sr=sr,target_sr=SR)
    _,idx=librosa.effects.trim(y,top_db=38);pad=int(0.04*SR);y=y[max(0,idx[0]-pad):min(len(y),idx[1]+pad)].copy()
    f=int(0.015*SR);y[:f]*=np.linspace(0,1,f);y[-f:]*=np.linspace(1,0,f);return y
lines=[load(i) for i in range(len(L))]
rms=np.array([np.sqrt(np.mean(x**2)) for x in lines]);tgt=np.exp(np.mean(np.log(rms)));lines=[x*(tgt/r)**0.6 for x,r in zip(lines,rms)]
DU=[len(x)/SR for x in lines];N=[0.0];ST=[]
for i,d in enumerate(DU):
    lead=0.3 if i==0 else 0.03;ST.append(N[-1]+lead);N.append(N[-1]+lead+d+0.12+(1.8 if i==len(DU)-1 else 0))
buf=np.zeros(int(N[-1]*SR)+SR,np.float32)
for s,x in zip(ST,lines): j=int(s*SR);buf[j:j+len(x)]+=x
buf=buf[:int(N[-1]*SR)];buf=buf/np.abs(buf).max()*0.9;sf.write(out+'/raw.wav',buf,SR)
subprocess.run(['ffmpeg','-loglevel','error','-y','-i',out+'/raw.wav','-af','highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=14','-ar','44100','-ac','2','-c:a','libmp3lame','-b:a','192k',out+'/narracao.mp3'],check=True)
print('transcrevendo para achar o tempo de cada palavra...',flush=True)
os.environ['HF_HUB_DISABLE_XET']='1'
from faster_whisper import WhisperModel
y16,_=librosa.load(out+'/raw.wav',sr=16000);seg,_=WhisperModel('small',device='cpu',compute_type='int8').transcribe(y16,language='pt',word_timestamps=True)
W=[(norm(w.word),w.start) for s in seg for w in s.words]
def find(i,word,nth=0):
    lo,hi=ST[i]-0.15,ST[i]+DU[i]+0.25;c=[a for x,a in W if lo<=a<=hi and difflib.SequenceMatcher(None,x,norm(word)).ratio()>=0.72]
    if len(c)>nth: return c[nth]
    txt=norm(L[i].get('spoken',L[i]['text']));pos=[m.start() for m in re.finditer(re.escape(norm(word)),txt)]   # plano B: proporcional ao texto falado
    k=pos[nth] if len(pos)>nth else (pos[-1] if pos else 0);return ST[i]+DU[i]*k/max(1,len(txt))
EV={}
for i,l in enumerate(L):
    for name,v in l.get('events',{}).items():
        w,n=(v,0) if isinstance(v,str) else (v[0],v[1]);EV[name]=round(find(i,w,n),2)
KW=[]
for i,l in enumerate(L):
    words=l['text'].split();ww=[a for x,a in W if ST[i]-0.15<=a<=ST[i]+DU[i]+0.05]
    if len(ww)==len(words): KW.append([round(a,2) for a in ww])
    else:
        tot=sum(len(x)+1 for x in words);acc=0;ks=[]
        for x in words: ks.append(round(ST[i]+DU[i]*acc/tot,2));acc+=len(x)+1
        KW.append(ks)
TL={'N':[round(x,3) for x in N],'ST':ST,'DU':DU,'SUBS':[l['text'] for l in L],'KW':KW,'EV':EV,'CARDS':spec['cards'],'FX':spec.get('fx',{}),'END':spec['end_line'],'SCENE':spec['scene'],'OPTS':spec.get('scene_opts',{}),'PILL':spec.get('pill')}
open(out+'/timeline.js','w').write('window.TL='+json.dumps(TL,ensure_ascii=False)+';')
json.dump({'total':N[-1]},open(out+'/total.json','w'))
print('PRONTO total',round(N[-1],1),'s | eventos',EV)
