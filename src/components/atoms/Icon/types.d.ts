export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "external-link"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "menu"
  | "star"
  | "plus"
  | "check"
  | "send"
  | "sparkles";

export interface IconProps {
  readonly name: IconName;
  readonly class?: string;
  readonly title?: string;
  readonly decorative?: boolean;
}
