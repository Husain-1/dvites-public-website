(function (global) {
  "use strict";

  var STORAGE_KEY = "dvites_admin_key";
  var STORAGE_LOGIN_AT = "dvites_admin_login_at";
  var LOGIN_TTL_MS = 365 * 24 * 60 * 60 * 1000;
  var ROLE_LABEL = "Super Admin";

  function readStoredKey() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  }

  function readLoginAt() {
    try {
      return Number(localStorage.getItem(STORAGE_LOGIN_AT) || 0);
    } catch {
      return 0;
    }
  }

  function isLoginValid() {
    var key = readStoredKey();
    var loginAt = readLoginAt();
    if (!key || !loginAt) return false;
    if (Date.now() - loginAt > LOGIN_TTL_MS) {
      clearAdminSession();
      return false;
    }
    return true;
  }

  function getAdminKey() {
    if (!isLoginValid()) return "";
    return readStoredKey();
  }

  function setAdminKey(key) {
    try {
      localStorage.setItem(STORAGE_KEY, key);
      localStorage.setItem(STORAGE_LOGIN_AT, String(Date.now()));
    } catch {
      // ignore
    }
  }

  function clearAdminSession() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_LOGIN_AT);
    } catch {
      // ignore
    }
  }

  function handleUnauthorized() {
    clearAdminSession();
    global.location.reload();
  }

  function verifyAdminLogin(username, password) {
    return fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(function (response) {
        return response.text().then(function (text) {
          var data = null;
          try {
            data = text ? JSON.parse(text) : null;
          } catch (e) {
            data = null;
          }

          if (response.status === 404 || (text && text.trim().charAt(0) === "<")) {
            return {
              ok: false,
              error:
                "Admin login needs the Cloudflare API. Live Server cannot run /api routes. Stop Live Server and run: npm run dev",
            };
          }

          if (!response.ok || !data || !data.ok || !data.adminKey) {
            return {
              ok: false,
              error: (data && data.error) || "Invalid email or password.",
            };
          }
          return { ok: true, adminKey: data.adminKey };
        });
      })
      .catch(function () {
        return {
          ok: false,
          error:
            "Unable to reach the login API. Use npm run dev (Wrangler), not Live Server, for admin.",
        };
      });
  }

  function adminFetch(url, options) {
    options = options || {};
    var headers = Object.assign({}, options.headers || {}, {
      "X-Dvites-Admin-Key": getAdminKey(),
    });
    return fetch(url, Object.assign({}, options, { headers: headers })).then(function (response) {
      if (response.status === 401) {
        handleUnauthorized();
      }
      return response;
    });
  }

  function renderLoginForm(root) {
    root.innerHTML =
      '<div class="admin-auth">' +
        '<div class="admin-auth-card">' +
          '<h1>Dvites Admin</h1>' +
          '<p>Sign in with your admin credentials to access the <strong>' + ROLE_LABEL + '</strong> dashboard on this device for up to 365 days.</p>' +
          '<input class="admin-input" id="admin-email-input" type="text" inputmode="email" autocomplete="username" placeholder="Email or username" />' +
          '<input class="admin-input admin-auth-password" id="admin-password-input" type="password" autocomplete="current-password" placeholder="Password" />' +
          '<div style="margin-top:12px;display:flex;gap:10px;">' +
            '<button class="admin-btn admin-btn-primary" id="admin-login-submit" type="button">Sign in</button>' +
          '</div>' +
          '<p class="admin-status" id="admin-auth-status"></p>' +
        '</div>' +
      '</div>';

    var saveBtn = document.getElementById("admin-login-submit");
    var emailInput = document.getElementById("admin-email-input");
    var passwordInput = document.getElementById("admin-password-input");
    var status = document.getElementById("admin-auth-status");

    function submitLogin() {
      var username = (emailInput.value || "").trim();
      var password = passwordInput.value || "";
      if (!username || !password) {
        status.textContent = "Please enter your email and password.";
        return;
      }
      status.textContent = "Signing in…";
      saveBtn.disabled = true;
      verifyAdminLogin(username, password).then(function (result) {
        saveBtn.disabled = false;
        if (!result.ok) {
          status.textContent = result.error || "Invalid email or password.";
          return;
        }
        setAdminKey(result.adminKey);
        global.location.reload();
      });
    }

    saveBtn.addEventListener("click", submitLogin);
    passwordInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") submitLogin();
    });
    emailInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") passwordInput.focus();
    });
  }

  function ensureAuthShell(pageTitle, activeNav) {
    var root = document.getElementById("admin-root");
    if (!root) return;

    if (!isLoginValid()) {
      renderLoginForm(root);
      return false;
    }

    root.innerHTML =
      '<div class="admin-shell">' +
        '<div class="admin-drawer-overlay" id="admin-drawer-overlay" aria-hidden="true"></div>' +
        '<aside class="admin-sidebar" id="admin-sidebar">' +
          '<button class="admin-sidebar-close" id="admin-sidebar-close" type="button" aria-label="Close menu">×</button>' +
          '<div class="admin-brand">' +
            '<img src="/templates/curtains/assets/images/dvites-logo.png" alt="Dvites" />' +
            '<div><strong>Dvites Orders</strong><span>Admin dashboard</span><span class="admin-role-badge">' + ROLE_LABEL + '</span></div>' +
          '</div>' +
          '<nav class="admin-nav" id="admin-nav">' +
            '<a href="/admin/orders.html"' + (activeNav === "orders" ? ' class="is-active"' : "") + '>Orders</a>' +
            '<a href="/admin/analytics.html"' + (activeNav === "analytics" ? ' class="is-active"' : "") + '>Analytics</a>' +
            '<a href="/" target="_blank" rel="noopener">View Site</a>' +
          '</nav>' +
          '<div class="admin-sidebar-footer">' +
            '<button class="admin-btn" id="admin-logout" type="button">Sign out</button>' +
            '<button class="admin-btn admin-btn-success" id="admin-enable-push" type="button">Enable Order Notifications</button>' +
            '<p class="admin-status" id="admin-push-status"></p>' +
            '<div id="admin-sound-mount"></div>' +
          '</div>' +
        '</aside>' +
        '<main class="admin-main">' +
          '<header class="admin-mobile-header">' +
            '<button class="admin-menu-toggle" id="admin-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button>' +
            '<div class="admin-mobile-title-wrap">' +
              '<strong class="admin-mobile-title">' + pageTitle + '</strong>' +
              '<span class="admin-mobile-subtitle">Dvites Admin</span>' +
            '</div>' +
            '<span class="admin-role-pill admin-role-pill-mobile">' + ROLE_LABEL + '</span>' +
          '</header>' +
          '<div class="admin-topbar admin-desktop-topbar">' +
            '<div><h1 class="admin-title">' + pageTitle + '</h1><p class="admin-subtitle">Signed in as <strong>' + ROLE_LABEL + '</strong> on this device</p></div>' +
            '<div class="admin-actions" id="admin-top-actions"><span class="admin-role-pill">' + ROLE_LABEL + '</span></div>' +
          '</div>' +
          '<div id="admin-content"></div>' +
        '</main>' +
      '</div>';

    document.getElementById("admin-logout").addEventListener("click", function () {
      clearAdminSession();
      global.location.reload();
    });

    initMobileNav();
    initPushNotifications();
    initServiceWorkerUpdates();
    if (global.DvitesAdminSound) {
      global.DvitesAdminSound.init(adminFetch);
    }
    return true;
  }

  function initMobileNav() {
    var sidebar = document.getElementById("admin-sidebar");
    var overlay = document.getElementById("admin-drawer-overlay");
    var toggle = document.getElementById("admin-menu-toggle");
    var closeBtn = document.getElementById("admin-sidebar-close");
    if (!sidebar || !overlay || !toggle) return;

    function setDrawerOpen(open) {
      sidebar.classList.toggle("is-open", open);
      overlay.classList.toggle("is-visible", open);
      overlay.setAttribute("aria-hidden", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("admin-drawer-open", open);
    }

    function closeDrawer() {
      setDrawerOpen(false);
    }

    toggle.addEventListener("click", function () {
      setDrawerOpen(!sidebar.classList.contains("is-open"));
    });
    overlay.addEventListener("click", closeDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

    var nav = document.getElementById("admin-nav");
    if (nav) {
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          if (global.matchMedia("(max-width: 767px)").matches) closeDrawer();
        });
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeDrawer();
    });

    global.addEventListener("resize", function () {
      if (global.innerWidth >= 768) closeDrawer();
    });
  }

  function initServiceWorkerUpdates() {
    if (!("serviceWorker" in navigator)) return;

    var reloadBanner = null;
    var refreshing = false;

    function showReloadBanner() {
      if (reloadBanner || !navigator.serviceWorker.controller) return;
      reloadBanner = document.createElement("div");
      reloadBanner.className = "admin-sw-reload";
      reloadBanner.innerHTML =
        '<p>A new version of the admin app is ready.</p>' +
        '<button class="admin-btn admin-btn-primary" type="button" id="admin-sw-reload-btn">Reload App</button>';
      document.body.appendChild(reloadBanner);
      document.getElementById("admin-sw-reload-btn").addEventListener("click", function () {
        navigator.serviceWorker.getRegistration().then(function (registration) {
          if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
            return;
          }
          global.location.reload();
        });
      });
    }

    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (refreshing) return;
      refreshing = true;
      global.location.reload();
    });

    navigator.serviceWorker.register("/admin/service-worker.js", { scope: "/admin/" }).then(function (registration) {
      if (registration.waiting) showReloadBanner();

      registration.addEventListener("updatefound", function () {
        var worker = registration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", function () {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            showReloadBanner();
          }
        });
      });

      registration.update();
      global.setInterval(function () {
        registration.update();
      }, 60 * 60 * 1000);
    }).catch(function () {});
  }

  function registerAdminServiceWorker() {
    initServiceWorkerUpdates();
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

    function setPushStatus(text) {
      if (status) status.textContent = text;
    }

    function savePushSubscription() {
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
            setPushStatus("Order notifications enabled on this device.");
            button.textContent = "Notifications Active";
            return true;
          }
          throw new Error(result.error || "Unable to save subscription.");
        });
    }

    fetch("/api/push-subscribe")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.enabled) {
          setPushStatus("Push not configured on server yet.");
          button.disabled = true;
          return;
        }

        if (!("Notification" in global) || !("serviceWorker" in navigator)) {
          setPushStatus("Install as app on iPhone for push alerts (Add to Home Screen).");
          return;
        }

        if (Notification.permission === "granted") {
          savePushSubscription().catch(function () {
            setPushStatus("Tap below to re-enable order notifications.");
          });
        } else if (Notification.permission === "denied") {
          setPushStatus("Notifications blocked. Enable in browser settings.");
        }
      })
      .catch(function () {});

    button.addEventListener("click", function () {
      if (!("Notification" in global) || !("serviceWorker" in navigator)) {
        setPushStatus("Notifications are not supported on this device.");
        return;
      }

      Notification.requestPermission().then(function (permission) {
        if (permission !== "granted") {
          setPushStatus("Notification permission denied.");
          return;
        }
        savePushSubscription().catch(function (error) {
          setPushStatus(error.message || "Unable to enable notifications.");
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
    clearAdminSession: clearAdminSession,
    adminFetch: adminFetch,
    ensureAuthShell: ensureAuthShell,
    formatMoney: formatMoney,
    formatDate: formatDate,
    ROLE_LABEL: ROLE_LABEL,
  };
})(window);
