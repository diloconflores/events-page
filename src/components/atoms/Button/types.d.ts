import type { HTMLAttributes } from "astro/types";

import type { IconName } from "../Icon/types";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "light"
  | "nav"
  | "wizard-back"
  | "wizard-next"
  | "submit"
  | "link"
  | "chip"
  | "icon";

export interface ButtonCommonProps {
  readonly variant?: ButtonVariant;
  readonly leadingIcon?: IconName;
  readonly trailingIcon?: IconName;
  readonly leadingIconClass?: string;
  readonly trailingIconClass?: string;
  readonly rounded?: boolean;
  readonly ghost?: boolean;
  readonly glass?: boolean;
  readonly underline?: boolean;
  readonly count?: string | number;
  readonly active?: boolean;
  readonly past?: boolean;
  readonly loading?: boolean;
  readonly sharped?: boolean;
  readonly class?: string;
}

export interface ButtonLinkProps
  extends ButtonCommonProps,
    Omit<HTMLAttributes<"a">, "class" | "href" | "type" | "disabled"> {
  readonly href: string;
  readonly disabled?: boolean;
}

export interface ButtonElementProps
  extends ButtonCommonProps,
    Omit<HTMLAttributes<"button">, "class" | "href" | "disabled"> {
  readonly href?: never;
  readonly type?: "button" | "submit" | "reset";
  readonly disabled?: boolean;
}

export type ButtonProps = ButtonLinkProps | ButtonElementProps;
