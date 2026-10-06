$('#p').addEventListener('input',e=>{const t=e.target,d=t.dataset;
if(d.k!==undefined){const v=t.type=='checkbox'?+t.checked:(t.type=='color'?t.value:parseFloat(t.value));if(t.type!='color'&&isNaN(v))return;P[d.k]=v;
if(t.type=='range')fillR(t);const sib=t.type=='range'?t.nextElementSibling:(t.classList.contains('nv')?t.previousElementSibling:null);if(sib&&sib.dataset.k===d.k){sib.value=t.value;if(sib.type=='range')fillR(sib)}
d.r?(t.type=='range'||t.classList.contains('nv')?(clearTimeout(tm),tm=setTimeout(refresh,150)):refresh()):upd()}
else if(d.ac||d.acf){const[i,p]=(d.ac||d.acf).split('|'),ac=AC.find(x=>x.id==i);if(ac){const ks=p.split('.'),k=ks.pop();let o=ac;ks.forEach(n=>o=o[n]);
let v;if(d.acf){const f=t.files[0];v=f?URL.createObjectURL(f):null}else if(t.type=='checkbox')v=+t.checked;else if(t.type=='text')v=t.value.trim();else if(t.tagName=='SELECT')v=t.value;else v=parseFloat(t.value);
if(typeof v=='number'&&isNaN(v))return;o[k]=v;
if(t.type=='range')fillR(t);const sib=t.type=='range'?t.nextElementSibling:(t.classList.contains('nv')?t.previousElementSibling:null);if(sib&&sib.dataset.ac===d.ac){sib.value=t.value;if(sib.type=='range')fillR(sib)}
if(['px','py','pz','rx','ry','rz','sc'].includes(k))upd();else if(t.type=='text'){clearTimeout(tm);tm=setTimeout(refresh,600)}else if(t.type=='range'||t.classList.contains('nv')){clearTimeout(tm);tm=setTimeout(refresh,150)}else refresh()}}
else if(d.ap){const[a,b]=d.ap.split('|'),ac=AC.find(x=>x.id==a);if(ac){const v=t.type=='checkbox'?+t.checked:+t.value;if(b.startsWith('on.')){ac.on[b.slice(3)]=v}else ac[b]=v;document.querySelectorAll('[data-ap="'+d.ap+'"]').forEach(x=>x.checked=!!v);refresh()}}
else if(d.at){const ac=AC.find(x=>x.id==d.at);if(ac){ac.skin.txt=t.value.trim();clearTimeout(tm);tm=setTimeout(refresh,600)}}
else if(d.af){const ac=AC.find(x=>x.id==d.af),f=t.files[0];if(ac){ac.skin.url=f?URL.createObjectURL(f):null;refresh()}}
else if(d.lka){t.checked?LOCKA.add(d.lka):LOCKA.delete(d.lka);attachGizmo()}});
$('#bs').onchange=e=>selKey(e.target.value);

const cl=(id,on)=>{$(id).className=(on?'primary':'secondary')+' interactive'};
const mode=m=>{inv();tc.setMode(m);tc.setSpace(m=='translate'||P.wsp?'world':'local');attachGizmo();cl('#mr',m=='rotate');cl('#mt',m=='translate');cl('#fr2',m=='rotate');cl('#fm2',m=='translate')};
$('#mr').onclick=$('#fr2').onclick=()=>mode('rotate');$('#mt').onclick=$('#fm2').onclick=()=>mode('translate');$('#mm').onclick=$('#fg').onclick=()=>{setHand(false);selKey('root');mode('translate')};
const setHand=on=>{inv();P.hand=on?1:0;cl('#fh',on);attachGizmo();tc.enabled=!on;tc.visible=!on};
$('#fh').onclick=()=>setHand(!P.hand);
$('#fp').onclick=()=>{const q=ALL[selK].parent;if(q&&q.userData.key)selKey(q.userData.key)};
$('#tp').onclick=()=>document.body.classList.toggle('po');
$('#fc').onclick=()=>{cam.position.set(1.6,1.4,3.6);orbit.target.set(0,1,0);inv()};
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(e.key=='w')mode('translate');if(e.key=='e')mode('rotate')});

