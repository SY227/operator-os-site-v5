"use client";

import { trackClientEvent } from "./client";
import { AnalyticsEventName } from "./types";

export async function trackEvent(
  event: AnalyticsEventName,
  payload?: Record<string, unknown>,
) {
  await trackClientEvent({
    name: event,
    properties: payload,
  });
}
