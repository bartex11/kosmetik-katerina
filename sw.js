
var CACHE_NAME = 'katerina-kosmetik';
var urlsToCache = [
    '/index.html',
    '/404.html',
    '/gesichtskosmetik.html',
    '/onetec.html',
    '/koerperbehandlungen.html',
    '/ultraschalkavitation.html',
    '/enthaarungen.html',
    '/manikuere.html',
    '/pedikuere.html',
    '/preise.html',
    '/angebote.html',
    '/studio.html',
    '/manikuere-galerie.html',
    '/contact.html'
    
];


self.addEventListener('install', function(event) {
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
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
