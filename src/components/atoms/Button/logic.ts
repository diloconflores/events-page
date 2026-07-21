import type { HTMLAttributes } from "astro/types";

import type { ButtonElementProps, ButtonLinkProps, ButtonProps, ButtonVariant } from "./types";
import { BUTTON_VARIANT_DEFAULT_LEADING_ICON, BUTTON_VARIANT_DEFAULT_TRAILING_ICON } from "./constants";

export function isButtonLink(props: ButtonProps): props is ButtonLinkProps {
  return typeof props.href === "string" && props.href.length > 0;
}

export function getButtonVariant(props: ButtonProps): ButtonVariant {
  return props.variant ?? "primary";
}

export function isButtonGhost(props: ButtonProps): boolean {
  return props.ghost === true || getButtonVariant(props) === "ghost";
}

export function getButtonLeadingIcon(props: ButtonProps): string | undefined {
  return props.leadingIcon ?? BUTTON_VARIANT_DEFAULT_LEADING_ICON[getButtonVariant(props)];
}

export function getButtonTrailingIcon(props: ButtonProps): string | undefined {
  if (props.trailingIcon) {
    return props.trailingIcon;
  }

  if (getButtonVariant(props) === "primary" && props.rounded && !isButtonGhost(props)) {
    return "arrow-right";
  }

  return BUTTON_VARIANT_DEFAULT_TRAILING_ICON[getButtonVariant(props)];
}

export function getComputedRel(target: string | null | undefined, rel: string | null | undefined): string | undefined {
  if (rel) {
    return rel;
  }

  if (target === "_blank") {
    return "noopener noreferrer";
  }

  return undefined;
}

export function isButtonDisabled(props: ButtonProps): boolean {
  return Boolean(props.disabled || props.loading);
}

export function getAnchorAttributes(props: ButtonLinkProps): HTMLAttributes<"a"> {
  const {
    active: _active,
    class: _className,
    count: _count,
    href,
    leadingIcon: _leadingIcon,
    leadingIconClass: _leadingIconClass,
    loading: _loading,
    past: _past,
    ghost: _ghost,
    rounded: _rounded,
    glass: _glass,
    underline: _underline,
    sharped: _sharped,
    trailingIcon: _trailingIcon,
    trailingIconClass: _trailingIconClass,
    variant: _variant,
    disabled,
    rel,
    ...attributes
  } = props;

  return {
    ...attributes,
    href,
    rel: getComputedRel(attributes.target, rel),
    "aria-disabled": disabled ? true : undefined,
    tabindex: disabled ? -1 : undefined,
  };
}

export function getButtonAttributes(props: ButtonElementProps): HTMLAttributes<"button"> {
  const {
    active: _active,
    class: _className,
    count: _count,
    href: _href,
    leadingIcon: _leadingIcon,
    leadingIconClass: _leadingIconClass,
    loading: _loading,
    past: _past,
    ghost: _ghost,
    rounded: _rounded,
    glass: _glass,
    underline: _underline,
    sharped: _sharped,
    trailingIcon: _trailingIcon,
    trailingIconClass: _trailingIconClass,
    variant: _variant,
    type,
    ...attributes
  } = props;

  return {
    ...attributes,
    type: type ?? "button",
    disabled: isButtonDisabled(props),
    "aria-busy": props.loading ? "true" : undefined,
  };
}
