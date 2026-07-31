import dayjs from "dayjs";
import type { LocaleCode, LandingPageContent } from "../../../i18n/types";
import type {
  WizardField,
  WizardSchema,
} from "../Wizard/types";
import type { ProposalWizardContent } from "./types";

function getLocaleVenueYesValue(content: ProposalWizardContent, locale: LocaleCode): string {
  if (locale === "en") {
    return content.options.yesNoVenue.find((option) => option.value === "Yes")?.value ?? "Yes";
  }

  return content.options.yesNoVenue.find((option) => option.value === "Sí")?.value ?? "Sí";
}

function getLocaleFullDecorationValue(content: ProposalWizardContent, locale: LocaleCode): string {
  if (locale === "en") {
    return content.options.spaces.find((option) => option.value === "Full decoration")?.value ?? "Full decoration";
  }

  return content.options.spaces.find((option) => option.value === "Decoración integral")?.value ?? "Decoración integral";
}

function getLocaleMunicipalityOtherValue(locale: LocaleCode): string {
  return locale === "en" ? "Other" : "Otro";
}

function getLocaleStyleOtherValue(locale: LocaleCode): string {
  return locale === "en" ? "Other" : "Otro";
}

export function getProposalWizardSchema(content: ProposalWizardContent, locale: LocaleCode): WizardSchema {
  const venueYesValue = getLocaleVenueYesValue(content, locale);
  const fullDecorationValue = getLocaleFullDecorationValue(content, locale);
  const municipalityOtherValue = getLocaleMunicipalityOtherValue(locale);
  const styleOtherValue = getLocaleStyleOtherValue(locale);
  const minimumEventDate = dayjs().startOf("day").add(30, "day").format("YYYY-MM-DD");

  const fields: readonly WizardField[] = [
    {
      kind: "input",
      name: "eventDate",
      label: content.labels.eventDate,
      errorText: content.messages.dateEvent,
      required: true,
      step: 0,
      order: 0,
      type: "date",
      validation: {
        min: minimumEventDate,
      },
    },
    {
      kind: "select",
      name: "eventType",
      label: content.labels.eventType,
      placeholder: content.messages.typeEvent,
      errorText: content.messages.typeEvent,
      required: true,
      step: 0,
      order: 1,
      options: content.options.eventTypes,
    },
    {
      kind: "select",
      name: "guestCount",
      label: content.labels.guestCount,
      placeholder: content.messages.guestCount,
      errorText: content.messages.guestCount,
      required: true,
      step: 1,
      order: 0,
      options: content.options.guestCounts,
    },
    {
      kind: "select",
      name: "municipality",
      label: content.labels.municipality,
      placeholder: content.messages.municipality,
      errorText: content.messages.municipality,
      required: true,
      step: 1,
      order: 1,
      options: content.options.municipalities,
    },
    {
      kind: "input",
      name: "municipalityOther",
      label: content.labels.municipalityOther,
      helperText: content.messages.municipalityOtherHelper,
      placeholder: content.placeholders.municipalityOther,
      errorText: content.messages.municipalityOther,
      required: true,
      step: 1,
      order: 2,
      showWhen: [
        {
          field: "municipality",
          operator: "equals",
          value: municipalityOtherValue,
        },
      ],
    },
    {
      kind: "select",
      name: "venue",
      label: content.labels.venue,
      placeholder: content.messages.venue,
      errorText: content.messages.venue,
      required: true,
      step: 2,
      order: 0,
      options: content.options.yesNoVenue,
    },
    {
      kind: "input",
      name: "venueName",
      label: content.labels.venueName,
      placeholder: content.placeholders.venueName,
      errorText: content.messages.venue,
      required: true,
      step: 2,
      order: 1,
      showWhen: [
        {
          field: "venue",
          operator: "equals",
          value: venueYesValue,
        },
      ],
    },
    {
      kind: "checkbox-group",
      name: "spaces",
      label: content.labels.spaces,
      errorText: content.messages.spaces,
      helperText: content.steps[3]?.copy,
      required: true,
      step: 3,
      order: 0,
      validation: {
        minChecked: 1,
      },
      options: content.options.spaces,
    },
    {
      kind: "checkbox-group",
      name: "integralSpaces",
      label: content.labels.integralSpaces,
      errorText: content.messages.integralSpaces,
      required: true,
      step: 3,
      order: 1,
      showWhen: [
        {
          field: "spaces[]",
          operator: "includes",
          value: fullDecorationValue,
        },
      ],
      validation: {
        minChecked: 1,
      },
      options: content.options.integralSpaces,
    },
    {
      kind: "select",
      name: "ideaState",
      label: content.labels.ideaState,
      placeholder: content.messages.ideaState,
      errorText: content.messages.ideaState,
      required: true,
      step: 4,
      order: 0,
      options: content.options.ideaStates,
    },
    {
      kind: "select",
      name: "style",
      label: content.labels.style,
      placeholder: content.messages.style,
      errorText: content.messages.style,
      required: true,
      step: 4,
      order: 1,
      showWhen: [
        {
          field: "ideaState",
          operator: "includes",
          value: ["clara", "referencias"],
        },
      ],
      options: content.options.styles,
    },
    {
      kind: "input",
      name: "styleOther",
      label: content.labels.styleOther,
      placeholder: content.placeholders.styleOther,
      errorText: content.messages.styleOther,
      required: true,
      step: 4,
      order: 2,
      showWhen: [
        {
          field: "style",
          operator: "equals",
          value: styleOtherValue,
        },
      ],
    },
    {
      kind: "input",
      name: "colors",
      label: content.labels.colors,
      placeholder: content.placeholders.colors,
      step: 5,
      order: 0,
    },
    {
      kind: "textarea",
      name: "ideaText",
      label: content.labels.ideaText,
      helperText: content.steps[6]?.copy,
      placeholder: content.placeholders.ideaText,
      errorText: content.messages.ideaText,
      required: true,
      step: 6,
      order: 0,
      rows: 6,
      validation: {
        minLength: 20,
      },
    },
    {
      kind: "input",
      name: "inspirationUrl",
      label: content.labels.inspirationUrl,
      placeholder: content.placeholders.inspirationUrl,
      errorText: content.messages.inspirationUrl,
      step: 6,
      order: 1,
      type: "url",
    },
    {
      kind: "select",
      name: "budget",
      label: content.labels.budget,
      placeholder: content.messages.budget,
      errorText: content.messages.budget,
      required: true,
      step: 7,
      order: 0,
      options: content.options.budgets,
    },
    {
      kind: "select",
      name: "source",
      label: content.labels.source,
      placeholder: content.messages.source,
      step: 7,
      order: 1,
      options: content.options.sources,
    },
    {
      kind: "textarea",
      name: "additionalInfo",
      label: content.labels.additionalInfo,
      placeholder: content.placeholders.additionalInfo,
      step: 8,
      order: 0,
      rows: 5,
    },
    {
      kind: "input",
      name: "contactName",
      label: content.labels.contactName,
      placeholder: content.placeholders.contactName,
      errorText: content.messages.contactName,
      required: true,
      autocomplete: "name",
      step: 9,
      order: 0,
    },
    {
      kind: "input",
      name: "contactPhone",
      label: content.labels.contactPhone,
      placeholder: content.placeholders.contactPhone,
      errorText: content.messages.contactPhone,
      required: true,
      autocomplete: "tel",
      type: "tel",
      step: 9,
      order: 1,
      validation: {
        minLength: 10,
      },
    },
    {
      kind: "input",
      name: "contactEmail",
      label: content.labels.contactEmail,
      placeholder: content.placeholders.contactEmail,
      errorText: content.messages.contactEmail,
      required: true,
      autocomplete: "email",
      type: "email",
      step: 9,
      order: 2,
    },
    {
      kind: "select",
      name: "preferredContact",
      label: content.labels.preferredContact,
      placeholder: content.messages.preferredContact,
      errorText: content.messages.preferredContact,
      required: true,
      step: 9,
      order: 3,
      options: content.options.preferredContacts,
    },
    {
      kind: "checkbox",
      name: "privacy",
      label: content.labels.privacy,
      value: "Sí",
      errorText: content.messages.privacy,
      required: true,
      step: 9,
      order: 4,
    },
  ];

  return {
    formId: "event-form",
    progress: content.progress,
    steps: content.steps.map((step, index) => ({
      id: `step-${index + 1}`,
      legend: step.legend,
      copy: step.copy,
      order: index,
    })),
    fields,
    controls: {
      previous: content.messages.previous,
      next: content.messages.next,
      submit: content.messages.submit,
      loading: content.messages.loading,
    },
    messages: {
      errorTitle: content.messages.errorTitle,
      errorBody: content.messages.errorBody,
      successKicker: content.messages.successKicker,
      successTitle: content.messages.successTitle,
      successText: content.messages.successText,
      successButton: content.messages.successButton,
    },
    analytics: {
      formName: "event_quote",
      location: "quote",
    },
    hiddenFields: [
      {
        name: "_subject",
        value: "Nueva solicitud de evento — Dilo con Flores",
      },
      {
        name: "_language",
        value: locale,
      },
    ],
  };
}
