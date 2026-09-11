/* ══════════════════════════════════════════════════════════
   HBL — Hair By Laura N.
   ──────────────────────────────────────────────────────────
   EDIT YOUR CONTENT IN THE TWO LISTS BELOW.
   Everything under "ENGINE" is the animation code.
   ══════════════════════════════════════════════════════════ */

/* Prices and the service menu live in data.js — edit that file.

   ── 1. PORTFOLIO ──────────────────────────────────────────
   Drop a photo into /images, then add one line here.
   cat: locs | twists | studio   (drives the filter chips)   */
const GALLERY = [
  { src: "images/work-twists-top.jpg",   cat: "twists", alt: "Two-strand twists, clean box parting" },
  { src: "images/work-loc-braids.jpg",   cat: "locs",   alt: "Loc maintenance, retwisted and set in rows" },
  { src: "images/work-twists-side.jpg",  cat: "twists", alt: "Long two-strand twists, side profile" },
  { src: "images/studio-front.jpg",      cat: "studio", alt: "HBL Hair Studio, College Street Mews" },
  { src: "images/laura-outside.jpg",     cat: "studio", alt: "Laura N. outside the studio" },
];

/* Where appointment requests go if the WhatsApp button is used. */
const WHATSAPP_NUMBER = "447479412516";

/* ══════════════════════════════════════════════════════════
   ENGINE — no need to edit below this line
   ══════════════════════════════════════════════════════════ */
(() => {
"use strict";
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Preloader ───────────────────────────────────────────── */
const pre = $("#pre");
if (pre) {
  const bar = $("#preBar"), pct = $("#prePct");
  let n = 0;
  const tick = setInterval(() => {
    n = Math.min(100, n + Math.random() * 18);
    bar.style.transform = `scaleX(${n / 100})`;
    pct.textContent = Math.round(n);
    if (n >= 100) {
      clearInterval(tick);
      setTimeout(() => { pre.classList.add("is-done"); document.body.classList.remove("is-locked"); start(); }, 380);
    }
  }, REDUCED ? 30 : 170);
  document.body.classList.add("is-locked");
  // Safety net: never trap the page behind the preloader
  setTimeout(() => {
    clearInterval(tick);
    pre.classList.add("is-done");
    document.body.classList.remove("is-locked");
    start();
  }, 4000);
} else {
  addEventListener("DOMContentLoaded", start, { once: true });
}

/* ── Scroll reveal ───────────────────────────────────────── */
function observeReveals() {
  const io = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
  $$(".rv:not(.is-in), .msk:not(.is-in), .gal__i:not(.is-in), .policy__body section").forEach(el => io.observe(el));
}

/* ── Masked headline lines ───────────────────────────────── */
function revealMasks() {
  const io = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      $$(".msk", e.target).forEach((m, i) => setTimeout(() => m.classList.add("is-in"), i * 95));
      io.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  $$("h1, h2").forEach(h => { if ($(".msk", h)) io.observe(h); });
}

/* ── Parallax ────────────────────────────────────────────── */
function initParallax() {
  if (REDUCED) return;
  const items = $$("[data-parallax]");
  if (!items.length) return;
  let ticking = false;
  const run = () => {
    const vh = innerHeight;
    items.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const mid = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-mid * parseFloat(el.dataset.parallax)).toFixed(2)}px, 0)`;
    });
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
  addEventListener("resize", run, { passive: true });
  run();
}

/* ── Nav: solid + hide on scroll down ────────────────────── */
function initNav() {
  const nav = $("#nav"), prog = $("#prog");
  if (!nav) return;
  const forceSolid = nav.classList.contains("is-solid");
  let last = scrollY;
  const run = () => {
    const y = scrollY;
    if (!forceSolid) nav.classList.toggle("is-solid", y > 60);
    nav.classList.toggle("is-hidden", y > 400 && y > last && !$("#menu")?.classList.contains("is-open"));
    last = y;
    if (prog) {
      const max = document.documentElement.scrollHeight - innerHeight;
      prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }
  };
  addEventListener("scroll", run, { passive: true });
  run();
}

/* ── Mobile menu ─────────────────────────────────────────── */
function initMenu() {
  const burger = $("#burger"), menu = $("#menu");
  if (!burger || !menu) return;
  const links = $$("a", menu);
  const set = (open) => {
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    links.forEach((a, i) => { a.style.transitionDelay = open ? `${0.18 + i * 0.07}s` : "0s"; });
  };
  burger.addEventListener("click", () => set(!menu.classList.contains("is-open")));
  menu.addEventListener("click", e => { if (e.target.tagName === "A") set(false); });
  addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
}

/* ── Custom cursor ───────────────────────────────────────── */
function initCursor() {
  const dot = $("#cur"), ring = $("#curD");
  if (!dot || !ring || REDUCED || matchMedia("(hover:none)").matches) return;
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px,${y}px)`; });
  (function loop() {
    rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", e => {
    document.body.classList.toggle("cur-on", !!e.target.closest(".gal__i"));
  });
}

