/* ==========================================================================
   OM SHIV LOGISTICS — content & configuration
   Single source of truth for copy, contacts, services and fleet data.

   COPY POLICY (important):
   Everything below is either taken from the client's own brief / posters, or is
   plainly descriptive. No invented statistics, no made-up transit times, no
   fabricated rate figures and no testimonials. Anything the client has not
   confirmed is either omitted or explicitly hedged.
   ========================================================================== */
(function () {
  "use strict";

  const CONTACT = {
    name: "Om Shiv Logistics",
    short: "OSL",
    tagline: "Transportation Redefined",
    claim: "Your Cargo, Our Responsibility",
    owner: "Indradev Kushwaha",
    ownerRole: "Fleet Owner",
    gst: "24EGFPK8451Q1ZQ",
    address: {
      line1: "North Flour Mill Building, Office No. 203",
      line2: "Zhanda Chowk, Gandhidham 370201",
      line3: "Kutch, Gujarat, India"
    },
    // Flat list kept for the header / footer / mobile bar.
    phones: [
      { label: "Transport Booking", number: "+91 93745 29413", raw: "919374529413" },
      { label: "Fleet & Dispatch", number: "+91 93744 29413", raw: "919374429413" },
      { label: "Operations & Support", number: "+91 92740 47949", raw: "919274047949" }
    ],
    email: "gandhidham@omshivlogistics.com",
    generalEmail: "contact@omshivlogistics.com",
    whatsapp: "919374529413"
  };

  /* ------------------------------------------------------------------------
     POINT OF CONTACT — grouped by information category so a visitor can tell
     at a glance which channel to use for what.
     -------------------------------------------------------------------- */
  const CONTACT_GROUPS = [
    {
      id: "commercial",
      icon: "fa-file-invoice-dollar",
      accent: "crimson",
      title: "Bookings, Pricing & Contracts",
      note: "Use these for new consignments, formal quotes and long-term transport contracts.",
      items: [
        {
          kind: "phone",
          label: "Transport Booking",
          value: "+91 93745 29413",
          raw: "919374529413",
          note: "Primary line for bookings and quotations"
        },
        {
          kind: "whatsapp",
          label: "WhatsApp Desk",
          value: "Chat on WhatsApp",
          raw: "919374529413",
          note: "Send load details, documents or drawings"
        },
        {
          kind: "email",
          label: "Business Enquiries",
          value: "gandhidham@omshivlogistics.com",
          note: "Kutch operations inbox — quotes and documentation"
        },
        {
          kind: "note",
          label: "Response Window",
          value: "New enquiries are answered during office hours",
          note: "For anything already in transit, use the operations lines below"
        }
      ]
    },
    {
      id: "operations",
      icon: "fa-tower-broadcast",
      accent: "navy",
      title: "Operations, Dispatch & 24/7 Support",
      note: "For consignments already booked — placement, transit updates and exceptions.",
      items: [
        {
          kind: "phone",
          label: "Fleet & Dispatch",
          value: "+91 93744 29413",
          raw: "919374429413",
          note: "Vehicle placement and dispatch coordination"
        },
        {
          kind: "phone",
          label: "Operations & Support",
          value: "+91 92740 47949",
          raw: "919274047949",
          note: "Documentation, transit and escalation"
        },
        {
          kind: "hours",
          label: "Support Lines",
          value: "24 / 7 round-the-clock",
          note: "Backed by active transport oversight"
        }
      ]
    },
    {
      id: "office",
      icon: "fa-location-dot",
      accent: "gold",
      title: "Head Office",
      note: "Gandhidham, Kutch — the base of our fleet and dispatch operations.",
      items: [
        {
          kind: "address",
          label: "Office Address",
          value: "North Flour Mill Building, Office No. 203",
          extra: "Zhanda Chowk, Gandhidham 370201",
          note: "Kutch, Gujarat, India"
        },
        {
          kind: "note",
          label: "Visits",
          value: "Please call ahead to confirm availability",
          note: "Site and warehouse visits can be arranged on request"
        }
      ]
    },
    {
      id: "statutory",
      icon: "fa-file-shield",
      accent: "slate",
      title: "Business & Statutory Details",
      note: "For vendor onboarding, purchase departments and accounts teams.",
      items: [
        {
          kind: "person",
          label: "Proprietor",
          value: "Indradev Kushwaha",
          note: "Fleet Owner"
        },
        {
          kind: "gst",
          label: "GSTIN",
          value: "24EGFPK8451Q1ZQ",
          note: "Compliant tax invoicing on all bookings"
        },
        {
          kind: "email",
          label: "General Enquiries",
          value: "contact@omshivlogistics.com",
          note: "Corporate correspondence and billing"
        }
      ]
    }
  ];

  /* Short single-word labels keep the desktop header on ONE line. */
  const NAV = [
    { id: "services", label: "Services" },
    { id: "fleet", label: "Fleet" },
    { id: "how-we-work", label: "Process" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" }
  ];

  const HERO_STATS = [
    { value: "500+", label: "Commercial vehicles" },
    { value: "10 Tyre+", label: "Own fleet class" },
    { value: "Pan India", label: "Pickup & delivery" },
    { value: "24/7", label: "Operations support" }
  ];

  const MARQUEE = [
    "Container Booking & Confirmation",
    "Road Transport — FTL / PTL",
    "Fleet Ownership — 10 Tyres & Above",
    "Commission Agency Services",
    "Timely Delivery & End-to-End Support",
    "32FT SXL (9MT) / MXL (18MT) Containers",
    "Long-Term Transport Contracts"
  ];

  /* Four consolidated pillars. Each absorbs the original six specialisations,
     so the complete service set sits in a single row on desktop. */
  const SERVICES = [
    {
      id: "vehicle-supply",
      icon: "fa-truck-ramp-box",
      title: "Vehicle Supply & Container Booking",
      summary:
        "A network of 500+ commercial vehicles plus container capacity — matched to your load rather than to a spot-market guess.",
      points: [
        "Multi-axle trucks, trailers & open-body units",
        "LCVs for intra-city & mid-mile transit",
        "32FT SXL (9MT) & MXL (18MT) containers",
        "Specialised cargo by dimension & weight"
      ]
    },
    {
      id: "transport-contracting",
      icon: "fa-file-signature",
      title: "End-to-End Transport Contracting",
      summary:
        "Steady transport infrastructure for businesses that cannot depend on a volatile spot market.",
      points: [
        "Dedicated trucks for weekly / monthly volumes",
        "Terms flexed around seasonal demand",
        "Fixed structures for predictable freight cost",
        "Load-layout planning to cut cost per tonne"
      ]
    },
    {
      id: "commission-agency",
      icon: "fa-handshake-angle",
      title: "Commission Agency & Sourcing",
      summary:
        "An intermediary logistics arm that bridges capacity gaps using regional networks built over years in Kutch.",
      points: [
        "Rapid sourcing of certified backup fleets",
        "Route planning across seasons & tolls",
        "Extra capacity during demand peaks",
        "Transparent, ethics-first intermediation"
      ]
    },
    {
      id: "fleet-dispatch",
      icon: "fa-satellite-dish",
      title: "Fleet & Dispatch Management",
      summary:
        "Structured workflows that plug into your warehouse operations, with one accountable point of contact.",
      points: [
        "Credentialed drivers vetted for heavy loads",
        "On-time dispatch coordination with your team",
        "24/7 monitoring & exception handling",
        "Timely delivery with end-to-end support"
      ]
    }
  ];

  /* Four consolidated vehicle groups — one row on desktop. */
  const FLEET = [
    { icon: "fa-cube", title: "32FT Containers", text: "Single- and multi-axle long containers for volume and dense industrial freight.", cap: "SXL 9MT · MXL 18MT" },
    { icon: "fa-trailer", title: "Multi-Axle & Trailer", text: "Heavy-duty trailers for bulk raw material, machinery and high-tonnage loads.", cap: "Heavy duty" },
    { icon: "fa-truck-moving", title: "Open-Body & LCV", text: "Flatbed and open-body units for over-dimensional loads, plus LCVs for mid-mile cycles.", cap: "Flexible · Mid-mile" },
    { icon: "fa-layer-group", title: "Specialised Cargo", text: "Sourcing aligned to odd dimensions, weights and specific handling requirements.", cap: "Custom" }
  ];

  const WHY = [
    { icon: "fa-shield-halved", title: "Committed & Trustworthy", text: "Your cargo is our responsibility — from pickup to proof of delivery." },
    { icon: "fa-map-location-dot", title: "Pan India Network", text: "Strong presence in the major hubs, with Kutch as our home ground." },
    { icon: "fa-headset", title: "Informed & Responsive", text: "Clear communication and quick support, not silence between checkposts." },
    { icon: "fa-user-tie", title: "We Listen. We Care. We Deliver.", text: "Your goals drive our actions — pricing, routing and scheduling." },
    { icon: "fa-scale-balanced", title: "Professional & Transparent", text: "Ethics, process and trust in every step of the transaction." },
    { icon: "fa-diagram-project", title: "One Platform, Multiple Solutions", text: "Fleet, contracting and agency services under a single point of contact." }
  ];

  const STEPS = [
    { title: "Share Your Requirement", text: "Send load details, origin–destination and schedule over a call or WhatsApp." },
    { title: "Route & Cost Planning", text: "We map the lane, weigh seasonal and toll factors, and propose a cost-effective plan." },
    { title: "Vehicle Placement", text: "A vetted vehicle and credentialed driver are placed at your gate on the agreed date." },
    { title: "Transit Monitoring", text: "Oversight with proactive updates and exception handling through to unloading." }
  ];

  /* Client industries — taken directly from the brief, kept factual. */
  const SEGMENTS = [
    { icon: "fa-industry", title: "Manufacturing Units", text: "Raw material, machinery and secondary production freight." },
    { icon: "fa-mountain-sun", title: "Extraction Industries", text: "Heavy bulk movement from extraction and processing sites." },
    { icon: "fa-warehouse", title: "Distribution Plants", text: "Reliable inbound and outbound distribution cycles." },
    { icon: "fa-ship", title: "Port-Linked Cargo", text: "Kandla and Mundra port movement with documentation support." }
  ];

  const FAQS = [
    {
      q: "What kind of vehicles can you place for my consignment?",
      a: "Our network covers 10-tyre and above trucks, multi-axle units, trailers, open-body variants and light commercial vehicles. For containerised movement we supply 32FT SXL (9MT) and MXL (18MT) containers. Sourcing is matched to your load dimensions, weight and handling needs."
    },
    {
      q: "Do you work on long-term transport contracts?",
      a: "Yes. End-to-end transport contracting is a core specialisation. We provision dedicated trucks for predictable weekly or monthly volumes, with terms flexed around seasonal demand or fluctuating industrial output, and fixed structures so you can plan annual freight expenditure."
    },
    {
      q: "Which industries and regions do you serve?",
      a: "We are a B2B fleet supplier and transport contractor serving manufacturing facilities, extraction industries and distribution plants across Gandhidham, Kutch and the wider Gujarat region — with pickup and delivery across India through our Pan India network."
    },
    {
      q: "How fast can you arrange a vehicle in an emergency?",
      a: "Our commission agency arm exists precisely for capacity gaps. Using regional networks we source certified backup fleets during demand peaks. Call the Transport Booking line with your origin, destination, vehicle type and loading date, and we will confirm availability."
    },
    {
      q: "How is freight priced?",
      a: "Pricing is built on lane distance, vehicle type, load weight and handling requirements — with load-layout planning to maximise space per truck and bring down cost per tonne. Share your lane and load details and we will revert with a formal quotation."
    },
    {
      q: "Do you provide a GST invoice?",
      a: "Yes. Om Shiv Logistics is GST registered (GSTIN 24EGFPK8451Q1ZQ) and issues compliant tax invoices for all bookings."
    },
    {
      q: "What do you need from us to quote?",
      a: "Origin and destination, material and approximate weight, vehicle or container size, preferred loading date, and any handling or documentation requirements. If you have drawings or packing lists, send them over WhatsApp and we will factor them in."
    }
  ];

  /* Fleet specialisation, repeated where it matters — sourced from the client's own poster. */
  const SPECIALISATION = "Fleet owner of 32FT SXL (9MT) / MXL (18MT) containers";

  window.OSL_DATA = {
    CONTACT: CONTACT,
    CONTACT_GROUPS: CONTACT_GROUPS,
    NAV: NAV,
    HERO_STATS: HERO_STATS,
    MARQUEE: MARQUEE,
    SERVICES: SERVICES,
    FLEET: FLEET,
    WHY: WHY,
    STEPS: STEPS,
    SEGMENTS: SEGMENTS,
    FAQS: FAQS,
    SPECIALISATION: SPECIALISATION
  };
})();
