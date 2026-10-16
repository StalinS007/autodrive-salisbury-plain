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

## Promo products via Instagram (explored 2026-10-10)
- Radar detectors (e.g. Cobra RAD 390) and laser jammers: ILLEGAL in SA and every state
  except WA, including possession. Never sell or promote. Waze / Google Maps camera alerts
  are the legal alternative to mention.
- Legal shortlist: dash cams (hardwired install upsell), portable jump starters, cordless
  tyre inflators, OBD2 scanners (lead to diagnostic bookings), TPMS sensors, reversing
  cameras and parking sensors (sold with fitting), commercially made fixed phone mounts,
  branded car care/detailing kits, emergency roadside kits, wiper blades and cabin filters.
- Priority = items that bring the car into the bay (anything with fitting, plus OBD2 ->
  "bring it in for a proper diagnosis"). Jump starters / inflators work best as
  "what to keep in your boot" reel content rather than stock.
- Avoid or be careful: LED globe conversions in halogen housings (generally not ADR
  compliant, "off-road use only"; promote only complete compliant assemblies); DPF deletes
  and emissions-defeating tunes (illegal tampering; AutoDrive advertises diesel/DPF/ECU work,
  so offer cleaning and repair only); window tint beyond SA limits (unverified source says
  no windscreen tint, 35% front sides, 20% behind driver, max 10% reflectance; confirm
  before advertising tint packages); number plate covers/tints; child seats or safety items
  without Australian Standards marking; lithium jump starters and chargers only from a
  reputable Australian supplier meeting electrical safety standards (fire risk + liability).
- Promo idea (proposed 2026-10-10, not launched): free jump starter with a major service.
  Bundling beats selling gadgets alone and keeps service prices intact. Before launch:
  name the qualifying tier (e.g. Logbook Servicing $329), cap it (first N bookings or one
  month) to protect margin, and frame it for the pre-Christmas road-trip season rather
  than cold-start, since it is spring.

## High-ticket offer: done-for-you car acquisition (PROPOSED 2026-10-15, not launched)
- Owner idea: AutoDrive finds, inspects, negotiates and hands over a used car for the buyer.
- Edge: a mechanic-led buyer's agent (inspection + negotiation + service/detail before
  handover), which brokers can't match. Productises the PPI idea and fits the used-car
  buying reels and the new-migrant/student "first car" audience.
- Licensing: CLEARED (owner, 2026-10-16): Jitty holds an authorised dealer licence.
- Two offers: (1) STUDENTS, first car in Australia, lower budget, reliability and honest
  guidance; (2) FAMILIES, bigger budget, safety and space, time-poor. Funnel: Instagram
  form (segment, budget, payment method, timeframe, availability) -> Stalin qualifies and
  closes on a call (no deposit, see NO SET FEE below) -> booked appointment with
  Jitty, who only asks car / timeframe / expectations while Stalin leads. Finance: refer
  to a licensed broker; AutoDrive does not assess credit itself.
