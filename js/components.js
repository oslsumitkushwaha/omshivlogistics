/* ==========================================================================
   OM SHIV LOGISTICS — React components (React 18 + htm, no build step)
   ========================================================================== */
(function () {
  "use strict";

  const { useState, useEffect, useRef } = React;
  const html = htm.bind(React.createElement);
  const D = window.OSL_DATA;

  const pad = (n) => String(n).padStart(2, "0");

  /* Smooth-scroll helper: accounts for the fixed header height. */
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 84, behavior: "smooth" });
  }
  const waLink = (msg) =>
    "https://wa.me/" + D.CONTACT.whatsapp + "?text=" + encodeURIComponent(msg);

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
    const active = useActiveSection(D.NAV.map((n) => n.id));

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
      scrollToId(id);
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
          <button class="btn btn--primary btn--sm" onClick=${(e) => go(e, "contact")} type="button">
            <i class="fa-solid fa-headset" aria-hidden="true"></i> Get a Quote
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
        aria-label="Map of the Om Shiv Logistics pan-India transport network with Gandhidham as the central hub"
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
    return html`
      <section class="hero" id="top">
        <span class="hero__glow" aria-hidden="true"></span>
        <span class="hero__glow hero__glow--2" aria-hidden="true"></span>

        <div class="shell hero__grid">
          <div class="hero__copy">
            <span class="hero__route-chip">
              <span class="pulse-dot" aria-hidden="true"></span>
              <b>Gandhidham, Kutch</b> · Serving clients across India
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
              <button class="btn btn--primary" type="button" onClick=${() => scrollToId("contact")}>
                <i class="fa-solid fa-file-invoice-dollar" aria-hidden="true"></i> Request a Freight Quote
              </button>
              <button class="btn btn--ghost" type="button" onClick=${() => scrollToId("services")}>
                <i class="fa-solid fa-list-check" aria-hidden="true"></i> View Our Services
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
            lede="Four core specialisations, one accountable team. Whether you need a single container next week or a dedicated fleet for the year, the workflow is built around your dispatch calendar."
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
              { v: "500+", l: "Commercial vehicles" },
              { v: "10 Tyre+", l: "Own fleet class" },
              { v: "Kutch", l: "Home region" },
              { v: "24/7", l: "Operations support" }
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

  /* -------------------------------------------------------------- segments -- */
  /* Who we serve — taken from the client's brief, kept factual. */
  function Segments() {
    return html`
      <section class="section section--tight" id="industries">
        <div class="shell">
          <${SectionHead}
            eyebrow="Who we work with"
            title="Built for industrial and distribution supply chains"
            lede="We work business-to-business, with companies that need dependable capacity rather than one-off spot bookings."
          />
          <div class="segment-grid">
            ${D.SEGMENTS.map(
              (s) => html`
                <article class="segment-card reveal" key=${s.title}>
                  <span class="segment-card__icon" aria-hidden="true"><i class=${"fa-solid " + s.icon}></i></span>
                  <div>
                    <h3>${s.title}</h3>
                    <p>${s.text}</p>
                  </div>
                </article>
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
      <section class="section section--alt" id="why-us">
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
      <section class="section" id="how-we-work">
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
                <li><strong>Quick vehicle sourcing</strong> — rapid sourcing of certified backup fleets during demand peaks.</li>
                <li><strong>Route planning</strong> — regional traffic, seasonal infrastructure challenges and toll systems factored in.</li>
                <li><strong>Cost management</strong> — structuring load layouts to bring down freight cost per tonne.</li>
                <li><strong>Professional fleet support</strong> — credentialed commercial drivers vetted for safety and heavy-load regulations.</li>
              </ul>
            </div>
          </div>
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

    return html`
      <section class="section section--dark" id="network">
        <div class="shell">
          <div class="two-col" style=${{ gap: "36px" }}>
            <div class="reveal">
              <span class="eyebrow on-dark">Network and coverage</span>
              <h2 style=${{ fontSize: "clamp(1.4rem,2.7vw,2.05rem)" }}>Movement across the lanes we run</h2>
              <p class="lede on-dark">
                Our home ground is Gandhidham and the wider Kutch belt, connecting the Kandla and Mundra
                port cluster to major consumption and industrial hubs across India. The panel alongside
                shows a sample of the consignment types moving through our dispatch desk.
              </p>
              <div class="pill-row">
                <span class="pill" style=${{ background: "rgba(255,255,255,.07)", color: "#fff" }}>
                  <i class="fa-solid fa-bell" aria-hidden="true"></i>Dispatch coordination
                </span>
                <span class="pill" style=${{ background: "rgba(255,255,255,.07)", color: "#fff" }}>
                  <i class="fa-solid fa-user-shield" aria-hidden="true"></i>Credentialed drivers
                </span>
                <span class="pill" style=${{ background: "rgba(255,255,255,.07)", color: "#fff" }}>
                  <i class="fa-solid fa-tower-broadcast" aria-hidden="true"></i>24/7 support lines
                </span>
              </div>
              <button class="btn btn--primary" type="button" style=${{ marginTop: "26px" }} onClick=${() => scrollToId("contact")}>
                <i class="fa-solid fa-truck-arrow-right" aria-hidden="true"></i> Enquire About Your Lane
              </button>
            </div>

            <div class="panel panel--dark reveal" aria-label="Sample network activity">
              <h3 style=${{ fontSize: ".72rem", letterSpacing: ".13em", color: "#9db0c6", textTransform: "uppercase" }}>
                Sample consignment activity
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
              <p style=${{ fontSize: ".72rem", color: "#8fa0b6", margin: "16px 0 0" }}>
                Illustrative sample of the consignment types we handle — not a live consignment tracker.
              </p>
            </div>
          </div>
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
  /* Renders one value row, choosing the right element/link per item kind. */
  function ContactValue({ item }) {
    if (item.kind === "phone") {
      return html`<a class="contact-item__value" href=${"tel:+" + item.raw}>${item.value}</a>`;
    }
    if (item.kind === "whatsapp") {
      return html`
        <a
          class="contact-item__value"
          href=${waLink("Hello Om Shiv Logistics, I would like to discuss a freight requirement.")}
          target="_blank"
          rel="noopener"
          >${item.value}</a
        >
      `;
    }
    if (item.kind === "email") {
      return html`<a class="contact-item__value" href=${"mailto:" + item.value}>${item.value}</a>`;
    }
    if (item.kind === "address") {
      return html`
        <span class="contact-item__value contact-item__value--plain">
          ${item.value}
          ${item.extra ? html`<span class="contact-item__extra">${item.extra}</span>` : null}
        </span>
      `;
    }
    return html`<span class="contact-item__value contact-item__value--plain">${item.value}</span>`;
  }

  function Contact() {
    return html`
      <section class="section section--dark" id="contact">
        <div class="shell">
          <${SectionHead}
            eyebrow="Point of contact"
            title="Reach the right desk, first time"
            lede="Our contacts are grouped by what you need, so you are not routed through the wrong line. New enquiries, consignments already in transit, office visits and vendor onboarding each have their own route."
            dark=${true}
          />

          <div class="contact-groups">
            ${D.CONTACT_GROUPS.map(
              (g) => html`
                <section class="contact-group" data-accent=${g.accent} key=${g.id} aria-labelledby=${"cg-" + g.id}>
                  <header class="contact-group__head">
                    <span class="contact-group__icon" aria-hidden="true"><i class=${"fa-solid " + g.icon}></i></span>
                    <div>
                      <h3 id=${"cg-" + g.id}>${g.title}</h3>
                      <p class="contact-group__note">${g.note}</p>
                    </div>
                  </header>

                  <ul class="contact-items">
                    ${g.items.map(
                      (item, i) => html`
                        <li class="contact-item" key=${i}>
                          <span class="contact-item__label">${item.label}</span>
                          <${ContactValue} item=${item} />
                          ${item.note ? html`<span class="contact-item__note">${item.note}</span>` : null}
                        </li>
                      `
                    )}
                  </ul>
                </section>
              `
            )}
          </div>

          <div class="contact-cta reveal">
            <div>
              <h3>Not sure which line to use?</h3>
              <p>Call the transport booking desk and we will route you to the right person.</p>
            </div>
            <div class="contact-cta__actions">
              <a class="btn btn--primary" href=${"tel:+" + D.CONTACT.phones[0].raw}>
                <i class="fa-solid fa-phone" aria-hidden="true"></i> ${D.CONTACT.phones[0].number}
              </a>
              <a
                class="btn btn--ghost"
                href=${waLink("Hello Om Shiv Logistics, I would like to discuss a freight requirement.")}
                target="_blank"
                rel="noopener"
              >
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp Us
              </a>
            </div>
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
              <li><a href="#industries">Industries we serve</a></li>
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
    return html`
      <a
        class="fab fab--wa"
        href=${waLink("Hello Om Shiv Logistics, I would like to discuss a freight requirement.")}
        target="_blank"
        rel="noopener"
        aria-label="Chat with Om Shiv Logistics on WhatsApp"
      >
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
        href=${waLink("Hello Om Shiv Logistics, I would like to discuss a freight requirement.")}
        target="_blank"
        rel="noopener"
      >
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
      </a>
      <a class="btn btn--outline" style=${{ borderColor: "rgba(255,255,255,.4)", color: "#fff" }} href="#contact">
        <i class="fa-solid fa-address-book" aria-hidden="true"></i> Contact
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
    Segments,
    WhyUs,
    HowWeWork,
    DispatchBoard,
    Faq,
    Posters,
    Contact,
    Footer,
    FloatActions,
    MobileBar
  };
})();
