export interface ProposalWizardScriptOptions {
  readonly submitLabel: string;
  readonly loadingLabel: string;
}

export function getProposalWizardScript(options: ProposalWizardScriptOptions): string {
  return `
    (() => {
    const hasAnalytics = () => typeof window !== "undefined" && typeof window.gtag === "function";

    const getLanguage = (form) => {
      const locale = form?.dataset.locale || document.documentElement.lang || "es";
      return String(locale).startsWith("en") ? "en" : "es";
    };

    const getPage = () => window.location.pathname;

    const sendEvent = (eventName, parameters = {}) => {
      if (!hasAnalytics()) {
        return;
      }

      window.gtag("event", eventName, parameters);
    };

    const formatStepNumber = (value) => String(value).padStart(2, "0");

    const getStepLabel = (screen) => screen?.dataset.wizardLabel || screen?.querySelector("legend")?.textContent?.trim() || "Step";

    const getFormContext = (form) => ({
      formName: form.dataset.analyticsForm || form.id || "form",
      location: form.dataset.analyticsLocation || "unknown",
      page: getPage(),
      language: getLanguage(form),
    });

    const submitIdleLabel = ${JSON.stringify(options.submitLabel)};
    const submitLoadingLabel = ${JSON.stringify(options.loadingLabel)};

    const setFieldError = (field, invalid) => {
      if (!(field instanceof HTMLElement)) {
        return;
      }

      field.setAttribute("aria-invalid", String(invalid));

      const label = field.closest("label");
      const error = label?.querySelector("[data-field-error]");

      if (error instanceof HTMLElement) {
        error.hidden = !invalid;
      }
    };

    const setGroupError = (group, invalid) => {
      if (!(group instanceof HTMLElement)) {
        return;
      }

      const error = group.querySelector("[data-group-error]");

      group.querySelectorAll("input").forEach((input) => {
        if (input instanceof HTMLElement) {
          input.setAttribute("aria-invalid", String(invalid));
        }
      });

      if (error instanceof HTMLElement) {
        error.hidden = !invalid;
      }
    };

    document.querySelectorAll("[data-proposal-wizard]").forEach((root) => {
      if (!(root instanceof HTMLElement) || root.dataset.proposalWizardInitialized === "true") {
        return;
      }

      root.dataset.proposalWizardInitialized = "true";

      const form = root.querySelector("#event-form");

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const wizardScreens = Array.from(root.querySelectorAll("[data-wizard-screen]")).filter((screen) => screen instanceof HTMLElement);
      const wizardBackButtons = Array.from(root.querySelectorAll("[data-wizard-back]")).filter((button) => button instanceof HTMLButtonElement);
      const wizardNextButtons = Array.from(root.querySelectorAll("[data-wizard-next]")).filter((button) => button instanceof HTMLButtonElement);
      const wizardJumpButtons = Array.from(root.querySelectorAll("[data-wizard-jump]")).filter((button) => button instanceof HTMLButtonElement);
      const wizardProgress = root.querySelector("[data-wizard-progress]");
      const submitButton = root.querySelector("[data-submit]");
      const submitLabel = submitButton?.querySelector(".submit-label");
      const submitSpinner = submitButton?.querySelector(".spinner");
      const formError = root.querySelector("[data-form-error]");
      const successState = root.querySelector("[data-success]");
      const newRequestButton = root.querySelector("[data-new-request]");

      if (!wizardScreens.length || !(submitButton instanceof HTMLButtonElement)) {
        return;
      }

      const locale = getLanguage(form);
      const stepJumps = wizardJumpButtons.map((button) => Number(button.dataset.wizardJump ?? "0"));
      const stepMeta = wizardScreens.map((screen, index) => ({
        label: getStepLabel(screen),
        major: Number(screen.dataset.majorStep ?? "0"),
        index,
      }));

      const formContext = () => getFormContext(form);

      let currentStep = 0;
      let hasSubmitted = false;
      let lastTrackedStep = -1;
      let abandonTracked = false;

      const getActiveChipIndex = (stepIndex) => {
        let activeIndex = 0;

        stepJumps.forEach((jump, index) => {
          if (stepIndex >= jump) {
            activeIndex = index;
          }
        });

        return activeIndex;
      };

      const updateProgressBar = (stepIndex) => {
        if (!(wizardProgress instanceof HTMLElement)) {
          return;
        }

        const totalSteps = wizardScreens.length;
        const ratio = totalSteps <= 1 ? 1 : (stepIndex + 1) / totalSteps;
        wizardProgress.style.width = String(Math.max(0, Math.min(1, ratio)) * 100) + "%";
      };

      const updateChips = (stepIndex) => {
        const activeChipIndex = getActiveChipIndex(stepIndex);

        wizardJumpButtons.forEach((button, index) => {
          const isActive = index === activeChipIndex;
          const isPast = index < activeChipIndex;

          button.dataset.active = String(isActive);
          button.dataset.past = String(isPast);
          button.setAttribute("aria-current", isActive ? "step" : "false");
        });
      };

      const updateButtons = () => {
        const isFirstStep = currentStep === 0;
        const isLastStep = currentStep === wizardScreens.length - 1;

        wizardBackButtons.forEach((button) => {
          button.hidden = isFirstStep;
        });

        wizardNextButtons.forEach((button) => {
          button.hidden = isLastStep;
        });

        submitButton.hidden = !isLastStep;
      };

      const updateConditionalFields = () => {
        const municipalitySelect = form.querySelector('[name="municipality"]');
        const municipalityOther = form.querySelector('[data-field-wrap="municipalityOther"]');
        const venueSelect = form.querySelector('[name="venue"]');
        const venueName = form.querySelector('[data-field-wrap="venueName"]');
        const spacesGroup = form.querySelector('[data-checkbox-group="spaces"]');
        const integralGroup = form.querySelector('[data-checkbox-group="integralSpaces"]');
        const ideaState = form.querySelector('[name="ideaState"]');
        const styleWrap = form.querySelector('[data-field-wrap="style"]');
        const styleOtherWrap = form.querySelector('[data-field-wrap="styleOther"]');
        const ideaText = form.querySelector('[name="ideaText"]');

        const showMunicipalityOther = municipalitySelect instanceof HTMLSelectElement && municipalitySelect.value === "Otro";
        if (municipalityOther instanceof HTMLElement) {
          municipalityOther.hidden = !showMunicipalityOther;
        }

        const showVenueName =
          venueSelect instanceof HTMLSelectElement &&
          ((locale === "en" && venueSelect.value === "Yes") || (locale !== "en" && venueSelect.value === "Sí"));
        if (venueName instanceof HTMLElement) {
          venueName.hidden = !showVenueName;
        }

        const spacesInputs = spacesGroup ? Array.from(spacesGroup.querySelectorAll('input[type="checkbox"]')) : [];
        const showIntegralSpaces = spacesInputs.some((input) => {
          if (!(input instanceof HTMLInputElement)) {
            return false;
          }

          return input.checked && ((locale === "en" && input.value === "Full decoration") || (locale !== "en" && input.value === "Decoración integral"));
        });

        if (integralGroup instanceof HTMLElement) {
          integralGroup.hidden = !showIntegralSpaces;
        }

        const showStyle = ideaState instanceof HTMLSelectElement && ["clara", "referencias"].includes(ideaState.value);
        if (styleWrap instanceof HTMLElement) {
          styleWrap.hidden = !showStyle;
        }

        const styleSelect = form.querySelector('[name="style"]');
        const showStyleOther = styleSelect instanceof HTMLSelectElement && styleSelect.value === "Otro";
        if (styleOtherWrap instanceof HTMLElement) {
          styleOtherWrap.hidden = !showStyleOther;
        }
      };

      const trackWizardStepView = (stepIndex) => {
        if (stepIndex === lastTrackedStep) {
          return;
        }

        lastTrackedStep = stepIndex;

        const meta = stepMeta[stepIndex];
        const context = formContext();

        sendEvent("form_wizard_step_view", {
          ...context,
          step_index: stepIndex + 1,
          step_label: meta?.label || ("Step " + formatStepNumber(stepIndex + 1)),
          step_major: meta?.major ?? 0,
          total_steps: wizardScreens.length,
        });
      };

      const trackWizardStepComplete = (fromStep, toStep) => {
        const fromMeta = stepMeta[fromStep];
        const toMeta = stepMeta[toStep];
        const context = formContext();

        sendEvent("form_wizard_step_complete", {
          ...context,
          from_step_index: fromStep + 1,
          from_step_label: fromMeta?.label || ("Step " + formatStepNumber(fromStep + 1)),
          to_step_index: toStep + 1,
          to_step_label: toMeta?.label || ("Step " + formatStepNumber(toStep + 1)),
          total_steps: wizardScreens.length,
        });
      };

      const trackWizardAbandon = () => {
        if (hasSubmitted || abandonTracked) {
          return;
        }

        abandonTracked = true;

        const meta = stepMeta[currentStep];
        const context = formContext();

        sendEvent("form_wizard_abandon", {
          ...context,
          current_step_index: currentStep + 1,
          current_step_label: meta?.label || ("Step " + formatStepNumber(currentStep + 1)),
          completed_steps: currentStep + 1,
          total_steps: wizardScreens.length,
          progress_percent: Math.round(((currentStep + 1) / wizardScreens.length) * 100),
          transport_type: "beacon",
          non_interaction: true,
        });
      };

      const isFieldVisible = (field) => field instanceof HTMLElement && !field.closest("[hidden]");

      const validateField = (field) => {
        if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
          return true;
        }

        if (!isFieldVisible(field) || field.disabled) {
          setFieldError(field, false);
          return true;
        }

        if (field.type === "checkbox") {
          return true;
        }

        let valid = true;
        const value = field.value.trim();

        if (field.required) {
          valid = value !== "";
        }

        if (field.type === "date") {
          valid = value !== "" && (!field.min || value >= field.min);
        }

        if (field.type === "email") {
          valid = value === "" || /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
        }

        if (field.type === "tel") {
          valid = value === "" ? !field.required : field.value.replace(/\\D/g, "").length >= 10;
        }

        if (field.type === "url") {
          valid = value === "" || /^https?:\\/\\/.+/i.test(value);
        }

        if (field.tagName === "TEXTAREA" && field.minLength > 0) {
          valid = value === "" ? !field.required : value.length >= field.minLength;
        }

        setFieldError(field, !valid);
        return valid;
      };

      const validateCheckboxGroup = (groupName, required) => {
        const group = form.querySelector('[data-checkbox-group="' + groupName + '"]');

        if (!(group instanceof HTMLElement) || !required) {
          if (group instanceof HTMLElement) {
            setGroupError(group, false);
          }

          return true;
        }

        const inputs = Array.from(group.querySelectorAll('input[type="checkbox"]')).filter((input) => input instanceof HTMLInputElement);
        const valid = inputs.some((input) => input.checked);

        setGroupError(group, !valid);
        return valid;
      };

      const focusInvalidField = (field) => {
        if (!(field instanceof HTMLElement)) {
          return;
        }

        field.focus({ preventScroll: true });
        field.scrollIntoView({ behavior: "smooth", block: "center" });
      };

      const focusFirstInvalidControl = (stepIndex) => {
        const screen = wizardScreens[stepIndex];

        if (!(screen instanceof HTMLElement)) {
          return;
        }

        const fields = Array.from(screen.querySelectorAll("input, select, textarea"));
        const firstInvalidField = fields.find((field) => !validateField(field));

        if (firstInvalidField instanceof HTMLElement) {
          focusInvalidField(firstInvalidField);
          return;
        }

        if (stepIndex === 3) {
          const spacesGroup = form.querySelector('[data-checkbox-group="spaces"]');
          const integralGroup = form.querySelector('[data-checkbox-group="integralSpaces"]');

          const spacesInputs = spacesGroup ? Array.from(spacesGroup.querySelectorAll('input[type="checkbox"]')) : [];
          const spacesValid = spacesInputs.some((input) => input instanceof HTMLInputElement && input.checked);

          if (!spacesValid) {
            const firstSpacesInput = spacesGroup?.querySelector('input[type="checkbox"]');
            if (firstSpacesInput instanceof HTMLElement) {
              focusInvalidField(firstSpacesInput);
              return;
            }
          }

          const integralVisible = integralGroup instanceof HTMLElement && !integralGroup.hidden;
          const integralInputs = integralVisible ? Array.from(integralGroup.querySelectorAll('input[type="checkbox"]')) : [];
          const integralValid = !integralVisible || integralInputs.some((input) => input instanceof HTMLInputElement && input.checked);

          if (!integralValid) {
            const firstIntegralInput = integralGroup?.querySelector('input[type="checkbox"]');
            if (firstIntegralInput instanceof HTMLElement) {
              focusInvalidField(firstIntegralInput);
            }
          }
        }
      };

      const validateCurrentStep = (stepIndex) => {
        const screen = wizardScreens[stepIndex];

        if (!(screen instanceof HTMLElement)) {
          return true;
        }

        const fields = Array.from(screen.querySelectorAll("input, select, textarea"));
        const visibleFieldsValid = fields.every((field) => validateField(field));

        const spacesRequired = stepIndex === 3;
        const integralRequired = spacesRequired && validateCheckboxGroup("spaces", true) && validateCheckboxGroup("integralSpaces", !form.querySelector('[data-checkbox-group="integralSpaces"]')?.hidden);

        const styleOtherRequired = stepIndex === 4;
        const styleOtherField = form.querySelector('[name="styleOther"]');
        if (styleOtherRequired && styleOtherField instanceof HTMLInputElement && !styleOtherField.closest("[hidden]")) {
          validateField(styleOtherField);
        }

        return visibleFieldsValid && integralRequired;
      };

      const renderStep = (stepIndex) => {
        currentStep = Math.max(0, Math.min(stepIndex, wizardScreens.length - 1));

        wizardScreens.forEach((screen, index) => {
          screen.hidden = index !== currentStep;
        });

        updateConditionalFields();
        updateButtons();
        updateProgressBar(currentStep);
        updateChips(currentStep);
        trackWizardStepView(currentStep);
      };

      const moveStep = (delta) => {
        const nextStep = Math.max(0, Math.min(currentStep + delta, wizardScreens.length - 1));

        if (nextStep === currentStep) {
          return;
        }

        if (delta > 0 && !validateCurrentStep(currentStep)) {
          focusFirstInvalidControl(currentStep);
          return;
        }

        if (delta > 0) {
          trackWizardStepComplete(currentStep, nextStep);
        }

        renderStep(nextStep);
      };

      const jumpToStep = (stepIndex) => {
        if (Number.isNaN(stepIndex)) {
          return;
        }

        const nextStep = Math.max(0, Math.min(stepIndex, wizardScreens.length - 1));

        if (nextStep > currentStep && !validateCurrentStep(currentStep)) {
          focusFirstInvalidControl(currentStep);
          return;
        }

        if (nextStep > currentStep) {
          trackWizardStepComplete(currentStep, nextStep);
        }

        renderStep(nextStep);
      };

      const setLoading = (loading) => {
        if (submitLabel instanceof HTMLElement) {
          submitLabel.textContent = loading ? submitLoadingLabel : submitIdleLabel;
        }

        if (submitSpinner instanceof HTMLElement) {
          submitSpinner.hidden = !loading;
        }

        submitButton.disabled = loading;
      };

      const resetFormState = () => {
        form.reset();
        hasSubmitted = false;
        abandonTracked = false;
        lastTrackedStep = -1;
        form.dataset.analyticsStarted = "false";
        form.dataset.analyticsViewed = "false";
        renderStep(0);
        setLoading(false);
        formError?.classList.add("hidden");
        if (successState instanceof HTMLElement) {
          successState.hidden = true;
        }
        form.hidden = false;
      };

      wizardBackButtons.forEach((button) => {
        button.addEventListener("click", () => {
          moveStep(-1);
        });
      });

      wizardNextButtons.forEach((button) => {
        button.addEventListener("click", () => {
          moveStep(1);
        });
      });

      wizardJumpButtons.forEach((button) => {
        button.addEventListener("click", () => {
          jumpToStep(Number(button.dataset.wizardJump ?? "0"));
        });
      });

      form.addEventListener("input", () => {
        updateConditionalFields();
        formError?.classList.add("hidden");
      });

      form.addEventListener("change", () => {
        updateConditionalFields();
        formError?.classList.add("hidden");
      });

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        formError?.classList.add("hidden");

        const isValid = wizardScreens.every((_, index) => validateCurrentStep(index));

        if (!isValid) {
          return;
        }

        setLoading(true);

        try {
          const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
          });

          if (!response.ok) {
            throw new Error("Formspree rejected the request.");
          }

          hasSubmitted = true;
          form.hidden = true;
          if (successState instanceof HTMLElement) {
            successState.hidden = false;
          }
        } catch (error) {
          console.error(error);
          formError?.classList.remove("hidden");
        } finally {
          setLoading(false);
        }
      });

      newRequestButton?.addEventListener("click", () => {
        resetFormState();
      });

      window.addEventListener("pagehide", trackWizardAbandon);

      renderStep(0);
    });
    })();
  `;
}
