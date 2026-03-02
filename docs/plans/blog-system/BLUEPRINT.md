# Blueprint: Blog / News System (DB + Admin Managed)

Owner: Paul/Rocky + Codex
Date: 2026-03-02

## Recommendation (Sequencing)

Ship the refreshed landing first.
In parallel, build the blog CMS/admin and create drafts/scheduled posts, but keep the blog “dark” until there are 5–10 published posts (and the internal linking system is ready).

## Goals

- Publish 4–5 blog posts/week + LinkedIn variants.
- Make posts easy to create, review, schedule, update, and repurpose.
- Maximize SEO + “answer engine” visibility with clear structure and credible sourcing.
- Keep content safe in health-adjacent topics (no medical claims; strong disclaimers when needed).

## Phased Rollout

Phase 0 (internal only)
- Admin CRUD, preview, scheduling, status workflow.
- Posts exist in DB but not linked from nav and not indexed.

Phase 1 (soft launch)
- Enable `/blog` with a small set of seed posts.
- Add internal linking blocks (related posts, “next steps”).

Phase 2 (scale)
- Editorial calendar + bulk ops.
- Repurposing tools: LinkedIn post variants + scheduling payload export.
- Topic clusters and pillar pages.

## Data Model (Proposed)

Core
- `blog_posts`
  - `id` (uuid), `status` (draft|review|scheduled|published|archived)
  - `slug` (unique), `title`, `excerpt`, `content` (MD/MDX or rich JSON)
  - `cover_image_url` (optional), `og_image_url` (optional)
  - `canonical_url` (optional), `noindex` (bool)
  - `published_at`, `updated_at`, `created_at`
  - `reading_time_minutes` (optional cached)
  - `language` (en|es) if multilingual, or store per-locale fields
  - `source_refs` (JSON array: url/title/publisher/date/notes)
- `blog_tags` + `blog_post_tags` (many-to-many)
- `blog_authors` (name, bio, avatar, links) + `blog_post_authors` (optional many-to-many)

Optional (later)
- `blog_series` + `blog_post_series`
- `blog_redirects` (old_slug -> new_slug)
- `blog_assets` (uploads, image metadata)

## Admin UX (MVP)

- Posts table: filter by status/tag/author, search title, sort by updated/published.
- Editor: title, slug, excerpt, content, tags, cover image, SEO fields, noindex toggle.
- Preview: server-render preview route that matches production styling.
- Scheduling: publish_at with validation; “Publish now” action.
- Safety checks: block publish without title/slug/content; warn if missing excerpt/OG.

## Frontend Routes (MVP)

- `/blog` (index)
- `/blog/tag/[tag]` (optional)
- `/blog/[slug]` (post page)
- `/sitemap.xml` includes only published + indexable posts
- `/rss.xml` (optional but valuable)

## SEO / AEO Practices (Implementation Checklist)

Page structure
- Strong title + excerpt + TL;DR block
- Descriptive headings (H2/H3)
- “Key takeaways” bullets
- Clear sourcing section (human-readable) + structured `source_refs`

Metadata
- Canonical (per post)
- OG/Twitter: image + title + description
- Article schema (JSON-LD) matching visible content

Indexing rules
- Draft/review/scheduled: not public (or public behind auth) and not in sitemap
- Optional “noindex” for experimental content

## Editorial Workflow (4–5 posts/week)

- Weekly theme (1) + 2–3 clusters (supporting posts)
- Each post produces:
  - 1 article
  - 1–3 LinkedIn variants (different hooks)
  - 1 short “tool idea” snippet (optional)
- Maintain “claims discipline” for health topics:
  - avoid clinical promises
  - cite credible sources when referencing studies
  - include disclaimers when appropriate

## Interactivity Ideas For Blog

- “Ask this article” chat: answers only from the article + citations
- “Build your setup” calculators and checklists embedded per topic
- Interactive diagrams/timelines (hydroponics setups, retreat workflows, community governance)

