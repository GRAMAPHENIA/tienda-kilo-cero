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

self.addEventListener('fetch', event => {
  // Manejo básico de fetch con manejo de errores
  try {
    event.respondWith(fetch(event.request));
  } catch (error) {
    console.log('Service Worker: Error en fetch, pasando sin interceptar');
    // Si hay error, no interceptar la solicitud
  }
});