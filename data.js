/* ══════════════════════════════════════════════════════════
   HBL — service menu and pricing
   ──────────────────────────────────────────────────────────
   THIS IS THE ONE PLACE PRICES LIVE.
   Edit here and the price list, the home page and the booking
   form all update together.

     mins  - duration in minutes
     price - starting price in £
     note  - optional small print shown under the name
     addons- true if the loc add-ons apply to this service
   ══════════════════════════════════════════════════════════ */

const ADDONS = [
  { name: "ACV detox",                 price: 20, mins: 0 },
  { name: "Dye (full head of locs)",   price: 35, mins: 10 },
  { name: "Hair wash",                 price: 10, mins: 0 },
  { name: "Highlights",                price: 20, mins: 5 },
];

const MENU = [
  {
    id: "locs-laura",
    name: "Locs Maintenance",
    tier: "Director Stylist — Laura",
    blurb: "Retwists, barrels and loc repair in the founder's chair.",
    items: [
      { name: "Retwist (palm roll, no style)", mins: 60,  price: 70, addons: true },
      { name: "Loc cornrows",                  mins: 60,  price: 70, addons: true },
      { name: "Barrel twists",                 mins: 90,  price: 70, addons: true },
      { name: "Locs into twists",              mins: 90,  price: 75, addons: true },
      { name: "Barrels into twists",           mins: 90,  price: 75, addons: true },
      { name: "Inter loc (crochet hook)",      mins: 90,  price: 70, addons: true,
        note: "An extra charge may be added for this appointment." },
      { name: "Loc repair + retwist (instant loc needle)", mins: 90, price: 95, addons: true },
      { name: "Invisible locs + retwist",      mins: 150, price: 95, addons: true,
        note: "With kinky / marley extensions. Hair is not included." },
      { name: "Loc tightening (crochet needle)", mins: 90, price: 100, addons: true },
      { name: "Micro loc reloc",               mins: 120, price: 100, addons: true,
        note: "Standard-sized microlocs only — not Sisterlocks or extra-small." },
    ],
  },
  {
    id: "locs-grad",
    name: "Locs Maintenance",
    tier: "Graduate Stylists",
    blurb: "The same maintenance services at graduate pricing.",
    items: [
      { name: "Apple cider vinegar cleanse",   mins: 60,  price: 20 },
      { name: "Retwist (palm roll, no style)", mins: 90,  price: 50 },
      { name: "Barrel twists",                 mins: 120, price: 55, note: "A retwist is included." },
      { name: "Loc cornrows",                  mins: 120, price: 55 },
      { name: "Barrels into twists",           mins: 120, price: 60, note: "A retwist is included." },
      { name: "Locs into twists",              mins: 120, price: 60, note: "A retwist is included." },
    ],
  },
  {
    id: "starter",
    name: "Starter Locs & Micro Locs",
    tier: "Director Stylist — Laura",
    blurb: "Beginning your loc journey, or rebuilding an established set.",
    items: [
      { name: "Starter locs (coils)",          mins: 90,  price: 100 },
      { name: "Starter locs (twists)",         mins: 90,  price: 120 },
      { name: "Free-form locs retwisted",      mins: 90,  price: 120 },
      { name: "Full head of locs reattachment", mins: 150, price: 250,
        note: "For reattaching a full head of locs, or the sides." },
      { name: "Instant locs",                  mins: 180, price: 250 },
      { name: "Micro locs",                    mins: 360, price: 300 },
    ],
  },
  {
    id: "natural",
    name: "Natural Hair Styles",
    blurb: "Twists, plaits, cornrows and presses on natural hair.",
    items: [
      { name: "Under wig cornrows",            mins: 60,  price: 20 },
      { name: "'Clavish' braids",              mins: 60,  price: 25 },
      { name: "Stitch cornrows",               mins: 60,  price: 45 },
      { name: "Two strand twists — Graduate Stylists", mins: 90, price: 45 },
      { name: "Plug twists (rope twists)",     mins: 90,  price: 45 },
      { name: "Single plaits / braids",        mins: 90,  price: 45 },
      { name: "Two strand twists — Laura (D.S.)", mins: 60, price: 50,
        note: "Provided by the Director Stylist." },
      { name: "Cornrows into twists / braids", mins: 90,  price: 50 },
      { name: "Silk press",                    mins: 120, price: 50 },
      { name: "Feed-in braids",                mins: 120, price: 65 },
      { name: "Miracle knots (natural hair)",  mins: 120, price: 80,
        note: "The miracle knots are not provided." },
    ],
  },
  {
    id: "braids",
    name: "Box & Knotless Braids",
    blurb: "Priced by length and size — choose yours at booking.",
    items: [
      { name: "Stitch feed-in braids",         mins: 120, price: 65,
        note: "Price changes with how many cornrows you'd like." },
      { name: "Box / knotless braids",         mins: 270, price: 80,
        note: "Select your desired length and size for accurate pricing." },
      { name: "French curls",                  mins: 300, price: 80,
        note: "Select your desired length and size for accurate pricing." },
      { name: "Boho / goddess knotless braids", mins: 300, price: 90,
        note: "Select your desired length and size for accurate pricing." },
    ],
  },
  {
    id: "non-loc",
    name: "Non-Loc Styles",
    tier: "Director Stylist — Laura",
    blurb: "Barrels and plug twists on non-loc hair.",
    items: [
      { name: "Barrel twists",                 mins: 90, price: 50 },
      { name: "Barrels into plug twist",       mins: 90, price: 50 },
      { name: "Plug twists",                   mins: 90, price: 50 },
    ],
  },
  {
    id: "sewins",
    name: "Sew-ins, Tapes & Ponytails",
    blurb: "Installs, tracks and ponytails.",
    items: [
      { name: "Ponytails by Chardy",           mins: 180, price: 50, note: "Using hair wrap and hair glue." },
      { name: "Slick back ponytail",           mins: 120, price: 65 },
      { name: "Wig install with Laura",        mins: 120, price: 70 },
      { name: "Tracks",                        mins: 120, price: 75,
        note: "Bundles can be provided — message with length, texture and quantity for a quote." },
      { name: "Sew-in",                        mins: 150, price: 85,
        note: "Bundles can be provided — message with length, texture and quantity for a quote." },
      { name: "Tape-ins",                      mins: 150, price: 85 },
      { name: "Fulani sew-in",                 mins: 180, price: 95 },
      { name: "Tapes removal + reapplication", mins: 180, price: 160 },
      { name: "Sew-in removal, wash & redo",   mins: 240, price: 175 },
    ],
  },
  {
    id: "wigs",
    name: "Wigs, Installs & Revamps",
    blurb: "Construction, customisation and repair.",
    items: [
      { name: "Wig consultation",              mins: 30,  price: 10,
        note: "Measurements, colour matching, style advice and custom order options." },
      { name: "Frontal / closure re-glue",     mins: 90,  price: 30, note: "Re-glue only — not an install." },
      { name: "Wig styling only",              mins: 60,  price: 30 },
      { name: "Lace customisation",            mins: 60,  price: 35 },
      { name: "Frontal replacement",           mins: 90,  price: 40,
        note: "The new frontal is not included and must be purchased separately." },
      { name: "Wig revamp",                    mins: 120, price: 40,
        note: "Deep condition, trim, re-tighten, straighten, resew and style. Allow up to 3 days." },
      { name: "Wig install",                   mins: 150, price: 65,
        note: "Wig must be customised and good quality — no synthetic or low-quality wigs." },
      { name: "Frontal ponytail by Reneeace",  mins: 180, price: 65 },
      { name: "Wig construction",              mins: 240, price: 70,
        note: "Bleaching, tinting, plucking, customising, wig making and elastic band. Bundles not provided." },
    ],
  },
  {
    id: "treatments",
    name: "Treatments & Removal",
    blurb: "Cleanses, conditioning and taking styles down safely.",
    items: [
      { name: "Wash and blow-dry",             mins: 60,  price: 25 },
      { name: "Sew-in removal",                mins: 90,  price: 40, note: "Wash included." },
      { name: "Tapes removal",                 mins: 90,  price: 45, note: "Wash included." },
      { name: "Deep conditioning + scalp steam", mins: 60, price: 45,
        note: "OLAPLEX, steam treatment, ACV scalp detox, massage and conditioning under a hood dryer." },
      { name: "Braids removal + wash",         mins: 120, price: 50 },
      { name: "Tapes / sew-in maintenance",    mins: 90,  price: 70,
        note: "Wash and blow-dry, replace tapes, restitch tracks and style." },
    ],
  },
];

/* Helpers used by the price list and the booking form */
const fmtMins = (m) => {
  const h = Math.floor(m / 60), r = m % 60;
  return (h ? h + " hr" + (h > 1 ? "s" : "") : "") + (h && r ? " " : "") + (r ? r + " min" : "");
};
const fmtPrice = (p) => "£" + p;
const catLabel = (c) => c.name + (c.tier ? " · " + c.tier : "");
const cheapest = (c) => Math.min(...c.items.map(i => i.price));
