const staticCacheName = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/car.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
];
// install service worker
self.addEventListener('install', event => {
    //console.log('Service Worker has been installed!');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
        console.log('Caching shell assets');
        cache.addAll(assets);
    })
    ); 
});

// activate service worker
self.addEventListener('activate', event => {
    //console.log('Service Worker has been activated');
    event.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
});

// fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request).then(fetchResponse => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(event.request.url, fetchResponse.clone());
                    return fetchResponse;
                })
            })
        })
    )
});