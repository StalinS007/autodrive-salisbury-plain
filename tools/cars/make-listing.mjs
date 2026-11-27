#!/usr/bin/env node
// AutoDrive — used-car listing generator.
//
//   node tools/cars/make-listing.mjs <car.json>              print the <article class="car"> block
//   node tools/cars/make-listing.mjs <car.json> --insert     splice it into used-cars.html as the next CAR N
//   node tools/cars/make-listing.mjs --mark-sold <slug>      flip #car-<slug> to the grey "Sold" badge
//   node tools/cars/make-listing.mjs --remove <slug>         delete #car-<slug> from the page
//
// Produces exactly the markup the hand-written listings use (same icons, same classes, same comment
// bookends) so every car looks identical and main.js's gallery/WhatsApp interception keeps working.
// Run from anywhere; it finds used-cars.html relative to this file.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PAGE = path.resolve(HERE, "../../used-cars.html");
const WA = "61432520230";

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const prose = (s) => esc(s).replace(/'/g, "&rsquo;");            // listings use &rsquo; in copy
const money = (n) => "$" + Number(n).toLocaleString("en-AU");
const kms = (n) => Number(n).toLocaleString("en-AU") + " km";
const die = (m) => { console.error("make-listing: " + m); process.exit(1); };

const ICON = {
  km:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 12l4-2"/><path d="M7 16a7 7 0 0 1 10 0"/></svg>',
  trans: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v12"/><path d="M18 9v12"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M9 18h6a3 3 0 0 0 3-3"/></svg>',
  body:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13"/><path d="M5 13h14v4H5z"/><circle cx="8" cy="17" r="1"/><circle cx="16" cy="17" r="1"/></svg>',
  built: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  tick:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>',
  wa:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2z"/></svg>',
  tel:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  prev:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  next:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
};

// ---------- validate ----------
export function validate(car) {
  for (const k of ["slug", "year", "make", "model", "transmission", "body", "km", "price", "photos"])
    if (car[k] === undefined || car[k] === null) die(`car.json is missing "${k}"`);
  if (!/^[a-z0-9]+$/.test(car.slug)) die(`slug "${car.slug}" must be lowercase letters/digits only`);
  if (!["Automatic", "Manual"].includes(car.transmission)) die(`transmission must be "Automatic" or "Manual"`);
  if (!Array.isArray(car.photos) || !car.photos.length) die("photos must be a non-empty array");
  for (const p of car.photos) if (!p.file || !p.alt) die("every photo needs file + alt");
  return car;
}

// ---------- build ----------
export function article(car) {
  validate(car);
  const title = `${car.year} ${car.make} ${car.model}`;
  const short = `${car.year} ${car.make_short || car.make} ${car.model}`;
  const transBadge = car.transmission === "Manual" ? "Manual" : "Auto";
  const sold = car.status === "sold";
  const badge = sold ? '<span class="car__badge car__badge--sold">Sold</span>' : '<span class="car__badge">Available</span>';

  // Photos: hero first, then listing order.
  const photos = [...car.photos];
  const hi = photos.findIndex((p) => p.role === "hero");
  if (hi > 0) photos.unshift(...photos.splice(hi, 1));
  const slides = photos.map((p, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `                  <div class="car__slide"><img src="images/${car.slug}/${car.slug}-${n}.jpg" alt="${prose(title + ", " + p.alt)}" loading="lazy"></div>`;
  }).join("\n");

  const priceNote = car.price_note ? `<small>${prose(car.price_note)}</small>` : "";
  const specs = [
    `<li>${ICON.km}${kms(car.km)}</li>`,
    `<li>${ICON.trans}${esc(car.transmission)}</li>`,
    `<li>${ICON.body}${esc(car.body)}</li>`,
    car.built ? `<li>${ICON.built}Built ${esc(car.built)}</li>` : null,
  ].filter(Boolean).map((l) => "                " + l).join("\n");

  const trust = ["Workshop-inspected", ...(car.trust || []).slice(0, 3)]
    .map((t) => `                <li>${ICON.tick}${esc(t)}</li>`).join("\n");

  // Description + the honesty lines the site always carries.
  let desc = car.description ? prose(car.description.trim()) : prose(`${car.engine ? car.engine + " with " : ""}${car.transmission.toLowerCase()} transmission and ${kms(car.km)}. Workshop-inspected, with after-sales workshop support available.`);
  if (!/\.$/.test(desc)) desc += ".";
  if (car.ppsr_listed && car.repaired)
    desc += ` <strong>This car is PPSR listed and has been professionally repaired</strong> &mdash; we&rsquo;re upfront about it, and an RAA or any independent inspection is welcome before you buy.`;
  else if (car.ppsr_listed)
    desc += ` <strong>This car is PPSR listed.</strong> We&rsquo;re upfront about it, and an RAA or any independent inspection is welcome before you buy.`;
  else if (car.repaired)
    desc += ` <strong>This car has been professionally repaired</strong> &mdash; we&rsquo;re upfront about it, and an RAA or any independent inspection is welcome before you buy.`;

  // encodeURIComponent leaves ' alone; the hand-written listings use %27, so match them.
  const waText = encodeURIComponent(`Hi Jitty, I'm interested in the ${short} (${money(car.price)}). Is it still available?`).replace(/'/g, "%27");

  return `          <article class="car" id="car-${car.slug}">
            <div class="car__media car__gallery" data-gallery>
              ${badge}
              <div class="car__gallery-viewport">
                <div class="car__gallery-track">
${slides}
                </div>
              </div>
              <button class="car__nav car__nav--prev" type="button" aria-label="Previous photo">${ICON.prev}</button>
              <button class="car__nav car__nav--next" type="button" aria-label="Next photo">${ICON.next}</button>
              <div class="car__dots"></div>
            </div>
            <div class="car__body">
              <h3 class="car__title">${esc(title)} <span>${transBadge}</span></h3>
              <div class="car__price">${money(car.price)}${priceNote}</div>
              <ul class="car__specs">
${specs}
              </ul>
              <ul class="car__trust">
${trust}
              </ul>
              <p class="car__desc">${desc}</p>
              <div class="car__cta">
                <a class="btn" data-ctx="cars" href="https://wa.me/${WA}?text=${waText}">${ICON.wa}Enquire</a>
                <a class="btn btn--ghost" href="tel:+${WA}">${ICON.tel}Call</a>
              </div>
            </div>
          </article>`;
}

// ---------- page surgery ----------
function readPage() { return fs.readFileSync(PAGE, "utf8"); }
function writePage(s) { fs.writeFileSync(PAGE, s); }

export function insert(car) {
  let html = readPage();
  if (html.includes(`id="car-${car.slug}"`)) die(`#car-${car.slug} already exists on the page — pick another slug (e.g. ${car.slug}${String(car.year).slice(2)}) or use --remove first`);
  const ends = [...html.matchAll(/ {10}<!-- ===== END CAR (\d+) ===== -->/g)];
  if (!ends.length) die("could not find the <!-- ===== END CAR N ===== --> bookends in used-cars.html");
  const last = ends[ends.length - 1];
  const n = Number(last[1]) + 1;
  const block = `\n\n          <!-- ===== CAR ${n} — ${esc(`${car.year} ${car.make} ${car.model}`)} ===== -->\n${article(car)}\n          <!-- ===== END CAR ${n} ===== -->`;
  const at = last.index + last[0].length;
  html = html.slice(0, at) + block + html.slice(at);
  writePage(html);
  return n;
}

export function markSold(slug) {
  let html = readPage();
  const re = new RegExp(`(<article class="car" id="car-${slug}">[\\s\\S]*?)<span class="car__badge">Available</span>`);
  if (!re.test(html)) die(`#car-${slug} not found, or already marked sold`);
  writePage(html.replace(re, `$1<span class="car__badge car__badge--sold">Sold</span>`));
}

export function remove(slug) {
  let html = readPage();
  const re = new RegExp(`\\n\\n {10}<!-- ===== CAR (\\d+) — [^\\n]*===== -->\\n {10}<article class="car" id="car-${slug}">[\\s\\S]*?<!-- ===== END CAR \\1 ===== -->`);
  if (!re.test(html)) die(`#car-${slug} not found with its CAR N bookends`);
  writePage(html.replace(re, ""));
}

// ---------- cli ----------
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  if (a[0] === "--mark-sold") { markSold(a[1] || die("--mark-sold <slug>")); console.log(`#car-${a[1]} → Sold`); }
  else if (a[0] === "--remove") { remove(a[1] || die("--remove <slug>")); console.log(`#car-${a[1]} removed`); }
  else {
    const file = a.find((x) => !x.startsWith("--")) || die("usage: make-listing.mjs <car.json> [--insert]");
    const car = JSON.parse(fs.readFileSync(file, "utf8"));
    if (a.includes("--insert")) { const n = insert(car); console.log(`inserted #car-${car.slug} as CAR ${n} in used-cars.html`); }
    else process.stdout.write(article(car) + "\n");
  }
}
