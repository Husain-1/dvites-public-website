var ADMIN_CACHE = "dvites-admin-v1";
var ADMIN_SHELL = [
  "/admin/orders.html",
  "/admin/analytics.html",
  "/admin/admin.css",
  "/admin/admin-common.js",
  "/admin/orders.js",
  "/admin/analytics.js",
  "/admin/manifest.json",
  "/assets/favicon.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(ADMIN_CACHE).then(function (cache) {
      return cache.addAll(ADMIN_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== ADMIN_CACHE; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  var url = new URL(event.request.url);
  if (url.pathname.indexOf("/admin/") !== 0) return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var network = fetch(event.request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(ADMIN_CACHE).then(function (cache) {
            cache.put(event.request, copy);
          });
        }
        return response;
      });
      return cached || network;
    })
  );
});

self.addEventListener("push", function (event) {
  var payload = { title: "New Dvites Order", body: "A new order was received.", url: "/admin/orders.html" };
  if (event.data) {
    try {
      payload = Object.assign(payload, event.data.json());
    } catch {
      payload.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/assets/favicon.png",
      badge: "/assets/favicon.png",
      data: { url: payload.url || "/admin/orders.html" },
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var target = (event.notification.data && event.notification.data.url) || "/admin/orders.html";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i += 1) {
        if (list[i].url.indexOf("/admin/") !== -1 && "focus" in list[i]) {
          return list[i].focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});
