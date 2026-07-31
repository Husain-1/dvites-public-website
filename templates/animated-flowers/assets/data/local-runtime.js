(() => {
  const INVITE_SLUG = "demo-692f06";
  const INVITE_PATH = "/invite/" + INVITE_SLUG;
  const INVITE_SERVE_URL = INVITE_PATH + "/";
  const TEMPLATE_PREFIX = "/templates/animated-flowers";
  const DATA_PREFIX = TEMPLATE_PREFIX + "/assets/data/";
  let invitePayload = null;

  (function initEmbeddedPreview() {
    const params = new URLSearchParams(location.search);
    const isPreview =
      params.get("preview") === "1" ||
      params.get("preview") === "true" ||
      window.self !== window.top;
    if (!isPreview) return;

    window.__DVITES_PREVIEW__ = true;
    document.documentElement.classList.add("dvites-preview-mode", "dvites-embedded-preview");

    if (params.get("skipEnvelope") === "true") {
      params.delete("skipEnvelope");
      history.replaceState(
        null,
        "",
        location.pathname + (params.toString() ? "?" + params.toString() : "") + location.hash
      );
    }

    const previewStyle = document.createElement("style");
    previewStyle.id = "dvites-template-preview-fix";
    previewStyle.textContent =
      "html.dvites-preview-mode .dvites-buy-bar{display:none!important}" +
      "html.dvites-preview-mode body{padding-top:0!important;margin-top:0!important}" +
      "html.dvites-preview-mode button[aria-label*='music' i]," +
      "html.dvites-preview-mode button[aria-label*='Mute' i]," +
      "html.dvites-preview-mode button[aria-label*='Unmute' i]" +
      "{display:flex!important;visibility:visible!important;pointer-events:auto!important;opacity:1!important}";

    function mountPreviewStyle() {
      if (!document.getElementById("dvites-template-preview-fix")) {
        (document.head || document.documentElement).appendChild(previewStyle);
      }
    }

    mountPreviewStyle();

    function tryPlayMusic() {
      document.querySelectorAll("audio,video").forEach(function (el) {
        try {
          el.muted = false;
          el.defaultMuted = false;
          el.volume = 1;
          el.removeAttribute("muted");
          const playResult = el.play();
          if (playResult && typeof playResult.catch === "function") {
            playResult.catch(function () { /* autoplay may require in-iframe tap */ });
          }
        } catch (e) { /* noop */ }
      });
    }

    function autoSkipOpening() {
      function tryOpen() {
        document.querySelectorAll("div.cursor-pointer,[class*='cursor-pointer']").forEach(function (el) {
          const cls = String(el.className || "");
          if (cls.indexOf("inset-0") >= 0 || (cls.indexOf("absolute") >= 0 && cls.indexOf("items-center") >= 0)) {
            el.click();
          }
        });

        document.querySelectorAll("p,span,button,div,a").forEach(function (el) {
          const text = (el.textContent || "").trim();
          if (
            !/^tap to open$/i.test(text) &&
            !/^toca para abrir$/i.test(text) &&
            !/you are invited/i.test(text)
          ) {
            return;
          }
          let node = el;
          for (let i = 0; i < 10 && node; i++) {
            if (node.onclick || String(node.className || "").indexOf("cursor-pointer") >= 0 || node.tagName === "BUTTON") {
              node.click();
              return;
            }
            node = node.parentElement;
          }
          el.click();
        });
      }

      tryOpen();
      [300, 900, 1800, 3000, 5000].forEach(function (delay) {
        setTimeout(tryOpen, delay);
      });

      function watch() {
        if (!document.body) return;
        const observer = new MutationObserver(function () {
          mountPreviewStyle();
          tryOpen();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(function () { observer.disconnect(); }, 12000);
      }

      if (document.body) watch();
      else document.addEventListener("DOMContentLoaded", watch);
    }

    autoSkipOpening();

    function advanceOpeningMedia() {
      document.querySelectorAll("video").forEach(function (video) {
        try {
          if (video.duration && isFinite(video.duration)) {
            video.currentTime = Math.max(0, video.duration - 0.05);
          }
          video.dispatchEvent(new Event("ended"));
        } catch (e) { /* noop */ }
      });
      document.querySelectorAll("[data-opening-overlay],.fixed.inset-0").forEach(function (el) {
        try {
          el.click();
        } catch (e) { /* noop */ }
      });
    }

    [900, 1800, 3200, 5500, 8000].forEach(function (delay) {
      setTimeout(advanceOpeningMedia, delay);
    });

    [1200, 2500, 4500, 7000].forEach(function (delay) {
      setTimeout(tryPlayMusic, delay);
    });

    document.addEventListener("click", tryPlayMusic, { once: true, capture: true });
    document.addEventListener("touchstart", tryPlayMusic, { once: true, capture: true });
  })();

  (function normalizeInvitePath() {
    const path = location.pathname.replace(/\/index\.html$/, "/");
    if (path === INVITE_PATH) {
      location.replace(INVITE_SERVE_URL + location.search + location.hash);
      return;
    }
    if (path === TEMPLATE_PREFIX || path === TEMPLATE_PREFIX + "/") {
      history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
      return;
    }
    if (path.startsWith(TEMPLATE_PREFIX) && path.endsWith("/index.html")) {
      history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
    }
  })();

  async function submitRsvpMock(payload) {
    console.info("[Dvites RSVP adapter] captured locally only", payload);
    return {
      ok: true,
      message: "Thank you! Your RSVP has been recorded locally for preview.",
    };
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (/ipapi\.co|ipify\.org|capi-automation|facebook\.com\/tr|googletagmanager|google-analytics|~\/api\/analytics|~flock\.js/i.test(url)) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("wooowinvites.com") && !url.includes("/assets/") && !url.includes("/audio/")) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (/functions\/v1\/(rsvp|submit|track)/i.test(url) || /\/rest\/v1\/rsvp/i.test(url)) {
      let body = {};
      try {
        body = init && init.body ? JSON.parse(init.body) : {};
      } catch (_) {}
      const result = await submitRsvpMock(body);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("kdcyugwruypwrmtllswt.supabase.co")) {
      if (url.includes("/rpc/get_invitation_data")) {
        return new Response("[]", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/rpc/get_event_password_status")) {
        return new Response("false", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/verify_event_password")) {
        return new Response("true", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/get_demo_invitation")) {
        if (!invitePayload) {
          const res = await originalFetch(DATA_PREFIX + "invite.json");
          const json = await res.json();
          invitePayload = json.row;
        }
        const payload =
          window.__DVITES_PREVIEW__ && invitePayload
            ? Object.assign({}, invitePayload, { custom_video_url: null })
            : invitePayload;
        return new Response(JSON.stringify(payload), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/auth/v1/")) {
        return new Response(JSON.stringify({ message: "Auth session missing!" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/functions/v1/")) {
        return new Response(JSON.stringify({ error: "Blocked in local demo" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/rest/v1/")) {
        return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
      }
    }

    return originalFetch(input, init);
  };
})();
