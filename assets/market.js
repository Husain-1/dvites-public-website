(function (global) {
  "use strict";

  var STORAGE_KEY = "dvites_market";
  var VALID_MARKETS = ["IN", "AE"];
  var DEFAULT_MARKET = "IN";

  var state = {
    market: DEFAULT_MARKET,
    country: "IN",
    currency: "INR",
    locale: "en-IN",
    prices: null,
    ready: false,
    promise: null,
  };

  function normalizeMarket(value) {
    var m = String(value || "")
      .trim()
      .toUpperCase();
    return VALID_MARKETS.indexOf(m) >= 0 ? m : null;
  }

  function readUrlMarket() {
    try {
      var params = new URLSearchParams(global.location.search);
      return normalizeMarket(params.get("market"));
    } catch (e) {
      return null;
    }
  }

  function readStoredMarket() {
    try {
      return normalizeMarket(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function persistMarket(market) {
    if (!market) return;
    try {
      localStorage.setItem(STORAGE_KEY, market);
    } catch (e) { /* noop */ }
  }

  function applyFallback() {
    state.market = DEFAULT_MARKET;
    state.country = "IN";
    state.currency = "INR";
    state.locale = "en-IN";
    state.prices = {
      wedding: { price: 799, oldPrice: 1332 },
      "save-the-date": { price: 999, oldPrice: 1999 },
    };
    state.ready = true;
  }

  function fetchMarketConfig(explicitMarket) {
    var url = "/api/market";
    if (explicitMarket) {
      url += "?market=" + encodeURIComponent(explicitMarket);
    }
    return fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error("market_fetch_failed");
        return response.json();
      })
      .catch(function () {
        return null;
      });
  }

  function applyStaticPrices() {
    document.querySelectorAll("[data-dvites-price]").forEach(function (el) {
      var productType = el.getAttribute("data-dvites-price") || "wedding";
      var kind = el.getAttribute("data-dvites-price-kind") || "price";
      var amount =
        kind === "old" ? getOldPrice(productType) : getPrice(productType);
      el.textContent = formatPrice(amount);
    });
  }

  function formatStartingAt(productType) {
    return "Starting at " + formatPrice(getPrice(productType || "wedding")) + ".";
  }

  function formatFromPrice(productType) {
    return "From " + formatPrice(getPrice(productType || "wedding"));
  }

  function applyMarketingCopy() {
    applyStaticPrices();

    document.querySelectorAll("[data-dvites-starting-at]").forEach(function (el) {
      var productType = el.getAttribute("data-dvites-starting-at") || "wedding";
      el.textContent = formatStartingAt(productType);
    });

    document.querySelectorAll("[data-dvites-from-price]").forEach(function (el) {
      var productType = el.getAttribute("data-dvites-from-price") || "wedding";
      el.textContent = formatFromPrice(productType);
    });

    document.querySelectorAll("[data-dvites-faq-price-q]").forEach(function (el) {
      var productType = el.getAttribute("data-dvites-faq-price-q") || "wedding";
      el.textContent =
        "What is included in " + formatPrice(getPrice(productType)) + "?";
    });

    document.querySelectorAll("[data-dvites-zero-price]").forEach(function (el) {
      el.textContent = formatPrice(0);
    });
  }

  function updateProductJsonLd(productType) {
    var type = productType || "wedding";
    var pricing = getPricing(type);
    var currency = getCurrency();
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (script) {
      try {
        var data = JSON.parse(script.textContent);
        var nodes = data["@graph"] || [data];
        nodes.forEach(function (node) {
          if (node && node["@type"] === "Product" && node.offers) {
            node.offers.price = String(pricing.price);
            node.offers.priceCurrency = currency;
          }
        });
        script.textContent = JSON.stringify(data);
      } catch (e) { /* noop */ }
    });
  }

  function resolve() {
    var urlMarket = readUrlMarket();
    if (urlMarket) persistMarket(urlMarket);

    var storedMarket = readStoredMarket();
    var queryMarket = urlMarket || storedMarket;

    return fetchMarketConfig(queryMarket).then(function (data) {
      if (data && data.market && data.prices) {
        state.market = data.market;
        state.country = data.country || data.market;
        state.currency = data.currency || "INR";
        state.locale = data.locale || (data.market === "AE" ? "en-AE" : "en-IN");
        state.prices = data.prices;
        if (urlMarket) persistMarket(urlMarket);
        else if (data.market) persistMarket(data.market);
      } else {
        applyFallback();
      }
      state.ready = true;
      applyMarketingCopy();
      return state;
    });
  }

  function getPrice(productType) {
    var type = productType || "wedding";
    var entry = state.prices && state.prices[type];
    if (entry && Number.isFinite(Number(entry.price))) return Number(entry.price);
    if (type === "save-the-date") return 999;
    return 799;
  }

  function getOldPrice(productType) {
    var type = productType || "wedding";
    var entry = state.prices && state.prices[type];
    if (entry && Number.isFinite(Number(entry.oldPrice))) {
      return Number(entry.oldPrice);
    }
    if (type === "save-the-date") return 1999;
    return 1332;
  }

  function getPricing(productType) {
    return {
      price: getPrice(productType),
      oldPrice: getOldPrice(productType),
    };
  }

  function formatPrice(amount) {
    var n = Number(amount);
    if (!isFinite(n)) n = 0;
    if (state.currency === "AED") {
      return (
        "AED " +
        n.toLocaleString(state.locale || "en-AE", {
          maximumFractionDigits: 0,
        })
      );
    }
    return "₹" + n.toLocaleString(state.locale || "en-IN");
  }

  function ready() {
    if (state.ready) return Promise.resolve(state);
    if (!state.promise) state.promise = resolve();
    return state.promise;
  }

  state.promise = resolve();

  global.DvitesMarket = {
    ready: ready,
    getMarket: function () {
      return state.market;
    },
    getCurrency: function () {
      return state.currency;
    },
    getLocale: function () {
      return state.locale;
    },
    getPrice: getPrice,
    getOldPrice: getOldPrice,
    getPricing: getPricing,
    formatPrice: formatPrice,
    formatStartingAt: formatStartingAt,
    formatFromPrice: formatFromPrice,
    applyStaticPrices: applyStaticPrices,
    applyMarketingCopy: applyMarketingCopy,
    updateProductJsonLd: updateProductJsonLd,
  };
})(window);
