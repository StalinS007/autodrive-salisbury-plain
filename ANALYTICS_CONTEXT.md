# AutoDrive — Analytics Chat Context (for the dedicated analysis session)

**Who this file is for:** a Claude Code session reserved ONLY for interpreting the
performance of autodrivesalisburyplain.com.au — mainly from Google Analytics (GA4)
screenshots the owner pastes in. Written 2026-07-25, last updated 2026-08-23 (added the
Instagram baseline); update the baseline sections as new data supersedes them.

## Your role in this chat
- You are the **marketing/web analyst** for AutoDrive Salisbury Plain. The owner (Stalin,
  who manages the site for the mechanic, Jitty) will paste GA4 screenshots and ask what
  they mean.
- **Interpret at three levels, every time:** (1) *describe* what the numbers say,
  (2) *diagnose* why — connecting to the site's history and channels below, and
  (3) *recommend* — one or two concrete next actions, prioritised. End with a plain-English
  TL;DR Stalin could relay to Jitty.
- **Be honest about small samples.** Tracking is young and volumes are low double digits;
  never dress noise up as a trend. Say "too early to tell" when it is.
- **This chat does NOT edit the website.** Site changes happen in the other sessions
  (Mac + a build-focused cloud chat) on the `reviews-preview` branch. If analysis produces
  a change worth making (e.g. "kill the booking modal"), state it as a recommendation for
  the build chat — do not modify site files here. (Exception: you may update THIS file's
  baseline/log sections — pull latest first per CLAUDE.md's multi-session rules.)

## The property (where the data lives)
- GA4 property **"AutoDrive Salisbury Plain", ID 545462187**, under account "AutoDrive"
  (401065634). Measurement ID **G-5QT9NZ63W1**, web stream "AutoDrive Website".
- A **duplicate** property existed (545457420, account "Autodrive " 401073181) with no/edge
  data — flagged for deletion. If a screenshot shows near-zero data, FIRST check it isn't
  from the duplicate.
- **Tracking went live 14 July 2026, ~7pm.** There is NO data before then — the site
  itself launched ~11 June 2026. Any chart flatline before 14 Jul is "no tag", not "no
  visitors". Never compare against pre-14-Jul periods.

## Event dictionary (what's custom vs automatic)
Custom (defined in `assets/js/main.js` — these are the business metrics):
- **whatsapp_click** — tap on any wa.me link. THE primary lead signal. `link_url` contains
  the prefilled message, which **names the specific car or service tier** — always segment
  by link_url to see WHICH car/tier drove the click.
- **phone_click** (tel: taps), **email_click**, **book_click** (links to contact.html#book),
  **generate_lead** (booking form submit), **booking_date_picked** (chose a date in the
  site's WhatsApp date-ask modal; `date_text` param).
Automatic GA4: page_view, session_start, first_visit, user_engagement, scroll (90%), click
(outbound). Sessions ≈ visits; Total users ≈ people.

## Known caveats that WILL skew screenshots
1. **Owner/dev testing inflates early numbers.** Much of the first week's whatsapp_click
   volume (85 by 20 Jul) was Stalin/Claude testing buttons. Treat early absolute counts
   as ceilings, not truths. Jitty reports **zero real WhatsApp bookings** as of ~25 Jul.
2. **The date-ask modal adds friction:** every wa.me tap opens a qualifier/calendar modal
   before WhatsApp. 85 whatsapp_clicks vs only 14 booking_date_picked suggests heavy
   drop-off inside the modal. (Candidate fix lives with the build chat.)
3. **whatsapp_click fires on TAP, not on a message actually being sent.** Clicks ≠
   conversations. The gap is normal but keep it in mind when Jitty says "nobody messaged".
4. **Phone history:** calls used +61 432 247 691 until **22 Jul 2026**, when EVERYTHING
   (calls + WhatsApp + schema) was unified on **+61 432 520 230**. phone_click link_urls
   before/after that date differ accordingly. The Google Business Profile still shows the
   old 247 691 (fix pending with Jitty).
5. **`(direct)` traffic hides social.** Instagram/FB in-app clicks often log as Direct.
   The Instagram bio link is UTM-tagged (`utm_source=instagram&utm_medium=bio` → shows as
   `instagram / bio`, live since ~21 Jul). GBP and Facebook Page links are tagged since
   ~13 Aug (see dictionary below) — before that date their clicks landed in Direct/referral
   rows, so pre-/post-13-Aug source mixes aren't comparable. Community-group posts remain
   untagged until Jitty starts using the fbgroup link.

## Official UTM link dictionary (the canonical tagged links)
Always use THESE exact links when placing the site URL on an external platform, so each
channel gets its own clean row in Traffic acquisition:
- Instagram bio (LIVE since ~21 Jul): `https://autodrivesalisburyplain.com.au/?utm_source=instagram&utm_medium=bio`
- Google Business Profile website field (LIVE since ~13 Aug — GBP access resolved): `https://autodrivesalisburyplain.com.au/?utm_source=google&utm_medium=profile`
- Facebook Page website field (LIVE since ~13 Aug — Page access granted; bio text keeps the plain domain on purpose): `https://autodrivesalisburyplain.com.au/?utm_source=facebook&utm_medium=social`
- Facebook community-group posts (owner plans to start ~week of 18 Aug):
  `https://autodrivesalisburyplain.com.au/?utm_source=fbgroup&utm_medium=post`
  — optionally add `&utm_campaign=<group-or-post>` (e.g. `adelaide-indian-community`,
  `civic-2009`) to split by group/post. Deep links work too, e.g.
  `/used-cars.html?utm_source=fbgroup&utm_medium=post&utm_campaign=civic-2009`.
- WhatsApp/SMS shares by Jitty (OPTIONAL, lowest priority — only useful if Jitty saves it
  as a canned message; makes word-of-mouth forwards visible instead of landing in Direct):
  `https://autodrivesalisburyplain.com.au/?utm_source=whatsapp&utm_medium=share`
Rules: lowercase everything; never tag internal links on the site itself; one source
name per platform (don't invent variants).

## Business reality (interpret against this, not against e-commerce norms)
- Jitty's customers come mainly from **Facebook local community groups** (e.g. Adelaide
  Indian Community) and **word-of-mouth referrals + direct calls**. The website's role is
  **closer/validator** (people check him out after a referral or group post), not primary
  lead source. Judge it on: engagement quality, which-car/which-tier interest, and whether
  tagged channels grow — not on raw booking volume.
- Trust assets: **5.0 stars from 20 Google reviews**, 150+ repeat local clients.
- Site conversion paths: WhatsApp buttons everywhere (per-car and per-tier prefilled
  messages), tel: links, an SMS-based booking form on contact.html.
- Prices on site: service tiers **Basic $149 / Standard $229 (pushed as Most Popular) /
  Premium $329** (since 22 Jul; before that a single "$129/$149 Basic" offer — don't be
  surprised by pre-22-Jul screenshots differing). Used-car listings carry real prices
  (e.g. 2009 Honda Civic $9,600; 2021 VW Polo $17,400).

## Week-one baseline (14–20 Jul 2026) — compare future periods against this
- 33 users / 61 sessions / 219 page_views; engagement rate 62.3%; avg engagement 1m14s.
- Events: whatsapp_click 85 (13 users), book_click 32, booking_date_picked 14,
  phone_click 8, scroll 26. (Testing-inflated — see caveat 1.)
- Sources: Direct 35 sessions (57%), google/organic 15 (25%), ig/social 10 (16%, 90%
  engagement — best quality), m.facebook.com/referral 1. Launch spike peaked 17 Jul
  (~19 sessions), settling to low single digits/day after.

## Instagram baseline (first Professional Dashboard drop, screenshots 2026-08-23)
90-day window ~25 May–21 Aug 2026 unless noted. Compare future IG screenshots against this.
- **Views 54,765** (Reels 44K / Posts 7.8K / Stories 3.1K / Live 0) · 21,865 unique viewers ·
  **79.8% of views from NON-followers** (discovery-driven) · interactions 1,020 (Reels 847).
- **Followers 469**, +100.4% in 60 days (doubled since ~22 Jun); net +238 over the window.
- **One reel dominates: "Engine Warning Light ON" dashboard reel — 19K views (~35% of all
  views) and +187 follows (~79% of ALL net follower growth).** Direct validation of the
  problem-first Reel Playbook thesis. Other top follow-drivers are also car reels (crashed
  BMW +10, Civic engine bay +10, Pajero Super Select +8).
- **Funnel:** 21,865 viewers → 1,743 profile visits (8.0%) → **180 bio-link taps** (10.3% of
  visits) → GA `instagram / bio` ≈ 160 sessions — IG and GA agree (taps ≈ sessions, small
  normal gap). 0 business-address taps.
- Views chart: flat until early Jul, first spike mid-Jul, peak ~6.5K/day late Jul (the
  warning-light reel), then ~3K spikes on post days through Aug. Follower spike ~23 Jul.
- **Warning-light reel per-reel insights (screenshot 2026-08-23):** ~1:15 long, before/after
  arc (overlay "Engine Warning Light ON" → "…OFF", Nissan dashboard), AutoDrive logo top,
  cross-posted to Facebook. 157 likes (153 IG / only 4 FB), 12 comments, **95 shares,
  51 saves** (share-heavy = utility content people forward). Actions after viewing:
  **868 profile visits (≈50% of the account's 90-day total) and 124 bio-link clicks
  (≈69% of ALL bio taps)** → most of GA's `instagram / bio` sessions trace to this ONE reel.
  +187 follows ≈1% of its 19K views. FB cross-posts add ~nothing — IG is the discovery engine.
- **Geo caveat (owner-reported 2026-08-23): the warning-light reel's traction skewed UK,
  not Adelaide** — likely the "Salisbury Plain" name collision (the famous UK site) plus
  location-agnostic content. Fix pushed to owner: geotag Salisbury SA/Adelaide on every
  post, say "Adelaide" in the first 3s (overlay/audio), local caption + 3–5 local hashtags,
  seed via local FB groups in the first hour. Expect UK-skewed follower counts/reach in
  screenshots until this takes effect — discount raw follower totals accordingly.
- **Caveats:** viral reel viewers are mostly NOT local Adelaide car owners — treat views as
  a ceiling; judge on profile visits, bio taps, and follows from car content. Two of the
  top-4 reels by views are FunkyTales event promos (4.1K + 3.7K views, ~zero follows) —
  off-niche content that dilutes the automotive audience signal (flagged to owner
  2026-08-23: recommend keeping the AutoDrive grid cars-only).

## GA4 full-period baseline (14 Jul – 24 Aug 2026, pulled 2026-08-24 via owner's browser)
Supersedes the week-one numbers below for period-level comparisons.
- **478 sessions / 348 users / 54.8% engagement.** Sources: instagram/bio 176 (36.8%,
  61.9% eng.) · direct 155 (41.3% eng.) · google/organic 87 (63.2% eng.) · ig/social 24
  (IG's own auto-tagging — stories/app links; counts as Instagram, so IG combined ≈ 200
  = 42%) · google/profile 8 (GBP link working) · facebook referrals 12 untagged ·
  chatgpt.com/ai-assistant 4.
- **Events:** whatsapp_click 241 (57 users) · booking_date_picked 42 · book_click 36
  (6 users — mostly repeat clicks, treat as noisy) · phone_click 22 · vehicle_info_submitted 9
  · generate_lead 5. whatsapp_click by country: **Australia 156**, India 46, UK 22, Sri Lanka 17.
- **link_url split of whatsapp_click:** generic booking 96 + 84 · used-cars generic 23 ·
  Civic 7 · Corolla 1 · tiers: Standard 7 / Basic 6 / Premium 3 · old $129 offer 8 (pre-22-Jul).
- **Top traffic days — all reel-led:** 24 Jul 39 (bio 34) · 28 Jul 31 · 23 Jul 28 (bio 23) ·
  29 Jul 26 · 7 Aug 20.
- **Cities:** Adelaide 96 users (#1) · London 25 · Melbourne 18 · Kerala cluster (see caveat) ·
  Council Bluffs 22 + other US datacenter cities ≈ bots/crawlers, 0% engagement — discount.
- **Pages:** / 543 views · /used-cars 120 (2m03s avg — deepest engagement) · /services 119 ·
  /contact 97 · /detailings 38.

### New caveats from this pull (2026-08-24)
6. **India + Sri Lanka traffic = the owners travelling (owner-confirmed). EXCLUDE from all
   analysis** — that's 63 of 241 whatsapp_clicks and the Kerala city cluster. Genuine
   whatsapp_clicks ≈ 178 (156 AU + 22 UK).
7. **US datacenter users are bots** (Council Bluffs 22, Ashburn, Prineville, San Jose —
   0% engagement; Council Bluffs is a Meta datacenter, likely FB link-preview crawlers).
   ~13% of "users" are non-human; prefer engaged sessions over raw users.
8. **Verified non-issues from the 2026-08-24 browser pull:** the 12 tel:+61432247691
   clicks predate the 22 Jul number change (grep confirms no 247691 in any HTML; only an
   inert fallback at `assets/js/main.js:332` — build chat may delete it). GA's duplicate
   paths (/used-cars vs /used-cars.html) are a reporting artifact — canonicals exist on
   every page. book_click (36 events / 6 users) is repeat-click noise, not a tracking bug.
9. **No key events configured in GA4** — owner action: Admin → Events → mark
   `whatsapp_click`, `generate_lead`, `vehicle_info_submitted` as key events.
10. **facebook/social + fbgroup/post rows: zero.** fbgroup was never deployed (Jitty
   hasn't started group posting); for facebook/social, owner should re-check the FB Page
   website field still carries the full UTM URL. FB traffic (12 sessions) arrives as
   untagged referrals meanwhile.

## What "good" looks like next (so recommendations have direction)
- `instagram / bio` row growing; a `google / profile` row appearing once the GBP link is
  tagged; fbgroup-tagged links once Jitty starts using them in community posts.
- whatsapp_click per listing/tier (via link_url) identifying which cars/services pull.
- Review count climbing past 20; GBP phone fixed to 520 230.
- Steady organic sessions (5–15/week is realistic for a young local trade site) with
  engagement holding >50%.
