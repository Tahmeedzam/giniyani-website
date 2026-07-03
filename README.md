# Giniyani & Associates — Website

Plain HTML/CSS/JS single-page site. No framework, no build complexity — Tailwind CSS
compiles to one static CSS file.

## Run it locally

You don't need Node to just *view* the site — `index.html` already links to the
pre-built `css/output.css`. Just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## If you edit styles / add Tailwind classes

You only need Node for this step. From this folder:

```
npm install
npm run dev
```

This watches `src/input.css` and rebuilds `css/output.css` automatically as you
edit `index.html` or `src/input.css`. Leave it running while you work.

When you're done and ready to hand off / deploy, run once:

```
npm run build
```

This produces a minified, production-ready `css/output.css`. Commit/deploy that file —
you do NOT need to deploy `node_modules` or `src/`.

## Adding the real photo

In `index.html`, find the hero section — there's a placeholder circle with "MSG"
initials. Right above it is a commented-out `<img>` tag with the exact classes needed.
Steps:

1. Add the photo file to a new `assets/` folder, e.g. `assets/soheb-giniyani.jpg`
   (square-ish crop, at least 400x400px, works best)
2. Delete the placeholder `<div>...MSG...</div>` block
3. Uncomment the `<img>` tag below it and update the `src` path

## Structure

```
index.html          — all page content/sections
css/output.css       — compiled Tailwind (DO NOT edit directly)
src/input.css         — Tailwind source + custom theme tokens (EDIT this)
js/script.js          — nav, scroll animations, accordion, marquee, contact form
package.json
```

## Deploying

This is a fully static site — drag the whole folder (minus `node_modules` and `src`)
into Netlify or Vercel, or push it to GitHub and connect it to either. No server,
no database, no build step required at deploy time since `css/output.css` is
already committed.

## Notes

- The contact form submit button opens the visitor's email app pre-filled with their
  details (mailto: link) — no backend needed. If you want it to send silently without
  opening an email client, that needs a small backend (Formspree is the fastest
  no-code option).
- Client names in the scrolling marquee are pulled from the GST/Tax/VAT audit client
  list — edit the `clientNames` array in `js/script.js` to add/remove.
- Services accordion content lives in the `services` array in `js/script.js`.
