// importScripts('/cache-polyfill.js');

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('airhorner')
    .then(cache => cache.addAll([
      '/',
      '/index.html',
      '/bundle.js',
      '/0.js',
      '/1.js',
      '/2.js',
      '/3.js'
    ])));
});
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then(response => response || fetch(event.request)));
});
