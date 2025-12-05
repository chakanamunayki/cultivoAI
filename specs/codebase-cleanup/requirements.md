# CultivoAI Codebase Cleanup - Requirements

## Overview

Clean up the CultivoAI codebase by removing unused boilerplate files from the original `create-agentic-app` starter template, ensuring code quality, and preparing the codebase for production.

## Goals

1. **Remove Unused Boilerplate** - Delete template files that conflict with CultivoAI brand
2. **Enforce Design Rules** - Remove dark mode support (violates CLAUDE.md)
3. **Code Quality** - Ensure lint and typecheck pass
4. **Clean Git Status** - Remove untracked/unnecessary files
5. **Verify Functionality** - Ensure all features still work after cleanup

## Scope

### In Scope

- Boilerplate component removal
- Dark mode/theme provider removal
- Unused dependency cleanup
- Code linting and type checking
- Git cleanup (untracked files)
- Verify imports are correct after deletion

### Out of Scope

- New feature development
- UI/UX changes
- Database migrations
- Documentation updates (beyond cleanup)

## Success Criteria

1. All unused boilerplate files removed
2. No dark mode references in codebase
3. `pnpm lint` passes with no errors
4. `pnpm typecheck` passes with no errors
5. No broken imports or references
6. Git status clean (except for cleanup changes)

## Files to Remove

### High Priority (Unused, Conflicts with Brand)

| File | Reason |
|------|--------|
| `src/components/site-header.tsx` | Generic "Starter Kit" header, not used |
| `src/components/site-footer.tsx` | Generic footer with GitHub links, not used |
| `src/components/starter-prompt-modal.tsx` | Onboarding modal, not imported |
| `src/components/setup-checklist.tsx` | Setup diagnostics, not imported |
| `src/components/ui/mode-toggle.tsx` | Dark mode toggle, not used |
| `src/components/ui/github-stars.tsx` | GitHub stars counter, not used |
| `src/components/theme-provider.tsx` | Theme provider for dark mode, violates design |
| `nul` | Windows placeholder file (untracked) |

### Dependencies to Review

| Package | Reason |
|---------|--------|
| `next-themes` | Only used by theme-provider.tsx (to remove) |

## Existing Features to Preserve

- Landing page (Brutalist design)
- Admin dashboard & analytics
- Chat widget (Gemini AI)
- Voice conversation mode
- Lead capture & qualification
- User authentication (BetterAuth)
- Database schema & migrations
- Internationalization (ES/EN)
