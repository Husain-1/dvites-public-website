import { supabaseDelete, supabaseSelect } from "./supabase.js";

function base64UrlToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) output[i] = raw.charCodeAt(i);
  return output;
}

function uint8ArrayToBase64Url(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createVapidJwt(audience, subject, publicKey, privateKeyPkcs8) {
  const header = { typ: "JWT", alg: "ES256" };
  const payload = {
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
    sub: subject,
  };
  const enc = new TextEncoder();
  const unsigned =
    uint8ArrayToBase64Url(enc.encode(JSON.stringify(header))) +
    "." +
    uint8ArrayToBase64Url(enc.encode(JSON.stringify(payload)));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    base64UrlToUint8Array(privateKeyPkcs8),
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    key,
    enc.encode(unsigned)
  );

  return unsigned + "." + uint8ArrayToBase64Url(signature);
}

async function encryptPayload(payloadText, p256dh, authSecret) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const localKeys = await crypto.subtle.generateKey(
    { name: "ECDH", namedCurve: "P-256" },
    true,
    ["deriveBits"]
  );
  const localPublic = new Uint8Array(
    await crypto.subtle.exportKey("raw", localKeys.publicKey)
  );

  const subscriberPublic = await crypto.subtle.importKey(
    "raw",
    base64UrlToUint8Array(p256dh),
    { name: "ECDH", namedCurve: "P-256" },
    false,
    []
  );

  const sharedSecret = await crypto.subtle.deriveBits(
    { name: "ECDH", public: subscriberPublic },
    localKeys.privateKey,
    256
  );

  const authInfo = new TextEncoder().encode("Content-Encoding: auth\0");
  const prk = await hkdf(base64UrlToUint8Array(authSecret), new Uint8Array(sharedSecret), authInfo, 32);
  const cekInfo = concat(
    new TextEncoder().encode("Content-Encoding: aes128gcm\0"),
    new Uint8Array([0])
  );
  const nonceInfo = concat(
    new TextEncoder().encode("Content-Encoding: nonce\0"),
    new Uint8Array([1])
  );
  const contentEncryptionKey = await hkdf(salt, prk, cekInfo, 16);
  const nonce = await hkdf(salt, prk, nonceInfo, 12);

  const record = new Uint8Array(payloadText.length + 1);
  record.set(new TextEncoder().encode(payloadText), 0);
  record[payloadText.length] = 2;

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: nonce },
    await crypto.subtle.importKey("raw", contentEncryptionKey, "AES-GCM", false, ["encrypt"]),
    record
  );

  const body = new Uint8Array(16 + 4 + localPublic.length + encrypted.byteLength);
  body.set(salt, 0);
  body[16] = 0;
  body[17] = 0;
  body[18] = 0;
  body[19] = localPublic.length;
  body.set(localPublic, 20);
  body.set(new Uint8Array(encrypted), 20 + localPublic.length);
  return body;
}

function concat(a, b) {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

async function hkdf(salt, ikm, info, length) {
  const key = await crypto.subtle.importKey("raw", ikm, "HKDF", false, ["deriveBits"]);
  return new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: "HKDF", hash: "SHA-256", salt, info },
      key,
      length * 8
    )
  );
}

async function sendWebPush(subscription, payload, vapid) {
  const endpoint = new URL(subscription.endpoint);
  const audience = endpoint.origin;
  const jwt = await createVapidJwt(
    audience,
    vapid.subject,
    vapid.publicKey,
    vapid.privateKey
  );
  const body = await encryptPayload(
    JSON.stringify(payload),
    subscription.p256dh,
    subscription.auth
  );

  const response = await fetch(subscription.endpoint, {
    method: "POST",
    headers: {
      TTL: "60",
      Urgency: "high",
      Topic: "dvites-new-order",
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "aes128gcm",
      Authorization: "vapid t=" + jwt + ", k=" + vapid.publicKey,
    },
    body,
  });

  return { ok: response.ok, status: response.status };
}

export async function notifyAdminsOfOrder(env, order) {
  const publicKey = env.VAPID_PUBLIC_KEY;
  const privateKey = env.VAPID_PRIVATE_KEY;
  const subject = env.VAPID_SUBJECT || "mailto:infodvites@gmail.com";

  if (!publicKey || !privateKey) {
    return { sent: 0, skipped: true, reason: "VAPID keys not configured." };
  }

  const result = await supabaseSelect(env, "push_subscriptions", "select=*");
  if (!result.ok || !result.data.length) {
    return { sent: 0, skipped: true, reason: "No push subscriptions." };
  }

  const currency = String(order.currency || "INR").toUpperCase();
  const amount = Number(order.amount || 0);
  const amountLabel =
    currency === "AED"
      ? "AED " + amount.toLocaleString("en-AE")
      : "₹" + amount.toLocaleString("en-IN");

  const payload = {
    title: "New Dvites Order",
    body: (order.template_name || "Wedding Invitation") + " — " + amountLabel,
    url: "/admin/orders.html",
    order_id: order.id || null,
    tag: "dvites-new-order-" + (order.id || Date.now()),
  };

  let sent = 0;
  let failed = 0;

  for (const sub of result.data) {
    try {
      const pushResult = await sendWebPush(
        { endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth },
        payload,
        { publicKey, privateKey, subject }
      );
      if (pushResult.ok) {
        sent += 1;
      } else if (pushResult.status === 404 || pushResult.status === 410) {
        await supabaseDelete(
          env,
          "push_subscriptions",
          "endpoint=eq." + encodeURIComponent(sub.endpoint)
        );
      } else {
        failed += 1;
      }
    } catch {
      failed += 1;
    }
  }

  return { sent, failed, skipped: false };
}
