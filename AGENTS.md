## Project: ben-mayer.com

Personal portfolio site showcasing app projects (developer + product-manager work) for recruiters/clients. Full architecture context, decision rationale, and open follow-ups: see `PROJECT_PLAN.md` in this repo.

**Stack**: Astro (static output) + `@astrojs/vue` for interactive islands + `@astrojs/sitemap`. Content lives in Markdown via Astro Content Collections, not a headless CMS. Hosted on Cloudflare Pages (free tier).

**Key files**:
- `src/content.config.ts` — the `projects` and `blog` collection schemas (must live at this exact path, not `src/content/config.ts` — Astro 7 requires it at the project root of `src/`)
- `src/content/projects/<slug>/index.md` — one folder per project, `index.md` + a cover image sit together; collection uses the `glob` loader with `pattern: '**/index.md'`
- `src/content/blog/<slug>/index.md` — same pattern, for blog posts. **These slugs are load-bearing**: they must match the already-Google-indexed URLs `/blog/hello-world` and `/blog/building-a-web-app-using-nuxtjs-and-firebase` migrated from the old Nuxt/Firestore site — don't rename these folders.
- `src/pages/index.astro` — home page: hero, alternating project rows, blog teaser
- `src/pages/projects/[id].astro`, `src/pages/blog/[id].astro`, `src/pages/blog/index.astro` — templates/listing (note: `id`, not `slug` — Astro 5+ deprecated `entry.slug` in favor of `entry.id`, and legacy `type: 'content'` collections are no longer supported without a loader)
- `src/pages/about.astro` — static about page, migrated verbatim (content, not schema-driven)
- `src/layouts/Base.astro` — per-page SEO meta/OG tags; all pages should pass `title` + `description` props here

**Conventions**:
- Keep pages static-first — avoid adding client-side JS/hydration unless a piece of UI genuinely needs interactivity. This is deliberate for SEO/performance, not an oversight.
- New projects: add a folder under `src/content/projects/`, don't edit the schema unless a genuinely new field is needed across projects.
- Always run `npm run build` after content or schema changes — it validates frontmatter against the zod schema and will fail loudly on mistakes (missing required fields, bad image paths, etc.).
- If any other legacy URL needs preserving, prefer recreating it at the identical path over adding a redirect (see `PROJECT_PLAN.md` → "Migrated legacy content").

**CSS & markup conventions** — the rule is *explicit, matching semantics*, not "more classes" or "fewer classes":

- A CSS selector is a literal claim about markup structure. `.hero h1` means "every `h1` inside `.hero`, and nothing else is expected to look like this." If a page wants that look, its markup must actually contain `<section class="hero">` — don't let two things look the same by accident (same default styles) or different by accident (one page forgot the wrapper). If they diverge, it must be a deliberate, named variant — not a gap.
- Base HTML elements get a sensible site-wide default in `global.css` (e.g. the bare `h1` rule sets the display font + heading color). Component classes like `.hero h1` or `.case-study-header h1` are *variants layered on top* of that baseline (e.g. just `font-size`), not full redeclarations — so a page that forgets a wrapper still looks on-brand instead of falling back to raw browser defaults.
- Give an element a class only when the bare tag selector would be ambiguous or wrong elsewhere in the page. Example: the site chrome `<header>` needs `.site-header` because `<header class="case-study-header">` also legitimately exists inside project/blog pages — a bare `header` selector would leak into both. `<footer>` and `<main>` currently have no such collision anywhere in the site, so they're styled by bare tag selector, no class. If you add a class to a landmark, be able to say why the bare tag wouldn't work — "the other one has a class" is not a reason.
- One `.container` per page for the horizontal max-width/centering, with named `<section>`s nested inside it for each distinct content block (see `blog/index.astro` or `index.astro`). Don't wrap only some sections in their own separate `.container` and leave others bare — that's the same "accidental divergence" bug applied to layout instead of typography.
- **Before deleting or renaming a CSS rule, `grep -rn "the-class-name" src/`** across every `.astro` file first. Rules for `.tag`, `.stack-list` (since renamed to `.chip-list`), and `.case-study-gallery` were deleted during a homepage rewrite without checking that `projects/[id].astro` and `blog/[id].astro` still referenced them, leaving those pages silently unstyled — that's the failure mode this rule exists to prevent.
- A class name is a claim about what the thing *is*, not just what it looks like — `.stack-list` was reused for blog post tags, which aren't a tech stack; it was renamed to `.chip-list` (the shared visual component both use). If two elements share a class only because they happen to look alike, give the class a name that describes the shared concept, not one borrowed from its first use case.
- Run `npm run lint` (ESLint for `.astro`/`.ts`, Stylelint for CSS incl. `<style>` blocks) alongside `npm run build` after markup/style changes — configs are `eslint.config.js` and `stylelint.config.js` at the repo root.

**Repo & deploy status**: pushed to GitHub at [`benmayer/ben-mayer-web`](https://github.com/benmayer/ben-mayer-web) (`origin/main`). The Cloudflare Claude Code plugin (skills + MCP servers) is installed, so Cloudflare Pages/DNS work can be done via MCP tools in addition to the dashboard. The Cloudflare Pages project itself is **not yet connected** — deliberately deferred until real project content and page layout are finished (see `PROJECT_PLAN.md` → "Open follow-ups"). Don't set up the Pages project or push placeholder content live until the user confirms content/layout is ready.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
