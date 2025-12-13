const CACHE_NAME = "notatnik-pwa-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./offline.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/router.js",
  "./js/storage.js",
  "./js/views/listView.js",
  "./js/views/editorView.js",
  "./js/views/detailView.js",
  "./js/utils/tts.js",
  "./js/utils/notifications.js",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", () => {
  console.log("Service Worker aktywny");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((response) => {
        return response || caches.match("./offline.html");
      })
    )
  );
});
