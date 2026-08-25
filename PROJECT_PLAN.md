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

## Migrated legacy content (`/about`, `/blog`)

The old site had two already-indexed URLs worth preserving for SEO: `/about` (static content) and `/blog` + two posts (content lived in Firestore, fetched client/server-side in Nuxt — not in the old repo as files). Both were ported at **identical URLs**, so no redirects were needed:

- `/about` — recreated as a static Astro page (`src/pages/about.astro`), content copied from the old `src/pages/about.vue`, with the Nuxt/Firebase mention updated to Astro/Cloudflare Pages.
- `/blog` + `/blog/hello-world` + `/blog/building-a-web-app-using-nuxtjs-and-firebase` — the old post URLs used real slugs (not Firestore auto-IDs), so they were recreated exactly via a new `blog` content collection. Post content and inline screenshots were pulled from the live site's server-rendered HTML (`window.__NUXT__` state) and images re-hosted locally instead of depending on the old Firebase Storage URLs.

If any other old URLs need preserving later (check Google Search Console for what's actually indexed), the same approach applies: recreate at the same path if possible, otherwise add a 301 in a Cloudflare Pages `_redirects` file.

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
- `src/pages/about.astro` — static about page (migrated from the old site)
- `src/pages/blog/index.astro` — blog post listing, sorted newest first
- `src/pages/blog/[id].astro` — blog post template (same content model as projects: `src/content/blog/<slug>/index.md`)
- `src/layouts/Base.astro` — shared `<head>` (per-page title/description/OG tags), header, footer

## Repo & deploy status

- **GitHub**: pushed — [`benmayer/ben-mayer-web`](https://github.com/benmayer/ben-mayer-web), `main` tracked as `origin/main`.
- **Cloudflare**: account created, and the [Cloudflare Claude Code plugin](https://developers.cloudflare.com/agent-setup/prompt.md) (skills + MCP servers) is installed locally, so Pages setup/deploys can be driven from an agent session instead of only the dashboard.
- **Pages project**: **not yet created.** Deliberately holding off connecting the repo to Cloudflare Pages until the real project content and page layout are finished (see "Open follow-ups") — no point deploying placeholder content.

### Deploying to Cloudflare Pages (when ready)

1. In the Cloudflare dashboard (or via the Cloudflare MCP tools): **Workers & Pages → Create → Pages → Connect to Git**, select `benmayer/ben-mayer-web`.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Deploy. Cloudflare will auto-build and deploy on every push to `main`, with preview deployments for other branches/PRs.
4. Add the custom domain `ben-mayer.com` under the Pages project's **Custom domains** tab (Cloudflare will guide DNS setup, especially easy if the domain's nameservers are already on Cloudflare).

## Open follow-ups (not yet done)

- **Finish real project content** (blocking deploy): the two example projects are placeholders — replace with real case studies, screenshots, and finalize the home page / project layout before connecting Cloudflare Pages.
- **Visual design pass**: current styling is a minimal, functional baseline (see `src/styles/global.css`), not the final visual identity. Revisit layout, typography, and branding alongside the real content.
- **Connect Cloudflare Pages**: once content/layout above is done, follow "Deploying to Cloudflare Pages".
- **Decap CMS (maybe)**: if editing raw Markdown files still feels like enough friction that updates don't happen, add [Decap CMS](https://decapcms.org) — a free, git-based CMS that gives a `/admin` web form and commits straight to this same GitHub repo (no new backend, no database, no extra cost). Not added yet since the file-based flow may be low-friction enough on its own.
- **Analytics** (optional): none set up yet. If added later, consider Cloudflare Web Analytics (free, no cookies, privacy-friendly) over something heavier.
- **Contact method**: currently a plain `mailto:` link in the header. Fine for now; revisit if spam becomes an issue.
