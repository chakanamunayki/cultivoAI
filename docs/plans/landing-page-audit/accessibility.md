# Accessibility Audit

## High-risk items

1. Modal accessibility gaps
- File: `src/components/landing/ui/modal.tsx`
- Missing dialog semantics and focus management.
- Recommendation: move to Radix Dialog (`@radix-ui/react-dialog`) to get:
  - focus trap
  - `aria-*` wiring
  - escape handling
  - focus restoration

2. Clickable non-interactive elements
- File: `src/components/landing/layout/nav.tsx`
  - Logo uses `<div onClick=...>`.
- File: `src/components/landing/layout/footer.tsx`
  - CTA heading uses `onClick` on an `<h2>`.
- Recommendation:
  - Use `<button type="button">` or `<a>` instead.

3. In-page navigation uses buttons instead of links
- File: `src/components/landing/layout/nav.tsx`
- Recommendation:
  - Use anchors with `href="#section"` so navigation works without JS and is discoverable.

## Form-level improvements

- File: `src/components/landing/ui/contact-modal.tsx`
- Issues:
  - `<label>` tags do not use `htmlFor` + input `id`.
  - No `autoComplete` attributes.
  - No error/success messaging beyond disabled state.
- Recommendation:
  - Add `id`/`htmlFor`, `autoComplete`, and proper validation feedback (inline + toast).

## Suggested quick checks
- Keyboard-only: can you reach every CTA, open/close modal, and return focus to the trigger?
- Screen reader: dialog announced as dialog with title? buttons have meaningful labels?
- Reduced motion: consider respecting `prefers-reduced-motion` for heavy Framer Motion usage.

