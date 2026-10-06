let BM=[];const TM=new THREE.Matrix4(),E_=new THREE.Matrix4(),A_=new THREE.Matrix4(),B_=new THREE.Matrix4();
const BEND={body:['chest','body',18,1,'waist','chest'],jacket:['chest','body',18,1,'waist','chest'],rightArm:['rightArm','rightForearm',18,0,'rightForearm'],rightSleeve:['rightArm','rightForearm',18,0,'rightForearm'],leftArm:['leftArm','leftForearm',18,0,'leftForearm'],leftSleeve:['leftArm','leftForearm',18,0,'leftForearm'],rightLeg:['rightLeg','rightShin',6,0,'rightShin'],rightPants:['rightLeg','rightShin',6,0,'rightShin'],leftLeg:['leftLeg','leftShin',6,0,'leftShin'],leftPants:['leftLeg','leftShin',6,0,'leftShin']};
function bendOf(b){const e=BEND[b.name],ac=b.userData.act;if(!P.bm||!e||ac===undefined||b.userData.pre!==ac)return null;return{u:ac+e[0],l:ac+e[1],j:e[2],b:P.bm==1?P.bz+e[3]:0,sl:e[4]?ac+e[4]:undefined,pv:e[5]?ac+e[5]:undefined}}
function regBend(m,bd){const j=bd.j,bz=bd.b,w=y=>{if(bz<=.001)return y>j?1:0;const t=Math.min(1,Math.max(0,(y-(j-bz))/(2*bz)));return t*t*(3-2*t)};
if(m.isInstancedMesh){const n=m.count,i0=new Float32Array(n*16),ws=new Float32Array(n);for(let i=0;i<n;i++){m.getMatrixAt(i,TM);TM.toArray(i0,i*16);ws[i]=w(TM.elements[13])}BM.push({m,u:bd.u,l:bd.l,pv:bd.pv||bd.l,i0,ws})}
else{const pa=m.geometry.attributes.position,n=pa.count,ws=new Float32Array(n);for(let i=0;i<n;i++)ws[i]=w(pa.array[i*3+1]);pa.setUsage(THREE.DynamicDrawUsage);BM.push({m,u:bd.u,l:bd.l,pv:bd.pv||bd.l,p0:pa.array.slice(),n0:m.geometry.attributes.normal.array.slice(),ws})}}
const Q_=new THREE.Quaternion(),D_=new THREE.Matrix4(),R3=new Float32Array(12);
function bend(){if(!BM.length)return;W.updateMatrixWorld(true);const RF=new Map();
BM.forEach(b=>{const par=b.m.parent;let rf=RF.get(par);if(!rf){const Pw=par.matrixWorld.clone();rf={Pw,Pwi:Pw.clone().invert(),C:{}};RF.set(par,rf)}
const cm=k=>rf.C[k]||(rf.C[k]=rf.Pwi.clone().multiply(ALL[k].matrixWorld).multiply(ALL[k].userData.rwi).multiply(rf.Pw));
const cu=cm(b.u),cl=cm(b.l),ue=cu.elements,le=cl.elements;let ch=!b.last;if(!ch)for(let i=0;i<16;i++)if(Math.abs(ue[i]-b.last[i])>1e-6||Math.abs(le[i]-b.last[16+i])>1e-6){ch=true;break}if(!ch)return;b.last=new Float32Array(32);b.last.set(ue);b.last.set(le,16);
D_.copy(cu).invert().multiply(cl);Q_.setFromRotationMatrix(D_);if(Q_.w<0)Q_.set(-Q_.x,-Q_.y,-Q_.z,-Q_.w);
const wq=Math.min(1,Q_.w),ang=2*Math.acos(wq),sn=Math.sqrt(1-wq*wq),ax=sn>1e-5?Q_.x/sn:1,ay=sn>1e-5?Q_.y/sn:0,az=sn>1e-5?Q_.z/sn:0,de=D_.elements,e=new V3().setFromMatrixPosition(rf.Pwi.clone().multiply(ALL[b.pv].userData.rw));
const ex=de[12]-(e.x-(de[0]*e.x+de[4]*e.y+de[8]*e.z)),ey=de[13]-(e.y-(de[1]*e.x+de[5]*e.y+de[9]*e.z)),ez=de[14]-(e.z-(de[2]*e.x+de[6]*e.y+de[10]*e.z)),o=R3;
let dtL=-9;const rig=P.bm==2,phi=2*Math.atan2(Q_.x,Q_.w),pzz=e.z,cR=Math.cos(phi),sR=Math.sin(phi),outS=phi<0?-1:1,zc=2*outS,Dy=zc*sR,Dz=zc*(1-cR);
const dt=wl=>{if(wl===dtL)return;dtL=wl;if(rig){if(wl<.5){o[0]=1;o[1]=0;o[2]=0;o[3]=0;o[4]=1;o[5]=0;o[6]=0;o[7]=0;o[8]=1;o[9]=0;o[10]=0;o[11]=0}else{o[0]=1;o[1]=0;o[2]=0;o[3]=0;o[4]=cR;o[5]=-sR;o[6]=0;o[7]=sR;o[8]=cR;o[9]=0;o[10]=e.y-(cR*e.y-sR*pzz);o[11]=pzz-(sR*e.y+cR*pzz)}return}
const ph=ang*wl,c=Math.cos(ph),s=Math.sin(ph),K=1-c;o[0]=c+ax*ax*K;o[1]=ax*ay*K-az*s;o[2]=ax*az*K+ay*s;o[3]=ay*ax*K+az*s;o[4]=c+ay*ay*K;o[5]=ay*az*K-ax*s;o[6]=az*ax*K-ay*s;o[7]=az*ay*K+ax*s;o[8]=c+az*az*K;
o[9]=e.x-(o[0]*e.x+o[1]*e.y+o[2]*e.z)+wl*ex;o[10]=e.y-(o[3]*e.x+o[4]*e.y+o[5]*e.z)+wl*ey;o[11]=e.z-(o[6]*e.x+o[7]*e.y+o[8]*e.z)+wl*ez};
if(b.i0){const n=b.m.count;for(let i=0;i<n;i++){dt(1-b.ws[i]);E_.set(o[0],o[1],o[2],o[9],o[3],o[4],o[5],o[10],o[6],o[7],o[8],o[11],0,0,0,1);A_.fromArray(b.i0,i*16);B_.multiplyMatrices(E_,A_);B_.premultiply(cu);b.m.setMatrixAt(i,B_)}b.m.instanceMatrix.needsUpdate=true}
else{const g=b.m.geometry,pa=g.attributes.position.array,na=g.attributes.normal.array,n=b.ws.length;for(let i=0,k=0;i<n;i++,k+=3){dt(1-b.ws[i]);const x=b.p0[k],y=b.p0[k+1],z=b.p0[k+2];let X=o[0]*x+o[1]*y+o[2]*z+o[9],Y=o[3]*x+o[4]*y+o[5]*z+o[10],Z=o[6]*x+o[7]*y+o[8]*z+o[11];if(rig&&b.ws[i]<.5){const ow=Math.min(1,Math.max(0,(z-e.z)*outS/2))*Math.max(0,1-(e.y-y)/3);Y+=ow*Dy;Z+=ow*Dz}
pa[k]=ue[0]*X+ue[4]*Y+ue[8]*Z+ue[12];pa[k+1]=ue[1]*X+ue[5]*Y+ue[9]*Z+ue[13];pa[k+2]=ue[2]*X+ue[6]*Y+ue[10]*Z+ue[14];
const mx=b.n0[k],my=b.n0[k+1],mz=b.n0[k+2],NX=o[0]*mx+o[1]*my+o[2]*mz,NY=o[3]*mx+o[4]*my+o[5]*mz,NZ=o[6]*mx+o[7]*my+o[8]*mz,
px=ue[0]*NX+ue[4]*NY+ue[8]*NZ,py=ue[1]*NX+ue[5]*NY+ue[9]*NZ,pz=ue[2]*NX+ue[6]*NY+ue[10]*NZ,L=Math.hypot(px,py,pz)||1;na[k]=px/L;na[k+1]=py/L;na[k+2]=pz/L}
g.attributes.position.needsUpdate=g.attributes.normal.needsUpdate=true}})}
