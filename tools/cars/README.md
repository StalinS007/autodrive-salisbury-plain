# Used cars — from Jitty's WhatsApp to the website and Instagram, automatically

Jitty sends photos and a few words on WhatsApp. One share action later, the car is listed on
the website (on preview), its two Instagram story frames are rendered, the links are written
out, and the photos are filed. Nothing is typed twice.

## What you do (the only manual step — about 20 seconds)

The free WhatsApp Business app has no API and no automation hooks, so the hand-off out of
WhatsApp can't be zero-touch without moving Jitty's number to the Business Platform (which
would kill the normal app). It can be one action, though:

1. In WhatsApp on the iPhone, long-press a photo → **Select** → tick all the car's photos.
2. **Share → Save to Files → iCloud Drive → AutoDrive → Cars → _inbox**, tap the folder icon
   to make a **new folder** (any name — "golf", "new car", whatever), save into it.
3. Screenshot Jitty's message with the details and save that into the same folder.
   (Or type the details into a note called `details.txt`. Either works.)

That's it. Within a couple of minutes the Mac does the rest and sends you a notification.

## What happens automatically (on the Mac)

`process-inbox.sh` runs whenever `_inbox` changes (launchd), and every 10 minutes regardless.
For each car folder that has finished syncing (90 s of quiet, no `.icloud` placeholders):

| Step | Tool | Output |
|---|---|---|
| Read Jitty's message + look at every photo, write `car.json` | `claude -p` with `extract-prompt.md` | `car.json` (or `NEEDS-INFO.txt` if price/km/model is missing) |
| Resize photos for the web, hero first | `sips` | `images/<slug>/<slug>-01.jpg …` in the repo |
| Build the listing — identical markup to the hand-written ones | `make-listing.mjs --insert` | next `CAR N` block in `used-cars.html` |
| Render the two story frames | `stories/render.mjs` → Chrome | `01-hero.png`, `02-collage.png`, `links.txt` |
| Commit + push | git | **`reviews-preview` only** — you check the preview and merge to `main` as usual |
| File everything | mv | `Cars/<slug>/{photos, web, stories, car.json}` |

The only step that uses AI is reading the message and captioning the photos. Everything else
is deterministic, so every car looks exactly the same on the site and on Instagram.

### The folder you end up with

```
AutoDrive/Cars/
  _inbox/            ← you drop here
  _done/             ← anything that couldn't be tidied
  _log.txt           ← what ran, when, and why something was skipped
  golf/
    car.json         ← the record everything was built from
    photos/          ← Jitty's originals
    web/             ← the resized copies that went on the site
    stories/
      01-hero.png    ← Frame 1 — post, add link sticker "Full details"
      02-collage.png ← Frame 2 — post, add link sticker "See more photos"
      links.txt      ← the story link, the FB-groups link, the listing link
```

Post the two PNGs as stories, paste the link from `links.txt` into the link sticker on each,
add both to the **CARS** highlight (hero first).

## Install (once, on the Mac)

```bash
cd ~/autodrive-salisbury-plain && git pull
chmod +x tools/cars/process-inbox.sh
mkdir -p "$HOME/Library/Mobile Documents/com~apple~CloudDocs/AutoDrive/Cars/_inbox"

# launchd job — put your username into the WatchPaths line, then load it
sed "s/REPLACE_WITH_YOUR_USERNAME/$(whoami)/" tools/cars/com.autodrive.cars-inbox.plist \
  > ~/Library/LaunchAgents/com.autodrive.cars-inbox.plist
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.autodrive.cars-inbox.plist
```

Needs: Node (any recent), Google Chrome, `claude` on the PATH (Claude Code CLI, logged in),
and the repo at `~/autodrive-salisbury-plain` on the `reviews-preview` branch. Different
paths? Set `AUTODRIVE_REPO` / `AUTODRIVE_CARS` in the plist's `EnvironmentVariables`.

### Try it without pushing

```bash
DRY_RUN=1 QUIET_SECONDS=0 tools/cars/process-inbox.sh
```

Drop a folder with a few photos and a `details.txt` into `_inbox` first. `DRY_RUN=1` does
everything except `git push`, so you can look at the listing with `git diff` and the PNGs in
`Cars/<slug>/stories/`, then `git reset --hard origin/reviews-preview` to throw it away.

## Day-to-day

- **"Needs info" notification** → open `_inbox/<car>/NEEDS-INFO.txt`, ask Jitty, add the
  answer to `details.txt`, delete `NEEDS-INFO.txt`. It'll pick the folder up next run.
- **Car sold** → `node tools/cars/make-listing.mjs --mark-sold golf`, commit, push. Then pull
  its two frames out of the CARS highlight (or re-render with `"status": "sold"` for a SOLD
  stamp and swap them in).
- **Price changed** → edit `price` in `Cars/golf/car.json`, then
  `node tools/cars/make-listing.mjs --remove golf && node tools/cars/make-listing.mjs Cars/golf/car.json --insert`
  and re-render: `node tools/cars/stories/render.mjs Cars/golf/car.json --photos Cars/golf/photos --out Cars/golf/stories`.
- **Car gone** → `--remove golf`, delete `images/golf/`, commit, push.
- **Something looks wrong** → `_log.txt` says what was skipped and why; `/tmp/autodrive-cars-inbox.err` has anything the scripts printed.

## Files

| File | Job |
|---|---|
| `car.schema.json` | what `car.json` must contain — the contract everything else reads |
| `example/car.json` | the Golf, as a worked example (matches the live listing byte-for-byte) |
| `extract-prompt.md` | the instructions Claude follows to turn the WhatsApp message into `car.json` — never invent, write `NEEDS-INFO.txt` when stuck |
| `make-listing.mjs` | `car.json` → `<article class="car">`; `--insert`, `--mark-sold`, `--remove` |
| `stories/hero.html`, `stories/collage.html` | the two 1080×1920 frames; brand tokens, safe zones, sticker band left clear |
| `stories/render.mjs` | fills the templates and screenshots them with Chrome; writes `links.txt` |
| `process-inbox.sh` | the orchestrator that runs on the Mac |
| `com.autodrive.cars-inbox.plist` | launchd job: watch `_inbox`, run every 10 min |

The site rule still applies: everything lands on **`reviews-preview`**; nothing goes live until
you've looked at the preview and merged to `main`.