/* ── Magnetic buttons ────────────────────────────────────── */
function initMagnetic() {
  if (REDUCED || matchMedia("(hover:none)").matches) return;
  $$(".btn").forEach(b => {
    b.addEventListener("mousemove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    b.addEventListener("mouseleave", () => {
      b.style.transition = "transform .6s cubic-bezier(.19,1,.22,1)";
      b.style.transform = "";
      setTimeout(() => { b.style.transition = ""; }, 600);
    });
  });
}

/* ── Count-up stats ──────────────────────────────────────── */
function initCounters() {
  const els = $$("[data-count]");
  if (!els.length) return;
  const io = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suf = el.dataset.suffix || "";
      const t0 = performance.now(), dur = REDUCED ? 1 : 1600;
      (function step(t) {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
}

/* ── Pinned services ─────────────────────────────────────── */
function initPinned() {
  const list = $("#srvList"), media = $("#pinMedia");
  if (!list || !media) return;
  const rows = $$(".srv__row", list), imgs = $$("img", media);
  const show = (i) => {
    rows.forEach((r, k) => r.classList.toggle("is-live", k === i));
    imgs.forEach((m, k) => m.classList.toggle("is-live", k === i));
  };
  rows.forEach((r, i) => {
    r.addEventListener("mouseenter", () => show(i));
    r.addEventListener("click", () => { location.href = "book.html"; });
  });
  const io = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) show(+e.target.dataset.i); });
  }, { threshold: 0.5, rootMargin: "-35% 0px -35% 0px" });
  rows.forEach(r => io.observe(r));
}

/* ── Gallery + lightbox ──────────────────────────────────── */
function initGallery() {
  const gal = $("#gal");
  if (!gal) return;
  gal.innerHTML = GALLERY.map((g, i) => `
    <figure class="gal__i" data-cat="${g.cat}" data-i="${i}" role="button" tabindex="0" aria-label="View: ${g.alt}" style="margin:0">
      <img src="${g.src}" alt="${g.alt}" loading="lazy">
      <figcaption>${g.alt}</figcaption>
    </figure>`).join("");

  const chips = $("#chips");
  if (chips) chips.addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    $$(".chip", chips).forEach(c => c.setAttribute("aria-pressed", String(c === b)));
    $$(".gal__i", gal).forEach(t => { t.hidden = !(b.dataset.f === "all" || t.dataset.cat === b.dataset.f); });
  });

  const lb = $("#lb"), lbI = $("#lbI"), lbC = $("#lbC");
  if (!lb) return;
  let cur = 0;
  const open = (i) => {
    cur = i; lbI.src = GALLERY[i].src; lbI.alt = GALLERY[i].alt;
    lbC.textContent = GALLERY[i].alt;
    lb.classList.add("is-open"); document.body.classList.add("is-locked");
  };
  const close = () => { lb.classList.remove("is-open"); document.body.classList.remove("is-locked"); };
  const step = (d) => {
    const vis = $$(".gal__i:not([hidden])", gal).map(t => +t.dataset.i);
    if (!vis.length) return;
    const p = vis.indexOf(cur);
    open(vis[(p + d + vis.length) % vis.length]);
  };
  gal.addEventListener("click", e => { const t = e.target.closest(".gal__i"); if (t) open(+t.dataset.i); });
  gal.addEventListener("keydown", e => {
    const t = e.target.closest(".gal__i");
    if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(+t.dataset.i); }
  });
  $("#lbX").addEventListener("click", close);
  $("#lbP").addEventListener("click", e => { e.stopPropagation(); step(-1); });
  $("#lbN").addEventListener("click", e => { e.stopPropagation(); step(1); });
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

