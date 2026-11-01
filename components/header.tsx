import type { ReactElement, ReactNode } from "react";

import {
  ArrowCounterClockwiseIcon,
  ColumnsIcon,
  EyeIcon,
  MoonIcon,
  PencilSimpleLineIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import type { MdeView } from "@/stores";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { defaultMarkdownContent } from "@/lib/constants";
import { useMdeContent, useMdeDirection, useMdeView } from "@/stores";

const HeaderTooltip = ({ label, shortcut, children }: { label: string; shortcut?: string; children: ReactElement }) => (
  <Tooltip>
    <TooltipTrigger render={children} />
    <TooltipContent side="bottom">
      {label}
      {shortcut && <Kbd>{shortcut}</Kbd>}
    </TooltipContent>
  </Tooltip>
);

const HeaderButton = (props: React.ComponentProps<typeof Button>) => (
  <Button variant="ghost" className="h-full min-w-11 px-3" {...props} />
);

const views: { value: MdeView; label: string; shortcut: string; icon: ReactNode }[] = [
  { value: "editor", label: "Editor only", shortcut: "Alt 1", icon: <PencilSimpleLineIcon /> },
  { value: "both", label: "Split view", shortcut: "Alt 2", icon: <ColumnsIcon className="rotate-90 lg:rotate-0" /> },
  { value: "preview", label: "Preview only", shortcut: "Alt 3", icon: <EyeIcon /> },
];

const ViewToggle = () => {
  const [view, setView] = useMdeView();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey || event.ctrlKey || event.metaKey) return;

      // `code` instead of `key`: on macOS, Option+1 produces "¡" as the key.
      const next = views[Number(event.code.replace("Digit", "")) - 1];
      if (!next) return;

      event.preventDefault();
      setView(next.value);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setView]);

  return (
    <ToggleGroup
      aria-label="Layout"
      spacing={0}
      className="h-full divide-x"
      value={[view]}
      onValueChange={([next]) => next && setView(next as MdeView)}
    >
      {views.map(({ value, label, shortcut, icon }) => (
        <HeaderTooltip key={value} label={label} shortcut={shortcut}>
          <ToggleGroupItem
            value={value}
            aria-label={label}
            className="relative h-full min-w-11 text-muted-foreground aria-pressed:bg-transparent aria-pressed:text-foreground aria-pressed:after:absolute aria-pressed:after:inset-x-0 aria-pressed:after:-bottom-px aria-pressed:after:h-0.5 aria-pressed:after:bg-foreground"
          >
            {icon}
          </ToggleGroupItem>
        </HeaderTooltip>
      ))}
    </ToggleGroup>
  );
};

const DirectionToggle = () => {
  const [direction, setDirection] = useMdeDirection();
  const next = direction === "ltr" ? "rtl" : "ltr";

  return (
    <HeaderTooltip label={`Switch to ${next.toUpperCase()}`}>
      <HeaderButton aria-label={`Switch text direction to ${next}`} onClick={() => setDirection(next)}>
        {direction}
      </HeaderButton>
    </HeaderTooltip>
  );
};

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const next = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <HeaderTooltip label={`Switch to ${next} theme`}>
      <HeaderButton aria-label={`Switch to ${next} theme`} onClick={() => setTheme(next)}>
        {next === "dark" ? <MoonIcon /> : <SunIcon />}
      </HeaderButton>
    </HeaderTooltip>
  );
};

const CONFIRM_TIMEOUT_MS = 3000;

// Resetting throws away the document, so it takes a second click to go through.
const ResetButton = () => {
  const [, setContent] = useMdeContent();
  const [, setDirection] = useMdeDirection();
  const [, setView] = useMdeView();
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timeout = setTimeout(() => setConfirming(false), CONFIRM_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [confirming]);

  const reset = () => {
    if (!confirming) return setConfirming(true);

    setContent(defaultMarkdownContent);
    setDirection("ltr");
    setView("both");
    setConfirming(false);
  };

  return (
    <HeaderTooltip label="Reset document and settings">
      <HeaderButton
        variant={confirming ? "destructive" : "ghost"}
        aria-label={confirming ? "Confirm reset" : "Reset"}
        onClick={reset}
      >
        <ArrowCounterClockwiseIcon />
        {confirming && <span>Reset?</span>}
      </HeaderButton>
    </HeaderTooltip>
  );
};

export const Header = () => (
  <header className="flex h-11 shrink-0 items-stretch border-b">
    <div className="flex items-center gap-2 px-4 text-sm font-semibold tracking-tight">
      <img src="/favicon.svg" alt="" className="size-4" />
      mde
    </div>
    <div className="flex-1" />
    <div className="flex items-stretch divide-x border-s">
      <ViewToggle />
      <DirectionToggle />
      <ThemeToggle />
      <ResetButton />
    </div>
  </header>
);
