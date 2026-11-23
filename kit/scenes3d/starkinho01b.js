// Série "Starkinho, o Eletricista" – EP 01 v2 (formato história, narração em 1ª pessoa).
// Sets: banheiro (x<0), corredor com quadro (0..8), porta da casa à noite (x≈20), oficina em flashback sépia (x≈40).
// Cortes secos entre planos, closes de emoção. Peças sem marca e SEM valores (corrente/bitola) nos rótulos.
window.SCENE=(function(){
let W={};
const keywords=['chuveiro','sozinho','acabou','pá','caiu','três','sumiram','fabiano','aviso','disjuntor','desarmado','maior','comprei','herói','a','b','comenta','starkinho','escondendo'];
const title='',brand='full';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
const FLOOR=-2.5,HIDE=-200;
// quem fala em cada fala do spec: S = Starkinho, M = dona Maria, F = Seu Fabiano
const SPK=['S','M','S','S','F','S','M','S','S','S','S'];
function tex(T,w,h,draw){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');draw(g,w,h);const t=new T.CanvasTexture(cv);t.anisotropy=4;return t}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}

function init(c){
 const {THREE,scene,renderer}=c,T=THREE;W.T=T;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 scene.background=new T.Color('#0c1222');
 W.hemi=new T.HemisphereLight('#9fb0de','#2a2018',0.75);scene.add(W.hemi);
 const key=W.key=new T.DirectionalLight('#c9d6ff',0.55);key.position.set(3,7,8);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-9,right:9,top:7,bottom:-5,near:1,far:30});key.shadow.bias=-0.0005;scene.add(key);key.target.position.set(0,0,0);scene.add(key.target);
 W.bathL=new T.PointLight('#ffd9a0',1.0,11);W.bathL.position.set(-3,3.0,2.4);scene.add(W.bathL);
 W.hallL=new T.PointLight('#ffd9a0',0.8,11);W.hallL.position.set(2.5,3.0,2.6);scene.add(W.hallL);
 W.flick=new T.PointLight('#ffe2b0',0,5);W.flick.position.set(3.0,0.6,1.0);scene.add(W.flick);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,roughness:.55,metalness:.02},o));
 const add=(m,p,x,y,z)=>{m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;(p||scene).add(m);return m};
 const box=(w,h,d,col,x=0,y=0,z=0,p,o)=>add(new T.Mesh(new T.BoxGeometry(w,h,d),M(col,o)),p,x,y,z);
 const cyl=(r1,r2,h,col,x=0,y=0,z=0,p,o,s=24)=>add(new T.Mesh(new T.CylinderGeometry(r1,r2,h,s),M(col,o)),p,x,y,z);
 const sph=(r,col,x=0,y=0,z=0,p,o,s=28)=>add(new T.Mesh(new T.SphereGeometry(r,s,Math.round(s*0.75)),M(col,o)),p,x,y,z);
 const cap=(r,l,col,x=0,y=0,z=0,p,o)=>add(new T.Mesh(new T.CapsuleGeometry(r,l,8,18),M(col,o)),p,x,y,z);
 const puff=tex(T,128,128,(g,w,h)=>{const gr=g.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,w,h)});

 // ================= banheiro (x<0) =================
 const tile=tex(T,512,512,(g,w,h)=>{g.fillStyle='#cfe7ee';g.fillRect(0,0,w,h);g.strokeStyle='#a9c9d3';g.lineWidth=5;for(let i=0;i<=8;i++){g.beginPath();g.moveTo(i*64,0);g.lineTo(i*64,h);g.stroke();g.beginPath();g.moveTo(0,i*64);g.lineTo(w,i*64);g.stroke()}});tile.wrapS=tile.wrapT=T.RepeatWrapping;tile.repeat.set(2.4,2.4);
 add(new T.Mesh(new T.BoxGeometry(7,8,0.3),new T.MeshStandardMaterial({map:tile,roughness:.35})),scene,-3.6,1.5,-0.35);
 const ftile=tex(T,512,512,(g,w,h)=>{g.fillStyle='#e9edf2';g.fillRect(0,0,w,h);for(let y=0;y<8;y++)for(let x=0;x<8;x++){if((x+y)%2){g.fillStyle='#c8d0dc';g.fillRect(x*64,y*64,64,64)}}});ftile.wrapS=ftile.wrapT=T.RepeatWrapping;ftile.repeat.set(3,3);
 add(new T.Mesh(new T.BoxGeometry(7,0.3,7),new T.MeshStandardMaterial({map:ftile,roughness:.5})),scene,-3.6,FLOOR-0.15,3.0);
 box(0.06,4.6,0.06,'#c9d2df',-1.6,-0.2,2.2,null,{metalness:.7,roughness:.3});box(3.6,0.06,0.06,'#c9d2df',-3.4,2.1,2.2,null,{metalness:.7,roughness:.3});
 add(new T.Mesh(new T.BoxGeometry(1.0,3.9,0.04),M('#ffd84d',{roughness:.8})),scene,-4.9,0.15,2.2);for(let i=0;i<5;i++)box(0.04,3.9,0.06,'#f0c030',-5.35+i*0.22,0.15,2.23);
 const SH=new T.Group();SH.position.set(-3.0,2.6,0.05);scene.add(SH);
 cyl(0.06,0.06,0.9,'#e8ecf2',0,0.5,-0.1,SH,{roughness:.3});const arm=cyl(0.05,0.05,0.6,'#e8ecf2',0,0.95,0.15,SH,{roughness:.3});arm.rotation.x=Math.PI/2;
 cyl(0.42,0.5,0.45,'#f7f8fa',0,0.1,0.45,SH,{roughness:.25});cyl(0.5,0.46,0.08,'#dfe4ec',0,-0.15,0.45,SH,{roughness:.3});
 W.shLed=sph(0.05,'#ff6a2a',0.32,0.18,0.86,SH,{emissive:'#ff6a2a',emissiveIntensity:1.2});
 W.drops=[];for(let i=0;i<70;i++){const a=Math.random()*Math.PI*2,r=Math.random()*0.42;const m=new T.Mesh(new T.CylinderGeometry(0.012,0.012,0.28,5),new T.MeshStandardMaterial({color:'#9fd4ff',transparent:true,opacity:.75,roughness:.1,emissive:'#3a7bd5',emissiveIntensity:.25}));m.userData={x:-3.0+Math.cos(a)*r,z:0.5+Math.sin(a)*r,o:Math.random(),sp:5+Math.random()*2,dx:Math.cos(a)*0.12,dz:Math.sin(a)*0.12};scene.add(m);W.drops.push(m)}
 W.steam=[];for(let i=0;i<22;i++){const m=new T.Sprite(new T.SpriteMaterial({map:puff,transparent:true,opacity:0,depthWrite:false}));m.userData={o:Math.random(),x:-3.0+(Math.random()-0.5)*1.4,z:0.6+(Math.random()-0.5)*1.0};scene.add(m);W.steam.push(m)}
 cyl(0.18,0.18,0.02,'#9aa3b4',-3.0,FLOOR+0.01,0.6,null,{metalness:.7});box(1.3,0.03,0.8,'#5bb8a6',-0.9,FLOOR+0.015,3.0);
 box(1.2,0.05,0.05,'#c9d2df',-5.2,1.1,-0.15,null,{metalness:.7});box(0.9,1.1,0.04,'#ff7aa8',-5.2,0.55,-0.13);
 // janela do banheiro: noite com lua
 box(1.3,1.0,0.06,'#f2f4f8',-1.9,2.3,-0.18);add(new T.Mesh(new T.PlaneGeometry(1.15,0.85),new T.MeshBasicMaterial({color:'#1b2a55'})),scene,-1.9,2.3,-0.14);
 add(new T.Mesh(new T.CircleGeometry(0.14,20),new T.MeshBasicMaterial({color:'#f5f0d0'})),scene,-1.6,2.45,-0.13);

 // ================= divisória / corredor (0..8) =================
 box(0.35,8,0.5,'#efe3cc',0.05,1.5,-0.25);box(0.25,4.9,0.35,'#8a5a2f',-0.12,-0.05,0.0);box(0.25,4.9,0.35,'#8a5a2f',0.22,-0.05,0.0);
 const paint=tex(T,256,256,(g,w,h)=>{g.fillStyle='#f1e2c4';g.fillRect(0,0,w,h);for(let i=0;i<900;i++){g.fillStyle=`rgba(150,120,80,${Math.random()*0.05})`;g.fillRect(Math.random()*w,Math.random()*h,2,2)}});paint.wrapS=paint.wrapT=T.RepeatWrapping;paint.repeat.set(3,3);
 add(new T.Mesh(new T.BoxGeometry(8,8,0.3),new T.MeshStandardMaterial({map:paint,roughness:.9})),scene,4.2,1.5,-0.35);
 const wood=tex(T,512,512,(g,w,h)=>{g.fillStyle='#b07a45';g.fillRect(0,0,w,h);for(let i=0;i<8;i++){g.fillStyle='rgba(80,45,20,.45)';g.fillRect(0,i*64,w,3)}for(let i=0;i<60;i++){g.fillStyle=`rgba(90,55,25,${0.08+Math.random()*0.12})`;g.fillRect(0,Math.random()*h,w,1+Math.random()*2)}});wood.wrapS=wood.wrapT=T.RepeatWrapping;wood.repeat.set(3,3);
 add(new T.Mesh(new T.BoxGeometry(8,0.3,7),new T.MeshStandardMaterial({map:wood,roughness:.7})),scene,4.2,FLOOR-0.15,3.0);
 box(8,0.3,0.08,'#8a5a2f',4.2,FLOOR+0.15,-0.18);
 box(1.1,0.8,0.05,'#6b4a2f',5.9,1.7,-0.18);box(0.95,0.65,0.03,'#9fd0e6',5.9,1.7,-0.15);box(0.95,0.25,0.03,'#7ab05a',5.9,1.5,-0.13);
 cyl(0.3,0.24,0.55,'#e07a3f',6.6,FLOOR+0.28,0.6);for(let i=0;i<6;i++){const lf=box(0.12,0.9,0.28,'#3fa14f',6.6+Math.cos(i*1.1)*0.2,FLOOR+1.0,0.6+Math.sin(i*1.1)*0.2);lf.rotation.z=Math.cos(i*1.1)*0.45;lf.rotation.x=Math.sin(i*1.1)*0.45}
 // quadro de disjuntores
 const P=W.P=new T.Group();P.position.set(3.2,0.55,-0.2);scene.add(P);
 box(1.7,2.0,0.28,'#e3e7ee',0,0,0.14,P,{roughness:.4});box(1.5,1.8,0.04,'#c9cfd9',0,0,0.27,P);box(1.4,0.22,0.04,'#b9c1cf',0,0.15,0.3,P,{metalness:.6,roughness:.35});
 const lab=(txt,bg,fg,w=256,h=96,fs=40)=>tex(T,w,h,(g,W_,H_)=>{g.fillStyle=bg;g.fillRect(0,0,W_,H_);g.fillStyle=fg;g.font=`900 ${fs}px Arial`;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,W_/2,H_/2+2)});
 function breaker(mods,x,name,par=P,y=0.15){const g=new T.Group();g.position.set(x,y,0.32);par.add(g);const w=0.17*mods-0.01;
  box(w,0.6,0.22,'#eef0f4',0,0,0.08,g,{roughness:.3});box(w*0.9,0.34,0.03,'#f8f9fb',0,0.02,0.2,g);box(w*0.7,0.16,0.03,'#161a22',0,-0.02,0.215,g);
  const lv=new T.Group();lv.position.set(0,-0.02,0.23);g.add(lv);box(0.1*Math.max(1,mods*0.9),0.11,0.07,'#101319',0,0.0,0.03,lv);
  if(name){const st=new T.Mesh(new T.PlaneGeometry(0.3,0.11),new T.MeshBasicMaterial({map:lab(name,'#ffd400','#10151f',256,96,name.length>7?30:38)}));st.position.set(0,-0.48,0.09);st.scale.set(Math.min(1,0.17*mods/0.3),1,1);g.add(st)}
  return {g,lv}}
 W.br=[breaker(2,-0.5,'GERAL'),breaker(1,-0.18,'LUZ'),breaker(1,0.0,'TOMADAS'),breaker(1,0.18,'COZINHA'),breaker(1,0.36,'CHUVEIRO'),breaker(1,0.54,'RESERVA')];
 W.door=new T.Group();W.door.position.set(0.85,0,0.3);P.add(W.door);
 box(1.7,2.0,0.05,'#f2f4f8',-0.85,0,0.0,W.door,{roughness:.35});box(0.08,0.25,0.06,'#9aa3b4',-1.55,0,0.04,W.door);
 const warnT=tex(T,256,232,(g,w,h)=>{g.fillStyle='#ffd400';g.beginPath();g.moveTo(w/2,8);g.lineTo(w-8,h-8);g.lineTo(8,h-8);g.closePath();g.fill();g.strokeStyle='#10151f';g.lineWidth=14;g.stroke();g.fillStyle='#10151f';g.beginPath();g.moveTo(w*0.55,h*0.3);g.lineTo(w*0.4,h*0.62);g.lineTo(w*0.52,h*0.62);g.lineTo(w*0.45,h*0.86);g.lineTo(w*0.62,h*0.52);g.lineTo(w*0.5,h*0.52);g.closePath();g.fill()});
 const warn=new T.Mesh(new T.PlaneGeometry(0.42,0.38),new T.MeshBasicMaterial({map:warnT,transparent:true}));warn.position.set(-0.85,0.35,0.03);W.door.add(warn);

 // ================= porta da casa à noite (x≈20) =================
 const X1=20;
 const brick=tex(T,512,512,(g,w,h)=>{g.fillStyle='#e9cf9e';g.fillRect(0,0,w,h);g.fillStyle='rgba(120,80,40,.12)';for(let y=0;y<16;y++)for(let x=0;x<8;x++)g.fillRect(x*64+(y%2)*32,y*32,60,2)});brick.wrapS=brick.wrapT=T.RepeatWrapping;brick.repeat.set(3,3);
 add(new T.Mesh(new T.BoxGeometry(12,8,0.3),new T.MeshStandardMaterial({map:brick,roughness:.9})),scene,X1+2,1.5,-0.35);
 add(new T.Mesh(new T.BoxGeometry(12,0.3,8),M('#7d8391',{roughness:.9})),scene,X1+2,FLOOR-0.15,3.5);
 box(12,0.12,0.6,'#9aa1ae',X1+2,FLOOR+0.05,0.3);
 box(1.6,3.3,0.3,'#5a3a1e',X1,-0.85,-0.15);
 W.hdoor=new T.Group();W.hdoor.position.set(X1-0.65,-0.85,0.02);scene.add(W.hdoor);box(1.3,3.1,0.08,'#2f6f8f',0.65,0,0,W.hdoor);box(0.1,0.1,0.12,'#d8b04a',1.15,0,0.06,W.hdoor);
 add(new T.Mesh(new T.PlaneGeometry(1.25,3.05),new T.MeshBasicMaterial({color:'#ffcf7a'})),scene,X1,-0.85,-0.02);   // luz de dentro
 W.porch=sph(0.16,'#fff1c4',X1+1.2,1.3,0.1,null,{emissive:'#ffd890',emissiveIntensity:1.5});W.porchL=new T.PointLight('#ffcf80',1.4,9);W.porchL.position.set(X1+1.2,1.2,1.2);scene.add(W.porchL);
 box(1.6,1.2,0.08,'#f2f4f8',X1+3.6,0.4,-0.18);add(new T.Mesh(new T.PlaneGeometry(1.45,1.05),new T.MeshBasicMaterial({color:'#ffcf7a'})),scene,X1+3.6,0.4,-0.13);box(0.05,1.05,0.05,'#f2f4f8',X1+3.6,0.4,-0.12);
 W.backL=new T.PointLight('#ffcf80',1.2,6);W.backL.position.set(X1,-0.6,-0.1);scene.add(W.backL);
 W.smoke=[];for(let i=0;i<24;i++){const m=new T.Sprite(new T.SpriteMaterial({map:puff,transparent:true,opacity:0,depthWrite:false,color:'#d9dde8'}));m.userData={k:i%3,dx:(Math.random()-0.5)*1.0,dy:Math.random()*1.4,s:0.6+Math.random()*0.6};scene.add(m);W.smoke.push(m)}

 // ================= oficina (flashback, x≈40) =================
 const X2=40;
 const peg=tex(T,512,512,(g,w,h)=>{g.fillStyle='#3a4256';g.fillRect(0,0,w,h);for(let y=16;y<h;y+=32)for(let x=16;x<w;x+=32){g.fillStyle='#232838';g.beginPath();g.arc(x,y,5,0,7);g.fill()}});peg.wrapS=peg.wrapT=T.RepeatWrapping;peg.repeat.set(5,5);
 add(new T.Mesh(new T.BoxGeometry(12,8,0.3),new T.MeshStandardMaterial({map:peg,roughness:.9})),scene,X2+1,1.5,-0.35);
 add(new T.Mesh(new T.BoxGeometry(12,0.3,8),M('#6e6a64',{roughness:.9})),scene,X2+1,FLOOR-0.15,3.5);
 const bench=box(3.2,0.18,1.2,'#a8743f',X2+2.9,FLOOR+1.3,0.5);box(0.15,1.3,1.0,'#3a3f4c',X2+1.5,FLOOR+0.65,0.5);box(0.15,1.3,1.0,'#3a3f4c',X2+4.3,FLOOR+0.65,0.5);
 const roll=new T.Mesh(new T.TorusGeometry(0.3,0.13,10,24),M('#e53935'));roll.rotation.x=Math.PI/2;roll.position.set(X2+3.6,FLOOR+1.5,0.5);scene.add(roll);
 cyl(0.06,0.06,0.6,'#ff8a3d',X2+2.6,FLOOR+1.45,0.6).rotation.z=Math.PI/2;
 // quadro de treino na parede (sem marca)
 const P2=new T.Group();P2.position.set(X2-1.6,0.7,-0.2);scene.add(P2);box(1.5,1.6,0.25,'#e3e7ee',0,0,0.13,P2);box(1.3,1.4,0.04,'#c9cfd9',0,0,0.26,P2);[-0.36,-0.18,0,0.18,0.36].forEach(x=>breaker(1,x,null,P2,0.1));
 const sign=new T.Mesh(new T.PlaneGeometry(2.2,0.55),new T.MeshBasicMaterial({map:tex(T,800,200,(g,w,h)=>{g.fillStyle='#0f1c3a';g.fillRect(0,0,w,h);g.fillStyle='#ffc400';g.font='900 110px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('OFICINA',w/2,h/2+6)})}));sign.position.set(X2+2.9,2.4,-0.18);scene.add(sign);
 W.shopL=new T.PointLight('#ffe0b0',2.0,14);W.shopL.position.set(X2-0.5,2.6,4.0);scene.add(W.shopL);

 // ================= personagens =================
 function person(o){
  const g=new T.Group();scene.add(g);const P_={g};
  const hips=new T.Group();hips.position.y=0.95;g.add(hips);P_.hips=hips;
  P_.legs=[-1,1].map(s=>{const l=new T.Group();l.position.set(s*0.2,0,0);hips.add(l);cap(0.13,0.5,o.pants,0,-0.42,0,l);const sh=add(new T.Mesh(new T.CapsuleGeometry(0.11,0.18,6,12),M(o.shoe)),l,0,-0.86,0.08);sh.rotation.x=Math.PI/2;return l});
  const torso=new T.Group();torso.position.y=0.05;hips.add(torso);P_.torso=torso;
  const body=cap(0.42,0.45,o.shirt,0,0.5,0,torso);body.scale.set(1,1,0.82);
  if(o.belt){cyl(0.43,0.43,0.12,o.belt,0,0.12,0,torso).scale.set(1,1,0.84);box(0.2,0.24,0.12,'#7a4b25',0.32,0.0,0.24,torso);cyl(0.03,0.02,0.32,'#ff8a3d',0.28,0.12,0.3,torso)}
  if(o.patch){const pt=new T.Mesh(new T.PlaneGeometry(0.36,0.16),new T.MeshBasicMaterial({map:o.patch}));pt.position.set(-0.17,0.72,0.36);pt.rotation.y=-0.25;torso.add(pt)}
  if(o.stripe){cyl(0.425,0.425,0.06,o.stripe,0,0.38,0,torso).scale.set(1,1,0.83)}
  P_.arms=[-1,1].map(s=>{const a=new T.Group();a.position.set(s*0.48,0.85,0);torso.add(a);cap(0.11,0.42,o.sleeve||o.shirt,0,-0.25,0,a);const fore=new T.Group();fore.position.set(0,-0.48,0);a.add(fore);cap(0.1,0.3,o.skin,0,-0.2,0,fore);const hand=sph(0.13,o.skin,0,-0.42,0,fore);if(o.cuff)cyl(0.115,0.115,0.07,o.cuff,0,-0.05,0,a);a.userData.fore=fore;a.userData.hand=hand;return a});
  const head=new T.Group();head.position.y=1.42;torso.add(head);P_.head=head;
  sph(0.56,o.skin,0,0.0,0,head);sph(0.1,o.skin,-0.55,-0.02,0,head).scale.set(0.6,1,1);sph(0.1,o.skin,0.55,-0.02,0,head).scale.set(0.6,1,1);
  sph(0.075,o.nose||o.skin,0,-0.06,0.56,head);
  P_.eyes=[-1,1].map(s=>{const e=new T.Group();e.position.set(s*0.2,0.1,0.47);head.add(e);sph(0.13,o.eyeW||'#ffffff',0,0,0,e,{roughness:.2});const pu=sph(0.07,'#1b1410',0,0,0.08,e,{roughness:.1});sph(0.025,'#ffffff',0.03,0.03,0.14,e,{roughness:.1,emissive:'#ffffff',emissiveIntensity:.5});e.userData.pu=pu;return e});
  P_.brows=[-1,1].map(s=>box(0.18,0.04,0.04,o.brow,s*0.2,0.3,0.52,head));
  const mouth=new T.Group();mouth.position.set(0,-0.24,0.5);head.add(mouth);P_.mouth=mouth;
  const mo=sph(0.12,'#5a1f1f',0,0,0,mouth,{roughness:.8});mo.scale.set(1,0.25,0.4);P_.mo=mo;
  const smile=new T.Mesh(new T.TorusGeometry(0.12,0.022,8,20,Math.PI),M('#5a1f1f'));smile.rotation.z=Math.PI;smile.position.set(0,0.05,0.02);mouth.add(smile);P_.smile=smile;
  const frown=new T.Mesh(new T.TorusGeometry(0.1,0.022,8,20,Math.PI),M('#5a1f1f'));frown.position.set(0,-0.04,0.02);frown.visible=false;mouth.add(frown);P_.frown=frown;
  if(o.decorate)o.decorate(head,P_);
  return P_}
 const patch=tex(T,256,112,(g,w,h)=>{g.fillStyle='#0f1c3a';g.fillRect(0,0,w,h);rr(g,6,6,w-12,h-12,16);g.fillStyle='#ffc400';g.fill();g.fillStyle='#0f1c3a';g.font='900 58px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('STARK',w/2,h/2+3)});
 const capFront=tex(T,256,112,(g,w,hh)=>{g.fillStyle='#1d3a7a';g.fillRect(0,0,w,hh);g.fillStyle='#ffc400';g.font='900 64px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('S',w/2,hh/2+4)});
 const capOn=(h,col,brimCol)=>{const ct=new T.Mesh(new T.SphereGeometry(0.59,28,14,0,Math.PI*2,0,Math.PI/2),M(col));ct.position.set(0,0.2,-0.02);ct.scale.set(1,0.8,1);ct.castShadow=true;h.add(ct);const br=cyl(0.34,0.34,0.05,brimCol,0,0.24,0.48,h);br.scale.set(1,1,0.75);br.rotation.x=0.12;sph(0.07,brimCol,0,0.66,0,h)};
 W.S=person({skin:'#b7794f',shirt:'#1d3a7a',cuff:'#ffc400',stripe:'#ffc400',pants:'#2b303b',shoe:'#1a1a1a',brow:'#2a1a10',belt:'#5a3a1e',patch,
  decorate:(h,P_)=>{capOn(h,'#1d3a7a','#ffc400');const f=new T.Mesh(new T.PlaneGeometry(0.34,0.15),new T.MeshBasicMaterial({map:capFront}));f.position.set(0,0.42,0.47);f.rotation.x=-0.45;h.add(f);
   sph(0.2,'#2a1a10',-0.45,0.05,-0.1,h).scale.set(0.6,1,1.2);sph(0.2,'#2a1a10',0.45,0.05,-0.1,h).scale.set(0.6,1,1.2);
   // gota de suor
   const sw=new T.Group();sw.position.set(0.42,0.22,0.36);h.add(sw);const d1=sph(0.06,'#7fc8ff',0,0,0,sw,{roughness:.1,emissive:'#3a8ad0',emissiveIntensity:.4});const d2=add(new T.Mesh(new T.ConeGeometry(0.06,0.1,16),M('#7fc8ff',{roughness:.1,emissive:'#3a8ad0',emissiveIntensity:.4})),sw,0,0.07,0);P_.sweat=sw}});
 W.Mr=person({skin:'#d9a273',shirt:'#b58ad6',pants:'#b58ad6',shoe:'#ff8fb3',brow:'#8a8a8a',nose:'#d39465',
  decorate:(h)=>{for(let i=0;i<3;i++){const tr=new T.Mesh(new T.TorusGeometry(0.42-i*0.09,0.17-i*0.02,12,28),M('#ff7aa8',{roughness:.9}));tr.rotation.x=Math.PI/2-0.25;tr.position.set(0,0.42+i*0.16,-0.04);h.add(tr);tr.castShadow=true}
   sph(0.16,'#ff7aa8',0.08,0.85,-0.05,h,{roughness:.9});sph(0.16,'#c9c9c9',-0.46,0.02,-0.15,h).scale.set(0.6,1,1.2);sph(0.16,'#c9c9c9',0.46,0.02,-0.15,h).scale.set(0.6,1,1.2);
   [-1,1].forEach(s=>{const r=new T.Mesh(new T.TorusGeometry(0.15,0.02,8,24),M('#6a3d9a'));r.position.set(s*0.2,0.1,0.6);h.add(r)});box(0.12,0.02,0.02,'#6a3d9a',0,0.12,0.6,h);
   sph(0.08,'#f08f8f',-0.33,-0.12,0.42,h,{roughness:1}).scale.set(1,0.6,0.5);sph(0.08,'#f08f8f',0.33,-0.12,0.42,h,{roughness:1}).scale.set(1,0.6,0.5)}});
 const robe=new T.Mesh(new T.CylinderGeometry(0.44,0.6,0.8,24),M('#b58ad6',{roughness:.9}));robe.position.set(0,-0.15,0);robe.castShadow=true;W.Mr.hips.add(robe);
 // caixinha (disjuntor novo, sem marca e sem número)
 W.box=new T.Group();W.Mr.g.add(W.box);
 const kraft=tex(T,256,256,(g,w,h)=>{g.fillStyle='#c89b62';g.fillRect(0,0,w,h);g.strokeStyle='#4a3420';g.lineWidth=8;rr(g,78,40,100,176,12);g.stroke();g.fillStyle='#4a3420';g.fillRect(108,112,40,34);g.fillRect(118,90,20,22)});
 add(new T.Mesh(new T.BoxGeometry(0.42,0.62,0.32),[M('#b8894f'),M('#b8894f'),M('#c89b62'),M('#c89b62'),new T.MeshStandardMaterial({map:kraft,roughness:.8}),M('#b8894f')]),W.box,0,0,0);
 // Seu Fabiano (flashback): mais alto, bigode e cabelo grisalho; aparece de costas
 W.F=person({skin:'#9c6844',shirt:'#162d60',cuff:'#ffc400',stripe:'#ffc400',pants:'#2b303b',shoe:'#1a1a1a',brow:'#bdbdbd',belt:'#5a3a1e',
  decorate:(h)=>{capOn(h,'#162d60','#ffc400');sph(0.22,'#bdbdbd',-0.45,0.0,-0.12,h).scale.set(0.6,1,1.2);sph(0.22,'#bdbdbd',0.45,0.0,-0.12,h).scale.set(0.6,1,1.2);sph(0.3,'#bdbdbd',0,0.02,-0.3,h).scale.set(1.3,0.8,0.6);
   const mu=sph(0.12,'#d0d0d0',0,-0.15,0.53,h);mu.scale.set(1.6,0.45,0.5)}});
 W.F.g.scale.setScalar(1.15);
 // três eletricistas "fantasmas" (silhuetas escuras)
 W.E=[0,1,2].map(i=>{const p=person({skin:'#232838',shirt:'#2c3242',pants:'#202533',shoe:'#0c0e14',brow:'#0c0e14',nose:'#232838',decorate:(h)=>capOn(h,'#1b1f2b','#2a2f3d')});
  const bill=new T.Mesh(new T.PlaneGeometry(0.42,0.22),new T.MeshBasicMaterial({map:tex(T,200,104,(g,w,h)=>{g.fillStyle='#4cbf6a';g.fillRect(0,0,w,h);g.strokeStyle='#1d6b35';g.lineWidth=8;g.strokeRect(8,8,w-16,h-16);g.fillStyle='#1d6b35';g.beginPath();g.ellipse(w/2,h/2,26,30,0,0,7);g.fill()}),side:T.DoubleSide}));
  bill.position.set(0,-0.5,0.12);p.arms[1].userData.fore.add(bill);p.bill=bill;return p});
 // cartões A / B e extras
 const card=(L,txt1,txt2,col)=>{const t=tex(T,640,420,(g,w,h)=>{rr(g,8,8,w-16,h-16,48);g.fillStyle='#ffffff';g.fill();g.lineWidth=12;g.strokeStyle='#0b0f1a';g.stroke();g.fillStyle=col;g.beginPath();g.arc(118,h/2,82,0,7);g.fill();g.fillStyle='#ffffff';g.font='900 120px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(L,118,h/2+6);g.fillStyle='#0b0f1a';g.textAlign='left';g.font='900 62px Arial';g.fillText(txt1,222,h/2-44);g.fillText(txt2,222,h/2+44)});const m=new T.Mesh(new T.PlaneGeometry(1.9,1.25),new T.MeshBasicMaterial({map:t,transparent:true}));scene.add(m);return m};
 W.cardA=card('A','DISJUNTOR','MAIOR','#e03c5a');W.cardB=card('B','DESLIGO E','DESCUBRO','#1fa85a');
 W.brr=new T.Mesh(new T.PlaneGeometry(1.2,0.5),new T.MeshBasicMaterial({map:tex(T,400,160,(g,w,h)=>{g.font='italic 900 110px Arial';g.textAlign='center';g.textBaseline='middle';g.lineWidth=16;g.strokeStyle='#0b0f1a';g.strokeText('BRRR!',w/2,h/2);g.fillStyle='#9fd4ff';g.fillText('BRRR!',w/2,h/2)}),transparent:true}));scene.add(W.brr);
 W.pa=new T.Mesh(new T.PlaneGeometry(1.6,0.9),new T.MeshBasicMaterial({map:tex(T,480,270,(g,w,h)=>{g.fillStyle='#ffc400';g.beginPath();for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=i%2?90:130;g.lineTo(w/2+Math.cos(a)*r*1.7,h/2+Math.sin(a)*r)}g.closePath();g.fill();g.lineWidth=10;g.strokeStyle='#0b0f1a';g.stroke();g.font='italic 900 120px Arial';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#e03c5a';g.fillText('PÁ!',w/2,h/2+6)}),transparent:true}));scene.add(W.pa);
}

// ================= animação =================
const V=()=>new W.T.Vector3();
function talk(P,t,c,who){const {TL}=c;let open=0;for(let i=0;i<TL.ST.length;i++){if(SPK[i]!==who)continue;const a=TL.ST[i],b=a+TL.DU[i];if(t>=a&&t<=b)open=0.35+0.65*Math.abs(Math.sin((t-a)*13))*Math.min(1,(b-t)*6)}P.mo.scale.set(1,0.25+open*1.1,0.4);return open}
function face(P,mood,open){P.smile.visible=open<0.2&&mood==='happy';P.frown.visible=open<0.2&&mood!=='happy';P.mo.visible=open>=0.2||mood==='shock';if(mood==='shock'&&open<0.2)P.mo.scale.set(0.7,0.9,0.4)}
function blink(P,t,ph,wide=1){const k=((t+ph)%3.3);const s=k<0.12?Math.max(0.1,Math.abs(k-0.06)/0.06):1;P.eyes.forEach(e=>{e.scale.set(wide,s*wide,wide);e.userData.pu.scale.setScalar(wide>1.1?0.7:1)})}
function brows(P,kind){const r={angry:[0.45,-0.45],worry:[-0.35,0.35],up:[0,0],flat:[-0.1,0.1]}[kind]||[0,0];P.brows.forEach((b,i)=>{b.rotation.z=r[i];b.position.y=kind==='up'?0.38:0.3})}
function pose(P,{la=0,ra=0,lf=0,rf=0,laz=0,raz=0}={}){P.arms[0].rotation.x=-la;P.arms[1].rotation.x=-ra;P.arms[0].rotation.z=-0.12-laz;P.arms[1].rotation.z=0.12+raz;P.arms[0].userData.fore.rotation.x=-lf;P.arms[1].userData.fore.rotation.x=-rf}
function walk(P,ph,amt){P.legs[0].rotation.x=Math.sin(ph)*0.55*amt;P.legs[1].rotation.x=-Math.sin(ph)*0.55*amt;P.hips.position.y=0.95+Math.abs(Math.cos(ph))*0.06*amt}
function place(P,x,z,ry,y=FLOOR){P.g.position.set(x,y,z);P.g.rotation.y=ry}
function hide(P){P.g.position.set(0,HIDE,0)}
function headPos(P){P.g.updateMatrixWorld(true);const v=V();P.head.getWorldPosition(v);return v}
// câmera de close no rosto: dist = distância, ang = giro em volta do personagem
function faceCam(P,dist,ang=0.3,dy=0.05){const h=headPos(P),ry=P.g.rotation.y+ang;return {p:[h.x+Math.sin(ry)*dist,h.y+dy,h.z+Math.cos(ry)*dist],l:[h.x,h.y-0.17*dist,h.z]}}
function shots(c){const {N,E,TL}=c,tEnd=N[TL.END];
 const fix=(p0,l0,p1,l1)=>k=>({p:p0.map((v,j)=>lerp(v,p1[j],k)),l:l0.map((v,j)=>lerp(v,l1[j],k))});
 return [
  [0,E.toda-0.1,       k=>faceCam(W.S,lerp(4.6,3.6,k),0.25)],
  [E.toda-0.1,E.pa,    fix([-2.6,0.3,9.4],[-2.6,-0.9,0],[-2.6,0.2,8.2],[-2.6,-0.9,0])],
  [E.pa,N[2],          k=>faceCam(W.Mr,lerp(4.4,3.8,k),-0.2)],
  [N[2],N[3],          fix([21.6,0.3,11.6],[21.6,-0.9,0],[21.9,0.3,10.6],[21.9,-0.9,0])],
  [N[3],N[4],          fix([39.7,0.4,9.4],[40.4,-0.8,0],[39.8,0.3,8.4],[40.4,-0.8,0])],
  [N[4],N[5],          k=>faceCam(W.S,lerp(4.6,3.8,k),-0.6)],
  [N[5],E.desarmado-0.15,fix([2.9,0.7,7.0],[3.1,0.0,0],[3.0,0.7,6.0],[3.2,0.1,0])],
  [E.desarmado-0.15,E.caiu+0.08,fix([3.35,0.95,3.3],[3.4,0.5,0],[3.4,0.95,2.9],[3.42,0.5,0])],
  [E.caiu+0.08,N[6],   k=>faceCam(W.S,lerp(3.6,3.1,k),0.3)],
  [N[6],E.comprei+0.1, fix([1.4,0.5,9.6],[1.4,-0.7,0],[1.4,0.4,8.6],[1.4,-0.7,0])],
  [E.comprei+0.1,N[7], k=>faceCam(W.Mr,lerp(4.2,3.9,k),-0.3)],
  [N[7],E.aviso2-0.75, k=>faceCam(W.S,lerp(5.0,3.4,k),0.35)],
  [E.aviso2-0.75,E.aviso2+0.6,fix([39.9,0.1,7.2],[40.5,-0.6,1.0],[39.95,0.05,6.6],[40.5,-0.6,1.0])],
  [E.aviso2+0.6,N[8],  k=>faceCam(W.S,lerp(3.3,3.0,k),0.3)],
  [N[8],N[9],          fix([1.9,1.5,13.2],[1.9,0.4,0],[1.9,1.4,12.2],[1.9,0.4,0])],
  [N[9],E.comenta-0.05,fix([2.7,0.3,6.0],[2.6,-0.4,0.8],[2.75,0.3,5.2],[2.65,-0.4,0.8])],
  [E.comenta-0.05,1e9, fix([1.9,1.4,12.8],[1.9,0.4,0],[1.9,1.4,12.8],[1.9,0.4,0])]]}
let _sh=null;
function render(c){
 const {THREE,N,E,seg,eob,tn:t,camera,TL}=c,T=THREE,tEnd=N[TL.END];
 const S=W.S,Mr=W.Mr,F=W.F;
 const inFlash=(t>=N[3]&&t<N[5])||(t>=E.aviso2-0.75&&t<E.aviso2+0.6);
 // ---------- palco: quem está onde ----------
 [S,Mr,F,...W.E].forEach(p=>{hide(p);walk(p,0,0);p.head.rotation.z=0;p.torso.rotation.z=0;p.g.scale.setScalar(p===F?1.15:1)});W.brr.visible=false;W.pa.visible=false;W.cardA.visible=false;W.cardB.visible=false;
 S.sweat.visible=false;W.box.visible=false;W.flick.intensity=0;
 let sMood='flat',sWide=1,mMood='flat',mWide=1;
 // chuveiro: energizado até o PÁ
 const powered=t<E.pa-0.05;const waterOn=t>=E.liguei-0.1&&t<N[2];
 W.shLed.material.emissiveIntensity=powered?1.4:0;
 W.drops.forEach(d=>{const u=d.userData;const k=((t*u.sp/4.2)+u.o)%1;d.visible=waterOn;d.position.set(u.x+u.dx*k*3,2.35-k*4.7,u.z+u.dz*k*3);d.material.color.set(powered?'#ffd9b0':'#8fd0ff');d.material.emissive.set(powered?'#d5763a':'#3a7bd5')});
 const hotA=waterOn?(powered?seg(t,E.liguei,E.liguei+0.6):Math.max(0,1-(t-E.pa)/0.6)):0;
 W.steam.forEach(s=>{const u=s.userData;const k=((t*0.35)+u.o)%1;s.position.set(u.x+Math.sin(k*6+u.o*9)*0.2,-1.6+k*4.4,u.z);s.scale.setScalar(0.8+k*1.8);s.material.opacity=0.45*hotA*Math.sin(k*Math.PI)});
 // disjuntor do chuveiro: desarmado; religa em E.religuei; cai em E.caiu
 const lvUp=t>=E.religuei+0.15&&t<E.caiu-0.05;W.br.forEach((b,i)=>b.lv.position.y=(i===4?(lvUp?0.03:-0.05):0.03));
 W.door.rotation.y=t<N[5]?0:1.9*seg(t,E.abri,E.abri+1.0);
 W.hdoor.rotation.y=-1.3*(seg(t,N[2]-0.1,N[2]+0.5))*(1-seg(t,E.sumiram+0.2,E.sumiram+0.5));

 if(t<E.toda-0.1){ // gancho: close no Starkinho, luz do quadro piscando no rosto
  place(S,2.3,1.5,1.0);S.sweat.visible=true;S.sweat.position.y=0.22-((t*0.25)%0.3);sMood='flat';sWide=1.15;brows(S,'worry');pose(S,{la:0.15,ra:0.15});
  W.flick.intensity=1.6*(0.55+0.45*Math.abs(Math.sin(t*23)*Math.sin(t*7.3)));if(Math.sin(t*5.1)>0.92)W.flick.intensity=0.1;
 } else if(t<N[2]){ // banheiro
  place(Mr,-2.3,1.3,0.3);
  if(t<E.pa-0.05){pose(Mr,{la:0.2,ra:1.9,rf:0.5,raz:0.2});brows(Mr,'flat');mMood='happy'}
  else{const w=Math.sin(t*14)*0.25;pose(Mr,{la:2.6+w,ra:2.6-w,laz:0.4,raz:0.4,lf:0.3,rf:0.3});brows(Mr,'angry');mMood='angry';Mr.torso.rotation.z=Math.sin(t*70)*0.04;
   W.brr.visible=t>=E.pa+0.6;W.brr.position.set(-1.4,0.3,2.0);W.brr.scale.setScalar(eob((t-E.pa-0.6)/0.25));
   W.pa.visible=t<E.pa+0.6;W.pa.position.set(-1.5,1.4,2.2);W.pa.scale.setScalar(eob((t-E.pa)/0.15))}
 } else if(t<N[3]){ // porta da casa: três eletricistas saem, cobram e somem
  W.E.forEach((p,i)=>{const t0=E.tres-0.2+i*0.55;const k=seg(t,t0,t0+1.1);if(t<t0)return;
   const gone=seg(t,E.sumiram+i*0.08,E.sumiram+0.3+i*0.08);if(gone>=1)return;
   place(p,lerp(20,20.7+i*1.15,k),lerp(-0.1,1.4+i*0.15,k),k<1?1.2:0.0);walk(p,t*10,k<1?1:0);p.g.scale.setScalar(1-gone);
   const cob=t>=E.cobraram-0.1;p.bill.visible=cob;pose(p,cob?{ra:1.4+Math.sin(t*12+i)*0.2,rf:0.6,la:0.1}:(t>=E.religaram-0.1?{ra:2.4,rf:0.9}:{}));
   p.eyes.forEach(e=>e.scale.setScalar(1));});
  W.smoke.forEach((m,j)=>{const i=m.userData.k;const t0=E.sumiram+i*0.08;const k=clamp01((t-t0)/0.9);m.visible=k>0&&k<1;m.position.set(20.7+i*1.15+m.userData.dx,FLOOR+1.2+m.userData.dy+k*0.6,1.5+i*0.15);m.scale.setScalar(m.userData.s*(0.6+k*1.6));m.material.opacity=0.8*(1-k)});
 } else if(t<N[5]){ // flashback: oficina
  place(S,40.0,0.9,0.71);place(F,41.2,2.3,-2.43);sMood='flat';brows(S,t>=N[4]?'up':'flat');pose(S,{la:0.1,ra:0.1});
  const hand=seg(t,E.aviso-0.6,E.aviso-0.2);pose(F,{la:0.1,ra:1.4*hand,rf:0.3*hand,raz:-0.25*hand});
  if(t>=E.aviso)sWide=1.12;
 } else if(t<N[6]){ // quadro: abre, religa, cai
  const turn=seg(t,E.caiu+0.0,E.caiu+0.25);place(S,2.3,1.35,lerp(2.55,1.0,turn));
  const hop=(t>=E.caiu&&t<E.caiu+0.4)?Math.sin((t-E.caiu)/0.4*Math.PI)*0.3:0;S.g.position.y+=hop;
  if(t<E.abri)pose(S,{la:0.1,ra:0.1});else if(t<E.religuei-0.1)pose(S,{ra:1.5*seg(t,E.abri,E.abri+0.3),rf:0.1});else if(t<E.caiu)pose(S,{ra:1.7,rf:0.2});else pose(S,{la:1.2,ra:1.2,laz:0.5,raz:0.5,lf:0.8,rf:0.8});
  if(t>=E.caiu){sWide=1.4;sMood='shock';brows(S,'up');S.sweat.visible=true;S.sweat.position.y=0.22-((t*0.25)%0.3)}else brows(S,'worry');
 } else if(t<N[8]){ // dona Maria e a caixinha; tentação
  place(S,2.1,1.5,-0.55);place(Mr,0.75,1.9,0.85);W.box.visible=true;
  const lift=seg(t,E.maior-0.2,E.maior+0.2);W.box.position.set(0,1.2+0.2*lift,0.72);W.box.rotation.y=Math.sin(t*2)*0.1;
  pose(Mr,{la:1.25,ra:1.25,lf:0.55,rf:0.55,laz:-0.15,raz:-0.15});mMood='happy';brows(Mr,'up');
  if(t<N[7]){pose(S,{la:0.1,ra:0.1});brows(S,'flat')}
  else{const k=seg(t,N[7],N[7]+0.8);S.g.rotation.y=lerp(-0.55,-0.25,k);
   if(t<E.frase-0.2){sMood='happy';pose(S,{la:0.1,ra:1.0*seg(t,E.trocar,E.trocar+0.4),rf:0.8});brows(S,'flat')}
   else{sMood='flat';brows(S,'worry');pose(S,{la:0.1,ra:0.1});S.sweat.visible=true;S.sweat.position.y=0.22-((t*0.25)%0.3)}}
  if(t>=E.aviso2-0.75&&t<E.aviso2+0.6){place(S,40.0,0.9,0.71);place(F,41.2,2.3,-2.43);pose(F,{ra:1.4,rf:0.3,raz:-0.25});hide(Mr);W.box.visible=false;sMood='flat';brows(S,'up')}
 } else { // dilema e chamada
  place(S,1.9,1.5,0.0);place(Mr,0.35,1.9,0.5);W.box.visible=true;W.box.position.set(0,1.2,0.72);pose(Mr,{la:1.25,ra:1.25,lf:0.55,rf:0.55});mMood='flat';brows(Mr,'flat');
  const hp=S.g.position;W.cardA.visible=t>=E.A-0.1;W.cardB.visible=t>=E.B-0.1;
  const aK=eob((t-E.A+0.1)/0.35),bK=eob((t-E.B+0.1)/0.35);
  const hiA=t>=E.A&&t<E.B?1.08:1,hiB=t>=E.B&&t<N[9]?1.08:1;
  W.cardA.position.set(hp.x-1.02,hp.y+4.6+Math.sin(t*2)*0.04,hp.z+0.1);W.cardB.position.set(hp.x+1.05,hp.y+4.6+Math.sin(t*2+1)*0.04,hp.z+0.12);
  W.cardA.scale.setScalar(Math.max(0.01,aK)*hiA);W.cardB.scale.setScalar(Math.max(0.01,bK)*hiB);
  if(t>=E.comenta){const p=0.5+0.5*Math.sin((t-E.comenta)*7);W.cardA.scale.multiplyScalar(1+0.05*p);W.cardB.scale.multiplyScalar(1+0.05*(1-p))}
  if(t<N[9]){pose(S,{la:0.1,ra:2.5,rf:1.4,raz:0.2});S.head.rotation.z=-0.1+Math.sin(t*1.5)*0.05;brows(S,'worry')}
  else if(t<E.comenta){S.g.rotation.y=0.5;pose(S,{la:0.1,ra:0.3,raz:1.25*seg(t,N[9],N[9]+0.4)});brows(S,'worry');sWide=1.1;S.sweat.visible=true;S.sweat.position.y=0.22-((t*0.25)%0.3)}
  else{const k=seg(t,E.comenta-0.3,E.comenta);S.head.rotation.z=0;pose(S,{la:0.2+1.2*k,ra:0.3,raz:1.25,laz:0.6*k,lf:0.6*k});sMood='happy';brows(S,'up')}
 }
 const so=talk(S,t,c,'S');face(S,sMood,so);blink(S,t,0.0,sWide);
 const mo=talk(Mr,t,c,'M');face(Mr,mMood,mo);blink(Mr,t,0.7,mWide);if(!(t>=E.pa&&t<N[2]))Mr.torso.rotation.z=0;
 const fo=talk(F,t,c,'F');face(F,'flat',fo);blink(F,t,1.3);
 // ---------- câmera (cortes secos) ----------
 const L=shots(c);let si=0;while(si<L.length-1&&t>=L[si+1][0])si++;const [a,b,fn]=L[si];const k=ease3(clamp01((t-a)/Math.max(0.01,Math.min(b,tEnd)-a)));const cp=fn(k);
 camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // ---------- filtros e efeitos ----------
 c.renderer.domElement.style.filter=inFlash?'sepia(0.9) contrast(1.05) brightness(1.15)':'none';
 c.vig=inFlash?0.75:0.45;
 if(t>=E.pa-0.05&&t<E.pa+0.3)c.doFlash(E.pa-0.05,0.85,0.35,'#000');
 if(t>=E.caiu-0.05&&t<E.caiu+0.3)c.doFlash(E.caiu-0.05,0.7,0.3,'#000');
 if(t>=E.religuei+0.15&&t<E.religuei+0.4)c.doFlash(E.religuei+0.15,0.15,0.25,'#fff');
 [N[3],E.aviso2-0.75].forEach(t0=>{if(t>=t0&&t<t0+0.35)c.doFlash(t0,0.7,0.35,'#fff')});
 [N[5],E.aviso2+0.6].forEach(t0=>{if(t>=t0&&t<t0+0.25)c.doFlash(t0,0.4,0.25,'#fff')});
 if(t>=E.caiu&&t<E.caiu+0.5)c.shake=1.0;
 // ---------- rótulos ----------
 const Lb=(id,txt,pos,bg,fg,a,s)=>c.label(id,txt,pos,{bg,fg,a,s});
 const ch=W.br[4].g,cpos=V();ch.getWorldPosition(cpos);
 const inPanel=t>=E.desarmado-0.15&&t<E.caiu+0.08;
 Lb('des','DESARMADO',cpos.clone().add(new T.Vector3(0,0.55,0.3)),'#e03c5a','#fff',(inPanel&&t<E.religuei+0.15)?seg(t,E.desarmado,E.desarmado+0.25):0,eob((t-E.desarmado)/0.3));
 const cnt=t<E.dois?'1…':'2…';
 Lb('cnt',cnt,cpos.clone().add(new T.Vector3(0,0.55,0.3)),'#ffc400','#10151f',(inPanel&&t>=E.religuei+0.3)?1:0,eob((t-(t<E.dois?E.religuei+0.3:E.dois))/0.25)*1.3);
 Lb('chu','CHUVEIRO',cpos.clone().add(new T.Vector3(0,-0.62,0.3)),'#ffc400','#10151f',inPanel?1:0,1);
 const hp=S.g.position;
 Lb('cmt','COMENTA A OU B',new T.Vector3(hp.x,hp.y+5.6,hp.z),'#ffc400','#10151f',t>=E.comenta?seg(t,E.comenta,E.comenta+0.3):0,eob((t-E.comenta)/0.3));
}
return{init,render,keywords,title,brand}})();
