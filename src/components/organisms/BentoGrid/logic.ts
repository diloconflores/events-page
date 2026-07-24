import type { BentoGridItem } from "./types";

export function getBentoGridVisibleItems(items: readonly BentoGridItem[], maxVisibleItems?: number): readonly BentoGridItem[] {
  if (!maxVisibleItems || maxVisibleItems >= items.length) {
    return items;
  }

  return items.slice(0, maxVisibleItems);
}

export function getBentoGridOverflowCount(items: readonly BentoGridItem[], maxVisibleItems?: number): number {
  if (!maxVisibleItems || maxVisibleItems >= items.length) {
    return 0;
  }

  return Math.min(items.length - maxVisibleItems, 99);
}

export function getBentoGridColumnClass(maxColumns?: 1 | 2 | 3 | 4): string {
  if (maxColumns === 1) {
    return "grid grid-cols-1";
  }

  if (maxColumns === 2) {
    return "grid grid-cols-1 gap-4 sm:grid-cols-2";
  }

  if (maxColumns === 4) {
    return "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }

  return "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";
}

