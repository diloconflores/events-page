import type { HTMLAttributes } from "astro/types";
import type { IconName } from "../Icon/types";

export interface InputProps extends Omit<HTMLAttributes<"input">, "class" | "type" | "id"> {
  readonly id?: string;
  readonly type?: HTMLAttributes<"input">["type"];
  readonly label?: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly leadingIcon?: IconName;
  readonly trailingIcon?: IconName;
  readonly invalid?: boolean;
  readonly class?: string;
  readonly inputClass?: string;
  readonly labelClass?: string;
  readonly helperClass?: string;
  readonly errorClass?: string;
}
