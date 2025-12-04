# Next Phase Prompt: Phase 5 - User Dashboard & Workflows

Continue CultivoAI development - Phase 5: User Dashboard & Workflows

## Context
- Branch: `feature/phase-2-chatbot-first-ux`
- Phase 4 complete: Admin dashboard with lead management, analytics, export
- Previous commits: 0f9471a (Phase 4), 45d8ee6 (Phase 3)

## Current State
- `/admin` - Admin dashboard for Paul (lead management, analytics)
- `/dashboard` - Basic user dashboard (profile info, chat link)
- Auth working with Google OAuth via BetterAuth
- UserProfile dropdown has Dashboard, Admin, Profile, Log out links

## Database Tables Available
- `user`, `session`, `account` - BetterAuth tables
- `leads`, `chat_conversations`, `chat_messages` - CultivoAI tables

## Tasks

### 1. User Dashboard Layout
Create a proper dashboard layout with sidebar navigation:
- Overview (home)
- Chat / AI Assistant
- Workflows (future n8n integration)
- Settings / Profile

### 2. Dashboard Overview Page
- Welcome message with user name
- Quick stats (if applicable)
- Recent activity or getting started guide
- Quick action cards

### 3. Profile/Settings Page
Create `/dashboard/settings` or `/dashboard/profile`:
- View/edit profile info
- Language preference
- Notification preferences (email opt-in)
- Connected accounts (show Google connection)
- Delete account option

### 4. User Workflows Page (Placeholder)
Create `/dashboard/workflows`:
- Coming soon placeholder
- Explain n8n workflow integration plans
- Interest signup (capture email for notifications)

### 5. Navigation Improvements
- Add consistent navigation between user and admin dashboards
- Mobile-friendly sidebar/drawer
- Breadcrumbs or clear page indicators

## Design Notes
- Match existing `/dashboard` and `/admin` styling
- Use shadcn/ui components
- Keep it simple and functional
- Mobile-friendly

## Optional Enhancements
- Activity log showing user's chat history
- Ability to export own conversation history
- Dark mode toggle (user preference only, not site-wide)

After changes, run `pnpm lint && pnpm typecheck`.
