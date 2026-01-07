const CACHE_NAME = "notatnik-pwa-v4";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.webmanifest",
  "./css/styles.css",

  "./js/router.js",
  "./js/storage.js",
  "./js/app.js",

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
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches
        .match(event.request)
        .then((res) => res || caches.match("./offline.html"))
    )
  );
});
