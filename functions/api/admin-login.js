function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const adminKey = String(env.ADMIN_API_KEY || "").trim();

  if (!adminKey) {
    return jsonResponse({ ok: false, error: "Admin access is not configured on the server." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON body." }, 400);
  }

  const username = String(body.username || body.email || "")
    .trim()
    .toLowerCase();
  const password = String(body.password || "").trim();

  if (!username || !password) {
    return jsonResponse({ ok: false, error: "Email and password are required." }, 400);
  }

  const expectedUser = String(env.ADMIN_USERNAME || "admin")
    .trim()
    .toLowerCase();
  const expectedPass = String(env.ADMIN_PASSWORD || "5372").trim();

  if (username !== expectedUser || password !== expectedPass) {
    return jsonResponse({ ok: false, error: "Invalid email or password." }, 401);
  }

  return jsonResponse({ ok: true, adminKey: adminKey });
}
