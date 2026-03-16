import { LeadProvider } from "../types";

export const consoleLeadProvider: LeadProvider = {
  name: "console",
  async storeLead(lead) {
    console.info("[leads:console] lead received", {
      type: lead.type,
      email: lead.email,
      name: lead.name,
      sourcePath: lead.sourcePath,
      createdAt: lead.createdAt,
    });

    return {
      provider: "console",
      ok: true,
      persisted: false,
      message:
        "Captured in server logs only. Configure LEADS_WEBHOOK_URL for durable storage.",
    };
  },
};
