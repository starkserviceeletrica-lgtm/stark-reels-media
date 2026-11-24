// Cena 3D "QDC monofásico · Parte 2" (mesma bancada da parte 1): ligação do DR e do DPS com fios em 3D.
// DR: corrente que vai (fase) e que volta (neutro), fuga (vermelha) por uma pessoa e o DR desarmando.
// DPS: fase-terra e neutro-terra, surto desviado para o terra. Dispositivos sem marca.
window.SCENE=(function(){
let W={};
const keywords=['dr','dps','choque','neutro','terra','fuga','foge','desarma','surto','aterramento','segredo','bornes','teste','mês','elétrica','erro'];
const title='QDC MONOFÁSICO · PARTE 2';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
const MW=0.19,H=0.92,D=0.5;
const ROW1=1.55,ROW2=0.2,ROW3=-1.35,LX=2.45,LY=-0.55;
const COL={fase:'#e53935',neutro:'#4aa8ff',terra:'#2ecc71'};
function tex(T,w,h,draw){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');draw(g,w,h);const t=new T.CanvasTexture(cv);t.anisotropy=4;return t}
function init(c){
 const {THREE,scene,renderer}=c,T=THREE;W.T=T;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 scene.background=new T.Color('#10151f');scene.fog=new T.Fog('#10151f',14,30);
 scene.add(new T.HemisphereLight('#dfe9ff','#2a2018',0.75));
 const key=new T.DirectionalLight('#fff4e0',1.35);key.position.set(2.5,5,6);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-4,right:4,top:5,bottom:-5,near:1,far:20});key.shadow.bias=-0.0004;scene.add(key);
 const fill=new T.PointLight('#8fb4ff',0.7,16);fill.position.set(-4,1,5);scene.add(fill);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,roughness:.45,metalness:.05},o));
 const box=(w,h,d,col,x=0,y=0,z=0,p=scene,o={},cast=true)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),M(col,o));m.position.set(x,y,z);m.castShadow=cast;m.receiveShadow=true;p.add(m);return m};
 const cyl=(r,h,col,x=0,y=0,z=0,p=scene,s=20,o={})=>{const m=new T.Mesh(new T.CylinderGeometry(r,r,h,s),M(col,o));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;p.add(m);return m};
 W.M=M;W.box=box;W.cyl=cyl;
 function rbox(w,h,d,r,col,o={}){const sh=new T.Shape();const x=-w/2,y=-h/2;sh.moveTo(x+r,y);sh.lineTo(x+w-r,y);sh.quadraticCurveTo(x+w,y,x+w,y+r);sh.lineTo(x+w,y+h-r);sh.quadraticCurveTo(x+w,y+h,x+w-r,y+h);sh.lineTo(x+r,y+h);sh.quadraticCurveTo(x,y+h,x,y+h-r);sh.lineTo(x,y+r);sh.quadraticCurveTo(x,y,x+r,y);const g=new T.ExtrudeGeometry(sh,{depth:d-0.03,bevelEnabled:true,bevelThickness:0.015,bevelSize:0.012,bevelSegments:2,curveSegments:6});g.translate(0,0,-d/2+0.015);const m=new T.Mesh(g,M(col,o));m.castShadow=true;m.receiveShadow=true;return m}

 // ---------- bancada (parede perfurada + bancada de madeira + ferramentas) ----------
 const wallTex=tex(T,512,512,(g,w,h)=>{g.fillStyle='#1d2636';g.fillRect(0,0,w,h);for(let y=16;y<h;y+=32)for(let x=16;x<w;x+=32){g.fillStyle='#0f1520';g.beginPath();g.arc(x,y,5,0,7);g.fill();g.fillStyle='rgba(120,150,200,.12)';g.beginPath();g.arc(x-1,y-1,5,3.6,5.6);g.stroke()}});wallTex.wrapS=wallTex.wrapT=T.RepeatWrapping;wallTex.repeat.set(5,5);
 const wall=new T.Mesh(new T.PlaneGeometry(16,12),new T.MeshStandardMaterial({map:wallTex,roughness:.9}));wall.position.set(0,1.5,-0.62);wall.receiveShadow=true;scene.add(wall);
 const woodTex=tex(T,512,512,(g,w,h)=>{g.fillStyle='#a8743f';g.fillRect(0,0,w,h);for(let i=0;i<64;i++){g.fillStyle=`rgba(${70+Math.random()*40},${40+Math.random()*25},20,${0.12+Math.random()*0.15})`;g.fillRect(0,Math.random()*h,w,1+Math.random()*3)}for(let i=0;i<6;i++){g.fillStyle='rgba(60,35,15,.5)';g.fillRect(i*85,0,2,h)}});
 const bench=new T.Mesh(new T.BoxGeometry(12,0.25,4.5),new T.MeshStandardMaterial({map:woodTex,roughness:.7}));bench.position.set(0,-3.15,1.55);bench.receiveShadow=true;scene.add(bench);
 box(12,1.4,0.3,'#2a2f3b',0,-3.95,3.7);box(0.3,3,4,'#2a2f3b',-5.6,-4.6,1.6);box(0.3,3,4,'#2a2f3b',5.6,-4.6,1.6);
 // prateleira com luminária
 box(7,0.1,0.5,'#8a5a2f',0,4.6,-0.35);const lampB=cyl(0.22,0.5,'#2a2f3b',2.2,4.95,-0.3,scene,20);
 // ferramentas na bancada: chave de fenda, alicate, detector, rolo de cabo
 const tool=new T.Group();tool.position.set(-1.9,-2.98,1.1);tool.rotation.y=0.5;scene.add(tool);cyl(0.07,0.7,'#ff8a3d',0,0.07,0,tool).rotation.z=Math.PI/2;cyl(0.02,0.7,'#c9d4f0',0.55,0.07,0,tool).rotation.z=Math.PI/2;
 const pl=new T.Group();pl.position.set(1.7,-2.97,1.3);pl.rotation.y=-0.4;scene.add(pl);box(0.14,0.06,0.9,'#c93a3a',0.08,0.04,0,pl);box(0.14,0.06,0.9,'#c93a3a',-0.08,0.04,0,pl);box(0.4,0.07,0.1,'#aab4c8',0,0.04,-0.55,pl);
 const roll=new T.Mesh(new T.TorusGeometry(0.35,0.16,10,28),M('#e53935'));roll.rotation.x=Math.PI/2;roll.position.set(2.7,-2.9,0.7);roll.castShadow=true;scene.add(roll);const roll2=roll.clone();roll2.material=M('#4aa8ff');roll2.position.set(3.2,-2.9,1.45);scene.add(roll2);
 const tst=new T.Group();tst.position.set(-0.4,-2.99,1.8);tst.rotation.y=1.1;scene.add(tst);cyl(0.05,0.8,'#ffc400',0,0.05,0,tst).rotation.z=Math.PI/2;cyl(0.015,0.2,'#c9d4f0',0.5,0.05,0,tst).rotation.z=Math.PI/2;
 // ---------- caixa do quadro + placa ----------
 const Q=W.Q=new T.Group();Q.position.set(0,0,0);scene.add(Q);
 box(2.9,5.0,0.12,'#cfd5e0',0,0,-0.1,Q);                       // fundo
 W.plate=box(2.5,4.5,0.04,'#e6eaf1',0,0,-0.02,Q);
 box(2.95,0.18,0.62,'#f2f4f8',0,2.55,0.2,Q);box(2.95,0.18,0.62,'#f2f4f8',0,-2.55,0.2,Q);box(0.18,5.0,0.62,'#f2f4f8',-1.47,0,0.2,Q);box(0.18,5.0,0.62,'#f2f4f8',1.47,0,0.2,Q);
 // tampa (porta) articulada à esquerda
 W.door=new T.Group();W.door.position.set(-1.52,0,0.5);Q.add(W.door);
 const dm=box(3.0,5.1,0.05,'#aebed6',1.5,0,0.0,W.door,{transparent:true,opacity:.28,roughness:.1,metalness:.2},false);W.doorMat=dm.material;box(3.0,0.1,0.07,'#f2f4f8',1.5,2.55,0,W.door,{},false);box(3.0,0.1,0.07,'#f2f4f8',1.5,-2.55,0,W.door,{},false);box(0.1,5.1,0.07,'#f2f4f8',0.05,0,0,W.door,{},false);box(0.1,5.1,0.07,'#f2f4f8',2.95,0,0,W.door,{},false);
 // trilhos DIN
 W.rails=[ROW1,ROW2,ROW3].map(y=>{const g=new T.Group();g.position.set(0,y,0.04);Q.add(g);box(2.3,0.35,0.025,'#b9c1cf',0,0,0.0,g,{metalness:.7,roughness:.35});box(2.3,0.04,0.035,'#9aa3b4',0,0.11,0.01,g,{metalness:.7});box(2.3,0.04,0.035,'#9aa3b4',0,-0.11,0.01,g,{metalness:.7});for(let i=-9;i<=9;i++)box(0.14,0.06,0.03,'#6a7280',i*0.12,0,0.02,g,{},false);return g});
 // ---------- dispositivos ----------
 function lab(lines,w,h,{bg='#f3f5f9',band=null,big=null}={}){return tex(T,w,h,(g,W_,H_)=>{g.fillStyle=bg;g.fillRect(0,0,W_,H_);if(band){g.fillStyle=band;g.fillRect(0,0,W_,H_*0.1)}g.textAlign='center';let y=H_*0.16;lines.forEach((ln,i)=>{const sz=ln.sz||H_*0.12;g.font=`${ln.b?'900':'600'} ${sz}px Arial`;g.fillStyle=ln.col||'#10151f';g.fillText(ln.t,W_/2,y+sz*0.8);y+=sz*1.18});g.font='600 '+H_*0.07+'px Arial';g.fillStyle='#4a5266';g.textAlign='left';g.fillText('IEC 60898-1',W_*0.08,H_*0.96);g.textAlign='right';g.fillText('CE  ▢  IP20',W_*0.92,H_*0.96)})}
 function dev(mods,kind,lines,opts={}){
  const w=MW*mods;const g=new T.Group();
  const body=rbox(w-0.006,H,D,0.018,opts.body||'#e9ecf1',{roughness:.32});g.add(body);box(w*0.9,0.06,0.04,'#c9ced8',0,-H/2+0.03,D/2-0.02,g,{roughness:.6});box(0.1,0.05,0.12,'#f08a2c',0,-H/2-0.015,-0.05,g,{roughness:.5});for(let i=0;i<4;i++)box(w*0.5,0.006,0.02,'#b9bfcb',0,H*0.5-0.1-i*0.02,D/2-0.015,g,{},false);
  box(w*0.94,H*0.64,0.05,opts.face||'#f6f7fa',0,0.13,D/2+0.012,g,{roughness:.25});
  // rótulo impresso
  const lt=lab(lines,Math.round(256*mods),256,{band:opts.band});const lp=new T.Mesh(new T.PlaneGeometry(w*0.9,H*0.36),new T.MeshBasicMaterial({map:lt}));lp.position.set(0,0.27,D/2+0.043);g.add(lp);
  // alavanca(s)
  box(w*0.82,0.24,0.04,'#161a22',0,-0.07,D/2+0.045,g);
  const levers=[];for(let i=0;i<mods;i++){const lv=new T.Group();lv.position.set((i-(mods-1)/2)*MW,-0.07,D/2+0.07);g.add(lv);box(MW*0.55,0.15,0.11,'#101319',0,0.0,0.03,lv,{roughness:.35});box(MW*0.4,0.03,0.04,'#2a303d',0,0.045,0.09,lv);levers.push(lv)}
  if(mods>1)box(w*0.8,0.03,0.03,'#101319',0,0.1,D/2+0.1,g);
  // janelas de terminais + parafusos
  const screws=[];[-1,1].forEach(s=>{for(let i=0;i<mods;i++){const x=(i-(mods-1)/2)*MW;box(MW*0.7,0.1,0.07,'#8f97a8',x,s*0.41,D/2-0.01,g,{roughness:.6});box(MW*0.5,0.05,0.07,'#10131a',x,s*0.41,D/2+0.015,g);const sc=new T.Group();sc.position.set(x,s*0.41,D/2+0.05);g.add(sc);const sh=cyl(0.038,0.03,'#d3d8e2',0,0,0,sc,18,{metalness:.8,roughness:.3});sh.rotation.x=Math.PI/2;box(0.06,0.012,0.012,'#2a303d',0,0,0.017,sc);box(0.012,0.06,0.012,'#2a303d',0,0,0.017,sc);screws.push(sc)}});
  // extras
  if(kind==='dr'){const tb=box(0.07,0.05,0.04,'#ffc400',0.05,0.0,D/2+0.09,g);box(0.9*w,0.03,0.02,'#2f7bff',0,0.46-0.0,D/2+0.043,g);g.userData.tb=tb}
  if(kind==='dps'){const win=box(0.12,0.07,0.03,'#2ecc71',-0.0,0.02,D/2+0.09,g,{emissive:'#2ecc71',emissiveIntensity:.9});g.userData.win=win}
  Object.assign(g.userData,{levers,screws,body,w});return g}
 const DG=W.dg=dev(2,'dg',[{t:'C63',sz:104,b:1},{t:'2P  230V~',sz:34},{t:'3000 A',sz:30}],{band:'#e03c5a'});
 const DR=W.dr=dev(2,'dr',[{t:'DR 40A',sz:80,b:1},{t:'30 mA  2P',sz:36},{t:'TEST ▸',sz:30}],{band:'#2f7bff'});
 const DPS=W.dps=dev(2,'dps',[{t:'DPS',sz:92,b:1},{t:'275V~  20 kA',sz:34},{t:'Classe II',sz:30}],{body:'#c4cad6',face:'#d9dde6',band:'#ffc400'});
 [[DG,-0.40,ROW1],[DR,0.0,ROW1],[DPS,0.40,ROW1]].forEach(([d,x,y])=>{d.position.set(x,y,0.19);d.userData.home=[x,y];Q.add(d)});
 const cb=[['ILUMINAÇÃO','C10'],['TOMADAS','C20'],['COZINHA','C20'],['AR COND.','C16'],['CHUVEIRO','C32']];
 W.cb=cb.map(([n,r],i)=>{const d=dev(1,'cb',[{t:r,sz:112,b:1},{t:'1P',sz:36},{t:'230V~',sz:30}],{band:'#9aa3b4'});const x=-0.4+0.2*i;d.position.set(x,ROW2,0.19);d.userData.home=[x,ROW2];Q.add(d);return d});
 // barra pente vermelha (fase) nos disjuntores
 W.comb=box(1.06,0.07,0.06,'#d93a3a',0,ROW2+0.46,0.43,Q,{roughness:.4});for(let i=0;i<5;i++)box(0.05,0.12,0.05,'#d93a3a',(-0.4+0.2*i),-0.06,0,W.comb);
 // barramentos neutro (azul, isolado) e terra (verde)
 function bar(x,color,n){const g=new T.Group();g.position.set(x,ROW3,0.19);Q.add(g);box(0.95,0.2,0.16,color,0,0,0,g,{roughness:.35});box(0.95,0.05,0.2,'#d2a05a',0,0.0,0.03,g,{metalness:.8,roughness:.3});const sc=[];for(let i=0;i<n;i++){const s=new T.Group();s.position.set(-0.4+i*(0.8/(n-1)),0,0.1);g.add(s);const sh=cyl(0.04,0.04,'#d3d8e2',0,0,0,s,16,{metalness:.8,roughness:.3});sh.rotation.x=Math.PI/2;box(0.07,0.014,0.014,'#2a303d',0,0,0.022,s);sc.push(s)}g.userData.screws=sc;return g}
 W.nb=bar(-0.57,'#2f7bff',7);W.tb=bar(0.57,'#1fa85a',7);
 // cabos (tubos). wire(): fio de ligação; o desenho pode ser revelado por drawRange
 function wire(pts,col,r=0.03,o={}){const curve=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));const geo=new T.TubeGeometry(curve,90,r,10,false);const m=new T.Mesh(geo,M(col,Object.assign({roughness:.5},o)));m.castShadow=true;Q.add(m);return {m,geo,curve,total:geo.index.count}}
 const zc=0.38,TOP=1.96,BOT=1.14;
 // alimentação 16 mm² (já ligada: continuação da parte 1)
 W.inF=wire([[-0.2,2.9,zc],[-0.495,2.55,zc],[-0.5,2.12,0.55],[-0.495,TOP,0.49]],COL.fase,0.045);
 W.inN=wire([[0.2,2.9,zc],[-0.3,2.45,zc],[-0.31,2.12,0.55],[-0.305,TOP,0.49]],COL.neutro,0.045);
 W.inT=wire([[0.9,2.9,zc],[1.22,2.3,zc],[1.22,-1.0,zc],[0.97,-1.15,0.4],[0.97,ROW3,0.3]],COL.terra,0.045);
 // DG (saída) -> DR (entrada): jumpers contornando o DG pela esquerda e por cima (não cobrem os rótulos)
 W.gF=wire([[-0.495,BOT,0.49],[-0.5,0.98,0.58],[-0.7,0.95,0.6],[-0.74,1.5,0.62],[-0.7,2.15,0.6],[-0.3,2.19,0.62],[-0.12,2.17,0.58],[-0.095,TOP,0.49]],COL.fase);
 W.gN=wire([[-0.305,BOT,0.49],[-0.31,0.92,0.62],[-0.82,0.9,0.66],[-0.86,1.5,0.68],[-0.8,2.27,0.66],[-0.2,2.29,0.66],[0.07,2.26,0.6],[0.095,TOP,0.49]],COL.neutro);
 // DPS: fase e neutro (tirados da entrada do DR) e saída comum para o terra
 W.pF=wire([[-0.095,TOP,0.49],[-0.06,2.34,0.6],[0.25,2.36,0.6],[0.305,TOP,0.49]],COL.fase,0.026);
 W.pN=wire([[0.095,TOP,0.49],[0.13,2.43,0.68],[0.45,2.42,0.62],[0.495,TOP,0.49]],COL.neutro,0.026);
 W.pT=wire([[0.305,BOT,0.49],[0.33,1.0,0.58],[0.495,BOT-0.02,0.5],[0.6,0.97,0.6],[1.07,0.9,0.55],[1.07,-0.9,0.5],[0.83,-1.15,0.4],[0.83,ROW3,0.3]],COL.terra,0.028);
 // DR (saída) -> circuitos: fase para o pente; neutro para o barramento de neutro (isolado)
 W.dF=wire([[-0.095,BOT,0.49],[-0.095,0.98,0.6],[-0.4,0.9,0.62],[-0.4,0.75,0.52],[-0.4,ROW2+0.41,0.49]],COL.fase);
 W.dN=wire([[0.095,BOT,0.49],[0.1,0.95,0.66],[-0.6,0.86,0.66],[-1.16,0.7,0.58],[-1.16,-0.9,0.52],[-0.97,-1.15,0.4],[-0.97,ROW3,0.3]],COL.neutro);
 // circuito do chuveiro até o aparelho (fora do quadro)
 
 W.cF=wire([[0.4,ROW2-0.41,0.49],[0.4,-0.42,0.6],[0.9,-0.52,0.62],[1.6,-0.6,0.5],[2.05,-0.5,0.1],[LX-0.32,LY+0.1,-0.06]],COL.fase);
 W.cN=wire([[-0.17,ROW3,0.3],[-0.17,-1.12,0.45],[0.2,-0.86,0.62],[1.0,-0.8,0.62],[1.6,-0.78,0.5],[2.05,-0.7,0.1],[LX-0.32,LY-0.1,-0.06]],COL.neutro);
 // aparelho na parede (sem marca)
 const ap=W.ap=new T.Group();ap.position.set(LX,LY,-0.32);Q.add(ap);const apb=rbox(0.66,0.95,0.3,0.06,'#eef1f6',{roughness:.3});ap.add(apb);
 const apt=tex(T,256,96,(g,w,h)=>{g.fillStyle='#eef1f6';g.fillRect(0,0,w,h);g.fillStyle='#10151f';g.font='900 40px Arial';g.textAlign='center';g.fillText('APARELHO',w/2,h*0.65)});
 const app=new T.Mesh(new T.PlaneGeometry(0.56,0.21),new T.MeshBasicMaterial({map:apt}));app.position.set(0,0.25,0.17);ap.add(app);cyl(0.05,0.02,'#2ecc71',0,-0.2,0.16,ap,16,{emissive:'#2ecc71',emissiveIntensity:.8}).rotation.x=Math.PI/2;W.apLed=ap.children[ap.children.length-1];
 // mão (pessoa encostando no aparelho)
 const skin='#d39a72';const hand=W.hand=new T.Group();Q.add(hand);
 const arm=cyl(0.11,1.3,skin,0.65,0,0,hand,20,{roughness:.6});arm.rotation.z=Math.PI/2;cyl(0.13,0.5,'#33507a',1.45,0,0,hand,20,{roughness:.8}).rotation.z=Math.PI/2;
 box(0.12,0.3,0.26,skin,0.0,0,0,hand,{roughness:.6});for(let i=0;i<4;i++){const f=cyl(0.035,0.2,skin,-0.12,0.1-i*0.065,0.05,hand,10,{roughness:.6});f.rotation.z=Math.PI/2}
 const th=cyl(0.04,0.16,skin,-0.03,0.13,0.14,hand,10,{roughness:.6});th.rotation.z=1.0;
 W.handHome=new T.Vector3(LX+0.42,LY-0.08,0.0);
 // fios "proibidos" (fantasmas piscando)
 W.bad1=wire([[-0.17,ROW3-0.05,0.36],[0,ROW3-0.3,0.5],[0.17,ROW3-0.05,0.36]],'#ff3b3b',0.022,{transparent:true,opacity:.0,emissive:'#ff2020',emissiveIntensity:.6});
 W.bad2=wire([[-0.75,ROW3+0.05,0.36],[-1.3,0.2,0.75],[-1.0,2.25,0.7],[-0.31,2.3,0.5]],'#ff3b3b',0.022,{transparent:true,opacity:.0,emissive:'#ff2020',emissiveIntensity:.6});
 // fluxos de corrente (bolinhas brilhantes)
 function flow(pts,n,col,r=0.035){const curve=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));const mat=new T.MeshBasicMaterial({color:col,transparent:true,opacity:1});const geo=new T.SphereGeometry(r,12,10);const ms=[];for(let i=0;i<n;i++){const m=new T.Mesh(geo,mat);m.visible=false;Q.add(m);ms.push(m)}return {curve,ms,mat,n}}
 const Z=0.62;
 W.fVai=flow([[-0.2,2.9,0.5],[-0.495,2.3,0.6],[-0.495,1.55,Z],[-0.495,1.0,Z],[-0.7,0.97,0.66],[-0.74,1.5,0.66],[-0.7,2.15,0.66],[-0.12,2.17,0.64],[-0.095,1.55,Z],[-0.095,1.0,Z],[-0.4,0.85,Z],[-0.4,0.66,0.55],[0.0,0.7,0.52],[0.4,0.66,0.55],[0.4,0.2,Z],[0.4,-0.42,Z],[1.0,-0.52,0.66],[1.6,-0.6,0.54],[2.05,-0.5,0.14],[LX-0.3,LY+0.1,0.0]],14,'#ffe14d');
 W.fVolta=flow([[LX-0.3,LY-0.1,0.0],[2.05,-0.7,0.14],[1.6,-0.78,0.54],[1.0,-0.8,0.66],[0.2,-0.86,0.66],[-0.17,-1.12,0.5],[-0.57,ROW3+0.02,0.5],[-0.97,-1.15,0.45],[-1.16,-0.9,0.56],[-1.16,0.7,0.62],[-0.6,0.86,0.7],[0.095,0.98,Z],[0.095,1.55,Z],[0.07,2.26,0.66],[-0.8,2.27,0.7],[-0.86,1.5,0.72],[-0.82,0.9,0.7],[-0.305,0.95,Z],[-0.305,1.55,Z],[-0.31,2.3,0.6],[0.2,2.9,0.5]],14,'#7fd0ff');
 W.fFuga=flow([[LX-0.25,LY,0.02],[LX+0.1,LY-0.05,0.05],[LX+0.8,LY-0.08,0.05],[LX+1.4,LY-0.1,0.1],[LX+1.6,-1.6,0.6],[LX+1.5,-2.9,1.0]],9,'#ff2a2a',0.045);
 W.fSurto=flow([[-0.2,3.3,0.5],[-0.495,2.4,0.6],[-0.495,1.55,Z],[-0.495,1.0,Z],[-0.7,0.97,0.66],[-0.74,1.5,0.66],[-0.7,2.15,0.66],[-0.12,2.2,0.66],[0.1,2.35,0.66],[0.305,2.1,Z],[0.305,1.55,Z],[0.305,1.05,Z],[0.6,0.97,0.64],[1.07,0.9,0.6],[1.07,-0.9,0.56],[0.83,-1.2,0.48],[0.97,-1.25,0.45],[1.22,-1.0,0.45],[1.22,2.3,0.45],[0.9,3.3,0.45]],16,'#fff6a0',0.05);
 // raio do surto (zigue-zague)
 const bolt=new T.Shape();[[0,0],[0.18,0],[0.06,-0.32],[0.22,-0.32],[-0.08,-0.8],[0.0,-0.42],[-0.14,-0.42]].forEach(([x,y],i)=>i?bolt.lineTo(x,y):bolt.moveTo(x,y));
 W.bolt=new T.Mesh(new T.ExtrudeGeometry(bolt,{depth:0.04,bevelEnabled:false}),new T.MeshBasicMaterial({color:'#ffe14d'}));W.bolt.position.set(-0.25,3.75,0.6);W.bolt.visible=false;Q.add(W.bolt);
 W.parts=[W.dg,W.dr,W.dps,...W.cb];
 // título fixo menor (cabe na largura)
 const tt=document.getElementById('title');if(tt){tt.style.fontSize='64px';tt.style.top='250px'}
}
function runFlow(F,t,speed,frac,on){if(!on){F.ms.forEach(m=>m.visible=false);return}F.ms.forEach((m,i)=>{const show=(i/F.n)<frac;m.visible=show;if(!show)return;const u=((t*speed+i/F.n)%1+1)%1;m.position.copy(F.curve.getPointAt(u))})}
const K=(c)=>{const {N,E}=c,tEnd=N[7];return [
 [0,             [0.0,1.0,7.6],[0,1.2,0]],
 [E.erro,        [0.0,1.45,5.0],[0,1.5,0]],
 [N[1]-0.05,     [0.0,1.45,4.9],[0,1.5,0]],
 [E.choque,      [0.5,0.5,9.6],[0.55,0.35,0]],
 [N[2],          [0.6,0.4,9.4],[0.6,0.3,0]],
 [E.pessoa,      [1.8,-0.1,6.6],[1.9,-0.4,0]],
 [E.desarma-0.2, [1.2,0.3,7.2],[1.0,0.0,0]],
 [E.desarma+0.5, [0.1,1.4,5.4],[0,1.45,0]],
 [N[3]+0.2,      [0.0,1.4,5.6],[0,1.4,0]],
 [E.n_passa,     [-0.2,0.85,9.0],[-0.2,0.85,0]],
 [N[4],          [0.0,0.8,8.6],[0,0.75,0]],
 [E.dps,         [0.3,1.6,5.4],[0.3,1.6,0]],
 [E.nt+0.6,      [0.3,1.6,5.2],[0.3,1.6,0]],
 [E.surto,       [0.4,0.8,9.6],[0.4,0.6,0]],
 [N[5],          [0.4,0.6,9.4],[0.4,0.5,0]],
 [E.aterr,       [0.7,-0.4,6.2],[0.8,-0.8,0]],
 [N[6],          [0.4,0.4,8.6],[0.3,0.4,0]],
 [E.bornes,      [-0.1,1.5,4.8],[0,1.5,0]],
 [E.teste,       [0.1,1.5,4.2],[0.05,1.5,0]],
 [tEnd-0.05,     [0.0,1.2,6.4],[0,1.2,0]],
 [tEnd,          [0.0,0.3,13.0],[0,0,0]],
 [1e9,           [0.0,0.3,13.0],[0,0,0]]]};
