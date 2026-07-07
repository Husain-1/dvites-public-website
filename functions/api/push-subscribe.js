import { supabaseUpsert } from "../_lib/supabase.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function cleanText(value, max) {
  return String(value || "")
    .trim()
    .slice(0, max || 500);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const endpoint = cleanText(body.endpoint, 1000);
  const p256dh = cleanText(body.p256dh, 300);
  const auth = cleanText(body.auth, 200);
  const userAgent = cleanText(body.user_agent || request.headers.get("User-Agent"), 500);

  if (!endpoint || !p256dh || !auth) {
    return jsonResponse({ error: "Missing subscription fields." }, 400);
  }

  const result = await supabaseUpsert(
    env,
    "push_subscriptions",
    {
      endpoint,
      p256dh,
      auth,
      user_agent: userAgent || null,
    },
    "endpoint"
  );

  if (!result.ok) {
    return jsonResponse({ error: result.error }, 500);
  }

  return jsonResponse({ ok: true, id: result.data && result.data.id });
}

export async function onRequestGet(context) {
  const { env } = context;
  const publicKey = env.VAPID_PUBLIC_KEY || "";
  return jsonResponse({
    publicKey,
    enabled: Boolean(publicKey),
  });
}
