import type { LocaleCode } from "../../../i18n/types";
import type { BentoGridItem, BentoGridSeoTagSource } from "./types";

const DEFAULT_TAG_BY_LOCALE: Record<LocaleCode, string> = {
  es: "Diseño floral",
  en: "Floral design",
};

const FOCUS_TAG_RULES: Record<
  LocaleCode,
  readonly { readonly pattern: RegExp; readonly tag: string }[]
> = {
  es: [
    { pattern: /\bboda civil\b/i, tag: "Boda civil" },
    { pattern: /\bceremonia\b|\baltar\b/i, tag: "Ceremonia floral" },
    { pattern: /\bentrada\b|\bacceso\b/i, tag: "Entrada floral" },
    { pattern: /\bmesa principal\b/i, tag: "Mesa principal" },
    { pattern: /\bmesa\b/i, tag: "Mesa floral" },
    { pattern: /\bramo\b|\baccesorios?\b/i, tag: "Detalles personales" },
    { pattern: /\brecorrido\b|\bpasillo\b|\btransici[oó]n\b/i, tag: "Recorrido floral" },
    { pattern: /\baltura\b|\bvertical\b/i, tag: "Composición vertical" },
    { pattern: /\btextura\b/i, tag: "Textura floral" },
    { pattern: /\bpaleta\b|\btonos?\b/i, tag: "Paleta floral" },
    { pattern: /\bescena\b|\bfotos?\b|\bfondo\b/i, tag: "Escenografía floral" },
    { pattern: /\bgran formato\b|\bimpacto\b/i, tag: "Gran formato" },
    { pattern: /\bambientaci[oó]n\b|\bintegral\b/i, tag: "Ambientación floral" },
    { pattern: /\bnatural\b|\borg[aá]nico\b/i, tag: "Diseño orgánico" },
    { pattern: /\belegante\b|\belegancia\b|\bsofisticad/i, tag: "Diseño elegante" },
  ],
  en: [
    { pattern: /\bcivil wedding\b/i, tag: "Civil wedding" },
    { pattern: /\bceremony\b|\baltar\b/i, tag: "Ceremony floral design" },
    { pattern: /\bentry\b|\bentrance\b|\baccess\b/i, tag: "Floral entrance" },
    { pattern: /\bhead table\b/i, tag: "Head table" },
    { pattern: /\btable\b/i, tag: "Floral table decor" },
    { pattern: /\bbouquet\b|\baccessories?\b/i, tag: "Personal details" },
    { pattern: /\bpathway\b|\baisle\b|\btransition\b/i, tag: "Floral pathway" },
    { pattern: /\bheight\b|\bvertical\b/i, tag: "Vertical composition" },
    { pattern: /\btexture\b/i, tag: "Floral texture" },
    { pattern: /\bpalette\b|\btones?\b/i, tag: "Floral palette" },
    { pattern: /\bscene\b|\bphoto\b|\bbackdrop\b/i, tag: "Floral scenography" },
    { pattern: /\blarge scale\b|\bimpact\b/i, tag: "Large scale" },
    { pattern: /\bambience\b|\bintegral\b/i, tag: "Floral ambience" },
    { pattern: /\borganic\b|\bnatural\b/i, tag: "Organic design" },
    { pattern: /\belegant\b|\bsovereign\b|\bsophisticat/i, tag: "Elegant design" },
  ],
};

const CONTEXT_TAG_RULES: Record<
  LocaleCode,
  readonly { readonly pattern: RegExp; readonly tag: string }[]
