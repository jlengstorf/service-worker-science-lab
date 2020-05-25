const CACHE_NAME = 'boop';
const FILES = ['/offline.html'];

self.oninstall = function (event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES);
    })
  );
};

self.onfetch = function (event) {
  const request = event.request;

  if (request.method === 'GET') {
    event.respondWith(
      fetch(request)
        // turns out this is pretty hard
        // .then((response) => {
        //   console.log('response.body');
        //   console.log(response);

        //   return response;
        // })
        .catch(function () {
          return caches.open(CACHE_NAME).then(function (cache) {
            return cache.match('offline.html');
          });
        })
    );
  }
};
