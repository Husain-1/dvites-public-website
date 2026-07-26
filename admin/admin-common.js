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

  function ensureToastHost() {
    if (document.getElementById("admin-toast-host")) return;
    var host = document.createElement("div");
    host.id = "admin-toast-host";
    host.className = "admin-toast-host";
    host.setAttribute("aria-live", "polite");
    document.body.appendChild(host);
  }

  function showToast(message, variant) {
    ensureToastHost();
    var host = document.getElementById("admin-toast-host");
    var toast = document.createElement("div");
    toast.className = "admin-toast" + (variant === "error" ? " is-error" : "");
    toast.textContent = message;
    host.appendChild(toast);
    global.setTimeout(function () {
      toast.classList.add("is-out");
      global.setTimeout(function () { toast.remove(); }, 220);
    }, 3200);
  }

  function closeModal() {
    var backdrop = document.getElementById("admin-modal-backdrop");
    if (backdrop) backdrop.remove();
    document.body.classList.remove("admin-modal-open");
  }

  function openModal(title, bodyHtml, footerHtml) {
    closeModal();
    var backdrop = document.createElement("div");
    backdrop.id = "admin-modal-backdrop";
    backdrop.className = "admin-modal-backdrop";
    backdrop.innerHTML =
      '<div class="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">' +
        '<div class="admin-modal-head">' +
          '<h2 id="admin-modal-title">' + title + '</h2>' +
          '<button type="button" class="admin-modal-close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="admin-modal-body">' + bodyHtml + '</div>' +
        (footerHtml ? '<div class="admin-modal-foot">' + footerHtml + '</div>' : "") +
      '</div>';
    document.body.appendChild(backdrop);
    document.body.classList.add("admin-modal-open");
    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) closeModal();
    });
    var closeBtn = backdrop.querySelector(".admin-modal-close");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", function onKey(event) {
      if (event.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", onKey);
      }
    });
    return backdrop;
  }

  function confirmDialog(options) {
    options = options || {};
    return new Promise(function (resolve) {
      var foot =
        '<button type="button" class="admin-btn" id="admin-confirm-cancel">' + (options.cancelLabel || "Cancel") + '</button>' +
        '<button type="button" class="admin-btn admin-btn-danger" id="admin-confirm-ok">' + (options.confirmLabel || "Confirm") + '</button>';
      var modal = openModal(options.title || "Confirm", "<p>" + (options.message || "") + "</p>", foot);
      modal.querySelector("#admin-confirm-cancel").addEventListener("click", function () {
        closeModal();
        resolve(false);
      });
      modal.querySelector("#admin-confirm-ok").addEventListener("click", function () {
        closeModal();
        resolve(true);
      });
    });
  }

  function iconSvg(name) {
    if (name === "whatsapp") {
      return '<svg class="admin-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    }
    if (name === "mail") {
      return '<svg class="admin-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 2-8 5-8-5h16m0 12H4V8l8 5 8-5v10"/></svg>';
    }
    if (name === "trash") {
      return '<svg class="admin-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 3h6l1 2h4v2H4V5h4l1-2m1 6h2v9H10V9m4 0h2v9h-2V9M7 9h2v9H7V9z"/></svg>';
    }
    if (name === "more") {
      return '<svg class="admin-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>';
    }
    if (name === "bell") {
      return '<svg class="admin-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22m7-6v-5a7 7 0 0 0-14 0v5l-2 2v1h18v-1l-2-2z"/></svg>';
    }
    return "";
  }

  function renderLoadingPanel(message) {
    return '<div class="admin-panel admin-loading"><div class="admin-spinner" aria-hidden="true"></div><p class="admin-status">' + (message || "Loading…") + '</p></div>';
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
            '<a href="/admin/customers.html"' + (activeNav === "customers" ? ' class="is-active"' : "") + '>Customers</a>' +
            '<a href="/" target="_blank" rel="noopener">View Site</a>' +
          '</nav>' +
          '<div class="admin-sidebar-footer">' +
            '<button class="admin-btn admin-notify-compact" id="admin-notify-open" type="button">' +
              iconSvg("bell") + '<span>Notifications</span><strong id="admin-notify-badge">Active</strong>' +
            '</button>' +
            '<button class="admin-btn" id="admin-logout" type="button">Sign out</button>' +
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
            '<div class="admin-actions" id="admin-top-actions">' +
              '<button class="admin-btn admin-notify-compact admin-desktop-only" id="admin-notify-open-desktop" type="button">' +
                iconSvg("bell") + '<span>Notifications</span>' +
              '</button>' +
              '<span class="admin-role-pill">' + ROLE_LABEL + '</span>' +
            '</div>' +
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
    initNotificationSettingsModal();
    initServiceWorkerUpdates();
    if (global.DvitesAdminSound) {
      global.DvitesAdminSound.init(adminFetch);
    }
    return true;
  }

  function getPushDiagnostics() {
    var perm = "Notification" in global ? Notification.permission : "unsupported";
    var sw = "serviceWorker" in navigator ? "checking" : "unsupported";
    var sub = "—";
    var promise = Promise.resolve({ permission: perm, serviceWorker: sw, subscription: sub });
    if (!("serviceWorker" in navigator)) return promise;
    return navigator.serviceWorker.ready.then(function (reg) {
      sw = reg.active ? "Active" : "Inactive";
      return reg.pushManager.getSubscription();
    }).then(function (subscription) {
      sub = subscription ? "Active" : "Missing";
      return { permission: perm, serviceWorker: sw, subscription: sub };
    }).catch(function () {
      return { permission: perm, serviceWorker: "Error", subscription: "Unknown" };
    });
  }

  function initNotificationSettingsModal() {
    function openSettings() {
      var soundHtml = global.DvitesAdminSound ? global.DvitesAdminSound.settingsPanelHtml() : "";
      getPushDiagnostics().then(function (diag) {
        var body =
          '<section class="admin-modal-section">' +
            '<h3>Push notifications</h3>' +
            '<p class="admin-status" id="admin-push-status">Checking…</p>' +
            '<button class="admin-btn admin-btn-primary" id="admin-enable-push" type="button">Enable on this device</button>' +
            '<button class="admin-btn" id="admin-push-reregister" type="button">Re-register notifications</button>' +
            '<dl class="admin-diag-list">' +
              '<div><dt>Permission</dt><dd>' + diag.permission + '</dd></div>' +
              '<div><dt>Service worker</dt><dd>' + diag.serviceWorker + '</dd></div>' +
              '<div><dt>Subscription</dt><dd>' + diag.subscription + '</dd></div>' +
            '</dl>' +
          '</section>' +
          '<section class="admin-modal-section">' + soundHtml + '</section>';
        openModal("Notification settings", body, '<button type="button" class="admin-btn admin-btn-primary" id="admin-notify-done">Done</button>');
        var done = document.getElementById("admin-notify-done");
        if (done) done.addEventListener("click", closeModal);
        if (global.DvitesAdminSound) global.DvitesAdminSound.bindSettingsPanel();
        initPushNotifications(true);
      });
    }
    document.querySelectorAll("#admin-notify-open, #admin-notify-open-desktop").forEach(function (btn) {
      btn.addEventListener("click", openSettings);
    });
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

  function initPushNotifications(fromModal) {
    if (global.__dvitesPushInit && !fromModal) return;
    if (!fromModal) global.__dvitesPushInit = true;

    var button = document.getElementById("admin-enable-push");
    var status = document.getElementById("admin-push-status");
    var reregister = document.getElementById("admin-push-reregister");
    var badge = document.getElementById("admin-notify-badge");

    function setPushStatus(text) {
      if (status) status.textContent = text;
      if (badge && text) badge.textContent = text.indexOf("enabled") !== -1 || text.indexOf("Active") !== -1 ? "Active" : "Setup";
    }

    function savePushSubscription() {
      return adminFetch("/api/push-subscribe")
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
          return adminFetch("/api/push-subscribe", {
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
            if (button) button.textContent = "Notifications active";
            return true;
          }
          throw new Error(result.error || "Unable to save subscription.");
        });
    }

    adminFetch("/api/push-subscribe")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.enabled) {
          setPushStatus("Push not configured on server (VAPID keys).");
          if (button) button.disabled = true;
          return;
        }
        if (!("Notification" in global) || !("serviceWorker" in navigator)) {
          setPushStatus("Use Add to Home Screen on mobile for background alerts.");
          return;
        }
        if (Notification.permission === "granted") {
          savePushSubscription().catch(function () {
            setPushStatus("Tap Enable to register this device.");
          });
        } else if (Notification.permission === "denied") {
          setPushStatus("Notifications blocked in browser settings.");
        } else {
          setPushStatus("Tap Enable to allow order notifications.");
        }
      })
      .catch(function () {});

    if (button && !button.dataset.bound) {
      button.dataset.bound = "1";
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

    if (reregister && !reregister.dataset.bound) {
      reregister.dataset.bound = "1";
      reregister.addEventListener("click", function () {
        savePushSubscription()
          .then(function () { showToast("Push subscription updated."); })
          .catch(function (error) {
            showToast(error.message || "Could not re-register.", "error");
          });
      });
    }
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
    showToast: showToast,
    confirmDialog: confirmDialog,
    openModal: openModal,
    closeModal: closeModal,
    iconSvg: iconSvg,
    renderLoadingPanel: renderLoadingPanel,
    ROLE_LABEL: ROLE_LABEL,
  };
})(window);
