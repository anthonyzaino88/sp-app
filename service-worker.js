// Define the cache name and resources to cache
const cacheName = 'my-pwa-cache-updated-v3';
const cacheResources = [
  '/sp-app/',
  '/sp-app/index.html',
  '/sp-app/assets/icons/icon.png',
  '/sp-app/assets/icons/favicon.png',
  '/sp-app/assets/icons/icon-v2.png',
  '/sp-app/assets/icons/icon-v3.png',
  '/sp-app/assets/icons/icon-v4.png',
  '/sp-app/assets/icons/icon-v6.png',
  '/sp-app/assets/images/fan-solid.svg',
  '/sp-app/assets/images/fan-white.svg',
  '/sp-app/assets/images/file-pdf-file.svg',
  '/sp-app/assets/images/home.svg',
  '/sp-app/assets/images/library.svg',
  '/sp-app/assets/images/links-nav.svg',
  '/sp-app/assets/images/links.svg',
  '/sp-app/assets/images/Losone-Select-Ceiling.webp',
  '/sp-app/assets/images/return-back-button.svg',
  '/sp-app/assets/images/right-left-solid.svg',
  '/sp-app/assets/images/right-left-white.svg',
  '/sp-app/assets/images/search-icon.svg',
   '/sp-app/assets/images/solidplay-white.svg',
  '/sp-app/assets/css/styles.css',
  '/sp-app/assets/css/cross-ref-style.css',
  '/sp-app/assets/css/library-styles.css',
  '/sp-app/js/main.js',
  '/sp-app/js/search.js',
  '/sp-app/pages/cross-ref.html',
  '/sp-app/pages/library.html',
  '/sp-app/pages/products.html',
  '/sp-app/data/competitors.json',
  '/sp-app/data/cross-reference.json',
  '/sp-app/data/documents.json',
  '/sp-app/data/products.json',
  '/sp-app/components/cross-reference-table.js',
  '/sp-app/components/document-viewer.js',
  '/sp-app/components/navbar.js',
  '/sp-app/components/product-list.js'


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
