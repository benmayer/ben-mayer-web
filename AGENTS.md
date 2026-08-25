## Project: ben-mayer.com

Personal portfolio site showcasing app projects (developer + product-manager work) for recruiters/clients. Full architecture context, decision rationale, and open follow-ups: see `PROJECT_PLAN.md` in this repo.

**Stack**: Astro (static output) + `@astrojs/vue` for interactive islands + `@astrojs/sitemap`. Content lives in Markdown via Astro Content Collections, not a headless CMS. Hosted on Cloudflare Pages (free tier).

**Key files**:
- `src/content.config.ts` — the `projects` and `blog` collection schemas (must live at this exact path, not `src/content/config.ts` — Astro 7 requires it at the project root of `src/`)
- `src/content/projects/<slug>/index.md` — one folder per project, `index.md` + a cover image sit together; collection uses the `glob` loader with `pattern: '**/index.md'`
- `src/content/blog/<slug>/index.md` — same pattern, for blog posts. **These slugs are load-bearing**: they must match the already-Google-indexed URLs `/blog/hello-world` and `/blog/building-a-web-app-using-nuxtjs-and-firebase` migrated from the old Nuxt/Firestore site — don't rename these folders.
- `src/pages/index.astro` — home page project grid
- `src/pages/projects/[id].astro`, `src/pages/blog/[id].astro`, `src/pages/blog/index.astro` — templates/listing (note: `id`, not `slug` — Astro 5+ deprecated `entry.slug` in favor of `entry.id`, and legacy `type: 'content'` collections are no longer supported without a loader)
- `src/pages/about.astro` — static about page, migrated verbatim (content, not schema-driven)
- `src/layouts/Base.astro` — per-page SEO meta/OG tags; all pages should pass `title` + `description` props here

**Conventions**:
- Keep pages static-first — avoid adding client-side JS/hydration unless a piece of UI genuinely needs interactivity. This is deliberate for SEO/performance, not an oversight.
- New projects: add a folder under `src/content/projects/`, don't edit the schema unless a genuinely new field is needed across projects.
- Always run `npm run build` after content or schema changes — it validates frontmatter against the zod schema and will fail loudly on mistakes (missing required fields, bad image paths, etc.).
- If any other legacy URL needs preserving, prefer recreating it at the identical path over adding a redirect (see `PROJECT_PLAN.md` → "Migrated legacy content").

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
