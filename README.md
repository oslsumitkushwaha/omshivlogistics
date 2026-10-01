# Om Shiv Logistics (OSL) — website

B2B fleet owner and transport contractor based in **Gandhidham, Kutch, Gujarat, India**.
Tagline: *Transportation Redefined — Your Cargo, Our Responsibility.*

OSL supplies commercial vehicles and runs industrial road freight. It is **not** a consumer
moving company and the site does not offer household relocation.

---

## 1. Public URLs

| Item | URL |
|---|---|
| Canonical / production | `https://www.omshivlogistics.com/` |
| Alternate host (301 to www + https) | `http://omshivlogistics.com/` |
| Sitemap | `https://www.omshivlogistics.com/sitemap.xml` |
| Robots | `https://www.omshivlogistics.com/robots.txt` |
| Google Maps listing | `https://maps.app.goo.gl/fv4qFBzDQcibUEKcA` |
| GA4 measurement ID | `G-4H9SDR2W89` |

> The domain is derived from the business email domain and was supplied in the brief. If the
> live domain differs, every absolute URL below must be updated in one pass —
> see section 7, "Find and replace".

## 2. How the site is built

Two kinds of page, one design system.

| | Landing page | Inner pages |
|---|---|---|
| File | `index.html` | `services/…`, `locations/…`, `about/`, `contact/`, `privacy-policy/`, `terms/`, `404.html` |
| Rendering | React 18 + `htm` (UMD, vendored in `js/vendor/`, **no build step**) | plain static HTML + `js/page-render.js` (no framework) |
| Content source | `js/data.js` (`window.OSL_DATA`) | `js/pages.js` (`window.OSL_PAGES`) |
| Markup | `js/components.js` (`window.OSL_COMPONENTS`) | rendered into `#page-main` from the page registry |
| Styles | `css/style.css` | `css/style.css` + `css/pages.css` |

The inner pages need no framework at all, so each is a real document with its own `<title>`,
description, canonical and `<noscript>` body — fully crawlable without executing JavaScript.
The landing page stays on React because the interactive client wall depends on it, and it is
backed by a `<noscript>` block carrying the same NAP facts.

### Why no build step
Everything is loaded from `js/vendor/` as plain `<script>` tags. Editing a file and reloading is
the whole workflow. Keep it that way unless there is a reason not to.

## 3. Assets

```
css/
  style.css          brand tokens, header/footer, hero, landing sections, responsive
  pages.css          inner-page only: hero band, breadcrumbs, prose, cards, FAQ,
                     contact stack, lazy map facade, quote form, TODO notes
js/
  vendor/            react.production.min.js, react-dom.production.min.js, htm.umd.js
  data.js            landing-page content + contacts + SERVICE_PAGES/CITY_PAGES/COMPANY_PAGES
  pages.js           registry for every inner page (title, description, breadcrumb, blocks)
  page-render.js     renders an inner page from the registry; nav, map facade, quote form
  components.js      landing-page React components
  app.js             mounts the React tree
  analytics.js       GA4 delegated event layer (every page)
images/
  osl-logo-mark.png      white wordmark, dark header/footer
  osl-logo-full.png      full lockup, footer
  osl-logo-square.jpg    square black-on-white mark → favicon + schema logo
  osl-icon.png           square icon on white plate (apple-touch / manifest)
  og-om-shiv-logistics.jpg   social share banner
  founder-indradev-kushwaha.jpg
  clients/               12 client logos
```

### Logo cropping
The supplied logo PNGs are 1024² with ~90% transparent padding. `.logo-mark` / `.logo-lockup`
in `css/style.css` crop them with measured `overflow:hidden` windows
(910×237 @64,388 and 848×280 @91,407). If the artwork is ever re-exported, re-measure.

### Client logo tiles
`images/clients/*` carry differing backgrounds — some transparent, some with baked-in white,
some with baked-in black. Each entry in `CLIENTS` (js/data.js) therefore has a `tone`:
`"light"` → white tile + `mix-blend-mode: multiply`; `"dark"` → navy tile + `screen`.
A single uniform tile makes three of the twelve logos invisible.

