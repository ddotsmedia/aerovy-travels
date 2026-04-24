# @aerovy/config

Shared configuration for every workspace in the Aerovy Travels monorepo:
ESLint, Prettier, TypeScript, and Tailwind design tokens. One source of truth;
each app/package extends from here.

## ESLint

Flat-config presets, each building on `base`:

```js
// apps/web/eslint.config.mjs
export { default } from "@aerovy/config/eslint/next";
```

- `@aerovy/config/eslint/base` — JS + typescript-eslint + Prettier-compat.
- `@aerovy/config/eslint/react-library` — base + React + react-hooks.
- `@aerovy/config/eslint/next` — react-library + `@next/next` rules.

## Prettier

Referenced as a package string (Prettier v3 resolves via node_modules):

```json
// apps/web/package.json
{ "prettier": "@aerovy/config/prettier" }
```

## TypeScript

```json
// apps/web/tsconfig.json
{ "extends": "@aerovy/config/tsconfig/nextjs.json" }
```

Available presets:

- `tsconfig/base.json` — strict, ES2022, bundler resolution, declarations on.
- `tsconfig/nextjs.json` — base + DOM libs + `next` plugin + JSX preserve.
- `tsconfig/react-library.json` — base + DOM libs + `react-jsx`, emits to `dist/`.

## Tailwind (v4, CSS-first)

```css
/* apps/web/app/globals.css */
@import "tailwindcss";
@import "@aerovy/config/tailwind/tokens.css";
```

Utilities available after import: `bg-brand-primary`, `bg-brand-secondary`,
`bg-brand-accent`, `bg-bg`, `bg-surface`, `text-text`, `text-muted`,
`border-border`, `ring-ring`, plus status colors `success`/`warning`/
`danger`/`info`. Dark mode activates via `class="dark"` on `<html>`.

## Peer dependencies

The consumer workspace must install `eslint`, `prettier`, `typescript`, and
(if using the Tailwind tokens) `tailwindcss@^4` and `prettier-plugin-tailwindcss`.
