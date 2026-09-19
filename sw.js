const CACHE_NAME = 'physcalc-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/prjamieizmer.html',
  '/manifest.json',
  '/index3.html',
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
      if (cachedResponse) {
        return cachedResponse; 
      }
      return fetch(e.request).catch(() => {
        console.log('Запрос отклонен в офлайн-режиме:', e.request.url);
      });
    })
  );
});
