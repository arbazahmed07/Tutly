// @ts-check
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  output: "server",
  experimental: {
    serverIslands: true,
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  // images
  image: {
    service: {
      entrypoint: "astro/assets/service-entrypoint.mjs",
    },
    domains: [
      "png.pngtree.com",
      "plus.unsplash.com",
    ],
  },
});