> = {
  es: [
    { pattern: /\bmesa principal\b/i, tag: "Mesa principal" },
    { pattern: /\bmesa\b/i, tag: "Centro de mesa" },
    { pattern: /\bceremonia\b/i, tag: "Ceremonia" },
    { pattern: /\baltar\b/i, tag: "Altar floral" },
    { pattern: /\bentrada\b|\bacceso\b/i, tag: "Acceso floral" },
    { pattern: /\bramo\b/i, tag: "Ramo floral" },
    { pattern: /\brecorrido\b|\bpasillo\b/i, tag: "Recorrido visual" },
    { pattern: /\btransici[oó]n\b/i, tag: "Transición visual" },
    { pattern: /\baltura\b/i, tag: "Altura visual" },
    { pattern: /\btextura\b/i, tag: "Textura floral" },
    { pattern: /\bpaleta\b|\btonos?\b/i, tag: "Color floral" },
    { pattern: /\bfotos?\b|\bfondo\b/i, tag: "Fondo para fotos" },
    { pattern: /\bimpacto\b/i, tag: "Impacto visual" },
    { pattern: /\bambientaci[oó]n\b/i, tag: "Ambiente floral" },
  ],
  en: [
    { pattern: /\bhead table\b/i, tag: "Head table" },
    { pattern: /\btable\b/i, tag: "Centerpiece" },
    { pattern: /\bceremony\b/i, tag: "Ceremony" },
    { pattern: /\baltar\b/i, tag: "Floral altar" },
    { pattern: /\bentry\b|\bentrance\b|\baccess\b/i, tag: "Floral access" },
    { pattern: /\bbouquet\b/i, tag: "Bouquet details" },
    { pattern: /\bpathway\b|\baisle\b/i, tag: "Visual pathway" },
    { pattern: /\btransition\b/i, tag: "Visual transition" },
    { pattern: /\bheight\b/i, tag: "Visual height" },
    { pattern: /\btexture\b/i, tag: "Floral texture" },
    { pattern: /\bpalette\b|\btones?\b/i, tag: "Color story" },
    { pattern: /\bphoto\b|\bbackdrop\b/i, tag: "Photo backdrop" },
    { pattern: /\bimpact\b/i, tag: "Visual impact" },
    { pattern: /\bambience\b/i, tag: "Floral ambience" },
  ],
};

const normalizeTag = (value: string): string => value.replace(/\s+/g, " ").trim();

const pushUniqueTag = (tags: string[], value?: string): void => {
  if (!value) return;

  const normalized = normalizeTag(value);
  if (!normalized) return;

  if (!tags.some((tag) => tag.toLowerCase() === normalized.toLowerCase())) {
    tags.push(normalized);
  }
};

const limitWords = (value: string, maxWords: number): string => {
  const normalized = normalizeTag(value).replace(/[.!?]+$/, "");
  if (!normalized) return "";

  const words = normalized.split(" ");
  if (words.length <= maxWords) return normalized;

  return words.slice(0, maxWords).join(" ");
};

const findMatchedTag = (
  locale: LocaleCode,
  value: string,
  rules: Record<
    LocaleCode,
    readonly { readonly pattern: RegExp; readonly tag: string }[]
  >,
): string | undefined => {
  const normalized = normalizeTag(value);
  if (!normalized) return undefined;

  return rules[locale].find((rule) => rule.pattern.test(normalized))?.tag;
};

export function getBentoGridSeoTags(
  locale: LocaleCode,
  item: BentoGridSeoTagSource,
): readonly string[] {
  const tags: string[] = [];
  const combinedText = [item.title, item.subtitle, item.caption].join(" ");
  const focusTag =
    item.tags?.[0] ??
    item.tag ??
    findMatchedTag(locale, combinedText, FOCUS_TAG_RULES) ??
    DEFAULT_TAG_BY_LOCALE[locale];
  const titleTag = limitWords(item.title, 5);
  const contextTag =
    findMatchedTag(locale, `${item.subtitle} ${item.caption}`, CONTEXT_TAG_RULES) ??
    limitWords(item.subtitle || item.caption, 5);
  const captionTag = limitWords(item.caption, 5);

  pushUniqueTag(tags, focusTag);
  pushUniqueTag(tags, titleTag);
  pushUniqueTag(tags, contextTag);
  pushUniqueTag(tags, captionTag);
  pushUniqueTag(tags, DEFAULT_TAG_BY_LOCALE[locale]);

  return tags.slice(0, 4);
}

export function getBentoGridVisibleItems(items: readonly BentoGridItem[], maxVisibleItems?: number): readonly BentoGridItem[] {
  if (!maxVisibleItems || maxVisibleItems >= items.length) {
    return items;
  }

  return items.slice(0, maxVisibleItems);
}

export function getBentoGridOverflowCount(items: readonly BentoGridItem[], maxVisibleItems?: number): number {
  if (!maxVisibleItems || maxVisibleItems >= items.length) {
    return 0;
  }

  return Math.min(items.length - maxVisibleItems, 99);
}

export function getBentoGridColumnClass(maxColumns?: 1 | 2 | 3 | 4): string {
  if (maxColumns === 1) {
    return "columns-1 [column-gap:14px]";
  }

  if (maxColumns === 2) {
    return "columns-1 [column-gap:14px] min-[700px]:columns-2";
  }

  if (maxColumns === 4) {
    return "columns-1 [column-gap:14px] min-[700px]:columns-2 min-[980px]:columns-3 min-[1280px]:columns-4";
  }

  return "columns-1 [column-gap:14px] min-[700px]:columns-2 min-[980px]:columns-3";
}
