// Cena 3D "Refrigeração #1: calor e frio" (bancada, estilo qdc3d): unidade interna com evaporador à mostra,
// condensadora com aletas, ventilador e compressor à vista, tubulação de cobre isolada, manifold com manômetros,
// blocos quente/frio e setas de calor saindo de dentro para fora. Peças sem marca.
window.SCENE=(function(){
let W={};
const keywords=['frio','calor','quente','dentro','fora','fluido','refrigerante','esquenta','esfria','alerta','técnico','segredo','ausência','move','refrigeração'];
const title='REFRIGERAÇÃO';
const HOT='#ff7a1a',COLD='#5cc8ff';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
const BENCH=-3.025;
function tex(T,w,h,draw){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');draw(g,w,h);const t=new T.CanvasTexture(cv);t.anisotropy=4;return t}
function init(c){
 const {THREE,scene,renderer}=c,T=THREE;W.T=T;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 scene.background=new T.Color('#10151f');scene.fog=new T.Fog('#10151f',16,32);
 scene.add(new T.HemisphereLight('#dfe9ff','#2a2018',0.75));
 const key=new T.DirectionalLight('#fff4e0',1.3);key.position.set(2.5,5,6);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:1,far:20});key.shadow.bias=-0.0004;scene.add(key);
 const fill=new T.PointLight('#8fb4ff',0.6,16);fill.position.set(-4,1,5);scene.add(fill);
 W.hotL=new T.PointLight(HOT,0,6,2);W.hotL.position.set(0.5,-1.9,1.8);scene.add(W.hotL);
 W.coldL=new T.PointLight(COLD,0,6,2);W.coldL.position.set(-0.4,1.2,1.4);scene.add(W.coldL);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,roughness:.45,metalness:.05},o));
 const box=(w,h,d,col,x=0,y=0,z=0,p=scene,o={},cast=true)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),col.isMaterial?col:M(col,o));m.position.set(x,y,z);m.castShadow=cast;m.receiveShadow=true;p.add(m);return m};
 const cyl=(r,h,col,x=0,y=0,z=0,p=scene,s=20,o={})=>{const m=new T.Mesh(new T.CylinderGeometry(r,r,h,s),col.isMaterial?col:M(col,o));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;p.add(m);return m};
 function rbox(w,h,d,r,mat){const sh=new T.Shape();const x=-w/2,y=-h/2;sh.moveTo(x+r,y);sh.lineTo(x+w-r,y);sh.quadraticCurveTo(x+w,y,x+w,y+r);sh.lineTo(x+w,y+h-r);sh.quadraticCurveTo(x+w,y+h,x+w-r,y+h);sh.lineTo(x+r,y+h);sh.quadraticCurveTo(x,y+h,x,y+h-r);sh.lineTo(x,y+r);sh.quadraticCurveTo(x,y,x+r,y);const g=new T.ExtrudeGeometry(sh,{depth:d-0.03,bevelEnabled:true,bevelThickness:0.015,bevelSize:0.012,bevelSegments:2,curveSegments:8});g.translate(0,0,-d/2+0.015);const m=new T.Mesh(g,mat);m.castShadow=true;m.receiveShadow=true;return m}
 const COPPER=M('#c8743a',{metalness:.85,roughness:.3}),ALU=M('#c9d0da',{metalness:.7,roughness:.35});

 // ---------- bancada (parede perfurada + bancada de madeira + ferramentas), igual ao qdc3d ----------
 const wallTex=tex(T,512,512,(g,w,h)=>{g.fillStyle='#1d2636';g.fillRect(0,0,w,h);for(let y=16;y<h;y+=32)for(let x=16;x<w;x+=32){g.fillStyle='#0f1520';g.beginPath();g.arc(x,y,5,0,7);g.fill()}});wallTex.wrapS=wallTex.wrapT=T.RepeatWrapping;wallTex.repeat.set(5,5);
 const wall=new T.Mesh(new T.PlaneGeometry(16,12),new T.MeshStandardMaterial({map:wallTex,roughness:.9}));wall.position.set(0,1.5,-0.62);wall.receiveShadow=true;scene.add(wall);
 const woodTex=tex(T,512,512,(g,w,h)=>{g.fillStyle='#a8743f';g.fillRect(0,0,w,h);for(let i=0;i<64;i++){g.fillStyle=`rgba(${70+Math.random()*40},${40+Math.random()*25},20,${0.12+Math.random()*0.15})`;g.fillRect(0,Math.random()*h,w,1+Math.random()*3)}for(let i=0;i<6;i++){g.fillStyle='rgba(60,35,15,.5)';g.fillRect(i*85,0,2,h)}});
 const bench=new T.Mesh(new T.BoxGeometry(12,0.25,4.5),new T.MeshStandardMaterial({map:woodTex,roughness:.7}));bench.position.set(0,BENCH-0.125,1.55);bench.receiveShadow=true;scene.add(bench);
 box(12,1.4,0.3,'#2a2f3b',0,-3.95,3.7);
 // ferramentas: chave de fenda, alicate, rolo de tubo de cobre, chave de boca
 const tool=new T.Group();tool.position.set(-2.0,BENCH+0.045,2.9);tool.rotation.y=0.35;scene.add(tool);cyl(0.07,0.7,'#ff8a3d',0,0.07,0,tool).rotation.z=Math.PI/2;cyl(0.02,0.7,'#c9d4f0',0.55,0.07,0,tool,12,{metalness:.8}).rotation.z=Math.PI/2;
 const pl=new T.Group();pl.position.set(1.9,BENCH+0.05,2.8);pl.rotation.y=-0.5;scene.add(pl);box(0.14,0.06,0.9,'#c93a3a',0.08,0.04,0,pl);box(0.14,0.06,0.9,'#c93a3a',-0.08,0.04,0,pl);box(0.4,0.07,0.1,'#aab4c8',0,0.04,-0.55,pl,{metalness:.7});
 const roll=new T.Mesh(new T.TorusGeometry(0.42,0.05,10,40),COPPER);roll.rotation.x=Math.PI/2;roll.position.set(-2.35,BENCH+0.05,0.3);roll.castShadow=true;scene.add(roll);const roll2=roll.clone();roll2.position.y+=0.1;roll2.scale.setScalar(0.94);scene.add(roll2);const roll3=roll.clone();roll3.position.y+=0.2;roll3.scale.setScalar(0.88);scene.add(roll3);

 // ---------- unidade interna (evaporadora) na parede ----------
 const IN=W.IN=new T.Group();IN.position.set(-0.35,1.35,-0.27);scene.add(IN);
 W.inMat=M('#f3f5f8',{roughness:.3,emissive:'#000000'});
 const ib=rbox(2.7,0.86,0.36,0.1,W.inMat);ib.position.z=-0.15;IN.add(ib);box(2.7,0.12,0.66,W.inMat,0,0.37,0,IN);box(2.7,0.1,0.66,W.inMat,0,-0.38,0,IN);box(0.1,0.86,0.66,W.inMat,-1.3,0,0,IN);box(0.1,0.86,0.66,W.inMat,1.3,0,0,IN);
 box(2.5,0.05,0.04,'#c9d0dc',0,-0.33,0.34,IN,{},false);
 box(2.6,0.24,0.03,'#20252f',0,-0.3,0.18,IN);                 // saída de ar (fundo escuro)
 W.louver=box(2.4,0.03,0.18,'#e9ecf1',0,-0.35,0.3,IN);W.louver.rotation.x=0.5;
 box(0.22,0.05,0.02,'#5cc8ff',0.95,-0.12,0.345,IN,{emissive:'#5cc8ff',emissiveIntensity:.8});
 // evaporador (serpentina com aletas) aparece com o painel aberto
 const EV=new T.Group();EV.position.set(0,0.06,0.12);IN.add(EV);
 box(2.42,0.5,0.05,'#2a3140',0,0,-0.06,EV);
 for(let i=0;i<64;i++)box(0.008,0.5,0.12,ALU,-1.18+i*0.0375,0,0,EV,{},false);
 for(let r=0;r<3;r++){const tb=cyl(0.016,2.44,COPPER,0,-0.16+r*0.16,0.0,EV,10);tb.rotation.z=Math.PI/2;const u=new T.Mesh(new T.TorusGeometry(0.08,0.016,8,14,Math.PI),COPPER);u.position.set(-1.22,-0.08+r*0.16-(r==2?0.16:0),0);u.rotation.z=Math.PI/2;if(r<2)EV.add(u)}
 // painel frontal articulado no alto
 W.panel=new T.Group();W.panel.position.set(0,0.43,0.34);IN.add(W.panel);
 const pm=rbox(2.62,0.6,0.04,0.05,M('#f7f8fb',{roughness:.25}));pm.position.set(0,-0.3,0);W.panel.add(pm);
 // ---------- unidade externa (condensadora) na bancada ----------
 const OUT=W.OUT=new T.Group();OUT.position.set(0.7,BENCH+0.08+0.8,0.32);scene.add(OUT);
 W.outMat=M('#dfe3e8',{roughness:.4,metalness:.15,emissive:'#000000'});
 const OW=2.4,OH=1.6,OD=0.86;
 box(OW,0.05,OD,W.outMat,0,OH/2-0.025,0,OUT);box(OW,0.05,OD,W.outMat,0,-OH/2+0.025,0,OUT);box(0.05,OH,OD,W.outMat,-OW/2+0.025,0,0,OUT);box(0.05,OH,OD,W.outMat,OW/2-0.025,0,0,OUT);
 box(OW,OH,0.04,'#2a3038',0,0,-OD/2+0.02,OUT);
 box(0.05,OH,OD,W.outMat,0.33,0,0,OUT);                       // divisória ventilador | compressor
 // frente do ventilador: chapa com furo redondo
 const sh=new T.Shape();sh.moveTo(-0.77,-0.8);sh.lineTo(0.77,-0.8);sh.lineTo(0.77,0.8);sh.lineTo(-0.77,0.8);sh.lineTo(-0.77,-0.8);const hole=new T.Path();hole.absarc(0,0,0.64,0,Math.PI*2,true);sh.holes.push(hole);
 const fp=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:0.04,bevelEnabled:false,curveSegments:40}),W.outMat);fp.position.set(-0.43,0,OD/2-0.04);fp.castShadow=true;fp.receiveShadow=true;OUT.add(fp);
 // condensador: aletas ao fundo (vistas pelo furo) e na lateral esquerda
 const finTex=tex(T,512,256,(g,w,h)=>{g.fillStyle='#7d8693';g.fillRect(0,0,w,h);for(let x=0;x<w;x+=4){g.fillStyle=x%8?'#aeb6c2':'#5d6672';g.fillRect(x,0,2,h)}for(let y=18;y<h;y+=36){g.fillStyle='#b8693a';g.fillRect(0,y,w,7)}});
 const fins=new T.Mesh(new T.PlaneGeometry(1.5,1.45),new T.MeshStandardMaterial({map:finTex,roughness:.5,metalness:.5}));fins.position.set(-0.43,0,-OD/2+0.05);OUT.add(fins);
 const sideFin=new T.Mesh(new T.PlaneGeometry(0.7,1.4),new T.MeshStandardMaterial({map:finTex,roughness:.5,metalness:.5}));sideFin.rotation.y=-Math.PI/2;sideFin.position.set(-OW/2-0.003,0,0);OUT.add(sideFin);
 // ventilador
 W.fan=new T.Group();W.fan.position.set(-0.43,0,0.05);OUT.add(W.fan);
 cyl(0.1,0.12,'#2b3038',0,0,0,W.fan,20).rotation.x=Math.PI/2;
 for(let i=0;i<3;i++){const a=new T.Group();a.rotation.z=i*Math.PI*2/3;W.fan.add(a);const b=new T.Mesh(new T.SphereGeometry(0.3,16,10),M('#3a4049',{roughness:.5}));b.scale.set(0.55,1,0.08);b.position.set(0,0.32,0);b.rotation.y=0.35;b.castShadow=true;a.add(b)}
 // grade
 const gm=M('#2b3038',{metalness:.5,roughness:.4});[0.16,0.32,0.48,0.62].forEach(r=>{const tr=new T.Mesh(new T.TorusGeometry(r,0.008,6,48),gm);tr.position.set(-0.43,0,OD/2+0.01);OUT.add(tr)});
 for(let i=0;i<4;i++){const bar=box(1.26,0.012,0.012,gm,-0.43,0,OD/2+0.012,OUT,{},false);bar.rotation.z=i*Math.PI/4}
 // compartimento do compressor (tampa removida)
 box(0.86,OH-0.1,0.02,'#1c2028',0.78,0,-OD/2+0.05,OUT);
 const CP=W.comp=new T.Group();CP.position.set(0.72,-0.38,0.0);OUT.add(CP);
 const cm=M('#16191f',{roughness:.35,metalness:.45});
 cyl(0.24,0.62,cm,0,0,0,CP,28);const dome=new T.Mesh(new T.SphereGeometry(0.24,28,14,0,Math.PI*2,0,Math.PI/2),cm);dome.position.y=0.31;dome.castShadow=true;CP.add(dome);
 const bot=dome.clone();bot.rotation.x=Math.PI;bot.position.y=-0.31;CP.add(bot);
 box(0.6,0.04,0.5,'#2a2f3b',0,-0.52,0,CP);[[-0.22,-0.18],[0.22,-0.18],[-0.22,0.18],[0.22,0.18]].forEach(([x,z])=>cyl(0.05,0.08,'#111',x,-0.46,z,CP,10));
 box(0.16,0.14,0.08,'#2a2f3b',0,0.05,0.25,CP);                // tampa dos terminais
 cyl(0.08,0.42,cm,0.33,0.05,-0.05,CP,18);                      // acumulador
 const cpT=(pts,r=0.025)=>{const cv=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));const m=new T.Mesh(new T.TubeGeometry(cv,30,r,8,false),COPPER);m.castShadow=true;CP.add(m)};
 cpT([[0,0.5,0],[0,0.72,0],[-0.15,0.85,-0.15],[-0.35,0.9,-0.3]]);cpT([[0.33,0.27,-0.05],[0.33,0.55,-0.05],[0.2,0.7,-0.2],[0.1,0.95,-0.3]]);cpT([[0.1,0.1,-0.2],[0.25,0.1,-0.3],[0.33,-0.15,-0.05]],0.02);
 // válvulas de serviço na lateral direita
 W.valves=[[-0.42],[-0.6]].map(([y],i)=>{const v=new T.Group();v.position.set(OW/2+0.05,y,0.3);OUT.add(v);box(0.12,0.12,0.12,'#c9a25a',0,0,0,v,{metalness:.8,roughness:.3});cyl(0.035,0.12,'#c9a25a',0.09,0,0,v,12,{metalness:.8}).rotation.z=Math.PI/2;return v});
 // pés
 [[-0.9],[0.9]].forEach(([x])=>box(0.3,0.08,0.95,'#2a2f3b',x,-OH/2-0.04,0,OUT));

 // ---------- tubulação de cobre isolada (interna -> parede -> externa) ----------
 const pathA=[[0.95,1.22,-0.4],[1.45,1.18,-0.45],[1.7,0.8,-0.45],[1.72,0.0,-0.45],[1.72,-0.9,-0.4],[2.0,-1.4,0.1],[2.15,-1.9,0.55],[2.05,-2.28,0.63],[1.95,-2.32,0.62]];
 const pathB=pathA.map(([x,y,z],i)=>[x+(i>1&&i<7?0.16:0.0),y+(i<2?-0.13:(i>=7?-0.2:0)),z+(i<2?0.05:0)]);
 function pipe(pts,r){const cv=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));const m=new T.Mesh(new T.TubeGeometry(cv,120,r,10,false),COPPER);m.castShadow=true;scene.add(m);
  const sub=[];for(let k=0;k<=60;k++)sub.push(cv.getPointAt(0.07+0.83*k/60));const ic=new T.CatmullRomCurve3(sub);const im=new T.Mesh(new T.TubeGeometry(ic,120,r+0.05,12,false),M('#15171c',{roughness:.85,transparent:true,opacity:1}));im.castShadow=true;scene.add(im);return {cv,ins:im}}
 W.pA=pipe(pathA,0.045);W.pB=pipe(pathB,0.03);
 // fluido: bolinhas dentro dos tubos (A leva calor p/ fora, B volta para dentro)
 W.flA=[...Array(16)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.065,10,8),new T.MeshBasicMaterial({color:HOT,transparent:true,opacity:0}));scene.add(m);return m});
 W.flB=[...Array(16)].map(()=>{const m=new T.Mesh(new T.SphereGeometry(0.055,10,8),new T.MeshBasicMaterial({color:COLD,transparent:true,opacity:0}));scene.add(m);return m});

 // ---------- manifold com manômetros (sem marca) ----------
 const MF=W.mf=new T.Group();MF.position.set(-1.35,-0.75,-0.42);MF.scale.setScalar(0.85);scene.add(MF);box(0.06,0.06,0.3,'#9aa3b4',0,0.12,-0.12,MF,{metalness:.7});
 const body=box(1.1,0.2,0.2,'#c3cad6',0,0,0,MF,{metalness:.75,roughness:.3});
 cyl(0.09,0.14,'#2f7bff',-0.62,0,0,MF,20).rotation.z=Math.PI/2;cyl(0.09,0.14,'#e03c3c',0.62,0,0,MF,20).rotation.z=Math.PI/2;
 [-0.3,0,0.3].forEach(x=>cyl(0.04,0.14,'#c9a25a',x,-0.15,0,MF,10,{metalness:.8}));
 function dial(col,txt){return tex(T,256,256,(g,w,h)=>{g.fillStyle='#f4f6fa';g.beginPath();g.arc(128,128,124,0,7);g.fill();g.strokeStyle=col;g.lineWidth=14;g.beginPath();g.arc(128,128,100,Math.PI*0.75,Math.PI*2.25);g.stroke();g.strokeStyle='#10151f';for(let i=0;i<=20;i++){const a=Math.PI*0.75+i*Math.PI*1.5/20;g.lineWidth=i%5?2:4;const r0=i%5?84:76;g.beginPath();g.moveTo(128+Math.cos(a)*r0,128+Math.sin(a)*r0);g.lineTo(128+Math.cos(a)*92,128+Math.sin(a)*92);g.stroke()}g.fillStyle=col;g.font='900 30px Arial';g.textAlign='center';g.fillText(txt,128,196)})}
 W.needles=[];[[-0.32,'#2f7bff','BAIXA'],[0.32,'#e03c3c','ALTA']].forEach(([x,col,txt])=>{const gg=new T.Group();gg.position.set(x,0.36,0.02);MF.add(gg);cyl(0.06,0.18,'#c3cad6',0,-0.2,0,gg,12,{metalness:.7});const rim=cyl(0.29,0.1,col,0,0,0,gg,40,{metalness:.3,roughness:.4});rim.rotation.x=Math.PI/2;const face=new T.Mesh(new T.CircleGeometry(0.25,40),new T.MeshBasicMaterial({map:dial(col,txt)}));face.position.z=0.051;gg.add(face);const gl=new T.Mesh(new T.CircleGeometry(0.26,40),new T.MeshStandardMaterial({color:'#ffffff',transparent:true,opacity:.12,roughness:.05,metalness:.2}));gl.position.z=0.07;gg.add(gl);const nd=new T.Group();nd.position.z=0.06;gg.add(nd);box(0.012,0.2,0.006,'#d01818',0,0.09,0,nd,{},false);cyl(0.02,0.01,'#10151f',0,0,0.005,gg,10).rotation.x=Math.PI/2;nd.rotation.z=2.3;W.needles.push(nd)});
 // mangueiras: azul até a válvula de serviço; vermelha e amarela soltas na bancada
 const hose=(pts,col)=>{const cv=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));const m=new T.Mesh(new T.TubeGeometry(cv,60,0.03,8,false),M(col,{roughness:.6}));m.castShadow=true;scene.add(m)};
 hose([[-1.6,-0.95,-0.38],[-1.7,-2.0,-0.3],[-1.3,BENCH+0.04,0.5],[0.0,BENCH+0.04,1.35],[1.9,BENCH+0.04,1.25],[2.3,BENCH+0.25,0.9],[2.2,-2.25,0.62]],'#2f7bff');
 hose([[-1.35,-0.95,-0.38],[-1.4,-1.9,-0.42],[-1.12,-2.1,-0.42],[-0.88,-1.6,-0.45],[-0.95,-1.0,-0.48]],'#e03c3c');
 hose([[-1.1,-0.95,-0.38],[-1.0,-1.5,-0.4],[-0.8,-1.62,-0.42],[-0.68,-1.3,-0.46],[-0.75,-0.95,-0.5]],'#ffc400');
 // ---------- blocos quente x frio (demonstração da transferência de calor) ----------
 W.hotM=M('#b5622c',{metalness:.6,roughness:.35,emissive:HOT,emissiveIntensity:0});W.coldM=M('#9fb8cc',{metalness:.5,roughness:.3,emissive:COLD,emissiveIntensity:0});
 W.hotB=box(0.5,0.42,0.5,W.hotM,-1.55,BENCH+0.21,1.6);W.coldB=box(0.5,0.42,0.5,W.coldM,-0.8,BENCH+0.21,1.6);
 W.demoArrows=[0,1,2].map(i=>{const a=arrow(T,HOT,0.55);a.rotation.z=-Math.PI/2;a.position.set(-1.18,BENCH+0.12+i*0.13,1.9);scene.add(a);return a});

 // ---------- setas de calor / ar frio ----------
 const C=(pts)=>new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));
 W.flows={
  in:[-1.3,-0.5,0.3].map(x=>flow(T,scene,C([[x,-0.7,2.2],[x,0.2,1.5],[x+0.05,0.95,0.7]]),4,HOT,0.85)),
  pipe:[flow(T,scene,C(pathA.map(([x,y,z])=>[x+0.12,y+0.04,z+0.45])),9,HOT,0.9)],
  out:[-0.25,0.2].map((y,i)=>flow(T,scene,C([[0.27-0.25+i*0.5,-2.15+y,0.95],[0.3-0.4+i*0.8,-1.85+y,1.9],[0.35-0.5+i,-1.2+y,2.9]]),4,HOT,1.0)),
  cold:[-0.9,-0.1,0.7].map(x=>flow(T,scene,C([[x,0.92,0.4],[x,0.4,1.3],[x-0.05,-0.3,2.1]]),4,COLD,0.8))};
}
function arrow(T,col,s=1){const g=new T.Group();const mat=new T.MeshBasicMaterial({color:col,transparent:true,opacity:0,depthWrite:false});const sh=new T.Mesh(new T.CylinderGeometry(0.035,0.035,0.26,10),mat);sh.position.y=-0.05;g.add(sh);const hd=new T.Mesh(new T.ConeGeometry(0.09,0.18,14),mat);hd.position.y=0.15;g.add(hd);g.userData.mat=mat;g.scale.setScalar(s);return g}
function flow(T,scene,curve,n,col,s){const arrows=[...Array(n)].map(()=>{const a=arrow(T,col,s);scene.add(a);return a});return {curve,arrows}}
const UP=new (window.THREE.Vector3)(0,1,0);
function runFlow(f,t,k,speed=0.35){const T=W.T;f.arrows.forEach((a,i)=>{const u=((t*speed+i/f.arrows.length)%1+1)%1;const p=f.curve.getPointAt(u),tg=f.curve.getTangentAt(u);a.position.copy(p);a.quaternion.setFromUnitVectors(UP,tg.normalize());const o=k*Math.sin(Math.PI*u);a.userData.mat.opacity=o*0.95;a.visible=o>0.01})}
function runFluid(list,cv,t,k,dir,speed=0.12){list.forEach((m,i)=>{let u=((t*speed+i/list.length)%1+1)%1;if(dir<0)u=1-u;m.position.copy(cv.getPointAt(u));m.material.opacity=k;m.visible=k>0.01})}
const K=(c)=>{const {N,E}=c,tEnd=N[c.TL.END];const WIDE=[[0.15,-0.05,10.6],[0.15,-0.25,0]];return [
 [0,             [0.15,0.3,13.2],[0.1,-0.1,0]],
 [E.frio0+0.2,   [-0.2,0.6,7.4],[-0.3,0.7,0]],
 [E.qual-0.2,    [-0.1,0.4,8.2],[-0.2,0.4,0]],
 [N[1]+0.15,     ...WIDE],
 [E.quente-0.1,  [-1.15,-1.5,6.9],[-1.2,-2.7,1.6]],
 [N[2]-0.1,      [-1.15,-1.55,6.6],[-1.2,-2.7,1.6]],
 [E.dentro,      ...WIDE],
 [N[3]-0.1,      [0.2,-0.05,10.3],[0.15,-0.3,0]],
 [E.fluido-0.2,  [1.0,0.0,6.6],[1.35,-0.3,-0.2]],
 [N[4]-0.1,      [0.95,-0.15,6.7],[1.35,-0.5,-0.2]],
 [E.esquenta-0.1,...WIDE],
 [N[5]-0.1,      [0.15,0.0,10.2],[0.15,-0.25,0]],
 [E.manuseio,    [-1.1,-0.6,3.9],[-1.3,-0.85,-0.4]],
 [N[6]-0.1,      [-1.1,-0.65,3.6],[-1.3,-0.85,-0.4]],
 [N[6]+0.8,      ...WIDE],
 [tEnd-0.05,     [0.15,0.05,11.6],[0.15,-0.25,0]],
 [tEnd,          [0.15,0.3,13.0],[0,0,0]],
 [1e9,           [0.15,0.3,13.0],[0,0,0]]].sort((a,b)=>a[0]-b[0])};
