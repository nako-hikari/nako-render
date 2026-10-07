const PG=[{name:'root',pivot:[0,0,0]},{name:'waist',parent:'root',pivot:[0,12,0]},
{name:'body',parent:'waist',pivot:[0,24,0],cubes:[{origin:[-4,12,-2],size:[8,12,4],uv:[16,16]}]},
{name:'chest',parent:'body',pivot:[0,18,0]},{name:'head',parent:'chest',pivot:[0,24,0],cubes:[{origin:[-4,24,-4],size:[8,8,8],uv:[0,0]}]},
{name:'cape',parent:'chest',pivot:[0,24,3]},
{name:'hat',parent:'head',pivot:[0,24,0],cubes:[{origin:[-4,24,-4],size:[8,8,8],uv:[32,0],inflate:.5}]},
{name:'leftArm',parent:'chest',pivot:[5,22,0],cubes:[{origin:[4,12,-2],size:[4,12,4],uv:[32,48]}]},
{name:'leftSleeve',parent:'leftArm',pivot:[5,22,0],cubes:[{origin:[4,12,-2],size:[4,12,4],uv:[48,48],inflate:.27}]},
{name:'leftForearm',parent:'leftArm',pivot:[6,18,0]},{name:'leftItem',parent:'leftForearm',pivot:[6,15,1]},{name:'leftShin',parent:'leftLeg',pivot:[1.9,6,0]},
{name:'rightArm',parent:'chest',pivot:[-5,22,0],cubes:[{origin:[-8,12,-2],size:[4,12,4],uv:[40,16]}]},
{name:'rightSleeve',parent:'rightArm',pivot:[-5,22,0],cubes:[{origin:[-8,12,-2],size:[4,12,4],uv:[40,32],inflate:.27}]},
{name:'rightForearm',parent:'rightArm',pivot:[-6,18,0]},{name:'rightItem',parent:'rightForearm',pivot:[-6,15,1]},{name:'rightShin',parent:'rightLeg',pivot:[-1.9,6,0]},
{name:'leftLeg',parent:'root',pivot:[1.9,12,0],cubes:[{origin:[-.1,0,-2],size:[4,12,4],uv:[16,48],inflate:.01}]},
{name:'leftPants',parent:'leftLeg',pivot:[1.9,12,0],cubes:[{origin:[-.1,0,-2],size:[4,12,4],uv:[0,48],inflate:.26}]},
{name:'rightLeg',parent:'root',pivot:[-1.9,12,0],cubes:[{origin:[-3.9,0,-2],size:[4,12,4],uv:[0,16]}]},
{name:'rightPants',parent:'rightLeg',pivot:[-1.9,12,0],cubes:[{origin:[-3.9,0,-2],size:[4,12,4],uv:[0,32],inflate:.25}]},
{name:'jacket',parent:'body',pivot:[0,24,0],cubes:[{origin:[-4,12,-2],size:[8,12,4],uv:[16,32],inflate:.26}]}];
const OV=new Set(['hat','jacket','leftSleeve','rightSleeve','leftPants','rightPants']),OVP={hat:'head',leftSleeve:'leftArm',rightSleeve:'rightArm',leftPants:'leftLeg',rightPants:'rightLeg',jacket:'waist',body:'waist'};
const cb=(o,s,u)=>({origin:o,size:s,uv:u}),bdy=cb([-4,12,-2],[8,12,4],[16,16]),rA=cb([-8,12,-2],[4,12,4],[40,16]),lA=cb([4,12,-2],[4,12,4],[40,16]),rL=cb([-3.9,0,-2],[4,12,4],[0,16]),lL=cb([-.1,0,-2],[4,12,4],[0,16]);
const DEFA={helmet:{w:64,h:32,b:[{name:'head',inflate:1,cubes:[cb([-4,24,-4],[8,8,8],[0,0])]},{name:'hat',inflate:1.5,cubes:[cb([-4,24,-4],[8,8,8],[32,0])]}]},
chest:{w:64,h:32,b:[{name:'body',inflate:1.01,cubes:[bdy]},{name:'rightArm',inflate:1,cubes:[rA]},{name:'leftArm',inflate:1,mirror:true,cubes:[lA]}]},
legs:{w:64,h:32,b:[{name:'body',inflate:.5,cubes:[bdy]},{name:'rightLeg',inflate:.5,cubes:[rL]},{name:'leftLeg',inflate:.5,mirror:true,cubes:[lL]}]},
boots:{w:64,h:32,b:[{name:'rightLeg',inflate:1,cubes:[rL]},{name:'leftLeg',inflate:1,mirror:true,cubes:[lL]}]}};
const DEFE={b:[{name:'leftWing',parent:'body',pivot:[0,24,0],cubes:[{origin:[-10,0,0],size:[10,20,2],uv:[22,0]}]},{name:'rightWing',parent:'body',pivot:[0,24,0],mirror:true,cubes:[{origin:[0,0,0],size:[10,20,2],uv:[22,0]}]}],w:64,h:32};

