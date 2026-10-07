$('#p').addEventListener('input',e=>{const t=e.target,d=t.dataset;
if(d.k!==undefined){const v=t.type=='checkbox'?+t.checked:(t.type=='color'?t.value:parseFloat(t.value));if(t.type!='color'&&isNaN(v))return;P[d.k]=v;
if(t.type=='range')fillR(t);const sib=t.type=='range'?t.nextElementSibling:(t.classList.contains('nv')?t.previousElementSibling:null);if(sib&&sib.dataset.k===d.k){sib.value=t.value;if(sib.type=='range')fillR(sib)}
d.r?(t.type=='range'||t.classList.contains('nv')?(clearTimeout(tm),tm=setTimeout(refresh,150)):refresh()):upd()}
else if(d.ac||d.acf){const[i,p]=(d.ac||d.acf).split('|'),ac=AC.find(x=>x.id==i);if(ac){const ks=p.split('.'),k=ks.pop();let o=ac;ks.forEach(n=>o=o[n]);
let v;if(d.acf){const f=t.files[0];v=f?URL.createObjectURL(f):null}else if(t.type=='checkbox')v=+t.checked;else if(t.type=='text')v=t.value.trim();else if(t.tagName=='SELECT')v=t.value;else v=parseFloat(t.value);
if(typeof v=='number'&&isNaN(v))return;o[k]=v;
if(t.type=='range')fillR(t);const sib=t.type=='range'?t.nextElementSibling:(t.classList.contains('nv')?t.previousElementSibling:null);if(sib&&sib.dataset.ac===d.ac){sib.value=t.value;if(sib.type=='range')fillR(sib)}
if(['px','py','pz','rx','ry','rz','sc','sx','sy','sz'].includes(k))upd();else if(t.type=='text'){clearTimeout(tm);tm=setTimeout(refresh,600)}else if(t.type=='range'||t.classList.contains('nv')){clearTimeout(tm);tm=setTimeout(refresh,150)}else refresh()}}
else if(d.ap){const[a,b]=d.ap.split('|'),ac=AC.find(x=>x.id==a);if(ac){const v=t.type=='checkbox'?+t.checked:+t.value;if(b.startsWith('on.')){ac.on[b.slice(3)]=v}else ac[b]=v;document.querySelectorAll('[data-ap="'+d.ap+'"]').forEach(x=>x.checked=!!v);refresh()}}
else if(d.at){const ac=AC.find(x=>x.id==d.at);if(ac){ac.skin.txt=t.value.trim();clearTimeout(tm);tm=setTimeout(refresh,600)}}
else if(d.af){const ac=AC.find(x=>x.id==d.af),f=t.files[0];if(ac){ac.skin.url=f?URL.createObjectURL(f):null;refresh()}}
else if(d.lka){t.checked?LOCKA.add(d.lka):LOCKA.delete(d.lka);attachGizmo()}});
$('#bs').onchange=e=>selKey(e.target.value);

const cl=(id,on)=>{$(id).className=(on?'primary':'secondary')+' interactive'};
const mode=m=>{inv();tc.setMode(m);if(m=='scale'&&!itemOf(selK))st('Select a hand item to scale');attachGizmo();cl('#mr',m=='rotate');cl('#mt',m=='translate');cl('#ms',m=='scale');cl('#fr2',m=='rotate');cl('#fm2',m=='translate');cl('#fs2',m=='scale')};
$('#mr').onclick=$('#fr2').onclick=()=>mode('rotate');$('#mt').onclick=$('#fm2').onclick=()=>mode('translate');$('#ms').onclick=$('#fs2').onclick=()=>mode('scale');$('#mm').onclick=$('#fg').onclick=()=>{setHand(false);selKey('root');mode('translate')};
const setHand=on=>{inv();P.hand=on?1:0;cl('#fh',on);attachGizmo();tc.enabled=!on;tc.visible=!on};
$('#fh').onclick=()=>setHand(!P.hand);
$('#fp').onclick=()=>{if(itemOf(selK)){selKey(actorOf(selK)+(selK.endsWith('L')?'leftItem':'rightItem'));return}const q=ALL[selK].parent;if(q&&q.userData.key)selKey(q.userData.key)};
$('#tp').onclick=()=>document.body.classList.toggle('po');
$('#fc').onclick=()=>{cam.position.set(1.6,1.4,3.6);orbit.target.set(0,1,0);inv()};
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(e.key=='w')mode('translate');if(e.key=='e')mode('rotate');if(e.key=='r')mode('scale')});

