import type { LocaleCode, LandingPageContent } from "../../../i18n/types";

export type ProposalWizardContent = LandingPageContent["form"];

export interface ProposalWizardProps {
  readonly content: ProposalWizardContent;
  readonly locale: LocaleCode;
  readonly action: string;
  readonly class?: string;
}
