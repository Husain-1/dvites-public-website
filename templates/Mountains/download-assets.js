const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");
const { execSync } = require("child_process");

const root = __dirname;
const sourceHtml = path.join(root, "index.html");
const outputHtml = path.join(root, "index-local.html");
const imagesDir = path.join(root, "assets", "images");
const fontsDir = path.join(root, "assets", "fonts");
const scriptsDir = path.join(root, "assets", "scripts");

const FRAMER_ASSET_RE =
  /https:\/\/framerusercontent\.com\/(?:images|assets|third-party-assets)\/[A-Za-z0-9_./-]+(?:\?[A-Za-z0-9&=\-_.%+]+)?/g;
const FRAMER_SITE_RE =
  /https:\/\/framerusercontent\.com\/sites\/[A-Za-z0-9_-]+\/[A-Za-z0-9_.-]+\.(?:json|mjs|js)/g;
const GSTATIC_RE =
  /https:\/\/fonts\.gstatic\.com\/[^\s"'`<>)\\]+\.(?:woff2?|ttf|otf)(?:\?[A-Za-z0-9&=\-_.%+]+)?/g;
const FRAMER_COM_RE = /https:\/\/framer\.com\/[^\s"'`<>)\\]+\.(?:mjs|js|json)/g;
const EDITOR_INIT_URL = "https://framer.com/edit/init.mjs";
const REL_IMPORT_RE =
  /(?:from|import)\s*["'](\.\/[^"']+\.(?:mjs|js|json))["']/g;
const DYNAMIC_IMPORT_RE = /import\s*\(\s*["'](\.\/[^"']+\.(?:mjs|js|json))["']\s*\)/g;

/** @type {Map<string, { kind: string, fileName: string, diskPath: string }>} */
const registry = new Map();

function cleanUrl(url) {
  return url.replace(/&amp;/g, "&");
}

function hashUrl(url) {
  return crypto.createHash("md5").update(cleanUrl(url)).digest("hex").slice(0, 8);
}

function isFontFileName(name) {
  return /\.(woff2?|ttf|otf)$/i.test(name);
}

function isScriptFileName(name) {
  return /\.(mjs|js|json)$/i.test(name);
}

function classifyUrl(url) {
  const clean = cleanUrl(url);
  if (/fonts\.gstatic\.com/.test(clean)) return "font";
  if (/framerusercontent\.com\/sites\//.test(clean) && isScriptFileName(clean)) {
    return "script";
  }
  if (/framer\.com\//.test(clean) && isScriptFileName(clean)) return "script";
  if (/framerusercontent\.com\/(?:assets|third-party-assets)\//.test(clean)) {
    return isFontFileName(clean) ? "font" : "image";
  }
  if (/framerusercontent\.com\/images\//.test(clean)) return "image";
  if (/framer\.com\//.test(clean)) return "script";
  return "image";
}

function localFileName(url, kind) {
  const clean = cleanUrl(url);
  const withoutQuery = clean.split("?")[0];
  const ext = path.extname(withoutQuery) || (kind === "script" ? ".bin" : "");
  let base = path.basename(withoutQuery, ext) || "asset";
  base = base.replace(/[^a-zA-Z0-9._-]/g, "-");

  if (kind === "script") return `${base}${ext}`;
  if (clean.includes("?")) return `${base}-${hashUrl(url)}${ext}`;
  return `${base}${ext}`;
}

function targetDir(kind) {
  if (kind === "font") return fontsDir;
  if (kind === "script") return scriptsDir;
  return imagesDir;
}

function publicPathFor(kind, fileName) {
  if (kind === "font") return `./assets/fonts/${fileName}`;
  if (kind === "script") return `./assets/scripts/${fileName}`;
  return `./assets/images/${fileName}`;
}

function relativePublicPath(fromFile, kind, fileName) {
  const absTarget = path.join(targetDir(kind), fileName);
  let rel = path.relative(path.dirname(fromFile), absTarget).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

function download(url) {
  return new Promise((resolve) => {
    https
      .get(cleanUrl(url), (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          download(res.headers.location).then(resolve);
          return;
        }

        if (res.statusCode !== 200) {
          res.resume();
          console.log("Failed:", url, `(HTTP ${res.statusCode})`);
          resolve(null);
          return;
        }

        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", () => {
        console.log("Failed:", url);
        resolve(null);
      });
  });
}

async function ensureDownloaded(url) {
  const normalized = cleanUrl(url);
  if (registry.has(normalized)) return registry.get(normalized);

  if (normalized === EDITOR_INIT_URL) {
    writeEditorStub();
    const entry = {
      kind: "script",
      fileName: "init.mjs",
      diskPath: path.join(scriptsDir, "init.mjs"),
    };
    registry.set(normalized, entry);
    return entry;
  }

  const kind = classifyUrl(normalized);
  const fileName = localFileName(normalized, kind);
  const dir = targetDir(kind);
  const diskPath = path.join(dir, fileName);

  if (!fs.existsSync(diskPath)) {
    console.log(`Downloading [${kind}]: ${fileName}`);
    const data = await download(normalized);
    if (!data) return null;
    fs.writeFileSync(diskPath, data);
  }

  const entry = { kind, fileName, diskPath };
  registry.set(normalized, entry);
  return entry;
}

function extractUrls(content) {
  const urls = new Set();
  for (const re of [FRAMER_ASSET_RE, FRAMER_SITE_RE, GSTATIC_RE, FRAMER_COM_RE]) {
    for (const match of content.match(re) || []) {
      urls.add(cleanUrl(match));
    }
  }
  return [...urls];
}

function extractRelativeImports(content) {
  const imports = new Set();
  for (const re of [REL_IMPORT_RE, DYNAMIC_IMPORT_RE]) {
    let match;
    const copy = new RegExp(re.source, re.flags);
    while ((match = copy.exec(content)) !== null) {
      imports.add(match[1]);
    }
  }
  return [...imports];
}

function applyReplacements(content, replacements) {
  let updated = content;
  const entries = [...replacements.entries()].sort((a, b) => b[0].length - a[0].length);

  for (const [oldUrl, newPath] of entries) {
    updated = updated.split(oldUrl).join(newPath);
    updated = updated.split(oldUrl.replace(/&/g, "&amp;")).join(newPath);
  }

  return updated;
}

function resetAssetDirs() {
  for (const dir of [imagesDir, fontsDir, scriptsDir]) {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
  }
}

function listScriptFiles() {
  if (!fs.existsSync(scriptsDir)) return [];
  return fs
    .readdirSync(scriptsDir)
    .filter((name) => /\.(mjs|js|json)$/i.test(name))
    .map((name) => path.join(scriptsDir, name));
}

function hasRemoteTargets() {
  try {
    execSync(
      'grep -R -E "framerusercontent\\.com|https://([a-z0-9-]+\\.)*framer\\.com|fonts\\.gstatic\\.com" assets/ index-local.html 2>/dev/null | grep -v "Made in Framer"',
      { cwd: root, stdio: "pipe" }
    );
    return true;
  } catch {
    return false;
  }
}

function writeEditorStub() {
  const stubPath = path.join(scriptsDir, "init.mjs");
  fs.writeFileSync(stubPath, `export {}\n`);
}

function finalizeHtml(html) {
  let out = html;

  out = out.replace(
    /<script async src="https:\/\/events\.framer\.com\/script[^"]*"[^>]*><\/script>\s*/g,
    ""
  );
  out = out.replace(
    /<link href="https:\/\/fonts\.gstatic\.com" rel="preconnect" crossorigin>\s*/g,
    ""
  );

  return out;
}

async function processContent(content, filePath, siteBase, isHtml) {
  const replacements = new Map();

  for (const url of extractUrls(content)) {
    const entry = await ensureDownloaded(url);
    if (!entry) continue;

    const newPath = isHtml
      ? publicPathFor(entry.kind, entry.fileName)
      : relativePublicPath(filePath, entry.kind, entry.fileName);

    replacements.set(url, newPath);
  }

  if (siteBase && /\.(mjs|js)$/i.test(filePath)) {
    for (const relImport of extractRelativeImports(content)) {
      const remoteUrl = `${siteBase}${path.basename(relImport)}`;
      await ensureDownloaded(remoteUrl);
    }
  }

  return applyReplacements(content, replacements);
}

async function mirror() {
  if (!fs.existsSync(sourceHtml)) {
    throw new Error("Missing index.html backup");
  }

  resetAssetDirs();
  registry.clear();

  let html = fs.readFileSync(sourceHtml, "utf8");
  const siteMatch = html.match(
    /https:\/\/framerusercontent\.com\/sites\/([A-Za-z0-9_-]+)\//
  );
  const siteBase = siteMatch
    ? `https://framerusercontent.com/sites/${siteMatch[1]}/`
    : null;

  if (!siteBase) {
    throw new Error("Could not detect Framer site base URL in index.html");
  }

  console.log("Site base:", siteBase);

  let pass = 0;
  while (true) {
    pass++;
    console.log(`\n=== Pass ${pass} ===`);
    let changed = false;

    const nextHtml = await processContent(html, outputHtml, siteBase, true);
    if (nextHtml !== html) changed = true;
    html = nextHtml;
    fs.writeFileSync(outputHtml, html);

    for (const scriptPath of listScriptFiles()) {
      const before = fs.readFileSync(scriptPath, "utf8");
      const after = await processContent(before, scriptPath, siteBase, false);
      if (after !== before) {
        fs.writeFileSync(scriptPath, after);
        changed = true;
        console.log(`Updated ${path.relative(root, scriptPath)}`);
      }
    }

    if (!hasRemoteTargets()) {
      console.log("\nAll Framer remote URLs localized.");
      break;
    }

    if (!changed) {
      console.warn(
        "\nWarning: remote URLs remain but no changes were made this pass."
      );
      execSync(
        'grep -R -n -E "framerusercontent\\.com|https://([a-z0-9-]+\\.)*framer\\.com|fonts\\.gstatic\\.com" assets/ index-local.html 2>/dev/null | grep -v "Made in Framer" | head -20',
        { cwd: root, stdio: "inherit" }
      );
      break;
    }
  }

  html = finalizeHtml(html);
  fs.writeFileSync(outputHtml, html);

  console.log(`\nCreated: ${path.relative(root, outputHtml)}`);
  console.log(`Scripts: ${listScriptFiles().length}`);
  console.log(`Images: ${fs.readdirSync(imagesDir).length}`);
  console.log(`Fonts: ${fs.readdirSync(fontsDir).length}`);
}

mirror().catch((err) => {
  console.error(err);
  process.exit(1);
});