const itemOf=k=>{const m=k.match(/^(a\d+:)?item([LR])$/);return m?ITM[(m[1]||'')+m[2]]:null};
const gsp=()=>itemOf(selK)?'world':(tc.mode=='translate'||P.wsp?'world':'local');
const r2=v=>Math.round(v*100)/100,r3=v=>Math.round(v*1000)/1000,dg=r=>r*180/Math.PI;
const wqt=o=>{const q=new THREE.Quaternion();o.updateWorldMatrix(true,false);o.matrixWorld.decompose(new V3(),q,new V3());return q};
const ITK=['px','py','pz','rx','ry','rz','sc','sx','sy','sz'];
const syncItemUI=it=>{const a=it.userData.ak;if(!a)return;const c=it.userData.cfg;ITK.forEach(q=>document.querySelectorAll('[data-ac="'+a[0]+'|i.'+a[1]+'.'+q+'"]').forEach(x=>{x.value=c[q];if(x.type=='range')fillR(x)}))};
const resetItem=it=>{const d=mkIt().L,c=it.userData.cfg;ITK.forEach(q=>c[q]=d[q]);upd();syncItemUI(it)};
function placeProxy(){const it=itemOf(selK);if(!it)return;const c=it.userData.cfg,p=it.parent;p.updateWorldMatrix(true,false);proxy.position.copy(p.localToWorld(new V3(c.px,c.py,c.pz)));if(tc.mode=='scale')proxy.quaternion.copy(wqt(it));else proxy.quaternion.identity();proxy.scale.set(1,1,1)}
function attachGizmo(){tc.setSpace(gsp());const o=ALL[selK],it=itemOf(selK);useItem=false;useProxy=false;
if((!o&&!it)||P.hand||isLocked(selK)){tc.detach();inv();nmBuild();return}
if(it){useItem=true;placeProxy();tc.attach(proxy)}
else if(tc.mode=='scale')tc.detach();
else if(tc.mode=='translate'){useProxy=true;o.updateWorldMatrix(true,false);proxy.position.setFromMatrixPosition(o.matrixWorld);proxy.quaternion.identity();proxy.scale.set(1,1,1);tc.attach(proxy)}
else tc.attach(o);
inv();nmBuild()}
let ds=null,itS=null;
function syncItem(){const it=itemOf(selK);if(!it)return;const c=it.userData.cfg,p=it.parent,m=tc.mode;p.updateWorldMatrix(true,false);
if(m=='translate'){const l=p.worldToLocal(proxy.position.clone());c.px=r2(l.x);c.py=r2(l.y);c.pz=r2(l.z)}
else if(m=='rotate'){const pq=wqt(p).invert(),q=pq.multiply(proxy.quaternion.clone().multiply(itS?itS.wqt:wqt(it))),e=new THREE.Euler().setFromQuaternion(q,'XYZ'),b=it.userData.blk?1:0;c.rx=r2(dg(e.x)+(b?45:0));c.ry=r2(dg(e.y)-(b?90:0));c.rz=r2(dg(e.z))}
else if(m=='scale'){const s=proxy.scale,S=itS||c,mn=.02;if(tc.axis=='XYZ')c.sc=Math.max(mn,r3(S.sc*s.x));else{c.sx=Math.max(mn,r3(S.sx*s.x));c.sy=Math.max(mn,r3(S.sy*s.y));c.sz=Math.max(mn,r3(S.sz*s.z))}}
upd();syncItemUI(it)}
tc.addEventListener('dragging-changed',e=>{const o=tc.object;if(e.value){if(!o)return;ds={p:o.position.clone(),q:o.quaternion.clone(),s:o.scale.clone()};const it=itemOf(selK);itS=useItem&&it?{sc:it.userData.cfg.sc,sx:it.userData.cfg.sx,sy:it.userData.cfg.sy,sz:it.userData.cfg.sz,wqt:wqt(it)}:null}else{ds=null;itS=null;if(useItem)placeProxy()}});
function fineFilter(){const o=tc.object;if(!ds||!o)return;const f=Math.max(.02,P.slowf||.2),sl=P.slow&&!P.snap;
if(useItem&&tc.mode=='scale'&&tc.axis=='XYZ'&&tc.pointStart&&tc.pointEnd&&tc.worldPosition){const gu=tc.size*tc.worldPosition.distanceTo(cam.position)*Math.min(1.9*Math.tan(Math.PI*cam.fov/360),7),d=new V3().subVectors(tc.pointEnd,tc.pointStart),cr=new V3().setFromMatrixColumn(cam.matrixWorld,0),cu=new V3().setFromMatrixColumn(cam.matrixWorld,1);let k=1+(d.dot(cr)+d.dot(cu))*.7071/gu;if(sl)k=1+(k-1)*f;k=Math.max(.02,k);o.scale.set(k,k,k);return}
if(!sl)return;
if(tc.mode=='translate'){const t=o.position.clone();o.position.copy(ds.p).lerp(t,f)}
else if(tc.mode=='rotate'){const t=o.quaternion.clone();o.quaternion.copy(ds.q).slerp(t,f)}
else if(tc.mode=='scale'){const t=o.scale.clone();o.scale.copy(ds.s).lerp(t,f)}}
let nmOn=0,nmF=[],nmNew=0;
function nmBuild(){const box=$('#nm');if(!box)return;box.style.display=nmOn?'block':'none';if(!nmOn)return;
const o=ALL[selK],it=itemOf(selK),m=tc.mode,F=[];let t='';
if(P.hand)t='Camera mode is on';
else if(it){const c=it.userData.cfg;
if(m=='translate'){t='Item position';['px','py','pz'].forEach((k,i)=>F.push({l:'XYZ'[i],g:()=>c[k],s:v=>{c[k]=v}}))}
else if(m=='rotate'){t='Item rotation (degrees)';['rx','ry','rz'].forEach((k,i)=>F.push({l:'XYZ'[i],g:()=>c[k],s:v=>{c[k]=v}}))}
else{t='Item scale';[['sc','All'],['sx','X'],['sy','Y'],['sz','Z']].forEach(([k,l])=>F.push({l,g:()=>c[k],s:v=>{c[k]=Math.max(.02,v)}}))}}
else if(o){
if(m=='translate'){t='Position (px, world)';const wp=()=>{o.updateWorldMatrix(true,false);return new V3().setFromMatrixPosition(o.matrixWorld).multiplyScalar(16)};[0,1,2].forEach(i=>F.push({l:'XYZ'[i],g:()=>wp().getComponent(i),s:v=>{const p=wp();p.setComponent(i,v);o.parent.updateWorldMatrix(true,false);o.position.copy(o.parent.worldToLocal(p.multiplyScalar(1/16)))}}))}
else if(m=='rotate'){t='Rotation (degrees)';['x','y','z'].forEach(a=>F.push({l:a.toUpperCase(),g:()=>dg(o.rotation[a]),s:v=>{o.rotation[a]=rad(v)}}))}
else t='Select a hand item to scale'}
else t='Nothing selected';
box.innerHTML='<div class="nmt">'+t+'</div>'+(F.length?'<div class="nmr">'+F.map((f,i)=>'<label><span>'+f.l+'</span><input type="number" step="any" inputmode="decimal" data-i="'+i+'"></label>').join('')+'</div>':'');nmF=F;nmSync(true)}
function nmSync(force){if(!nmOn)return;const box=$('#nm');if(!box)return;box.querySelectorAll('input').forEach(i=>{if(!force&&document.activeElement===i)return;const f=nmF[+i.dataset.i];if(f)i.value=r2(f.g())})}
$('#nm').addEventListener('focusin',()=>{nmNew=1});
$('#nm').addEventListener('input',e=>{const i=e.target.dataset.i;if(i===undefined)return;const f=nmF[+i],v=parseFloat(e.target.value);if(!f||isNaN(v))return;if(isLocked(selK)){st('Locked');return}if(nmNew){chk();nmNew=0}f.s(v);const it=itemOf(selK);if(it){upd();syncItemUI(it)}else{if(P.mir){const b=mpair(selK);if(b&&!isLocked(b))mset(selK,b)}inv()}});
$('#fn').onclick=()=>{nmOn=nmOn?0:1;cl('#fn',nmOn);nmBuild()};
$('#fq').onclick=()=>{P.slow=P.slow?0:1;const k=document.querySelector('[data-k=slow]');if(k)k.checked=!!P.slow;cl('#fq',P.slow);st(P.slow?'Fine control on':'Fine control off')};
function syncProxy(){if(!useProxy)return;const o=ALL[selK];if(o&&o.parent)o.position.copy(o.parent.worldToLocal(proxy.position.clone()))}

