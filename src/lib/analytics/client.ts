"use client";

import { AnalyticsEvent } from "./types";

export async function trackClientEvent(event: AnalyticsEvent) {
  const payload = {
    ...event,
    timestamp: event.timestamp ?? new Date().toISOString(),
  };

  if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[analytics:client]", payload);
  }

  try {
    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/analytics", blob);
      return;
    }

    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Swallow analytics errors to avoid affecting UX.
  }
}
