(function (global) {
  "use strict";

  var PIXEL_ID = "27514697381530186";

  /* Meta Pixel — Dvites Website Purchases */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(global, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  global.fbq("init", PIXEL_ID);
  global.fbq("track", "PageView");

  function canTrack() {
    return typeof global.fbq === "function";
  }

  function asNumber(value, fallback) {
    var num = Number(value);
    return isFinite(num) ? num : fallback;
  }

  function asText(value, fallback) {
    var text = String(value || "").trim();
    return text || fallback;
  }

  function getCurrency(explicitCurrency) {
    if (explicitCurrency) return String(explicitCurrency).toUpperCase();
    if (global.DvitesMarket && typeof global.DvitesMarket.getCurrency === "function") {
      return global.DvitesMarket.getCurrency();
    }
    return "INR";
  }

  global.dvitesTrackViewContent = function (templateName, category, price, contentId) {
    if (!canTrack()) return;
    var payload = {
      content_name: asText(templateName, "Dvites Template"),
      content_category: asText(category, "Wedding Invitation"),
      content_type: "product",
      value: asNumber(price, 0),
      currency: getCurrency(),
    };
    if (contentId) payload.content_ids = [asText(contentId, "")];
    global.fbq("track", "ViewContent", payload);
  };

  global.dvitesTrackViewDemo = function (templateName) {
    if (!canTrack()) return;
    global.fbq("trackCustom", "ViewDemo", {
      content_name: asText(templateName, "Dvites Template"),
      content_category: "Wedding Invitation",
    });
  };

  global.dvitesTrackLead = function (source) {
    if (!canTrack()) return;
    global.fbq("track", "Lead", {
      content_name: asText(source, "Lead Form"),
    });
  };

  global.dvitesTrackContact = function (source) {
    if (!canTrack()) return;
    global.fbq("track", "Contact", {
      content_name: asText(source, "Contact Click"),
    });
  };

  global.dvitesTrackInitiateCheckout = function (templateName, price) {
    if (!canTrack()) return;
    global.fbq("track", "InitiateCheckout", {
      content_name: asText(templateName, "Dvites Template"),
      content_type: "product",
      value: asNumber(price, 0),
      currency: getCurrency(),
    });
  };

  var PURCHASE_GUARD_KEY = "dvites_meta_purchase_ids";

  function markPurchaseTracked(eventId) {
    if (!eventId) return true;
    try {
      var raw = sessionStorage.getItem(PURCHASE_GUARD_KEY);
      var ids = raw ? JSON.parse(raw) : [];
      if (ids.indexOf(eventId) >= 0) return false;
      ids.push(eventId);
      if (ids.length > 24) ids = ids.slice(-24);
      sessionStorage.setItem(PURCHASE_GUARD_KEY, JSON.stringify(ids));
      return true;
    } catch (e) {
      return true;
    }
  }

  global.dvitesTrackPurchase = function (templateName, price, orderId, currency) {
    if (!canTrack()) return;
    var eventId = asText(orderId, "");
    if (eventId && !markPurchaseTracked(eventId)) return;
    var payload = {
      content_name: asText(templateName, "Dvites Template"),
      content_type: "product",
      value: asNumber(price, 0),
      currency: getCurrency(currency),
      order_id: eventId,
    };
    var options = eventId ? { eventID: eventId } : {};
    global.fbq("track", "Purchase", payload, options);
  };

  document.addEventListener("click", function (event) {
    var mailLink = event.target.closest('a[href^="mailto:"]');
    if (mailLink) {
      global.dvitesTrackContact(
        mailLink.getAttribute("data-track-contact") || "Email Click"
      );
      return;
    }

    var waLink = event.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
    if (waLink) {
      global.dvitesTrackContact(
        waLink.getAttribute("data-track-contact") || "WhatsApp Click"
      );
    }
  });
})(window);
