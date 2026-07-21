import type { LandingPageContent } from "../../../i18n/types";

export interface CompleteServiceProps {
  readonly content: Pick<LandingPageContent, "promise" | "conversionBand">;
}
