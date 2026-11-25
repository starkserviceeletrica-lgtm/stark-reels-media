import json
txt="""Quer *editar* seus vídeos sem ser editor? Tá aqui o passo a passo.
*Passo* 1. *Pasta*. Crie uma pasta chamada Editor de Vídeo com três subpastas: vídeos brutos, referências e exportação.
*Passo* 2. *Ferramentas*. Instale o que corta, o que legenda e o que anima.
*Passo* 3. *Estilo*. Escolha três vídeos que você gosta e use como modelo.
*Passo* 4. *Edição*. Revise o roteiro e aprove antes de exportar.
Comente *EDITAR* que eu te mando."""
words=[];t=0.2;marks=[]
for line in txt.split("\n"):
    for w in line.split():
        key=w.startswith("*");w=w.replace("*","");dur=.30+.012*len(w)+(.22 if w[-1] in ".?:," else 0)
        words.append({"w":w.rstrip(".,:?") if not w.endswith("?") else w,"s":round(t,2),"e":round(t+dur-.04,2),"key":key});marks.append((w,round(t,2)));t+=dur
    t+=.15
def at(word,n=1):
    c=0
    for w in words:
        if w["w"].startswith(word) and (word!="Passo" or w["key"]):
            c+=1
            if c==n:return w["s"]
card=lambda i:300+i*1000
cards=[
 {"t":0.0,"x":90,"y":card(0),"w":900,"h":760,"num":"01","label":"pasta","items":[
   {"type":"pill","text":"Editor de Vídeo","x":290,"y":150,"t":at("Pasta"),"acc":True},
   {"text":"vídeos brutos","icon":"▣","x":200,"y":330,"t":at("brutos")},
   {"text":"referências","icon":"★","x":200,"y":450,"t":at("referências")},
   {"text":"exportação","icon":"⇪","x":200,"y":570,"t":at("exportação")}]},
 {"t":at("Passo",2)-.5,"x":90,"y":card(1),"w":900,"h":760,"num":"02","label":"ferramentas","items":[
   {"text":"corta","icon":"✂","x":260,"y":210,"t":at("corta")},
   {"text":"legenda","icon":"Aa","x":260,"y":350,"t":at("legenda")},
   {"text":"anima","icon":"✦","x":260,"y":490,"t":at("anima")}]},
 {"t":at("Passo",3)-.5,"x":90,"y":card(2),"w":900,"h":760,"num":"03","label":"estilo","items":[
   {"type":"pill","text":"vídeo 1","x":120,"y":300,"t":at("três")},
   {"type":"pill","text":"vídeo 2","x":370,"y":300,"t":at("três")+.3},
   {"type":"pill","text":"vídeo 3","x":620,"y":300,"t":at("três")+.6},
   {"type":"pill","text":"guia de estilo","x":300,"y":520,"t":at("modelo"),"acc":True}]},
 {"t":at("Passo",4)-.5,"x":90,"y":card(3),"w":900,"h":760,"num":"04","label":"edição","items":[
   {"type":"pill","text":"roteiro","x":90,"y":300,"t":at("roteiro")},
   {"type":"pill","text":"aprovação","x":350,"y":300,"t":at("aprove")},
   {"type":"pill","text":"exportar","x":640,"y":300,"t":at("exportar"),"acc":True}]}]
lines=[{"t":at("Passo",i+2)-.9,"dur":.8,"d":f"M540 {card(i)+760} L540 {card(i+1)}"} for i in range(3)]
cy=lambda i:card(i)+380
tt=[at("Passo",i+1) for i in range(4)]
cam=[{"t":0,"x":540,"y":cy(0),"s":.9},{"t":tt[0]-.3,"x":540,"y":cy(0),"s":1.0}]
for i in range(1,4):cam+=[{"t":tt[i]-.9,"x":540,"y":cy(i-1),"s":1.0},{"t":tt[i]-.1,"x":540,"y":cy(i),"s":1.0}]
last=words[-1]["e"]
cam+=[{"t":last-1.6,"x":540,"y":cy(3),"s":1.0},{"t":last,"x":540,"y":cy(1)+300,"s":.42}]
spec={"duration":round(last+3.2,1),"camera":cam,"cards":cards,"lines":lines,"words":words,
 "end":{"t":round(last+.6,1),"cta":"Manda <span>ELÉTRICA</span><br>no direct","sub":"Vídeo criado por @rhaylook, da Stark Service."},"hideCaptionsAfter":round(last+.55,1)}
json.dump(spec,open("specs/demo_visual.json","w"),ensure_ascii=False,indent=1);print(spec["duration"],len(words))
