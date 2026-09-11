# HBL — Hair By Laura N.

Website for HBL Hair Studio, 6 College Street Mews, Northampton NN1 2QF.

Plain HTML, CSS and JavaScript — no build step, no framework, no dependencies,
no monthly platform fee. Open `index.html` in a browser and it runs.

## Pages

| File            | What it is                                                     |
|-----------------|----------------------------------------------------------------|
| `index.html`    | Home — hero, studio, services, process, portfolio, reviews, visit |
| `book.html`     | Appointments — stylist tiers, services, live Acuity calendar    |
| `policies.html` | Full salon policies with sticky section navigation              |
| `styles.css`    | All styling. Colours and fonts are variables at the top         |
| `script.js`     | Content lists + the animation engine                            |
| `images/`       | Photos used on the site                                         |
| `reference/`    | Source screenshots and template assets — **not used on the site** |

## Adding photos

1. Put the file in `images/`.
2. Add one line to the `GALLERY` list at the top of `script.js`:

```js
{ src: "images/new-photo.jpg", cat: "locs", alt: "Fresh retwist with barrel curls" },
```

`cat` must be `locs`, `twists` or `studio` — it drives the filter chips. Add a
new category by adding a matching `<button class="chip" data-f="yourcat">` in
the portfolio section of `index.html`. There is no limit on photo count.

## Booking

`book.html` embeds the live Acuity scheduler
(`hairbylauran.as.me/schedule/2bb3c327`) so clients book without leaving the
site, with a direct link underneath as a fallback.

The service list above the calendar is the `CATEGORIES` array in `script.js`.
Each entry has a `url` that can deep-link to a specific Acuity category — the
Director Stylist locs maintenance category is already wired up that way. Copy
the category URL out of Acuity to wire up the rest.

## Still to fill in

- **Prices.** Services currently read "See price / at booking" and send clients
  to the live calendar, because the real prices weren't available when this was
  built. To show them on the page, edit the `.srv__p` values in `index.html`.
- **Reviews.** The three quotes on the home page are placeholders. Replace them
  with real client reviews in the testimonials section of `index.html`.
- **Instagram handle.** Links currently point at `instagram.com/hairbylauran` —
  correct it in all three pages' footers if that's not the handle.
- **More photos.** The site ships with 5 real studio photos. It's built to carry
  many more.

## What's already wired in

Taken from the studio's own booking page, so these are live and correct:

- Address, opening hours, phone (07479 412516), WhatsApp
- Deposit, lateness, no-show, parking, colouring and salon policies
- Appointments release on the 10th of each month at 12:00am
- Director Stylist vs Graduate Stylist pricing tiers
- Structured data (`HairSalon` schema) so Google can show hours and location

## Animation

Built with vanilla JS and CSS — preloader, page-transition curtain, custom
cursor, masked headline reveals, scroll parallax, pinned service list with
image sync, count-up stats, magnetic buttons, masonry portfolio with lightbox,
rotating testimonials and a scroll-spy on the policies page.

Everything respects `prefers-reduced-motion`, so visitors who ask their device
for less motion get a still, fully readable site.

## Changing the look

Top of `styles.css`:

```css
--noir:#0b0a09;   /* background          */
--bone:#f2efe9;   /* text                */
--gold:#c8a46b;   /* accent              */
--display:"Cormorant Garamond",serif;
--ui:"Jost",sans-serif;
```

## Publishing

The site is static, so any host will serve it — GitHub Pages (Settings → Pages
→ deploy from this branch), Netlify, or Cloudflare Pages. All free.
