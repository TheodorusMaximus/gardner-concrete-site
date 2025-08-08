// @ts-check
import { defineConfig } from "astro/config";
import wix from "@wix/astro";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import { config as loadEnv } from "dotenv";

// Load environment variables in the right order **before** Astro evaluates integration options.
// 1) .env (generic defaults)
// 2) .env.local (machine-specific overrides)
loadEnv();
loadEnv({ path: ".env.local", override: true });

// https://astro.build/config
const disableSiteScripts = process.env.WIX_DISABLE_SITE_SCRIPTS === "true";

export default defineConfig({
  integrations: [
    wix({ enableHtmlEmbeds: !disableSiteScripts }),
    react(),
  ],

  vite: {
    plugins: tailwindcss(),
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: false,
    },
  }),

  image: {
    domains: ["static.wixstatic.com"],
  },

  output: "server",
});