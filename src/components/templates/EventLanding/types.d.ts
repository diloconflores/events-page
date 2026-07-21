import type { CommonTranslations, LandingPageContent, LocaleCode } from "../../../i18n/types";

export interface EventLandingProps {
  readonly locale: LocaleCode;
  readonly content: LandingPageContent;
  readonly common: CommonTranslations;
}

export interface EventLandingScriptOptions {
  readonly submitLabel: string;
  readonly loadingLabel: string;
}