/* ── Testimonial rotator ─────────────────────────────────── */
function initQuotes() {
  const wrap = $("#qs"), nav = $("#qnav");
  if (!wrap || !nav) return;
  const qs = $$(".q", wrap);
  nav.innerHTML = qs.map((_, i) => `<button aria-label="Quote ${i + 1}" aria-pressed="${i === 0}"></button>`).join("");
  const dots = $$("button", nav);
  let i = 0, timer;
  const go = (n) => {
    i = (n + qs.length) % qs.length;
    qs.forEach((q, k) => q.classList.toggle("is-live", k === i));
    dots.forEach((d, k) => d.setAttribute("aria-pressed", String(k === i)));
  };
  const play = () => { if (!REDUCED) timer = setInterval(() => go(i + 1), 6000); };
  dots.forEach((d, k) => d.addEventListener("click", () => { clearInterval(timer); go(k); play(); }));
  wrap.addEventListener("mouseenter", () => clearInterval(timer));
  wrap.addEventListener("mouseleave", play);
  play();
}

/* ── Price list page ─────────────────────────────────────── */
function initPriceList() {
  const out = $("#menuOut");
  if (!out || typeof MENU === "undefined") return;

  out.innerHTML = MENU.map(c => `
    <section class="catBlock rv" id="${c.id}">
      <div class="catHead">
        <div>
          ${c.tier ? `<span class="tier">${c.tier}</span>` : ""}
          <h2 class="d3">${c.name}</h2>
          ${c.blurb ? `<p>${c.blurb}</p>` : ""}
        </div>
        <span class="from">from ${fmtPrice(cheapest(c))}</span>
      </div>
      ${c.items.map(i => `
        <article class="priceRow" data-find="${(c.name + " " + (c.tier || "") + " " + i.name).toLowerCase()}">
          <div>
            <h3>${i.name}</h3>
            ${i.note ? `<p class="note">${i.note}</p>` : ""}
          </div>
          <span class="dur">${fmtMins(i.mins)}</span>
          <span class="amt">${fmtPrice(i.price)}</span>
        </article>`).join("")}
    </section>`).join("");

  $("#addonOut").innerHTML = ADDONS.map(a =>
    `<li><b>${a.name}</b><span>+${fmtPrice(a.price)}</span></li>`).join("");

  // Category filter
  const chips = $("#catChips");
  chips.innerHTML = `<button class="chip" data-c="all" aria-pressed="true">All</button>` +
    MENU.map(c => `<button class="chip" data-c="${c.id}" aria-pressed="false">${c.name}${c.tier ? " · " + (c.tier.includes("Laura") ? "Laura" : "Graduate") : ""}</button>`).join("");

  let cat = "all", q = "";
  const apply = () => {
    let hits = 0;
    $$(".catBlock", out).forEach(block => {
      const inCat = cat === "all" || block.id === cat;
      let shown = 0;
      $$(".priceRow", block).forEach(row => {
        const match = inCat && (!q || row.dataset.find.includes(q));
        row.hidden = !match;
        if (match) shown++;
      });
      block.hidden = shown === 0;
      hits += shown;
    });
    $("#noHits").hidden = hits > 0;
  };
  chips.addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    $$(".chip", chips).forEach(c => c.setAttribute("aria-pressed", String(c === b)));
    cat = b.dataset.c;
    apply();
  });
  const srch = $("#srch");
  srch.addEventListener("input", () => { q = srch.value.trim().toLowerCase(); apply(); });
}

