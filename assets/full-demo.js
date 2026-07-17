(function (global) {
  "use strict";

  var state = null;
  var shell = null;
  var iframe = null;
  var loadingEl = null;
  var buyBtn = null;
  var patchObserver = null;

  function isMobileViewport() {
    return global.matchMedia && global.matchMedia("(max-width: 767px)").matches;
  }

  function buildDemoUrl(url) {
    if (!url) return url;
    if (
      global.DvitesPhonePreview &&
      typeof global.DvitesPhonePreview.previewUrl === "function"
    ) {
      return global.DvitesPhonePreview.previewUrl(url);
    }
    var join = url.indexOf("?") >= 0 ? "&" : "?";
    return url + join + "preview=1&preview=true&skipEnvelope=true";
  }

  function hideEl(el) {
    if (!el || !el.style) return;
    el.style.setProperty("display", "none", "important");
    el.style.setProperty("visibility", "hidden", "important");
    el.style.setProperty("pointer-events", "none", "important");
    el.style.setProperty("height", "0", "important");
    el.style.setProperty("max-height", "0", "important");
    el.style.setProperty("overflow", "hidden", "important");
  }

  function isExternalDvitesLink(href) {
    if (!href || href === "#") return false;
    return /(?:^|\/\/)(?:www\.)?dvites\.(?:com|in)(?:\/|$|\?)/i.test(href);
  }

  function patchIframe(doc, opts) {
    if (!doc || !doc.body) return;

    doc.querySelectorAll(
      ".dvites-buy-bar,#buyNowBtn,[data-framer-name='Buy Now Button'],a[data-framer-name='Buy Now Button']"
    ).forEach(hideEl);

    doc.querySelectorAll("a[data-framer-name='Desktop'],a[data-framer-name='Phone']").forEach(function (el) {
      hideEl(el.closest("[class*='-container']") || el);
      hideEl(el);
    });

    doc.querySelectorAll("a[href]").forEach(function (anchor) {
      var href = anchor.getAttribute("href") || "";
      if (!isExternalDvitesLink(href)) return;
      if (opts.productUrl) {
        anchor.setAttribute("href", opts.productUrl);
        anchor.removeAttribute("target");
        anchor.removeAttribute("rel");
      } else {
        anchor.setAttribute("href", "#");
        anchor.removeAttribute("target");
      }
    });

    if (!doc.getElementById("dvites-full-demo-patch")) {
      var style = doc.createElement("style");
      style.id = "dvites-full-demo-patch";
      style.textContent =
        ".dvites-buy-bar,#buyNowBtn{display:none!important;visibility:hidden!important;height:0!important;" +
        "overflow:hidden!important;pointer-events:none!important}" +
        "html,body{overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;" +
        "touch-action:pan-y!important;overscroll-behavior-y:auto!important;scroll-behavior:auto!important}" +
        "body{padding-top:0!important;margin-top:0!important}";
      (doc.head || doc.documentElement).appendChild(style);
    }

    if (!doc.body.dataset.dvitesFullDemoClickBound) {
      doc.body.dataset.dvitesFullDemoClickBound = "1";
      doc.addEventListener(
        "click",
        function (event) {
          var target = event.target.closest("a,button,#buyNowBtn,.dvites-buy-bar a");
          if (!target) return;
          var href = target.getAttribute && target.getAttribute("href");
          var isBuy =
            target.id === "buyNowBtn" ||
            /buy now/i.test((target.textContent || "").trim()) ||
            (href && isExternalDvitesLink(href));
          if (!isBuy) return;
          event.preventDefault();
          event.stopPropagation();
          triggerBuy();
        },
        true
      );
    }
  }

  function disconnectPatchObserver() {
    if (patchObserver) {
      patchObserver.disconnect();
      patchObserver = null;
    }
  }

  function watchIframe(doc, opts) {
    disconnectPatchObserver();
    if (!doc || !doc.body) return;
    patchIframe(doc, opts);
    patchObserver = new MutationObserver(function () {
      patchIframe(doc, opts);
    });
    patchObserver.observe(doc.body, { childList: true, subtree: true });
    setTimeout(disconnectPatchObserver, 15000);
  }

  function ensureShell() {
    if (shell) return shell;

    shell = document.createElement("div");
    shell.id = "dvites-full-demo";
    shell.className = "dvites-full-demo";
    shell.setAttribute("aria-hidden", "true");
    shell.innerHTML =
      '<div class="dvites-full-demo-bar">' +
        '<button type="button" class="dvites-full-demo-exit" id="dvites-full-demo-exit" aria-label="Exit demo">← Exit</button>' +
        '<button type="button" class="dvites-full-demo-buy" id="dvites-full-demo-buy">Buy Now</button>' +
      '</div>' +
      '<div class="dvites-full-demo-frame">' +
        '<p class="dvites-full-demo-loading" id="dvites-full-demo-loading">Loading invitation…</p>' +
        '<iframe class="dvites-full-demo-iframe" id="dvites-full-demo-iframe" title="Live template demo"></iframe>' +
      '</div>';

    document.body.appendChild(shell);

    iframe = shell.querySelector("#dvites-full-demo-iframe");
    loadingEl = shell.querySelector("#dvites-full-demo-loading");
    buyBtn = shell.querySelector("#dvites-full-demo-buy");

    shell.querySelector("#dvites-full-demo-exit").addEventListener("click", function () {
      close();
    });

    buyBtn.addEventListener("click", function () {
      triggerBuy();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) close();
    });

    return shell;
  }

  function triggerBuy() {
    if (!state || !global.DvitesPayment || typeof global.DvitesPayment.startCheckout !== "function") {
      return;
    }
    if (buyBtn) {
      buyBtn.disabled = true;
      buyBtn.setAttribute("aria-busy", "true");
    }
    global.DvitesPayment.startCheckout({
      templateName: state.templateName,
      templateSlug: state.templateSlug,
      amountPaise: state.amountPaise
    }).finally(function () {
      if (buyBtn) {
        buyBtn.disabled = false;
        buyBtn.removeAttribute("aria-busy");
      }
    });
  }

  function isOpen() {
    return !!(shell && shell.classList.contains("is-open"));
  }

  function open(opts) {
    opts = opts || {};
    if (!opts.demoUrl) return false;

    ensureShell();
    state = {
      demoUrl: opts.demoUrl,
      templateSlug: opts.templateSlug || "",
      templateName: opts.templateName || "Dvites Template",
      amountPaise: Number(opts.amountPaise) || 119900,
      productUrl: opts.productUrl || "",
      exitUrl: opts.exitUrl || global.location.href
    };

    if (loadingEl) loadingEl.classList.remove("is-hidden");
    shell.classList.add("is-open");
    shell.setAttribute("aria-hidden", "false");
    document.body.classList.add("dvites-full-demo-open");

    if (typeof global.dvitesTrack === "function") {
      global.dvitesTrack("template_demo_open", {
        template_slug: state.templateSlug,
        template_name: state.templateName,
        surface: "full_page"
      });
    }
    if (typeof global.dvitesTrackViewDemo === "function") {
      global.dvitesTrackViewDemo(state.templateName);
    }

    iframe.onload = function () {
      if (loadingEl) loadingEl.classList.add("is-hidden");
      try {
        watchIframe(iframe.contentDocument, state);
      } catch (e) { /* noop */ }
    };

    iframe.title = state.templateName + " live demo";
    iframe.src = buildDemoUrl(state.demoUrl);

    return true;
  }

  function close() {
    if (!shell) return;
    shell.classList.remove("is-open");
    shell.setAttribute("aria-hidden", "true");
    document.body.classList.remove("dvites-full-demo-open");
    disconnectPatchObserver();
    if (iframe) {
      iframe.onload = null;
      iframe.src = "about:blank";
    }
    if (loadingEl) loadingEl.classList.remove("is-hidden");
    state = null;
  }

  global.DvitesFullDemo = {
    open: open,
    close: close,
    isOpen: isOpen,
    isMobileViewport: isMobileViewport,
    buildDemoUrl: buildDemoUrl
  };
})(window);
