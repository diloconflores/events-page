import type { HTMLAttributes } from "astro/types";

export interface BentoGridItem {
  readonly src: string;
  readonly thumbnail: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly tags: readonly string[];
}

export interface BentoGridProps extends Omit<HTMLAttributes<"div">, "class"> {
  readonly items: readonly BentoGridItem[];
  readonly maxVisibleItems?: number;
  readonly maxColumns?: 1 | 2 | 3 | 4;
  readonly class?: string;
}
