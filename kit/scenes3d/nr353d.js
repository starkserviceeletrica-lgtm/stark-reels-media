// Cena 3D "NR-35 #1: a partir de 2 metros" (bancada, estilo do QDC): parede perfurada, bancada de madeira,
// maquete com régua de altura e linha vermelha nos 2 metros (escada, telhado, andaime, poste e bonecos de teste),
// e o sistema de proteção real na parede: ancoragem, mosquetão, talabarte em Y com absorvedor, cinto tipo
// paraquedista, linha de vida com trava-quedas; capacete com jugular, mosquetões e permissão de trabalho na bancada.
// Tudo sem marca.
window.SCENE=(function(){
let W={tags:{}};
const keywords=['altura','2','dois','metros','nr35','nr-35','acima','nível','queda','escada','telhado','andaime','poste','treinamento','equipamento','planejamento','alerta','matar','segredo','comum','pequena'];
const title='NR-35';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
const BY=-3.0;            // tampo da bancada
const MB=BY+0.14;         // topo da base da maquete
const SM=1.15;            // escala da maquete: unidades por metro
const H2=MB+2*SM;         // altura dos 2 metros na maquete
const SX=-1.25;           // andaime
const HX=-2.25;           // casa (telhado) com escada na frente
const PX=-0.45;           // poste
const RX=-3.05;           // régua
const AX=1.6,AY=3.0;     // ancoragem na parede
function tex(T,w,h,draw){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');draw(g,w,h);const t=new T.CanvasTexture(cv);t.anisotropy=4;return t}
function warn(g,cx,cy,s){g.fillStyle='#10151f';g.beginPath();g.moveTo(cx,cy-0.55*s);g.lineTo(cx+0.62*s,cy+0.5*s);g.lineTo(cx-0.62*s,cy+0.5*s);g.closePath();g.fill();g.fillStyle='#ffc400';g.beginPath();g.moveTo(cx,cy-0.42*s);g.lineTo(cx+0.5*s,cy+0.43*s);g.lineTo(cx-0.5*s,cy+0.43*s);g.closePath();g.fill();g.fillStyle='#10151f';g.font=`900 ${0.62*s}px Arial`;g.textAlign='center';g.fillText('!',cx,cy+0.36*s)}
function init(c){
 const {THREE,scene,renderer}=c,T=THREE;W.T=T;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 scene.background=new T.Color('#10151f');scene.fog=new T.Fog('#10151f',16,32);
 scene.add(new T.HemisphereLight('#dfe9ff','#2a2018',0.75));
 const key=new T.DirectionalLight('#fff4e0',1.35);key.position.set(2.5,6,7);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-5.5,right:5.5,top:6,bottom:-5,near:1,far:22});key.shadow.bias=-0.0004;scene.add(key);
 const fill=new T.PointLight('#8fb4ff',0.7,16);fill.position.set(-4,1,5);scene.add(fill);
 W.red=new T.PointLight('#ff3030',0,12);W.red.position.set(-1.4,0.5,3);scene.add(W.red);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,roughness:.45,metalness:.05},o));
 const MET={metalness:.75,roughness:.28};
 const box=(w,h,d,col,x=0,y=0,z=0,p=scene,o={},cast=true)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),M(col,o));m.position.set(x,y,z);m.castShadow=cast;m.receiveShadow=true;p.add(m);return m};
 const cyl=(r,h,col,x=0,y=0,z=0,p=scene,s=20,o={},r2)=>{const m=new T.Mesh(new T.CylinderGeometry(r,r2==null?r:r2,h,s),M(col,o));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;p.add(m);return m};
 const sph=(r,col,x=0,y=0,z=0,p=scene,o={})=>{const m=new T.Mesh(new T.SphereGeometry(r,20,14),M(col,o));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m};
 const plane=(w,h,t,x,y,z,p=scene,o={})=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial(Object.assign({map:t,roughness:.6},o)));m.position.set(x,y,z);m.receiveShadow=true;p.add(m);return m};
 function rbox(w,h,d,r,col,o={}){const sh=new T.Shape();const x=-w/2,y=-h/2;sh.moveTo(x+r,y);sh.lineTo(x+w-r,y);sh.quadraticCurveTo(x+w,y,x+w,y+r);sh.lineTo(x+w,y+h-r);sh.quadraticCurveTo(x+w,y+h,x+w-r,y+h);sh.lineTo(x+r,y+h);sh.quadraticCurveTo(x,y+h,x,y+h-r);sh.lineTo(x,y+r);sh.quadraticCurveTo(x,y,x+r,y);const g=new T.ExtrudeGeometry(sh,{depth:Math.max(0.005,d-0.03),bevelEnabled:true,bevelThickness:0.015,bevelSize:0.012,bevelSegments:2,curveSegments:6});g.translate(0,0,-d/2+0.015);const m=new T.Mesh(g,M(col,o));m.castShadow=true;m.receiveShadow=true;return m}
 // fita (webbing) chata seguindo uma curva
 const webT=tex(T,64,256,(g,w,h)=>{g.fillStyle='#fff';g.fillRect(0,0,w,h);g.fillStyle='rgba(0,0,0,.16)';for(let y=0;y<h;y+=6)g.fillRect(0,y,w,2);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(4,0,3,h);g.fillRect(w-7,0,3,h)});webT.wrapS=webT.wrapT=T.RepeatWrapping;
 function ribbon(pts,col,wd=0.085,th=0.022,p=scene,closed=false){const sh=new T.Shape();sh.moveTo(-wd/2,-th/2);sh.lineTo(wd/2,-th/2);sh.lineTo(wd/2,th/2);sh.lineTo(-wd/2,th/2);sh.closePath();
  const cv=new T.CatmullRomCurve3(pts.map(q=>new T.Vector3(...q)),closed);const g=new T.ExtrudeGeometry(sh,{steps:closed?64:40,bevelEnabled:false,extrudePath:cv});
  const m=new T.Mesh(g,new T.MeshStandardMaterial({color:col,roughness:.62,map:webT}));m.castShadow=true;m.receiveShadow=true;p.add(m);return m}
 // mosquetão (oval de aço com trava de rosca)
 function mosq(p,x,y,z,s=1,rz=0,ry=0,col='#c9d0da'){const g=new T.Group();g.position.set(x,y,z);g.rotation.set(0,ry,rz);g.scale.setScalar(s);p.add(g);
  const o=new T.Mesh(new T.TorusGeometry(0.1,0.017,12,40),M(col,MET));o.scale.set(1,1.65,1);o.castShadow=true;g.add(o);
  cyl(0.028,0.1,'#d9a520',0.1,0.04,0,g,16,{metalness:.7,roughness:.3});return g}
 function dring(p,x,y,z,s=1){const d=new T.Mesh(new T.TorusGeometry(0.075,0.015,10,30),M('#b8c0cc',MET));d.scale.set(1.2*s,1*s,1);d.position.set(x,y,z);d.castShadow=true;p.add(d);return d}

 // ---------- parede perfurada + bancada de madeira ----------
 const wallTex=tex(T,512,512,(g,w,h)=>{g.fillStyle='#1d2636';g.fillRect(0,0,w,h);for(let y=16;y<h;y+=32)for(let x=16;x<w;x+=32){g.fillStyle='#0f1520';g.beginPath();g.arc(x,y,5,0,7);g.fill();g.strokeStyle='rgba(120,150,200,.12)';g.beginPath();g.arc(x-1,y-1,5,3.6,5.6);g.stroke()}});wallTex.wrapS=wallTex.wrapT=T.RepeatWrapping;wallTex.repeat.set(5,5);
 const wall=new T.Mesh(new T.PlaneGeometry(18,13),new T.MeshStandardMaterial({map:wallTex,roughness:.9}));wall.position.set(0,1.5,-0.62);wall.receiveShadow=true;scene.add(wall);
 const woodTex=tex(T,512,512,(g,w,h)=>{g.fillStyle='#a8743f';g.fillRect(0,0,w,h);for(let i=0;i<64;i++){g.fillStyle=`rgba(${70+Math.random()*40},${40+Math.random()*25},20,${0.12+Math.random()*0.15})`;g.fillRect(0,Math.random()*h,w,1+Math.random()*3)}for(let i=0;i<6;i++){g.fillStyle='rgba(60,35,15,.5)';g.fillRect(i*85,0,2,h)}});
 const bench=new T.Mesh(new T.BoxGeometry(13,0.25,4.5),new T.MeshStandardMaterial({map:woodTex,roughness:.7}));bench.position.set(0,BY-0.125,1.55);bench.receiveShadow=true;scene.add(bench);
 box(13,1.4,0.3,'#2a2f3b',0,-3.95,3.7);box(0.3,3,4,'#2a2f3b',-6.1,-4.6,1.6);box(0.3,3,4,'#2a2f3b',6.1,-4.6,1.6);
 box(7,0.1,0.5,'#8a5a2f',0,4.6,-0.35);cyl(0.22,0.5,'#2a2f3b',2.2,4.95,-0.3,scene,20);

 // ---------- placa da norma + certificado (parede, acima da maquete) ----------
 const nrT=tex(T,512,640,(g,w,h)=>{g.fillStyle='#f3f5f9';g.fillRect(0,0,w,h);g.fillStyle='#e8742a';g.fillRect(0,0,w,230);g.fillStyle='#fff';g.font='900 150px Arial';g.textAlign='center';g.fillText('NR-35',w/2,170);g.fillStyle='#10151f';g.font='900 58px Arial';g.fillText('TRABALHO',w/2,320);g.fillText('EM ALTURA',w/2,388);warn(g,w/2,520,150);g.strokeStyle='#10151f';g.lineWidth=10;g.strokeRect(5,5,w-10,h-10)});
 W.plaque=new T.Group();W.plaque.position.set(-2.3,2.15,-0.56);scene.add(W.plaque);box(1.06,1.32,0.03,'#e9ecf1',0,0,0,W.plaque);plane(1.0,1.25,nrT,0,0,0.02,W.plaque);
 [[-0.44,0.56],[0.44,0.56],[-0.44,-0.56],[0.44,-0.56]].forEach(([x,y])=>{const s=cyl(0.025,0.02,'#c9d4f0',x,y,0.03,W.plaque,12,MET);s.rotation.x=Math.PI/2});
 const ceT=tex(T,768,512,(g,w,h)=>{g.fillStyle='#fbf8ee';g.fillRect(0,0,w,h);g.strokeStyle='#b8862b';g.lineWidth=14;g.strokeRect(18,18,w-36,h-36);g.lineWidth=3;g.strokeRect(40,40,w-80,h-80);g.fillStyle='#10151f';g.textAlign='center';g.font='900 64px Arial';g.fillText('CERTIFICADO',w/2,130);g.font='700 34px Arial';g.fillText('TREINAMENTO',w/2,195);g.font='900 74px Arial';g.fillStyle='#e8742a';g.fillText('NR-35',w/2,285);g.fillStyle='#10151f';g.font='700 30px Arial';g.fillText('TRABALHO EM ALTURA',w/2,335);g.fillStyle='#8a929f';g.fillRect(110,420,220,3);g.fillRect(440,420,220,3);g.fillStyle='#c62828';g.beginPath();g.arc(w/2,415,44,0,7);g.fill();g.fillStyle='#fff';g.font='900 26px Arial';g.fillText('OK',w/2,424)});
 W.cert=new T.Group();W.cert.position.set(-0.95,2.0,-0.56);scene.add(W.cert);box(1.3,0.9,0.05,'#5a3a1f',0,0,0,W.cert,{roughness:.5});plane(1.18,0.79,ceT,0,0,0.03,W.cert);

 // ---------- maquete: base, régua, casa, escada, andaime, poste ----------
 const baseT=tex(T,512,256,(g,w,h)=>{g.fillStyle='#8e949c';g.fillRect(0,0,w,h);for(let i=0;i<1800;i++){g.fillStyle=`rgba(${Math.random()<.5?40:220},${Math.random()<.5?40:220},${Math.random()<.5?40:220},.10)`;g.fillRect(Math.random()*w,Math.random()*h,2,2)}});
 const baseM=new T.Mesh(new T.BoxGeometry(3.4,0.14,1.5),new T.MeshStandardMaterial({map:baseT,roughness:.85}));baseM.position.set(-1.6,BY+0.07,0.25);baseM.castShadow=true;baseM.receiveShadow=true;scene.add(baseM);
 box(3.44,0.03,1.54,'#5b616b',-1.6,BY+0.145,0.25,scene,{roughness:.6},false).scale.y=0.5;
 // régua de altura (metros)
 const RH=3.6,RP=1600;const ruT=tex(T,200,RP,(g,w,h)=>{g.fillStyle='#ffd21f';g.fillRect(0,0,w,h);const pm=RP/RH*SM;g.fillStyle='#10151f';
  for(let cm=0;cm<=310;cm+=10){const y=h-cm/100*pm;const L=cm%100===0?w*0.62:cm%50===0?w*0.42:w*0.24;g.fillRect(0,y-3,L,cm%100===0?8:5)}
  g.textAlign='right';g.font='900 74px Arial';[1,2,3].forEach(m=>{const y=h-m*pm;if(m===2){g.fillStyle='#d61f2b';g.fillRect(w*0.3,y-118,w*0.7,96);g.fillStyle='#fff'}else g.fillStyle='#10151f';g.fillText(m+'m',w-12,y-40)});g.fillStyle='#10151f';g.fillRect(0,0,6,h);g.fillRect(w-6,0,6,h)});
 W.ruler=new T.Group();W.ruler.position.set(RX,MB,0.7);scene.add(W.ruler);
 const rb=rbox(0.2,RH,0.05,0.02,'#ffd21f',{roughness:.5});rb.position.set(0,RH/2,0);W.ruler.add(rb);plane(0.19,RH-0.02,ruT,0,RH/2,0.028,W.ruler,{roughness:.45});
 box(0.36,0.06,0.3,'#2a2f3b',0,0.03,0,W.ruler);
 // linha vermelha dos 2 m (cresce a partir da régua) + zona acima de 2 m
 W.line=new T.Group();W.line.position.set(RX+0.1,H2,0.95);scene.add(W.line);
 const ln=box(3.1,0.035,0.035,'#ff2a2a',1.55,0,0,W.line,{emissive:'#ff1a1a',emissiveIntensity:1.2},false);W.line.scale.x=0.001;
 W.zone=new T.Mesh(new T.BoxGeometry(3.2,1.5,1.4),new T.MeshBasicMaterial({color:'#ff2a2a',transparent:true,opacity:0,depthWrite:false}));W.zone.position.set(-1.55,H2+0.75,0.25);scene.add(W.zone);
 W.floor=new T.Mesh(new T.PlaneGeometry(3.3,1.45),new T.MeshBasicMaterial({color:'#2f7bff',transparent:true,opacity:0,depthWrite:false}));W.floor.rotation.x=-Math.PI/2;W.floor.position.set(-1.6,MB+0.006,0.25);scene.add(W.floor);
 // casa com telhado
 const hsT=tex(T,256,640,(g,w,h)=>{g.fillStyle='#e9dcc2';g.fillRect(0,0,w,h);g.fillStyle='rgba(0,0,0,.05)';for(let y=0;y<h;y+=16)g.fillRect(0,y,w,2);g.fillStyle='#6b4a2b';g.fillRect(70,400,116,240);g.fillStyle='#d9a520';g.beginPath();g.arc(165,525,7,0,7);g.fill();g.fillStyle='#7fb2e5';g.fillRect(64,110,128,110);g.fillStyle='#e9dcc2';g.fillRect(124,110,8,110);g.fillRect(64,161,128,8);g.strokeStyle='#5a4a3a';g.lineWidth=8;g.strokeRect(64,110,128,110)});
 W.house=new T.Group();W.house.position.set(HX,MB,0.15);scene.add(W.house);
 const hw=rbox(0.8,2*SM,0.7,0.02,'#e9dcc2',{roughness:.8});hw.position.set(0,SM,0);W.house.add(hw);plane(0.78,2*SM-0.02,hsT,0,SM,0.352,W.house,{roughness:.8});
 const tileT=tex(T,256,256,(g,w,h)=>{g.fillStyle='#b5482a';g.fillRect(0,0,w,h);for(let y=0;y<h;y+=32){g.fillStyle='rgba(60,15,5,.45)';g.fillRect(0,y,w,5);for(let x=(y/32)%2?0:16;x<w;x+=32){g.fillStyle='rgba(255,180,140,.12)';g.fillRect(x,y+6,14,24)}}});tileT.wrapS=tileT.wrapT=T.RepeatWrapping;tileT.repeat.set(2,2);
 [-1,1].forEach(sd=>{const r=new T.Mesh(new T.BoxGeometry(0.56,0.04,0.86),new T.MeshStandardMaterial({map:tileT,roughness:.6}));r.position.set(sd*0.22,2*SM+0.19,0);r.rotation.z=-sd*0.62;r.castShadow=true;r.receiveShadow=true;W.house.add(r)});
 const gs=new T.Shape();gs.moveTo(-0.4,0);gs.lineTo(0.4,0);gs.lineTo(0,0.34);gs.closePath();const gm=new T.Mesh(new T.ShapeGeometry(gs),M('#e1d2b5',{roughness:.8,side:T.DoubleSide}));gm.position.set(0,2*SM,0.351);W.house.add(gm);
 const gm2=gm.clone();gm2.position.z=-0.351;W.house.add(gm2);
 // escada encostada na frente da casa
 W.ladder=new T.Group();W.ladder.position.set(HX,MB,1.0);W.ladder.rotation.x=-0.16;scene.add(W.ladder);
 const LH=2*SM+0.32;[-0.17,0.17].forEach(x=>{const r=rbox(0.045,LH,0.06,0.012,'#c3cad4',{metalness:.6,roughness:.3});r.position.set(x,LH/2,0);W.ladder.add(r);box(0.07,0.04,0.09,'#1a1d24',x,0.02,0,W.ladder)});
 for(let y=0.28;y<LH-0.1;y+=0.29){const r=cyl(0.018,0.34,'#aab3bf',0,y,0,W.ladder,10,MET);r.rotation.z=Math.PI/2}
 // andaime (torre tubular) com 2 pisos; sem guarda-corpo na frente do piso de cima
 W.scaf=new T.Group();W.scaf.position.set(SX,MB,0.25);scene.add(W.scaf);const SW=0.62,SH=3.45;const tube=(x1,y1,z1,x2,y2,z2,r=0.016)=>{const a=new T.Vector3(x1,y1,z1),b=new T.Vector3(x2,y2,z2),d=b.clone().sub(a);const m=new T.Mesh(new T.CylinderGeometry(r,r,d.length(),10),M('#aeb6c2',{metalness:.6,roughness:.35}));m.position.copy(a).add(b).multiplyScalar(0.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());m.castShadow=true;W.scaf.add(m);return m};
 const sx=SW/2,sz=SW/2;[[-sx,-sz],[sx,-sz],[-sx,sz],[sx,sz]].forEach(([x,z])=>{tube(x,0,z,x,SH,z,0.02);box(0.1,0.02,0.1,'#5b616b',x,0.01,z,W.scaf)});
 [0.08,SM,2*SM].forEach(y=>{tube(-sx,y,-sz,sx,y,-sz);tube(-sx,y,-sz,-sx,y,sz);tube(sx,y,-sz,sx,y,sz);if(y<1.5)tube(-sx,y,sz,sx,y,sz)});
 [2*SM+0.55,SH-0.02].forEach(y=>{tube(-sx,y,-sz,sx,y,-sz);tube(-sx,y,-sz,-sx,y,sz);tube(sx,y,-sz,sx,y,sz)});
 tube(-sx,0.08,-sz,-sx,SM,sz);tube(sx,0.08,sz,sx,SM,-sz);tube(-sx,SM,sz,-sx,2*SM,-sz);tube(sx,SM,-sz,sx,2*SM,sz);tube(-sx,0.08,sz,sx,SM,sz);
 [SM,2*SM].forEach(y=>{for(let i=0;i<3;i++){const pk=rbox(0.19,0.035,SW-0.02,0.01,'#b8844a',{map:woodTex,roughness:.7});pk.position.set(-0.2+i*0.2,y+0.035,0);W.scaf.add(pk)}});
 // poste com cruzeta e isoladores
 W.pole=new T.Group();W.pole.position.set(PX,MB,0.1);scene.add(W.pole);cyl(0.055,3.7,'#9a9ea6',0,1.85,0,W.pole,16,{roughness:.8},0.085);
 box(0.72,0.05,0.07,'#6d4a2b',0,3.4,0.07,W.pole,{roughness:.7});[-0.3,0,0.3].forEach(x=>{cyl(0.025,0.08,'#d9dde3',x,3.47,0.07,W.pole,12,{roughness:.2});cyl(0.035,0.02,'#d9dde3',x,3.5,0.07,W.pole,12,{roughness:.2})});
 for(let y=1.0;y<3.2;y+=0.28)box(0.12,0.015,0.015,'#5b616b',0,y,0.07,W.pole,MET);

 // ---------- bonecos de teste (manequins) ----------
 function dummy(){const g=new T.Group();const body=new T.Group();g.add(body);const OR=M('#e8742a',{roughness:.55}),BL=M('#2b3a5a',{roughness:.6});
  [-0.09,0.09].forEach(x=>{const l=new T.Mesh(new T.CylinderGeometry(0.075,0.065,0.88,14),BL);l.position.set(x,0.46,0);l.castShadow=true;body.add(l);const f=rbox(0.11,0.07,0.2,0.03,'#1a1d24');f.position.set(x,0.035,0.04);body.add(f)});
  const tr=rbox(0.4,0.66,0.24,0.08,'#e8742a',{roughness:.55});tr.position.y=1.24;body.add(tr);
  [-1,1].forEach(s=>{const a=new T.Mesh(new T.CylinderGeometry(0.06,0.052,0.72,12),OR);a.position.set(s*0.26,1.2,0);a.rotation.z=s*0.12;a.castShadow=true;body.add(a);sph(0.055,'#d9b38c',s*0.3,0.83,0,body)});
  // faixas refletivas
  [1.05,1.38].forEach(y=>{const b=box(0.42,0.04,0.25,'#dfe6ee',0,y,0,body,{roughness:.2,metalness:.3},false)});
  cyl(0.05,0.08,'#d9b38c',0,1.6,0,body);sph(0.13,'#d9b38c',0,1.74,0,body);
  const hm=new T.Mesh(new T.SphereGeometry(0.15,20,10,0,Math.PI*2,0,Math.PI/2),M('#f5f6f8',{roughness:.3}));hm.position.y=1.78;hm.scale.set(1,0.9,1.12);hm.castShadow=true;body.add(hm);
  const hb=new T.Mesh(new T.CylinderGeometry(0.17,0.17,0.015,20),M('#f5f6f8',{roughness:.3}));hb.position.set(0,1.78,0.02);hb.scale.set(1,1,1.2);body.add(hb);
  return g}
 W.d1=dummy();W.d1.position.set(SX,MB+2*SM+0.055,0.25);scene.add(W.d1);W.d1home=W.d1.position.clone();
 W.d2=dummy();W.d2.scale.setScalar(0.92);W.d2.rotation.y=Math.PI;W.d2.position.set(HX,MB+0.28+0.29*3-0.02,0.98);scene.add(W.d2);W.d2home=W.d2.position.clone();
 // seta de altura para a "queda pequena"
 W.arrow=new T.Group();W.arrow.position.set(HX+0.55,MB,1.2);scene.add(W.arrow);W.arrow.visible=false;
 const ah=W.d2home.y-MB;cyl(0.02,ah,'#ffc400',0,ah/2,0,W.arrow,8,{emissive:'#ffb300',emissiveIntensity:.6});[0,ah].forEach((y,i)=>{const cn=new T.Mesh(new T.ConeGeometry(0.06,0.13,14),M('#ffc400',{emissive:'#ffb300',emissiveIntensity:.6}));cn.position.y=i?y-0.05:y+0.05;cn.rotation.z=i?0:Math.PI;W.arrow.add(cn)});

 // ---------- sistema na parede: ancoragem -> mosquetão -> talabarte Y com absorvedor -> cinto ----------
 W.anc=new T.Group();W.anc.position.set(AX,AY,-0.58);scene.add(W.anc);
 const ap=rbox(0.36,0.52,0.06,0.04,'#9aa3b0',{metalness:.7,roughness:.32});W.anc.add(ap);
 [[-0.12,0.18],[0.12,0.18],[-0.12,-0.18],[0.12,-0.18]].forEach(([x,y])=>{const b=cyl(0.03,0.04,'#d0d6df',x,y,0.04,W.anc,6,MET);b.rotation.x=Math.PI/2});
 const eye=new T.Mesh(new T.TorusGeometry(0.075,0.022,12,30),M('#c9d0da',MET));eye.position.set(0,-0.08,0.09);eye.rotation.y=Math.PI/2;eye.castShadow=true;W.anc.add(eye);
 W.mq1=mosq(W.anc,0,-0.3,0.09,1.0,0,Math.PI/2);
 // absorvedor de energia
 const abT=tex(T,256,448,(g,w,h)=>{g.fillStyle='#1a1d24';g.fillRect(0,0,w,h);g.fillStyle='#ffc400';g.fillRect(14,60,w-28,300);g.fillStyle='#10151f';g.textAlign='center';g.font='900 40px Arial';g.fillText('ABSOR-',w/2,140);g.fillText('VEDOR',w/2,190);g.font='700 26px Arial';g.fillText('DE ENERGIA',w/2,240);warn(g,w/2,305,70)});
 W.abs=new T.Group();W.abs.position.set(AX,AY-0.88,-0.44);scene.add(W.abs);const ab=rbox(0.26,0.46,0.13,0.05,'#1a1d24',{roughness:.6});W.abs.add(ab);plane(0.24,0.42,abT,0,0,0.067,W.abs);
 ribbon([[AX,AY-0.5,-0.47],[AX+0.005,AY-0.58,-0.46],[AX,AY-0.66,-0.45]],'#ffb000',0.07);
 // pernas do talabarte (Y): uma ao cinto, outra solta com gancho
 const TB=AY-1.11;
 ribbon([[AX-0.04,TB,-0.44],[AX-0.12,TB-0.25,-0.42],[AX-0.08,TB-0.5,-0.4],[AX,TB-0.7,-0.37]],'#ffb000',0.07);
 ribbon([[AX+0.04,TB,-0.44],[AX+0.22,TB-0.25,-0.42],[AX+0.48,TB-0.5,-0.4],[AX+0.6,TB-0.75,-0.38]],'#ffb000',0.07);
 const hk=new T.Group();hk.position.set(AX+0.6,TB-0.95,-0.37);scene.add(hk);W.hook=hk;
 const hkm=new T.Mesh(new T.TorusGeometry(0.13,0.024,12,40,Math.PI*1.65),M('#c3cad4',MET));hkm.rotation.z=Math.PI*0.67;hkm.scale.set(1,1.45,1);hkm.castShadow=true;hk.add(hkm);
 const gate=cyl(0.016,0.26,'#d9a520',0.1,0.02,0,hk,10,{metalness:.7,roughness:.3});gate.rotation.z=0.25;
 // cinto tipo paraquedista (visto de costas, pendurado pela argola dorsal)
 const CB=TB-0.76;W.harn=new T.Group();scene.add(W.harn);const HO='#ff7a1a',hz=-0.36;
 W.dors=dring(W.harn,AX,CB,hz+0.02,1.1);
 const pad=rbox(0.3,0.36,0.05,0.07,'#1a1d24',{roughness:.7});pad.position.set(AX,CB-0.26,hz-0.03);W.harn.add(pad);
 ribbon([[AX-0.03,CB-0.05,hz],[AX-0.17,CB-0.35,hz+0.01],[AX-0.27,CB-0.72,hz+0.02],[AX-0.3,CB-1.05,hz+0.02]],HO,0.085,0.022,W.harn);
 ribbon([[AX+0.03,CB-0.05,hz],[AX+0.17,CB-0.35,hz+0.01],[AX+0.27,CB-0.72,hz+0.02],[AX+0.3,CB-1.05,hz+0.02]],HO,0.085,0.022,W.harn);
 ribbon([[AX-0.3,CB-0.86,hz+0.04],[AX,CB-0.9,hz+0.05],[AX+0.3,CB-0.86,hz+0.04]],HO,0.085,0.022,W.harn);
 ribbon([[AX-0.24,CB-1.1,hz+0.03],[AX,CB-1.2,hz+0.04],[AX+0.24,CB-1.1,hz+0.03]],HO,0.085,0.022,W.harn);
 [-1,1].forEach(s=>{const cx=AX+s*0.2,cy=CB-1.38;const pts=[...Array(10)].map((_,i)=>{const a=i/10*Math.PI*2;return [cx+Math.cos(a)*0.16,cy+Math.sin(a)*0.2,hz+0.03+0.02*Math.sin(a*2)]});ribbon(pts,HO,0.08,0.022,W.harn,true);
  const bk=rbox(0.11,0.07,0.035,0.015,'#b8c0cc',MET);bk.position.set(AX+s*0.29,CB-0.6,hz+0.04);W.harn.add(bk);dring(W.harn,AX+s*0.34,CB-0.92,hz+0.06,0.7)});
 const bk2=rbox(0.14,0.08,0.035,0.015,'#b8c0cc',MET);bk2.position.set(AX,CB-0.9,hz+0.075);W.harn.add(bk2);
 const lb=new T.Mesh(new T.PlaneGeometry(0.16,0.09),new T.MeshStandardMaterial({map:tex(T,128,72,(g,w,h)=>{g.fillStyle='#fff';g.fillRect(0,0,w,h);g.fillStyle='#10151f';g.font='900 22px Arial';g.textAlign='center';g.fillText('DORSAL',w/2,30);g.font='700 18px Arial';g.fillText('↑ CONECTAR',w/2,58)}),roughness:.5}));lb.position.set(AX,CB-0.2,hz);W.harn.add(lb);
 // linha de vida vertical + trava-quedas
 const LX=2.75,TY=1.25;W.rope=new T.Group();scene.add(W.rope);
 box(0.22,0.14,0.2,'#9aa3b0',LX,3.4,-0.52,W.rope,MET);dring(W.rope,LX,3.26,-0.42,0.8);
 const rpm=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([[LX,3.2,-0.42],[LX+0.01,0.5,-0.4],[LX,BY+0.4,-0.35],[LX+0.1,BY+0.08,-0.15]].map(p=>new T.Vector3(...p))),60,0.03,10,false),M('#2f6fd6',{roughness:.6}));rpm.castShadow=true;W.rope.add(rpm);
 const coil=new T.Mesh(new T.TorusGeometry(0.28,0.06,10,30),M('#2f6fd6',{roughness:.6}));coil.rotation.x=Math.PI/2;coil.position.set(LX+0.25,BY+0.06,0.2);coil.castShadow=true;W.rope.add(coil);
 W.tq=new T.Group();W.tq.position.set(LX,TY,-0.36);scene.add(W.tq);
 const tqT=tex(T,128,256,(g,w,h)=>{g.fillStyle='#c3cad4';g.fillRect(0,0,w,h);g.fillStyle='#10151f';g.font='900 64px Arial';g.textAlign='center';g.fillText('↑',w/2,90);g.font='900 20px Arial';g.fillText('TOPO',w/2,120);g.fillStyle='#8a929f';g.fillRect(20,150,w-40,4)});
 const tb=rbox(0.17,0.34,0.11,0.03,'#c3cad4',{metalness:.65,roughness:.3});W.tq.add(tb);plane(0.15,0.3,tqT,0,0,0.058,W.tq,{metalness:.4,roughness:.35});
 const lev=rbox(0.06,0.2,0.05,0.015,'#ffc400',{roughness:.4});lev.position.set(0.11,0.02,0.04);lev.rotation.z=-0.2;W.tq.add(lev);
 ribbon([[LX,TY-0.17,-0.33],[LX-0.03,TY-0.35,-0.32],[LX-0.06,TY-0.55,-0.31]],'#ffb000',0.06);
 W.mq2=mosq(scene,LX-0.07,TY-0.72,-0.3,0.9,0.12,0);

 // ---------- bancada: capacete com jugular, mosquetões, permissão de trabalho ----------
 W.helmet=new T.Group();W.helmet.position.set(0.55,2.08,-0.3);W.helmet.rotation.y=0.6;W.helmet.scale.setScalar(0.75);box(0.95,0.05,0.5,'#8a5a2f',0.55,2.04,-0.37,scene,{map:null,roughness:.7});[0.2,0.9].forEach(x=>box(0.04,0.22,0.3,'#5b616b',x,1.92,-0.46,scene,MET));scene.add(W.helmet);
 const HM=M('#f5f6f8',{roughness:.28});
 const dome=new T.Mesh(new T.SphereGeometry(0.5,32,18,0,Math.PI*2,0,Math.PI/2),HM);dome.scale.set(1,0.92,1.18);dome.position.y=0.06;dome.castShadow=true;W.helmet.add(dome);
 const ridge=new T.Mesh(new T.SphereGeometry(0.5,24,12,-0.12,0.24,0,Math.PI/2),HM);ridge.scale.set(1.04,0.98,1.22);ridge.position.y=0.06;W.helmet.add(ridge);
 const brim=new T.Mesh(new T.CylinderGeometry(0.56,0.58,0.035,32),HM);brim.scale.set(1,1,1.22);brim.position.set(0,0.07,0.03);brim.castShadow=true;W.helmet.add(brim);
 const jug=new T.Mesh(new T.TorusGeometry(0.42,0.02,6,32,Math.PI),M('#1a1d24'));jug.position.set(0,0.07,0.0);jug.rotation.set(Math.PI/2,0,Math.PI);jug.scale.set(1,1.15,1);W.helmet.add(jug);
 box(0.08,0.05,0.03,'#1a1d24',0,0.04,-0.47,W.helmet);
 W.mqA=mosq(scene,2.0,BY+0.02,1.95,1.25,0,0);W.mqA.rotation.set(-Math.PI/2,0,0.5);
 W.mqB=mosq(scene,2.35,BY+0.02,2.25,1.25,0,0);W.mqB.rotation.set(-Math.PI/2,0,-0.4);
 const ptT=tex(T,512,640,(g,w,h)=>{g.fillStyle='#fbfbf7';g.fillRect(0,0,w,h);g.fillStyle='#e8742a';g.fillRect(0,0,w,150);g.fillStyle='#fff';g.font='900 44px Arial';g.textAlign='center';g.fillText('PERMISSÃO',w/2,64);g.fillText('DE TRABALHO',w/2,118);g.fillStyle='#10151f';g.textAlign='left';g.font='700 34px Arial';['ANÁLISE DE RISCO','ANCORAGEM','EPI CONFERIDO','ÁREA SINALIZADA','PLANO DE RESGATE'].forEach((s,i)=>{const y=230+i*82;g.strokeStyle='#10151f';g.lineWidth=4;g.strokeRect(34,y-30,34,34);g.fillText(s,88,y)})});
 W.clip=new T.Group();W.clip.position.set(0.5,0.35,-0.55);scene.add(W.clip);
 const cbx=new T.Group();W.clip.add(cbx);box(0.82,1.12,0.04,'#8a5a2f',0,0.56,0,cbx,{roughness:.8});plane(0.72,0.9,ptT,0,0.52,0.025,cbx);box(0.34,0.11,0.06,'#aab4c8',0,1.08,0.03,cbx,MET);
 W.checks=[...Array(5)].map((_,i)=>{const ck=tex(T,64,64,(g)=>{g.strokeStyle='#1fa85a';g.lineWidth=11;g.lineCap='round';g.beginPath();g.moveTo(10,34);g.lineTo(26,50);g.lineTo(56,12);g.stroke()});const m=new T.Mesh(new T.PlaneGeometry(0.075,0.075),new T.MeshBasicMaterial({map:ck,transparent:true}));m.position.set(-0.36+(51/512)*0.72,0.52+0.45-(230+i*82-13)/640*0.9,0.03);m.visible=false;cbx.add(m);return m});
 // ferramentas soltas (fundo) e rolo de corda
 W.tools=new T.Group();W.tools.position.set(-3.9,BY,1.9);W.tools.rotation.y=0.4;scene.add(W.tools);
 const sd=cyl(0.07,0.6,'#ff8a3d',0,0.07,0,W.tools);sd.rotation.z=Math.PI/2;const sdb=cyl(0.02,0.55,'#c9d4f0',0.55,0.07,0,W.tools,10,MET);sdb.rotation.z=Math.PI/2;
 // halo de destaque
 W.ring=new T.Mesh(new T.RingGeometry(0.62,0.7,40),new T.MeshBasicMaterial({color:'#ffc400',transparent:true,opacity:0}));W.ring.rotation.x=-Math.PI/2;W.ring.position.set(0.85,BY+0.01,1.7);scene.add(W.ring);
}
const K=(c)=>{const {N,E}=c,tEnd=N[6];return [
 [0,              [-0.2,0.4,13.6],[-0.2,-0.1,0]],
 [E.altura0-0.3,  [-0.4,0.2,12.6],[-0.4,-0.2,0]],
 [E.altura0+0.6,  [-1.6,-0.5,8.6],[-1.6,-0.9,0]],
 [E.considerado+0.6,[-1.8,-0.6,7.6],[-1.8,-1.0,0]],
 [E.dois-0.55,    [-2.55,-0.45,4.6],[-2.7,-0.6,0.7]],
 [N[1]-0.1,       [-2.45,-0.45,4.3],[-2.6,-0.6,0.7]],
 [E.norma-0.4,    [-1.9,2.3,5.6],[-1.9,2.3,-0.5]],
 [E.acima-0.35,   [-1.6,-0.7,8.6],[-1.6,-1.0,0]],
 [E.nivel-0.3,    [-1.6,-1.5,7.8],[-1.6,-1.8,0.3]],
 [E.queda-0.4,    [-1.2,0.0,6.0],[-1.2,-0.2,0.2]],
 [N[2]-0.05,      [-1.2,0.0,6.1],[-1.2,-0.2,0.2]],
 [E.escada-0.25,  [-2.25,-1.4,5.6],[-2.25,-1.7,0.6]],
 [E.telhado-0.25, [-2.25,0.0,5.3],[-2.25,-0.4,0.2]],
 [E.andaime-0.25, [-1.25,-0.3,5.8],[-1.25,-0.6,0.2]],
 [E.poste-0.25,   [-0.5,0.0,5.4],[-0.5,-0.3,0.1]],
 [N[3]-0.05,      [-1.0,-0.4,8.6],[-1.2,-0.8,0]],
 [E.trein-0.35,   [-0.95,2.2,5.2],[-0.95,2.2,-0.5]],
 [E.equip-0.4,    [1.65,1.3,7.6],[1.65,1.2,0]],
 [E.plan-0.3,     [1.45,1.2,7.0],[1.35,1.1,0]],
 [N[4]-0.05,      [1.45,1.15,7.2],[1.35,1.05,0]],
 [E.alerta-0.1,   [-1.2,-0.3,8.4],[-1.3,-0.8,0.3]],
 [E.matar-0.7,    [-1.2,-0.6,7.6],[-1.3,-1.1,0.5]],
 [N[5]-0.05,      [-1.3,-0.8,7.8],[-1.4,-1.3,0.6]],
 [E.segredo+0.1,  [-1.9,-0.6,7.6],[-2.1,-1.0,0.7]],
 [E.pequena+0.4,  [-1.9,-0.8,6.8],[-2.1,-1.2,0.8]],
 [N[6]-0.05,      [-1.8,-0.8,7.0],[-2.0,-1.2,0.8]],
 [N[6]+0.8,       [-0.2,0.3,13.2],[-0.2,-0.2,0]],
 [tEnd,           [-0.2,0.4,13.6],[-0.2,-0.1,0]],
 [1e9,            [-0.2,0.4,13.6],[-0.2,-0.1,0]]]};