function camPose(c){const k=K(c),t=c.tn;let i=0;while(i<k.length-2&&t>=k[i+1][0])i++;const a=k[i],b=k[i+1],dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));return {p:a[1].map((v,j)=>lerp(v,b[1][j],f)),l:a[2].map((v,j)=>lerp(v,b[2][j],f))}}
function render(c){
 const {THREE,N,E,seg,eob,tn:t,camera}=c,T=THREE,tEnd=N[c.TL.END];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // painel da evaporadora abre no gancho (mostra o evaporador)
 W.panel.rotation.x=-1.25*seg(t,E.outra-0.2,E.outra+0.6);
 // ventilador gira sempre, compressor vibra quando o fluido corre
 W.fan.rotation.z=-t*9;
 const run=seg(t,E.carrega-0.3,E.carrega+0.3);W.comp.position.x=0.72+run*0.006*Math.sin(t*70);
 // demonstração quente -> frio
 const demo=(t>=N[1]&&t<N[2]+0.3)?1:0,dk=seg(t,E.calor1,E.calor1+0.3)*(1-seg(t,N[2]-0.2,N[2]+0.3));
 const mix=seg(t,E.frio1+0.2,N[2]);
 W.hotM.emissiveIntensity=dk*lerp(0.9,0.45,mix)+0.0;W.coldM.emissiveIntensity=dk*lerp(0.6,0.3,mix);
 W.hotM.color.set(dk>0.01?'#c86a2c':'#b5622c');
 W.demoArrows.forEach((a,i)=>{const p=((t*0.9+i/3)%1);a.position.x=-1.35+0.3*p;a.userData.mat.opacity=dk*Math.sin(Math.PI*p);a.visible=demo>0});
 // fluxos de calor (dentro -> fora)
 const inK=seg(t,E.dentro,E.dentro+0.4)*(1-0.55*seg(t,N[5]-0.2,N[5]+0.3))*(1-0.0)+0;
 const segK=seg(t,N[6],N[6]+0.4);
 const fin=inK*(1-seg(t,E.carrega-0.4,E.carrega))+0.0, finB=Math.max(fin,segK);
 const endK=1-seg(t,tEnd-0.3,tEnd);
 W.flows.in.forEach(f=>runFlow(f,t,finB*endK,0.45));
 const pipeK=Math.max(seg(t,E.fora-0.2,E.fora+0.3)*(1-seg(t,E.carrega-0.4,E.carrega)),seg(t,N[4],N[4]+0.4)*(1-seg(t,N[5]-0.2,N[5]+0.3)),segK*seg(t,E.move-0.3,E.move+0.2));
 W.flows.pipe.forEach(f=>runFlow(f,t,pipeK*endK,0.3));
 const outK=Math.max(seg(t,E.fora+0.3,E.fora+0.8)*(1-seg(t,N[3]-0.2,N[3]+0.2)),seg(t,E.esquenta-0.2,E.esquenta+0.3)*(1-seg(t,N[5]-0.2,N[5]+0.3)),segK);
 W.flows.out.forEach(f=>runFlow(f,t,outK*endK,0.5));
 const coldK=Math.max(seg(t,E.esfria-0.2,E.esfria+0.3)*(1-seg(t,N[5]-0.2,N[5]+0.3)),segK);
 W.flows.cold.forEach(f=>runFlow(f,t,coldK*endK,0.45));
 // fluido refrigerante nos tubos (isolamento fica transparente)
 const flK=seg(t,E.carrega,E.carrega+0.4)*(1-seg(t,N[4]+0.6,N[4]+1.2));
 W.pA.ins.material.opacity=1-0.88*flK;W.pB.ins.material.opacity=1-0.88*flK;
 runFluid(W.flA,W.pA.cv,t,flK,1,0.14);runFluid(W.flB,W.pB.cv,t,flK,-1,0.14);
 // brilho: externa esquenta, interna esfria
 const hot=seg(t,E.esquenta,E.esquenta+0.8)*(1-0.5*seg(t,N[5],N[5]+0.5))*endK,cold=seg(t,E.esfria,E.esfria+0.8)*(1-0.5*seg(t,N[5],N[5]+0.5))*endK;
 W.outMat.emissive.set(HOT);W.outMat.emissiveIntensity=hot*0.32;W.inMat.emissive.set(COLD);W.inMat.emissiveIntensity=cold*0.3;
 W.hotL.intensity=hot*2.2;W.coldL.intensity=cold*1.8;
 // manômetros: ponteiros sobem no alerta
 const nd=seg(t,E.manuseio,E.manuseio+1.0);W.needles[0].rotation.z=2.3-1.9*nd+0.03*Math.sin(t*13)*nd;W.needles[1].rotation.z=2.3-3.2*nd+0.03*Math.sin(t*11)*nd;
 // rótulos
 const L=(id,txt,pos,bg,fg,t0,t1,dx=0,dy=0)=>c.label(id,txt,pos,{bg,fg,a:(t>=t0&&t<t1)?seg(t,t0,t0+0.25):0,s:eob((t-t0)/0.3),dx,dy});
 const V=(x,y,z)=>new T.Vector3(x,y,z);
 L('nao','NÃO CRIA FRIO',V(-0.35,2.05,0),'#e03c3c','#fff',E.frio0,E.qual-0.05);
 L('qual','QUAL?',V(-0.35,2.05,0),'#ffc400','#10151f',E.qual,N[1]-0.05);
 L('cal','CALOR',V(-1.18,BENCH+0.95,1.9),'#fff','#10151f',E.calor1,E.quente-0.05);
 L('que','QUENTE',V(-1.55,BENCH+0.75,1.6),HOT,'#fff',E.quente,N[2]-0.1);
 L('fri','FRIO',V(-0.8,BENCH+0.75,1.6),'#2f8fe0','#fff',E.frio1,N[2]-0.1);
 L('den','DENTRO',V(-0.35,2.05,0),'#2f8fe0','#fff',E.dentro,N[3]-0.1);
 L('for','FORA',V(0.7,-1.05,0.4),HOT,'#fff',E.fora,N[3]-0.1);
 L('flu','FLUIDO REFRIGERANTE',V(0.6,0.75,0),'#fff','#10151f',E.fluido,N[4]-0.1);
 L('esq','ESQUENTA',V(0.7,-1.05,0.4),HOT,'#fff',E.esquenta,N[5]-0.1);
 L('esf','ESFRIA',V(-0.35,2.05,0),'#2f8fe0','#fff',E.esfria,N[5]-0.1);
 L('ale','ALERTA',V(-1.35,0.2,-0.3),'#e03c3c','#fff',E.alerta,N[6]-0.1);
 L('tec','SÓ TÉCNICO',V(-1.35,-1.45,-0.2),'#ffc400','#10151f',E.tecnico,N[6]-0.1);
 L('aus','FRIO = SEM CALOR',V(-0.35,2.05,0),'#fff','#10151f',E.ausencia,tEnd-0.1);
 L('mov','MOVE O CALOR',V(0.7,-1.05,0.4),HOT,'#fff',E.move,tEnd-0.1);
 // efeitos
 if(t>=E.alerta&&t<E.alerta+0.4)c.doFlash(E.alerta,0.22,0.35,'#e03c3c');
 if(t>=E.frio0&&t<E.frio0+0.3)c.doFlash(E.frio0,0.12,0.25,'#fff');
 if(t>=E.esquenta&&t<E.esquenta+0.4)c.doFlash(E.esquenta,0.12,0.3,HOT);
 c.vig=0.28;
}
return{init,render,keywords,title}})();
