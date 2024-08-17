// File: app/utils/register-sw.ts
// August 16, 2024

export function registerServiceWorker(additionalUrls: string[] = []) {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', async function() {
        try {
          const registration = await navigator.serviceWorker.register('/service-worker.js');
          console.log('Service Worker registered with scope:', registration.scope);
  
          if (registration.active && additionalUrls.length > 0) {
            registration.active.postMessage({
              type: 'CACHE_URLS',
              payload: additionalUrls
            });
          }
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      });
    }
  }
  
  // Last line