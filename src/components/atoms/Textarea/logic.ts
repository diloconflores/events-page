import type { TextareaProps } from "./types";

export function getTextareaId(props: TextareaProps): string {
  if (props.id) {
    return props.id;
  }

  if (props.name) {
    return String(props.name);
  }

  return `textarea-${crypto.randomUUID()}`;
}

export function getTextareaDescribedBy(id: string, helperText?: string, errorText?: string, invalid?: boolean): string | undefined {
  const describedBy = [helperText ? `${id}-helper` : undefined, invalid && errorText ? `${id}-error` : undefined].filter(Boolean);

  return describedBy.length > 0 ? describedBy.join(" ") : undefined;
}
