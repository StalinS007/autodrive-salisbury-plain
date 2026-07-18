> **⚠ SUPERSEDED / historical.** The video-background work described here is already done
> and live. Its file paths point to an old Mac and are no longer valid. The tuning knobs are
> summarised in §9 of [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) — start there.

---

# Handoff: Animated Video Background — Services Section

## Goal

Wire the animated exploded-car video (`autodrive-hero-loop.mp4`) as a pinned, full-viewport scrolling background behind the services section on the homepage (`index.html`). The video stays fixed while the service cards scroll over it. A left-weighted dark scrim sits between the video and the cards for readability. An SVG overlay animates component labels on the car (engine oil, brakes, etc.) in sync with the video's timeline. A "Vehicle Health Check" tab on the right animates dots from amber to green as items are checked off.

---

## CURRENT STATE — changes already applied

**All four changes below are already saved to disk. Do not re-apply them.**

| What | Status |
|------|--------|
| Video copied to repo | **DONE** — `images/autodrive-hero-loop.mp4` exists |
| `index.html` services section replaced | **DONE** — `<section class="band-grey">` → `<section class="ad-services">` with pinned video structure |
| `assets/css/styles.css` — `ad-*` styles added | **DONE** — appended at end of file |
| `assets/js/main.js` — animation loop added | **DONE** — appended inside the existing IIFE |

**What remains:** Preview it in a browser, check for visual issues, and iterate on appearance (scrim darkness, card opacity, tab position, etc.) as the user requests.

---

## Key file paths

| File | Absolute path |
|------|---------------|
| Homepage (edited) | `/Users/stalinsmac/Documents/Autodrive Salis/AutoDriveWebsite/index.html` |
| Stylesheet (edited) | `/Users/stalinsmac/Documents/Autodrive Salis/AutoDriveWebsite/assets/css/styles.css` |
| JS (edited) | `/Users/stalinsmac/Documents/Autodrive Salis/AutoDriveWebsite/assets/js/main.js` |
| Video (in repo) | `/Users/stalinsmac/Documents/Autodrive Salis/AutoDriveWebsite/images/autodrive-hero-loop.mp4` |
| Original demo file | `/Users/stalinsmac/Documents/Claude/Projects/Autodrive Salisbury/autodrive-services-section.html` |
| Original video source | `/Users/stalinsmac/Documents/Claude/Projects/Autodrive Salisbury/autodrive-hero-loop.mp4` |

---

## How to preview

The repo is a plain static site — no build step. Start any static server from the repo root:

```bash
cd "/Users/stalinsmac/Documents/Autodrive Salis/AutoDriveWebsite"
python3 -m http.server 5050
```

Then open `http://localhost:5050/index.html` and scroll past the hero/about sections to reach the services section.

A launch config already exists at `.claude/launch.json` with server name `autodrive-static` on port 5050.

---

## What to look for / common tweaks

The user will want to iterate conversationally. Here are the knobs:

### Scrim darkness
In `styles.css`, find `.ad-scrim`. The gradient goes:
```css
background: linear-gradient(90deg,
  rgba(8,11,17,.86) 0%,    /* left — where text sits */
  rgba(8,11,17,.66) 38%,
  rgba(8,11,17,.30) 70%,
  rgba(8,11,17,.12) 100%   /* right — where tab/labels show */
);
```
Increase the alpha values to darken; decrease to lighten. The left side should stay readable.

### Tab position / size
`#ad-tab` in `styles.css`: `right: 1.6%` (horizontal) and `top: 50%` (vertical — top edge of the tab starts at 50vh). `width: 18.5%` controls size.

### Card appearance on dark background
The existing `.card` uses `background: #fff` — white cards float on the dark video. To make them more transparent/glassy, add inside `.ad-services .card { background: rgba(255,255,255,.92); }` or similar.

### Section padding / content entrance point
`.ad-inner` in `styles.css`: `padding: 16vh 4vw 20vh`. The top padding controls how far down the viewport the cards start appearing. Increase `16vh` to push cards lower (more video visible before content).

### Tick animation pace
In `main.js`, `gtime(o)` returns `3.45 + o * 0.11` — the video timestamp when each label/dot animates in. Adjust the `3.45` offset (when the first tick fires) and `0.11` multiplier (spacing between ticks).

---

## Structure summary (what was inserted)

In `index.html` the services section is now:
```
<section class="ad-services">
  <div class="ad-pin">           ← position:sticky, height:100vh, margin-bottom:-100vh
    <video id="ad-vid" ...>
    <svg id="ad-ov" ...>         ← component labels (SVG, animated by JS)
    <div id="ad-tab">            ← "Vehicle Health Check" panel (right side)
    <div class="ad-scrim">       ← gradient overlay for readability
  </div>
  <div class="ad-content">       ← z-index:2, scrolls over the pinned video
    <div class="ad-inner">
      [section heading + 6 service cards + "View All Services" button]
    </div>
  </div>
</section>
```

All classes/IDs are prefixed `ad-` so they don't clash with the rest of the site's CSS.

---

## Project context

See `HANDOFF.md` in the repo root for the full project brief (business facts, brand tokens, locked design decisions, file structure, SEO notes).
