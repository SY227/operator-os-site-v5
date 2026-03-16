"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackClientEvent } from "@/lib/analytics/client";

export default function AnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    trackClientEvent({
      name: "page_view",
      path: pathname,
    });
  }, [pathname]);

  return null;
}
