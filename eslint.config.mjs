// Root ESLint flat config. Individual apps/packages extend this in Phase 1 Ticket 1.
// Minimal rules for Phase 0 — app-specific rules (react, next, import/no-cycle) land
// when we extract everything to packages/config.
import js from "@eslint/js";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/dist/**",
      "**/coverage/**",
      "**/.husky/_/**",
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
];
