var ADMIN_CACHE = "dvites-admin-v4";

var ADMIN_PAGE_ROUTES = {
  "/admin": "/admin/orders.html",
  "/admin/orders": "/admin/orders.html",
  "/admin/analytics": "/admin/analytics.html",
};

var OFFLINE_HTML =
  "<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\" />" +
  "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
  "<title>Dvites Admin — Offline</title>" +
  "<style>body{font-family:system-ui,sans-serif;background:#12090d;color:#f7eef1;padding:24px}" +
  "button{padding:12px 16px;border-radius:10px;border:0;background:#8f1f3f;color:#fff;font-weight:600}</style>" +
  "</head><body><h1>Unable to load page</h1>" +
  "<p>Check your connection, then reload the admin app.</p>" +
  "<button type=\"button\" onclick=\"location.reload()\">Reload App</button></body></html>";

function resolveAdminPagePath(pathname) {
  var path = pathname.replace(/\/+$/, "") || "/admin";
  if (ADMIN_PAGE_ROUTES[pathname]) return ADMIN_PAGE_ROUTES[pathname];
  if (ADMIN_PAGE_ROUTES[path]) return ADMIN_PAGE_ROUTES[path];
  if (pathname === "/admin/orders.html" || pathname === "/admin/analytics.html") return pathname;
  return null;
}

function isApiRequest(url) {
  return url.pathname.indexOf("/api/") === 0;
}

function isAdminScope(url) {
  return url.pathname === "/admin" || url.pathname.indexOf("/admin/") === 0;
}

function isAdminNavigationRequest(request, url) {
  if (request.mode === "navigate") return true;
  if (request.destination === "document") return true;
  return !!resolveAdminPagePath(url.pathname);
}

function isCacheableAdminAsset(pathname) {
  return /\.(css|js|json|png|jpe?g|webp|ico|svg|woff2?)$/i.test(pathname);
}

function cacheOnSuccess(request, response) {
  if (!response || !response.ok || response.type !== "basic") return;
  var copy = response.clone();
  caches.open(ADMIN_CACHE).then(function (cache) {
    cache.put(request, copy);
  });
}

function offlinePageResponse() {
  return new Response(OFFLINE_HTML, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function readCachedPage(pageUrl, originalUrl) {
  return caches.open(ADMIN_CACHE).then(function (cache) {
    return cache.match(pageUrl).then(function (cached) {
      if (cached && cached.ok) return cached;
      return cache.match(originalUrl).then(function (alt) {
        if (alt && alt.ok) return alt;
        return offlinePageResponse();
      });
    });
  });
}

function networkFirstPage(request) {
  var url = new URL(request.url);
  var pagePath = resolveAdminPagePath(url.pathname);
  if (!pagePath) {
    return fetch(request).catch(function () { return offlinePageResponse(); });
  }

  var pageUrl = url.origin + pagePath + url.search;
  var pageRequest = new Request(pageUrl, { credentials: "same-origin" });

  return fetch(pageRequest).then(function (response) {
    if (response && response.ok) {
      cacheOnSuccess(pageRequest, response);
      if (pagePath !== url.pathname) {
        cacheOnSuccess(new Request(request.url), response.clone());
      }
      return response;
    }
    return readCachedPage(pageUrl, request.url);
  }).catch(function () {
    return readCachedPage(pageUrl, request.url);
  });
}

function networkFirstAsset(request) {
  return fetch(request).then(function (response) {
    if (response && response.ok) cacheOnSuccess(request, response);
    return response;
  }).catch(function () {
    return caches.match(request).then(function (cached) {
      if (cached && cached.ok) return cached;
      return Response.error();
    });
  });
}

function purgeBrokenCacheEntries() {
  return caches.open(ADMIN_CACHE).then(function (cache) {
    return cache.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        return cache.match(key).then(function (response) {
          if (!response || !response.ok) return cache.delete(key);
        });
      }));
    });
  });
}

self.addEventListener("install", function () {
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
    }).then(purgeBrokenCacheEntries).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  var url = new URL(event.request.url);
  if (!isAdminScope(url)) return;
  if (isApiRequest(url)) return;

  if (isAdminNavigationRequest(event.request, url)) {
    event.respondWith(networkFirstPage(event.request));
    return;
  }

  if (isCacheableAdminAsset(url.pathname)) {
    event.respondWith(networkFirstAsset(event.request));
  }
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
    Promise.all([
      self.registration.showNotification(payload.title, {
        body: payload.body,
        icon: "/assets/favicon.png",
        badge: "/assets/favicon.png",
        data: { url: payload.url || "/admin/orders.html" },
      }),
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
          return list[i].focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});