## 4. Functional entry URIs

### Landing page (single HTML file, in-page anchors)
| URI | Section |
|---|---|
| `/#top` | Hero |
| `/#clients` | Trusted-by client wall |
| `/#services` | Services |
| `/#fleet` | Fleet |
| `/#industries` | Segments / industries served |
| `/#why` | Why OSL |
| `/#how-we-work` | Process |
| `/#faq` | FAQ |
| `/#founder` | Leadership — Indradev Kushwaha |
| `/#contact` | Point of contact |

### Inner pages (real URLs)
| Path | Purpose | JSON-LD |
|---|---|---|
| `/services/` | Services hub | CollectionPage + BreadcrumbList |
| `/services/container-booking-32ft/` | 32FT SXL 9MT / MXL 18MT | Service + FAQPage + BreadcrumbList |
| `/services/ftl-ptl-road-transport/` | FTL & PTL | Service + BreadcrumbList |
| `/services/commercial-vehicle-supply/` | Vehicle supply | Service + BreadcrumbList |
| `/services/transport-contracts/` | Long-term contracts | Service + BreadcrumbList |
| `/services/commission-agency/` | Agency & sourcing | Service + BreadcrumbList |
| `/services/kandla-mundra-port-transport/` | Port movement | Service + BreadcrumbList |
| `/locations/gandhidham/` | City page | Service + BreadcrumbList |
| `/locations/kutch/` | District page | Service + BreadcrumbList |
| `/locations/mundra/` | City page | Service + BreadcrumbList |
| `/locations/kandla/` | City page | Service + BreadcrumbList |
| `/about/` | About OSL | AboutPage + BreadcrumbList |
| `/contact/` | All contacts, map, quote form | ContactPage + BreadcrumbList |
| `/privacy-policy/` | Analytics + cookies | WebPage + BreadcrumbList |
| `/terms/` | Website & quotation terms | WebPage + BreadcrumbList |
| `/404.html` | Not found | WebPage + BreadcrumbList (noindex) |

The `#quote` anchor at the end of `/contact/` points at the quote form.

## 5. Data models and storage

**Enquiries table — `inquiries`** (`.tables/schema.json`). The quote form on `/contact/` POSTs
to `/tables/inquiries` and falls back to a `mailto:` to `gandhidham@omshivlogistics.com` if the
API is unreachable, so a lead is never silently lost.

Fields: `id`, `reference` (e.g. `OSL-20261001-4821`), `name`, `company`, `phone`, `email`,
`service`, `vehicle`, `from_city`, `to_city`, `load_details`, `pickup_date`, `message`,
`source`, `status` (`new`/`contacted`/`quoted`/`won`/`closed`), `created_at`.

Spam controls: a hidden honeypot field (`company_url`) plus a 2.5-second minimum time-on-form
trap. Both fail silently to a plausible success state so bots learn nothing.

**Preview vs live data.** Two separate stores, never auto-synced:
* preview store — rows added via the Data tab / `TableDataAdd`, served by the in-editor preview
  and the `*.gensparkspace.com` quick-share site;
* live hosted database — created empty at Hosted Deploy time, written by real visitors.

If a deployed site shows no data while the editor has rows, that is why. To copy preview rows
into the live database, use the sync-from-preview tooling — do **not** re-key rows by hand.

Legacy `lanes` schema remains in `.tables/schema.json` and is unreferenced by the app.

## 6. Analytics

`G-4H9SDR2W89` appears **exactly once per page**, immediately after the opening `<head>`, in all
17 HTML files. It is never deferred, never duplicated, never inlined twice.

`js/analytics.js` adds a delegated click layer so React-mounted elements are covered without
re-binding:

