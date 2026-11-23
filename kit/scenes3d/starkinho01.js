// Série "Starkinho, o Eletricista" – EP 01 "O chuveiro que derruba o disjuntor".
// Cenário: banheiro simples (dona Maria + chuveiro) e corredor com o quadro de disjuntores.
// Personagens cartoon 3D simples, peças sem marca e SEM valores (corrente/bitola) nos rótulos.
window.SCENE=(function(){
let W={};
const keywords=['chuveiro','luz','cai','disjuntor','desarmou','errada','maior','ligação','ligacao','comenta','a','b','starkinho','desligar','conferir'];
const title='';
const brand='full';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
const FLOOR=-2.5;
// quem fala em cada fala do spec: M = dona Maria, S = Starkinho
const SPK=['M','S','S','S','S','S','S','S'];
function tex(T,w,h,draw){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');draw(g,w,h);const t=new T.CanvasTexture(cv);t.anisotropy=4;return t}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}

function init(c){
 const {THREE,scene,renderer}=c,T=THREE;W.T=T;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 scene.background=new T.Color('#1a2233');
 W.hemi=new T.HemisphereLight('#fff6e8','#5a4634',0.85);scene.add(W.hemi);
 const key=W.key=new T.DirectionalLight('#fff1dc',1.15);key.position.set(3,7,8);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-9,right:9,top:7,bottom:-5,near:1,far:30});key.shadow.bias=-0.0005;scene.add(key);
 W.bathL=new T.PointLight('#ffe9c4',0.9,12);W.bathL.position.set(-3,3.2,2.2);scene.add(W.bathL);
 W.hallL=new T.PointLight('#ffe9c4',0.7,12);W.hallL.position.set(3,3.2,2.4);scene.add(W.hallL);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,roughness:.55,metalness:.02},o));
 const add=(m,p,x,y,z)=>{m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;(p||scene).add(m);return m};
 const box=(w,h,d,col,x=0,y=0,z=0,p,o)=>add(new T.Mesh(new T.BoxGeometry(w,h,d),M(col,o)),p,x,y,z);
 const cyl=(r1,r2,h,col,x=0,y=0,z=0,p,o,s=24)=>add(new T.Mesh(new T.CylinderGeometry(r1,r2,h,s),M(col,o)),p,x,y,z);
 const sph=(r,col,x=0,y=0,z=0,p,o,s=28)=>add(new T.Mesh(new T.SphereGeometry(r,s,Math.round(s*0.75)),M(col,o)),p,x,y,z);
 const cap=(r,l,col,x=0,y=0,z=0,p,o)=>add(new T.Mesh(new T.CapsuleGeometry(r,l,8,18),M(col,o)),p,x,y,z);
 W.M=M;

 // ---------- banheiro (x<0) ----------
 const tile=tex(T,512,512,(g,w,h)=>{g.fillStyle='#cfe7ee';g.fillRect(0,0,w,h);g.strokeStyle='#a9c9d3';g.lineWidth=5;for(let i=0;i<=8;i++){g.beginPath();g.moveTo(i*64,0);g.lineTo(i*64,h);g.stroke();g.beginPath();g.moveTo(0,i*64);g.lineTo(w,i*64);g.stroke()}});tile.wrapS=tile.wrapT=T.RepeatWrapping;tile.repeat.set(2.4,2.4);
 add(new T.Mesh(new T.BoxGeometry(7,8,0.3),new T.MeshStandardMaterial({map:tile,roughness:.35})),scene,-3.6,1.5,-0.35);
 const ftile=tex(T,512,512,(g,w,h)=>{g.fillStyle='#e9edf2';g.fillRect(0,0,w,h);for(let y=0;y<8;y++)for(let x=0;x<8;x++){if((x+y)%2){g.fillStyle='#c8d0dc';g.fillRect(x*64,y*64,64,64)}}});ftile.wrapS=ftile.wrapT=T.RepeatWrapping;ftile.repeat.set(3,3);
 add(new T.Mesh(new T.BoxGeometry(7,0.3,7),new T.MeshStandardMaterial({map:ftile,roughness:.5})),scene,-3.6,FLOOR-0.15,3.0);
 // box de vidro e cortina
 box(0.06,4.6,0.06,'#c9d2df',-1.6,-0.2,2.2,null,{metalness:.7,roughness:.3});
 box(3.6,0.06,0.06,'#c9d2df',-3.4,2.1,2.2,null,{metalness:.7,roughness:.3});
 const curt=add(new T.Mesh(new T.BoxGeometry(1.0,3.9,0.04),M('#ffd84d',{roughness:.8})),scene,-4.9,0.15,2.2);
 for(let i=0;i<5;i++)box(0.04,3.9,0.06,'#f0c030',-5.35+i*0.22,0.15,2.23);
 // chuveiro elétrico genérico (sem marca)
 const SH=W.sh=new T.Group();SH.position.set(-3.0,2.6,0.05);scene.add(SH);
 cyl(0.06,0.06,0.9,'#e8ecf2',0,0.5,-0.1,SH,{roughness:.3});
 const arm=cyl(0.05,0.05,0.6,'#e8ecf2',0,0.95,0.15,SH,{roughness:.3});arm.rotation.x=Math.PI/2;
 cyl(0.42,0.5,0.45,'#f7f8fa',0,0.1,0.45,SH,{roughness:.25});
 cyl(0.5,0.46,0.08,'#dfe4ec',0,-0.15,0.45,SH,{roughness:.3});
 W.shLed=sph(0.05,'#ff6a2a',0.32,0.18,0.86,SH,{emissive:'#ff6a2a',emissiveIntensity:1.2});
 // água (riscos animados) e vapor
 W.drops=[];for(let i=0;i<70;i++){const a=Math.random()*Math.PI*2,r=Math.random()*0.42;const m=new T.Mesh(new T.CylinderGeometry(0.012,0.012,0.28,5),new T.MeshStandardMaterial({color:'#9fd4ff',transparent:true,opacity:.75,roughness:.1,emissive:'#3a7bd5',emissiveIntensity:.25}));m.userData={x:-3.0+Math.cos(a)*r,z:0.5+Math.sin(a)*r,o:Math.random(),sp:5+Math.random()*2,dx:Math.cos(a)*0.12,dz:Math.sin(a)*0.12};scene.add(m);W.drops.push(m)}
 const puff=tex(T,128,128,(g,w,h)=>{const gr=g.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,w,h)});
 W.steam=[];for(let i=0;i<22;i++){const m=new T.Sprite(new T.SpriteMaterial({map:puff,transparent:true,opacity:0,depthWrite:false}));m.userData={o:Math.random(),x:-3.0+(Math.random()-0.5)*1.4,z:0.6+(Math.random()-0.5)*1.0};scene.add(m);W.steam.push(m)}
 // ralo, tapete, toalheiro
 cyl(0.18,0.18,0.02,'#9aa3b4',-3.0,FLOOR+0.01,0.6,null,{metalness:.7});
 box(1.3,0.03,0.8,'#5bb8a6',-0.9,FLOOR+0.015,3.0);
 box(1.2,0.05,0.05,'#c9d2df',-5.2,1.1,-0.15,null,{metalness:.7});box(0.9,1.1,0.04,'#ff7aa8',-5.2,0.55,-0.13);
 // luminária do teto do banheiro

 // ---------- divisória / porta ----------
 box(0.35,8,0.5,'#efe3cc',0.05,1.5,-0.25);
 box(0.25,4.9,0.35,'#8a5a2f',-0.12,-0.05,0.0);box(0.25,4.9,0.35,'#8a5a2f',0.22,-0.05,0.0);

 // ---------- corredor (x>0) ----------
 const paint=tex(T,256,256,(g,w,h)=>{g.fillStyle='#f1e2c4';g.fillRect(0,0,w,h);for(let i=0;i<900;i++){g.fillStyle=`rgba(150,120,80,${Math.random()*0.05})`;g.fillRect(Math.random()*w,Math.random()*h,2,2)}});paint.wrapS=paint.wrapT=T.RepeatWrapping;paint.repeat.set(3,3);
 add(new T.Mesh(new T.BoxGeometry(8,8,0.3),new T.MeshStandardMaterial({map:paint,roughness:.9})),scene,4.2,1.5,-0.35);
 const wood=tex(T,512,512,(g,w,h)=>{g.fillStyle='#b07a45';g.fillRect(0,0,w,h);for(let i=0;i<8;i++){g.fillStyle='rgba(80,45,20,.45)';g.fillRect(0,i*64,w,3)}for(let i=0;i<60;i++){g.fillStyle=`rgba(90,55,25,${0.08+Math.random()*0.12})`;g.fillRect(0,Math.random()*h,w,1+Math.random()*2)}});wood.wrapS=wood.wrapT=T.RepeatWrapping;wood.repeat.set(3,3);
 add(new T.Mesh(new T.BoxGeometry(8,0.3,7),new T.MeshStandardMaterial({map:wood,roughness:.7})),scene,4.2,FLOOR-0.15,3.0);
 box(8,0.3,0.08,'#8a5a2f',4.2,FLOOR+0.15,-0.18);
 // quadrinho e planta
 box(1.1,0.8,0.05,'#6b4a2f',5.9,1.7,-0.18);box(0.95,0.65,0.03,'#9fd0e6',5.9,1.7,-0.15);box(0.95,0.25,0.03,'#7ab05a',5.9,1.5,-0.13);
 cyl(0.3,0.24,0.55,'#e07a3f',6.6,FLOOR+0.28,0.6);for(let i=0;i<6;i++){const lf=box(0.12,0.9,0.28,'#3fa14f',6.6+Math.cos(i*1.1)*0.2,FLOOR+1.0,0.6+Math.sin(i*1.1)*0.2);lf.rotation.z=Math.cos(i*1.1)*0.45;lf.rotation.x=Math.sin(i*1.1)*0.45}

 // ---------- quadro de disjuntores (base qdc3d, simplificado) ----------
 const P=W.P=new T.Group();P.position.set(3.2,0.55,-0.2);scene.add(P);
 box(1.7,2.0,0.28,'#e3e7ee',0,0,0.14,P,{roughness:.4});
 box(1.5,1.8,0.04,'#c9cfd9',0,0,0.27,P);
 box(1.4,0.22,0.04,'#b9c1cf',0,0.15,0.3,P,{metalness:.6,roughness:.35});
 const lab=(txt,bg,fg,w=256,h=96,fs=40)=>tex(T,w,h,(g,W_,H_)=>{g.fillStyle=bg;g.fillRect(0,0,W_,H_);g.fillStyle=fg;g.font=`900 ${fs}px Arial`;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,W_/2,H_/2+2)});
 function breaker(mods,x,name){const g=new T.Group();g.position.set(x,0.15,0.32);P.add(g);const w=0.17*mods-0.01;
  box(w,0.6,0.22,'#eef0f4',0,0,0.08,g,{roughness:.3});box(w*0.9,0.34,0.03,'#f8f9fb',0,0.02,0.2,g);
  box(w*0.7,0.16,0.03,'#161a22',0,-0.02,0.215,g);
  const lv=new T.Group();lv.position.set(0,-0.02,0.23);g.add(lv);box(0.1*Math.max(1,mods*0.9),0.11,0.07,'#101319',0,0.0,0.03,lv);
  const st=new T.Mesh(new T.PlaneGeometry(0.3,0.11),new T.MeshBasicMaterial({map:lab(name,'#ffd400','#10151f',256,96,name.length>7?30:38)}));st.position.set(0,-0.48,0.09);st.rotation.z=Math.PI/2*0;g.add(st);
  st.scale.set(Math.min(1,0.17*mods/0.3*1.0)+0.0,1,1);
  return {g,lv,st}}
 W.br=[breaker(2,-0.5,'GERAL'),breaker(1,-0.18,'LUZ'),breaker(1,0.0,'TOMADAS'),breaker(1,0.18,'COZINHA'),breaker(1,0.36,'CHUVEIRO'),breaker(1,0.54,'RESERVA')];
 // etiquetas por baixo maiores (legíveis): faixa de nomes
 W.names=tex(T,1024,128,(g,w,h)=>{g.fillStyle='#ffd400';g.fillRect(0,0,w,h)});
 // porta do quadro
 W.door=new T.Group();W.door.position.set(0.85,0,0.3);P.add(W.door);
 box(1.7,2.0,0.05,'#f2f4f8',-0.85,0,0.0,W.door,{roughness:.35});box(0.08,0.25,0.06,'#9aa3b4',-1.55,0,0.04,W.door);
 const warn=new T.Mesh(new T.PlaneGeometry(0.42,0.38),new T.MeshBasicMaterial({map:tex(T,256,232,(g,w,h)=>{g.fillStyle='#ffd400';g.beginPath();g.moveTo(w/2,8);g.lineTo(w-8,h-8);g.lineTo(8,h-8);g.closePath();g.fill();g.strokeStyle='#10151f';g.lineWidth=14;g.stroke();g.fillStyle='#10151f';g.beginPath();g.moveTo(w*0.55,h*0.3);g.lineTo(w*0.4,h*0.62);g.lineTo(w*0.52,h*0.62);g.lineTo(w*0.45,h*0.86);g.lineTo(w*0.62,h*0.52);g.lineTo(w*0.5,h*0.52);g.closePath();g.fill()}),transparent:true}));warn.position.set(-0.85,0.35,0.03);W.door.add(warn);

 // ---------- personagens ----------
 function person(o){
  const g=new T.Group();scene.add(g);const P_={g};
  const hips=new T.Group();hips.position.y=0.95;g.add(hips);P_.hips=hips;
  // pernas
  P_.legs=[-1,1].map(s=>{const l=new T.Group();l.position.set(s*0.2,0,0);hips.add(l);cap(0.13,0.5,o.pants,0,-0.42,0,l);const sh=box(0.26,0.16,0.4,o.shoe,0,-0.86,0.08,l);sh.geometry=new T.CapsuleGeometry(0.11,0.18,6,12);sh.rotation.x=Math.PI/2;return l});
  // tronco
  const torso=new T.Group();torso.position.y=0.05;hips.add(torso);P_.torso=torso;
  const body=cap(0.42,0.45,o.shirt,0,0.5,0,torso);body.scale.set(1,1,0.82);P_.body=body;
  if(o.belt){cyl(0.43,0.43,0.12,o.belt,0,0.12,0,torso).scale.set(1,1,0.84);box(0.2,0.24,0.12,'#7a4b25',0.32,0.0,0.24,torso);cyl(0.03,0.02,0.32,'#ff8a3d',0.28,0.12,0.3,torso);cyl(0.02,0.02,0.2,'#c9d4f0',0.36,0.1,0.3,torso)}
  if(o.patch){const pt=new T.Mesh(new T.PlaneGeometry(0.36,0.16),new T.MeshBasicMaterial({map:o.patch}));pt.position.set(-0.17,0.72,0.36);pt.rotation.y=-0.25;torso.add(pt)}
  if(o.stripe){const s1=cyl(0.425,0.425,0.06,o.stripe,0,0.38,0,torso);s1.scale.set(1,1,0.83)}
  // braços (pivô no ombro)
  P_.arms=[-1,1].map(s=>{const a=new T.Group();a.position.set(s*0.48,0.85,0);torso.add(a);const up=cap(0.11,0.42,o.sleeve||o.shirt,0,-0.25,0,a);const fore=new T.Group();fore.position.set(0,-0.48,0);a.add(fore);cap(0.1,0.3,o.skin,0,-0.2,0,fore);sph(0.13,o.skin,0,-0.42,0,fore);if(o.cuff)cyl(0.115,0.115,0.07,o.cuff,0,-0.05,0,a);a.userData.fore=fore;return a});
  // cabeça
  const head=new T.Group();head.position.y=1.42;torso.add(head);P_.head=head;
  sph(0.56,o.skin,0,0.0,0,head);
  sph(0.1,o.skin,-0.55,-0.02,0,head).scale.set(0.6,1,1);sph(0.1,o.skin,0.55,-0.02,0,head).scale.set(0.6,1,1);
  sph(0.075,o.nose||o.skin,0,-0.06,0.56,head);
  P_.eyes=[-1,1].map(s=>{const e=new T.Group();e.position.set(s*0.2,0.1,0.47);head.add(e);sph(0.13,'#ffffff',0,0,0,e,{roughness:.2});const pu=sph(0.07,'#1b1410',0,0,0.08,e,{roughness:.1});sph(0.025,'#ffffff',0.03,0.03,0.14,e,{roughness:.1,emissive:'#ffffff',emissiveIntensity:.5});e.userData.pu=pu;return e});
  P_.brows=[-1,1].map(s=>{const b=box(0.18,0.04,0.04,o.brow,s*0.2,0.3,0.52,head);return b});
  const mouth=new T.Group();mouth.position.set(0,-0.24,0.5);head.add(mouth);P_.mouth=mouth;
  const mo=sph(0.12,'#5a1f1f',0,0,0,mouth,{roughness:.8});mo.scale.set(1,0.25,0.4);P_.mo=mo;
  const smile=new T.Mesh(new T.TorusGeometry(0.12,0.022,8,20,Math.PI),M('#5a1f1f'));smile.rotation.z=Math.PI;smile.position.set(0,0.05,0.02);mouth.add(smile);P_.smile=smile;
  if(o.decorate)o.decorate(head,{box,cyl,sph,cap,M});
  return P_}
 const patch=tex(T,256,112,(g,w,h)=>{g.fillStyle='#0f1c3a';g.fillRect(0,0,w,h);rr(g,6,6,w-12,h-12,16);g.fillStyle='#ffc400';g.fill();g.fillStyle='#0f1c3a';g.font='900 58px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('STARK',w/2,h/2+3)});
 W.S=person({skin:'#b7794f',shirt:'#1d3a7a',sleeve:'#1d3a7a',cuff:'#ffc400',stripe:'#ffc400',pants:'#2b303b',shoe:'#1a1a1a',brow:'#2a1a10',belt:'#5a3a1e',patch,
  decorate:(h,{box,cyl,sph})=>{
   // boné azul com aba amarela
   const capTop=new T.Mesh(new T.SphereGeometry(0.59,28,14,0,Math.PI*2,0,Math.PI/2),M('#1d3a7a'));capTop.position.set(0,0.2,-0.02);capTop.scale.set(1,0.8,1);capTop.castShadow=true;h.add(capTop);
   const brim=cyl(0.34,0.34,0.05,'#ffc400',0,0.24,0.48,h);brim.scale.set(1,1,0.75);brim.rotation.x=0.12;
   sph(0.07,'#ffc400',0,0.66,0,h);
   const front=new T.Mesh(new T.PlaneGeometry(0.34,0.15),new T.MeshBasicMaterial({map:tex(T,256,112,(g,w,hh)=>{g.fillStyle='#1d3a7a';g.fillRect(0,0,w,hh);g.fillStyle='#ffc400';g.font='900 64px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('S',w/2,hh/2+4)}),transparent:false}));front.position.set(0,0.42,0.47);front.rotation.x=-0.45;h.add(front);
   // cabelo nas laterais
   sph(0.2,'#2a1a10',-0.45,0.05,-0.1,h).scale.set(0.6,1,1.2);sph(0.2,'#2a1a10',0.45,0.05,-0.1,h).scale.set(0.6,1,1.2);
  }});
 W.Mr=person({skin:'#d9a273',shirt:'#b58ad6',sleeve:'#b58ad6',pants:'#b58ad6',shoe:'#ff8fb3',brow:'#8a8a8a',nose:'#d39465',
  decorate:(h,{box,cyl,sph})=>{
   // toalha enrolada na cabeça (turbante rosa)
   for(let i=0;i<3;i++){const tr=new T.Mesh(new T.TorusGeometry(0.42-i*0.09,0.17-i*0.02,12,28),M('#ff7aa8',{roughness:.9}));tr.rotation.x=Math.PI/2-0.25;tr.position.set(0,0.42+i*0.16,-0.04);h.add(tr);tr.castShadow=true}
   sph(0.16,'#ff7aa8',0.08,0.85,-0.05,h,{roughness:.9});
   // cabelo grisalho aparecendo
   sph(0.16,'#c9c9c9',-0.46,0.02,-0.15,h).scale.set(0.6,1,1.2);sph(0.16,'#c9c9c9',0.46,0.02,-0.15,h).scale.set(0.6,1,1.2);
   // óculos
   [-1,1].forEach(s=>{const r=new T.Mesh(new T.TorusGeometry(0.15,0.02,8,24),M('#6a3d9a'));r.position.set(s*0.2,0.1,0.6);h.add(r)});box(0.12,0.02,0.02,'#6a3d9a',0,0.12,0.6,h);
   // bochechas
   sph(0.08,'#f08f8f',-0.33,-0.12,0.42,h,{roughness:1}).scale.set(1,0.6,0.5);sph(0.08,'#f08f8f',0.33,-0.12,0.42,h,{roughness:1}).scale.set(1,0.6,0.5);
  }});
 // roupão: saia larga
 const robe=new T.Mesh(new T.CylinderGeometry(0.44,0.6,0.8,24),M('#b58ad6',{roughness:.9}));robe.position.set(0,-0.15,0);robe.castShadow=true;W.Mr.hips.add(robe);
 cyl(0.45,0.45,0.08,'#8e63b5',0,0.15,0,W.Mr.torso).scale.set(1,1,0.84);
 // bolhas de pensamento e cartões A / B
 W.think=new T.Group();scene.add(W.think);W.puffs=[0.12,0.18,0.25].map((r,i)=>sph(r,'#ffffff',0.25+i*0.22,0.3+i*0.42,0,W.think,{roughness:.6}));
 const card=(L,txt1,txt2,col)=>{const t=tex(T,640,420,(g,w,h)=>{rr(g,8,8,w-16,h-16,48);g.fillStyle='#ffffff';g.fill();g.lineWidth=12;g.strokeStyle='#0b0f1a';g.stroke();g.fillStyle=col;g.beginPath();g.arc(118,h/2,82,0,7);g.fill();g.fillStyle='#ffffff';g.font='900 120px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(L,118,h/2+6);g.fillStyle='#0b0f1a';g.textAlign='left';g.font='900 64px Arial';g.fillText(txt1,222,h/2-44);g.fillText(txt2,222,h/2+44)});const m=new T.Mesh(new T.PlaneGeometry(1.9,1.25),new T.MeshBasicMaterial({map:t,transparent:true}));scene.add(m);return m};
 W.cardA=card('A','DISJUNTOR','MAIOR','#e03c5a');
 W.cardB=card('B','DESLIGAR E','CONFERIR','#1fa85a');
 W.q=new T.Mesh(new T.PlaneGeometry(0.6,0.8),new T.MeshBasicMaterial({map:tex(T,160,220,(g,w,h)=>{g.font='900 200px Arial';g.textAlign='center';g.textBaseline='middle';g.lineWidth=16;g.strokeStyle='#0b0f1a';g.strokeText('?',w/2,h/2+10);g.fillStyle='#ffc400';g.fillText('?',w/2,h/2+10)}),transparent:true}));scene.add(W.q);
 W.brr=new T.Mesh(new T.PlaneGeometry(1.2,0.5),new T.MeshBasicMaterial({map:tex(T,400,160,(g,w,h)=>{g.font='italic 900 110px Arial';g.textAlign='center';g.textBaseline='middle';g.lineWidth=16;g.strokeStyle='#0b0f1a';g.strokeText('BRRR!',w/2,h/2);g.fillStyle='#9fd4ff';g.fillText('BRRR!',w/2,h/2)}),transparent:true}));scene.add(W.brr);
}

// ---------- animação ----------
function talk(P,t,c,who){const {TL}=c;let open=0;for(let i=0;i<TL.ST.length;i++){if(SPK[i]!==who)continue;const a=TL.ST[i],b=a+TL.DU[i];if(t>=a&&t<=b)open=0.35+0.65*Math.abs(Math.sin((t-a)*13))*Math.min(1,(b-t)*6)}
 P.mo.scale.set(1,0.25+open*1.1,0.4);P.smile.visible=open<0.2}
function blink(P,t,ph){const k=((t+ph)%3.3);const s=k<0.12?Math.max(0.1,Math.abs(k-0.06)/0.06):1;P.eyes.forEach(e=>e.scale.y=s)}
function pose(P,{la=0,ra=0,lf=0,rf=0,laz=0,raz=0}){P.arms[0].rotation.x=-la;P.arms[1].rotation.x=-ra;P.arms[0].rotation.z=-0.12-laz;P.arms[1].rotation.z=0.12+raz;P.arms[0].userData.fore.rotation.x=-lf;P.arms[1].userData.fore.rotation.x=-rf}
function walk(P,ph,amt){P.legs[0].rotation.x=Math.sin(ph)*0.55*amt;P.legs[1].rotation.x=-Math.sin(ph)*0.55*amt;P.hips.position.y=0.95+Math.abs(Math.cos(ph))*0.06*amt}
function K(c){const {N,E,TL}=c,tEnd=N[TL.END];const D=E.disjuntor;return [
 [0,            [-2.6,0.9,11.8],[-2.6,-0.6,0]],
 [E.cai+0.2,    [-2.5,0.8,10.6],[-2.5,-0.5,0]],
 [N[1]-0.15,    [-2.3,0.8,10.4],[-2.3,-0.5,0]],
 [N[1]+0.6,     [0.6,1.0,14.5],[0.6,-0.5,0]],
 [N[2]-0.1,     [1.2,1.0,13.8],[1.2,-0.5,0]],
 [E.olha+0.3,   [2.9,1.1,8.6],[3.0,0.0,0]],
 [D-0.05,       [3.15,0.9,5.6],[3.2,0.2,0]],
 [D+0.5,        [3.3,0.8,4.6],[3.35,0.3,0]],
 [E.denovo+0.6, [3.3,0.8,4.5],[3.35,0.3,0]],
 [E.errada-0.1, [1.5,1.2,12.6],[1.4,0.0,0]],
 [N[4],         [1.55,1.3,12.8],[1.55,0.2,0]],
 [N[6],         [1.4,1.2,13.6],[1.4,0.1,0]],
 [tEnd-0.05,    [1.4,1.2,13.0],[1.4,0.1,0]],
 [1e9,          [1.4,1.2,13.0],[1.4,0.1,0]]]}
function camPose(c){const k=K(c),t=c.tn;let i=0;while(i<k.length-2&&t>=k[i+1][0])i++;const a=k[i],b=k[i+1],dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));return {p:a[1].map((v,j)=>lerp(v,b[1][j],f)),l:a[2].map((v,j)=>lerp(v,b[2][j],f))}}
function render(c){
 const {THREE,N,E,seg,eob,tn:t,camera,TL}=c,T=THREE,tEnd=N[TL.END];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // ---- estado do chuveiro / disjuntor ----
 // energizado: até cair (E.cai), religa em E.religar+0.35, cai de novo em E.denovo-0.15
 const tTrip1=E.cai-0.1,tOn2=E.religar+0.35,tTrip2=E.denovo-0.15;
 const powered=(t<tTrip1)||(t>=tOn2&&t<tTrip2);
 const waterOn=t>=E.ligo-0.2; // água segue saindo (fria quando o chuveiro desarma)
 const lvUp=powered;
 W.br.forEach((b,i)=>{b.lv.rotation.x=0;b.lv.position.y=(i===4?(lvUp?0.03:-0.05):0.03)});
 W.shLed.material.emissiveIntensity=powered?1.4:0;W.shLed.material.color.set(powered?'#ff6a2a':'#5a5f6a');
 W.drops.forEach(d=>{const u=d.userData;const k=((t*u.sp/4.2)+u.o)%1;d.visible=waterOn;d.position.set(u.x+u.dx*k*3,2.35-k*4.7,u.z+u.dz*k*3);d.material.color.set(powered?'#ffd9b0':'#8fd0ff');d.material.emissive.set(powered?'#d5763a':'#3a7bd5')});
 const hot=powered&&waterOn?1:0;const hotA=t<tTrip1?seg(t,E.ligo,E.ligo+0.6):(t<tOn2?Math.max(0,1-(t-tTrip1)/0.6):(t<tTrip2?seg(t,tOn2,tOn2+0.8):Math.max(0,1-(t-tTrip2)/0.6)));
 W.steam.forEach(s=>{const u=s.userData;const k=((t*0.35)+u.o)%1;s.position.set(u.x+Math.sin(k*6+u.o*9)*0.2,-1.6+k*4.4,u.z);s.scale.setScalar(0.8+k*1.8);s.material.opacity=0.45*hotA*Math.sin(k*Math.PI)});
 // luzes: só um "pisca" no momento em que desarma (a luz do cômodo não depende do chuveiro)
 [tTrip1,tTrip2].forEach(t0=>{if(t>=t0&&t<t0+0.35)c.doFlash(t0,0.55,0.35,'#000')});
 if(t>=tOn2&&t<tOn2+0.3)c.doFlash(tOn2,0.18,0.3,'#fff');
 // ---- dona Maria ----
 const Mr=W.Mr;const mx0=-2.2,mx1=-0.75;const mw=seg(t,N[2]-0.2,N[2]+1.4);
 Mr.g.position.set(lerp(mx0,mx1,mw),FLOOR,lerp(1.3,1.9,mw));
 Mr.g.rotation.y=(mw>0&&mw<1)?1.2:lerp(0.25,0.45,mw);
 walk(Mr,t*9,(mw>0&&mw<1)?1:0);
 if(t<E.ligo){pose(Mr,{la:0.2,ra:1.9,rf:0.5,raz:0.2})}                     // mão no registro
 else if(t<tTrip1+0.1){pose(Mr,{la:0.1,ra:1.2,rf:0.3})}
 else if(t<N[1]){const w=Math.sin(t*14)*0.25;pose(Mr,{la:2.6+w,ra:2.6-w,laz:0.4,raz:0.4,lf:0.3,rf:0.3})}   // braços pro alto
 else if(t<N[2]){pose(Mr,{la:0.9,ra:0.9,laz:-0.5,raz:-0.5,lf:1.6,rf:1.6})} // braços cruzados
 else {pose(Mr,{la:0.5,ra:0.5,laz:-0.3,raz:-0.3,lf:1.9,rf:1.9})}
 const shiver=(t>=tTrip1&&t<N[1])?Math.sin(t*70)*0.04:0;Mr.torso.rotation.z=shiver;Mr.head.rotation.z=shiver*1.5+(t>=N[4]?Math.sin(t*2)*0.06:0);
 Mr.brows.forEach((b,i)=>{b.rotation.z=(t>=tTrip1&&t<N[1]+0.5)?(i?-0.4:0.4):(i?0.15:-0.15)});
 talk(Mr,t,c,'M');blink(Mr,t,0.7);
 W.brr.visible=t>=tTrip1+0.2&&t<N[1]-0.05;W.brr.position.set(-2.2+0.9,1.6+Math.sin(t*20)*0.03,2.0);W.brr.scale.setScalar(eob((t-tTrip1-0.2)/0.25));
 // ---- Starkinho ----
 const S=W.S;const sIn=seg(t,N[1]-0.5,N[1]+0.9);const toP=seg(t,N[2]-0.1,E.olha+0.4);const back=seg(t,E.errada-0.5,E.errada+0.3);
 let sx=lerp(6.5,1.2,sIn),sz=lerp(2.6,1.9,sIn);sx=lerp(sx,1.75,toP);sz=lerp(sz,1.5,toP);sx=lerp(sx,1.6,back);sz=lerp(sz,1.9,back);
 const hop=(t>=tTrip2&&t<tTrip2+0.45)?Math.sin((t-tTrip2)/0.45*Math.PI)*0.35:0;
 S.g.position.set(sx,FLOOR+hop,sz);
 const moving=(sIn>0&&sIn<1)||(toP>0&&toP<1)||(back>0&&back<1);
 walk(S,t*10,moving?1:0);
 let ry=0;if(sIn>0&&sIn<1)ry=-1.3;else if(t<N[2])ry=-0.5;if(toP>0)ry=toP<1?0.6:2.6;if(t>=E.disjuntor-0.2&&back<=0)ry=2.75;if(back>0)ry=back<1?-0.8:0.0;
 S.g.rotation.y=ry;
 S.head.rotation.x=0;S.head.rotation.z=0;
 if(t<N[1]+0.9){pose(S,{la:0.1,ra:0.1})}
 else if(t<N[2]){const k=seg(t,E.deixa,E.deixa+0.3);pose(S,{la:0.1,ra:2.4*k,rf:0.9*k,raz:0.1})}           // joinha
 else if(t<E.religar){const k=seg(t,E.olha+0.3,E.olha+0.6);pose(S,{la:0.1,ra:1.5*k,rf:0.1})}              // aponta pro quadro
 else if(t<tTrip2){const k=seg(t,E.religar,E.religar+0.3);pose(S,{la:0.1,ra:1.7*k,rf:0.2*k})}           // religa
 else if(t<E.errada-0.3){pose(S,{la:1.2,ra:1.2,laz:0.5,raz:0.5,lf:0.8,rf:0.8})}                          // susto
 else if(t<N[4]){const sc=Math.sin(t*18)*0.15;pose(S,{la:0.1,ra:2.9+sc,rf:2.0,raz:0.35});S.head.rotation.z=0.12}   // coça a cabeça
 else if(t<N[6]){pose(S,{la:0.1,ra:2.5,rf:1.4,raz:0.2});S.head.rotation.z=-0.1+Math.sin(t*1.5)*0.05}                 // dedo pra cima, pensando
 else {const k=seg(t,E.comenta-0.3,E.comenta);pose(S,{la:0.2+1.2*k,ra:1.3,rf:0.2,laz:0.6*k,lf:0.6*k})}                 // aponta pra câmera
 S.brows.forEach((b,i)=>{b.rotation.z=(t>=E.errada-0.3&&t<N[6])?(i?0.3:-0.15):0;b.position.y=0.3+((t>=tTrip2&&t<E.errada)?0.06:0)});
 talk(S,t,c,'S');blink(S,t,0.0);
 // ---- porta do quadro ----
 W.door.rotation.y=1.9*seg(t,E.olha,E.olha+0.7);
 // ---- "?" e pensamento ----
 const hp=S.g.position;
 W.q.visible=t>=E.errada-0.2&&t<N[4]+0.2;W.q.position.set(hp.x+0.6,hp.y+3.7+Math.sin(t*4)*0.06,hp.z);W.q.scale.setScalar(eob((t-E.errada+0.2)/0.3));
 const th=seg(t,N[4]-0.2,N[4]+0.3);W.think.visible=th>0&&t<N[6]+0.3;W.think.position.set(hp.x,hp.y+3.0,hp.z);W.puffs.forEach((p,i)=>p.scale.setScalar(Math.max(0.01,eob((t-N[4]+0.2-i*0.12)/0.25))));
 const aK=eob((t-E.A+0.15)/0.35),bK=eob((t-E.B+0.15)/0.35);
 W.cardA.visible=t>=E.A-0.15;W.cardB.visible=t>=E.B-0.15;
 const both=seg(t,N[6]-0.2,N[6]+0.4);
 W.cardA.position.set(lerp(hp.x+0.1,hp.x-1.0,Math.max(seg(t,E.B-0.4,E.B),both)),hp.y+4.6+Math.sin(t*2)*0.04,hp.z+0.1);W.cardA.scale.setScalar(Math.max(0.01,aK)*lerp(1,0.95,both));
 W.cardB.position.set(lerp(hp.x+1.05,hp.x+1.05,both),hp.y+4.6+Math.sin(t*2+1)*0.04,hp.z+0.12);W.cardB.scale.setScalar(Math.max(0.01,bK)*lerp(1,0.95,both));
 if(t>=N[6]){const p=0.5+0.5*Math.sin((t-N[6])*7);W.cardA.scale.multiplyScalar(1+0.04*p);W.cardB.scale.multiplyScalar(1+0.04*(1-p))}
 // ---- rótulos ----
 const Lb=(id,txt,pos,bg,fg,a,s)=>c.label(id,txt,pos,{bg,fg,a,s});
 const ch=W.br[4].g,cpos=new T.Vector3();ch.getWorldPosition(cpos);
 const dArm=(t>=E.disjuntor&&t<tOn2-0.05)||(t>=tTrip2+0.1&&t<E.errada-0.2);
 Lb('des',(t>=tTrip2)?'DESARMOU DE NOVO!':'DESARMADO',cpos.clone().add(new T.Vector3(0,0.55,0.3)),'#e03c5a','#fff',dArm?1:0,eob((t-(t>=tTrip2?tTrip2+0.1:E.disjuntor))/0.3));
 Lb('lig','LIGADO',cpos.clone().add(new T.Vector3(0,0.55,0.3)),'#1fa85a','#fff',(t>=tOn2&&t<tTrip2)?1:0,eob((t-tOn2)/0.3));
 Lb('chu','CHUVEIRO',cpos.clone().add(new T.Vector3(0,-0.62,0.3)),'#ffc400','#10151f',(t>=E.disjuntor&&t<E.errada-0.2)?seg(t,E.disjuntor,E.disjuntor+0.3):0,1);
 Lb('cmt','COMENTA A OU B',new T.Vector3(hp.x,hp.y+3.2,hp.z),'#ffc400','#10151f',t>=E.comenta?seg(t,E.comenta,E.comenta+0.3):0,eob((t-E.comenta)/0.3));
 c.vig=0.3;
}
return{init,render,keywords,title,brand}})();
