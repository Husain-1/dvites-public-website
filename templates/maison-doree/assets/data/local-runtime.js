(() => {
  if (location.pathname !== "/") {
    history.replaceState(null, "", "/" + location.search + location.hash);
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (
      url.includes("supabase.co") ||
      url.includes("stripe.com") ||
      url.includes("thedigitalyes.com/__l5e") ||
      url.includes("thedigitalyes.com/~api") ||
      url.includes("/__l5e/") ||
      url.includes("/~flock") ||
      url.includes("ipapi.co")
    ) {
      if (url.includes("/rest/v1/") || url.includes("/rpc/")) {
        return new Response("[]", {
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
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("thedigitalyes.com") && !url.includes("/templates/maison-doree/")) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return originalFetch(input, init);
  };

  window.fbq = function() {};
  window.fbq.q = [];
  window.gtag = function() {};
  window.dataLayer = window.dataLayer || [];
})();