| Event | Fires on | Parameter |
|---|---|---|
| `call_click` | any `tel:` link (all three lines) | `phone_number`, `link_url`, `link_text` |
| `email_click` | any `mailto:` link (both inboxes) | `email_address`, `link_url`, `link_text` |
| `whatsapp_click` | any `wa.me` link | `whatsapp_number`, `link_url`, `link_text` |
| `directions_click` | any Google Maps link / Get Directions | `link_url`, `link_text` |
| `generate_lead` | successful quote-form submit | `lead_source`, `delivery_method`, `service_requested`, `has_company`, `has_email` |
| `view_map` | contact-page map facade opened | `link_url`, `link_text` |
| `page_view` | real page loads (from gtag config); hash routes `#/…` if ever added | `page_path`, `page_location`, `page_title` |

`generate_lead` deliberately never carries the enquirer's name, phone or email.

## 7. SEO implementation notes

* **Title / description.** Unique per page. Homepage title is 54 chars and its description 148 —
  both under the truncation limits. `og:*` and `twitter:*` mirror them.
* **Robots.** `/robots.txt` allows everything except `/admin/` and `/api/`. CSS, JS and images
  are **not** blocked — on a React-rendered page, blocking JS stops rendering entirely.
* **Sitemap.** `/sitemap.xml`, 15 indexable URLs, `<lastmod>2026-10-01</lastmod>`,
  priority 1.0 home / 0.8 service + contact / 0.6 city + about / 0.3 policies. The 404 page is
  excluded (correctly — a 404 in a sitemap is a Search Console error).
* **Structured data.** Homepage carries a connected `@graph`:
  `["ProfessionalService","LocalBusiness","Organization"]` + `WebSite` (with
  `name` / `alternateName: "OSL"`) + `WebPage` + 5×`Service` + `OfferCatalog` + `FAQPage`.
  Inner pages carry `Service` / `WebPage` / `AboutPage` / `ContactPage` + `BreadcrumbList`, and
  container/FAQ pages add their own `FAQPage`.
* `hasMap` and `sameAs` both point at the Maps listing. No `Review` or `AggregateRating` anywhere
  — there are no real reviews displayed on the site, so such markup would be a policy violation.
* `openingHours`, `priceRange` and other `sameAs` profiles are **absent** because nothing on the
  site substantiates them. See section 9.

### Find and replace
If the domain changes, replace `https://www.omshivlogistics.com` across:
`index.html`, `sitemap.xml`, `robots.txt`, all 15 inner-page HTML files, and
`js/pages.js` (`SITE`).

## 8. Performance and accessibility notes

Done: root-relative-inner-page assets so previews and production agree; explicit `width`/`height`
on every `<img>`; `loading="lazy" decoding="async"` on below-fold images; the founder portrait
declared at 768×1024; the client wall driven by a single `requestAnimationFrame` loop that pauses
off-screen and honours `prefers-reduced-motion`; the Google Map behind a click-to-load facade with
a reserved `aspect-ratio` box (no CLS); inline SVG instead of icon fonts on inner pages; two font
families, three weights each; `theme-color #0a1626`; 48px minimum tap targets on inner-page chrome;
visible `:focus-visible` outlines; labelled form fields; `aria-label` on every icon-only control
including Get Directions.

Fonts are still loaded from Google Fonts (self-hosting WOFF2 was out of tooling reach here) and
the landing page still uses the Font Awesome CDN. Both are candidates for the next pass.

## 9. Missing information — the owner must supply

Recorded as visible TODO notes on the affected pages and as `<!-- TODO -->` comments in the HTML.

1. **Office opening hours** — no `openingHours` is published. `/contact/` shows a TODO. The
   24/7 claim covers the support lines only.
2. **WhatsApp number** — a click-to-chat link uses `+91 93745 29413` because that is the
   published booking line. Confirm it is monitored on WhatsApp or it will be removed.
3. **Founding year, GST / transport registration numbers, certifications** — none published.
   `/about/` shows a TODO. Trust signals are limited to what is verifiable ("500+ vehicles").
