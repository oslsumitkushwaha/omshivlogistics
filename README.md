# OM SHIV LOGISTICS (OSL) — Landing Page

A conversion-focused single-page React application for **Om Shiv Logistics**, a B2B commercial
vehicle supplier, transport contractor and commission agency based in **Gandhidham, Kutch, Gujarat**.

> **Transportation Redefined — Your Cargo, Our Responsibility**

---

## 1. Project goals

| Goal | How it is addressed |
| --- | --- |
| Attract B2B clients (manufacturers, extraction industries, distribution plants) | Clear service taxonomy, industry language, capacity figures |
| Boost enquiries | Freight Estimator, persistent Call/WhatsApp CTAs, enquiry form with reference numbers |
| Look premium, not template-generated | Midnight-navy / crimson / gold palette, Sora + Inter typography, real OSL logo artwork, subtle motion |
| Not boring | Animated network map, live-ticking dispatch board, scrolling marquee, scroll progress, interactive estimator |
| Reach the right inbox | Enquiries are addressed to **gandhidham@omshivlogistics.com** |

---

## 2. Tech stack

* **React 18 + htm** — vendored locally in `js/vendor/`, so the app runs with **no build step** and no
  external JS dependency. JSX-free tagged template literals keep the markup readable.
* **Plain CSS** (`css/style.css`) with CSS custom properties — no framework payload.
* **Sora** (display) + **Inter** (body) via Google Fonts, **Font Awesome 6** for icons — both
  progressive enhancements; the page still works without them.
* **RESTful Table API** for the enquiry register and lane list.

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
1. **Sticky header** — real OSL logo mark, single-line scroll-spy nav, booking phone, "Get a Quote" CTA, mobile hamburger drawer.
2. **Hero** — headline with gradient accent, live "dispatch desk" chip, two CTAs, four KPI stats, and an **animated pan-India network map** (SVG) with Gandhidham as the hub, pulsing city nodes and animated route lines.
3. **Crimson marquee band** — continuously scrolling core-service ticker (pauses on hover).
4. **Core Services** — **four consolidated pillars in a single row**: vehicle supply & container booking, end-to-end transport contracting, commission agency & sourcing, fleet & dispatch management. Each pillar absorbs the original six specialisations.
5. **Fleet Ownership** (dark section) — **four consolidated vehicle groups in a single row**: 32FT containers (SXL 9MT / MXL 18MT), multi-axle & trailer, open-body & LCV, specialised cargo — plus a four-figure stat band.
6. **Why Clients Choose OSL** — the six brand pillars from the posters, in a three-column grid.
7. **How We Work** — four numbered steps plus two deep-dive columns on long-term contracting and commission agency sourcing.
8. **Freight Estimator** — interactive lane + vehicle + load-type + weight calculator producing a **single indicative average figure** (not a range), with distance, transit days and payload band. One click hands the result into the enquiry form.
9. **Dispatch Board** — a self-updating sample of movements on regular lanes (illustrative, clearly labelled).
10. **Lanes & Coverage** — searchable lane table (seeded, upgrades automatically to live API data).
11. **Enquiry form** — validated, spam-trapped, generates a reference number (`OSL-YYMMDD-NNNN`) and saves to the `inquiries` table; provides prefilled **Email to gandhidham@omshivlogistics.com**, **WhatsApp** and **Call** fallbacks so a requirement is never lost.
12. **FAQ** — accordion answering the six most common pre-booking questions.
13. **Brand posters** — the three original OSL creatives, clickable to full size.
14. **Contact** (dark) — all three phone lines with role labels, both email addresses, registered office, proprietor, GSTIN and WhatsApp.
15. **Footer** — full OSL logo lockup, services, quick links, contacts, GSTIN.

### Global UX
* Scroll progress bar, reveal-on-scroll animations, `prefers-reduced-motion` respected.
* Floating WhatsApp / Call / Back-to-top buttons; sticky mobile action bar (Call / WhatsApp / Quote).
* Full keyboard accessibility: skip link, `aria-*` state, focus-visible rings, labelled form fields.
* SEO: descriptive title/description/keywords, Open Graph tags, and `MovingCompany` JSON-LD schema
  with address, phone, GST and area served.
