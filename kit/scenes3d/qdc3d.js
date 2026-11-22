// Cena 3D "QDC monofásico" (bancada): trilhos DIN, disjuntor geral, DR, DPS, disjuntores, barramentos e cabos de 16 mm².
// Dispositivos sem marca (sem logotipos).
window.SCENE=(function(){
let W={};
const keywords=['quadro','trilho','geral','dr','dps','circuito','circuitos','neutro','terra','dezesseis','milímetros','aperte','identifique','segredo'];
const title='QDC MONOFÁSICO';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
const MW=0.19,H=0.92,D=0.5;
const ROW1=1.55,ROW2=0.2,ROW3=-1.35;
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
  g.userData={levers,screws,body,w};return g}
 const DG=W.dg=dev(2,'dg',[{t:'C63',sz:104,b:1},{t:'2P  230V~',sz:34},{t:'3000 A',sz:30}],{band:'#e03c5a'});
 const DR=W.dr=dev(2,'dr',[{t:'DR 40A',sz:80,b:1},{t:'30 mA  2P',sz:36},{t:'TEST ▸',sz:30}],{band:'#2f7bff'});
 const DPS=W.dps=dev(2,'dps',[{t:'DPS',sz:92,b:1},{t:'275V~  20 kA',sz:34},{t:'Classe II',sz:30}],{body:'#c4cad6',face:'#d9dde6',band:'#ffc400'});
 [[DG,-0.40,ROW1],[DR,0.0,ROW1],[DPS,0.40,ROW1]].forEach(([d,x,y])=>{d.position.set(x,y,0.19);d.userData.home=[x,y];Q.add(d)});
 const cb=[['ILUMINAÇÃO','C10'],['TOMADAS','C20'],['COZINHA','C20'],['AR COND.','C16'],['CHUVEIRO','C32']];
 W.cb=cb.map(([n,r],i)=>{const d=dev(1,'cb',[{t:r,sz:112,b:1},{t:'1P',sz:36},{t:'230V~',sz:30}],{band:'#9aa3b4'});const x=-0.4+0.2*i;d.position.set(x,ROW2,0.19);d.userData.home=[x,ROW2];Q.add(d);return d});
 // barra pente vermelha (fase) nos disjuntores
 W.comb=box(1.06,0.07,0.06,'#d93a3a',0,ROW2+0.46,0.43,Q,{roughness:.4});for(let i=0;i<5;i++)box(0.05,0.12,0.05,'#d93a3a',(-0.4+0.2*i)/1.0,-0.06,0,W.comb);W.comb.visible=false;
 // barramentos neutro (azul) e terra (verde)
 function bar(x,color,n){const g=new T.Group();g.position.set(x,ROW3,0.19);Q.add(g);box(0.95,0.2,0.16,color,0,0,0,g,{roughness:.35});box(0.95,0.05,0.2,'#d2a05a',0,0.0,0.03,g,{metalness:.8,roughness:.3});const sc=[];for(let i=0;i<n;i++){const s=new T.Group();s.position.set(-0.4+i*(0.8/(n-1)),0,0.1);g.add(s);const sh=cyl(0.04,0.04,'#d3d8e2',0,0,0,s,16,{metalness:.8,roughness:.3});sh.rotation.x=Math.PI/2;box(0.07,0.014,0.014,'#2a303d',0,0,0.022,s);sc.push(s)}g.userData.screws=sc;return g}
 W.nb=bar(-0.57,'#2f7bff',7);W.tb=bar(0.57,'#1fa85a',7);
 // cabos 16 mm² (tubos) revelados por drawRange
 function cable(pts,col,r=0.045){const curve=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));const geo=new T.TubeGeometry(curve,60,r,10,false);const m=new T.Mesh(geo,M(col,{roughness:.5}));m.castShadow=true;Q.add(m);return {m,geo,total:geo.index.count}}
 const zc=0.38;
 W.cab={
  fase:cable([[-0.2,2.9,zc],[-0.495,2.55,zc],[-0.5,2.05,0.3],[-0.495,1.99,0.24]],COL.fase),
  neutro:cable([[0.2,2.9,zc],[-0.3,2.45,zc],[-0.31,2.05,0.3],[-0.305,1.99,0.24]],COL.neutro),
  terra:cable([[0.9,2.9,zc],[1.18,2.3,zc],[1.18,-1.0,zc],[0.95,-1.3,0.3],[0.9,-1.3,0.25]],COL.terra)};
 for(const k in W.cab)W.cab[k].m.visible=false;
 // etiquetas de circuito (adesivos)
 W.stk=cb.map(([n],i)=>{const t=tex(T,256,96,(g,w,h)=>{g.fillStyle='#ffd400';g.fillRect(0,0,w,h);g.fillStyle='#10151f';g.font='900 34px Arial';g.textAlign='center';g.fillText(n,w/2,h*0.62)});const m=new T.Mesh(new T.PlaneGeometry(0.34,0.13),new T.MeshBasicMaterial({map:t}));m.position.set(-0.4+0.2*i,ROW2-0.6,0.46);m.rotation.z=Math.PI/2;m.visible=false;Q.add(m);return m});
 // posições iniciais fora de cena
 W.parts=[W.dg,W.dr,W.dps,...W.cb];
}
const K=(c)=>{const {N,E}=c,tEnd=N[8];return [
 [0,        [0.0,0.5,13.5],[0,-0.3,0]],
 [E.quadro, [0.0,0.6,11.0],[0,0.0,0]],
 [N[1],     [0.0,0.5,10.5],[0,0.1,0]],
 [E.trilho+0.6,[0.0,0.8,8.2],[0,0.5,0]],
 [N[2],     [0.0,1.2,7.4],[0,1.0,0]],
 [E.geral-0.3,[-0.3,1.5,4.8],[-0.3,1.5,0]],
 [E.geral+1.0,[-0.3,1.5,4.3],[-0.3,1.5,0]],
 [N[3]+0.2, [0.0,1.5,4.9],[0.0,1.5,0]],
 [E.dps+0.8,[0.2,1.5,4.7],[0.2,1.5,0]],
 [N[4],     [0.1,1.0,6.0],[0.0,0.9,0]],
 [E.circuitos+0.5,[0.0,0.3,4.9],[0.0,0.25,0]],
 [N[5]-0.1, [0.0,0.2,5.6],[0,0.1,0]],
 [E.neutro, [0.0,-0.5,6.6],[0,-0.7,0]],
 [E.cabos-0.3,[0.2,1.2,9.0],[0.2,1.0,0]],
 [E.cabos+1.5,[0.2,1.0,7.8],[0.2,0.8,0]],
 [N[7],     [0.0,0.8,7.4],[0,0.6,0]],
 [E.aperte, [-0.2,1.6,4.0],[-0.3,1.7,0]],
 [E.aperte+2.0,[-0.2,1.2,4.6],[-0.3,1.3,0]],
 [E.identifique,[0.0,0.15,7.0],[0,0.2,0]],
 [tEnd-0.05,[0.0,0.2,7.6],[0,0.2,0]],
 [tEnd,     [0.0,0.3,13.0],[0,0,0]],
 [1e9,      [0.0,0.3,13.0],[0,0,0]]]};
