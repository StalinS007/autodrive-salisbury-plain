# AutoDrive Salisbury Plain — Project Context (single source of truth)

**This is the one file to read first.** It replaces the older handoff notes and is kept
current. Any Claude Code session (on Mac, phone, or the web app) should start here before
touching the site. Last verified against the live code: **2026-07-19**.

> The other markdown files in this repo are historical and superseded:
> - `Summary Website.md` — **OUTDATED**, describes an old black/industrial design that no
>   longer exists. Ignore for design decisions.
> - `HANDOFF.md` — earlier full brief; mostly still accurate but predates the two-phone
>   split, reviews section, GA4, and the $129 offer. Superseded by this file.
> - `HANDOFF_video_background.md` — still-useful tuning notes for the services video
>   background, but its file paths point to an old Mac. Knobs summarised in §9 below.

---

## 1. How to continue this work from anywhere (Mac / phone / web)

Everything that matters lives in this git repo, so you never need your own computer:

> **⚠ More than one session edits this repo (Mac + phone/web) — this has already caused one collision. Before ANY edits, `git pull` (or `git fetch` then reset to `origin/<branch>`) so you have the latest, and never run two sessions editing the same branch at the same time, or you will overwrite each other's work.**
>
> **⚠ Neither AI session can SEE the rendered website.** A local (Mac) session can `curl` the live/preview URLs to confirm the *code* deployed (correct markup, version, content) but cannot judge how it *looks*; a cloud/phone session is network-restricted and can't even fetch the site, so it is fully blind. **The owner is the visual check:** after pushing to `reviews-preview`, the owner opens the preview URL and confirms. Never claim a change is "verified" or "looks good" from an AI session — at most you confirmed the code was pushed. Ask the owner to look.

- **From the web or phone:** open the repo in Claude Code on the web
  (**claude.ai/code**), or the Claude mobile/desktop app, pick this repo
  (`stalins007/autodrive-salisbury-plain`), and just say what you want changed. Claude
  edits the files and pushes to the branch for you.
- **From your Mac:** `git pull`, edit, `git commit`, `git push` as normal — or run
  Claude Code locally in the repo folder.
- **To update this context itself:** just ask, e.g. *"open AUTODRIVE_PROJECT_CONTEXT.md and update
  the detailing prices"* — it's a normal file and gets committed like any other.
- **Auto-maintained:** the repo's `CLAUDE.md` instructs every session to read this file first
  and to update it (in the same commit) after every meaningful change, so it stays current
  without you having to remember. Bump the "Last verified" date above whenever you edit it.
The site is **plain static HTML/CSS/JS — no build step, no framework, no dependencies.**
Open `index.html` in a browser to preview, or run `python3 -m http.server 5050` from the
repo root (a launch config `autodrive-static` on port 5050 exists in `.claude/launch.json`).

### Hosting & deploy workflow (Cloudflare Pages — preview → verify → promote)

- **Host:** Cloudflare Pages, project **`autodrive-salisbury-plain`**.
- **Live / production:** **`main`** branch → auto-deploys to **autodrivesalisburyplain.com.au**.
- **Preview branch:** **`reviews-preview`** → preview at
  **https://reviews-preview.autodrive-salisbury-plain.pages.dev**
  (any branch also gets `<branch>.autodrive-salisbury-plain.pages.dev`).
- **The rule:** make every change on **`reviews-preview`** and push → owner checks the preview
  URL → **only when the owner approves, merge `reviews-preview` into `main`** to go live. Do
  **not** push to `main` directly. Keep `reviews-preview` current with `main` so previews
  reflect the true live baseline plus the pending change.
- **⚠ CSS/JS cache-busting (mandatory):** Cloudflare serves CSS/JS with a 4-hour browser
  cache and the `_headers` no-cache override does **not** stick. So **whenever you edit
  `styles.css` or `main.js`, bump the `?v=` query on their `<link>`/`<script>` tags in EVERY
  html page** (all root pages + any subpages). Current version: **`?v=19`** → next `?v=20`.
  Skipping this makes returning visitors see stale styling.

