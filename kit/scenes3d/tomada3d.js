// Cena 3D "Instalar tomada" (low poly). Câmera percorre a cena; legenda de uma palavra por vez fica no engine3d.
window.SCENE=(function(){
let W={};
const keywords=['fogo','parafuso','parafusos','disjuntor','detector','terra','fase','neutro','segredo','frouxa','esquenta','incêndio','incendio'];
const OX=1.0,OY=-0.4;                                   // posição da tomada na parede
const SCREW={fase:[-0.22,-0.02],neutro:[0.22,-0.02],terra:[0,-0.25]};
const COL={fase:'#ff4d4d',neutro:'#3aa0ff',terra:'#2ecc71'};
function init(c){
 const {THREE,scene}=c;W.T=THREE;
 scene.background=new THREE.Color('#bfe3f2');
 scene.add(new THREE.HemisphereLight('#ffffff','#c9a77a',0.95));
 const dl=new THREE.DirectionalLight('#ffffff',1.15);dl.position.set(2.5,4,5);scene.add(dl);
 W.lamp=new THREE.PointLight('#ffffff',0,6);scene.add(W.lamp);
 const M=(col,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:col,flatShading:true,roughness:.85,metalness:.05},o));
 const box=(w,h,d,col,x=0,y=0,z=0,p=scene,o={})=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 const cyl=(r,h,col,x=0,y=0,z=0,p=scene,seg=10,o={})=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 W.M=M;W.box=box;W.cyl=cyl;
 // sala: parede, rodapé, piso
 box(14,9,0.4,'#f3e4c6',0,0.5,-0.2);
 box(14,0.5,0.1,'#c9a77a',0,-2.45,0.03);
 box(14,0.2,0.12,'#e7d4ae',0,-2.15,0.04);
 const fl=box(14,0.3,12,'#b9824f',0,-2.8,5.8);
 // listras de piso
 for(let i=-6;i<=6;i++)box(0.03,0.02,12,'#a06f40',i*1.1,-2.64,5.8);
 // planta decorativa
 cyl(0.28,0.5,'#e07a3f',-1.55,-2.35,0.9);for(let i=0;i<5;i++){const lf=box(0.12,0.7,0.25,'#3fa14f',-1.55+Math.cos(i*1.3)*0.2,-1.8,0.9+Math.sin(i*1.3)*0.2);lf.rotation.z=Math.cos(i*1.3)*0.4;lf.rotation.x=Math.sin(i*1.3)*0.4}
 // contexto de casa: sofá, quadro, interruptor, planta
 const sofa=new THREE.Group();sofa.position.set(-0.2,-2.4,0.8);scene.add(sofa);box(2.6,0.5,0.95,'#3f7aa8',0,0.35,0,sofa);box(2.6,0.9,0.28,'#356b95',0,0.75,-0.36,sofa);box(0.28,0.7,0.95,'#356b95',-1.25,0.55,0,sofa);box(0.28,0.7,0.95,'#356b95',1.25,0.55,0,sofa);box(1.05,0.2,0.8,'#4f8cb9',-0.55,0.7,0.05,sofa);box(1.05,0.2,0.8,'#4f8cb9',0.55,0.7,0.05,sofa);[[-1.15,-0.4],[1.15,-0.4],[-1.15,0.4],[1.15,0.4]].forEach(([x,z])=>box(0.1,0.15,0.1,'#6b4a2f',x,0.05,z,sofa));
 box(1.2,0.85,0.05,'#6b4a2f',0.1,1.55,0.0);box(1.05,0.7,0.03,'#bfe3f2',0.1,1.55,0.03);box(0.6,0.22,0.03,'#7ab05a',0.1,1.38,0.05);
 box(0.2,0.3,0.03,'#f6f7fb',OX-0.95,OY+0.35,0.03);box(0.08,0.14,0.03,'#d7dbe6',OX-0.95,OY+0.35,0.06);
 cyl(0.24,0.45,'#e07a3f',1.95,-2.2,0.4);for(let i=0;i<5;i++){const lf=box(0.1,0.8,0.22,'#3fa14f',1.95+Math.cos(i*1.3)*0.2,-1.65,0.4+Math.sin(i*1.3)*0.2);lf.rotation.z=Math.cos(i*1.3)*0.4;lf.rotation.x=Math.sin(i*1.3)*0.4}
 // quadro de energia (disjuntor)
 W.pan=new THREE.Group();W.pan.position.set(-1.0,0.2,0.0);scene.add(W.pan);
 box(0.95,1.25,0.14,'#5c6679',0,0,0.07,W.pan);box(0.8,1.1,0.05,'#3e4658',0,0,0.15,W.pan);
 for(let i=0;i<3;i++){box(0.5,0.16,0.04,'#222a3a',0,0.32-i*0.22,0.185,W.pan);box(0.1,0.1,0.03,'#e8edf8',0.12,0.32-i*0.22,0.21,W.pan)}
 W.leverSlot=box(0.26,0.5,0.05,'#10151f',0,-0.2,0.19,W.pan);W.lever=box(0.2,0.24,0.1,'#e8edf8',0,-0.1,0.26,W.pan);
 W.led=new THREE.Mesh(new THREE.SphereGeometry(0.06,12,8),M('#2ecc71',{emissive:'#2ecc71',emissiveIntensity:.8}));W.led.position.set(0,0.52,0.2);W.pan.add(W.led);
 // tomada
 const O=W.O=new THREE.Group();O.position.set(OX,OY,0);scene.add(O);
 W.recess=box(0.86,0.86,0.01,'#1b2030',0,0,0.002,O);
 W.hal=new THREE.Mesh(new THREE.RingGeometry(0.5,0.62,40),new THREE.MeshBasicMaterial({color:'#60c8ff',transparent:true,opacity:0}));W.hal.position.set(0,0,0.08);O.add(W.hal);
 // módulo + parafusos
 W.mod=new THREE.Group();O.add(W.mod);box(0.72,0.72,0.09,'#d9dde6',0,0,0.05,W.mod);
 box(0.62,0.62,0.02,'#eceff5',0,0,0.1,W.mod);
 W.screws={};for(const k in SCREW){const g=new THREE.Group();g.position.set(SCREW[k][0],SCREW[k][1],0.11);W.mod.add(g);
  const s=new THREE.Mesh(new THREE.CylinderGeometry(0.075,0.075,0.05,14),M('#b5bcc9',{metalness:.5,roughness:.5}));s.rotation.x=Math.PI/2;s.position.z=0.025;g.add(s);
  const slot=box(0.1,0.02,0.02,'#2a3350',0,0,0.055,g);const slot2=box(0.02,0.1,0.02,'#2a3350',0,0,0.055,g);
  W.screws[k]={g,s,slot,slot2,emi:s.material}}
 // fios
 W.wires={};for(const k in SCREW){const sx=SCREW[k][0],sy=SCREW[k][1],wx=sx*1.15;
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(wx,1.6,0.2),new THREE.Vector3(wx,0.85,0.2),new THREE.Vector3(wx,0.42,0.17),new THREE.Vector3(sx,sy+0.22,0.14),new THREE.Vector3(sx,sy+0.04,0.13)]);
  const geo=new THREE.TubeGeometry(curve,40,0.04,8,false);const m=new THREE.Mesh(geo,M(COL[k]));W.mod.add(m);
  const tip=cyl(0.04,0.06,'#e0a35a',sx,sy+0.0,0.125,W.mod);tip.rotation.x=Math.PI/2;tip.visible=false;W.wires[k]={m,geo,tip,total:geo.index.count}}
 // placa
 W.plate=new THREE.Group();W.plate.position.set(0,0,0.04);O.add(W.plate);
 box(0.8,0.8,0.06,'#f6f7fb',0,0,0,W.plate);box(0.66,0.66,0.02,'#e9ecf5',0,0,0.035,W.plate);
 [[-0.16,0.13,0.065],[0.16,0.13,0.065],[0,-0.16,0.08]].forEach(([x,y,r])=>{const h=new THREE.Mesh(new THREE.CylinderGeometry(r,r,0.03,16),M('#10131c'));h.rotation.x=Math.PI/2;h.position.set(x,y,0.048);W.plate.add(h)});
 [[-0.34,0.34],[0.34,-0.34]].forEach(([x,y])=>{const s=cyl(0.03,0.02,'#b5bcc9',x,y,0.04,W.plate);s.rotation.x=Math.PI/2});
 // chamas / fumaça
 W.fire=new THREE.Group();O.add(W.fire);[[0,0.48,0.24],[ -0.22,0.44,0.17],[0.22,0.44,0.18]].forEach(([x,y,h],i)=>{const a=new THREE.Mesh(new THREE.ConeGeometry(0.17,h*2,7),M('#ff6a1f',{emissive:'#ff5a00',emissiveIntensity:1.0}));a.position.set(x,y,0.12);const b=new THREE.Mesh(new THREE.ConeGeometry(0.1,h*1.3,6),M('#ffd23f',{emissive:'#ffc400',emissiveIntensity:1}));b.position.set(x,y-0.05,0.14);W.fire.add(a,b)});
 W.smoke=[...Array(8)].map(()=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(0.16,0),new THREE.MeshBasicMaterial({color:'#4a4f5c',transparent:true,opacity:0}));O.add(m);return m});
 W.spark=[...Array(10)].map(()=>{const m=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.04,0.04),new THREE.MeshBasicMaterial({color:'#ffe14d',transparent:true,opacity:0}));O.add(m);return m});
 W.hotL=new THREE.PointLight('#ff6a1f',0,2.5);W.hotL.position.set(SCREW.fase[0],SCREW.fase[1],0.5);O.add(W.hotL);
 // detector de tensão
 W.tester=new THREE.Group();scene.add(W.tester);
 const tb=cyl(0.05,0.7,'#ffc400',0,0.38,0,W.tester);cyl(0.02,0.2,'#c9d4f0',0,-0.07,0,W.tester);
 W.tled=new THREE.Mesh(new THREE.SphereGeometry(0.055,10,8),M('#2a3350',{emissive:'#000000'}));W.tled.position.set(0,0.74,0);W.tester.add(W.tled);
 // chave de fenda
 W.sd=new THREE.Group();scene.add(W.sd);cyl(0.07,0.4,'#ff8a3d',0,0.45,0,W.sd);cyl(0.025,0.4,'#c9d4f0',0,0.05-0.0,0,W.sd);
}
const lerp=(a,b,t)=>a+(b-a)*t;
function camPose(c){
 const {N,E,tn:t}=c,tEnd=N[6];
 const K=[ // t, pos, look
  [0,           [1.0,-0.35,3.0],[1.0,-0.38,0]],
  [E.parafuso,  [1.0,-0.30,2.1],[1.0,-0.35,0]],
  [N[1]-0.01,   [1.0,-0.30,1.9],[1.0,-0.35,0]],
  [N[1],        [0.0,0.0,7.6],[0.0,-0.1,0]],
  [E.disjuntor-2.0,[0.0,0.0,6.0],[0.0,-0.1,0]],
  [E.disjuntor-0.5,[-0.4,0.1,4.6],[-0.4,0.0,0]],
  [E.disjuntor+0.1,[-1.0,0.2,3.3],[-1.0,0.15,0]],
  [N[2]-0.05,   [-1.0,0.2,3.3],[-1.0,0.15,0]],
  [N[2]+0.6,    [1.0,-0.25,3.2],[1.0,-0.4,0]],
  [N[3],        [1.0,-0.3,2.7],[1.0,-0.4,0]],
  [E.fase,      [1.25,-0.2,2.1],[1.0,-0.4,0]],
  [N[4]-0.1,    [1.15,-0.3,1.9],[1.0,-0.4,0]],
  [N[4]+0.4,    [1.0,-0.4,1.7],[1.0,-0.42,0]],
  [N[5]-0.05,   [1.0,-0.4,1.7],[1.0,-0.42,0]],
  [N[5]+0.5,    [1.08,-0.2,1.35],[0.82,-0.42,0]],
  [tEnd-0.05,   [1.08,-0.2,1.3],[0.82,-0.42,0]],
  [tEnd,        [1.0,-0.3,3.5],[1.0,-0.4,0]],
  [1e9,         [1.0,-0.3,3.5],[1.0,-0.4,0]]];
 let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1];const dt=b[0]-a[0];
 const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));
 const pp=a[1].map((v,j)=>lerp(v,b[1][j],f));pp[2]*=1.32;return {p:pp,l:a[2].map((v,j)=>lerp(v,b[2][j],f))};
}
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x);
function render(c){
 const {THREE,N,E,seg,eob,clamp,tn:t,camera}=c,T=THREE,tEnd=N[6];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 const O=W.O;
 // ---- gancho: chamas na tomada (frase 0) ----
 const hook=t>=0.5&&t<N[1];const hk=hook?seg(t,0.5,1.2):0;
 W.fire.visible=hook;W.fire.children.forEach((m,i)=>{const s=(0.8+0.35*Math.sin(t*14+i*1.7))*(0.4+0.6*hk)*(t>=E.parafuso?1.25:1);m.scale.set(s*0.9,s,s*0.9)});
 W.smoke.forEach((m,i)=>{const k=((t*0.7+i*0.13)%1);const on=hook?1:0;m.material.opacity=on*0.55*(1-k)*hk;m.position.set(Math.sin(i*2+k*3)*0.2,0.5+k*1.2,0.15+k*0.2);m.scale.setScalar(0.5+k*1.5)});
 W.spark.forEach((m,i)=>{const k=((t*1.3+i*0.11)%1);const on=(hook&&t>=E.parafuso-0.3)?1:0;m.material.opacity=on*(1-k);const a=i*0.9;m.position.set(Math.cos(a)*k*0.6,0.2+Math.sin(a)*k*0.6+k*0.2,0.2)});
 // brilho vermelho-quente da placa no gancho
 if(hook){c.shake=0.6+(t>=E.parafuso?1.4:0)}
 if(t>=E.parafuso&&t<E.parafuso+0.35)c.doFlash(E.parafuso,0.35,0.3,'#ff7a1a');
 if(t>=N[1]&&t<N[1]+0.35)c.doFlash(N[1],0.9,0.35,'#fff');
 // ---- energia viva (halo azul) até desligar o disjuntor ----
 const live=t>=N[1]&&t<E.disjuntor+0.25?1:0;
 W.hal.material.opacity=live?0.45+0.3*Math.sin(t*9):0;W.hal.scale.setScalar(1+0.12*Math.sin(t*9));W.hal.lookAt(camera.position);
 // ---- disjuntor ----
 const off=seg(t,E.disjuntor,E.disjuntor+0.3);
 W.lever.position.y=-0.1-0.2*off;
 const lc=off>0.5?'#ff3b3b':'#2ecc71';W.led.material.color.set(lc);W.led.material.emissive.set(lc);
 const showPan=t>=N[1]&&t<N[2]+0.4;
 c.label('brk',off>0.5?'DESLIGADO':'LIGADO',new T.Vector3(-1.0,1.05,0.3),{bg:off>0.5?'#ff3b3b':'#2ecc71',fg:'#fff',a:showPan?seg(t,N[1]+0.3,N[1]+0.6)*(1-seg(t,N[2]+0.1,N[2]+0.4)):0,s:0.9+0.1*eob((t-E.disjuntor)/0.3)});
 if(t>=E.disjuntor&&t<E.disjuntor+0.5){c.doFlash(E.disjuntor,0.25,0.2,'#ff3b3b')}
 // ---- detector de tensão ----
 const tp=seg(t,N[2]+0.5,N[2]+1.4)*(1-seg(t,N[3]-0.2,N[3]+0.2));
 const tip=new T.Vector3(OX-0.16,OY+0.13,0.12),far=new T.Vector3(OX+0.9,OY+0.9,0.9);
 const pos=far.clone().lerp(tip,tp);W.tester.position.copy(pos);W.tester.rotation.set(0.35*(1-tp)+0.15,0,0.55*(1-tp)+0.18);W.tester.visible=tp>0.01;
 W.tested=t>=E.detector;const tgood=t>=E.detector+0.5;W.tled.material.color.set('#2a3350');
 c.label('v0','0 V ✓',new T.Vector3(OX,OY+0.62,0.3),{bg:'#2ecc71',fg:'#0b0f1a',a:(tgood&&t<N[3]-0.1)?seg(t,E.detector+0.5,E.detector+0.8):0,s:eob((t-E.detector-0.5)/0.3)});
 if(t>=E.detector+0.5&&t<E.detector+0.75)c.doFlash(E.detector+0.5,0.18,0.25,'#2ecc71');
 // ---- placa sai, módulo e fios ----
 const pp=seg(t,N[3]+0.05,N[3]+0.7);
 W.plate.position.set(-1.4*pp,0.9*pp,0.04+1.4*pp);W.plate.rotation.set(-0.7*pp,0.9*pp,0.8*pp);W.plate.visible=pp<0.98;W.mod.position.z=-0.22*(1-pp);
 W.hal.visible=true;
 const reveal={terra:E.terra,fase:E.fase,neutro:E.neutro};
 for(const k in W.wires){const w=W.wires[k];const p=seg(t,reveal[k]-0.1,reveal[k]+0.9);w.geo.setDrawRange(0,Math.floor(w.total*p/3)*3);w.m.visible=p>0.01;w.tip.visible=p>0.98;
  const la=(t>=reveal[k]-0.1&&t<N[4]-0.1)?seg(t,reveal[k],reveal[k]+0.25):0;
  c.label('w'+k,k.toUpperCase(),new T.Vector3(OX+SCREW[k][0]*1.9+(k==='terra'?0:(k==='fase'?-0.18:0.18)),OY+0.78,0.3),{bg:COL[k],fg:'#0b0f1a',a:la,s:eob((t-reveal[k])/0.3)})}
 // ---- apertar os parafusos ----
 const tight=seg(t,E.aperte,E.aperte+1.8);
 for(const k in W.screws){const s=W.screws[k];s.g.rotation.z=tight*Math.PI*8;s.g.position.z=0.11;}
 // chave de fenda gira o parafuso da fase
 const sdOn=t>=E.segredo+0.6&&t<N[5]-0.05?seg(t,E.segredo+0.6,E.segredo+1.0)*(1-seg(t,N[5]-0.3,N[5]-0.05)):0;
 const sp=new T.Vector3(OX+SCREW.fase[0],OY+SCREW.fase[1],0.2);W.sd.visible=sdOn>0.01;W.sd.position.set(sp.x+0.45*(1-sdOn),sp.y-0.3*(1-sdOn),sp.z+0.1+0.4*(1-sdOn));W.sd.rotation.set(Math.PI/2+0.18*(1-sdOn),0,0.2*(1-sdOn));W.sd.children[1].rotation.y=tight*Math.PI*8;
 if(t>=E.aperte&&t<E.aperte+1.8)c.shake=Math.max(c.shake,0.6);
 // segredo: vinheta
 c.vig=Math.max(c.vig,0.65*seg(t,E.segredo-0.2,E.segredo+0.4)*(1-seg(t,E.aperte+1.2,E.aperte+1.8)));
 // ---- conexão frouxa esquenta ----
 const lo=seg(t,E.frouxa-0.1,E.frouxa+0.4)*(t<tEnd?1:0);const sf=W.screws.fase;
 if(t>=N[5]-0.05&&t<tEnd){sf.g.position.z=0.11+0.07*lo;sf.g.rotation.z=0;sf.g.rotation.x=0.35*lo;
  const heat=seg(t,E.esquenta-0.1,E.esquenta+0.8);sf.emi.emissive.set('#ff3b00');sf.emi.emissiveIntensity=heat*(1.2+0.4*Math.sin(t*16));sf.emi.color.set(new T.Color('#b5bcc9').lerp(new T.Color('#ff5a1f'),heat));W.hotL.intensity=heat*3}
 else{sf.emi.emissiveIntensity=0;W.hotL.intensity=0}
 c.label('lf','CONEXÃO FROUXA',new T.Vector3(OX,OY+0.78,0.3),{bg:'#ffb400',fg:'#0b0f1a',a:(t>=E.frouxa&&t<tEnd-0.2)?seg(t,E.frouxa,E.frouxa+0.25):0,s:eob((t-E.frouxa)/0.3)});
 const inc=t>=E.incendio&&t<tEnd;
 // fumaça + chama no final (reuso dos objetos do gancho)
 if(t>=E.esquenta&&t<tEnd){const hh=seg(t,E.esquenta,E.esquenta+1.0);W.smoke.forEach((m,i)=>{const k=((t*0.8+i*0.13)%1);m.material.opacity=0.5*(1-k)*hh;m.position.set(SCREW.fase[0]+Math.sin(i*2+k*3)*0.12,SCREW.fase[1]+0.1+k*0.9,0.2+k*0.2);m.scale.setScalar(0.35+k*1.0)})}
 if(inc){W.fire.visible=true;W.fire.position.set(SCREW.fase[0]-0.0,SCREW.fase[1]-0.45,0);W.fire.scale.setScalar(0.55*seg(t,E.incendio,E.incendio+0.5));c.shake=Math.max(c.shake,1.2);if(t<E.incendio+0.3)c.doFlash(E.incendio,0.4,0.3,'#ff7a1a')}
 else W.fire.position.set(0,0,0),W.fire.scale.setScalar(1);
 if(inc){W.fire.children.forEach((m,i)=>{const s=(0.8+0.35*Math.sin(t*14+i*1.7));m.scale.set(s*0.9,s,s*0.9)})}
 // ao fechar, vinheta leve
 c.vig=Math.max(c.vig,0.25);
}
return{init,render,keywords}})();
