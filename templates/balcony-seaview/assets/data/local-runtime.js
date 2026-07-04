(() => {
  const INVITE_SLUG = "demo-4638f3";
  const INVITE_PATH = "/invite/" + INVITE_SLUG;
  const INVITE_SERVE_URL = INVITE_PATH + "/";
  let invitePayload = null;

  // Static servers cannot serve /invite/:slug without a real file. Navigate to the
  // reloadable stub at /invite/:slug/ (invite/:slug/index.html) instead of replaceState.
  const path = location.pathname;
  if (path === INVITE_PATH) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.includes("/templates/balcony-seaview/") && path.endsWith(".html")) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (!path.startsWith(INVITE_PATH)) {
    location.replace(INVITE_SERVE_URL + location.search + location.hash);
  } else if (path.endsWith("/index.html")) {
    history.replaceState(null, "", INVITE_SERVE_URL + location.search + location.hash);
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (url.includes("ipapi.co")) {
      return new Response(JSON.stringify({ country_code: "US" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("Dvites.com") && !url.includes("/assets/")) {
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
          const res = await originalFetch("/templates/balcony-seaview/assets/data/invite.json");
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
