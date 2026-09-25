/* ==========================================================================
   OM SHIV LOGISTICS — content & configuration
   Single source of truth for copy, contacts, services and quote logic.
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
    phones: [
      { label: "Transport Booking", number: "+91 93745 29413", raw: "919374529413" },
      { label: "Fleet & Dispatch", number: "+91 93744 29413", raw: "919374429413" },
      { label: "Operations & Support", number: "+91 92740 47949", raw: "919274047949" }
    ],
    // Enquiry inbox (as requested)
    email: "gandhidham@omshivlogistics.com",
    generalEmail: "contact@omshivlogistics.com",
    whatsapp: "919374529413"
  };

  /* Short single-word labels keep the desktop header on ONE line. */
  const NAV = [
    { id: "services", label: "Services" },
    { id: "fleet", label: "Fleet" },
    { id: "how-we-work", label: "Process" },
    { id: "estimator", label: "Estimator" },
    { id: "lanes", label: "Lanes" },
    { id: "faq", label: "FAQ" }
  ];

  const HERO_STATS = [
    { value: "500+", label: "Vehicles in network" },
    { value: "10 Tyre", label: "To multi-axle & trailer" },
    { value: "Pan India", label: "Pickup & delivery" },
    { value: "24/7", label: "Dispatch & support" }
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
        "A live network of 500+ commercial vehicles plus confirmed container capacity — matched to your load, not to a spot-market guess.",
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
        "Steady transport infrastructure for corporations that cannot afford to depend on a volatile spot market.",
      points: [
        "Dedicated trucks for weekly / monthly volumes",
        "Terms flexed around seasonal demand",
        "Fixed pricing for predictable freight cost",
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
        "Rapid dispatch of certified backup fleets",
        "Route optimisation across seasons & tolls",
        "Extra capacity during demand peaks",
        "Transparent, ethics-first intermediation"
      ]
    },
    {
      id: "fleet-dispatch",
      icon: "fa-satellite-dish",
      title: "Fleet & Dispatch Management",
      summary:
        "Structured workflows that plug straight into your warehouse operations, with one accountable point of contact.",
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
    { icon: "fa-map-location-dot", title: "Pan India Network", text: "Strong presence in all major hubs, with Kutch as our home ground." },
    { icon: "fa-headset", title: "Informed & Responsive", text: "Clear communication and quick support, not silence between checkposts." },
    { icon: "fa-user-tie", title: "We Listen. We Care. We Deliver.", text: "Your goals drive our actions — pricing, routing and scheduling." },
    { icon: "fa-scale-balanced", title: "Professional & Transparent", text: "Ethics, process and trust in every step of the transaction." },
    { icon: "fa-diagram-project", title: "One Platform, Multiple Solutions", text: "Fleet, contracting and agency services under a single point of contact." }
  ];

  const STEPS = [
    { title: "Share Your Requirement", text: "Send load details, origin–destination and schedule through the form, a call or WhatsApp." },
    { title: "Route & Cost Planning", text: "We map the lane, weigh seasonal and toll factors, and propose the most cost-effective plan." },
    { title: "Vehicle Placement", text: "A vetted vehicle and credentialed driver are placed at your gate on the confirmed date." },
    { title: "Transit Monitoring", text: "24/7 oversight with proactive updates and exception handling until unloading." }
  ];

  const FAQS = [
    {
      q: "What kind of vehicles can you place for my consignment?",
      a: "Our network covers 10-tyre and above trucks, multi-axle units, trailers, open-body variants and light commercial vehicles. For containerised movement we supply 32FT SXL (9MT) and MXL (18MT) containers. Sourcing is matched to your load dimensions, weight and handling needs."
    },
    {
      q: "Do you work on long-term transport contracts?",
      a: "Yes. End-to-end transport contracting is a core specialisation. We provision dedicated trucks for predictable weekly or monthly volumes, with terms flexed around seasonal demand or fluctuating industrial output, and fixed pricing structures so you can plan annual freight expenditure."
    },
    {
      q: "Which industries and regions do you serve?",
      a: "We are a B2B fleet supplier and transport contractor serving manufacturing facilities, extraction industries and distribution plants across Gandhidham, Kutch and the wider Gujarat region — with pickup and delivery across India through our Pan India network."
    },
    {
      q: "How fast can you arrange a vehicle in an emergency?",
      a: "Our commission agency arm exists precisely for capacity gaps. Using regional networks we dispatch certified backup fleets quickly during demand peaks. Call our Transport Booking line for immediate requirements."
    },
    {
      q: "How is freight priced?",
      a: "Pricing is built on lane distance, vehicle type, load weight and handling requirements — with transparent structuring and load-layout planning to maximise space per truck and bring down individual freight cost. Use the Freight Estimator above for an indicative average, then confirm with a formal quote."
    },
    {
      q: "Do you provide a GST invoice?",
      a: "Yes. Om Shiv Logistics is GST registered (GSTIN 24EGFPK8451Q1ZQ) and issues compliant tax invoices for all bookings."
    }
  ];

  const LANES_SEED = [
    { from_city: "Gandhidham", to_city: "Ahmedabad", transit_days: "1–2 days", frequency: "Daily", vehicle: "32FT SXL / MXL, 10-tyre", note: "Hub-to-hub, ICD & warehouse movement" },
    { from_city: "Kandla / Mundra Port", to_city: "Delhi NCR", transit_days: "4–5 days", frequency: "Weekly", vehicle: "32FT MXL, Trailer", note: "Port-linked container & bulk cargo" },
    { from_city: "Gandhidham", to_city: "Mumbai / JNPT", transit_days: "2–3 days", frequency: "3–4 per week", vehicle: "32FT MXL, Multi-axle", note: "Export-import and distribution freight" },
    { from_city: "Kutch (Bhuj / Anjar)", to_city: "Jaipur / North India", transit_days: "3–4 days", frequency: "Weekly", vehicle: "Open-body, Trailer", note: "Manufacturing raw material & machinery" },
    { from_city: "Gandhidham", to_city: "Hyderabad / Bengaluru", transit_days: "5–6 days", frequency: "Weekly", vehicle: "32FT MXL, Trailer", note: "Long-haul heavy-duty movement" },
    { from_city: "Gandhidham", to_city: "Kolkata", transit_days: "7–8 days", frequency: "Fortnightly", vehicle: "Trailer, Multi-axle", note: "Pan India bulk dispatch" }
  ];

  /* ---- Freight estimator configuration (indicative, client-side only) ---- */
  const ESTIMATOR = {
    cities: [
      "Ahmedabad", "Anjar", "Bengaluru", "Bhuj", "Chennai", "Delhi NCR", "Gandhidham",
      "Hyderabad", "Indore", "Jaipur", "Kandla Port", "Kolkata", "Lucknow", "Mundra Port",
      "Mumbai / JNPT", "Nagpur", "Pune", "Surat", "Vadodara", "Visakhapatnam"
    ],
    // Indicative one-way road distances (km) from Gandhidham / Kutch
    distances: {
      "Ahmedabad": 330, "Anjar": 40, "Bengaluru": 1740, "Bhuj": 55, "Chennai": 2020,
      "Delhi NCR": 1180, "Gandhidham": 0, "Hyderabad": 1450, "Indore": 720, "Jaipur": 900,
      "Kandla Port": 35, "Kolkata": 2250, "Lucknow": 1450, "Mundra Port": 60,
      "Mumbai / JNPT": 800, "Nagpur": 1050, "Pune": 900, "Surat": 500,
      "Vadodara": 430, "Visakhapatnam": 1900
    },
    // Indicative base rate per km by vehicle class (INR), before load factor
    vehicles: {
      "LCV (Tata 407 / pick-up)": { rate: 26, capacity: "1.5 – 3 MT", icon: "fa-truck-fast" },
      "10-Tyre Truck": { rate: 44, capacity: "9 – 16 MT", icon: "fa-truck" },
      "12-Tyre Truck": { rate: 50, capacity: "16 – 21 MT", icon: "fa-truck" },
      "32FT SXL Container (9MT)": { rate: 46, capacity: "9 MT", icon: "fa-cube" },
      "32FT MXL Container (18MT)": { rate: 58, capacity: "18 MT", icon: "fa-cube" },
      "Multi-Axle / Trailer": { rate: 68, capacity: "25 – 40 MT", icon: "fa-trailer" }
    },
    loadFactors: {
      "Part Load (PTL)": 0.55,
      "Full Truck Load (FTL)": 1,
      "Heavy / OD Cargo": 1.18
    }
  };

  window.OSL_DATA = {
    CONTACT: CONTACT,
    NAV: NAV,
    HERO_STATS: HERO_STATS,
    MARQUEE: MARQUEE,
    SERVICES: SERVICES,
    FLEET: FLEET,
    WHY: WHY,
    STEPS: STEPS,
    FAQS: FAQS,
    LANES_SEED: LANES_SEED,
    ESTIMATOR: ESTIMATOR
  };
})();
