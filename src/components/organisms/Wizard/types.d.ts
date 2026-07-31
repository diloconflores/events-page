import type { HTMLInputTypeAttribute } from "astro/types";
import type { IconName } from "../../atoms/Icon/types";

export type WizardConditionOperator = "equals" | "notEquals" | "includes" | "notIncludes" | "exists" | "notExists";

export interface WizardCondition {
  readonly field: string;
  readonly operator: WizardConditionOperator;
  readonly value?: string | readonly string[];
}

export interface WizardValidation {
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string;
  readonly min?: number | string;
  readonly max?: number | string;
  readonly minChecked?: number;
  readonly maxChecked?: number;
}

export interface WizardFieldOption {
  readonly label: string;
  readonly value: string;
  readonly helperText?: string;
}

interface WizardFieldBase {
  readonly id?: string;
  readonly name: string;
  readonly label: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly step: number;
  readonly order: number;
  readonly showWhen?: readonly WizardCondition[];
  readonly validation?: WizardValidation;
  readonly autocomplete?: string;
}

export interface WizardInputField extends WizardFieldBase {
  readonly kind: "input";
  readonly type?: HTMLInputTypeAttribute;
}

export interface WizardTextareaField extends WizardFieldBase {
  readonly kind: "textarea";
  readonly rows?: number;
}

export interface WizardSelectField extends WizardFieldBase {
  readonly kind: "select";
  readonly options: readonly WizardFieldOption[];
}

export interface WizardRadioGroupField extends WizardFieldBase {
  readonly kind: "radio-group";
  readonly options: readonly WizardFieldOption[];
}

export interface WizardCheckboxField extends WizardFieldBase {
  readonly kind: "checkbox";
  readonly value?: string;
}

export interface WizardCheckboxGroupField extends WizardFieldBase {
  readonly kind: "checkbox-group";
  readonly options: readonly WizardFieldOption[];
}

export interface WizardTextField extends WizardFieldBase {
  readonly kind: "text";
  readonly text: string;
  readonly icon?: IconName;
}

export type WizardField =
  | WizardInputField
  | WizardTextareaField
  | WizardSelectField
  | WizardRadioGroupField
  | WizardCheckboxField
  | WizardCheckboxGroupField
  | WizardTextField;

export interface WizardStep {
  readonly id: string;
  readonly legend: string;
  readonly copy?: string;
  readonly order: number;
  readonly phaseIndex: number;
  readonly tabTitle: string;
}

export interface WizardHiddenField {
  readonly name: string;
  readonly value: string;
}

export interface WizardControlsCopy {
  readonly previous: string;
  readonly next: string;
  readonly submit: string;
  readonly loading: string;
}

export interface WizardMessages {
  readonly errorTitle: string;
  readonly errorBody: string;
  readonly successKicker: string;
  readonly successTitle: string;
  readonly successText: string;
  readonly successButton: string;
}

export interface WizardAnalytics {
  readonly formName: string;
  readonly location: string;
}

export interface WizardSchema {
  readonly formId: string;
  readonly progress: readonly string[];
  readonly steps: readonly WizardStep[];
  readonly fields: readonly WizardField[];
  readonly controls: WizardControlsCopy;
  readonly messages: WizardMessages;
  readonly analytics: WizardAnalytics;
  readonly hiddenFields?: readonly WizardHiddenField[];
}

export interface WizardProps {
  readonly schema: WizardSchema;
  readonly action: string;
  readonly locale: string;
  readonly class?: string;
}
