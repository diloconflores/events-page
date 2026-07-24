import type { LandingPageContent } from "../../../i18n/types";

export type ProcessSectionContent = LandingPageContent["process"];

export interface ProcessSectionProps {
  readonly content: ProcessSectionContent;
}
