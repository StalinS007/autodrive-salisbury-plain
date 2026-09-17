# AutoDrive Salisbury Plain — Project Context (single source of truth)

**This is the one file to read first.** It replaces the older handoff notes and is kept
current. Any Claude Code session (on Mac, phone, or the web app) should start here before
touching the site. Last verified against the live code: **2026-09-17**.

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
  html page** (all root pages + any subpages). Current version: **`?v=52`** → next `?v=53`.
  (Note: this figure drifts if a session forgets to update it — always trust the actual `?v=`
  in the HTML over this note. It was at v=34 on 2026-07-22.)
  (As of 2026-07-22 the six `services/` subpages are now versioned too — previously they had
  no `?v=`; keep them in lockstep with the root pages from now on.)
  Skipping this makes returning visitors see stale styling.

---

## 2. Business facts (source of truth — keep accurate)

- **Name:** AutoDrive Salisbury Plain — Car Service & Repair Centre
- **Positioning:** Adelaide's trusted one-stop automotive care centre. Dealer-quality
  servicing at independent prices, all makes & models.
- **Phone — ONE number for everything (as of 2026-07-22):** **+61 432 520 230**
  (`0432 520 230`). Used for calls, `tel:` links, WhatsApp, SMS, and the JSON-LD `telephone`.
  - `tel:` form: `tel:+61432520230` · WhatsApp: `https://wa.me/61432520230`
  - *History:* the site previously split calls (247 691) from messages (520 230); the owner
    consolidated everything onto **520 230** on 2026-07-22. The old 247 691 number is no longer
    used anywhere. See §3.
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

## 3. Phone number — now ONE number site-wide (520 230)

**As of 2026-07-22 the two-phone split is retired.** Every number on the site — calls,
`tel:` links, WhatsApp `wa.me` links, SMS booking, and the JSON-LD `"telephone"` — is
**+61 432 520 230**. When adding markup, use `tel:+61432520230` and `wa.me/61432520230`.

