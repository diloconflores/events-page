import type { LocaleCode } from "../../i18n/types";
import type { RouteKey } from "../../i18n/types";

export interface BaseLayoutProps {
  readonly locale: LocaleCode;
  readonly title: string;
  readonly description: string;
  readonly canonicalPath?: string;
  readonly route?: RouteKey;
  readonly noIndex?: boolean;
  readonly ogType?: "website" | "article";
}
