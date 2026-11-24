// Cena 3D "NR-10 #1: por que existe" (bancada, estilo do QDC): parede perfurada, quadro com seccionadora,
// placa de risco elétrico, bancada de madeira com EPIs (capacete, luvas isolantes, detector de tensão,
// cadeado e etiqueta de bloqueio), manual da norma e procedimento. Tudo sem marca.
window.SCENE=(function(){
let W={};
const keywords=['choque','matar','nr10','norma','segurança','eletricidade','projeta','instala','opera','manutenção','treinamento','procedimentos','proteção','alerta','treinado','autorizado','segredo','antes','fio'];
const title='NR-10';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
const BY=-3.0; // tampo da bancada
const PX=0.95,PY=1.25; // quadro na parede
function tex(T,w,h,draw){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');draw(g,w,h);const t=new T.CanvasTexture(cv);t.anisotropy=4;return t}
function bolt(g,cx,cy,s,col){g.fillStyle=col;g.beginPath();g.moveTo(cx+0.1*s,cy-0.5*s);g.lineTo(cx-0.22*s,cy+0.06*s);g.lineTo(cx-0.01*s,cy+0.06*s);g.lineTo(cx-0.12*s,cy+0.5*s);g.lineTo(cx+0.24*s,cy-0.1*s);g.lineTo(cx+0.03*s,cy-0.1*s);g.closePath();g.fill()}
function tri(g,cx,cy,s){g.fillStyle='#10151f';g.beginPath();g.moveTo(cx,cy-0.55*s);g.lineTo(cx+0.62*s,cy+0.5*s);g.lineTo(cx-0.62*s,cy+0.5*s);g.closePath();g.fill();g.fillStyle='#ffc400';g.beginPath();g.moveTo(cx,cy-0.42*s);g.lineTo(cx+0.5*s,cy+0.43*s);g.lineTo(cx-0.5*s,cy+0.43*s);g.closePath();g.fill();bolt(g,cx,cy+0.08*s,0.62*s,'#10151f')}
function init(c){
 const {THREE,scene,renderer}=c,T=THREE;W.T=T;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 scene.background=new T.Color('#10151f');scene.fog=new T.Fog('#10151f',14,30);
 scene.add(new T.HemisphereLight('#dfe9ff','#2a2018',0.75));
 const key=new T.DirectionalLight('#fff4e0',1.35);key.position.set(2.5,5,6);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:1,far:20});key.shadow.bias=-0.0004;scene.add(key);
 const fill=new T.PointLight('#8fb4ff',0.7,16);fill.position.set(-4,1,5);scene.add(fill);
 W.spark=new T.PointLight('#ffd36b',0,4);W.spark.position.set(PX-0.35,PY-1.6,0.3);scene.add(W.spark);
 W.red=new T.PointLight('#ff3030',0,12);W.red.position.set(-1.2,1.5,2.5);scene.add(W.red);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,roughness:.45,metalness:.05},o));
 const box=(w,h,d,col,x=0,y=0,z=0,p=scene,o={},cast=true)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),M(col,o));m.position.set(x,y,z);m.castShadow=cast;m.receiveShadow=true;p.add(m);return m};
 const cyl=(r,h,col,x=0,y=0,z=0,p=scene,s=20,o={},r2)=>{const m=new T.Mesh(new T.CylinderGeometry(r,r2==null?r:r2,h,s),M(col,o));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;p.add(m);return m};
 const sph=(r,col,x=0,y=0,z=0,p=scene,o={})=>{const m=new T.Mesh(new T.SphereGeometry(r,20,14),M(col,o));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m};
 const plane=(w,h,t,x,y,z,p=scene)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map:t,roughness:.6}));m.position.set(x,y,z);m.receiveShadow=true;p.add(m);return m};
 function rbox(w,h,d,r,col,o={}){const sh=new T.Shape();const x=-w/2,y=-h/2;sh.moveTo(x+r,y);sh.lineTo(x+w-r,y);sh.quadraticCurveTo(x+w,y,x+w,y+r);sh.lineTo(x+w,y+h-r);sh.quadraticCurveTo(x+w,y+h,x+w-r,y+h);sh.lineTo(x+r,y+h);sh.quadraticCurveTo(x,y+h,x,y+h-r);sh.lineTo(x,y+r);sh.quadraticCurveTo(x,y,x+r,y);const g=new T.ExtrudeGeometry(sh,{depth:Math.max(0.005,d-0.03),bevelEnabled:true,bevelThickness:0.015,bevelSize:0.012,bevelSegments:2,curveSegments:6});g.translate(0,0,-d/2+0.015);const m=new T.Mesh(g,M(col,o));m.castShadow=true;m.receiveShadow=true;return m}

 // ---------- parede perfurada + bancada de madeira ----------
 const wallTex=tex(T,512,512,(g,w,h)=>{g.fillStyle='#1d2636';g.fillRect(0,0,w,h);for(let y=16;y<h;y+=32)for(let x=16;x<w;x+=32){g.fillStyle='#0f1520';g.beginPath();g.arc(x,y,5,0,7);g.fill();g.strokeStyle='rgba(120,150,200,.12)';g.beginPath();g.arc(x-1,y-1,5,3.6,5.6);g.stroke()}});wallTex.wrapS=wallTex.wrapT=T.RepeatWrapping;wallTex.repeat.set(5,5);
 const wall=new T.Mesh(new T.PlaneGeometry(16,12),new T.MeshStandardMaterial({map:wallTex,roughness:.9}));wall.position.set(0,1.5,-0.62);wall.receiveShadow=true;scene.add(wall);
 const woodTex=tex(T,512,512,(g,w,h)=>{g.fillStyle='#a8743f';g.fillRect(0,0,w,h);for(let i=0;i<64;i++){g.fillStyle=`rgba(${70+Math.random()*40},${40+Math.random()*25},20,${0.12+Math.random()*0.15})`;g.fillRect(0,Math.random()*h,w,1+Math.random()*3)}for(let i=0;i<6;i++){g.fillStyle='rgba(60,35,15,.5)';g.fillRect(i*85,0,2,h)}});
 const bench=new T.Mesh(new T.BoxGeometry(12,0.25,4.5),new T.MeshStandardMaterial({map:woodTex,roughness:.7}));bench.position.set(0,BY-0.125,1.55);bench.receiveShadow=true;scene.add(bench);
 box(12,1.4,0.3,'#2a2f3b',0,-3.95,3.7);box(0.3,3,4,'#2a2f3b',-5.6,-4.6,1.6);box(0.3,3,4,'#2a2f3b',5.6,-4.6,1.6);
 box(7,0.1,0.5,'#8a5a2f',0,4.6,-0.35);cyl(0.22,0.5,'#2a2f3b',2.2,4.95,-0.3,scene,20);
 // ganchos de painel perfurado com ferramentas penduradas (fundo)
 const hang=new T.Group();hang.position.set(-2.55,0.9,-0.5);scene.add(hang);cyl(0.06,0.8,'#ff8a3d',0,0,0.05,hang);cyl(0.018,0.6,'#c9d4f0',0,-0.7,0.05,hang);
 const hang2=new T.Group();hang2.position.set(2.55,-0.2,-0.5);scene.add(hang2);box(0.12,0.9,0.06,'#c93a3a',-0.08,0,0.05,hang2);box(0.12,0.9,0.06,'#c93a3a',0.08,0,0.05,hang2);box(0.1,0.35,0.07,'#aab4c8',0,0.6,0.05,hang2,{metalness:.6});

 // ---------- placa de risco elétrico (parede) ----------
 const signT=tex(T,640,768,(g,w,h)=>{g.fillStyle='#ffffff';g.fillRect(0,0,w,h);g.fillStyle='#d61f2b';g.fillRect(0,0,w,170);g.fillStyle='#fff';g.font='900 120px Arial';g.textAlign='center';g.fillText('PERIGO',w/2,128);tri(g,w/2,380,330);g.fillStyle='#10151f';g.font='900 64px Arial';g.fillText('RISCO DE',w/2,640);g.fillText('CHOQUE ELÉTRICO',w/2,715);g.strokeStyle='#10151f';g.lineWidth=10;g.strokeRect(5,5,w-10,h-10)});
 W.sign=new T.Group();W.sign.position.set(-1.45,2.0,-0.55);scene.add(W.sign);box(1.36,1.62,0.03,'#e9ecf1',0,0,0,W.sign);plane(1.3,1.56,signT,0,0,0.02,W.sign);
 [[-0.55,0.68],[0.55,0.68],[-0.55,-0.68],[0.55,-0.68]].forEach(([x,y])=>{const s=cyl(0.03,0.02,'#c9d4f0',x,y,0.03,W.sign,12,{metalness:.8});s.rotation.x=Math.PI/2});

 // ---------- projeto elétrico (planta) presa na parede ----------
 const bpT=tex(T,640,448,(g,w,h)=>{g.fillStyle='#1c4f9c';g.fillRect(0,0,w,h);g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=4;g.strokeRect(30,30,w-60,h-60);g.lineWidth=3;g.strokeRect(60,60,260,180);g.strokeRect(320,60,260,180);g.strokeRect(60,240,520,150);g.beginPath();[[110,110],[450,110],[200,310],[480,310]].forEach(([x,y])=>{g.moveTo(x+14,y);g.arc(x,y,14,0,7)});g.stroke();g.setLineDash([10,8]);g.beginPath();g.moveTo(110,110);g.lineTo(450,110);g.lineTo(480,310);g.moveTo(110,110);g.lineTo(200,310);g.stroke();g.setLineDash([]);g.fillStyle='#fff';g.font='700 30px Arial';g.fillText('PROJETO ELÉTRICO',360,420)});
 W.bp=new T.Group();W.bp.position.set(-1.5,-0.55,-0.58);scene.add(W.bp);plane(1.3,0.91,bpT,0,0,0,W.bp);[[-0.58,0.38],[0.58,0.38]].forEach(([x,y])=>sph(0.04,'#e53935',x,y,0.02,W.bp));

 // ---------- quadro com chave seccionadora ----------
 const P=W.panel=new T.Group();P.position.set(PX,PY,-0.3);scene.add(P);
 const pb=rbox(1.7,2.4,0.6,0.04,'#b8bfca',{metalness:.45,roughness:.38});P.add(pb);
 box(1.6,2.3,0.02,'#c8ced8',0,0,0.31,P,{metalness:.45,roughness:.32});
 box(0.05,0.5,0.04,'#7d8594',-0.83,0.7,0.33,P,{metalness:.7});box(0.05,0.5,0.04,'#7d8594',-0.83,-0.7,0.33,P,{metalness:.7});
 // adesivo de risco na porta
 const stT=tex(T,256,240,(g,w,h)=>{g.clearRect(0,0,w,h);tri(g,w/2,h/2+6,220)});
 const st=new T.Mesh(new T.PlaneGeometry(0.62,0.58),new T.MeshBasicMaterial({map:stT,transparent:true}));st.position.set(-0.25,0.65,0.325);P.add(st);
 // placa amarela da manopla (I / O) + manopla vermelha giratória
 const hpT=tex(T,256,256,(g,w,h)=>{g.fillStyle='#ffc400';g.fillRect(0,0,w,h);g.fillStyle='#10151f';g.font='900 62px Arial';g.textAlign='center';g.fillText('I',w/2,62);g.fillText('O',38,h/2+22);g.font='700 26px Arial';g.fillText('LIGA',w/2,240-150+150);});
 const hp=new T.Mesh(new T.PlaneGeometry(0.62,0.62),new T.MeshStandardMaterial({map:hpT,roughness:.5}));hp.position.set(0.25,-0.4,0.33);P.add(hp);
 W.handle=new T.Group();W.handle.position.set(0.25,-0.4,0.36);P.add(W.handle);
 cyl(0.14,0.08,'#c62828',0,0,0.02,W.handle,24,{roughness:.35}).rotation.x=Math.PI/2;
 const arm=box(0.11,0.4,0.1,'#d32f2f',0,0.14,0.08,W.handle,{roughness:.35});
 // orelha para cadeado
 W.hasp=box(0.05,0.12,0.12,'#9aa3b4',0,0.37,0.08,W.handle,{metalness:.8,roughness:.3});
 // cabo com ponta desencapada saindo por baixo (faísca)
 const cPts=[[-0.35,-1.2,0.0],[-0.4,-1.45,0.25],[-0.25,-1.7,0.45]].map(p=>new T.Vector3(...p));
 const cg=new T.TubeGeometry(new T.CatmullRomCurve3(cPts),30,0.045,10,false);const cm=new T.Mesh(cg,M('#1a1d24',{roughness:.6}));cm.castShadow=true;P.add(cm);
 const cu=cyl(0.02,0.14,'#d98a3d',-0.22,-1.76,0.48,P,10,{metalness:.9,roughness:.25});cu.rotation.z=-0.5;
 // faíscas
 W.sparks=[...Array(28)].map((_,i)=>{const m=sph(0.034,'#ffd36b',0,0,0,P,{emissive:'#ffb300',emissiveIntensity:2});m.castShadow=false;m.userData.v=[Math.cos(i*2.4)*(0.6+0.4*((i*7)%5)/5),0.5+((i*3)%7)/6,Math.sin(i*1.7)*0.5+0.4];m.visible=false;return m});
 W.sparkO=new T.Vector3(-0.2,-1.82,0.5);

 // ---------- manual da norma (em pé, encostado) ----------
 const mnT=tex(T,512,680,(g,w,h)=>{g.fillStyle='#f3f5f9';g.fillRect(0,0,w,h);g.fillStyle='#1f4fa3';g.fillRect(0,0,w,250);g.fillStyle='#fff';g.font='900 150px Arial';g.textAlign='center';g.fillText('NR-10',w/2,175);g.fillStyle='#10151f';g.font='800 40px Arial';['SEGURANÇA EM','INSTALAÇÕES E','SERVIÇOS EM','ELETRICIDADE'].forEach((s,i)=>g.fillText(s,w/2,330+i*54));tri(g,w/2,595,120)});
 W.man=new T.Group();W.man.position.set(-2.1,BY,0.15);scene.add(W.man);
 const mb=new T.Group();mb.rotation.x=-0.12;W.man.add(mb);box(0.95,1.26,0.14,'#1f4fa3',0,0.63,0,mb);box(0.9,1.22,0.12,'#f7f3e8',0.025,0.63,0.005,mb);plane(0.93,1.24,mnT,0,0.63,0.075,mb);

 // ---------- prancheta com procedimento ----------
 const prT=tex(T,512,640,(g,w,h)=>{g.fillStyle='#fbfbf7';g.fillRect(0,0,w,h);g.fillStyle='#10151f';g.font='900 46px Arial';g.textAlign='center';g.fillText('PROCEDIMENTO',w/2,80);g.fillText('DE TRABALHO',w/2,132);g.textAlign='left';g.font='700 34px Arial';['ANÁLISE DE RISCO','EPI CONFERIDO','DESENERGIZAR','BLOQUEAR E SINALIZAR','TESTAR AUSÊNCIA','DE TENSÃO'].forEach((s,i)=>{const y=210+i*68;if(i<5){g.strokeStyle='#10151f';g.lineWidth=4;g.strokeRect(36,y-30,34,34)}g.fillText(s,i<5?88:88,y)})});
 W.clip=new T.Group();W.clip.position.set(0.25,BY,0.2);scene.add(W.clip);
 const cb=new T.Group();cb.rotation.x=-0.14;W.clip.add(cb);box(0.86,1.18,0.04,'#8a5a2f',0,0.59,0,cb,{roughness:.8});plane(0.76,0.95,prT,0,0.55,0.025,cb);box(0.36,0.12,0.06,'#aab4c8',0,1.14,0.03,cb,{metalness:.8,roughness:.3});
 W.checks=[...Array(5)].map((_,i)=>{const ck=tex(T,64,64,(g)=>{g.strokeStyle='#1fa85a';g.lineWidth=11;g.lineCap='round';g.beginPath();g.moveTo(10,34);g.lineTo(26,50);g.lineTo(56,12);g.stroke()});const m=new T.Mesh(new T.PlaneGeometry(0.075,0.075),new T.MeshBasicMaterial({map:ck,transparent:true}));m.position.set(-0.301,1.025-(210+i*68-13)/640*0.95,0.03);m.visible=false;cb.add(m);return m});

 // ---------- capacete ----------
 W.helmet=new T.Group();W.helmet.position.set(-0.85,BY,1.75);W.helmet.rotation.y=0.5;scene.add(W.helmet);
 const HM=M('#f5f6f8',{roughness:.28});
 const dome=new T.Mesh(new T.SphereGeometry(0.5,32,18,0,Math.PI*2,0,Math.PI/2),HM);dome.scale.set(1,0.92,1.18);dome.position.y=0.06;dome.castShadow=true;W.helmet.add(dome);
 const ridge=new T.Mesh(new T.SphereGeometry(0.5,24,12,-0.12,0.24,0,Math.PI/2),HM);ridge.scale.set(1.04,0.98,1.22);ridge.position.y=0.06;W.helmet.add(ridge);
 const brim=new T.Mesh(new T.CylinderGeometry(0.58,0.6,0.04,32),HM);brim.scale.set(1,1,1.28);brim.position.set(0,0.07,0.08);brim.castShadow=true;W.helmet.add(brim);
 box(0.08,0.04,0.36,'#d8dbe0',0,0.06,-0.02,W.helmet,{},false).visible=false;
 const band=new T.Mesh(new T.TorusGeometry(0.43,0.025,8,32),M('#2a2f3b'));band.rotation.x=Math.PI/2;band.scale.set(1,1.2,1);band.position.y=0.1;W.helmet.add(band);

 // ---------- luvas isolantes (par) ----------
 function glove(x,z,ry,mir){const g=new T.Group();g.position.set(x,BY+0.06,z);g.rotation.y=ry;scene.add(g);const GM=M('#e0442b',{roughness:.55});
  const cuff=new T.Mesh(new T.CylinderGeometry(0.2,0.24,0.75,20,1,true),GM);cuff.rotation.x=Math.PI/2;cuff.scale.set(1,1,0.42);cuff.position.set(0,0,0.55);cuff.castShadow=true;g.add(cuff);
  const ring=new T.Mesh(new T.TorusGeometry(0.235,0.02,8,24),M('#ffc400'));ring.scale.set(1,0.42,1);ring.position.set(0,0,0.92);g.add(ring);
  const palm=rbox(0.36,0.44,0.13,0.08,'#e0442b',{roughness:.55});palm.rotation.x=-Math.PI/2;palm.position.set(0,0.0,0.0);g.add(palm);
  for(let i=0;i<4;i++){const fl=[0.26,0.3,0.28,0.22][i];const f=cyl(0.045,fl,'#e0442b',-0.13+i*0.087,0.0,-0.22-fl/2,g,12,{roughness:.55});f.rotation.x=Math.PI/2;sph(0.045,'#e0442b',-0.13+i*0.087,0.0,-0.22-fl,g,{roughness:.55})}
  const th=cyl(0.05,0.22,'#e0442b',mir*0.24,0.0,-0.02,g,12,{roughness:.55});th.rotation.x=Math.PI/2;th.rotation.z=mir*0.0;th.rotation.y=mir*0.7;th.position.set(mir*0.26,0,-0.07);
  return g}
 W.g1=glove(0.15,1.5,0.35,1);W.g2=glove(0.7,1.7,0.1,-1);

 // ---------- detector de tensão (tipo caneta) ----------
 W.det=new T.Group();W.det.position.set(1.25,BY+0.07,2.05);W.det.rotation.set(0,0.9,Math.PI/2);scene.add(W.det);
 cyl(0.065,0.55,'#ffc400',0,0,0,W.det,20,{roughness:.35});cyl(0.066,0.18,'#1a1d24',0,0.3,0,W.det,20,{roughness:.5});cyl(0.05,0.2,'#e9ecf1',0,-0.37,0,W.det,16,{roughness:.3},0.02);
 W.detLed=cyl(0.035,0.05,'#4a1010',0,0.41,0,W.det,16,{emissive:'#ff2020',emissiveIntensity:0});
 box(0.02,0.12,0.03,'#1a1d24',0.06,0.12,0,W.det);
 W.detHome=[1.25,BY+0.07,2.05];

 // ---------- cadeado + etiqueta de bloqueio ----------
 W.lock=new T.Group();scene.add(W.lock);
 const lb=rbox(0.22,0.26,0.1,0.03,'#d32f2f',{roughness:.35});lb.position.y=-0.13;W.lock.add(lb);
 const sk=new T.Mesh(new T.TorusGeometry(0.075,0.017,10,24,Math.PI),M('#cfd6e2',{metalness:.85,roughness:.25}));sk.position.y=0.06;W.lock.add(sk);
 cyl(0.017,0.07,'#cfd6e2',-0.075,0.025,0,W.lock,10,{metalness:.85});cyl(0.017,0.07,'#cfd6e2',0.075,0.025,0,W.lock,10,{metalness:.85});
 sph(0.022,'#1a1d24',0,-0.18,0.05,W.lock);
 const tgT=tex(T,256,420,(g,w,h)=>{g.fillStyle='#fff';g.fillRect(0,0,w,h);g.fillStyle='#d61f2b';g.fillRect(0,0,w,150);g.fillStyle='#fff';g.font='900 56px Arial';g.textAlign='center';g.fillText('PERIGO',w/2,100);g.fillStyle='#10151f';g.font='900 46px Arial';g.fillText('NÃO',w/2,230);g.fillText('OPERE',w/2,290);g.font='700 26px Arial';g.fillText('EM MANUTENÇÃO',w/2,370);g.fillStyle='#10151f';g.beginPath();g.arc(w/2,30,14,0,7);g.fill()});
 W.tag=new T.Mesh(new T.PlaneGeometry(0.3,0.5),new T.MeshStandardMaterial({map:tgT,roughness:.6,side:T.DoubleSide}));W.tag.position.set(0.0,-0.55,0.02);W.tag.castShadow=true;W.lock.add(W.tag);
 W.lockHome=[2.1,BY+0.06,1.25];

 // ---------- rolo de cabo e ferramentas na bancada ----------
 const roll=new T.Mesh(new T.TorusGeometry(0.33,0.15,10,28),M('#2f7bff'));roll.rotation.x=Math.PI/2;roll.position.set(2.4,BY+0.15,0.45);roll.castShadow=true;scene.add(roll);W.roll=roll;
 W.tools=new T.Group();W.tools.position.set(-2.0,BY,2.35);W.tools.rotation.y=0.35;scene.add(W.tools);
 const sd=cyl(0.07,0.6,'#ff8a3d',0,0.07,0,W.tools);sd.rotation.z=Math.PI/2;const sdb=cyl(0.02,0.55,'#c9d4f0',0.55,0.07,0,W.tools,10,{metalness:.8});sdb.rotation.z=Math.PI/2;
 const pl=new T.Group();pl.position.set(0.2,0,-0.35);pl.rotation.y=-0.6;W.tools.add(pl);box(0.12,0.06,0.75,'#c93a3a',0.07,0.04,0,pl);box(0.12,0.06,0.75,'#c93a3a',-0.07,0.04,0,pl);box(0.32,0.07,0.3,'#9aa3b4',0,0.04,-0.5,pl,{metalness:.7});

 // halos de destaque (anel no chão / contorno)
 W.ring=new T.Mesh(new T.RingGeometry(0.62,0.7,40),new T.MeshBasicMaterial({color:'#ffc400',transparent:true,opacity:0}));W.ring.rotation.x=-Math.PI/2;W.ring.position.set(0,BY+0.01,0);scene.add(W.ring);
}
const K=(c)=>{const {N,E}=c,tEnd=N[6];return [
 [0,             [0.0,0.4,13.6],[0,-0.4,0]],
 [E.choque-0.2,  [0.3,0.2,10.6],[0.5,-0.1,0]],
 [E.choque+0.7,  [0.6,-0.1,6.4],[0.7,-0.4,0]],
 [E.matar+0.2,   [-0.9,1.6,6.6],[-1.2,1.6,0]],
 [E.norma0-0.2,  [-0.9,1.5,6.3],[-1.2,1.5,0]],
 [N[1],          [-0.2,0.0,11.0],[-0.4,-0.5,0]],
 [E.norma+0.4,   [-2.1,-1.6,4.9],[-2.1,-2.0,0]],
 [E.eletric+0.4, [-2.1,-1.65,4.6],[-2.1,-2.05,0]],
 [N[2],          [-0.3,0.2,10.0],[-0.3,-0.4,0]],
 [E.projeta+0.4, [-1.0,-0.3,7.0],[-1.2,-0.5,0]],
 [E.instala+0.4, [0.9,-1.2,7.2],[1.4,-1.6,0]],
 [E.opera+0.4,   [0.8,0.6,7.0],[0.9,0.3,0]],
 [E.manut+0.4,   [-1.2,-1.4,7.4],[-1.5,-2.2,0.6]],
 [N[3],          [-0.2,0.0,10.6],[-0.2,-0.8,0]],
 [E.proc,        [0.1,-1.3,5.4],[0.25,-2.3,0]],
 [E.prot-0.1,    [0.1,-1.3,5.6],[0.2,-2.3,0]],
 [E.prot+0.6,    [-0.5,-1.1,7.2],[-0.5,-2.6,1.2]],
 [N[4],          [-0.5,-1.0,7.6],[-0.5,-2.4,1.2]],
 [E.alerta+0.3,  [-1.1,1.9,6.8],[-1.4,1.9,0]],
 [E.autorizado+0.2,[-1.1,1.8,6.0],[-1.4,1.8,0]],
 [N[5],          [0.2,0.5,9.6],[0.3,0.2,0]],
 [E.segredo+0.3, [0.9,0.6,5.4],[0.95,0.6,0]],
 [E.antes,       [0.95,0.4,5.2],[0.95,0.4,0]],
 [E.fio+0.3,     [0.6,0.0,6.0],[0.8,0.1,0]],
 [tEnd-0.05,     [0.4,0.0,8.0],[0.6,0.0,0]],
 [tEnd,          [0.0,0.3,13.0],[0,0,0]],
 [1e9,           [0.0,0.3,13.0],[0,0,0]]]};
