import { isAdminAuthorized, adminUnauthorizedResponse } from "../_lib/admin-auth.js";
import { rangeToBounds, liveSinceIso } from "../_lib/dates.js";
import { supabaseCount, supabaseSelect } from "../_lib/supabase.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function enc(value) {
  return encodeURIComponent(value);
}

async function countEvents(env, eventType, start, end, extra) {
  let query =
    "select=id" +
    "&created_at=gte." + enc(start) +
    "&created_at=lte." + enc(end);
  if (eventType) query += "&event_type=eq." + enc(eventType);
  if (extra) query += extra;
  const result = await supabaseCount(env, "analytics_events", query);
  return result.ok ? result.count : 0;
}

async function countDistinctVisitors(env, start, end) {
  const result = await supabaseSelect(
    env,
    "analytics_events",
    "select=visitor_id" +
      "&created_at=gte." + enc(start) +
      "&created_at=lte." + enc(end) +
      "&visitor_id=not.is.null"
  );
  if (!result.ok) return 0;
  const set = new Set(result.data.map((row) => row.visitor_id).filter(Boolean));
  return set.size;
}

async function groupByField(env, field, eventType, start, end) {
  const result = await supabaseSelect(
    env,
    "analytics_events",
    "select=" + field +
      "&event_type=eq." + enc(eventType) +
      "&created_at=gte." + enc(start) +
      "&created_at=lte." + enc(end)
  );
  if (!result.ok) return [];

  const counts = {};
  result.data.forEach((row) => {
    const key = row[field] || "(unknown)";
    counts[key] = (counts[key] || 0) + 1;
  });

  return Object.keys(counts)
    .map((key) => ({ label: key, count: counts[key] }))
    .sort((a, b) => b.count - a.count);
}

async function ordersRevenue(env, start, end) {
  const result = await supabaseSelect(
    env,
    "orders",
    "select=amount,created_at" +
      "&payment_status=eq.paid" +
      "&created_at=gte." + enc(start) +
      "&created_at=lte." + enc(end)
  );
  if (!result.ok) return { count: 0, revenue: 0 };
  const revenue = result.data.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  return { count: result.data.length, revenue };
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!isAdminAuthorized(request, env)) return adminUnauthorizedResponse();

  const url = new URL(request.url);
  const range = url.searchParams.get("range") || "today";
  const from = url.searchParams.get("from") || "";
  const to = url.searchParams.get("to") || "";
  const bounds = rangeToBounds(range, from, to);

  const liveSince = liveSinceIso(60);
  const liveCount = await supabaseCount(
    env,
    "live_sessions",
    "select=id&last_seen_at=gte." + enc(liveSince)
  );

  const [
    pageViews,
    templateViews,
    modalOpens,
    demoClicks,
    buyClicks,
    checkoutOpens,
    paymentSuccesses,
    visitors,
    orders,
  ] = await Promise.all([
    countEvents(env, "page_view", bounds.start, bounds.end),
    countEvents(env, "template_card_view", bounds.start, bounds.end),
    countEvents(env, "modal_open", bounds.start, bounds.end),
    countEvents(env, "demo_click", bounds.start, bounds.end),
    countEvents(env, "buy_click", bounds.start, bounds.end),
    countEvents(env, "checkout_open", bounds.start, bounds.end),
    countEvents(env, "payment_success", bounds.start, bounds.end),
    countDistinctVisitors(env, bounds.start, bounds.end),
    ordersRevenue(env, bounds.start, bounds.end),
  ]);

  const conversionRate =
    checkoutOpens > 0 ? Number(((paymentSuccesses / checkoutOpens) * 100).toFixed(2)) : 0;

  const [pageBreakdown, templateBreakdown] = await Promise.all([
    groupByField(env, "page_path", "page_view", bounds.start, bounds.end),
    groupByField(env, "template_slug", "template_card_view", bounds.start, bounds.end),
  ]);

  const todayBounds = rangeToBounds("today");
  const yesterdayBounds = rangeToBounds("yesterday");
  const weekBounds = rangeToBounds("week");
  const monthBounds = rangeToBounds("month");

  const [todayVisitors, yesterdayVisitors, weekVisitors, monthVisitors] = await Promise.all([
    countDistinctVisitors(env, todayBounds.start, todayBounds.end),
    countDistinctVisitors(env, yesterdayBounds.start, yesterdayBounds.end),
    countDistinctVisitors(env, weekBounds.start, weekBounds.end),
    countDistinctVisitors(env, monthBounds.start, monthBounds.end),
  ]);

  return jsonResponse({
    range: bounds.label,
    start: bounds.start,
    end: bounds.end,
    live_visitors: liveCount.ok ? liveCount.count : 0,
    visitors_today: todayVisitors,
    visitors_yesterday: yesterdayVisitors,
    visitors_week: weekVisitors,
    visitors_month: monthVisitors,
    visitors_in_range: visitors,
    page_views: pageViews,
    template_views: templateViews,
    modal_opens: modalOpens,
    demo_clicks: demoClicks,
    buy_clicks: buyClicks,
    checkout_opens: checkoutOpens,
    payment_successes: paymentSuccesses,
    conversion_rate: conversionRate,
    orders_count: orders.count,
    revenue: orders.revenue,
    page_breakdown: pageBreakdown.slice(0, 20),
    template_breakdown: templateBreakdown.slice(0, 20),
  });
}
