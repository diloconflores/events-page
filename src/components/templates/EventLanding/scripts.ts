import type { EventLandingScriptOptions } from "./types";

export function getEventLandingScript(options: EventLandingScriptOptions): string {
  return `
    const form = document.querySelector("#event-form");
    const formCard = document.querySelector(".form-card");
    const errorBox = document.querySelector("[data-form-error]");
    const successState = document.querySelector("[data-success]");
    const newRequestButton = document.querySelector("[data-new-request]");
    const submitButton = document.querySelector("[data-submit]");
    const submitLabel = submitButton?.querySelector(".submit-label");
    const wizardBack = document.querySelector("[data-wizard-back]");
    const wizardNext = document.querySelector("[data-wizard-next]");
    const wizardScreens = [...document.querySelectorAll("#event-form fieldset")];

    if (!form || !submitButton || !wizardBack || !wizardNext || wizardScreens.length === 0) {
      return;
    }

    const showStep = (index) => {
      wizardScreens.forEach((screen, currentIndex) => {
        screen.hidden = currentIndex !== index;
      });

      wizardBack.hidden = index === 0;
      wizardNext.hidden = index === wizardScreens.length - 1;
      submitButton.hidden = index !== wizardScreens.length - 1;
    };

    const isVisible = (element) => !element.closest("[hidden]");

    const validateField = (field) => {
      if (!isVisible(field)) return true;

      const value = field.value.trim();
      let valid = value !== "";

      if (field.type === "checkbox") {
        valid = field.checked;
      }

      if (field.type === "date") {
        valid = value !== "" && (!field.min || value >= field.min);
      }

      if (field.type === "email") {
        valid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
      }

      if (field.type === "tel") {
        valid = field.value.replace(/\\D/g, "").length >= 10;
      }

      if (field.type === "url") {
        valid = value === "" || /^https?:\\/\\/.+/i.test(value);
      }

      if (field.tagName === "TEXTAREA" && field.minLength > 0) {
        valid = value.length >= field.minLength;
      }

      field.toggleAttribute("aria-invalid", !valid);
      return valid;
    };

    const validateCurrentStep = (index) => {
      const screen = wizardScreens[index];
      if (!screen) return true;

      return [...screen.querySelectorAll("input, select, textarea")].every((field) => {
        if (field.closest('label')?.hidden) return true;
        if (!field.required && field.type !== "url" && field.type !== "checkbox") return true;
        return validateField(field);
      });
    };

    const updateConditionalFields = () => {
      const todayField = form.querySelector('[name="eventDate"]');
      if (todayField) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        todayField.min = yyyy + "-" + mm + "-" + dd;
      }

      const municipalitySelect = form.querySelector('[name="municipality"]');
      const municipalityOther = form.querySelector('[name="municipalityOther"]')?.closest("label");
      const venueSelect = form.querySelector('[name="venue"]');
      const venueName = form.querySelector('[name="venueName"]')?.closest("label");
      const primarySpaces = form.querySelectorAll('[name="spaces"]');
      const integralSpaces = form.querySelector('[name="integralSpaces"]')?.closest("label");
      const ideaState = form.querySelector('[name="ideaState"]');
      const ideaText = form.querySelector('[name="ideaText"]');
      const styleSelect = form.querySelector('[name="style"]');
      const styleOther = form.querySelector('[name="styleOther"]')?.closest("label");

      const showMunicipalityOther = municipalitySelect?.value === "Otro";
      if (municipalityOther) municipalityOther.hidden = !showMunicipalityOther;

      const showVenueName = venueSelect?.value === "Sí";
      if (venueName) venueName.hidden = !showVenueName;

      const integralChecked = [...primarySpaces].some((box) => box.checked && box.value === "Decoración integral");
      if (integralSpaces) integralSpaces.hidden = !integralChecked;

      if (ideaText && ideaState) {
        if (ideaState.value === "sin_idea") {
          ideaText.placeholder = "Cuéntanos qué tipo de evento imaginas y nosotros te ayudaremos a definir el resto.";
        }
      }

      const showStyle = ideaState ? ["clara", "referencias"].includes(ideaState.value) : false;
      if (styleSelect) styleSelect.disabled = !showStyle;
      if (styleOther) styleOther.hidden = styleSelect?.value !== "Otro";
    };

    const setLoading = (loading) => {
      if (!submitLabel) return;
      submitButton.disabled = loading;
      submitLabel.textContent = loading ? ${JSON.stringify(options.loadingLabel)} : ${JSON.stringify(options.submitLabel)};
    };

    let currentStep = 0;
    showStep(currentStep);
    updateConditionalFields();

    wizardNext.addEventListener("click", () => {
      updateConditionalFields();
      if (!validateCurrentStep(currentStep)) return;
      currentStep = Math.min(currentStep + 1, wizardScreens.length - 1);
      showStep(currentStep);
    });

    wizardBack.addEventListener("click", () => {
      currentStep = Math.max(currentStep - 1, 0);
      showStep(currentStep);
    });

    form.addEventListener("input", () => {
      updateConditionalFields();
    });

    form.addEventListener("change", () => {
      updateConditionalFields();
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorBox?.classList.add("hidden");

      const isValid = wizardScreens.every((_, index) => validateCurrentStep(index));
      if (!isValid) return;

      setLoading(true);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Formspree rechazó la solicitud.");
        }

        form.hidden = true;
        successState?.classList.remove("hidden");
        formCard?.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (error) {
        console.error(error);
        errorBox?.classList.remove("hidden");
      } finally {
        setLoading(false);
      }
    });

    newRequestButton?.addEventListener("click", () => {
      form.reset();
      form.hidden = false;
      successState?.classList.add("hidden");
      errorBox?.classList.add("hidden");
      currentStep = 0;
      showStep(currentStep);
      updateConditionalFields();
    });
  `;
}

export function getScrollRevealScript(): string {
  return `
    const revealRoots = Array.from(document.querySelectorAll("[data-scroll-reveal]")).filter(
      (node) => node instanceof HTMLElement,
    );

    if (!revealRoots.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const markVisible = (root) => {
      if (!(root instanceof HTMLElement)) {
        return;
      }

      root.dataset.scrollRevealState = "visible";

      Array.from(root.querySelectorAll("[data-scroll-reveal-item]")).forEach((item, index) => {
        if (item instanceof HTMLElement) {
          item.style.setProperty("--reveal-order", String(index));
        }
      });
    };

    if (!("IntersectionObserver" in window) || prefersReducedMotion.matches) {
      revealRoots.forEach(markVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) {
            return;
          }

          markVisible(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealRoots.forEach((root) => observer.observe(root));

    const handleMotionPreferenceChange = () => {
      if (!prefersReducedMotion.matches) {
        return;
      }

      observer.disconnect();
      revealRoots.forEach(markVisible);
    };

    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener("change", handleMotionPreferenceChange);
    }
  `;
}
