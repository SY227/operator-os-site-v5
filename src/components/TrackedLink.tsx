"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { trackClientEvent } from "@/lib/analytics/client";
import { AnalyticsEventName } from "@/lib/analytics/types";

type TrackedLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
  eventName?: AnalyticsEventName;
  eventProps?: Record<string, unknown>;
  eventPayload?: Record<string, unknown>; // backwards-compatible alias
};

export default function TrackedLink({
  className,
  children,
  eventName = "cta_click",
  eventProps,
  eventPayload,
  ...linkProps
}: TrackedLinkProps) {
  const properties = eventProps ?? eventPayload;

  return (
    <Link
      {...linkProps}
      className={className}
      onClick={() => {
        const targetPath =
          typeof linkProps.href === "string"
            ? linkProps.href
            : linkProps.href.pathname ?? undefined;

        trackClientEvent({
          name: eventName,
          path: targetPath,
          properties,
        });
      }}
    >
      {children}
    </Link>
  );
}