Verified consistent across all pages (root pages *and* the six `services/` subpages):
all `tel:` = 520 230, all `wa.me` = 520 230, all schema `"telephone"` = 520 230. The old
call number **247 691 is gone** — do not reintroduce it.

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
- **Three-tier service pricing** on the home + services pages (`#service-special` section,
  added 2026-07-22 from the owner's pricing graphic — this **replaced** the old single "$129
  Basic Service special"). Tiers, all "from only" + T&Cs:
  - **Basic — from $149**: oil change (up to 5L), quality oil filter, comprehensive safety
    inspection, top up fluids, tyre pressure check, reset service reminder, upfront pricing.
  - **Standard — from $229 (⭐ Most Popular, highlighted card):** everything in Basic PLUS air
    filter, battery test, brake inspection, fault-code scan, detailed safety check, reminder
    reset, full road test.
  - **Premium — from $329 (gold accent):** everything in Standard PLUS cabin air filter, fuel
    system treatment, detailed inspection report, extensive road test, priority booking, expert
    care, peace-of-mind guarantee.
  - **Responsive display (2026-07-22): comparison table on desktop, stacked cards on mobile
    (≤820px)** — the Apple/Stripe pattern; a sticky-sidebar table was tried and rejected as too
    cramped on phones (research: ~78% of pricing pages stack cards on mobile). Both blocks are
    in the `#service-special` section: `.ptable-wrap` (table, shown >820px) and `.tiers`
    (`.tier` cards, shown ≤820px) — the CSS toggles `display` at 820px. Heading asks *"What
    Does Your Car Want Today?"* (desire framing, not "we offer…"); each tier carries a "Your car
    wants the essentials / full protection / the best" tagline. Standard is highlighted ("Most
    Popular"), Premium gold. Every Book CTA is a WhatsApp button (`data-ctx="service"`) with a
    **tier-named prefilled message** (GA `whatsapp_click` shows which tier). Keep BOTH blocks in
    sync if prices/features change. CSS: `.ptable*` and `.tier*` at the end of `styles.css`.
  - **These prices are owner-set — confirm before changing.** Note the Basic tier is **$149**
    now (superseded the earlier $129 promo).
- **Mobile booking overhaul** — message-first flow with a qualifier, calendar, and SMS form.
- **Vehicle-info step (added 2026-07-27, `assets/js/main.js`, the `dateask` modal):** for
  **service, detailing, and paint & panel** enquiries only, after the visitor picks a date the
  modal now also asks for **car make**, **model**, **year** (mandatory, added 2026-08-14) and
  **odometer (km)** before opening WhatsApp —
  so Jitty gets an accurate-quote-ready message, e.g. *"…My car is free on Monday, 3 August.
  Car: Toyota Corolla, Odometer: 85,000 km."* Controlled by `CTX[ctx].vehicle = true/false` in
  main.js. **Used-car enquiries deliberately skip this step** (`CTX.cars.vehicle = false`) —
  a buyer browsing stock doesn't have "their car" details to give. **All three fields are
  REQUIRED (owner decision 2026-07-27):** "Continue to WhatsApp" stays blocked until make,
  model and odometer are filled — empty fields get an `is-invalid` red highlight and an
  inline error line. **The "Not sure yet? Just start the chat" skip button is REMOVED
  entirely from the modal (all steps, owner decision 2026-07-27)** — there is no bypass
  anywhere: the date is effectively mandatory too (the only way forward is picking one).
  This supersedes the earlier optional-fields choice — watch drop-off in GA
  (whatsapp_click vs vehicle_info_submitted) to judge the cost. Fires a
  `vehicle_info_submitted` GA event on success (make, model, km as separate params, plus
  `has_issue`). If adding a new WhatsApp CTA, set `vehicle: true` on its CTX entry (or via
  `data-ctx`) only if the enquiry is about the visitor's own car — not for browsing/buying
  flows.
  - **Optional issue box (added 2026-08-14, prompted by the first real lead — a customer
    hand-edited the prefilled message to describe an ABS fault):** SERVICING enquiries
    (`CTX.service.issue = true`) get an optional textarea on the vehicle step — labelled
    "In a few words, describe what's wrong (optional)" since 2026-08-14, **capped at 120
    characters** (maxlength + live 0/120 counter + submit-time clamp) so messages stay
    quick and to the point. **Since 2026-08-14 the optional box shows for ALL
    vehicle-collecting flows** — service, detailing AND paint & panel (`issue: true` on
    each CTX) — always after make/model/year/odometer; only the "Issues with my car"
    stream makes it required. Used-car flows have no vehicle step, so no box. If filled, the text is normalised by `tidy()` (collapse
    whitespace, strip space-before-punctuation, capitalise, ensure trailing full stop) and
    appended as `Issue: …` after the odometer in the WhatsApp message. Blank = omitted.
  - **"Car not running right?" stream (added 2026-08-14):** the generic Message-Jitty
    qualifier now has a FIFTH chip, directly under "General car service" — label "Car not
    running right?"; renamed 2026-08-14 to plain **"Issues with my car"**, no sub-line —
    owner wants the elaboration to happen in the follow-up questions, not on the chip.
    Its flow (`CTX.problem`): date step headed "When can we take a look?" → vehicle step
    where the issue box is **required** (`issueRequired: true`, same "In a few words,
    describe what's wrong" label without the optional tag) since describing the fault is the point of this stream. Base message:
    "Hi Jitty, my car is having some issues and I would like to get it checked."
  - **Generic buttons unified site-wide (2026-08-14):** on EVERY page, the floating
    WhatsApp bubble, the mobile bottom-bar WhatsApp + Book buttons, and the footer
    WhatsApp icon all carry the generic message ("…book my car in.") so they open the
    full 5-chip picker (incl. "Issues with my car"). Only explicitly-named CTAs keep
    direct flows: tier Book buttons, used-car Enquire (per-car), detailing package /
    paint-panel section CTAs, and "Book a Service" heroes. Keep this rule when adding
    pages: tail buttons generic, named CTAs specific.
  **Verified 2026-07-27 by a jsdom end-to-end simulation** (41 assertions across 8
  scenarios: tier/detailing/generic get the vehicle step; used-car and direct flows skip
  it; empty and partial submits blocked with error + field flags, typing clears a flag,
  full fill proceeds with date + car + km in the message; modal resets between opens).
- Enriched **AutoRepair / Service / FAQPage JSON-LD** on the main pages; per-service SEO
  pages exist for local search intent (don't collapse them into one).
- `robots.txt` tuned to allow major search + AI crawlers; `_headers` + `?v=` versioning
  prevent stale-CSS caching.

---

## 7b. Marketing assets — `marketing/` folder (added 2026-08-21)

- **`marketing/AutoDrive-Reel-Playbook.pdf`** (+ `reel-playbook.html` source): the content
  strategy the owner is pitching to Jitty — problem-first reels, one symptom per video,
  ten ready-to-shoot scripts, all funnelling to the bio link → "Issues with my car" flow.
  Also published as a Claude artifact:
  https://claude.ai/code/artifact/e9e7595b-98fe-4f95-b6d1-423db348fd3a
- **🖥️ TODO for the MAC session:** copy the PDF to the owner's Desktop after pulling:
  `cp marketing/AutoDrive-Reel-Playbook.pdf ~/Desktop/` — the cloud session can't reach
  the Mac's filesystem, which is why it's parked here.
- **Pending:** owner will supply Instagram Professional-Dashboard screenshots (30/90-day
  views + reach, external link taps, follower growth, top content, follower/non-follower
  split). When they arrive, add a "The Evidence" section to the playbook pairing IG's
  numbers with GA's (instagram/bio = 160 sessions / 44% of traffic, post-day spikes,
  Cyril's ABS booking as the end-to-end proof) and re-render the PDF. Any session can do
  this; keep the artifact URL the same.
- **`marketing/AutoDrive-Pitch-Brief.pdf`** (+ `pitch-brief.html` source, added 2026-09-11):
  Stalin's briefing for the retainer pitch to Jitty (12 Sep 2026) — AU market pricing research,
  scope priced as 11 separately-bought pieces (~$5.2–9.6k/mo market vs $2,500 asked), "already delivered" list
  with market values, break-even in cars/services, compound-effect argument, Royalty Auto
  Service case study, multicultural edge, a 3-tier ladder (Maintain $1,500 / **Grow $2,500
  recommended** / Dominate $3,800), the anchoring script, objection handling, walk-away line.
  Sections are tagged "show Jitty" vs "your eyes only". **2026-09-12: the "Open with this"
  section (before/after tables from the evidence run, the 8 Sep viral reel, the honest local-reach
  read) is now the first section and the anchoring script leads with it.** Also published as a Claude artifact
  (keep this URL when re-rendering): https://claude.ai/code/artifact/6d742a25-6f9c-4351-b8bb-b37258a3b7b7
  **Next step:** once Stalin fixes the Grow price, build the 2-page Jitty-facing proposal from
  the "show Jitty" sections.
- **`marketing/AutoDrive-Data.pdf`** (+ `data.html`; added 2026-09-12 as "Current Growth", renamed "Data"): the Jitty-facing
  evidence document. Five sections: Google Business Profile (monthly calls/clicks/interactions, reviews
  20→26), Facebook (reach 20×, follows +8→+271), Instagram (reach 30×, follows +55→+811, the 8 Sep reel),
  "Is it reaching Adelaide?" (honest read: Adelaide #1 city, everyday reels reach SA first, viral reel went
  national; a customer called after seeing the videos), and "Why it has to be consistent" (ordinary post
  reach 44→430). Written in Stalin's first-person voice, no prices (the price is in the pitch brief).
  Copies on the Desktop (`AutoDrive-Evidence/`) and in `Downloads/Autodrive downloads/`.
- **Evidence run — STATUS 12 Sep 2026, 01:10:** DONE for Google Business Profile (read via the in-search
  manager panel) and Meta Business Suite (read by a Claude-in-Chrome session; full text saved). Numbers are
  in `ANALYTICS_CONTEXT.md` → "Evidence run 2026-09-11". Evidence images for the pitch:
  `~/Desktop/AutoDrive-Evidence/01-GBP-before-after.png` and `02-Meta-before-after.png` (HTML sources beside
  them). Still open: GA4 (traffic by source/city, events, post-reel days) — the extension prompt is in the
  chat; and the reel-comment/DM local scan. Filmed-but-unposted footage: `~/Downloads/Autodrive downloads/`
  → `Jitty service footage 22:8/` = 21 raw clips (25 Aug) + edited cut `7:09 DV DV edit 7-seater and
  5seaters/Autodrive Sep 7.mp4`; `footage 11:09/AUTODRIVE.mp4` = second edited cut (11 Sep). Owner to
  confirm which count as "in the can". Original TODO kept below for the steps.
- **`marketing/AutoDrive-Content-System.pdf`** (+ `content-system-plan.html`, added 2026-09-12): the
  **Jitty-facing pitch document**, written by Stalin, laid out by Claude — the weekly content system
  (16 videos/month, Friday 8 pm sign-off, Mon–Sat 5–6 pm posting, FB-group strategy, weekly used-car
  videos into highlights, GBP revamp, website/profiles/analytics already running, "what I need from
  you"). Mentions **DV** = the editing/posting team Jitty already uses; Stalin coordinates them. No
  price in the document (price is said in the room, last). The pitch brief above is Stalin's private
  playbook, not shown to Jitty.
- **🖥️ TODO for the MAC session — "Evidence run" (added 2026-09-11, needed before the 12 Sep pitch).**
  The cloud session cannot reach Instagram/Meta/Google (egress-blocked — verified), so the
  before/after performance data must be collected on the Mac, ideally with **Claude in Chrome**
  driving Stalin's logged-in browser (`claude --chrome`, or `/chrome` inside a session). Steps:
  1. Ask Stalin for the **pivot date** — the week he gave Jitty the video direction. Before/after
     windows are equal length either side of it.
  2. **Meta Business Suite** (business.facebook.com → Insights, desktop): Overview → Reach chart
     for Facebook and Instagram separately, custom range 1 Jan 2026 → today; Content tab →
     **Export CSV** (or screenshot the list sorted by reach); Audience → follower growth.
  3. **Instagram professional dashboard** (instagram.com/autodrive_salisburyplain → Professional
     dashboard, or the app): last 90 days — Views with followers/non-followers split, Reach,
     Profile visits, External link taps, "vs previous 90 days" %; Content sorted by views (note
     the viral reels' dates + view counts).
  4. **Google Business Profile → Performance, last 6 months** (Google Maps signed into the manager
     account, or search "my business"): Overview interactions, Calls, Directions, Website clicks,
     Messages, "How people discovered you". Also current review count/rating (was 20 × 5.0★ in Jul).
  5. **GA4** (analytics.google.com, property 545462187): Traffic acquisition 14 Jul → today by
     source/medium; Events counts for whatsapp_click / booking_date_picked / vehicle_info_submitted;
     daily users chart.
  6. Save every screenshot + the CSV to `~/Desktop/AutoDrive-Evidence/`, then **write the numbers
     (not the images) into `ANALYTICS_CONTEXT.md`** under a new "Evidence run 2026-09-11" heading
     — posts/week before vs after, avg reach per post before vs after, follower growth, GBP calls/
     directions by month, top 5 reels with dates/views, IG 90-day link taps + non-follower share,
     GA source rows + lead events. Commit + push to `reviews-preview`. Narrate each step to Stalin
     as it happens (he wants to learn where the data lives).
  Any session can then build the "before / after" section of the pitch brief from those numbers.
  Also on the Mac: Stalin has a folder of **filmed-but-unposted reels** — count them and note the
  folder path here; "two weeks of content already in the can" is a pitch beat.
- **⚠ `marketing/` is publicly reachable on the deployed site** (Cloudflare serves the whole
  repo) — same accepted trade-off as the context .md files. Nothing secret goes in here. The
  pitch brief contains Stalin's negotiation notes; if that ever matters, add a `_redirects`
  rule or move it out of the repo before merging to `main`.

---

## 8. Known constraints & pending items

- **Contact form sends by SMS (not Formspree):** `#booking-form` composes a pre-filled text
  to **0432 247 691** via an `sms:` link (handler in `assets/js/main.js`, reads `data-sms`),
  with a quiet "prefer email" `mailto` fallback. There is a leftover unused
  `data-endpoint="...formspree..."` attribute on the form that the JS ignores — safe to delete;
  do NOT wire up Formspree.
- **Prices on the site:** the **service tiers** (Basic $149 / Standard $229 / Premium $329, see §7) and **used-car listings**. Everything else (detailing, individual mechanical services) is enquire-for-a-quote (the old $129/$299/$699 detailing tiers were removed).
- **Used-cars listings** (`used-cars.html`, `#stock` section, added 2026-07-22): a real
  mobile-first listing grid. Each car = an `<article class="car">` with photo/placeholder,
  status badge, price, spec chips, green trust chips, and a **prefilled WhatsApp "Enquire"
  button whose message names the specific car** (so GA `whatsapp_click` `link_url` tells you
  which car the lead is about — per-car lead tracking with no backend). Card CSS lives at the
  end of `assets/css/styles.css` (`.car`, `.stock-grid`, `.car--ask`, etc.).
  - **To add a car:** copy the whole `<article class="car">…</article>` block, edit the
    details, and change the prefilled WhatsApp text to name that car. **To add a photo:**
    drop the image in `images/` and swap the `<div class="car__ph">…</div>` placeholder for an
    `<img>` (there's an HTML comment in the file showing exactly how).
  - Currently **one live listing** (2009 Honda Civic VTi, $9,600) with a **promo video**
    (`images/promohondacivic.mp4` — muted autoplay loop) + a "Looking for something specific?"
    enquiry card. The video is a web-compressed 720×1280 / ~7.5 MB version of the owner's
    original 4K clip (compress every video before committing — Cloudflare Pages rejects files
    over 25 MB and GitHub rejects over 100 MB). More stock to be listed as it comes in.
  - **Design intent (mobile-first + buyer psychology):** cars shown first (right after hero),
    price up front, risk-reducing trust chips, one primary CTA (WhatsApp), honest status
    badges — no fake scarcity. Don't put AI-generated car images on real listings (misleading);
    use Jitty's real photos.
  - **⚠ WhatsApp links are intercepted by `main.js`.** Every `a[href*="wa.me/"]` click opens
    the "message-first" booking modal (qualifier chips or a date calendar) instead of going
    straight to WhatsApp; it then stitches the picked date onto the link's prefilled message.
    It guesses the flow from keywords in the message, which is fragile. **A link can force its
    flow with `data-ctx`:** `data-ctx="cars|service|detail|paint"` → that date-calendar flow
    keeping the link's own message (car listings use `cars` → "come have a look" calendar);
    `data-ctx="direct"` → skip the modal, open WhatsApp as-is. Use `data-ctx` on any new
    WhatsApp CTA whose message doesn't contain an obvious keyword, or it'll fall into the
    generic "what are you looking for?" qualifier.
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

---

## 7c. Booking confirmation + calendar invite flow (added 2026-09-04)

Three files, no server, no database — the booking details travel inside the link.

- **`confirm.html`** (`/confirm`, noindex, not in nav) — Jitty's internal tool. He fills name, mobile,
  date/time, duration, service, car, note. It builds a WhatsApp-ready confirmation message containing a
  **booking link** (`/booking?b=<base64url JSON>`), plus "Add to my calendar" for Jitty's own calendar.
  If he already has the customer's email he can enter it and the Google Calendar link carries them as a
  guest (`&add=`) so Google emails a real invitation on Save. Token `TOKEN` must match the Apps Script.
- **`booking.html`** (`/booking`) — customer-facing. Decodes the link, shows the booking, asks for
  their email, POSTs to the Apps Script `ENDPOINT`, which creates the event on **Jitty's** calendar
  with the customer as guest → Google emails the customer an Accept/Decline invite; acceptance shows on
  Jitty's event; both get reminders. Fallbacks always present: "Just add it to my calendar" (Google
  template link) and an `.ics` download. If `ENDPOINT` is empty the email form reports "not switched on".
- **`tools/booking-webhook.gs`** — the Google Apps Script. Deploy from Jitty's Google account as a
  Web app (Execute as Me / Anyone), paste the `/exec` URL into `booking.html` → `ENDPOINT`. Has a daily
  cap (40) and sanity checks. Deployment steps are in the file header.
- All times are computed as Adelaide wall time → UTC in the browser (verified across ACST/ACDT).
- **Status:** built and on `reviews-preview`; Apps Script not yet deployed (needs Jitty's login).

---

## 7d. "Bio link → website" outro animation — phases 1 + 2 built (added 2026-09-08)

A short vertical animation for Instagram/Facebook showing that the link in the bio takes people to the
website and to "Message Jitty". Built for Stalin to demo to Jitty. **Phase 1 is a finished, silent demo.**

**Where everything is** (all in `~/Downloads/Autodrive downloads/`):
- `AutoDrive-BioLink-Phase1.mp4` — the phase-1 render: 1080×1920, 30 fps, 5.0 s, no sound.
  Also in the Higgsfield media library (media_id `5da44798-cf76-47c0-93fa-0d6272c9fe42`) and on the Desktop.
- `AutoDrive-BioLink-Plan-v23.html` — the full production plan / storyboard (self-contained, opens in any
  browser, has a looping CSS preview of beats 1–2). Live copy: https://claude.ai/code/artifact/98afd4ae-f580-4bb9-a635-fef8587085de
- `BioLink-phase1-source/` — the three screenshots (S1 Instagram profile crop, S2 website hero crop,
  S3 Facebook page crop = IMG_6732) and `phase1-source/` (scene.html, render.js, assets/) to re-render.
  Re-render: `cd phase1-source && npm i puppeteer-core && node render.js all && ffmpeg -framerate 30 -i frames/f%05d.png -c:v libx264 -pix_fmt yuv420p -crf 17 out.mp4`
  (needs local Google Chrome + ffmpeg; every frame is a pure function of time, seeded, so re-renders match).

**What phase 1 shows (all decisions LOCKED after ~20 review rounds — do not reopen):**
- Neutral grey backdrop (no photo). Two SEPARATE dark frosted-glass panels, Apple-style: Instagram profile
  above, Facebook page below, 820 px wide, 40 px gap. Real screenshot pixels only — no AI-drawn UI, no
  re-typed text. Instagram's black and Facebook's white are cut to glass; Facebook's black text is flipped
  to white (blue link + emoji keep colour; cover photo, logo disc, green dot stay solid; cover trimmed 200 rows).
- Panels rise already tilted (rotateY −22°, rotateX 4°) and swing to straight-on 1.25–2.45 s WHILE the
  text types. Typing: every line in both panels types at once, left→right, ~30 keys/s with ±40 % wobble,
  NO cursor and NO edge/sweep line (both rejected), no captions.
- Each panel has its own small arrow (72 px) that fades in at its OWN bottom-right corner at 1.5 s (never
  from the screen edge), idles, and at 2.7 s goes to its own link (IG bio link / FB blue link); rings 3.2 s;
  both click at 3.6 s only once the panels are flat.
- Ending: still 3.6–3.9, distortion 3.9–4.4 (judder, 12 horizontal slices, red/cyan split), white flash
  4.4, decays to the empty backdrop by 5.0. End of phase 1.

**Update 17 Sep 2026 (v12 — current deliverable, 8.0 s):** v4 changed the intro and the ending; v5 played the
whole thing 5/3 faster and dropped the whoosh; v6 added the website card; v7 the arrow that clicks the site's
menu icon and the menu screen that pops up after it (replacing the old "arrow to Message Jitty" idea); v8 slowed
those pops down (owner: "too quick") and added the hover walk; v9 makes old screens disappear as the next arrives,
turns the walk into one smooth vertical sweep, closes the menu, swings the hero card to face the camera, clicks
"Message Jitty", and ends in a white flash; v10 makes Home red only while the arrow is on it (no red Home before
or after the sweep); v11/v12 are sound only — the owner auditioned five Pixabay clicks and five typing recordings and picked
DRAGON-STUDIO's "Mouse Click SFX" for the three clicks and "Typing Keyboard ASMR" for the typing. The scene is still authored on its 5 s clock (times below are scene times; divide by 5/3 for output times).
- **Intro = hard cut + pull-out, matching the outro card Jitty's editor already uses** (example:
  `~/Downloads/Autodrive downloads/Example screen recording/`): the panels no longer rise. The whole picture
  starts 2.6× zoomed in (centred on the FB logo disc) with zoom-streak motion blur and settles to size over
  0.42 s (quartic ease-out). The blur is real temporal blur: `render.js` averages up to 64 sub-frames per frame
  while the picture is moving (`ENTRY={from:2.6,dur:0.42}` in `scene.html`). Panels are complete from frame 0
  (no avatar pop). Typing still starts at 0.40.
- **v6 — the website card.** Right after the click (3.65, ≈0.05 s after 3.60) `assets/web-card.jpg` (a
  straight copy of `IMG_6859.jpg`, the live site's home hero — "Book a Service"/"Message Jitty"/reviews pill)
  swipes up from off-screen bottom over 0.55 s (`easeOutBack`, a light landing bounce), tilted
  `rotateY(22deg) rotateX(-4deg)` — the OPPOSITE of the panels' own entry tilt (`rotateY(-22) rotateX(4)`) —
  and holds that tilt at rest, covering both panels. Controlled by `WEB={...}` in `scene.html`.
- **v7–v9 — menu click, second screen, sweep, Message Jitty, flash.** Card pops take 0.83 s each; the profile
  panels fade out as the hero card rises. 4.55 an arrow fades in
  at the card's LEFT edge, inside the card (shares its tilt); 4.95–5.62 travels to the three-line menu icon
  top-right; 5.62 ring; 5.95 click (dip, ripple, real mouse click sound). 6.00–6.83 `assets/web-card2.jpg`
  (= `IMG_6858.jpg`, the site with its menu open) pops up like the first card, same tilt, on top (the hero card fades
  out under it), with the arrow already sitting on its menu icon. 7.05 the arrow goes to Home, then 7.40–10.40 ONE
  smooth vertical sweep down through Services, Car Detailing, Paint & Panel, Used Cars, Contact and on to the page
  below; each item shows the site's real hover look — red text + red line, exactly how Home looks in the screenshot —
  while the tip is inside its row — Home included, black at all other times — via `assets/menu-<item>.png`, strips of
  the real pixels recoloured (Home's strip goes the other way, black + grey line). 10.70 the menu screen fades out,
  the hero card is back; 10.90–11.90 it swings to face the camera while the arrow moves to the white "Message
  Jitty" pill; 12.00 ring; 12.30 click; 12.45 white flash takes the screen out; 13.33 end on the empty backdrop.
  `ARW`, `WEB2`, `HOV`, `FIN`, `JITTY`, `MENU` in `scene.html`; `assets/menu.json` = strip boxes + tips in IMG_6858 px.
- **Ending = flash (v9, owner's request — supersedes the earlier "static" rule).** After the Message Jitty click
  the screen goes out in a clean white flash and the clip ends on the empty grey backdrop. Still no glitch slices
  or distortion — those stay rejected. The distorted zoom
  (v3) and the glitch/flash (v1) are both gone — kept as `scene.v3-zoomexit.html` / `scene.v1-glitch.html`; their MP4s are in `old/`.
- **Sound v12** (`sfx12.py`): NO whoosh; real typing 0.24–1.32 output s (Pixabay "Typing Keyboard ASMR", DRAGON-STUDIO
  id 356116, its busiest stretch at double tempo with pitch kept so it matches the on-screen typing rate); the Pixabay
  mouse click ("Mouse Click SFX", DRAGON-STUDIO id 444806) at 2.16,
  3.57 and 7.38 output s (bio link, menu icon, Message Jitty), otherwise silence; card pops, sweep and flash are
  silent. No music by design.
- Files in `~/Downloads/Autodrive downloads/Outro video Autodrive/` (copies on the Desktop):
  `V12 AutoDrive Outro 17-09-2026.mp4` (deliverable, 8.0 s), `V12 … silent.mp4`, `V12 … sfx.m4a` (stem).
  All SFX are Pixabay Content License (free commercial use, no credit); MP3s + the audition set in
  `Outro video Autodrive/sound effects/`.
  **Naming rule (version FIRST):** `V<N> AutoDrive Outro <dd-mm-yyyy>.mp4` + ` silent`/` sfx` variants; bump N on
  every new render; only the current version sits at the top level of the Outro folder + Desktop, previous
  version's files move to `old/` inside the Outro folder. Every earlier version (v11 = Universfield click + synth taps, v10 = Wikimedia click, v9 = Home flipped red at the end, v8 = item-by-item walk, v7 = no walk, v6 = card only,
  v5 = no card, v4 = 5 s with whoosh, v3, v1) is in `old/` inside that folder.
- Rebuild (inside `BioLink-phase1-source/phase1-source/`): `node render.js all` (≈5 min, the blurred entry
  frames are slow) → ffmpeg frames → mp4; `python3 sfx12.py outro-sfx-v12.wav`; mux with ffmpeg (≈8 min all up, 240 frames). Full handoff:
  `~/Downloads/Autodrive downloads/HANDOFF - Outro video + AutoDrive context (14 Sep 2026).md`.

**Phase 2 — built (v6 + v7, 14–15 Sep):**
1. ~~Stalin to decide the website picture~~ — done: `IMG_6859.jpg` (site home hero), swiping up as `assets/web-card.jpg`.
2. ~~Arrow onto "Message Jitty"~~ — replaced by Stalin's call: the arrow clicks the three-line MENU icon instead, the
   menu screen (`IMG_6858.jpg`) pops up on top, and the arrow hovers each menu item (v7 + v8). Nothing left in the
   picture unless Stalin asks.
3. Sound: key ticks per keystroke, one tap on the clicks, music bed (Stalin to send a 10 s reference or say
   "pick something neutral"). Higgsfield `generate_audio` or any library; mix with ffmpeg.
4. Assembly: use `AutoDrive-BioLink-Phase1.mp4` as opening footage (Higgsfield `video-editing`/higgsedit,
   CapCut, or the same scene.html pipeline extended) and export 1080×1920 for Reels/Stories/GBP.
5. Instagram screenshot shows the `?utm_so…` bio link — fine to leave; it is what people actually see.
