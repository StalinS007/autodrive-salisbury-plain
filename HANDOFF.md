# AutoDrive Salisbury Plain — Project Handoff

This document briefs a fresh Claude Code session on the AutoDrive Salisbury Plain
website. **Read this first.** It captures the business facts, the locked brand/design
tokens, the file structure, and the current goal (incorporating a design repo) so you
don't re-derive context or accidentally break what's already correct.

---

## 1. The goal right now

Restyle the existing site to a higher design standard using the **Taste Skill** toolkit,
**while keeping all business content, colours, fonts and images exactly as they are.**

### The design resource — Taste Skill (Agent Skills, not a template)

- **Repo:** https://github.com/Leonxlnx/taste-skill (MIT licensed, © 2026 Leonxlnx)
- **What it is:** a collection of portable **Agent Skills** (`SKILL.md` instruction files)
  that make an AI build *less generic, higher-taste* frontends — stronger layout,
  typography, spacing and motion. It is **not** a component library or site template to
  copy markup from. You *install the skills* and they guide how you restyle the site.
- **Framework-agnostic** — works fine with this plain HTML/CSS/JS site; no migration needed.
- **Install (run in the project folder):**
  ```
  npx skills add https://github.com/Leonxlnx/taste-skill
  ```
  Or install a single skill by its install name, e.g.:
  ```
  npx skills add https://github.com/Leonxlnx/taste-skill --skill "redesign-existing-projects"
  ```
- **Most relevant skills for this job:**
  - `redesign-existing-projects` (**redesign-skill**) — audits an existing UI, then fixes
    layout, spacing, hierarchy and styling. Best fit since the site already exists.
  - `design-taste-frontend` (**taste-skill**, v2) — the general default; infers the design
    language and tunes three 1–10 dials: **DESIGN_VARIANCE** (layout experimentation),
    **MOTION_INTENSITY** (animation depth), **VISUAL_DENSITY** (info per viewport).
  - `high-end-visual-design` (**soft-skill**) — polished, premium, calm UI; matches the
    "garage-premium" brand feel.
  - `full-output-enforcement` (**output-skill**) — add if the agent ever truncates output
    or leaves placeholder comments instead of finishing.
- **Suggested dial settings** for this brand: moderate VARIANCE, moderate MOTION (it
  already uses scroll reveals), low–moderate DENSITY (keep the generous whitespace).

### What's locked vs. open

- **Locked — do NOT change:** business facts, contact details, the colour tokens and
  fonts (see §3), the real images and their mapping (see §5), and the page/URL structure.
- **Open — may change:** layout structure, section composition, spacing rhythm,
  typographic scale, hover/scroll animations, and overall visual polish.

Work **incrementally**: redesign one page or section, commit, let the user review, then
continue. Do not rewrite all 11 pages in one pass.

> Suggested first step: `git init` and commit the current state before any changes, so
> every edit is reversible via diff/checkout. Then install the skill(s) above.

---

## 2. Business facts (source of truth — keep accurate)

- **Name:** AutoDrive Salisbury Plain — Car Service & Repair Centre
- **Positioning:** Adelaide's trusted one-stop automotive care centre. Dealer-quality
  servicing at independent prices, all makes & models.
- **Phone / WhatsApp (ONE number everywhere):** +61 432 520 230
  - `tel:` form: `tel:+61432520230` · WhatsApp: `https://wa.me/61432520230`
- **Email:** autodrive5109@gmail.com
- **Workshop (servicing/repairs/detailing):** 6 Lolands Rd, Salisbury Plain SA 5109
- **Used-car showroom (separate location — label clearly):** 779–781 North East Road,
  Valley View SA 5093
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

## 3. Brand & design tokens (LOCKED — keep identical)

Defined in `assets/css/styles.css` under `:root`. Keep these exact values when restyling.

```
--brand-red:    #C01418   /* primary accent: CTAs, icons, numerals, highlights */
--brand-red-dk: #930E12   /* hover/pressed */
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
- **Feel:** bold, sporty, high-contrast "garage-premium". Red is an accent, not a large
  fill. Generous whitespace, tight-rounded corners, soft shadows, a thin red accent motif.
- Red is intentionally the *darker* `#C01418` (was brightened down from `#E11B1B` at the
  owner's request). Don't revert it.

---

## 4. File structure

```
AutoDriveWebsite/
├── index.html                     # Home
├── services.html                  # Services overview (grid of all services)
├── detailings.html                # Car detailing (packages + service grid)
├── used-cars.html                 # Used cars (promise, inventory placeholders, showroom)
├── contact.html                   # Contact + booking form + Google Map
├── services/                      # Individual SEO service pages
│   ├── logbook-servicing.html
│   ├── brakes-suspension.html
│   ├── diagnostics-repairs.html
│   ├── diesel-dpf.html
│   ├── 4wd-service.html
│   └── air-conditioning.html
├── assets/
│   ├── css/styles.css             # Single design system / stylesheet (all pages)
│   └── js/main.js                 # Mobile nav, scroll reveal, form handler, footer year
├── images/                        # Real photos + logos (see §5)
├── sitemap.xml
├── robots.txt
└── HANDOFF.md                     # this file
```

