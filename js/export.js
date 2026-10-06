async function snap(){const gl=R.getContext(),MAXD=Math.min(gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),gl.getParameter(gl.MAX_VIEWPORT_DIMS)[0],8192);
const L=Math.min(+$('#es').value,MAXD),a=vw.clientWidth/vw.clientHeight,w=a>=1?L:Math.round(L*a),h=a>=1?Math.round(L/a):L;let ss=[1,2,3][+$('#xq').value];while(ss>1&&Math.max(w,h)*ss>MAXD)ss--;
const W2=w*ss,H2=h*ss,useB=!!(P.bloom&&ensureComp());
EXPORTING=true;showX('Rendering '+w+' x '+h+(ss>1?' ('+ss+'x supersampling)':''));orbit.enabled=false;const tv=tc.visible,gv=grid.visible;tc.visible=false;grid.visible=false;
await new Promise(r=>setTimeout(r,60));
try{cam.aspect=w/h;cam.updateProjectionMatrix();W.updateMatrixWorld(true);bend();fitShadows();R.setPixelRatio(1);R.setSize(W2,H2,false);if(useB){comp.setPixelRatio(1);comp.setSize(W2,H2);dpass.uniforms.dither.value=1.5}
const grab=(bl,bk)=>{R.setClearColor(0x000000,bk?1:0);R.shadowMap.needsUpdate=true;if(bl){bpass.enabled=bl==2;comp.render()}else R.render(scene,cam);const c=document.createElement('canvas');c.width=W2;c.height=H2;const x=c.getContext('2d');x.drawImage(cv,0,0);return x.getImageData(0,0,W2,H2)};
const base=grab(0,0),d=base.data;
if(useB){const A=grab(2,1).data;for(let i=0;i<d.length;i+=4){const m=Math.max(A[i],A[i+1],A[i+2]),na=Math.max(d[i+3],m);if(!na)continue;d[i]=Math.min(255,A[i]*255/na);d[i+1]=Math.min(255,A[i+1]*255/na);d[i+2]=Math.min(255,A[i+2]*255/na);d[i+3]=na}}
const big=document.createElement('canvas');big.width=W2;big.height=H2;big.getContext('2d').putImageData(base,0,0);
let c=document.createElement('canvas');c.width=w;c.height=h;let x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(big,0,0,w,h);
if(P.crop){const dd=x.getImageData(0,0,w,h).data;let x0=w,y0=h,x1=-1,y1=-1;for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(dd[(j*w+i)*4+3]>2){if(i<x0)x0=i;if(i>x1)x1=i;if(j<y0)y0=j;if(j>y1)y1=j}
if(x1>=0){const m=Math.round(Math.max(w,h)*.01)+2;x0=Math.max(0,x0-m);y0=Math.max(0,y0-m);x1=Math.min(w-1,x1+m);y1=Math.min(h-1,y1+m);const c2=document.createElement('canvas');c2.width=x1-x0+1;c2.height=y1-y0+1;c2.getContext('2d').drawImage(c,x0,y0,c2.width,c2.height,0,0,c2.width,c2.height);c=c2}}
if($('#xbgm').value=='1'){const t=document.createElement('canvas');t.width=c.width;t.height=c.height;const tx=t.getContext('2d');tx.fillStyle=$('#xbgc').value;tx.fillRect(0,0,t.width,t.height);tx.drawImage(c,0,0);c=t}
return await new Promise(r=>c.toBlob(r,'image/png'))}
finally{if(dpass)dpass.uniforms.dither.value=1;R.setClearColor(0x000000,0);tc.visible=tv;grid.visible=gv;orbit.enabled=true;EXPORTING=false;showX(null);rsz();R.shadowMap.needsUpdate=true;inv()}}
const poseName=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return 'Nako-pose-'+p(d.getDate())+p(d.getMonth()+1)+d.getFullYear()+'-'+(1000+Math.floor(Math.random()*9000))+'.png'};
$('#ed').onclick=async()=>{try{const b=await snap(),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=poseName();a.click();st('Saved '+Math.round(b.size/1024)+' KB')}catch(e){console.error(e);st('Render failed, try a smaller size or lower quality')}};
const shareBlob=async b=>{const f=new File([b],poseName(),{type:'image/png'});try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f]});return}}catch(e){if(e&&e.name=='AbortError')return}
showModal('Render ready','Your browser blocks direct copying here. Press and hold the image to copy or save it.');const im=document.createElement('img');im.src=URL.createObjectURL(b);im.style.cssText='width:100%;max-height:55vh;object-fit:contain;margin-top:12px';$('#nakoModalBody').appendChild(im)};
$('#ec').onclick=async()=>{let p;try{p=snap();await navigator.clipboard.write([new ClipboardItem({'image/png':p})]);st('Copied to clipboard')}catch(e){try{await shareBlob(await p)}catch(x){console.error(x);st('Render failed, try a smaller size or lower quality')}}};

