(function (global) {
  "use strict";

  var DEFAULT_SOUND = "/assets/notifications/new-order.mp3";
  var DEFAULT_LABEL = "Default (new-order.mp3)";
  var STORAGE_ENABLED = "dvites_notification_sound_enabled";
  var STORAGE_VOLUME = "dvites_notification_sound_volume";
  var STORAGE_USE_CUSTOM = "dvites_notification_sound_custom";
  var STORAGE_CUSTOM_FILENAME = "dvites_notification_sound_filename";
  var DB_NAME = "dvites-admin-sound";
  var DB_STORE = "sounds";
  var DB_KEY = "custom";

  var activeAudio = null;
  var autoplayBlocked = false;
  var unlockBound = false;
  var lastPlayedAt = 0;
  var customObjectUrl = null;
  var customReady = false;

  var ALLOWED_TYPES = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/ogg",
    "audio/mp4",
    "audio/x-m4a",
    "audio/m4a",
  ];

  function readEnabled() {
    try {
      var value = localStorage.getItem(STORAGE_ENABLED);
      if (value === null) return true;
      return value === "1";
    } catch {
      return true;
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

  function readUseCustom() {
    try {
      return localStorage.getItem(STORAGE_USE_CUSTOM) === "1";
    } catch {
      return false;
    }
  }

  function readCustomFilename() {
    try {
      return localStorage.getItem(STORAGE_CUSTOM_FILENAME) || "";
    } catch {
      return "";
    }
  }

  function saveSettings(settings) {
    try {
      if (settings.enabled != null) {
        localStorage.setItem(STORAGE_ENABLED, settings.enabled ? "1" : "0");
      }
      if (settings.volume != null) {
        localStorage.setItem(STORAGE_VOLUME, String(settings.volume));
      }
      if (settings.useCustom != null) {
        localStorage.setItem(STORAGE_USE_CUSTOM, settings.useCustom ? "1" : "0");
      }
      if (settings.filename != null) {
        localStorage.setItem(STORAGE_CUSTOM_FILENAME, settings.filename);
      }
    } catch {
      // ignore
    }
  }

  function getSettings() {
    return {
      enabled: readEnabled(),
      volume: readVolume(),
      useCustom: readUseCustom(),
      filename: readCustomFilename(),
      label: getCurrentSoundLabel(),
    };
  }

  function getCurrentSoundLabel() {
    if (readUseCustom() && readCustomFilename()) {
      return "✓ " + readCustomFilename();
    }
    return "✓ " + DEFAULT_LABEL;
  }

  function openDb() {
    return new Promise(function (resolve, reject) {
      if (!("indexedDB" in global)) {
        reject(new Error("IndexedDB is not supported."));
        return;
      }
      var request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = function (event) {
        event.target.result.createObjectStore(DB_STORE);
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });
  }

  function loadCustomSoundRecord() {
    return openDb().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction(DB_STORE, "readonly");
        var req = tx.objectStore(DB_STORE).get(DB_KEY);
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { resolve(null); };
      });
    }).catch(function () {
      return null;
    });
  }

  function saveCustomSoundRecord(file) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(DB_STORE, "readwrite");
        tx.objectStore(DB_STORE).put({
          blob: file,
          name: file.name,
          type: file.type,
          savedAt: Date.now(),
        }, DB_KEY);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  function clearCustomSoundRecord() {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(DB_STORE, "readwrite");
        tx.objectStore(DB_STORE).delete(DB_KEY);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  function revokeCustomUrl() {
    if (customObjectUrl) {
      URL.revokeObjectURL(customObjectUrl);
      customObjectUrl = null;
    }
  }

  function loadCustomSoundIntoCache() {
    return loadCustomSoundRecord().then(function (record) {
      revokeCustomUrl();
      customReady = false;
      if (record && record.blob) {
        customObjectUrl = URL.createObjectURL(record.blob);
        customReady = true;
        saveSettings({
          useCustom: true,
          filename: record.name || "custom-sound",
        });
        return;
      }
      if (!readUseCustom()) return;
      saveSettings({ useCustom: false, filename: "" });
    });
  }

  function getPlaybackUrl() {
    if (readUseCustom() && customObjectUrl) return customObjectUrl;
    return DEFAULT_SOUND;
  }

  function isAllowedAudioFile(file) {
    if (!file) return false;
    var name = (file.name || "").toLowerCase();
    var extOk = /\.(mp3|wav|ogg|m4a)$/i.test(name);
    var typeOk = !file.type || ALLOWED_TYPES.indexOf(file.type) !== -1;
    return extOk || typeOk;
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

    var audio = new Audio(getPlaybackUrl());
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
      if (status) status.textContent = "New order: " + meta.template_name;
    }
  }

  function updateCurrentSoundLabel() {
    var label = document.getElementById("admin-sound-current");
    if (label) label.textContent = getCurrentSoundLabel();
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
        '<p class="admin-sound-current-label">Current Sound:</p>' +
        '<p class="admin-sound-current" id="admin-sound-current">' + settings.label + '</p>' +
        '<input type="file" id="admin-sound-file" class="admin-sound-file" accept="audio/*,.mp3,.wav,.ogg,.m4a" hidden />' +
        '<button class="admin-btn admin-btn-primary admin-sound-choose" id="admin-sound-choose" type="button">Choose Notification Sound</button>' +
        '<button class="admin-btn admin-sound-change" id="admin-sound-change" type="button">Change Sound</button>' +
        '<button class="admin-btn admin-sound-reset" id="admin-sound-reset" type="button">Reset to Default</button>' +
        '<label class="admin-sound-row admin-sound-label" for="admin-sound-volume">Volume <span id="admin-sound-volume-value">' + Math.round(settings.volume * 100) + '%</span></label>' +
        '<input class="admin-sound-range" id="admin-sound-volume" type="range" min="0" max="100" step="5" value="' + Math.round(settings.volume * 100) + '" />' +
        '<button class="admin-btn admin-btn-primary admin-sound-test" id="admin-sound-test" type="button">Test Sound</button>' +
        '<p class="admin-status" id="admin-sound-status">Sounds stay on this device only.</p>' +
      '</div>'
    );
  }

  function bindSettingsPanel() {
    var enabled = document.getElementById("admin-sound-enabled");
    var volume = document.getElementById("admin-sound-volume");
    var volumeValue = document.getElementById("admin-sound-volume-value");
    var testBtn = document.getElementById("admin-sound-test");
    var chooseBtn = document.getElementById("admin-sound-choose");
    var changeBtn = document.getElementById("admin-sound-change");
    var resetBtn = document.getElementById("admin-sound-reset");
    var fileInput = document.getElementById("admin-sound-file");
    var status = document.getElementById("admin-sound-status");

    function persistVolume() {
      saveSettings({
        enabled: !!(enabled && enabled.checked),
        volume: volume ? Number(volume.value) / 100 : readVolume(),
      });
    }

    function openFilePicker() {
      if (fileInput) fileInput.click();
    }

    function handleFileSelected(file) {
      if (!isAllowedAudioFile(file)) {
        if (status) status.textContent = "Please choose mp3, wav, ogg, or m4a.";
        return;
      }
      if (status) status.textContent = "Saving sound on this device…";
      saveCustomSoundRecord(file).then(function () {
        return loadCustomSoundIntoCache();
      }).then(function () {
        updateCurrentSoundLabel();
        if (status) status.textContent = "Custom sound saved on this device.";
      }).catch(function () {
        if (status) status.textContent = "Unable to save sound on this device.";
      });
    }

    if (enabled) enabled.addEventListener("change", persistVolume);
    if (volume) {
      volume.addEventListener("input", function () {
        if (volumeValue) volumeValue.textContent = volume.value + "%";
        persistVolume();
      });
      volume.addEventListener("change", persistVolume);
    }
    if (chooseBtn) chooseBtn.addEventListener("click", openFilePicker);
    if (changeBtn) changeBtn.addEventListener("click", openFilePicker);
    if (fileInput) {
      fileInput.addEventListener("change", function () {
        var file = fileInput.files && fileInput.files[0];
        if (file) handleFileSelected(file);
        fileInput.value = "";
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        clearCustomSoundRecord().then(function () {
          revokeCustomUrl();
          customReady = false;
          saveSettings({ useCustom: false, filename: "" });
          updateCurrentSoundLabel();
          if (status) status.textContent = "Reset to default sound.";
        }).catch(function () {
          if (status) status.textContent = "Unable to reset sound.";
        });
      });
    }
    if (testBtn) {
      testBtn.addEventListener("click", function () {
        persistVolume();
        playSound(true).then(function (ok) {
          if (status) {
            status.textContent = ok
              ? "Test sound played."
              : "Browser blocked autoplay. Tap Enable Sound.";
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
    loadCustomSoundIntoCache().finally(function () {
      mountSettingsPanel();
    });
    bindServiceWorkerMessages();
    startOrderPolling(adminFetch);
  }

  global.DvitesAdminSound = {
    DEFAULT_SOUND: DEFAULT_SOUND,
    getSettings: getSettings,
    saveSettings: saveSettings,
    mountSettingsPanel: mountSettingsPanel,
    playSound: playSound,
    notifyNewOrder: notifyNewOrder,
    ingestOrders: ingestOrders,
    init: init,
  };
})(window);
