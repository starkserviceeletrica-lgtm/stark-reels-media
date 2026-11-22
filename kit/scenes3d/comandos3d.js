// Cena 3D "Comandos #1: circuito de força x circuito de comando" (bancada).
// Dispositivos sem marca (sem logotipos).
window.SCENE=(function(){
let W={};
const keywords=['força','comando','botãozinho','motor','contator','ponte','alerta','segredo','separação'];
const title='COMANDOS ELÉTRICOS';
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

 // ---------- placa de montagem ----------
 const Q=W.Q=new T.Group();scene.add(Q);
 box(2.9,5.0,0.12,'#cfd5e0',0,0,-0.1,Q);box(2.5,4.5,0.04,'#e6eaf1',0,0,-0.02,Q);
 box(2.95,0.18,0.5,'#f2f4f8',0,2.55,0.15,Q);box(2.95,0.18,0.5,'#f2f4f8',0,-2.55,0.15,Q);box(0.18,5.0,0.5,'#f2f4f8',-1.47,0,0.15,Q);box(0.18,5.0,0.5,'#f2f4f8',1.47,0,0.15,Q);
 // contator K1
 W.K=new T.Group();W.K.position.set(-0.35,0.3,0.2);Q.add(W.K);
 W.kbody=rbox(1.15,1.05,0.55,0.03,'#2a2f3d',{roughness:.4});W.K.add(W.kbody);box(1.1,0.3,0.06,'#3a4156',0,0.35,0.28,W.K);
 const klab=tex(T,256,128,(g,w,h)=>{g.fillStyle='#f3f5f9';g.fillRect(0,0,w,h);g.fillStyle='#10151f';g.font='900 64px Arial';g.textAlign='center';g.fillText('K1',w/2,h*0.55);g.font='600 26px Arial';g.fillText('CONTATOR  A1 · A2',w/2,h*0.85)});
 const klp=new T.Mesh(new T.PlaneGeometry(0.8,0.4),new T.MeshBasicMaterial({map:klab}));klp.position.set(0,-0.02,0.29);W.K.add(klp);
 W.armature=box(0.9,0.12,0.06,'#d9dde6',0,-0.3,0.3,W.K);
 const kscr=[];[-0.38,0,0.38].forEach(x=>{[1,-1].forEach(sg=>{const sc=new T.Group();sc.position.set(x,sg*0.5,0.3);W.K.add(sc);const sh=cyl(0.045,0.04,'#d3d8e2',0,0,0,sc,16,{metalness:.8,roughness:.3});sh.rotation.x=Math.PI/2;box(0.07,0.014,0.014,'#2a303d',0,0,0.022,sc);kscr.push(sc)})});
 [[0.5,0.42],[0.5,-0.42]].forEach(([x,y])=>{const sc=new T.Group();sc.position.set(x,y,0.3);W.K.add(sc);const sh=cyl(0.04,0.04,'#e0b86a',0,0,0,sc,16,{metalness:.8,roughness:.3});sh.rotation.x=Math.PI/2});
 // botoeira
 W.B=new T.Group();W.B.position.set(0.85,1.95,0.2);Q.add(W.B);W.B.add(rbox(0.5,1.0,0.3,0.03,'#dde1e8',{roughness:.35}));
 W.bg=cyl(0.14,0.14,'#2ecc71',0,0.25,0.18,W.B,24,{emissive:'#1f8a4a',emissiveIntensity:.5});W.bg.rotation.x=Math.PI/2;W.br=cyl(0.14,0.14,'#e53935',0,-0.2,0.18,W.B,24,{emissive:'#8a1f1f',emissiveIntensity:.4});W.br.rotation.x=Math.PI/2;
 [['I',0.25],['O',-0.2]].forEach(([t0,y])=>{const lt=tex(T,64,64,(g,w,h)=>{g.fillStyle='#dde1e8';g.fillRect(0,0,w,h);g.fillStyle='#10151f';g.font='900 44px Arial';g.textAlign='center';g.fillText(t0,w/2,h*0.75)});const m=new T.Mesh(new T.PlaneGeometry(0.16,0.16),new T.MeshBasicMaterial({map:lt}));m.position.set(0.0,y-0.27,0.152);W.B.add(m)});
 // motor trifásico (eixo para a câmera)
 W.M3=new T.Group();W.M3.position.set(-0.35,-1.85,0.35);Q.add(W.M3);
 const mb=cyl(0.62,0.8,'#2f6fb3',0,0,0,W.M3,28,{roughness:.45,metalness:.2});mb.rotation.x=Math.PI/2;
 for(let i=0;i<14;i++){const a=i*Math.PI*2/14;const f=box(0.06,0.18,0.8,'#2a5f9c',Math.cos(a)*0.66,Math.sin(a)*0.66,0,W.M3);f.rotation.z=a+Math.PI/2}
 box(0.9,0.14,0.8,'#1f2430',0,-0.7,0,W.M3);box(0.5,0.22,0.5,'#d0d4db',0,0.74,0,W.M3);
 const fc=cyl(0.6,0.12,'#3a4152',0,0,0.46,W.M3,28);fc.rotation.x=Math.PI/2;
 W.fan=new T.Group();W.fan.position.set(0,0,0.54);W.M3.add(W.fan);for(let i=0;i<6;i++){const b=box(0.1,0.5,0.03,'#e8edf8',0,0.25,0,new T.Group());W.fan.add(b.parent);b.parent.rotation.z=i*Math.PI/3}cyl(0.09,0.06,'#ffc400',0,0,0.02,W.fan,16).rotation.x=Math.PI/2;
 // fios: força (grossos) e comando (finos)
 function cable(pts,col,r){const curve=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));const geo=new T.TubeGeometry(curve,60,r,10,false);const m=new T.Mesh(geo,M(col,{roughness:.5}));m.castShadow=true;Q.add(m);return {m,curve}}
 const PC=['#e53935','#1b1f26','#9aa3b4'];W.power=[];[-0.38,0,0.38].forEach((dx,i)=>{const x=-0.35+dx;
  W.power.push(cable([[x+dx*0.5,2.95,0.45],[x,2.0,0.45],[x,1.2,0.4],[x,0.88,0.32]],PC[i],0.055));
  W.power.push(cable([[x,-0.32,0.32],[x,-0.7,0.4],[x*0.4-0.35*0.6,-1.15,0.55],[-0.35+dx*0.4,-1.58,0.6]],PC[i],0.055))});
 W.ctrl=[cable([[1.25,2.95,0.4],[1.15,2.7,0.35],[0.95,2.5,0.3],[0.85,2.45,0.25]],'#e53935',0.025),cable([[0.7,1.55,0.3],[0.55,1.2,0.4],[0.35,0.95,0.4],[0.15,0.75,0.35]],'#2ecc71',0.025),cable([[0.15,-0.1,0.35],[0.45,-0.5,0.4],[0.9,-0.4,0.45],[1.25,0.3,0.4],[1.25,1.8,0.4],[1.1,2.1,0.35]],'#4aa8ff',0.025)];
 W.pulses=[...Array(36)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.06,8,6),new T.MeshBasicMaterial({color:'#ffd23f',transparent:true,opacity:0}));Q.add(m);return m});
 W.cpulses=[...Array(24)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.04,8,6),new T.MeshBasicMaterial({color:'#7dffb0',transparent:true,opacity:0}));Q.add(m);return m});
 // alerta
 W.warn=new T.Group();W.warn.position.set(0.9,0.7,0.6);Q.add(W.warn);const tri=new T.Mesh(new T.CylinderGeometry(0.4,0.4,0.06,3),M('#ffc400'));tri.rotation.x=Math.PI/2;tri.rotation.z=Math.PI/2;W.warn.add(tri);box(0.06,0.3,0.04,'#10151f',0,0.0,0.05,W.warn);W.warn.visible=false;
}
const K=(c)=>{const {N,E}=c,tEnd=N[7];return [
 [0,        [0.0,0.6,13.0],[0,0.0,0]],
 [N[1]-0.01,[0.0,0.5,10.5],[0,0.0,0]],
 [N[1]+0.5, [-0.2,-0.3,6.8],[-0.3,-0.6,0]],
 [N[2]-0.05,[-0.1,0.0,7.4],[-0.1,0.0,0]],
 [N[2]+0.6, [0.3,1.4,5.8],[0.3,1.4,0]],
 [N[3]-0.05,[0.2,1.0,6.2],[0.1,0.9,0]],
 [N[3]+0.8, [0.0,0.2,9.0],[0,0.0,0]],
 [N[4]+0.2, [-0.2,0.3,4.8],[-0.35,0.3,0]],
 [N[5]-0.05,[0.0,0.3,7.5],[0,0.2,0]],
 [N[6]-0.05,[0.2,0.6,6.2],[0.4,0.7,0]],
 [tEnd-0.05,[0.0,0.4,8.5],[0,0.2,0]],
 [tEnd,     [0.0,0.4,13.0],[0,0.0,0]],
 [1e9,      [0.0,0.4,13.0],[0,0.0,0]]]};
