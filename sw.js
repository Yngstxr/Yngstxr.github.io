const CACHE_NAME = 'physcalc-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/prjamieizmer.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-128.png',
  '/icon-256.png',
  '/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});