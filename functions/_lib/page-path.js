/** Strip query/hash for analytics grouping; keep path only. */
export function normalizeAnalyticsPagePath(rawPath) {
  let path = String(rawPath || "").trim();
  if (!path || path === "(unknown)") return "(unknown)";
  try {
    if (path.indexOf("http://") === 0 || path.indexOf("https://") === 0) {
      path = new URL(path).pathname;
    }
  } catch {
    // use as-is
  }
  const q = path.indexOf("?");
  if (q !== -1) path = path.slice(0, q);
  const h = path.indexOf("#");
  if (h !== -1) path = path.slice(0, h);
  if (!path.startsWith("/")) path = "/" + path.replace(/^\/+/, "");
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path || "/";
}
