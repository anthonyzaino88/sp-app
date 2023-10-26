// Define the cache name and resources to cache
const cacheName = 'my-pwa-cache-v9';
const cacheResources = [
  '/sp-app/',
  '/sp-app/index.html',
  '/sp-app/assets/icons/',
  '/sp-app/assets/images/',
  '/sp-app/assets/css/',
  '/sp-app/components/',
  '/sp-app/data/',
  '/sp-app/js/',
  '/sp-app/pages/',
  '/sp-app/globleStyles.css'

  // Add more resources to cache here
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