Root pages reference assets as `assets/...` and images as `images/...`.
Pages in `services/` use `../assets/...` and `../images/...`. Keep these relative paths
correct if you move files.

Plain static HTML/CSS/JS — **no build step, no framework, no dependencies.** Open
`index.html` directly in a browser to preview, or run a simple static server.

> Note: the `images/` folder also contains an old marketing video, `hero-frames/`, and
> `old-site-content.json` / `Summary Website.md` from a previous attempt. The previous
> root `index.html`/`styles.css` were intentionally overwritten by the current site.

---

## 5. Image mapping (LOCKED — these are the real assets in use)

The site reuses photos already in `images/`. **Some real-photo filenames contain spaces
and must stay URL-encoded (`%20`) in HTML/CSS.** Current mapping:

| Used for                         | File in `images/`                       | Encoded reference                          |
|----------------------------------|-----------------------------------------|--------------------------------------------|
| Favicon, og:image, JSON-LD image | `logo-autodrive.png`                    | `images/logo-autodrive.png`                |
| Watermark mark (CSS backgrounds) | `logo-mark.svg`                         | `images/logo-mark.svg`                     |
| Home hero background (in CSS)    | `1. And working on cars .jpeg`          | `1.%20And%20working%20on%20cars%20.jpeg`   |
| About / logbook / diesel images | `2. Man working on car .jpeg` (about), `1. And working on cars .jpeg` (diesel/brakes) | as above |
| Diagnostics page image           | `3. Man working on car .jpeg`           | `3.%20Man%20working%20on%20car%20.jpeg`    |
| Detailing + air-con images       | `luxury-car.png`                        | `images/luxury-car.png`                    |
| Used-cars + 4WD images           | `family-car-service.png`                | `images/family-car-service.png`            |

- **Header + footer logos are now inline SVG** (owner-approved change, June 2026): a
  vector recreation of the lockup embedded in every page's header (`.logo-svg`) and
  footer (`.logo-svg--light` white variant). The PNG remains only for favicon/OG/JSON-LD.
  A faint car-only watermark (`images/logo-mark.svg`) backs `.cta-band` and `.page-hero`.
- The hero/about/diagnostics shots are **real photos of the owner in his actual
  workshop** — keep them; they're the site's strongest trust asset.
- `luxury-car.png` and `family-car-service.png` are stand-ins for detailing/used-cars —
  swap for real photos when available.

---

## 6. Known constraints & pending items

- **Contact form is not yet wired to a backend.** `contact.html` has `id="booking-form"`
  with an empty `data-endpoint=""`. Until a real endpoint (e.g. Formspree) is set, JS shows
  a friendly on-screen confirmation. To enable email delivery, set `data-endpoint` to the
  endpoint URL. Logic is in `assets/js/main.js`.
- **Detailing prices are placeholders** ($129 / $299 / $699 "from"). Confirm real pricing.
- **Used-cars inventory is placeholder categories**, not live stock. Ready to populate with
  real listings (photo, price, year, km) when available.
- **Google Map** on contact uses `?q=6 Lolands Rd, Salisbury Plain SA 5109&output=embed`
  (the original live site's map pointed to the wrong coordinates — keep this corrected one).
- **Two locations** (workshop vs Valley View showroom) are intentionally distinguished —
  preserve that distinction.

---

## 7. SEO already in place (preserve)

- Unique `<title>` + meta description per page; semantic headings; descriptive `alt` text.
- `AutoRepair` / `Service` / `FAQPage` JSON-LD schema in the relevant pages.
- `sitemap.xml` and `robots.txt` at root. Open Graph tags on every page.
- Individual per-service pages exist specifically for local search intent (e.g. "logbook
  servicing Salisbury Plain"). Don't collapse them back into one page.

---

## 8. Conversion / trust features already built (preserve)

Sticky mobile call/WhatsApp/Book bar; floating WhatsApp button; repeated benefit-led CTAs;
trust strip; warranty-safe messaging; star-rating review section; service-area list. Keep
these patterns when restyling — they're the conversion backbone.

---

## 9. Suggested workflow for the redesign

1. `git init` + commit current state.
2. Clone / open the design repo so its files are readable; skim its CSS, components,
   spacing scale and animation approach.
3. Restyle **one page** (suggest the homepage) adopting the repo's layout/feel, keeping
   §3 tokens and §5 images. Commit.
4. Review the visual diff with the user, adjust, then roll the pattern out to the other
   pages and the shared `styles.css`.
5. Keep `styles.css` as the single source of styling; keep the colour tokens as CSS
   variables so the brand stays consistent.
