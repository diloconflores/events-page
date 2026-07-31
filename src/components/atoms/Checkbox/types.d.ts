import type { HTMLAttributes } from "astro/types";

export interface CheckboxProps extends Omit<HTMLAttributes<"input">, "class" | "type" | "id"> {
  readonly id?: string;
  readonly label?: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly invalid?: boolean;
  readonly class?: string;
  readonly inputClass?: string;
  readonly labelClass?: string;
  readonly helperClass?: string;
  readonly errorClass?: string;
}
