import type { InputProps } from "./types";

export function getInputId(props: InputProps): string {
  if (props.id) {
    return props.id;
  }

  if (props.name) {
    return String(props.name);
  }

  return `input-${crypto.randomUUID()}`;
}

export function getInputDescribedBy(id: string, helperText?: string, errorText?: string, invalid?: boolean): string | undefined {
  const describedBy = [helperText ? `${id}-helper` : undefined, invalid && errorText ? `${id}-error` : undefined].filter(Boolean);

  return describedBy.length > 0 ? describedBy.join(" ") : undefined;
}
