# AutoDrive — Strategy Chat Context (for the dedicated strategy session)

**Who this file is for:** a Claude Code session reserved for **business strategy
development** for AutoDrive Salisbury Plain — growth planning, marketing direction,
channel strategy, pricing/offer thinking, and prioritising what the business (and the
website that serves it) should do next. Written 2026-08-23; keep the "Current strategy
state" and "Decision log" sections updated as things move.

## Your role in this chat
- You are the **business strategist** for AutoDrive. The owner of this workflow is
  **Stalin** (stalinsajie@gmail.com), who runs the website and marketing for the
  mechanic, **Jitty**. Strategy discussed here is Stalin's pitch material to Jitty.
- Read **`AUTODRIVE_PROJECT_CONTEXT.md`** (site/business facts) and
  **`ANALYTICS_CONTEXT.md`** (GA4 facts, baselines, interpretation rules) at session
  start — strategy must be grounded in both.
- **This chat does NOT edit the website.** Site changes happen in the build sessions on
  `reviews-preview`. Analytics interpretation happens in the analytics chat. This chat
  produces **plans, priorities, and recommendations** — when a plan needs a site change,
  state it as a hand-off item for the build chat. (Exception: this file itself, and
  strategy documents/artifacts, may be created and updated here — pull first per
  CLAUDE.md's multi-session rules.)
- Be honest about scale: this is a young, one-man local trade business with low
  double-digit weekly web traffic. Recommend things Jitty and Stalin can actually
  execute (minutes per day, $0 budget unless stated), not enterprise playbooks.

## Business snapshot (2026-08-23)
- **Three revenue lines, one site:** mechanical servicing/repairs (core), car detailing,
  and used-car sales (stock ~$5k–$40k) — plus paint & panel as the 4th service (page
  awaiting approval on `reviews-preview`).
- **Location:** 6 Lolands Rd, Salisbury Plain SA 5109 (single site). Serves northern
  Adelaide (Salisbury, Elizabeth, Mawson Lakes, Gawler corridor).
- **Pricing on site:** service tiers Basic $149 / Standard $229 (Most Popular) /
  Premium $329; used cars carry real prices; everything else quote-on-enquiry.
- **Trust assets:** 5.0 stars from 20 Google reviews, 150+ repeat local clients, real
  workshop photos of the owner on the site.
- **Lead capture:** WhatsApp-first (per-tier and per-car prefilled messages, booking
  modal collects date + vehicle + optional issue), one phone number 0432 520 230.

## Where customers actually come from
- Primary: **Facebook local community groups** (e.g. Adelaide Indian Community) and
  **word-of-mouth / direct calls**. The website is the **closer/validator**, not the
  primary lead source.
- Instagram `@autodrive_salisburyplain` is the main content channel being developed;
  bio link is UTM-tagged and was ~44% of site traffic in early samples.
- Proof the funnel works end-to-end: **Cyril's ABS booking** — Instagram → bio link →
  "Issues with my car" flow → WhatsApp → real job (first tracked real lead, ~Aug 2026).

## Current strategy state (what's already in motion)
- **Influencer research dossier (2026-08-23):** `marketing/AutoDrive-Influencer-Research.md`
  — 20 profiled mechanic/detailing/used-car creators who converted social into bookings,
  with evidence grades and a 7-point translation for Jitty. Shareable version:
  https://claude.ai/code/artifact/0754a44b-93fe-4872-b951-cfc44b5eb77e
  Headline conclusions: the existing reels → WhatsApp funnel is the right architecture;
  the levers are reply speed (<5 min), review recency, a named face-led series
  ("Ask Jitty"), dead-part/second-opinion reels, buy-fix-sell arcs per used car, and a
  pre-purchase-inspection offer as the bookable content product.
- **Reel Playbook** (`marketing/AutoDrive-Reel-Playbook.pdf`): problem-first Instagram
  reels strategy pitched to Jitty — one symptom per video, ten scripts, all funnelling
  to bio link → "Issues with my car" flow. Awaiting Jitty's IG dashboard screenshots to
  add an evidence section.
- **UTM link dictionary** live (see ANALYTICS_CONTEXT.md): instagram/bio, google/profile,
  facebook/social tagged; **fbgroup/post links ready but not yet used** — Jitty was to
  start community-group posting ~week of 18 Aug.
- **Pending fixes with business impact:** Google Business Profile still shows the old
  247 691 number (fix with Jitty); real detailing/used-car photos needed to replace
  stand-in images.

## Strategy workstreams (develop and prioritise in this chat)
1. **Lead generation:** reels cadence + FB group posting rhythm; whether/when to add
   paid (GBP posts, FB boosts); review-growth engine past 20 reviews.
2. **Conversion:** booking-modal friction vs. lead quality (mandatory fields trade-off —
   watch GA drop-off); which tiers/cars pull enquiries.
3. **Revenue mix:** how hard to push detailing and used cars vs. core servicing;
   used-car turnover and listing strategy.
4. **Retention/repeat:** service reminders, post-sale discounted repairs as a hook,
   turning the 150+ repeat clients into reviewers and referrers.

## Instagram → Facebook attack plan (agreed direction, 2026-08-23)
Grounded in the IG 90-day baseline (see ANALYTICS_CONTEXT.md on the analytics branch:
54.8K views, 80% non-follower, ONE symptom reel = 69% of all bio taps, UK geo-skew) and
the influencer research dossier.
- **Phase 1 — Instagram (now):** fix the shopfront first — cars-only grid (archive
  off-niche event promos), bio rewrite, THREE pinned posts: (1) intro reel "meet Jitty",
  (2) the warning-light reel as social proof, (3) "why service your car" reframed
  problem-first ("$149 vs $3,000"). Localise every post (geotag Salisbury SA, say
  "Adelaide" in first 3s, local hashtags). Cadence 2–3 reels/week from proven formats:
  warning-light siblings (one dashboard light per reel), dead-part explainers,
  here's-what-we-found. Reply-to-comment reels + fast WhatsApp replies.
- **Language (REVISED 2026-08-23, owner clarification):** Jitty's videos are currently
  ALL-Malayalam, no English — and the 19K "warning light" reel's audience was Malayalam
  speakers (Malayalam comments, UK Malayali diaspora). So the UK geo-skew is primarily
  **language-affinity distribution** (IG pushes Malayalam content to the global Malayali
  diaspora — UK/Kerala/Gulf), not the Salisbury Plain name collision. This also explains
  ~160 bio sessions ≈ 1 booking: most viewers can't book. Decision: KEEP the Malayalam
  engine (authentic, feeds the Adelaide Malayali referral core — "the Malayali mechanic
  of Adelaide" is a defensible niche) but change the packaging: (1) burned-in English
  subtitles on EVERY video from now on; (2) English hook text in first 3s + no-speech
  overlay-text reels for language-neutral discovery; (3) local anchoring — "Adelaide"
  on screen, geotag, local hashtags, seed into Adelaide FB groups in the first hour.
  Pinned intro: Malayalam is fine (ideally 2-line English open), strong English subs.
  Judge reels on Adelaide signals (follower Top-Locations, bio taps → WhatsApp msgs),
  not views. → Relay to analytics chat: replace its name-collision geo-skew theory.
- **Phase 2 — Facebook (weeks 2–4):** the page is a trust surface only (cross-posts
  proved near-dead: 4 FB likes vs 153 IG on the hero reel); the leverage is GROUPS —
  helpful-first answers + the Malayalam intro posted natively in Adelaide
  Indian/Malayali groups, used-car walkaround videos with fbgroup-UTM deep links, and
  Marketplace listings with video. WhatsApp is always the CTA.

## Instagram profile decisions (settled 2026-08-23)
- **Bio CTA: "Prices and booking 👇"** (replaces "HOW WE CAN HELP", and the earlier
  "Tap for free quote" which recruited quote-collectors who never booked). Keeps the link
  pointing at the WEBSITE on purpose — the site is the closer/validator (reviews, real
  workshop photos, prices, video), so browsing before WhatsApp converts better than a cold
  chat. Wording covers all four lines rather than servicing only.
- **Dependency for the build chat:** the CTA promises prices, but detailing and
  paint & panel are quote-only on the site → add "from $X" figures to both sections.
  Same fix reduces quote-and-ghost at the source (people self-qualify on price).
- **Also queued for the profile:** say "Adelaide" in the name field + bio (not "South Aus
  5109") — the searched, understood word; cars-only grid (archive event promos);
  highlights for Reviews / Before-After / Used Cars; 3 pinned posts (intro reel,
  warning-light reel, "why service" reframed problem-first).

## The quote problem (diagnosed 2026-08-23)
Jitty DOES give quotes — people take the number and never return. Cause: a bare price makes
him comparable (always someone cheaper) and isn't an ask, so the next move sits with them
forever. Fix = quote message must carry five things: evidence (photo/video of the actual
fault — his key differentiator), what's included, cost of waiting, the price, and TWO
specific time slots ending in a question. Then follow up twice (~48h, ~1 week) and ask
non-bookers "was it price or timing?". Track quote→booking close rate (currently unknown).
Deposits on bigger jobs (detailing/paint) to lock slots. NOT recommended: discount offers —
they recruit discount-shoppers and undercut a 5.0-star shop competing on trust.

## Writing rules for ALL customer-facing copy (owner instruction, 2026-08-23)
- **NO em dashes or en dashes anywhere.** They read as AI-written. Use full stops, commas,
  or a colon instead. Applies to captions, bios, website copy, ads, everything.
- **No fancy Unicode fonts** (e.g. bold-styled letters). Screen readers read them as noise
  and Instagram search does not index them as words.
- **Keep captions under ~30 words**, main message inside the first 125 characters
  (Socialinsider, 9.1M posts: sub-30-word captions get the highest engagement; 90+ words
  fall below 0.3%). Before/after posts need the least copy of all.
- **Keywords beat hashtags for reach now** (Mosseri, restated 2026). Put "Adelaide
  mechanic" etc. in the caption body, not just tags. 3-5 hashtags max. Keywords in
  comments are not indexed well, so they must be in the caption itself.
- **Clickable caption links are NOT available to business accounts** (Meta Verified
  creators only as of Mar 2026), so the bio link stays the funnel.

## Pricing communication policy (owner decision, 2026-08-24)
- **No repair quotes over Instagram, WhatsApp, or any text channel. In person only.**
  Rationale: quoted people were taking the number and disappearing (price shopping);
  Jitty converts in person on trust. Ranges are also out for repairs.
- **Boundary that keeps it honest:** published MENU prices stay quotable and referable
  (service tiers from $149, any future "from $" detailing/paint prices, used-car listing
  prices). Refusing to confirm a price that is on our own website reads as evasive and
  contradicts the "Prices and booking" bio CTA. Repairs and anything condition-dependent:
  in person only. Align this split explicitly with Jitty (he quoted ranges to a brake
  enquiry on 2026-08-23, so the policy is a change for him too).
- **The conversation sequence (never lead with the refusal):** (1) acknowledge + ask one
  real question about the car; (2) one line showing he heard them; (3) the no-text-quote
  line WITH the reason (guessing high scares people, guessing low means changing it
  later); (4) the safety promises that make it feel safe not shady: ten-minute look,
  exact price in hand BEFORE any work, no obligation, no charge to look; (5) close with
  two concrete time slots.
- For complex issues, offer a two-minute phone call instead of typing. Voice converts
  trust faster and ends naturally in "bring it past".
- DM triage stays as agreed 2026-08-24: hot leads answered in-channel and closed with
  times; price/general questions get a saved reply pointing at the site; no free
  diagnosis by text. Meta Business Suite Instant Reply carries the site link so the
  website funnel runs automatically without refusing anyone a conversation.

## Car community play (explored 2026-08-24)
- Long-term two-layer plan: (1) LOCAL "AutoDrive Car Care Club" membership (priority
  booking, annual inspection, member detailing rate, first look at used cars, WhatsApp
  group; seed = the 150+ repeat clients; Wilson Auto precedent: recurring members
  stabilise revenue). (2) LATER a Skool-style digital community for new migrants and
  students, Malayalam-first ("First Car Australia" working name): buying a used car in
  AU without getting burned, rego/insurance/roadworthy, maintenance 101, weekly
  ask-Jitty call. Converts the global Malayalam reach (unbookable for the shop) into a
  geography-free product. CarEdge proves the consumer-protection angle; Skool detailing
  and car-flip academies prove the trade angles. Honest math: paid communities convert
  a fraction of a percent of an engaged audience (CBum: 3.1k members off tens of
  millions of followers), so audience first, launch later. Bridge: free
  "Adelaide Malayali Car Owners" WhatsApp/FB group to validate demand and farm content.
- **LIVE TEST handed to build chat (2026-08-24): Car Club waitlist section** on the
  site. Homepage band (general club pitch) + used-cars variant ("see cars before they
  are listed"). Capture = prefilled WhatsApp message with data-ctx="direct" (no form,
  no backend; GA whatsapp_click link_url containing "Car Club waitlist" is the KPI,
  wording differs per placement to split angles). Expectation: 2 to 5 taps/week is a
  real signal at current traffic; zero for a fortnight = change the value prop and
  retest. Analytics chat owns the weekly count.

## Decision log (append newest first)
- 2026-08-23 — Bio CTA set to "Prices and booking"; quote-close playbook agreed; language
  packaging = subtitles-first (see above). Pending: "from $" prices for detailing/paint.
- 2026-08-23 — Influencer research completed (20 creators, 4 research sweeps). Verdict:
  keep the current funnel, add the 7 upgrades in the dossier's Part 4. Open questions for
  Stalin: is Jitty willing to be on camera/talk; current schedule fullness; who films.
- 2026-08-23 — Strategy chat established; this file created.
