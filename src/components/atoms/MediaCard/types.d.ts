import type { HTMLAttributes } from "astro/types";

export type MediaCardVariant = "album" | "gallery";

export interface MediaCardProps
  extends Omit<HTMLAttributes<"button">, "class" | "type"> {
  readonly src: string;
  readonly thumbnail?: string;
  readonly width?: number;
  readonly height?: number;
  readonly alt: string;
  readonly title: string;
  readonly subtitle: string;
  readonly caption?: string;
  readonly tag?: string;
  readonly variant?: MediaCardVariant;
  readonly overflowCount?: number;
  readonly ariaLabel?: string;
  readonly class?: string;
  readonly loading?: "lazy" | "eager";
  readonly href?: string;
  readonly target?: HTMLAttributes<"a">["target"];
  readonly rel?: string;
}