---

## 2. Business facts (source of truth — keep accurate)

- **Name:** AutoDrive Salisbury Plain — Car Service & Repair Centre
- **Positioning:** Adelaide's trusted one-stop automotive care centre. Dealer-quality
  servicing at independent prices, all makes & models.
- **Phone numbers (see §3 for the important split):**
  - **Main / Google-listing number:** **+61 432 247 691** — `tel:+61432247691`
  - **WhatsApp / SMS number:** **+61 432 520 230** — `https://wa.me/61432520230`
- **Email:** autodrive5109@gmail.com
- **Address (single location — servicing, repairs, detailing AND used cars):**
  6 Lolands Rd, Salisbury Plain SA 5109
  - *Note:* the former Valley View used-car showroom (779–781 North East Road SA 5093) was
    **removed everywhere** on 2026-07-18 — the site now shows only the one address. "Showroom"
    still appears as a label (e.g. "Call the Showroom") but no longer as a separate location.
- **Hours:** Mon–Fri 8:30am–5:30pm · Sat 8:30am–4:00pm · Sun closed
- **Socials:** Instagram `@autodrive_salisburyplain` · Facebook page id `61560815001969`
- **Service areas:** Adelaide CBD, Mawson Lakes, Salisbury, Elizabeth, Munno Para,
  Playford, Angle Vale, Riverlea, Virginia, Blakeview, Gawler.

**Services (mechanical):** logbook & general servicing, standard & minor service, brakes
& suspension, diagnostics & mechanical repairs, diesel & DPF, 4WD service & upgrades, ECU
programming & electronics, air conditioning, fuel injector, radiator & cooling, exhausts
& batteries, steering & alignment.
**Detailing:** paint correction, ceramic coating, interior, pre-sale, headlight
restoration, engine bay, window tinting, cosmetic touch-ups, premium hand wash.
**Used cars:** stock ~$5,000–$40,000, workshop-inspected & accident-free, 3 months free
rego, optional 12–36 month warranty, roadside assistance, post-sale discounted repairs.

---

## 3. The two-phone split (owner rule — now consistent site-wide)

The site uses **two** numbers on purpose, and this rule holds everywhere as of 2026-07-18:

| Purpose | Number | Applies to |
|---------|--------|------------|
| **Calls** | **+61 432 247 691** | every `tel:` link AND the JSON-LD `"telephone"` schema |
| **Messages (WhatsApp / SMS)** | **+61 432 520 230** | every `wa.me` link and the SMS booking form |

Verified consistent across all pages (root pages *and* the six `services/` subpages):
all `tel:` = 247 691, all `wa.me` = 520 230, all schema `"telephone"` = 247 691. When
adding markup, keep to this rule. Note the `+` disambiguates: `tel:`/`telephone` use
`+61432247691`; WhatsApp uses `wa.me/61432520230` (no `+`).

---

## 4. Brand & design tokens (LOCKED — keep identical)

Current design is the red/white **"garage-premium"** look. Tokens live in
`assets/css/styles.css` (root `styles.css`) under `:root`:

```
--brand-red:    #C01418   /* primary accent: CTAs, icons, numerals, highlights */
--brand-red-dk: #930E12   /* hover / pressed */
--ink-black:    #0E0E0E   /* headings, header/footer surfaces */
--charcoal:     #1C1C1E
--grey-700:     #3F3F46   /* body text on light */
--grey-500:     #6B7280
--grey-300:     #D4D4D8
--grey-100:     #ECECEE
--off-white:    #F7F7F8   /* light section backgrounds */
--white:        #FFFFFF
```

- **Fonts:** `Anton` for display/headings (uppercase, condensed, industrial); `Inter` for
  body. Loaded from Google Fonts.
- **Feel:** bold, sporty, high-contrast "garage-premium". Red is an *accent*, not a large
  fill. Generous whitespace, tight-rounded corners, soft shadows, thin red accent motif.
