import type { HTMLAttributes } from "astro/types";

import type { ShopProductCardProps } from "./types";

export function getComputedRel(target: string | null | undefined, rel: string | null | undefined): string | undefined {
  if (rel) {
    return rel;
  }

  if (target === "_blank") {
    return "noopener noreferrer";
  }

  return undefined;
}

export function getShopProductCardAttributes(props: ShopProductCardProps): HTMLAttributes<"a"> {
  const {
    alt: _alt,
    ariaLabel,
    class: _className,
    href,
    image: _image,
    label: _label,
    loading: _loading,
    rel,
    title: _title,
    target,
    ...attributes
  } = props;

  return {
    ...attributes,
    href,
    rel: getComputedRel(target, rel),
    "aria-label": ariaLabel ?? `Abrir ${props.title}`,
  };
}