* Graceful failure: if the enquiry API is unreachable, the form still produces an email/WhatsApp payload.

---

## 5. Brand assets

| File | Use |
| --- | --- |
| `images/osl-logo-mark.png` | Header logo (OSL letters) and browser favicon |
| `images/osl-logo-full.png` | Footer logo lockup (OSL + name + tagline) |
| `images/osl-pan-india-poster.png` | Brand section creative |
| `images/osl-solutions-poster.png` | Brand section creative |
| `images/osl-fleet-owner-poster.png` | Brand section creative |

**Important implementation detail:** the supplied logo PNGs are 1024×1024 files whose artwork occupies
only a narrow horizontal band in the middle (measured bounds: mark = 910×237 at x64,y388; full lockup =
848×280 at x91,y407). Dropping them in raw would render as a mostly-empty square. The `.logo-mark` and
`.logo-lockup` CSS classes therefore crop each image to its exact artwork bounds using a scaled
`overflow: hidden` window, so the logos appear tight and correctly proportioned. If a logo is ever
replaced, re-measure and update those two rule sets in `css/style.css`.

---

## 6. Functional entry URIs

| Path | Purpose |
| --- | --- |
| `/index.html` | The entire landing page (single page, anchor navigation) |
| `/#services` | Core Services |
| `/#fleet` | Fleet ownership & vehicle classes |
| `/#how-we-work` | Process, contracting & commission agency detail |
| `/#estimator` | Interactive freight estimator |
| `/#board` | Sample dispatch board |
| `/#lanes` | Lane list & search |
| `/#enquiry` | Enquiry / quote form |
| `/#faq` | FAQ accordion |
| `/#posters` | Brand creatives |
| `/#contact` | Point of contact |

### Data API endpoints used by the app

| Method | Endpoint | Used for |
| --- | --- | --- |
| `GET` | `tables/lanes?limit=100` | Live lane list (falls back to seeded data) |
| `POST` | `tables/inquiries` | Saves a submitted enquiry |

---

## 7. Data models

### `inquiries` — the enquiry register
`id`, `reference`, `name`, `company`, `phone`, `email`, `service`, `vehicle`, `from_city`,
`to_city`, `load_details`, `pickup_date`, `message`, `source`, `status`
(`new` / `contacted` / `quoted` / `won` / `closed`), `created_at`.

### `lanes` — published service lanes
`id`, `from_city`, `to_city`, `transit_days`, `frequency`, `vehicle`, `note`.

> **Note on storage:** table rows live in the project data store (preview) and, once the site is
> Hosted-Deployed, in that deployment's own database. The two are independent — use the Data tab /
> preview for editing-time rows and the live database for production rows.

---

## 8. Project structure

```
index.html            page shell + SEO/JSON-LD + script tags
css/style.css         full brand theme, layout, animations, responsive rules
js/data.js            all content: contacts, services, fleet, FAQs, estimator config
js/components.js      React components (React 18 + htm)
js/app.js             entry point; mounts the React tree
js/vendor/            react, react-dom, htm (local copies, no build step)
images/               OSL logo artwork + the three brand posters
```

To edit copy, contacts, lanes or estimator rates, change **`js/data.js` only** — no component edits needed.

---

## 9. Business details configured

| Field | Value |
| --- | --- |
| Transport Booking | +91 93745 29413 |
| Fleet & Dispatch | +91 93744 29413 |
| Operations & Support | +91 92740 47949 |
| Enquiry inbox | gandhidham@omshivlogistics.com |
| General enquiries | contact@omshivlogistics.com |
| Proprietor | Indradev Kushwaha (Fleet Owner) |
| Registered office | North Flour Mill Building, Office No. 203, Zhanda Chowk, Gandhidham 370201, Kutch, Gujarat |
| GSTIN | 24EGFPK8451Q1ZQ |
| Fleet specialisation | 32FT SXL (9MT) / MXL (18MT) containers, 10 tyres & above |

