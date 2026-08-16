import type { APIRoute } from "astro";
import { AI_CRAWLERS, HIDDEN_ROUTES, SITE } from "../data/seo";

// robots.txt is generated rather than kept in `public/` so the domain and the
// hidden-route list come from `src/data/seo.ts` — the same config the canonical
// tag and the sitemap use. A static copy would drift the moment the domain
// changed. The rules themselves rarely change; this is about not repeating
// the domain a fourth time.

// Every group repeats the disallows, because a named `User-agent` group
// replaces the `*` group outright — a crawler that matches its own name never
// reads the wildcard rules.
const disallows = HIDDEN_ROUTES.map((route) => `Disallow: ${route}/`);

function group(agent: string, comment?: string) {
  return [
    comment,
    `User-agent: ${agent}`,
    "Allow: /",
    ...disallows,
  ]
    .filter(Boolean)
    .join("\n");
}

const body = [
  "# 3DOTS Creative Solutions",
  "# Generated at build time from src/data/seo.ts — do not edit dist/robots.txt.",
  "",
  group("*"),
  "",
  "# AI search and retrieval crawlers, allowed by name so the site stays",
  "# eligible for citation in AI answers.",
  ...AI_CRAWLERS.map((agent) => `${group(agent)}\n`),
  `Sitemap: ${new URL("/sitemap.xml", SITE).href}`,
  "",
].join("\n");

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
