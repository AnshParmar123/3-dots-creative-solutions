import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// The production domain — it is what the sitemap and canonical/social URLs
// are built from.
export const SITE = "https://3dotscreativesolutions.in";

export default defineConfig({
  site: SITE,
  integrations: [sitemap({ filter: (page) => !page.includes("/og-card") })],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
