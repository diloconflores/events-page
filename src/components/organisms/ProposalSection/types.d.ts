import type { LocaleCode, LandingPageContent } from "../../../i18n/types";

export type ProposalSectionContent = LandingPageContent["form"];

export interface ProposalSectionProps {
  readonly locale: LocaleCode;
  readonly content: ProposalSectionContent;
  readonly action: string;
  readonly class?: string;
}
