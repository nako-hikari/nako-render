const IC={},TC=new WeakMap(),PX=new WeakMap();
const img=u=>IC[u]||(IC[u]=new Promise((ok,no)=>{const i=new Image();i.crossOrigin='anonymous';i.onload=()=>ok(i);i.onerror=()=>{delete IC[u];no(0)};i.src=u}));
const res=p=>{p=p.trim();if(/^(https?:|blob:|data:)/.test(p))return p;p=p.replace(/^\/+/,'');if(!/^textures\//.test(p))p='textures/'+p;if(!/\.[a-z0-9]+$/i.test(p))p+='.png';return MJ+p};
const T=i=>TC.get(i)||(t=>{t.magFilter=t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;t.encoding=THREE.sRGBEncoding;t.needsUpdate=true;TC.set(i,t);return t})(new THREE.Texture(i));
const pix=i=>PX.get(i)||(c=>{c.width=i.width;c.height=i.height;const x=c.getContext('2d');x.drawImage(i,0,0);const d=x.getImageData(0,0,c.width,c.height).data;PX.set(i,d);return d})(document.createElement('canvas'));
const PTC=new WeakMap();const PT=i=>PTC.get(i)||(t=>{t.magFilter=t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;t.encoding=THREE.sRGBEncoding;if(i.height>i.width){t.repeat.set(1,i.width/i.height);t.offset.set(0,1-i.width/i.height)}t.needsUpdate=true;PTC.set(i,t);return t})(new THREE.Texture(i));
const mkMat=(t,ds,sb,arm,mk)=>{const m=stdM({map:t,alphaTest:.5,side:THREE.DoubleSide,roughness:1,metalness:0});m.shadowSide=THREE.FrontSide;if(arm)tagArm(m);if(mk)applyMaps(m,mk);return m};
function bad(){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle='#f0f';x.fillRect(0,0,64,64);x.fillStyle='#000';for(let i=0;i<64;i+=16)for(let j=0;j<64;j+=16)if((i+j)%32==0)x.fillRect(i,j,16,16);return c}
function capeTex(){const c=document.createElement('canvas');c.width=64;c.height=32;const x=c.getContext('2d');x.fillStyle='#a22';x.fillRect(0,0,64,32);x.fillStyle='#c33';x.fillRect(1,1,10,16);x.fillStyle='#fc3';x.fillRect(1,1,10,2);return c}
function legacy(im){const s=im.width/64,c=document.createElement('canvas');c.width=c.height=im.width;const x=c.getContext('2d');x.drawImage(im,0,0);
const f=(sx,sy,w,h,dx,dy)=>{x.save();x.translate((dx+w)*s,dy*s);x.scale(-1,1);x.drawImage(im,sx*s,sy*s,w*s,h*s,0,0,w*s,h*s);x.restore()};
[[0,16,16,48],[40,16,32,48]].forEach(([sx,sy,dx,dy])=>{f(sx+4,sy,4,4,dx+4,dy);f(sx+8,sy,4,4,dx+8,dy);f(sx,sy+4,4,12,dx+8,dy+4);f(sx+4,sy+4,4,12,dx+4,dy+4);f(sx+8,sy+4,4,12,dx,dy+4);f(sx+12,sy+4,4,12,dx+12,dy+4)});return c}