---

## 10. Not yet implemented / recommended next steps

1. **Email delivery from the browser.** A static site cannot send SMTP mail on its own. Today the form
   stores the enquiry and offers a one-tap prefilled email/WhatsApp hand-off. To get true automatic
   email to `gandhidham@omshivlogistics.com`, connect a form-relay service (e.g. Formspree, Web3Forms,
   EmailJS) in `EnquiryForm.submit()` — the payload is already assembled for this.
2. **Square favicon / app icon.** The current favicon points at the wide OSL mark PNG. A dedicated
   square 512×512 monogram export would look sharper in browser tabs and as a PWA icon.
3. **Admin enquiry dashboard.** A password-gated screen listing `inquiries` with status workflow.
   *Security caveat:* a client-side password is visible in page source and is **not** real protection —
   use Hosted access rules (allowlist) for genuine gating.
4. **Real lane & rate data.** `ESTIMATOR.distances` and `vehicles.rate` are indicative planning values.
   Replace them with your actual contracted rates and confirm the disclaimer wording.
5. **Google Maps embed** for the Zhanda Chowk office and a directions link.
6. **Testimonials / client logos** section — highly persuasive for B2B, needs real references.
7. **Fleet photo gallery** with real vehicle photos (currently represented by iconography and the posters).
8. **Multi-page expansion** — dedicated service pages, a fleet page, and a blog for local SEO
   ("transport contractor Gandhidham", "container booking Kandla Mundra").
9. **Analytics & call tracking** — GA4 plus click-to-call event tracking to measure enquiry sources.

---

## 11. Public URLs

* **Preview:** served by the in-editor preview.
* **Production:** publish via the **Publish tab** (or a Hosted Deploy) to obtain the live URL.

---

## 12. Deploy with Git and Vercel

This repository is a static frontend plus Vercel Functions. It has no frontend build step, but
the Functions use `@vercel/postgres` and are installed from `package.json` during deployment.

### 12.1 Before you deploy

You need:

* A GitHub account and a repository for this project.
* A Vercel account connected to GitHub.
* A purchased domain, if you want a custom URL.
* A Vercel Postgres-compatible database for durable lane and enquiry data. Vercel's Storage tab
  may present this as Vercel Postgres or a Neon integration depending on the account.
* A Resend account and verified sending domain for automatic email notifications. This is optional;
  the form's email and WhatsApp fallback links work without it.

Do not commit API keys. `.env.example` contains variable names and placeholder values only.

### 12.2 Push the code to GitHub

From the project folder, run:

