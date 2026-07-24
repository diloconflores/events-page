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
    return "columns-1 [column-gap:14px]";
  }

  if (maxColumns === 2) {
    return "columns-1 [column-gap:14px] min-[700px]:columns-2";
  }

  if (maxColumns === 4) {
    return "columns-1 [column-gap:14px] min-[700px]:columns-2 min-[980px]:columns-3 min-[1280px]:columns-4";
  }

  return "columns-1 [column-gap:14px] min-[700px]:columns-2 min-[980px]:columns-3";
}
