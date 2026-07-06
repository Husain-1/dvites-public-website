(function (global) {
  "use strict";

  var PIXEL_ID = "9797589963588399";

  /* Meta Pixel base code — Capcut test */
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

  global.dvitesTrackViewContent = function (templateName, category, price) {
    if (!canTrack()) return;
    global.fbq("track", "ViewContent", {
      content_name: asText(templateName, "Dvites Template"),
      content_category: asText(category, "Wedding Invitation"),
      content_type: "product",
      value: asNumber(price, 0),
      currency: "INR",
    });
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
      currency: "INR",
    });
  };

  global.dvitesTrackPurchase = function (templateName, price, orderId) {
    if (!canTrack()) return;
    global.fbq("track", "Purchase", {
      content_name: asText(templateName, "Dvites Template"),
      content_type: "product",
      value: asNumber(price, 0),
      currency: "INR",
      order_id: asText(orderId, ""),
    });
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
