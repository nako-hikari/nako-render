const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,logarithmicDepthBuffer:true,powerPreference:'high-performance'});
R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.LinearToneMapping;R.shadowMap.enabled=true;R.shadowMap.autoUpdate=false;R.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(35,1,.1,200);cam.position.set(1.6,1.4,3.6);
const orbit=new THREE.OrbitControls(cam,cv);orbit.target.set(0,1,0);orbit.enableDamping=false;orbit.addEventListener('change',inv);
const tc=new THREE.TransformControls(cam,cv);tc.setSize(1.15);scene.add(tc);

try{const gz=tc._gizmo;['picker','gizmo'].forEach(k=>{[gz[k].rotate,gz[k].translate].forEach((g,gi)=>{[...g.children].forEach(c=>{if(gi==0?(c.name=='E'||c.name=='XYZE'):(['XY','YZ','XZ','XYZ'].includes(c.name)))g.remove(c)})})});
gz.picker.rotate.children.forEach(c=>{const ax=c.name;if(!/^[XYZ]$/.test(ax))return;const pa=c.geometry.attributes.position;for(let i=0;i<pa.count;i++){const v=new THREE.Vector3(pa.getX(i),pa.getY(i),pa.getZ(i)),q=v.clone();if(ax=='X')q.x=0;else if(ax=='Y')q.y=0;else q.z=0;q.normalize();v.sub(q).multiplyScalar(3).add(q);pa.setXYZ(i,v.x,v.y,v.z)}pa.needsUpdate=true});
gz.picker.translate.children.forEach(c=>{const ax=c.name;if(!/^[XYZ]$/.test(ax))return;const pa=c.geometry.attributes.position;for(let i=0;i<pa.count;i++){let x=pa.getX(i),y=pa.getY(i),z=pa.getZ(i);if(ax=='X'){y*=2.6;z*=2.6}else if(ax=='Y'){x*=2.6;z*=2.6}else{x*=2.6;y*=2.6}pa.setXYZ(i,x,y,z)}pa.needsUpdate=true})}catch(e){}


tc.addEventListener('change',inv);tc.addEventListener('dragging-changed',e=>{orbit.enabled=!e.value;tcT=performance.now()});
const amb=new THREE.AmbientLight(0xffffff,1),key=new THREE.DirectionalLight(0xffffff,0),fill=new THREE.DirectionalLight(0xbfd8ff,0),proxy=new THREE.Object3D();
const MS=innerWidth<900?2048:4096;
key.castShadow=true;key.shadow.mapSize.set(MS,MS);key.shadow.bias=-.0006;key.shadow.normalBias=.004;key.target.position.set(0,1,0);fill.target.position.set(0,1,0);
scene.add(amb,key,key.target,fill,fill.target,proxy);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(120,120),new THREE.ShadowMaterial({opacity:.55}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;ground.material.depthWrite=false;scene.add(ground);
const grid=new THREE.GridHelper(8,16,0x666677,0x444455);grid.position.y=.001;scene.add(grid);
const W=new THREE.Group();W.scale.setScalar(1/16);W.userData.p=[0,0,0];scene.add(W);

function ensureComp(){if(comp)return true;if(!THREE.EffectComposer||!THREE.UnrealBloomPass){st('Bloom scripts failed to load');P.bloom=0;return false}
const hf=!!(R.capabilities.isWebGL2&&R.extensions.has('EXT_color_buffer_float')),ro={format:THREE.RGBAFormat,type:hf?THREE.HalfFloatType:THREE.UnsignedByteType};let rt;try{rt=new THREE.WebGLMultisampleRenderTarget(2,2,ro)}catch(e){rt=new THREE.WebGLRenderTarget(2,2,ro)}
comp=new THREE.EffectComposer(R,rt);comp.addPass(new THREE.RenderPass(scene,cam));comp.addPass(cpass=new THREE.ShaderPass({uniforms:{tDiffuse:{value:null},mx:{value:8}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform sampler2D tDiffuse;uniform float mx;varying vec2 vUv;void main(){vec4 t=texture2D(tDiffuse,vUv);vec3 c=t.rgb;if(!(c.r==c.r&&c.g==c.g&&c.b==c.b))c=vec3(0.0);c=min(max(c,vec3(0.0)),vec3(mx));gl_FragColor=vec4(c,t.a);}'}));bpass=new THREE.UnrealBloomPass(new THREE.Vector2(256,256),P.bs,P.br,P.bt);comp.addPass(bpass);if(hf)[bpass.renderTargetBright,...bpass.renderTargetsHorizontal,...bpass.renderTargetsVertical].forEach(t=>{t.texture.type=THREE.HalfFloatType;t.dispose()});
comp.addPass(lpass=new THREE.ShaderPass({uniforms:{tDiffuse:{value:null},k:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform sampler2D tDiffuse;uniform float k;varying vec2 vUv;void main(){vec2 c=vUv-0.5;float r2=dot(c,c);vec2 uv=0.5+c*(1.0+k*r2)/(1.0+k*0.5);gl_FragColor=texture2D(tDiffuse,uv);}'}));lpass.enabled=false;
comp.addPass(dpass=new THREE.ShaderPass({uniforms:{tDiffuse:{value:null},dither:{value:1},gain:{value:1}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform sampler2D tDiffuse;uniform float dither;uniform float gain;varying vec2 vUv;float rnd(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}void main(){vec4 t=texture2D(tDiffuse,vUv);vec3 l=max(t.rgb,0.0);vec3 c=mix(l*12.92,1.055*pow(l,vec3(1.0/2.4))-0.055,step(0.0031308,l));c+=(rnd(gl_FragCoord.xy)-0.5)/255.0*dither;gl_FragColor=vec4(clamp(c*gain,0.0,1.0),t.a);}'}));rsz();return true}
