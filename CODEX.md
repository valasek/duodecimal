# Codex Instructions

## Project Snapshot
- **Name**: Duodecimal (Dozenal) Calculator
- **Purpose**: Offline-ready web & mobile calculator for base-12 arithmetic.
- **Stack**: Svelte + Vite, TypeScript, Tailwind, PWA via `vite-plugin-pwa`.

## Working Agreements
- Keep output in ASCII unless existing file uses Unicode.
- Add comments only when they clarify non-obvious logic.
- Avoid destructive git commands (`reset --hard`, `checkout --`) unless explicitly requested.

## Command Reference
- Install dev deps once: `npm install`
- Start dev server: `npm run dev`
- Run tests: `npm test`
- Production preview: `npm run build && npm run preview`

## Coding Guidelines
- Use TypeScript and Svelte conventions already in `src/`.
- Preserve the rational-number core; internal state should remain fractional (`bigint` numerator/denominator) until render.
- Ensure digit toggles support both classic (`X,E`) and glyph (`A, B`) modes.
- Maintain accessibility: keyboard support, ARIA roles, large tap targets.

## Pull Request Expectations
1. Run unit and property-based tests before submitting.
2. Add/adjust tests for new logic, especially around base conversions.
3. Confirm PWA build doesn’t regress (`npm run build`).
4. Document notable UI or behavior changes in `README.md` if needed.

## File Guide
- `src/routes` — UI + routing.
- `src/lib` — core logic/helpers (numbers, formatting, input).
- `public/manifest.json` — PWA metadata.
- `vite.config.ts`, `tsconfig.json` — keep aligned with Vite/Svelte defaults unless change is intentional.

## Troubleshooting
- If build fails on preprocess, ensure `svelte-preprocess` is installed (`npm i -D svelte-preprocess`).
- Precision or rounding bugs: inspect rational conversion utilities first.
