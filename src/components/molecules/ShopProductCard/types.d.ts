import type { HTMLAttributes } from "astro/types";

export interface ShopProductCardProps
  extends Omit<HTMLAttributes<"a">, "class" | "href"> {
  readonly href: string;
  readonly title: string;
  readonly label: string;
  readonly image: string;
  readonly alt: string;
  readonly class?: string;
  readonly loading?: "lazy" | "eager";
  readonly ariaLabel?: string;
}
