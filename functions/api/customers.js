import { isAdminAuthorized, adminUnauthorizedResponse } from "../_lib/admin-auth.js";
import { rangeToBounds } from "../_lib/dates.js";
import { supabaseSelect } from "../_lib/supabase.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  if (!email || !email.includes("@")) return "";
  return email;
}

function normalizePhone(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) digits = "91" + digits;
  return digits;
}

function displayName(order) {
  const name = String(order.customer_name || "").trim();
  const email = normalizeEmail(order.customer_email);
  if (name && name.toLowerCase() !== email) return name;
  if (name) return name;
  if (email) return email.split("@")[0];
  const phone = order.customer_phone || "";
  return phone || "Customer";
}

function customerKey(order) {
  const email = normalizeEmail(order.customer_email);
  if (email) return "e:" + email;
  const phone = normalizePhone(order.customer_phone);
  if (phone) return "p:" + phone;
  return "o:" + order.id;
}

function mergeCustomer(map, order, displayId) {
  const key = customerKey(order);
  let row = map.get(key);
  if (!row) {
    row = {
      id: key,
      name: displayName(order),
      email: normalizeEmail(order.customer_email),
      phone: String(order.customer_phone || "").trim(),
      order_count: 0,
      total_spent: 0,
      products: [],
      product_set: new Set(),
      order_ids: [],
      display_ids: [],
      first_order_at: order.created_at,
      last_order_at: order.created_at,
      last_product: order.template_name || "",
      orders: [],
    };
    map.set(key, row);
  }

  const amount = Number(order.amount || 0);
  const paid = order.payment_status === "paid";
  row.order_count += 1;
  if (paid) row.total_spent += amount;
  if (order.template_name && !row.product_set.has(order.template_name)) {
    row.product_set.add(order.template_name);
    row.products.push(order.template_name);
  }
  row.order_ids.push(order.id);
  if (displayId) row.display_ids.push(displayId);
  if (order.created_at && order.created_at < row.first_order_at) {
    row.first_order_at = order.created_at;
  }
  if (order.created_at && order.created_at >= row.last_order_at) {
    row.last_order_at = order.created_at;
    row.last_product = order.template_name || row.last_product;
  }
  row.orders.push({
    id: order.id,
    display_id: displayId || null,
    created_at: order.created_at,
    template_name: order.template_name,
    template_slug: order.template_slug,
    amount: order.amount,
    payment_status: order.payment_status,
    customer_email: order.customer_email,
    customer_phone: order.customer_phone,
    customer_name: order.customer_name,
  });
  if (!row.email && normalizeEmail(order.customer_email)) {
    row.email = normalizeEmail(order.customer_email);
  }
  if (!row.phone && order.customer_phone) {
    row.phone = String(order.customer_phone).trim();
  }
  if (row.name === "Customer" || !row.name) {
    row.name = displayName(order);
  }
}

async function buildDisplayIdMap(env) {
  const result = await supabaseSelect(
    env,
    "orders",
    "select=id&order=created_at.asc&limit=10000"
  );
  if (!result.ok) return {};
  const map = {};
  result.data.forEach(function (row, index) {
    map[row.id] = String(index + 1).padStart(4, "0");
  });
  return map;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!isAdminAuthorized(request, env)) return adminUnauthorizedResponse();

  const url = new URL(request.url);
  const search = (url.searchParams.get("search") || "").trim().toLowerCase();
  const monthOnly = url.searchParams.get("month") === "1";

  const result = await supabaseSelect(
    env,
    "orders",
    "select=*&order=created_at.desc&limit=5000"
  );
  if (!result.ok) return jsonResponse({ error: result.error }, 500);

  const displayIdMap = await buildDisplayIdMap(env);
  const map = new Map();

  result.data.forEach(function (order) {
    mergeCustomer(map, order, displayIdMap[order.id] || null);
  });

  let customers = Array.from(map.values()).map(function (row) {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      order_count: row.order_count,
      total_spent: row.total_spent,
      products: row.products,
      last_product: row.last_product,
      first_order_at: row.first_order_at,
      last_order_at: row.last_order_at,
      order_ids: row.order_ids,
      display_ids: row.display_ids,
      orders: row.orders,
      is_repeat: row.order_count > 1,
    };
  });

  const monthBounds = rangeToBounds("month");
  const newThisMonth = customers.filter(function (c) {
    return c.first_order_at >= monthBounds.start && c.first_order_at <= monthBounds.end;
  }).length;
  const repeatCustomers = customers.filter(function (c) {
    return c.is_repeat;
  }).length;
  const totalRevenue = customers.reduce(function (sum, c) {
    return sum + c.total_spent;
  }, 0);

  if (monthOnly) {
    customers = customers.filter(function (c) {
      return c.last_order_at >= monthBounds.start && c.last_order_at <= monthBounds.end;
    });
  }

  if (search) {
    customers = customers.filter(function (c) {
      const haystack = [
        c.name,
        c.email,
        c.phone,
        c.products.join(" "),
        c.display_ids.join(" "),
        c.order_ids.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.indexOf(search) !== -1;
    });
  }

  customers.sort(function (a, b) {
    return String(b.last_order_at).localeCompare(String(a.last_order_at));
  });

  return jsonResponse({
    customers,
    summary: {
      total_customers: map.size,
      new_this_month: newThisMonth,
      repeat_customers: repeatCustomers,
      customer_revenue: totalRevenue,
    },
  });
}