/* ── Booking flow ────────────────────────────────────────── */
function initBooking() {
  const form = $("#bkForm");
  if (!form || typeof MENU === "undefined") return;

  /* Step 1 — category chips + service list, both built from the menu */
  const cats = $("#bkCats"), svcs = $("#bkSvcs");
  cats.innerHTML = MENU.map((c, i) =>
    `<button type="button" class="chip" data-c="${c.id}" aria-pressed="${i === 0}">${c.name}${c.tier ? " · " + (c.tier.includes("Laura") ? "Laura" : "Graduate") : ""}</button>`).join("");

  const paint = (id) => {
    const c = MENU.find(x => x.id === id);
    svcs.innerHTML = c.items.map(i => `
      <label class="pick">
        <input type="radio" name="Service" value="${i.name} — ${catLabel(c)}"
               data-price="${i.price}" data-mins="${i.mins}" data-addons="${i.addons ? 1 : 0}">
        <span>
          <b>${i.name}</b>
          <em class="amt">${fmtPrice(i.price)}</em>
          <em class="dur">${fmtMins(i.mins)}</em>
          ${i.note ? `<em class="note">${i.note}</em>` : ""}
        </span>
      </label>`).join("");
    svcs.scrollTop = 0;
  };
  paint(MENU[0].id);
  cats.addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    $$(".chip", cats).forEach(c => c.setAttribute("aria-pressed", String(c === b)));
    paint(b.dataset.c);
  });

  /* Step 2 — add-ons */
  $("#bkAddons").innerHTML = ADDONS.map(a => `
    <label class="opt">
      <input type="checkbox" name="Add-ons" value="${a.name}" data-price="${a.price}" data-mins="${a.mins}">
      <span><b>${a.name}</b><i>+${fmtPrice(a.price)}${a.mins ? " · " + fmtMins(a.mins) : ""}</i></span>
    </label>`).join("");

  const chosen = () => form.querySelector('input[name="Service"]:checked');
  const picked = () => [...form.querySelectorAll('input[name="Add-ons"]:checked')];

  function tally() {
    const sv = chosen();
    if (!sv) return { price: 0, mins: 0, list: [] };
    let price = +sv.dataset.price, mins = +sv.dataset.mins;
    const list = picked().map(a => { price += +a.dataset.price; mins += +a.dataset.mins; return a.value; });
    return { price, mins, list };
  }
  function paintTotal() {
    const t = tally();
    $("#bkTotal").innerHTML =
      `<span class="lbl">Estimated total</span>
       <span class="fig">${fmtPrice(t.price)}<small>${fmtMins(t.mins)} · starting price</small></span>`;
  }
  form.addEventListener("change", paintTotal);

  const panels = $$(".bk__panel", form);
  const steps  = $$("#bkSteps li");
  const back   = $("#bkBack"), next = $("#bkNext"), send = $("#bkSend");
  const LAST   = panels.length - 2;
  let step = 0;

  const d1 = $("#date1"), d2 = $("#date2");
  const today = new Date(), max = new Date();
  max.setFullYear(max.getFullYear() + 1);
  [d1, d2].forEach(d => { if (d) { d.min = today.toISOString().slice(0, 10); d.max = max.toISOString().slice(0, 10); } });

  const val = (n) => {
    const el = form.elements[n];
    if (!el) return "";
    if (el instanceof RadioNodeList || (el.length && !("value" in el))) {
      return ([...el].find(r => r.checked) || {}).value || "";
    }
    return el.value || "";
  };

  const render = () => {
    panels.forEach((p, i) => p.classList.toggle("is-live", i === step));
    steps.forEach((s, i) => s.dataset.state = i === step ? "live" : (i < step ? "done" : ""));
    back.disabled = step === 0;
    next.hidden = step >= LAST;
    send.hidden = step !== LAST;
    $("#bkNav").hidden = step > LAST;
    if (step === 1) {
      const sv = chosen();
      const allowed = sv && sv.dataset.addons === "1";
      $("#addonHint").textContent = allowed
        ? "Optional extras for loc appointments. Skip straight past if you don't need any."
        : "No extras apply to this service — continue to choose your date.";
      $$("#bkAddons .opt").forEach(o => { o.hidden = !allowed; });
      paintTotal();
    }
    if (step === LAST) buildSummary();
    const top = $(".bk").getBoundingClientRect().top + scrollY - 110;
    if (scrollY > top) scrollTo({ top, behavior: REDUCED ? "auto" : "smooth" });
  };

  function buildSummary() {
    const t = tally();
    const rows = [
      ["Service", val("Service")],
      ["Extras", t.list.length ? t.list.join(", ") : "None"],
      ["First choice", val("First choice date") + (val("Preferred time") ? " · " + val("Preferred time") : "")],
    ];
    if (val("Second choice date")) rows.push(["Second choice", val("Second choice date")]);
    if (val("Stylist")) rows.push(["Stylist", val("Stylist")]);
    rows.push(["Estimate", `${fmtPrice(t.price)} · ${fmtMins(t.mins)}`]);
    $("#bkSummary").innerHTML = "<dl>" +
      rows.map(([k, v]) => `<dt>${k}</dt><dd>${v || "—"}</dd>`).join("") + "</dl>";
  }

  function validate() {
    const panel = panels[step];
    const err = $("#err" + step);
    if (err) err.textContent = "";
    $$(".field", panel).forEach(f => f.classList.remove("is-bad"));

    if (step === 0 && !chosen()) { err.textContent = "Please choose a service to continue."; return false; }

    let ok = true;
    $$("input[required], select[required], textarea[required]", panel).forEach(el => {
      if (el.type === "radio" || el.type === "checkbox") return;
      const field = el.closest(".field");
      const msg = field && $(".err", field);
      if (!el.checkValidity()) {
        ok = false;
        field?.classList.add("is-bad");
        if (msg) msg.textContent = el.validationMessage;
      } else if (msg) msg.textContent = "";
    });
    if (!ok && err) err.textContent = "Please complete the highlighted fields.";
    return ok;
  }

  next.addEventListener("click", () => { if (validate()) { step = Math.min(LAST, step + 1); render(); } });
  back.addEventListener("click", () => { step = Math.max(0, step - 1); render(); });

  $$('[data-tier]').forEach(a => a.addEventListener("click", () => {
    const sel = form.elements["Stylist"];
    if (sel) sel.value = a.dataset.tier;
  }));

  function whatsappMessage() {
    const t = tally();
    return encodeURIComponent(
      "Hi HBL, I'd like to request an appointment.\n\n" +
      `Service: ${val("Service")}\n` +
      (t.list.length ? `Extras: ${t.list.join(", ")}\n` : "") +
      `Estimate: ${fmtPrice(t.price)} (${fmtMins(t.mins)})\n` +
      `Stylist: ${val("Stylist")}\n` +
      `First choice: ${val("First choice date")} ${val("Preferred time")}\n` +
      (val("Second choice date") ? `Second choice: ${val("Second choice date")}\n` : "") +
      (val("Hair length") ? `Hair length: ${val("Hair length")}\n` : "") +
      `\nName: ${val("Name")}\nPhone: ${val("Phone")}\nEmail: ${val("Email")}` +
      (val("Notes") ? `\n\nNotes: ${val("Notes")}` : "")
    );
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    $("#waLink").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage()}`;
    step = LAST + 1;
    render();
    fetch(form.getAttribute("action") || "/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    }).catch(() => {});
  });

  render();
}

/* ── Policies scroll-spy ─────────────────────────────────── */
function initSpy() {
  const nav = $("#pnav");
  if (!nav) return;
  const links = $$("a", nav);
  const io = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle("is-live", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  links.forEach(a => { const s = $(a.getAttribute("href")); if (s) io.observe(s); });
}

/* ── Page transitions ────────────────────────────────────── */
function initTransitions() {
  const curtain = $("#curtain");
  if (!curtain) return;
  if (!REDUCED) { curtain.classList.add("is-out"); setTimeout(() => curtain.classList.remove("is-out"), 750); }
  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (!a || REDUCED) return;
    const href = a.getAttribute("href");
    if (!href || a.target === "_blank" || href.startsWith("#") ||
        href.startsWith("tel:") || href.startsWith("mailto:") || a.host !== location.host) return;
    e.preventDefault();
    curtain.classList.remove("is-out");
    curtain.classList.add("is-in");
    setTimeout(() => { location.href = href; }, 620);
  });
}

/* ── Boot ────────────────────────────────────────────────── */
let started = false;
function start() {
  if (started) return;
  started = true;
  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
  initGallery();
  initPriceList();
  initBooking();
  observeReveals();
  revealMasks();
  initParallax();
  initNav();
  initMenu();
  initCursor();
  initMagnetic();
  initCounters();
  initPinned();
  initQuotes();
  initSpy();
  initTransitions();
  // Hero copy animates immediately
  requestAnimationFrame(() => $$(".hero .rv, .hero .msk").forEach(el => el.classList.add("is-in")));
}
})();
