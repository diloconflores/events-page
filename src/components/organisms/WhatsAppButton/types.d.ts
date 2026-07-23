import type { HTMLAttributes } from "astro/types";

export interface WhatsAppButtonProps {
  readonly href?: string;
  readonly prompt: string;
  readonly label: string;
  readonly class?: string;
  readonly analyticsName?: string;
  readonly analyticsLocation?: string;
  readonly ariaLabel?: string;
  readonly target?: HTMLAttributes<"a">["target"];
  readonly rel?: string;
}
