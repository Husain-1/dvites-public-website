self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("push", function (event) {
  var payload = { title: "New Dvites Order 🎉", body: "A new order was received.", url: "/admin/orders.html" };
  if (event.data) {
    try {
      payload = Object.assign(payload, event.data.json());
    } catch {
      payload.body = event.data.text();
    }
  }

  var tag = payload.tag || "dvites-new-order";
  var options = {
    body: payload.body,
    icon: "/assets/favicon.png",
    badge: "/assets/favicon.png",
    tag: tag,
    renotify: true,
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200],
    data: {
      url: payload.url || "/admin/orders.html",
      order_id: payload.order_id || null,
    },
  };

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(payload.title, options),
      clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
        list.forEach(function (client) {
          client.postMessage({ type: "DVITES_NEW_ORDER", payload: payload });
        });
      }),
    ])
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var target = (event.notification.data && event.notification.data.url) || "/admin/orders.html";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i += 1) {
        if (list[i].url.indexOf("/admin/") !== -1 && "focus" in list[i]) {
          if ("navigate" in list[i]) {
            try { list[i].navigate(target); } catch (e) { /* ignore */ }
          }
          return list[i].focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});
