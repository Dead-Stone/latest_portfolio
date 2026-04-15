# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run Next.js ESLint
```

There are no tests in this project.

## Architecture

This is a **Next.js 14 App Router** portfolio site with two pages:

- `/` — Single-page portfolio (Hero, About, Projects, Skills, Experience, Contact sections)
- `/art` — Art gallery page with a film reel / carousel display

### Key architectural patterns

**Dual-page toggle**: A floating `PageToggle` button (bottom-right) switches between the portfolio and art gallery pages using `useRouter`. It triggers an animated full-screen transition overlay via `PageTransitionContext` before navigating.

**Theme system**: `ThemeContext` manages light/dark mode via a `dark` class on `<html>`. Tailwind is configured with `darkMode: 'class'`. Theme preference is persisted to `localStorage` and respects `prefers-color-scheme` on first visit.

**Active section tracking**: `app/page.tsx` uses a scroll event listener to track which section is in view and passes `activeSection` down to `Navigation` for the animated underline indicator.

### Directory structure

```
app/
  layout.tsx          # Root layout — wraps with ThemeProvider + PageTransitionProvider
  page.tsx            # Portfolio home (single-page scroll)
  art/page.tsx        # Art gallery page
  globals.css         # Tailwind base + custom keyframe animations
components/           # All UI components (all 'use client')
  Navigation.tsx      # Fixed top nav with scroll-spy + mobile menu
  PageTransition.tsx  # Full-screen overlay shown during page transitions
  PageToggle.tsx      # Floating toggle button (portfolio ↔ art gallery)
  FilmReel.tsx        # Art gallery film strip carousel
  [Hero|About|Projects|Skills|Experience|Contact].tsx
contexts/
  ThemeContext.tsx           # Light/dark theme state + localStorage persistence
  PageTransitionContext.tsx  # isTransitioning state for page-change animation
```

### Styling

Tailwind CSS with `darkMode: 'class'`. Custom animations (`blob`, `gradient`, `bounce-slow`) are defined in both `tailwind.config.ts` and `globals.css`. The `--font-caveat` CSS variable is set on `<html>` from the Caveat Google Font (used in art-related display text).

### Path aliases

`@/` maps to the project root (configured via Next.js default tsconfig paths).
