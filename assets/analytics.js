(function (global) {
  "use strict";

  var API_TRACK = "/api/track";
  var STORAGE_VISITOR = "dvites_visitor_id";
  var STORAGE_SESSION = "dvites_session_id";
  var HEARTBEAT_MS = 20000;
  var trackedCards = new WeakSet();
  var modalTracked = false;

  function uuid() {
    if (global.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "dv-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function getVisitorId() {
    try {
      var existing = localStorage.getItem(STORAGE_VISITOR);
      if (existing) return existing;
      var created = uuid();
      localStorage.setItem(STORAGE_VISITOR, created);
      return created;
    } catch {
      return uuid();
    }
  }

  function getSessionId() {
    try {
      var existing = sessionStorage.getItem(STORAGE_SESSION);
      if (existing) return existing;
      var created = uuid();
      sessionStorage.setItem(STORAGE_SESSION, created);
      return created;
    } catch {
      return uuid();
    }
  }

  function deviceType() {
    var ua = navigator.userAgent || "";
    if (/tablet|ipad/i.test(ua)) return "tablet";
    if (/mobile|android|iphone/i.test(ua)) return "mobile";
    return "desktop";
  }

  function basePayload() {
    return {
      page_path: global.location.pathname + global.location.search,
      session_id: getSessionId(),
      visitor_id: getVisitorId(),
      referrer: document.referrer || "",
      user_agent: navigator.userAgent || "",
      device_type: deviceType(),
    };
  }

  function sendEvent(eventType, extra) {
    var payload = Object.assign({ event_type: eventType }, basePayload(), extra || {});
    try {
      var body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: "application/json" });
        if (navigator.sendBeacon(API_TRACK, blob)) return;
      }
      fetch(API_TRACK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
        keepalive: true,
      }).catch(function () {});
    } catch {
      // Analytics must never break the site.
    }
  }

  function templateSlugFromCard(card) {
    if (!card) return "";
    return card.getAttribute("data-id") || card.getAttribute("data-title") || "";
  }

  function observeTemplateCards() {
    if (!("IntersectionObserver" in global)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
          var card = entry.target;
          if (trackedCards.has(card)) return;
          trackedCards.add(card);
          sendEvent("template_card_view", {
            template_slug: templateSlugFromCard(card),
          });
        });
      },
      { threshold: [0.5] }
    );

    document.querySelectorAll(".card[data-demo-url]").forEach(function (card) {
      observer.observe(card);
    });
  }

  function watchModalOpen() {
    var modal = document.getElementById("demo-modal");
    if (!modal || modalTracked) return;
    modalTracked = true;
    var observer = new MutationObserver(function () {
      if (!modal.classList.contains("is-open")) return;
      var title = document.getElementById("modal-title");
      sendEvent("modal_open", {
        template_slug: title ? title.textContent.trim() : "",
      });
    });
    observer.observe(modal, { attributes: true, attributeFilter: ["class"] });
  }

  function bindClickTracking() {
    document.addEventListener(
      "click",
      function (event) {
        var demoBtn = event.target.closest(".demo-btn, .btn-watch");
        if (demoBtn) {
          var demoCard = demoBtn.closest(".card[data-demo-url]");
          sendEvent("demo_click", { template_slug: templateSlugFromCard(demoCard) });
          return;
        }

        var buyBtn = event.target.closest(".btn-customize, [data-buy-now], #modal-buy");
        if (buyBtn) {
          var buyCard = buyBtn.closest(".card[data-demo-url]");
          var title = document.getElementById("modal-title");
          sendEvent("buy_click", {
            template_slug: templateSlugFromCard(buyCard) || (title ? title.textContent.trim() : ""),
          });
        }
      },
      true
    );
  }

  function startHeartbeat() {
    sendEvent("heartbeat");
    setInterval(function () {
      sendEvent("heartbeat");
    }, HEARTBEAT_MS);
  }

  function initAnalytics() {
    if (global.location.pathname.indexOf("/admin/") === 0) return;
    sendEvent("page_view");
    observeTemplateCards();
    watchModalOpen();
    bindClickTracking();
    startHeartbeat();
  }

  global.dvitesTrack = function (eventType, extra) {
    sendEvent(eventType, extra || {});
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnalytics);
  } else {
    initAnalytics();
  }
})(window);
