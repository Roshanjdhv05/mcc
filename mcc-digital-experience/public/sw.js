const CACHE_NAME = 'mcc-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through fetch event for basic PWA installation requirements
  event.respondWith(
    fetch(event.request).catch(() => {
      // Basic offline fallback could go here
      return new Response('You are offline.');
    })
  );
});
