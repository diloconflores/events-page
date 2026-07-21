import type { LocaleConfig, LocaleCode } from "./types";

export const supportedLocales = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    enabled: true,
    default: true,
    direction: "ltr",
    dateLocale: "es-ES",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    enabled: true,
    default: false,
    direction: "ltr",
    dateLocale: "en-US",
  },
] as const satisfies readonly LocaleConfig[];

export const defaultLocale: LocaleCode = "es";
export const localeCodes = supportedLocales.map((locale) => locale.code);
