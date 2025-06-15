import { cn } from "@/mde/lib";

export const Button = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    type="button"
    className={cn(
      `relative aspect-square h-full overflow-hidden p-3 hover:bg-zinc-200 focus:bg-zinc-100 disabled:opacity-50 dark:hover:bg-zinc-800 dark:focus:bg-zinc-900`,
      className,
    )}
  />
);