function camPose(c){const k=K(c),t=c.tn;for(let q=1;q<k.length-1;q++)if(k[q][0]<k[q-1][0]+0.05)k[q][0]=k[q-1][0]+0.05;let i=0;while(i<k.length-2&&t>=k[i+1][0])i++;const a=k[i],b=k[i+1],dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));const pp=a[1].map((v,j)=>lerp(v,b[1][j],f));pp[2]*=1.2;return {p:pp,l:a[2].map((v,j)=>lerp(v,b[2][j],f))}}
function along(cs,u){const all=cs.map(x=>x.curve);const n=all.length;const k=Math.min(n-1,Math.floor(u*n)),f=u*n-k;return all[k].getPoint(Math.min(1,Math.max(0,f)))}
function render(c){
 const {THREE,N,E,seg,eob,clamp,tn:t,camera}=c,T=THREE,tEnd=N[7];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // estados: botão apertado em (1.0s) -> tudo ligado até o fim do vídeo (demonstração)
 const press=(t>=1.2&&t<1.7)||(t>=E.botao-0.1&&t<E.botao+0.4)?1:0;
 const on=t>=1.4&&t<tEnd;
 W.bg.position.z=0.18-0.06*press;
 W.armature.position.y=-0.3+(on?0.12:0);
 // pulsos de força (amarelos) e de comando (verdes)
 const forceOn=on&&t>=E.forca-0.2;
 W.pulses.forEach((m,i)=>{const lane=i%6;const cs=[W.power[lane]];const k=((t*0.5+i*0.07)%1);const p=cs[0].curve.getPoint(k);m.position.copy(p);m.material.opacity=forceOn?1:0;m.material.color.set(['#ffd23f','#ffd23f','#ffd23f'][lane%3])});
 const ctrlOn=on&&t>=E.comando-0.2;
 W.cpulses.forEach((m,i)=>{const lane=i%3;const k=((t*0.8+i*0.09)%1);const p=W.ctrl[lane].curve.getPoint(k);m.position.copy(p);m.material.opacity=ctrlOn?1:0});
 W.fan.rotation.z=-(on?(t-1.4)*(t>=E.forca?14:6):0);
 // realce por linha (o resto fica levemente apagado visualmente via vinheta/rótulos)
 c.vig=(t>=E.segredo-0.2&&t<tEnd-0.5)?0.55:0.25;
 // alerta
 W.warn.visible=t>=E.alerta&&t<N[6]-0.1;W.warn.scale.setScalar(Math.max(0.01,eob((t-E.alerta)/0.35)));W.warn.rotation.z=0.12*Math.sin(t*9);
 if(t>=E.alerta&&t<E.alerta+0.4){c.doFlash(E.alerta,0.22,0.3,'#ffb400');c.shake=0.6}
 // rótulos
 const Lb=(id,txt,pos,bg,fg,a,s)=>c.label(id,txt,pos,{bg,fg,a,s});
 Lb('for','FORÇA · CORRENTE ALTA',new T.Vector3(-0.35,-1.2,0.6),'#e53935','#fff',(t>=E.forca&&t<N[2]-0.1)?seg(t,E.forca,E.forca+0.3):0,eob((t-E.forca)/0.3));
 Lb('com','COMANDO · CORRENTE BAIXA',new T.Vector3(0.9,1.5,0.6),'#2ecc71','#10151f',(t>=E.comando&&t<N[3]-0.1)?seg(t,E.comando,E.comando+0.3):0,eob((t-E.comando)/0.3));
 Lb('bot','BOTÃO PEQUENO',new T.Vector3(0.9,2.5,0.6),'#fff','#10151f',(t>=E.botao&&t<N[4]-0.1)?seg(t,E.botao,E.botao+0.3):0,eob((t-E.botao)/0.3));
 Lb('mot','MOTOR GRANDE',new T.Vector3(-0.35,-2.7,0.6),'#2f7bff','#fff',(t>=E.botao&&t<N[4]-0.1)?seg(t,E.botao+0.3,E.botao+0.6):0,eob((t-E.botao-0.3)/0.3));
 Lb('ctr','CONTATOR = A PONTE',new T.Vector3(-0.35,1.3,0.6),'#ffc400','#10151f',(t>=E.ponte&&t<N[5]-0.1)?seg(t,E.ponte,E.ponte+0.3):0,eob((t-E.ponte)/0.3));
 if(t>=E.ponte&&t<E.ponte+0.6)c.doFlash(E.ponte,0.15,0.3,'#ffd23f');
}
return{init,render,keywords,title,brand:'full'}})();
