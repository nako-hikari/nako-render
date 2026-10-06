(function loop(){requestAnimationFrame(loop);if(EXPORTING)return;
if(useProxy&&!tc.dragging){const o=ALL[selK];if(o){o.updateWorldMatrix(true,false);proxy.position.setFromMatrixPosition(o.matrixWorld)}}
if(orbit.update())dirty=1;
if(dirty){dirty=0;bend();if(P.shade){fitShadows();R.shadowMap.needsUpdate=true}P.bloom&&comp?comp.render():R.render(scene,cam)}})();

