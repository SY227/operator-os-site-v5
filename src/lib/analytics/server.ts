import { consoleAnalyticsProvider } from "./providers/consoleProvider";
import { webhookAnalyticsProvider } from "./providers/webhookProvider";
import { AnalyticsEvent, AnalyticsProvider } from "./types";

function getProviders(): AnalyticsProvider[] {
  const mode = process.env.ANALYTICS_PROVIDER ?? "console";

  if (mode === "webhook") {
    return webhookAnalyticsProvider ? [webhookAnalyticsProvider] : [consoleAnalyticsProvider];
  }

  if (mode === "both") {
    return webhookAnalyticsProvider
      ? [consoleAnalyticsProvider, webhookAnalyticsProvider]
      : [consoleAnalyticsProvider];
  }

  return [consoleAnalyticsProvider];
}

export async function trackServerEvent(event: AnalyticsEvent) {
  const fullEvent: AnalyticsEvent = {
    ...event,
    timestamp: event.timestamp ?? new Date().toISOString(),
  };

  for (const provider of getProviders()) {
    try {
      await provider.send(fullEvent);
    } catch (error) {
      console.error(`[analytics:${provider.name}] failed`, error);
    }
  }
}
