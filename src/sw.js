var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
 '/index.html',
 '/favicon.ico',
 '/assets/css/global.css',
 '/assets/js/vendor.js',
 '/assets/js/app.js',
 '/assets/js/template.js',
 '/assets/js/main.js'
];

self.addEventListener('install', function(event) {

  console.log('hello');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('fetch');
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            return response;
          }
        );
      })
    );
});
