// Cena 3D "ar-condicionado split pingando" (low poly). Unidade em corte: filtro, serpentina (gelo), bandeja, dreno, ventilador, manômetro.
window.SCENE=(function(){
let W={};
const keywords=['pingando','filtro','sujo','gelo','derrete','transborda','ventilar','lave','dreno','gás','gas','técnico','tecnico'];
const WATER='#4db8ff',WARM='#ffb74d',COLD='#8fdcff';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
function init(c){
 const {THREE,scene}=c,T=THREE;
 scene.background=new T.Color('#b9dff0');
 scene.add(new T.HemisphereLight('#ffffff','#b79b78',0.95));const dl=new T.DirectionalLight('#ffffff',1.1);dl.position.set(3,4,6);scene.add(dl);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,flatShading:true,roughness:.85,metalness:.03},o));
 const box=(w,h,d,col,x=0,y=0,z=0,p=scene,o={})=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 const cyl=(r,h,col,x=0,y=0,z=0,p=scene,s=12,o={})=>{const m=new T.Mesh(new T.CylinderGeometry(r,r,h,s),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 W.M=M;W.box=box;
 // sala
 box(16,10,0.3,'#f1e5cf',0,0.5,-0.55);box(16,0.2,0.1,'#e3d1ab',0,-2.35,-0.35);
 box(16,0.3,12,'#b9824f',0,-2.55,5.4);for(let i=-7;i<=7;i++)box(0.03,0.02,12,'#a06f40',i*1.1,-2.39,5.4);
 // sofá, quadro e planta (mais contexto de casa)
 const sofa=new T.Group();sofa.position.set(-0.7,-2.4,0.7);scene.add(sofa);box(2.5,0.5,0.95,'#3f7aa8',0,0.35,0,sofa);box(2.5,0.9,0.28,'#356b95',0,0.75,-0.36,sofa);box(0.28,0.7,0.95,'#356b95',-1.2,0.55,0,sofa);box(0.28,0.7,0.95,'#356b95',1.2,0.55,0,sofa);box(1.0,0.2,0.8,'#4f8cb9',-0.5,0.7,0.05,sofa);box(1.0,0.2,0.8,'#4f8cb9',0.5,0.7,0.05,sofa);[[-1.1,-0.4],[1.1,-0.4],[-1.1,0.4],[1.1,0.4]].forEach(([x,z])=>box(0.1,0.15,0.1,'#6b4a2f',x,0.05,z,sofa));
 box(1.1,0.8,0.05,'#6b4a2f',-0.9,1.7,-0.4);box(0.95,0.65,0.03,'#bfe3f2',-0.9,1.7,-0.37);box(0.55,0.2,0.03,'#7ab05a',-0.9,1.55,-0.35);
 cyl(0.22,0.4,'#e07a3f',-1.8,-2.2,0.1);for(let i=0;i<5;i++){const lf=box(0.1,0.7,0.2,'#3fa14f',-1.8+Math.cos(i*1.3)*0.18,-1.7,0.1+Math.sin(i*1.3)*0.18);lf.rotation.z=Math.cos(i*1.3)*0.4;lf.rotation.x=Math.sin(i*1.3)*0.4}
 // unidade (corte)
 const U=W.U=new T.Group();scene.add(U);
 box(3.4,1.1,0.06,'#e9edf6',0,0,-0.4,U);box(3.4,0.06,0.8,'#f4f6fb',0,0.55,0,U);box(3.4,0.06,0.8,'#f4f6fb',0,-0.55,0,U);box(0.06,1.1,0.8,'#f4f6fb',-1.7,0,0,U);box(0.06,1.1,0.8,'#f4f6fb',1.7,0,0,U);
 box(3.3,1.0,0.02,'#1c2233',0,0,-0.36,U);          // fundo escuro do interior
 // painel frontal (articula no alto)
 W.hinge=new T.Group();W.hinge.position.set(0,0.55,0.4);U.add(W.hinge);box(3.4,1.0,0.06,'#f6f7fb',0,-0.5,0,W.hinge);box(3.2,0.12,0.04,'#c9d1e3',0,-0.9,0.04,W.hinge);
 box(0.25,0.06,0.03,'#4db8ff',1.3,-0.18,0.05,W.hinge,{emissive:'#4db8ff',emissiveIntensity:.6});box(3.0,0.05,0.02,'#d3dae9',0,-0.62,0.04,W.hinge);box(0.5,0.16,0.02,'#1c2233',-1.25,-0.2,0.05,W.hinge);
 // serpentina
 W.coil=new T.Group();W.coil.position.set(-0.2,0.05,-0.15);U.add(W.coil);box(1.9,0.6,0.12,'#2f86c6',0,0,0,W.coil);for(let i=0;i<22;i++)box(0.03,0.58,0.16,'#9fd3f2',-0.9+i*0.083,0,0.01,W.coil);
 // gelo
 W.ice=[];for(let i=0;i<14;i++){const m=new T.Mesh(new T.ConeGeometry(0.1,0.5,5),M('#eaf8ff',{emissive:'#bfe3fb',emissiveIntensity:.35}));m.position.set(-0.85+i*0.13,-0.35,0.12);m.rotation.x=Math.PI;m.scale.set(1,0,1);W.coil.add(m);W.ice.push(m)}
 W.frost=box(1.95,0.62,0.04,'#f2fbff',0,0,0.09,W.coil,{transparent:true,opacity:0});
 // filtro
 W.filter=new T.Group();U.add(W.filter);const fm=box(1.9,0.62,0.04,'#7a6a55',0,0,0,W.filter);for(let i=0;i<20;i++)box(0.03,0.6,0.05,'#4b3f33',-0.9+i*0.095,0,0.01,W.filter);W.filterMat=fm.material;W.filterMeshes=W.filter.children;
 // bandeja + água
 W.tray=new T.Group();W.tray.position.set(-0.2,-0.4,-0.02);U.add(W.tray);box(2.1,0.05,0.55,'#cfd6e6',0,-0.03,0,W.tray);box(2.1,0.18,0.04,'#cfd6e6',0,0.06,0.28,W.tray);box(2.1,0.18,0.04,'#cfd6e6',0,0.06,-0.28,W.tray);box(0.04,0.18,0.55,'#cfd6e6',-1.05,0.06,0,W.tray);box(0.04,0.18,0.55,'#cfd6e6',1.05,0.06,0,W.tray);
 W.wat=box(2.0,0.1,0.5,WATER,0,0.0,0,W.tray,{transparent:true,opacity:.9});W.wat.scale.y=0.01;
 // dreno (mangueira para fora) + entupimento
 const curve=new T.CatmullRomCurve3([new T.Vector3(0.85,-0.45,-0.1),new T.Vector3(1.4,-0.5,-0.1),new T.Vector3(1.95,-0.6,-0.1),new T.Vector3(2.0,-1.2,-0.1),new T.Vector3(2.0,-2.3,-0.05)]);
 W.hose=new T.Mesh(new T.TubeGeometry(curve,24,0.07,8,false),M('#e0a45a'));scene.add(W.hose);
 W.clog=new T.Mesh(new T.IcosahedronGeometry(0.13,0),M('#5a4632'));W.clog.position.set(2.0,-1.4,-0.1);scene.add(W.clog);W.clog.scale.setScalar(0.001);
 // ventilador
 W.fan=new T.Group();W.fan.position.set(1.15,0.0,-0.05);U.add(W.fan);cyl(0.07,0.1,'#aab4cc',0,0,0,W.fan).rotation.x=Math.PI/2;for(let i=0;i<6;i++){const b=box(0.1,0.34,0.03,'#d5dcec',0,0.2,0,new T.Group());W.fan.add(b.parent);b.parent.rotation.z=i*Math.PI/3}
 // ar (setas)
 W.air=[...Array(6)].map((_,i)=>{const m=new T.Mesh(new T.ConeGeometry(0.07,0.22,6),new T.MeshBasicMaterial({color:i<3?WARM:COLD,transparent:true,opacity:0}));scene.add(m);return m});
 // gotas e poça
 W.drops=[...Array(14)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.06,6,5),new T.MeshBasicMaterial({color:WATER,transparent:true,opacity:0}));scene.add(m);return m});
 W.pud=new T.Mesh(new T.CylinderGeometry(1,1,0.02,20),new T.MeshBasicMaterial({color:WATER,transparent:true,opacity:.8}));W.pud.position.set(2.0,-2.38,0.1);W.pud.scale.set(0.01,1,0.01);scene.add(W.pud);
 // lavagem do filtro: gotas
 W.spray=[...Array(12)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.04,6,5),new T.MeshBasicMaterial({color:'#bfe9ff',transparent:true,opacity:0}));scene.add(m);return m});
 W.bubbles=[...Array(8)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.09,8,6),new T.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:0}));scene.add(m);return m});
 // controle remoto
 W.rem=new T.Group();W.rem.position.set(1.4,-1.3,1.3);W.rem.rotation.set(-0.5,0,0.25);scene.add(W.rem);box(0.42,1.1,0.08,'#2b3042',0,0,0,W.rem);box(0.3,0.18,0.02,'#8fdcff',0,0.38,0.05,W.rem,{emissive:'#4db8ff',emissiveIntensity:.5});W.remBtn=box(0.16,0.16,0.04,'#2ecc71',0,0.1,0.06,W.rem,{emissive:'#2ecc71',emissiveIntensity:1});[-0.1,0.1].forEach(x=>box(0.12,0.12,0.03,'#4a5068',x,-0.15,0.05,W.rem));[-0.1,0.1].forEach(x=>box(0.12,0.12,0.03,'#4a5068',x,-0.35,0.05,W.rem));W.rem.visible=false;
 // manômetro
 W.gauge=new T.Group();W.gauge.position.set(0.5,-1.5,0.9);scene.add(W.gauge);cyl(0.5,0.12,'#e8edf8',0,0,0,W.gauge,24).rotation.x=Math.PI/2;
 const g2=cyl(0.42,0.13,'#10151f',0,0,0.01,W.gauge,24);g2.rotation.x=Math.PI/2;
 [['#e03c5a',-2.2,-1.5],['#ffc400',-1.1,-0.3],['#2ecc71',0.1,1.1]].forEach(([c0,a0,a1])=>{const arc=new T.Mesh(new T.RingGeometry(0.28,0.4,16,1,a0+Math.PI/2,a1-a0),new T.MeshBasicMaterial({color:c0,side:T.DoubleSide}));arc.position.z=0.08;W.gauge.add(arc)});
 W.needle=new T.Group();W.gauge.add(W.needle);box(0.04,0.36,0.03,'#ffffff',0,0.18,0.1,W.needle);cyl(0.05,0.04,'#ffffff',0,0,0.1,W.gauge).rotation.x=Math.PI/2;W.gauge.visible=false;
 // sinal piso molhado
 W.sign=new T.Group();W.sign.position.set(1.0,-2.1,0.9);scene.add(W.sign);const sg=new T.Mesh(new T.ConeGeometry(0.4,0.8,3),M('#ffc400'));sg.rotation.y=Math.PI;sg.position.y=0.4;W.sign.add(sg);box(0.1,0.22,0.03,'#10151f',0,0.35,0.22,W.sign);
}
function camPose(c){
 const {N,E,tn:t}=c,tEnd=N[6];
 const K=[
  [0,            [0.0,-0.7,9.6],[0.0,-0.75,0]],
  [E.pingando+0.5,[0.2,-0.8,8.8],[0.3,-0.9,0]],
  [N[1]-0.01,    [0.2,-0.8,8.6],[0.3,-0.9,0]],
  [N[1],         [0.0,-0.2,9.2],[0,-0.2,0]],
  [N[1]+0.9,     [-0.2,-0.1,8.2],[-0.1,-0.1,0]],
  [E.sujo+0.8,   [-0.3,0.0,7.6],[-0.3,0.0,0]],
  [N[2]-0.05,    [-0.3,0.0,7.6],[-0.3,0.0,0]],
  [N[2]+0.7,     [0.0,-0.4,8.2],[0,-0.4,0]],
  [E.derrete,    [0.1,-0.5,7.9],[0.1,-0.5,0]],
  [N[3]-0.05,    [0.2,-0.6,8.0],[0.2,-0.6,0]],
  [N[3]+0.8,     [-0.1,-0.8,8.0],[-0.1,-0.8,0]],
  [E.lave+0.2,   [-0.5,-1.0,7.4],[-0.5,-1.0,0.5]],
  [N[4]-0.05,    [-0.5,-1.0,7.4],[-0.5,-1.0,0.5]],
  [N[4]+0.8,     [0.9,-1.0,8.2],[0.9,-1.0,0]],
  [N[5]-0.05,    [0.9,-1.0,8.0],[0.9,-1.0,0]],
  [N[5]+0.8,     [0.4,-1.1,6.6],[0.4,-1.25,0.9]],
  [tEnd-0.05,    [0.4,-1.1,6.0],[0.4,-1.3,0.9]],
  [tEnd,         [0,-0.3,9.6],[0,-0.5,0]],
  [1e9,          [0,-0.3,9.6],[0,-0.5,0]]];
 let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1];const dt=b[0]-a[0];
 const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));
 const pp=a[1].map((v,j)=>lerp(v,b[1][j],f));pp[2]*=1.07;return {p:pp,l:a[2].map((v,j)=>lerp(v,b[2][j],f))};
}
function render(c){
 const {THREE,N,E,seg,eob,clamp,tn:t,camera}=c,T=THREE,tEnd=N[6];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // ---------- estados ----------
 const open=seg(t,N[1]+0.1,N[1]+0.9);                         // painel abre
 W.hinge.rotation.x=-1.25*open;                                 // levanta para cima/frente
 const filtOut=seg(t,N[2]+0.15,N[2]+0.8)*(1-seg(t,N[3]+0.2,N[3]+0.8)); // filtro sai de frente da serpentina
 // filtro: posição normal (frente da serpentina) -> sai para baixo/frente (limpar) -> fica limpo
 const wash=seg(t,E.lave-0.3,E.lave+0.6)*(1-seg(t,N[5]-0.1,N[5]+0.2));
 const fx=-0.2-0.2*wash,fy=0.05-1.0*wash-0.0*filtOut,fz=0.2+0.55*wash+0.5*filtOut*(1-wash);
 W.filter.position.set(fx,fy-0.55*filtOut*(1-wash),fz);W.filter.rotation.x=0.9*wash;
 const dirt=1-seg(t,E.sabao+0.2,E.sabao+1.8);const dc=new T.Color('#e8f3fb').lerp(new T.Color('#7a6a55'),dirt);W.filterMat.color.copy(dc);
 W.filter.children.forEach((m,i)=>{if(i>0)m.material.color.copy(new T.Color('#aab4cc').lerp(new T.Color('#4b3f33'),dirt))});
 W.filter.visible=true;
 // gelo
 const iceUp=seg(t,E.gelo,E.gelo+1.0)*(1-0.5*seg(t,E.derrete,E.derrete+1.5))*(1-seg(t,E.ventilar+0.5,E.ventilar+2.0));
 const iceAgain=seg(t,E.gas-0.5,E.gas+0.5)*(t<tEnd?1:0)*0; // (só aviso no manômetro)
 W.ice.forEach((m,i)=>{m.scale.set(1,iceUp*(0.7+0.3*Math.sin(i*2.3)),1)});W.frost.material.opacity=0.55*iceUp;
 // bandeja enche e transborda
 const fill=seg(t,E.derrete,E.transborda)*(1-seg(t,E.ventilar+2.0,N[4]-0.1))+seg(t,E.dreno,E.dreno+1.6)*(1-seg(t,E.limpo+0.5,E.limpo+1.0))*0.9;
 W.wat.scale.y=Math.max(0.01,Math.min(1.4,0.05+fill*1.5));W.wat.position.y=0.02+W.wat.scale.y*0.05;
 const over=(t>=E.transborda&&t<E.ventilar+1.0)||(t>=E.dreno+0.6&&t<E.limpo+0.6);
 // entupimento no dreno
 W.clog.scale.setScalar(Math.max(0.001,eob((t-E.dreno)/0.4)))*1;W.clog.visible=t>=E.dreno&&t<tEnd;
 // ventilador
 const fanSpeed=(t>=E.ventilar&&t<N[4])?22:6;W.fan.rotation.z=-(t*fanSpeed);
 // ---------- gotas ----------
 const hook=t<N[1];const leakOn=hook?seg(t,0.3,1.0):0;
 // vazamento de dreno entupido pela lateral da bandeja
 const drip=hook?1:(over?1:0);
 W.drops.forEach((m,i)=>{const k=((t*1.25+i/14)%1);const onD=drip&&(hook?leakOn>0.01:true);
  const x=hook?1.55:(t>=E.dreno?0.0+((i%4)*0.4-0.6)+0:-0.2+(i%5)*0.3-0.5),y0=hook?-0.6:(t>=E.dreno?-0.2:-0.12);
  m.position.set(x,y0-k*k*(hook?1.8:1.4),hook?0.3:0.55);m.material.opacity=onD?(1-k*0.3):0});
 // poça no piso (gancho)
 const pu=hook?seg(t,0.8,N[1]-0.2):0;W.pud.scale.set(0.01+0.8*pu,1,0.01+0.45*pu);W.pud.position.x=1.55;W.pud.position.z=0.3;W.pud.visible=hook;
 W.sign.visible=hook&&t>=1.6;W.sign.scale.setScalar(eob((t-1.6)/0.4));
 // ar quente entrando / frio saindo
 const flow=t>=N[1]+0.6&&t<N[2]?1:0,flowLow=(t>=E.sujo)?0.25:1;
 W.air.forEach((m,i)=>{const k=((t*0.9+i*0.17)%1),warm=i<3;const op=flow*(warm?flowLow:flowLow*0.8);m.material.opacity=op*(1-k)*0.9;
  if(warm){m.position.set(-0.7+i*0.4,0.9-k*0.4,0.5);m.rotation.set(Math.PI,0,0)}else{m.position.set(-0.7+(i-3)*0.4,-0.7-k*0.5,0.5);m.rotation.set(Math.PI,0,0)}});
 // lavagem do filtro
 const sp=t>=E.lave&&t<N[5]-0.1;W.spray.forEach((m,i)=>{const k=((t*1.6+i*0.09)%1);m.material.opacity=sp?(1-k)*0.9:0;m.position.set(-0.45+(i%4)*0.16,-0.2-k*0.9+0.5,0.9+ (i%3)*0.05)});
 const bub=t>=E.sabao&&t<E.sabao+2.4;W.bubbles.forEach((m,i)=>{const k=((t*0.7+i*0.13)%1);m.material.opacity=bub?(1-k)*0.85:0;m.position.set(-0.65+(i%4)*0.17,-0.7+k*0.6,1.0+Math.sin(i)*0.1);m.scale.setScalar(0.6+k*0.8)});
 // dreno entupido: gotas a pingar no fim da mangueira param (já tratado) ; manômetro
 const gv=t>=N[5]&&t<tEnd;W.gauge.visible=gv;W.gauge.scale.setScalar(1.35*eob((t-N[5])/0.4));
 W.needle.rotation.z=lerp(1.2,-1.9,seg(t,E.gas-0.2,E.gas+0.9))+0.04*Math.sin(t*20)*(seg(t,E.gas,E.gas+1));
 W.rem.visible=t>=E.ventilar-0.3&&t<E.lave-0.1;W.rem.scale.setScalar(eob((t-E.ventilar+0.3)/0.4));W.remBtn.material.emissiveIntensity=0.7+0.5*Math.sin(t*10);
 // ---------- rótulos ----------
 const L=(id,txt,pos,bg,fg,a,s)=>c.label(id,txt,pos,{bg,fg,a,s});
 L('hook','VAZAMENTO!',new T.Vector3(1.55,-1.7,0.5),'#ff3b3b','#fff',hook?seg(t,1.0,1.3):0,eob((t-1.0)/0.3));
 L('fil','FILTRO SUJO',new T.Vector3(-0.2,0.7,0.5),'#ffb400','#0b0f1a',(t>=E.filtro&&t<N[2]+0.3)?seg(t,E.filtro,E.filtro+0.25)*(1-seg(t,N[2]+0.1,N[2]+0.3)):0,eob((t-E.filtro)/0.3));
 L('gelo','GELO',new T.Vector3(-0.2,0.6,0.4),'#bfe9ff','#0b0f1a',(t>=E.gelo&&t<E.derrete+0.4)?seg(t,E.gelo,E.gelo+0.25)*(1-seg(t,E.derrete+0.1,E.derrete+0.4)):0,eob((t-E.gelo)/0.3));
 L('trans','BANDEJA CHEIA',new T.Vector3(-0.2,-0.9,0.6),'#4db8ff','#0b0f1a',(t>=E.transborda&&t<N[3]-0.1)?seg(t,E.transborda,E.transborda+0.25):0,eob((t-E.transborda)/0.3));
 L('vent','SÓ VENTILAR',new T.Vector3(1.4,-0.5,1.3),'#2ecc71','#0b0f1a',(t>=E.ventilar&&t<E.lave-0.1)?seg(t,E.ventilar,E.ventilar+0.25)*(1-seg(t,E.lave-0.3,E.lave-0.1)):0,eob((t-E.ventilar)/0.3));
 L('san','ÁGUA E SABÃO NEUTRO',new T.Vector3(-0.8,-1.5,1.0),'#fff','#0b0f1a',(t>=E.lave&&t<N[4]-0.1)?seg(t,E.lave,E.lave+0.25):0,eob((t-E.lave)/0.3));
 L('dre','DRENO ENTUPIDO',new T.Vector3(1.9,-0.5,0.4),'#ff3b3b','#fff',(t>=E.dreno&&t<N[5]-0.1)?seg(t,E.dreno,E.dreno+0.25):0,eob((t-E.dreno)/0.3));
 L('gas','FALTA DE GÁS?',new T.Vector3(0.5,-0.7,1.0),'#ffb400','#0b0f1a',(t>=E.gas-0.3&&t<E.tecnico)?seg(t,E.gas-0.3,E.gas)*1:0,eob((t-E.gas+0.3)/0.3));
 L('tec','CHAME UM TÉCNICO',new T.Vector3(0.5,-0.7,1.0),'#2ecc71','#0b0f1a',(t>=E.tecnico&&t<tEnd-0.1)?seg(t,E.tecnico,E.tecnico+0.25):0,eob((t-E.tecnico)/0.3));
 // efeitos
 if(t<N[1]){c.shake=0.4}
 if(t>=N[1]&&t<N[1]+0.35)c.doFlash(N[1],0.8,0.35,'#fff');
 if(t>=E.gelo&&t<E.gelo+0.4)c.doFlash(E.gelo,0.18,0.3,'#bfe9ff');
 if(t>=E.transborda&&t<E.transborda+0.4){c.doFlash(E.transborda,0.2,0.3,'#4db8ff');c.shake=Math.max(c.shake,0.7)}
 if(t>=E.dreno&&t<E.dreno+0.4)c.doFlash(E.dreno,0.25,0.3,'#ff3b3b');
 if(t>=E.gas&&t<E.gas+0.5){c.doFlash(E.gas,0.22,0.3,'#ffb400');c.shake=Math.max(c.shake,0.6)}
 c.vig=0.22;
 // fim: o engine cobre com o cartão
}
return{init,render,keywords}})();
