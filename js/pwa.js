if('serviceWorker' in navigator){
  addEventListener('load',()=>{
    navigator.serviceWorker.register('sw.js').catch(e=>console.warn('Service worker registration failed',e));
  });
}
