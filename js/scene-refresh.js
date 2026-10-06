function voxGeo(cubes,im,o,og){const d=pix(im),W_=im.width,tw=o.tw||64,s_=W_/tw,S=Math.min(4,Math.max(1,Math.round(s_))),pos=[],nor=[],col=[],idx=[],th2=o.thk!=null,D=th2?0:P.dep;
const quad=(a,b,c,e,n,cl)=>{const i=pos.length/3;[a,b,c,e].forEach(v=>{pos.push(v.x,v.y,v.z);nor.push(n.x,n.y,n.z);col.push(cl[0],cl[1],cl[2])});
const ux=b.x-a.x,uy=b.y-a.y,uz=b.z-a.z,vx=c.x-a.x,vy=c.y-a.y,vz=c.z-a.z,dt=(uy*vz-uz*vy)*n.x+(uz*vx-ux*vz)*n.y+(ux*vy-uy*vx)*n.z;dt>0?idx.push(i,i+1,i+2,i,i+2,i+3):idx.push(i,i+2,i+1,i,i+3,i+2)};
cubes.forEach(c=>{const inf=o.lay?o.thk+(o.lx||0):(c.inflate||0),a0=th2?-(o.lay?Math.max(.05,o.thk+(o.lx||0)-.02):o.thk):-inf,a1=D;
faces(og(c),c.size,c.uv,inf,c.mirror).forEach(f=>{const[TL,TR,BR,BL]=f.c.map(v=>new V3(...v)),[rx,ry,rw,rh]=f.r,nx=rw*S,ny=rh*S,ex=TR.clone().sub(TL).divideScalar(nx),ey=BL.clone().sub(TL).divideScalar(ny),n=new V3(...f.n),exu=ex.clone().normalize(),eyu=ey.clone().normalize(),ok=new Uint8Array(nx*ny),cl=new Float32Array(nx*ny*3),e1=Math.abs(f.n[0])!=1,e2=Math.abs(f.n[1])==1,X1=D>0?D+(e2?.02:.01):0,tmp=new THREE.Color();
for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const k=(Math.floor((ry+(j+.5)/S)*s_)*W_+Math.floor((rx+((c.mirror?nx-1-i:i)+.5)/S)*s_))*4;if(d[k+3]>=128){const q=j*nx+i;ok[q]=1;tmp.setRGB(d[k]/255,d[k+1]/255,d[k+2]/255).convertSRGBToLinear();cl[q*3]=tmp.r;cl[q*3+1]=tmp.g;cl[q*3+2]=tmp.b}}
const no=n.clone().multiplyScalar(a1),ni=n.clone().multiplyScalar(a0),A=(p,v)=>p.clone().add(v),nex=exu.clone().negate(),ney=eyu.clone().negate(),nn=n.clone().negate(),z0=new V3(),ie=exu.clone().multiplyScalar(.01),ine=ie.clone().negate(),iy=eyu.clone().multiplyScalar(.01),iny=iy.clone().negate();
for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const q=j*nx+i;if(!ok[q])continue;const cc=[cl[q*3],cl[q*3+1],cl[q*3+2]];
const pt=(a,b)=>TL.clone().addScaledVector(ex,a).addScaledVector(ey,b),p00=pt(i,j),p10=pt(i+1,j),p11=pt(i+1,j+1),p01=pt(i,j+1),o00=pt(i,j),o10=pt(i+1,j),o11=pt(i+1,j+1),o01=pt(i,j+1);
const xl=e1&&X1>0&&i==0,xr=e1&&X1>0&&i==nx-1,yt=e2&&X1>0&&j==0,yb=e2&&X1>0&&j==ny-1;
if(xl){p00.addScaledVector(exu,-X1);p01.addScaledVector(exu,-X1)}if(xr){p10.addScaledVector(exu,X1);p11.addScaledVector(exu,X1)}if(yt){p00.addScaledVector(eyu,-X1);p10.addScaledVector(eyu,-X1)}if(yb){p01.addScaledVector(eyu,X1);p11.addScaledVector(eyu,X1)}
quad(A(p00,no),A(p10,no),A(p11,no),A(p01,no),n,cc);if(th2)quad(A(o00,ni),A(o10,ni),A(o11,ni),A(o01,ni),nn,cc);
if(a1>0){if(xl)quad(p00,p01,A(p01,no),A(p00,no),nex,cc);if(xr)quad(p10,p11,A(p11,no),A(p10,no),exu,cc);if(yt)quad(p00,p10,A(p10,no),A(p00,no),ney,cc);if(yb)quad(p01,p11,A(p11,no),A(p01,no),eyu,cc)}
const S4=(pa,pb,sh,nrm)=>quad(A(A(pa,sh),ni),A(A(pb,sh),ni),A(A(pb,sh),no),A(A(pa,sh),no),nrm,cc);
if(i>0?!ok[q-1]:true)S4(o00,o01,i>0?z0:ie,nex);
if(i<nx-1?!ok[q+1]:true)S4(o10,o11,i<nx-1?z0:ine,exu);
if(j>0?!ok[q-nx]:true)S4(o00,o10,j>0?z0:iy,ney);
if(j<ny-1?!ok[q+nx]:true)S4(o01,o11,j<ny-1?z0:iny,eyu)}})});
const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.setIndex(idx);return g}
function addMesh(b,cubes,im,o={}){const tw=o.tw||64,th=o.th||Math.round(64*im.height/im.width),s_=im.width/tw,p=b.userData.p;let par=b;
if(o.flip){par=new THREE.Group();b.add(par);par.rotation.y=Math.PI}
const og=c=>[c.origin[0],c.origin[1],-(c.origin[2]+c.size[2])];let m;const bd=bendOf(b);
if(o.vox){const vm=stdM({vertexColors:true,roughness:1,side:THREE.DoubleSide});vm.shadowSide=o.thk!=null?THREE.BackSide:THREE.FrontSide;if(o.arm)tagArm(vm);m=new THREE.Mesh(voxGeo(cubes.filter(c=>Array.isArray(c.uv)),im,o,og),vm)}
else{const pos=[],nor=[],uv=[],idx=[];
cubes.forEach(c=>{const v0=pos.length/3,arr=Array.isArray(c.uv);(arr?faces(og(c),c.size,c.uv,c.inflate||0,c.mirror):facesPF(og(c),c.size,c.uv,c.inflate||0)).forEach(f=>{const base=pos.length/3,[rx,ry,rw,rh]=f.r,fX=arr?!!c.mirror:(!!c.mirror)!==!!f.fx,fY=arr?false:!!f.fy,q=[[rx,ry],[rx+rw,ry],[rx+rw,ry+rh],[rx,ry+rh]],od=fX&&fY?[2,3,0,1]:fX?[1,0,3,2]:fY?[3,2,1,0]:[0,1,2,3],U=od.map(k=>{const t=q[k],e=.03;return[t[0]==rx?rx+e:rx+rw-e,t[1]==ry?ry+e:ry+rh-e]}),[TL,TR,BR,BL]=f.c,R_=bd&&f.n[1]==0?Math.max(4,Math.ceil(c.size[1]*2)):1;
for(let r=0;r<=R_;r++){const t=r/R_;for(let s2=0;s2<2;s2++){const A=s2?TR:TL,B=s2?BR:BL,ua=s2?U[1]:U[0],ub=s2?U[2]:U[3];pos.push(A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t);nor.push(...f.n);uv.push((ua[0]+(ub[0]-ua[0])*t)/tw,1-(ua[1]+(ub[1]-ua[1])*t)/th)}}
for(let r=0;r<R_;r++){const a=base+2*r,b2=a+1,c2=a+2,d2=a+3;f.rv?idx.push(a,b2,d2,a,d2,c2):idx.push(a,d2,b2,a,c2,d2)}});
if(c.rotation&&(c.rotation[0]||c.rotation[1]||c.rotation[2])){const pv=c.pivot||[0,0,0],P3=new V3(pv[0],pv[1],-pv[2]),M3=new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rad(c.rotation[0]),rad(c.rotation[1]),rad(c.rotation[2]),'ZYX')),vv=new V3();
for(let vi=v0;vi<pos.length/3;vi++){vv.set(pos[vi*3],pos[vi*3+1],pos[vi*3+2]).sub(P3).applyMatrix4(M3).add(P3);pos[vi*3]=vv.x;pos[vi*3+1]=vv.y;pos[vi*3+2]=vv.z;vv.set(nor[vi*3],nor[vi*3+1],nor[vi*3+2]).transformDirection(M3);nor[vi*3]=vv.x;nor[vi*3+1]=vv.y;nor[vi*3+2]=vv.z}}});
const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);
m=new THREE.Mesh(g,mkMat(T(im),o.ds,0,o.arm,o.mk));if(!o.arm&&!OV.has(b.name))m.material.shadowSide=THREE.BackSide}
m.castShadow=true;m.userData.key=o.key||b.userData.key;if(o.mp)[].concat(m.material).forEach(x=>tagM(x,o.mp));
if(bd){m.frustumCulled=false;m.userData.key=bd.u;m.userData.lo=bd.sl;m.userData.j=bd.j;regBend(m,bd);(o.ag||W).add(m)}else{m.position.set(-p[0],-p[1],-p[2]);m.frustumCulled=!m.isInstancedMesh;par.add(m)}}
function bld(defs,par,im,pre,o={}){const m={};
defs.forEach(d=>{const g=new THREE.Group();g.name=d.name;g.userData.p=[d.pivot[0],d.pivot[1],-d.pivot[2]];g.userData.key=pre+d.name;m[d.name]=g});
defs.forEach(d=>{const g=m[d.name],pa=m[d.parent]||par,a=g.userData.p,b=pa.userData.p;g.position.set(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
if(d.rotation)g.rotation.set(rad(d.rotation[0]),rad(d.rotation[1]),rad(d.rotation[2]),'ZYX');else g.rotation.order='ZYX';
g.userData.rp=g.position.clone();g.userData.rr=g.rotation.clone();pa.add(g);if(!o.noreg)ALL[pre+d.name]=g;g.userData.act=o.act;g.userData.pre=pre;
const cs=(d.cubes||[]).filter(c=>c.uv).map(c=>({origin:c.origin,size:c.size,uv:c.uv,inflate:c.inflate??d.inflate,mirror:c.mirror??d.mirror,pivot:c.pivot,rotation:c.rotation}));
if(cs.length)addMesh(g,cs,im,{vox:(o.ov&&o.ov.has(d.name)&&(o.l3!==undefined?o.l3:P.l3d))||o.vx,tw:o.tw,th:o.th,ds:o.ds,arm:o.arm,thk:(o.ov&&o.ov.has(d.name)&&o.l3)?P.dep:o.thk,lay:(o.ov&&o.ov.has(d.name)&&o.l3)?1:0,lx:d.name=='jacket'?.07:0,mp:o.mp,key:o.key,ag:o.ag,mk:o.mk})});return m}
function itemObj(im,vox,th,blk,kk){const g=new THREE.Group(),w=im.width,h=im.height;g.userData.g=[w*.375,h*.375];
if(blk){const t=PT(im),ms=[0,1,2,3,4,5].map(()=>{const m=stdM({map:t,alphaTest:.5,roughness:1,side:THREE.DoubleSide});m.shadowSide=THREE.FrontSide;tagM(m,ipar(kk),kk);return m});const m=new THREE.Mesh(new THREE.BoxGeometry(6.4,6.4,6.4),ms);m.castShadow=true;g.add(m);g.userData.blk=1;return g}
if(!vox){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),(()=>{const mt=mkMat(T(im),1);tagM(mt,ipar(kk),kk);return mt})());m.castShadow=true;g.add(m);return g}
const d=pix(im),L=[];for(let j=0;j<h;j++)for(let i=0;i<w;i++){const k=(j*w+i)*4;if(d[k+3]<128)continue;L.push([new THREE.Matrix4().compose(new V3(i+.5-w/2,h/2-j-.5,0),new THREE.Quaternion(),new V3(1,1,th)),new THREE.Color().setRGB(d[k]/255,d[k+1]/255,d[k+2]/255).convertSRGBToLinear()])}
const m=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),(()=>{const mt=stdM({roughness:1});mt.userData.mp=ipar(kk);if(!P.toon&&envNow())mt.envMap=envNow();return mt})(),L.length||1);L.forEach((a,i)=>{m.setMatrixAt(i,a[0]);m.setColorAt(i,a[1])});if(!L.length)m.count=0;m.frustumCulled=false;m.castShadow=true;g.add(m);return g}
