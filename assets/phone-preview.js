(function (global) {
  "use strict";

  var LOGO = "/templates/curtains/assets/images/dvites-logo.png";

  var OPEN_TEXT = [
    /^tap to open/i,
    /^toca para abrir/i,
    /^open invitation/i,
    /^pull to light/i,
    /^pull to reveal/i,
    /^swipe to open/i,
    /^click to open/i,
    /^tap to reveal/i,
    /^tap to begin/i,
    /^touch to open/i
  ];

  function overlayHeight() {
    return global.innerWidth >= 768 ? 72 : 64;
  }

  function resolveMode(iframe, opts) {
    opts = opts || {};
    if (opts.mode === "preview" || opts.mode === "modal") return opts.mode;
    try {
      var src = iframe.getAttribute("src") || iframe.src || "";
      if (/[?&]preview=(?:1|true)(?:&|$)/.test(src)) return "preview";
    } catch (e) { /* noop */ }
    return "modal";
  }

  var PREVIEW_HIDE = [
    ".dvites-buy-bar",
    "[class*='fixed'][class*='bottom-0']",
    "[class*='fixed'][class*='bottom-']",
    "[class*='sticky'][class*='bottom']",
    "[class*='music-toggle']",
    "[class*='MusicToggle']",
    "[class*='volume-control']",
    "[class*='VolumeControl']",
    "[class*='floating-nav']",
    "[class*='FloatingNav']",
    "[class*='sticky-footer']",
    "[class*='StickyFooter']",
    "[class*='sticky-cta']",
    "[class*='FloatingBuy']",
    "[class*='fab-']",
    "[aria-label*='volume' i]",
    "[aria-label*='music' i]",
    "[title*='volume' i]",
    "[title*='music' i]"
  ].join(",\n");

  var MODAL_HIDE = [
    ".dvites-buy-bar",
    "#buyNowBtn",
    "[data-framer-name='Buy Now Button']",
    "a[data-framer-name='Buy Now Button']",
    "a[data-framer-name='Desktop']",
    "a[data-framer-name='Phone']",
    "[class*='-container']:has(> a[data-framer-name='Desktop'])",
    "[class*='-container']:has(> a[data-framer-name='Phone'])",
    "[class*='-container']:has(> a[data-framer-name='Buy Now Button'])"
  ].join(",");

  var HIDE_RULE =
    "{display:none!important;visibility:hidden!important;pointer-events:none!important;" +
    "opacity:0!important;height:0!important;max-height:0!important;overflow:hidden!important;" +
    "margin:0!important;padding:0!important;border:0!important}";

  function buildInjectCSS(mode, isHero) {
    var pad = mode === "modal" || isHero ? 0 : overlayHeight();
    var css =
      "html{scroll-behavior:auto!important;-webkit-overflow-scrolling:touch}" +
      "body{padding-top:" + pad + "px!important;margin-top:0!important;overflow-x:hidden!important}";

    if (mode === "preview") {
      css += PREVIEW_HIDE +
        ",[class*='unmute'],[class*='Unmute'],[class*='sound-on'],[class*='SoundOn'],button[aria-label*='unmute' i],button[aria-label*='sound on' i]" +
        HIDE_RULE;
      css +=
        "*,*::before,*::after{pointer-events:none!important;-webkit-user-select:none!important;user-select:none!important}" +
        "video,audio{pointer-events:none!important;-webkit-media-controls{display:none!important}" +
        "[data-opening-overlay]{pointer-events:none!important}";
    } else {
      css +=
        MODAL_HIDE + HIDE_RULE +
        "html,html body,body,body.t-body,#main,[data-framer-root],[data-framer-root]>*" +
        "{padding-top:0!important;margin-top:0!important}" +
        ".s-invite,.s-invite .container,.hero-wrap,.hero-pin,.preloader" +
        "{padding-top:0!important;margin-top:0!important}" +
        "[data-invitation-phone-frame] .flex.flex-col.items-center.justify-start{padding-top:0!important}";
    }
    return css;
  }

  function hideChromeEl(el) {
    if (!el || !el.style) return;
    el.style.setProperty("display", "none", "important");
    el.style.setProperty("visibility", "hidden", "important");
    el.style.setProperty("pointer-events", "none", "important");
    el.style.setProperty("height", "0", "important");
    el.style.setProperty("max-height", "0", "important");
    el.style.setProperty("overflow", "hidden", "important");
  }

  function hideModalChrome(doc) {
    if (!doc || !doc.body) return;

    doc.querySelectorAll(
      ".dvites-buy-bar,#buyNowBtn,[data-framer-name='Buy Now Button'],a[data-framer-name='Buy Now Button']"
    ).forEach(hideChromeEl);

    doc.querySelectorAll("a[data-framer-name='Desktop'],a[data-framer-name='Phone']").forEach(function (el) {
      hideChromeEl(el.closest("[class*='-container']") || el);
      hideChromeEl(el);
    });

    doc.querySelectorAll("p,span,a,button").forEach(function (el) {
      if (el.children.length) return;
      if (!/^exit preview$/i.test((el.textContent || "").trim())) return;
      hideChromeEl(el.closest("[class*='-container']") || el.closest("a") || el.parentElement);
    });

    doc.documentElement.style.setProperty("padding-top", "0", "important");
    doc.body.style.setProperty("padding-top", "0", "important");
    doc.body.style.setProperty("margin-top", "0", "important");
  }

  function injectStyles(doc, mode, isHero) {
    if (!doc) return;
    var css = buildInjectCSS(mode, isHero);
    var el = doc.getElementById("dvites-catalog-inject");
    if (!el) {
      el = doc.createElement("style");
      el.id = "dvites-catalog-inject";
      (doc.head || doc.documentElement).appendChild(el);
    }
    el.textContent = css;

    if (mode === "modal" && doc.body) {
      var tail = doc.getElementById("dvites-catalog-inject-tail");
      if (!tail) {
        tail = doc.createElement("style");
        tail.id = "dvites-catalog-inject-tail";
        doc.body.appendChild(tail);
      }
      tail.textContent = css;
    }
  }

  function disconnectIframeObservers(iframe) {
    if (!iframe) return;
    if (iframe._dvitesMuteObs) {
      iframe._dvitesMuteObs.disconnect();
      iframe._dvitesMuteObs = null;
    }
    if (iframe._dvitesMuteTimer) {
      clearTimeout(iframe._dvitesMuteTimer);
      iframe._dvitesMuteTimer = null;
    }
  }

  function scheduleModalChrome(iframe, doc, mode, isHero) {
    [300, 1200, 3000, 6000].forEach(function (delay) {
      setTimeout(function () {
        if (!iframe.isConnected) return;
        try {
          injectStyles(doc, mode, isHero);
          hideModalChrome(doc);
        } catch (e) { /* noop */ }
      }, delay);
    });
  }

  function muteMedia(doc) {
    if (!doc) return;
    doc.querySelectorAll("video,audio").forEach(function (el) {
      el.muted = true;
      el.defaultMuted = true;
      el.volume = 0;
      el.setAttribute("muted", "");
      el.removeAttribute("controls");
      try {
        el.pause();
      } catch (e) { /* noop */ }
    });
    doc.querySelectorAll("button,[role='button'],[class*='unmute'],[class*='Unmute'],[class*='volume'],[class*='Volume'],[class*='music'],[class*='Music']").forEach(function (el) {
      var label = ((el.getAttribute("aria-label") || "") + " " + (el.getAttribute("title") || "") + " " + (el.textContent || "")).toLowerCase();
      if (/unmute|sound on|volume|music|audio/.test(label)) {
        el.style.display = "none";
        el.style.visibility = "hidden";
      }
    });
  }

  function matchesOpenText(text) {
    var t = (text || "").trim();
    if (!t || t.length > 40) return false;
    return OPEN_TEXT.some(function (re) { return re.test(t); });
  }

  function clickOpenTarget(el) {
    if (!el) return false;
    var node = el;
    for (var i = 0; i < 12 && node; i++) {
      if (node.onclick || String(node.className || "").indexOf("cursor-pointer") >= 0 || node.tagName === "BUTTON" || node.tagName === "A") {
        node.click();
        return true;
      }
      node = node.parentElement;
    }
    el.click();
    return true;
  }

  function autoSkipOpening(doc, win) {
    var opened = false;

    function tryOpen() {
      doc.querySelectorAll("div.cursor-pointer,[class*='cursor-pointer'],button,[role='button']").forEach(function (el) {
        var cls = String(el.className || "");
        if (cls.indexOf("inset-0") >= 0 || (cls.indexOf("absolute") >= 0 && cls.indexOf("items-center") >= 0)) {
          el.click();
          opened = true;
        }
      });

      doc.querySelectorAll("p,span,button,div,a,h1,h2,h3").forEach(function (el) {
        if (!matchesOpenText(el.textContent)) return;
        if (clickOpenTarget(el)) opened = true;
      });

      doc.querySelectorAll("[data-opening-overlay]").forEach(function (el) {
        var root = el.closest("[style*='fixed']") || el.parentElement;
        if (root && root.style) root.style.display = "none";
      });

      if (!opened && win) {
        var cx = Math.floor(win.innerWidth / 2);
        var cy = Math.floor(win.innerHeight / 2);
        var target = doc.elementFromPoint(cx, cy);
        if (target && target !== doc.body && target !== doc.documentElement) {
          clickOpenTarget(target);
        }
      }
    }

    tryOpen();
    [250, 500, 800, 1200, 2000, 3500, 5000].forEach(function (delay) {
      setTimeout(tryOpen, delay);
    });

    if (doc.body) {
      var observer = new MutationObserver(tryOpen);
      observer.observe(doc.body, { childList: true, subtree: true });
      setTimeout(function () { observer.disconnect(); }, 12000);
    }
  }

  function blockSwipe(doc) {
    if (!doc || !doc.body) return;
    ["touchstart", "touchmove", "touchend", "pointerdown", "mousedown", "wheel"].forEach(function (type) {
      doc.addEventListener(type, function (e) {
        e.preventDefault();
        e.stopPropagation();
      }, { passive: false, capture: true });
    });
  }

  function fitIframeScale(iframe, screenEl) {
    var doc = iframe.contentDocument;
    var win = iframe.contentWindow;
    var scaler = iframe.parentElement;
    if (!doc || !scaler || !screenEl || !win) return 1;

    var contentW = Math.max(
      win.innerWidth || 0,
      doc.documentElement.clientWidth || 0,
      doc.body ? doc.body.offsetWidth : 0,
      360
    );

    var screenW = screenEl.clientWidth;
    var scale = Math.min(1, screenW / contentW);

    iframe.style.width = contentW + "px";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.style.maxWidth = "none";
    iframe.style.position = "absolute";
    iframe.style.inset = "0";
    iframe.style.transform = "none";

    scaler.style.width = contentW + "px";
    scaler.style.height = "100%";
    scaler.style.position = "absolute";
    scaler.style.top = "0";
    scaler.style.left = "50%";
    scaler.style.transform = "translateX(-50%) scale(" + scale + ")";
    scaler.style.transformOrigin = "top center";
    scaler.dataset.scale = String(scale);

    return scale;
  }

  function injectMutePatch(doc) {
    if (!doc || doc.getElementById("dvites-mute-patch")) return;
    var script = doc.createElement("script");
    script.id = "dvites-mute-patch";
    script.textContent =
      "(function(){function s(el){if(!el)return;el.muted=true;el.defaultMuted=true;el.volume=0;el.setAttribute('muted','');try{el.pause()}catch(e){}}var A=window.Audio;window.Audio=function(){var a=A.apply(this,arguments)||new A();s(a);var p=a.play;a.play=function(){s(a);return p.apply(a,arguments).catch(function(){return Promise.resolve()})};return a};document.querySelectorAll('video,audio').forEach(s);new MutationObserver(function(){document.querySelectorAll('video,audio').forEach(s)}).observe(document.documentElement,{childList:true,subtree:true});setInterval(function(){document.querySelectorAll('video,audio').forEach(s)},500)})();";
    (doc.head || doc.documentElement).appendChild(script);
  }

  function fillHeroPreview(iframe) {
    var scaler = iframe.parentElement;
    var win = iframe.contentWindow;

    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.style.maxWidth = "100%";
    iframe.style.position = "absolute";
    iframe.style.inset = "0";
    iframe.style.transform = "none";
    iframe.style.pointerEvents = "none";
    iframe.style.background = "#fff";
    iframe.setAttribute("allow", "autoplay 'none'");

    if (scaler) {
      scaler.style.width = "100%";
      scaler.style.height = "100%";
      scaler.style.position = "absolute";
      scaler.style.inset = "0";
      scaler.style.left = "0";
      scaler.style.top = "0";
      scaler.style.transform = "none";
      scaler.style.overflow = "hidden";
      scaler.dataset.scale = "1";
      scaler.dataset.vpH = String((win && win.innerHeight) || iframe.clientHeight || 667);
    }
  }

  function fillIframe(iframe) {
    var scaler = iframe.parentElement;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.style.maxWidth = "100%";
    iframe.style.position = "absolute";
    iframe.style.inset = "0";
    iframe.style.transform = "none";
    iframe.style.pointerEvents = "auto";

    if (scaler) {
      scaler.style.width = "100%";
      scaler.style.height = "100%";
      scaler.style.position = "absolute";
      scaler.style.inset = "0";
      scaler.style.left = "0";
      scaler.style.transform = "none";
      scaler.style.overflow = "hidden";
      scaler.dataset.scale = "1";
    }
  }

  function startAutoScroll(iframe) {
    if (iframe._dvitesScrollActive) return;
    iframe._dvitesScrollActive = true;

    var pos = 0;
    var speed = 0.2;
    var endPause = 0;

    function viewHeight(win, doc) {
      return Math.max(
        win.innerHeight || 0,
        doc.documentElement.clientHeight || 0,
        iframe.clientHeight || 0,
        480
      );
    }

    function tick() {
      if (!iframe.isConnected) {
        iframe._dvitesScrollActive = false;
        return;
      }
      try {
        var win = iframe.contentWindow;
        var doc = iframe.contentDocument;
        if (!win || !doc || !doc.body) {
          requestAnimationFrame(tick);
          return;
        }

        var viewH = viewHeight(win, doc);
        var max = Math.max(0, doc.documentElement.scrollHeight - viewH);

        if (max < 40) {
          requestAnimationFrame(tick);
          return;
        }

        if (endPause > 0) {
          endPause -= 1;
          requestAnimationFrame(tick);
          return;
        }

        pos += speed;
        if (pos >= max) {
          pos = 0;
          endPause = 90;
        }

        win.scrollTo(0, pos);
      } catch (e) { /* noop */ }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function scheduleHeroAutoScroll(iframe) {
    var opts = iframe._dvitesPreviewOpts || {};
    if (!opts.autoScroll || iframe._dvitesScrollActive) return;

    function tryStart(attempt) {
      if (!iframe.isConnected || iframe._dvitesScrollActive) return;
      try {
        var win = iframe.contentWindow;
        var doc = iframe.contentDocument;
        if (!win || !doc || !doc.body) {
          if (attempt < 30) setTimeout(function () { tryStart(attempt + 1); }, 400);
          return;
        }
        var viewH = Math.max(win.innerHeight || 0, doc.documentElement.clientHeight || 0, 480);
        var max = Math.max(0, doc.documentElement.scrollHeight - viewH);
        if (max > 60) {
          startAutoScroll(iframe);
        } else if (attempt < 30) {
          setTimeout(function () { tryStart(attempt + 1); }, 400);
        }
      } catch (e) {
        if (attempt < 30) setTimeout(function () { tryStart(attempt + 1); }, 400);
      }
    }

    [2400, 4000, 6000].forEach(function (delay) {
      setTimeout(function () { tryStart(0); }, delay);
    });
  }

  function ensureOverlay(screenEl, mode) {
    if (!screenEl) return;
    var overlay = screenEl.querySelector(".phone-screen-overlay");
    if (mode === "modal" && overlay) {
      overlay.style.display = "none";
      return;
    }
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "phone-screen-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = '<img src="' + LOGO + '" alt="" /><span>Dvites Preview</span>';
    screenEl.appendChild(overlay);
  }

  function setup(iframe, options) {
    if (!iframe) return;
    iframe._dvitesPreviewOpts = options || {};
    if (!iframe._dvitesPreviewBound) {
      iframe._dvitesPreviewBound = true;
      iframe.addEventListener("load", onIframeLoad);
    }
    if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
      onIframeLoad();
    }

    function onIframeLoad() {
      iframe._dvitesScrollActive = false;
      iframe._dvitesPreviewHooks = false;
      iframe._dvitesModalChromeScheduled = false;
      disconnectIframeObservers(iframe);
      runPreviewPass(iframe, 120);
      runPreviewPass(iframe, 700);
      runPreviewPass(iframe, 1800);
      runPreviewPass(iframe, 3500);
      runPreviewPass(iframe, 5500);
    }
  }

  function runPreviewPass(iframe, delay) {
    setTimeout(function () { applyFrame(iframe); }, delay);
  }

  function applyFrame(iframe) {
    var opts = iframe._dvitesPreviewOpts || {};
    var mode = resolveMode(iframe, opts);
    var autoScroll = !!opts.autoScroll;
    var screenEl = iframe.closest(".phone-screen");
    var isHero = !!iframe.closest(".hero-phone");

    if (isHero) iframe.classList.add("is-hero-preview");
    else iframe.classList.remove("is-hero-preview");

    if (mode === "modal") iframe.classList.add("is-modal-demo");
    else iframe.classList.remove("is-modal-demo");

    if (screenEl) ensureOverlay(screenEl, mode);

    try {
      var doc = iframe.contentDocument;
      var win = iframe.contentWindow;
      if (!doc || !doc.body) return;

      injectStyles(doc, mode, isHero);

      if (mode === "preview") {
        muteMedia(doc);
        if (isHero) injectMutePatch(doc);
        if (!iframe._dvitesPreviewHooks) {
          iframe._dvitesPreviewHooks = true;
          autoSkipOpening(doc, win);
          if (!isHero) blockSwipe(doc);
          iframe._dvitesMuteObs = new MutationObserver(function () {
            if (iframe._dvitesMuteTimer) return;
            iframe._dvitesMuteTimer = setTimeout(function () {
              iframe._dvitesMuteTimer = null;
              muteMedia(doc);
            }, 400);
          });
          iframe._dvitesMuteObs.observe(doc.body, { childList: true, subtree: true });
          setTimeout(function () { disconnectIframeObservers(iframe); }, 30000);
        }
        if (screenEl) {
          if (isHero) fillHeroPreview(iframe);
          else fitIframeScale(iframe, screenEl);
        }
      } else {
        hideModalChrome(doc);
        if (screenEl) fillIframe(iframe);
        if (!iframe._dvitesModalChromeScheduled) {
          iframe._dvitesModalChromeScheduled = true;
          scheduleModalChrome(iframe, doc, mode, isHero);
        }
      }
    } catch (e) { /* noop */ }

    if (autoScroll && mode === "preview") {
      scheduleHeroAutoScroll(iframe);
    }
  }

  if (!global._dvitesPreviewResizeBound) {
    global._dvitesPreviewResizeBound = true;
    global.addEventListener("resize", function () {
      document.querySelectorAll(".phone-iframe-scaler iframe").forEach(function (frame) {
        var screen = frame.closest(".phone-screen");
        if (!screen || !frame.contentDocument) return;
        var mode = resolveMode(frame, frame._dvitesPreviewOpts || {});
        var isHero = !!frame.closest(".hero-phone");
        if (isHero) fillHeroPreview(frame);
        else if (mode === "preview") fitIframeScale(frame, screen);
        else fillIframe(frame);
      });
    });
  }

  function previewUrl(url) {
    if (!url) return url;
    var join = url.indexOf("?") >= 0 ? "&" : "?";
    return url + join + "preview=1&preview=true&skipEnvelope=true";
  }

  global.DvitesPhonePreview = {
    setup: setup,
    previewUrl: previewUrl,
    overlayHeight: overlayHeight
  };
})(window);
