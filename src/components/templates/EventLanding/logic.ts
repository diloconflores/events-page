import type { LandingPageContent } from "../../../i18n/types";

export function getVisibleGalleryItems(content: LandingPageContent): LandingPageContent["gallery"]["items"] {
  return content.gallery.items.slice(0, content.gallery.visibleCount);
}

export function getGalleryOverflowCount(content: LandingPageContent): number {
  return Math.max(content.gallery.items.length - content.gallery.visibleCount, 0);
}
