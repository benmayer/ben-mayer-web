# ben-mayer.com

Personal portfolio site — showcases app projects (developer + product-manager work) for recruiters/clients, plus a small blog migrated from an earlier Nuxt/Firebase site.

Built with [Astro](https://astro.build), content in Markdown via Astro Content Collections, deploying to Cloudflare Workers (static assets).

For architecture, decisions, and open follow-ups, see [`.claude/docs/PROJECT_PLAN.md`](./.claude/docs/PROJECT_PLAN.md). For conventions when working on this repo with an AI coding agent, see [`AGENTS.md`](./AGENTS.md).

## Repo & deploy status

- GitHub: [`benmayer/ben-mayer-web`](https://github.com/benmayer/ben-mayer-web)
- Cloudflare Workers: configured (`wrangler.jsonc`) but not yet deployed — see `.claude/docs/PROJECT_PLAN.md` → "Domain cutover checklist".

## Project structure

```text
/
├── public/                      # static assets
├── src/
│   ├── content.config.ts        # `projects` and `blog` collection schemas
│   ├── content/
│   │   ├── projects/<slug>/     # one folder per project (index.md + cover image)
│   │   └── blog/<slug>/         # one folder per blog post
│   ├── layouts/Base.astro       # shared head/SEO, header, footer
│   └── pages/                   # routes (index, projects/[id], about, blog/*)
└── package.json
```

## Commands

All commands run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`              | Installs dependencies                            |
| `npm run dev`               | Starts local dev server at `localhost:4321`      |
| `npm run build`             | Build the production site to `./dist/`           |
| `npm run preview`           | Preview the build locally, before deploying      |
| `npm run astro ...`         | Run CLI commands like `astro add`, `astro check` |
| `npm run lint`               | Lint markup/scripts (ESLint) and CSS (Stylelint) |
| `npm run deploy`             | Build and deploy to Cloudflare Workers           |

## Adding a project or blog post

See "Content model" in [`.claude/docs/PROJECT_PLAN.md`](./.claude/docs/PROJECT_PLAN.md#content-model) — add a folder + `index.md` under `src/content/projects/` or `src/content/blog/`, run `npm run build` to validate frontmatter, then commit and push.