function camPose(c){const k=K(c),t=c.tn;let i=0;while(i<k.length-2&&t>=k[i+1][0])i++;const a=k[i],b=k[i+1],dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));return {p:a[1].map((v,j)=>lerp(v,b[1][j],f)),l:a[2].map((v,j)=>lerp(v,b[2][j],f))}}
function drop(d,t,t0,home,fromY=2.2){const k=clamp01((t-t0)/0.55);const e=1-Math.pow(1-k,3);const b=k<1?0:Math.max(0,0.04*Math.sin((t-t0-0.55)*18)*Math.exp(-(t-t0-0.55)*7));d.visible=t>=t0;d.position.set(home[0],home[1]+(1-e)*fromY+b,0.19+(1-e)*0.9);}
function render(c){
 const {THREE,N,E,seg,eob,clamp,tn:t,camera}=c,T=THREE,tEnd=N[8];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // porta abre no gancho
 const door=seg(t,E.quadro,E.quadro+0.9);W.door.rotation.y=-1.9*door;
 // trilhos entram
 W.rails.forEach((g,i)=>{const k=seg(t,E.trilho+i*0.2,E.trilho+0.5+i*0.2);g.scale.set(Math.max(0.001,k),1,1);g.visible=t>=E.trilho-0.05});
 // dispositivos caem nos trilhos
 drop(W.dg,t,E.geral,W.dg.userData.home);drop(W.dr,t,E.dr,W.dr.userData.home);drop(W.dps,t,E.dps,W.dps.userData.home);
 const cbT=[E.il,E.tom,E.coz,E.ar,E.chu].map((v,i)=>v!=null?v-0.25:E.circuitos+i*0.45);W.cb.forEach((d,i)=>drop(d,t,cbT[i],d.userData.home));
 // alavancas: tudo ligado no fim
 const on=seg(t,E.identifique+1.0,E.identifique+1.4);W.parts.forEach(d=>{d.userData.levers.forEach(lv=>lv.rotation.x=-0.45*0+0.35*(1-on)-0.0)});
 const cbEnd=(E.chu!=null?E.chu+0.6:E.circuitos+1.8);W.comb.visible=t>=cbEnd;W.comb.scale.x=Math.max(0.01,seg(t,cbEnd,cbEnd+0.6));
 // barramentos
 const nb=eob((t-E.neutro)/0.45),tb=eob((t-E.terra)/0.45);W.nb.visible=t>=E.neutro;W.tb.visible=t>=E.terra;W.nb.scale.set(Math.max(0.001,nb),Math.max(0.001,nb),1);W.tb.scale.set(Math.max(0.001,tb),Math.max(0.001,tb),1);
 // cabos
 const ct={fase:E.cabos,neutro:E.cabos+0.4,terra:E.cabos+0.9};
 for(const k in W.cab){const w=W.cab[k];const p=seg(t,ct[k],ct[k]+0.9);w.geo.setDrawRange(0,Math.floor(w.total*p/3)*3);w.m.visible=p>0.01}
 // parafusos apertando
 const tight=seg(t,E.aperte,E.aperte+2.0);W.parts.forEach(d=>d.userData.screws.forEach(s=>s.rotation.z=tight*Math.PI*6));W.nb.userData.screws.forEach(s=>s.rotation.z=tight*Math.PI*6);W.tb.userData.screws.forEach(s=>s.rotation.z=tight*Math.PI*6);
 if(t>=E.aperte&&t<E.aperte+1.8)c.shake=0.3;
 // adesivos de identificação
 W.stk.forEach((m,i)=>{const k=eob((t-E.identifique-i*0.25)/0.3);m.visible=t>=E.identifique+i*0.25;m.scale.setScalar(Math.max(0.01,k))});
 // rótulos (HTML)
 const Lb=(id,txt,pos,bg,fg,a,s)=>c.label(id,txt,pos,{bg,fg,a,s,dy:0});
 Lb('tri','TRILHO DIN',new T.Vector3(0.0,ROW1+0.6,0.4),'#fff','#10151f',(t>=E.trilho&&t<N[2]-0.1)?seg(t,E.trilho,E.trilho+0.3):0,eob((t-E.trilho)/0.3));
 Lb('dg','DISJUNTOR GERAL',new T.Vector3(-0.4,ROW1+0.8,0.5),'#e03c5a','#fff',(t>=E.geral&&t<N[3]-0.1)?seg(t,E.geral+0.3,E.geral+0.6):0,eob((t-E.geral-0.3)/0.3));
 Lb('dr','DR · CHOQUE',new T.Vector3(0.0,ROW1+0.8,0.5),'#2f7bff','#fff',(t>=E.dr&&t<N[4]-0.1)?seg(t,E.dr+0.3,E.dr+0.6):0,eob((t-E.dr-0.3)/0.3));
 Lb('dps','DPS · SURTOS',new T.Vector3(0.4,ROW1-0.8,0.5),'#ffc400','#10151f',(t>=E.dps&&t<N[4]-0.1)?seg(t,E.dps+0.3,E.dps+0.6):0,eob((t-E.dps-0.3)/0.3));
 Lb('cir','CIRCUITOS',new T.Vector3(0.0,ROW2+0.85,0.5),'#fff','#10151f',(t>=E.circuitos&&t<N[5]-0.1)?seg(t,E.circuitos+0.3,E.circuitos+0.6):0,eob((t-E.circuitos-0.3)/0.3));
 Lb('neu','NEUTRO',new T.Vector3(-0.57,ROW3-0.45,0.5),'#2f7bff','#fff',(t>=E.neutro&&t<N[6]-0.1)?seg(t,E.neutro,E.neutro+0.3):0,eob((t-E.neutro)/0.3));
 Lb('ter','TERRA',new T.Vector3(0.57,ROW3-0.45,0.5),'#1fa85a','#fff',(t>=E.terra&&t<N[6]-0.1)?seg(t,E.terra,E.terra+0.3):0,eob((t-E.terra)/0.3));
 Lb('mm','16 mm²',new T.Vector3(-0.1,2.7,0.6),'#fff','#10151f',(t>=E.dezesseis&&t<N[7]-0.1)?seg(t,E.dezesseis,E.dezesseis+0.3):0,eob((t-E.dezesseis)/0.3));
 // efeitos
 [E.geral,E.dr,E.dps].forEach(t0=>{if(t>=t0+0.5&&t<t0+0.8)c.doFlash(t0+0.5,0.1,0.25,'#ffffff')});
 if(t>=E.quadro&&t<E.quadro+0.4)c.doFlash(E.quadro,0.25,0.3,'#fff');
 if(t>=E.identifique+1.0&&t<E.identifique+1.5)c.doFlash(E.identifique+1.0,0.2,0.3,'#2ecc71');
 c.vig=0.28;
}
return{init,render,keywords,title}})();
