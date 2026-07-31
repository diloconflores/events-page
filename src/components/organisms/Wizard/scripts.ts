export function getWizardScript(): string {
  return `
    const parseJson = (value, fallback) => {
      if (!value) {
        return fallback;
      }

      try {
        return JSON.parse(value);
      } catch {
        return fallback;
      }
    };

    const getControlValues = (form, fieldName) => {
      const values = Array.from(new FormData(form).getAll(fieldName))
        .map((value) => String(value).trim())
        .filter(Boolean);

      return values;
    };

    const evaluateCondition = (form, condition) => {
      const values = getControlValues(form, condition.field);
      const expected = Array.isArray(condition.value) ? condition.value.map(String) : condition.value !== undefined ? [String(condition.value)] : [];

      switch (condition.operator) {
        case "exists":
          return values.length > 0;
        case "notExists":
          return values.length === 0;
        case "equals":
          return expected.length > 0 && values.some((value) => value === expected[0]);
        case "notEquals":
          return expected.length > 0 && values.every((value) => value !== expected[0]);
        case "includes":
          return expected.length > 0 && expected.every((item) => values.includes(item));
        case "notIncludes":
          return expected.length > 0 && expected.every((item) => !values.includes(item));
        default:
          return true;
      }
    };

    const setControlInvalidState = (control, invalid) => {
      if (!(control instanceof HTMLElement)) {
        return;
      }

      control.setAttribute("aria-invalid", String(invalid));

      const id = control.getAttribute("id");

      if (!id) {
        return;
      }

      const error = document.getElementById(id + "-error");

      if (error instanceof HTMLElement) {
        error.hidden = !invalid;
      }
    };

    const getFirstControl = (wrapper) => {
      return wrapper.querySelector("input, select, textarea");
    };

    const getFieldControls = (wrapper) => {
      return Array.from(wrapper.querySelectorAll("input, select, textarea"));
    };

    const getFieldValidation = (wrapper) => parseJson(wrapper.dataset.wizardFieldValidation, {});
    const getFieldConditions = (wrapper) => parseJson(wrapper.dataset.wizardShowWhen, []);

    document.querySelectorAll("[data-wizard-root]").forEach((root) => {
      if (!(root instanceof HTMLElement) || root.dataset.wizardInitialized === "true") {
        return;
      }

      root.dataset.wizardInitialized = "true";

      const form = root.querySelector("[data-wizard-form]");

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const wizardScreens = Array.from(root.querySelectorAll("[data-wizard-step]")).filter((screen) => screen instanceof HTMLElement);
      const wizardBackButtons = Array.from(root.querySelectorAll("[data-wizard-back]")).filter((button) => button instanceof HTMLButtonElement);
      const wizardNextButtons = Array.from(root.querySelectorAll("[data-wizard-next]")).filter((button) => button instanceof HTMLButtonElement);
      const wizardJumpButtons = Array.from(root.querySelectorAll("[data-wizard-jump]")).filter((button) => button instanceof HTMLButtonElement);
      const wizardProgress = root.querySelector("[data-wizard-progress]");
      const submitButton = root.querySelector("[data-wizard-submit]");
      const submitLabel = submitButton?.querySelector("[data-wizard-submit-label]");
      const submitSpinner = submitButton?.querySelector("[data-wizard-submit-spinner]");
      const formError = root.querySelector("[data-wizard-form-error]");
      const successState = root.querySelector("[data-wizard-success]");
      const newRequestButton = root.querySelector("[data-wizard-new-request]");
      const fieldWrappers = Array.from(root.querySelectorAll("[data-wizard-field]")).filter((field) => field instanceof HTMLElement);
      const locale = form.dataset.locale || document.documentElement.lang || "es";
      const submitIdleLabel = form.dataset.submitLabel || "Submit";
      const submitLoadingLabel = form.dataset.loadingLabel || "Loading...";
      const analyticsForm = form.dataset.analyticsForm || form.id || "form";
      const analyticsLocation = form.dataset.analyticsLocation || "unknown";

      if (!wizardScreens.length || !(submitButton instanceof HTMLButtonElement)) {
        return;
      }

      const getPage = () => window.location.pathname;

      const hasAnalytics = () => typeof window !== "undefined" && typeof window.gtag === "function";

      const sendEvent = (eventName, parameters = {}) => {
        if (!hasAnalytics()) {
          return;
        }

        window.gtag("event", eventName, parameters);
      };

      const getStepLabel = (screen) => screen?.dataset.wizardStepLegend || screen?.querySelector("legend")?.textContent?.trim() || "Step";

      const stepMeta = wizardScreens.map((screen, index) => ({
        label: getStepLabel(screen),
        index,
      }));

      let currentStep = 0;
      let lastTrackedStep = -1;
      let hasSubmitted = false;
      let abandonTracked = false;

      const getFormContext = () => ({
        formName: analyticsForm,
        location: analyticsLocation,
        page: getPage(),
        language: String(locale).startsWith("en") ? "en" : "es",
      });

      const updateProgressBar = (stepIndex) => {
        if (!(wizardProgress instanceof HTMLElement)) {
          return;
        }

        const ratio = wizardScreens.length <= 1 ? 1 : (stepIndex + 1) / wizardScreens.length;
        wizardProgress.style.width = String(Math.max(0, Math.min(1, ratio)) * 100) + "%";
      };

      const getActiveChipIndex = (stepIndex) => Math.max(0, Math.min(stepIndex, wizardJumpButtons.length - 1));

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
        fieldWrappers.forEach((wrapper) => {
          const conditions = getFieldConditions(wrapper);
          const visible = conditions.length === 0 || conditions.every((condition) => evaluateCondition(form, condition));
          const controls = getFieldControls(wrapper);

          wrapper.hidden = !visible;

          controls.forEach((control) => {
            if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
              control.disabled = !visible;
            }
          });

          if (!visible) {
            controls.forEach((control) => setControlInvalidState(control, false));
            const groupError = wrapper.querySelector("[data-wizard-group-error]");
            if (groupError instanceof HTMLElement) {
              groupError.hidden = true;
            }
          }
        });
      };

      const getVisibleFieldsForStep = (stepIndex) => {
        const screen = wizardScreens[stepIndex];

        if (!(screen instanceof HTMLElement)) {
          return [];
        }

        return Array.from(screen.querySelectorAll("[data-wizard-field]")).filter((field) => field instanceof HTMLElement && !field.hidden);
      };

      const isValidEmail = (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);

      const validateTextControl = (control, validation) => {
        const value = control.value.trim();
        let valid = true;

        if (control.required) {
          valid = value !== "";
        }

        if (validation.minLength !== undefined) {
          valid = valid && (value === "" ? !control.required : value.length >= validation.minLength);
        }

        if (validation.maxLength !== undefined && value !== "") {
          valid = valid && value.length <= validation.maxLength;
        }

        if (validation.pattern && value !== "") {
          valid = valid && new RegExp(validation.pattern).test(value);
        }

        if (control.type === "email") {
          valid = value === "" ? !control.required : isValidEmail(value);
        }

        if (control.type === "tel") {
          valid = value === "" ? !control.required : control.value.replace(/\\D/g, "").length >= 10;
        }

        if (control.type === "url") {
          valid = value === "" || /^https?:\\/\\/.+/i.test(value);
        }

        if (control.type === "date") {
          valid = value !== "" && (!validation.min || value >= String(validation.min)) && (!validation.max || value <= String(validation.max));
        }

        return valid;
      };

      const validateGroupControl = (wrapper, controls, validation) => {
        const checkedControls = controls.filter((control) => control instanceof HTMLInputElement && control.checked);
        const requiredChecked = validation.minChecked ?? (wrapper.dataset.wizardFieldRequired === "true" ? 1 : 0);
        const maxChecked = validation.maxChecked;

        const valid = checkedControls.length >= requiredChecked && (maxChecked === undefined || checkedControls.length <= maxChecked);

        controls.forEach((control) => {
          if (control instanceof HTMLInputElement) {
            control.setAttribute("aria-invalid", String(!valid));
          }
        });

        const error = wrapper.querySelector("[data-wizard-group-error]");

        if (error instanceof HTMLElement) {
          error.hidden = valid;
        }

        return valid;
      };

      const validateWrapper = (wrapper) => {
        const controls = getFieldControls(wrapper);
        const validation = getFieldValidation(wrapper);
        const kind = wrapper.dataset.wizardFieldKind || "input";
        const visible = !wrapper.hidden;

        if (!visible) {
          controls.forEach((control) => setControlInvalidState(control, false));
          const error = wrapper.querySelector("[data-wizard-group-error]");
          if (error instanceof HTMLElement) {
            error.hidden = true;
          }
          return true;
        }

        if (kind === "radio-group" || kind === "checkbox-group") {
          return validateGroupControl(wrapper, controls, validation);
        }

        const control = getFirstControl(wrapper);

        if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) {
          return true;
        }

        let valid = validateTextControl(control, validation);

        if (kind === "checkbox") {
          valid = control.checked;
        }

        control.setAttribute("aria-invalid", String(!valid));

        const error = document.getElementById(control.id + "-error");
        if (error instanceof HTMLElement) {
          error.hidden = valid;
        }

        return valid;
      };

      const validateCurrentStep = (stepIndex) => {
        const fields = getVisibleFieldsForStep(stepIndex);
        return fields.every((field) => validateWrapper(field));
      };

      const focusFirstInvalidControl = (stepIndex) => {
        const fields = getVisibleFieldsForStep(stepIndex);
        const invalidField = fields.find((field) => !validateWrapper(field));

        if (!(invalidField instanceof HTMLElement)) {
          return;
        }

        const control = getFirstControl(invalidField);

        if (control instanceof HTMLElement) {
          control.focus({ preventScroll: true });
          control.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };

      const trackWizardStepView = (stepIndex) => {
        if (stepIndex === lastTrackedStep) {
          return;
        }

        lastTrackedStep = stepIndex;

        const meta = stepMeta[stepIndex];
        const context = getFormContext();

        sendEvent("form_wizard_step_view", {
          ...context,
          step_index: stepIndex + 1,
          step_label: meta?.label || "Step",
          total_steps: wizardScreens.length,
        });
      };

      const trackWizardStepComplete = (fromStep, toStep) => {
        const fromMeta = stepMeta[fromStep];
        const toMeta = stepMeta[toStep];
        const context = getFormContext();

        sendEvent("form_wizard_step_complete", {
          ...context,
          from_step_index: fromStep + 1,
          from_step_label: fromMeta?.label || "Step",
          to_step_index: toStep + 1,
          to_step_label: toMeta?.label || "Step",
          total_steps: wizardScreens.length,
        });
      };

      const trackWizardAbandon = () => {
        if (hasSubmitted || abandonTracked) {
          return;
        }

        abandonTracked = true;

        const meta = stepMeta[currentStep];
        const context = getFormContext();

        sendEvent("form_wizard_abandon", {
          ...context,
          current_step_index: currentStep + 1,
          current_step_label: meta?.label || "Step",
          completed_steps: currentStep + 1,
          total_steps: wizardScreens.length,
          progress_percent: Math.round(((currentStep + 1) / wizardScreens.length) * 100),
          transport_type: "beacon",
          non_interaction: true,
        });
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
          focusFirstInvalidControl(currentStep);
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
  `;
}
