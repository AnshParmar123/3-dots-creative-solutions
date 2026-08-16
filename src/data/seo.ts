// The single source of truth for the production origin and for which routes
// are allowed to be indexed. `astro.config.mjs`, `BaseLayout.astro` and the
// generated `robots.txt` all read from here, so changing the domain is a
// one-line edit rather than a hunt through four files.

export const SITE = "https://3dotscreativesolutions.in";

/**
 * Routes that exist in `src/pages` but are not real, indexable pages —
 * build-time helpers, drafts, anything not meant for a search result.
 * Prefixes, matched against the URL path.
 *
 * The sitemap filter and the robots.txt `Disallow` lines are both derived
 * from this list, so a new hidden route only has to be named once.
 *
 * Astro's 404 route is excluded from the sitemap automatically and does not
 * need a line here.
 */
export const HIDDEN_ROUTES = [
  // Rendered at 1200x630 and screenshotted into /images/og.jpg by og.mjs.
  // Never linked, never meant to be read by a human.
  "/og-card",
];

/** True when a URL (path or absolute) belongs to a hidden route. */
export function isHiddenRoute(url: string): boolean {
  const path = url.startsWith("http") ? new URL(url).pathname : url;
  return HIDDEN_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
}

/**
 * AI search and retrieval crawlers, named explicitly so the site is eligible
 * to be cited in AI answers. They would already be covered by `User-agent: *`,
 * but several operators only honour rules addressed to them by name, and an
 * explicit Allow is a clearer signal than an inherited one.
 */
export const AI_CRAWLERS = [
  "OAI-SearchBot", // OpenAI's search index
  "ChatGPT-User", // ChatGPT fetching a page on a user's behalf
  "ClaudeBot", // Anthropic's crawler
  "Claude-SearchBot", // Anthropic's search index
  "PerplexityBot", // Perplexity's index
];
