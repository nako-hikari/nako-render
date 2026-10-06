const cleanU=o=>JSON.parse(JSON.stringify(o,(k,v)=>k=='url'?undefined:v));
function sceneData(){return{v:2,P:Object.assign({},P),AC:AC.map(a=>({id:a.id,off:a.off,skin:cleanU(a.skin),slim:a.slim,l3d:a.l3d,on:a.on,a:cleanU(a.a),i:cleanU(a.i)})),locka:[...LOCKA],pose:snapP(),cam:{pos:cam.position.toArray(),q:cam.quaternion.toArray(),t:orbit.target.toArray()}}}
function syncAll(){document.querySelectorAll('#pc [data-k]').forEach(e=>{const v=P[e.dataset.k];if(v===undefined)return;if(e.type=='checkbox')e.checked=!!v;else e.value=v;if(e.type=='range')fillR(e)})}
const mix=(d,s)=>{for(const k in d)d[k]=Object.assign(d[k],(s||{})[k]);return d};
async function loadScene(txt){let d;try{d=JSON.parse(txt)}catch(e){st('Invalid scene code');return}
if(!d||!d.P){st('Invalid scene code');return}
Object.assign(P,d.P);AC.length=1;(d.AC||[]).forEach((a,i)=>{const o={id:a.id,skin:{txt:(a.skin&&a.skin.txt)||''},off:a.off||0,slim:a.slim,l3d:a.l3d,on:a.on||{},a:mix(mkArm(),a.a),i:mix(mkIt(),a.i),copy:0,done:1};i?AC.push(o):Object.assign(AC[0],o,{id:0})});
LOCKA.clear();(d.locka||[]).forEach(k=>LOCKA.add(k));selK='root';syncAll();cl('#fx',P.mir);setHand(!!P.hand);renderActors();await refresh();applyS(d.pose||{});
if(d.cam){cam.position.fromArray(d.cam.pos);cam.quaternion.fromArray(d.cam.q);orbit.target.fromArray(d.cam.t);orbit.update()}
upd();st('Scene loaded')}
$('#scc').onclick=async()=>{const t=JSON.stringify(sceneData());$('#sct').value=t;try{await navigator.clipboard.writeText(t);st('Scene code copied')}catch(e){$('#sct').select();st('Select the box and copy it manually')}};
$('#scl').onclick=()=>loadScene($('#sct').value);
$('#scd').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(sceneData())],{type:'application/json'}));a.download='scene.json';a.click()};
$('#scu').onclick=()=>$('#scf').click();
$('#scf').onchange=async e=>{const f=e.target.files[0];if(f)loadScene(await f.text());e.target.value=''};
