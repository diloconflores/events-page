import type { CommonTranslations, LandingPageContent, LocaleCode } from "../../../i18n/types";

export interface HeaderProps {
  readonly locale: LocaleCode;
  readonly content: LandingPageContent;
  readonly common: CommonTranslations;
}

export interface HeaderScriptOptions {
  readonly openMenuLabel: string;
  readonly closeMenuLabel: string;
}
