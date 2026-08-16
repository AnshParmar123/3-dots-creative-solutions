import { copyFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { SITE, isHiddenRoute } from "./src/data/seo.ts";

// The production domain lives in src/data/seo.ts so the canonical tag, the
// sitemap and robots.txt all read the same value. Re-exported here because
// that is where it has always been imported from.
export { SITE };

/**
 * `@astrojs/sitemap` always writes `sitemap-index.xml`, but `/sitemap.xml` is
 * the URL search consoles and people reach for, and it is what robots.txt
 * advertises. Publish the index under that name too, as a real file — a host
 * redirect would not survive a move off Vercel or show up in `astro preview`.
 *
 * It copies the *index*, not the `sitemap-0.xml` shard, so this keeps working
 * if the site ever grows past a single sitemap file.
 */
function sitemapAlias() {
  return {
    name: "sitemap-alias",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        copyFileSync(join(out, "sitemap-index.xml"), join(out, "sitemap.xml"));
        logger.info("`sitemap.xml` created at `dist`");
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      // Every route under src/pages is picked up automatically, so a new page
      // needs no change here. Only genuinely indexable pages survive: hidden
      // routes are named in seo.ts, and the generated robots.txt is not a page.
      filter: (page) => !isHiddenRoute(page) && !page.endsWith("/robots.txt"),
    }),
    // Must come after sitemap() — hooks run in array order, and this one
    // copies what that integration just wrote.
    sitemapAlias(),
  ],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
