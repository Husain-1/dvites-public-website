import { supabaseInsert, supabaseUpsert } from "../_lib/supabase.js";

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

const ALLOWED_EVENTS = new Set([
  "page_view",
  "template_card_view",
  "modal_open",
  "demo_click",
  "buy_click",
  "checkout_open",
  "payment_success",
  "heartbeat",
]);

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const eventType = cleanText(body.event_type, 64);
  if (!ALLOWED_EVENTS.has(eventType)) {
    return jsonResponse({ error: "Invalid event type." }, 400);
  }

  const pagePath = cleanText(body.page_path, 300);
  const templateSlug = cleanText(body.template_slug, 120);
  const sessionId = cleanText(body.session_id, 120);
  const visitorId = cleanText(body.visitor_id, 120);
  const referrer = cleanText(body.referrer, 500);
  const userAgent = cleanText(body.user_agent, 500);
  const deviceType = cleanText(body.device_type, 32);

  if (!sessionId || !visitorId) {
    return jsonResponse({ error: "Missing session or visitor id." }, 400);
  }

  const now = new Date().toISOString();
  const sessionRow = {
    visitor_id: visitorId,
    session_id: sessionId,
    page_path: pagePath || null,
    last_seen_at: now,
    user_agent: userAgent || null,
    device_type: deviceType || null,
    referrer: referrer || null,
  };

  const sessionResult = await supabaseUpsert(env, "live_sessions", sessionRow, "session_id");
  if (!sessionResult.ok) {
    return jsonResponse({ ok: false, error: sessionResult.error }, 500);
  }

  if (eventType === "heartbeat") {
    return jsonResponse({ ok: true, heartbeat: true });
  }

  const eventResult = await supabaseInsert(env, "analytics_events", {
    event_type: eventType,
    page_path: pagePath || null,
    template_slug: templateSlug || null,
    session_id: sessionId,
    visitor_id: visitorId,
    referrer: referrer || null,
    user_agent: userAgent || null,
    device_type: deviceType || null,
  });

  if (!eventResult.ok) {
    return jsonResponse({ ok: false, error: eventResult.error }, 500);
  }

  return jsonResponse({ ok: true });
}
