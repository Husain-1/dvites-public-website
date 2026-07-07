export function toIsoStart(dateStr) {
  const d = new Date(dateStr + "T00:00:00.000Z");
  return d.toISOString();
}

export function toIsoEnd(dateStr) {
  const d = new Date(dateStr + "T23:59:59.999Z");
  return d.toISOString();
}

export function rangeToBounds(range, from, to) {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  if (range === "custom" && from && to) {
    return { start: toIsoStart(from), end: toIsoEnd(to), label: from + " to " + to };
  }

  if (range === "yesterday") {
    const y = new Date(now);
    y.setUTCDate(y.getUTCDate() - 1);
    const ys = y.toISOString().slice(0, 10);
    return { start: toIsoStart(ys), end: toIsoEnd(ys), label: "Yesterday" };
  }

  if (range === "week") {
    const start = new Date(now);
    start.setUTCDate(start.getUTCDate() - 6);
    return {
      start: toIsoStart(start.toISOString().slice(0, 10)),
      end: toIsoEnd(today),
      label: "Last 7 days",
    };
  }

  if (range === "month") {
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    return {
      start: start.toISOString(),
      end: toIsoEnd(today),
      label: "This month",
    };
  }

  if (range === "30d") {
    const start = new Date(now);
    start.setUTCDate(start.getUTCDate() - 29);
    return {
      start: toIsoStart(start.toISOString().slice(0, 10)),
      end: toIsoEnd(today),
      label: "Last 30 days",
    };
  }

  return { start: toIsoStart(today), end: toIsoEnd(today), label: "Today" };
}

export function liveSinceIso(seconds) {
  const d = new Date(Date.now() - seconds * 1000);
  return d.toISOString();
}