function camPose(c){const k=K(c),t=c.tn;let i=0;while(i<k.length-2&&t>=k[i+1][0])i++;const a=k[i],b=k[i+1],dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));return {p:a[1].map((v,j)=>lerp(v,b[1][j],f)),l:a[2].map((v,j)=>lerp(v,b[2][j],f))}}
function lift(g,t,t0,t1,h,home){const k=Math.sin(Math.PI*clamp01((t-t0)/(t1-t0)));g.position.y=home+h*k*(t<t0+0.35?ease3(clamp01((t-t0)/0.35)):1)}
function render(c){
 const {THREE,N,E,seg,eob,tn:t,camera}=c,T=THREE,tEnd=N[6];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // faíscas no choque
 const sp=t-E.choque;const on=sp>=0&&sp<1.1;W.spark.intensity=on?(2.5*(1-sp/1.1)*(0.6+0.4*Math.sin(t*80))):0;
 W.sparks.forEach((m,i)=>{const lt=(sp-(i%3)*0.08)%0.6;m.visible=on&&lt>=0;if(m.visible){const v=m.userData.v;m.position.set(W.sparkO.x+v[0]*lt,W.sparkO.y+v[1]*lt-2.2*lt*lt,W.sparkO.z+v[2]*lt);m.scale.setScalar(1-lt/0.6)}});
 if(on){c.shake=0.5*(1-sp/1.1);c.doFlash(E.choque,0.35,0.25,'#fff3c4')}
 // placa: pulsa no "matar" e no alerta
 const sk=Math.max(eob((t-E.matar)/0.35)*(t<E.matar+0.6?1:0),0);W.sign.scale.setScalar(t>=E.matar&&t<E.matar+0.6?1+0.08*Math.sin(Math.PI*clamp01((t-E.matar)/0.6)):1);
 const al=t>=E.alerta&&t<N[5]-0.1;W.red.intensity=al?1.6*(0.55+0.45*Math.abs(Math.sin((t-E.alerta)*6))):0;
 if(al){W.sign.scale.setScalar(1+0.05*Math.abs(Math.sin((t-E.alerta)*6)))}
 // manual levanta e se aproxima
 lift(W.man,t,E.norma-0.3,N[2]-0.2,0.18,BY);
 // projeto elétrico: pulso
 W.bp.scale.setScalar(t>=E.projeta&&t<E.projeta+0.6?1+0.07*Math.sin(Math.PI*(t-E.projeta)/0.6):1);
 // instala: rolo de cabo gira e pula
 lift(W.roll,t,E.instala-0.1,E.instala+0.7,0.3,BY+0.15);W.roll.rotation.z=seg(t,E.instala-0.1,E.instala+0.7)*Math.PI*2;
 // manutenção: ferramentas pulam
 lift(W.tools,t,E.manut-0.1,E.manut+0.7,0.25,BY);
 // procedimentos: checks aparecem
 W.checks.forEach((m,i)=>{const t0=E.proc+0.15+i*0.22;m.visible=t>=t0;m.scale.setScalar(Math.max(0.01,eob((t-t0)/0.25)))});
 // proteção: capacete e luvas sobem
 lift(W.helmet,t,E.prot-0.1,E.prot+1.0,0.35,BY);W.helmet.rotation.y=0.5+seg(t,E.prot-0.1,E.prot+1.0)*Math.PI*2;
 lift(W.g1,t,E.prot+0.1,E.prot+1.1,0.25,BY+0.06);lift(W.g2,t,E.prot+0.2,E.prot+1.2,0.25,BY+0.06);
 // segredo: desliga a manopla, bloqueia com cadeado, testa com o detector
 const off=seg(t,E.segredo+0.2,E.segredo+0.7);W.handle.rotation.z=off*Math.PI/2;
 // cadeado voa da bancada até a manopla (no "começa")
 const tl=E.comeca!=null?E.comeca-0.2:E.segredo+0.9;const lk=seg(t,tl,tl+0.8);
 const hw=new T.Vector3();W.hasp.getWorldPosition(hw);const hh=W.lockHome;
 const lp=[lerp(hh[0],hw.x,lk),lerp(hh[1],hw.y-0.08,lk)+Math.sin(Math.PI*lk)*1.2,lerp(hh[2],hw.z+0.12,lk)];W.lock.position.set(...lp);
 W.lock.rotation.set(lerp(-Math.PI/2,0,lk),0,lerp(0.6,0,lk));W.tag.rotation.z=lk>=1?0.12*Math.sin((t-tl-0.8)*5)*Math.exp(-(t-tl-0.8)*1.5):0;
 // detector sobe até o cabo e acende verde (sem tensão) no "fio"
 const dk=seg(t,E.antes-0.1,E.antes+0.7);const dh=W.detHome;const tgt=[PX-0.15,PY-1.75,0.45];
 W.det.position.set(lerp(dh[0],tgt[0],dk),lerp(dh[1],tgt[1],dk)+Math.sin(Math.PI*dk)*0.8,lerp(dh[2],tgt[2],dk));W.det.rotation.set(lerp(0,-0.25,dk),lerp(0.9,0,dk),lerp(Math.PI/2,Math.PI*0.88,dk));
 const tested=t>=E.fio;W.detLed.material.color.set(tested?'#1fa85a':'#4a1010');W.detLed.material.emissive.set(tested?'#2ecc71':'#ff2020');W.detLed.material.emissiveIntensity=tested?1.4:0;
 // rótulos (HTML) na hora da fala
 const Lb=(id,txt,pos,bg,fg,t0,t1,dy=0)=>c.label(id,txt,pos,{bg,fg,a:(t>=t0&&t<t1)?seg(t,t0,t0+0.3):0,s:eob((t-t0)/0.3),dy});
 Lb('choque','CHOQUE',new T.Vector3(PX-0.3,PY-0.9,0.6),'#d61f2b','#fff',E.choque,E.matar-0.05);
 Lb('matar','PODE MATAR',new T.Vector3(-1.45,2.0+1.05,0),'#d61f2b','#fff',E.matar,N[1]-0.1);
 Lb('nr0','NR-10 PROTEGE',new T.Vector3(-1.45,2.0-1.05,0),'#ffc400','#10151f',E.norma0,N[1]-0.1);
 Lb('norma','NORMA DE SEGURANÇA',new T.Vector3(-2.1,BY+2.05,0.3),'#1f4fa3','#fff',E.seg,N[2]-0.1);
 Lb('proj','PROJETA',new T.Vector3(-1.5,-0.55+0.7,0),'#fff','#10151f',E.projeta,N[3]-0.1);
 Lb('inst','INSTALA',new T.Vector3(2.0,BY+0.9,0.45),'#fff','#10151f',E.instala,N[3]-0.1);
 Lb('oper','OPERA',new T.Vector3(PX,PY+1.5,0),'#fff','#10151f',E.opera,N[3]-0.1);
 Lb('manut','MANUTENÇÃO',new T.Vector3(-1.95,BY+0.75,2.35),'#fff','#10151f',E.manut,N[3]-0.1);
 Lb('trein','TREINAMENTO',new T.Vector3(-0.6,BY+2.3,0.5),'#fff','#10151f',E.trein,E.proc-0.05);
 Lb('proc','PROCEDIMENTOS',new T.Vector3(0.25,BY+1.55,0.3),'#1fa85a','#fff',E.proc,E.prot-0.05);
 Lb('prot','PROTEÇÃO · EPI',new T.Vector3(-0.3,BY+1.15,1.7),'#ffc400','#10151f',E.prot,N[4]-0.1);
 Lb('alerta','ALERTA',new T.Vector3(-1.45,2.0+1.05,0),'#d61f2b','#fff',E.alerta,N[5]-0.1);
 Lb('aut','SÓ TREINADO E AUTORIZADO',new T.Vector3(-1.45,2.0-1.05,0),'#ffc400','#10151f',E.treinado,N[5]-0.1);
 Lb('s1','1 · DESLIGUE',new T.Vector3(PX-0.45,PY-0.15,0.4),'#fff','#10151f',E.segredo+0.2,tEnd-0.1);
 Lb('s2','2 · BLOQUEIE',new T.Vector3(PX-0.45,PY-0.15,0.4),'#d61f2b','#fff',E.comeca!=null?E.comeca:E.segredo+1.0,tEnd-0.1,95);
 Lb('s3','3 · TESTE A TENSÃO',new T.Vector3(PX-0.45,PY-0.15,0.4),'#1fa85a','#fff',E.fio,tEnd-0.1,190);
 // ocultar s1 quando s2 aparece? não: empilhados (dy)
 // efeitos
 if(t>=E.alerta&&t<E.alerta+0.4)c.doFlash(E.alerta,0.3,0.35,'#ff3b3b');
 if(t>=E.fio&&t<E.fio+0.4)c.doFlash(E.fio,0.2,0.3,'#2ecc71');
 if(t>=E.prot&&t<E.prot+0.3)c.doFlash(E.prot,0.12,0.25,'#fff');
 c.vig=al?0.5:0.28;
}
return{init,render,keywords,title}})();
