var CACHE_NAME = 'dcard-mauricio-jun-ti-v01-13';
var urlsToCache = [
	'./',
	'./index.html',
	'./offline.html',
	'./404.html',
	'./favicon/android-chrome-512x512.png',
	'./favicon/android-chrome-192x192.png',
	'./css/all.css',
    './css/brands.css',
    './css/fontawesome.css',
    './css/modal.css',
	'./webfonts/fa-brands-400.eot',
	'./webfonts/fa-brands-400.svg',
	'./webfonts/fa-brands-400.ttf',
	'./webfonts/fa-brands-400.woff',
	'./webfonts/fa-brands-400.woff2',
	'./webfonts/fa-regular-400.eot',
	'./webfonts/fa-regular-400.svg',
	'./webfonts/fa-regular-400.ttf',
	'./webfonts/fa-regular-400.woff',
	'./webfonts/fa-regular-400.woff2',
	'./webfonts/fa-solid-900.eot',
	'./webfonts/fa-solid-900.svg',
	'./webfonts/fa-solid-900.ttf',
	'./webfonts/fa-solid-900.woff',
	'./webfonts/fa-solid-900.woff2',
	'./imgs/logo-mauricio-jun-ti-cartao-digital-puro-v01-01.png',
	'./imgs/mauricio-jun-clientes-mobile.png',
	'./imgs/mauricio-jun-dicas-mobile.png',
	'./imgs/mauricio-jun-logo-horizontal-projetos-web-branco-02-negativo.png',
	'./imgs/mauricio-jun-novidades-mobile.png',
	'./imgs/mauricio-jun-portfolio-mobile.png',
	'./imgs/mauricio-jun-sobre-mobile.png',
	'./imgs/mauricio-jun-ti-v02.png',
	'./imgs/mauricio-jun-ti-v03.png',
	'./imgs/mauricio-jun-ti-v04.png',
	'./imgs/mauricio-jun-ti-v05.gif',
	'./imgs/mauricio-jun-ti-v08.png',
	'./imgs/mauricio-jun-ti-v09.png',
	'./imgs/mauricio-jun-ti-v10.png',
	'./imgs/mauricio-jun-ti-v13.png',
	'./imgs/mauricio-jun-ti-v14.png',
	'./imgs/mauricio-jun-ti-v20.png',
	'./imgs/mauricio-jun-ti-e-logo-v08.png',
	'./imgs/mauricio-jun-ti-clientes-v13.png',
	'./imgs/mauricio-jun-ti-cartao-digital-mockup.png',
	'./imgs/mauricio-jun-ti-cartao-digital-modelo-01.png',
	'./imgs/mauricio-jun-ti-cartao-digital-modelo-02.png',
	'./imgs/mauricio-jun-ti-cartao-digital-modelo-03.png',
	'./imgs/mauricio-jun-ti-cartao-digital-modelo-04.png',
	'./imgs/mauricio-jun-ti-qrcode.png',
	'./imgs/mauricio-jun-ti-sobre-v02.png'
];
self.addEventListener('install', (event) => {
	event.waitUntil( // Ensures the service worker doesn't finish installing until all files are cached
		caches.open(CACHE_NAME)
		.then((cache) => {
			console.log('Opened cache');
			return cache.addAll(urlsToCache); // Attempts to cache all resources in one go
		})
		.catch((error) => {
			console.error('Failed to cache resources during install:', error);
			// If any single request fails, the entire transaction is rolled back and the worker installation fails
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('./404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('./offline.html');
		})
	);
});