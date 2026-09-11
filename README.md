# HBL — Hair By Laura N.

Website for HBL Hair Studio, 6 College Street Mews, Northampton NN1 2QF.

Plain HTML, CSS and JavaScript — no build step, no framework, no dependencies,
no monthly platform fee. Open `index.html` in a browser and it runs.

## Pages

| File            | What it is                                                     |
|-----------------|----------------------------------------------------------------|
| `index.html`    | Home — hero, studio, services, process, portfolio, reviews, visit |
| `book.html`     | Appointments — stylist tiers and the four-step booking form     |
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

## Booking — built into this site

`book.html` carries its own four-step booking flow. Nothing is embedded from
anywhere else and clients never leave the site:

1. **Service** — generated from the `SERVICES` list at the top of `script.js`
2. **Stylist** — Director (Laura) / Graduate / no preference
3. **When** — first and second choice dates, time-of-day preference, hair length
4. **Details** — name, mobile, email, notes, with a summary of their choices

Every step validates before it will advance, dates can't be set in the past,
and the final screen makes clear this is a **request**, not a confirmed booking —
the slot is secured once the deposit is paid.

### Where the requests go

Two routes, both live:

- **Netlify Forms.** The form is marked `data-netlify="true"`, so deploying to
  Netlify captures every submission automatically — no backend, no code, and
  email notifications are a toggle in the Netlify dashboard. This is why Netlify
  is the recommended host.
- **WhatsApp.** The confirmation screen shows a *Send on WhatsApp* button
  pre-filled with the client's whole request. This works on any host and matches
  how the studio already takes enquiries.

Change the WhatsApp destination with `WHATSAPP_NUMBER` in `script.js`.

### What this does not do

It does not show real-time availability or take card payments — both need a
server and a payment provider, which a static site has neither of. Laura confirms
the slot and takes the deposit by message, exactly as she does now. If she later
wants live slots and card deposits on-site, that's a backend build on top of
this front end.

## Still to fill in

- **Prices.** Services currently read "See price / at booking" because the real
  prices weren't available when this was built. To show them on the page, edit
  the `.srv__p` values in `index.html`.
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
rotating testimonials, a scroll-spy on the policies page, and the animated
step transitions in the booking form.

Everything respects `prefers-reduced-motion`, so visitors who ask their device
for less motion get a still, fully readable site.

## Contrast

Every piece of text on all three pages was measured against the background it
actually renders on and meets WCAG AA. Body copy sits at 12.6:1, secondary text
at 8.4:1, and the rose accent at 5.3:1 — comfortably past the 4.5:1 minimum.

Keep it that way when editing: `--rose-soft` is the pale decorative rose and
must never be used for text. `--rose` is the text- and button-safe one.

## Changing the look

Top of `styles.css`:

```css
--ivory:#fdfaf7;     /* page background                       */
--blush:#f7ece7;     /* soft section bands                    */
--plum:#3d2c33;      /* body text        — 12.6:1 on ivory    */
--plum-soft:#57474e; /* secondary text   —  8.4:1 on ivory    */
--rose:#95594b;      /* accent + buttons —  5.3:1 either way  */
--rose-soft:#c08a7d; /* decorative only — never used as text  */
--display:"Cormorant Garamond",serif;
--ui:"Jost",sans-serif;
```

## Publishing

The site is static, so any host will serve it — GitHub Pages (Settings → Pages
→ deploy from this branch), Netlify, or Cloudflare Pages. All free.
