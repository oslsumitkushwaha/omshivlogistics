/* ==========================================================================
   OM SHIV LOGISTICS — page registry
   The single source of truth for every inner page: URL path, SEO head values,
   breadcrumb trail, structured-data type and body blocks.

   COPY POLICY: every business fact here traces back to the client's own brief
   or to the content already published on the homepage. Anything the client has
   not confirmed is a {"todo": "..."} block, which renders as a visible,
   styled TODO note on the page and is listed in README.md so it cannot be
   quietly mistaken for a verified claim.
   ========================================================================== */
(function () {
  "use strict";

  /* Canonical host + NAP facts, mirrored from js/data.js. */
  var SITE = "https://www.omshivlogistics.com";
  var PHONES = [
    { label: "Transport Booking", number: "+91 93745 29413", raw: "919374529413" },
    { label: "Fleet & Dispatch", number: "+91 93744 29413", raw: "919374429413" },
    { label: "Operations & Support", number: "+91 92740 47949", raw: "919274047949" }
  ];
  var MAIL = "gandhidham@omshivlogistics.com";
  var MAIL_GENERAL = "contact@omshivlogistics.com";
  var MAPS = "https://maps.app.goo.gl/fv4qFBzDQcibUEKcA";
  var WHATSAPP = "919374529413";

  /* ------------------------------------------------------------- helpers --- */
  /* `wa` builds a "block" so the page registry stays declarative. */
  function wa(text) {
    return { type: "cta", wa: text };
  }

  /* Six real services, one line each, reused by several pages. */
  var SERVICE_LINKS = [
    { path: "/services/container-booking-32ft/", label: "32FT Container Booking (SXL / MXL)" },
    { path: "/services/ftl-ptl-road-transport/", label: "FTL & PTL Road Transport" },
    { path: "/services/commercial-vehicle-supply/", label: "Commercial Vehicle Supply" },
    { path: "/services/transport-contracts/", label: "End-to-End Transport Contracts" },
    { path: "/services/commission-agency/", label: "Commission Agency & Vehicle Sourcing" },
    { path: "/services/kandla-mundra-port-transport/", label: "Kandla & Mundra Port Transport" }
  ];

  var CITY_LINKS = [
    { path: "/locations/gandhidham/", label: "Gandhidham" },
    { path: "/locations/kutch/", label: "Kutch (Kachchh)" },
    { path: "/locations/mundra/", label: "Mundra" },
    { path: "/locations/kandla/", label: "Kandla" }
  ];

  /* ---------------------------------------------------------------- PAGES -- */
  var PAGES = {};

  /* ============================== /services/ ============================== */
  PAGES["/services/"] = {
    file: "services/index.html",
    title: "Logistics Services in Kutch | Om Shiv Logistics",
    description:
      "Explore OSL services: 32FT SXL/MXL container booking, FTL/PTL road transport, commercial vehicle supply, transport contracts and port movement. Call us.",
    crumb: "Services",
    schemaType: "CollectionPage",
    h1: "Logistics services for manufacturers and exporters",
    lede:
      "Om Shiv Logistics (OSL) is a business-to-business fleet owner and transport contractor working out of Gandhidham, Kutch. Everything below is run from one dispatch desk and one accountable point of contact.",
    blocks: [
      { type: "p", text: "We are not a consumer moving company and we do not handle household or personal relocation. Our work is industrial freight: raw material, finished goods, project cargo and containerised export-import boxes for manufacturing units, extraction industries and distribution plants across Gujarat and India." },
      { type: "h2", text: "Choose the service you need" },
      { type: "cards", items: SERVICE_LINKS.map(function (s) { return { title: s.label, href: s.path, text: "" }; }) },
      { type: "h2", text: "How the six services fit together" },
      { type: "p", text: "Most clients start with a single lane and a single vehicle type, then add volume. Vehicle supply and container booking put capacity at your gate. FTL and PTL road transport cover the day-to-day movement. Transport contracts convert an unpredictable spot-market spend into a fixed structure you can budget against. The commission agency arm exists for the weeks when your own volume spikes and you need certified backup fleets quickly. And because our home ground is the Kutch belt, port-linked cargo through Kandla and Mundra is something we handle as standing work rather than an exception." },
      { type: "h2", text: "One point of contact, three dedicated lines" },
      { type: "p", text: "Bookings, pricing and contracts come through the transport booking line. Vehicle placement and dispatch coordination come through fleet and dispatch. Documentation, transit updates and escalations come through operations and support, which is staffed round the clock. Nobody has to explain their consignment twice." },
      { type: "p", text: "Tell us the lane, the material, the approximate weight and the vehicle or container size you need, and we will revert with a formal quotation. If you already know the vehicle category, the service pages linked above carry a short qualification checklist." },
      wa("Hello Om Shiv Logistics, I would like to discuss my freight requirement."),
      { type: "h2", text: "Areas we work in" },
      { type: "links", title: "City and district pages", items: CITY_LINKS }
    ]
  };

  /* ---------------------- /services/container-booking-32ft/ ---------------- */
  PAGES["/services/container-booking-32ft/"] = {
    file: "services/container-booking-32ft/index.html",
    title: "32FT Container Booking SXL & MXL | Gandhidham",
    description:
      "Book 32FT SXL (9MT) and MXL (18MT) containers from Gandhidham, Kutch. Single and multi-axle long containers for industrial freight. Get a quote today.",
    crumb: "Container Booking (32FT SXL & MXL)",
    parent: { path: "/services/", label: "Services" },
    schemaType: "Service",
    serviceName: "32FT Container Booking — SXL (9MT) and MXL (18MT)",
    h1: "32FT container booking: SXL and MXL",
    lede:
      "Long 32FT containers for dense and volume industrial freight, booked out of Gandhidham for pickup and delivery across India.",
    blocks: [
      { type: "p", text: "The 32FT container is the workhorse of industrial road freight in western India. It gives you a sealed, weatherproof box that can be loaded and unloaded without exposing your cargo to open-body handling, and it works with both road documentation and port-linked movement." },
      { type: "p", text: "Om Shiv Logistics owns and operates 32FT container capacity. That ownership matters when you are booking at short notice: the vehicle is committed by an operator whose own equipment is on the road, not by an intermediary searching a crowded spot market." },
      { type: "h2", text: "SXL (9MT) or MXL (18MT)? Choosing the right container" },
      { type: "p", text: "SXL and MXL describe the container size class used in this segment — the practical difference for a shipper is gross capacity and axle configuration. SXL class containers are the lighter option at around 9MT gross; MXL class containers carry roughly 18MT gross and sit on a multi-axle configuration to distribute that heavier load." },
      { type: "p", text: "The right choice depends on three things: the weight of your consignment, whether your dispatch bay is long enough to present the vehicle safely, and what your consignee can legally receive at the other end. If your load sits near the boundary between the two, send us the packing list and we will size it for you rather than letting you over-pay for capacity you do not need." },
      { type: "h2", text: "What this service covers" },
      { type: "list", items: [
        "Container booking and confirmation, 32FT SXL (approximately 9MT) and MXL (approximately 18MT)",
        "Single-axle and multi-axle long containers, matched to cargo density",
        "Pickup from your factory, warehouse or ICD and delivery to the named destination",
        "Port-linked container movement for the Kandla and Mundra cluster",
        "Load-layout planning so each container carries as much of your volume as it legally can"
      ] },
      { type: "h2", text: "Cargo this works well for" },
      { type: "p", text: "We move freight for businesses across kaolin and minerals, steel, industrial gas, geosynthetics and construction materials, agro-processing, cosmetics and consumer goods. Containerised movement suits bagged and palletised product, boxed finished goods and any cargo that must stay dry and untampered from gate to gate." },
      { type: "h2", text: "Booking a container" },
      { type: "p", text: "Call the transport booking line with the container class you need, the pickup location, the destination and your loading date. If the consignment is heavy or unusual, tell us the gross weight and the dimensions of the largest item. We will confirm availability and revert with a formal quotation — rates depend on the lane, the class and the date, so we quote per requirement rather than publishing a flat tariff." },
      { type: "list", title: "Have these ready and we can quote in one call", items: [
        "Pickup address and the receiving address",
        "Goods description, approximate gross weight and package count",
        "Container class (SXL or MXL) if you already know it",
        "Preferred loading date and any appointment restriction at either end"
      ] },
      wa("Hello Om Shiv Logistics, I would like to book a 32FT container (SXL / MXL)."),
      { type: "faq", title: "Container booking questions",
        items: [
          { q: "What does SXL 9MT and MXL 18MT mean?", a: "SXL and MXL are the container class labels used in this segment; the figures are the approximate gross capacity each class is rated for — around 9 metric tonnes for SXL and around 18 metric tonnes for MXL. Heavier consignments need the MXL class because the vehicle carries a multi-axle configuration that spreads the load." },
          { q: "Can I specify the container class myself?", a: "Yes. If you are converting from an existing lane you will usually know which class works. If you are not sure, send the weight and package dimensions and we will recommend the class rather than defaulting to the larger one." },
          { q: "Do you handle container movement for Kandla and Mundra?", a: "Yes. Port-linked cargo for the Kandla and Mundra cluster is standing work for our Gandhidham-based fleet rather than an occasional request." }
        ]
      },
      { type: "internal", title: "Related services", items: [
        { path: "/services/ftl-ptl-road-transport/", label: "FTL & PTL road transport" },
        { path: "/services/commercial-vehicle-supply/", label: "Commercial vehicle supply" },
        { path: "/services/kandla-mundra-port-transport/", label: "Kandla & Mundra port transport" },
        { path: "/services/transport-contracts/", label: "Long-term transport contracts" }
      ] }
    ]
  };

  /* --------------------- /services/ftl-ptl-road-transport/ ---------------- */
  PAGES["/services/ftl-ptl-road-transport/"] = {
    file: "services/ftl-ptl-road-transport/index.html",
    title: "FTL & PTL Road Transport from Kutch | Om Shiv",
    description:
      "Full truck load (FTL) and part load (PTL) road transport from Gandhidham, Kutch with 500+ vehicles and Pan India delivery. Call Om Shiv Logistics for rates.",
    crumb: "FTL & PTL Road Transport",
    parent: { path: "/services/", label: "Services" },
    schemaType: "Service",
    serviceName: "FTL and PTL Road Transport",
    h1: "FTL and PTL road transport",
    lede:
      "Full truck load for exclusive, direct movement and part truck load when your consignment does not justify a whole vehicle.",
    blocks: [
      { type: "p", text: "Road freight is the backbone of industrial supply across Gujarat, and the first decision on any lane is whether the consignment should travel as a full truck load or as a part load. Getting that decision right is often the single largest saving available on a lane." },
      { type: "h2", text: "Full truck load (FTL)" },
      { type: "p", text: "In FTL the vehicle is dedicated to your consignment and runs from your pickup point to your delivery point without consolidation. It is the right choice when your volume fills or nearly fills a vehicle, when the goods are high value or fragile, when the material is dense and heavy, or when the schedule cannot tolerate a consolidation hub in the middle." },
      { type: "list", items: [
        "One consignor, one consignee, one vehicle",
        "Direct movement with fewer handling points and lower damage risk",
        "Predictable transit because there is no waiting for the vehicle to fill",
        "Suited to heavy bulk, project cargo, machinery and time-critical deliveries"
      ] },
      { type: "h2", text: "Part truck load (PTL)" },
      { type: "p", text: "In PTL you pay for the space your consignment occupies. It is the economical option when the volume is smaller than a full vehicle and the delivery schedule has some flexibility, because the vehicle may consolidate loads from more than one shipper along the route." },
      { type: "list", items: [
        "Pay for the space used rather than the whole vehicle",
        "Good for regular mid-size dispatches on established lanes",
        "Suited to smaller consignments where per-consignment cost matters more than exclusivity"
      ] },
      { type: "h2", text: "Vehicle classes we place" },
      { type: "p", text: "Our network covers 10-tyre and above trucks, multi-axle units, trailers, open-body variants and light commercial vehicles. Containerised movement runs on 32FT SXL and MXL capacity. Sourcing is matched to load dimensions, weight and handling requirements rather than to a generic default size." },
      { type: "h2", text: "From Gandhidham to anywhere in India" },
      { type: "p", text: "Our base is Gandhidham, which puts us close to the Kutch industrial belt and to the Kandla and Mundra port cluster. From there we move freight into and out of Gujarat, Maharashtra, Rajasthan, Delhi NCR, Tamil Nadu, Karnataka, Andhra Pradesh and West Bengal, with pickup and delivery across India through our network." },
      { type: "h2", text: "Getting a rate" },
      { type: "p", text: "Freight pricing is built on lane distance, vehicle type, load weight and handling requirements. We plan the load layout to use as much of each vehicle as the law allows, which brings down cost per tonne on dense cargo. Share the lane and load details and we will revert with a formal quotation." },
      wa("Hello Om Shiv Logistics, I need a rate for an FTL / PTL road transport movement."),
      { type: "internal", title: "Related services", items: [
        { path: "/services/container-booking-32ft/", label: "32FT container booking (SXL / MXL)" },
        { path: "/services/commercial-vehicle-supply/", label: "Commercial vehicle supply" },
        { path: "/services/transport-contracts/", label: "End-to-end transport contracts" },
        { path: "/services/commission-agency/", label: "Commission agency & vehicle sourcing" }
      ] }
    ]
  };

  /* -------------------- /services/commercial-vehicle-supply/ -------------- */
  PAGES["/services/commercial-vehicle-supply/"] = {
    file: "services/commercial-vehicle-supply/index.html",
    title: "Commercial Vehicle Supply in Gandhidham | Om Shiv",
    description:
      "Commercial vehicle supply from Gandhidham, Kutch: multi-axle trucks, trailers, open-body units and LCVs from a network of 500+ vehicles. Call for availability.",
    crumb: "Commercial Vehicle Supply",
    parent: { path: "/services/", label: "Services" },
    schemaType: "Service",
    serviceName: "Commercial Vehicle Supply",
    h1: "Commercial vehicle supply",
    lede:
      "The right vehicle for the load, placed at your gate — multi-axle trucks, trailers, open-body units, LCVs and 32FT containers.",
    blocks: [
      { type: "p", text: "A freight plan is only as good as the vehicle that turns up. Too small and the load moves in two trips; too large and you pay for air. Our vehicle supply service exists to close that gap, using a network of more than 500 commercial vehicles alongside our own container capacity." },
      { type: "h2", text: "Vehicle categories" },
      { type: "list", items: [
        "Multi-axle trucks — heavy tonnage and dense bulk cargo",
        "Trailers — bulk raw material, machinery and high-tonnage loads",
        "Open-body and flatbed units — over-dimensional and awkward loads",
        "Light commercial vehicles — intra-city and mid-mile cycles",
        "32FT containers (SXL 9MT / MXL 18MT) — sealed, weatherproof movement"
      ] },
      { type: "p", text: "Sourcing is matched to the actual consignment: the dimensions of the largest item, the gross weight, the handling method at both ends and any site access restriction. That last point matters more often than people expect — a vehicle that is technically correct but cannot physically enter your dispatch yard is no use on loading day." },
      { type: "h2", text: "Own fleet, plus a vetted network" },
      { type: "p", text: "We are a fleet owner as well as a supplier, which changes how we handle peak season. Our own container capacity covers committed volume, and the wider network lets us add vehicles when demand spikes instead of turning work away. Drivers are credentialed and vetted for heavy loads." },
      { type: "h2", text: "Where we place vehicles" },
      { type: "p", text: "Placement is strongest in the Kutch belt — Gandhidham, Kandla and Mundra — and extends across Gujarat and India for scheduled and contracted movement. If your lane is outside our home region, say so when you call and we will confirm network availability honestly rather than over-committing." },
      { type: "h2", text: "What to tell us" },
      { type: "list", items: [
        "Origin and destination",
        "Material and approximate gross weight",
        "The largest item's dimensions, if the load is over-dimensional",
        "Loading date, and whether the dispatch bay has any access limit",
        "Whether the load must be sealed (container) or can travel open-body"
      ] },
      { type: "p", text: "Call the transport booking line with those details and we will confirm the vehicle class, availability and rate." },
      wa("Hello Om Shiv Logistics, I would like to enquire about commercial vehicle supply."),
      { type: "internal", title: "Related services", items: [
        { path: "/services/container-booking-32ft/", label: "32FT container booking (SXL / MXL)" },
        { path: "/services/ftl-ptl-road-transport/", label: "FTL & PTL road transport" },
        { path: "/services/commission-agency/", label: "Commission agency & vehicle sourcing" },
        { path: "/services/transport-contracts/", label: "End-to-end transport contracts" }
      ] }
    ]
  };

  /* ------------------------ /services/transport-contracts/ ---------------- */
  PAGES["/services/transport-contracts/"] = {
    file: "services/transport-contracts/index.html",
    title: "Transport Contracts & Dedicated Trucks | Om Shiv",
    description:
      "End-to-end transport contracting from Gandhidham, Kutch: dedicated trucks for weekly and monthly volumes with fixed structures and flexible terms. Call us.",
    crumb: "End-to-End Transport Contracts",
    parent: { path: "/services/", label: "Services" },
    schemaType: "Service",
    serviceName: "End-to-End Transport Contracting",
    h1: "End-to-end transport contracts",
    lede:
      "Steady transport infrastructure for businesses that cannot depend on a volatile spot market.",
    blocks: [
      { type: "p", text: "Spot-market freight works until it does not. When your output rises, when a peak season arrives, or when the whole region is short of vehicles at once, rates move and availability disappears exactly when you need it most. A transport contract replaces that uncertainty with committed capacity at a planned cost." },
      { type: "h2", text: "What a contract gives you" },
      { type: "list", items: [
        "Dedicated trucks for predictable weekly or monthly volumes",
        "Terms flexed around seasonal demand or fluctuating industrial output",
        "Fixed pricing structures so you can plan annual freight expenditure",
        "Priority placement when regional capacity tightens",
        "One accountable point of contact instead of a different broker every week"
      ] },
      { type: "h2", text: "How we build the contract" },
      { type: "p", text: "We start with your real dispatch pattern rather than an idealised one: the lanes you actually run, the volume in each direction, the seasonal shape of your output and the maximum lead time your production schedule can tolerate. From that we propose a committed vehicle count, a rate structure and an escalation path for volume above the committed baseline." },
      { type: "p", text: "Terms are deliberately flexible. Industrial output moves, and a contract that cannot absorb a seasonal swing ends up being bypassed. We would rather agree a structure that holds through your peak and your quiet months than one that looks tidy on paper and fails in the fourth week." },
      { type: "h2", text: "Who this suits" },
      { type: "p", text: "Transport contracting suits manufacturing units, extraction industries and distribution plants with a repeatable lane and a volume that does not change dramatically month to month. If your requirement is genuinely one-off, the commission agency route or a straightforward FTL booking is usually a better fit — we will tell you which." },
      { type: "h2", text: "Starting the conversation" },
      { type: "p", text: "Come to the transport booking line with your lanes, your approximate monthly volume and your peak-season pattern. We will tell you whether a contract is the right instrument for your traffic before we talk about numbers." },
      wa("Hello Om Shiv Logistics, I would like to discuss a long-term transport contract."),
      { type: "internal", title: "Related services", items: [
        { path: "/services/commission-agency/", label: "Commission agency & vehicle sourcing" },
        { path: "/services/ftl-ptl-road-transport/", label: "FTL & PTL road transport" },
        { path: "/services/commercial-vehicle-supply/", label: "Commercial vehicle supply" },
        { path: "/services/container-booking-32ft/", label: "32FT container booking (SXL / MXL)" }
      ] }
    ]
  };

  /* ------------------------ /services/commission-agency/ ------------------ */
  PAGES["/services/commission-agency/"] = {
    file: "services/commission-agency/index.html",
    title: "Commission Agency & Vehicle Sourcing | Om Shiv",
    description:
      "Commission agency and vehicle sourcing in Gandhidham, Kutch. Certified backup fleets, route planning and extra capacity during demand peaks. Call OSL today.",
    crumb: "Commission Agency & Vehicle Sourcing",
    parent: { path: "/services/", label: "Services" },
    schemaType: "Service",
    serviceName: "Commission Agency and Vehicle Sourcing",
    h1: "Commission agency and vehicle sourcing",
    lede:
      "An intermediary logistics arm that bridges capacity gaps using regional networks built over years in Kutch.",
    blocks: [
      { type: "p", text: "Every freight operation runs into the same wall eventually: the load is ready, the customer is waiting, and there is no vehicle. Demand peaks, festival weeks and harvest-linked surges hit the whole region at once. This service exists for those weeks." },
      { type: "h2", text: "What we do" },
      { type: "list", items: [
        "Rapid sourcing of certified backup fleets when your own capacity runs short",
        "Route planning that accounts for seasonal conditions, toll and checkpost behaviour",
        "Additional capacity during demand peaks, without you building permanent overhead",
        "Transparent, ethics-first intermediation — the rate we agree is the rate you pay"
      ] },
      { type: "h2", text: "Why an agency rather than a bigger fleet" },
      { type: "p", text: "Keeping a fleet large enough to cover your worst week means paying for that capacity in every quiet week. A commission agency lets you buy capacity only when you need it, while the vehicles themselves come from operators who are accountable for their own equipment's condition and documentation." },
      { type: "p", text: "The value we add is knowing which operator is genuinely reliable on a given lane. That is a local, earned knowledge — built from years of working the Kutch belt — not something that can be looked up on a load board." },
      { type: "h2", text: "How to use it" },
      { type: "p", text: "Call the transport booking line with your origin, destination, vehicle type and loading date, and we will confirm availability. Tell us up front if the requirement has any unusual element — an over-dimensional item, a hazmat consignment, an unloading appointment window or a destination with limited access — because that narrows which operators can actually serve the lane." },
      wa("Hello Om Shiv Logistics, I need vehicle sourcing support for a consignment."),
      { type: "internal", title: "Related services", items: [
        { path: "/services/commercial-vehicle-supply/", label: "Commercial vehicle supply" },
        { path: "/services/transport-contracts/", label: "End-to-end transport contracts" },
        { path: "/services/ftl-ptl-road-transport/", label: "FTL & PTL road transport" },
        { path: "/services/kandla-mundra-port-transport/", label: "Kandla & Mundra port transport" }
      ] }
    ]
  };

  /* ------------------- /services/kandla-mundra-port-transport/ ------------ */
  PAGES["/services/kandla-mundra-port-transport/"] = {
    file: "services/kandla-mundra-port-transport/index.html",
    title: "Kandla & Mundra Port Transport in Kutch | Om Shiv",
    description:
      "Container and cargo transport for Kandla and Mundra ports from a Gandhidham-based fleet owner. 32FT SXL/MXL and trailers with documentation support. Call OSL.",
    crumb: "Kandla & Mundra Port Transport",
    parent: { path: "/services/", label: "Services" },
    schemaType: "Service",
    serviceName: "Kandla and Mundra Port Transport",
    h1: "Kandla and Mundra port transport",
    lede:
      "Port-linked container and cargo movement handled by a fleet owner whose base is inside the Kutch port cluster.",
    blocks: [
      { type: "p", text: "Kandla and Mundra are two of India's busiest cargo gateways, and an enormous volume of freight moves between those terminals and the factories, warehouses and ICDs of Gujarat. Port freight is unforgiving: a missed gate cut-off or an incomplete document set costs a day, and a day at a port costs real money." },
      { type: "p", text: "Our registered office is in Gandhidham, which puts us a short drive from both port complexes. Port-linked cargo is standing work for us rather than an occasional special trip, and that proximity is the practical advantage clients gain." },
      { type: "h2", text: "What we move" },
      { type: "list", items: [
        "32FT SXL (9MT) and MXL (18MT) container movement to and from the port terminals",
        "Trailer and multi-axle movement for bulk and heavy port cargo",
        "Pickup from factory or warehouse and delivery to the nominated port gate, or the reverse leg",
        "Export-import movement coordinated around a shipment date rather than a vague window",
        "Documentation support to keep the paperwork aligned with the physical movement"
      ] },
      { type: "h2", text: "Planning port freight properly" },
      { type: "p", text: "The variables we plan around are the vessel cut-off, the container release status, the terminal's gate hours and queue behaviour, and the road distance and permitted routing. Where a consignment depends on a vessel schedule, we work backwards from the cut-off so that loading at your facility happens with enough margin to absorb a queue at the gate." },
      { type: "h2", text: "Serving the Kutch industrial belt" },
      { type: "p", text: "Beyond the ports themselves, we move freight for the industrial belt that surrounds them — manufacturing units and extraction operations around Gandhidham, Anjar, Bhachau and the wider Kutch district, plus distribution plants that feed both the local market and the ports." },
      { type: "h2", text: "Talk to us about a port lane" },
      { type: "p", text: "Call the transport booking line with the cargo description, container class or vehicle type, pickup point, port and required gate-in date. If you are working to a vessel cut-off, say so at the start and we will plan against it." },
      wa("Hello Om Shiv Logistics, I need transport for a Kandla / Mundra port movement."),
      { type: "internal", title: "Related services", items: [
        { path: "/services/container-booking-32ft/", label: "32FT container booking (SXL / MXL)" },
        { path: "/services/commercial-vehicle-supply/", label: "Commercial vehicle supply" },
        { path: "/services/ftl-ptl-road-transport/", label: "FTL & PTL road transport" },
        { path: "/locations/mundra/", label: "Transport services in Mundra" }
      ] }
    ]
  };

  /* ================================= /about/ ============================== */
  PAGES["/about/"] = {
    file: "about/index.html",
    title: "About Om Shiv Logistics | Transport Contractor, Kutch",
    description:
      "Om Shiv Logistics is a B2B fleet owner and transport contractor in Gandhidham, Kutch with 500+ commercial vehicles and 24/7 support lines. Learn about OSL.",
    crumb: "About",
    schemaType: "AboutPage",
    h1: "About Om Shiv Logistics",
    lede:
      "A business-to-business fleet owner and transport contractor working out of Gandhidham, Kutch — not a consumer moving company.",
    blocks: [
      { type: "h2", text: "What we are" },
      { type: "p", text: "Om Shiv Logistics (OSL) supplies commercial vehicles and runs road freight for industrial clients. Our tagline is Transportation Redefined — Your Cargo, Our Responsibility, and the second half of that line is the part we are held to. We own container capacity, place vehicles from a network of more than 500 commercial vehicles, and handle the documentation and dispatch coordination that sits around the physical movement." },
      { type: "p", text: "We are deliberately a B2B operation. We do not move households, personal effects or consumer relocations. Our clients are manufacturing units, extraction industries and distribution plants that need freight capacity on a repeatable basis, and our services are built around that reality." },
      { type: "h2", text: "What we do" },
      { type: "list", items: [
        "Commercial vehicle supply — 500+ vehicles including multi-axle, trailer, open-body and LCV",
        "Container booking and confirmation — 32FT SXL (9MT) and MXL (18MT)",
        "Road transport — full truck load and part truck load",
        "End-to-end transport contracting with dedicated trucks and fixed pricing structures",
        "Commission agency and vehicle sourcing during demand peaks",
        "Fleet and dispatch management with credentialed drivers and 24/7 support lines"
      ] },
      { type: "h2", text: "Where we work" },
      { type: "p", text: "Our registered office is in Gandhidham, and the Kutch belt is our home ground. That puts us inside the Kandla and Mundra port cluster and close to the industrial corridor that has grown up around it. From Gandhidham we run pickup and delivery across Gujarat and India, with active routes into Maharashtra, Rajasthan, Delhi NCR, Tamil Nadu, Karnataka, Andhra Pradesh and West Bengal." },
      { type: "h2", text: "Who we move freight for" },
      { type: "p", text: "We move freight for businesses across kaolin and minerals, steel, industrial gas, geosynthetics and construction materials, agro-processing, cosmetics and consumer goods. Several of those relationships run across multiple years and multiple lanes, which is the only proof of reliability in this industry that actually means anything." },
      { type: "h2", text: "Leadership" },
      { type: "p", text: "Om Shiv Logistics is led by Indradev Kushwaha, founder and fleet owner. He owns and operates 32FT SXL and MXL container capacity and works directly with the businesses we move for, so pricing, vehicle placement and escalation all come back to one accountable person rather than a call centre." },
      { type: "image", src: "images/founder-indradev-kushwaha.jpg", width: 1024, height: 1024, alt: "Indradev Kushwaha, founder and fleet owner of Om Shiv Logistics, Gandhidham" },
      { type: "h2", text: "How to reach us" },
      { type: "p", text: "Bookings, pricing and contracts come through the transport booking line. Vehicle placement and dispatch coordination come through fleet and dispatch. Documentation, transit updates and escalations come through operations and support, staffed round the clock. Full contact details and our address are on the contact page." },
      { type: "cta", label: "Contact Om Shiv Logistics", href: "/contact/" },
      { type: "todo", text: "Confirm the year the business was founded, any GST or transport registration numbers you want shown publicly, and whether you have company certifications (for example ISO or an approved-transporter status) that we may list as trust signals. None of these are currently published because none could be verified." }
    ]
  };

  /* ================================ /contact/ ============================= */
  PAGES["/contact/"] = {
    file: "contact/index.html",
    title: "Contact Om Shiv Logistics | Gandhidham, Kutch",
    description:
      "Call Om Shiv Logistics in Gandhidham, Kutch: bookings +91 93745 29413, dispatch +91 93744 29413, support +91 92740 47949. Email or request a freight quote.",
    crumb: "Contact",
    schemaType: "ContactPage",
    h1: "Contact Om Shiv Logistics",
    lede:
      "Three dedicated lines, two inboxes and a registered office in Gandhidham — pick the route that matches what you need.",
    blocks: [
      { type: "contact" },
      { type: "h2", text: "Find our office" },
      { type: "p", text: "Our registered office is at North Flour Mill Building, Office No. 203, Zhanda Chowk, Gandhidham 370201, in the Kutch district of Gujarat. Please call ahead before visiting so somebody is free to meet you — the dispatch desk is often out coordinating vehicle placement." },
      { type: "map" },
      { type: "h2", text: "Request a freight quote" },
      { type: "p", text: "Send us the lane and the load and we will revert with a formal quotation. The more of the following you include, the faster we can price it accurately: origin and destination, material and approximate weight, vehicle or container size, preferred loading date, and any handling or documentation requirements." },
      { type: "quoteForm" },
      { type: "h2", text: "Before you call" },
      { type: "list", items: [
        "For a quote: lane, material, approximate weight, vehicle or container class, loading date",
        "For a consignment already booked: your reference or the vehicle number",
        "For vendor onboarding: the documents your finance team needs, and we will return them completed",
        "For a site visit: call first and we will confirm a time"
      ] },
      { type: "todo", text: "Confirm the published office working hours for the Gandhidham office (days and times). The operations and support lines are described on the site as 24/7, but office opening hours for walk-in visitors have not been confirmed, so no openingHours value is published in the structured data." },
      { type: "todo", text: "Confirm whether the numbers published on the site are reachable on WhatsApp. A WhatsApp click-to-chat link is currently live using +91 93745 29413 because that number is published as the booking line; if it is not monitored on WhatsApp, tell us and the button will be removed." }
    ]
  };

  /* ============================== city pages ============================== */
  PAGES["/locations/gandhidham/"] = {
    file: "locations/gandhidham/index.html",
    title: "Transport Contractor in Gandhidham | Om Shiv",
    description:
      "Om Shiv Logistics is a fleet owner and transport contractor based in Gandhidham, Kutch. 500+ vehicles, 32FT containers and FTL/PTL movement. Call for a quote.",
    crumb: "Gandhidham",
    schemaType: "Service",
    serviceName: "Transport services in Gandhidham",
    h1: "Transport contractor in Gandhidham",
    lede:
      "Our registered office, our fleet base and our dispatch desk are all in Gandhidham — this is the town we operate from, not a city we occasionally visit.",
    blocks: [
      { type: "p", text: "Gandhidham sits at the centre of the Kutch industrial belt. Built to serve the port at Kandla, it has grown into a serious logistics town: an ICD, warehousing, industrial estates and a dense cluster of transporters, clearing agents and freight operators. For a business moving cargo through Kutch, it is the natural operating base." },
      { type: "p", text: "Om Shiv Logistics works out of North Flour Mill Building, Office No. 203, at Zhanda Chowk. From that office we run commercial vehicle supply, container booking, road transport and dispatch coordination for clients across the district and beyond." },
      { type: "h2", text: "What we can do for Gandhidham businesses" },
      { type: "list", items: [
        "Place commercial vehicles at short notice for factory and warehouse dispatch",
        "Book and confirm 32FT SXL (9MT) and MXL (18MT) containers",
        "Run full truck load and part truck load movement on the lanes you use",
        "Handle container and cargo movement to and from the Kandla and Mundra port terminals",
        "Take on long-term transport contracts for repeatable dispatch patterns"
      ] },
      { type: "h2", text: "Why a local operator matters" },
      { type: "p", text: "In road freight, distance from the problem is everything. A transporter based in Gandhidham can send someone to a parked vehicle, respond to a gate issue, or put a replacement unit on the road within the working day. An operator coordinating the same lane from another state is working through a chain of phone calls. When something goes wrong at loading, the difference is not marginal." },
      { type: "h2", text: "Who we work with here" },
      { type: "p", text: "We move freight for manufacturing units, extraction industries and distribution plants around Gandhidham and the surrounding industrial belt, spanning kaolin and minerals, steel, industrial gas, geosynthetics and construction materials, agro-processing, cosmetics and consumer goods." },
      { type: "h2", text: "Talk to the Gandhidham desk" },
      { type: "p", text: "Call the transport booking line with your lane and load details, or use the contact page to email the Kutch operations inbox. If you would rather meet in person, call ahead and we will confirm a time at the office." },
      { type: "internal", title: "Related pages", items: [
        { path: "/contact/", label: "Contact details and office address" },
        { path: "/locations/kutch/", label: "Transport services across Kutch" },
        { path: "/locations/mundra/", label: "Transport services in Mundra" },
        { path: "/locations/kandla/", label: "Transport services in Kandla" }
      ] }
    ]
  };

  PAGES["/locations/kutch/"] = {
    file: "locations/kutch/index.html",
    title: "Transport Contractor in Kutch (Kachchh) | Om Shiv",
    description:
      "Road transport and commercial vehicle supply across Kutch from Gandhidham: 500+ vehicles, 32FT containers, FTL/PTL and port movement. Call Om Shiv Logistics.",
    crumb: "Kutch (Kachchh)",
    schemaType: "Service",
    serviceName: "Transport services across Kutch",
    h1: "Transport services across Kutch",
    lede:
      "Kutch is our home ground: a large, sparsely populated district where freight distances are long and vehicle availability is not something you can assume.",
    blocks: [
      { type: "p", text: "Kutch is India's largest district by area, and its freight geography is unusual. Industrial activity concentrates in a few corridors — the Gandhidham and Kandla port belt, the Mundra coast, and the mineral and processing operations scattered inland — while the distances between those points are substantial. A transporter who knows the district knows which roads carry heavy vehicle traffic, where a vehicle can be serviced, and how long a run actually takes in monsoon." },
      { type: "p", text: "Om Shiv Logistics is based in Gandhidham and works the district as standing business. We supply commercial vehicles, book container capacity and run road freight for manufacturing units, extraction industries and distribution plants across Kutch." },
      { type: "h2", text: "The freight we handle here" },
      { type: "list", items: [
        "Minerals and processed materials moving out of extraction and processing sites",
        "Industrial gas and steel consignments on multi-axle and trailer units",
        "Geosynthetics and construction materials to project sites",
        "Agro-processing and consumer goods on regular distribution lanes",
        "Containerised export-import cargo routed to Kandla and Mundra"
      ] },
      { type: "h2", text: "Distances, routes and honest timelines" },
      { type: "p", text: "Freight planning in Kutch is mostly a question of honest transit estimation. We plan routes against the season, account for checkpost behaviour and toll points, and tell clients what a run will realistically take rather than what an optimistic spreadsheet says. Where a lane is genuinely difficult — a long empty return leg, a remote pickup, a site with limited access — we say so at quotation stage, because discovering it after the vehicle is loaded helps nobody." },
      { type: "h2", text: "Port-linked freight" },
      { type: "p", text: "Much of Kutch's industrial output is export-linked. Container and cargo movement to the Kandla and Mundra terminals is a core part of what we run, planned around vessel cut-offs and terminal gate hours rather than treated as ordinary road freight." },
      { type: "h2", text: "Working with us across the district" },
      { type: "p", text: "If your pickup point is inland or your consignee is somewhere unscheduled, send us the address and the vehicle requirement and we will confirm what is realistic. Call the transport booking line, or see the individual city pages for Gandhidham, Mundra and Kandla." },
      { type: "internal", title: "Related pages", items: [
        { path: "/locations/gandhidham/", label: "Transport services in Gandhidham" },
        { path: "/locations/mundra/", label: "Transport services in Mundra" },
        { path: "/locations/kandla/", label: "Transport services in Kandla" },
        { path: "/services/kandla-mundra-port-transport/", label: "Kandla & Mundra port transport" }
      ] }
    ]
  };

  PAGES["/locations/mundra/"] = {
    file: "locations/mundra/index.html",
    title: "Transport Services in Mundra Port | Om Shiv",
    description:
      "Container and bulk cargo transport for Mundra port from a Gandhidham-based fleet owner. 32FT SXL/MXL containers, trailers and FTL movement. Call Om Shiv.",
    crumb: "Mundra",
    parent: { path: "/locations/kutch/", label: "Kutch" },
    schemaType: "Service",
    serviceName: "Transport services in Mundra",
    h1: "Transport services for Mundra",
    lede:
      "Mundra handles a large share of India's container traffic, and moving cargo in and out of it reliably is a planning problem before it is a driving one.",
    blocks: [
      { type: "p", text: "The Mundra port complex on the Gulf of Kutch is one of the largest commercial ports in India, and the volume of container and bulk cargo passing through it has reshaped the surrounding freight market. For a Gandhidham-based operator the run to Mundra is short enough to be routine, which is exactly why we can schedule it tightly rather than treating it as a long-haul job." },
      { type: "h2", text: "What we move at Mundra" },
      { type: "list", items: [
        "32FT SXL (9MT) and MXL (18MT) container movement to and from the terminals",
        "Trailer and multi-axle movement for bulk and heavy cargo",
        "Factory-to-port and port-to-factory legs, including the ICD connection",
        "Export-import movement planned around the vessel cut-off",
        "Documentation support so the paperwork tracks the physical consignment"
      ] },
      { type: "h2", text: "Planning around a port, not a road" },
      { type: "p", text: "Port freight fails for predictable reasons: the container was not released in time, the gate queue was longer than expected, a document set was incomplete, or the vessel cut-off moved. We plan backwards from the cut-off and build in margin for the gate, and we keep the paperwork moving in parallel with the vehicle rather than after it." },
      { type: "h2", text: "Serving the surrounding belt" },
      { type: "p", text: "Around Mundra the freight demand comes from more than the port itself. Manufacturing units, processing plants and warehouses in the belt use the port as a gateway and need inland distribution as well. We cover both directions, and we also run straightforward FTL and PTL movement that never touches a port at all." },
      { type: "h2", text: "Book a Mundra movement" },
      { type: "p", text: "Call the transport booking line with the cargo description, container class or vehicle type, pickup point and the required gate-in date. If a vessel schedule is driving the timeline, mention it first — that single fact changes how the whole move should be planned." },
      { type: "internal", title: "Related pages", items: [
        { path: "/services/kandla-mundra-port-transport/", label: "Kandla & Mundra port transport" },
        { path: "/services/container-booking-32ft/", label: "32FT container booking (SXL / MXL)" },
        { path: "/locations/kandla/", label: "Transport services in Kandla" },
        { path: "/locations/gandhidham/", label: "Transport services in Gandhidham" }
      ] }
    ]
  };

  PAGES["/locations/kandla/"] = {
    file: "locations/kandla/index.html",
    title: "Transport Services in Kandla Port | Om Shiv",
    description:
      "Cargo and container transport for Kandla port, Kutch. Fleet owner with 500+ vehicles, 32FT containers and documentation support. Call Om Shiv Logistics today.",
    crumb: "Kandla",
    parent: { path: "/locations/kutch/", label: "Kutch" },
    schemaType: "Service",
    serviceName: "Transport services in Kandla",
    h1: "Transport services for Kandla",
    lede:
      "The port that built Gandhidham. Kandla movement is core work for us, and our office is minutes from the dock area.",
    blocks: [
      { type: "p", text: "Kandla, on the Gulf of Kutch, is one of India's oldest major ports and remains a critical gateway for liquid bulk, fertiliser, salt, timber and containerised cargo. It is also the reason Gandhidham exists as a town — the city was developed alongside the port to house the workforce and the freight businesses that grew around it." },
      { type: "p", text: "That history is why a Gandhidham-based transporter is a natural fit for Kandla work. Our office at Zhanda Chowk is minutes from the dock area, so a vehicle that needs to be repositioned or a document that needs to be chased is a short trip rather than a day of remote coordination." },
      { type: "h2", text: "What we move at Kandla" },
      { type: "list", items: [
        "32FT SXL (9MT) and MXL (18MT) container movement to and from the docks",
        "Trailer and multi-axle movement for heavy and bulk consignments",
        "Bulk raw material inbound and finished goods outbound",
        "Documentation support aligned to the physical movement",
        "Inland distribution from the port into Gujarat and onward across India"
      ] },
      { type: "h2", text: "Port and warehousing coordination" },
      { type: "p", text: "Kandla freight rarely involves just a road leg. Cargo is released from a terminal, stored or transferred at a warehouse or plot, and then moved inland. We plan the road movement as part of that chain — sequencing the pickup so the vehicle is not left waiting on release, and aligning delivery appointments with the receiving facility rather than arriving unannounced." },
      { type: "h2", text: "The Kutch industrial corridor" },
      { type: "p", text: "Because the port anchors a large industrial belt, most of our Kandla traffic connects to facilities around Gandhidham, Anjar and the wider district. We handle both the port leg and the inland distribution leg, which means the client deals with one operator across the whole journey instead of stitching two together." },
      { type: "h2", text: "Talk to us about a Kandla movement" },
      { type: "p", text: "Call the transport booking line with the cargo details, the vehicle or container class, the pickup point and the required date. If your timeline is driven by a vessel or a customs release, tell us — we will plan the road leg around it." },
      { type: "internal", title: "Related pages", items: [
        { path: "/services/kandla-mundra-port-transport/", label: "Kandla & Mundra port transport" },
        { path: "/services/container-booking-32ft/", label: "32FT container booking (SXL / MXL)" },
        { path: "/locations/mundra/", label: "Transport services in Mundra" },
        { path: "/contact/", label: "Contact Om Shiv Logistics" }
      ] }
    ]
  };

  /* =========================== /privacy-policy/ =========================== */
  PAGES["/privacy-policy/"] = {
    file: "privacy-policy/index.html",
    title: "Privacy Policy | Om Shiv Logistics",
    description:
      "How Om Shiv Logistics handles the information you send us, including enquiry details, analytics cookies and your choices. Read our privacy policy here.",
    crumb: "Privacy Policy",
    schemaType: "WebPage",
    h1: "Privacy policy",
    lede:
      "How Om Shiv Logistics collects, uses and protects the information you give us through this website.",
    blocks: [
      { type: "p", text: "This policy explains what happens to information submitted through omshivlogistics.com. It covers information you choose to send us and the analytics data collected automatically as you browse." },
      { type: "h2", text: "Information you send us" },
      { type: "p", text: "When you call, email or submit the request-a-quote form, you may give us your name, company, phone number, email address, and details of your consignment such as origin, destination, material, weight and preferred loading date. We use this only to respond to your enquiry, prepare a quotation and — if you engage us — to operate the transport service you have requested. Enquiries are delivered to our business inbox at gandhidham@omshivlogistics.com." },
      { type: "h2", text: "How long we keep it" },
      { type: "p", text: "Enquiry records are kept while the enquiry and any resulting commercial relationship are active, and for as long afterwards as is necessary to meet accounting and legal obligations. You can ask us to delete an enquiry record that did not lead to a commercial relationship." },
      { type: "h2", text: "Analytics and cookies" },
      { type: "p", text: "This site uses Google Analytics 4 (measurement ID G-4H9SDR2W89) to understand how visitors find and use the pages. Google Analytics sets cookies and collects information such as your approximate location, the pages you view, how you arrived at the site and which device you used. We use this in aggregate to improve the site and our service descriptions; we do not use it to identify you personally." },
      { type: "p", text: "Google processes this data as an independent controller under its own privacy terms. You can opt out of analytics across all sites using Google's browser add-on, and you can block or delete cookies in your browser settings. Blocking analytics cookies does not prevent you from using any part of this site." },
      { type: "h2", text: "What we do not do" },
      { type: "list", items: [
        "We do not sell, rent or trade your information",
        "We do not share consignment details with anyone outside the operators actually carrying out your movement",
        "We do not add you to marketing lists because you requested a quote"
      ] },
      { type: "h2", text: "Third-party services" },
      { type: "p", text: "The site loads Google Analytics, Google Fonts and a Google Maps link. When you click through to Google Maps or WhatsApp, those services apply their own privacy policies, which we do not control." },
      { type: "h2", text: "Your choices" },
      { type: "p", text: "You can ask us to show you the enquiry information we hold about you, correct it, or delete it. Contact us on gandhidham@omshivlogistics.com or call +91 93745 29413 and we will action a reasonable request." },
      { type: "h2", text: "Changes to this policy" },
      { type: "p", text: "If the way we handle information changes, this page will be updated. The policy was last reviewed in October 2026." },
      { type: "todo", text: "Have this policy reviewed by whoever handles your legal and compliance matters. It describes the practices this website actually performs — enquiry handling, Google Analytics, Google Fonts and Maps — but it is not legal advice, and you may want to add a registered entity name, a governing-law clause and a formal grievance contact." }
    ]
  };

  /* =============================== /terms/ =============================== */
  PAGES["/terms/"] = {
    file: "terms/index.html",
    title: "Terms of Use | Om Shiv Logistics",
    description:
      "Terms of use for the Om Shiv Logistics website, covering website content, quotations and enquiries. Read the terms before relying on published information.",
    crumb: "Terms",
    schemaType: "WebPage",
    h1: "Terms of use",
    lede:
      "The basis on which this website and the information published on it are provided.",
    blocks: [
      { type: "h2", text: "Website content" },
      { type: "p", text: "The content on this site describes the services offered by Om Shiv Logistics. It is provided for general information. Descriptions of services, vehicle categories and capabilities are accurate to the best of our knowledge at the time of publication, but they are not a contractual offer and they do not create an obligation to carry any particular consignment." },
      { type: "h2", text: "Quotations" },
      { type: "p", text: "Any rate, estimate or quotation given by phone, email or WhatsApp is indicative until confirmed in writing for a specific consignment. Freight rates depend on lane, vehicle or container class, load weight, handling requirements and the date of movement, and they may change if any of those details change. Nothing on this website constitutes a published tariff." },
      { type: "h2", text: "Carriage of goods" },
      { type: "p", text: "Transport services, when engaged, are provided under the terms agreed for that consignment. Consignments are subject to the documentation, packing and declaration requirements applicable to the goods and the route, and the client is responsible for the accuracy of the information supplied to us." },
      { type: "h2", text: "External links" },
      { type: "p", text: "This site links to external services including Google Maps and WhatsApp. We do not control those services and are not responsible for their content, availability or privacy practices." },
      { type: "h2", text: "Intellectual property" },
      { type: "p", text: "The Om Shiv Logistics name, logo and the content of this website belong to Om Shiv Logistics. Client logos shown on this site remain the property of the respective client businesses and are displayed to identify the businesses we work with." },
      { type: "h2", text: "Contact" },
      { type: "p", text: "Questions about these terms can be sent to gandhidham@omshivlogistics.com or raised on +91 93745 29413." },
      { type: "todo", text: "Have these terms reviewed by whoever handles your legal and commercial contracting. They reflect how the website and quotation process currently work, but they are not legal advice and should be aligned with your actual transport agreement, invoice terms and any liability or insurance position you want to state." }
    ]
  };

  /* ============================== 404 page =============================== */
  PAGES["/404.html"] = {
    file: "404.html",
    title: "Page Not Found | Om Shiv Logistics",
    description:
      "The page you requested could not be found. Use the links here to reach Om Shiv Logistics services, contact details or our Gandhidham office information.",
    crumb: "Page not found",
    schemaType: "WebPage",
    noindex: true,
    robots: "noindex, follow",
    h1: "Page not found",
    lede:
      "That address does not exist on this site. It may have been renamed, or the link that brought you here may be out of date.",
    blocks: [
      { type: "p", text: "Use the links below to find what you were looking for, or call the transport booking line on +91 93745 29413 and we will point you in the right direction." },
      { type: "internal", title: "Popular pages", items: [
        { path: "/", label: "Home — transport contractor in Gandhidham" },
        { path: "/services/", label: "All logistics services" },
        { path: "/services/container-booking-32ft/", label: "32FT container booking (SXL / MXL)" },
        { path: "/services/ftl-ptl-road-transport/", label: "FTL & PTL road transport" },
        { path: "/services/kandla-mundra-port-transport/", label: "Kandla & Mundra port transport" },
        { path: "/about/", label: "About Om Shiv Logistics" },
        { path: "/contact/", label: "Contact and office address" }
      ] }
    ]
  };

  /* ------------------------------------------------------ deduped FAQ bank -- */
  /* Every answer below is drawn from the published FAQ set or from service
     copy on this site. Nothing new is asserted. */
  var FAQ_BANK = {
    rates: {
      q: "How is freight priced?",
      a: "Pricing is built on lane distance, vehicle type, load weight and handling requirements, with load-layout planning to maximise space per truck and bring down cost per tonne. Share your lane and load details and we will revert with a formal quotation."
    },
    coverage: {
      q: "Which industries and regions do you serve?",
      a: "We are a B2B fleet supplier and transport contractor serving manufacturing facilities, extraction industries and distribution plants across Gandhidham, Kutch and the wider Gujarat region, with pickup and delivery across India through our network."
    },
    documents: {
      q: "What do you need from us to quote?",
      a: "Origin and destination, material and approximate weight, vehicle or container size, preferred loading date, and any handling or documentation requirements. If you have drawings or packing lists, send them over WhatsApp and we will factor them in."
    },
    emergency: {
      q: "How fast can you arrange a vehicle in an emergency?",
      a: "Our commission agency arm exists precisely for capacity gaps. Using regional networks we source certified backup fleets during demand peaks. Call the Transport Booking line with your origin, destination, vehicle type and loading date, and we will confirm availability."
    },
    contracts: {
      q: "Do you work on long-term transport contracts?",
      a: "Yes. End-to-end transport contracting is a core specialisation. We provision dedicated trucks for predictable weekly or monthly volumes, with terms flexed around seasonal demand or fluctuating industrial output, and fixed structures so you can plan annual freight expenditure."
    },
    fleet: {
      q: "What kind of vehicles can you place for my consignment?",
      a: "Our network covers 10-tyre and above trucks, multi-axle units, trailers, open-body variants and light commercial vehicles. For containerised movement we supply 32FT SXL (9MT) and MXL (18MT) containers. Sourcing is matched to your load dimensions, weight and handling needs."
    }
  };

  window.OSL_PAGES = {
    SITE: SITE,
    PHONES: PHONES,
    MAIL: MAIL,
    MAIL_GENERAL: MAIL_GENERAL,
    MAPS: MAPS,
    WHATSAPP: WHATSAPP,
    SERVICE_LINKS: SERVICE_LINKS,
    CITY_LINKS: CITY_LINKS,
    FAQ_BANK: FAQ_BANK,
    PAGES: PAGES
  };
})();
