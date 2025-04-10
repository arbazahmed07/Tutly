import { fileURLToPath } from "url";
import jiti from "jiti";

// Import env files to validate at build time
const jitiInstance = jiti(fileURLToPath(import.meta.url));
jitiInstance("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@tutly/api",
    "@tutly/auth",
    "@tutly/db",
    "@tutly/validators",
    // "@tutly/ui",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  /** External packages config */
  serverExternalPackages: ["bcryptjs"],

  images: {
    unoptimized: true,
    domains: ["*"],
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "aws-crt": false,
      "fs": false,
      "path": false,
    };

    return config;
  },
};

export default config;
