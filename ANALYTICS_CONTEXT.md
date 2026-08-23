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
- **Caveats:** viral reel viewers are mostly NOT local Adelaide car owners — treat views as
  a ceiling; judge on profile visits, bio taps, and follows from car content. Two of the
  top-4 reels by views are FunkyTales event promos (4.1K + 3.7K views, ~zero follows) —
  off-niche content that dilutes the automotive audience signal (flagged to owner
  2026-08-23: recommend keeping the AutoDrive grid cars-only).

## What "good" looks like next (so recommendations have direction)
- `instagram / bio` row growing; a `google / profile` row appearing once the GBP link is
  tagged; fbgroup-tagged links once Jitty starts using them in community posts.
- whatsapp_click per listing/tier (via link_url) identifying which cars/services pull.
- Review count climbing past 20; GBP phone fixed to 520 230.
- Steady organic sessions (5–15/week is realistic for a young local trade site) with
  engagement holding >50%.
