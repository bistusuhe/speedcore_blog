# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal tech blog + portfolio site for Su He ("speedcore"), built with Next.js 15 App Router. Modern minimalist design inspired by OpenAI / Apple / Vercel, with Chinese/English i18n, dark/light theme, MDX blog, project showcase, and full SEO.

**Stack**: Next.js 15 (App Router) + React 19 + TypeScript 5.7 (strict) + Tailwind CSS 3 + Framer Motion + next-intl

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server (Turbo mode, `http://localhost:3000/zh`) |
| `pnpm build` | Production build |
| `pnpm start` | Run production server (must build first) |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `pnpm format` | Prettier format all files |

**Package manager**: pnpm 9 (`corepack enable` to activate). Node >= 20.

## Architecture patterns

### Routing (i18n-first)

All pages live under `app/[locale]/` (locale is `zh` or `en`). The middleware (`middleware.ts`) uses `next-intl` routing with `localePrefix: 'always'`. Static routes (RSS, sitemap) sit directly under `app/`.

**Important**: Every page that calls `getTranslations` or needs locale must call `setRequestLocale(locale)` before rendering.

### Data layer (server-only, cache-deduplicated)

All content data functions in `lib/` are marked `'server-only'` and use React's `cache()` for request-scoped deduplication:

- `lib/posts.ts` — Read `content/posts/*.{md,mdx}` via filesystem. Exports `getAllPosts()`, `getPostBySlug()`, `getRelatedPosts()`, `getAdjacentPosts()`, category/tag/archive helpers.
- `lib/projects.ts` — Read `content/projects/*.{md,mdx}`. Exports `getAllProjects()`, `getProjectBySlug()`.
- `lib/github.ts` — Fetch GitHub user stats (REST + GraphQL) with 1-hour revalidation.
- `lib/search.ts` — Build search index from all posts + projects + categories + tags.
- `lib/mdx.tsx` — MDX rendering pipeline (remark-gfm, remark-math, rehype-slug, rehype-autolink-headings, rehype-katex, rehype-pretty-code/Shiki).
- `lib/seo.ts` — RSS XML, JSON-LD (Person/Article/Website), structured data helpers.
- `lib/utils.ts` — `cn()` (Tailwind class merge), `formatDate()`, `slugify()`, `truncate()`, `debounce()`.

### Content (filesystem MDX)

Blog posts in `content/posts/`, projects in `content/projects/`. Each `.mdx` file has YAML frontmatter (see types in `types/index.ts`). Posts with `draft: true` are excluded at build time. Adding a new file is sufficient — no code changes needed for categories, tags, archives, RSS, or search.

Frontmatter supports `Callout` and `Mermaid` custom MDX components (registered in `components/blog/mdx-components.tsx`).

### Component conventions

- **Server-first**: Default to server components. Only add `'use client'` when using state, effects, or browser APIs.
- **Shared i18n Link**: Import `{ Link }` from `@/i18n/routing`, NOT from `next/link`. This ensures locale prefix is preserved.
- **Import alias**: `@/*` maps to the project root.

### Styles

Tailwind with CSS custom properties for theming (design tokens in `app/globals.css`). Dark mode via `class` strategy with `next-themes`. Custom animation keyframes (fade-in, fade-up, scale-in, shimmer, blob, gradient-x) in `tailwind.config.ts`. Custom font-size utilities `display-2xl`, `display-xl`, `display-lg` for fluid hero text.

### UI primitives

`components/ui/` contains shadcn-style components (Button, Input, Badge, Dialog, Tabs) built on Radix UI primitives + Tailwind + `cn()`.

### API routes

- `app/api/search/route.ts` — Serve search index as JSON (1-day CDN cache).
- `app/api/github/route.ts` — Proxy GitHub stats (1-hour CDN cache).
- `app/rss.xml/route.ts` — RSS 2.0 feed.
- `app/sitemap.xml/route.ts` — Dynamic sitemap with all posts, projects, categories, tags.

### Environment variables

See `.env.example`. `NEXT_PUBLIC_*` variables are available client-side. `GITHUB_TOKEN` is server-only.

### Docker deployment

`Dockerfile` + `docker-compose.yml` + `nginx.conf` for production deployment. Nginx terminates TLS and reverse-proxies to the Next.js container. The build uses `standalone` output mode (`NEXT_OUTPUT_STANDALONE=true`).

### Git hooks

Husky + lint-staged: `pre-commit` runs ESLint and Prettier on staged `*.ts,*.tsx,*.js,*.jsx` files, and Prettier on `*.json,*.md,*.mdx,*.css`.
