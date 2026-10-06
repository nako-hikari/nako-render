function faces(o,s,u,inf,mir){const[x0,y0,z0]=o.map(v=>v-inf),x1=o[0]+s[0]+inf,y1=o[1]+s[1]+inf,z1=o[2]+s[2]+inf,[w,h,d]=s,[U,V]=u;
return[{n:[0,0,1],c:[[x0,y1,z1],[x1,y1,z1],[x1,y0,z1],[x0,y0,z1]],r:[U+d,V+d,w,h]},
{n:[0,0,-1],c:[[x1,y1,z0],[x0,y1,z0],[x0,y0,z0],[x1,y0,z0]],r:[U+2*d+w,V+d,w,h]},
{n:[-1,0,0],c:[[x0,y1,z0],[x0,y1,z1],[x0,y0,z1],[x0,y0,z0]],r:[mir?U+d+w:U,V+d,d,h]},
{n:[1,0,0],c:[[x1,y1,z1],[x1,y1,z0],[x1,y0,z0],[x1,y0,z1]],r:[mir?U:U+d+w,V+d,d,h]},
{n:[0,1,0],c:[[x0,y1,z0],[x1,y1,z0],[x1,y1,z1],[x0,y1,z1]],r:[U+d,V,w,d]},
{n:[0,-1,0],rv:1,c:[[x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1]],r:[U+d+w,V,w,d]}]}
function facesPF(o,s,uvo,inf){const F=faces(o,s,[0,0],inf,false),nm=['north','south','east','west','up','down'],out=[];F.forEach((f,i)=>{const e=uvo[nm[i]];if(!e||!e.uv)return;const sz=e.uv_size||[s[0],s[1]],w=sz[0],h=sz[1];out.push(Object.assign({},f,{r:[e.uv[0]+(w<0?w:0),e.uv[1]+(h<0?h:0),Math.abs(w),Math.abs(h)],fx:w<0,fy:h<0}))});return out}
