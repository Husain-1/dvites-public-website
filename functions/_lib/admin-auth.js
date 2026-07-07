export function isAdminAuthorized(request, env) {
  const expected = String(env.ADMIN_API_KEY || "").trim();
  if (!expected) return false;

  const headerKey = String(request.headers.get("X-Dvites-Admin-Key") || "").trim();
  if (headerKey && headerKey === expected) return true;

  const auth = String(request.headers.get("Authorization") || "").trim();
  if (auth === "Bearer " + expected) return true;

  return false;
}

export function adminUnauthorizedResponse() {
  return new Response(JSON.stringify({ error: "Unauthorized." }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
