export type LeadType = "newsletter" | "contact";

export type LeadRecord = {
  type: LeadType;
  email?: string;
  name?: string;
  sourcePath?: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

export type LeadStoreResult = {
  provider: string;
  ok: boolean;
  persisted: boolean;
  message: string;
};

export interface LeadProvider {
  name: string;
  storeLead: (lead: LeadRecord) => Promise<LeadStoreResult>;
}
