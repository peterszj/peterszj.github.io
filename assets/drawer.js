/* ========================================
   Peter Sun — Portfolio Site
   Slide-out project drawer (vanilla JS, no dependencies).

   Behaviour:
     - opens from the right; translucent backdrop
     - close button, click-backdrop, and ESC all close it
     - smooth animation (respects prefers-reduced-motion)
     - locks background scroll while open
     - focus trap + ARIA dialog semantics
     - returns focus to the trigger element on close
     - near-fullscreen on narrow screens (handled in CSS)
     - deep-linkable via URL hash, e.g. research.html#cuda

   Any element with [data-project="<id>"] becomes a trigger.
   Content comes from window.PROJECTS (assets/projects.js).
   ======================================== */

(function () {
  "use strict";

  var PROJECTS = window.PROJECTS || {};
  var lastTrigger = null;
  var backdrop, drawer, contentEl, closeBtn;
  var FOCUSABLE =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  /* ---------- Build the drawer DOM once ---------- */
  function build() {
    backdrop = document.createElement("div");
    backdrop.className = "drawer-backdrop";
    backdrop.hidden = true;

    drawer = document.createElement("aside");
    drawer.className = "drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-labelledby", "drawer-title");
    drawer.hidden = true;
    drawer.innerHTML =
      '<div class="drawer-panel">' +
        '<button class="drawer-close" type="button" aria-label="Close project details">&times;</button>' +
        '<div class="drawer-content" tabindex="-1"></div>' +
      "</div>";

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    contentEl = drawer.querySelector(".drawer-content");
    closeBtn = drawer.querySelector(".drawer-close");

    backdrop.addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", onKeydown);
  }

  /* ---------- Render one project into the drawer ---------- */
  function render(p) {
    var meta = "";
    if (p.meta && p.meta.length) {
      meta = '<dl class="project-meta-grid">';
      for (var i = 0; i < p.meta.length; i++) {
        meta +=
          "<dt>" + p.meta[i][0] + "</dt><dd>" + p.meta[i][1] + "</dd>";
      }
      meta += "</dl>";
    }
    contentEl.innerHTML =
      '<div class="project-header">' +
        '<p class="project-eyebrow">' + (p.eyebrow || "") + "</p>" +
        '<h1 id="drawer-title">' + p.title + "</h1>" +
        meta +
      "</div>" +
      p.body;
    contentEl.scrollTop = 0;
  }

  /* ---------- Open ---------- */
  function open(id, trigger) {
    var p = PROJECTS[id];
    if (!p) return;

    lastTrigger = trigger || document.activeElement;
    render(p);

    backdrop.hidden = false;
    drawer.hidden = false;
    // force reflow so the transition runs from the hidden state
    void drawer.offsetWidth;
    backdrop.classList.add("is-open");
    drawer.classList.add("is-open");

    document.body.classList.add("drawer-open");
    closeBtn.focus();

    if (history.replaceState) {
      history.replaceState(null, "", "#" + id);
    }
  }

  /* ---------- Close ---------- */
  function close() {
    if (drawer.hidden) return;

    backdrop.classList.remove("is-open");
    drawer.classList.remove("is-open");
    document.body.classList.remove("drawer-open");

    var done = function () {
      drawer.hidden = true;
      backdrop.hidden = true;
      drawer.removeEventListener("transitionend", done);
    };
    if (prefersReducedMotion()) {
      done();
    } else {
      drawer.addEventListener("transitionend", done);
      // fallback in case transitionend doesn't fire
      setTimeout(done, 400);
    }

    if (history.replaceState) {
      history.replaceState(
        null,
        "",
        location.pathname + location.search
      );
    }

    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /* ---------- Keyboard: ESC + focus trap ---------- */
  function onKeydown(e) {
    if (drawer.hidden) return;

    if (e.key === "Escape" || e.key === "Esc") {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === "Tab") {
      var nodes = drawer.querySelectorAll(FOCUSABLE);
      if (!nodes.length) return;
      var first = nodes[0];
      var last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!drawer.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /* ---------- Wire up triggers ---------- */
  function bindTriggers() {
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-project]");
      if (!trigger) return;
      var id = trigger.getAttribute("data-project");
      if (!PROJECTS[id]) return;
      e.preventDefault();
      open(id, trigger);
    });
  }

  /* ---------- Open from URL hash on load (deep link) ---------- */
  function openFromHash() {
    var id = (location.hash || "").replace(/^#/, "");
    if (id && PROJECTS[id]) {
      open(id, null);
    }
  }

  function init() {
    build();
    bindTriggers();
    openFromHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
