import { defaultLocale, localeCodes, supportedLocales } from "./config";
import type {
  CommonTranslations,
  HomeMetadata,
  LocaleCode,
  LocaleConfig,
  RouteDictionary,
  RouteKey,
} from "./types";
import commonEn from "./translations/common/en.json";
import commonEs from "./translations/common/es.json";
import homeMetadataEn from "./metadata/pages/home/en.json";
import homeMetadataEs from "./metadata/pages/home/es.json";
import landingEn from "./translations/landing/en.json";
import landingEs from "./translations/landing/es.json";
import routesEn from "./routes/en.json";
import routesEs from "./routes/es.json";
import type { LandingPageContent } from "./types";

const commonTranslations: Record<LocaleCode, CommonTranslations> = {
  es: commonEs,
  en: commonEn,
};

const homeMetadata: Record<LocaleCode, HomeMetadata> = {
  es: homeMetadataEs,
  en: homeMetadataEn,
};

const landingContent: Record<LocaleCode, LandingPageContent> = {
  es: landingEs as unknown as LandingPageContent,
  en: landingEn as unknown as LandingPageContent,
};

const routeMaps: Record<LocaleCode, RouteDictionary> = {
  es: routesEs,
  en: routesEn,
};

export { defaultLocale, localeCodes, supportedLocales };

export function isLocale(value: string): value is LocaleCode {
  return localeCodes.includes(value as LocaleCode);
}

export function resolveLocale(locale: string): LocaleCode {
  return isLocale(locale) ? locale : defaultLocale;
}

export function getLocaleConfig(locale: string): LocaleConfig {
  return supportedLocales.find((item) => item.code === resolveLocale(locale)) ?? supportedLocales[0];
}

export function getCommonTranslations(locale: string): CommonTranslations {
  return commonTranslations[resolveLocale(locale)];
}

export function getHomeMetadata(locale: string): HomeMetadata {
  return homeMetadata[resolveLocale(locale)];
}

export function getLandingContent(locale: string): LandingPageContent {
  return landingContent[resolveLocale(locale)];
}

export function getRouteSlug(locale: string, route: RouteKey): string {
  return routeMaps[resolveLocale(locale)][route];
}

export function getRouteKeyBySlug(locale: string, slug: string): RouteKey | null {
  const resolvedLocale = resolveLocale(locale);
  const match = Object.entries(routeMaps[resolvedLocale]).find(([, value]) => value === slug);

  return (match?.[0] as RouteKey | undefined) ?? null;
}

export interface ResolvedLocalizedRoute {
  readonly locale: LocaleCode;
  readonly route: RouteKey;
  readonly slug: string | null;
}

export function resolveLocalizedRoute(path: string | undefined): ResolvedLocalizedRoute {
  const segments = path?.split("/").filter(Boolean) ?? [];
  const firstSegment = segments[0];

  if (!firstSegment) {
    return {
      locale: defaultLocale,
      route: "home",
      slug: null,
    };
  }

  const locale = isLocale(firstSegment) ? firstSegment : defaultLocale;
  const slug = isLocale(firstSegment) ? segments[1] ?? null : firstSegment;
  const route = slug === null ? "home" : getRouteKeyBySlug(locale, slug) ?? "home";

  return {
    locale,
    route,
    slug,
  };
}

export function getLocalizedPath(locale: string, route: RouteKey = "home"): string {
  const resolvedLocale = resolveLocale(locale);

  if (route === "home") {
    return `/${resolvedLocale}/`;
  }

  const slug = getRouteSlug(resolvedLocale, route);

  return `/${resolvedLocale}/${slug}/`;
}

export function getAlternateLocalePaths(route: RouteKey = "home"): Array<{ code: LocaleCode; href: string }> {
  return supportedLocales.map((locale) => ({
    code: locale.code,
    href: getLocalizedPath(locale.code, route),
  }));
}
