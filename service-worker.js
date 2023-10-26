// Define the cache name and resources to cache
const cacheName = 'my-pwa-cache-updated-v2';
const cacheResources = [
  '/sp-app/', // Root of your PWA
  '/sp-app/index.html', // HTML file
  '/sp-app/assets/icons/icon.png', // Icon path
  '/sp-app/assets/css/styles.css', // CSS path
  '/sp-app/js/main.js', // JavaScript path

];

// Install event: Cache resources when the service worker is installed
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(cacheResources);
      })
  );
});

// Fetch event: Serve cached resources if available, otherwise fetch from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});
