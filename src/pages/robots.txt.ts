import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.SITE ?? "https://example.com";
  const sitemapUrl = new URL("/sitemap.xml", siteUrl).toString();

  return new Response(`User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
