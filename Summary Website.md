> # ⚠️ OUTDATED — DO NOT USE
> This file describes an **old, discarded design** of the site (a pitch-black "Premium
> Industrial Mechanic" theme with Outfit/JetBrains Mono fonts and a 121-frame video-scrub
> hero). **None of that exists on the current site**, which is the red/white
> "garage-premium" design. Kept only for history.
> **➡ For current, accurate context see [`AUTODRIVE_PROJECT_CONTEXT.md`](./AUTODRIVE_PROJECT_CONTEXT.md).**

---

# Autodrive Website Handoff Summary

This document provides a comprehensive technical overview of the Autodrive Salisbury Plain landing page website, including the current codebase architecture, styling details, assets, interactive features, and behavioral mechanics.

---

## 1. Project Directory Structure

```
AutoDriveWebsite/
├── AutoDriveWebsite.code-workspace  # VS Code workspace configurations
├── index.html                       # Core layout, structure, content & JavaScript logic
├── styles.css                       # Design system variables, responsive layouts & animations
├── Summary Website.md               # This project summary document
└── images/                          # Image assets & frame sequences
    ├── logo-autodrive.png           # Original branding logo
    ├── logo-crushed.png             # Logo optimized for nav panel
    ├── logo-dark.png                # Logo optimized for footer
    ├── logo-transparent.png         # Logo with alpha mask
    ├── engine-service.png           # Featured mechanic work image
    ├── family-car-service.png       # Vehicle servicing showcase image
    ├── diagnostics-tech.png         # Tech diagnostics showcase image
    ├── hero-workshop.png            # Main workshop image
    ├── luxury-car.png               # Luxury vehicle highlight image
    ├── hero-explosion.mp4           # Video file source
    └── hero-frames/                 # Pre-extracted JPEG frames for scrub scroll (121 files)
        ├── frame_0001.jpg
        └── ... (to frame_0121.jpg)
```

---

## 2. Design Archetype & System (`styles.css`)

The site is designed under a **Premium Industrial Mechanic** aesthetic.

*   **Color Palette:**
    *   Primary Background: Pitch Black (`#0b0b0b`)
    *   Secondary Backgrounds: Charcoal Grey (`#121212`, `#1c1c1c`, `#151515`, `#1f1f1f`)
    *   Primary Text: Off-white (`#f2f2f2`)
    *   Muted Accents: Chrome/Silver (`#b0b0b0`, `#a0a0a0`)
    *   Brand Action Highlight: AutoDrive Crimson Red (`#D42027` | Hover: `#B71C1C`)
*   **Typography:**
    *   Sans-serif: **Outfit** (clean, geometric headers & body)
    *   Monospace: **JetBrains Mono** (technical labels, taglines, steps)
*   **Aesthetic Details:**
    *   Sharp industrial corners (zero border-radius) on all layout containers, cards, and input fields.
    *   Smooth transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) on interaction items.

---

## 3. Key Components & Sections Built (`index.html` & `styles.css`)

### 1. Navigation Header
*   **Desktop:** Frosted glass effect (`backdrop-filter: blur(16px) saturate(1.3)`), floating over the canvas with transparent backing. Shifts to denser black styling on scroll (`.nav.scrolled`). Includes animated slide border underlines on hover.
*   **Mobile:** Hamburger toggle (`#navToggle`) utilizing CSS line rotation transforms. Spawns full-screen viewport menu overlay (`.mobile-menu`) with scroll-locking (`overflow: hidden`).

### 2. Video-Scrubbing Canvas Hero Section
*   Designed to mimic high-end interactive websites by binding scroll position to video frame advancement.
*   **Spacer Container:** Set to `400vh` to generate enough scroll height to step through frames.
*   **Sticky Canvas (`#heroCanvas`):** Kept pinned to view (`position: sticky`), rendering frame preloads sequentially. Uses `window.devicePixelRatio` scaling to support High-DPI/Retina screens without pixelation.
*   **JS preloader:** Standardizes requests for 121 JPEG frames (`frame_0001.jpg` to `frame_0121.jpg`), draws them dynamically on viewport cover calculations, and fades the "Scroll to explore" overlay (`#heroScrollHint`) once scroll offset passes `2%`.

### 3. Stats Strip
*   Four-column numeric callout grid (15+ Years, 4k Serviced, 100% Satisfaction, 24h Turnaround) using clamp font sizes to remain responsive across mobile screens.

### 4. Seamless Marquee Strip
*   Infinite looping marquee using linear keyframe key translations (`marqueeScroll`) tracking text items separated by crimson dot nodes.

### 5. Bento Grid Services
*   Asymmetrical grid organization:
    *   **Featured Service:** Takes up 2 columns and 2 rows, featuring a zoomed hover-scale image mask overlay (`images/engine-service.png`) and SVG branding icons.
    *   **Standard Cards:** Grid layout cells containing specific mechanical detail highlights (Diagnostics, Brakes, Suspension, Electrical, Tyres) using lightweight inline SVG icons.

### 6. Process Steps Timeline
*   Sequential block counting (Book -> Inspect -> Service -> Collect) leveraging CSS counters (`counter-reset: step` and `counter-increment: step`) to auto-format numbering to `01`, `02`, etc.

### 7. Form & Contact Portal
*   **Left Details:** Clear address, phone, email, and business hour labels paired with red SVG visual indicators.
*   **Interactive Form:** Modern grid input layout. Features native client-side validation overrides and standard JS response handling: changes submit button background to crimson, changes text to "Enquiry Sent" with inline tick icon, locks input elements, and resets fields after 3 seconds.

---

## 4. Custom JavaScript Interactions (`index.html`)

1.  **Retina-Aware Cover Canvas Logic:** Resize handler computes exact aspect ratios and handles drawing using `ctx.drawImage` to fit content like `object-fit: cover`.
2.  **Intersection Observer for Scroll Reveal:** Select elements configured with the `.reveal` class trigger staggered transition animations (`delay = itemIndex * 80ms`) as they scroll into view.
3.  **Smooth-Scroll Overrides:** Normalizes default jumping anchors to smoothly interpolate distance while accounting for the floating nav header offset (`offsetHeight`).
