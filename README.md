# OM SHIV LOGISTICS (OSL) — Landing Page

A conversion-focused single-page React application for **Om Shiv Logistics**, a B2B commercial
vehicle supplier, transport contractor and commission agency based in **Gandhidham, Kutch, Gujarat**.

> **Transportation Redefined — Your Cargo, Our Responsibility**

---

## 1. Project goals

| Goal | How it is addressed |
| --- | --- |
| Attract B2B clients | Clear service taxonomy, industry language, capacity figures, factual copy |
| Boost enquiries | Persistent Call/WhatsApp CTAs, classified contact section, sticky mobile action bar |
| Look premium, not template-generated | Midnight-navy / crimson / gold palette, Sora + Inter typography, real OSL logo artwork, restrained motion |
| Rank for local search | Keyword-led title, geo meta, connected JSON-LD graph, robots.txt, sitemap.xml, noscript fallback |
| Correct routing of enquiries | Contacts grouped by information category so visitors reach the right desk first time |

---

## 2. Tech stack

* **React 18 + htm** — vendored locally in `js/vendor/`, so the app runs with **no build step** and no
  external JS dependency. JSX-free tagged template literals keep the markup readable.
* **Plain CSS** (`css/style.css`) with CSS custom properties — no framework payload.
* **Sora** (display) + **Inter** (body) via Google Fonts, **Font Awesome 6** for icons — progressive
  enhancements; the page still works without them.
* **Static site** — no backend, no server-side processing. See *Limitations* below.

---

## 3. Design system

| Token | Value | Use |
| --- | --- | --- |
| Midnight navy | `#050d18` → `#0a1626` → `#16304f` | Dark sections, header, footer |
| Brand crimson | `#e4002b` | Primary actions, accents, active states |
| Warm gold | `#e9b949` | Premium accent, dark-section figures, eyebrows |
| Mist / line | `#f2f5fa` / `#e4e9f2` | Light section backgrounds, borders |
| Display font | Sora | Headings, buttons, nav, numbers |
| Body font | Inter | Paragraphs, form fields, tables |

Headings use tight negative tracking and a restrained weight scale (600–800) rather than heavy
uppercase slabs, which is what gives the page a modern, premium feel.

---

## 4. Completed features

### Sections (in page order)
1. **Sticky header** — OSL logo mark, single-line scroll-spy nav (Services · Fleet · Process · FAQ · Contact), booking phone, "Get a Quote" CTA, mobile drawer.
2. **Hero** — headline with gradient accent, location chip, two CTAs, four KPI stats, and an **animated pan-India network map** (SVG) with Gandhidham as the hub.
3. **Crimson marquee band** — scrolling core-service ticker (pauses on hover).
4. **Core Services** — **four consolidated pillars in one row**, each absorbing the client's original six specialisations.
5. **Fleet Ownership** (dark) — **four consolidated vehicle groups in one row** plus a stat band.
6. **Who We Work With** — four client-industry cards (manufacturing, extraction, distribution, port-linked).
7. **Why Clients Choose OSL** — the six brand pillars from the client's posters.
8. **How We Work** — four numbered steps plus two deep-dive columns on contracting and agency sourcing.
9. **Network & Coverage** (dark) — lane description with a self-updating sample consignment panel, clearly labelled as illustrative.
10. **FAQ** — accordion with six answers (mirrored in FAQPage structured data).
11. **Brand** — the three original OSL posters, clickable to full size.
12. **Point of Contact** — see below.
13. **Footer** — full OSL logo lockup, services, quick links and contacts.

### Point of Contact — classified and grouped
The section is deliberately **grouped by information category**, and each group is visually
distinct (its own accent rail colour, tinted icon and header) so a visitor can tell at a glance
which channel to use for what rather than being routed through the wrong line:

