// Cena 3D "Instalando uma lâmpada no teto" — estilo LISO (render suave, sombras, tone mapping), não low poly.
// Locais: TETO (origem: caixa octogonal + eletrodutos), QD (x=-30), ESQUEMA (x=30), PLANTA (x=60).
window.SCENE=(function(){
let W={};
const keywords=['lâmpada','teto','disjuntor','detector','octogonal','neutro','retorno','pino','soquete','rosca','isola','emendas','alerta','fase','direto','interruptor','segredo','tensão'];
const brand='full';
const lerp=(a,b,t)=>a+(b-a)*t,ease3=x=>x*x*(3-2*x),cl=x=>Math.min(1,Math.max(0,x));
const QX=-30,DX=30,PX=60,SOCK0=-1.55,SOCK1=-0.53;
function grad(T,c1,c2){const cv=document.createElement('canvas');cv.width=64;cv.height=512;const g=cv.getContext('2d');const lg=g.createRadialGradient(32,200,10,32,256,420);lg.addColorStop(0,c1);lg.addColorStop(1,c2);g.fillStyle=lg;g.fillRect(0,0,64,512);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t}
function textSprite(T,txt,w=2.4){const cv=document.createElement('canvas');cv.width=512;cv.height=128;const g=cv.getContext('2d');g.font='900 78px Arial';g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=16;g.strokeStyle='#111';g.strokeText(txt,256,64);g.fillStyle='#fff';g.fillText(txt,256,64);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;const s=new T.Sprite(new T.SpriteMaterial({map:t,transparent:true,depthTest:false}));s.scale.set(w,w/4,1);return s}
function conduit(T,pts,r=0.13,col='#4a4a50'){const curve=new T.CatmullRomCurve3(pts);const seg=Math.round(curve.getLength()*90);const geo=new T.TubeGeometry(curve,seg,r,14,false);
 const pos=geo.attributes.position,v=new T.Vector3();
 for(let i=0;i<=seg;i++){const k=1+0.2*Math.abs(Math.sin(i*Math.PI/3));const p=curve.getPointAt(i/seg);for(let j=0;j<=14;j++){const id=i*15+j;v.fromBufferAttribute(pos,id);v.sub(p).multiplyScalar(k).add(p);pos.setXYZ(id,v.x,v.y,v.z)}}
 geo.computeVertexNormals();const m=new T.Mesh(geo,new T.MeshStandardMaterial({color:col,roughness:.35,metalness:.1}));m.castShadow=true;return m}
function init(c){
 const {THREE:T,scene,renderer:R}=c;R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.05;R.outputColorSpace=T.SRGBColorSpace;
 W.bgA=grad(T,'#2f6fb8','#0d2347');W.bgB=grad(T,'#c9b3c4','#6d5468');
 scene.add(new T.HemisphereLight('#ffffff','#556',0.9));
 const key=new T.DirectionalLight('#fff4e6',2.2);key.position.set(4,8,6);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-6,right:6,top:6,bottom:-6});key.shadow.bias=-0.0005;scene.add(key);scene.add(key.target);W.key=key;
 const rim=new T.DirectionalLight('#9fc8ff',1.0);rim.position.set(-5,2,-4);scene.add(rim);
 const fill=new T.DirectionalLight('#ffffff',0.7);fill.position.set(0,-6,4);scene.add(fill);
 const S=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,roughness:.4,metalness:.02},o));
 const mesh=(g,m,x=0,y=0,z=0,p=scene)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;p.add(o);return o};
 const tube=(pts,r,mat,p=scene)=>mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(a=>new T.Vector3(...a))),48,r,10),mat,0,0,0,p);
 const brass=()=>S('#d4a64a',{metalness:.85,roughness:.28,emissive:'#000000'});
 // ================= TETO: caixa octogonal =================
 const yel=S('#f2c413',{roughness:.38});
 const ob=mesh(new T.CylinderGeometry(1.0,1.0,0.9,8,1,true),yel);ob.rotation.y=Math.PI/8;
 const ib=mesh(new T.CylinderGeometry(0.95,0.95,0.9,8,1,true),S('#e3b20c',{roughness:.5,side:T.BackSide}));ib.rotation.y=Math.PI/8;
 mesh(new T.CylinderGeometry(1.0,1.0,0.05,8),yel,0,0.43,0).rotation.y=Math.PI/8;
 const rr=mesh(new T.TorusGeometry(0.975,0.035,8,8),yel,0,-0.45,0);rr.rotation.x=Math.PI/2;rr.rotation.z=Math.PI/8;
 [[0.45,0.2],[-0.45,0.2],[0,-0.45],[0.1,0.5]].forEach(([x,z])=>{const k=mesh(new T.TorusGeometry(0.15,0.018,8,24),yel,x,0.4,z);k.rotation.x=Math.PI/2});
 [[1,0.15],[-1,0.25],[0.15,-1],[-0.35,0.95]].forEach(([dx,dz],i)=>{const d=new T.Vector3(dx,0,dz).normalize();const p0=new T.Vector3(d.x*0.98,0.05,d.z*0.98);
  const b=mesh(new T.CylinderGeometry(0.17,0.17,0.12,20),S('#1b1b1d',{roughness:.6}),p0.x,p0.y,p0.z);b.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d);
  const far=new T.Vector3(d.x*7,0.2+0.25*i,d.z*7);const mid=p0.clone().lerp(far,0.45);mid.y+=0.25;scene.add(conduit(T,[p0,mid,far]))});
 // fios do circuito: preto = retorno (esq.), azul = neutro (dir.), descendo até as emendas
 const SPL={k:[-0.25,-1.0,0.25],b:[0.25,-1.0,0.25]};
 W.wk=tube([[-0.55,0.1,0.15],[-0.35,-0.3,0.25],[-0.28,-0.75,0.27],SPL.k],0.032,S('#141414',{roughness:.35,transparent:true}));
 W.wb=tube([[0.55,0.1,0.25],[0.35,-0.3,0.3],[0.28,-0.75,0.27],SPL.b],0.032,S('#1f8fe0',{roughness:.35,transparent:true}));
 W.tips=[SPL.k,SPL.b].map(p=>mesh(new T.CylinderGeometry(0.02,0.02,0.14,10),brass(),p[0],p[1]-0.07,p[2]));
 W.tape=[SPL.k,SPL.b].map(p=>{const m=mesh(new T.CylinderGeometry(0.06,0.06,0.26,16),S('#222',{roughness:.7}),p[0],p[1]-0.04,p[2]);m.scale.y=0.001;m.visible=false;return m});
 // ---- conjunto do soquete (base + soquete), origem = centro da base ----
 const G=W.sock=new T.Group();G.position.set(0,SOCK0-2.5,0);scene.add(G);
 mesh(new T.CylinderGeometry(0.75,0.7,0.08,40),S('#e9ecef',{roughness:.25}),0,0,0,G);
 W.TA=[-0.22,0.07,0.12];W.TB=[0.22,0.07,0.12];
 [W.TA,W.TB].forEach(p=>{mesh(new T.CylinderGeometry(0.07,0.07,0.05,16),S('#bfc4cc',{metalness:.8,roughness:.3}),p[0],p[1],p[2],G);mesh(new T.BoxGeometry(0.1,0.015,0.015),S('#555'),p[0],p[1]+0.03,p[2],G)});
 W.shell=mesh(new T.CylinderGeometry(0.3,0.3,0.6,32,1,true),S('#ffffff',{roughness:.2,transparent:true,opacity:0.95,side:T.DoubleSide,depthWrite:false}),0,-0.34,0,G);
 mesh(new T.RingGeometry(0.21,0.3,32),S('#ffffff',{side:T.DoubleSide}),0,-0.64,0,G).rotation.x=Math.PI/2;
 W.thread=[];for(let i=0;i<5;i++){const m=new T.Mesh(new T.TorusGeometry(0.205,0.022,8,28),brass());m.rotation.x=Math.PI/2;m.position.set(0,-0.24-i*0.08,0);G.add(m);W.thread.push(m)}
 W.pin=mesh(new T.CylinderGeometry(0.07,0.06,0.07,20),brass(),0,-0.16,0,G);
 W.stripA=tube([[W.TA[0],0.03,W.TA[2]],[-0.12,-0.04,0.06],[0,-0.12,0]],0.02,brass(),G);
 W.stripB=tube([[W.TB[0],0.03,W.TB[2]],[0.2,-0.08,0.06],[0.2,-0.22,0.02]],0.02,brass(),G);
 // fios do soquete (das emendas até os bornes): ficam no grupo, aparecem em "pino" / "rosca"
 const loc=(p)=>[p[0],p[1]-SOCK0,p[2]];
 W.lk=tube([loc(SPL.k),[-0.26,-1.25-SOCK0,0.2],[W.TA[0],W.TA[1]+0.02,W.TA[2]]],0.03,S('#141414',{roughness:.35,transparent:true}),G);
 W.lb=tube([loc(SPL.b),[0.26,-1.25-SOCK0,0.2],[W.TB[0],W.TB[1]+0.02,W.TB[2]]],0.03,S('#1f8fe0',{roughness:.35,transparent:true}),G);
 W.lk.visible=W.lb.visible=false;
 // lâmpada (bulbo) — entra rosqueando no segredo
 const BL=W.bulb=new T.Group();G.add(BL);BL.visible=false;
 mesh(new T.CylinderGeometry(0.18,0.16,0.32,24),S('#c9ccd2',{metalness:.85,roughness:.3}),0,-0.36,0,BL);
 for(let i=0;i<4;i++){const m=new T.Mesh(new T.TorusGeometry(0.18,0.02,8,24),S('#d8dbe0',{metalness:.85,roughness:.3}));m.rotation.x=Math.PI/2;m.position.y=-0.25-i*0.075;BL.add(m)}
 mesh(new T.CylinderGeometry(0.05,0.05,0.04,12),S('#333'),0,-0.19,0,BL);
 W.glass=mesh(new T.SphereGeometry(0.5,32,24),S('#f4f7fb',{roughness:.15,transparent:true,opacity:0.55,emissive:'#ffd86b',emissiveIntensity:0}),0,-0.95,0,BL);
 mesh(new T.CylinderGeometry(0.17,0.24,0.22,24),S('#f4f7fb',{roughness:.15,transparent:true,opacity:0.55}),0,-0.6,0,BL);
 // detector de tensão (caneta)
 const D=W.det=new T.Group();scene.add(D);D.visible=false;
 mesh(new T.CylinderGeometry(0.085,0.085,1.0,20),S('#f2c413'),0,0.5,0,D);mesh(new T.CylinderGeometry(0.086,0.086,0.3,20),S('#1d1d1f'),0,0.75,0,D);
 mesh(new T.ConeGeometry(0.085,0.28,20),S('#1d1d1f'),0,-0.14,0,D).rotation.x=Math.PI;
 W.led=mesh(new T.SphereGeometry(0.05,12,10),S('#4a1212',{emissive:'#ff3030',emissiveIntensity:0}),0,-0.02,0.07,D);
 W.ledG=mesh(new T.SphereGeometry(0.045,12,10),S('#2ecc71',{emissive:'#2ecc71',emissiveIntensity:0}),0,0.35,0.08,D);
 // ================= QD (x=-30) =================
 const Q=new T.Group();Q.position.set(QX,0,0);scene.add(Q);
 mesh(new T.BoxGeometry(2.2,2.9,0.5),S('#d9dde2',{metalness:.3,roughness:.4}),0,0,-0.25,Q);
 mesh(new T.BoxGeometry(1.95,2.65,0.05),S('#f1f2f4'),0,0,0.02,Q);
 mesh(new T.BoxGeometry(1.8,0.12,0.06),S('#9aa0a8',{metalness:.7}),0,0.35,0.07,Q);
 W.toggles=[];for(let i=0;i<5;i++){const x=-0.72+i*0.36;mesh(new T.BoxGeometry(0.32,0.9,0.36),S('#fafafa',{roughness:.3}),x,0.35,0.24,Q);
  mesh(new T.BoxGeometry(0.2,0.12,0.02),S(i==2?'#ffc400':'#c7cbd1',{emissive:i==2?'#ffc400':'#000',emissiveIntensity:i==2?0.4:0}),x,0.62,0.43,Q);
  const tg=new T.Group();tg.position.set(x,0.33,0.42);Q.add(tg);mesh(new T.BoxGeometry(0.12,0.26,0.1),S(i==2?'#1f8fe0':'#30343a'),0,0.12,0,tg);tg.rotation.x=-0.35;W.toggles.push(tg)}
 [[-0.72,'#c0392b'],[-0.36,'#141414'],[0,'#141414'],[0.36,'#141414'],[0.72,'#141414']].forEach(([x,col])=>{tube([[x,-0.1,0.3],[x,-0.6,0.3],[x*0.6,-1.4,0.2]],0.03,S(col),Q)});
 // ================= ESQUEMA (x=30) =================
 const E2=W.dg=new T.Group();E2.position.set(DX,0,0);scene.add(E2);
 mesh(new T.BoxGeometry(1.0,1.3,0.35),S('#d9dde2',{metalness:.3,roughness:.4}),-1.2,-1.9,0,E2);mesh(new T.BoxGeometry(0.6,0.25,0.36),S('#fafafa'),-1.2,-1.7,0.02,E2);
 mesh(new T.BoxGeometry(0.62,0.95,0.08),S('#fafafa',{roughness:.3}),1.25,-0.6,0,E2);W.key2=mesh(new T.BoxGeometry(0.3,0.42,0.08),S('#eceff2'),1.25,-0.6,0.07,E2);
 const LG=new T.Group();LG.position.set(0,2.4,0);E2.add(LG);mesh(new T.CylinderGeometry(0.42,0.4,0.06,32),S('#e9ecef'),0,0,0,LG);mesh(new T.CylinderGeometry(0.2,0.2,0.32,24),S('#fafafa'),0,-0.19,0,LG);
 W.dglass=mesh(new T.SphereGeometry(0.42,32,24),S('#f4f7fb',{roughness:.15,transparent:true,opacity:0.75,emissive:'#ffd86b',emissiveIntensity:0}),0,-0.72,0,LG);
 W.dLight=new T.PointLight('#ffd86b',0,6,1.5);W.dLight.position.set(0,1.6,0.6);E2.add(W.dLight);
 const FA=[[-0.95,-1.3,0],[-0.2,-0.8,0.1],[0.7,-0.7,0.1],[1.25,-0.6,0.06]],RE=[[1.25,-0.12,0.06],[1.0,0.9,0.1],[0.4,1.5,0.1],[0.12,2.2,0]],NE=[[-1.4,-1.25,0],[-1.6,0.4,0.1],[-0.9,1.6,0.1],[-0.12,2.2,0]];
 W.fa=new T.CatmullRomCurve3(FA.map(a=>new T.Vector3(...a)));W.re=new T.CatmullRomCurve3(RE.map(a=>new T.Vector3(...a)));
 tube(FA,0.045,S('#d63a2f'),E2);tube(RE,0.045,S('#141414'),E2);tube(NE,0.045,S('#1f8fe0'),E2);
 W.direct=new T.Group();E2.add(W.direct);for(let i=0;i<7;i++){const t0=i/7;const m=mesh(new T.CylinderGeometry(0.035,0.035,0.28,8),S('#d63a2f',{transparent:true,opacity:0.9}),lerp(-1.0,-0.1,t0+0.07),lerp(-1.2,1.85,t0+0.07),0.3,W.direct);m.rotation.z=-Math.atan2(0.9,3.05)}
 W.X=new T.Group();W.X.position.set(-0.55,0.35,0.6);E2.add(W.X);[0.785,-0.785].forEach(a=>{const b=mesh(new T.BoxGeometry(0.95,0.16,0.08),S('#ff2d2d',{emissive:'#ff2d2d',emissiveIntensity:0.6}),0,0,0,W.X);b.rotation.z=a});
 W.pulses=[...Array(8)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.08,12,10),new T.MeshBasicMaterial({color:'#ffd23f',transparent:true,opacity:0}));E2.add(m);return m});
 // ================= PLANTA (x=60) =================
 const B=new T.Group();B.position.set(PX,0,0);B.rotation.y=Math.PI/2;scene.add(B);
 const tile=(()=>{const cv=document.createElement('canvas');cv.width=256;cv.height=256;const g=cv.getContext('2d');g.fillStyle='#e98a2e';g.fillRect(0,0,256,256);g.strokeStyle='#c96e1c';g.lineWidth=4;for(let i=0;i<=4;i++){g.beginPath();g.moveTo(i*64,0);g.lineTo(i*64,256);g.stroke();g.beginPath();g.moveTo(0,i*64);g.lineTo(256,i*64);g.stroke()}const t=new T.CanvasTexture(cv);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(5,4);t.colorSpace=T.SRGBColorSpace;return t})();
 const fl=new T.Mesh(new T.BoxGeometry(10,0.2,8),new T.MeshStandardMaterial({map:tile,roughness:.55}));fl.receiveShadow=true;fl.position.y=-0.1;B.add(fl);
 const wm=S('#e9efe2',{roughness:.7});const wall=(w,d,x,z)=>{const m=new T.Mesh(new T.BoxGeometry(w,1.4,d),wm);m.position.set(x,0.7,z);m.castShadow=m.receiveShadow=true;B.add(m)};
 wall(10.2,0.2,0,-4);wall(10.2,0.2,0,4);wall(0.2,8,-5,0);wall(0.2,8,5,0);wall(10,0.15,0,-0.5);wall(0.15,3.5,-1.2,-2.25);wall(0.15,3.5,1.2,-2.25);wall(0.15,4.5,0,1.75);
 const pts=[[-3,-2.3],[0,-2.3],[3,-2.3],[-2.6,1.8],[2.6,1.8]],QD=[4.6,-0.2];W.lamps=[];
 pts.forEach(([x,z])=>{const bx=new T.Mesh(new T.CylinderGeometry(0.18,0.18,0.12,8),yel);bx.position.set(x,1.5,z);bx.castShadow=true;B.add(bx);
  const l=new T.Mesh(new T.SphereGeometry(0.14,16,12),S('#ffffff',{emissive:'#ffd76a',emissiveIntensity:0}));l.position.set(x,1.3,z);B.add(l);W.lamps.push(l);
  const w=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(QD[0],1.5,QD[1]),new T.Vector3((x+QD[0])/2,1.75,(z+QD[1])/2),new T.Vector3(x,1.5,z)]),30,0.035,6),S('#1a1a1a'));w.castShadow=true;B.add(w)});
 const qd=new T.Mesh(new T.BoxGeometry(0.15,0.9,0.7),S('#cfd3d8',{metalness:.2}));qd.position.set(4.85,1.0,QD[1]);B.add(qd);
 [['QUARTO',-3,-2.3],['BANHEIRO',0,-3.4],['COZINHA',3,-2.3],['QUARTO',-2.6,2.4],['SALA',2.6,2.4]].forEach(([t,x,z])=>{const s=textSprite(T,t);s.position.set(x,2.3,z);B.add(s)});
 W.salaW=new T.Vector3(PX+1.8,1.4,-2.6);
}
// keyframes [t, pos, look, cut]; cut=true => troca seca de plano nesse instante
function camPose(c){
 const {N,E,tn:t}=c,tEnd=N[7];
 const K=[
  [0,            [PX+0.8,15,13],[PX,0,0.8]],
  [E.teto+0.1,   [PX+0.4,14,12],[PX,0,0.6]],
  [N[1]-0.05,    [PX+1.8,8.5,3.2],[PX+1.8,1.3,-2.6]],
  [N[1],         [QX+0.7,0.5,4.6],[QX,0.1,0],true],
  [E.det-0.15,   [QX+0.4,0.3,4.0],[QX,0.25,0]],
  [E.det-0.1,    [2.4,-2.2,3.8],[0,-0.7,0],true],
  [N[2]-0.05,    [2.1,-2.3,3.5],[0,-0.7,0]],
  [N[2]+0.6,     [-1.3,-2.5,4.6],[0,-0.25,0]],
  [N[3]-0.05,    [0.5,-2.4,4.7],[0,-0.25,0]],
  [N[3]+0.7,     [1.0,-0.95,2.7],[0,-1.75,0]],
  [N[4]-0.05,    [0.8,-0.95,2.5],[0,-1.75,0]],
  [N[4]+0.6,     [0.8,-2.6,4.2],[0,-1.05,0]],
  [E.prende+0.9, [1.3,-3.3,5.0],[0,-0.5,0]],
  [N[5]-0.05,    [1.4,-3.3,5.2],[0,-0.5,0]],
  [N[5],         [DX,0.4,9.4],[DX,0.3,0],true],
  [N[6]-0.05,    [DX,0.4,8.9],[DX,0.3,0]],
  [N[6],         [1.6,-2.9,4.2],[0,-1.0,0],true],
  [E.rosca2,     [1.1,-2.1,2.9],[0,-0.95,0]],
  [tEnd-0.05,    [1.0,-2.0,2.7],[0,-0.95,0]],
  [1e9,          [1.0,-2.0,2.7],[0,-0.95,0]]];
 for(let q=1;q<K.length-1;q++)if(K[q][0]<K[q-1][0]+0.05)K[q][0]=K[q-1][0]+0.05;
 let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1];const f=b[3]?0:ease3(cl((t-a[0])/(b[0]-a[0])));
 return {p:a[1].map((v,j)=>lerp(v,b[1][j],f)),l:a[2].map((v,j)=>lerp(v,b[2][j],f))};
}
function render(c){
 const {THREE:T,N,E,seg,eob,tn:t,camera,scene}=c,tEnd=N[7];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);camera.updateMatrixWorld();
 const atPlan=cp.p[0]>45;scene.background=atPlan?W.bgB:W.bgA;
 W.key.position.set(cp.l[0]+4,cp.l[1]+8,6);W.key.target.position.set(cp.l[0],cp.l[1],0);
 [N[1],E.det-0.1,N[5],N[6]].forEach(tc=>{if(t>=tc&&t<tc+0.2)c.doFlash(tc,0.35,0.2,'#ffffff')});
 // planta: pontos de luz acendem em "lâmpada"
 W.lamps.forEach((l,i)=>l.material.emissiveIntensity=2.2*seg(t,E.lamp+i*0.08,E.lamp+i*0.08+0.3));
 // QD: disjuntor do circuito (azul) vai para baixo
 W.toggles[2].rotation.x=lerp(-0.35,-2.75,seg(t,E.disj,E.disj+0.35));
 // detector encosta no fio preto e NÃO acende o LED vermelho (sem tensão); verde = pronto
 W.det.visible=t>=E.det-0.1&&t<N[2]+0.2;const dp=seg(t,E.det,E.det+0.8);W.det.position.set(lerp(1.6,-0.24,dp),lerp(-1.2,-0.72,dp),lerp(1.0,0.36,dp));W.det.rotation.z=lerp(0.9,0.55,dp);
 W.ledG.material.emissiveIntensity=W.det.visible?1.6:0;
 // soquete: aparece na fala 3 (vindo de baixo), sobe em "prende"
 const app=seg(t,N[3]-0.3,N[3]+0.5),up=seg(t,E.prende,E.prende+1.0);W.sock.position.y=lerp(SOCK0-2.5,SOCK0,app)+(SOCK1-SOCK0)*up;W.sock.visible=t>=N[3]-0.3;
 W.lk.visible=t>=E.pino;W.lb.visible=t>=E.rosca;
 const gl=(m,col,v)=>{m.material.emissive.set(col);m.material.emissiveIntensity=v};
 const pinOn=(t>=E.pino&&t<N[4])?0.6+0.4*Math.sin(t*10):0,roOn=(t>=E.rosca&&t<N[4])?0.6+0.4*Math.sin(t*10):0;
 gl(W.pin,'#ffcc33',pinOn);W.stripA.material.emissive.set('#ffcc33');W.stripA.material.emissiveIntensity=pinOn*0.7;
 const rosG=(t>=E.rosca2&&t<tEnd)?0.7+0.3*Math.sin(t*6):0;W.thread.forEach(m=>gl(m,rosG?'#2ecc71':'#ffcc33',rosG?rosG*1.4:roOn));W.stripB.material.emissive.set('#ffcc33');W.stripB.material.emissiveIntensity=roOn*0.7;
 W.shell.material.opacity=(t>=N[3]+0.2)?0.28:0.95;
 // emendas: fita isolante
 W.tape.forEach(m=>{m.visible=t>=E.isola;m.scale.y=Math.max(0.001,seg(t,E.isola,E.isola+0.6))});W.tips.forEach(m=>m.visible=t<E.isola+0.4);
 // ao subir a base, fios entram na caixa (somem)
 const wo=1-seg(t,E.prende+0.2,E.prende+0.9);[W.wk,W.wb,W.lk,W.lb].forEach(m=>{m.material.opacity=wo;m.visible=m.visible&&wo>0.02});W.tape.forEach(m=>m.visible=m.visible&&wo>0.02);
 // lâmpada rosqueando no segredo
 W.bulb.visible=t>=N[6];const sc=seg(t,N[6]+0.1,N[6]+1.4);W.bulb.position.y=lerp(-1.4,0,sc);W.bulb.rotation.y=-sc*9;
 // esquema: fase passa pelo interruptor
 const dOn=t>=E.direto&&t<N[6];W.direct.visible=dOn;W.X.visible=t>=E.direto+0.35&&t<N[6];W.X.scale.setScalar(eob((t-E.direto-0.35)/0.3));
 const fl=t>=E.inter-0.2;W.pulses.forEach((m,i)=>{const k=((t-E.inter)*0.45+i/8)%1;if(!fl||k<0){m.material.opacity=0;return}const p=k<0.5?W.fa.getPointAt(k*2):W.re.getPointAt((k-0.5)*2);m.position.copy(p);m.position.z+=0.06;m.material.opacity=0.95});
 const lit=seg(t,E.inter+0.6,E.inter+1.0)*(t<N[6]?1:0);W.dglass.material.emissiveIntensity=1.6*lit;W.dLight.intensity=6*lit;W.key2.rotation.x=fl?-0.25:0.25;
 if(t>=E.alerta&&t<E.alerta+0.3)c.doFlash(E.alerta,0.18,0.3,'#ff8a00');
 c.vig=(t>=E.segredo-0.2&&t<tEnd-0.4)?0.6:0.5;
 // rótulos
 const V=(x,y,z)=>new T.Vector3(x,y,z);
 const Lb=(id,txt,pos,bg,fg,t0,t1)=>c.label(id,txt,pos,{bg,fg,a:(t>=t0&&t<t1)?seg(t,t0,t0+0.3):0,s:eob((t-t0)/0.3)});
 Lb('dj','DISJUNTOR: DESLIGADO',V(QX,1.25,0.4),'#ffc400','#10151f',E.disj,E.det-0.1);
 Lb('dt','SEM TENSÃO ✓',V(-0.1,-0.2,0.4),'#2ecc71','#10151f',E.det+0.8,N[2]-0.05);
 Lb('cx','CAIXA OCTOGONAL',V(0,0.3,0.9),'#f2c413','#10151f',E.caixa,N[3]-0.1);
 Lb('ne','NEUTRO',V(0.7,-0.85,0.3),'#1f8fe0','#fff',E.neutro,N[3]-0.1);
 Lb('rt','RETORNO',V(-0.7,-0.85,0.3),'#141414','#fff',E.retorno,N[3]-0.1);
 Lb('pi','PINO CENTRAL = RETORNO',V(0,-0.75,0),'#141414','#ffc400',E.pino,N[4]-0.1);
 Lb('ro','ROSCA = NEUTRO',V(0,-2.55,0),'#1f8fe0','#fff',E.rosca,N[4]-0.1);
 Lb('is','ISOLE AS EMENDAS',V(0,-0.55,0.3),'#ffffff','#10151f',E.isola,E.prende);
 Lb('fa','FASE',V(DX+0.2,-1.15,0.3),'#d63a2f','#fff',E.alerta+0.4,N[6]-0.1);
 Lb('dr','NUNCA DIRETO',V(DX-0.55,1.0,0.6),'#ff2d2d','#fff',E.direto+0.35,N[6]-0.1);
 Lb('it','INTERRUPTOR',V(DX+1.0,0.25,0.3),'#ffffff','#10151f',E.inter,N[6]-0.1);
 Lb('sg','ROSCA SEM TENSÃO',V(0,-2.15,0),'#2ecc71','#10151f',E.rosca2+0.2,tEnd-0.3);
}
return{init,render,keywords,brand}})();
