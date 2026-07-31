import type { HTMLAttributes } from "astro/types";
import type { IconName } from "../Icon/types";

export interface SelectProps extends Omit<HTMLAttributes<"select">, "class" | "id"> {
  readonly id?: string;
  readonly label?: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly leadingIcon?: IconName;
  readonly trailingIcon?: IconName;
  readonly invalid?: boolean;
  readonly class?: string;
  readonly selectClass?: string;
  readonly labelClass?: string;
  readonly helperClass?: string;
  readonly errorClass?: string;
}
