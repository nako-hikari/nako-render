

const MJ='https://raw.githubusercontent.com/Mojang/bedrock-samples/main/resource_pack/',SKIN='https://raw.githubusercontent.com/nako-hikari/assets/main/skin/nako-maid.png',UI='https://raw.githubusercontent.com/nako-hikari/assets/main/ui/';
const $=s=>document.querySelector(s),V3=THREE.Vector3,rad=x=>x*Math.PI/180,cv=$('#c'),vw=$('#v');
const P={bm:0,bz:3,dep:.5,mir:0,snap:0,wsp:0,hand:0,fov:35,grid:1,pq:1,shade:1,az:35,el:50,key:1.1,kc:'#ffffff',amb:.5,fill:.3,skc:'#bfd8ff',self:1,gs:1,gop:.55,expo:1,bloom:0,bs:.25,br:.7,bt:.9,bsw:.5,bfo:.85,bmx:8,a3d:1,athk:.45,e3d:1,ethk:1,crop:0,slow:0,slowf:.2};
const mkArm=()=>({helmet:{mat:'diamond'},chest:{mat:'diamond'},legs:{mat:'diamond'},boots:{mat:'diamond'},elytra:{}}),mkIt=()=>({L:{blk:0,vox:1,th:1,sc:1,sx:1,sy:1,sz:1,px:0,py:0,pz:0,rx:45,ry:-90,rz:0},R:{blk:0,vox:1,th:1,sc:1,sx:1,sy:1,sz:1,px:0,py:0,pz:0,rx:45,ry:-90,rz:0}});
const MT=['leather','chain','iron','gold','diamond','netherite','turtle'];
let ALL={},ITM={},dirty=1,comp=null,bpass=null,dpass=null,lpass=null,cpass=null,EXPORTING=false,useProxy=false,useItem=false,selK='root',gen=0,tm,pre=null,tcT=0,md=null;
const AC=[{id:0,skin:{},off:0,slim:1,l3d:1,on:{},a:mkArm(),i:mkIt()}],LOCKA=new Set(),U=[],RD=[],inv=()=>{dirty=1};
const stdM=o=>new THREE.MeshStandardMaterial(o),tagArm=m=>{m.userData.arm=1},tagM=()=>{},applyMaps=()=>{},ipar=()=>({}),envNow=()=>null;

