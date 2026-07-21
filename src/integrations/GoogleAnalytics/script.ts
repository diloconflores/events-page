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
