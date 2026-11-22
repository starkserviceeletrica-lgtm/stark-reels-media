// Cena 3D "De onde vem a energia": hidrelétrica, eólica, solar, térmica, gerador, linhas de transmissão até a casa. Estilo low poly.
window.SCENE=(function(){
let W={};
const keywords=['hidrelétrica','água','turbina','eólica','vento','solar','térmica','vapor','gerador','cabos','casa','segredo','instante'];
const brand='full';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
const X={hid:0,eol:8,sol:17,ter:26,pil0:34,casa:52};
function init(c){
 const {THREE,scene}=c,T=THREE;
 scene.background=new T.Color('#9ed8f5');scene.fog=new T.Fog('#9ed8f5',26,70);
 scene.add(new T.HemisphereLight('#ffffff','#7ab05a',0.95));const dl=new T.DirectionalLight('#fff7e0',1.15);dl.position.set(6,10,8);scene.add(dl);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,flatShading:true,roughness:.85,metalness:.03},o));
 const box=(w,h,d,col,x=0,y=0,z=0,p=scene,o={})=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 const cyl=(r,h,col,x=0,y=0,z=0,p=scene,s=10,o={},r2)=>{const m=new T.Mesh(new T.CylinderGeometry(r2==null?r:r2,r,h,s),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 const cone=(r,h,col,x,y,z,p=scene,s=6)=>{const m=new T.Mesh(new T.ConeGeometry(r,h,s),M(col));m.position.set(x,y,z);p.add(m);return m};
 // terreno e colinas
 const gnd=box(140,0.4,40,'#6fae52',26,-0.2,0);
 for(let i=0;i<46;i++){const x=-12+i*2.1+((i*37)%5)*0.3,z=-6-((i*53)%9),h=1.6+((i*29)%7)*0.55;cone(1.6+((i*17)%4)*0.35,h,i%3?'#5a9a45':'#4d8a3d',x,h/2,z)}
 for(let i=0;i<30;i++){const x=-10+i*3.3,z=-14-((i*31)%6);cone(3.0,4+((i*13)%5),'#8aa6b8',x,2.2,z,scene,5)}
 const tree=(x,z,s=1)=>{cyl(0.07*s,0.4*s,'#7a5232',x,0.2*s,z);cone(0.36*s,0.9*s,'#3f8a3b',x,0.85*s,z,scene,6)};
 [[-3,2.5],[3,2.8],[11,3],[13,2.4],[21,3],[30,3.2],[40,2.6],[45,3.2]].forEach(([x,z])=>tree(x,z,1.2));
 // ---- HIDRELÉTRICA ----
 const H=W.hid=new T.Group();H.position.set(X.hid,0,0);scene.add(H);
 box(4.2,2.6,0.9,'#aeb6c2',0,1.3,0,H);box(4.4,0.2,1.1,'#9aa3b0',0,2.65,0,H);
 W.res=box(4.0,2.4,5,'#3b8fd6',0,1.5,-3.1,H,{transparent:true,opacity:.88});W.res.scale.y=1;
 W.fall=[...Array(18)].map(()=>{const m=box(0.34,0.95,0.12,'#e6f6ff',0,1,0.5,H,{emissive:'#7fd0ff',emissiveIntensity:.6});return m});
 box(2.6,0.9,1.3,'#d8dde6',0,0.45,1.6,H);box(2.8,0.15,1.5,'#c04a3c',0,1.0,1.6,H);
 W.hturb=new T.Group();W.hturb.position.set(0,0.45,2.3);H.add(W.hturb);cyl(0.5,0.12,'#aab4cc',0,0,0,W.hturb,16).rotation.x=Math.PI/2;for(let i=0;i<6;i++){const b=box(0.08,0.42,0.08,'#e8edf8',0,0.3,0.06,new T.Group());W.hturb.add(b.parent);b.parent.rotation.z=i*Math.PI/3}
 W.hgen=box(0.9,0.7,0.9,'#ff8a3d',1.9,0.4,1.6,H);
 // ---- EÓLICA ----
 W.wind=[8.0,9.8,11.6].map((x,i)=>{const g=new T.Group();g.position.set(x,0,-0.5-i*0.5);scene.add(g);cyl(0.07,3.2,'#f2f4f8',0,1.6,0,g,10,{},0.14);box(0.4,0.22,0.5,'#f2f4f8',0,3.25,0.05,g);const rot=new T.Group();rot.position.set(0,3.25,0.35);g.add(rot);cyl(0.1,0.15,'#d7dbe6',0,0,0,rot,10).rotation.x=Math.PI/2;for(let k=0;k<3;k++){const bl=new T.Group();rot.add(bl);bl.rotation.z=k*Math.PI*2/3;box(0.12,1.5,0.03,'#ffffff',0,0.8,0,bl)}return rot});
 // ---- SOLAR ----
 const panelTex=(()=>{const cv=document.createElement('canvas');cv.width=128;cv.height=128;const g=cv.getContext('2d');g.fillStyle='#1d3f7a';g.fillRect(0,0,128,128);g.strokeStyle='#6f9ad6';g.lineWidth=2;for(let i=0;i<=4;i++){g.beginPath();g.moveTo(i*32,0);g.lineTo(i*32,128);g.stroke();g.beginPath();g.moveTo(0,i*32);g.lineTo(128,i*32);g.stroke()}return new T.CanvasTexture(cv)})();
 W.panels=[];for(let r=0;r<2;r++)for(let k=0;k<3;k++){const g=new T.Group();g.position.set(X.sol-1.6+k*1.6,0.6,0.4-r*1.5);g.rotation.x=-0.5;scene.add(g);const p=new T.Mesh(new T.BoxGeometry(1.4,0.08,1.1),new T.MeshStandardMaterial({map:panelTex,roughness:.35,metalness:.4}));g.add(p);cyl(0.04,0.7,'#9aa3b0',0,-0.35,0.3,g);W.panels.push(p)}
 W.sun=new T.Mesh(new T.SphereGeometry(0.9,14,10),new T.MeshBasicMaterial({color:'#ffd23f'}));W.sun.position.set(X.sol+3.2,5.6,-3);scene.add(W.sun);
 W.rays=[...Array(8)].map((_,i)=>{const m=cone(0.1,1.3,'#ffe27a',0,0,0);m.material=new T.MeshBasicMaterial({color:'#ffe27a',transparent:true,opacity:.0});return m});
 box(0.7,0.7,0.5,'#e8edf8',X.sol+3.4,0.35,1.6);
 // ---- TÉRMICA ----
 const TT=W.ter=new T.Group();TT.position.set(X.ter,0,0);scene.add(TT);box(3.4,1.6,1.8,'#c9ced8',0,0.8,0,TT);box(2.0,0.5,1.4,'#b0b7c4',-0.4,1.85,0,TT);cyl(0.28,3.2,'#b9bfcb',-1.1,2.4,-0.2,TT,12,{},0.22);cyl(0.28,3.2,'#b9bfcb',-0.4,2.4,-0.2,TT,12,{},0.22);box(0.3,0.4,1.82,'#c04a3c',0.8,1.0,0,TT);
 W.tturb=new T.Group();W.tturb.position.set(1.3,0.8,1.0);TT.add(W.tturb);cyl(0.4,0.1,'#aab4cc',0,0,0,W.tturb,16).rotation.x=Math.PI/2;for(let i=0;i<5;i++){const b=box(0.07,0.34,0.07,'#e8edf8',0,0.24,0.06,new T.Group());W.tturb.add(b.parent);b.parent.rotation.z=i*Math.PI*2/5}
 W.smoke=[...Array(10)].map(()=>{const m=new T.Mesh(new T.IcosahedronGeometry(0.4,0),new T.MeshBasicMaterial({color:'#8d93a0',transparent:true,opacity:0}));TT.add(m);return m});
 W.fire=cone(0.22,0.5,'#ff7a1f',X.ter-0.8,0.4,1.0);W.fire.material=new T.MeshBasicMaterial({color:'#ff8a2a'});
 // ---- linhas de transmissão ----
 W.pyl=[];const px=[X.pil0,X.pil0+4.6,X.pil0+9.2,X.pil0+13.8];
 px.forEach(x=>{const g=new T.Group();g.position.set(x,0,0.2);scene.add(g);[-0.3,0.3].forEach(s=>{const l=box(0.09,4.4,0.09,'#8a929e',s,2.2,0,g);l.rotation.z=-s*0.12});for(let k=0;k<4;k++)box(0.9-k*0.12,0.06,0.06,'#a2aab6',0,0.8+k*0.9,0,g);box(2.3,0.1,0.1,'#a2aab6',0,4.2,0,g);box(1.7,0.1,0.1,'#a2aab6',0,3.5,0,g);W.pyl.push(g)});
 W.wires=[];[[ -1.1,4.2],[0,4.2],[1.1,4.2]].forEach(([dz,y],wi)=>{const pts=[];for(let i=0;i<px.length-1;i++){for(let s=0;s<=10;s++){const t=s/10;pts.push(new T.Vector3(lerp(px[i],px[i+1],t)+0,y-0.5*Math.sin(Math.PI*t)-0.0,dz*0.8))}}
  pts.push(new T.Vector3(px[px.length-1],y,dz*0.8));const geo=new T.BufferGeometry().setFromPoints(pts);const ln=new T.Line(geo,new T.LineBasicMaterial({color:'#222831'}));scene.add(ln);W.wires.push({pts})});
 // ligação até a casa (3 fios descendo)
 W.pulse=[...Array(26)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.09,8,6),new T.MeshBasicMaterial({color:'#ffd23f',transparent:true,opacity:0}));scene.add(m);return m});
 // ---- CASA ----
 const C=W.casa=new T.Group();C.position.set(X.casa,0,0.6);scene.add(C);box(3.0,1.7,2.4,'#f1e2c4',0,0.85,0,C);const roof=new T.Mesh(new T.ConeGeometry(2.4,1.2,4),M('#c9503c'));roof.rotation.y=Math.PI/4;roof.position.y=2.3;roof.scale.set(1.0,1,0.8);C.add(roof);box(0.6,1.1,0.1,'#7a5232',-0.8,0.55,1.22,C);box(0.8,0.6,0.1,'#a8d8f2',0.7,1.0,1.22,C);
 W.bulb=new T.Mesh(new T.SphereGeometry(0.15,10,8),M('#fff2b0',{emissive:'#ffd23f',emissiveIntensity:0}));W.bulb.position.set(0.7,1.5,1.0);C.add(W.bulb);W.bulbL=new T.PointLight('#ffd23f',0,5);W.bulbL.position.set(0.7,1.4,1.6);C.add(W.bulbL);
 box(0.12,2.2,0.12,'#7a5232',-2.0,1.1,0.9,C);
}
function camPose(c){
 const {N,E,tn:t}=c,tEnd=N[7];
 const K=[
  [0,         [X.hid+0.2,3.6,13.5],[X.hid,1.6,0]],
  [N[1]-0.1,  [X.hid+0.3,3.6,12.5],[X.hid,1.6,0]],
  [E.turbina+0.8,[X.hid+0.8,2.2,9.8],[X.hid+0.4,0.9,1.2]],
  [N[2]-0.05, [X.hid+1.5,1.8,11.5],[X.hid+1.0,1.2,0]],
  [N[2]+0.5,  [X.eol+0.3,2.2,12.5],[X.eol+0.2,1.9,0]],
  [E.solar-0.4,[X.eol+0.8,2.2,12.5],[X.eol+0.6,1.9,0]],
  [E.solar+0.6,[X.sol+0.8,2.2,12.5],[X.sol+0.4,1.5,0]],
  [N[3]-0.05, [X.sol+1.0,2.4,12.5],[X.sol+0.8,1.6,0]],
  [N[3]+0.7,  [X.ter+0.4,2.2,13],[X.ter,1.6,0]],
  [N[4]-0.05, [X.ter+0.4,2.0,12.5],[X.ter+0.2,1.5,0]],
  [N[4]+0.9,  [X.ter+0.4,1.3,8.2],[X.ter+1.0,0.9,1]],
  [N[5]-0.05, [X.ter+1.0,1.8,11],[X.ter+1.0,1.1,0]],
  [N[5]+1.2,  [X.pil0+5,2.4,14],[X.pil0+5,2.2,0]],
  [E.casa+0.3,[X.casa-1.0,2.0,12],[X.casa,1.3,0.5]],
  [N[6]+1.0,  [X.casa+0.2,2.0,11.5],[X.casa,1.3,0.5]],
  [tEnd-0.05, [X.casa+0.4,2.0,11],[X.casa,1.3,0.5]],
  [tEnd,      [X.casa+0.4,2.4,15],[X.casa,1.4,0.5]],
  [1e9,       [X.casa+0.4,2.4,15],[X.casa,1.4,0.5]]];
 for(let q=1;q<K.length-1;q++)if(K[q][0]<K[q-1][0]+0.05)K[q][0]=K[q-1][0]+0.05;
 let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1];const dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));
 return {p:a[1].map((v,j)=>lerp(v,b[1][j],f)),l:a[2].map((v,j)=>lerp(v,b[2][j],f))};
}
function render(c){
 const {THREE,N,E,seg,eob,clamp,tn:t,camera}=c,T=THREE,tEnd=N[7];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // hidrelétrica
 const hy=t>=N[1]-0.3?1:0.4;W.fall.forEach((m,i)=>{const k=((t*0.9+i/14)%1);m.position.set(-1.5+(i%6)*0.6,2.6-k*2.4,0.52);m.material.opacity=1;m.visible=t>=N[1]-0.3&&t<N[3]+0.3});
 W.hturb.rotation.z=-(t*(t>=E.turbina-0.3?9:3));
 // eólica
 const ws=(t>=E.vento-0.2?5.0:1.8);W.wind.forEach((r,i)=>r.rotation.z=-(t*ws+i));
 // solar
 const sOn=seg(t,E.solar-0.2,E.solar+0.6);W.rays.forEach((m,i)=>{const a=-0.4-i*0.28;m.position.set(W.sun.position.x-0.8-i*0.35,W.sun.position.y-1.0-i*0.05,W.sun.position.z+1);m.rotation.z=0.9;m.material.opacity=0.8*sOn*(0.6+0.4*Math.sin(t*6+i))});
 W.sun.scale.setScalar(1+0.06*Math.sin(t*3));W.panels.forEach(p=>p.material.emissive.set('#3a78ff'),0);W.panels.forEach(p=>p.material.emissiveIntensity=0.25*sOn+0.15*sOn*Math.sin(t*5));
 // térmica
 const tOn=seg(t,E.termica,E.termica+0.8);W.fire.scale.set(1,0.6+0.5*Math.sin(t*14)*tOn+tOn*0.4,1);W.fire.visible=tOn>0.01;
 W.smoke.forEach((m,i)=>{const k=((t*0.5+i*0.1)%1);m.material.opacity=0.55*(1-k)*tOn;m.position.set(-1.1+(i%2)*0.7,3.9+k*2.2,-0.2);m.scale.setScalar(0.5+k*1.6)});
 W.tturb.rotation.z=-(t*(t>=E.vapor-0.3?10:2));
 // pulsos de energia: do gerador até a casa depois do "cabos"
 const flow=seg(t,E.cabos-0.1,E.cabos+0.6);const wx=W.pyl.map(p=>p.position.x);
 W.pulse.forEach((m,i)=>{const lane=i%3,k=((t*0.35+i*0.04)%1);const x0=X.ter+1.2,x1=X.casa-1.0;const x=lerp(x0,x1,k);const y=(x<X.pil0?0.9+k*3.0:(x<X.pil0+13.8?3.8:1.5));const z=[-0.9,0,0.9][lane]*0.8;m.position.set(x,y,z);m.material.opacity=(t>=E.cabos-0.1)?flow:0});
 // casa acende
 const lit=seg(t,E.casa,E.casa+0.5);W.bulb.material.emissiveIntensity=2.0*lit*(0.85+0.15*Math.sin(t*20));W.bulbL.intensity=2.2*lit;
 // rótulos
 const Lb=(id,txt,x,y,bg,fg,a,s)=>c.label(id,txt,new T.Vector3(x,y,0.8),{bg,fg,a,s});
 Lb('hid','HIDRELÉTRICA',X.hid,3.6,'#2f7bff','#fff',(t>=E.hidro&&t<N[2])?seg(t,E.hidro,E.hidro+0.3):0,eob((t-E.hidro)/0.3));
 Lb('eol','EÓLICA',X.eol+1.6,4.6,'#2ecc71','#10151f',(t>=E.eolica&&t<E.solar-0.2)?seg(t,E.eolica,E.eolica+0.3):0,eob((t-E.eolica)/0.3));
 Lb('sol','SOLAR',X.sol+0.4,3.4,'#ffc400','#10151f',(t>=E.solar&&t<N[3])?seg(t,E.solar,E.solar+0.3):0,eob((t-E.solar)/0.3));
 Lb('ter','TÉRMICA',X.ter,4.9,'#ff6a3d','#fff',(t>=E.termica&&t<N[4])?seg(t,E.termica,E.termica+0.3):0,eob((t-E.termica)/0.3));
 Lb('ger','GERADOR',X.ter+1.3,2.2,'#fff','#10151f',(t>=E.gerador&&t<N[5])?seg(t,E.gerador,E.gerador+0.3):0,eob((t-E.gerador)/0.3));
 Lb('cab','CABOS DE ALTA TENSÃO',X.pil0+6,4.9,'#10151f','#ffd23f',(t>=E.cabos&&t<E.casa-0.2)?seg(t,E.cabos,E.cabos+0.3):0,eob((t-E.cabos)/0.3));
 Lb('cas','SUA CASA',X.casa,3.8,'#2ecc71','#10151f',(t>=E.casa&&t<N[7]-0.3)?seg(t,E.casa,E.casa+0.3):0,eob((t-E.casa)/0.3));
 Lb('now','NO MESMO INSTANTE',X.casa,3.4,'#ffc400','#10151f',(t>=E.instante&&t<N[7]-0.3)?seg(t,E.instante,E.instante+0.3):0,eob((t-E.instante)/0.3));
 if(t>=E.casa&&t<E.casa+0.5)c.doFlash(E.casa,0.25,0.3,'#ffe27a');
 c.vig=0.18;
}
return{init,render,keywords,brand}})();
