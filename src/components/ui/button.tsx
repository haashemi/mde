import cn from "@/app/_lib/cn";

export const Button = (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => (
  <button
    {...props}
    className={cn(
      "px-3 py-1 rounded-lg transition-colors bg-zinc-100 hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-900",
      props.className,
    )}
  />
);
