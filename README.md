# HBL Hair Studio — website

A fast, single-page site for HBL Hair Studio. Plain HTML, CSS and JavaScript —
no build step, no framework, no monthly fee. Open `index.html` in a browser and
it runs.

## Files

| File          | What's in it                                        |
|---------------|-----------------------------------------------------|
| `index.html`  | All page content and copy                           |
| `styles.css`  | All styling (colours live in `:root` at the top)    |
| `script.js`   | Gallery list, filters, lightbox, menu, animations   |
| `images/`     | Your photos                                         |

## Adding photos

1. Put the file in `images/`.
2. Add a line to the `GALLERY` list at the top of `script.js`:

```js
{ src: "images/gallery-06.jpg", cat: "locs", alt: "Fresh retwist with barrel curls" },
```

`cat` must be one of `locs`, `twists`, `braids`, `studio` — it drives the
filter chips. There is no limit on how many you add.

## Before going live — replace these

Search `index.html` for `REPLACE` to find them all:

- Phone number (`tel:+440000000000`)
- WhatsApp number (`wa.me/440000000000`)
- Instagram handle
- Street address and postcode
- Opening hours, if they differ
- Service prices and durations (currently sensible placeholders)
- The three testimonials — swap in real client reviews

## Changing the look

Every colour is a variable at the top of `styles.css`:

```css
--ink:  #14110f;   /* near-black text and dark sections */
--paper:#f6f1ea;   /* warm off-white background        */
--tan:  #c08b52;   /* accent: eyebrows, hovers, arrows  */
```

## Publishing it

The site is static, so anything that serves files will host it — GitHub Pages
(Settings → Pages → deploy from this branch), Netlify or Cloudflare Pages
(drag the folder in). All free.