- The red is intentionally the darker `#C01418` (brightened *down* from `#E11B1B` at the
  owner's request). **Don't revert it.**

---

## 5. File structure

**Primary pages (the owner's canonical list, linked in the nav):**
```
autodrive-salisbury-plain/
├── index.html                 # Home
├── services.html              # Services overview
├── detailings.html            # Car Detailing
├── paint-panel.html           # Paint & Panel Repair (4th service)
├── used-cars.html             # Used cars
├── contact.html               # Contact + booking form + Google Map
├── assets/
│   ├── css/styles.css
│   └── js/main.js             # mobile nav, scroll reveal, form handler, video labels
├── styles.css                 # active stylesheet referenced by the root pages
├── images/                    # real photos + logos (see §6)
├── robots.txt, sitemap.xml, _headers
├── CLAUDE.md                  # working agreement (auto-loaded each session)
└── AUTODRIVE_PROJECT_CONTEXT.md   # ← this file
```

**Also present — `services/` SEO subpages** (`logbook-servicing`, `brakes-suspension`,
`diagnostics-repairs`, `diesel-dpf`, `4wd-service`, `air-conditioning`). These are NOT in the
owner's primary nav list above. Status to confirm: still live for local-search intent, or
being retired in favour of the root service pages? They currently exist and carry correct
phone numbers. Don't delete without the owner's say-so.

Root pages reference `styles.css` / `images/...`; pages in `services/` use `../`. Asset
URLs are version-stamped (`?v=`) to defeat stale CSS/JS caching — see the cache-busting rule
in §1. Keep the `?v=` query strings when editing links, and bump them on any CSS/JS change.

---

## 6. Image mapping (LOCKED — real assets in use)

Some real-photo filenames contain spaces and **must stay URL-encoded (`%20`)** in HTML/CSS.

| Used for | File in `images/` |
|----------|-------------------|
| Header logo (light bg) | `logo-traced.svg` (inlined `<svg class="logo-svg">` per header) |
| Footer logo (dark bg) | `logo-transparent.png` (transparent, white text) |
| Favicon / og:image / JSON-LD image | `logo-autodrive.png` |
| Watermark mark (CSS backgrounds) | `logo-mark.svg` |
| Home hero background (CSS) | `1. And working on cars .jpeg` → `1.%20And%20working%20on%20cars%20.jpeg` |
| About / diesel / brakes | `2. Man working on car .jpeg`, `1. And working on cars .jpeg` |
| Diagnostics image | `3. Man working on car .jpeg` |
| Detailing + air-con | `luxury-car.png` |
| Used-cars + 4WD | `family-car-service.png` |
| Services video background | `autodrive-hero-loop.mp4` (exploded-car loop) |

- **Logo (owner-approved):** keep the EXACT original artwork — the sporty **coupe**, not a
  sedan/hatch. Header uses a potrace vector of the real logo (`logo-traced.svg`), inlined so
  each layer (`#mark`, `#word-auto`, `#word-drive`, `#sub-salisbury`, `#sub-tagline`) is
  animatable; a light band sweeps on hover (off under reduced-motion). Colours per the real
  PNG: Auto = ink, Drive = red, sub-lines = ink. A faint coupe watermark backs `.cta-band`
  and `.page-hero`. Older variants (`logo-dark.png`, `logo-crushed.png`, `logo-light.png`)
  are unused but kept.
- The hero/about/diagnostics shots are **real photos of the owner in his actual workshop** —
  the site's strongest trust asset; keep them.
- `luxury-car.png` and `family-car-service.png` are **stand-ins** — swap for real detailing
  and used-car photos when available.

---

## 7. What's been added recently (already live — preserve)

- **Customer reviews section** near the top of the homepage — real Google reviews, grouped
  by category, shortened to ~90-char snippets with a more/less toggle.
- **Google Analytics 4** (`G-5QT9NZ63W1`) with contact-event tracking on call/WhatsApp/form.
- **"$129 Basic Service special"** offer block on the home and services pages ("From only
  $129*"). It is a **basic** oil-and-safety service (oil + filter, safety check, fluid top-ups,
  reset, road test) — the tag reads "Basic Service" and the "What's Included in the Basic
  Service" heading make that clear. Per owner (2026-07-19), keep the "basic" label clear but
  **do not** spell out "not a full/major service" on the page — that distinction stays discrete.
  Price is an owner-set promo — confirm before changing. (Owner mentioned basic "starts from
  120" then settled on 129; site shows $129.)
- **Mobile booking overhaul** — message-first flow with a qualifier, calendar, and SMS form.
- Enriched **AutoRepair / Service / FAQPage JSON-LD** on the main pages; per-service SEO
  pages exist for local search intent (don't collapse them into one).
- `robots.txt` tuned to allow major search + AI crawlers; `_headers` + `?v=` versioning
  prevent stale-CSS caching.

---

## 8. Known constraints & pending items

- **Contact form sends by SMS (not Formspree):** `#booking-form` composes a pre-filled text
  to **0432 247 691** via an `sms:` link (handler in `assets/js/main.js`, reads `data-sms`),
  with a quiet "prefer email" `mailto` fallback. There is a leftover unused
  `data-endpoint="...formspree..."` attribute on the form that the JS ignores — safe to delete;
  do NOT wire up Formspree.
- **No prices on the site** except the "$129 service special" — detailing and services are all enquire-for-a-quote (the old $129/$299/$699 detailing tiers were removed).
- **Used-cars inventory** is placeholder categories, not live stock — ready to populate with
  real listings (photo, price, year, km).
- **Google Map** on contact uses `?q=6 Lolands Rd, Salisbury Plain SA 5109&output=embed`
  (the original live site pointed at wrong coordinates — keep this corrected one).
- **Single location now:** the site uses only 6 Lolands Rd, Salisbury Plain SA 5109. The old
  separate Valley View showroom address was removed on 2026-07-18 — don't reintroduce it.
- **Paint & Panel page (`paint-panel.html`)** is on the **`reviews-preview`** branch awaiting the owner's approval to merge to `main` — **not live yet**. It's the 4th service, in the nav + a homepage teaser, wired into the booking flow.

---

## 9. Services video background — tuning knobs

The homepage services section is a pinned, full-viewport scrolling video
(`images/autodrive-hero-loop.mp4`) with cards scrolling over it, a left-weighted dark scrim
for readability, animated SVG component labels, and a "Vehicle Health Check" panel whose dots
go amber → green. All classes/ids are prefixed `ad-` to avoid clashes. Structure:

```
<section class="ad-services">
  <div class="ad-pin"> …sticky video + #ad-ov SVG labels + #ad-tab panel + .ad-scrim… </div>
  <div class="ad-content"> …heading + service cards + "View All Services"… </div>
</section>
```

Knobs (in `styles.css` unless noted):
- **Scrim darkness:** `.ad-scrim` linear-gradient alpha values (higher = darker; keep the
  left readable).
- **Tab position/size:** `#ad-tab` → `right`, `top`, `width`.
- **Card glassiness:** add `.ad-services .card { background: rgba(255,255,255,.92); }`.
- **Where cards start:** `.ad-inner` top padding (`16vh` — increase to reveal more video first).
- **Tick pace (in `main.js`):** `gtime(o)` returns `3.45 + o * 0.11` — offset = first tick
  time, multiplier = spacing between ticks.

---

## 10. Design-improvement resource (optional — Taste Skill)

If restyling for higher visual polish, the **Taste Skill** Agent Skills can guide it
(they're instruction files that shape *how* the AI designs — not a template to copy):
- Repo: https://github.com/Leonxlnx/taste-skill (MIT). Install:
  `npx skills add https://github.com/Leonxlnx/taste-skill`
- Most relevant: `redesign-existing-projects` (audits & fixes an existing UI),
  `design-taste-frontend`, `high-end-visual-design`.
- Suggested dials for this brand: moderate variance, moderate motion, low–moderate density
  (keep the generous whitespace). **Always keep §4 tokens and §6 images locked.** Work
  incrementally — one page/section, commit, review, then roll out.
```
