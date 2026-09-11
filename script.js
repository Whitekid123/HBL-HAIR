/* =========================================================
   HBL Hair Studio
   ---------------------------------------------------------
   ADD YOUR PHOTOS HERE. Drop the image file into /images,
   then add one line below. That's the only edit needed.

     src  - file name inside the images folder
     cat  - locs | twists | braids | studio  (drives filters)
     alt  - short description (accessibility + SEO)
   ========================================================= */
const GALLERY = [
  { src: "images/gallery-01.jpg", cat: "twists", alt: "Two-strand twists with clean box parting" },
  { src: "images/gallery-02.jpg", cat: "braids", alt: "Cornrow knots styled into rows" },
  { src: "images/gallery-03.jpg", cat: "twists", alt: "Long two-strand twists, side view" },
  { src: "images/gallery-04.jpg", cat: "studio", alt: "HBL Hair Studio shopfront" },
  { src: "images/gallery-05.jpg", cat: "studio", alt: "Outside the studio on opening day" },
  // { src: "images/gallery-06.jpg", cat: "locs",  alt: "Fresh retwist with barrel curls" },
];


/* ---------- Gallery render ---------- */
const grid = document.getElementById("grid");
grid.innerHTML = GALLERY.map((g, i) => `
  <button class="tile" data-cat="${g.cat}" data-i="${i}" aria-label="View photo: ${g.alt}">
    <img src="${g.src}" alt="${g.alt}" loading="lazy">
    <span class="tile__cap">${g.alt}</span>
  </button>`).join("");

/* ---------- Filters ---------- */
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("is-active", c === btn));
  const f = btn.dataset.filter;
  document.querySelectorAll(".tile").forEach(t => {
    const show = f === "all" || t.dataset.cat === f;
    t.classList.toggle("is-hidden", !show);
    if (show) { t.style.animation = "none"; void t.offsetWidth; t.style.animation = ""; }
  });
});

/* ---------- Lightbox ---------- */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
let current = 0;

function visibleTiles() {
  return [...document.querySelectorAll(".tile:not(.is-hidden)")];
}
function openLb(i) {
  current = i;
  const g = GALLERY[i];
  lbImg.src = g.src;
  lbImg.alt = g.alt;
  lb.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeLb() {
  lb.classList.remove("is-open");
  document.body.style.overflow = "";
}
function step(dir) {
  const tiles = visibleTiles();
  const idxs = tiles.map(t => +t.dataset.i);
  const pos = idxs.indexOf(current);
  openLb(idxs[(pos + dir + idxs.length) % idxs.length]);
}

grid.addEventListener("click", e => {
  const tile = e.target.closest(".tile");
  if (tile) openLb(+tile.dataset.i);
});
document.getElementById("lbClose").addEventListener("click", closeLb);
document.getElementById("lbPrev").addEventListener("click", e => { e.stopPropagation(); step(-1); });
document.getElementById("lbNext").addEventListener("click", e => { e.stopPropagation(); step(1); });
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

/* ---------- Sticky nav ---------- */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- Mobile drawer ---------- */
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
burger.addEventListener("click", () => {
  const open = drawer.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});
drawer.addEventListener("click", e => {
  if (e.target.tagName !== "A") return;
  drawer.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
});

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px" });
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

/* ---------- Year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
