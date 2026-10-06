async function refresh(){const g=++gen,old={};for(const k in ALL)old[k]=[ALL[k].position.clone(),ALL[k].rotation.clone()];
const gi=async(s,def)=>{const u=s.url||(s.txt?res(s.txt):def);try{return await img(u)}catch(e){st('Failed to load '+u);return bad()}};
const A=['helmet','chest','legs','boots'];
const IM=await Promise.all(AC.map(async ac=>{const o={skin:await gi(ac.skin,SKIN)};
for(const k of A)if(onFor(ac,k))o[k]=await gi(ac.a[k],MJ+`textures/models/armor/${ac.a[k].mat}_${k=='legs'?2:1}.png`);
if(onFor(ac,'elytra'))o.elytra=await gi(ac.a.elytra,MJ+'textures/models/armor/elytra.png');
for(const k of['L','R'])if(onFor(ac,'item'+k))o[k]=await gi(ac.i[k],MJ+(ac.i[k].blk?'textures/blocks/stone.png':'textures/items/diamond_sword.png'));
return o}));
if(g!==gen)return;
W.traverse(o=>{o.geometry&&o.geometry.dispose()});W.clear();BM=[];ALL={};ITM={};
AC.forEach((ac,ax)=>{const im=IM[ax],sk=im.skin.height*2==im.skin.width?legacy(im.skin):im.skin,pre=ac.id?'a'+ac.id+':':'';let AG=W;if(ac.id){AG=new THREE.Group();AG.position.set(ac.off,0,0);AG.userData.p=[0,0,0];W.add(AG)}
const pl=PG.map(d=>{d=JSON.parse(JSON.stringify(d));if(ac.slim&&/Arm$|Sleeve$/.test(d.name)&&d.cubes){const c=d.cubes[0];c.size[0]=3;if(d.name[0]=='r')c.origin[0]=-7}if(ac.slim&&/Forearm$/.test(d.name))d.pivot[0]=d.name[0]=='r'?-5.5:5.5;return d});
const B=bld(pl,AG,sk,pre,{ov:OV,ag:AG,act:pre,l3:ac.l3d});
const AO={helmet:0,chest:0,legs:0,boots:.02};
A.forEach(k=>{if(im[k]){const pc=DEFA[k];pc.b.forEach(x=>{if(!x.cubes||!x.cubes.length)return;const bn=B[x.name];if(!bn)return;const cs=x.cubes.filter(c=>Array.isArray(c.uv)).map(c=>({origin:c.origin,size:c.size,uv:c.uv,inflate:(c.inflate??x.inflate??0)+AO[k],mirror:c.mirror??x.mirror}));if(cs.length)addMesh(bn,cs,im[k],{ds:1,arm:1,vox:P.a3d,thk:P.athk,tw:pc.w,th:pc.h,ag:AG})})}});
if(im.elytra)bld(DEFE.b,B.chest,im.elytra,pre+'E:',{tw:DEFE.w,th:DEFE.h,ds:1,arm:1,vx:P.e3d,thk:P.ethk});
['L','R'].forEach(k=>{if(im[k]){const c=ac.i[k],h=itemObj(im[k],c.vox,c.th,c.blk,k);h.userData.cfg=c;ITM[pre+k]=h;B[k=='L'?'leftItem':'rightItem'].add(h)}})});
scene.updateMatrixWorld(true);for(const k in ALL){const o=ALL[k];o.userData.rw=o.matrixWorld.clone();o.userData.rwi=o.userData.rw.clone().invert()}
AC.forEach(a=>{if(a.id&&a.copy&&!a.done){const pr='a'+a.id+':';for(const k in ALL)if(k.startsWith(pr)){const mk=k.slice(pr.length);if(old[mk])old[k]=old[mk]}a.done=1}});
for(const k in ALL)if(old[k]){ALL[k].position.copy(old[k][0]);ALL[k].rotation.copy(old[k][1])}
const bs=$('#bs');bs.innerHTML='';Object.keys(ALL).forEach(k=>bs.add(new Option(k,k)));
if(!ALL[selK])selK='root';selKey(selK);upd()}
function selKey(k){inv();selK=k;$('#bs').value=k;attachGizmo()}
function upd(){inv();if(upd.pq!==P.pq){upd.pq=P.pq;rsz()}cam.fov=P.fov;cam.updateProjectionMatrix();R.toneMappingExposure=P.expo;const s=P.shade;
amb.intensity=s?P.amb*.65:1;key.intensity=s?P.key+P.amb*.35:0;fill.intensity=s?P.fill:0;key.castShadow=!!s;key.color.set(P.kc);fill.color.set(P.skc);
if((P.bloom)&&!comp)ensureComp();if(bpass){bpass.strength=P.bs;bpass.radius=P.br;bpass.threshold=P.bt;bpass.enabled=!!P.bloom;cpass.uniforms.mx.value=P.bmx;bpass.materialHighPassFilter.uniforms.smoothWidth.value=Math.max(.01,P.bsw);bpass.bloomFactors=[0,1,2,3,4].map(i=>Math.pow(P.bfo,i))}
ground.visible=!!(s&&P.gs);ground.material.opacity=P.gop;
const a=rad(P.az),e=rad(P.el);key.position.set(Math.sin(a)*Math.cos(e)*5,1+Math.sin(e)*5,Math.cos(a)*Math.cos(e)*5);fill.position.set(-key.position.x,3,-key.position.z);
grid.visible=!!P.grid;tc.setSpace(tc.mode=='translate'||P.wsp?'world':'local');tc.setRotationSnap(P.snap?rad(15):null);tc.setTranslationSnap(P.snap?.0625:null);
W.traverse(o=>{if(o.isMesh)o.receiveShadow=!!P.self});
Object.keys(ITM).forEach(key=>{const h=ITM[key],c=h.userData.cfg,b=h.userData.blk,sc=c.sc;h.rotation.set(rad(c.rx-(b?45:0)),rad(c.ry+(b?90:0)),rad(c.rz));h.scale.setScalar(sc);const g=h.userData.g||[6,6],off=b?new V3(0,0,3*sc):new V3(g[0],g[1],0).multiplyScalar(sc).applyEuler(h.rotation);h.position.set(c.px,c.py,c.pz).add(off)})}
function rsz(){if(EXPORTING)return;R.setPixelRatio(Math.min(devicePixelRatio,innerWidth<900?1.5:2)*P.pq);inv();R.setSize(vw.clientWidth,vw.clientHeight,false);if(comp){comp.setPixelRatio(R.getPixelRatio());comp.setSize(vw.clientWidth,vw.clientHeight)}cam.aspect=vw.clientWidth/vw.clientHeight;cam.updateProjectionMatrix()}
new ResizeObserver(rsz).observe(vw);

