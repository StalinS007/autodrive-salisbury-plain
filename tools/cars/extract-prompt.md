You are turning one used car that Jitty sent Stalin on WhatsApp into `car.json` for the AutoDrive website.

You are inside a folder for ONE car. In it you will find:
- the car's photos (`.jpg` / `.jpeg` / `.png` / `.heic`), and
- Jitty's details as **either** a text file (`details.txt` or any `.txt`/`.md`) **or** one or more screenshots of the WhatsApp message (often named `IMG_…` or `Screenshot…` and showing a chat bubble).

Do this, in order:

1. **Read the details.** Open every `.txt`/`.md` file. Look at every image; the ones that are screenshots of a chat are the details, the rest are car photos. Jitty writes informally ("2017 golf r line wagon 63k 19900 firm ppsr"). Expand abbreviations sensibly ("k" = thousand km, "auto" = Automatic, "VW" = Volkswagen).
2. **Look at every car photo** and give each a 3–8 word `alt` ("front angle", "driver's seat and dash", "odometer showing 62,937 km", "engine bay") and a `role` from: hero, rear34, side, front, dash, rear_seats, odometer, engine, boot, detail. `hero` = the front three-quarter shot — exactly one. If the odometer is readable in a photo, use that exact number for `km`.
3. **Write `car.json`** in this folder, matching `tools/cars/car.schema.json`:
   - `slug`: lowercase model word, e.g. `golf`, `rio`, `tiguan`. If `used-cars.html` already has `id="car-<slug>"`, add the two-digit year: `rio18`.
   - `campaign`: `<slug>-<year>`.
   - `description`: 60–110 words, plain and specific, written from what you can see and what Jitty said. No hype, no superlatives, no promises you can't see. Do NOT include the PPSR / repaired sentences — they are added automatically from the booleans.
   - `trust`: up to three real features worth a tick (CarPlay, reverse camera, low km, one owner…). Only what the message or photos support.
   - `ppsr_listed` / `repaired`: true only if Jitty said so.
   - `price_note`: copy Jitty's wording if he gave one ("firm", "no offers", "drive away"); otherwise `"Drive-away price"`.
   - Anything not stated and not visible: `null`. **Never invent a build date, km, or feature.**
4. **If something essential is missing** (no price, no km, can't tell the model), write `NEEDS-INFO.txt` listing exactly what to ask Jitty, write nothing else, and stop.

Output only the files. No commentary.
