#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = __dirname;
const keyMatch = fs
  .readFileSync(path.join(ROOT, "assets/r2Upload-B5N7rExL.js"), "utf8")
  .match(/d="(eyJ[^"]+)"/);
if (!keyMatch) throw new Error("Could not extract Supabase anon key from bundle");
const KEY = keyMatch[1];

function postRpc(fn, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname: "kdcyugwruypwrmtllswt.supabase.co",
        path: `/rest/v1/rpc/${fn}`,
        method: "POST",
        headers: {
          apikey: KEY,
          Authorization: `Bearer ${KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      },
      (res) => {
        let buf = "";
        res.on("data", (c) => (buf += c));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`${fn} HTTP ${res.statusCode}: ${buf.slice(0, 200)}`));
            return;
          }
          resolve(JSON.parse(buf));
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const slug = "demo-4638f3";
  const outDir = path.join(ROOT, "assets", "data");
  fs.mkdirSync(outDir, { recursive: true });

  let row = null;
  let rpc = "get_invitation_data";

  const invitationData = await postRpc("get_invitation_data", { _slug: slug });
  if (Array.isArray(invitationData) && invitationData.length > 0) {
    row = invitationData[0];
  } else {
    rpc = "get_demo_invitation";
    row = await postRpc("get_demo_invitation", { _slug: slug });
  }

  const invite = {
    slug,
    rpc,
    capturedAt: new Date().toISOString(),
    row,
  };
  fs.writeFileSync(path.join(outDir, "invite.json"), JSON.stringify(invite, null, 2));
  const style =
    row?.style_name || row?.style_id || row?.event?.style_name || "unknown";
  console.log(`Saved assets/data/invite.json via ${rpc} (style: ${style})`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
