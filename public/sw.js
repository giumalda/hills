const CACHE_NAME = 'ristorante-cache-v1';

// File statici da salvare subito in memoria
const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo-192.png',
  '/logo-512.png'
];

// Fase di installazione del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fase di recupero dati (Fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se il file è in cache, restituiscilo. Altrimenti scaricalo dalla rete.
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
