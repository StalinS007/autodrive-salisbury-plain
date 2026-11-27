#!/bin/bash
# AutoDrive — car inbox processor (runs on the Mac).
#
# Watches  ~/Library/Mobile Documents/com~apple~CloudDocs/AutoDrive/Cars/_inbox/<any folder>/
# For each car folder that has finished syncing from iCloud, it:
#   1. asks Claude (headless) to read Jitty's message + photos and write car.json  (only if car.json is absent)
#   2. resizes the photos for the web into <repo>/images/<slug>/<slug>-NN.jpg
#   3. inserts the listing into used-cars.html
#   4. renders the two Instagram story frames + links.txt
#   5. commits + pushes to reviews-preview (NEVER main — Stalin approves the preview, then merges)
#   6. moves the folder to Cars/<slug>/ with photos/, web/, stories/, car.json inside
#   7. pops a macOS notification
# Safe to run repeatedly: folders already processed, still syncing, or waiting on NEEDS-INFO are skipped.
#
# Config via env (defaults shown):
#   AUTODRIVE_REPO   ~/autodrive-salisbury-plain
#   AUTODRIVE_CARS   "$HOME/Library/Mobile Documents/com~apple~CloudDocs/AutoDrive/Cars"
#   QUIET_SECONDS    90     — a folder must be untouched this long before we trust it's fully synced
#   DRY_RUN          0      — 1 = do everything except git push
set -euo pipefail

REPO="${AUTODRIVE_REPO:-$HOME/autodrive-salisbury-plain}"
CARS="${AUTODRIVE_CARS:-$HOME/Library/Mobile Documents/com~apple~CloudDocs/AutoDrive/Cars}"
INBOX="$CARS/_inbox"
QUIET="${QUIET_SECONDS:-90}"
DRY="${DRY_RUN:-0}"
LOG="$CARS/_log.txt"
LOCK="/tmp/autodrive-cars-inbox.lock"   # a directory: mkdir is atomic and macOS has no flock(1)

log() { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" | tee -a "$LOG" >&2; }
notify() { osascript -e "display notification \"$2\" with title \"AutoDrive cars\" subtitle \"$1\"" 2>/dev/null || true; }
need() { command -v "$1" >/dev/null 2>&1 || { log "missing tool: $1"; exit 1; }; }

mkdir -p "$INBOX" "$CARS/_done"
if ! mkdir "$LOCK" 2>/dev/null; then
  # Stale lock (crash / reboot)? Older than 30 min → take it over.
  if [[ $(( $(date +%s) - $(stat -f '%m' "$LOCK") )) -gt 1800 ]]; then rmdir "$LOCK" && mkdir "$LOCK"; else log "another run is in progress"; exit 0; fi
fi
trap 'rmdir "$LOCK" 2>/dev/null' EXIT
need node; need sips; need git; need claude

# ---- git: always start from the latest reviews-preview (two sessions edit this repo) ----
cd "$REPO"
git fetch -q origin reviews-preview
git checkout -q reviews-preview 2>/dev/null || git checkout -q -b reviews-preview origin/reviews-preview
git reset -q --hard origin/reviews-preview

shopt -s nullglob
for dir in "$INBOX"/*/; do
  dir="${dir%/}"; name="$(basename "$dir")"
  [[ "$name" == _* ]] && continue
  [[ -f "$dir/NEEDS-INFO.txt" ]] && { log "skip $name — waiting on NEEDS-INFO.txt"; continue; }

  # Still syncing? iCloud leaves .icloud placeholders until a file has downloaded, and photos from
  # the phone land one at a time — wait until nothing has changed for $QUIET seconds.
  if ls "$dir"/.*.icloud >/dev/null 2>&1; then log "skip $name — still downloading from iCloud"; continue; fi
  newest=$(find "$dir" -type f -not -name '.*' -exec stat -f '%m' {} + 2>/dev/null | sort -n | tail -1 || echo 0)
  age=$(( $(date +%s) - ${newest:-0} ))
  (( age < QUIET )) && { log "skip $name — last change ${age}s ago, waiting for ${QUIET}s of quiet"; continue; }

  log "processing $name"

  # ---- 1. car.json (Claude reads the message + photos) ----
  if [[ ! -f "$dir/car.json" ]]; then
    ( cd "$dir" && claude -p "$(cat "$REPO/tools/cars/extract-prompt.md")

Repo for the slug check: $REPO/used-cars.html
Schema: $REPO/tools/cars/car.schema.json" --allowedTools "Read,Write,Glob,Grep" >/dev/null 2>>"$LOG" ) || { log "claude failed on $name"; notify "$name" "Claude couldn't read the details — see _log.txt"; continue; }
    [[ -f "$dir/NEEDS-INFO.txt" ]] && { log "$name needs info: $(tr '\n' ' ' < "$dir/NEEDS-INFO.txt")"; notify "$name" "Needs info from Jitty — open NEEDS-INFO.txt"; continue; }
    [[ -f "$dir/car.json" ]] || { log "$name — no car.json produced"; notify "$name" "No car.json produced — see _log.txt"; continue; }
  fi
  slug=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$dir/car.json','utf8')).slug)")
  [[ -n "$slug" ]] || { log "$name — car.json has no slug"; continue; }

  # ---- 2. web photos: sips → images/<slug>/<slug>-NN.jpg, hero first, long edge 1600px, q80 ----
  node tools/cars/make-listing.mjs "$dir/car.json" >/dev/null   # validates before we touch anything
  webdir="$REPO/images/$slug"; mkdir -p "$webdir"
  order=$(node -e "
    const c=JSON.parse(require('fs').readFileSync('$dir/car.json','utf8'));
    const p=[...c.photos]; const h=p.findIndex(x=>x.role==='hero'); if(h>0) p.unshift(...p.splice(h,1));
    console.log(p.map(x=>x.file).join('\n'))")
  i=0
  while IFS= read -r f; do
    i=$((i+1)); n=$(printf '%02d' "$i")
    sips -s format jpeg -s formatOptions 80 -Z 1600 "$dir/$f" --out "$webdir/$slug-$n.jpg" >/dev/null
  done <<< "$order"
  log "$name — $i photos → images/$slug/"

  # ---- 3. listing ----
  node tools/cars/make-listing.mjs "$dir/car.json" --insert | tee -a "$LOG"

  # ---- 4. stories ----
  node tools/cars/stories/render.mjs "$dir/car.json" --photos "$dir" --out "$dir/stories" | tee -a "$LOG"

  # ---- 5. commit + push to reviews-preview ----
  git add "images/$slug" used-cars.html
  title=$(node -e "const c=JSON.parse(require('fs').readFileSync('$dir/car.json','utf8'));console.log(c.year+' '+c.make+' '+c.model+' — \$'+c.price.toLocaleString('en-AU'))")
  git commit -q -m "Used cars: add $title

Listing + $i photos generated by tools/cars from Jitty's WhatsApp details.
Stories rendered to iCloud → Cars/$slug/stories/." || { log "nothing to commit for $name"; }
  if [[ "$DRY" == "1" ]]; then log "DRY_RUN — not pushing"; else git push -q origin reviews-preview && log "pushed to reviews-preview"; fi

  # ---- 6. tidy the folder: Cars/<slug>/{photos,web,stories,car.json} ----
  dest="$CARS/$slug"; mkdir -p "$dest/photos"
  find "$dir" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.heic' \) -exec mv {} "$dest/photos/" \;
  mv "$dir/stories" "$dest/stories"; cp -R "$webdir" "$dest/web"
  mv "$dir/car.json" "$dest/car.json"; mv "$dir"/*.txt "$dir"/*.md "$dest/" 2>/dev/null || true
  rmdir "$dir" 2>/dev/null || mv "$dir" "$CARS/_done/$name-$(date +%Y%m%d)"
  log "$name → Cars/$slug/ (listing on preview, stories ready)"
  notify "$title" "On preview. Stories + links in Cars/$slug/stories"
done
