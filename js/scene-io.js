const cleanU=o=>JSON.parse(JSON.stringify(o,(k,v)=>k=='url'?undefined:v));
function sceneData(){return{v:2,P:Object.assign({},P),AC:AC.map(a=>({id:a.id,off:a.off,skin:cleanU(a.skin),slim:a.slim,l3d:a.l3d,on:a.on,a:cleanU(a.a),i:cleanU(a.i)})),locka:[...LOCKA],pose:snapP(),cam:{pos:cam.position.toArray(),q:cam.quaternion.toArray(),t:orbit.target.toArray()}}}
function syncAll(){document.querySelectorAll('#pc [data-k]').forEach(e=>{const v=P[e.dataset.k];if(v===undefined)return;if(e.type=='checkbox')e.checked=!!v;else e.value=v;if(e.type=='range')fillR(e)})}
const mix=(d,s)=>{for(const k in d)d[k]=Object.assign(d[k],(s||{})[k]);return d};
async function loadScene(txt){let d;try{d=JSON.parse(txt)}catch(e){st('Invalid scene code');return}
if(!d||!d.P){st('Invalid scene code');return}
Object.assign(P,d.P);AC.length=1;(d.AC||[]).forEach((a,i)=>{const o={id:a.id,skin:{txt:(a.skin&&a.skin.txt)||''},off:a.off||0,slim:a.slim,l3d:a.l3d,on:a.on||{},a:mix(mkArm(),a.a),i:mix(mkIt(),a.i),copy:0,done:1};i?AC.push(o):Object.assign(AC[0],o,{id:0})});
LOCKA.clear();(d.locka||[]).forEach(k=>LOCKA.add(k));selK='root';syncAll();cl('#fx',P.mir);cl('#fq',P.slow);setHand(!!P.hand);renderActors();await refresh();applyS(d.pose||{});
if(d.cam){cam.position.fromArray(d.cam.pos);cam.quaternion.fromArray(d.cam.q);orbit.target.fromArray(d.cam.t);orbit.update()}
upd();st('Scene loaded')}
$('#scc').onclick=async()=>{const t=JSON.stringify(sceneData());$('#sct').value=t;try{await navigator.clipboard.writeText(t);st('Scene code copied')}catch(e){$('#sct').select();st('Select the box and copy it manually')}};
$('#scl').onclick=()=>loadScene($('#sct').value);
$('#scd').onclick=()=>showModal('Save scene','Name your scene file',{input:{value:'scene',placeholder:'scene name'},confirmText:'Download',onConfirm:v=>{const n=String(v||'').trim().replace(/\.json$/i,'').replace(/[\\/:*?"<>|\x00-\x1f]/g,'').trim()||'scene',a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(sceneData())],{type:'application/json'}));a.download=n+'.json';a.click()}});
$('#scu').onclick=()=>$('#scf').click();
$('#scf').onchange=async e=>{const f=e.target.files[0];if(f)loadScene(await f.text());e.target.value=''};
const SCDIR='scene/',niceName=n=>n.replace(/\.json$/i,'').replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim();
async function listScenes(){let names=[];
try{const r=await fetch(SCDIR+'index.json',{cache:'no-cache'});if(r.ok){const j=await r.json();names=(Array.isArray(j)?j:(j&&j.files)||[]).map(String)}}catch(e){}
if(!names.length){try{const r=await fetch(SCDIR,{cache:'no-cache'});if(r.ok){const t=await r.text();names=[...t.matchAll(/href="([^"?#]+?\.json)"/gi)].map(m=>{try{return decodeURIComponent(m[1].split('/').pop())}catch(e){return m[1].split('/').pop()}})}}catch(e){}}
return[...new Set(names)].filter(n=>/\.json$/i.test(n)&&n.toLowerCase()!='index.json').sort((a,b)=>niceName(a).localeCompare(niceName(b)))}
async function renderLib(){const box=$('#plib');if(!box)return;box.textContent='Loading...';const names=await listScenes();box.textContent='';
if(!names.length){box.textContent='No scenes found.';return}
names.forEach(n=>{const b=document.createElement('button');b.className='secondary interactive';b.textContent=niceName(n)||n;b.dataset.scn=n;box.appendChild(b)})}
async function applyLib(n){try{const r=await fetch(SCDIR+encodeURIComponent(n));if(!r.ok)throw new Error(r.status);await loadScene(await r.text())}catch(e){st('Could not load that scene')}}
$('#plib').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!b.dataset.scn)return;const n=b.dataset.scn;showModal('Apply scene','Applying new scene will overwrite your current one.',{confirmText:'Continue',cancelText:'Go back',onConfirm:()=>applyLib(n)})});
$('#plr').onclick=renderLib;