function attachGizmo(){const o=ALL[selK];if(!o||P.hand||isLocked(selK)){tc.detach();useProxy=false;inv();return}if(tc.mode=='translate'){useProxy=true;o.updateWorldMatrix(true,false);proxy.position.setFromMatrixPosition(o.matrixWorld);proxy.quaternion.identity();proxy.scale.set(1,1,1);tc.attach(proxy)}else{useProxy=false;tc.attach(o)}}
function syncProxy(){if(!useProxy)return;const o=ALL[selK];if(o&&o.parent)o.position.copy(o.parent.worldToLocal(proxy.position.clone()))}

const rst=o=>{inv();o.position.copy(o.userData.rp);o.rotation.copy(o.userData.rr)};
const snapP=()=>{const o={};for(const k in ALL){const b=ALL[k];o[k]=[b.position.toArray(),[b.rotation.x,b.rotation.y,b.rotation.z,b.rotation.order]]}return o};
const applyS=o=>{for(const k in o){const b=ALL[k];if(!b)continue;b.position.fromArray(o[k][0]);b.rotation.set(...o[k][1])}inv()};
const chk=()=>{U.push(snapP());if(U.length>100)U.shift();RD.length=0};
const undo=()=>{if(!U.length)return st('Nothing to undo');RD.push(snapP());applyS(U.pop())};
const redo=()=>{if(!RD.length)return st('Nothing to redo');U.push(snapP());applyS(RD.pop())};
tc.addEventListener('dragging-changed',e=>{if(e.value)pre=snapP();else if(pre){if(JSON.stringify(pre)!==JSON.stringify(snapP())){U.push(pre);if(U.length>100)U.shift();RD.length=0}pre=null}});
$('#fd0').onclick=undo;$('#fd').onclick=redo;
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;const z=(e.ctrlKey||e.metaKey)&&e.key.toLowerCase();if(z=='z'){e.shiftKey?redo():undo();e.preventDefault()}else if(z=='y')redo()});
$('#rb').onclick=$('#fz').onclick=()=>{if(isLocked(selK)){st('Locked');return}chk();rst(ALL[selK]);if(P.mir){const b=mpair(selK);if(b)rst(ALL[b])}};
$('#ra').onclick=()=>{chk();const a=actorOf(selK);for(const k in ALL)if(actorOf(k)===a)rst(ALL[k])};


tc.addEventListener('objectChange',()=>{syncProxy();if(P.mir){const b=mpair(selK);if(b&&!isLocked(b))mset(selK,b)}});
$('#fx').onclick=()=>{P.mir=P.mir?0:1;document.querySelector('[data-k=mir]').checked=!!P.mir;cl('#fx',P.mir);upd()};
$('#p').addEventListener('change',e=>{if(e.target.dataset.k=='mir')cl('#fx',P.mir)});
$('#ps').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(snapP())],{type:'application/json'}));a.download='pose.json';a.click()};
$('#pl2').onclick=()=>$('#pf').click();
$('#pf').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{chk();applyS(JSON.parse(await f.text()));st('Pose loaded')}catch(x){st('Bad pose file')}};
$('#p').addEventListener('toggle',e=>{if(e.target.open&&e.target.parentElement.id=='pc')document.querySelectorAll('#pc>details').forEach(d=>{if(d!==e.target)d.open=false})},true);

cv.addEventListener('pointerdown',e=>md=[e.clientX,e.clientY]);
cv.addEventListener('pointerup',e=>{if(P.hand||EXPORTING||!md||performance.now()-tcT<150||Math.hypot(e.clientX-md[0],e.clientY-md[1])>4)return;const r=cv.getBoundingClientRect(),rc=new THREE.Raycaster();
rc.setFromCamera({x:(e.clientX-r.left)/r.width*2-1,y:-((e.clientY-r.top)/r.height)*2+1},cam);BM.forEach(b=>{if(!b.i0)b.m.geometry.computeBoundingSphere()});
const h=rc.intersectObjects(W.children,true).find(x=>x.object.userData.key);if(h){const u=h.object.userData;let q=u.key;if(u.lo&&W.worldToLocal(h.point.clone()).y<u.j)q=u.lo;const a=actorOf(q);selKey(a+(OVP[q.slice(a.length)]||q.slice(a.length)))}});

