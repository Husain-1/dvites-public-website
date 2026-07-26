export function getSupabaseConfig(env) {
  const url = String(env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = env.SUPABASE_PUBLISHABLE_KEY || "";
  if (!url || !key) return null;
  return { url, key };
}

/** Service role bypasses RLS — use only in Cloudflare Functions, never in the browser. */
export function getSupabaseServiceConfig(env) {
  const url = String(env.SUPABASE_URL || "").replace(/\/$/, "");
  const key =
    env.SUPABASE_SERVICE_ROLE_KEY ||
    env.SUPABASE_SECRET_KEY ||
    "";
  if (!url || !key) return null;
  return { url, key };
}

export function getSupabaseAdminConfig(env) {
  return getSupabaseServiceConfig(env) || getSupabaseConfig(env);
}

export function supabaseHeaders(key, extra = {}) {
  return {
    "Content-Type": "application/json",
    apikey: key,
    Authorization: "Bearer " + key,
    ...extra,
  };
}

export async function supabaseInsert(env, table, row, prefer) {
  const config = getSupabaseConfig(env);
  if (!config) return { ok: false, error: "Supabase is not configured." };

  const response = await fetch(config.url + "/rest/v1/" + table, {
    method: "POST",
    headers: supabaseHeaders(config.key, {
      Prefer: prefer || "return=representation",
    }),
    body: JSON.stringify(row),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      (data && (data.message || data.error || data.hint)) || "Insert failed.";
    return { ok: false, error: String(message).slice(0, 240), data };
  }

  const saved = Array.isArray(data) ? data[0] : data;
  return { ok: true, data: saved };
}

export async function supabaseUpsert(env, table, row, onConflict) {
  const config = getSupabaseConfig(env);
  if (!config) return { ok: false, error: "Supabase is not configured." };

  const response = await fetch(
    config.url + "/rest/v1/" + table + "?on_conflict=" + encodeURIComponent(onConflict),
    {
      method: "POST",
      headers: supabaseHeaders(config.key, {
        Prefer: "resolution=merge-duplicates,return=representation",
      }),
      body: JSON.stringify(row),
    }
  );

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      (data && (data.message || data.error || data.hint)) || "Upsert failed.";
    return { ok: false, error: String(message).slice(0, 240), data };
  }

  const saved = Array.isArray(data) ? data[0] : data;
  return { ok: true, data: saved };
}

export async function supabaseSelect(env, table, queryString) {
  const config = getSupabaseConfig(env);
  if (!config) return { ok: false, error: "Supabase is not configured.", data: [] };

  const url = config.url + "/rest/v1/" + table + (queryString ? "?" + queryString : "");
  const response = await fetch(url, {
    headers: supabaseHeaders(config.key),
  });

  const data = await response.json().catch(() => []);
  if (!response.ok) {
    const message =
      (data && (data.message || data.error || data.hint)) || "Select failed.";
    return { ok: false, error: String(message).slice(0, 240), data: [] };
  }

  return { ok: true, data: Array.isArray(data) ? data : [] };
}

export async function supabaseCount(env, table, queryString) {
  const config = getSupabaseConfig(env);
  if (!config) return { ok: false, count: 0 };

  const url = config.url + "/rest/v1/" + table + (queryString ? "?" + queryString : "");
  const response = await fetch(url, {
    method: "HEAD",
    headers: supabaseHeaders(config.key, {
      Prefer: "count=exact",
    }),
  });

  if (!response.ok) return { ok: false, count: 0 };

  const range = response.headers.get("content-range") || "";
  const match = range.match(/\/(\d+)$/);
  return { ok: true, count: match ? Number(match[1]) : 0 };
}

export async function supabaseDelete(env, table, queryString) {
  const config = getSupabaseAdminConfig(env);
  if (!config) return { ok: false, error: "Supabase is not configured." };

  const url = config.url + "/rest/v1/" + table + (queryString ? "?" + queryString : "");
  const response = await fetch(url, {
    method: "DELETE",
    headers: supabaseHeaders(config.key, { Prefer: "return=representation" }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      (data && (data.message || data.error || data.hint)) || "Delete failed.";
    return { ok: false, error: String(message).slice(0, 240) };
  }

  const rows = Array.isArray(data) ? data : data ? [data] : [];
  if (!rows.length) {
    return {
      ok: false,
      error:
        "Delete blocked by database permissions. Run docs/sql/orders-delete-policy.sql in Supabase, or set SUPABASE_SERVICE_ROLE_KEY in Cloudflare.",
    };
  }

  return { ok: true, data: rows[0] };
}
