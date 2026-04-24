import base from "@aerovy/config/eslint/base";

export default [
  ...base,
  {
    ignores: ["generated/**"],
  },
];
