import type { APIRoute } from "astro";
import { getLocalizedPath, supportedLocales } from "../i18n";
import { SEO_EVENT_KEYS, getSeoLandingPaths, getSeoLandingPath, getSeoLandingLocationFromParams } from "../content/seo-event-landings";

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.SITE ?? "https://eventos.diloconflores.com";

  const homeUrls = supportedLocales
    .map((locale) => {
      const loc = new URL(getLocalizedPath(locale.code), siteUrl).toString();
      const alternates = supportedLocales
        .map((alternate) => {
          const href = new URL(getLocalizedPath(alternate.code), siteUrl).toString();

          return `<xhtml:link rel="alternate" hreflang="${alternate.code}" href="${href}" />`;
        })
        .join("");

      return `<url><loc>${loc}</loc>${alternates}</url>`;
    })
    .join("");

  const eventUrls = SEO_EVENT_KEYS.flatMap((event) =>
    getSeoLandingPaths(event).map((entry) => {
      const location = getSeoLandingLocationFromParams(entry.params);
      const loc = new URL(getSeoLandingPath(event, location), siteUrl).toString();
      const alternates = `<xhtml:link rel="alternate" hreflang="es" href="${loc}" />`;

      return `<url><loc>${loc}</loc>${alternates}</url>`;
    }),
  ).join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${homeUrls}${eventUrls}
</urlset>
`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
};
