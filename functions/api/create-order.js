const PRICE_RUPEES = 1499;
const PRICE_PAISE = PRICE_RUPEES * 100;
const PARTNER_MIN = 3;
const PARTNER_MAX = 5;
const PARTNER_DISCOUNT = 0.05;

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function partnerTotalPaise(count) {
  const subtotal = count * PRICE_RUPEES;
  const discount = Math.round(subtotal * PARTNER_DISCOUNT);
  return (subtotal - discount) * 100;
}

function isValidAmount(amount) {
  const value = Number(amount);
  if (!Number.isInteger(value) || value <= 0) return false;
  if (value === PRICE_PAISE) return true;

  for (let count = PARTNER_MIN; count <= PARTNER_MAX; count += 1) {
    if (value === partnerTotalPaise(count)) return true;
  }

  return false;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return jsonResponse({ error: "Payment is not configured." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const templateName = String(body.templateName || "").trim();
  const templateSlug = String(body.templateSlug || "").trim();
  const amount = Number(body.amount);

  if (!templateName) {
    return jsonResponse({ error: "Missing template name." }, 400);
  }

  if (!isValidAmount(amount)) {
    return jsonResponse({ error: "Invalid order amount." }, 400);
  }

  const receipt = "dvites_" + Date.now();
  const orderNotes = { templateName };
  if (templateSlug) orderNotes.template_slug = templateSlug;

  const orderPayload = {
    amount,
    currency: "INR",
    receipt,
    notes: orderNotes,
  };

  const auth = btoa(keyId + ":" + keySecret);
  const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + auth,
    },
    body: JSON.stringify(orderPayload),
  });

  const order = await razorpayResponse.json();
  if (!razorpayResponse.ok) {
    const message =
      (order && order.error && order.error.description) ||
      "Unable to create Razorpay order.";
    return jsonResponse({ error: message }, razorpayResponse.status);
  }

  return jsonResponse({
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    key_id: keyId,
  });
}