function fitShadows(){if(!P.shade)return;W.updateMatrixWorld(true);const bb=new THREE.Box3(),v=new V3();for(const k in ALL){ALL[k].getWorldPosition(v);bb.expandByPoint(v)}if(bb.isEmpty())return;bb.expandByScalar(1.4);
const cs=[];for(const x of[bb.min.x,bb.max.x])for(const y of[bb.min.y,bb.max.y])for(const z of[bb.min.z,bb.max.z])cs.push(new V3(x,y,z));
const m=new THREE.Matrix4().lookAt(key.position,key.target.position,new V3(0,1,0));m.setPosition(key.position);const iv=m.invert();let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9,z0=1e9,z1=-1e9;
cs.forEach(c=>{const q=c.clone().applyMatrix4(iv);x0=Math.min(x0,q.x);x1=Math.max(x1,q.x);y0=Math.min(y0,q.y);y1=Math.max(y1,q.y);z0=Math.min(z0,q.z);z1=Math.max(z1,q.z)});
cam.updateMatrixWorld();const cp=new V3().setFromMatrixPosition(cam.matrixWorld),bc=new V3(),dF=cp.distanceTo(bb.getCenter(bc))+bb.getSize(new V3()).length()*.5+3,th=Math.tan(rad(cam.fov)/2);let fx0=1e9,fx1=-1e9,fy0=1e9,fy1=-1e9;
for(const d of[cam.near,dF])for(const sx of[-1,1])for(const sy of[-1,1]){const q=new V3(sx*d*th*cam.aspect,sy*d*th,-d).applyMatrix4(cam.matrixWorld).applyMatrix4(iv);fx0=Math.min(fx0,q.x);fx1=Math.max(fx1,q.x);fy0=Math.min(fy0,q.y);fy1=Math.max(fy1,q.y)}
if(Math.min(x1,fx1)>Math.max(x0,fx0)&&Math.min(y1,fy1)>Math.max(y0,fy0)){x0=Math.max(x0,fx0);x1=Math.min(x1,fx1);y0=Math.max(y0,fy0);y1=Math.min(y1,fy1)}
const sc=key.shadow.camera,pd=.3;sc.left=x0-.06;sc.right=x1+.06;sc.bottom=y0-.06;sc.top=y1+.06;sc.near=Math.max(.05,-z1-pd);sc.far=-z0+pd+60;sc.updateProjectionMatrix();let fl=0;W.traverse(o=>{if(o.isMesh&&o.castShadow&&[].concat(o.material).some(q=>q.shadowSide===THREE.FrontSide))fl=1});const tx=Math.max(sc.right-sc.left,sc.top-sc.bottom)/key.shadow.mapSize.x;key.shadow.bias=(fl?-.004:Math.min(tx*1.6,Math.min(P.dep,P.athk,P.ethk)/16*.6))/(sc.far-sc.near);key.shadow.normalBias=fl?Math.max(.002,tx*1.5):.0001}
