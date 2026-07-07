import { isAdminAuthorized, adminUnauthorizedResponse } from "../_lib/admin-auth.js";
import { rangeToBounds } from "../_lib/dates.js";
import { supabaseSelect } from "../_lib/supabase.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function enc(value) {
  return encodeURIComponent(value);
}

function buildFollowUpMessage(order) {
  const lines = [
    "Hi " + (order.customer_name || "there") + ",",
    "",
    "Thank you for your Dvites order. Please share your wedding details, photos, and events so we can customize your invitation.",
    "",
    "Order ID: " + (order.id || "—"),
    "Payment ID: " + (order.razorpay_payment_id || "—"),
    "Template: " + (order.template_name || "—"),
    "",
    "Thank you.",
  ];
  return lines.join("\n");
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!isAdminAuthorized(request, env)) return adminUnauthorizedResponse();

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const search = (url.searchParams.get("search") || "").trim().toLowerCase();
  const range = url.searchParams.get("range") || "all";
  const status = url.searchParams.get("status") || "";
  const from = url.searchParams.get("from") || "";
  const to = url.searchParams.get("to") || "";
  const limit = Math.min(Number(url.searchParams.get("limit") || 200), 500);

  if (id) {
    const result = await supabaseSelect(
      env,
      "orders",
      "select=*&id=eq." + enc(id) + "&limit=1"
    );
    if (!result.ok || !result.data.length) {
      return jsonResponse({ error: "Order not found." }, 404);
    }
    const order = result.data[0];
    const message = buildFollowUpMessage(order);
    return jsonResponse({
      order,
      follow_up: {
        whatsapp: "https://wa.me/" + (order.customer_phone || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(message),
        email:
          "mailto:" +
          (order.customer_email || "") +
          "?subject=" +
          encodeURIComponent("Dvites — Wedding Details") +
          "&body=" +
          encodeURIComponent(message),
      },
    });
  }

  let query = "select=*&order=created_at.desc&limit=" + limit;

  if (status) query += "&customization_status=eq." + enc(status);
  if (range !== "all") {
    const bounds = rangeToBounds(range, from, to);
    query += "&created_at=gte." + enc(bounds.start) + "&created_at=lte." + enc(bounds.end);
  }

  const result = await supabaseSelect(env, "orders", query);
  if (!result.ok) return jsonResponse({ error: result.error }, 500);

  let orders = result.data;
  if (search) {
    orders = orders.filter(function (order) {
      const haystack = [
        order.id,
        order.customer_name,
        order.customer_email,
        order.customer_phone,
        order.template_name,
        order.template_slug,
        order.razorpay_payment_id,
        order.razorpay_order_id,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.indexOf(search) !== -1;
    });
  }

  const paid = orders.filter((o) => o.payment_status === "paid");
  const revenue = paid.reduce((sum, o) => sum + Number(o.amount || 0), 0);

  const todayBounds = rangeToBounds("today");
  const weekBounds = rangeToBounds("week");
  const monthBounds = rangeToBounds("month");

  const todayOrders = orders.filter(
    (o) => o.created_at >= todayBounds.start && o.created_at <= todayBounds.end
  );
  const weekOrders = orders.filter(
    (o) => o.created_at >= weekBounds.start && o.created_at <= weekBounds.end
  );
  const monthOrders = orders.filter(
    (o) => o.created_at >= monthBounds.start && o.created_at <= monthBounds.end
  );

  return jsonResponse({
    orders,
    summary: {
      total_orders: orders.length,
      total_revenue: revenue,
      today_orders: todayOrders.length,
      week_orders: weekOrders.length,
      month_orders: monthOrders.length,
    },
  });
}
