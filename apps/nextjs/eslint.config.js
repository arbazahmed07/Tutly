import baseConfig, { restrictEnvAccess } from "@tutly/eslint-config/base";
import nextjsConfig from "@tutly/eslint-config/nextjs";
import reactConfig from "@tutly/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
