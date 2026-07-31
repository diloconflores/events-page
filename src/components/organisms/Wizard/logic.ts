import type {
  WizardField,
  WizardSchema,
  WizardStep,
} from "./types";

export function getWizardSteps(schema: WizardSchema): readonly WizardStep[] {
  return [...schema.steps].sort((left, right) => left.order - right.order);
}

export function getWizardFieldsForStep(schema: WizardSchema, stepOrder: number): readonly WizardField[] {
  return [...schema.fields]
    .filter((field) => field.step === stepOrder)
    .sort((left, right) => left.order - right.order);
}

export function getWizardFieldId(schema: WizardSchema, field: WizardField): string {
  return field.id ?? `${schema.formId}-${field.name}`;
}
