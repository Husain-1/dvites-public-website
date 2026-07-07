(function (global) {
  "use strict";

  var STORAGE_KEY = "dvites_admin_key";

  function getAdminKey() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  }

  function setAdminKey(key) {
    try {
      sessionStorage.setItem(STORAGE_KEY, key);
    } catch {
      // ignore
    }
  }

  function clearAdminKey() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  function adminFetch(url, options) {
    options = options || {};
    var headers = Object.assign({}, options.headers || {}, {
      "X-Dvites-Admin-Key": getAdminKey(),
    });
    return fetch(url, Object.assign({}, options, { headers: headers }));
  }

  function ensureAuthShell(pageTitle, activeNav) {
    var root = document.getElementById("admin-root");
    if (!root) return;

    if (!getAdminKey()) {
      root.innerHTML =
        '<div class="admin-auth">' +
          '<div class="admin-auth-card">' +
            '<h1>Dvites Admin</h1>' +
            '<p>Enter your admin API key to access the dashboard.</p>' +
            '<input class="admin-input" id="admin-key-input" type="password" placeholder="Admin API key" />' +
            '<div style="margin-top:12px;display:flex;gap:10px;">' +
              '<button class="admin-btn admin-btn-primary" id="admin-key-save" type="button">Continue</button>' +
            '</div>' +
            '<p class="admin-status" id="admin-auth-status"></p>' +
          '</div>' +
        '</div>';

      var saveBtn = document.getElementById("admin-key-save");
      var input = document.getElementById("admin-key-input");
      var status = document.getElementById("admin-auth-status");
      saveBtn.addEventListener("click", function () {
        var value = (input.value || "").trim();
        if (!value) {
          status.textContent = "Please enter the admin key.";
          return;
        }
        setAdminKey(value);
        global.location.reload();
      });
      return false;
    }

    root.innerHTML =
      '<div class="admin-shell">' +
        '<aside class="admin-sidebar">' +
          '<div class="admin-brand">' +
            '<img src="/templates/curtains/assets/images/dvites-logo.png" alt="Dvites" />' +
            '<div><strong>Dvites Orders</strong><span>Admin dashboard</span></div>' +
          '</div>' +
          '<nav class="admin-nav">' +
            '<a href="/admin/orders.html"' + (activeNav === "orders" ? ' class="is-active"' : "") + '>Orders</a>' +
            '<a href="/admin/analytics.html"' + (activeNav === "analytics" ? ' class="is-active"' : "") + '>Analytics</a>' +
            '<a href="/" target="_blank" rel="noopener">View Site</a>' +
          '</nav>' +
          '<div style="margin-top:24px;">' +
            '<button class="admin-btn" id="admin-logout" type="button">Sign out</button>' +
            '<button class="admin-btn admin-btn-success" id="admin-enable-push" type="button" style="margin-top:10px;width:100%;">Enable Order Notifications</button>' +
            '<p class="admin-status" id="admin-push-status"></p>' +
          '</div>' +
        '</aside>' +
        '<main class="admin-main">' +
          '<div class="admin-topbar">' +
            '<div><h1 class="admin-title">' + pageTitle + '</h1><p class="admin-subtitle">Secure admin view for Dvites operations</p></div>' +
            '<div class="admin-actions" id="admin-top-actions"></div>' +
          '</div>' +
          '<div id="admin-content"></div>' +
        '</main>' +
      '</div>';

    document.getElementById("admin-logout").addEventListener("click", function () {
      clearAdminKey();
      global.location.reload();
    });

    initPushNotifications();
    registerAdminServiceWorker();
    return true;
  }

  function registerAdminServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/admin/service-worker.js", { scope: "/admin/" }).catch(function () {});
  }

  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    var raw = atob(base64);
    var output = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i += 1) output[i] = raw.charCodeAt(i);
    return output;
  }

  function initPushNotifications() {
    var button = document.getElementById("admin-enable-push");
    var status = document.getElementById("admin-push-status");
    if (!button) return;

    fetch("/api/push-subscribe")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.enabled) {
          status.textContent = "Push not configured on server yet.";
          button.disabled = true;
        }
      })
      .catch(function () {});

    button.addEventListener("click", function () {
      if (!("Notification" in global) || !("serviceWorker" in navigator)) {
        status.textContent = "Notifications are not supported on this device.";
        return;
      }

      Notification.requestPermission().then(function (permission) {
        if (permission !== "granted") {
          status.textContent = "Notification permission denied.";
          return;
        }

        return fetch("/api/push-subscribe")
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (!data.publicKey) throw new Error("VAPID public key missing.");
            return navigator.serviceWorker.ready.then(function (registration) {
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(data.publicKey),
              });
            });
          })
          .then(function (subscription) {
            var json = subscription.toJSON();
            return fetch("/api/push-subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                endpoint: json.endpoint,
                p256dh: json.keys.p256dh,
                auth: json.keys.auth,
                user_agent: navigator.userAgent,
              }),
            });
          })
          .then(function (res) { return res.json(); })
          .then(function (result) {
            if (result.ok) {
              status.textContent = "Order notifications enabled on this device.";
            } else {
              status.textContent = result.error || "Unable to save subscription.";
            }
          })
          .catch(function (error) {
            status.textContent = error.message || "Unable to enable notifications.";
          });
      });
    });
  }

  function formatMoney(value) {
    return "₹" + Number(value || 0).toLocaleString("en-IN");
  }

  function formatDate(value) {
    if (!value) return "—";
    try {
      return new Date(value).toLocaleString("en-IN");
    } catch {
      return value;
    }
  }

  global.DvitesAdmin = {
    getAdminKey: getAdminKey,
    setAdminKey: setAdminKey,
    adminFetch: adminFetch,
    ensureAuthShell: ensureAuthShell,
    formatMoney: formatMoney,
    formatDate: formatDate,
  };
})(window);
