#!/usr/bin/env node
/**
 * Captures each project's live site as its cover image, so covers follow the real sites.
 *
 *   pnpm screenshots                 # every project with links.live and screenshot.auto
 *   pnpm screenshots lost-and-found  # only these slugs
 *
 * Drives headless Chrome/Edge over the DevTools Protocol with Node's built-in WebSocket (no
 * Puppeteer/Playwright dependency) and writes a 1600×1000 WebP with sharp to the project's cover
 * path (default /media/projects/<slug>.webp). Per project, in content/projects/<slug>.md:
 *
 *   screenshot:
 *     auto: true            # false keeps a hand-made cover
 *     dismiss: I Understand # optional: text of a button to click first (e.g. a notice modal)
 *     delay: 2500           # optional: ms to wait after load for images/animations
 *
 * Pages load with reduced motion so intro animations don't end up mid-frame. A site that fails
 * keeps its previous cover. Runs weekly in CI (.github/workflows/sync.yml).
 *
 * Browser: $CHROME_PATH, or the first of the usual Chrome/Edge/Chromium install paths.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { allProjects } from "../.content-collections/generated/index.js";

const WIDTH = 1600;
const HEIGHT = 1000;

const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Average per-pixel difference (0–255) below which a new capture counts as "unchanged", so
// rendering noise and live counters don't produce a new image (and a commit) every week.
const MIN_CHANGE = 3;

/** Mean absolute difference between two images, compared as 80×50 grayscale thumbnails. */
async function difference(a, b) {
  const thumb = (input) =>
    sharp(input).resize(80, 50, { fit: "cover", position: "top" }).grayscale().raw().toBuffer();
  const [x, y] = await Promise.all([thumb(a), thumb(b)]);
  let sum = 0;
  for (let i = 0; i < x.length; i++) sum += Math.abs(x[i] - y[i]);
  return sum / x.length;
}

/** Starts the browser and returns a minimal DevTools Protocol client. */
async function launch(executable, profileDir) {
  const proc = spawn(
    executable,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--force-prefers-reduced-motion",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDir}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  const endpoint = await new Promise((resolve, reject) => {
    let buffer = "";
    const timer = setTimeout(() => reject(new Error("browser did not start")), 30_000);
    proc.stderr.on("data", (chunk) => {
      buffer += chunk;
      const match = /DevTools listening on (ws:\/\/\S+)/.exec(buffer);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
    proc.on("exit", () => reject(new Error("browser exited")));
  });

  const ws = new WebSocket(endpoint);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let nextId = 0;
  const pending = new Map();
  const listeners = new Set();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id !== undefined) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) p?.reject(new Error(msg.error.message));
      else p?.resolve(msg.result);
    } else {
      for (const l of listeners) l(msg);
    }
  };
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  const once = (method, sessionId, timeout = 45_000) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        listeners.delete(l);
        reject(new Error(`timed out waiting for ${method}`));
      }, timeout);
      const l = (msg) => {
        if (msg.method === method && msg.sessionId === sessionId) {
          clearTimeout(timer);
          listeners.delete(l);
          resolve(msg.params);
        }
      };
      listeners.add(l);
    });
  const close = async () => {
    await send("Browser.close").catch(() => {});
    ws.close();
    proc.kill();
  };
  return { send, once, close };
}

async function capture(cdp, url, { dismiss, delay }) {
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const s = (method, params) => cdp.send(method, params, sessionId);
  try {
    await s("Page.enable");
    await s("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false });
    await s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    const loaded = cdp.once("Page.loadEventFired", sessionId);
    await s("Page.navigate", { url });
    await loaded;
    // Wait for fonts and <img>s, then give CSS backgrounds and client rendering time to settle.
    await s("Runtime.evaluate", {
      expression: `Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))])`,
      awaitPromise: true,
    });
    await sleep(delay);
    if (dismiss) {
      const { result } = await s("Runtime.evaluate", {
        expression: `(() => { const b = [...document.querySelectorAll("button, [role=button], a")].find((e) => e.textContent.trim() === ${JSON.stringify(dismiss)}); b?.click(); return Boolean(b); })()`,
        returnByValue: true,
      });
      if (!result.value) console.warn(`  (no "${dismiss}" button found; capturing anyway)`);
      await sleep(1000);
    }
    const { data } = await s("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    return Buffer.from(data, "base64");
  } finally {
    await cdp.send("Target.closeTarget", { targetId }).catch(() => {});
  }
}

const browser = CANDIDATES.find((p) => p && existsSync(p));
if (!browser) {
  console.error("No Chrome/Edge/Chromium found. Set CHROME_PATH to a Chromium-based browser.");
  process.exit(1);
}

const only = new Set(process.argv.slice(2));
const targets = allProjects.filter((p) => p.links.live && p.screenshot.auto && (only.size === 0 || only.has(p.slug)));
if (targets.length === 0) {
  console.log("Nothing to capture.");
  process.exit(0);
}

const profile = await mkdtemp(path.join(tmpdir(), "capture-")); // isolated, throwaway browser profile
const cdp = await launch(browser, profile);
let failures = 0;
let written = 0;

for (const project of targets) {
  const src = project.cover?.src ?? `/media/projects/${project.slug}.webp`;
  const out = path.join(process.cwd(), "public", src);
  try {
    const png = await capture(cdp, project.links.live, project.screenshot);
    if (existsSync(out) && (await difference(png, out)) < MIN_CHANGE) {
      console.log(`= ${project.slug}: no visible change, keeping public${src}`);
      continue;
    }
    await mkdir(path.dirname(out), { recursive: true });
    await sharp(png).resize(WIDTH, HEIGHT, { fit: "cover", position: "top" }).webp({ quality: 80 }).toFile(out);
    written++;
    console.log(`✓ ${project.slug}: ${project.links.live} → public${src}`);
    if (!project.cover) console.log(`  Add to content/projects/${project.slug}.md:\n  cover:\n    src: ${src}\n    alt: …`);
  } catch (error) {
    failures++;
    console.warn(`✗ ${project.slug}: ${project.links.live} could not be captured; keeping the old cover.`);
    console.warn(`  ${error instanceof Error ? error.message : error}`);
  }
}

await cdp.close();
await sleep(500);
await rm(profile, { recursive: true, force: true }).catch(() => {});
// Content Collections caches transforms by content file, not by image, so drop the cache to make
// the next dev/build regenerate the dithered covers from the new screenshots.
if (written > 0) await rm(path.join(process.cwd(), ".content-collections", "cache"), { recursive: true, force: true });
if (failures > 0) process.exitCode = 1;
