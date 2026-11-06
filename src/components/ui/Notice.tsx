"use client";

import type { ReactNode } from "react";
import { TriangleAlert, ChevronDown } from "lucide-react";
import { UI } from "@/data/ui";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";

export function Notice({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { t } = useLang();

  return (
    <details
      className={cn(
        "group overflow-hidden rounded-control border border-line bg-sand",
        className,
      )}
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 marker:hidden [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-3 text-caption font-extrabold">
          <TriangleAlert
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-terra-deep"
          />
          {t(UI.goodToKnow)}
        </span>

        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-graphite transition-transform duration-200 group-open:rotate-180"
        />
      </summary>

      <div className="border-t border-line px-4 py-3">
        <p className="text-caption leading-relaxed text-graphite">
          {children}
        </p>
      </div>
    </details>
  );
}
