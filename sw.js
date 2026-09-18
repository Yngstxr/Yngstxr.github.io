const CACHE_NAME = 'physcalc-v1.01';
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
      if (cachedResponse) {
        return cachedResponse; // Отдаем из кэша, если есть
      }
      // Если файла нет в кэше, пытаемся загрузить из сети
      return fetch(e.request).catch(() => {
        // Если сети нет, предотвращаем выброс ошибки в консоль
        console.log('Запрос отклонен в офлайн-режиме:', e.request.url);
      });
    })
  );
});
