import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PanelProps {
  label: string;
  meta?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const Panel = ({ label, meta, className, children }: PanelProps) => (
  <section aria-label={label} className={cn("flex min-h-0 min-w-0 flex-1 basis-0 flex-col", className)}>
    <div className="flex h-8 shrink-0 items-center justify-between gap-4 border-b px-4 text-xs text-muted-foreground">
      {/* The bar's text is English, so it stays LTR even when the panels are RTL. */}
      <span dir="ltr">{label}</span>
      <span dir="ltr" className="truncate tabular-nums">
        {meta}
      </span>
    </div>
    {children}
  </section>
);

/** The line between the panels, with a small cross wherever it meets another grid line. */
export const PanelDivider = () => <div aria-hidden className="panel-divider" />;
