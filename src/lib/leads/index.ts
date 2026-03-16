import { consoleLeadProvider } from "./providers/consoleProvider";
import { webhookLeadProvider } from "./providers/webhookProvider";
import { LeadProvider, LeadRecord, LeadStoreResult } from "./types";

function getProviders(): LeadProvider[] {
  const mode = process.env.LEADS_PROVIDER ?? "console";

  if (mode === "webhook") {
    return webhookLeadProvider ? [webhookLeadProvider] : [consoleLeadProvider];
  }

  if (mode === "both") {
    return webhookLeadProvider
      ? [consoleLeadProvider, webhookLeadProvider]
      : [consoleLeadProvider];
  }

  return [consoleLeadProvider];
}

export async function submitLead(record: LeadRecord) {
  const providers = getProviders();
  const results: LeadStoreResult[] = [];

  for (const provider of providers) {
    results.push(await provider.storeLead(record));
  }

  const persisted = results.some((result) => result.persisted);
  const warning = persisted
    ? undefined
    : "No persistent lead destination configured. Set LEADS_WEBHOOK_URL (and LEADS_PROVIDER=webhook or both).";

  return {
    ok: results.some((result) => result.ok),
    persisted,
    warning,
    results,
  };
}
