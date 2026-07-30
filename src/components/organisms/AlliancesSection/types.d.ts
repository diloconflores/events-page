import type { LandingPageContent } from "../../../i18n/types";

export type AlliancesSectionContent = LandingPageContent["alliances"];

export interface AlliancesSectionProps {
  readonly content: AlliancesSectionContent;
}