function camPose(c){const k=K(c),t=c.tn;let i=0;while(i<k.length-2&&t>=k[i+1][0])i++;const a=k[i],b=k[i+1],dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));const p=a[1].map((v,j)=>lerp(v,b[1][j],f)),l=a[2].map((v,j)=>lerp(v,b[2][j],f));const d=Math.hypot(p[0]-l[0],p[1]-l[1],p[2]-l[2]);l[1]-=0.05*d;return {p,l}}
function render(c){
 const {THREE,N,E,seg,eob,tn:t,camera}=c,T=THREE,tEnd=N[7];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // porta já aberta (continuação)
 W.door.rotation.y=-1.9*seg(t,0,0.6);
 // DR: dispara na fuga, volta a ligar na fala 4; dispara de novo no teste e é religado
 const trip1=t>=E.desarma&&t<N[3]+0.4, rearm1=seg(t,N[3]+0.4,N[3]+0.8);
 const trip2=t>=E.teste+0.5&&t<E.teste+1.7;
 let drOff=0;if(t>=E.desarma)drOff=trip1?seg(t,E.desarma,E.desarma+0.12):1-rearm1;if(trip2)drOff=seg(t,E.teste+0.5,E.teste+0.62);else if(t>=E.teste+1.7)drOff=1-seg(t,E.teste+1.7,E.teste+2.1);
 if(t<E.desarma)drOff=0;
 W.dr.userData.levers.forEach(lv=>{lv.rotation.x=1.0*drOff;lv.position.y=-0.07-0.09*drOff});
 // botão de teste afunda
 const tb=W.dr.userData.tb;if(tb){const p=seg(t,E.teste,E.teste+0.25)*(1-seg(t,E.teste+0.8,E.teste+1.0));tb.position.z=0.25+0.09-0.035*p;tb.material.emissive=new T.Color('#ffc400');tb.material.emissiveIntensity=(t>=E.teste-0.3&&t<E.teste+1.5)?0.6+0.4*Math.sin(t*20):0}
 // ---------- correntes ----------
 const l2=t>=N[1]&&t<N[3]; // falas 2 e 3
 const vaiOn=l2&&t>=E.vai-0.3&&!(t>=E.desarma);
 const voltaOn=l2&&t>=E.volta-0.3&&!(t>=E.desarma);
 const fugaK=seg(t,E.foge,E.foge+0.5);
 runFlow(W.fVai,t,0.18,1,vaiOn);
 runFlow(W.fVolta,t,0.18,1-0.45*fugaK,voltaOn);
 runFlow(W.fFuga,t,0.55,1,t>=E.foge&&t<E.desarma);
 // mão entra e sai
 const hin=seg(t,E.foge-0.6,E.foge-0.05)*(1-seg(t,E.desarma+0.3,E.desarma+0.9));
 W.hand.visible=hin>0.01;W.hand.position.copy(W.handHome).add(new T.Vector3(1.6*(1-hin),0,0.5*(1-hin)));
 W.apLed.material.emissiveIntensity=(t>=E.desarma&&t<N[3]+0.4)?0:0.8;W.apLed.material.color.set((t>=E.desarma&&t<N[3]+0.4)?'#444b57':'#2ecc71');
 // ---------- fala 4: neutro ----------
 const l4=t>=N[3]&&t<N[4];
 const glowN=l4&&t>=E.n_neutro?0.5+0.5*Math.sin(t*9):0;[W.dN,W.cN].forEach(w=>{w.m.material.emissive=new T.Color('#2f7bff');w.m.material.emissiveIntensity=glowN*0.9});
 const b1=l4&&t>=E.n_terra?(0.45+0.4*Math.sin(t*14)):0,b2=l4&&t>=E.n_antes?(0.45+0.4*Math.sin(t*14)):0;
 W.bad1.m.material.opacity=b1;W.bad1.m.visible=b1>0;W.bad2.m.material.opacity=b2;W.bad2.m.visible=b2>0;
 // ---------- fala 5/6: DPS e terra ----------
 const sOn=t>=E.surto&&t<E.surto+2.2;runFlow(W.fSurto,t,0.9,seg(t,E.surto,E.surto+0.3),sOn);
 W.bolt.visible=t>=E.surto-0.1&&t<E.surto+0.7&&Math.sin(t*40)>-0.3;
 const win=W.dps.userData.win;if(win){win.material.emissiveIntensity=sOn?1.5+Math.sin(t*30):0.9}
 const dpsPulse=(t>=E.ft&&t<E.ft+1.2)?1:(t>=E.nt&&t<E.nt+1.2)?2:0;
 W.pF.m.material.emissive=new T.Color('#ff3b3b');W.pF.m.material.emissiveIntensity=dpsPulse===1?0.6+0.4*Math.sin(t*12):0;
 W.pN.m.material.emissive=new T.Color('#4aa8ff');W.pN.m.material.emissiveIntensity=dpsPulse===2?0.6+0.4*Math.sin(t*12):0;
 const tg=(t>=E.ft&&t<N[5])?0.25:0,tgA=(t>=E.alerta&&t<N[6])?0.6+0.4*Math.sin(t*8):0;
 [W.pT,W.inT].forEach(w=>{w.m.material.emissive=new T.Color('#2ecc71');w.m.material.emissiveIntensity=Math.max(tg,tgA)});
 W.tb.children[0].material.emissive=new T.Color('#2ecc71');W.tb.children[0].material.emissiveIntensity=tgA*0.7;
 // ---------- fala 7: bornes ----------
 const tight=seg(t,E.bornes,E.bornes+1.6);W.parts.forEach(d=>d.userData.screws.forEach(s=>s.rotation.z=tight*Math.PI*6));W.nb.userData.screws.forEach(s=>s.rotation.z=tight*Math.PI*6);W.tb.userData.screws.forEach(s=>s.rotation.z=tight*Math.PI*6);
 // ---------- rótulos (na hora da fala) ----------
 const L=(id,txt,pos,bg,fg,t0,t1)=>c.label(id,txt,pos,{bg,fg,a:(t>=t0&&t<t1)?seg(t,t0,t0+0.25)*(1-seg(t,t1-0.15,t1)):0,s:eob((t-t0)/0.3)});
 const V=(x,y,z=0.6)=>new T.Vector3(x,y,z);
 L('err','DR LIGADO ERRADO?',V(0,ROW1+0.85),'#e53935','#fff',E.erro-0.2,N[1]-0.1);
 L('dr','DR · CHOQUE',V(0,ROW1+0.85),'#2f7bff','#fff',E.protege,E.vai);
 L('vai','VAI',V(0.9,-0.38),'#ffc400','#10151f',E.vai,N[2]-0.1);
 L('vol','VOLTA',V(0.9,-1.0),'#4aa8ff','#fff',E.volta,N[2]-0.1);
 L('eq','VAI = VOLTA ✓',V(0.1,ROW1+0.9),'#1fa85a','#fff',E.volta+0.5,N[2]-0.1);
 L('fuga','FUGA',V(LX+0.6,LY+0.45,0.3),'#e53935','#fff',E.foge,E.desarma+0.4);
 L('neq','VAI ≠ VOLTA',V(0.1,ROW1+0.9),'#e53935','#fff',E.foge+0.4,E.desarma);
 L('des','DESARMOU!',V(0,ROW1+0.85),'#e53935','#fff',E.desarma,N[3]-0.1);
 L('npd','NEUTRO PASSA PELO DR',V(0.25,1.3),'#2f7bff','#fff',E.n_passa,N[4]-0.1);
 L('x1','✕ NEUTRO NO TERRA',V(0.55,ROW3+0.5),'#e53935','#fff',E.n_terra,N[4]-0.1);
 L('x2','✕ NEUTRO DE ANTES',V(-0.8,2.75),'#e53935','#fff',E.n_antes,N[4]-0.1);
 L('dps','DPS · SURTO',V(0.4,ROW1+0.85),'#ffc400','#10151f',E.dps,E.ft);
 L('ft','FASE → TERRA',V(0.4,ROW1+0.85),'#e53935','#fff',E.ft,E.nt);
 L('nt','NEUTRO → TERRA',V(0.4,ROW1+0.85),'#2f7bff','#fff',E.nt,E.surto);
 L('su','SURTO → TERRA',V(0.9,0.3),'#ffc400','#10151f',E.surto,N[5]-0.1);
 L('at','⚠ BOM ATERRAMENTO',V(0.6,ROW3-0.55),'#1fa85a','#fff',E.alerta,N[6]-0.1);
 L('bo','APERTE OS BORNES',V(0,ROW1-0.75),'#fff','#10151f',E.bornes,E.teste);
 L('te','TESTE · TODO MÊS',V(0.05,ROW1+0.85),'#ffc400','#10151f',E.teste,tEnd-0.1);
 // efeitos
 if(t>=E.erro&&t<E.erro+0.35)c.doFlash(E.erro,0.35,0.35,'#ff2a2a');
 if(t>=E.desarma&&t<E.desarma+0.4)c.doFlash(E.desarma,0.4,0.4,'#ff2a2a');
 if(t>=E.surto&&t<E.surto+0.35)c.doFlash(E.surto,0.55,0.35,'#fff6a0');
 if(t>=E.surto&&t<E.surto+0.5)c.shake=0.6;
 if(t>=E.bornes&&t<E.bornes+1.5)c.shake=0.25;
 if(t>=E.teste+0.5&&t<E.teste+0.8)c.doFlash(E.teste+0.5,0.25,0.3,'#ffc400');
 c.vig=0.28;
}
return{init,render,keywords,title}})();
