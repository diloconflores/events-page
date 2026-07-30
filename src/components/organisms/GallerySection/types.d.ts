import type { LocaleCode, LandingPageContent } from "../../../i18n/types";

export type GallerySectionContent = LandingPageContent["gallery"];

export interface GallerySectionProps {
  readonly locale: LocaleCode;
  readonly content: GallerySectionContent;
}
