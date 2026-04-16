# Durable Sessions — Landing + Docs Site

Product site for [Durable Sessions](https://sessions.tonbo.io), an append-only event log for AI agents. Landing page + blog + developer docs, all in one Vite + React SPA with build-time prerendering.

## Tech stack

- **Vite 5** + **React 18** + **TypeScript** — single-page app
- **MDX** (`@mdx-js/rollup`) for docs content, with `remark-gfm`, `remark-frontmatter`, `remark-mdx-frontmatter`
- **Shiki** (`@shikijs/rehype`, theme `gruvbox-dark-hard`) for syntax highlighting at build time
- **rehype-slug** for heading anchor IDs
- **vite-prerender-plugin** for static HTML generation per route (SSG, not SSR)
- **Pagefind** for client-side full-text search (WASM, no server)
- **IBM Plex Sans** (via `@fontsource`) for body text
- **Iosevka** (self-hosted, 4 weights: Light/Regular/Medium/Bold in `public/fonts/`) for mono/code

## Domain + hosting

| What | Where |
|---|---|
| Landing + docs | `sessions.tonbo.io` |
| Cloudflare Pages project | `durable-sessions` (`durable-sessions.pages.dev`) |
| Cloudflare account | Tonbo IO (`e8ae0b17...`) |
| DNS | `sessions.tonbo.io` CNAME → `durable-sessions.pages.dev` (auto-managed by CF) |
| API domain (in docs examples) | `sessions.tonbo.dev` |
| OG image | `/og-default.png` (1200x630 PNG) |

## Build

```bash
npm run build
# Equivalent to:
#   tsc -b
#   && vite build
#   && pagefind --site dist --glob "{docs,blogs}/**/*.html"
#   && rm -rf public/pagefind && cp -r dist/pagefind public/pagefind
```

Steps:
1. **TypeScript check** (`tsc -b`)
2. **Vite build** — bundles client JS/CSS, compiles MDX to React components, runs Shiki highlighting
3. **Prerender** — `vite-prerender-plugin` calls `src/prerender.tsx`'s `prerender()` function for each route, generating static HTML with per-route `<head>` metadata (title, description, canonical, og:*, twitter:*)
4. **Pagefind** — crawls `dist/{docs,blogs}/**/*.html`, builds search index shards in `dist/pagefind/`
5. **Copy Pagefind to public** — mirrors `dist/pagefind/` → `public/pagefind/` so `npm run dev` can serve the search index too

### Prerendering (SSG)

The prerender plugin discovers routes via `prerender.tsx`:
- Static routes: `/`, `/pricing`, `/blogs`, `/docs`
- Blog posts: auto-discovered from `src/content/posts/*.md` via `getAllBlogPosts()`
- Docs pages: auto-discovered from `src/content/docs/pages/*.mdx` via `getAllDocsPages()`

Each route gets its own `dist/<path>/index.html` with:
- Full server-rendered React DOM in `<div id="root">`
- Per-route `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta property="og:*">`, `<meta name="twitter:*">`

No `_redirects` / SPA fallback needed — every known route has a real HTML file. Unknown routes serve `dist/404.html` (standalone, no JS dependency).

## Deploy

```bash
npx wrangler pages deploy dist \
  --project-name=durable-sessions \
  --branch=main \
  --commit-dirty=true
```

No git push required — Wrangler uploads `dist/` directly to Cloudflare Pages. The CF project is NOT connected to a git repo; all deploys are manual via this command.

Auth: `wrangler` uses OAuth token cached from `wrangler login` (user `guozixing@tonbo.io`).

## Dev

```bash
npm run dev        # Vite dev server on http://localhost:5173
npm run preview    # Vite preview of built dist on http://localhost:4173
```

Search works in dev mode only AFTER running `npm run build` at least once (to populate `public/pagefind/`).

## Content structure

### Blog

- Posts: `src/content/posts/*.md` (raw markdown, parsed by hand-written `MarkdownContent.tsx`)
- Registry: `src/content/blog.ts` — glob imports, parses YAML frontmatter, exports `getAllBlogPosts()` / `getBlogPostBySlug()`
- Rendered by: `src/pages/BlogPostPage.tsx`

### Docs

- Pages: `src/content/docs/pages/*.mdx` (MDX, compiled by `@mdx-js/rollup`)
- Registry: `src/content/docs/index.ts` — glob imports MDX modules, reads `frontmatter` export, sorts by `group` + `order`
- Frontmatter fields: `slug`, `title`, `description`, `group` (sidebar section), `order` (sort within group)
- Groups (in display order): `Get started`, `Guides`, `Release notes`
- MDX components available: `Card`, `CardGroup`, `Note`, `Tip`, `Warning`, `Info`, `Steps`, `Step` (defined in `src/components/docs/MdxComponents.tsx`)
- Layout: `src/components/docs/DocsLayout.tsx` (3-column: sidebar + content + TOC)
- Search: `src/components/docs/SearchModal.tsx` (Pagefind, triggered via sidebar button or Cmd/Ctrl+K)
- Code copy: `src/components/docs/CodeBlockCopyButtons.tsx` (runtime DOM injection on `<pre>` elements)
- TOC: `src/components/docs/DocsTableOfContents.tsx` (IntersectionObserver scroll-spy on h2/h3)

### Adding a new docs page

1. Create `src/content/docs/pages/<slug>.mdx` with frontmatter:
   ```yaml
   ---
   slug: my-new-page
   title: My New Page
   description: One-line description for og:description and sidebar.
   group: Guides
   order: 3
   ---
   ```
2. Write MDX content. Available components: `<Card>`, `<CardGroup>`, `<Note>`, `<Tip>`, `<Warning>`, `<Steps>`, `<Step>`.
3. `npm run build` — the page is auto-discovered, prerendered, and indexed by Pagefind.
4. Deploy with the wrangler command above.

No manual route registration, no sitemap editing (sitemap.xml is still manual — update `public/sitemap.xml` if you want search engines to find the new page faster).

## Routing

Client-side routing via `src/App.tsx` + `src/utils/navigation.ts`. No react-router — hand-written `popstate` listener + `history.pushState`. Key paths:

| Path | Component | Source |
|---|---|---|
| `/` | `HomePage` | `src/pages/HomePage.tsx` |
| `/pricing` | `PricingPage` | `src/pages/PricingPage.tsx` |
| `/blogs` | `BlogPage` | `src/pages/BlogPage.tsx` |
| `/blogs/:slug` | `BlogPostPage` | `src/pages/BlogPostPage.tsx` |
| `/docs` | `DocsPage` (overview) | `src/pages/DocsPage.tsx` |
| `/docs/:slug` | `DocsPage` | `src/pages/DocsPage.tsx` |

## Design system

- **Color theme**: Gruvbox Dark Hard (`--bg-base: #1d2021`, accent `#458588`, orange easter egg `#fe8019`)
- **Fonts**: IBM Plex Sans (body, `--font-reading`), Iosevka (code/mono, `--font-mono`)
- **Code highlight**: Gruvbox Dark Hard via Shiki (build-time, zero runtime)
- **Selection**: `::selection { background: var(--bg-accent); color: var(--bg-base) }`
- **CSS**: single file `src/styles/index.css`, no CSS modules, no Tailwind

## SEO

- Every prerendered route has unique title, description, canonical, og:image, twitter:card
- Blog posts include `<script type="application/ld+json">` Article schema (author: Tzu Gwo)
- `public/robots.txt` points to `public/sitemap.xml`
- `public/404.html` is standalone (no JS, inline Gruvbox CSS)
- Default og:image: `/og-default.png`; blog posts use their own `coverImage`

## Mintlify preview (optional)

`docs-mintlify/` contains a parallel Mintlify preview of the same docs content. Run with:

```bash
cd docs-mintlify && npx mint dev
```

This is for evaluating Mintlify as an alternative docs host. The in-site Vite docs are the production deployment; `docs-mintlify/` is not deployed anywhere.
