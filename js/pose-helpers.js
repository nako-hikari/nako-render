const mpair=k=>{const m=/left/.test(k)?k.replace('left','right'):/right/.test(k)?k.replace('right','left'):null;return m&&ALL[m]?m:null};
function mset(a,b){const A=ALL[a],B=ALL[b],ua=A.userData,ub=B.userData;B.position.set(ub.rp.x-(A.position.x-ua.rp.x),ub.rp.y+(A.position.y-ua.rp.y),ub.rp.z+(A.position.z-ua.rp.z));
B.rotation.set(ub.rr.x+(A.rotation.x-ua.rr.x),ub.rr.y-(A.rotation.y-ua.rr.y),ub.rr.z-(A.rotation.z-ua.rr.z),'ZYX');inv()}

const actorOf=k=>{const m=k.match(/^a\d+:/);return m?m[0]:''};
const isLocked=k=>LOCKA.has(actorOf(k)||'a0:');
const onFor=(a,k)=>!!(a.on&&a.on[k]);

