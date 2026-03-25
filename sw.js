var CACHE_NAME = 'dcard-mauricio-jun-ti-v01-01';
var urlsToCache = [
	'/mauricio-jun-ti/',
	'/mauricio-jun-ti/index.html',
	'/mauricio-jun-ti/offline.html',
	'/mauricio-jun-ti/404.html',
	'/mauricio-jun-ti/favicon/android-chrome-512x512.png',
	'/mauricio-jun-ti/favicon/android-icon-192x192.png',
	'/mauricio-jun-ti/css/all.css',
    '/mauricio-jun-ti/css/brands.css',
    '/mauricio-jun-ti/css/fontawesome.css',
    '/mauricio-jun-ti/css/modal.css',
	'/mauricio-jun-ti/webfonts/fa-brands-400.eot',
	'/mauricio-jun-ti/webfonts/fa-brands-400.svg',
	'/mauricio-jun-ti/webfonts/fa-brands-400.ttf',
	'/mauricio-jun-ti/webfonts/fa-brands-400.woff',
	'/mauricio-jun-ti/webfonts/fa-brands-400.woff2',
	'/mauricio-jun-ti/webfonts/fa-regular-400.eot',
	'/mauricio-jun-ti/webfonts/fa-regular-400.svg',
	'/mauricio-jun-ti/webfonts/fa-regular-400.ttf',
	'/mauricio-jun-ti/webfonts/fa-regular-400.woff',
	'/mauricio-jun-ti/webfonts/fa-regular-400.woff2',
	'/mauricio-jun-ti/webfonts/fa-solid-900.eot',
	'/mauricio-jun-ti/webfonts/fa-solid-900.svg',
	'/mauricio-jun-ti/webfonts/fa-solid-900.ttf',
	'/mauricio-jun-ti/webfonts/fa-solid-900.woff',
	'/mauricio-jun-ti/webfonts/fa-solid-900.woff2',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/mauricio-jun-ti/imgs/logo-mauricio-jun-ti-cartao-digital-puro-v01-01.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-clientes-mobile.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-dicas-mobile.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-logo-horizontal-projetos-web-branco-02-negativo.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-novidades-mobile.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-portfolio-mobile.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-sobre-mobile.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-v02.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-v03.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-v04.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-v05.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-v08.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-v09.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-v10.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-v13.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-v14.png',
	'/mauricio-jun-ti/imgs/mauricio-jun-ti-qrcode.png'
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
					return caches.match('/mauricio-jun-ti/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/mauricio-jun-ti/offline.html');
		})
	);
});