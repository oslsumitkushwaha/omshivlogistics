/* ==========================================================================
   OM SHIV LOGISTICS — Google Analytics 4 event layer
   Measurement ID: G-4H9SDR2W89

   Loaded by EVERY page. The gtag.js library and the config call live in the
   <head> of each page (immediately after <head>, never deferred); this file
   only adds the event layer on top of it.

   Events implemented, exactly as specified:
     · call_click        — every tel: link (all three lines)
     · email_click       — every mailto: link (both inboxes)
     · whatsapp_click    — every wa.me / WhatsApp click-to-chat link
     · directions_click  — the Google Maps listing link / Get Directions button
     · generate_lead     — a successful quote or contact form submission
     · page_view         — fired on real page loads, and on future hash routes
                           (#/path) if client-side routing is ever introduced

   Each event carries the clicked value as a parameter. The listeners are
   delegated on document, so they also cover elements React mounts later on
   the landing page — nothing has to be re-bound after render.
   ========================================================================== */
(function () {
  "use strict";

  function gtagSafe() {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
    return window.gtag;
  }

  function event(name, params) {
    try {
      gtagSafe()("event", name, params || {});
    } catch (err) {
      /* Analytics must never break the page. */
    }
    if (window.OSL_DEBUG_ANALYTICS && window.console && window.console.log) {
      window.console.log("[OSL analytics]", name, params || {});
    }
  }

  function pageView(pagePath, title) {
    try {
      gtagSafe()("event", "page_view", {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: title || document.title
      });
    } catch (err) {
      /* no-op */
    }
  }

  function closestAnchor(node) {
    while (node && node.nodeType === 1) {
      if (node.tagName === "A" && node.hasAttribute("href")) return node;
      node = node.parentNode;
    }
    return null;
  }

  /* Which of the three published lines / two inboxes was clicked, by matching
     the href against the known contact set. Falls back to the raw href. */
  function classify(href) {
    return { link_url: href };
  }

  function onClick(ev) {
    var a = closestAnchor(ev.target);
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var label = (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 120);

    if (/^tel:/i.test(href)) {
      var p = classify(href);
      p.phone_number = href.replace(/^tel:/i, "").replace(/[^\d+]/g, "");
      p.link_url = href;
      p.link_text = label;
      event("call_click", p);
      return;
    }

    if (/^mailto:/i.test(href)) {
      event("email_click", {
        email_address: href.replace(/^mailto:/i, "").split("?")[0],
        link_url: href,
        link_text: label
      });
      return;
    }

    if (/wa\.me|api\.whatsapp\.com|web\.whatsapp\.com/i.test(href)) {
      var num = (href.match(/(\d{8,15})/) || [])[1] || "";
      event("whatsapp_click", { whatsapp_number: num, link_url: href, link_text: label });
      return;
    }

    if (/maps\.app\.goo\.gl|google\.[a-z.]+\/maps|goo\.gl\/maps/i.test(href)) {
      event("directions_click", { link_url: href, link_text: label });
      return;
    }
  }

  /* Fires when a quote/contact form submission succeeds. Carries the form
     identifier, the service requested and non-identifying shape flags only —
     never the enquirer's name, phone or email. */
  function lead(source, extra) {
    var p = { lead_source: source || "unknown" };
    if (extra) {
      for (var k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) p[k] = extra[k];
      }
    }
    event("generate_lead", p);
  }

  function setup(opts) {
    opts = opts || {};
    document.addEventListener("click", onClick, true);

    /* Real URLs mean each page load already sends its own page_view via the
       config call in <head>. This only fires for genuine client-side routes
       (#/path), which the site does not currently use — kept so routing can be
       added later without silently losing page views. */
    if (!window.__oslHashPv) {
      window.__oslHashPv = true;
      window.addEventListener("hashchange", function () {
        var h = window.location.hash;
        if (h && h.indexOf("#/") === 0) {
          pageView(h.slice(1), document.title);
        }
      });
    }

    if (opts.pagePath && opts.trackInitial !== false) {
      /* Left to the gtag config call so the first page_view is not duplicated. */
    }
  }

  window.OSL_ANALYTICS = {
    setup: setup,
    event: event,
    pageView: pageView,
    lead: lead
  };

  /* Auto-start: the delegated listener set is installed once per page load. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setup({}); });
  } else {
    setup({});
  }
})();
