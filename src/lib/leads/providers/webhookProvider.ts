import { LeadProvider } from "../types";

const webhookUrl = process.env.LEADS_WEBHOOK_URL;

export const webhookLeadProvider: LeadProvider | null = webhookUrl
  ? {
      name: "webhook",
      async storeLead(lead) {
        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Lead-Source": "cognifox-site-v5",
            },
            body: JSON.stringify(lead),
          });

          if (!response.ok) {
            return {
              provider: "webhook",
              ok: false,
              persisted: false,
              message: `Webhook returned ${response.status}`,
            };
          }

          return {
            provider: "webhook",
            ok: true,
            persisted: true,
            message: "Lead delivered to webhook",
          };
        } catch (error) {
          return {
            provider: "webhook",
            ok: false,
            persisted: false,
            message:
              error instanceof Error ? error.message : "Unknown webhook error",
          };
        }
      },
    }
  : null;