| Group | Accent | Contains |
| --- | --- | --- |
| **Bookings, Pricing & Contracts** | Crimson | Transport booking line, WhatsApp desk, business-enquiries email |
| **Operations, Dispatch & 24/7 Support** | Blue | Fleet & dispatch line, operations & support line, 24/7 support notice |
| **Head Office** | Gold | Full postal address, service area, visit note |
| **Company Details** | Slate | Proprietor, business type, general-enquiries email |

Each group holds exactly **three items**, and cards are equal-height **per row** (`align-items: stretch`
+ a per-card flex column) with the header note reserving two lines, so paired cards finish on the same
baseline and their internal divider rules sit on a consistent rhythm. The grid stays two columns down
to 960px before stacking on smaller screens.

A closing CTA panel handles the "not sure which line to use" case, routing to the booking desk.

### Global UX
* Scroll progress bar, reveal-on-scroll animations, `prefers-reduced-motion` respected.
* Floating WhatsApp / Call / Back-to-top buttons; sticky mobile action bar (Call / WhatsApp / Contact).
* Accessibility: skip link, `aria-labelledby` on contact groups, `aria-expanded` on the FAQ and nav,
  focus-visible rings, labelled interactive elements, semantic `section`/`address`/`dl` landmarks.
* Graceful failure: a `try/catch` render guard shows a plain-text contact block if React fails to mount.

---

## 5. SEO implementation

### On-page
* **Keyword-led title and description** targeting *transport contractor Gandhidham*, *fleet owner Kutch*,
  *container booking Gandhidham*, *FTL/PTL road transport Gujarat*, *Kandla/Mundra port transport*.
* **Semantic HTML** — `header`, `main`, `footer`, `section`, `nav`, `address`, plus heading hierarchy
  with a single `h1`.
* **Descriptive alt text** on every image, `width`/`height` attributes to prevent layout shift.
* **`lang="en-IN"`** and `format-detection` for click-to-call.

### Local / geo signals
`geo.region`, `geo.placename`, `geo.position`, `ICBM` and `business:contact_data:*` meta tags, plus a
`hasMap` link in structured data — all consistent with the registered Gandhidham address.

### Structured data
A single connected **`@graph`** (validated: 9 nodes, all `@id` references resolve) containing:
`MovingCompany` + `LocalBusiness` + `Organization`, `WebSite`, `WebPage`, five `Service` nodes,
an `OfferCatalog`, and a **`FAQPage`** with 6 Q&As that mirror the visible FAQ copy.

### Social / sharing
Open Graph (`og:*` incl. image dimensions and alt) and Twitter `summary_large_image` cards.

### Crawl & indexing files
* `robots.txt` — allows the site, disallows `/js/`, points to the sitemap.
* `sitemap.xml` — landing URL with image sitemap entries for the three posters.
* `manifest.webmanifest` — PWA metadata, theme colour and icon.
* **`<noscript>` fallback** — because React renders client-side, a static block guarantees the core
  services and full NAP (name, address, phone, email) data is present in the raw HTML for
  visitors without JavaScript and for crawlers that do not execute scripts.

> **Action required by the site owner:** the absolute URLs use `https://www.omshivlogistics.com/`,
> inferred from the business email domain. If the live domain differs, update `canonical`, `og:url`,
> `og:image`, `twitter:image` in `index.html`, plus `robots.txt` and `sitemap.xml`.

---

## 6. Content integrity (client-facing limitation audit)

Because unverifiable claims create real commercial and legal risk for the client, the copy was
audited and deliberately constrained:

