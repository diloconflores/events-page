import type { CheckboxProps } from "./types";

export function getCheckboxId(props: CheckboxProps): string {
  if (props.id) {
    return props.id;
  }

  if (props.name) {
    return String(props.name);
  }

  return `checkbox-${crypto.randomUUID()}`;
}

export function getCheckboxDescribedBy(id: string, helperText?: string, errorText?: string, invalid?: boolean): string | undefined {
  const describedBy = [helperText ? `${id}-helper` : undefined, invalid && errorText ? `${id}-error` : undefined].filter(Boolean);

  return describedBy.length > 0 ? describedBy.join(" ") : undefined;
}
