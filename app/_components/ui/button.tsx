import cn from "@/app/_lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...props }: ButtonProps) => (
  <button
    {...props}
    className={cn(
      "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg bg-zinc-100 p-2 text-sm font-medium transition-all hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-800 disabled:pointer-events-none disabled:bg-zinc-100/50 disabled:text-opacity-50 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:focus-visible:ring-zinc-100 dark:disabled:bg-zinc-800/50",
      className,
    )}
  />
);