- Minimum budget $7k drive-away (no cheap "shit boxes"). Form (minimal friction, mostly
  one-tap): Student/Family; full name; mobile; budget ($7-10k / $10-20k / $20-30k / $30k+ /
  Under $7k, label says "our cars start from $7k"); main use; when needed (incl. "just
  looking"); what matters most. UPDATED 2026-10-16 (owner): after the last question,
  qualified people are prompted to book the eligibility call straight into Stalin's
  availability ("Book your eligibility call"). Only shown if budget $7k+, funds = cash ready
  or finance approved, timing = Yes; everyone else gets their message instead. Stalin
  WhatsApps after booking to confirm. Booking tool not chosen yet; suggestion: Google
  Calendar appointment schedule (or Calendly free) linked from a form tool with branching
  (e.g. Tally); 15 min slots, next 7 days only, 2h min notice, max ~4 a day, mobile number
  required, email reminder on. Under $7k and "just looking" get a polite WhatsApp, no call. Payment
  method (cash ready / finance approved only) is the first thing confirmed on the call.
- DRAFT OFFER (2026-10-16, Hormozi $100M Offers structure): sell the transformation,
  "keys in your hand within 30 to 60 days, no stress, nothing to figure out". Two versions
  of one done-for-you programme (timeframe 30-60 days, owner 2026-10-16; name and guarantee
  use the outer 60) (Students / Families). Value stack: brief with Jitty,
  shortlist in 7 days, mechanic inspection + PPSR check on every shortlisted car,
  negotiation, paperwork, full service + detail before handover, 30-day check-up.
  Conditional guarantee (keys within 60 days or programme fee back, if the client responds
  to shortlists within 48h and the brief fits the budget). Real scarcity: 5 clients/month.
  SUPERSEDED (owner, 2026-10-16): no set fee or deposit; Jitty discusses the fee with the
  client directly. Stalin only confirms the budget covers everything.
  "Just looking" removed from the form: timing question is now a yes/no gate
  ("I'm looking to buy within the next couple of months").
  Names: "First Car in 60 Days Programme" / "Family Car Sorted in 60 Days Programme".
- ROLES (owner, 2026-10-16): Stalin qualifies on the call (budget covers everything) and
  books the kickoff; Jitty receives a SOLD client and runs a ~20 min kickoff, not a sales meeting: welcome,
  confirm brief, his model advice, set expectations (7-day shortlist, 60-day keys, updates,
  48h reply rule), next step. Kickoff booked within 48-72h of the call. Stalin hands Jitty a
  one-page client brief: name, mobile, segment, budget + payment method, main use,
  must-haves/deal-breakers, liked/unwanted models, timeframe, main worry in
  their words, anything promised on the call.
- Delivery (owner, 2026-10-16): included in the package, cost built into the price, and
  car + delivery must fit the client's stated budget. Word it "delivery included", never
  "free" (ACL: don't call something free if its cost is recovered in the price).
- Eligibility framing: an application, not a booking. Form title "See if you qualify for our
  done-for-you car programme", button "Check my eligibility"; Stalin's call is an
  "eligibility call" ("we only take a handful of clients each month, this call is to see if
  we're the right fit"). Scarcity: ready buyers only, 5 clients a month.
- Location (owner, 2026-10-16): Australia only. Form question after mobile: "Where are you
  based?" Adelaide / Elsewhere in Australia / Outside Australia.
  Outside Australia = form ends: "Sorry, we can only help buyers who are based in
  Australia." Elsewhere in Australia = still qualifies, shown: "Good news, we can deliver
  to you anywhere in Australia. Interstate delivery comes with a few extra things to
  consider, and we'll go through them on your call." Call covers: transport time and cost
  (car + delivery must fit budget), rego transfer and roadworthy rules in their state,
  inspection shown by video. Depends on Jitty confirming Australia-wide delivery
  (deal-breaker question).
  Form order UPDATED (owner, 2026-10-16): first page asks "Are you based in Australia?" (No =
  end), then Adelaide / elsewhere in Australia, then Student/Family; name; mobile; budget;
  (old order: 1 Student/Family; 2 name; 3 mobile; 4 location; 5 budget; 6 funds
  within 2 weeks; 7 main use; 8 buying in next couple of months (owner to decide whether to
  drop, overlaps 6); 9 what matters most; then booking for qualified only.
- Financial qualification (owner, 2026-10-16): client must have funds ready to buy within
  2 weeks. Form adds one tap after budget: "Do you have the funds ready to buy within 2
  weeks?" Only TWO client types for now (owner, 2026-10-16, narrowed from three):
  Yes, cash ready / Yes, finance approved (written pre-approval). "Willing to get finance"
  dropped; revisit later, possibly with a broker partner.
  Form options CONFIRMED (owner, 2026-10-16): Yes, cash ready / Yes, finance approved /
  Not yet. "Not yet" ends the form (no call booked) and shows, verbatim: "Please get in
  touch with us when you do have the funds and are ready for a purchase."
  On calls and in DMs, anyone outside those two (no funds now, vague answer) gets
  Message B, verbatim (owner, 2026-10-16): "Please contact us through our website or
  WhatsApp when you have the funds ready for the purchase." Deliberately narrow: no call,
  no deposit/timeframe questions, no prefilled link, no chasing. They come back when ready.
  (Replaces the earlier "how much deposit / time frame" reply.)
  Call confirms: pay within days if found next week; source of funds; full drive-away
  amount; finance = written pre-approval and amount; students = money already in an
  Australian account (overseas transfers break the window); families = partner agrees.
  Default until Jitty decides: no bank statements (friction + privacy duty); call answers
  for cash buyers, pre-approval letter for finance buyers.
- Form channel DECIDED (owner, 2026-10-16): NO Instant Form / no paid lead ad. Priority is a
  second Instagram bio link placed FIRST (above the website link), titled e.g. "Find my
  next car", pointing to the application form. Suggested build: Tally form (free,
  conditional logic, separate ending pages per answer) with the booking page (Google
  Calendar appointment schedule or Calendly) on the qualified ending. Website link stays
  second, unchanged.
- BUILT (2026-10-16, reviews-preview f3c4ace, not live): find-my-car.html application page.
  Bio link: autodrivesalisburyplain.com.au/find-my-car?utm_source=instagram&utm_medium=bio&utm_campaign=car-finder
  Booking: BOOKING_URL empty until Stalin creates his booking page (recommend Calendly free,
  connected to his Google Calendar, so answers prefill); until then qualified people get a
  prefilled WhatsApp. Details in AUTODRIVE_PROJECT_CONTEXT.md 7f.
- (Superseded) Instant Form research: Facts: instant forms only
  run inside a lead ad (paid; one ad covers Facebook + Instagram placements). Organic
  workaround (publish the lead ad as a Facebook Page post, then turn the ad off) is
  Facebook only, not Instagram. Use "Higher intent" type (review screen); name/phone
  prefill from profile. Conditional logic can end the form for Not yet / Outside Australia
  / Under $7k, but people can go back and change answers, so the call stays the real
  filter. No embedded calendar: qualified ending screen button links to Stalin's booking
  page. Requires a privacy policy URL; site has none yet (build chat: add privacy.html).
  Leads land in Meta Business Suite; turn on notifications, contact within 5 min.
- LAUNCH QUESTIONS FOR JITTY (owner, 2026-10-16: launch ASAP, only these three block launch; the rest
  of the checklist below is answered as real client queries come up):
  1 On board: find, inspect, negotiate, prepare and hand over in 30-60 days, $7k+ cars he's
    proud of. 2 Delivery: Australia-wide or Adelaide only (sets the form's location
    answers). 3 Guarantee: OK with "keys in 60 days" promise (client replies within 48h,
    brief fits budget); remedy if missed is his call since there is no set fee to refund.
    (Kickoff times and filming handovers: owner says not important, dropped.)
  Capacity NOT asked (owner, 2026-10-16): scarcity ("limited spots each month") stated on
  the website; keep the claim true (ACL: no false scarcity).
  NO SET FEE (owner, 2026-10-16): no programme fee or deposit set; Jitty discusses his fee
  with the client once they're talking. Funnel only checks the budget covers everything
  (car, delivery, his fee, on-road costs). Budget question label: "Total budget for
  everything".
  Defaults until told otherwise: no proof of funds beyond the call answers; cash ready or
  finance approved only; Jitty runs kickoffs and handovers (confirmed).
- OPEN QUESTIONS FOR JITTY (full checklist, 2026-10-16; * = deal-breaker, ask first):
  Offer: *on board with find/inspect/negotiate/prepare/hand over in 30-60 days; does $7k get
  a car he's proud of (his max age/kms line); makes/models he refuses; CONFIRMED 2026-10-16: he will run client
  appointments and handovers (still to confirm: OK with handovers being filmed for reels,
  with client consent; faceless option for clients who prefer it).
  Reach: *anywhere in Australia or Adelaide only; interstate transport cost, rego + safety
  certificate, or fly in and drive home; local delivery radius and fee.
  Search: sources (auctions/trade-ins/private/dealers); *7-day shortlist + 30-60 day keys
  realistic at every budget; easy vs hard types/budgets; shortlist rounds included before
  "too picky" (guarantee limit); test drives; who sends progress updates and how often.
  Inspection/prep: what the inspection covers, photo report, time per car; PPSR checks and
  cost; fault found = walk away or fix, who pays; full service + detail on every car, who
  details.
  Capacity: *clients/month alongside workshop (5?); hours per client; who searches;
  appointment days/times, workshop or video, Malayalam on request.
  Money: buy into stock vs buyer's agent; how car price is set and whether margin + fee
  ($690 / $1,290) works, GST on fee; who holds the $300 deposit, refund terms, client backs
  out after car secured; payment methods; finance broker partner.
  Warranty/paperwork: statutory dealer warranty; 3 months free rego + optional 12-36 month
  warranty; *comfortable with "keys in 60 days or fee back" (brief fits budget, 48h
  replies); buyer paperwork and transfer.
  Avatars: students' rego/insurance on overseas licence or temporary visa; families'
  trade-ins, valuation, seven-seater availability.
  Funds: proof of funds before kickoff (pre-approval letter / balance screenshot) or is the
  deposit enough; (finance-approved buyers only for now; "willing to get finance" parked); is $300 enough or a larger
  holding deposit once a car is found; client can't pay when car is ready = deposit
  forfeited?; accept students whose money comes from overseas.
  Aftercare/growth: free 30-day check-up capacity; filming handovers + client photos with
  consent; referral reward.
- Pricing benchmark (weak source): Australian car brokers $500 to $1,500 flat or 2 to 5%.
  Going higher needs workshop value in the package (full service + detail + paperwork).
- Rules: fee-only, disclose if recommending AutoDrive's own stock, no undisclosed seller
  kickbacks. Cap clients per month (one-man workshop). Validate by pre-selling to ~3
  founding clients (WhatsApp waitlist angle + one reel) before building anything.

## Decision log (append newest first)
- 2026-08-23 — Bio CTA set to "Prices and booking"; quote-close playbook agreed; language
  packaging = subtitles-first (see above). Pending: "from $" prices for detailing/paint.
- 2026-08-23 — Influencer research completed (20 creators, 4 research sweeps). Verdict:
  keep the current funnel, add the 7 upgrades in the dossier's Part 4. Open questions for
  Stalin: is Jitty willing to be on camera/talk; current schedule fullness; who films.
- 2026-08-23 — Strategy chat established; this file created.
