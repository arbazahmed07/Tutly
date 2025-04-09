import baseConfig, { restrictEnvAccess } from "@tutly/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  ...baseConfig,
  ...restrictEnvAccess,
];