const rst=o=>{inv();o.position.copy(o.userData.rp);o.rotation.copy(o.userData.rr)};
const snapP=()=>{const o={};for(const k in ALL){const b=ALL[k];o[k]=[b.position.toArray(),[b.rotation.x,b.rotation.y,b.rotation.z,b.rotation.order]]}const it={};for(const k in ITM){const c=ITM[k].userData.cfg,q={};ITK.forEach(n=>q[n]=c[n]);it[k]=q}if(Object.keys(it).length)o['@i']=it;return o};
const applyS=o=>{for(const k in o){const b=ALL[k];if(!b)continue;b.position.fromArray(o[k][0]);b.rotation.set(...o[k][1])}if(o['@i'])for(const k in o['@i']){const h=ITM[k];if(h)Object.assign(h.userData.cfg,o['@i'][k])}inv();upd();for(const k in ITM)syncItemUI(ITM[k])};
const chk=()=>{U.push(snapP());if(U.length>100)U.shift();RD.length=0};
const undo=()=>{if(!U.length)return st('Nothing to undo');RD.push(snapP());applyS(U.pop())};
const redo=()=>{if(!RD.length)return st('Nothing to redo');U.push(snapP());applyS(RD.pop())};
tc.addEventListener('dragging-changed',e=>{if(e.value)pre=snapP();else if(pre){if(JSON.stringify(pre)!==JSON.stringify(snapP())){U.push(pre);if(U.length>100)U.shift();RD.length=0}pre=null}});
$('#fd0').onclick=undo;$('#fd').onclick=redo;
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;const z=(e.ctrlKey||e.metaKey)&&e.key.toLowerCase();if(z=='z'){e.shiftKey?redo():undo();e.preventDefault()}else if(z=='y')redo()});
$('#rb').onclick=$('#fz').onclick=()=>{if(isLocked(selK)){st('Locked');return}const it=itemOf(selK);if(it){chk();resetItem(it);return}chk();rst(ALL[selK]);if(P.mir){const b=mpair(selK);if(b)rst(ALL[b])}};
$('#ra').onclick=()=>{chk();const a=actorOf(selK);for(const k in ALL)if(actorOf(k)===a)rst(ALL[k])};


