export type AnalyticsEventName =
  | "page_view"
  | "cta_click"
  | "newsletter_submit"
  | "contact_submit";

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  path?: string;
  timestamp?: string;
  properties?: Record<string, unknown>;
};

export interface AnalyticsProvider {
  name: string;
  send: (event: AnalyticsEvent) => Promise<void>;
}
