(() => {
  const INVITE_SLUG = "demo-95b457";
  const INVITE_PATH = "/invite/" + INVITE_SLUG;
  const INVITE_SERVE_URL = INVITE_PATH + "/";
  const TEMPLATE_PREFIX = "/templates/botanical-bloom/";
  const L5E_PREFIX = "/templates/botanical-bloom/assets/images/l5e/";
  let invitePayload = null;

  const params = new URLSearchParams(location.search);
  const isPreview = params.get("preview") === "1";
  const isEmbedded = window.parent !== window;

  if (isPreview || isEmbedded) {
    window.__DVITES_PREVIEW__ = true;
    document.documentElement.classList.add("dvites-preview-mode");
    const previewStyle = document.createElement("style");
    previewStyle.textContent =
      "html.dvites-preview-mode .dvites-buy-bar{display:none!important}";
    (document.head || document.documentElement).appendChild(previewStyle);
  }

  const path = location.pathname;
  if (path === INVITE_PATH) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.startsWith(TEMPLATE_PREFIX) || path === "/templates/botanical-bloom") {
    history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.endsWith("/index.html") && path.includes(INVITE_SLUG)) {
    history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
  }

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
        if (!/^tap to open$/i.test(text)) return;
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
    [300, 900, 1800, 3000].forEach(function (delay) {
      setTimeout(tryOpen, delay);
    });
  }

  if (document.body) autoSkipOpening();
  else document.addEventListener("DOMContentLoaded", autoSkipOpening);

  const DVITES_BRAND_REPLACEMENTS = [
    [/Made with Love\s*❤️?\s*with\s*WooowInvites/gi, "Crafted by Dvites"],
    [/WooowInvites/g, "Dvites"],
    [/wooowinvites\.com/g, "dvites.com"],
    [/www\.wooowinvites\.com/g, "dvites.com"],
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
  }

  document.addEventListener("DOMContentLoaded", () => {
    cleanDvitesBranding();
    const observer = new MutationObserver(() => cleanDvitesBranding());
    if (document.body) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });

  function mapL5eUrl(url) {
    if (!url || url.indexOf("/__l5e/assets-v1/") === -1) return null;
    const fileName = url.split("/").pop().split("?")[0];
    if (!fileName) return null;
    if (/\.(mp4|webm|mov)$/i.test(fileName)) {
      return "/templates/botanical-bloom/assets/video/" + fileName;
    }
    return L5E_PREFIX + fileName;
  }

  function rewriteL5eElement(el) {
    if (!el || !el.getAttribute) return;
    ["src", "href", "poster"].forEach(function (attr) {
      const value = el.getAttribute(attr);
      const mapped = mapL5eUrl(value);
      if (mapped) el.setAttribute(attr, mapped);
    });
  }

  function rewriteL5eTree(root) {
    if (!root || !root.querySelectorAll) return;
    rewriteL5eElement(root);
    root.querySelectorAll("[src],[href],[poster]").forEach(rewriteL5eElement);
  }

  document.addEventListener("DOMContentLoaded", function () {
    rewriteL5eTree(document.documentElement);
    const l5eObserver = new MutationObserver(function () {
      rewriteL5eTree(document.documentElement);
    });
    if (document.body) {
      l5eObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "href", "poster"] });
    }
  });

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (/ipify\.org|ipapi\.co|capi-automation|facebook\.com\/tr|googletagmanager|google-analytics|~flock|~api\/analytics/i.test(url)) {
      return new Response(JSON.stringify({}), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const l5eLocal = mapL5eUrl(url);
    if (l5eLocal) {
      return originalFetch(l5eLocal, init);
    }

    if (url.includes("ipapi.co")) {
      return new Response(JSON.stringify({ country_code: "IN" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("wooowinvites.com") && !url.includes("/assets/")) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("kdcyugwruypwrmtllswt.supabase.co")) {
      if (url.includes("/rpc/get_invitation_data")) {
        return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/get_event_password_status")) {
        return new Response("false", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/verify_event_password")) {
        return new Response("true", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.includes("/rpc/get_demo_invitation")) {
        if (!invitePayload) {
          const res = await originalFetch("/templates/botanical-bloom/assets/data/invite.json");
          const json = await res.json();
          invitePayload = json.row;
        }
        return new Response(JSON.stringify(invitePayload), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/auth/v1/") || url.includes("/functions/v1/")) {
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
