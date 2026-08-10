# 3DOTS Creative Solutions — website

Static site built with [Astro](https://astro.build). No database, no server —
it builds to plain HTML and can be hosted free on Netlify, Vercel or Cloudflare
Pages.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the built site
npm run quality  # type-check Astro files, then build
```

## Validation

Run the project check before pushing:

```bash
npm run quality
```

The visual interaction checks need a running local server:

```bash
npm run dev
node scripts/verify.mjs
node scripts/motion-check.mjs
```

## Sitemap

`@astrojs/sitemap` is configured in `astro.config.mjs` and uses
`https://3dotscreative.com` as the production site URL. The generated sitemap is
created during `npm run build`, not during `npm run dev`.

To verify it locally:

```bash
npm run build
npm run preview
```

Then open:

- `http://localhost:4321/sitemap-index.xml`
- `http://localhost:4321/sitemap-0.xml`

In production, submit this sitemap index:

```text
https://3dotscreative.com/sitemap-index.xml
```

## Before it goes live

Three things must be done, in this order.

### 1. Point the site at the real domain

`astro.config.mjs` → `SITE`. This drives the sitemap, canonical URLs and the
social share links. Also update the `Sitemap:` line in `public/robots.txt`.

### 2. Make the brief form actually deliver

`src/data/site.ts` → `formEndpoint`. It is empty right now, so the form falls
back to opening the visitor's mail client — which silently fails for anyone on
webmail. Any service that accepts a plain `POST` works; the form already sends
the right field names and handles the response:

- [Web3Forms](https://web3forms.com) — free, no account, paste the access key
- [Formspree](https://formspree.io) — free tier, paste the form URL
- Netlify Forms — if hosting on Netlify

```ts
export const formEndpoint = "https://api.web3forms.com/submit";
```

With Web3Forms also add a hidden `access_key` input to the form in
`src/pages/contact.astro`.

WhatsApp and the phone/email links work today and need no setup.

### 3. Replace the artwork with originals

**This is the biggest remaining quality ceiling.** Every portfolio image was
extracted from `3DOTS CS PROFILE 2.pdf`, where they are embedded as thumbnails.
53 of the 59 are under 500px on the long edge (median 402px), so they are soft
on a high-resolution screen. The lightbox deliberately refuses to upscale them
past 1:1 for that reason.

Ask the client for the original artwork. Drop the files into
`public/images/work/` using the same filenames, then run:

```bash
node -e "require('child_process')" # see scripts/ note below
npm run build
```

and regenerate `src/data/work-dimensions.ts` (it is a plain map of filename →
`[width, height]`, used to reserve layout space so images do not cause shift).

## Content

All copy, contact details, client names and artwork come from the company
profile PDF. Nothing is invented. `src/data/site.ts` is the single source of
truth — editing it updates every page.

Note: the profile is dated 2023 and states **21 years** of experience. Confirm
with the client whether to update that number.

## Structure

```
src/
  data/site.ts              all content: contact, director, services, clients, work
  data/work-dimensions.ts   generated image sizes
  layouts/BaseLayout.astro  head, meta, schema.org, header/footer
  components/               Header, SiteFooter, HeroWall, WorkGrid, Lightbox, ClientWall, RegMark
  pages/                    index, work, services, about, contact, 404, og-card
  styles/global.css         the whole design system
```

`og-card.astro` is not linked from anywhere — it exists so the social share
image can be re-rendered if the branding changes (`node og.mjs` with the dev
server running).

## Design notes

Palette is sampled from the agency's own material: the cornflower blue is the
hue the portfolio artwork is duotoned to (`#5070B0`), the teal is from the
profile's section tabs (`#3FA69C`). Display face is Archivo at an expanded
width for poster presence; IBM Plex Sans and Mono carry body and data.

Accessibility floor: keyboard-operable lightbox and filters, visible focus
rings, skip link, reduced-motion honoured, and all content readable with
JavaScript disabled.

## Motion

All of it lives in `src/components/Motion.astro` (behaviour) and the "Motion"
block at the end of `global.css` (the rules). Six things:

1. **Load sequence** — the work wall pulls back from 1.14×, then the headline
   lines rise from behind their masks, then lead, buttons and stats stagger in.
   Waits on `document.fonts.ready` so masked lines cannot reflow mid-reveal,
   with a 900ms escape hatch if a font is slow.
2. **Masked line type** — `<Lines>` takes an array of strings so the breaks are
   deliberate. Above the fold it plays on load; below it waits for the section.
3. **Counting stats** — easeOutQuart, started on a delay so the tick-up happens
   while the row is visible rather than behind an `opacity: 0`.
4. **Hero parallax** — rAF-throttled, on a wrapper element so it never fights
   the load transform.
5. **FLIP filtering** — tiles measure their old position, get inverted, then
   animate to the new one. Entering tiles scale in.
6. **VIEW cursor** — fine-pointer devices only, over work tiles.

Every one is gated on `prefers-reduced-motion` and on JS being present. Two
Playwright suites cover it:

```bash
node scripts/verify.mjs        # forms, lightbox, filters, nav, no-JS
node scripts/motion-check.mjs  # load sequence, counters, parallax, FLIP, cursor
```
