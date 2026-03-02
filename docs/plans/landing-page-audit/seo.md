# SEO Audit

## What’s good
- Metadata defined in `src/app/layout.tsx` (title/description/keywords, OpenGraph, Twitter card).
- JSON-LD Organization structured data included in `<head>`.
- `robots.ts` and `sitemap.ts` exist.

## Issues / Gaps

1. `sitemap.ts` includes non-indexable routes
- `src/app/sitemap.ts` lists `/dashboard` and `/chat` while `src/app/robots.ts` disallows them.
- Fix: keep sitemap to public indexable routes only.

2. Missing `metadataBase` and canonical alternates
- `metadataBase` is not set in `layout.tsx`, so absolute URLs for OG/Twitter and canonicalization can be brittle.
- Fix: set `metadataBase` to `NEXT_PUBLIC_APP_URL` (or equivalent), add `alternates.canonical`, and consider `alternates.languages` if you keep bilingual content.

3. No OpenGraph/Twitter images
- `twitter.card` is set to `summary_large_image`, but there’s no `openGraph.images` / `twitter.images`.
- Fix: add a real OG image under `public/` (e.g. `/og.png`) and reference it in metadata.

4. `lastModified: new Date()` in sitemap is unstable
- `src/app/sitemap.ts` uses `new Date()` per request.
- Fix: use a stable build-time date (or a deploy timestamp env var), otherwise crawlers see artificial churn.

5. i18n is client-side only (metadata stays Spanish)
- Locale toggle changes content, but metadata is static.
- Fix options:
  - Implement locale routes (`/en`, `/es`) with per-locale metadata.
  - Or accept static SEO language and treat locale as purely user preference.

