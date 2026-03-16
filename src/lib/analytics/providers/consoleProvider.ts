import { AnalyticsProvider } from "../types";

export const consoleAnalyticsProvider: AnalyticsProvider = {
  name: "console",
  async send(event) {
    if (process.env.NODE_ENV !== "production" || process.env.ANALYTICS_CONSOLE_LOGS === "true") {
      console.info("[analytics:console]", event);
    }
  },
};
