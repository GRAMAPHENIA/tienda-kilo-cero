// Service Worker básico para evitar 404
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  // Forzar activación inmediata
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activado');
  // Tomar control de todas las páginas abiertas
  self.clients.claim();
});

// Service Worker básico para PWA - sin interferir con navegación
self.addEventListener('fetch', event => {
  // No interceptar navegaciones para evitar problemas de cache
  if (event.request.mode === 'navigate') {
    return; // Dejar que el navegador maneje las navegaciones normalmente
  }

  // Solo interceptar requests de recursos estáticos
  if (event.request.url.includes('/icons/') ||
      event.request.url.includes('/favicon') ||
      event.request.url.includes('.css') ||
      event.request.url.includes('.js')) {
    event.respondWith(fetch(event.request));
  }
});