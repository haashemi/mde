"use client";
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

import { Button } from "@/app/_components/ui/button";
import { useDirection } from "@/app/_contexts/direction-context";
import { useEditorView } from "@/app/_contexts/editor-view-context";
import { useMounted } from "@/app/_hooks/use-mounted";
import cn from "@/app/_lib/cn";

export const Header = () => {
  const isMounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const { view, setEditorView } = useEditorView();
  const { direction, setDirection } = useDirection();

  const nextDir = useMemo(() => (direction === "rtl" ? "ltr" : "rtl"), [direction]);

  const nextTheme = useMemo(() => {
    return isMounted && resolvedTheme === "dark" ? "light" : "dark";
  }, [isMounted, resolvedTheme]);

  return (
    <header className="flex h-14 items-center justify-between px-2">
      <Button disabled={!isMounted} onClick={() => setTheme(nextTheme)}>
        {nextTheme === "dark" ? <RiMoonLine className="size-full" /> : <RiSunLine className="size-full" />}
      </Button>

      <div className="inline-flex gap-2">
        <div className="flex">
          <Button
            disabled={view === "editor"}
            className="rounded-r-none border-r border-x-zinc-300 dark:border-x-zinc-700"
            onClick={() => setEditorView("editor")}
          >
            <RiLayoutColumnFill className="size-full -scale-100" />
          </Button>
          <Button disabled={view === "both"} className="rounded-none" onClick={() => setEditorView("both")}>
            <RiLayoutColumnLine className="size-full" />
          </Button>
          <Button
            disabled={view === "preview"}
            className="rounded-l-none border-l border-x-zinc-300 dark:border-x-zinc-700"
            onClick={() => setEditorView("preview")}
          >
            <RiLayoutColumnFill className="size-full" />
          </Button>
        </div>

        <Button onClick={() => setDirection(nextDir)} className="relative aspect-square overflow-hidden px-0">
          <RiTextDirectionR
            className={cn(
              "absolute size-full transition-transform ease-in-out duration-300 p-2",
              nextDir === "ltr" ? "translate-y-full" : "translate-y-0",
            )}
          />
          <RiTextDirectionL
            className={cn(
              "absolute size-full transition-transform ease-in-out duration-300 p-2",
              nextDir === "rtl" ? "-translate-y-full" : "translate-y-0",
            )}
          />
        </Button>
      </div>
    </header>
  );
};
