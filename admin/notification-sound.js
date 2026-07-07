(function (global) {
  "use strict";

  var DEFAULT_SOUND = "/assets/notifications/new-order.mp3";
  var STORAGE_ENABLED = "dvites_notification_sound_enabled";
  var STORAGE_URL = "dvites_notification_sound_url";
  var STORAGE_VOLUME = "dvites_notification_sound_volume";

  var activeAudio = null;
  var autoplayBlocked = false;
  var unlockBound = false;
  var lastPlayedAt = 0;

  function readEnabled() {
    try {
      var value = localStorage.getItem(STORAGE_ENABLED);
      if (value === null) return true;
      return value === "1";
    } catch {
      return true;
    }
  }

  function readUrl() {
    try {
      return (localStorage.getItem(STORAGE_URL) || DEFAULT_SOUND).trim() || DEFAULT_SOUND;
    } catch {
      return DEFAULT_SOUND;
    }
  }

  function readVolume() {
    try {
      var value = parseFloat(localStorage.getItem(STORAGE_VOLUME));
      if (!Number.isFinite(value)) return 0.8;
      return Math.min(1, Math.max(0, value));
    } catch {
      return 0.8;
    }
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_ENABLED, settings.enabled ? "1" : "0");
      localStorage.setItem(STORAGE_URL, settings.url || DEFAULT_SOUND);
      localStorage.setItem(STORAGE_VOLUME, String(settings.volume));
    } catch {
      // ignore
    }
  }

  function getSettings() {
    return {
      enabled: readEnabled(),
      url: readUrl(),
      volume: readVolume(),
    };
  }

  function stopActiveSound() {
    if (!activeAudio) return;
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudio = null;
  }

  function showUnlockBanner() {
    if (document.getElementById("admin-sound-unlock")) return;
    var banner = document.createElement("div");
    banner.id = "admin-sound-unlock";
    banner.className = "admin-sound-unlock";
    banner.innerHTML =
      '<p>Click to enable notification sound in this browser.</p>' +
      '<button class="admin-btn admin-btn-primary" type="button" id="admin-sound-unlock-btn">Enable Sound</button>';
    document.body.appendChild(banner);
    if (!unlockBound) {
      unlockBound = true;
      banner.addEventListener("click", function (event) {
        if (event.target.closest("#admin-sound-unlock-btn") || event.target.id === "admin-sound-unlock-btn") {
          unlockSound().then(function (ok) {
            if (ok) hideUnlockBanner();
          });
        }
      });
    }
  }

  function hideUnlockBanner() {
    var banner = document.getElementById("admin-sound-unlock");
    if (banner) banner.remove();
    autoplayBlocked = false;
  }

  function playSound(forceTest) {
    var settings = getSettings();
    if (!forceTest && !settings.enabled) return Promise.resolve(false);

    stopActiveSound();

    var audio = new Audio(settings.url);
    audio.volume = settings.volume;
    audio.loop = false;
    activeAudio = audio;

    return audio.play().then(function () {
      autoplayBlocked = false;
      hideUnlockBanner();
      audio.addEventListener("ended", function () {
        if (activeAudio === audio) activeAudio = null;
      });
      return true;
    }).catch(function () {
      autoplayBlocked = true;
      showUnlockBanner();
      return false;
    });
  }

  function unlockSound() {
    return playSound(true);
  }

  function notifyNewOrder(meta) {
    if (!readEnabled()) return;
    var now = Date.now();
    if (now - lastPlayedAt < 3000) return;
    lastPlayedAt = now;
    playSound(false);
    if (meta && meta.template_name) {
      var status = document.getElementById("admin-push-status");
      if (status) {
        status.textContent = "New order: " + meta.template_name;
      }
    }
  }

  function settingsPanelHtml() {
    var settings = getSettings();
    return (
      '<div class="admin-sound-settings">' +
        '<h3 class="admin-sound-title">Notification Sound</h3>' +
        '<label class="admin-sound-row">' +
          '<input type="checkbox" id="admin-sound-enabled"' + (settings.enabled ? " checked" : "") + ' />' +
          '<span>Enable sound</span>' +
        '</label>' +
        '<label class="admin-sound-row admin-sound-label" for="admin-sound-url">Sound URL / path</label>' +
        '<input class="admin-input admin-sound-input" id="admin-sound-url" type="text" value="' + settings.url.replace(/"/g, "&quot;") + '" placeholder="/assets/notifications/new-order.mp3" />' +
        '<label class="admin-sound-row admin-sound-label" for="admin-sound-volume">Volume <span id="admin-sound-volume-value">' + Math.round(settings.volume * 100) + '%</span></label>' +
        '<input class="admin-sound-range" id="admin-sound-volume" type="range" min="0" max="100" step="5" value="' + Math.round(settings.volume * 100) + '" />' +
        '<button class="admin-btn admin-btn-primary admin-sound-test" id="admin-sound-test" type="button">Test Sound</button>' +
        '<p class="admin-status" id="admin-sound-status">Default: ' + DEFAULT_SOUND + '</p>' +
      '</div>'
    );
  }

  function bindSettingsPanel() {
    var enabled = document.getElementById("admin-sound-enabled");
    var url = document.getElementById("admin-sound-url");
    var volume = document.getElementById("admin-sound-volume");
    var volumeValue = document.getElementById("admin-sound-volume-value");
    var testBtn = document.getElementById("admin-sound-test");
    var status = document.getElementById("admin-sound-status");

    function persist() {
      saveSettings({
        enabled: !!(enabled && enabled.checked),
        url: (url && url.value.trim()) || DEFAULT_SOUND,
        volume: volume ? Number(volume.value) / 100 : readVolume(),
      });
    }

    if (enabled) enabled.addEventListener("change", persist);
    if (url) url.addEventListener("change", persist);
    if (volume) {
      volume.addEventListener("input", function () {
        if (volumeValue) volumeValue.textContent = volume.value + "%";
        persist();
      });
      volume.addEventListener("change", persist);
    }
    if (testBtn) {
      testBtn.addEventListener("click", function () {
        persist();
        playSound(true).then(function (ok) {
          if (status) {
            status.textContent = ok
              ? "Test sound played."
              : "Browser blocked autoplay. Click Enable Sound banner.";
          }
        });
      });
    }
  }

  function mountSettingsPanel() {
    var mount = document.getElementById("admin-sound-mount");
    if (!mount) return;
    mount.innerHTML = settingsPanelHtml();
    bindSettingsPanel();
  }

  var knownOrderIds = {};
  var pollingReady = false;
  var pollingTimer = null;

  function ingestOrders(orders, playSoundOnNew) {
    if (!Array.isArray(orders)) return false;
    var hasNew = false;

    orders.forEach(function (order) {
      if (!order || !order.id) return;
      if (!knownOrderIds[order.id]) {
        if (pollingReady && playSoundOnNew) hasNew = true;
        knownOrderIds[order.id] = true;
      }
    });

    if (!pollingReady) {
      pollingReady = true;
      return false;
    }

    if (hasNew) notifyNewOrder(orders[0]);
    return hasNew;
  }

  function pollOrders(adminFetch) {
    if (!adminFetch) return;
    adminFetch("/api/orders?range=today")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.error) return;
        ingestOrders(data.orders || [], true);
      })
      .catch(function () {});
  }

  function startOrderPolling(adminFetch) {
    if (pollingTimer) return;
    pollOrders(adminFetch);
    pollingTimer = global.setInterval(function () {
      pollOrders(adminFetch);
    }, 20000);
  }

  function bindServiceWorkerMessages() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.addEventListener("message", function (event) {
      if (!event.data || event.data.type !== "DVITES_NEW_ORDER") return;
      notifyNewOrder(event.data.payload || {});
    });
  }

  function init(adminFetch) {
    mountSettingsPanel();
    bindServiceWorkerMessages();
    startOrderPolling(adminFetch);
  }

  global.DvitesAdminSound = {
    DEFAULT_SOUND: DEFAULT_SOUND,
    getSettings: getSettings,
    saveSettings: saveSettings,
    settingsPanelHtml: settingsPanelHtml,
    mountSettingsPanel: mountSettingsPanel,
    playSound: playSound,
    notifyNewOrder: notifyNewOrder,
    ingestOrders: ingestOrders,
    init: init,
  };
})(window);
