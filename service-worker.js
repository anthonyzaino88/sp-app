// Define the cache name and resources to cache
const cacheName = 'my-pwa-cache-v1';
const cacheResources = [
  '/',
  '../index.html',
  '../assets/icons/',
  '../assets/images/',
  '../assets/css/',
  '../components/',
  '../data/',
  '../js/',
  '../pages/',
  '../globleStyles.css'

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
