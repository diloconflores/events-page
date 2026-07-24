import type { LandingPageContent } from "../../../i18n/types";

export interface InspirationSectionProps {
  readonly locale: "es" | "en";
  readonly content: LandingPageContent["inspiration"];
}
