import type { HTMLAttributes } from "astro/types";

import type { IconName } from "../../atoms/Icon/types";

export interface DropdownItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly selected?: boolean;
  readonly title?: string;
  readonly target?: HTMLAttributes<"a">["target"];
  readonly rel?: string;
  readonly trailingIcon?: IconName;
  readonly trailingIconClass?: string;
}

export interface DropdownProps {
  readonly id: string;
  readonly triggerLabel: string;
  readonly triggerText: string;
  readonly menuLabel: string;
  readonly items: readonly DropdownItem[];
  readonly class?: string;
  readonly triggerClass?: string;
  readonly menuClass?: string;
  readonly itemClass?: string;
  readonly selectedItemClass?: string;
}
