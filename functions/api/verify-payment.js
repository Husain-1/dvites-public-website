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

export async function onRequestPost(context) {
  const { request, env } = context;
  const keySecret = env.RAZORPAY_KEY_SECRET;

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

  if (expectedSignature === signature) {
    return jsonResponse({ success: true });
  }

  return jsonResponse({ success: false });
}
