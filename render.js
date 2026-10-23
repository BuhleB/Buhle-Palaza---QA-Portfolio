/*
 * render.js — turns the content in data.js into markup.
 * Runs immediately (script tags execute in document order, after the
 * mount points above them have already been parsed), so no DOMContentLoaded
 * wrapper is needed as long as this file is included after the mount
 * elements and after data.js.
 */
(function () {
  "use strict";

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---- Real / Demo / Pending badge — icon + text, never colour alone ---- */
  function badge(source) {
    if (source === "real") {
      return '<span class="ev-badge real">● REAL PROJECT EVIDENCE</span>';
    }
    if (source === "demo") {
      return '<span class="ev-badge demo">● DEMO / MOCK DATA</span>';
    }
    return '<span class="ev-badge pending">○ REAL EVIDENCE PENDING</span>';
  }

  /* A module (test cases / defects / cross-browser) is "mixed" once at
     least one real item joins the still-demo ones, and fully "real"
     once every item is. Used to update each module's header tag
     automatically as real evidence is added — no HTML edits needed. */
  function moduleSourceTag(items) {
    var hasReal = items.some(function (i) { return i.source === "real"; });
    var hasDemo = items.some(function (i) { return i.source === "demo" || i.source === "pending"; });
    if (hasReal && hasDemo) return "· REAL + DEMO DATA";
    if (hasReal) return "· REAL PROJECT EVIDENCE";
    return "· MOCK DATA";
  }

  /* ============ EVIDENCE GALLERY (used by Case Studies) ============ */
  function renderEvidenceGallery(containerId, items) {
    var el = document.getElementById(containerId);
    if (!el || !items) return;
    /* Pending slots are never published; fill them in data.js to show them. */
    items = items.filter(function (i) { return i.source !== "pending"; });
    el.innerHTML = items.map(function (item) {
      var visual;
      if (item.source === "real" && item.asset) {
        visual = '<img class="evidence-visual" src="' + esc(item.asset) + '" alt="' + esc(item.title) + '" tabindex="0" role="button" aria-label="View larger image: ' + esc(item.title) + '">';
      } else if (item.source === "pending") {
        visual = '<div class="evidence-visual pending">[ ' + esc((item.replaceWith || item.title).toUpperCase()) + ' ]</div>';
      } else {
        visual = '<div class="evidence-visual">[ ' + esc(item.title.toUpperCase()) + ' ]</div>';
      }
      var tags = (item.tags || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
      var replaceLine = item.source === "pending" && item.replaceWith
        ? '<p class="ev-replace mono">Replace with: ' + esc(item.replaceWith) + '</p>' : "";
      return (
        '<div class="evidence-card">' +
          visual +
          '<div class="evidence-card-body">' +
            '<div class="ev-cat mono">' + esc(item.category) + '</div>' +
            '<h4>' + esc(item.title) + '</h4>' +
            '<p>' + esc(item.description) + '</p>' +
            replaceLine +
            '<div class="evidence-tags mono">' + tags + '</div>' +
            badge(item.source) +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  /* ============ SOURCE LINKS (GitHub / Live / LinkedIn) ============ */
  /* Renders nothing when every link is null — never fabricates a URL. */
  function renderSourceLinks(containerId, links) {
    var el = document.getElementById(containerId);
    if (!el || !links) return;
    var parts = [];
    if (links.github) parts.push('<a class="arrow" href="' + esc(links.github) + '">VIEW SOURCE →</a>');
    (links.repositories || []).forEach(function (repo) {
      parts.push('<a class="arrow" href="' + esc(repo.url) + '">' + esc(repo.label) + ' →</a>');
    });
    if (links.live) parts.push('<a class="arrow" href="' + esc(links.live) + '">VIEW LIVE PROJECT →</a>');
    if (links.linkedin) parts.push('<a class="arrow" href="' + esc(links.linkedin) + '">VIEW EXPERIENCE →</a>');
    el.innerHTML = parts.length ? '<div class="cs-links">' + parts.join("") + '</div>' : "";
  }

  /* ============ QA LAB: TEST CASES ============ */
  function renderTestCases(containerId, cases) {
    var el = document.getElementById(containerId);
    if (!el || !cases) return;
    var resultClass = { pass: "result-pass", review: "result-review", fail: "result-fail", xfail: "result-review" };
    var resultLabel = { pass: "PASS ✓", review: "REVIEW ⚠", fail: "FAIL ✕", xfail: "XFAIL" };

    el.innerHTML = cases.map(function (tc) {
      var steps = tc.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
      var note = tc.note ? '<br><span style="color:#63636b">Note: ' + esc(tc.note) + '</span>' : "";
      return (
        '<details class="tc-item" data-type="' + esc(tc.type) + '">' +
          '<summary>' +
            '<span><span class="tc-id mono">' + esc(tc.id) + '</span><span class="tc-title">' + esc(tc.title) + '</span></span>' +
            '<span class="' + resultClass[tc.result] + ' mono">' + resultLabel[tc.result] + '</span>' +
            '<span class="tc-chev" aria-hidden="true">›</span>' +
          '</summary>' +
          '<div class="tc-detail">' +
            '<div><strong>PRECONDITION</strong><p>' + esc(tc.precondition) + '</p></div>' +
            '<div><strong>STEPS</strong><ol>' + steps + '</ol></div>' +
            '<div><strong>EXPECTED</strong><p>' + esc(tc.expected) + '</p></div>' +
            '<div><strong>RECORDED OUTCOME</strong><p>' + esc(tc.actual || 'Not recorded') + note + '</p></div>' +
          '</div>' +
        '</details>'
      );
    }).join("");

    var tag = document.getElementById(containerId + "ModTag");
    if (tag) tag.textContent = moduleSourceTag(cases);

    /* Wire filters here too, since items are injected after the page's
       original static listeners would have run. */
    var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".tc-filter"));
    var tcItems = Array.prototype.slice.call(el.querySelectorAll(".tc-item"));
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        tcItems.forEach(function (item) {
          var match = filter === "all" || item.getAttribute("data-type") === filter;
          item.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ============ QA LAB: DEFECTS ============ */
  function renderDefects(containerId, timelineId, defects) {
    var el = document.getElementById(containerId);
    var tl = document.getElementById(timelineId);
    if (!el || !defects || !defects.length) return;
    var d = defects[0]; /* single-defect layout, matches existing design */

    var stepsHtml = d.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
    el.innerHTML =
      '<div class="defect-id mono">' + esc(d.id) + '</div>' +
      '<h4 class="defect-title">' + esc(d.title) + '</h4>' +
      '<div class="defect-meta mono">' +
        '<div><strong>SEVERITY</strong>' + esc(d.severity) + '</div>' +
        '<div><strong>PRIORITY</strong>' + esc(d.priority) + '</div>' +
        '<div><strong>ENVIRONMENT</strong>' + esc(d.environment) + '</div>' +
        '<div><strong>STATUS</strong><span class="status-val">' + esc(d.status) + ' ✓</span></div>' +
      '</div>' +
      '<div class="defect-section"><h5>DESCRIPTION</h5><p>' + esc(d.description) + '</p></div>' +
      '<div class="defect-section"><h5>STEPS TO REPRODUCE</h5><ol>' + stepsHtml + '</ol></div>' +
      '<div class="defect-section"><h5>EXPECTED</h5><p>' + esc(d.expected) + '</p></div>' +
      '<div class="defect-section" style="margin-bottom:0"><h5>ACTUAL</h5><p>' + esc(d.actual) + '</p></div>' +
      badge(d.source);

    if (tl && d.lifecycle) {
      tl.innerHTML = d.lifecycle.map(function (stage) {
        return '<li class="done"><span class="stage-name">' + esc(stage.stage) + '</span><span class="stage-time mono">' + esc(stage.time) + '</span></li>';
      }).join("");
    }

    var tag = document.getElementById(containerId + "ModTag");
    if (tag) tag.textContent = moduleSourceTag(defects);
  }

  /* ============ QA LAB: CROSS-BROWSER MATRIX ============ */
  function renderCrossBrowser(containerId, rows) {
    var el = document.getElementById(containerId);
    if (!el || !rows) return;
    var tagHtml = { pass: '<span class="status-tag pass">✓ PASS</span>',
                     review: '<span class="status-tag review">⚠ REVIEW</span>',
                     fail: '<span class="status-tag fail">✕ FAIL</span>' };
    el.innerHTML = rows.map(function (r) {
      return (
        '<tr><th scope="row">' + esc(r.feature) + '</th>' +
        '<td>' + tagHtml[r.chrome] + '</td>' +
        '<td>' + tagHtml[r.edge] + '</td>' +
        '<td>' + tagHtml[r.firefox] + '</td></tr>'
      );
    }).join("");

    var tag = document.getElementById(containerId + "ModTag");
    if (tag) tag.textContent = moduleSourceTag(rows);
  }

  /* ============ EVIDENCE LIGHTBOX ============
     Click (or Enter/Space on) any real evidence image to view it full-size.
     Uses event delegation, so it works for evidence images injected by
     renderEvidenceGallery on any page, now or later — no per-page wiring. */
  function ensureLightbox() {
    var lb = document.getElementById("evLightbox");
    if (lb) return lb;
    lb = document.createElement("div");
    lb.id = "evLightbox";
    lb.className = "ev-lightbox";
    lb.setAttribute("aria-hidden", "true");
    lb.innerHTML =
      '<button type="button" class="ev-lightbox-close" aria-label="Close">×</button>' +
      '<img class="ev-lightbox-img" alt="">' +
      '<div class="ev-lightbox-caption mono"></div>';
    document.body.appendChild(lb);
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("ev-lightbox-close")) closeLightbox();
    });
    return lb;
  }

  function closeLightbox() {
    var lb = document.getElementById("evLightbox");
    if (!lb) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("ev-lock-scroll");
  }

  function openLightbox(src, caption) {
    var lb = ensureLightbox();
    lb.querySelector(".ev-lightbox-img").src = src;
    lb.querySelector(".ev-lightbox-img").alt = caption || "";
    lb.querySelector(".ev-lightbox-caption").textContent = caption || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("ev-lock-scroll");
  }

  document.addEventListener("click", function (e) {
    var img = e.target.closest && e.target.closest("img.evidence-visual");
    if (img) { openLightbox(img.getAttribute("src"), img.getAttribute("alt")); return; }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeLightbox(); return; }
    if (e.key !== "Enter" && e.key !== " ") return;
    var el = document.activeElement;
    if (el && el.matches && el.matches("img.evidence-visual")) {
      e.preventDefault();
      openLightbox(el.getAttribute("src"), el.getAttribute("alt"));
    }
  });

  /* Expose the render functions used by each page's inline script. */
  window.PortfolioRender = {
    renderEvidenceGallery: renderEvidenceGallery,
    renderSourceLinks: renderSourceLinks,
    renderTestCases: renderTestCases,
    renderDefects: renderDefects,
    renderCrossBrowser: renderCrossBrowser
  };
})();
/* Close the mobile navigation after selecting a destination. */
document.querySelectorAll('.mobile-menu-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    var menu = link.closest('.mobile-menu');
    if (menu) menu.removeAttribute('open');
  });
});
