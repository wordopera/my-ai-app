// File: public/service-worker.js
// August 16, 2024

const CACHE_NAME = 'ai-stack-cache-v1';

// Integrate the URLs from the old service worker with our default URLs
const DEFAULT_URLS_TO_CACHE = [
  '/',
  '/_next/static/css/app/layout.css', // Updated path
  '/_next/static/chunks/main-app.js', // Updated path
  '/logo.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
  // You can add more URLs here as needed
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(DEFAULT_URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(event.data.payload))
    );
  }
});

// Last line