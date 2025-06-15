import { useTheme } from "next-themes";
import { useMemo } from "react";
import {
  RiLayoutColumnFill,
  RiLayoutColumnLine,
  RiMoonLine,
  RiRestartLine,
  RiSunLine,
  RiTextDirectionL,
  RiTextDirectionR,
} from "react-icons/ri";

import { cn, defaultMarkdownContent } from "@/mde/lib";
import { useMdeContent, useMdeDirection, useMdeView } from "@/mde/stores";
import { Button } from "@/mde/ui";

export const ThemeSwitchButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const nextTheme = useMemo(() => (resolvedTheme === "dark" ? "light" : "dark"), [resolvedTheme]);

  return (
    <Button onClick={() => setTheme(nextTheme)}>
      {nextTheme === "dark" ? <RiMoonLine className="size-full" /> : <RiSunLine className="size-full" />}
    </Button>
  );
};

export const ResetButton = () => {
  const [content, setContent] = useMdeContent();
  const [direction, setDirection] = useMdeDirection();
  const [editorView, setEditorView] = useMdeView();

  const resetApp = () => {
    if (content !== defaultMarkdownContent) setContent(defaultMarkdownContent);
    if (direction !== "ltr") setDirection("ltr");
    if (editorView !== "both") setEditorView("both");
  };

  return (
    <Button onClick={resetApp}>
      <RiRestartLine className="size-full rotate-45 -scale-x-100" />
    </Button>
  );
};

export const EditorViewButtons = () => {
  const [direction] = useMdeDirection();
  const [view, setEditorView] = useMdeView();

  return (
    <div dir={direction} className="flex h-full ">
      <Button disabled={view === "editor"} onClick={() => setEditorView("editor")}>
        <RiLayoutColumnFill className="size-full rotate-90 -scale-100 lg:rotate-0" />
      </Button>
      <Button disabled={view === "both"} onClick={() => setEditorView("both")}>
        <RiLayoutColumnLine className="size-full rotate-90 lg:rotate-0" />
      </Button>
      <Button disabled={view === "preview"} onClick={() => setEditorView("preview")}>
        <RiLayoutColumnFill className="size-full rotate-90 lg:rotate-0" />
      </Button>
    </div>
  );
};

export const DirectionButton = () => {
  const [direction, setDirection] = useMdeDirection();

  const nextDir = useMemo(() => (direction === "rtl" ? "ltr" : "rtl"), [direction]);

  return (
    <Button className="p-0" onClick={() => setDirection(nextDir)}>
      <RiTextDirectionR
        className={cn("absolute left-0 top-0 size-full p-3", nextDir === "ltr" ? "translate-y-full" : "translate-y-0")}
      />
      <RiTextDirectionL
        className={cn("absolute left-0 top-0 size-full p-3", nextDir === "rtl" ? "-translate-y-full" : "translate-y-0")}
      />
    </Button>
  );
};
