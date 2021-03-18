// install service worker
self.addEventListener('install', eventt => {
    console.log('Service Worker has been installed!');
});

// activate service worker
self.addEventListener('activate', eventt => {
    console.log('Service Worker has been activated');
});

// fetch event
self.addEventListener('fetch', event => {
    
});