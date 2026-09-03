# Copilot instructions for adarsh-portfolio

## Project overview

This repository is a Next.js portfolio site for Adarsh Prakasan. It is a single-page experience built with the App Router, TypeScript, Tailwind CSS v4, and motion-driven UI interactions.

Core stack:
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion / Motion
- Lucide React
- React Three Fiber / Three.js (dependency is present for future work, not the main build requirement)

## How to run the app

From the repo root:

```bash
npm install
npm run dev
```

Then open the local Next.js URL shown in the terminal.

## Build, lint, and validation commands

```bash
npm run build
npm run lint
```

Notes:
- There is no dedicated test script in `package.json` right now.
- For targeted validation on a single file, prefer `npx eslint <file>`.
- For a type-only check without a full production build, use:

```bash
npx tsc --noEmit
```

## High-level architecture

The codebase is intentionally compact and organized around the portfolio experience rather than a large app structure.

- `app/layout.tsx` defines the global page shell, metadata, and the site-wide `CustomCursor` component.
- `app/page.tsx` is the main homepage and contains the portfolio content, the designer/developer mode switch, project lists, scroll logic, and the modal-based project detail flow.
- `components/ProjectModal.tsx` contains the detailed project overlay and the per-project metadata used by the portfolio cards.
- `components/LiquidText.tsx` is a custom text effect used for the headline/hero treatment.
- `components/CustomCursor.tsx` adds the custom cursor behavior used across the page.
- `app/globals.css` contains the global visual system and base styling; section-specific layout styling is split across `app/work.css`, `app/skills.css`, and `app/experience.css`.

This is a content-heavy landing page with lots of client-side animation and state, so the main logic is intentionally centralized rather than spread across many route files.

## Key conventions

- Prefer the existing App Router pattern in `app/` for route-level UI and keep client-side interactivity in `"use client"` components.
- The portfolio content is data-driven: the main `content` object in `app/page.tsx` is the canonical place to update copy, roles, work history, and project lists.
- Keep animation-heavy interactions in the existing `motion/react` pattern instead of introducing a second animation library.
- Styling is split between Tailwind utilities and custom CSS files; do not replace the existing visual system without checking the section-specific CSS and the global theme tokens.
- Components are named in PascalCase and live under `components/` when they are reusable, while route-specific UI stays in `app/`.
- `AGENTS.md`/`CLAUDE.md` note that this repo is on a newer Next.js release than older examples; if a framework API seems unfamiliar, verify the behavior against `node_modules/next/dist/docs` before making a structural change.

## Editing guidance

- For content changes, start in `app/page.tsx` because the portfolio copy and project arrays are centralized there.
- For UI/interaction changes, inspect the relevant component first (`ProjectModal.tsx`, `LiquidText.tsx`, or `CustomCursor.tsx`) before adding new state or effects.
- For visual changes, check the matching CSS file (`app/work.css`, `app/skills.css`, `app/experience.css`) alongside `app/globals.css` so the design system remains consistent.
- Keep changes surgical; this project is a polished single-page portfolio, not a multi-route application.
