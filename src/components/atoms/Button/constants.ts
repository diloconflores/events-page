import type { ButtonVariant } from "./types";

export const BUTTON_VARIANT_DEFAULT_LEADING_ICON: Partial<Record<ButtonVariant, string>> = {
  "wizard-back": "arrow-left",
};

export const BUTTON_VARIANT_DEFAULT_TRAILING_ICON: Partial<Record<ButtonVariant, string>> = {
  "wizard-next": "arrow-right",
  link: "arrow-right",
  submit: "send",
};