function camPose(c){const k=K(c),t=c.tn;let i=0;while(i<k.length-2&&t>=k[i+1][0])i++;const a=k[i],b=k[i+1],dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));return {p:a[1].map((v,j)=>lerp(v,b[1][j],f)),l:a[2].map((v,j)=>lerp(v,b[2][j],f))}}
function pulse(g,t,t0,amp=0.08,du=0.6){g.scale.setScalar(t>=t0&&t<t0+du?1+amp*Math.sin(Math.PI*(t-t0)/du):1)}
function lift(g,t,t0,t1,h,home){const k=Math.sin(Math.PI*clamp01((t-t0)/(t1-t0)));g.position.y=home+h*k*(t<t0+0.35?ease3(clamp01((t-t0)/0.35)):1)}
// etiqueta pequena (HTML) presa a um ponto 3D
function tag(c,id,txt,p3,a,bg='#fff',fg='#10151f'){let d=W.tags[id];if(!d){d=W.tags[id]=document.createElement('div');d.className='lb';d.style.fontSize='32px';d.style.padding='8px 22px';document.getElementById('labels').appendChild(d)}
 d.textContent=txt;d.style.background=bg;d.style.color=fg;if(a<=0.001){d.style.opacity=0;return}
 const v=p3.clone().project(c.camera);const X=Math.min(960,Math.max(120,(v.x*0.5+0.5)*1080)),Y=Math.min(1170,Math.max(380,(-v.y*0.5+0.5)*1920));d.style.left=X+'px';d.style.top=Y+'px';d.style.opacity=a;d.style.transform=`translate(-50%,-50%) scale(${0.85+0.15*a})`}