| Kind of claim | Decision |
| --- | --- |
| "500+ vehicles" | **Kept** — stated by the client |
| "10 tyres and above", 32FT SXL 9MT / MXL 18MT | **Kept** — from the client's own poster |
| Address, three phone lines, both emails, proprietor | **Kept** — from the client's brief |
| Freight **rates / price ranges** | **Removed.** The estimator was deleted on request; no figures are published. Pricing now speaks only of *structure* ("fixed structures", "cost per tonne") and always ends in "request a formal quotation". |
| **Transit times** (e.g. "2–3 days") | **Removed** with the lanes table — they were illustrative and could be read as a delivery commitment. |
| **Business hours** ("Mon–Sat 09:00–19:00") | **Removed.** Never supplied by the client; publishing invented opening hours risks misleading visitors and Google Business mismatches. |
| **`priceRange: "$$"`** in structured data | **Removed.** Same reasoning as rates. |
| **Response-time promises** | **Softened.** Earlier copy promised "quick support"; the contact section now makes no timing claim at all — the old "response window" item was removed rather than replaced with another invented expectation. |
| **GSTIN / tax identifiers** | **Removed.** The GST number, its FAQ entry, the "Business & Statutory Details" heading (now **Company Details**) and the footer/noscript/structured-data references were deleted on request. No tax identifier is published. |
| **Testimonials / client logos** | **Not added.** None were supplied; inventing them would be misrepresentation. |
| **Certifications, awards, years in business, "ISO", "best in region"** | **Not added.** Not supplied and unverifiable. |
| Coverage map and dispatch panel | The map is explicitly labelled an abstract network illustration, and the activity panel states it is an *illustrative sample, not a live consignment tracker*. |

### Remaining limitations to be aware of
1. **No published pricing.** Visitors cannot self-serve a cost estimate; every enquiry requires a
   phone call or WhatsApp. This is honest but adds friction — consider adding a *rate-card PDF* or a
   "typical lane pricing on request" note if the client is comfortable.
2. **No form on the page.** Removed on request, so there is no asynchronous contact channel — only
   phone, WhatsApp and email. For B2B buyers who browse after hours, an email is the only
   non-interactive option.
3. **The coverage map is illustrative, not a lane guarantee.** If the client wants to advertise
   specific lanes, those must be confirmed and would need a disclaimer.
4. **No client proof (testimonials/logos).** This is the single biggest missing trust signal for a
   B2B freight buyer. Recommend collecting 2–3 named references.
5. **Illustrative dispatch panel could still be misread** as live tracking. It is labelled twice, but
   removing it entirely is the safest option if the client prefers zero ambiguity.
6. **Client-side rendering.** Content is injected by React; the `<noscript>` block mitigates this, but
   server-side rendering or static pre-rendering would be strictly better for indexing robustness.
7. **No analytics installed**, so enquiry sources cannot be measured.

---

## 7. Functional entry URIs

| Path | Purpose |
| --- | --- |
| `/index.html` | The entire landing page (single page, anchor navigation) |
| `/#services` | Core Services |
| `/#fleet` | Fleet ownership & vehicle classes |
| `/#industries` | Who we work with |
| `/#how-we-work` | Process, contracting & commission agency detail |
| `/#network` | Network & coverage |
| `/#faq` | FAQ accordion |
| `/#posters` | Brand creatives |
| `/#contact` | Classified point of contact |

### Removed on request
The `#estimator`, `#lanes` and `#enquiry` sections, their components, and the `lanes` /
`inquiries` API integrations were deleted. The legacy table schemas remain defined in
`.tables/schema.json` but are no longer referenced by the application.

---

## 8. Project structure

```
index.html            page shell, full SEO head, JSON-LD graph, noscript fallback
robots.txt            crawl directives
sitemap.xml           XML sitemap with image entries
manifest.webmanifest  PWA metadata
css/style.css         full brand theme, layout, animations, responsive rules
js/data.js            all content: contacts & contact groups, services, fleet, FAQs
js/components.js      React components (React 18 + htm)
js/app.js             entry point; mounts the React tree
js/vendor/            react, react-dom, htm (local copies, no build step)
images/               OSL logo artwork + the three brand posters
```

To edit copy or contacts, change **`js/data.js` only** — no component edits needed.

---

## 9. Brand assets

| File | Use |
| --- | --- |
| `images/osl-logo-mark.png` | Header logo (OSL letters) and favicon |
| `images/osl-logo-full.png` | Footer logo lockup (OSL + name + tagline) |
| `images/osl-pan-india-poster.png` | Brand section creative |
| `images/osl-solutions-poster.png` | Brand section creative |
| `images/osl-fleet-owner-poster.png` | Brand section creative |

