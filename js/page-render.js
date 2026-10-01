/* ==========================================================================
   OM SHIV LOGISTICS — inner page renderer (no build step, no framework)

   Every inner page is a real static HTML document with a real URL, its own
   <title>, description and canonical in the raw source, and a <noscript> block
   that repeats the substantive content. This file then renders the formatted
   body of that page from the registry in js/pages.js.

   Keeping the content in the registry (rather than duplicating it 14 times)
   means the NAP data, breadcrumbs, footer and structured data can never drift
   between pages — which is exactly what breaks local SEO.
   ========================================================================== */
(function () {
  "use strict";

  var P = window.OSL_PAGES;
  if (!P) return;

  var SITE = P.SITE;
  var PHONES = P.PHONES;
  var MAIL = P.MAIL;
  var MAPS = P.MAPS;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function telHref(raw) {
    return "tel:+" + raw;
  }

  function waHref(text) {
    return "https://wa.me/" + P.WHATSAPP + "?text=" + encodeURIComponent(text);
  }

  function pageKey() {
    var k = document.body.getAttribute("data-page");
    if (k && P.PAGES[k]) return k;
    var p = window.location.pathname.replace(/index\.html$/, "");
    if (P.PAGES[p]) return p;
    return null;
  }

  /* ---------------------------------------------------------- breadcrumbs -- */
  function crumbs(key, page) {
    var trail = [{ path: "/", label: "Home" }];
    if (page.parent) trail.push({ path: page.parent.path, label: page.parent.label });
    if (page.crumb) trail.push({ path: key, label: page.crumb });
    return trail;
  }

  function crumbHTML(trail) {
    var parts = trail.map(function (c, i) {
      var last = i === trail.length - 1;
      if (last) return '<li><span aria-current="page">' + esc(c.label) + "</span></li>";
      return '<li><a href="' + esc(c.path) + '">' + esc(c.label) + "</a></li>";
    });
    return (
      '<nav class="breadcrumbs" aria-label="Breadcrumb"><div class="shell"><ol>' +
      parts.join('<li class="sep" aria-hidden="true">/</li>') +
      "</ol></div></nav>"
    );
  }

  function crumbLD(trail) {
    return {
      "@type": "BreadcrumbList",
      "@id": SITE + trail[trail.length - 1].path + "#breadcrumb",
      itemListElement: trail.map(function (c, i) {
        return {
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: SITE + c.path
        };
      })
    };
  }

  /* --------------------------------------------------------------- blocks -- */
  function blockHTML(b) {
    var h = "";
    if (b.type === "h2") {
      return '<h2 class="page-h2">' + esc(b.text) + "</h2>";
    }
    if (b.type === "h3") {
      return '<h3 class="page-h3">' + esc(b.text) + "</h3>";
    }
    if (b.type === "p") {
      return "<p>" + esc(b.text) + "</p>";
    }
    if (b.type === "list") {
      h = b.title ? '<h3 class="page-h3">' + esc(b.title) + "</h3>" : "";
      h += '<ul class="page-list">';
      h += b.items
        .map(function (i) {
          return "<li><svg class=\"tick\" viewBox=\"0 0 20 20\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M4 10.5l4 4 8-9\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>" + esc(i) + "</span></li>";
        })
        .join("");
      h += "</ul>";
      return h;
    }
    if (b.type === "cards") {
      return (
        '<ul class="card-grid">' +
        b.items
          .map(function (c) {
            return (
              '<li class="card-link"><a href="' + esc(c.href) + '">' +
              '<span class="card-link__title">' + esc(c.title) + "</span>" +
              '<svg class="card-link__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              (c.text ? "<span class=\"card-link__text\">" + esc(c.text) + "</span>" : "") +
              "</a></li>"
            );
          })
          .join("") +
        "</ul>"
      );
    }
    if (b.type === "links" || b.type === "internal") {
      h = b.title ? '<h2 class="page-h2">' + esc(b.title) + "</h2>" : "";
      h += '<ul class="inline-links">';
      h += b.items
        .map(function (i) {
          return '<li><a href="' + esc(i.path) + '">' + esc(i.label) + "</a></li>";
        })
        .join("");
      h += "</ul>";
      return h;
    }
    if (b.type === "image") {
      return (
        '<figure class="page-figure">' +
        '<img src="' + esc("/" + b.src) + '" width="' + b.width + '" height="' + b.height +
        '" alt="' + esc(b.alt) + '" loading="lazy" decoding="async" />' +
        "</figure>"
      );
    }
    if (b.type === "cta") {
      return (
        '<p class="page-cta"><a class="btn btn--primary" href="' + esc(b.href) + '">' +
        esc(b.label) + "</a></p>"
      );
    }
    if (b.type === "faq") {
      return faqHTML(b);
    }
    if (b.type === "contact") {
      return contactHTML();
    }
    if (b.type === "map") {
      return mapHTML();
    }
    if (b.type === "quoteForm") {
      return formHTML();
    }
    if (b.type === "todo") {
      return (
        '<aside class="todo-note" role="note">' +
        '<span class="todo-note__label">To be confirmed by the site owner</span>' +
        "<p>" + esc(b.text) + "</p></aside>"
      );
    }
    return "";
  }

  /* --------------------------------------------------------------- FAQ ----- */
  function faqHTML(b) {
    var h = b.title ? '<h2 class="page-h2">' + esc(b.title) + "</h2>" : "";
    h += '<div class="faq-list">';
    h += b.items
      .map(function (item, i) {
        var id = "faq-p-" + i;
        return (
          '<details class="faq-item"' + (i === 0 ? " open" : "") + ">" +
          '<summary id="' + id + '-q"><span>' + esc(item.q) + "</span>" +
          '<svg class="faq-chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          "</summary>" +
          '<div class="faq-answer"><p>' + esc(item.a) + "</p></div>" +
          "</details>"
        );
      })
      .join("") + "</div>";
    return h;
  }

  function faqLD(items) {
    return {
      "@type": "FAQPage",
      mainEntity: items.map(function (i) {
        return {
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a }
        };
      })
    };
  }

  /* ------------------------------------------------------------- contact --- */
  function contactHTML() {
    var line = function (label, number, raw, note) {
      return (
        '<li><span class="c-label">' + esc(label) + "</span>" +
        '<a class="c-value" href="' + telHref(raw) + '">' + esc(number) + "</a>" +
        (note ? '<span class="c-note">' + esc(note) + "</span>" : "") +
        "</li>"
      );
    };
    return (
      '<div class="contact-stack">' +
      '<section class="panel" aria-labelledby="cs-phone"><h3 id="cs-phone">Call us</h3><ul class="contact-rows">' +
      line("Transport Booking", PHONES[0].number, PHONES[0].raw, "Primary line for bookings and quotations") +
      line("Fleet & Dispatch", PHONES[1].number, PHONES[1].raw, "Vehicle placement and dispatch coordination") +
      line("Operations & Support", PHONES[2].number, PHONES[2].raw, "Documentation, transit updates and escalation — staffed 24/7") +
      "</ul></section>" +
      '<section class="panel" aria-labelledby="cs-mail"><h3 id="cs-mail">Email us</h3><ul class="contact-rows">' +
      '<li><span class="c-label">Business enquiries</span><a class="c-value" href="mailto:' + MAIL + '">' + MAIL + "</a>" +
      '<span class="c-note">Kutch operations inbox — quotes and documentation</span></li>' +
      '<li><span class="c-label">General enquiries</span><a class="c-value" href="mailto:' + P.MAIL_GENERAL + '">' + P.MAIL_GENERAL + "</a>" +
      '<span class="c-note">Corporate correspondence and vendor onboarding</span></li>' +
      "</ul></section>" +
      '<section class="panel" aria-labelledby="cs-office"><h3 id="cs-office">Visit us</h3>' +
      '<address class="nap">' +
      "<strong>Om Shiv Logistics</strong><br />North Flour Mill Building, Office No. 203,<br />" +
      "Zhanda Chowk, Gandhidham 370201,<br />Kutch, Gujarat, India</address>" +
      '<p class="nap-note">Please call ahead before visiting — the dispatch desk is often out coordinating vehicle placement.</p>' +
      '<a class="btn btn--primary" href="' + MAPS + '" target="_blank" rel="noopener" aria-label="Get directions to Om Shiv Logistics, Gandhidham, on Google Maps">' +
      '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z" fill="currentColor"/></svg>' +
      "Get Directions</a>" +
      "</section>" +
      "</div>"
    );
  }

  /* --------------------------------------------------- lazy Google Map -----
     Nothing is requested from Google until the visitor opts in, so the map
     costs zero bytes and zero cookies on first paint. Space is reserved with
     an aspect-ratio box, so switching it on cannot shift the layout (CLS). */
  function mapHTML() {
    return (
      '<div class="map-facade" id="map-facade">' +
      '<div class="map-facade__box">' +
      '<button type="button" class="map-facade__btn" id="map-load" ' +
      'aria-label="Load the interactive Google Map of the Om Shiv Logistics office in Gandhidham">' +
      '<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" focusable="false"><path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z" fill="currentColor"/></svg>' +
      "<span>Load interactive map</span>" +
      '<small>Loads Google Maps. Google may set cookies. Our office: North Flour Mill Building, Office No. 203, Zhanda Chowk, Gandhidham 370201.</small>' +
      "</button></div>" +
      '<p class="map-facade__alt">' +
      '<a class="btn btn--primary" href="' + MAPS + '" target="_blank" rel="noopener" aria-label="Open the Om Shiv Logistics location in Google Maps in a new tab">Get Directions</a>' +
      '<a class="btn btn--outline" href="' + MAPS + '" target="_blank" rel="noopener">View on Google Maps</a>' +
      "</p></div>"
    );
  }

  /* ------------------------------------------------------------ quote form --
     Delivery has two paths so a lead is never silently lost:
       1. POST to the table API (works on the preview and quick-share hosts).
       2. If that is unavailable, hand the same details to the visitor's mail
          client addressed to the business inbox.
     Spam controls: a honeypot field, plus a minimum time-on-form trap. */
  function formHTML() {
    var services = [
      "32FT container booking (SXL / MXL)",
      "FTL road transport",
      "PTL road transport",
      "Commercial vehicle supply",
      "Long-term transport contract",
      "Commission agency / vehicle sourcing",
      "Kandla or Mundra port movement",
      "Something else"
    ];
    return (
      '<span id="quote" class="anchor-target" aria-hidden="true"></span>' +
      '<form class="quote-form" id="quote-form" novalidate>' +
      '<h3 class="quote-form__title">Tell us about the movement</h3>' +
      '<p class="quote-form__intro">Fields marked * are required. If the POST below is unavailable your mail client will open with the same details, so nothing is lost.</p>' +
      '<div class="form-row">' +
      '<label for="qf-name">Your name *</label>' +
      '<input id="qf-name" name="name" type="text" autocomplete="name" required />' +
      "</div>" +
      '<div class="form-grid">' +
      '<div class="form-row"><label for="qf-phone">Phone *</label>' +
      '<input id="qf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required /></div>' +
      '<div class="form-row"><label for="qf-email">Email</label>' +
      '<input id="qf-email" name="email" type="email" autocomplete="email" /></div>' +
      "</div>" +
      '<div class="form-row"><label for="qf-company">Company</label>' +
      '<input id="qf-company" name="company" type="text" autocomplete="organization" /></div>' +
      '<div class="form-row"><label for="qf-service">What do you need?</label>' +
      '<select id="qf-service" name="service"><option value="">Select a service</option>' +
      services.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + "</option>"; }).join("") +
      "</select></div>" +
      '<div class="form-grid">' +
      '<div class="form-row"><label for="qf-from">Pickup location</label>' +
      '<input id="qf-from" name="from_city" type="text" /></div>' +
      '<div class="form-row"><label for="qf-to">Delivery location</label>' +
      '<input id="qf-to" name="to_city" type="text" /></div>' +
      "</div>" +
      '<div class="form-grid">' +
      '<div class="form-row"><label for="qf-vehicle">Vehicle / container</label>' +
      '<input id="qf-vehicle" name="vehicle" type="text" placeholder="e.g. 32FT MXL, multi-axle" /></div>' +
      '<div class="form-row"><label for="qf-date">Preferred loading date</label>' +
      '<input id="qf-date" name="pickup_date" type="date" /></div>' +
      "</div>" +
      '<div class="form-row"><label for="qf-load">Load details</label>' +
      '<textarea id="qf-load" name="load_details" rows="4" placeholder="Material, approximate weight, package count, any handling or documentation requirement"></textarea></div>' +
      '<div class="form-row form-row--hp" aria-hidden="true">' +
      '<label for="qf-company-url">Leave this field empty</label>' +
      '<input id="qf-company-url" name="company_url" type="text" tabindex="-1" autocomplete="off" />' +
      "</div>" +
      '<input type="hidden" name="source" value="contact-page-quote-form" />' +
      '<p class="form-status" id="qf-status" role="status" aria-live="polite"></p>' +
      '<div class="form-actions">' +
      '<button class="btn btn--primary" type="submit" id="qf-submit">Request a quote</button>' +
      '<a class="btn btn--outline" href="tel:+' + PHONES[0].raw + '">Or call ' + PHONES[0].number + "</a>" +
      "</div>" +
      '<p class="form-consent">By sending this you agree that we may use the details to quote and contact you. See our <a href="/privacy-policy/">privacy policy</a>.</p>' +
      "</form>"
    );
  }

  /* -------------------------------------------------------------- header --- */
  function headerHTML(key) {
    var items = [
      { path: "/", label: "Home", match: "home" },
      { path: "/services/", label: "Services", match: "/services/" },
      { path: "/locations/kutch/", label: "Locations", match: "/locations/" },
      { path: "/about/", label: "About", match: "/about/" },
      { path: "/contact/", label: "Contact", match: "/contact/" }
    ];
    return (
      '<div class="header-inner shell">' +
      '<a class="brand" href="/" aria-label="Om Shiv Logistics — home">' +
      '<span class="logo-mark"><img src="/images/osl-logo-mark.png" alt="Om Shiv Logistics logo" decoding="async" /></span>' +
      '<span class="brand__text"><span class="brand__name">Om Shiv Logistics</span>' +
      '<span class="brand__tag">Transportation Redefined</span></span></a>' +
      '<nav id="main-navigation" class="main-nav" aria-label="Main navigation">' +
      items.map(function (i) {
        var cur = typeof i.match === "string" && key && key.indexOf(i.match) === 0;
        return '<a href="' + i.path + '"' + (cur ? ' aria-current="page"' : "") + ">" + i.label + "</a>";
      }).join("") +
      "</nav>" +
      '<div class="header-actions">' +
      '<a class="header-call" href="' + telHref(PHONES[0].raw) + '">' + PHONES[0].number + "</a>" +
      '<a class="btn btn--primary btn--sm" href="/contact/#quote">Get a Quote</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-navigation" aria-label="Open menu" id="nav-toggle">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>' +
      "</button></div></div>"
    );
  }

  /* -------------------------------------------------------------- footer --- */
  function footerHTML() {
    var year = new Date().getFullYear();
    return (
      '<div class="shell"><div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<span class="logo-lockup"><img src="/images/osl-logo-full.png" alt="Om Shiv Logistics logo" decoding="async" /></span>' +
      "<p>B2B fleet owner and transport contractor based in Gandhidham, Kutch. Container booking, road transport, fleet ownership and commission agency services — with Pan India reach.</p>" +
      '<p class="footer-tagline">Your Cargo, Our Responsibility</p></div>' +

      "<div><h3>Services</h3><ul>" +
      P.SERVICE_LINKS.map(function (s) { return '<li><a href="' + s.path + '">' + esc(s.label) + "</a></li>"; }).join("") +
      "</ul></div>" +

      "<div><h3>Company</h3><ul>" +
      '<li><a href="/">Home</a></li>' +
      '<li><a href="/about/">About OSL</a></li>' +
      '<li><a href="/contact/">Contact</a></li>' +
      P.CITY_LINKS.map(function (c) { return '<li><a href="' + c.path + '">Transport in ' + esc(c.label) + "</a></li>"; }).join("") +
      '<li><a href="/privacy-policy/">Privacy Policy</a></li>' +
      '<li><a href="/terms/">Terms of Use</a></li>' +
      "</ul></div>" +

      "<div><h3>Contact</h3><ul class=\"footer-contact\">" +
      PHONES.map(function (p) {
        return '<li><a href="' + telHref(p.raw) + '">' + esc(p.label) + " — " + esc(p.number) + "</a></li>";
      }).join("") +
      '<li><a href="mailto:' + MAIL + '">' + MAIL + "</a></li>" +
      '<li><a href="mailto:' + P.MAIL_GENERAL + '">' + P.MAIL_GENERAL + "</a></li>" +
      "<li><address class=\"footer-nap\">Om Shiv Logistics, North Flour Mill Building, Office No. 203, Zhanda Chowk, Gandhidham 370201, Kutch, Gujarat, India</address></li>" +
      '<li><a class="footer-maps" href="' + MAPS + '" target="_blank" rel="noopener" aria-label="View the Om Shiv Logistics office location on Google Maps">View on Google Maps</a></li>' +
      "</ul></div></div>" +

      '<div class="footer-bottom">' +
      "<span>© " + year + " Om Shiv Logistics. All rights reserved.</span>" +
      '<span class="footer-motto">Logistics · Connecting · Growth</span>' +
      "<span>Gandhidham · Kutch · Gujarat</span>" +
      "</div></div>"
    );
  }

  /* ---------------------------------------------------- structured data ---- */
  function pageLD(key, page, trail) {
    var url = SITE + key;
    var graph = [
      crumbLD(trail),
      {
        "@type": page.schemaType === "Service" ? "Service" : page.schemaType,
        "@id": url + "#webpage",
        url: url,
        name: page.title,
        description: page.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": SITE + "/#website" },
        about: { "@id": SITE + "/#business" },
        breadcrumb: { "@id": SITE + key + "#breadcrumb" },
        provider: { "@id": SITE + "/#business" },
        publisher: { "@id": SITE + "/#business" }
      }
    ];
    if (page.schemaType === "Service") {
      graph[1] = {
        "@type": "Service",
        "@id": url + "#service",
        name: page.serviceName || page.h1,
        serviceType: page.serviceName || page.h1,
        description: page.description,
        url: url,
        provider: { "@id": SITE + "/#business" },
        areaServed: [
          { "@type": "City", name: "Gandhidham" },
          { "@type": "AdministrativeArea", name: "Kutch" },
          { "@type": "State", name: "Gujarat" },
          { "@type": "Country", name: "India" }
        ],
        mainEntityOfPage: { "@id": url + "#webpage" }
      };
      graph.push({
        "@type": "WebPage",
        "@id": url + "#webpage",
        url: url,
        name: page.title,
        description: page.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": SITE + "/#website" },
        breadcrumb: { "@id": SITE + key + "#breadcrumb" },
        about: { "@id": url + "#service" }
      });
    }
    /* Any FAQ rendered on this page becomes its own FAQPage node. */
    (page.blocks || []).forEach(function (b) {
      if (b.type === "faq" && b.items) {
        var node = faqLD(b.items);
        node["@id"] = url + "#faq";
        node.isPartOf = { "@id": url + "#webpage" };
        graph.push(node);
      }
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  function injectLD(obj) {
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj, null, 2);
    document.head.appendChild(s);
  }

  /* ----------------------------------------------------------- mount ------- */
  function bindNav() {
    var btn = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-navigation");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  function bindMap() {
    var btn = document.getElementById("map-load");
    /* The embed URL is derived from the listing's own place query, generated by
       Google's documented Maps URL API — not from hand-typed coordinates. */
    var full =
      "https://www.google.com/maps?q=" +
      encodeURIComponent("Om Shiv Logistics, North Flour Mill Building, Office No. 203, Zhanda Chowk, Gandhidham 370201, Kutch, Gujarat") +
      "&output=embed";
    if (btn) {
      btn.addEventListener("click", function () {
        var f = document.createElement("iframe");
        f.src = full;
        f.width = "100%";
        f.height = "100%";
        f.style.border = "0";
        f.loading = "lazy";
        f.referrerPolicy = "no-referrer-when-downgrade";
        f.setAttribute("title", "Google Map showing the Om Shiv Logistics office in Gandhidham, Kutch");
        f.setAttribute("aria-label", "Google Map showing the Om Shiv Logistics office in Gandhidham, Kutch");
        var host = document.getElementById("map-facade");
        if (host) {
          host.innerHTML = "";
          host.className = "map-facade map-facade--loaded";
          host.appendChild(f);
        }
        if (window.OSL_ANALYTICS) {
          window.OSL_ANALYTICS.event("view_map", { link_url: "google-maps-embed", link_text: "Contact page map facade" });
        }
      });
    }
  }

  function bindForm() {
    var form = document.getElementById("quote-form");
    if (!form) return;
    var status = document.getElementById("qf-status");
    var submit = document.getElementById("qf-submit");
    var started = Date.now();
    var sent = false;

    function setStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status is-" + kind;
    }

    function collect() {
      var fd = new FormData(form);
      var out = {};
      fd.forEach(function (v, k) {
        out[k] = typeof v === "string" ? v.trim() : v;
      });
      return out;
    }

    function toMailto(data) {
      var body = [
        "Name: " + (data.name || ""),
        "Company: " + (data.company || ""),
        "Phone: " + (data.phone || ""),
        "Email: " + (data.email || ""),
        "Service: " + (data.service || ""),
        "Pickup: " + (data.from_city || ""),
        "Delivery: " + (data.to_city || ""),
        "Vehicle / container: " + (data.vehicle || ""),
        "Loading date: " + (data.pickup_date || ""),
        "",
        "Load details:",
        data.load_details || ""
      ].join("\n");
      return (
        "mailto:" + MAIL +
        "?subject=" + encodeURIComponent("Freight quote request — " + (data.company || data.name || "website enquiry")) +
        "&body=" + encodeURIComponent(body)
      );
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (sent) return;

      var data = collect();

      /* Honeypot: a real person never fills this. Deliberately silent. */
      if (data.company_url) {
        setStatus("Thank you — your request has been received.", "ok");
        sent = true;
        return;
      }
      /* Time trap: an instant submit is a bot. */
      if (Date.now() - started < 2500) {
        setStatus("Please take a moment to check your details, then send again.", "warn");
        return;
      }
      if (!data.name || !data.phone) {
        setStatus("Please add your name and a phone number so we can call you back.", "warn");
        return;
      }

      var payload = {
        reference: "OSL-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.floor(1000 + Math.random() * 9000),
        name: data.name,
        company: data.company || "",
        phone: data.phone,
        email: data.email || "",
        service: data.service || "",
        vehicle: data.vehicle || "",
        from_city: data.from_city || "",
        to_city: data.to_city || "",
        load_details: data.load_details || "",
        pickup_date: data.pickup_date || "",
        message: "",
        source: data.source || "contact-page-quote-form",
        status: "new",
        created_at: new Date().toISOString()
      };

      if (submit) { submit.disabled = true; submit.textContent = "Sending…"; }
      setStatus("Sending your request…", "wait");

      var apiUrl = window.location.origin + "/tables/inquiries";
      var done = function (ok, method) {
        sent = true;
        if (submit) { submit.disabled = false; submit.textContent = "Request a quote"; }
        if (ok) {
          form.reset();
          setStatus("Thank you — your request has been logged as " + payload.reference +
            ". Our team will call you on " + data.phone + " to confirm availability and rates. " +
            "For anything urgent, call +91 93745 29413.", "ok");
          if (window.OSL_ANALYTICS) {
            window.OSL_ANALYTICS.lead("contact-page-quote-form", {
              delivery_method: method,
              service_requested: payload.service || "not-specified",
              has_company: payload.company ? "yes" : "no",
              has_email: payload.email ? "yes" : "no"
            });
          }
        } else {
          setStatus("We could not submit the form automatically. Your mail client is opening with the same details — " +
            "or call +91 93745 29413. Nothing you typed has been lost.", "warn");
          window.location.href = toMailto(data);
        }
      };

      var req;
      try {
        req = fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } catch (e) {
        done(false, "mailto-fallback");
        return;
      }
      req
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          done(true, "table-api");
        })
        .catch(function () {
          done(false, "mailto-fallback");
        });
    });
  }

  function bindReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(nodes, function (n) { n.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  function render() {
    var key = pageKey();
    if (!key) return;
    var page = P.PAGES[key];
    var trail = crumbs(key, page);

    var shell = document.getElementById("site-header");
    if (shell) shell.innerHTML = headerHTML(key);

    var main = document.getElementById("page-main");
    if (main) {
      var out = crumbHTML(trail);
      out +=
        '<section class="page-hero"><div class="shell">' +
        '<span class="eyebrow">' + esc(page.crumb || "Om Shiv Logistics") + "</span>" +
        "<h1>" + esc(page.h1) + "</h1>" +
        (page.lede ? '<p class="lede">' + esc(page.lede) + "</p>" : "") +
        "</div></section>";
      out += '<section class="page-body"><div class="shell"><article class="prose">';
      out += (page.blocks || []).map(blockHTML).join("");
      out += "</article></div></section>";
      main.innerHTML = out;
    }

    var footer = document.getElementById("site-footer");
    if (footer) footer.innerHTML = footerHTML();

    var bar = document.getElementById("mobile-bar");
    if (bar) {
      bar.innerHTML =
        '<a class="btn btn--primary" href="' + telHref(PHONES[0].raw) + '" aria-label="Call the Om Shiv Logistics transport booking line">Call ' + PHONES[0].number + "</a>" +
        '<a class="btn btn--dark" style="background:#25d366" href="' + waHref("Hello Om Shiv Logistics, I would like to discuss a freight requirement.") + '" target="_blank" rel="noopener">WhatsApp</a>' +
        '<a class="btn btn--outline" style="border-color:rgba(255,255,255,.4);color:#fff" href="/contact/">Quote</a>';
    }

    var fab = document.getElementById("float-actions");
    if (fab) {
      fab.innerHTML =
        '<a class="fab fab--wa" href="' + waHref("Hello Om Shiv Logistics, I would like to discuss a freight requirement.") + '" target="_blank" rel="noopener" aria-label="Chat with Om Shiv Logistics on WhatsApp">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M12 2a9.9 9.9 0 00-8.5 15L2 22l5.2-1.4A10 10 0 1012 2zm5.5 14.1c-.2.6-1.3 1.2-1.8 1.2s-1.3 0-2.9-.8a11 11 0 01-4.3-4.2c-.6-1.1-.8-2-.8-2.7s.5-1.5 1-1.8a.9.9 0 011.2.4l.7 1.6a.9.9 0 01-.2 1l-.6.7a7.6 7.6 0 003.3 3.2l.7-.7a.9.9 0 011-.2l1.6.8a.9.9 0 01.1 1.5z" fill="currentColor"/></svg></a>' +
        '<a class="fab fab--call" href="' + telHref(PHONES[0].raw) + '" aria-label="Call the Om Shiv Logistics transport booking line">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.2 11 11 0 003.4.5 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11 11 0 00.5 3.4 1 1 0 01-.2 1z" fill="currentColor"/></svg></a>';
    }

    document.title = page.title;
    injectLD(pageLD(key, page, trail));

    bindNav();
    bindMap();
    bindForm();
    bindReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