tc.addEventListener('objectChange',()=>{fineFilter();if(useItem){syncItem();return}syncProxy();nmSync();if(P.mir){const b=mpair(selK);if(b&&!isLocked(b))mset(selK,b)}});
$('#fx').onclick=()=>{P.mir=P.mir?0:1;document.querySelector('[data-k=mir]').checked=!!P.mir;cl('#fx',P.mir);upd()};
$('#p').addEventListener('change',e=>{if(e.target.dataset.k=='mir')cl('#fx',P.mir);if(e.target.dataset.k=='slow')cl('#fq',P.slow)});
$('#ps').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(snapP())],{type:'application/json'}));a.download='pose.json';a.click()};
$('#pl2').onclick=()=>$('#pf').click();
$('#pf').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{chk();applyS(JSON.parse(await f.text()));st('Pose loaded')}catch(x){st('Bad pose file')}};
$('#p').addEventListener('toggle',e=>{if(e.target.open&&e.target.parentElement.id=='pc')document.querySelectorAll('#pc>details').forEach(d=>{if(d!==e.target)d.open=false})},true);

cv.addEventListener('pointerdown',e=>md=[e.clientX,e.clientY]);
cv.addEventListener('pointerup',e=>{if(P.hand||EXPORTING||!md||performance.now()-tcT<150||Math.hypot(e.clientX-md[0],e.clientY-md[1])>4)return;const r=cv.getBoundingClientRect(),rc=new THREE.Raycaster();
rc.setFromCamera({x:(e.clientX-r.left)/r.width*2-1,y:-((e.clientY-r.top)/r.height)*2+1},cam);BM.forEach(b=>{if(!b.i0)b.m.geometry.computeBoundingSphere()});
const h=rc.intersectObjects(W.children,true).find(x=>x.object.userData.key);if(h){const u=h.object.userData;let q=u.key;if(u.lo&&W.worldToLocal(h.point.clone()).y<u.j)q=u.lo;const a=actorOf(q);selKey(a+(OVP[q.slice(a.length)]||q.slice(a.length)))}});

