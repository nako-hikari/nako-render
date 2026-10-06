const VERSION = 'v1.2';
const CACHE = 'mc-poser-' + VERSION;

const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.png',
  './js/config.js',
  './js/model-data.js',
  './js/textures.js',
  './js/faces.js',
  './js/bend.js',
  './js/mesh-builder.js',
  './js/ui-panel.js',
  './js/renderer.js',
  './js/pose-helpers.js',
  './js/scene-refresh.js',
  './js/controls.js',
  './js/actors-ui.js',
  './js/export.js',
  './js/loop.js',
  './js/theme-modal.js',
  './js/layout.js',
  './js/scene-io.js',
  './js/main.js',
  './js/pwa.js'
];

const T = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/';
const MJ = 'https://raw.githubusercontent.com/Mojang/bedrock-samples/main/resource_pack/';
const NK = 'https://raw.githubusercontent.com/nako-hikari/assets/main/';
const MATS = ['leather', 'chain', 'iron', 'gold', 'diamond', 'netherite', 'turtle'];

const OPTIONAL = [
  '/css/nako.css',
  'https://cdn.jsdelivr.net/gh/nako-hikari/assets@main/css/nako.css',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  T + 'controls/OrbitControls.js',
  T + 'controls/TransformControls.js',
  T + 'shaders/CopyShader.js',
  T + 'shaders/LuminosityHighPassShader.js',
  T + 'shaders/GammaCorrectionShader.js',
  T + 'postprocessing/EffectComposer.js',
  T + 'postprocessing/RenderPass.js',
  T + 'postprocessing/ShaderPass.js',
  T + 'postprocessing/UnrealBloomPass.js',
  NK + 'skin/nako-maid.png',
  ...['chevron_up', 'eye_open', 'hand', 'home', 'lock', 'menu', 'mirror', 'move', 'redo', 'refresh', 'rotate',
      'undo', 'close', 'kofi_banner', 'kofi', 'github', 'youtube', 'tiktok', 'sun', 'moon'].map(n => NK + 'ui/' + n + '.png'),
  MJ + 'textures/items/diamond_sword.png',
  MJ + 'textures/blocks/stone.png',
  MJ + 'textures/models/armor/elytra.png',
  ...MATS.flatMap(m => [MJ + 'textures/models/armor/' + m + '_1.png', MJ + 'textures/models/armor/' + m + '_2.png'])
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    await Promise.allSettled(OPTIONAL.map(u => c.add(u)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('mc-poser-') && k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

const cacheable = r => r && (r.ok || r.type === 'opaque');

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      try {
        const r = await fetch(req);
        if (cacheable(r)) c.put(req, r.clone());
        return r;
      } catch (err) {
        const hit = await c.match(req, { ignoreSearch: true });
        if (hit) return hit;
        if (req.mode === 'navigate') {
          const home = await c.match('./index.html');
          if (home) return home;
        }
        throw err;
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req);
    const net = fetch(req).then(r => { if (cacheable(r)) c.put(req, r.clone()); return r; });
    if (hit) { net.catch(() => {}); return hit; }
    return net;
  })());
});
