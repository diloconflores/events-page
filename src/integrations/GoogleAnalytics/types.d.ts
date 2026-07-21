export {};

export type AnalyticsParameterValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export type AnalyticsParameters = Record<string, AnalyticsParameterValue>;

declare global {
  interface Window {
    dataLayer: unknown[];

    gtag(command: "js", date: Date): void;

    gtag(
      command: "config",
      measurementId: string,
      parameters?: AnalyticsParameters,
    ): void;

    gtag(
      command: "event",
      eventName: string,
      parameters?: AnalyticsParameters,
    ): void;

    gtag(
      command: "consent",
      action: "default" | "update",
      parameters: AnalyticsParameters,
    ): void;
  }
}
