export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "external-link"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "menu"
  | "x"
  | "message-circle"
  | "star"
  | "plus"
  | "check"
  | "send"
  | "sparkles"
  | "lock";

export interface IconProps {
  readonly name: IconName;
  readonly class?: string;
  readonly title?: string;
  readonly decorative?: boolean;
}
