const CACHE = 'mission-board-v1';
const FILES_TO_CACHE = [
  './',
  './mission-board-v2.html',
  './manifest.json',
  './assets/images/logo.png',
  './assets/images/favicon-32.png',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png'
];
// Install: cache the app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
