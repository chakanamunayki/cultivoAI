# Phase 4: Analytics Dashboard & Admin - Implementation Plan

## Progress Summary

**Started**: Session in progress
**Status**: COMPLETE - All pages created, auth navigation added, lint/typecheck passed

---

## Phase 4A: Admin API Routes

### Tasks

- [x] Create `/api/admin/stats` route - Dashboard summary statistics
  - Total leads, by status, by source
  - Conversation metrics (avg messages, avg duration)
  - Engagement metrics (WhatsApp clicks, lead capture rate)
  - File: `src/app/api/admin/stats/route.ts`

- [x] Create `/api/admin/leads` route - Paginated leads with filters
  - Pagination (page, limit, offset)
  - Filters: status, source, qualificationLevel, search, dateFrom, dateTo
  - Sorting: by date, name, email, qualificationScore
  - Include conversation counts per lead
  - PATCH endpoint for status updates
  - File: `src/app/api/admin/leads/route.ts`

- [x] Create `/api/admin/leads/[id]` route - Lead details
  - Full lead data with all fields
  - All conversations with messages
  - Timeline of interactions
  - DELETE endpoint
  - File: `src/app/api/admin/leads/[id]/route.ts`

- [x] Create `/api/admin/conversations` route - Conversation listing
  - Paginated list with lead info
  - Filters: date range, escalation, lead capture, language
  - Aggregate metrics for filtered set
  - File: `src/app/api/admin/conversations/route.ts`

- [x] Create `/api/admin/export` route - CSV export
  - Export leads to CSV format
  - Optional JSON format
  - Filter by status and date range
  - File: `src/app/api/admin/export/route.ts`

---

## Phase 4B: Admin Content & Types

### Tasks

- [x] Create admin content file for bilingual support
  - Spanish and English translations
  - Labels for stats, tables, actions, statuses
  - File: `src/content/admin.ts`

- [x] Create TypeScript types for admin data
  - Dashboard stats types
  - Lead list/details types
  - Conversation types
  - File: `src/types/admin.ts`

- [x] Create admin content hook
  - File: `src/hooks/use-admin-content.ts`

---

## Phase 4C: Admin Dashboard Page

### Tasks

- [x] Create admin layout with navigation
  - Tab navigation: Dashboard, Leads, Conversations, Export
  - Back to site link
  - Auth protection (requires sign-in)
  - File: `src/app/admin/layout.tsx`

- [x] Create dashboard overview page
  - Stats cards grid (total leads, conversations, lead capture rate, WhatsApp clicks)
  - Lead status breakdown (colored badges)
  - Recent leads table (5 most recent)
  - Quick actions on each row (WhatsApp, Email, View)
  - File: `src/app/admin/page.tsx`

---

## Phase 4D: Leads List Page

### Tasks

- [x] Create full leads list page
  - Search bar with debounce
  - Status filter dropdown
  - Clear filters button
  - Paginated list with prev/next
  - Quick actions per lead
  - File: `src/app/admin/leads/page.tsx`

---

## Phase 4E: Lead Details Page

### Tasks

- [x] Create lead details page
  - Header with name, email, contact buttons
  - Contact info card with status selector
  - Project info card (if data exists)
  - Qualification score breakdown (5 checkmarks)
  - Notes section (editable with save)
  - File: `src/app/admin/leads/[id]/page.tsx`

- [x] Create conversation history (inline)
  - List of conversations with expand/collapse
  - Message bubbles (user vs bot styling)
  - Metadata: duration, escalation badge, lead captured badge

---

## Phase 4F: Conversations & Export Pages

### Tasks

- [x] Create conversations list page
  - Metrics cards (avg messages, duration, rates)
  - Paginated conversation list
  - Link to lead details when available
  - File: `src/app/admin/conversations/page.tsx`

- [x] Create export page
  - Status filter
  - Date range filter
  - Download CSV and JSON buttons
  - File: `src/app/admin/export/page.tsx`

---

## Phase 4G: Final Validation

### Tasks

- [x] Run lint and typecheck
  - `pnpm lint` - passed (0 errors, 0 warnings)
  - `pnpm typecheck` - passed

- [ ] Manual testing
  - Test all API endpoints
  - Test pagination and filters
  - Test export functionality
  - Test on mobile viewport

- [ ] Commit changes
  - Meaningful commit message following project conventions

---

## Files Created

### API Routes
```
src/app/api/admin/stats/route.ts
src/app/api/admin/leads/route.ts
src/app/api/admin/leads/[id]/route.ts
src/app/api/admin/conversations/route.ts
src/app/api/admin/export/route.ts
```

### Content & Types
```
src/content/admin.ts
src/types/admin.ts
src/hooks/use-admin-content.ts
```

### Admin Pages
```
src/app/admin/layout.tsx
src/app/admin/page.tsx
src/app/admin/leads/page.tsx
src/app/admin/leads/[id]/page.tsx
src/app/admin/conversations/page.tsx
src/app/admin/export/page.tsx
```

### Modified for Auth Navigation
```
src/components/auth/user-profile.tsx (added Dashboard, Admin links)
src/components/landing/layout/nav.tsx (added auth button)
src/app/dashboard/page.tsx (added header with UserProfile)
```

---

## Design Notes

- **Reuse existing UI** - Uses shadcn/ui components from `src/components/ui/`
- **Match `/dashboard` style** - Consistent with user dashboard design
- **Route structure**: `/admin` for CultivoAI team, `/dashboard` for users
- **Mobile-friendly** - Responsive layout, works on phone
- **Auth protected** - Requires sign-in to access
