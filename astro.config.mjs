import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Update this to the client's real domain before launch — it is what the
// sitemap and canonical/social URLs are built from.
export const SITE = "https://3dotscreative.com";

export default defineConfig({
  site: SITE,
  integrations: [sitemap({ filter: (page) => !page.includes("/og-card") })],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
