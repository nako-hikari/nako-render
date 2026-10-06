const gh=$('#gh');let gd=0;
gh.addEventListener('pointerdown',e=>{gd=1;gh.setPointerCapture(e.pointerId);document.body.classList.add('dg')});
gh.addEventListener('pointermove',e=>{if(gd)document.body.style.setProperty('--sheet-h',Math.round(Math.min(innerHeight*.88,Math.max(110,innerHeight-e.clientY)))+'px')});
['pointerup','pointercancel'].forEach(n=>gh.addEventListener(n,()=>{gd=0;document.body.classList.remove('dg')}));
const wr=$('.wrapper'),vv=window.visualViewport,fitW=()=>{wr.style.position='fixed';wr.style.left='0';wr.style.width='100%';wr.style.top=(vv?vv.offsetTop:0)+'px';wr.style.height=(vv?vv.height:innerHeight)+'px'};
fitW();if(vv)['resize','scroll'].forEach(n=>vv.addEventListener(n,fitW));addEventListener('resize',fitW);
if(innerWidth>=900)document.body.classList.add('po');
