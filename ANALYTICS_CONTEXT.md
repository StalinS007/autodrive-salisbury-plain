# AutoDrive — Analytics Chat Context (for the dedicated analysis session)

**Who this file is for:** a Claude Code session reserved ONLY for interpreting the
performance of autodrivesalisburyplain.com.au — mainly from Google Analytics (GA4)
screenshots the owner pastes in. Written 2026-07-25; update the baseline section as new
data supersedes it.

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

## What "good" looks like next (so recommendations have direction)
- `instagram / bio` row growing; a `google / profile` row appearing once the GBP link is
  tagged; fbgroup-tagged links once Jitty starts using them in community posts.
- whatsapp_click per listing/tier (via link_url) identifying which cars/services pull.
- Review count climbing past 20; GBP phone fixed to 520 230.
- Steady organic sessions (5–15/week is realistic for a young local trade site) with
  engagement holding >50%.

## Evidence run 2026-09-11 (for the 12 Sep pitch) — numbers, not images

Pivot date (owner): the week of **6 Jul 2026** (video direction given to Jitty). Equal windows:
**Before = 30 Apr → 5 Jul**, **After = 6 Jul → 11 Sep** (67 days each). Screenshots live in
`~/Desktop/AutoDrive-Evidence/` on the Mac.

### Viral reel — "Best 7-seater cars in Australia?" (posted ~8 Sep 2026, crossposted IG + FB)
Source: Instagram app → Professional dashboard → the reel → **Reel insights** (Overview /
Engagement / Audience tabs), captured 11 Sep 23:49 (3 days after posting).
- **Views 125,477** (Instagram 69,044 + Facebook 56,433) · **Viewers 57,686** · avg watch time **28 s**
  on a 1:25 reel · views still climbing on 11 Sep (IG curve: ~55K by 9 Sep, ~65K by 10 Sep, 69K by 11 Sep;
  "your typical reel" baseline is flat at ~0 — i.e. this is >50× a normal post).
- **Actions after viewing: 1.9K profile visits · 643 follows · 43 bio-link clicks.**
- Interactions: likes 780 (IG 553 / FB 227) · comments 77 (49 / 28) · shares **513** · saves 182 · reposts 11.
- Instagram's own benchmarks ("what affects your views"): skip rate 32.1% (**lower** than typical), share
  rate 0.9%, like rate 1.0%, save rate 0.3%, comment rate 0.1% (all **higher** than typical).
- Audience: **99% non-followers** (1% followers) → pure discovery. Sources of views: Reels tab 64.0%,
  Feed 25.3%, Explore 8.7%, Profile 1.1%, Stories 0.2%. Countries: Australia 51.8%, UK 11.2%,
  India 8.6%, NZ 8.1%, Canada 5.1% (half the audience is local-ish; the rest is the diaspora effect).
- Retention curve: ~50% still watching at ~10 s, ~15% at the end.
- Pitch framing: 643 follows in 3 days vs 485 followers total on 7 Sep (profile screenshot) → the one reel
  roughly **doubled the account's following**; 43 bio-link clicks from a single post is more than the
  whole `instagram / bio` GA row produced in a typical week.

### Google Business Profile (captured 12 Sep 2026, 00:05, via Google Search → "Your business on Google" manager panel)
Where it lives: signed in as the manager account, google.com → search "Autodrive Salisbury Plain" → the
"Your business on Google" card at the top of the results → **Performance** (opens as an overlay; Time
period defaults to the last 6 months, Apr 2026–Sept 2026; tabs Overview / Calls / Bookings / Directions /
Website clicks).
- **459 Business Profile interactions, Apr–Sep 2026** (6-month total), exact monthly values read from
  the chart tooltips (Apr derived from the total):

  | GBP metric (Apr–11 Sep 2026) | Apr | May | Jun | **Jul** | **Aug** | Sep 1–11 | Total |
  |---|---|---|---|---|---|---|---|
  | Profile interactions | 63 | 87 | 84 | 91 | **121** | 13 | 459 |
  | Calls from the profile | 5 | 5 | 3 | **16** | **14** | 1 | 44 |
  | Website clicks from the profile | 12 | 20 | 13 | **37** | 24 | 6 | 112 |
  | Direction requests | 46 | 62 | 68 | 38 | **83** | 6 | 303 |
  | Bookings via the profile button | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

  **Before vs after the 6 Jul pivot (monthly averages, Apr–Jun vs Jul–Aug):** interactions 78 → 106/mo
  (+36%); **calls 4.3 → 15/mo (3.5×)**; website clicks 15 → 30.5/mo (2×); directions 59 → 61/mo (flat —
  people already knew where the shop was; the pivot changed *contact*, not *navigation*). September's
  11 days are on pace for a quieter month on GBP while the viral reel pulls attention to Instagram.
- Google Maps listing shows **3,437 views** on the profile (lifetime counter on the Maps card).
- **1,115 people saw the profile in search results last month** (Aug 2026; from the "View your 2026
  record" card).
- **Reviews: 26 × 5.0★** (was 20 × 5.0 in late July → +6 in ~7 weeks; "5 new reviews" badge showing).
- Phone on the profile is now **0432 520 230** (the 247 691 fix landed). Stale 247 691 / 0433 247 691
  still appear in the Instagram bio snippet Google indexed and in a 5-month-old Indians In Adelaide group
  post — off-site clean-up items, not GBP.
- Website button on the card carries the tagged link `?utm_source=google&utm_medium=profile` (confirmed
  in the page source).
- GBP posts cadence ("Latest from the owner"): 17, 20, 22, 24, 27 Jul; 5, 11, 13, 17 Aug; and one 3 days
  ago (used-cars post, ~9 Sep) — **10 posts since 17 Jul**, none visible before that. Post-pivot behaviour.
- Google's own "profile strength" card is not full: interior photo, products, offer still suggested.
