const CACHE_NAME = "notatnik-pwa-v5";

const FILES_TO_CACHE = [
  "/notatnik-pwa/",
  "/notatnik-pwa/index.html",
  "/notatnik-pwa/offline.html",
  "/notatnik-pwa/manifest.webmanifest",
  "/notatnik-pwa/css/styles.css",

  "/notatnik-pwa/js/router.js",
  "/notatnik-pwa/js/storage.js",
  "/notatnik-pwa/js/app.js",

  "/notatnik-pwa/js/utils/tts.js",
  "/notatnik-pwa/js/utils/notifications.js",

  "/notatnik-pwa/js/views/listView.js",
  "/notatnik-pwa/js/views/editorView.js",
  "/notatnik-pwa/js/views/detailView.js",

  "/notatnik-pwa/icons/icon-192.png",
  "/notatnik-pwa/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("/notatnik-pwa/offline.html")
        )
      );
    })
  );
});
