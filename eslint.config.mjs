// Root ESLint config — delegates to the shared preset so root-level scripts
// (lint-staged, CI, editor integration) lint the repo the same way as every
// workspace does.
export { default } from "@aerovy/config/eslint/base";
