import { cn } from "@/mde/lib";
import { useMdeDirection, useMdeView } from "@/mde/stores";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import {
  RiLayoutColumnFill,
  RiLayoutColumnLine,
  RiMoonLine,
  RiSunLine,
  RiTextDirectionL,
  RiTextDirectionR,
} from "react-icons/ri";

const HeaderButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`relative aspect-square h-full overflow-hidden p-3 hover:bg-zinc-200 focus:bg-zinc-100 disabled:opacity-50 dark:hover:bg-zinc-800 dark:focus:bg-zinc-900 ${className ?? ""}`}
    type="button"
  />
);

export const Header = () => {
  const [view, setEditorView] = useMdeView();
  const [direction, setDirection] = useMdeDirection();
  const { resolvedTheme, setTheme } = useTheme();

  const nextDir = useMemo(() => (direction === "rtl" ? "ltr" : "rtl"), [direction]);
  const nextTheme = useMemo(() => (resolvedTheme === "dark" ? "light" : "dark"), [resolvedTheme]);

  return (
    <header className="flex h-12 items-center justify-between border-b border-zinc-300 dark:border-zinc-700">
      <HeaderButton onClick={() => setTheme(nextTheme)}>
        {nextTheme === "dark" ? <RiMoonLine className="size-full" /> : <RiSunLine className="size-full" />}
      </HeaderButton>

      <div className="inline-flex h-full">
        <div dir={direction} className="flex h-full ">
          <HeaderButton disabled={view === "editor"} onClick={() => setEditorView("editor")}>
            <RiLayoutColumnFill className="size-full rotate-90 -scale-100 lg:rotate-0" />
          </HeaderButton>
          <HeaderButton disabled={view === "both"} onClick={() => setEditorView("both")}>
            <RiLayoutColumnLine className="size-full rotate-90 lg:rotate-0" />
          </HeaderButton>
          <HeaderButton disabled={view === "preview"} onClick={() => setEditorView("preview")}>
            <RiLayoutColumnFill className="size-full rotate-90 lg:rotate-0" />
          </HeaderButton>
        </div>

        <span className="h-full w-[1px] bg-zinc-300 dark:bg-zinc-700" />

        <HeaderButton className="p-0" onClick={() => setDirection(nextDir)}>
          <RiTextDirectionR
            className={cn(
              "absolute left-0 top-0 size-full p-3",
              nextDir === "ltr" ? "translate-y-full" : "translate-y-0",
            )}
          />
          <RiTextDirectionL
            className={cn(
              "absolute left-0 top-0 size-full p-3",
              nextDir === "rtl" ? "-translate-y-full" : "translate-y-0",
            )}
          />
        </HeaderButton>
      </div>
    </header>
  );
};
