# CultivoAI Codebase Cleanup - Implementation Plan

## Phase 1: Analysis & Preparation

### Tasks
- [x] Verify which files are actually unused by searching for imports
- [x] Check if `next-themes` is used anywhere besides theme-provider
- [x] Identify any other boilerplate references in the codebase
- [x] Create backup branch (optional) - N/A, working on feature branch

---

## Phase 2: Remove Unused Boilerplate Components

### Tasks
- [x] Delete `src/components/site-header.tsx`
- [x] Delete `src/components/site-footer.tsx`
- [x] Delete `src/components/starter-prompt-modal.tsx`
- [x] Delete `src/components/setup-checklist.tsx`
- [x] Delete `src/components/theme-provider.tsx`
- [x] Delete `src/components/ui/mode-toggle.tsx`
- [x] Delete `src/components/ui/github-stars.tsx`

---

## Phase 3: Remove Dark Mode Support

### Tasks
- [x] Remove `next-themes` from package.json
- [x] Update `sonner.tsx` to use hardcoded light theme
- [x] Verify globals.css has no dark mode styles that need cleanup
- [x] Run `pnpm install` to update lock file

---

## Phase 4: Clean Up Untracked Files

### Tasks
- [x] Delete `nul` file (Windows artifact)
- [x] Review other untracked files in git status

---

## Phase 5: Verify Imports & Fix Broken References

### Tasks
- [x] Search for imports of deleted files (none found)
- [x] Fix or remove any broken imports (none needed)
- [x] Check for any components that depended on deleted files (none)

---

## Phase 6: Code Quality Checks

### Tasks
- [x] Run `pnpm lint` - passed (0 errors, 34 warnings)
- [x] Run `pnpm typecheck` - passed (0 errors)

---

## Phase 7: Final Verification

### Tasks
- [ ] Verify landing page still renders correctly
- [ ] Verify admin dashboard works
- [ ] Verify chat widget functions
- [ ] Verify authentication flow works

---

## Additional Cleanup Performed

### Package.json Updates
- [x] Renamed package from "agentic-coding-starter-kit" to "cultivoai"
- [x] Reset version to "1.0.0"

---

## Summary of Changes

### Files Deleted (7)
```
src/components/
├── site-header.tsx         (boilerplate - "Starter Kit" branding)
├── site-footer.tsx         (boilerplate - GitHub links)
├── starter-prompt-modal.tsx (boilerplate - onboarding modal)
├── setup-checklist.tsx     (boilerplate - setup diagnostics)
├── theme-provider.tsx      (dark mode - violates Brutalist design)
└── ui/
    ├── mode-toggle.tsx     (dark mode toggle)
    └── github-stars.tsx    (starter kit branding)
```

### Files Modified (2)
- `package.json` - Renamed package, removed next-themes
- `src/components/ui/sonner.tsx` - Removed next-themes import, hardcoded light theme

### Dependencies Removed (1)
- `next-themes` - No longer needed (single Brutalist theme)

---

## Lint Warnings (Non-blocking)

The following warnings exist but are non-critical:
- Console statements in voice-related files (development logging)
- Import order in some files

These can be addressed in a future cleanup pass if desired.
