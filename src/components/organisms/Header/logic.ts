import type { LocaleCode } from "../../../i18n/types";

export function getHeaderBrandMenuId(locale: LocaleCode): string {
  return `brand-menu-${locale}`;
}

export function getHeaderPrimaryNavId(locale: LocaleCode): string {
  return `primary-nav-${locale}`;
}
