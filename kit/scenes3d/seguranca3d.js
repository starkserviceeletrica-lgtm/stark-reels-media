// Cena 3D "Segurança #1: os sistemas" (casa com muro e portão, low poly): câmera no poste, alarme (sensor + sirene), cerca elétrica com placa, interfone no portão.
window.SCENE=(function(){
let W={};
const keywords=['câmera','alarme','cerca','elétrica','interfone','sensor','choque','alerta','sinalização','segredo','juntos'];
const brand='full';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
const CAMP=[-4.3,3.9,1.7],SENS=[-0.9,3.25,-0.92],SIR=[0.9,3.25,-0.92],INTER=[1.36,1.35,1.2],SIGN=[3.6,1.05,1.16],CENT=[-2.6,2.3,-0.92];
function signTex(T){const cv=document.createElement('canvas');cv.width=384;cv.height=256;const g=cv.getContext('2d');
 g.fillStyle='#ffd400';g.fillRect(0,0,384,256);g.strokeStyle='#111';g.lineWidth=12;g.strokeRect(8,8,368,240);
 g.fillStyle='#111';g.beginPath();g.moveTo(70,40);g.lineTo(40,130);g.lineTo(66,130);g.lineTo(50,215);g.lineTo(100,110);g.lineTo(72,110);g.lineTo(92,40);g.closePath();g.fill();
 g.font='900 56px Arial';g.textAlign='center';g.fillText('CUIDADO',232,80);g.font='900 40px Arial';g.fillText('CERCA',232,145);g.fillText('ELETRIFICADA',232,195);
 return new T.CanvasTexture(cv)}
function init(c){
 const {THREE,scene}=c,T=THREE;
 scene.background=new T.Color('#a9d6f2');scene.fog=new T.Fog('#a9d6f2',30,70);
 scene.add(new T.HemisphereLight('#ffffff','#8a9a6a',0.85));const dl=new T.DirectionalLight('#fff6e0',1.05);dl.position.set(5,10,9);scene.add(dl);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,flatShading:true,roughness:.85,metalness:.03},o));
 const box=(w,h,d,col,x=0,y=0,z=0,p=scene,o={})=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 const cyl=(r,h,col,x=0,y=0,z=0,p=scene,s=10,o={},r2)=>{const m=new T.Mesh(new T.CylinderGeometry(r2==null?r:r2,r,h,s),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 const cone=(r,h,col,x,y,z,p=scene,s=6)=>{const m=new T.Mesh(new T.ConeGeometry(r,h,s),M(col));m.position.set(x,y,z);p.add(m);return m};
 // chão: quintal, calçada, rua
 box(60,0.2,9,'#7fb05e',0,-0.1,-4);box(60,0.22,2.2,'#c9c3b6',0,-0.09,2.2);box(60,0.2,6,'#3d434d',0,-0.12,6.3);box(80,0.2,30,'#7fb05e',0,-0.14,24.3);box(60,0.22,2.2,'#c9c3b6',0,-0.09,10.4);
 for(let i=-14;i<=14;i++)box(1.2,0.02,0.12,'#e8e2c8',i*2.2,0.0,6.3);box(60,0.18,0.2,'#a29c90',0,0.0,3.3);
 // casa
 box(7.0,3.8,4,'#f0e0c0',0,1.9,-3);const roof=new T.Mesh(new T.ConeGeometry(5.2,1.6,4),M('#b9473a'));roof.rotation.y=Math.PI/4;roof.scale.set(1.0,1,0.62);roof.position.set(0,4.6,-3);scene.add(roof);
 box(1.1,2.1,0.1,'#7a5232',0,1.05,-0.97);box(0.08,0.08,0.06,'#e0c070',0.35,1.05,-0.9);
 [-2.4,2.4].forEach(x=>{box(1.3,1.0,0.08,'#9fd2ee',x,1.9,-0.97);box(1.45,0.12,0.14,'#e8d8b8',x,1.33,-0.95);box(0.06,1.0,0.1,'#f6f6f6',x,1.9,-0.93)});
 // vizinhos e árvores ao fundo
 [[-11,'#d9c9e8'],[11,'#cfe3c9']].forEach(([x,col])=>{box(6,3.2,4,col,x,1.6,-3.5);const r=new T.Mesh(new T.ConeGeometry(4.6,1.4,4),M('#9a5a48'));r.rotation.y=Math.PI/4;r.scale.set(1,1,0.62);r.position.set(x,3.9,-3.5);scene.add(r)});
 [[-7.2,-1],[7.3,-1.4],[-8.5,-6],[8.2,-6.5],[-4.8,-6.8],[5,-7]].forEach(([x,z])=>{cyl(0.12,1.0,'#7a5232',x,0.5,z);cone(0.9,2.2,'#3f8a3b',x,2.0,z,scene,7)});
 // muro com pilares e portão
 const WALL='#e6e2da';
 box(4.6,1.9,0.3,WALL,-3.65,0.95,1.0);box(4.6,1.9,0.3,WALL,3.65,0.95,1.0);box(0.3,4.6,0.3,WALL,-5.95,0.95,-1.3).rotation.x=Math.PI/2;box(0.3,4.6,0.3,WALL,5.95,0.95,-1.3).rotation.x=Math.PI/2;
 box(4.7,0.1,0.4,'#cfc9be',-3.65,1.95,1.0);box(4.7,0.1,0.4,'#cfc9be',3.65,1.95,1.0);
 [-1.32,1.32].forEach(x=>{box(0.36,2.2,0.42,'#d6d0c6',x,1.1,1.0);box(0.44,0.1,0.5,'#bfb8ac',x,2.25,1.0)});
 W.gate=new T.Group();W.gate.position.set(0,0,1.02);scene.add(W.gate);
 box(2.3,0.1,0.06,'#3a414c',0,0.15,0,W.gate);box(2.3,0.1,0.06,'#3a414c',0,1.85,0,W.gate);for(let i=0;i<12;i++)box(0.06,1.7,0.06,'#4a525e',-1.08+i*0.196,1.0,0,W.gate);
 // CERCA ELÉTRICA: hastes, isoladores e 5 fios sobre o muro
 W.wires=[];const segs=[[-5.9,-1.5],[1.5,5.9]];
 segs.forEach(([a,b])=>{const n=Math.round((b-a)/0.88);const xs=[...Array(n+1)].map((_,i)=>lerp(a,b,i/n));
  xs.forEach(x=>{box(0.05,0.85,0.05,'#5b636f',x,2.42,1.0);for(let k=0;k<5;k++)cyl(0.035,0.07,'#f4f4f4',x,2.1+k*0.16,1.04,scene,8).rotation.x=Math.PI/2});
  for(let k=0;k<5;k++){const w=box(b-a,0.018,0.018,'#c7ccd4',(a+b)/2,2.1+k*0.16,1.07,scene,{emissive:'#ffe14d',emissiveIntensity:0,metalness:.4});W.wires.push(w)}});
 W.sparks=[...Array(16)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.05,6,5),new T.MeshBasicMaterial({color:'#fff27a',transparent:true,opacity:0}));scene.add(m);return m});
 // placas de aviso
 const tx=signTex(T);[[SIGN[0],SIGN[1]],[-3.6,1.05]].forEach(([x,y])=>{const p=new T.Mesh(new T.PlaneGeometry(0.9,0.6),new T.MeshBasicMaterial({map:tx}));p.position.set(x,y,1.16);scene.add(p)});
 // eletrificador (caixa) ao lado da porta, dentro do muro
 // INTERFONE no pilar direito
 W.intf=new T.Group();W.intf.position.set(...INTER);scene.add(W.intf);box(0.26,0.42,0.06,'#20252d',0,0,0,W.intf);
 W.scr=box(0.18,0.14,0.02,'#0d1a2a',0,0.08,0.035,W.intf,{emissive:'#4db8ff',emissiveIntensity:0});box(0.1,0.1,0.02,'#8a929e',0,-0.1,0.035,W.intf);W.btn=box(0.05,0.05,0.02,'#2ecc71',0,-0.1,0.05,W.intf,{emissive:'#2ecc71',emissiveIntensity:0});
 cyl(0.03,0.02,'#000',0,0.18,0.04,W.intf,8).rotation.x=Math.PI/2;
 // visitante
 W.vis=new T.Group();scene.add(W.vis);cyl(0.2,0.85,'#e0773a',0,0.85,0,W.vis,10);const hd=new T.Mesh(new T.SphereGeometry(0.19,10,8),M('#c98d62'));hd.position.y=1.5;W.vis.add(hd);
 W.legL=box(0.12,0.5,0.12,'#243049',-0.09,0.25,0,W.vis);W.legR=box(0.12,0.5,0.12,'#243049',0.09,0.25,0,W.vis);W.arm=box(0.1,0.5,0.1,'#e0773a',-0.25,0.95,0,W.vis);
 // CÂMERA no poste
 cyl(0.08,3.9,'#7b838f',CAMP[0],1.95,CAMP[2],scene,10);box(0.6,0.07,0.07,'#7b838f',CAMP[0]+0.3,CAMP[1],CAMP[2]);
 W.cam=new T.Group();W.cam.position.set(CAMP[0]+0.62,CAMP[1]-0.05,CAMP[2]);scene.add(W.cam);
 const tgt=new T.Vector3(0.6,0.2,4.2),dir=tgt.clone().sub(W.cam.position).normalize();
 const body=new T.Group();W.cam.add(body);box(0.26,0.24,0.62,'#f2f4f8',0,0,0,body);box(0.32,0.05,0.7,'#dde1e8',0,0.15,-0.02,body);const lens=cyl(0.09,0.06,'#111',0,0,0.32,body,12);lens.rotation.x=Math.PI/2;
 W.rec=new T.Mesh(new T.SphereGeometry(0.035,8,6),M('#ff2a2a',{emissive:'#ff2a2a',emissiveIntensity:0}));W.rec.position.set(0.09,0.06,0.31);body.add(W.rec);
 body.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),dir);
 const cg=new T.Group();cg.position.copy(W.cam.position);cg.quaternion.setFromUnitVectors(new T.Vector3(0,-1,0),dir);scene.add(cg);
 const L=dir.length()*0+W.cam.position.distanceTo(tgt)*1.05;W.cone=new T.Mesh(new T.ConeGeometry(L*0.42,L,24,1,true),new T.MeshBasicMaterial({color:'#6fd3ff',transparent:true,opacity:0,side:T.DoubleSide,depthWrite:false}));W.cone.position.y=-L/2;cg.add(W.cone);
 // ALARME: sensor de presença e sirene na fachada
 W.sens=new T.Group();W.sens.position.set(...SENS);scene.add(W.sens);box(0.3,0.38,0.14,'#f6f7fb',0,0,0,W.sens);const sl=new T.Mesh(new T.SphereGeometry(0.1,10,8),M('#dfe6ef',{emissive:'#ff3b3b',emissiveIntensity:0}));sl.position.set(0,-0.04,0.08);sl.scale.z=0.6;W.sens.add(sl);W.slens=sl;
 W.scone=new T.Mesh(new T.ConeGeometry(1.4,2.4,20,1,true),new T.MeshBasicMaterial({color:'#ff5a5a',transparent:true,opacity:0,side:T.DoubleSide,depthWrite:false}));
 const sg=new T.Group();sg.position.set(...SENS);sg.quaternion.setFromUnitVectors(new T.Vector3(0,-1,0),new T.Vector3(0.1,-0.75,1).normalize());W.scone.position.y=-1.2;sg.add(W.scone);scene.add(sg);
 W.sir=new T.Group();W.sir.position.set(...SIR);scene.add(W.sir);box(0.5,0.42,0.16,'#e8eaee',0,0,0,W.sir);W.strobe=box(0.36,0.14,0.12,'#c21f1f',0,0.08,0.1,W.sir,{emissive:'#ff2020',emissiveIntensity:0});
 W.sirL=new T.PointLight('#ff3030',0,6);W.sirL.position.set(SIR[0],SIR[1],0.2);scene.add(W.sirL);
 W.rings=[...Array(3)].map(()=>{const m=new T.Mesh(new T.TorusGeometry(0.3,0.025,6,24),new T.MeshBasicMaterial({color:'#ff4040',transparent:true,opacity:0}));m.position.set(SIR[0],SIR[1],SIR[2]+0.15);scene.add(m);return m});
 // intruso (só na fala do alarme)
 W.intr=new T.Group();scene.add(W.intr);cyl(0.19,0.8,'#2b2f3a',0,0.8,0,W.intr,10);const ih=new T.Mesh(new T.SphereGeometry(0.18,10,8),M('#1f222a'));ih.position.y=1.42;W.intr.add(ih);box(0.12,0.45,0.12,'#1f222a',-0.08,0.22,0,W.intr);box(0.12,0.45,0.12,'#1f222a',0.08,0.22,0,W.intr);W.intr.visible=false;
 // central (integração)
 W.cent=box(0.36,0.46,0.12,'#2a3040',...CENT,scene,{emissive:'#2ecc71',emissiveIntensity:0});
 W.pulse=[...Array(28)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.06,8,6),new T.MeshBasicMaterial({color:'#7dffb0',transparent:true,opacity:0}));scene.add(m);return m});
 W.src=[[CAMP[0]+0.6,CAMP[1]-0.1,CAMP[2]],[SIR[0],SIR[1],SIR[2]+0.1],[SENS[0],SENS[1],SENS[2]+0.1],[2.0,2.6,1.05],[INTER[0],INTER[1],INTER[2]]];
}
function camPose(c){
 const {N,E,tn:t}=c,tEnd=N[7];
 const WIDE=[[-0.3,5.6,22.5],[-0.3,1.9,-0.5]];
 const K=[
  [0,          [-0.3,6.0,24.0],[-0.3,2.0,-0.5]],
  [N[1]-0.05,  [-0.3,5.4,22.0],[-0.3,1.9,-0.5]],
  [N[1]+0.7,   [-1.5,3.9,7.6],[-2.9,2.7,1.9]],
  [N[2]-0.05,  [-1.8,3.8,7.2],[-2.9,2.6,1.9]],
  [N[2]+0.7,   [-0.5,5.4,7.6],[-0.5,2.6,-0.9]],
  [N[3]-0.05,  [-0.5,5.2,7.2],[-0.5,2.5,-0.9]],
  [N[3]+0.7,   [6.0,2.4,6.8],[3.5,1.4,1.0]],
  [N[4]-0.05,  [5.8,2.3,6.4],[3.5,1.4,1.0]],
  [N[4]+0.7,   [0.4,1.75,4.3],[1.4,1.3,1.1]],
  [N[5]-0.05,  [0.3,1.75,4.0],[1.4,1.3,1.1]],
  [N[5]+0.6,   [3.6,1.5,5.4],[3.6,0.55,1.1]],
  [N[6]-0.05,  [3.6,1.5,5.1],[3.6,0.55,1.1]],
  [N[6]+0.9,   WIDE[0],WIDE[1]],
  [tEnd-0.05,  [-0.3,5.3,21.0],[-0.3,1.9,-0.5]],
  [tEnd,       [0,6,23],[0,2.0,-0.5]],
  [1e9,        [0,6,23],[0,2.0,-0.5]]];
 for(let q=1;q<K.length-1;q++)if(K[q][0]<K[q-1][0]+0.05)K[q][0]=K[q-1][0]+0.05;
 let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1],dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));
 return {p:a[1].map((v,j)=>lerp(v,b[1][j],f)),l:a[2].map((v,j)=>lerp(v,b[2][j],f))};
}
function render(c){
 const {THREE,N,E,seg,eob,tn:t,camera}=c,T=THREE,tEnd=N[7];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 const all=seg(t,E.juntos-0.3,E.juntos+0.3)*(t<tEnd?1:1);   // segredo: tudo junto
 const ph=(x)=>0.5+0.5*Math.sin(x);
 // câmera: cone de visão + REC
 const cOn=Math.max(seg(t,E.cam,E.cam+0.5)*(t<N[2]+0.4?1:0.35),all);W.cone.material.opacity=0.22*cOn*(0.8+0.2*Math.sin(t*5));
 W.rec.material.emissiveIntensity=(t>=E.cam?2.2:0.3)*(Math.sin(t*6)>0?1:0.15);
 // alarme: intruso entra no quintal, sensor dispara, sirene pisca
 const ia=seg(t,E.alarme-0.3,E.sensor+0.3);W.intr.visible=t>=E.alarme-0.4&&t<N[3]+0.2;W.intr.position.set(lerp(-3.8,-1.6,ia),0,lerp(-0.1,0.2,ia));
 const trig=t>=E.acionado-0.1&&t<N[3]+0.3;const aOn=Math.max(trig?1:0,all);
 W.scone.material.opacity=0.25*Math.max(seg(t,E.sensor,E.sensor+0.4)*(t<N[3]+0.3?1:0),all*0.6);W.slens.material.emissiveIntensity=2*Math.max(seg(t,E.sensor,E.sensor+0.3)*(t<N[3]+0.3?1:0),all)*(0.5+0.5*Math.sin(t*12));
 const st=aOn*(Math.sin(t*16)>0?1:0.15);W.strobe.material.emissiveIntensity=2.4*st;W.sirL.intensity=3*st;
 W.rings.forEach((m,i)=>{const k=((t*1.6+i/3)%1);m.scale.setScalar(1+k*3);m.material.opacity=0.7*(1-k)*(trig?1:0)});
 if(trig&&t<E.acionado+0.3)c.doFlash(E.acionado-0.1,0.2,0.35,'#ff3030');
 // cerca: faíscas correndo nos fios
 const fOn=Math.max(seg(t,E.cerca,E.cerca+0.4)*(t<N[4]+0.2?1:0),seg(t,E.alerta,E.alerta+0.3)*(t<N[6]?0.6:0),all*0.7);
 const zap=t>=E.choque&&t<E.choque+0.45;W.wires.forEach((w,i)=>w.material.emissiveIntensity=fOn*(zap?2.2:0.7+0.4*ph(t*14+i)));
 if(zap){c.doFlash(E.choque,0.28,0.4,'#fff27a');c.shake=0.5}
 W.sparks.forEach((m,i)=>{const side=i%2,k=((t*0.9+i*0.13)%1),a=side?1.5:-5.9,b=side?5.9:-1.5;m.position.set(lerp(a,b,k),2.1+(i%5)*0.16,1.08);m.material.opacity=fOn*(0.6+0.4*ph(t*20+i))});
 // interfone: visitante chega, tela acende, portão abre em "entra"
 const vw=seg(t,N[4]-0.6,E.inter+0.2);const vx=lerp(6.5,2.35,vw);W.vis.position.set(vx,0,1.85);W.vis.rotation.y=-Math.PI/2*(1-seg(t,E.inter,E.inter+0.4))+0.0;const walking=vw>0&&vw<1;
 W.legL.rotation.x=walking?0.5*Math.sin(t*10):0;W.legR.rotation.x=walking?-0.5*Math.sin(t*10):0;W.arm.rotation.z=seg(t,E.inter,E.inter+0.3)*(t<N[5]?1:0)*1.2;W.arm.position.y=0.95+0.15*seg(t,E.inter,E.inter+0.3)*(t<N[5]?1:0);
 const iOn=Math.max(seg(t,E.inter,E.inter+0.3),all);W.scr.material.emissiveIntensity=1.6*iOn;W.btn.material.emissiveIntensity=(t>=E.entra?1.5:0.2)*iOn;
 const go=seg(t,E.entra,E.entra+1.4);W.gate.position.set(-1.9*go,0,1.02-0.3*clamp01(go*4));
 // integração: pulsos de cada sistema até a central
 const pOn=all;W.cent.material.emissiveIntensity=1.3*pOn*(0.7+0.3*Math.sin(t*8));
 W.pulse.forEach((m,i)=>{const s=W.src[i%W.src.length],k=((t*0.6+i*0.07)%1);const mid=[(s[0]+CENT[0])/2,Math.max(s[1],CENT[1])+0.6,(s[2]+CENT[2])/2];
  const x=(1-k)*(1-k)*s[0]+2*(1-k)*k*mid[0]+k*k*CENT[0],y=(1-k)*(1-k)*s[1]+2*(1-k)*k*mid[1]+k*k*CENT[1],z=(1-k)*(1-k)*s[2]+2*(1-k)*k*mid[2]+k*k*CENT[2];m.position.set(x,y,z);m.material.opacity=0.95*pOn});
 c.vig=(t>=E.segredo-0.2&&t<tEnd-0.4)?0.45:0.18;
 if(t>=E.alerta&&t<E.alerta+0.35){c.doFlash(E.alerta,0.18,0.3,'#ff8a00')}
 // rótulos
 const V=(x,y,z)=>new T.Vector3(x,y,z);
 const Lb=(id,txt,pos,bg,fg,t0,t1)=>c.label(id,txt,pos,{bg,fg,a:(t>=t0&&t<t1)?seg(t,t0,t0+0.3):0,s:eob((t-t0)/0.3)});
 Lb('q1','CÂMERA',V(-4.0,4.7,1.7),'#4db8ff','#10151f',E.q_cam,N[1]-0.1);
 Lb('q2','ALARME',V(0.9,4.0,-0.9),'#ff4d4d','#fff',E.q_alarme,N[1]-0.1);
 Lb('q3','CERCA ELÉTRICA',V(4.0,3.3,1.0),'#ffd400','#10151f',E.q_cerca,N[1]-0.1);
 Lb('q4','INTERFONE',V(1.4,0.6,1.2),'#2ecc71','#10151f',E.q_inter,N[1]-0.1);
 Lb('cam','CÂMERA · GRAVA E MOSTRA',V(-1.5,4.8,1.7),'#4db8ff','#10151f',E.cam,N[2]-0.1);
 Lb('sen','SENSOR',V(-0.9,4.0,-0.9),'#ffffff','#10151f',E.sensor,N[3]-0.1);
 Lb('sir','SIRENE',V(0.9,4.0,-0.9),'#ff4d4d','#fff',E.acionado,N[3]-0.1);
 Lb('cer','CERCA ELÉTRICA',V(3.6,3.0,1.0),'#ffd400','#10151f',E.cerca,N[4]-0.1);
 Lb('int','INTERFONE',V(1.36,1.9,1.2),'#2ecc71','#10151f',E.inter,N[5]-0.1);
 Lb('ale','INSTALAÇÃO CORRETA',V(3.45,1.62,1.2),'#e53935','#fff',E.alerta,N[6]-0.1);
 Lb('sin','+ SINALIZAÇÃO',V(3.6,0.72,1.2),'#ffd400','#10151f',E.sinal,N[6]-0.1);
 Lb('jun','TUDO INTEGRADO',V(0,4.8,-0.5),'#ffc400','#10151f',E.juntos,N[7]-0.3);
}
return{init,render,keywords,brand}})();
