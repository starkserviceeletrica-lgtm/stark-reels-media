// uso: node render3d.js <pasta build> [quadros,separados,por,virgula]   (9:16, WebGL por software; NOLOGO=1 para tirar a logo)
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs'),path=require('path');
const build=path.resolve(process.argv[2]),FPS=+process.env.FPS||30,Wk=+process.env.WORKERS||4,kit=__dirname;
const total=JSON.parse(fs.readFileSync(build+'/total.json')).total,N=Math.round(total*FPS);
const frames=process.argv[3]?process.argv[3].split(',').map(Number):null;const dir=build+'/frames_3d';fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const scene=JSON.parse(fs.readFileSync(build+'/timeline.js','utf8').replace('window.TL=','').replace(/;$/,'')).SCENE;
 let html=fs.readFileSync(kit+'/engine3d.html','utf8').replace('<script src="timeline.js"></script>',`<script src="file://${build}/timeline.js"></script><script src="file://${kit}/scenes3d/${scene}.js"></script>`);
 html=html.split('vendor/three.min.js').join(`file://${kit}/vendor/three.min.js`).split('assets/logo.png').join(`file://${kit}/assets/logo.png`).split('assets/logo_s.png').join(`file://${kit}/assets/logo_s.png`);
 fs.writeFileSync(build+'/page3d.html',html);
 const url='file://'+build+'/page3d.html?v'+(process.env.NOLOGO?'':'&logo');
 const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const vp={width:1080,height:1920};
 async function worker(k,list){const p=await b.newPage({viewport:vp});p.on('pageerror',e=>console.log('ERRO',e.message));await p.goto(url);
  for(const i of list){await p.evaluate(t=>render(t),i/FPS);await p.screenshot({path:(frames&&!process.env.JPG)?`${dir}/p${i}.png`:`${dir}/f${String(i).padStart(4,'0')}.jpg`,...((frames&&!process.env.JPG)?{type:'png'}:{type:'jpeg',quality:92})})}}
 const all=frames||[...Array(N).keys()];const lists=[...Array(Wk)].map((_,k)=>all.filter((_,j)=>j%Wk===k));
 await Promise.all(lists.map((l,k)=>worker(k,l)));await b.close()})();
