#!/usr/bin/env node
// Render the two Instagram story frames for a car as 1080×1920 PNGs, plus links.txt.
//
//   node tools/cars/stories/render.mjs <car.json> --photos <dir> --out <dir> [--chrome <path>]
//
// <dir> for --photos is where the files named in car.json live. Output: <out>/01-hero.png,
// <out>/02-collage.png, <out>/links.txt. Needs Chrome/Chromium only — no npm packages.
// Chrome is found from $CHROME, --chrome, or the usual macOS / Linux locations.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://autodrivesalisburyplain.com.au";
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const FLAGS = new Set(["--photos", "--out", "--chrome"]);
const carFile = args.find((a, i) => !a.startsWith("--") && !FLAGS.has(args[i - 1]));
if (!carFile) { console.error("usage: render.mjs <car.json> --photos <dir> --out <dir> [--chrome <path>]"); process.exit(1); }

const car = JSON.parse(fs.readFileSync(carFile, "utf8"));
const photosDir = path.resolve(opt("--photos", path.dirname(carFile)));
const outDir = path.resolve(opt("--out", path.join(path.dirname(carFile), "stories")));
fs.mkdirSync(outDir, { recursive: true });

const CANDIDATES = [
  process.env.CHROME, opt("--chrome"),
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) { console.error("render: Chrome not found — pass --chrome <path> or set $CHROME"); process.exit(1); }

// Give the templates absolute file:// URLs for the photos.
const carForPage = {
  ...car,
  photos: car.photos.map((p) => ({ ...p, src: pathToFileURL(path.join(photosDir, p.file)).href })),
};
for (const p of car.photos) if (!fs.existsSync(path.join(photosDir, p.file))) { console.error(`render: missing photo ${p.file} in ${photosDir}`); process.exit(1); }

function shoot(template, outName) {
  const html = fs.readFileSync(path.join(HERE, template), "utf8")
    .replace("/*CAR_JSON*/null", JSON.stringify(carForPage));
  const tmp = path.join(outDir, `.${template}`);
  fs.writeFileSync(tmp, html);
  const out = path.join(outDir, outName);
  const r = spawnSync(chrome, [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
    "--window-size=1080,1920", "--force-device-scale-factor=1",
    "--virtual-time-budget=6000",          // lets Google Fonts + images settle before the shot
    `--screenshot=${out}`, pathToFileURL(tmp).href,
  ], { stdio: "pipe" });
  fs.unlinkSync(tmp);
  if (r.status !== 0 || !fs.existsSync(out)) { console.error(`render: Chrome failed on ${template}\n` + r.stderr); process.exit(1); }
  return out;
}

const hero = shoot("hero.html", "01-hero.png");
const collage = shoot("collage.html", "02-collage.png");

const campaign = car.campaign || `${car.slug}-${car.year}`;
const story = `${SITE}/used-cars.html?utm_source=instagram&utm_medium=story&utm_campaign=${campaign}#car-${car.slug}`;
const fbgroup = `${SITE}/used-cars.html?utm_source=fbgroup&utm_medium=post&utm_campaign=${campaign}#car-${car.slug}`;
const short = `${car.year} ${car.make_short || car.make} ${car.model}`;
const links = `${short} — $${Number(car.price).toLocaleString("en-AU")}

INSTAGRAM STORY — link sticker (both frames use the same link)
  Frame 1 sticker label: Full details
  Frame 2 sticker label: See more photos
  ${story}

FACEBOOK GROUPS — paste into the post
  ${fbgroup}

LISTING ON THE SITE
  ${SITE}/used-cars.html#car-${car.slug}

Add both frames to the CARS highlight, hero first.
`;
fs.writeFileSync(path.join(outDir, "links.txt"), links);
console.log(`rendered:\n  ${hero}\n  ${collage}\n  ${path.join(outDir, "links.txt")}`);
