// /cars/<slug> : one page per car, for links we forward to customers.
//
// Serves cars.html (which lays the car out as a full page when it sees this URL) with the title,
// description and link-preview image swapped for that car. The car is read live from used-cars.html,
// so nothing is typed in here: add, edit or remove a car there and its page follows.
// A car that is hidden on /cars, sold or unknown gets the "no longer listed" page with a 404 status.

const SITE = "https://autodrivesalisburyplain.com.au";

async function asset(env, request, path) {
  let res = await env.ASSETS.fetch(new Request(new URL(path, request.url)));
  const to = res.headers.get("location");
  if (res.status >= 301 && res.status <= 308 && to) {
    res = await env.ASSETS.fetch(new Request(new URL(to, request.url)));
  }
  if (!res.ok) throw new Error(path + " " + res.status);
  return res.text();
}

const strip = (s) => String(s || "").replace(/<svg[\s\S]*?<\/svg>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const attr = (s) => String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Swap the middle of a known tag. Uses a function so "$" in a price is never read as a pattern.
const set = (html, re, val) => html.replace(re, (_, a, b) => a + val + b);

function readCar(stock, page, slug) {
  const hidden = ((page.match(/var HIDE = \[([^\]]*)\]/) || [])[1] || "").match(/[a-z0-9-]+/g) || [];
  if (hidden.indexOf(slug) >= 0) return null;
  const m = stock.match(new RegExp('<article class="car([^"]*)" id="car-' + slug + '"[^>]*>([\\s\\S]*?)</article>'));
  if (!m || /car--ask/.test(m[1])) return null;
  const a = m[2];
  if (/sold/i.test(strip((a.match(/<span class="car__badge[^"]*">([\s\S]*?)<\/span>/) || [])[1]))) return null;
  const h = (a.match(/<h3 class="car__title">([\s\S]*?)<\/h3>/) || [])[1] || "";
  const title = strip(h.replace(/<span>[\s\S]*?<\/span>/, ""));
  if (!title) return null;
  const price = strip((a.match(/<div class="car__price">\s*([^<]*)/) || [])[1]);
  const ul = (a.match(/<ul class="car__specs">([\s\S]*?)<\/ul>/) || [])[1] || "";
  const specs = Array.from(ul.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)).map((x) => strip(x[1])).filter(Boolean);
  let img = (a.match(/<img[^>]+src="([^"]+)"/) || [])[1] || "";
  // /cars-only replacement photos (the PHOTOS block in cars.html)
  const p = page.match(new RegExp('[\\s{,]"?' + slug + '"?\\s*:\\s*\\{\\s*dir:\\s*"([^"]+)"([^}]*)\\}'));
  if (p) {
    const v = (p[2].match(/\bv:\s*(\d+)/) || [])[1];
    img = p[1] + "01.jpg" + (v ? "?v=" + v : "");
  }
  return { title, price, specs, img };
}

export async function onRequest({ request, env, params }) {
  const slug = String(params.slug || "").toLowerCase().replace(/\.html$/, "");
  const home = new URL("/cars", request.url).href;
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });
  if (!/^[a-z0-9-]{1,40}$/.test(slug)) return Response.redirect(home, 302);
  // One clean address per car: /cars/Golf.html and the like go to /cars/golf
  if (params.slug !== slug) return Response.redirect(new URL("/cars/" + slug, request.url).href, 301);

  let page, stock;
  try {
    [page, stock] = await Promise.all([asset(env, request, "/cars"), asset(env, request, "/used-cars")]);
  } catch (e) {
    return Response.redirect(home, 302);
  }

  let car = null;
  try { car = readCar(stock, page, slug); } catch (e) { car = null; }

  let html = page, status = 200;
  if (car) {
    const url = SITE + "/cars/" + slug;
    const name = car.title + (car.price ? " · " + car.price : "");
    const desc = (car.specs.length ? car.specs.join(" · ") + ". " : "") +
      "Workshop-inspected at AutoDrive Salisbury Plain, Adelaide. See the photos and enquire on WhatsApp.";
    html = set(html, /(<title>)[^<]*(<\/title>)/, attr(name + " | AutoDrive Salisbury Plain"));
    html = set(html, /(<meta name="description" content=")[^"]*(")/, attr(name + ". " + desc));
    html = set(html, /(<link rel="canonical" href=")[^"]*(")/, url);
    html = set(html, /(<meta property="og:url" content=")[^"]*(")/, url);
    html = set(html, /(<meta property="og:title" content=")[^"]*(")/, attr(name));
    html = set(html, /(<meta property="og:description" content=")[^"]*(")/, attr(desc));
    if (car.img) {
      const img = new URL(car.img.charAt(0) === "/" ? car.img : "/" + car.img, request.url).href;
      html = set(html, /(<meta property="og:image" content=")[^"]*(")/, attr(img));
    }
  } else {
    status = 404;
    html = set(html, /(<title>)[^<]*(<\/title>)/, "Car no longer listed | AutoDrive Salisbury Plain");
    html = html.replace(/<link rel="canonical"[^>]*>/, '<meta name="robots" content="noindex" />');
  }

  return new Response(request.method === "HEAD" ? null : html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate" }
  });
}
