(() => {
  const INVITE_SLUG = "demo-39e188";
  const INVITE_PATH = "/invite/" + INVITE_SLUG;
  const INVITE_SERVE_URL = INVITE_PATH + "/";
  const TEMPLATE_INDEX = "/templates/curtains/index.html";
  const previewParams = new URLSearchParams(location.search);
  const isPreview =
    previewParams.get("preview") === "1" ||
    previewParams.get("preview") === "true" ||
    window.self !== window.top;
  let invitePayload = null;

  if (isPreview) {
    window.__DVITES_PREVIEW__ = true;
    document.documentElement.classList.add("dvites-preview-mode", "dvites-embedded-preview");

    if (previewParams.get("skipEnvelope") === "true") {
      previewParams.delete("skipEnvelope");
      history.replaceState(
        null,
        "",
        location.pathname + (previewParams.toString() ? "?" + previewParams.toString() : "") + location.hash
      );
    }

    const previewStyle = document.createElement("style");
    previewStyle.id = "dvites-template-preview-fix";
    previewStyle.textContent =
      "html.dvites-preview-mode .dvites-buy-bar{display:none!important}" +
      "html.dvites-preview-mode body{padding-top:0!important;margin-top:0!important}" +
      "html.dvites-preview-mode .fixed.inset-0.z-50{display:none!important}" +
      "html.dvites-preview-mode button[aria-label*='music' i]," +
      "html.dvites-preview-mode button[aria-label*='Mute' i]," +
      "html.dvites-preview-mode button[aria-label*='Unmute' i]" +
      "{display:flex!important;visibility:visible!important;pointer-events:auto!important;opacity:1!important}";
    (document.head || document.documentElement).appendChild(previewStyle);

    function autoSkipOpening() {
      function tryOpen() {
        document.querySelectorAll("div.cursor-pointer,[class*='cursor-pointer']").forEach(function (el) {
          const cls = String(el.className || "");
          if (cls.indexOf("inset-0") >= 0 || (cls.indexOf("absolute") >= 0 && cls.indexOf("items-center") >= 0)) {
            el.click();
          }
        });

        document.querySelectorAll("p,span,button,div").forEach(function (el) {
          const text = (el.textContent || "").trim();
          if (!/^tap to open$/i.test(text) && !/^toca para abrir$/i.test(text)) return;
          let node = el;
          for (let i = 0; i < 8 && node; i++) {
            if (node.onclick || String(node.className || "").indexOf("cursor-pointer") >= 0) {
              node.click();
              return;
            }
            node = node.parentElement;
          }
        });
      }

      tryOpen();
      [300, 900, 1800, 3000, 5000].forEach(function (delay) {
        setTimeout(tryOpen, delay);
      });

      function watch() {
        if (!document.body) return;
        const observer = new MutationObserver(tryOpen);
        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(function () { observer.disconnect(); }, 12000);
      }

      if (document.body) watch();
      else document.addEventListener("DOMContentLoaded", watch);
    }

    autoSkipOpening();
  }

  // Serve from /templates/curtains/ on Cloudflare; rewrite URL for SPA router without reload.
  const TEMPLATE_PREFIX = "/templates/curtains/";
  const path = location.pathname;
  if (path === INVITE_PATH) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (
    path.startsWith(TEMPLATE_PREFIX) ||
    path === "/templates/curtains"
  ) {
    history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.startsWith(INVITE_PATH) && path.endsWith("/index.html")) {
    history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
  }

  // Dvites branding cleanup: replaces any leftover Wooow/WooowInvites text rendered by bundled React chunks.
  const DVITES_BRAND_REPLACEMENTS = [
    [/Made with Love\s*❤️?\s*with\s*WooowInvites/gi, "Crafted by Dvites"],
    [/Made with Love\s*❤️?\s*with\s*DvitesInvites/gi, "Crafted by Dvites"],
    [/Made with Love\s*❤️?\s*with\s*Dvites/gi, "Crafted by Dvites"],
    [/WooowInvites/g, "Dvites"],
    [/Wooow Invites/g, "Dvites"],
    [/WOOOWINVITES/g, "DVITES"],
    [/Wooow/g, "Dvites"],
    [/wooowinvites\.com/g, "dvites.com"],
    [/www\.wooowinvites\.com/g, "dvites.com"],
    [/wooow/g, "dvites"],
    [/Made with love by Dvites\s*❤️?/gi, "Crafted by Dvites"],
  ];
  

  function cleanDvitesBranding(root = document.body) {
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      let value = node.nodeValue || "";
      let next = value;
      DVITES_BRAND_REPLACEMENTS.forEach(([pattern, replacement]) => {
        next = next.replace(pattern, replacement);
      });
      if (next !== value) node.nodeValue = next;
    });

    root.querySelectorAll?.("a[href], img[src], [alt], [title], [aria-label]").forEach((el) => {
      ["href", "src", "alt", "title", "aria-label"].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (!value) return;
        let next = value;
        DVITES_BRAND_REPLACEMENTS.forEach(([pattern, replacement]) => {
          next = next.replace(pattern, replacement);
        });
        if (next !== value) el.setAttribute(attr, next);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    cleanDvitesBranding();
    const observer = new MutationObserver(() => cleanDvitesBranding());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true });
  });

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (url.includes("ipapi.co")) {
      return new Response(JSON.stringify({ country_code: "IN" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if ((url.includes("dvites.com") || url.includes("wooowinvites.com")) && !url.includes("/assets/")) {
      return new Response(JSON.stringify({}), {
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
        return new Response("false", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (url.includes("/rpc/verify_event_password")) {
        return new Response("true", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (url.includes("/rpc/get_demo_invitation")) {
        if (!invitePayload) {
          const res = await originalFetch("/templates/curtains/assets/data/invite.json");
          const json = await res.json();
          invitePayload = json.row;
        }
        return new Response(JSON.stringify(invitePayload), {
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
        return new Response("[]", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return originalFetch(input, init);
  };
})();