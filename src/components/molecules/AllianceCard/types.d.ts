import type { HTMLAttributes } from "astro/types";

export interface AllianceCardLogo {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface AllianceCardProps
  extends Omit<HTMLAttributes<"a">, "class" | "href"> {
  readonly href: string;
  readonly label: string;
  readonly copy: string;
  readonly logo: AllianceCardLogo;
  readonly class?: string;
}
