import type { AnalyticsParameters } from "./types";

export function isGoogleAnalyticsAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function trackEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
): void {
  if (!isGoogleAnalyticsAvailable()) {
    return;
  }

  window.gtag("event", eventName, parameters);
}

export function trackWhatsAppClick(
  location: string,
  language: "es" | "en",
): void {
  trackEvent("click_whatsapp", {
    location,
    language,
  });
}

export function trackQuoteStart(location: string, language: "es" | "en"): void {
  trackEvent("start_quote", {
    location,
    language,
  });
}

export function trackQuoteSubmission(
  eventType: string,
  language: "es" | "en",
): void {
  trackEvent("generate_lead", {
    lead_type: "event_quote",
    event_type: eventType,
    language,
  });
}

export function getAnalyticsTrackingScript(): string {
  return `
    const hasAnalytics = () => typeof window !== "undefined" && typeof window.gtag === "function";

    const getLanguage = () => {
      const lang = document.documentElement.lang || "es";
      return lang.startsWith("es") ? "es" : "en";
    };

    const getPage = () => window.location.pathname;

    const sendEvent = (eventName, parameters) => {
      if (!hasAnalytics()) {
        return;
      }

      window.gtag("event", eventName, parameters);
    };

    const getAnalyticsName = (element) => {
      const explicitName = element.dataset.analyticsName;

      if (explicitName) {
        return explicitName;
      }

      const ariaLabel = element.getAttribute("aria-label");

      if (ariaLabel) {
        return ariaLabel;
      }

      return (element.textContent || "").trim() || "unknown";
    };

    const getAnalyticsLocation = (element) => element.dataset.analyticsLocation || "unknown";

    const trackClick = (element) => {
      const eventName = element.dataset.analyticsEvent || "cta_click";

      sendEvent(eventName, {
        cta_name: getAnalyticsName(element),
        location: getAnalyticsLocation(element),
        page: getPage(),
        language: getLanguage(),
      });
    };

    const trackFormView = (form) => {
      if (form.dataset.analyticsViewed === "true") {
        return;
      }

      form.dataset.analyticsViewed = "true";

      sendEvent("form_view", {
        form_name: form.dataset.analyticsForm || form.id || "form",
        location: form.dataset.analyticsLocation || "unknown",
        page: getPage(),
        language: getLanguage(),
      });
    };

    const trackFormStart = (form) => {
      if (form.dataset.analyticsStarted === "true") {
        return;
      }

      form.dataset.analyticsStarted = "true";

      sendEvent("form_start", {
        form_name: form.dataset.analyticsForm || form.id || "form",
        location: form.dataset.analyticsLocation || "unknown",
        page: getPage(),
        language: getLanguage(),
      });
    };

    const trackFormSubmit = (form) => {
      sendEvent("form_submit", {
        form_name: form.dataset.analyticsForm || form.id || "form",
        location: form.dataset.analyticsLocation || "unknown",
        page: getPage(),
        language: getLanguage(),
      });
    };

    const observeForms = () => {
      const forms = document.querySelectorAll("[data-analytics-form]");

      forms.forEach((form) => {
        if (!(form instanceof HTMLFormElement)) {
          return;
        }

        if (!("IntersectionObserver" in window)) {
          form.addEventListener("focusin", () => {
            trackFormStart(form);
          });

          form.addEventListener("input", () => {
            trackFormStart(form);
          });

          form.addEventListener("submit", () => {
            trackFormSubmit(form);
          });

          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                trackFormView(form);
                observer.disconnect();
              }
            });
          },
          { threshold: 0.5 },
        );

        observer.observe(form);

        form.addEventListener("focusin", () => {
          trackFormStart(form);
        });

        form.addEventListener("input", () => {
          trackFormStart(form);
        });

        form.addEventListener("submit", () => {
          trackFormSubmit(form);
        });
      });
    };

    const initTracking = () => {
      document.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
          return;
        }

        const target = event.target.closest("[data-analytics-event]");

        if (!(target instanceof HTMLElement)) {
          return;
        }

        trackClick(target);
      });

      observeForms();
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initTracking, { once: true });
    } else {
      initTracking();
    }
  `;
}
