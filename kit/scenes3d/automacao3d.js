// Cena 3D "Automação #1: o que dá para automatizar" (sala conectada, low poly)
window.SCENE=(function(){
let W={};
const keywords=['iluminação','tomadas','sensores','cortinas','portão','ar-condicionado','alerta','segredo','comodo','cômodo'];
const brand='full';
const clamp01=x=>Math.min(1,Math.max(0,x)),ease3=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
function init(c){
 const {THREE,scene}=c,T=THREE;
 scene.background=new T.Color('#b9dff0');
 scene.add(new T.HemisphereLight('#ffffff','#b79b78',0.8));const dl=new T.DirectionalLight('#ffffff',0.9);dl.position.set(3,5,7);scene.add(dl);
 W.amb=new T.AmbientLight('#2a3350',0.0);scene.add(W.amb);
 const M=(col,o={})=>new T.MeshStandardMaterial(Object.assign({color:col,flatShading:true,roughness:.85,metalness:.03},o));
 const box=(w,h,d,col,x=0,y=0,z=0,p=scene,o={})=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 const cyl=(r,h,col,x=0,y=0,z=0,p=scene,s=12,o={})=>{const m=new T.Mesh(new T.CylinderGeometry(r,r,h,s),M(col,o));m.position.set(x,y,z);p.add(m);return m};
 // sala
 box(9,6,0.3,'#f1e5cf',0,0.5,-0.5);box(9,0.2,0.1,'#e3d1ab',0,-2.4,-0.3);
 box(9,0.3,8,'#b9824f',0,-2.6,3.5);for(let i=-4;i<=4;i++)box(0.03,0.02,8,'#a06f40',i*1.1,-2.44,3.5);
 // janela com cortinas
 box(2.2,2.6,0.08,'#e8f4fb',-1.3,0.8,-0.33);box(2.0,2.4,0.04,'#bfe3f2',-1.3,0.8,-0.27);box(0.06,2.4,0.06,'#f2f4f8',-1.3,0.8,-0.25);box(2.0,0.06,0.06,'#f2f4f8',-1.3,0.8,-0.25);
 W.cL=box(1.2,2.7,0.12,'#d9744a',-2.0,0.8,-0.1);W.cR=box(1.2,2.7,0.12,'#d9744a',-0.6,0.8,-0.1);
 box(2.6,0.08,0.1,'#8a8f9c',-1.3,2.2,-0.1);W.cmot=box(0.18,0.18,0.18,'#2f7bff',-2.5,2.2,-0.05,scene,{emissive:'#2f7bff',emissiveIntensity:0});
 // sofá, mesinha com abajur ligado na tomada, planta
 const sofa=new T.Group();sofa.position.set(-1.2,-2.4,1.0);scene.add(sofa);box(2.5,0.5,0.95,'#3f7aa8',0,0.35,0,sofa);box(2.5,0.9,0.28,'#356b95',0,0.75,-0.36,sofa);box(0.28,0.7,0.95,'#356b95',-1.2,0.55,0,sofa);box(0.28,0.7,0.95,'#356b95',1.2,0.55,0,sofa);box(1.0,0.2,0.8,'#4f8cb9',-0.5,0.7,0.05,sofa);box(1.0,0.2,0.8,'#4f8cb9',0.5,0.7,0.05,sofa);
 const tbl=box(0.9,0.7,0.7,'#8a5a2f',1.9,-2.0,0.7);W.lamp=new T.Group();W.lamp.position.set(1.9,-1.6,0.7);scene.add(W.lamp);cyl(0.05,0.5,'#8a8f9c',0,0.25,0,W.lamp);W.shade=new T.Mesh(new T.CylinderGeometry(0.2,0.32,0.34,12,1,true),M('#fff4d0',{side:T.DoubleSide,emissive:'#ffd23f',emissiveIntensity:0}));W.shade.position.y=0.62;W.lamp.add(W.shade);W.lampL=new T.PointLight('#ffd27a',0,4);W.lampL.position.set(0,0.6,0.1);W.lamp.add(W.lampL);
 // tomada inteligente na parede + cabo até o abajur
 box(0.3,0.3,0.05,'#f6f7fb',1.9,-1.9,-0.31);W.sp=box(0.26,0.26,0.08,'#ffffff',1.9,-1.9,-0.25,scene,{emissive:'#2ecc71',emissiveIntensity:0});box(0.05,0.8,0.03,'#222',1.9,-1.9,0.05);
 // luminária de teto
 cyl(0.015,1.2,'#444',0.6,2.6,0.4);W.bulb=new T.Mesh(new T.SphereGeometry(0.28,12,10),M('#fff6c8',{emissive:'#ffd23f',emissiveIntensity:0}));W.bulb.position.set(0.6,1.9,0.4);scene.add(W.bulb);W.bulbL=new T.PointLight('#ffe9a0',0,9);W.bulbL.position.set(0.6,1.7,0.9);scene.add(W.bulbL);
 // sensor de presença no canto e pessoa
 W.sens=new T.Group();W.sens.position.set(2.8,1.6,-0.28);scene.add(W.sens);box(0.4,0.3,0.1,'#f6f7fb',0,0,0,W.sens);const lens=new T.Mesh(new T.SphereGeometry(0.1,10,8),M('#ffffff',{emissive:'#ff3b3b',emissiveIntensity:0}));lens.position.z=0.08;W.sens.add(lens);W.lens=lens;
 W.cone=new T.Mesh(new T.ConeGeometry(1.4,2.6,24,1,true),new T.MeshBasicMaterial({color:'#7dffb0',transparent:true,opacity:0,side:T.DoubleSide}));W.cone.position.set(2.0,0.5,0.5);W.cone.rotation.z=Math.PI/2.8;scene.add(W.cone);
 W.person=new T.Group();scene.add(W.person);cyl(0.2,0.8,'#2f7bff',0,0.4,0,W.person,10);const hd=new T.Mesh(new T.SphereGeometry(0.2,10,8),M('#e8b58a'));hd.position.y=1.05;W.person.add(hd);box(0.12,0.5,0.12,'#243049',-0.1,-0.15,0,W.person);box(0.12,0.5,0.12,'#243049',0.1,-0.15,0,W.person);W.person.position.set(5.5,-1.7,1.5);
 // ar-condicionado na parede e portão (janela de garagem ao lado)
 W.ac=new T.Group();W.ac.position.set(0.9,2.1,-0.28);scene.add(W.ac);box(1.8,0.5,0.35,'#f6f7fb',0,0,0,W.ac);box(1.5,0.08,0.05,'#c9d1e3',0,-0.15,0.2,W.ac);W.acled=box(0.14,0.06,0.04,'#4db8ff',0.6,0.08,0.18,W.ac,{emissive:'#4db8ff',emissiveIntensity:0});
 W.cool=[...Array(6)].map(()=>{const m=new T.Mesh(new T.ConeGeometry(0.07,0.22,6),new T.MeshBasicMaterial({color:'#8fdcff',transparent:true,opacity:0}));m.rotation.x=Math.PI;scene.add(m);return m});
 W.gate=box(2.2,2.2,0.12,'#7e8798',3.9,-0.9,-0.3);for(let i=0;i<5;i++)box(2.2,0.04,0.14,'#5e6678',3.9,-1.8+i*0.45,-0.28);W.gate.scale.y=1;
 // "celular": ícones de status
 W.chip=[];
}
function camPose(c){
 const {N,E,tn:t}=c,tEnd=N[7];
 const K=[
  [0,         [0.8,0.1,13.0],[0.8,0.0,0]],
  [N[1]-0.01, [0.8,0.1,12.0],[0.8,0.0,0]],
  [N[1]+0.5,  [0.6,0.7,8.5],[0.6,0.7,0]],
  [N[2]-0.05, [0.6,0.7,8.5],[0.6,0.7,0]],
  [N[2]+0.6,  [1.7,-1.1,7.0],[1.7,-1.2,0]],
  [N[3]-0.05, [1.7,-1.1,7.0],[1.7,-1.2,0]],
  [N[3]+0.6,  [2.0,0.3,10.5],[1.6,-0.1,0]],
  [N[4]-0.05, [2.0,0.3,10.5],[1.6,-0.1,0]],
  [N[4]+0.6,  [0.8,0.6,12.5],[0.8,0.3,0]],
  [N[5]-0.05, [0.8,0.4,11.5],[0.8,0.2,0]],
  [N[6]-0.05, [0.8,0.2,11.0],[0.8,0.0,0]],
  [tEnd-0.05, [0.8,0.2,11.0],[0.8,0.0,0]],
  [tEnd,      [0.8,0.2,14.0],[0.8,0.0,0]],
  [1e9,       [0.8,0.2,14.0],[0.8,0.0,0]]];
 for(let q=1;q<K.length-1;q++)if(K[q][0]<K[q-1][0]+0.05)K[q][0]=K[q-1][0]+0.05;
 let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1],dt=b[0]-a[0];const f=dt<0.02?(t>=b[0]?1:0):ease3(clamp01((t-a[0])/dt));
 return {p:a[1].map((v,j)=>lerp(v,b[1][j],f)),l:a[2].map((v,j)=>lerp(v,b[2][j],f))};
}
function render(c){
 const {THREE,N,E,seg,eob,clamp,tn:t,camera}=c,T=THREE,tEnd=N[7];
 const cp=camPose(c);camera.position.set(...cp.p);camera.lookAt(...cp.l);
 // luz do teto: liga em "iluminação" (e pisca o 'celular')
 const li=seg(t,E.ilum,E.ilum+0.4);W.bulb.material.emissiveIntensity=2.2*li;W.bulbL.intensity=2.4*li;
 // tomada inteligente: abajur liga em "horário"
 const tp=seg(t,E.horario,E.horario+0.4);W.shade.material.emissiveIntensity=1.6*tp;W.lampL.intensity=1.8*tp;W.sp.material.emissiveIntensity=1.2*tp;
 // sensor: pessoa entra, cone verde, luz acende (reutiliza o teto) 
 const pw=seg(t,E.sensor,E.entra+0.2);W.person.position.set(lerp(5.5,1.6,pw),-1.7+0.06*Math.abs(Math.sin(t*9)),1.5);W.cone.material.opacity=0.28*seg(t,E.sensor,E.sensor+0.5)*(0.7+0.3*Math.sin(t*8));W.lens.material.emissiveIntensity=2.0*seg(t,E.sensor,E.sensor+0.4)*(0.5+0.5*Math.sin(t*10));
 // cortinas abrem; portão sobe; ar liga
 const cu=seg(t,E.cortinas,E.cortinas+1.2);W.cL.position.x=-2.0-0.7*cu;W.cR.position.x=-0.6+0.7*cu;W.cmot.material.emissiveIntensity=1.5*seg(t,E.cortinas-0.1,E.cortinas+0.3);
 const gu=seg(t,E.portao,E.portao+1.4);W.gate.position.y=-0.9+1.9*gu;W.gate.scale.y=1-0.55*gu;
 const ar=seg(t,E.ar,E.ar+0.5);W.acled.material.emissiveIntensity=2*ar;W.cool.forEach((m,i)=>{const k=((t*0.8+i*0.17)%1);m.position.set(0.3+i*0.22,1.8-k*1.4,0.1);m.material.opacity=0.8*ar*(1-k)});
 // alerta (faísca) e segredo (vinheta)
 c.vig=(t>=E.segredo-0.2&&t<tEnd-0.4)?0.5:0.2;
 if(t>=E.alerta&&t<E.alerta+0.35){c.doFlash(E.alerta,0.2,0.3,'#ffb400');c.shake=0.5}
 const Lb=(id,txt,pos,bg,fg,a,s)=>c.label(id,txt,pos,{bg,fg,a,s});
 Lb('il','ILUMINAÇÃO · CELULAR · VOZ',new T.Vector3(0.6,2.7,0.5),'#ffc400','#10151f',(t>=E.ilum&&t<N[2]-0.1)?seg(t,E.ilum,E.ilum+0.3):0,eob((t-E.ilum)/0.3));
 Lb('to','TOMADA COM HORÁRIO',new T.Vector3(1.9,-0.7,0.8),'#2ecc71','#10151f',(t>=E.tomadas&&t<N[3]-0.1)?seg(t,E.tomadas,E.tomadas+0.3):0,eob((t-E.tomadas)/0.3));
 Lb('se','SENSOR DE PRESENÇA',new T.Vector3(2.8,2.2,0.5),'#7dffb0','#10151f',(t>=E.sensor&&t<N[4]-0.1)?seg(t,E.sensor,E.sensor+0.3):0,eob((t-E.sensor)/0.3));
 Lb('co','CORTINAS',new T.Vector3(-1.3,2.7,0.5),'#d9744a','#fff',(t>=E.cortinas&&t<N[5]-0.1)?seg(t,E.cortinas,E.cortinas+0.3):0,eob((t-E.cortinas)/0.3));
 Lb('po','PORTÃO',new T.Vector3(3.9,0.5,0.5),'#8a93a6','#fff',(t>=E.portao&&t<N[5]-0.1)?seg(t,E.portao,E.portao+0.3):0,eob((t-E.portao)/0.3));
 Lb('ar','AR-CONDICIONADO',new T.Vector3(0.9,2.8,0.5),'#4db8ff','#10151f',(t>=E.ar&&t<N[5]-0.1)?seg(t,E.ar,E.ar+0.3):0,eob((t-E.ar)/0.3));
 Lb('al','INSTALAÇÃO BEM FEITA',new T.Vector3(0.8,0.0,0.6),'#e53935','#fff',(t>=E.alerta&&t<N[6]-0.1)?seg(t,E.alerta,E.alerta+0.3):0,eob((t-E.alerta)/0.3));
 Lb('um','COMECE POR UM CÔMODO',new T.Vector3(0.8,0.0,0.6),'#ffc400','#10151f',(t>=E.comodo&&t<N[7]-0.3)?seg(t,E.comodo,E.comodo+0.3):0,eob((t-E.comodo)/0.3));
}
return{init,render,keywords,brand}})();
