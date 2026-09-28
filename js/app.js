/* ==========================================================================
   OM SHIV LOGISTICS — application entry point
   Mounts the React tree into the pre-rendered page shells.
   ========================================================================== */
(function () {
  "use strict";

  const C = window.OSL_COMPONENTS;
  const html = htm.bind(React.createElement);

  /* ------------------------------------------------------------- the page -- */
  function App() {
    C.useReveal();

    return html`
      <${React.Fragment}>
        <${C.ScrollProgress} />
        <${C.Header} />
        <${C.Hero} />
        <${C.Clients} />
        <${C.Marquee} />
        <${C.Services} />
        <${C.Fleet} />
        <${C.Segments} />
        <${C.WhyUs} />
        <${C.HowWeWork} />
        <${C.DispatchBoard} />
        <${C.Faq} />
        <${C.Posters} />
        <${C.Contact} />
      <//>
    `;
  }

  function mount() {
    try {
      ReactDOM.createRoot(document.getElementById("main")).render(html`<${App} />`);
      ReactDOM.createRoot(document.getElementById("site-header")).render(html`<${C.Header} />`);
      ReactDOM.createRoot(document.getElementById("site-footer")).render(html`<${C.Footer} />`);
      ReactDOM.createRoot(document.getElementById("float-actions")).render(html`<${C.FloatActions} />`);
      ReactDOM.createRoot(document.getElementById("mobile-bar")).render(html`<${C.MobileBar} />`);
    } catch (err) {
      // Last-resort guard so the page never renders blank
      const main = document.getElementById("main");
      if (main) {
        main.innerHTML =
          '<div style="padding:120px 20px;text-align:center;font-family:sans-serif">' +
          "<h1>Om Shiv Logistics</h1>" +
          "<p>Our interactive page could not load. Please call <strong>+91 93745 29413</strong> " +
          'or email <a href="mailto:gandhidham@omshivlogistics.com">gandhidham@omshivlogistics.com</a>.</p>' +
          "</div>";
      }
      console.error("OSL render error:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
