# Duodecimal (Dozenal) Calculator

Offline-ready web & mobile calculator for base-12 arithmetic.

## Local development

All code is written by AI, using Antropic Codex by my guidance.

### Key product choices

Digit sets toggle: support both classic X,E and A, B. No glyphs are used at the moment.

Input model: keep an internal rational representation (numerator/denominator bigint).

Formatting: convert rational → dozenal string only at render time.

Keyboard & a11y: full keyboard support, ARIA roles for buttons, big tap targets.


# Tech stack

Language: TypeScript

UI framework: Svelte (with Vite)

Styling: Tailwind CSS

PWA: vite-plugin-pwa (Workbox under the hood)

Testing:
- Unit: Vitest
- Property-based: fast-check (great for number systems)
- E2E/UI: Playwright

Precision math: fraction.js (rational arithmetic) or roll your own tiny rational type with bigint

# Usefull commands - start
npm i -D svelte-preprocess

## dev
npm run dev

## tests
npm test

## production build preview
npm run build && npm run preview