4. **Legal review** of `/privacy-policy/` and `/terms/` — both describe the site's actual
   behaviour but are not legal advice. Registered entity name and governing law may be wanted.
5. **Google Maps listing vs site NAP** — `https://maps.app.goo.gl/fv4qFBzDQcibUEKcA` could **not**
   be verified. The short URL returns only an HTTP 302 and the fetcher refuses redirects, so the
   place name behind it is unknown. Please open it and confirm the place name matches
   "Om Shiv Logistics" and the address matches
   *North Flour Mill Building, Office No. 203, Zhanda Chowk, Gandhidham 370201, Kutch, Gujarat*
   at `23.075297, 70.133705`. **This link also differs from `fRJyybhwDt4MJUk1A`, which was
   supplied earlier**; the newer one is used throughout. Confirm which is canonical.
6. **1200×630 social image** — `images/og-om-shiv-logistics.jpg` is 1360×768 (a 1.77:1 banner),
   not the specified 1.91:1. A correctly proportioned asset should be produced.
7. **`/favicon.ico` + 48/96/192 PNGs** — not created; no image tooling was available. See the
   TODO in `index.html` for the exact lines to add once the files exist. **Nothing references them
   yet, so there is no 404 today.**
8. **16px favicon legibility** — the mark is the three letters *OSL* in a heavy condensed italic,
   with a wide ≈2.5:1 proportion and fine internal gaps. At 16px those gaps close up. A simplified
   mark (a single letter, or a solid monogram) is recommended for the favicon specifically.
9. **`openingHours`, `priceRange`, social profiles** — add only if genuine.

## 10. Not yet done, and why

* **WebP/AVIF conversion and resizing** — no image-processing tooling is available in this
  environment. Raster assets ship as supplied. Filenames were not renamed to the
  `32ft-container-transport-gandhidham.webp` convention because a rename without a conversion
  would be cosmetic only; it should happen together with the conversion.
* **Hero slider → single static image** — already satisfied: the hero is a static CSS-gradient band
  with an inline SVG network map. There is no slider anywhere on the site.
* **Self-hosted WOFF2 fonts with preload** — still on Google Fonts.
* **Critical-CSS inlining / full minification** — the stylesheet is hand-written and readable;
  a minify pass belongs in a build step, and this project deliberately has none.
* **Security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy) and
  `/.well-known/security.txt`** — these are response-header and file-host concerns that a static
  repo cannot set. They must be configured at the host/CDN. `/.well-known/security.txt` can be
  added once a security contact address is confirmed.
* **Single-hop 301 http→https and non-www→www** — must be configured at the host; it cannot be
  expressed in the project files.
* **A cookie-consent banner** — `/privacy-policy/` documents the analytics cookies, but no consent
  UI was added. GA4 loads unconditionally, as the brief's Part 1 requires the tag never be delayed.
  These two requirements conflict; the tag was given priority. A consent mode needs a decision.
* **Server-side form delivery** — a static site cannot send email. The form therefore persists to
  the `inquiries` table and falls back to `mailto:`; it does not deliver directly to the inbox.
* **Rich Results Test / Search Console verification** — requires the live domain and a Google
  account. Steps: (1) Rich Results Test on the homepage and `/contact/`, (2) Search Console →
  URL Inspection → Request Indexing for the homepage and each service page, (3) submit
  `/sitemap.xml`, (4) check Enhancements for Breadcrumbs and FAQ.

## 11. Suggested next steps

1. Provide the missing items in section 9 so the TODO notes can be removed.
2. Convert images to WebP/AVIF and self-host the fonts.
3. Configure redirects, caching and security headers at the host.
4. Decide the cookie-consent position, then align Part 1 and Part 6.
5. Re-run Lighthouse against the deployed URL and confirm the targets:
   Mobile 85+ performance / 90+ accessibility / 95+ best practices / 100 SEO;
   desktop 95+ performance / 100 SEO; LCP < 2.5s, CLS < 0.1, TBT < 200ms.
