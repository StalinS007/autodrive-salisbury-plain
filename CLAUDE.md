# AutoDrive Salisbury Plain — working agreement

## Start every session by reading the project context
Before doing anything on this site, read **`AUTODRIVE_PROJECT_CONTEXT.md`** (repo root).
It is the single source of truth: business facts, the two-phone split, locked brand tokens
and images, file structure, known issues, and how to preview. Do not re-derive this context
or change anything marked LOCKED without the owner's say-so.

## Keep the context file updated after every change (important)
`AUTODRIVE_PROJECT_CONTEXT.md` must stay current so the next session — on Mac, phone, or web
— starts from the truth. **After every meaningful change, update it in the same commit as the
change.** A change is "meaningful" if it alters any of:

- a **business fact** (phone, email, address, hours, socials, service areas, pricing/offers),
- a **locked token or asset** (colour, font, logo, image mapping),
- **page/URL structure** (adding, removing, renaming pages or sections),
- a **feature** (forms, analytics, reviews, schema, integrations, the services video),
- or a **known-issue / pending-item** in §3/§8 (resolve it or add a new one).

When you update it: edit the relevant section, and if you fixed something listed under
"Known issues" (§3/§8), move it out of that list. Keep it concise — it's a living brief,
not a changelog. Bump the "Last verified" date at the top when you touch it.

Skip the context update only for trivial edits with no lasting significance (typo fixes,
whitespace, comments). When unsure, update it.

## Other conventions
- Plain static HTML/CSS/JS — no build step. Preview with `python3 -m http.server 5050`
  from the repo root (launch config `autodrive-static` in `.claude/launch.json`).
- Commit each change with a clear message; keep asset URLs version-stamped (`?v=`) to avoid
  stale-cache issues.
- `HANDOFF.md`, `HANDOFF_video_background.md`, and `Summary Website.md` are historical and
  superseded — do not treat them as current.
