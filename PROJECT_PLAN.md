# ben-mayer.com — Project Plan

## Goal

A professional online presence showcasing ~5-10 app projects (developer and product-manager work) to share with clients and recruiters. Priorities, in order: it gets updated (low editing friction), good SEO, cheap/free to run, easy to customize.

## Stack

| Concern       | Choice                                                                 |
|---------------|-------------------------------------------------------------------------|
| Framework     | [Astro](https://astro.build) — static-first, zero JS by default, best-in-class SEO |
| Interactivity | Vue components as islands where needed (`@astrojs/vue`), kept minimal   |
| Content       | Markdown files in `src/content/projects/`, validated via a typed schema |
| Hosting       | Cloudflare Pages — free tier, global CDN, strong EU coverage            |
| SEO           | Per-page meta/OG tags (`src/layouts/Base.astro`) + `@astrojs/sitemap`   |

Previously: Nuxt on Firebase (~3¢/month). Migrated away because Astro's content-collection model fits a mostly-static portfolio better and gives stronger default SEO than Nuxt SSR for this use case.

## Content model

Each project lives in its own folder under `src/content/projects/<project-slug>/`:

```
src/content/projects/example-project-one/
  index.md       # frontmatter + case-study body
  cover.svg      # cover image (swap for a real screenshot/photo)
```

Frontmatter schema (defined in `src/content.config.ts`):

- `title` (string)
- `summary` (string) — shown on the home page card and used as meta description
- `role`: `"developer" | "product-manager" | "both"`
- `stack` (string array) — tech/tools shown as tags
- `coverImage` (image) — relative path, e.g. `./cover.jpg`
- `coverImageAlt` (string)
- `gallery` (optional array of `{ image, alt }`) — extra screenshots on the case-study page
- `links` (optional) — `live`, `demo`, `repo` URLs
- `order` (number, default 0) — controls home page sort order
- `date` (date)
- `draft` (boolean, default false) — set `true` to hide a project without deleting it

### Adding a new project

1. Create `src/content/projects/<new-slug>/index.md` (copy an existing folder as a template).
2. Add a cover image in the same folder, reference it as `./cover.jpg` (or `.png`/`.svg`).
3. Fill in frontmatter + write the case-study body in Markdown below the frontmatter.
4. `npm run dev` to preview, `npm run build` to confirm no schema errors, then commit and push — Cloudflare Pages auto-deploys on push to `main`.

No CMS login, no separate service — just a file and a git push. See "Future: easier editing" below if this still feels like friction once real content is added.

## Pages

- `src/pages/index.astro` — hero + grid of project cards, sorted by `order`
- `src/pages/projects/[id].astro` — case-study template (renders one project's Markdown body, cover, gallery, links)
- `src/layouts/Base.astro` — shared `<head>` (per-page title/description/OG tags), header, footer

## Deploying to Cloudflare Pages

One-time setup (manual, needs your Cloudflare account):

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, select the repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. Cloudflare will auto-build and deploy on every push to `main`, with preview deployments for other branches/PRs.
5. Add the custom domain `ben-mayer.com` under the Pages project's **Custom domains** tab (Cloudflare will guide DNS setup, especially easy if the domain's nameservers are already on Cloudflare).

## Open follow-ups (not yet done)

- **Visual design pass**: current styling is a minimal, functional baseline (see `src/styles/global.css`), not the final visual identity. Revisit layout, typography, and branding once real project content exists.
- **Real content**: the two example projects are placeholders — replace with real case studies and screenshots.
- **Decap CMS (maybe)**: if editing raw Markdown files still feels like enough friction that updates don't happen, add [Decap CMS](https://decapcms.org) — a free, git-based CMS that gives a `/admin` web form and commits straight to this same GitHub repo (no new backend, no database, no extra cost). Not added yet since the file-based flow may be low-friction enough on its own.
- **Analytics** (optional): none set up yet. If added later, consider Cloudflare Web Analytics (free, no cookies, privacy-friendly) over something heavier.
- **Contact method**: currently a plain `mailto:` link in the header. Fine for now; revisit if spam becomes an issue.
