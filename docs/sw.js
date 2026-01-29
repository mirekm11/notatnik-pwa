const CACHE_VERSION = "v1";
const CACHE_NAME = `notatnik-pwa-${CACHE_VERSION}`;

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./js/app.js",
  "./js/router.js",
  "./js/storage.js",
  "./js/utils/tts.js",
  "./js/utils/notifications.js",
  "./js/views/listView.js",
  "./js/views/editorView.js",
  "./js/views/detailView.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
  );
  //self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(
            (name) => name.startsWith("notatnik-pwa-") && name !== CACHE_NAME,
          )
          .map((name) => caches.delete(name)),
      );
    }),
  );

  //self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches
        .match(event.request)
        .then((res) => res || caches.match("./offline.html")),
    ),
  );
});
