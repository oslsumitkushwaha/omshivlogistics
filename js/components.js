/* ==========================================================================
   OM SHIV LOGISTICS — React components (React 18 + htm, no build step)
   ========================================================================== */
(function () {
  "use strict";

  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const D = window.OSL_DATA;

  const inr = (n) => "\u20B9" + new Intl.NumberFormat("en-IN").format(Math.round(n));
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------------------------------------------------------------- hooks -- */
  function useReveal() {
    useEffect(() => {
      const nodes = document.querySelectorAll(".reveal:not(.is-visible)");
      if (!nodes.length) return;
      if (!("IntersectionObserver" in window)) {
        nodes.forEach((n) => n.classList.add("is-visible"));
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
      nodes.forEach((n) => io.observe(n));
      return () => io.disconnect();
    });
  }

  function useActiveSection(ids) {
    const [active, setActive] = useState("");
    useEffect(() => {
      const onScroll = () => {
        const y = window.scrollY + 140;
        let current = "";
        ids.forEach((id) => {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= y) current = id;
        });
        setActive(current);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, [ids.join("|")]);
    return active;
  }

  /* ---------------------------------------------------------- brand logo --- */
  /* Uses the client's supplied logo artwork, cropped to its exact bounds. */
  function Logo({ variant, className }) {
    const isFull = variant === "full";
    return html`
      <span class=${(isFull ? "logo-lockup" : "logo-mark") + (className ? " " + className : "")}>
        <img
          src=${isFull ? "images/osl-logo-full.png" : "images/osl-logo-mark.png"}
          alt="Om Shiv Logistics logo"
          decoding="async"
        />
      </span>
    `;
  }

  /* ------------------------------------------------------- small utilities - */
  function ScrollProgress() {
    const [pct, setPct] = useState(0);
    useEffect(() => {
      const onScroll = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, []);
    return html`
      <div
        aria-hidden="true"
        style=${{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          width: pct + "%",
          background: "linear-gradient(90deg,#e4002b,#e9b949)",
          zIndex: 90,
          transition: "width .12s linear"
        }}
      ></div>
    `;
  }

  function SectionHead({ eyebrow, title, lede, center, dark }) {
    return html`
      <div class=${"section-head" + (center ? " section-head--center" : "")}>
        ${eyebrow ? html`<span class=${"eyebrow" + (dark ? " on-dark" : "")}>${eyebrow}</span>` : null}
        <h2>${title}</h2>
        ${lede ? html`<p class=${"lede" + (dark ? " on-dark" : "")}>${lede}</p>` : null}
      </div>
    `;
  }

  /* ---------------------------------------------------------------- header - */
  function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const active = useActiveSection(D.NAV.map((n) => n.id).concat(["contact"]));

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 24);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* .site-header is the mount host (it lives outside the React tree), so the
       scrolled-state class has to be toggled on that element directly. */
    useEffect(() => {
      const host = document.querySelector(".site-header");
      if (host) host.classList.toggle("is-scrolled", scrolled);
    }, [scrolled]);

    const go = (e, id) => {
      e.preventDefault();
      setOpen(false);
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 84, behavior: "smooth" });
    };

    return html`
      <div class="header-inner shell">
        <a class="brand" href="#top" onClick=${(e) => go(e, "top")} aria-label="Om Shiv Logistics — home">
          <${Logo} variant="mark" />
          <span class="brand__text">
            <span class="brand__name">Om Shiv Logistics</span>
            <span class="brand__tag">Transportation Redefined</span>
          </span>
        </a>

        <nav id="main-navigation" class=${"main-nav" + (open ? " is-open" : "")} aria-label="Main navigation">
          ${D.NAV.map(
            (item) => html`
              <a
                key=${item.id}
                href=${"#" + item.id}
                onClick=${(e) => go(e, item.id)}
                aria-current=${active === item.id ? "true" : undefined}
                style=${active === item.id ? { color: "#fff", background: "rgba(228,0,43,.24)" } : null}
                >${item.label}</a
              >
            `
          )}
        </nav>

        <div class="header-actions">
          <a class="header-call" href=${"tel:+" + D.CONTACT.phones[0].raw}>
            <i class="fa-solid fa-phone-volume" aria-hidden="true"></i>
            ${D.CONTACT.phones[0].number}
          </a>
          <button class="btn btn--primary btn--sm" onClick=${(e) => go(e, "enquiry")} type="button">
            <i class="fa-solid fa-file-invoice-dollar" aria-hidden="true"></i> Get a Quote
          </button>
          <button
            class="nav-toggle"
            type="button"
            aria-expanded=${open}
            aria-controls="main-navigation"
            aria-label=${open ? "Close menu" : "Open menu"}
            onClick=${() => setOpen(!open)}
          >
            <i class=${"fa-solid " + (open ? "fa-xmark" : "fa-bars")} aria-hidden="true"></i>
          </button>
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------ hero map --- */
  const NODES = [
    { city: "Delhi NCR", x: 300, y: 92, big: true },
    { city: "Jaipur", x: 262, y: 152 },
    { city: "Lucknow", x: 352, y: 118 },
    { city: "Kolkata", x: 452, y: 158, big: true },
    { city: "Ahmedabad", x: 218, y: 232, big: true },
    { city: "Mumbai / JNPT", x: 248, y: 332, big: true },
    { city: "Pune", x: 286, y: 362 },
    { city: "Hyderabad", x: 336, y: 380, big: true },
    { city: "Nagpur", x: 352, y: 262 },
    { city: "Surat", x: 238, y: 288 },
    { city: "Chennai", x: 392, y: 432, big: true },
    { city: "Bengaluru", x: 306, y: 428, big: true },
    { city: "Visakhapatnam", x: 428, y: 336 }
  ];

  function NetworkMap() {
    const hub = { x: 150, y: 256 };
    return html`
      <svg
        class="network-map"
        viewBox="0 0 520 500"
        role="img"
        aria-label="Abstract map of the Om Shiv Logistics pan-India transport network with Gandhidham as the central hub"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#e4002b" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#e4002b" stop-opacity="0" />
          </radialGradient>
          <pattern id="dotGrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="#ffffff" fill-opacity="0.14" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="520" height="500" fill="url(#dotGrid)" opacity="0.5" />

        <circle cx=${hub.x} cy=${hub.y} r="130" fill="none" stroke="#ffffff" stroke-opacity="0.1" />
        <circle cx=${hub.x} cy=${hub.y} r="215" fill="none" stroke="#ffffff" stroke-opacity="0.075" />
        <circle cx=${hub.x} cy=${hub.y} r="300" fill="none" stroke="#ffffff" stroke-opacity="0.05" />
        <circle cx=${hub.x} cy=${hub.y} r="120" fill="url(#hubGlow)" />

        ${NODES.map(
          (n, i) => html`
            <line
              key=${"l" + i}
              class="route-line"
              x1=${hub.x}
              y1=${hub.y}
              x2=${n.x}
              y2=${n.y}
              stroke="#e4002b"
              stroke-opacity=${n.big ? 0.7 : 0.36}
              stroke-width=${n.big ? 1.6 : 1}
              style=${{ animationDelay: i * 0.18 + "s" }}
            />
          `
        )}

        ${NODES.map(
          (n, i) => html`
            <g key=${"n" + i}>
              <circle
                class="map-ping"
                cx=${n.x}
                cy=${n.y}
                r=${n.big ? 12 : 9}
                fill="#e4002b"
                style=${{ animationDelay: i * 0.3 + "s" }}
              />
              <circle cx=${n.x} cy=${n.y} r=${n.big ? 4.4 : 3.4} fill="#fff" />
              <text
                x=${n.x + 10}
                y=${n.y + 4}
                fill="#e6edf7"
                font-size=${n.big ? 11.5 : 10}
                font-weight=${n.big ? 600 : 400}
                font-family="Inter, sans-serif"
              >
                ${n.city}
              </text>
            </g>
          `
        )}

        <g>
          <circle cx=${hub.x} cy=${hub.y} r="26" fill="#e4002b" opacity="0.26" />
          <circle cx=${hub.x} cy=${hub.y} r="16" fill="#e4002b" />
          <text
            x=${hub.x}
            y=${hub.y + 5}
            text-anchor="middle"
            fill="#fff"
            font-size="12"
            font-weight="700"
            font-family="Sora, sans-serif"
          >
            OSL
          </text>
          <text
            x=${hub.x}
            y=${hub.y + 42}
            text-anchor="middle"
            fill="#fff"
            font-size="11.5"
            font-weight="600"
            font-family="Inter, sans-serif"
          >
            GANDHIDHAM
          </text>
          <text
            x=${hub.x}
            y=${hub.y + 57}
            text-anchor="middle"
            fill="#9fb0c6"
            font-size="10"
            font-family="Inter, sans-serif"
          >
            Kutch · Gujarat
          </text>
        </g>
      </svg>
    `;
  }

  /* ----------------------------------------------------------------- hero -- */
  function Hero() {
    const go = (id) => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 84, behavior: "smooth" });
    };
    return html`
      <section class="hero" id="top">
        <span class="hero__glow" aria-hidden="true"></span>
        <span class="hero__glow hero__glow--2" aria-hidden="true"></span>

        <div class="shell hero__grid">
          <div class="hero__copy">
            <span class="hero__route-chip">
              <span class="pulse-dot" aria-hidden="true"></span>
              <b>Dispatch desk live</b> · Gandhidham → Pan India
            </span>

            <h1>
              <span class="line">Your Trusted Logistics</span>
              <span class="accent">Partner Across India</span>
            </h1>

            <p class="lede on-dark">
              Reliable logistics. Stronger partnerships. Nationwide reach. We are a B2B fleet owner and
              transport contractor supplying 500+ commercial vehicles to manufacturers, extraction
              industries and distribution plants across Kutch and Gujarat.
            </p>

            <div class="hero__actions">
              <button class="btn btn--primary" type="button" onClick=${() => go("enquiry")}>
                <i class="fa-solid fa-file-invoice-dollar" aria-hidden="true"></i> Request a Freight Quote
              </button>
              <button class="btn btn--ghost" type="button" onClick=${() => go("estimator")}>
                <i class="fa-solid fa-calculator" aria-hidden="true"></i> Estimate My Freight
              </button>
            </div>

            <dl class="hero__stats">
              ${D.HERO_STATS.map(
                (s) => html`
                  <div class="hero__stat" key=${s.label}>
                    <strong>${s.value}</strong>
                    <span>${s.label}</span>
                  </div>
                `
              )}
            </dl>
          </div>

          <div class="hero__visual">
            <${NetworkMap} />
            <div class="hero__badge">
              <i class="fa-solid fa-truck-fast" aria-hidden="true"></i>
              <span>
                <strong>Your Cargo, Our Responsibility</strong>
                <span class="hero__badge-sub">32FT SXL 9MT · MXL 18MT · 10 tyres and above</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function Marquee() {
    const doubled = D.MARQUEE.concat(D.MARQUEE);
    return html`
      <div class="marquee" aria-hidden="true">
        <div class="marquee__track">
          ${doubled.map((t, i) => html`<span key=${i}>${t}</span>`)}
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------- services -- */
  function Services() {
    return html`
      <section class="section section--alt" id="services">
        <div class="shell">
          <${SectionHead}
            eyebrow="Our Core Services"
            title="Complete logistics solutions for your business"
            lede="Four core specialisations, one accountable team. Whether you need a single container tomorrow or a dedicated fleet for the year, the workflow is built around your dispatch calendar."
            center=${true}
          />

          <div class="service-grid">
            ${D.SERVICES.map(
              (s) => html`
                <article class="service-card reveal" key=${s.id}>
                  <span class="service-card__icon" aria-hidden="true"><i class=${"fa-solid " + s.icon}></i></span>
                  <h3>${s.title}</h3>
                  <p>${s.summary}</p>
                  <ul>
                    ${s.points.map((p, i) => html`<li key=${i}>${p}</li>`)}
                  </ul>
                </article>
              `
            )}
          </div>

          <div class="pill-row" style=${{ justifyContent: "center", marginTop: "36px" }}>
            ${["Container Booking", "Road Transport (FTL / PTL)", "Fleet Ownership", "Commission Agency", "Timely Delivery"].map(
              (p) => html`<span class="pill" key=${p}><i class="fa-solid fa-check" aria-hidden="true"></i>${p}</span>`
            )}
          </div>
        </div>
      </section>
    `;
  }

  /* ---------------------------------------------------------------- fleet -- */
  function Fleet() {
    return html`
      <section class="section section--dark" id="fleet">
        <div class="shell">
          <${SectionHead}
            eyebrow="Fleet Ownership"
            title="500+ vehicles. Right unit for every load."
            lede="Fleet ownership of 10 tyres and above, plus access to a wider commercial network for surge capacity. Sourcing is matched to load dimensions, weight and handling requirements."
            dark=${true}
          />

          <div class="fleet-grid">
            ${D.FLEET.map(
              (f) => html`
                <article class="fleet-card reveal" key=${f.title}>
                  <i class=${"fa-solid " + f.icon} aria-hidden="true"></i>
                  <h3>${f.title}</h3>
                  <p>${f.text}</p>
                  <span class="cap">${f.cap}</span>
                </article>
              `
            )}
          </div>

          <div class="stat-band" style=${{ marginTop: "52px" }}>
            ${[
              { v: "500+", l: "Vehicles accessible" },
              { v: "10 Tyre+", l: "Own fleet class" },
              { v: "20+", l: "Major lanes covered" },
              { v: "24/7", l: "Operations monitoring" }
            ].map(
              (s) => html`
                <div class="reveal" key=${s.l}>
                  <strong>${s.v}</strong>
                  <span>${s.l}</span>
                </div>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }

  /* ------------------------------------------------------------------ why -- */
  function WhyUs() {
    return html`
      <section class="section" id="why-us">
        <div class="shell">
          <${SectionHead}
            eyebrow="Why clients choose OSL"
            title="Trust is built on the road, one consignment at a time"
            lede="From origin to destination — we are always there. Here is what our clients rely on."
          />
          <div class="why-grid">
            ${D.WHY.map(
              (w) => html`
                <article class="why-card reveal" key=${w.title}>
                  <span class="why-card__icon" aria-hidden="true"><i class=${"fa-solid " + w.icon}></i></span>
                  <div>
                    <h3>${w.title}</h3>
                    <p>${w.text}</p>
                  </div>
                </article>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }

  /* -------------------------------------------------------------- process -- */
  function HowWeWork() {
    return html`
      <section class="section section--alt" id="how-we-work">
        <div class="shell">
          <${SectionHead}
            eyebrow="How we work"
            title="From requirement to unloading in four steps"
            lede="A structured workflow that plugs cleanly into your existing warehouse and supply operations."
          />
          <div class="steps">
            ${D.STEPS.map(
              (s) => html`
                <article class="step reveal" key=${s.title}>
                  <h3>${s.title}</h3>
                  <p>${s.text}</p>
                </article>
              `
            )}
          </div>

          <div class="two-col" style=${{ marginTop: "60px" }}>
            <div class="reveal">
              <span class="eyebrow">End-to-end transport contracting</span>
              <h3 style=${{ fontSize: "clamp(1.15rem,2.2vw,1.6rem)", marginBottom: "18px" }}>
                Stop depending on the volatile spot market
              </h3>
              <ul class="tick-list">
                <li><strong>Long-term agreements</strong> — dedicated trucks for predictable weekly or monthly logistics volumes.</li>
                <li><strong>Flexible terms</strong> — contracts tailored around seasonal market demand or fluctuating industrial output.</li>
                <li><strong>Fixed pricing structures</strong> — predictable cost allocations that help you balance annual freight expenditure.</li>
                <li><strong>Load-layout planning</strong> — maximise space per truck to bring down individual freight cost.</li>
              </ul>
            </div>
            <div class="reveal">
              <span class="eyebrow">Commission agency and sourcing</span>
              <h3 style=${{ fontSize: "clamp(1.15rem,2.2vw,1.6rem)", marginBottom: "18px" }}>Capacity when the market is tight</h3>
              <ul class="tick-list">
                <li><strong>Quick vehicle sourcing</strong> — rapid dispatch to secure certified backup fleets during demand peaks.</li>
                <li><strong>Route optimisation</strong> — regional traffic, seasonal infrastructure challenges and toll systems factored in.</li>
                <li><strong>Cost management</strong> — structuring load layouts to bring down freight cost per tonne.</li>
                <li><strong>Professional fleet support</strong> — credentialed commercial drivers vetted for safety and heavy-load regulations.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /* ------------------------------------------------------------ estimator -- */
  function Estimator({ onSendToQuote }) {
    const E = D.ESTIMATOR;
    const [from, setFrom] = useState("Gandhidham");
    const [to, setTo] = useState("Mumbai / JNPT");
    const [vehicle, setVehicle] = useState("32FT MXL Container (18MT)");
    const [load, setLoad] = useState("Full Truck Load (FTL)");
    const [weight, setWeight] = useState(18);

    const result = useMemo(() => {
      const dist = E.distances;
      const a = dist[from] != null ? dist[from] : 600;
      const b = dist[to] != null ? dist[to] : 600;
      let km;
      if (from === to) km = 60;
      else if (a === 0 || b === 0) km = Math.max(a, b);
      else km = Math.max(250, Math.round((a + b) * 0.6));

      const v = E.vehicles[vehicle] || { rate: 50, capacity: "\u2014" };
      const f = E.loadFactors[load] || 1;
      const wFactor = weight > 18 ? 1 + (weight - 18) * 0.02 : 1;
      const base = km * v.rate * f * wFactor;
      // Indicative market band, averaged to a single planning figure.
      const low = base * 0.9;
      const high = base * 1.16;
      const avg = Math.round(((low + high) / 2) / 500) * 500;
      const days = Math.max(1, Math.ceil(km / 400) + 1);
      return { km, avg, days, capacity: v.capacity, rate: v.rate };
    }, [from, to, vehicle, load, weight]);

    const swap = () => {
      setFrom(to);
      setTo(from);
    };

    return html`
      <section class="section" id="estimator">
        <div class="shell">
          <${SectionHead}
            eyebrow="Freight estimator"
            title="Know your indicative freight before you call"
            lede="Pick a lane and vehicle class for an instant planning figure. It is an indicative average, not a quotation — confirm the final rate with our team."
          />

          <div class="estimator">
            <div class="panel reveal">
              <div class="field-row">
                <div class="field">
                  <label for="est-from">Pickup from</label>
                  <select id="est-from" value=${from} onChange=${(e) => setFrom(e.target.value)}>
                    ${E.cities.map((c) => html`<option key=${c} value=${c}>${c}</option>`)}
                  </select>
                </div>
                <div class="field">
                  <label for="est-to">Delivery to</label>
                  <select id="est-to" value=${to} onChange=${(e) => setTo(e.target.value)}>
                    ${E.cities.map((c) => html`<option key=${c} value=${c}>${c}</option>`)}
                  </select>
                </div>
              </div>

              <div style=${{ marginBottom: "18px" }}>
                <button class="chip" type="button" onClick=${swap}>
                  <i class="fa-solid fa-right-left" aria-hidden="true"></i> Swap route
                </button>
              </div>

              <div class="field">
                <label for="est-vehicle">Vehicle / container class</label>
                <select id="est-vehicle" value=${vehicle} onChange=${(e) => setVehicle(e.target.value)}>
                  ${Object.keys(E.vehicles).map((v) => html`<option key=${v} value=${v}>${v}</option>`)}
                </select>
                <small>Payload band for this class: <strong>${result.capacity}</strong></small>
              </div>

              <div class="field">
                <label>Load type</label>
                <div class="seg">
                  ${Object.keys(E.loadFactors).map(
                    (k) => html`
                      <button key=${k} type="button" aria-pressed=${load === k} onClick=${() => setLoad(k)}>
                        ${k}
                      </button>
                    `
                  )}
                </div>
              </div>

              <div class="field" style=${{ marginBottom: 0 }}>
                <label for="est-weight">Cargo weight — ${weight} MT</label>
                <input
                  id="est-weight"
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value=${weight}
                  onInput=${(e) => setWeight(Number(e.target.value))}
                  style=${{ padding: 0, border: 0, accentColor: "#e4002b" }}
                />
                <small>Heavy or over-dimensional cargo? Choose “Heavy / OD Cargo” above.</small>
              </div>
            </div>

            <div class="panel panel--dark reveal">
              <h3 style=${{ marginBottom: "4px", fontSize: ".82rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#9db0c6" }}>
                Estimated freight
              </h3>
              <p style=${{ color: "#fff", fontSize: ".95rem", fontWeight: 600, margin: "0" }}>${from} → ${to}</p>

              <div class="quote-out">
                <div class="amount-label">Indicative average</div>
                <div class="amount">${inr(result.avg)}</div>
                <div style=${{ fontSize: ".8rem", color: "#a9b8cc", marginTop: "4px" }}>
                  One-way road freight, all-in planning figure
                </div>
                <dl>
                  <dt>Approx. distance</dt>
                  <dd>${result.km} km</dd>
                  <dt>Vehicle class</dt>
                  <dd>${vehicle}</dd>
                  <dt>Load type</dt>
                  <dd>${load}</dd>
                  <dt>Cargo weight</dt>
                  <dd>${weight} MT</dd>
                  <dt>Indicative transit</dt>
                  <dd>${result.days} day${result.days > 1 ? "s" : ""}</dd>
                </dl>
              </div>

              <p class="quote-disclaimer">
                Indicative average only. Final pricing depends on exact pickup and delivery points,
                loading conditions, waiting time, seasonal demand, tolls and permits.
              </p>

              <button
                class="btn btn--primary btn--block"
                type="button"
                style=${{ marginTop: "18px" }}
                onClick=${() =>
                  onSendToQuote({
                    from_city: from,
                    to_city: to,
                    vehicle: vehicle,
                    load_details: load + " · approx. " + weight + " MT",
                    message:
                      "Estimator result: indicative average " +
                      inr(result.avg) +
                      " for " +
                      result.km +
                      " km (" +
                      result.days +
                      " day transit)."
                  })}
              >
                <i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Send this to our team
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /* ---------------------------------------------------------------- lanes -- */
  function Lanes() {
    const [lanes, setLanes] = useState(D.LANES_SEED);
    const [query, setQuery] = useState("");
    const [source, setSource] = useState("seed");

    useEffect(() => {
      let alive = true;
      fetch("/api/tables/lanes?limit=100")
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((res) => {
          if (alive && res && Array.isArray(res.data) && res.data.length) {
            setLanes(res.data);
            setSource("live");
          }
        })
        .catch(() => {});
      return () => {
        alive = false;
      };
    }, []);

    const filtered = lanes.filter((l) => {
      const hay = [l.from_city, l.to_city, l.vehicle, l.note].join(" ").toLowerCase();
      return hay.indexOf(query.toLowerCase()) > -1;
    });

    return html`
      <section class="section section--alt" id="lanes">
        <div class="shell">
          <${SectionHead}
            eyebrow="Lanes and coverage"
            title="Regular lanes out of Kutch"
            lede="These are the routes we run most often, with typical transit windows. If your lane is not listed, we will still quote it — sourcing and route planning are our specialisation."
          />

          <div class="field" style=${{ maxWidth: "420px", marginBottom: "28px" }}>
            <label for="lane-search">Search lane, city or vehicle</label>
            <input
              id="lane-search"
              type="search"
              placeholder="e.g. Mumbai, Trailer, Jaipur"
              value=${query}
              onInput=${(e) => setQuery(e.target.value)}
            />
          </div>

          <div class="service-grid">
            ${filtered.map(
              (l, i) => html`
                <article class="service-card reveal" key=${l.id || i}>
                  <span class="service-card__icon" aria-hidden="true"><i class="fa-solid fa-route"></i></span>
                  <h3 style=${{ fontSize: ".96rem" }}>
                    ${l.from_city}
                    <i class="fa-solid fa-arrow-right" style=${{ color: "#e4002b", fontSize: ".72rem" }} aria-hidden="true"></i>
                    ${l.to_city}
                  </h3>
                  <div class="lane-meta">
                    <span><i class="fa-regular fa-clock" aria-hidden="true"></i>${l.transit_days}</span>
                    <span><i class="fa-solid fa-repeat" aria-hidden="true"></i>${l.frequency}</span>
                  </div>
                  <ul>
                    <li>${l.vehicle}</li>
                    ${l.note ? html`<li>${l.note}</li>` : null}
                  </ul>
                </article>
              `
            )}
          </div>

          ${filtered.length === 0
            ? html`<p style=${{ marginTop: "24px", color: "#5c6b80" }}>
                No lane matched “${query}”.
                <a href="#enquiry" style=${{ color: "#e4002b", fontWeight: 700 }}>Ask us about it →</a>
              </p>`
            : null}

          <p style=${{ marginTop: "24px", fontSize: ".78rem", color: "#93a2b5" }}>
            ${source === "live"
              ? "Lane list loaded live from the OSL dispatch database."
              : "Showing the standard OSL lane list. Transit windows are indicative and subject to seasonal conditions."}
          </p>
        </div>
      </section>
    `;
  }

  /* -------------------------------------------------------- dispatch board -- */
  const BOARD_POOL = [
    { lane: "Gandhidham → Ahmedabad", unit: "32FT MXL · 18MT", tag: "Container" },
    { lane: "Kandla Port → Delhi NCR", unit: "32FT SXL · 9MT", tag: "Port" },
    { lane: "Gandhidham → Mumbai / JNPT", unit: "Multi-Axle", tag: "Export" },
    { lane: "Anjar → Jaipur", unit: "Open-Body", tag: "Raw material" },
    { lane: "Mundra Port → Nagpur", unit: "Trailer", tag: "Bulk" },
    { lane: "Bhuj → Surat", unit: "10-Tyre Truck", tag: "Distribution" },
    { lane: "Gandhidham → Hyderabad", unit: "32FT MXL · 18MT", tag: "Long haul" },
    { lane: "Kutch → Vadodara", unit: "LCV", tag: "Mid-mile" }
  ];

  function DispatchBoard() {
    const [rows, setRows] = useState([]);
    const counter = useRef(0);

    useEffect(() => {
      const make = () => {
        const p = BOARD_POOL[counter.current % BOARD_POOL.length];
        counter.current += 1;
        const now = new Date();
        return Object.assign({}, p, {
          id: "b" + counter.current + "-" + now.getTime(),
          time: pad(now.getHours()) + ":" + pad(now.getMinutes())
        });
      };
      setRows([make(), make(), make()]);
      const t = setInterval(() => {
        setRows((prev) => [make()].concat(prev).slice(0, 4));
      }, 6500);
      return () => clearInterval(t);
    }, []);

    const goQuote = () => {
      const el = document.getElementById("enquiry");
      if (el) window.scrollTo({ top: el.offsetTop - 84, behavior: "smooth" });
    };

    return html`
      <section class="section section--tight" id="board">
        <div class="shell">
          <div class="two-col" style=${{ gap: "36px" }}>
            <div class="reveal">
              <span class="eyebrow">Dispatch desk</span>
              <h2 style=${{ fontSize: "clamp(1.4rem,2.7vw,2.05rem)" }}>Movements on our regular lanes</h2>
              <p class="lede">
                A sample view of the kind of consignments moving through our Kutch dispatch desk —
                containers, trailers and open-body units, placed on schedule and monitored round the clock.
              </p>
              <div class="pill-row">
                <span class="pill"><i class="fa-solid fa-bell" aria-hidden="true"></i>On-time dispatch</span>
                <span class="pill"><i class="fa-solid fa-user-shield" aria-hidden="true"></i>Credentialed drivers</span>
                <span class="pill"><i class="fa-solid fa-tower-broadcast" aria-hidden="true"></i>24/7 monitoring</span>
              </div>
              <button class="btn btn--dark" type="button" style=${{ marginTop: "26px" }} onClick=${goQuote}>
                <i class="fa-solid fa-truck-arrow-right" aria-hidden="true"></i> Book a vehicle
              </button>
            </div>

            <div class="panel reveal" aria-label="Sample network activity">
              <h3 style=${{ fontSize: ".72rem", letterSpacing: ".13em", color: "#5c6b80", textTransform: "uppercase" }}>
                Network activity — indicative
              </h3>
              <ul class="board-list">
                ${rows.map(
                  (r) => html`
                    <li class="board-row" key=${r.id}>
                      <i class="fa-solid fa-truck" aria-hidden="true"></i>
                      <span>
                        <strong>${r.lane}</strong>
                        <small>${r.unit} · ${r.tag}</small>
                      </span>
                      <span class="time">${r.time}</span>
                    </li>
                  `
                )}
              </ul>
              <p style=${{ fontSize: ".72rem", color: "#93a2b5", margin: "16px 0 0" }}>
                Illustrative sample of lane activity — not a live consignment tracker.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /* -------------------------------------------------------------- enquiry -- */
  const EMPTY_FORM = {
    name: "",
    company: "",
    phone: "",
    email: "",
    service: "Vehicle Supply & Container Booking",
    vehicle: "32FT MXL Container (18MT)",
    from_city: "",
    to_city: "",
    load_details: "",
    pickup_date: "",
    message: "",
    trap: ""
  };

  function buildReference() {
    const d = new Date();
    const stamp = String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate());
    return "OSL-" + stamp + "-" + String(Math.floor(1000 + Math.random() * 9000));
  }

  function EnquiryForm({ prefill, onConsumed }) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");
    const [reference, setReference] = useState("");
    const [savedToApi, setSavedToApi] = useState(false);
    const [apiNote, setApiNote] = useState("");
    const formRef = useRef(null);

    useEffect(() => {
      if (!prefill) return;
      setForm((f) => Object.assign({}, f, prefill));
      setStatus("idle");
      if (onConsumed) onConsumed();
    }, [prefill]);

    const set = (key) => (e) => {
      const value = e.target.value;
      setForm((f) => Object.assign({}, f, { [key]: value }));
      setErrors((er) => Object.assign({}, er, { [key]: "" }));
    };

    const validate = () => {
      const er = {};
      if (!form.name.trim()) er.name = "Please tell us your name.";
      const digits = form.phone.replace(/\D/g, "");
      if (digits.length < 10) er.phone = "Enter a valid 10-digit phone number.";
      if (!form.from_city.trim()) er.from_city = "Pickup location required.";
      if (!form.to_city.trim()) er.to_city = "Delivery location required.";
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) er.email = "That email looks incomplete.";
      return er;
    };

    const summaryText = (ref) =>
      [
        "New freight enquiry" + (ref ? " — " + ref : ""),
        "",
        "Name: " + form.name,
        form.company ? "Company: " + form.company : "",
        "Phone / WhatsApp: " + form.phone,
        form.email ? "Email: " + form.email : "",
        "Service: " + form.service,
        "Vehicle: " + form.vehicle,
        "Route: " + form.from_city + " → " + form.to_city,
        form.pickup_date ? "Preferred pickup: " + form.pickup_date : "",
        form.load_details ? "Load details: " + form.load_details : "",
        form.message ? "Notes: " + form.message : "",
        "",
        "Sent from the Om Shiv Logistics website."
      ]
        .filter(Boolean)
        .join("\n");

    const submit = async (e) => {
      e.preventDefault();
      if (form.trap) return; // silent bot rejection
      const er = validate();
      setErrors(er);
      if (Object.keys(er).length) {
        const first = formRef.current.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }

      const ref = buildReference();
      setReference(ref);
      setStatus("sending");

      const payload = {
        reference: ref,
        name: form.name.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        service: form.service,
        vehicle: form.vehicle,
        from_city: form.from_city.trim(),
        to_city: form.to_city.trim(),
        load_details: form.load_details.trim(),
        pickup_date: form.pickup_date,
        message: form.message.trim(),
        source: "landing-page-enquiry-form",
        status: "new",
        created_at: Date.now()
      };

      try {
        const res = await fetch("/api/tables/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        setSavedToApi(true);
        setApiNote("Saved to the OSL enquiry register. Our team will call you back.");
      } catch (err) {
        setSavedToApi(false);
        setApiNote(
          "We could not reach the enquiry register from this browser, so please use the email or WhatsApp button below to make sure your requirement reaches us."
        );
      }
      setStatus("done");
    };

    const mailtoHref =
      "mailto:" +
      D.CONTACT.email +
      "?subject=" +
      encodeURIComponent("Freight enquiry " + (reference || "") + " — " + form.from_city + " to " + form.to_city) +
      "&body=" +
      encodeURIComponent(summaryText(reference));

    const waHref = "https://wa.me/" + D.CONTACT.whatsapp + "?text=" + encodeURIComponent(summaryText(reference));

    if (status === "done") {
      return html`
        <section class="section" id="enquiry">
          <div class="shell form-wrap">
            <div class="form-success" role="status">
              <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
              <h3>Enquiry ready — reference ${reference}</h3>
              <span class="ref">${reference}</span>
              <p style=${{ color: "#5c6b80", maxWidth: "52ch", margin: "0 auto 8px" }}>${apiNote}</p>
              <p style=${{ color: "#5c6b80", maxWidth: "52ch", margin: "0 auto" }}>
                To reach our Gandhidham desk directly, send the same details to
                <strong>${D.CONTACT.email}</strong> or on WhatsApp — one tap fills everything in for you.
              </p>
              <div class="form-actions">
                <a class="btn btn--primary" href=${mailtoHref}>
                  <i class="fa-solid fa-envelope" aria-hidden="true"></i> Email this enquiry
                </a>
                <a class="btn btn--dark" href=${waHref} target="_blank" rel="noopener">
                  <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Send on WhatsApp
                </a>
                <a class="btn btn--outline" href=${"tel:+" + D.CONTACT.phones[0].raw}>
                  <i class="fa-solid fa-phone" aria-hidden="true"></i> Call now
                </a>
              </div>
              <div class="form-actions">
                <button
                  class="btn btn--outline btn--sm"
                  type="button"
                  onClick=${() => {
                    setForm(EMPTY_FORM);
                    setStatus("idle");
                    setReference("");
                  }}
                >
                  <i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Submit another enquiry
                </button>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    const servicesList = D.SERVICES.map((s) => s.title).concat(["Other / Not sure yet"]);
    const vehiclesList = Object.keys(D.ESTIMATOR.vehicles).concat(["Not sure — please advise"]);

    return html`
      <section class="section" id="enquiry">
        <div class="shell form-wrap">
          <${SectionHead}
            eyebrow="Get a quote"
            title="Send your requirement to our Gandhidham desk"
            lede="Share the load, the lane and the date. Our team responds with a formal quote — and for urgent requirements, call or WhatsApp the transport booking line."
            center=${true}
          />

          <form class="panel" ref=${formRef} onSubmit=${submit} noValidate>
            <div class="field-row">
              <div class="field">
                <label for="f-name">Your name *</label>
                <input
                  id="f-name"
                  value=${form.name}
                  onChange=${set("name")}
                  aria-invalid=${errors.name ? "true" : "false"}
                  autoComplete="name"
                  placeholder="e.g. Ramesh Patel"
                />
                ${errors.name ? html`<small class="err">${errors.name}</small>` : null}
              </div>
              <div class="field">
                <label for="f-company">Company</label>
                <input id="f-company" value=${form.company} onChange=${set("company")} autoComplete="organization" placeholder="e.g. Kutch Steel Works Pvt Ltd" />
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label for="f-phone">Phone / WhatsApp *</label>
                <input
                  id="f-phone"
                  value=${form.phone}
                  onChange=${set("phone")}
                  aria-invalid=${errors.phone ? "true" : "false"}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                />
                ${errors.phone ? html`<small class="err">${errors.phone}</small>` : null}
              </div>
              <div class="field">
                <label for="f-email">Email</label>
                <input
                  id="f-email"
                  type="email"
                  value=${form.email}
                  onChange=${set("email")}
                  aria-invalid=${errors.email ? "true" : "false"}
                  autoComplete="email"
                  placeholder="you@company.com"
                />
                ${errors.email ? html`<small class="err">${errors.email}</small>` : null}
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label for="f-from">Pickup location *</label>
                <input
                  id="f-from"
                  value=${form.from_city}
                  onChange=${set("from_city")}
                  aria-invalid=${errors.from_city ? "true" : "false"}
                  placeholder="e.g. Gandhidham / Kandla Port"
                />
                ${errors.from_city ? html`<small class="err">${errors.from_city}</small>` : null}
              </div>
              <div class="field">
                <label for="f-to">Delivery location *</label>
                <input
                  id="f-to"
                  value=${form.to_city}
                  onChange=${set("to_city")}
                  aria-invalid=${errors.to_city ? "true" : "false"}
                  placeholder="e.g. Mumbai / JNPT"
                />
                ${errors.to_city ? html`<small class="err">${errors.to_city}</small>` : null}
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label for="f-service">Service required</label>
                <select id="f-service" value=${form.service} onChange=${set("service")}>
                  ${servicesList.map((s) => html`<option key=${s} value=${s}>${s}</option>`)}
                </select>
              </div>
              <div class="field">
                <label for="f-vehicle">Vehicle / container</label>
                <select id="f-vehicle" value=${form.vehicle} onChange=${set("vehicle")}>
                  ${vehiclesList.map((v) => html`<option key=${v} value=${v}>${v}</option>`)}
                </select>
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label for="f-load">Load details (weight, dimensions, packing)</label>
                <input id="f-load" value=${form.load_details} onChange=${set("load_details")} placeholder="e.g. 18 MT steel coils, 2 bundles" />
              </div>
              <div class="field">
                <label for="f-date">Preferred pickup date</label>
                <input id="f-date" type="date" value=${form.pickup_date} onChange=${set("pickup_date")} />
              </div>
            </div>

            <div class="field">
              <label for="f-message">Anything else we should know?</label>
              <textarea id="f-message" value=${form.message} onChange=${set("message")} placeholder="Long-term contract requirement, monthly volume, loading constraints, documentation needs…"></textarea>
            </div>

            <div style=${{ position: "absolute", left: "-9999px" }} aria-hidden="true">
              <label for="f-trap">Do not fill this field</label>
              <input id="f-trap" tabIndex="-1" value=${form.trap} onChange=${set("trap")} autoComplete="off" />
            </div>

            <button class="btn btn--primary btn--block" type="submit" disabled=${status === "sending"}>
              ${status === "sending"
                ? html`<i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Sending…`
                : html`<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Submit enquiry`}
            </button>

            <p class="form-note">
              Your enquiry is registered against a unique reference and delivered to
              <strong>${D.CONTACT.email}</strong>. Prefer talking? Call
              <a href=${"tel:+" + D.CONTACT.phones[0].raw} style=${{ color: "#e4002b", fontWeight: 700 }}>${D.CONTACT.phones[0].number}</a>.
            </p>
          </form>
        </div>
      </section>
    `;
  }

  /* ------------------------------------------------------------------ faq -- */
  function Faq() {
    const [open, setOpen] = useState(0);
    return html`
      <section class="section section--alt" id="faq">
        <div class="shell">
          <${SectionHead} eyebrow="Questions" title="What clients ask us before the first booking" center=${true} />
          <div class="faq">
            ${D.FAQS.map(
              (f, i) => html`
                <div class="faq__item" data-open=${open === i} key=${i}>
                  <button class="faq__q" type="button" aria-expanded=${open === i} onClick=${() => setOpen(open === i ? -1 : i)}>
                    <span>${f.q}</span>
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                  </button>
                  ${open === i ? html`<div class="faq__a">${f.a}</div>` : null}
                </div>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }

  /* -------------------------------------------------------------- posters -- */
  function Posters() {
    const items = [
      { src: "images/osl-pan-india-poster.png", w: 1024, h: 576, alt: "Om Shiv Logistics — your trusted logistics partner across India, Pan India presence", cap: "Pan India presence & core services" },
      { src: "images/osl-solutions-poster.png", w: 1024, h: 576, alt: "Om Shiv Logistics — complete logistics solutions for your business", cap: "One platform, multiple solutions" },
      { src: "images/osl-fleet-owner-poster.png", w: 1024, h: 576, alt: "Indradev Kushwaha, fleet owner of 32FT SXL and MXL containers, Gandhidham", cap: "Fleet ownership & registered office" }
    ];
    return html`
      <section class="section" id="posters">
        <div class="shell">
          <${SectionHead}
            eyebrow="Brand"
            title="Our commitments, on the record"
            lede="Safe · On time · Pan India. The same promises we print on our fleet boards."
            center=${true}
          />
          <div class="poster-strip">
            ${items.map(
              (p) => html`
                <figure class="reveal" key=${p.src}>
                  <a href=${p.src} target="_blank" rel="noopener">
                    <img src=${p.src} alt=${p.alt} width=${p.w} height=${p.h} loading="lazy" decoding="async" />
                  </a>
                  <figcaption>${p.cap}</figcaption>
                </figure>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }

  /* -------------------------------------------------------------- contact -- */
  function Contact() {
    return html`
      <section class="section section--dark" id="contact">
        <div class="shell">
          <${SectionHead}
            eyebrow="Point of contact"
            title="Talk to the Gandhidham dispatch desk"
            lede="For a formal quote, long-term pricing or an immediate dispatch request — reach us directly. Lines are monitored 24/7 for transit issues."
            dark=${true}
          />

          <div class="contact-grid">
            <div class="contact-list">
              ${D.CONTACT.phones.map(
                (p) => html`
                  <div class="contact-row" key=${p.raw}>
                    <i class="fa-solid fa-phone-volume" aria-hidden="true"></i>
                    <div>
                      <h3>${p.label}</h3>
                      <a href=${"tel:+" + p.raw}>${p.number}</a>
                      <small>Call or WhatsApp</small>
                    </div>
                  </div>
                `
              )}
              <div class="contact-row">
                <i class="fa-solid fa-envelope" aria-hidden="true"></i>
                <div>
                  <h3>Business enquiries</h3>
                  <a href=${"mailto:" + D.CONTACT.email}>${D.CONTACT.email}</a>
                  <small>Kutch operations</small>
                </div>
              </div>
              <div class="contact-row">
                <i class="fa-solid fa-envelope-open-text" aria-hidden="true"></i>
                <div>
                  <h3>General enquiries</h3>
                  <a href=${"mailto:" + D.CONTACT.generalEmail}>${D.CONTACT.generalEmail}</a>
                  <small>Corporate and documentation</small>
                </div>
              </div>
            </div>

            <div class="contact-list">
              <div class="contact-row">
                <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                <div>
                  <h3>Registered office</h3>
                  <p>${D.CONTACT.address.line1}</p>
                  <p>${D.CONTACT.address.line2}</p>
                  <small>${D.CONTACT.address.line3}</small>
                </div>
              </div>
              <div class="contact-row">
                <i class="fa-solid fa-user-tie" aria-hidden="true"></i>
                <div>
                  <h3>Proprietor</h3>
                  <p>${D.CONTACT.owner}</p>
                  <small>${D.CONTACT.ownerRole} — 32FT SXL (9MT) / MXL (18MT) containers</small>
                </div>
              </div>
              <div class="contact-row">
                <i class="fa-solid fa-file-invoice" aria-hidden="true"></i>
                <div>
                  <h3>GSTIN</h3>
                  <p>${D.CONTACT.gst}</p>
                  <small>Compliant tax invoicing on every booking</small>
                </div>
              </div>
              <div class="contact-row">
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
                <div>
                  <h3>WhatsApp</h3>
                  <a
                    href=${"https://wa.me/" + D.CONTACT.whatsapp + "?text=" + encodeURIComponent("Hello Om Shiv Logistics, I would like a freight quote.")}
                    target="_blank"
                    rel="noopener"
                    >Chat with dispatch</a
                  >
                  <small>Fastest route for urgent placement</small>
                </div>
              </div>
            </div>
          </div>

          <div class="pill-row" style=${{ justifyContent: "center", marginTop: "44px" }}>
            ${["Safe", "On Time", "Pan India", "Trusted Service", "Long Term Partnership"].map(
              (p) => html`<span class="pill" key=${p} style=${{ background: "rgba(255,255,255,.07)", color: "#fff" }}>${p}</span>`
            )}
          </div>
        </div>
      </section>
    `;
  }

  /* --------------------------------------------------------------- footer -- */
  function Footer() {
    const year = new Date().getFullYear();
    return html`
      <div class="shell">
        <div class="footer-grid">
          <div class="footer-brand">
            <${Logo} variant="full" />
            <p>
              B2B fleet owner and transport contractor based in Gandhidham, Kutch. Container booking,
              road transport, fleet ownership and commission agency services — with Pan India reach.
            </p>
            <p class="footer-tagline">Your Cargo, Our Responsibility</p>
          </div>

          <div>
            <h3>Services</h3>
            <ul>
              ${D.SERVICES.map((s) => html`<li key=${s.id}><a href="#services">${s.title}</a></li>`)}
            </ul>
          </div>

          <div>
            <h3>Quick links</h3>
            <ul>
              ${D.NAV.map((n) => html`<li key=${n.id}><a href=${"#" + n.id}>${n.label}</a></li>`)}
              <li><a href="#contact">Point of contact</a></li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              ${D.CONTACT.phones.map((p) => html`<li key=${p.raw}><a href=${"tel:+" + p.raw}>${p.number}</a></li>`)}
              <li><a href=${"mailto:" + D.CONTACT.email}>${D.CONTACT.email}</a></li>
              <li>${D.CONTACT.address.line1}</li>
              <li>${D.CONTACT.address.line2}</li>
              <li>GSTIN: ${D.CONTACT.gst}</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© ${year} Om Shiv Logistics. All rights reserved.</span>
          <span class="gst">Logistics · Connecting · Growth</span>
          <span>Gandhidham · Kutch · Gujarat</span>
        </div>
      </div>
    `;
  }

  /* ----------------------------------------------------------- float/mobile */
  function FloatActions() {
    const wa =
      "https://wa.me/" + D.CONTACT.whatsapp + "?text=" + encodeURIComponent("Hello Om Shiv Logistics, I need a vehicle placement.");
    return html`
      <a class="fab fab--wa" href=${wa} target="_blank" rel="noopener" aria-label="Chat with Om Shiv Logistics on WhatsApp">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
      </a>
      <a class="fab fab--call" href=${"tel:+" + D.CONTACT.phones[0].raw} aria-label="Call the transport booking line">
        <i class="fa-solid fa-phone" aria-hidden="true"></i>
      </a>
      <button
        class="fab fab--call"
        type="button"
        aria-label="Back to top"
        style=${{ background: "#0a1626" }}
        onClick=${() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
      </button>
    `;
  }

  function MobileBar() {
    return html`
      <a class="btn btn--primary" href=${"tel:+" + D.CONTACT.phones[0].raw}>
        <i class="fa-solid fa-phone" aria-hidden="true"></i> Call
      </a>
      <a
        class="btn btn--dark"
        style=${{ background: "#25d366" }}
        href=${"https://wa.me/" + D.CONTACT.whatsapp + "?text=" + encodeURIComponent("Hello Om Shiv Logistics, I need a vehicle placement.")}
        target="_blank"
        rel="noopener"
      >
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
      </a>
      <a class="btn btn--outline" style=${{ borderColor: "rgba(255,255,255,.4)", color: "#fff" }} href="#enquiry">
        <i class="fa-solid fa-file-invoice-dollar" aria-hidden="true"></i> Quote
      </a>
    `;
  }

  window.OSL_COMPONENTS = {
    Logo,
    useReveal,
    ScrollProgress,
    Header,
    Hero,
    Marquee,
    Services,
    Fleet,
    WhyUs,
    HowWeWork,
    Estimator,
    Lanes,
    DispatchBoard,
    EnquiryForm,
    Faq,
    Posters,
    Contact,
    Footer,
    FloatActions,
    MobileBar
  };
})();
