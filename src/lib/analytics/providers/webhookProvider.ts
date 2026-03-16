import { AnalyticsProvider } from "../types";

const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL;

export const webhookAnalyticsProvider: AnalyticsProvider | null = webhookUrl
  ? {
      name: "webhook",
      async send(event) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Analytics-Source": "cognifox-site-v5",
          },
          body: JSON.stringify(event),
        });
      },
    }
  : null;