**Important:** the supplied logo PNGs are 1024×1024 files whose artwork occupies only a narrow
horizontal band (measured bounds: mark = 910×237 at x64,y388; full lockup = 848×280 at x91,y407).
The `.logo-mark` / `.logo-lockup` classes crop each to its exact artwork bounds via a scaled
`overflow: hidden` window. If a logo is replaced, re-measure and update those two rule sets.

---

## 10. Business details configured

| Field | Value |
| --- | --- |
| Transport Booking | +91 93745 29413 |
| Fleet & Dispatch | +91 93744 29413 |
| Operations & Support | +91 92740 47949 |
| Business enquiries | gandhidham@omshivlogistics.com |
| General enquiries | contact@omshivlogistics.com |
| Proprietor | Indradev Kushwaha (Fleet Owner) |
| Registered office | North Flour Mill Building, Office No. 203, Zhanda Chowk, Gandhidham 370201, Kutch, Gujarat |
| Fleet specialisation | 32FT SXL (9MT) / MXL (18MT) containers, 10 tyres & above |

---

## 11. Recommended next steps

1. **Confirm the live domain** and update the absolute URLs listed in §5.
2. **Register Google Business Profile** with the exact NAP used here — highest-impact local SEO action.
3. **Add trust signals** — 2–3 named client references or logo permissions (currently absent).
4. **Reintroduce a contact form** if the client wants an after-hours channel; a form-relay service
   (Formspree, Web3Forms, EmailJS) is required because a static site cannot send SMTP mail itself.
5. **Server-side rendering or pre-rendering** for fully crawler-proof indexing.
6. **Gujarati / Hindi version** with `hreflang`, valuable for the local Kutch market.
7. **Google Maps embed** for the Zhanda Chowk office.
8. **GA4 + click-to-call tracking** to measure enquiry sources.

---

## 12. Verification performed

* **`PlaywrightConsoleCapture`** — zero console errors and zero page errors on `index.html`.
* **Structured data** — programmatically parsed and validated: valid JSON, 9 nodes, correct types
  (`MovingCompany|LocalBusiness|Organization`, `WebSite`, `WebPage`, 5 × `Service`, `FAQPage`),
  6 FAQ entries, **no unresolved `@id` references**, and confirmed absence of the invented
  `openingHours` / `priceRange` / `taxID` claims.
* **Desktop (1280px)** — header on one line with logo, all nav items, phone and CTA; hero and map render.
* **Mobile (390px)** — logo + hamburger and CTA on one line, no horizontal overflow, hero heading
  fits, sticky Call/WhatsApp/Contact bar present.
* **New Sections** — visually confirmed: four industry cards, and **four visually distinct contact
  groups each with its own accent rail colour** (crimson, blue, gold, slate) plus a closing CTA panel.
* **Contact-grid fix** — a full-page desktop capture (1280px) confirmed each row's two cards end on the
  same bottom edge and their internal divider rules align; a mobile capture (390px) confirmed the grid
  stacks to one readable column with no clipped or overflowing text. Card geometry was also measured
  directly in the DOM (per-card heights and per-item offsets), not just eyeballed.
* **GST removal** — grep across `index.html`, `js/`, `css/`, `robots.txt`, `sitemap.xml` and
  `manifest.webmanifest` returns no `GSTIN` / `GST` / `24EGFPK8451` / `taxID` / `vatID` occurrences
  (the only textual `gst` hit is `fonts.gstatic.com`, a false positive); the rendered page shows no
  tax identifier.
* **Removals** — confirmed the estimator, lanes table and enquiry form are absent from the page and
  that no stale `#enquiry` links, `estimator`/`lanes`/`EnquiryForm` references or table `fetch` calls
  remain in the application code.
* **Entity safety** — no literal `&amp;` leaks on screen (htm renders HTML entities verbatim, so copy
  avoids them).
