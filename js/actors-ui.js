const pth=(a,p)=>p.split('.').reduce((o,n)=>o[n],a);
const acs=(a,p,t,mn,mx,s)=>{const v=pth(a,p);return `<label class="row sl"><span>${t}</span><input type="range" min="${mn}" max="${mx}" step="${s}" data-ac="${a.id}|${p}" value="${v}"><input type="number" class="nv" inputmode="decimal" step="any" data-ac="${a.id}|${p}" value="${v}"></label>`};
const acx=(a,p,t)=>`<label class="row"><input type="checkbox" data-ac="${a.id}|${p}" ${pth(a,p)?'checked':''}><span class="grow">${t}</span></label>`;
const act=(a,p,ph)=>`<label class="row"><input type="text" data-ac="${a.id}|${p}.txt" placeholder="${ph}" value="${pth(a,p).txt||''}"><input type="file" accept="image/*" data-acf="${a.id}|${p}.url" style="width:76px"></label>`;
function renderActors(){$('#acl').innerHTML=AC.map(a=>{const on=(k,t)=>`<label class="row"><input type="checkbox" data-ap="${a.id}|on.${k}" ${a.on[k]?'checked':''}><span class="grow">${t}</span></label>`,lk=a.id?'a'+a.id+':':'a0:';
const arm=['helmet','chest','legs','boots'].map((k,i)=>on(k,['Helmet','Chest','Leggings','Boots'][i])+`<label class="row"><span>Material</span><select data-ac="${a.id}|a.${k}.mat">${MT.map(x=>`<option ${a.a[k].mat==x?'selected':''}>${x}</option>`).join('')}</select></label>`+act(a,'a.'+k,'custom path or URL (blank = official)')).join('');
const its=['L','R'].map(k=>`<details class="pl"><summary>${k=='L'?'Left':'Right'} hand item</summary>`+on('item'+k,'Show item')+act(a,'i.'+k,'items/diamond_sword')+acx(a,'i.'+k+'.blk','Hold as block (block texture)')+acx(a,'i.'+k+'.vox','3D extruded sprite')+acs(a,'i.'+k+'.th','Thickness',.5,6,.25)+acs(a,'i.'+k+'.sc','Scale',.1,2,.05)+['px','py','pz'].map(q=>acs(a,'i.'+k+'.'+q,'Pos '+q[1].toUpperCase(),-16,16,.25)).join('')+['rx','ry','rz'].map(q=>acs(a,'i.'+k+'.'+q,'Rot '+q[1].toUpperCase(),-180,180,1)).join('')+'</details>').join('');
return `<details class="pl" ${a.id==0?'open':''}><summary><b>${a.id?'Player '+(a.id+1):'Player 1 (main)'}</b></summary><div class="btns"><button class="secondary interactive" data-asel="${a.id}">Select</button>${a.id?`<button class="danger interactive" data-adel="${a.id}">Delete</button>`:''}</div>
<label class="row"><input type="checkbox" data-lka="${lk}" ${LOCKA.has(lk)?'checked':''}><span class="grow">Lock pose</span></label>
<label class="row"><input type="text" data-at="${a.id}" placeholder="skin path or URL (blank = default)" value="${a.skin.txt||''}"><input type="file" accept="image/*" data-af="${a.id}" style="width:76px"></label>
<label class="row"><input type="checkbox" data-ap="${a.id}|slim" ${a.slim?'checked':''}><span class="grow">Slim arms (off = wide)</span></label>
<label class="row"><input type="checkbox" data-ap="${a.id}|l3d" ${a.l3d?'checked':''}><span class="grow">3D skin layers</span></label>
<details class="pl"><summary>Armor</summary>${arm}</details><details class="pl"><summary>Elytra</summary>${on('elytra','Elytra')}${act(a,'a.elytra','elytra texture (blank = official)')}</details>${its}</details>`}).join('');
document.querySelectorAll('#acl input[type=range]').forEach(fillR)}
function addActor(copy){const id=Math.max(...AC.map(a=>a.id))+1,s=id%2?1:-1,m=AC[0],cp=o=>JSON.parse(JSON.stringify(o));AC.push({id,skin:{},off:s*Math.ceil(id/2)*24,slim:m.slim,l3d:m.l3d,copy,on:copy?cp(m.on):{},a:copy?cp(m.a):mkArm(),i:copy?cp(m.i):mkIt()});renderActors();refresh().then(()=>{selKey('a'+id+':root');mode('translate')})}
function delActor(id){const i=AC.findIndex(a=>a.id==id);if(i<=0)return;AC.splice(i,1);LOCKA.delete('a'+id+':');if(actorOf(selK)==='a'+id+':')selK='root';renderActors();refresh()}
$('#p').addEventListener('click',e=>{const b=e.target.closest('button'),d=b?b.dataset:{};
if(d.act=='add')addActor(false);if(d.act=='addc')addActor(true);
if(d.asel!==undefined){setHand(false);selKey(+d.asel?'a'+d.asel+':root':'root');mode('translate')}
if(d.adel)showModal('Delete player','Remove this player from the scene?',{onConfirm:()=>delActor(+d.adel),danger:true});
if(d.v){const Vw={front:[0,1.1,4.2],back:[0,1.1,-4.2],left:[4.2,1.1,0],right:[-4.2,1.1,0],top:[0,5,.01]};cam.position.set(...Vw[d.v]);orbit.target.set(0,1,0);inv()}});
$('#fl').onclick=()=>{const k=actorOf(selK)||'a0:';LOCKA.has(k)?LOCKA.delete(k):LOCKA.add(k);renderActors();attachGizmo();st(LOCKA.has(k)?'Player locked':'Player unlocked')};

