import type { HTMLAttributes } from "astro/types";

import { MEDIA_CARD_VARIANT_DEFAULT } from "./constants";
import type { MediaCardProps, MediaCardVariant } from "./types";

export function getMediaCardVariant(props: MediaCardProps): MediaCardVariant {
  return props.variant ?? MEDIA_CARD_VARIANT_DEFAULT;
}

export function getMediaCardLabel(props: MediaCardProps): string {
  return props.ariaLabel ?? `Abrir ${props.title}`;
}

export function getMediaCardIsOverflow(props: MediaCardProps): boolean {
  return Boolean(props.overflowCount && props.overflowCount > 0);
}

export function isMediaCardLink(props: MediaCardProps): boolean {
  return typeof props.href === "string" && props.href.length > 0;
}

export function getMediaCardAttributes(props: MediaCardProps): HTMLAttributes<"button"> | HTMLAttributes<"a"> {
  const {
    ariaLabel: _ariaLabel,
    alt: _alt,
    class: _className,
    href,
    loading: _loading,
    overflowCount: _overflowCount,
    src: _src,
    subtitle: _subtitle,
    tag: _tag,
    title: _title,
    variant: _variant,
    rel,
    target,
    ...attributes
  } = props;

  if (href) {
    return {
      ...attributes,
      href,
      target,
      rel,
      "aria-label": getMediaCardLabel(props),
    };
  }

  return {
    ...attributes,
    type: "button",
    "aria-label": getMediaCardLabel(props),
  };
}
