import { notifyAdminsOfOrder } from "../_lib/webpush.js";
import {
  extractClientIp,
  extractUserAgent,
  rupeesFromTrustedSources,
  sendMetaPurchase,
  splitCustomerName,
} from "../lib/meta-capi.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function hmacSha256(secret, message) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map(function (byte) {
      return byte.toString(16).padStart(2, "0");
    })
    .join("");
}

function cleanText(value, maxLength) {
  return String(value || "")
    .trim()
    .slice(0, maxLength || 500);
}

async function fetchRazorpayPayment(paymentId, keyId, keySecret) {
  const auth = btoa(keyId + ":" + keySecret);
  const response = await fetch("https://api.razorpay.com/v1/payments/" + encodeURIComponent(paymentId), {
    headers: { Authorization: "Basic " + auth },
  });
  if (!response.ok) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function fetchRazorpayOrder(orderId, keyId, keySecret) {
  const auth = btoa(keyId + ":" + keySecret);
  const response = await fetch("https://api.razorpay.com/v1/orders/" + encodeURIComponent(orderId), {
    headers: { Authorization: "Basic " + auth },
  });
  if (!response.ok) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function saveOrderToSupabase(env, row) {
  const supabaseUrl = String(env.SUPABASE_URL || "").replace(/\/$/, "");
  const supabaseKey = env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { saved: false, error: "Order storage is not configured." };
  }

  try {
    const response = await fetch(supabaseUrl + "/rest/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: "Bearer " + supabaseKey,
        Prefer: "return=representation",
      },
      body: JSON.stringify(row),
    });

    const data = await response.json().catch(function () {
      return null;
    });

    if (!response.ok) {
      const message =
        (data && (data.message || data.error || data.hint)) ||
        "Unable to save order.";
      return { saved: false, error: String(message).slice(0, 200) };
    }

    const savedRow = Array.isArray(data) ? data[0] : data;
    return {
      saved: true,
      orderId: savedRow && savedRow.id ? String(savedRow.id) : null,
    };
  } catch {
    return { saved: false, error: "Unable to save order." };
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const keySecret = env.RAZORPAY_KEY_SECRET;
  const keyId = env.RAZORPAY_KEY_ID;

  if (!keySecret) {
    return jsonResponse({ success: false, error: "Payment is not configured." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON body." }, 400);
  }

  const orderId = String(body.razorpay_order_id || "").trim();
  const paymentId = String(body.razorpay_payment_id || "").trim();
  const signature = String(body.razorpay_signature || "").trim();

  if (!orderId || !paymentId || !signature) {
    return jsonResponse({ success: false, error: "Missing payment verification fields." }, 400);
  }

  const expectedSignature = await hmacSha256(keySecret, orderId + "|" + paymentId);

  if (expectedSignature !== signature) {
    return jsonResponse({ success: false });
  }

  let templateSlug = cleanText(body.template_slug, 120);
  let templateName = cleanText(body.template_name, 240);
  const notes = cleanText(body.notes, 1000);

  let customerName = cleanText(body.customer_name, 160);
  let customerEmail = cleanText(body.customer_email, 200);
  let customerPhone = cleanText(body.customer_phone, 40);

  let paymentRecord = null;
  let orderRecord = null;

  if (keyId) {
    const [payment, order] = await Promise.all([
      fetchRazorpayPayment(paymentId, keyId, keySecret),
      fetchRazorpayOrder(orderId, keyId, keySecret),
    ]);
    paymentRecord = payment;
    orderRecord = order;

    if (payment) {
      if (!customerEmail && payment.email) customerEmail = cleanText(payment.email, 200);
      if (!customerPhone && payment.contact) customerPhone = cleanText(payment.contact, 40);
      if (!customerName && payment.notes && payment.notes.customer_name) {
        customerName = cleanText(payment.notes.customer_name, 160);
      }
    }

    if (order) {
      if (!templateName && order.notes && order.notes.templateName) {
        templateName = cleanText(order.notes.templateName, 240);
      }
      if (!templateSlug && order.notes && order.notes.template_slug) {
        templateSlug = cleanText(order.notes.template_slug, 120);
      }
    }
  }

  const verifiedCurrency = cleanText(
    (paymentRecord && paymentRecord.currency) ||
      (orderRecord && orderRecord.currency) ||
      body.currency ||
      "INR",
    8
  ).toUpperCase();

  const verifiedAmountRupees = rupeesFromTrustedSources({
    paymentAmountPaise: paymentRecord && paymentRecord.amount,
    orderAmountPaise: orderRecord && orderRecord.amount,
  });

  let amount = verifiedAmountRupees;
  if (!amount) {
    const clientAmount = Number(body.amount);
    if (Number.isFinite(clientAmount) && clientAmount > 0) {
      amount = clientAmount;
    }
  }
  if (!amount) {
    amount = 799;
  }

  const metaAmountRupees =
    verifiedCurrency === "INR" && verifiedAmountRupees ? verifiedAmountRupees : null;

  const orderRow = {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
    customer_name: customerName || null,
    customer_email: customerEmail || null,
    customer_phone: customerPhone || null,
    template_slug: templateSlug || null,
    template_name: templateName || "Dvites Wedding Invitation",
    amount: amount,
    currency: verifiedCurrency || "INR",
    payment_status: "paid",
    customization_status: "New",
    notes: notes || null,
  };

  const saveResult = await saveOrderToSupabase(env, orderRow);

  let pushResult = { sent: 0, skipped: true };
  if (saveResult.saved) {
    pushResult = await notifyAdminsOfOrder(env, {
      id: saveResult.orderId,
      template_name: orderRow.template_name,
      amount: orderRow.amount,
    });

    const nameParts = splitCustomerName(customerName);
    const eventSourceUrl =
      cleanText(body.event_source_url, 1000) ||
      cleanText(body.landing_url, 1000) ||
      null;

    try {
      if (metaAmountRupees) {
        await sendMetaPurchase({
          env: env,
          eventId: paymentId,
          eventTime: Math.floor(Date.now() / 1000),
          eventSourceUrl: eventSourceUrl,
          value: metaAmountRupees,
          currency: "INR",
          orderId: saveResult.orderId || orderId,
          contentId: templateSlug || null,
          contentName: orderRow.template_name,
          fbp: cleanText(body.meta_fbp, 256) || null,
          fbc: cleanText(body.meta_fbc, 256) || null,
          clientIpAddress: extractClientIp(request),
          clientUserAgent: extractUserAgent(request),
          customer: {
            email: customerEmail || null,
            phone: customerPhone || null,
            firstName: nameParts.firstName,
            lastName: nameParts.lastName,
            country: "in",
            externalId: saveResult.orderId || paymentId,
          },
        });
      }
    } catch {
      console.log(
        JSON.stringify({
          service: "meta-capi",
          level: "error",
          event_name: "Purchase",
          event: "purchase_unhandled",
          success: false,
        })
      );
    }
  }

  return jsonResponse({
    success: true,
    order_saved: saveResult.saved,
    order_id: saveResult.orderId || null,
    order_save_error: saveResult.saved ? null : saveResult.error || "Unable to save order.",
    push_sent: pushResult.sent || 0,
    razorpay_payment_id: paymentId,
    template_slug: templateSlug || null,
    template_name: templateName || "Dvites Wedding Invitation",
    customer_name: customerName || null,
    customer_email: customerEmail || null,
    customer_phone: customerPhone || null,
  });
}