```powershell
git add .
git commit -m "Prepare Om Shiv Logistics for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with the GitHub repository details. If a remote
already exists, use `git remote -v` to inspect it and push with `git push -u origin main`.

The repository root must contain `index.html`, `vercel.json`, `package.json`, `api/`, `css/`,
`js/`, and `images/`.

### 12.3 Import the repository into Vercel

1. Open Vercel and choose **Add New -> Project**.
2. Import the GitHub repository.
3. Use `Other` as the framework preset.
4. Leave the build command empty. There is no frontend build command.
5. Leave the install command at its default, so Vercel installs `package.json` dependencies.
6. Set the output directory to `.` or leave it as the repository root.
7. Deploy the project.

The included `vercel.json` enables clean URLs and serves the root page at `/`. Every push to the
connected production branch creates a new Vercel deployment. Pull requests can receive preview
deployments automatically.

### 12.4 Configure the production database

The API routes are:

| Method | URL | Purpose |
| --- | --- | --- |
| `GET` | `/api/tables/lanes?limit=100` | Loads published lanes; falls back to built-in seed data if the table is empty or unavailable |
| `POST` | `/api/tables/inquiries` | Validates and stores an enquiry in Postgres |

To configure durable storage:

1. Open the Vercel project **Storage** tab.
2. Create or connect a Vercel Postgres-compatible database, commonly provided through Neon.
3. Connect the database to the project for the `POSTGRES_*` environment variables to be added.
4. Open the database SQL editor.
5. Copy and run the complete contents of `api/schema.sql`.
6. Add or edit production lanes in the `lanes` table if the built-in examples are not suitable.
7. Redeploy after changing environment variables if Vercel does not redeploy automatically.

The enquiry form reports success only after the database confirms the insert. A database outage
does not lose the user's prepared enquiry: the success screen still provides prefilled email and
WhatsApp actions.

### 12.5 Configure automatic enquiry email

The database stores every successful enquiry. To also send it automatically to the business inbox:

1. Create a Resend account.
2. Verify the domain that will appear in the sender address.
3. Create a Resend API key.
4. In Vercel, open **Project Settings -> Environment Variables**.
5. Add these variables for Production, and Preview if desired:

```text
RESEND_API_KEY=re_xxxxxxxxx
ENQUIRY_FROM_EMAIL=website@your-verified-domain.com
ENQUIRY_TO_EMAIL=gandhidham@omshivlogistics.com
```

Use a sender address on the domain verified in Resend. The API route stores the enquiry first; if
email delivery fails, the enquiry remains in Postgres and the failure is logged by Vercel.

### 12.6 Connect the purchased domain

1. In Vercel, open **Project Settings -> Domains**.
2. Add the root domain, for example `omshivlogistics.com`.
3. Add `www.omshivlogistics.com` as well if both forms should work.
4. At the domain registrar, add exactly the DNS records Vercel displays. Do not guess the values;
  Vercel can change them.
5. Set the root domain as the primary domain and enable the redirect between root and `www`.
6. Wait for DNS propagation and confirm Vercel shows the domain as **Valid Configuration**.

Vercel provides HTTPS automatically after DNS verification. Do not remove existing MX records if
the domain already hosts business email. Only change the A/CNAME records requested by Vercel.

### 12.7 Verify the live deployment

After deployment, test the Vercel URL before changing DNS:

* The home page loads directly at `/` and on a hard refresh.
* CSS, JavaScript, logos, posters, fonts, and icons load without 404 errors.
* Mobile navigation, phone links, WhatsApp links, estimator, FAQ, and lane search work.
* The lane section loads seed data or rows from `/api/tables/lanes`.
* A test enquiry is inserted into Postgres and receives a reference number.
* The test enquiry arrives in Resend and at `ENQUIRY_TO_EMAIL` if email variables are configured.
* The custom domain works over HTTPS after DNS verification.

Remove test enquiries from the production database after verification.

### 12.8 Future updates

Edit the code locally, then run:

```powershell
git add .
git commit -m "Describe the change"
git push
```

Vercel builds and publishes the new commit automatically. Database schema changes must be run in
the database SQL editor separately; they are not applied automatically by a frontend deployment.

## 13. Verification performed

* `PlaywrightConsoleCapture` — **zero console errors** and zero page errors on `index.html`.
  An earlier `useState is not defined` bug in `js/app.js` was found and fixed.
* **Desktop (1280px)** — header verified: logo cropped cleanly, all six nav items on **one line**,
  phone number on one line, even spacing. Hero, marquee, services and fleet confirmed.
* **Services & Fleet** — confirmed **four cards per row in a single row** each, evenly sized, no overflow.
* **Mobile (390px)** — logo + hamburger on one line, no horizontal overflow, sticky
  Call/WhatsApp/Quote bar present.
* **Estimator** — confirmed it renders a **single figure** (₹48,000) labelled *Indicative average*,
  with no two-number range anywhere.
* **Entity bug fix** — the hero badge now shows "10 tyres and above" as normal text; the literal
  `&amp;` string no longer appears (htm renders HTML entities verbatim, so the copy avoids them).
* **Logo rendering** — header mark verified as properly cropped with no cut-off edges or empty gaps;
  logo file sizes confirmed byte-identical to the originals (271,671 B and 249,749 B).
* Hero height capped with `clamp(600px, 100svh, 880px)` to prevent stretching on very tall viewports.
