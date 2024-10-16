import { forwardRef } from "react";

import cn from "@/app/_lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center bg-zinc-100 hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-900 justify-center whitespace-nowrap bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