function render(c){
 const {THREE,N,E,seg,eob,tn:t,camera}=c,T=THREE,tEnd=N[6];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // linha dos 2 m cresce no "metros" e fica; pulsa no alerta e no segredo
 W.line.scale.x=Math.max(0.001,seg(t,E.dois-0.1,E.dois+0.6));
 const lp=(t>=E.dois2&&t<E.dois2+0.8)||(t>=E.pequena&&t<E.pequena+0.8);W.line.scale.y=W.line.scale.z=lp?1.6+0.6*Math.sin(t*20):1;
 // zona acima de 2 m e nível inferior
 W.zone.material.opacity=0.16*seg(t,E.acima-0.1,E.acima+0.4)*(1-seg(t,N[2]+0.2,N[2]+0.7));
 W.floor.material.opacity=0.45*seg(t,E.nivel-0.1,E.nivel+0.3)*(1-seg(t,E.queda+0.2,E.queda+0.6));
 // risco de queda: boneco do andaime balança
 const wob=(t>=E.queda-0.1&&t<E.queda+0.9)?Math.sin((t-E.queda)*14)*0.06*(1-(t-E.queda+0.1)):0;
 // queda do boneco no alerta (cai no "matar")
 const f0=E.matar-0.6,f1=E.matar;const h=W.d1home;
 if(t<f0){W.d1.position.copy(h);W.d1.rotation.set(wob,0,wob*0.5)}
 else{const u=clamp01((t-f0)/(f1-f0));const zf=lerp(h.z,0.75,clamp01(u*2.5));W.d1.position.set(h.x+0.08*u,lerp(h.y,MB+0.1,u*u),zf);W.d1.rotation.set(1.45*ease3(u),0,0.25*u)}
 if(t>=f1&&t<f1+0.5){c.shake=0.6*(1-(t-f1)/0.5);c.doFlash(f1,0.4,0.3,'#ff3b3b')}
 // queda pequena: boneco da escada escorrega um pouco
 const sh2=seg(t,E.segredo-0.3,E.segredo+0.2);W.d2.visible=sh2>0.001;W.d2.scale.setScalar(0.92*Math.max(0.001,eob(sh2)));W.d1.visible=t<E.segredo-0.3;
 const sl=seg(t,E.pequena-0.05,E.pequena+0.25)*(1-seg(t,E.pequena+0.5,E.pequena+0.9));W.d2.position.y=W.d2home.y-0.1*sl;W.d2.rotation.z=0.12*Math.sin(Math.PI*sl);
 W.arrow.visible=t>=E.comum&&t<tEnd-0.05;W.arrow.scale.set(1,Math.max(0.01,seg(t,E.comum,E.comum+0.4)),1);
 // destaques dos locais
 pulse(W.ladder,t,E.escada,0.05);pulse(W.house,t,E.telhado,0.05);pulse(W.scaf,t,E.andaime,0.04);pulse(W.pole,t,E.poste,0.05);
 pulse(W.plaque,t,E.norma,0.07);pulse(W.cert,t,E.trein,0.07);pulse(W.ruler,t,E.dois,0.04);
 // equipamento: itens pulsam em sequência
 const eq=E.equip;pulse(W.anc,t,eq+0.0,0.12);pulse(W.abs,t,eq+0.2,0.1);pulse(W.harn,t,eq+0.4,0.05);pulse(W.tq,t,eq+0.6,0.15);pulse(W.helmet,t,eq+0.7,0.1);if(!(t>=eq+0.7&&t<eq+1.3))W.helmet.scale.setScalar(0.75);else W.helmet.scale.multiplyScalar(0.75);
 lift(W.mqA,t,eq+0.8,eq+1.5,0.25,BY+0.02);lift(W.mqB,t,eq+0.9,eq+1.6,0.25,BY+0.02);
 
 // planejamento: checks na permissão de trabalho
 W.checks.forEach((m,i)=>{const t0=E.plan+0.1+i*0.2;m.visible=t>=t0;m.scale.setScalar(Math.max(0.01,eob((t-t0)/0.25)))});
 pulse(W.clip,t,E.plan,0.07);
 // alerta: luz vermelha
 const al=t>=E.alerta&&t<N[5]-0.1;W.red.intensity=al?1.6*(0.55+0.45*Math.abs(Math.sin((t-E.alerta)*6))):0;
 // rótulos grandes (HTML) na hora da fala
 const Lb=(id,txt,pos,bg,fg,t0,t1,dy=0)=>c.label(id,txt,pos,{bg,fg,a:(t>=t0&&t<t1)?seg(t,t0,t0+0.3):0,s:eob((t-t0)/0.3),dy});
 Lb('alt','QUAL ALTURA?',new T.Vector3(-1.6,H2+1.6,0.5),'#fff','#10151f',E.altura0,E.dois-0.6);
 Lb('dois','2 METROS',new T.Vector3(RX+0.55,H2+0.35,0.9),'#d61f2b','#fff',E.dois,N[1]-0.1);
 Lb('nr','TRABALHO EM ALTURA',new T.Vector3(-1.3,2.15-0.85,0),'#e8742a','#fff',E.norma,E.acima-0.4);
 Lb('acima','ACIMA DE 2 m',new T.Vector3(-1.6,H2+1.3,0.6),'#d61f2b','#fff',E.acima,E.queda-0.4);
 Lb('nivel','NÍVEL INFERIOR',new T.Vector3(-1.6,MB+0.25,1.1),'#2f7bff','#fff',E.nivel,E.queda-0.4,60);
 Lb('queda','RISCO DE QUEDA',new T.Vector3(SX,H2+2.2,0.3),'#ffc400','#10151f',E.queda,N[2]-0.1);
 Lb('esc','ESCADA',new T.Vector3(HX,MB+1.2,1.2),'#fff','#10151f',E.escada,E.telhado-0.15);
 Lb('tel','TELHADO',new T.Vector3(HX,H2+0.75,0.3),'#fff','#10151f',E.telhado,E.andaime-0.15);
 Lb('and','ANDAIME',new T.Vector3(SX,H2+1.4,0.3),'#fff','#10151f',E.andaime,E.poste-0.15);
 Lb('pos','POSTE',new T.Vector3(PX,MB+3.95,0.1),'#fff','#10151f',E.poste,N[3]-0.1);
 Lb('trein','TREINAMENTO',new T.Vector3(-0.95,2.0-0.7,0),'#fff','#10151f',E.trein,E.equip-0.4);
 Lb('equip','EQUIPAMENTO',new T.Vector3(AX-0.35,AY+0.4,0),'#ffc400','#10151f',E.equip,E.plan-0.1);
 Lb('plan','PLANEJAMENTO',new T.Vector3(0.7,1.62,0),'#1fa85a','#fff',E.plan,N[4]-0.1);
 Lb('alerta','ALERTA',new T.Vector3(SX,H2+2.3,0.3),'#d61f2b','#fff',E.alerta,N[5]-0.1);
 Lb('d2m','2 METROS JÁ PODEM MATAR',new T.Vector3(-1.6,H2+0.45,0.9),'#ffc400','#10151f',E.dois2,N[5]-0.1,80);
 Lb('comum','A QUEDA MAIS COMUM',new T.Vector3(HX+0.35,MB+2.4,1.0),'#fff','#10151f',E.comum,tEnd-0.1);
 Lb('peq','PARECE PEQUENA',new T.Vector3(HX+0.35,MB+2.4,1.0),'#d61f2b','#fff',E.pequena,tEnd-0.1,95);
 // etiquetas dos equipamentos (ficam de "equipamento" até o alerta)
 const ta=(t0)=>(t>=t0&&t<N[4]-0.1)?seg(t,t0,t0+0.25):0;const CB=AY-1.11-0.76;
 tag(c,'anc','ANCORAGEM',new T.Vector3(AX+0.8,AY+0.1,-0.5),ta(eq+0.0));
 tag(c,'mq','MOSQUETÃO',new T.Vector3(AX+0.75,AY-0.32,-0.5),ta(eq+0.1));
 tag(c,'abs','ABSORVEDOR',new T.Vector3(AX+0.7,AY-0.9,-0.4),ta(eq+0.2),'#ffc400');
 tag(c,'tal','TALABARTE',new T.Vector3(AX+0.7,AY-1.45,-0.4),ta(eq+0.3),'#ffc400');
 tag(c,'cin','CINTO PARAQUEDISTA',new T.Vector3(AX,CB-1.0,-0.3),ta(eq+0.4),'#ff7a1a','#fff');
 tag(c,'tq','TRAVA-QUEDAS',new T.Vector3(2.55,1.25-0.62,-0.3),ta(eq+0.6));
 tag(c,'cap','CAPACETE',new T.Vector3(0.55,2.7,-0.3),ta(eq+0.7));
 // efeitos
 if(t>=E.dois&&t<E.dois+0.35)c.doFlash(E.dois,0.25,0.3,'#ff3b3b');
 if(t>=E.alerta&&t<E.alerta+0.4)c.doFlash(E.alerta,0.3,0.35,'#ff3b3b');
 if(t>=E.plan+1.1&&t<E.plan+1.4)c.doFlash(E.plan+1.1,0.15,0.3,'#2ecc71');
 c.vig=al?0.5:0.28;
}
return{init,render,keywords,title}})();
